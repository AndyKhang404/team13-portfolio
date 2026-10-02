# Using unprivileged image for security
FROM nginxinc/nginx-unprivileged:alpine3.24-perl

COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:8080/health || exit 1
