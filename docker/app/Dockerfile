FROM python:3.7
ENV PYTHONUNBUFFERED=1

RUN apt update && apt install -y npm && npm i npm@latest gulp@latest -g && apt clean

RUN mkdir /app
RUN adduser --uid 1000 --gecos "" --shell /bin/sh --disabled-password me
RUN chown 1000:1000 /app
USER 1000:1000

WORKDIR /app
RUN python -m venv venv
COPY requirements.txt /app
RUN pip install -r requirements.txt

COPY --chown=me package.json package-lock.json /app/
RUN npm i

# front build and clear node_modules
COPY --chown=me frontend /app/frontend
COPY --chown=me static /app/static
COPY --chown=me gulpfile.js /app
RUN gulp build && rm -rf node_modules

COPY --chown=me . /app

CMD ["python3.7", "manage.py", "runserver", "0.0.0.0:8000"]