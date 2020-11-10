FROM python:3.7

RUN mkdir /app
RUN adduser --uid 1000 --gecos "" --shell /bin/sh --disabled-password me
RUN chown 1000:1000 /app
USER 1000:1000

ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt /app
RUN pip install -r requirements.txt
COPY . /app

CMD ["python3.7", "manage.py", "runserver", "0.0.0.0:8000"]