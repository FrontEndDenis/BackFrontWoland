from django.template import Context, Template

from unisite.views import global_views
from .models import StaticText


def get_static_text(request, global_context, slug):
    try:
        global_context.update(global_views(request))
        html_static_text = Template(StaticText.objects.get(slug=slug).text).render(Context(global_context))
    except:
        html_static_text = ''
    return html_static_text
