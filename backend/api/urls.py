from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FlightViewSet, PlaceViewSet, TicketViewSet, WeekViewSet, PassengerViewSet, UserViewSet, login_view, register_view, logout_view, query

router = DefaultRouter()
router.register(r'flights', FlightViewSet)
router.register(r'places', PlaceViewSet)
router.register(r'tickets', TicketViewSet)
router.register(r'weeks', WeekViewSet)
router.register(r'passengers', PassengerViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path('login/', login_view, name='login'),
    # path('register/', register_view, name='register'),
    # path('logout/', logout_view, name='logout'),
    # path('query/<str:q>/', query, name='query'),
]
