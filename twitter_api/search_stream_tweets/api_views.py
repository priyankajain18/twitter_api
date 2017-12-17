from rest_framework.views import APIView
from rest_framework.response import Response

from twitter import Twitter, OAuth
from django.conf import settings

class SearchTweets(APIView):
        """
        Search Tweets
        """
        def get(self, request):
                oauth = OAuth(settings.ACCESS_TOKEN, settings.ACCESS_TOKEN_SECRET, settings.CONSUMER_KEY, settings.CONSUMER_SECRET)

                # Initiate the connection to Twitter Search API
                twitter = Twitter(auth=oauth)

                tweets = ""
                query = request.GET.get("search", "")
                if query:
                        tweets = twitter.search.tweets(q=query, result_type='recent', lang='en')

                return Response({'success': True, 'tweets': tweets})