import React from 'react';

export function PerformanceScoring() {
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
          <select className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]">
            <option value="2023-Q3">2023年第三季度</option>
            <option value="2023-Q2">2023年第二季度</option>
            <option value="2023-Q1">2023年第一季度</option>
          </select>
          <div className="relative flex-1 min-w-[200px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input type="text" placeholder="搜索员工姓名/工号" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]" />
          </div>
          <select className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13]">
            <option value="">所有状态</option>
            <option value="待自评">待自评</option>
            <option value="待主管评分">待主管评分</option>
            <option value="已完成">已完成</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">考核周期</th>
                <th className="p-4">被考核人</th>
                <th className="p-4">所属部门</th>
                <th className="p-4">考核指标</th>
                <th className="p-4">自评得分</th>
                <th className="p-4">主管评分</th>
                <th className="p-4">最终得分</th>
                <th className="p-4">状态</th>
                <th className="p-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {[
                { period: '2023-Q3', employee: '张三', dept: '研发部', indicator: '前端开发工程师季度考核', selfScore: 85, managerScore: 88, finalScore: 86.5, status: '已完成' },
                { period: '2023-Q3', employee: '李四', dept: '产品部', indicator: '产品经理季度考核', selfScore: 90, managerScore: '-', finalScore: '-', status: '待主管评分' },
                { period: '2023-Q3', employee: '王五', dept: '销售部', indicator: '销售专员季度考核', selfScore: '-', managerScore: '-', finalScore: '-', status: '待自评' },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-500 font-medium">{item.period}</td>
                  <td className="p-4 font-medium text-slate-900 flex items-center">
                    <img src={`https://ui-avatars.com/api/?name=${item.employee}&background=random`} alt={item.employee} className="w-6 h-6 rounded-full mr-2" />
                    {item.employee}
                  </td>
                  <td className="p-4 text-slate-700">{item.dept}</td>
                  <td className="p-4 text-slate-700">{item.indicator}</td>
                  <td className="p-4 text-slate-900 font-mono">{item.selfScore}</td>
                  <td className="p-4 text-slate-900 font-mono">{item.managerScore}</td>
                  <td className="p-4 text-slate-900 font-mono font-bold">{item.finalScore}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === '已完成' ? 'bg-emerald-100 text-emerald-800' : 
                      item.status === '待主管评分' ? 'bg-amber-100 text-amber-800' : 
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[#ec5b13] hover:text-[#d94f0f] font-medium text-xs transition-colors">
                      {item.status === '已完成' ? '查看' : '评分'}
                    </button>
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

export function IndicatorConfig() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">绩效指标配置</h1>
          <p className="text-sm text-slate-500 mt-1">配置不同岗位和部门的绩效考核指标及权重</p>
        </div>
        <button className="bg-[#ec5b13] hover:bg-[#d94f0f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
          <span className="material-symbols-outlined mr-2 text-sm">add</span>
          新增指标
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">指标名称</th>
                <th className="p-4">适用部门</th>
                <th className="p-4">考核维度</th>
                <th className="p-4">权重</th>
                <th className="p-4">评分标准</th>
                <th className="p-4">状态</th>
                <th className="p-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {[
                { name: '代码质量与规范', dept: '研发部', dimension: '工作质量', weight: '30%', criteria: 'Bug率、代码规范审查得分', status: '启用' },
                { name: '需求按时交付率', dept: '研发部', dimension: '工作效率', weight: '40%', criteria: '按期交付需求数 / 总需求数', status: '启用' },
                { name: '销售业绩达成率', dept: '销售部', dimension: '业绩指标', weight: '60%', criteria: '实际销售额 / 目标销售额', status: '启用' },
                { name: '客户满意度', dept: '销售部, 客服部', dimension: '服务质量', weight: '20%', criteria: '客户评价平均分', status: '停用' },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">{item.name}</td>
                  <td className="p-4 text-slate-700">{item.dept}</td>
                  <td className="p-4 text-slate-700">{item.dimension}</td>
                  <td className="p-4 text-slate-900 font-mono font-medium">{item.weight}</td>
                  <td className="p-4 text-slate-500 text-xs max-w-xs truncate" title={item.criteria}>{item.criteria}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === '启用' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-slate-400 hover:text-[#ec5b13] transition-colors p-1">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button className="text-slate-400 hover:text-rose-600 transition-colors p-1 ml-2">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
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
