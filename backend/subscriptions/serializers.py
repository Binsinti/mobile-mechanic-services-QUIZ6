from rest_framework import serializers
from .models import SubscriptionTier, UserSubscription


class SubscriptionTierSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionTier
        fields = ['id', 'name', 'price', 'max_usage']


class UserSubscriptionSerializer(serializers.ModelSerializer):
    tier = SubscriptionTierSerializer(read_only=True)
    user = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = UserSubscription
        fields = ['id', 'user', 'tier', 'usage_left', 'is_active', 'subscribed_at']
        read_only_fields = ['id', 'user', 'usage_left', 'is_active', 'subscribed_at']
