import React from 'react';

export function UnitStatus() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">生产单位状态</h1>
          <p className="text-sm text-slate-500 mt-1">实时监控各生产车间的运行状态和任务进度</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
            <span className="material-symbols-outlined mr-2 text-sm">refresh</span>
            刷新数据
          </button>
          <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
            <span className="material-symbols-outlined mr-2 text-sm">add</span>
            手动录入数据
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: '冲压车间', manager: '王建国', status: '运行中', task: '汽车门板冲压', progress: 85, color: 'emerald' },
          { name: '焊接车间', manager: '李志强', status: '运行中', task: '底盘焊接总成', progress: 62, color: 'emerald' },
          { name: '涂装车间', manager: '张明', status: '设备异常', task: '车身底漆喷涂', progress: 30, color: 'rose' },
          { name: '总装车间', manager: '刘伟', status: '运行中', task: 'A型车总装', progress: 90, color: 'emerald' },
          { name: '注塑车间', manager: '陈东', status: '待料停机', task: '内饰件注塑', progress: 45, color: 'amber' },
          { name: '机加工车间', manager: '赵强', status: '运行中', task: '发动机缸体加工', progress: 78, color: 'emerald' },
        ].map((unit, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className={`h-2 w-full bg-${unit.color}-500`}></div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-bold text-slate-900">{unit.name}</h2>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${unit.color}-100 text-${unit.color}-800`}>
                  {unit.status}
                </span>
              </div>
              
              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-center text-sm">
                  <span className="material-symbols-outlined text-slate-400 text-[18px] mr-2">person</span>
                  <span className="text-slate-500 w-16">负责人:</span>
                  <span className="text-slate-900 font-medium">{unit.manager}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="material-symbols-outlined text-slate-400 text-[18px] mr-2">assignment</span>
                  <span className="text-slate-500 w-16">当前任务:</span>
                  <span className="text-slate-900 font-medium truncate" title={unit.task}>{unit.task}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-500 font-medium">任务进度</span>
                  <span className="text-slate-900 font-bold">{unit.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className={`bg-${unit.color}-500 h-2 rounded-full transition-all duration-500`} style={{ width: `${unit.progress}%` }}></div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-3 border-t border-slate-200 flex justify-between">
              <button className="text-xs font-medium text-slate-600 hover:text-[#ec5b13] transition-colors flex items-center">
                <span className="material-symbols-outlined text-[16px] mr-1">visibility</span>
                详情
              </button>
              <button className="text-xs font-medium text-slate-600 hover:text-[#ec5b13] transition-colors flex items-center">
                <span className="material-symbols-outlined text-[16px] mr-1">chat</span>
                联系负责人
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DailyReport() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">生产日报填报</h1>
          <p className="text-sm text-slate-500 mt-1">填报每日生产数据，用于统计分析和绩效考核</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">填报日期 <span className="text-rose-500">*</span></label>
              <input type="date" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">生产单位 <span className="text-rose-500">*</span></label>
              <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]">
                <option value="">请选择生产单位</option>
                <option value="冲压车间">冲压车间</option>
                <option value="焊接车间">焊接车间</option>
                <option value="涂装车间">涂装车间</option>
                <option value="总装车间">总装车间</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">班次 <span className="text-rose-500">*</span></label>
              <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]">
                <option value="早班">早班 (08:00 - 16:00)</option>
                <option value="中班">中班 (16:00 - 00:00)</option>
                <option value="晚班">晚班 (00:00 - 08:00)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">产品名称 <span className="text-rose-500">*</span></label>
              <input type="text" placeholder="请输入产品名称" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">计划产量 <span className="text-rose-500">*</span></label>
              <input type="number" placeholder="0" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">实际产量 <span className="text-rose-500">*</span></label>
              <input type="number" placeholder="0" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">不良品数</label>
              <input type="number" placeholder="0" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">异常工时 (小时)</label>
              <input type="number" step="0.5" placeholder="0.0" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">备注说明</label>
            <textarea rows={4} placeholder="请输入异常原因、设备故障等其他需要说明的情况" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13] resize-none"></textarea>
          </div>

          <div className="pt-4 flex justify-end space-x-3 border-t border-slate-100">
            <button type="button" className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors">
              保存草稿
            </button>
            <button type="submit" className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
              提交日报
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function EquipmentAnomaly() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">设备异常管理</h1>
          <p className="text-sm text-slate-500 mt-1">管理设备报修、维修进度及历史记录</p>
        </div>
        <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">build</span>
          设备报修
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '运行中设备', value: '156', icon: 'settings_suggest', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: '异常停机', value: '3', icon: 'warning', color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: '待维修', value: '5', icon: 'pending_actions', color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: '维修中', value: '2', icon: 'engineering', color: 'text-blue-600', bg: 'bg-blue-50' },
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

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">设备编号</th>
                <th className="p-4">设备名称</th>
                <th className="p-4">异常描述</th>
                <th className="p-4">报修时间</th>
                <th className="p-4">报修人</th>
                <th className="p-4">状态</th>
                <th className="p-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {[
                { id: 'EQ-0012', name: '数控车床A1', desc: '主轴异响，震动过大', time: '2023-10-24 08:15', reporter: '王师傅', status: '待维修' },
                { id: 'EQ-0045', name: '自动喷涂机器人', desc: '喷头堵塞', time: '2023-10-24 09:30', reporter: '李师傅', status: '维修中' },
                { id: 'EQ-0078', name: '100T冲床', desc: '液压系统漏油', time: '2023-10-23 14:20', reporter: '张师傅', status: '已修复' },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-xs text-slate-900 font-medium">{item.id}</td>
                  <td className="p-4 text-slate-700 font-medium">{item.name}</td>
                  <td className="p-4 text-slate-900 max-w-xs truncate" title={item.desc}>{item.desc}</td>
                  <td className="p-4 text-slate-500">{item.time}</td>
                  <td className="p-4 text-slate-700">{item.reporter}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === '已修复' ? 'bg-emerald-100 text-emerald-800' : 
                      item.status === '待维修' ? 'bg-rose-100 text-rose-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[#ec5b13] hover:text-[#d94f0f] font-medium text-xs transition-colors">派单</button>
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

export function DispatchCommand() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">调度指令管理</h1>
          <p className="text-sm text-slate-500 mt-1">下发和跟踪生产调度指令</p>
        </div>
        <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">send</span>
          下发指令
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">指令编号</th>
                <th className="p-4">生产订单</th>
                <th className="p-4">生产车间</th>
                <th className="p-4">计划开始</th>
                <th className="p-4">计划结束</th>
                <th className="p-4">下发人</th>
                <th className="p-4">状态</th>
                <th className="p-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {[
                { id: 'CMD-202310-001', order: 'PO-20231024-01', workshop: '冲压车间', start: '2023-10-25 08:00', end: '2023-10-26 18:00', issuer: '调度员张', status: '未开始' },
                { id: 'CMD-202310-002', order: 'PO-20231024-02', workshop: '焊接车间', start: '2023-10-24 08:00', end: '2023-10-25 18:00', issuer: '调度员李', status: '执行中' },
                { id: 'CMD-202310-003', order: 'PO-20231023-05', workshop: '总装车间', start: '2023-10-23 08:00', end: '2023-10-24 12:00', issuer: '调度员王', status: '已完成' },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-xs text-slate-900 font-medium">{item.id}</td>
                  <td className="p-4 text-slate-500 font-mono text-xs">{item.order}</td>
                  <td className="p-4 text-slate-700">{item.workshop}</td>
                  <td className="p-4 text-slate-500">{item.start}</td>
                  <td className="p-4 text-slate-500">{item.end}</td>
                  <td className="p-4 text-slate-700">{item.issuer}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === '已完成' ? 'bg-emerald-100 text-emerald-800' : 
                      item.status === '未开始' ? 'bg-slate-100 text-slate-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[#ec5b13] hover:text-[#d94f0f] font-medium text-xs transition-colors">详情</button>
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
