from django.db import models
from django.utils import timezone
from users.models import User
from services.models import Service

class Order(models.Model):
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders', null=True, blank=True)
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='orders', null=True, blank=True)
    paypal_transaction_id = models.CharField(max_length=100, unique=True, blank=True, null=True)
    price_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    date_purchased = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['-date_purchased']
    
    def __str__(self):
        return f"Order {self.id} - {self.buyer.username} - {self.service.service_name}"
