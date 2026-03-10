import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { insertRow, updateRow } from '../lib/api';
import type { Employee } from '../types/database';

export function EmployeeList() {
  const [employees, setEmployees] = useState<(Employee & { deptName?: string })[]>([]);
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [form, setForm] = useState({ employee_no: '', name: '', department_id: '', position: '', phone: '', status: '正式' as Employee['status'], hire_date: '' });

  const load = async () => {
    setLoading(true);
    const { data: empData } = await supabase.from('employees').select('*').order('created_at', { ascending: false });
    const { data: depts } = await supabase.from('departments').select('id, name');
    setDepartments(depts || []);
    const deptMap: Record<string, string> = {};
    (depts || []).forEach((d: { id: string; name: string }) => { deptMap[d.id] = d.name; });
    const withDept = (empData || []).map((e: Employee) => ({ ...e, deptName: e.department_id ? deptMap[e.department_id] || '-' : '-' }));
    setEmployees(withDept);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = employees.filter(e => {
    const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.employee_no.toLowerCase().includes(search.toLowerCase()) || (e.phone || '').includes(search);
    const matchDept = !deptFilter || e.department_id === deptFilter;
    const matchStatus = !statusFilter || e.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const stats = {
    total: employees.filter(e => e.status !== '离职').length,
    hire: employees.filter(e => e.status !== '离职' && e.hire_date && new Date(e.hire_date).getMonth() === new Date().getMonth()).length,
    leave: employees.filter(e => e.status === '离职').length,
    trial: employees.filter(e => e.status === '试用').length,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...form, department_id: form.department_id || null, hire_date: form.hire_date || null };
      if (editing) {
        await updateRow('employees', editing.id, payload);
      } else {
        await insertRow('employees', payload as never);
      }
      setShowModal(false);
      setEditing(null);
      setForm({ employee_no: '', name: '', department_id: '', position: '', phone: '', status: '正式', hire_date: '' });
      load();
    } catch (err) {
      alert('操作失败: ' + (err as Error).message);
    }
  };

  const openEdit = (emp: Employee) => {
    setEditing(emp);
    setForm({
      employee_no: emp.employee_no,
      name: emp.name,
      department_id: emp.department_id || '',
      position: emp.position || '',
      phone: emp.phone || '',
      status: emp.status,
      hire_date: emp.hire_date || '',
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">人员信息管理</h1>
          <p className="text-sm text-slate-500 mt-1">管理企业员工基本信息、岗位及状态</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ employee_no: '', name: '', department_id: '', position: '', phone: '', status: '正式', hire_date: '' }); setShowModal(true); }} className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">add</span>新增员工
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '在职人数', value: stats.total.toLocaleString(), icon: 'groups', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '本月入职', value: stats.hire.toString(), icon: 'person_add', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: '本月离职', value: stats.leave.toString(), icon: 'person_remove', color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: '试用期', value: stats.trial.toString(), icon: 'hourglass_empty', color: 'text-amber-600', bg: 'bg-amber-50' },
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

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input type="text" placeholder="搜索姓名/工号/手机号" value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
        </div>
        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]">
          <option value="">所有部门</option>
          {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]">
          <option value="">所有状态</option>
          <option value="正式">正式</option>
          <option value="试用">试用</option>
          <option value="离职">离职</option>
        </select>
      </div>

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
              {loading ? <tr><td colSpan={8} className="p-8 text-center text-slate-500">加载中...</td></tr> :
                filtered.length === 0 ? <tr><td colSpan={8} className="p-8 text-center text-slate-500">暂无数据，请点击「初始化测试数据」或「新增员工」</td></tr> :
                filtered.map(emp => (
                  <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900 flex items-center">
                      <img src={`https://ui-avatars.com/api/?name=${emp.name}&background=random`} alt={emp.name} className="w-8 h-8 rounded-full mr-3" />
                      {emp.name}
                    </td>
                    <td className="p-4 text-slate-500 font-mono text-xs">{emp.employee_no}</td>
                    <td className="p-4 text-slate-700">{emp.deptName || '-'}</td>
                    <td className="p-4 text-slate-700">{emp.position || '-'}</td>
                    <td className="p-4 text-slate-500">{emp.phone || '-'}</td>
                    <td className="p-4 text-slate-500">{emp.hire_date || '-'}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${emp.status === '正式' ? 'bg-emerald-100 text-emerald-800' : emp.status === '试用' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'}`}>{emp.status}</span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => openEdit(emp)} className="text-slate-400 hover:text-[#ec5b13] transition-colors p-1">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
          <div>共 {filtered.length} 条记录</div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-slate-900 mb-4">{editing ? '编辑员工' : '新增员工'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">工号 *</label><input type="text" value={form.employee_no} onChange={e => setForm(f => ({ ...f, employee_no: e.target.value }))} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" disabled={!!editing} /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">姓名 *</label><input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">部门</label><select value={form.department_id} onChange={e => setForm(f => ({ ...f, department_id: e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"><option value="">请选择</option>{departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</select></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">岗位</label><input type="text" value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">手机号</label><input type="text" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">入职日期</label><input type="date" value={form.hire_date} onChange={e => setForm(f => ({ ...f, hire_date: e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
              </div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">状态</label><select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Employee['status'] }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"><option value="正式">正式</option><option value="试用">试用</option><option value="离职">离职</option></select></div>
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
