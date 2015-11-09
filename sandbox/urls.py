from django.views.generic import TemplateView
from django.conf.urls import patterns, url
from djgeojson.views import GeoJSONLayerView


urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name='sandbox/index.dtl'), name='home'),
)
