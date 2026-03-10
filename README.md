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

项目已包含多阶段 `Dockerfile` 和 Nginx SPA 路由配置，可直接部署。

### 1) 构建镜像

```bash
docker build -t erptest:latest .
```

### 2) 启动容器

```bash
docker run -d --name erptest -p 8080:80 erptest:latest
```

访问：`http://<你的服务器IP>:8080`

### 3) 更新发布

```bash
docker rm -f erptest
docker build -t erptest:latest .
docker run -d --name erptest -p 8080:80 erptest:latest
```

## 反向代理（可选）

如果你使用 Nginx / Traefik / Caddy 作为入口网关，请将域名流量反向代理到容器的 `8080` 端口。
