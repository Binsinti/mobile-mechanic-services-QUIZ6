from django.urls import path
from .views import (
    SubscriptionTierListView,
    SubscribeView,
    CurrentUserSubscriptionView,
    SubscriptionTransactionListView,
)

urlpatterns = [
    path('tiers/', SubscriptionTierListView.as_view(), name='subscription-tiers'),
    path('subscribe/', SubscribeView.as_view(), name='subscribe'),
    path('current/', CurrentUserSubscriptionView.as_view(), name='current-subscription'),
    path('transactions/', SubscriptionTransactionListView.as_view(), name='subscription-transactions'),
]
