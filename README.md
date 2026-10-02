# team13-portfolio
Static portfolio of team 13, made for CSC13008 Web App Development, class 24KTPM3 at HCMUS

## Members
|Student ID|Name|
|-|-|
|24127052|Phùng Bảo Khang|
|24127345|Nguyễn Minh Đức|
|24127388|Hy Huê Hưng|

## Local hosting
Install [`nginx`](https://nginx.org/en/docs/install.html). Copy the html,css and js files to `/usr/share/nginx/html/` and `nginx.conf` to `/etc/nginx/nginx.conf`

Or if you prefer Docker:
```sh
docker build -t team13-portfolio-img:1.0 .
# Replace 3000 below with your preferred port
docker run -d --name team13-portfolio -p 3000:8080 team13-portfolio-img:1.0
```

## Public hosting
We've published a [live demo](https://team13-portfolio.onrender.com) of our portfolio on Render.

If the link above doesn't work you can also try [this](https://team13-portfolio.andykhang404.workers.dev), which is hosted on Cloudflare
