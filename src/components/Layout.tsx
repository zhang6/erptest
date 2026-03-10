import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const SIDEBAR_ITEMS = [
  {
    title: '核心业务',
    items: [
      { name: '首页驾驶舱', icon: 'dashboard', path: '/' },
      {
        name: '营销管理', icon: 'storefront', path: '/marketing',
        subItems: [
          { name: '客户管理', path: '/marketing/customers' },
          { name: '合同管理', path: '/marketing/contracts' },
          { name: '客户维度日报', path: '/marketing/customer-daily' },
          { name: '质量对比', path: '/marketing/quality-compare' },
          { name: '异常与协调', path: '/marketing/anomalies' },
          { name: '上报与跟踪', path: '/marketing/tracking' },
          { name: '月度/季度评估', path: '/marketing/assessment' },
        ]
      },
      {
        name: '生产运行', icon: 'precision_manufacturing', path: '/production',
        subItems: [
          { name: '生产单位状态', path: '/production/unit-status' },
          { name: '生产日报填报', path: '/production/daily-report' },
          { name: '设备异常管理', path: '/production/equipment-anomaly' },
          { name: '调度指令管理', path: '/production/dispatch-command' },
        ]
      },
      {
        name: '生产单位日报', icon: 'factory', path: '/production-daily',
        subItems: [
          { name: '产量日报', path: '/production-daily/yield' },
          { name: '消耗统计', path: '/production-daily/consumption' },
          { name: '成本核算', path: '/production-daily/cost' },
          { name: '异常与质量', path: '/production-daily/anomalies' },
          { name: '上报与汇总分析', path: '/production-daily/summary' },
        ]
      },
      {
        name: '质量管控', icon: 'verified', path: '/quality',
        subItems: [
          { name: '质量统计分析', path: '/quality/stats' },
          { name: '过程检验记录', path: '/quality/inspection' },
          { name: '质量异常管理', path: '/quality/anomaly' },
        ]
      },
      {
        name: '任务协作', icon: 'assignment', path: '/tasks',
        subItems: [
          { name: '任务中心', path: '/tasks/list' }
        ]
      },
    ]
  },
  {
    title: '职能管理',
    items: [
      {
        name: '人力资源', icon: 'group', path: '/hr',
        subItems: [
          { name: '人员信息管理', path: '/hr/employees' }
        ]
      },
      {
        name: '绩效考核', icon: 'assessment', path: '/performance',
        subItems: [
          { name: '绩效评分', path: '/performance/scoring' },
          { name: '绩效指标配置', path: '/performance/indicators' },
        ]
      },
      {
        name: '系统配置', icon: 'settings', path: '/settings',
        subItems: [
          { name: '基础设置', path: '/settings/basic' },
          { name: '组织架构', path: '/settings/organization' },
          { name: '角色权限', path: '/settings/roles' },
          { name: '操作日志', path: '/settings/logs' },
        ]
      },
    ]
  }
];

export default function Layout() {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    '/production': true,
    '/production-daily': true,
    '/quality': true,
    '/hr': true,
    '/performance': true,
    '/marketing': true,
    '/tasks': true,
    '/settings': true,
  });
  const location = useLocation();

  const toggleMenu = (path: string) => {
    setExpandedMenus(prev => ({ ...prev, [path]: !prev[path] }));
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-display overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-10 transition-all duration-300">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <span className="material-symbols-outlined text-[#ec5b13] text-3xl mr-3">corporate_fare</span>
          <span className="text-xl font-bold text-slate-800 tracking-tight">企业管理系统</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          {SIDEBAR_ITEMS.map((section, idx) => (
            <div key={idx} className="mb-6">
              <div className="px-6 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {section.title}
              </div>
              <nav className="space-y-1 px-3">
                {section.items.map(item => {
                  const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                  const isExpanded = expandedMenus[item.path];
                  const hasSubItems = item.subItems && item.subItems.length > 0;

                  return (
                    <div key={item.path}>
                      {hasSubItems ? (
                        <button
                          onClick={() => toggleMenu(item.path)}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                            isActive ? "text-[#ec5b13] bg-[#ec5b13]/10" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          )}
                        >
                          <div className="flex items-center">
                            <span className={cn("material-symbols-outlined mr-3 text-lg", isActive && "fill-1")}>
                              {item.icon}
                            </span>
                            {item.name}
                          </div>
                          <span className="material-symbols-outlined text-sm transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(180deg)' : '' }}>
                            expand_more
                          </span>
                        </button>
                      ) : (
                        <NavLink
                          to={item.path}
                          className={({ isActive }) => cn(
                            "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                            isActive ? "text-[#ec5b13] bg-[#ec5b13]/10" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          )}
                        >
                          <span className={cn("material-symbols-outlined mr-3 text-lg", location.pathname === item.path && "fill-1")}>
                            {item.icon}
                          </span>
                          {item.name}
                        </NavLink>
                      )}

                      {hasSubItems && isExpanded && (
                        <div className="mt-1 space-y-1 pl-10 pr-3">
                          {item.subItems.map(subItem => (
                            <NavLink
                              key={subItem.path}
                              to={subItem.path}
                              className={({ isActive }) => cn(
                                "block px-3 py-2 rounded-md text-sm transition-colors",
                                isActive ? "text-[#ec5b13] font-medium bg-white shadow-sm border border-slate-100" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                              )}
                            >
                              {subItem.name}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
            <img src="https://ui-avatars.com/api/?name=Admin&background=ec5b13&color=fff" alt="User" className="w-10 h-10 rounded-full" />
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-900">系统管理员</p>
              <p className="text-xs text-slate-500">admin@company.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 z-10">
          <div className="flex items-center text-slate-500">
            <span className="material-symbols-outlined mr-2">search</span>
            <input 
              type="text" 
              placeholder="搜索功能、数据..." 
              className="bg-transparent border-none focus:outline-none text-sm w-64 placeholder-slate-400"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
              <span className="material-symbols-outlined">help</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
