import pypugjs

from django import template

register = template.Library()

mixins = {}
pypugjs.register_filter()


def register_mixin(name=''):
	def decorator(f):
		mixins[name] = f
	
	return decorator


@register_mixin(name='icon')
def icon(name, additional_class=''):
	name = str(name)
	additional_class = str(additional_class)
	return "<svg class='svg-sprite-icon icon-{0} {1}'><use xlink:href='/static/images/svg/symbol/sprite.svg#{0}'></use></svg>".format(
		name,
		additional_class
	)


@register.tag(name="__pypugjs_usekwacro")
def do_usemacro(parser, token):
	args = token.split_contents()[2:]
	clear_args = []
	for arg in args:
		if arg[-1] == ',':
			arg = arg[:-1]
		if (arg[0] == '\'' and arg[-1] == '\'') or (arg[0] == '\"' and arg[-1] == '\"'):
			arg = arg[1:-1]
		clear_args.append(arg)
	return UseMixin('icon', clear_args)


class UseMixin(template.Node):
	mixin_name = ''
	args = {}
	
	def __init__(self, macro, args):
		self.mixin_name = macro
		self.args = args
	
	def render(self, context):
		return mixins[self.mixin_name](*self.args)
