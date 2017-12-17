from django.conf.urls import include, url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^search-tweets/', views.search, name='search'),
    url(r'^stream-tweets/', views.stream, name='stream'),
]