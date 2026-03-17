from django.contrib import admin
from .models import Order

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'buyer', 'service', 'paypal_transaction_id', 'price_paid', 'date_purchased']
    list_filter = ['date_purchased']
    search_fields = ['buyer__username', 'service__service_name', 'paypal_transaction_id']
    ordering = ['-date_purchased']
