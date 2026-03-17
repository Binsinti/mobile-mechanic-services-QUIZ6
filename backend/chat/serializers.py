from rest_framework import serializers
from .models import ChatMessage

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'user', 'message', 'message_type', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']
