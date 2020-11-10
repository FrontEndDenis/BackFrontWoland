from .models import TextBlockUrl

def text_block_url(request):
    dop_text_block_url = TextBlockUrl.objects.filter(url=request.path, isHidden=False)
    text_block_url = dop_text_block_url.first()
    return locals()
