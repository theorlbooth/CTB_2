from django.urls import path
from .views import SaleListView, SaleDetailView

urlpatterns = [
    path('', SaleListView.as_view()),
    path('<int:pk>/', SaleDetailView.as_view())
]
