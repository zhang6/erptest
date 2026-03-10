import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const lineData = [
  { name: '1月', 合格率: 95, 目标: 98 },
  { name: '2月', 合格率: 96, 目标: 98 },
  { name: '3月', 合格率: 94, 目标: 98 },
  { name: '4月', 合格率: 97, 目标: 98 },
  { name: '5月', 合格率: 98, 目标: 98 },
  { name: '6月', 合格率: 99, 目标: 98 },
];

const pieData = [
  { name: '尺寸超差', value: 400 },
  { name: '表面划伤', value: 300 },
  { name: '材质不符', value: 300 },
  { name: '装配错误', value: 200 },
];
const COLORS = ['#ec5b13', '#3b82f6', '#10b981', '#f59e0b'];

export function QualityStats() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">质量统计分析</h1>
          <p className="text-sm text-slate-500 mt-1">监控产品质量趋势，分析不良原因</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
            <span className="material-symbols-outlined mr-2 text-sm">download</span>
            导出报告
          </button>
          <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
            <span className="material-symbols-outlined mr-2 text-sm">add</span>
            手动录入数据
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '本月检验批次', value: '1,204', trend: '+5.2%', up: true },
          { label: '综合合格率', value: '98.5%', trend: '+0.3%', up: true },
          { label: '异常处理率', value: '92.0%', trend: '-1.5%', up: false },
          { label: '客户投诉数', value: '3', trend: '-2', up: true },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <div className="mt-2 flex items-baseline justify-between">
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <span className={`text-xs font-medium flex items-center ${stat.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                <span className="material-symbols-outlined text-[14px] mr-0.5">
                  {stat.up ? 'trending_up' : 'trending_down'}
                </span>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">质量趋势分析</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} domain={[90, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '14px', fontWeight: 500 }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Line type="monotone" dataKey="合格率" stroke="#ec5b13" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="目标" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">不良原因分布</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '14px', fontWeight: 500 }}
                />
                <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProcessInspection() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">过程检验记录</h1>
          <p className="text-sm text-slate-500 mt-1">记录生产过程中的各项检验数据</p>
        </div>
        <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">add</span>
          新增检验
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input type="text" placeholder="搜索检验单号/批次/产品" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
          </div>
          <select className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]">
            <option value="">所有结果</option>
            <option value="合格">合格</option>
            <option value="不合格">不合格</option>
            <option value="让步接收">让步接收</option>
          </select>
          <input type="date" className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">检验单号</th>
                <th className="p-4">生产批次</th>
                <th className="p-4">产品名称</th>
                <th className="p-4">检验工序</th>
                <th className="p-4">检验员</th>
                <th className="p-4">检验时间</th>
                <th className="p-4">检验结果</th>
                <th className="p-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {[
                { id: 'INSP-20231024-001', batch: 'B20231024A', product: '高精度齿轮', process: '热处理', inspector: '张三', time: '2023-10-24 09:30', result: '合格' },
                { id: 'INSP-20231024-002', batch: 'B20231024B', product: '传动轴', process: '粗加工', inspector: '李四', time: '2023-10-24 10:15', result: '不合格' },
                { id: 'INSP-20231024-003', batch: 'B20231024C', product: '轴承座', process: '精加工', inspector: '王五', time: '2023-10-24 11:00', result: '合格' },
                { id: 'INSP-20231024-004', batch: 'B20231024A', product: '高精度齿轮', process: '表面处理', inspector: '赵六', time: '2023-10-24 14:20', result: '让步接收' },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-xs text-slate-900 font-medium">{item.id}</td>
                  <td className="p-4 text-slate-500 font-mono text-xs">{item.batch}</td>
                  <td className="p-4 text-slate-700 font-medium">{item.product}</td>
                  <td className="p-4 text-slate-700">{item.process}</td>
                  <td className="p-4 text-slate-700">{item.inspector}</td>
                  <td className="p-4 text-slate-500">{item.time}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.result === '合格' ? 'bg-emerald-100 text-emerald-800' : 
                      item.result === '不合格' ? 'bg-rose-100 text-rose-800' : 
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {item.result}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[#ec5b13] hover:text-[#d94f0f] font-medium text-xs transition-colors">查看详情</button>
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

export function QualityAnomaly() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">质量异常管理</h1>
          <p className="text-sm text-slate-500 mt-1">跟踪和处理生产过程中的质量异常</p>
        </div>
        <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">add</span>
          发起异常单
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">异常单号</th>
                <th className="p-4">发生时间</th>
                <th className="p-4">发现环节</th>
                <th className="p-4">异常描述</th>
                <th className="p-4">责任部门</th>
                <th className="p-4">处理状态</th>
                <th className="p-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {[
                { id: 'QA-202310-001', time: '2023-10-24 09:30', stage: '进料检验', desc: '原材料硬度不达标', dept: '采购部', status: '处理中' },
                { id: 'QA-202310-002', time: '2023-10-23 14:15', stage: '过程检验', desc: '尺寸超差0.02mm', dept: '生产部', status: '待处理' },
                { id: 'QA-202310-003', time: '2023-10-22 11:00', stage: '成品检验', desc: '表面划伤', dept: '装配部', status: '已结案' },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-xs text-slate-900 font-medium">{item.id}</td>
                  <td className="p-4 text-slate-500">{item.time}</td>
                  <td className="p-4 text-slate-700">{item.stage}</td>
                  <td className="p-4 text-slate-900 max-w-xs truncate" title={item.desc}>{item.desc}</td>
                  <td className="p-4 text-slate-700">{item.dept}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === '已结案' ? 'bg-emerald-100 text-emerald-800' : 
                      item.status === '待处理' ? 'bg-rose-100 text-rose-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[#ec5b13] hover:text-[#d94f0f] font-medium text-xs transition-colors">处理</button>
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
