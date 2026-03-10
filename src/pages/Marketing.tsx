import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '../lib/supabase';
import { insertRow, updateRow } from '../lib/api';
import type { CustomerDailyReport, Customer, Contract, QualityCompare, MarketingAnomaly, Employee } from '../types/database';

export function CustomerDailyReport() {
  const [reports, setReports] = useState<(CustomerDailyReport & { customers?: { name: string } | null })[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<CustomerDailyReport | null>(null);
  const [form, setForm] = useState({ customer_id: '', sales_volume: 0, collection_amount: 0, shipment_vehicles: 0, received_quantity: 0, settlement_rate: 95, exec_price: 4200 });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('customer_daily_reports').select('*, customers(name)').eq('report_date', date).order('created_at', { ascending: false });
    setReports(data || []);
    const { data: cust } = await supabase.from('customers').select('*');
    setCustomers(cust || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [date]);

  const filtered = reports.filter(r => (r.customers as { name?: string })?.name?.toLowerCase().includes(search.toLowerCase()));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateRow('customer_daily_reports', editing.id, form);
      } else {
        await insertRow('customer_daily_reports', { report_date: date, ...form } as never);
      }
      setShowModal(false);
      setEditing(null);
      setForm({ customer_id: '', sales_volume: 0, collection_amount: 0, shipment_vehicles: 0, received_quantity: 0, settlement_rate: 95, exec_price: 4200 });
      load();
    } catch (err) {
      alert('操作失败: ' + (err as Error).message);
    }
  };

  const openEdit = (r: CustomerDailyReport) => {
    setEditing(r);
    setForm({
      customer_id: r.customer_id || '',
      sales_volume: Number(r.sales_volume) || 0,
      collection_amount: Number(r.collection_amount) || 0,
      shipment_vehicles: Number(r.shipment_vehicles) || 0,
      received_quantity: Number(r.received_quantity) || 0,
      settlement_rate: Number(r.settlement_rate) || 95,
      exec_price: Number(r.exec_price) || 4200,
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">客户维度日报</h1>
          <p className="text-sm text-slate-500 mt-1">记录客户每日销量、回款、发运及实收情况</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ customer_id: '', sales_volume: 0, collection_amount: 0, shipment_vehicles: 0, received_quantity: 0, settlement_rate: 95, exec_price: 4200 }); setShowModal(true); }} className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">add</span>填报日报
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center">
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
          <div className="relative flex-1 min-w-[200px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input type="text" placeholder="搜索客户名称" value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
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
              {loading ? (
                <tr><td colSpan={8} className="p-8 text-center text-slate-500">加载中...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="p-8 text-center text-slate-500">暂无数据，请点击「填报日报」添加</td></tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{(r.customers as { name?: string })?.name || '-'}</td>
                    <td className="p-4 text-right font-mono text-slate-700">{r.sales_volume}</td>
                    <td className="p-4 text-right font-mono text-emerald-600 font-medium">{r.collection_amount}</td>
                    <td className="p-4 text-right font-mono text-slate-700">{r.shipment_vehicles}</td>
                    <td className="p-4 text-right font-mono text-slate-700">{r.received_quantity}</td>
                    <td className="p-4 text-right font-mono text-slate-700">{r.settlement_rate != null ? r.settlement_rate + '%' : '-'}</td>
                    <td className="p-4 text-right font-mono text-slate-700">{r.exec_price ?? '-'}</td>
                    <td className="p-4 text-center">
                      <button onClick={() => openEdit(r)} className="text-[#ec5b13] hover:text-[#d94f0f] font-medium text-xs transition-colors">编辑</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-slate-900 mb-4">{editing ? '编辑日报' : '填报日报'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">客户</label>
                <select value={form.customer_id} onChange={e => setForm(f => ({ ...f, customer_id: e.target.value }))} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" disabled={!!editing}>
                  <option value="">请选择</option>
                  {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">销量(吨)</label><input type="number" value={form.sales_volume} onChange={e => setForm(f => ({ ...f, sales_volume: +e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">回款(万元)</label><input type="number" value={form.collection_amount} onChange={e => setForm(f => ({ ...f, collection_amount: +e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">发运车数</label><input type="number" value={form.shipment_vehicles} onChange={e => setForm(f => ({ ...f, shipment_vehicles: +e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">实收(吨)</label><input type="number" value={form.received_quantity} onChange={e => setForm(f => ({ ...f, received_quantity: +e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">结算率(%)</label><input type="number" value={form.settlement_rate} onChange={e => setForm(f => ({ ...f, settlement_rate: +e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">执行价格</label><input type="number" value={form.exec_price} onChange={e => setForm(f => ({ ...f, exec_price: +e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => { setShowModal(false); setEditing(null); }} className="px-4 py-2 border border-slate-200 rounded-lg text-sm">取消</button>
                <button type="submit" className="px-4 py-2 bg-[#ec5b13] text-white rounded-lg text-sm">保存</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export function QualityCompare() {
  const [list, setList] = useState<(QualityCompare & { contracts?: Contract & { customers?: { name: string } } | null })[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<QualityCompare | null>(null);
  const [contracts, setContracts] = useState<(Contract & { customers?: { name: string } })[]>([]);
  const [form, setForm] = useState({ contract_id: '', contract_standard: '', actual_quality: '', status: '达标' as '达标' | '异常' });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('quality_compares').select('*, contracts(contract_no, product_name, quality_standard, customers(name))').order('created_at', { ascending: false });
    setList(data || []);
    const { data: c } = await supabase.from('contracts').select('*, customers(name)');
    setContracts(c || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateRow('quality_compares', editing.id, form);
      } else {
        await insertRow('quality_compares', form as never);
      }
      setShowModal(false);
      setEditing(null);
      load();
    } catch (err) {
      alert('操作失败: ' + (err as Error).message);
    }
  };

  const openEdit = (q: QualityCompare) => {
    setEditing(q);
    setForm({ contract_id: q.contract_id || '', contract_standard: q.contract_standard || '', actual_quality: q.actual_quality || '', status: q.status });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">质量对比</h1>
          <p className="text-sm text-slate-500 mt-1">对比合同约定质量标准与实际到货质量情况</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ contract_id: '', contract_standard: '', actual_quality: '', status: '达标' }); setShowModal(true); }} className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">add</span>新增对比记录
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
              {loading ? <tr><td colSpan={7} className="p-8 text-center text-slate-500">加载中...</td></tr> :
                list.length === 0 ? <tr><td colSpan={7} className="p-8 text-center text-slate-500">暂无数据</td></tr> :
                list.map(item => {
                  const c = item.contracts as Contract & { customers?: { name: string } } | undefined;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-mono text-xs text-slate-900">{c?.contract_no || '-'}</td>
                      <td className="p-4 font-medium text-slate-900">{c?.customers?.name || '-'}</td>
                      <td className="p-4 text-slate-700">{c?.product_name || '-'}</td>
                      <td className="p-4 text-slate-600 text-xs">{item.contract_standard || '-'}</td>
                      <td className="p-4 text-slate-600 text-xs">{item.actual_quality || '-'}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === '达标' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{item.status}</span>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => openEdit(item)} className="text-[#ec5b13] hover:text-[#d94f0f] font-medium text-xs transition-colors">详情</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">{editing ? '编辑对比' : '新增对比'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">合同</label>
                <select value={form.contract_id} onChange={e => setForm(f => ({ ...f, contract_id: e.target.value }))} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" disabled={!!editing}>
                  <option value="">请选择</option>
                  {contracts.map(c => <option key={c.id} value={c.id}>{c.contract_no} - {c.product_name}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">合同约定标准</label><textarea value={form.contract_standard} onChange={e => setForm(f => ({ ...f, contract_standard: e.target.value }))} rows={2} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">实际到货质量</label><textarea value={form.actual_quality} onChange={e => setForm(f => ({ ...f, actual_quality: e.target.value }))} rows={2} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">状态</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as '达标' | '异常' }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                  <option value="达标">达标</option><option value="异常">异常</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => { setShowModal(false); setEditing(null); }} className="px-4 py-2 border border-slate-200 rounded-lg text-sm">取消</button>
                <button type="submit" className="px-4 py-2 bg-[#ec5b13] text-white rounded-lg text-sm">保存</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export function AnomaliesCoordination() {
  const [list, setList] = useState<(MarketingAnomaly & { employees?: { name: string } | null })[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<MarketingAnomaly | null>(null);
  const [form, setForm] = useState({ report_date: new Date().toISOString().split('T')[0], region_customer: '', anomaly_type: '物流异常', description: '', coordination_needs: '', status: '待处理' as '待处理' | '处理中' | '已解决' });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('marketing_anomalies').select('*, employees(name)').order('created_at', { ascending: false });
    setList(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateRow('marketing_anomalies', editing.id, form);
      } else {
        await insertRow('marketing_anomalies', form as never);
      }
      setShowModal(false);
      setEditing(null);
      load();
    } catch (err) {
      alert('操作失败: ' + (err as Error).message);
    }
  };

  const statusMap: Record<string, string> = { '待处理': '待协调', '处理中': '处理中', '已解决': '已解决' };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">异常与协调</h1>
          <p className="text-sm text-slate-500 mt-1">记录区域问题、发运异常及需协调事项</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ report_date: new Date().toISOString().split('T')[0], region_customer: '', anomaly_type: '物流异常', description: '', coordination_needs: '', status: '待处理' }); setShowModal(true); }} className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">add</span>提报异常
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
              {loading ? <tr><td colSpan={8} className="p-8 text-center text-slate-500">加载中...</td></tr> :
                list.length === 0 ? <tr><td colSpan={8} className="p-8 text-center text-slate-500">暂无数据</td></tr> :
                list.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-slate-500 font-mono text-xs">{item.report_date}</td>
                    <td className="p-4 font-medium text-slate-900">{item.region_customer || '-'}</td>
                    <td className="p-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">{item.anomaly_type || '-'}</span></td>
                    <td className="p-4 text-slate-700 text-xs">{item.description || '-'}</td>
                    <td className="p-4 text-slate-700 text-xs">{item.coordination_needs || '-'}</td>
                    <td className="p-4 text-slate-700">{(item.employees as { name?: string })?.name || '-'}</td>
                    <td className="p-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === '已解决' ? 'bg-emerald-100 text-emerald-800' : item.status === '待处理' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'}`}>{statusMap[item.status] || item.status}</span></td>
                    <td className="p-4 text-right"><button onClick={() => { setEditing(item); setForm({ report_date: item.report_date, region_customer: item.region_customer || '', anomaly_type: item.anomaly_type || '物流异常', description: item.description || '', coordination_needs: item.coordination_needs || '', status: item.status }); setShowModal(true); }} className="text-[#ec5b13] hover:text-[#d94f0f] font-medium text-xs transition-colors">跟进</button></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-slate-900 mb-4">{editing ? '编辑异常' : '提报异常'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">日期</label><input type="date" value={form.report_date} onChange={e => setForm(f => ({ ...f, report_date: e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">异常类型</label><select value={form.anomaly_type} onChange={e => setForm(f => ({ ...f, anomaly_type: e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"><option value="物流异常">物流异常</option><option value="质量异常">质量异常</option><option value="价格波动">价格波动</option></select></div>
              </div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">区域/客户</label><input type="text" value={form.region_customer} onChange={e => setForm(f => ({ ...f, region_customer: e.target.value }))} placeholder="如：山东地区" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">异常描述</label><textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">需协调事项</label><textarea value={form.coordination_needs} onChange={e => setForm(f => ({ ...f, coordination_needs: e.target.value }))} rows={2} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
              {editing && <div><label className="block text-sm font-medium text-slate-700 mb-1">状态</label><select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as '待处理' | '处理中' | '已解决' }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"><option value="待处理">待处理</option><option value="处理中">处理中</option><option value="已解决">已解决</option></select></div>}
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => { setShowModal(false); setEditing(null); }} className="px-4 py-2 border border-slate-200 rounded-lg text-sm">取消</button>
                <button type="submit" className="px-4 py-2 bg-[#ec5b13] text-white rounded-lg text-sm">保存</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export function ReportingTracking() {
  const [reports, setReports] = useState<CustomerDailyReport[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data } = await supabase.from('customer_daily_reports').select('*, customers(name), employees(name)').gte('report_date', today).lte('report_date', today).order('created_at', { ascending: false });
      setReports(data || []);
      setLoading(false);
    })();
  }, []);

  const displayData = [
    { name: '张三', region: '华东大区', time: '今天 17:30', content: '今日拜访山东重工，确认下月订单意向1500吨。目前竞品A在当地有降价动作，建议我司关注。', status: '未阅' },
    { name: '李四', region: '华南大区', time: '今天 16:45', content: '顺利完成江苏机械制造的合同续签，执行价格上调2%。', status: '已阅' },
    { name: '王五', region: '华北大区', time: '昨天 18:10', content: '受环保限产影响，部分客户实收数量不及预期，正在协调库存发运。', status: '已批示' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">上报与跟踪</h1>
          <p className="text-sm text-slate-500 mt-1">业务员每日提交，领导实时查看、跟踪市场动态</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {displayData.map((report, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <img src={`https://ui-avatars.com/api/?name=${report.name}&background=random`} alt={report.name} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{report.name} <span className="text-xs font-normal text-slate-500 ml-2">{report.region}</span></h3>
                    <p className="text-xs text-slate-400 mt-0.5">{report.time}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${report.status === '未阅' ? 'bg-rose-100 text-rose-800' : report.status === '已批示' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}`}>{report.status}</span>
              </div>
              <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">{report.content}</p>
              <div className="mt-4 flex justify-end space-x-2">
                {report.status === '未阅' && <button className="text-sm text-slate-600 hover:text-slate-900 px-3 py-1.5 border border-slate-200 rounded-lg transition-colors">标为已阅</button>}
                <button className="text-sm text-white bg-[#ec5b13] hover:bg-[#d94f0f] px-3 py-1.5 rounded-lg transition-colors shadow-sm">批示回复</button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-slate-900 mb-4">今日提交统计</h2>
          <div className="space-y-4">
            {[{ label: '华东大区 (8/10)', pct: 80 }, { label: '华南大区 (12/12)', pct: 100 }, { label: '华北大区 (3/8)', pct: 37.5 }, { label: '西部大区 (0/5)', pct: 0 }].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1"><span className="text-slate-600">{item.label}</span><span className="font-medium text-slate-900">{item.pct}%</span></div>
                <div className="w-full bg-slate-100 rounded-full h-2"><div className={`h-2 rounded-full ${item.pct >= 80 ? 'bg-emerald-500' : item.pct >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${item.pct}%` }}></div></div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 py-2 rounded-lg text-sm font-medium transition-colors">一键催交</button>
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
  const [period, setPeriod] = useState('2024-10');
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">月度/季度评估</h1>
          <p className="text-sm text-slate-500 mt-1">业绩排名、差旅费用统计、成本核算及综合评价</p>
        </div>
        <select value={period} onChange={e => setPeriod(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13] shadow-sm">
          <option value="2024-10">2024年10月</option>
          <option value="2024-Q3">2024年Q3</option>
          <option value="2024-Q2">2024年Q2</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                {[{ name: '张三', transport: 3500, hotel: 2800, entertain: 4500, total: 10800 }, { name: '李四', transport: 2100, hotel: 1500, entertain: 3200, total: 6800 }, { name: '王五', transport: 4200, hotel: 3600, entertain: 5100, total: 12900 }, { name: '赵六', transport: 1800, hotel: 1200, entertain: 2000, total: 5000 }].map((item, idx) => (
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
                {[{ product: '高强度钢板', volume: 5000, cost: 25, unitCost: 50, trend: '-2.5%', up: false }, { product: '精密轴承钢', volume: 2000, cost: 16, unitCost: 80, trend: '+1.2%', up: true }, { product: '冷轧卷板', volume: 8000, cost: 32, unitCost: 40, trend: '-0.8%', up: false }].map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-medium text-slate-900">{item.product}</td>
                    <td className="p-3 text-right font-mono text-slate-600">{item.volume}</td>
                    <td className="p-3 text-right font-mono text-slate-600">{item.cost}</td>
                    <td className="p-3 text-right font-mono font-bold text-[#ec5b13]">{item.unitCost}</td>
                    <td className="p-3"><span className={`text-xs font-medium flex items-center ${item.up ? 'text-rose-600' : 'text-emerald-600'}`}><span className="material-symbols-outlined text-[14px] mr-0.5">{item.up ? 'trending_up' : 'trending_down'}</span>{item.trend}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">经营绩效综合评价</h2>
          <div className="space-y-4">
            {[{ name: '张三', score: 95, level: 'A+', comment: '业绩突出，大客户维护良好，差旅费控制合理。' }, { name: '李四', score: 88, level: 'A', comment: '完成既定目标，新客户拓展有成效。' }, { name: '王五', score: 76, level: 'B', comment: '业绩未达标，差旅费用偏高，需加强成本意识。' }].map((item, idx) => (
              <div key={idx} className="flex items-start p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-xl text-[#ec5b13] mr-4 flex-shrink-0">{item.level}</div>
                <div>
                  <div className="flex items-center mb-1"><h3 className="font-bold text-slate-900 mr-3">{item.name}</h3><span className="text-xs text-slate-500">综合得分: <span className="font-mono font-bold text-slate-700">{item.score}</span></span></div>
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
