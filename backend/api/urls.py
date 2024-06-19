from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

# router = DefaultRouter()
# router.register(r'flights', FlightViewSet)
# router.register(r'places', PlaceViewSet)
# router.register(r'tickets', TicketViewSet)
# router.register(r'weeks', WeekViewSet)
# router.register(r'passengers', PassengerViewSet)
# router.register(r'users', UserViewSet)

urlpatterns = [
    # path('', include(router.urls)),
    path('login/', user_login, name='login'),
    path('register/', user_register, name='register'),
    path('logout/', user_logout, name='logout'),
    path('query/<str:q>/', query, name='query'), #TODO
    path('flights/',flight_search,name='flight_search'), #TODO

]
