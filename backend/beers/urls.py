from django.urls import path
from .views import BeerListView, BeerDetailView, BeerFullView

urlpatterns = [
    path('', BeerListView.as_view()),
    path('<int:pk>/', BeerDetailView.as_view()),
    path('all/', BeerFullView.as_view())
]
