from django.db import models
from users.models import User

class ChatMessage(models.Model):
    MESSAGE_TYPES = [
        ('user', 'User'),
        ('bot', 'Bot'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_messages')
    message = models.TextField()
    message_type = models.CharField(max_length=10, choices=MESSAGE_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.message_type} - {self.created_at}"
