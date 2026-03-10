import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { insertRow, updateRow } from '../lib/api';
import type { Task } from '../types/database';

const statusMap: Record<string, string> = { '未开始': '待处理', '执行中': '进行中', '已完成': '已完成', '超期': '超期' };
const statusToDb: Record<string, string> = { '待处理': '未开始', '进行中': '执行中', '已完成': '已完成', '超期': '超期' };

export function TaskList() {
  const [tasks, setTasks] = useState<(Task & { employees?: { name: string } | null })[]>([]);
  const [employees, setEmployees] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [form, setForm] = useState({ title: '', description: '', project: '', assignee_id: '', priority: '中' as '高' | '中' | '低', status: '未开始' as Task['status'], due_date: '' });

  const load = async () => {
    setLoading(true);
    const { data: taskData } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });
    const { data: emps } = await supabase.from('employees').select('id, name');
    setEmployees(emps || []);
    const empMap: Record<string, string> = {};
    (emps || []).forEach((e: { id: string; name: string }) => { empMap[e.id] = e.name; });
    const tasksWithNames = (taskData || []).map((t: Task) => ({ ...t, employees: t.assignee_id ? { name: empMap[t.assignee_id] || '-' } : null }));
    setTasks(tasksWithNames);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = tasks.filter(t => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || (t.project || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || statusToDb[statusFilter] === t.status;
    return matchSearch && matchStatus;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...form, assignee_id: form.assignee_id || null, due_date: form.due_date || null, creator_id: null };
      if (editing) {
        await updateRow('tasks', editing.id, payload);
      } else {
        await insertRow('tasks', payload as never);
      }
      setShowModal(false);
      setEditing(null);
      setForm({ title: '', description: '', project: '', assignee_id: '', priority: '中', status: '未开始', due_date: '' });
      load();
    } catch (err) {
      alert('操作失败: ' + (err as Error).message);
    }
  };

  const updateStatus = async (task: Task, newStatus: Task['status']) => {
    try {
      await updateRow('tasks', task.id, {
        status: newStatus,
        ...(newStatus === '已完成' ? { completed_at: new Date().toISOString() } : {}),
      });
      load();
    } catch (err) {
      alert('操作失败: ' + (err as Error).message);
    }
  };

  const openEdit = (t: Task) => {
    setEditing(t);
    setForm({
      title: t.title,
      description: t.description || '',
      project: t.project || '',
      assignee_id: t.assignee_id || '',
      priority: t.priority,
      status: t.status,
      due_date: t.due_date || '',
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">任务中心</h1>
          <p className="text-sm text-slate-500 mt-1">管理和跟踪团队协作任务</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ title: '', description: '', project: '', assignee_id: '', priority: '中', status: '未开始', due_date: '' }); setShowModal(true); }} className="bg-[#1d4fd7] hover:bg-[#153eb3] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">add</span>新建任务
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input type="text" placeholder="搜索任务名称/项目" value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4fd7]/20 focus:border-[#1d4fd7]" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4fd7]/20 focus:border-[#1d4fd7]">
            <option value="">所有状态</option>
            <option value="待处理">待处理</option>
            <option value="进行中">进行中</option>
            <option value="已完成">已完成</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">任务名称</th>
                <th className="p-4">所属项目</th>
                <th className="p-4">负责人</th>
                <th className="p-4">截止日期</th>
                <th className="p-4">优先级</th>
                <th className="p-4">状态</th>
                <th className="p-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {loading ? <tr><td colSpan={7} className="p-8 text-center text-slate-500">加载中...</td></tr> :
                filtered.length === 0 ? <tr><td colSpan={7} className="p-8 text-center text-slate-500">暂无数据，请点击「新建任务」添加</td></tr> :
                filtered.map(t => {
                  const owner = (t.employees as { name?: string })?.name || '-';
                  return (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-medium text-slate-900">{t.title}</td>
                      <td className="p-4 text-slate-700">{t.project || '-'}</td>
                      <td className="p-4 text-slate-700 flex items-center">
                        <img src={`https://ui-avatars.com/api/?name=${owner}&background=random`} alt={owner} className="w-6 h-6 rounded-full mr-2" />
                        {owner}
                      </td>
                      <td className="p-4 text-slate-500">{t.due_date || '-'}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${t.priority === '高' ? 'bg-rose-100 text-rose-800' : t.priority === '中' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>{t.priority}</span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${t.status === '已完成' ? 'bg-emerald-100 text-emerald-800' : t.status === '未开始' ? 'bg-slate-100 text-slate-800' : 'bg-blue-100 text-blue-800'}`}>{statusMap[t.status] || t.status}</span>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => openEdit(t)} className="text-[#1d4fd7] hover:text-[#153eb3] font-medium text-xs transition-colors mr-2">查看</button>
                        {t.status !== '已完成' && (
                          <button onClick={() => updateStatus(t, t.status === '未开始' ? '执行中' : '已完成')} className="text-emerald-600 hover:text-emerald-700 font-medium text-xs transition-colors">
                            {t.status === '未开始' ? '开始' : '完成'}
                          </button>
                        )}
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
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-slate-900 mb-4">{editing ? '编辑任务' : '新建任务'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">任务名称 *</label><input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">所属项目</label><input type="text" value={form.project} onChange={e => setForm(f => ({ ...f, project: e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">负责人</label><select value={form.assignee_id} onChange={e => setForm(f => ({ ...f, assignee_id: e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"><option value="">请选择</option>{employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}</select></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">优先级</label><select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value as '高' | '中' | '低' }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"><option value="高">高</option><option value="中">中</option><option value="低">低</option></select></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">截止日期</label><input type="date" value={form.due_date} onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
              </div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">描述</label><textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => { setShowModal(false); setEditing(null); }} className="px-4 py-2 border border-slate-200 rounded-lg text-sm">取消</button>
                <button type="submit" className="px-4 py-2 bg-[#1d4fd7] text-white rounded-lg text-sm">保存</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
