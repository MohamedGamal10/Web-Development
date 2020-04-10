"""project_settings URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
#from CMM.views import Login, change , EMS_index , Erricson , Huawei , Nokia
from CMM.views import  change , EMS_index , Erricson , Huawei , Nokia , log , log_backend

app_name='CMM'
urlpatterns = [
    path('admin/', admin.site.urls),
   # path('',Login.as_view(),name='login'),
    path('log/',log,name='log'),
    path('',log_backend,name='log_backend'),
    path('change/', change.as_view(), name='change'),
    path('EMS_index/', EMS_index.as_view(), name='EMS_index'),
    path('EMS_index/Erricson/', Erricson.as_view(), name='Erricson'),
    path('EMS_index/Huawei/', Huawei.as_view(), name='Huawei'),
    path('EMS_index/Nokia/', Nokia.as_view(), name='change'),
    
]
