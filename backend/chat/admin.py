from django.contrib import admin
from .models import ChatMessage

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['user', 'message_type', 'created_at']
    list_filter = ['message_type', 'created_at']
    search_fields = ['user__username', 'message']
    ordering = ['-created_at']
