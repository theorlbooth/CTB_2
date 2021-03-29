from django.urls import path
from .views import SaleListView, SaleDetailView, LimitedSaleView

urlpatterns = [
    path('', SaleListView.as_view()),
    path('<int:pk>/', SaleDetailView.as_view()),
    path('lmt-view/', LimitedSaleView.as_view())
]
