from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'role', 'merchant_id', 'created_at']
    list_filter = ['role', 'created_at']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering = ['-created_at']
