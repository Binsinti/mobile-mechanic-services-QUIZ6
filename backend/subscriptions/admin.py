from django.contrib import admin
from .models import SubscriptionTier, UserSubscription

@admin.register(SubscriptionTier)
class SubscriptionTierAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'max_usage']
    list_filter = ['max_usage']
    search_fields = ['name']

@admin.register(UserSubscription)
class UserSubscriptionAdmin(admin.ModelAdmin):
    list_display = ['user', 'tier', 'is_active', 'usage_left', 'subscribed_at']
    list_filter = ['is_active', 'tier', 'subscribed_at']
    search_fields = ['user__username']
