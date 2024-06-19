from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'adm_flights', FlightViewSet)
router.register(r'adm_places', PlaceViewSet)
router.register(r'adm_tickets', TicketViewSet)
router.register(r'adm_weeks', WeekViewSet)
router.register(r'adm_passengers', PassengerViewSet)
router.register(r'adm_users', UserViewSet)

urlpatterns = [
    path('adm/', include(router.urls)),
    path('login/', user_login, name='login'),
    path('register/', user_register, name='register'),
    path('logout/', user_logout, name='logout'),
    path('query/<str:q>/', query, name='query'),
    path('flights/',flight_search,name='flight_search'), 
    path('review/',review,name='review'),
    path('book/',book,name='book'),
    path('payment/',payment,name='payment'),
    path('cancel/',cancel_ticket,name='cancel'),
    path('resume/',resume_booking,name='resume'),
    path('ticket/<str:ref>',ticket_data,name='ticket'),
    path('ticket/print/<str:ref>',get_ticket,name='ticket'), #FIXME
    path('flight/bookings/',bookings,name='bookings'),
]
