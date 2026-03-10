import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { updateRow } from '../lib/api';
import type { PerformanceScore } from '../types/database';

export function PerformanceScoring() {
  const [scores, setScores] = useState<(PerformanceScore & { employees?: { name: string } | null })[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('2024-Q3');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase.from('performance_scores').select('*, employees(name)').eq('period', period).order('created_at');
      setScores(data || []);
      setLoading(false);
    })();
  }, [period]);

  const handleScore = async (id: string, manager_score: number) => {
    try {
      await updateRow('performance_scores', id, { manager_score, status: '已完成', final_score: manager_score });
      setScores(prev => prev.map(s => s.id === id ? { ...s, manager_score, final_score: manager_score, status: '已完成' } : s));
    } catch (err) {
      alert('操作失败: ' + (err as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">绩效评分</h1>
          <p className="text-sm text-slate-500 mt-1">对员工进行周期性绩效考核与评分</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
            <span className="material-symbols-outlined mr-2 text-sm">assessment</span>
            发起考核
          </button>
          <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
            <span className="material-symbols-outlined mr-2 text-sm">add</span>
            手动录入数据
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center">
          <select value={period} onChange={e => setPeriod(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]">
            <option value="2024-Q3">2024年第三季度</option>
            <option value="2024-Q2">2024年第二季度</option>
            <option value="2024-Q1">2024年第一季度</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">考核周期</th>
                <th className="p-4">被考核人</th>
                <th className="p-4">自评得分</th>
                <th className="p-4">主管评分</th>
                <th className="p-4">最终得分</th>
                <th className="p-4">状态</th>
                <th className="p-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {loading ? <tr><td colSpan={7} className="p-8 text-center text-slate-500">加载中...</td></tr> :
                scores.length === 0 ? <tr><td colSpan={7} className="p-8 text-center text-slate-500">暂无数据，请先初始化测试数据</td></tr> :
                scores.map(item => {
                  const name = (item.employees as { name?: string })?.name || '-';
                  return (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-slate-500 font-medium">{item.period}</td>
                      <td className="p-4 font-medium text-slate-900 flex items-center">
                        <img src={`https://ui-avatars.com/api/?name=${name}&background=random`} alt={name} className="w-6 h-6 rounded-full mr-2" />
                        {name}
                      </td>
                      <td className="p-4 text-slate-900 font-mono">{item.self_score ?? '-'}</td>
                      <td className="p-4 text-slate-900 font-mono">{item.manager_score ?? '-'}</td>
                      <td className="p-4 text-slate-900 font-mono font-bold">{item.final_score ?? '-'}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === '已完成' ? 'bg-emerald-100 text-emerald-800' : item.status === '待主管评分' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'}`}>{item.status}</span>
                      </td>
                      <td className="p-4 text-right">
                        {item.status === '待主管评分' ? (
                          <button onClick={() => { const s = prompt('请输入主管评分:'); if (s) handleScore(item.id, +s); }} className="text-[#ec5b13] hover:text-[#d94f0f] font-medium text-xs transition-colors">评分</button>
                        ) : (
                          <span className="text-slate-400 text-xs">查看</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function IndicatorConfig() {
  const [indicators, setIndicators] = useState<{ id: string; name: string; dimension: string | null; weight: number | null; criteria: string | null; is_active: boolean }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('performance_indicators').select('*').order('created_at').then(({ data }) => {
      setIndicators(data || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">绩效指标配置</h1>
          <p className="text-sm text-slate-500 mt-1">配置不同岗位和部门的绩效考核指标及权重</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">指标名称</th>
                <th className="p-4">考核维度</th>
                <th className="p-4">权重</th>
                <th className="p-4">评分标准</th>
                <th className="p-4">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {loading ? <tr><td colSpan={5} className="p-8 text-center text-slate-500">加载中...</td></tr> :
                indicators.length === 0 ? <tr><td colSpan={5} className="p-8 text-center text-slate-500">暂无数据，请先初始化测试数据</td></tr> :
                indicators.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">{item.name}</td>
                  <td className="p-4 text-slate-700">{item.dimension || '-'}</td>
                  <td className="p-4 text-slate-900 font-mono font-medium">{item.weight != null ? item.weight + '%' : '-'}</td>
                  <td className="p-4 text-slate-500 text-xs max-w-xs truncate" title={item.criteria || ''}>{item.criteria || '-'}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}`}>
                      {item.is_active ? '启用' : '停用'}
                    </span>
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
