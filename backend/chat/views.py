import os
import requests
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from .models import ChatMessage
from .serializers import ChatMessageSerializer
from subscriptions.models import UserSubscription


class AIChatbotView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        message = request.data.get('message', '').strip()

        if not message:
            return Response({'error': 'Message cannot be empty'}, status=status.HTTP_400_BAD_REQUEST)

        # Check subscription status
        subscription = UserSubscription.objects.filter(user=user, is_active=True).order_by('-subscribed_at').first()
        if not subscription:
            return Response(
                {'error': 'You need an active subscription to use the chatbot'},
                status=status.HTTP_402_PAYMENT_REQUIRED
            )
        
        # Check usage limit
        if subscription.usage_left <= 0:
            return Response(
                {'error': 'You have exceeded your monthly usage limit'},
                status=status.HTTP_429_TOO_MANY_REQUESTS
            )
        
        # Usage means user message only.
        user_msg = ChatMessage.objects.create(
            user=user,
            message=message,
            message_type='user'
        )

        bot_response = self._get_ai_response(message)

        bot_msg = ChatMessage.objects.create(
            user=user,
            message=bot_response,
            message_type='bot'
        )

        subscription.usage_left -= 1
        subscription.save(update_fields=['usage_left'])

        return Response({
            'user_message': ChatMessageSerializer(user_msg).data,
            'bot_message': ChatMessageSerializer(bot_msg).data,
            'usage_left': subscription.usage_left,
            'max_usage': subscription.tier.max_usage,
        })
    
    def _get_ai_response(self, message):
        api_key = settings.HUGGINGFACE_API_KEY
        if not api_key:
            return "I can only answer questions related to this services marketplace project."
        
        try:
            api_url = "https://api-inference.huggingface.co/models/gpt2"
            headers = {"Authorization": f"Bearer {api_key}"}
            response = requests.post(api_url, headers=headers, json={"inputs": message}, timeout=10)
            
            if response.status_code == 200:
                result = response.json()
                if isinstance(result, list) and len(result) > 0:
                    return result[0].get('generated_text', "I couldn't generate a response.")
            
            return "I apologize, I had trouble generating a response. Please try again."
        except Exception as e:
            return f"Error: {str(e)}"
