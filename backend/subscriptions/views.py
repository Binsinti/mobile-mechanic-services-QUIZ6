from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import SubscriptionTier, UserSubscription
from .serializers import SubscriptionTierSerializer, UserSubscriptionSerializer


class SubscriptionTierListView(generics.ListAPIView):
    queryset = SubscriptionTier.objects.all()
    serializer_class = SubscriptionTierSerializer
    permission_classes = [AllowAny]


class SubscribeView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        tier_id = request.data.get('tier_id')

        try:
            tier = SubscriptionTier.objects.get(id=tier_id)
        except SubscriptionTier.DoesNotExist:
            return Response({'detail': 'Tier not found.'}, status=status.HTTP_404_NOT_FOUND)

        subscription, _ = UserSubscription.objects.update_or_create(
            user=request.user,
            defaults={
                'tier': tier,
                'usage_left': tier.max_usage,
                'is_active': True,
            },
        )
        return Response(UserSubscriptionSerializer(subscription).data, status=status.HTTP_200_OK)


class CurrentUserSubscriptionView(generics.RetrieveAPIView):
    serializer_class = UserSubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        subscription = UserSubscription.objects.filter(user=request.user, is_active=True).order_by('-subscribed_at').first()
        if not subscription:
            return Response({'detail': 'No active subscription found.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(UserSubscriptionSerializer(subscription).data)


class SubscriptionTransactionListView(generics.ListAPIView):
    serializer_class = UserSubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role != 'Admin':
            return UserSubscription.objects.none()
        return UserSubscription.objects.select_related('user', 'tier').all()
