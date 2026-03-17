from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import SellerApplication
from .serializers import SellerApplicationSerializer


class SubmitApplicationView(generics.CreateAPIView):
    serializer_class = SellerApplicationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        existing = SellerApplication.objects.filter(user=request.user, status='pending').exists()
        if existing:
            return Response({'detail': 'You already have a pending application.'}, status=status.HTTP_400_BAD_REQUEST)

        application = SellerApplication.objects.create(user=request.user)
        return Response(SellerApplicationSerializer(application).data, status=status.HTTP_201_CREATED)


class ListApplicationView(generics.ListAPIView):
    serializer_class = SellerApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'Admin':
            return SellerApplication.objects.all()
        return SellerApplication.objects.filter(user=self.request.user)


class ApproveApplicationView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        if request.user.role != 'Admin':
            return Response({'detail': 'Admin only endpoint.'}, status=status.HTTP_403_FORBIDDEN)

        merchant_id = request.data.get('merchant_id', '').strip()
        if not merchant_id:
            return Response({'merchant_id': 'merchant_id is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            application = SellerApplication.objects.get(pk=pk)
        except SellerApplication.DoesNotExist:
            return Response({'detail': 'Application not found.'}, status=status.HTTP_404_NOT_FOUND)

        application.status = 'approved'
        application.decline_reason = ''
        application.save(update_fields=['status', 'decline_reason', 'updated_at'])

        user = application.user
        user.role = 'Seller'
        user.merchant_id = merchant_id
        user.save(update_fields=['role', 'merchant_id'])

        return Response(SellerApplicationSerializer(application).data)


class DeclineApplicationView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        if request.user.role != 'Admin':
            return Response({'detail': 'Admin only endpoint.'}, status=status.HTTP_403_FORBIDDEN)

        reason = request.data.get('decline_reason', '').strip()
        if not reason:
            return Response({'decline_reason': 'decline_reason is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            application = SellerApplication.objects.get(pk=pk)
        except SellerApplication.DoesNotExist:
            return Response({'detail': 'Application not found.'}, status=status.HTTP_404_NOT_FOUND)

        application.status = 'declined'
        application.decline_reason = reason
        application.save(update_fields=['status', 'decline_reason', 'updated_at'])

        return Response(SellerApplicationSerializer(application).data)
