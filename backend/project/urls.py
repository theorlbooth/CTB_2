from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/beers/', include('backend.beers.urls')),
    path('api/sales/', include('backend.sales.urls')),
    path('api/auth/', include('backend.jwt_auth.urls'))
]
