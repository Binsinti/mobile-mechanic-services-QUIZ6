from django.db import models
from users.models import User

class Service(models.Model):
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='services', limit_choices_to={'role': 'Seller'}, null=True, blank=True)
    service_name = models.CharField(max_length=200, default='')
    description = models.TextField(default='')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    duration_of_service = models.IntegerField(help_text="Duration in minutes", default=0)
    sample_image = models.ImageField(upload_to='services/', null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0, help_text="Rating out of 5")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.service_name} by {self.seller.username}"
