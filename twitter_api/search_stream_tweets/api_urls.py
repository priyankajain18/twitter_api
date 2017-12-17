from django.conf.urls import url
from .api_views import SearchTweets

urlpatterns = [
    url(r'^search-tweets/', SearchTweets.as_view()),
]