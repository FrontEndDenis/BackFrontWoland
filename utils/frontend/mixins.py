import pypugjs

from django import template
from django.template import TemplateSyntaxError
from django.template.base import kwarg_re, FilterExpression
from django.urls import reverse

register = template.Library()

mixins = {}
pypugjs.register_filter()


def register_mixin(name=''):
	def decorator(f):
		mixins[name] = f
	
	return decorator


@register_mixin(name='icon')
def icon(name, additional_class='', **kwargs):
	name = str(name)
	additional_class = str(additional_class)
	return "<svg class='svg-sprite-icon icon-{0} {1}'><use xlink:href='/static/images/svg/symbol/sprite.svg#{0}'></use></svg>".format(
		name,
		additional_class
	)

@register_mixin(name='url')
def url(view_name, *args, **kwargs):
	try:
		current_app = kwargs['context'].request.current_app
	except AttributeError:
		try:
			current_app = kwargs['context'].request.resolver_match.namespace
		except AttributeError:
			current_app = None
	return reverse(view_name, args=args, current_app=current_app)
@register.tag(name="__pypugjs_usekwacro")
def do_usemacro(parser, token):
	args = token.split_contents()[2:]
	clear_args = []
	args = []
	kwargs = {}
	asvar = None
	bits = token.split_contents()
	bits = bits[2:]
	if len(bits) >= 2 and bits[-2] == 'as':
		asvar = bits[-1]
		bits = bits[:-2]
	
	for arg in bits:
		if arg[-1] == ',':
			arg = arg[:-1]
		clear_args.append(arg)
	
	for bit in clear_args:
		match = kwarg_re.match(bit)
		if not match:
			raise TemplateSyntaxError("Malformed arguments to url tag")
		name, value = match.groups()
		if name:
			kwargs[name] = parser.compile_filter(value)
		elif (bit[0] == '\'' and bit[-1] == '\'') or (bit[0] == '\"' and bit[-1] == '\"'):
			args.append(bit[1:-1])
		else:
			args.append(parser.compile_filter(value))
	return UseMixin(token.split_contents()[1], args)


class UseMixin(template.Node):
	mixin_name = ''
	args = {}
	
	def __init__(self, macro, args):
		self.mixin_name = macro
		self.args = args
	
	def render(self, context):
		
		clear_args = []
		for arg in self.args:
			if isinstance(arg, FilterExpression):
				arg = arg.resolve(context)
			clear_args.append(arg)
		return mixins[self.mixin_name](*clear_args, context=context)
