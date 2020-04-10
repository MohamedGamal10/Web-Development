# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout,login
from django.http import HttpRequest, HttpResponseRedirect
# Create your views here.
class Login(TemplateView):
    template_name = 'login.html'
class change(TemplateView):
    template_name = 'change.html'

class EMS_index(TemplateView):
    template_name = 'EMS_index.html'

class Erricson(TemplateView):
    template_name = 'Erricson.html'

class Huawei(TemplateView):
    template_name = 'Huawei.html'

class Nokia(TemplateView):
    template_name = 'Nokia.html'

def log(request):
    return render (request,'login.html',{})

def log_backend(request):
    u=request.POST['username']
    p=request.POST['password']
    re=authenticate(username=u,password=p)
    if re is not None:
        login(request,re)
        return HttpResponseRedirect('EMS_index/')
    else:
        return HttpResponseRedirect('/log')
