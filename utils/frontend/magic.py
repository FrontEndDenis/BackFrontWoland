from django.db.models import Model


def add_url_generator_to_models():
	def get_attr(self, name):  # real signature unknown
		if name == 'url':
			if hasattr(self, 'generate_url'):
				return self.generate_url()
			return '/' + self.slug
		return object.__getattribute__(self, name)
	
	setattr(Model, '__getattr__', get_attr)
