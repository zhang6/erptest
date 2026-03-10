import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { insertRow, updateRow } from '../lib/api';
import type { Contract } from '../types/database';

export function ContractList() {
  const [contracts, setContracts] = useState<(Contract & { customers?: { name: string } | null })[]>([]);
  const [customers, setCustomers] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Contract | null>(null);
  const [form, setForm] = useState({ contract_no: '', customer_id: '', product_name: '', quality_standard: '' });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('contracts').select('*, customers(name)').order('created_at', { ascending: false });
    setContracts(data || []);
    const { data: cust } = await supabase.from('customers').select('id, name').order('name');
    setCustomers(cust || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = contracts.filter(c =>
    !search || (c.contract_no || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.product_name || '').toLowerCase().includes(search.toLowerCase()) ||
    ((c.customers as { name?: string })?.name || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...form, customer_id: form.customer_id || null };
      if (editing) {
        await updateRow('contracts', editing.id, payload);
      } else {
        await insertRow('contracts', payload as never);
      }
      setShowModal(false);
      setEditing(null);
      setForm({ contract_no: '', customer_id: '', product_name: '', quality_standard: '' });
      load();
    } catch (err) {
      alert('操作失败: ' + (err as Error).message);
    }
  };

  const openEdit = (c: Contract) => {
    setEditing(c);
    setForm({
      contract_no: c.contract_no,
      customer_id: c.customer_id || '',
      product_name: c.product_name || '',
      quality_standard: c.quality_standard || '',
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">合同管理</h1>
          <p className="text-sm text-slate-500 mt-1">管理销售合同，供客户日报、质量对比等模块使用</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ contract_no: '', customer_id: '', product_name: '', quality_standard: '' }); setShowModal(true); }} className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">add</span>新增合同
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <div className="relative max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input type="text" placeholder="搜索合同编号/产品/客户" value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">合同编号</th>
                <th className="p-4">客户</th>
                <th className="p-4">产品名称</th>
                <th className="p-4 max-w-xs">质量标准</th>
                <th className="p-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {loading ? <tr><td colSpan={5} className="p-8 text-center text-slate-500">加载中...</td></tr> :
                filtered.length === 0 ? <tr><td colSpan={5} className="p-8 text-center text-slate-500">暂无数据，请先添加客户后点击「新增合同」</td></tr> :
                filtered.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono text-slate-900 font-medium">{c.contract_no}</td>
                    <td className="p-4 text-slate-700">{(c.customers as { name?: string })?.name || '-'}</td>
                    <td className="p-4 text-slate-700">{c.product_name || '-'}</td>
                    <td className="p-4 text-slate-500 text-xs max-w-xs truncate" title={c.quality_standard || ''}>{c.quality_standard || '-'}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => openEdit(c)} className="text-[#ec5b13] hover:text-[#d94f0f] font-medium text-xs transition-colors">编辑</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-slate-900 mb-4">{editing ? '编辑合同' : '新增合同'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">合同编号 *</label><input type="text" value={form.contract_no} onChange={e => setForm(f => ({ ...f, contract_no: e.target.value }))} required placeholder="如：ORD-202410-001" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" disabled={!!editing} /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">客户 *</label><select value={form.customer_id} onChange={e => setForm(f => ({ ...f, customer_id: e.target.value }))} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"><option value="">请选择客户</option>{customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">产品名称</label><input type="text" value={form.product_name} onChange={e => setForm(f => ({ ...f, product_name: e.target.value }))} placeholder="如：高强度钢板" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">质量标准</label><textarea value={form.quality_standard} onChange={e => setForm(f => ({ ...f, quality_standard: e.target.value }))} rows={3} placeholder="如：抗拉强度≥800MPa, 厚度公差±0.1mm" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm resize-none" /></div>
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
