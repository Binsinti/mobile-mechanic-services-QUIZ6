from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Service
from .serializers import ServiceSerializer


class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.select_related('seller').all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]


class ServiceDetailView(generics.RetrieveAPIView):
    queryset = Service.objects.select_related('seller').all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]


class SellerServiceManageView(generics.ListCreateAPIView):
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Service.objects.filter(seller=self.request.user)

    def create(self, request, *args, **kwargs):
        if request.user.role != 'Seller':
            return Response({'detail': 'Only approved sellers can add services.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(seller=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class SellerServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Service.objects.filter(seller=self.request.user)
