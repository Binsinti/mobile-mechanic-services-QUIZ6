from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Order
from .serializers import OrderSerializer
from services.models import Service


class CreateOrderView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        service_id = request.data.get('service_id')
        if not service_id:
            return Response({'service_id': 'service_id is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            service = Service.objects.get(id=service_id)
        except Service.DoesNotExist:
            return Response({'detail': 'Service not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(
            buyer=request.user,
            service=service,
            price_paid=service.price,
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserOrderHistoryView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(buyer=self.request.user).select_related('service', 'buyer')
