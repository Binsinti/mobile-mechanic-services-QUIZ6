from rest_framework import serializers
from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    name_of_the_expert = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Service
        fields = [
            'id',
            'seller',
            'service_name',
            'description',
            'rating',
            'price',
            'duration_of_service',
            'sample_image',
            'name_of_the_expert',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'seller', 'rating', 'created_at', 'updated_at']

    def get_name_of_the_expert(self, obj):
        return f"{obj.seller.first_name} {obj.seller.last_name}".strip() or obj.seller.username
