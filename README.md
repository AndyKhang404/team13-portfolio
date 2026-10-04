# team13-portfolio
Static portfolio of team 13, made for CSC13008 Web App Development, class 24KTPM3 at HCMUS

## Members
|Student ID|Name|
|-|-|
|24127052|Phùng Bảo Khang|
|24127345|Nguyễn Minh Đức|
|24127388|Hy Huê Hưng|

## Local hosting

### Option 1: Manual installation with Nginx

#### 1. Install Nginx

**Using `apt` (Ubuntu / Debian):**
```sh
# Update package index
sudo apt update

# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx service to run on boot
sudo systemctl start nginx
sudo systemctl enable nginx

# Verify service status
sudo systemctl status nginx
```

**Using `dnf` (Fedora / RHEL / CentOS / Rocky Linux / AlmaLinux):**
```sh
# Update package repositories
sudo dnf check-update

# Install Nginx
sudo dnf install -y nginx

# Start and enable Nginx service to run on boot
sudo systemctl start nginx
sudo systemctl enable nginx

# Verify service status
sudo systemctl status nginx
```

*(Optional) Configure firewall to allow port 8080:*
- **UFW (Ubuntu/Debian):** `sudo ufw allow 8080/tcp`
- **Firewalld (Fedora/RHEL):** `sudo firewall-cmd --permanent --add-port=8080/tcp && sudo firewall-cmd --reload`

#### 2. Deploy Portfolio & Configuration

1. Copy the website assets (HTML, CSS, JS) to `/usr/share/nginx/html/`:
   ```sh
   sudo cp index.html member-*.html style.css script.js /usr/share/nginx/html/
   ```

2. Copy the Nginx configuration:
   ```sh
   sudo cp nginx.conf /etc/nginx/nginx.conf
   ```

3. Test configuration syntax and reload Nginx:
   ```sh
   sudo nginx -t
   sudo systemctl reload nginx
   ```

4. Access the site locally at `http://localhost:8080` (or `http://localhost:8080/health` to check the health endpoint).

---

### Option 2: Using Docker (recommended)
```sh
docker build -t team13-portfolio-img:1.0 .
# Replace 3000 below with your preferred port
docker run -d --name team13-portfolio -p 3000:8080 team13-portfolio-img:1.0
```

## Public hosting
We've published a [live demo](https://team13-portfolio.onrender.com) of our portfolio on Render.

If the link above doesn't work you can also try [this](https://team13-portfolio.andykhang404.workers.dev), which is hosted on Cloudflare
