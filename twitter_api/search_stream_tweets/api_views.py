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
                user = request.GET.get("user", "")
                description = request.GET.get("description", "")
                location = request.GET.get("location", "")

                if query:
                        tweets = twitter.search.tweets(q=query, lang='en', count=100)

                resulted_tweets = []
                for tweet in tweets["statuses"]:
                        if user or description or location:
                                if user and user in tweet["user"]["screen_name"]:
                                        resulted_tweets.append(tweet)
                                if description and description in tweet["text"]:
                                        resulted_tweets.append(tweet)
                                if location and location in tweet["user"]["location"]:
                                        resulted_tweets.append(tweet)
                        else:
                                resulted_tweets.append(tweet)

                return Response({'success': True, 'tweets': resulted_tweets})
