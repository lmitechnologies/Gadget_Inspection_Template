python3 manage.py migrate
python3 manage.py init_db
python3 manage.py collectstatic --noinput
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('aisolutions', 'admin@fringeai.com', 'AISolutions!')" | python3 manage.py shell
gunicorn gadgetapp.wsgi:application --bind 0.0.0.0:8000