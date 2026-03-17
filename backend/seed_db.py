import os
import django
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from users.models import User
from services.models import Service
from subscriptions.models import SubscriptionTier, UserSubscription
from applications.models import SellerApplication
from orders.models import Order

def upsert_user(user_payload, password='Password123!'):
    user, created = User.objects.update_or_create(
        email=user_payload['email'],
        defaults=user_payload,
    )
    if created:
        user.set_password(password)
        user.save(update_fields=['password'])
        print(f"+ Created user: {user.username}")
    else:
        print(f"~ Updated user: {user.username}")
    return user


print('Seeding users...')
admin_user = upsert_user(
    {
        'username': 'platform_admin',
        'email': 'admin@mobilemechanic.local',
        'first_name': 'Morgan',
        'last_name': 'Valencia',
        'phone_number': '+639171000001',
        'location': 'Makati City, Metro Manila',
        'gender': 'Other',
        'role': 'Admin',
        'merchant_id': 'PLATFORM-MERCHANT-0001',
        'is_staff': True,
        'is_superuser': True,
    }
)

seller_alpha = upsert_user(
    {
        'username': 'nathan_reyes',
        'email': 'nathan.reyes@experts.local',
        'first_name': 'Nathan',
        'last_name': 'Reyes',
        'phone_number': '+639171000101',
        'location': 'Quezon City, Metro Manila',
        'gender': 'Male',
        'role': 'Seller',
        'merchant_id': 'SELLER-MERCHANT-0101',
    }
)

seller_bravo = upsert_user(
    {
        'username': 'bianca_santos',
        'email': 'bianca.santos@experts.local',
        'first_name': 'Bianca',
        'last_name': 'Santos',
        'phone_number': '+639171000102',
        'location': 'Pasig City, Metro Manila',
        'gender': 'Female',
        'role': 'Seller',
        'merchant_id': 'SELLER-MERCHANT-0102',
    }
)

buyer_jane = upsert_user(
    {
        'username': 'jane_dela_cruz',
        'email': 'jane.delacruz@users.local',
        'first_name': 'Jane',
        'last_name': 'Dela Cruz',
        'phone_number': '+639171000201',
        'location': 'Angeles City, Pampanga',
        'gender': 'Female',
        'role': 'User',
    }
)

buyer_daniel = upsert_user(
    {
        'username': 'daniel_mendoza',
        'email': 'daniel.mendoza@users.local',
        'first_name': 'Daniel',
        'last_name': 'Mendoza',
        'phone_number': '+639171000202',
        'location': 'San Fernando City, Pampanga',
        'gender': 'Male',
        'role': 'User',
    }
)


print('Seeding subscription tiers...')
tiers_payload = [
    {'name': 'Tier 1', 'price': Decimal('9.99'), 'max_usage': 3},
    {'name': 'Tier 2', 'price': Decimal('19.99'), 'max_usage': 5},
    {'name': 'Tier 3', 'price': Decimal('49.99'), 'max_usage': 10},
]

for tier_payload in tiers_payload:
    tier, created = SubscriptionTier.objects.update_or_create(
        name=tier_payload['name'],
        defaults=tier_payload,
    )
    action = '+' if created else '~'
    print(f"{action} Upserted tier: {tier.name}")

tier_2 = SubscriptionTier.objects.get(name='Tier 2')


print('Seeding services...')
services_payload = [
    {
        'seller': seller_alpha,
        'service_name': 'Emergency Battery Jumpstart',
        'description': 'On-site jumpstart and electrical quick-check for drained batteries.',
        'price': Decimal('39.99'),
        'duration_of_service': 25,
        'rating': Decimal('4.70'),
    },
    {
        'seller': seller_alpha,
        'service_name': 'Full Brake Inspection',
        'description': 'Comprehensive brake pad, rotor, and fluid condition assessment.',
        'price': Decimal('79.99'),
        'duration_of_service': 45,
        'rating': Decimal('4.85'),
    },
    {
        'seller': seller_alpha,
        'service_name': 'Mobile Oil Change Service',
        'description': 'On-demand oil and filter replacement at your preferred location.',
        'price': Decimal('49.99'),
        'duration_of_service': 35,
        'rating': Decimal('4.60'),
    },
    {
        'seller': seller_bravo,
        'service_name': 'Engine Diagnostic Scan',
        'description': 'OBD diagnostics with fault code analysis and action recommendations.',
        'price': Decimal('59.99'),
        'duration_of_service': 30,
        'rating': Decimal('4.75'),
    },
    {
        'seller': seller_bravo,
        'service_name': 'Tire Rotation and Pressure Check',
        'description': 'Cross-rotation with tire pressure balancing for safer handling.',
        'price': Decimal('44.99'),
        'duration_of_service': 30,
        'rating': Decimal('4.65'),
    },
    {
        'seller': seller_bravo,
        'service_name': 'Starter and Alternator Test',
        'description': 'Charging system performance test to prevent sudden no-start issues.',
        'price': Decimal('54.99'),
        'duration_of_service': 40,
        'rating': Decimal('4.72'),
    },
]

for service_payload in services_payload:
    service, created = Service.objects.update_or_create(
        seller=service_payload['seller'],
        service_name=service_payload['service_name'],
        defaults=service_payload,
    )
    action = '+' if created else '~'
    print(f"{action} Upserted service: {service.service_name}")


print('Seeding seller applications...')
application, created = SellerApplication.objects.update_or_create(
    user=buyer_daniel,
    defaults={'status': 'pending', 'decline_reason': None},
)
print(f"{'+' if created else '~'} Upserted seller application for: {buyer_daniel.username}")


print('Seeding subscriptions...')
subscription, created = UserSubscription.objects.update_or_create(
    user=buyer_jane,
    is_active=True,
    defaults={
        'tier': tier_2,
        'usage_left': tier_2.max_usage,
    },
)
print(f"{'+' if created else '~'} Upserted active subscription for: {buyer_jane.username}")


print('Seeding orders...')
service_for_order = Service.objects.filter(service_name='Full Brake Inspection').first()
if service_for_order:
    order, created = Order.objects.update_or_create(
        paypal_transaction_id='PAYPAL-TXN-20260318-0001',
        defaults={
            'buyer': buyer_jane,
            'service': service_for_order,
            'price_paid': service_for_order.price,
        },
    )
    print(f"{'+' if created else '~'} Upserted order: {order.paypal_transaction_id}")

print('\nDatabase seeding completed successfully with normalized dummy data.')
