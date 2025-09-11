# Nginx 설치 및 설정
sudo nano /etc/nginx/sites-available/resonos.conf

sudo rm /etc/nginx/sites-enabled/resonos.conf

sudo ln -s /etc/nginx/sites-available/resonos.conf /etc/nginx/sites-enabled/

sudo nginx -t

sudo chmod -R 755 /resonos/front/deploy


sudo systemctl restart nginx


