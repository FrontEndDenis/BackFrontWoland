from django import template
from django.template import Context, Template
register = template.Library()


def my_safe(value, current_filial):
    t = Template(value)
    c = Context({"current_filial": current_filial})
    text = t.render(c)
    return text

register.filter('my_safe', my_safe)
