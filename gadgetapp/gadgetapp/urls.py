"""gadgetapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from inspection import views

handler400 = handler403 = handler404 = views.error_refresh_view
handler500 = views.error_500_refresh_view

urlpatterns = [
    path('', include('inspection.urls')),
    path('inspection/',include('inspection.urls')),
    path('admin/', admin.site.urls),
    path('api/configs/',include('configs.urls')),
    path('api/inspection/',include('inspection_events.urls')),
    path('api/runtime/',include('runtime.urls')),
]
