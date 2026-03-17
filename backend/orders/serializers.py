from rest_framework import serializers
from .models import Order
from services.serializers import ServiceSerializer


class OrderSerializer(serializers.ModelSerializer):
    service = ServiceSerializer(read_only=True)
    service_id = serializers.IntegerField(write_only=True)
    buyer_name = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id',
            'buyer',
            'buyer_name',
            'service',
            'service_id',
            'paypal_transaction_id',
            'price_paid',
            'date_purchased',
        ]
        read_only_fields = ['id', 'buyer', 'date_purchased']
    
    def get_buyer_name(self, obj):
        return f"{obj.buyer.first_name} {obj.buyer.last_name}".strip() or obj.buyer.username
