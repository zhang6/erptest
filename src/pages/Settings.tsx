import React, { useState } from 'react';
import { seedTestData } from '../lib/seed';

export function BasicSettings() {
  const [seedLoading, setSeedLoading] = useState(false);
  const [seedMsg, setSeedMsg] = useState('');

  const handleSeed = async () => {
    setSeedLoading(true);
    setSeedMsg('');
    const res = await seedTestData();
    setSeedMsg(res.message);
    setSeedLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">基础设置</h1>
          <p className="text-sm text-slate-500 mt-1">管理系统基本信息与全局参数</p>
        </div>
        <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
          保存配置
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h3 className="text-sm font-bold text-amber-900 mb-2">测试数据初始化</h3>
        <p className="text-sm text-amber-800 mb-3">首次使用或数据库为空时，可点击下方按钮初始化测试数据（组织、部门、员工、客户、合同、生产单位、任务、绩效等）。</p>
        <button onClick={handleSeed} disabled={seedLoading} className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          {seedLoading ? '初始化中...' : '初始化测试数据'}
        </button>
        {seedMsg && <p className="mt-2 text-sm text-amber-800">{seedMsg}</p>}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 max-w-3xl">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">系统名称</label>
            <input type="text" defaultValue="企业管理系统" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">企业全称</label>
            <input type="text" defaultValue="某某制造科技有限公司" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">系统Logo</label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined text-3xl">corporate_fare</span>
              </div>
              <button type="button" className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                上传新Logo
              </button>
              <span className="text-xs text-slate-500">支持 PNG, JPG 格式，建议尺寸 200x200px</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">默认时区</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]">
                <option value="Asia/Shanghai">(UTC+08:00) 北京，重庆，香港，乌鲁木齐</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">日期格式</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]">
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              </select>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-4">安全设置</h3>
            <div className="space-y-4">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#ec5b13] focus:ring-[#ec5b13]" />
                <span className="ml-2 text-sm text-slate-700">开启强制密码复杂度要求（包含大小写字母、数字及特殊字符）</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#ec5b13] focus:ring-[#ec5b13]" />
                <span className="ml-2 text-sm text-slate-700">开启登录设备异常提醒</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export function OrganizationSettings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">组织架构</h1>
          <p className="text-sm text-slate-500 mt-1">管理企业部门层级与编制</p>
        </div>
        <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">add</span>
          新增部门
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex">
        <div className="w-1/3 border-r border-slate-200 p-4 min-h-[500px]">
          <div className="relative mb-4">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
            <input type="text" placeholder="搜索部门..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
          </div>
          <ul className="space-y-1">
            <li>
              <div className="flex items-center px-2 py-2 bg-[#ec5b13]/10 text-[#ec5b13] rounded-lg cursor-pointer font-medium text-sm">
                <span className="material-symbols-outlined text-sm mr-2">domain</span>
                某某制造科技有限公司
              </div>
              <ul className="pl-6 mt-1 space-y-1">
                <li>
                  <div className="flex items-center px-2 py-2 hover:bg-slate-50 text-slate-700 rounded-lg cursor-pointer text-sm">
                    <span className="material-symbols-outlined text-sm mr-2 text-slate-400">folder</span>
                    总经办
                  </div>
                </li>
                <li>
                  <div className="flex items-center px-2 py-2 hover:bg-slate-50 text-slate-700 rounded-lg cursor-pointer text-sm">
                    <span className="material-symbols-outlined text-sm mr-2 text-slate-400">folder_open</span>
                    生产中心
                  </div>
                  <ul className="pl-6 mt-1 space-y-1">
                    <li>
                      <div className="flex items-center px-2 py-2 hover:bg-slate-50 text-slate-700 rounded-lg cursor-pointer text-sm">
                        <span className="material-symbols-outlined text-sm mr-2 text-slate-400">group</span>
                        炼胶一厂
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center px-2 py-2 hover:bg-slate-50 text-slate-700 rounded-lg cursor-pointer text-sm">
                        <span className="material-symbols-outlined text-sm mr-2 text-slate-400">group</span>
                        炼胶二厂
                      </div>
                    </li>
                  </ul>
                </li>
                <li>
                  <div className="flex items-center px-2 py-2 hover:bg-slate-50 text-slate-700 rounded-lg cursor-pointer text-sm">
                    <span className="material-symbols-outlined text-sm mr-2 text-slate-400">folder</span>
                    营销中心
                  </div>
                </li>
                <li>
                  <div className="flex items-center px-2 py-2 hover:bg-slate-50 text-slate-700 rounded-lg cursor-pointer text-sm">
                    <span className="material-symbols-outlined text-sm mr-2 text-slate-400">folder</span>
                    质量管理部
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="w-2/3 p-6 bg-slate-50/50">
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-4">部门详情 - 生产中心</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">部门名称</label>
                  <input type="text" defaultValue="生产中心" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">部门编码</label>
                  <input type="text" defaultValue="DEP-PROD-001" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">负责人</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]">
                    <option>王建国 (生产总监)</option>
                    <option>李大山 (副总监)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">编制人数</label>
                  <input type="number" defaultValue={150} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
                </div>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">取消</button>
                <button type="button" className="px-4 py-2 bg-[#ec5b13] text-white rounded-lg text-sm font-medium hover:bg-[#d94f0f] transition-colors">保存修改</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RoleSettings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">角色权限</h1>
          <p className="text-sm text-slate-500 mt-1">配置系统角色及对应的数据与功能权限</p>
        </div>
        <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">add</span>
          新建角色
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">角色名称</th>
                <th className="p-4">角色描述</th>
                <th className="p-4">关联用户数</th>
                <th className="p-4">状态</th>
                <th className="p-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {[
                { name: '超级管理员', desc: '拥有系统所有模块的最高权限', count: 2, status: '启用' },
                { name: '生产总监', desc: '生产运行、生产单位日报、质量管控的查看与审批权限', count: 3, status: '启用' },
                { name: '营销经理', desc: '营销管理模块的完全权限', count: 8, status: '启用' },
                { name: '车间操作员', desc: '生产日报填报、设备异常提报权限', count: 45, status: '启用' },
                { name: '实习生', desc: '仅基础查看权限', count: 0, status: '停用' },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">{item.name}</td>
                  <td className="p-4 text-slate-600">{item.desc}</td>
                  <td className="p-4 text-slate-600 font-mono">{item.count}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === '启用' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <button className="text-slate-500 hover:text-slate-900 font-medium text-xs transition-colors">权限配置</button>
                    <button className="text-[#ec5b13] hover:text-[#d94f0f] font-medium text-xs transition-colors">编辑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function OperationLogs() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">操作日志</h1>
          <p className="text-sm text-slate-500 mt-1">记录系统内所有用户的关键操作轨迹</p>
        </div>
        <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">download</span>
          导出日志
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center bg-slate-50/50">
          <input type="date" className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
          <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]">
            <option value="">所有模块</option>
            <option value="production">生产运行</option>
            <option value="marketing">营销管理</option>
            <option value="system">系统配置</option>
          </select>
          <div className="relative flex-1 min-w-[200px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
            <input type="text" placeholder="搜索操作人、IP或内容..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">操作时间</th>
                <th className="p-4">操作人</th>
                <th className="p-4">所属模块</th>
                <th className="p-4">操作内容</th>
                <th className="p-4">IP地址</th>
                <th className="p-4">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {[
                { time: '2023-10-24 14:23:05', user: '张三 (zhangsan)', module: '生产运行', action: '提交了【炼胶一厂】的生产日报', ip: '192.168.1.105', status: '成功' },
                { time: '2023-10-24 13:15:22', user: '李四 (lisi)', module: '营销管理', action: '修改了【山东重工集团】的客户资料', ip: '192.168.1.112', status: '成功' },
                { time: '2023-10-24 10:05:11', user: '王五 (wangwu)', module: '系统配置', action: '尝试删除【超级管理员】角色', ip: '10.0.0.55', status: '失败 (权限不足)' },
                { time: '2023-10-24 09:30:00', user: '系统管理员 (admin)', module: '系统登录', action: '账号密码登录系统', ip: '114.254.1.22', status: '成功' },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-500 font-mono text-xs">{item.time}</td>
                  <td className="p-4 font-medium text-slate-900">{item.user}</td>
                  <td className="p-4 text-slate-600">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">{item.module}</span>
                  </td>
                  <td className="p-4 text-slate-700">{item.action}</td>
                  <td className="p-4 text-slate-500 font-mono text-xs">{item.ip}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      item.status.includes('成功') ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
