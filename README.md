<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# ERP Test App

## 本地运行

**前置条件：** Node.js 20+

1. 安装依赖：
   ```bash
   npm install
   ```
2. 启动开发环境：
   ```bash
   npm run dev
   ```

## 生产构建

```bash
npm run build
```

构建产物位于 `dist/`。

## Docker 部署（推荐）

项目已包含多阶段 `Dockerfile`、Nginx SPA 路由配置、以及 `docker-compose.yml`，可直接用于服务器部署。

### 方式 A：单命令（docker run）

1) 构建镜像
```bash
docker build -t erptest:latest .
```

2) 启动容器
```bash
docker run -d --name erptest -p 8080:80 --restart unless-stopped erptest:latest
```

3) 更新发布
```bash
docker rm -f erptest
docker build -t erptest:latest .
docker run -d --name erptest -p 8080:80 --restart unless-stopped erptest:latest
```

访问：`http://<你的服务器IP>:8080`

### 方式 B：Compose（推荐线上）

1) 准备环境文件
```bash
cp deploy/env.production.example .env.production
# 按需修改端口 ERPPROJECT_PORT
```

2) 启动服务
```bash
docker compose --env-file .env.production up -d --build
```

3) 查看状态/日志
```bash
docker compose ps
docker compose logs -f erptest
```

4) 更新发布
```bash
git pull
docker compose --env-file .env.production up -d --build
```

5) 停止服务
```bash
docker compose down
```

## 反向代理（可选）

如果你使用 Nginx / Traefik / Caddy 作为入口网关，请将域名流量反向代理到容器外部端口（默认 `8080`）。
