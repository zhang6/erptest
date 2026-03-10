<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 集团级经营管理+生产协同+任务督办+绩效考核一体化平台

## 功能模块

- **经营营销管理**：客户维度日报、质量对比、异常与协调、上报跟踪、月度/季度评估
- **生产调度指挥中心**：生产单位状态、生产日报填报、设备异常、调度指令
- **生产单位日报**：产量日报、消耗统计、成本核算、异常与质量、汇总分析
- **质量检验管理**：质量统计、过程检验、质量异常
- **任务中心**：任务发布、执行、督办
- **人力资源**：人员档案管理
- **绩效考核**：绩效评分、指标配置

## 本地运行

**前置条件：** Node.js 20+

1. 安装依赖：
   ```bash
   npm install
   ```
2. 配置 Supabase（复制 `.env.example` 为 `.env`，填入 Supabase URL 和 anon key）：
   ```bash
   cp .env.example .env
   # 编辑 .env，设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY
   ```
3. 启动开发环境：
   ```bash
   npm run dev
   ```
4. 首次使用：进入 **系统配置 → 基础设置**，点击「初始化测试数据」按钮，自动创建组织、部门、员工、客户、合同、生产单位、任务、绩效等测试数据。

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
