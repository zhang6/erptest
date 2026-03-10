import React from 'react';

export function EmployeeList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">人员信息管理</h1>
          <p className="text-sm text-slate-500 mt-1">管理企业员工基本信息、岗位及状态</p>
        </div>
        <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">add</span>
          新增员工
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '在职人数', value: '1,245', icon: 'groups', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '本月入职', value: '32', icon: 'person_add', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: '本月离职', value: '8', icon: 'person_remove', color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: '试用期', value: '45', icon: 'hourglass_empty', color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color} mr-4`}>
              <span className="material-symbols-outlined">{stat.icon}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input type="text" placeholder="搜索姓名/工号/手机号" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13] transition-all" />
          </div>
        </div>
        <select className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]">
          <option value="">所有部门</option>
          <option value="研发部">研发部</option>
          <option value="销售部">销售部</option>
          <option value="生产部">生产部</option>
        </select>
        <select className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]">
          <option value="">所有状态</option>
          <option value="正式">正式</option>
          <option value="试用">试用</option>
          <option value="离职">离职</option>
        </select>
        <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
          <span className="material-symbols-outlined mr-2 text-sm">filter_list</span>
          筛选
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">姓名</th>
                <th className="p-4">工号</th>
                <th className="p-4">部门</th>
                <th className="p-4">岗位</th>
                <th className="p-4">手机号</th>
                <th className="p-4">入职时间</th>
                <th className="p-4">状态</th>
                <th className="p-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {[
                { name: '张三', id: 'EMP001', dept: '研发部', role: '前端工程师', phone: '13800138000', date: '2023-05-12', status: '正式' },
                { name: '李四', id: 'EMP002', dept: '产品部', role: '产品经理', phone: '13900139000', date: '2023-06-15', status: '正式' },
                { name: '王五', id: 'EMP003', dept: '销售部', role: '销售专员', phone: '13700137000', date: '2023-11-01', status: '试用' },
                { name: '赵六', id: 'EMP004', dept: '生产部', role: '车间主任', phone: '13600136000', date: '2021-03-10', status: '正式' },
                { name: '孙七', id: 'EMP005', dept: '人事部', role: 'HRBP', phone: '13500135000', date: '2022-08-22', status: '正式' },
              ].map((emp, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 flex items-center">
                    <img src={`https://ui-avatars.com/api/?name=${emp.name}&background=random`} alt={emp.name} className="w-8 h-8 rounded-full mr-3" />
                    {emp.name}
                  </td>
                  <td className="p-4 text-slate-500 font-mono text-xs">{emp.id}</td>
                  <td className="p-4 text-slate-700">{emp.dept}</td>
                  <td className="p-4 text-slate-700">{emp.role}</td>
                  <td className="p-4 text-slate-500">{emp.phone}</td>
                  <td className="p-4 text-slate-500">{emp.date}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      emp.status === '正式' ? 'bg-emerald-100 text-emerald-800' : 
                      emp.status === '试用' ? 'bg-amber-100 text-amber-800' : 
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-slate-400 hover:text-[#ec5b13] transition-colors p-1">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button className="text-slate-400 hover:text-rose-600 transition-colors p-1 ml-2">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
          <div>共 1,245 条记录</div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">上一页</button>
            <button className="px-3 py-1 bg-[#ec5b13] text-white rounded">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">2</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">3</button>
            <span className="px-2 py-1">...</span>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}
