from django.contrib import admin
from .models import SellerApplication

@admin.register(SellerApplication)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['user', 'status', 'created_at', 'updated_at']
    list_filter = ['status', 'created_at']
    search_fields = ['user__username', 'user__email', 'decline_reason']
    ordering = ['-created_at']
