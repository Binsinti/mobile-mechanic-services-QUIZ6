from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = [
        ('User', 'User'),
        ('Seller', 'Seller'),
        ('Admin', 'Admin'),
    ]
    
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]
    
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    phone_number = models.CharField(max_length=20, blank=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    location = models.CharField(max_length=255, blank=True)
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='User')
    merchant_id = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.role})"
