from django.urls import path
from .views import Helloworld

urlpatterns = [
    path('hello-world/', Helloworld.as_view(), name='hello-world'),
]