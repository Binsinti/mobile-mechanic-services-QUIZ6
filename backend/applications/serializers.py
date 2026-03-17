from rest_framework import serializers
from .models import SellerApplication


class SellerApplicationSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = SellerApplication
        fields = [
            'id',
            'user',
            'user_email',
            'user_name',
            'status',
            'decline_reason',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'user', 'status', 'decline_reason', 'created_at', 'updated_at']

    def get_user_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}".strip()
