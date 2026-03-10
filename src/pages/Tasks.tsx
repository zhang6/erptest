import React from 'react';

export function TaskList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">任务中心</h1>
          <p className="text-sm text-slate-500 mt-1">管理和跟踪团队协作任务</p>
        </div>
        <button className="bg-[#1d4fd7] hover:bg-[#153eb3] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">add</span>
          新建任务
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input type="text" placeholder="搜索任务名称/项目" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4fd7]/20 focus:border-[#1d4fd7]" />
          </div>
          <select className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4fd7]/20 focus:border-[#1d4fd7]">
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
              {[
                { name: 'Q4营销方案策划', project: '年度营销计划', owner: '张三', date: '2023-11-15', priority: '高', status: '进行中' },
                { name: '新产品发布会物料准备', project: '新品发布', owner: '李四', date: '2023-10-30', priority: '中', status: '待处理' },
                { name: '客户满意度调查问卷设计', project: '客户服务提升', owner: '王五', date: '2023-10-25', priority: '低', status: '已完成' },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">{item.name}</td>
                  <td className="p-4 text-slate-700">{item.project}</td>
                  <td className="p-4 text-slate-700 flex items-center">
                    <img src={`https://ui-avatars.com/api/?name=${item.owner}&background=random`} alt={item.owner} className="w-6 h-6 rounded-full mr-2" />
                    {item.owner}
                  </td>
                  <td className="p-4 text-slate-500">{item.date}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      item.priority === '高' ? 'bg-rose-100 text-rose-800' : 
                      item.priority === '中' ? 'bg-amber-100 text-amber-800' : 
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === '已完成' ? 'bg-emerald-100 text-emerald-800' : 
                      item.status === '待处理' ? 'bg-slate-100 text-slate-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[#1d4fd7] hover:text-[#153eb3] font-medium text-xs transition-colors">查看</button>
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
