import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { insertRow, updateRow } from '../lib/api';
import type { Customer } from '../types/database';

export function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [form, setForm] = useState({ name: '', region: '', contact_person: '', contact_phone: '' });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('customers').select('*').order('name');
    setCustomers(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = customers.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.region || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.contact_person || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateRow('customers', editing.id, form);
      } else {
        await insertRow('customers', form as never);
      }
      setShowModal(false);
      setEditing(null);
      setForm({ name: '', region: '', contact_person: '', contact_phone: '' });
      load();
    } catch (err) {
      alert('操作失败: ' + (err as Error).message);
    }
  };

  const openEdit = (c: Customer) => {
    setEditing(c);
    setForm({
      name: c.name,
      region: c.region || '',
      contact_person: c.contact_person || '',
      contact_phone: c.contact_phone || '',
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">客户管理</h1>
          <p className="text-sm text-slate-500 mt-1">管理客户基本信息，供日报、质量对比等模块使用</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ name: '', region: '', contact_person: '', contact_phone: '' }); setShowModal(true); }} className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">add</span>新增客户
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <div className="relative max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input type="text" placeholder="搜索客户名称/区域/联系人" value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">客户名称</th>
                <th className="p-4">所属区域</th>
                <th className="p-4">联系人</th>
                <th className="p-4">联系电话</th>
                <th className="p-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {loading ? <tr><td colSpan={5} className="p-8 text-center text-slate-500">加载中...</td></tr> :
                filtered.length === 0 ? <tr><td colSpan={5} className="p-8 text-center text-slate-500">暂无数据，请点击「新增客户」添加</td></tr> :
                filtered.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{c.name}</td>
                    <td className="p-4 text-slate-700">{c.region || '-'}</td>
                    <td className="p-4 text-slate-700">{c.contact_person || '-'}</td>
                    <td className="p-4 text-slate-500">{c.contact_phone || '-'}</td>
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
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">{editing ? '编辑客户' : '新增客户'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">客户名称 *</label><input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">所属区域</label><input type="text" value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))} placeholder="如：山东、华东" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">联系人</label><input type="text" value={form.contact_person} onChange={e => setForm(f => ({ ...f, contact_person: e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">联系电话</label><input type="text" value={form.contact_phone} onChange={e => setForm(f => ({ ...f, contact_phone: e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
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
