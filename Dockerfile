FROM python:3.9-slim

WORKDIR /app
ADD requirements.txt ./

RUN pip install -r requirements.txt

CMD python /app/app.py

ADD app.py ./
ADD templates /app/templates
ADD static /app/static