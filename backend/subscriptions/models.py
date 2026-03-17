from django.db import models
from users.models import User


class SubscriptionTier(models.Model):
    name = models.CharField(max_length=50, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    max_usage = models.IntegerField()
    
    class Meta:
        ordering = ['price']
    
    def __str__(self):
        return f"{self.name} (${self.price})"

class UserSubscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subscriptions')
    tier = models.ForeignKey(SubscriptionTier, on_delete=models.CASCADE)
    usage_left = models.IntegerField()
    is_active = models.BooleanField(default=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-subscribed_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.tier.name}"
