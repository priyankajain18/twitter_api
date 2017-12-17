# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

def index(request):
    return render(request, 'search_stream_tweets/index.html')

def search(request):
	return render(request, 'search_stream_tweets/search_tweets.html')

def stream(request):
	return render(request, 'search_stream_tweets/stream_tweets.html')