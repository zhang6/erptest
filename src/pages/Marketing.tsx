import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function CustomerDailyReport() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">客户维度日报</h1>
          <p className="text-sm text-slate-500 mt-1">记录客户每日销量、回款、发运及实收情况</p>
        </div>
        <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">add</span>
          填报日报
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center">
          <input type="date" className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" defaultValue={new Date().toISOString().split('T')[0]} />
          <div className="relative flex-1 min-w-[200px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input type="text" placeholder="搜索客户名称" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">客户名称</th>
                <th className="p-4 text-right">销量 (吨)</th>
                <th className="p-4 text-right">回款金额 (万元)</th>
                <th className="p-4 text-right">发运车数</th>
                <th className="p-4 text-right">实收数量 (吨)</th>
                <th className="p-4 text-right">结算率</th>
                <th className="p-4 text-right">执行价格 (元/吨)</th>
                <th className="p-4 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {[
                { customer: '山东重工集团', sales: 1200, collection: 500, vehicles: 40, received: 1180, settlementRate: '95%', price: 4200 },
                { customer: '江苏机械制造', sales: 800, collection: 320, vehicles: 25, received: 800, settlementRate: '100%', price: 4250 },
                { customer: '浙江汽车配件', sales: 450, collection: 150, vehicles: 15, received: 445, settlementRate: '90%', price: 4300 },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">{item.customer}</td>
                  <td className="p-4 text-right font-mono text-slate-700">{item.sales}</td>
                  <td className="p-4 text-right font-mono text-emerald-600 font-medium">{item.collection}</td>
                  <td className="p-4 text-right font-mono text-slate-700">{item.vehicles}</td>
                  <td className="p-4 text-right font-mono text-slate-700">{item.received}</td>
                  <td className="p-4 text-right font-mono text-slate-700">{item.settlementRate}</td>
                  <td className="p-4 text-right font-mono text-slate-700">{item.price}</td>
                  <td className="p-4 text-center">
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

export function QualityCompare() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">质量对比</h1>
          <p className="text-sm text-slate-500 mt-1">对比合同约定质量标准与实际到货质量情况</p>
        </div>
        <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">add</span>
          新增对比记录
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">订单编号</th>
                <th className="p-4">客户名称</th>
                <th className="p-4">产品名称</th>
                <th className="p-4 w-1/4">合同约定质量标准</th>
                <th className="p-4 w-1/4">实际到货质量情况</th>
                <th className="p-4">状态</th>
                <th className="p-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {[
                { id: 'ORD-202310-001', customer: '山东重工集团', product: '高强度钢板', standard: '抗拉强度≥800MPa, 厚度公差±0.1mm', actual: '抗拉强度815MPa, 厚度公差±0.08mm', status: '达标' },
                { id: 'ORD-202310-002', customer: '江苏机械制造', product: '精密轴承钢', standard: '硬度HRC60-62, 表面无划伤', actual: '硬度HRC61, 表面轻微划伤(3处)', status: '异常' },
                { id: 'ORD-202310-003', customer: '浙江汽车配件', product: '冷轧卷板', standard: '屈服强度≥300MPa, 表面光洁', actual: '屈服强度310MPa, 表面光洁', status: '达标' },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-xs text-slate-900">{item.id}</td>
                  <td className="p-4 font-medium text-slate-900">{item.customer}</td>
                  <td className="p-4 text-slate-700">{item.product}</td>
                  <td className="p-4 text-slate-600 text-xs">{item.standard}</td>
                  <td className="p-4 text-slate-600 text-xs">{item.actual}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === '达标' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
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

export function AnomaliesCoordination() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">异常与协调</h1>
          <p className="text-sm text-slate-500 mt-1">记录区域问题、发运异常及需协调事项</p>
        </div>
        <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">add</span>
          提报异常
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">提报日期</th>
                <th className="p-4">区域/客户</th>
                <th className="p-4">异常类型</th>
                <th className="p-4 w-1/4">异常描述及影响</th>
                <th className="p-4 w-1/4">需协调事项</th>
                <th className="p-4">提报人</th>
                <th className="p-4">状态</th>
                <th className="p-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {[
                { date: '2023-10-24', region: '山东地区', type: '物流异常', desc: '受大雪天气影响，高速封路，预计发运延迟3天，影响本月销量约500吨。', coordination: '需协调物流部寻找备用路线或铁路运输方案。', reporter: '张三', status: '处理中' },
                { date: '2023-10-23', region: '江苏机械制造', type: '质量异常', desc: '客户反馈上一批次精密轴承钢表面有轻微划伤，要求退换货。', coordination: '需协调品管部前往现场确认，并协调生产部补发。', reporter: '李四', status: '待协调' },
                { date: '2023-10-20', region: '浙江地区', type: '价格波动', desc: '竞品大幅降价，导致我司本月订单流失约20%。', coordination: '需协调销售总监审批临时促销政策。', reporter: '王五', status: '已解决' },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-500 font-mono text-xs">{item.date}</td>
                  <td className="p-4 font-medium text-slate-900">{item.region}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      item.type === '物流异常' ? 'bg-amber-100 text-amber-800' : 
                      item.type === '质量异常' ? 'bg-rose-100 text-rose-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="p-4 text-slate-700 text-xs">{item.desc}</td>
                  <td className="p-4 text-slate-700 text-xs">{item.coordination}</td>
                  <td className="p-4 text-slate-700">{item.reporter}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === '已解决' ? 'bg-emerald-100 text-emerald-800' : 
                      item.status === '待协调' ? 'bg-rose-100 text-rose-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[#ec5b13] hover:text-[#d94f0f] font-medium text-xs transition-colors">跟进</button>
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

export function ReportingTracking() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">上报与跟踪</h1>
          <p className="text-sm text-slate-500 mt-1">业务员每日提交，领导实时查看、跟踪市场动态</p>
        </div>
        <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">add</span>
          手动录入数据
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {[
            { name: '张三', region: '华东大区', time: '今天 17:30', content: '今日拜访山东重工，确认下月订单意向1500吨。目前竞品A在当地有降价动作，建议我司关注。', status: '未阅' },
            { name: '李四', region: '华南大区', time: '今天 16:45', content: '顺利完成江苏机械制造的合同续签，执行价格上调2%。', status: '已阅' },
            { name: '王五', region: '华北大区', time: '昨天 18:10', content: '受环保限产影响，部分客户实收数量不及预期，正在协调库存发运。', status: '已批示' },
          ].map((report, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <img src={`https://ui-avatars.com/api/?name=${report.name}&background=random`} alt={report.name} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{report.name} <span className="text-xs font-normal text-slate-500 ml-2">{report.region}</span></h3>
                    <p className="text-xs text-slate-400 mt-0.5">{report.time}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  report.status === '未阅' ? 'bg-rose-100 text-rose-800' : 
                  report.status === '已批示' ? 'bg-emerald-100 text-emerald-800' : 
                  'bg-slate-100 text-slate-800'
                }`}>
                  {report.status}
                </span>
              </div>
              <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                {report.content}
              </p>
              <div className="mt-4 flex justify-end space-x-2">
                {report.status === '未阅' && (
                  <button className="text-sm text-slate-600 hover:text-slate-900 px-3 py-1.5 border border-slate-200 rounded-lg transition-colors">标为已阅</button>
                )}
                <button className="text-sm text-white bg-[#ec5b13] hover:bg-[#d94f0f] px-3 py-1.5 rounded-lg transition-colors shadow-sm">批示回复</button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-slate-900 mb-4">今日提交统计</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">华东大区 (8/10)</span>
                <span className="font-medium text-slate-900">80%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">华南大区 (12/12)</span>
                <span className="font-medium text-slate-900">100%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">华北大区 (3/8)</span>
                <span className="font-medium text-slate-900">37.5%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '37.5%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">西部大区 (0/5)</span>
                <span className="font-medium text-slate-900">0%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-rose-500 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 py-2 rounded-lg text-sm font-medium transition-colors">
            一键催交
          </button>
        </div>
      </div>
    </div>
  );
}

const rankingData = [
  { name: '张三', 业绩: 1200 },
  { name: '李四', 业绩: 980 },
  { name: '王五', 业绩: 850 },
  { name: '赵六', 业绩: 720 },
  { name: '孙七', 业绩: 650 },
];

export function MonthlyQuarterlyAssessment() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">月度/季度评估</h1>
          <p className="text-sm text-slate-500 mt-1">业绩排名、差旅费用统计、成本核算及综合评价</p>
        </div>
        <div className="flex space-x-3">
          <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13] shadow-sm">
            <option value="2023-10">2023年10月</option>
            <option value="2023-Q3">2023年Q3</option>
            <option value="2023-Q2">2023年Q2</option>
          </select>
          <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
            <span className="material-symbols-outlined mr-2 text-sm">add</span>
            手动录入数据
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 业绩排名 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">业绩排名 (万元)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rankingData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="业绩" fill="#ec5b13" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 差旅费用统计 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">差旅费用统计</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="p-3">业务员</th>
                  <th className="p-3 text-right">交通费 (元)</th>
                  <th className="p-3 text-right">住宿费 (元)</th>
                  <th className="p-3 text-right">招待费 (元)</th>
                  <th className="p-3 text-right">总计 (元)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {[
                  { name: '张三', transport: 3500, hotel: 2800, entertain: 4500, total: 10800 },
                  { name: '李四', transport: 2100, hotel: 1500, entertain: 3200, total: 6800 },
                  { name: '王五', transport: 4200, hotel: 3600, entertain: 5100, total: 12900 },
                  { name: '赵六', transport: 1800, hotel: 1200, entertain: 2000, total: 5000 },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-medium text-slate-900">{item.name}</td>
                    <td className="p-3 text-right font-mono text-slate-600">{item.transport}</td>
                    <td className="p-3 text-right font-mono text-slate-600">{item.hotel}</td>
                    <td className="p-3 text-right font-mono text-slate-600">{item.entertain}</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-900">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 单吨/单品销售成本核算 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">单吨销售成本核算</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="p-3">产品大类</th>
                  <th className="p-3 text-right">总销量 (吨)</th>
                  <th className="p-3 text-right">总销售费用 (万元)</th>
                  <th className="p-3 text-right">单吨成本 (元/吨)</th>
                  <th className="p-3">环比</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {[
                  { product: '高强度钢板', volume: 5000, cost: 25, unitCost: 50, trend: '-2.5%', up: false },
                  { product: '精密轴承钢', volume: 2000, cost: 16, unitCost: 80, trend: '+1.2%', up: true },
                  { product: '冷轧卷板', volume: 8000, cost: 32, unitCost: 40, trend: '-0.8%', up: false },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-medium text-slate-900">{item.product}</td>
                    <td className="p-3 text-right font-mono text-slate-600">{item.volume}</td>
                    <td className="p-3 text-right font-mono text-slate-600">{item.cost}</td>
                    <td className="p-3 text-right font-mono font-bold text-[#ec5b13]">{item.unitCost}</td>
                    <td className="p-3">
                      <span className={`text-xs font-medium flex items-center ${item.up ? 'text-rose-600' : 'text-emerald-600'}`}>
                        <span className="material-symbols-outlined text-[14px] mr-0.5">
                          {item.up ? 'trending_up' : 'trending_down'}
                        </span>
                        {item.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 经营绩效综合评价 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">经营绩效综合评价</h2>
          <div className="space-y-4">
            {[
              { name: '张三', score: 95, level: 'A+', comment: '业绩突出，大客户维护良好，差旅费控制合理。' },
              { name: '李四', score: 88, level: 'A', comment: '完成既定目标，新客户拓展有成效。' },
              { name: '王五', score: 76, level: 'B', comment: '业绩未达标，差旅费用偏高，需加强成本意识。' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-xl text-[#ec5b13] mr-4 flex-shrink-0">
                  {item.level}
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <h3 className="font-bold text-slate-900 mr-3">{item.name}</h3>
                    <span className="text-xs text-slate-500">综合得分: <span className="font-mono font-bold text-slate-700">{item.score}</span></span>
                  </div>
                  <p className="text-sm text-slate-600">{item.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
