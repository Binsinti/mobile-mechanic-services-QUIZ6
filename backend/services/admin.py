from django.contrib import admin
from .models import Service

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['service_name', 'seller', 'price', 'duration_of_service', 'rating', 'created_at']
    list_filter = ['created_at', 'seller']
    search_fields = ['service_name', 'description', 'seller__email']
    ordering = ['-created_at']
