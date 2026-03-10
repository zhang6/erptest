import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: '1月', 产量: 4000, 销量: 2400 },
  { name: '2月', 产量: 3000, 销量: 1398 },
  { name: '3月', 产量: 2000, 销量: 9800 },
  { name: '4月', 产量: 2780, 销量: 3908 },
  { name: '5月', 产量: 1890, 销量: 4800 },
  { name: '6月', 产量: 2390, 销量: 3800 },
  { name: '7月', 产量: 3490, 销量: 4300 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">首页驾驶舱</h1>
          <p className="text-sm text-slate-500 mt-1">企业核心运营数据概览</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
            <span className="material-symbols-outlined mr-2 text-sm">download</span>
            导出报表
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: '本月总产量', value: '124,500', unit: '件', trend: '+12.5%', up: true, icon: 'precision_manufacturing', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '本月销售额', value: '¥8.45', unit: 'M', trend: '+5.2%', up: true, icon: 'payments', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: '设备完好率', value: '98.2', unit: '%', trend: '-0.5%', up: false, icon: 'build_circle', color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: '质量合格率', value: '99.5', unit: '%', trend: '+0.1%', up: true, icon: 'verified', color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <div className="mt-2 flex items-baseline">
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <span className="ml-1 text-sm font-medium text-slate-500">{stat.unit}</span>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`font-medium flex items-center ${stat.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                <span className="material-symbols-outlined text-[16px] mr-1">
                  {stat.up ? 'trending_up' : 'trending_down'}
                </span>
                {stat.trend}
              </span>
              <span className="ml-2 text-slate-400">较上月</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">产销趋势分析</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="产量" fill="#ec5b13" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="销量" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-900">待办任务</h2>
            <button className="text-sm text-[#ec5b13] hover:text-[#d94f0f] font-medium">查看全部</button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {[
              { title: '审核Q3绩效考核结果', time: '今天 14:00', type: '审批', color: 'rose' },
              { title: '参加生产调度会议', time: '今天 16:30', type: '会议', color: 'blue' },
              { title: '处理设备EQ-0012报修单', time: '明天 09:00', type: '工单', color: 'amber' },
              { title: '提交本月质量分析报告', time: '10-28 17:00', type: '报告', color: 'emerald' },
              { title: '客户A公司来访接待', time: '10-29 10:00', type: '接待', color: 'indigo' },
            ].map((task, idx) => (
              <div key={idx} className="flex items-start p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className={`w-2 h-2 mt-2 rounded-full bg-${task.color}-500 mr-3 flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate" title={task.title}>{task.title}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-slate-500">{task.time}</span>
                    <span className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-medium bg-${task.color}-50 text-${task.color}-700 border border-${task.color}-100`}>
                      {task.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
