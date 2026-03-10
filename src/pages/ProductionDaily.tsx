import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { supabase } from '../lib/supabase';
import type { YieldReport } from '../types/database';

export function YieldReport() {
  const [reports, setReports] = useState<(YieldReport & { production_units?: { name: string } | null })[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase.from('yield_reports').select('*, production_units(name)').eq('report_date', date).order('product_name');
      setReports(data || []);
      setLoading(false);
    })();
  }, [date]);

  const calcRate = (a: number | null, b: number | null) => (a != null && b != null && b > 0 ? ((a / b) * 100).toFixed(1) + '%' : '-');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">产量日报</h1>
          <p className="text-sm text-slate-500 mt-1">记录当日产量、累计产量及计划完成率</p>
        </div>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13] shadow-sm" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">生产单位</th>
                <th className="p-4">产品名称</th>
                <th className="p-4 text-right">当日计划 (吨)</th>
                <th className="p-4 text-right">当日产量 (吨)</th>
                <th className="p-4 text-right">当日完成率</th>
                <th className="p-4 text-right">月度累计 (吨)</th>
                <th className="p-4 text-right">月度计划 (吨)</th>
                <th className="p-4 text-right">月度完成率</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {loading ? <tr><td colSpan={8} className="p-8 text-center text-slate-500">加载中...</td></tr> :
                reports.length === 0 ? <tr><td colSpan={8} className="p-8 text-center text-slate-500">暂无数据，请先初始化测试数据</td></tr> :
                reports.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">{(item.production_units as { name?: string })?.name || '-'}</td>
                  <td className="p-4 text-slate-700">{item.product_name || '-'}</td>
                  <td className="p-4 text-right font-mono text-slate-600">{item.daily_plan ?? '-'}</td>
                  <td className="p-4 text-right font-mono font-medium text-slate-900">{item.daily_actual ?? '-'}</td>
                  <td className="p-4 text-right font-mono">
                    <span className={parseFloat(calcRate(Number(item.daily_actual), Number(item.daily_plan))) >= 100 ? 'text-emerald-600 font-medium' : 'text-rose-600 font-medium'}>
                      {calcRate(Number(item.daily_actual), Number(item.daily_plan))}
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono text-slate-600">{item.month_actual ?? '-'}</td>
                  <td className="p-4 text-right font-mono text-slate-600">{item.month_plan ?? '-'}</td>
                  <td className="p-4 text-right font-mono text-slate-900 font-medium">{calcRate(Number(item.month_actual), Number(item.month_plan))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function ConsumptionStats() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">消耗统计</h1>
          <p className="text-sm text-slate-500 mt-1">统计原料消耗及水、电、风、气等能耗情况</p>
        </div>
        <div className="flex space-x-3">
          <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13] shadow-sm">
            <option value="today">今日</option>
            <option value="yesterday">昨日</option>
            <option value="this_week">本周</option>
            <option value="this_month">本月</option>
          </select>
          <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
            <span className="material-symbols-outlined mr-2 text-sm">add</span>
            填报消耗
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 原料消耗 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">原料消耗 (吨)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="p-3">原料名称</th>
                  <th className="p-3 text-right">计划消耗</th>
                  <th className="p-3 text-right">实际消耗</th>
                  <th className="p-3 text-right">差异</th>
                  <th className="p-3">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {[
                  { material: '天然橡胶(NR)', plan: 100, actual: 102, diff: '+2', status: '超耗' },
                  { material: '丁苯橡胶(SBR)', plan: 60, actual: 58, diff: '-2', status: '节约' },
                  { material: '炭黑(N330)', plan: 45, actual: 45, diff: '0', status: '正常' },
                  { material: '防老剂', plan: 5, actual: 5.2, diff: '+0.2', status: '超耗' },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-medium text-slate-900">{item.material}</td>
                    <td className="p-3 text-right font-mono text-slate-600">{item.plan}</td>
                    <td className="p-3 text-right font-mono text-slate-900">{item.actual}</td>
                    <td className="p-3 text-right font-mono">
                      <span className={item.diff.startsWith('+') ? 'text-rose-600' : item.diff.startsWith('-') ? 'text-emerald-600' : 'text-slate-500'}>
                        {item.diff}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        item.status === '节约' ? 'bg-emerald-100 text-emerald-800' : 
                        item.status === '超耗' ? 'bg-rose-100 text-rose-800' : 
                        'bg-slate-100 text-slate-800'
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

        {/* 能源消耗 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">能耗统计</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: '用电量', value: '12,450', unit: 'kWh', trend: '+2.1%', up: true, icon: 'bolt', color: 'text-amber-500', bg: 'bg-amber-50' },
              { name: '用水量', value: '320', unit: '吨', trend: '-1.5%', up: false, icon: 'water_drop', color: 'text-blue-500', bg: 'bg-blue-50' },
              { name: '用气量', value: '4,500', unit: 'm³', trend: '+0.5%', up: true, icon: 'air', color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { name: '压缩空气', value: '8,200', unit: 'm³', trend: '-0.2%', up: false, icon: 'toys', color: 'text-indigo-500', bg: 'bg-indigo-50' },
            ].map((energy, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-slate-100 bg-slate-50 flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${energy.bg} ${energy.color} mr-3`}>
                  <span className="material-symbols-outlined text-[20px]">{energy.icon}</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">{energy.name}</p>
                  <div className="flex items-baseline mt-0.5">
                    <p className="text-lg font-bold text-slate-900">{energy.value}</p>
                    <span className="text-xs text-slate-500 ml-1">{energy.unit}</span>
                  </div>
                  <span className={`text-[10px] font-medium flex items-center mt-1 ${energy.up ? 'text-rose-600' : 'text-emerald-600'}`}>
                    <span className="material-symbols-outlined text-[12px] mr-0.5">
                      {energy.up ? 'trending_up' : 'trending_down'}
                    </span>
                    {energy.trend} 较昨日
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CostAccounting() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">成本核算</h1>
          <p className="text-sm text-slate-500 mt-1">当日生产成本自动/半自动核算，分析成本构成</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
            <span className="material-symbols-outlined mr-2 text-sm">calculate</span>
            执行核算
          </button>
          <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
            <span className="material-symbols-outlined mr-2 text-sm">add</span>
            手动录入数据
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">单品成本核算明细</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="p-4">产品名称</th>
                  <th className="p-4 text-right">产量 (吨)</th>
                  <th className="p-4 text-right">原料成本 (元/吨)</th>
                  <th className="p-4 text-right">制造费用 (元/吨)</th>
                  <th className="p-4 text-right">人工成本 (元/吨)</th>
                  <th className="p-4 text-right">总单位成本 (元/吨)</th>
                  <th className="p-4 text-right">标准成本</th>
                  <th className="p-4 text-center">差异分析</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {[
                  { product: '天然橡胶混炼胶', yield: 125, material: 12500, mfg: 850, labor: 320, total: 13670, standard: 13500, diff: '+170' },
                  { product: '合成橡胶混炼胶', yield: 75, material: 9800, mfg: 900, labor: 350, total: 11050, standard: 11200, diff: '-150' },
                  { product: '特种橡胶混炼胶', yield: 52, material: 18500, mfg: 1200, labor: 450, total: 20150, standard: 20000, diff: '+150' },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{item.product}</td>
                    <td className="p-4 text-right font-mono text-slate-600">{item.yield}</td>
                    <td className="p-4 text-right font-mono text-slate-600">{item.material}</td>
                    <td className="p-4 text-right font-mono text-slate-600">{item.mfg}</td>
                    <td className="p-4 text-right font-mono text-slate-600">{item.labor}</td>
                    <td className="p-4 text-right font-mono font-bold text-slate-900">{item.total}</td>
                    <td className="p-4 text-right font-mono text-slate-500">{item.standard}</td>
                    <td className="p-4 text-center font-mono">
                      <span className={item.diff.startsWith('+') ? 'text-rose-600' : 'text-emerald-600'}>
                        {item.diff}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">成本构成分析</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: '原料成本', value: 85 },
                    { name: '制造费用', value: 10 },
                    { name: '人工成本', value: 5 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#ec5b13" />
                  <Cell fill="#3b82f6" />
                  <Cell fill="#10b981" />
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductionAnomalies() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">异常与质量</h1>
          <p className="text-sm text-slate-500 mt-1">记录生产事故、质量问题及其对产品质量的影响</p>
        </div>
        <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">add</span>
          记录异常
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">发生时间</th>
                <th className="p-4">异常类型</th>
                <th className="p-4">生产单位</th>
                <th className="p-4 w-1/3">异常描述</th>
                <th className="p-4 w-1/4">对质量/产量的影响</th>
                <th className="p-4">记录人</th>
                <th className="p-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {[
                { time: '08:30', type: '设备故障', unit: '炼胶一厂', desc: '2号密炼机冷却水管破裂，导致停机抢修。', impact: '影响产量约5吨，未造成质量问题。', reporter: '张班长' },
                { time: '11:15', type: '质量异常', unit: '炼胶二厂', desc: '抽检发现批次B20231024门尼粘度偏高。', impact: '该批次2吨胶料需返工处理，增加制造成本。', reporter: '李质检' },
                { time: '14:00', type: '原料异常', unit: '炼胶一厂', desc: '新批次炭黑杂质较多。', impact: '已隔离该批次原料，更换备用料，影响生产进度1小时。', reporter: '王班长' },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-500 font-mono text-xs">{item.time}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      item.type === '设备故障' ? 'bg-amber-100 text-amber-800' : 
                      item.type === '质量异常' ? 'bg-rose-100 text-rose-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-slate-900">{item.unit}</td>
                  <td className="p-4 text-slate-700 text-xs">{item.desc}</td>
                  <td className="p-4 text-slate-700 text-xs">{item.impact}</td>
                  <td className="p-4 text-slate-700">{item.reporter}</td>
                  <td className="p-4 text-right">
                    <button className="text-[#ec5b13] hover:text-[#d94f0f] font-medium text-xs transition-colors">处理跟进</button>
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

const summaryData = [
  { name: '10-20', 产量: 240, 计划: 250 },
  { name: '10-21', 产量: 255, 计划: 250 },
  { name: '10-22', 产量: 260, 计划: 250 },
  { name: '10-23', 产量: 245, 计划: 250 },
  { name: '10-24', 产量: 252, 计划: 250 },
];

export function SummaryAnalysis() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">上报与汇总分析</h1>
          <p className="text-sm text-slate-500 mt-1">系统自动汇总每日上报数据，提供多维度分析视图</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
            <span className="material-symbols-outlined mr-2 text-sm">download</span>
            导出综合报告
          </button>
          <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
            <span className="material-symbols-outlined mr-2 text-sm">edit_document</span>
            补充汇总数据
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 mb-1">今日总产量</h3>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-slate-900">252</span>
            <span className="text-sm text-slate-500 ml-1">吨</span>
          </div>
          <div className="mt-2 text-xs text-emerald-600 flex items-center font-medium">
            <span className="material-symbols-outlined text-[14px] mr-0.5">check_circle</span>
            完成率 100.8%
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 mb-1">今日总能耗折算</h3>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-slate-900">18.5</span>
            <span className="text-sm text-slate-500 ml-1">吨标煤</span>
          </div>
          <div className="mt-2 text-xs text-rose-600 flex items-center font-medium">
            <span className="material-symbols-outlined text-[14px] mr-0.5">warning</span>
            单位能耗偏高 2%
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 mb-1">今日异常记录</h3>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-slate-900">3</span>
            <span className="text-sm text-slate-500 ml-1">起</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center">
            设备 1 | 质量 1 | 原料 1
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4">近5日产量达成趋势</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={summaryData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
              <Line type="monotone" dataKey="产量" stroke="#ec5b13" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="计划" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
