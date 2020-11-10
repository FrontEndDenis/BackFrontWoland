from django.conf.urls import url
from django.contrib.auth.decorators import login_required

from .views import AdminMIndexView, AdminMImportView, AdminMImportInfoView

app_name = 'admin_m'
urlpatterns = [
    url(r'^$', login_required(AdminMIndexView.as_view(), login_url="/admin/login"), name='index'),
    url(r'^import/$', login_required(AdminMImportView.as_view(), login_url="/admin/login"), name='import'),
    url(r'^import/(?P<import_info_slug>[-\w]+)/$', login_required(AdminMImportInfoView.as_view(), login_url="/admin/login"), name='import_info'),
]
