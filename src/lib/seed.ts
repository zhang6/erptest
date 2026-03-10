import { supabase } from './supabase';

export async function seedTestData() {
  try {
    const { data: orgs } = await supabase.from('organizations').select('id').limit(1);
    if (orgs && orgs.length > 0) {
      return { success: true, message: '测试数据已存在，跳过初始化' };
    }

    const { data: org } = await supabase.from('organizations').insert({ name: '某某制造科技有限公司', code: 'ORG001' }).select().single();
    const orgId = org?.id;
    if (!orgId) throw new Error('创建组织失败');

    const { data: depts } = await supabase.from('departments').insert([
      { name: '总经办', code: 'D001', organization_id: orgId },
      { name: '生产中心', code: 'D002', organization_id: orgId },
      { name: '营销中心', code: 'D003', organization_id: orgId },
      { name: '质量管理部', code: 'D004', organization_id: orgId },
      { name: '研发部', code: 'D005', organization_id: orgId },
      { name: '炼胶一厂', code: 'D006', organization_id: orgId },
      { name: '炼胶二厂', code: 'D007', organization_id: orgId },
    ]).select();

    const deptMap: Record<string, string> = {};
    depts?.forEach((d: { id: string; name: string }) => { deptMap[d.name] = d.id; });

    const { data: emps } = await supabase.from('employees').insert([
      { employee_no: 'EMP001', name: '张三', department_id: deptMap['研发部'], position: '前端工程师', phone: '13800138000', status: '正式', hire_date: '2023-05-12' },
      { employee_no: 'EMP002', name: '李四', department_id: deptMap['总经办'], position: '产品经理', phone: '13900139000', status: '正式', hire_date: '2023-06-15' },
      { employee_no: 'EMP003', name: '王五', department_id: deptMap['营销中心'], position: '销售专员', phone: '13700137000', status: '试用', hire_date: '2023-11-01' },
      { employee_no: 'EMP004', name: '赵六', department_id: deptMap['生产中心'], position: '车间主任', phone: '13600136000', status: '正式', hire_date: '2021-03-10' },
      { employee_no: 'EMP005', name: '孙七', department_id: deptMap['总经办'], position: 'HRBP', phone: '13500135000', status: '正式', hire_date: '2022-08-22' },
      { employee_no: 'EMP006', name: '王建国', department_id: deptMap['炼胶一厂'], position: '炼胶一厂厂长', phone: '13400134000', status: '正式', hire_date: '2020-01-15' },
      { employee_no: 'EMP007', name: '李志强', department_id: deptMap['炼胶二厂'], position: '炼胶二厂厂长', phone: '13300133000', status: '正式', hire_date: '2019-06-20' },
    ]).select();

    const emp1 = emps?.find((e: { employee_no: string }) => e.employee_no === 'EMP006')?.id;
    const emp2 = emps?.find((e: { employee_no: string }) => e.employee_no === 'EMP007')?.id;
    const emp3 = emps?.find((e: { employee_no: string }) => e.employee_no === 'EMP003')?.id;

    await supabase.from('departments').update({ manager_id: emp1 }).eq('name', '炼胶一厂');
    await supabase.from('departments').update({ manager_id: emp2 }).eq('name', '炼胶二厂');

    const { data: customers } = await supabase.from('customers').insert([
      { name: '山东重工集团', region: '山东', contact_person: '张经理', contact_phone: '0531-88888888' },
      { name: '江苏机械制造', region: '江苏', contact_person: '李总', contact_phone: '025-66666666' },
      { name: '浙江汽车配件', region: '浙江', contact_person: '王主任', contact_phone: '0571-77777777' },
    ]).select();

    const c1 = customers?.[0]?.id;
    const c2 = customers?.[1]?.id;
    const c3 = customers?.[2]?.id;

    const { data: contracts } = await supabase.from('contracts').insert([
      { contract_no: 'ORD-202310-001', customer_id: c1, product_name: '高强度钢板', quality_standard: '抗拉强度≥800MPa, 厚度公差±0.1mm' },
      { contract_no: 'ORD-202310-002', customer_id: c2, product_name: '精密轴承钢', quality_standard: '硬度HRC60-62, 表面无划伤' },
      { contract_no: 'ORD-202310-003', customer_id: c3, product_name: '冷轧卷板', quality_standard: '屈服强度≥300MPa, 表面光洁' },
    ]).select();

    const unit1 = deptMap['炼胶一厂'];
    const unit2 = deptMap['炼胶二厂'];

    const { data: units } = await supabase.from('production_units').insert([
      { department_id: unit1, name: '炼胶一厂', manager_id: emp1 },
      { department_id: unit2, name: '炼胶二厂', manager_id: emp2 },
    ]).select();

    const u1 = units?.[0]?.id;
    const u2 = units?.[1]?.id;

    const today = new Date().toISOString().split('T')[0];

    await supabase.from('production_unit_status').insert([
      { unit_id: u1, status: '运行中', current_task: '天然橡胶混炼胶生产', progress: 85 },
      { unit_id: u2, status: '运行中', current_task: '特种橡胶混炼胶生产', progress: 78 },
    ]);

    await supabase.from('customer_daily_reports').insert([
      { report_date: today, customer_id: c1, reporter_id: emp3, sales_volume: 1200, collection_amount: 500, shipment_vehicles: 40, received_quantity: 1180, settlement_rate: 95, exec_price: 4200 },
      { report_date: today, customer_id: c2, reporter_id: emp3, sales_volume: 800, collection_amount: 320, shipment_vehicles: 25, received_quantity: 800, settlement_rate: 100, exec_price: 4250 },
      { report_date: today, customer_id: c3, reporter_id: emp3, sales_volume: 450, collection_amount: 150, shipment_vehicles: 15, received_quantity: 445, settlement_rate: 90, exec_price: 4300 },
    ]);

    await supabase.from('quality_compares').insert([
      { contract_id: contracts?.[0]?.id, contract_standard: '抗拉强度≥800MPa, 厚度公差±0.1mm', actual_quality: '抗拉强度815MPa, 厚度公差±0.08mm', status: '达标' },
      { contract_id: contracts?.[1]?.id, contract_standard: '硬度HRC60-62, 表面无划伤', actual_quality: '硬度HRC61, 表面轻微划伤(3处)', status: '异常' },
      { contract_id: contracts?.[2]?.id, contract_standard: '屈服强度≥300MPa, 表面光洁', actual_quality: '屈服强度310MPa, 表面光洁', status: '达标' },
    ]);

    await supabase.from('marketing_anomalies').insert([
      { report_date: today, region_customer: '山东地区', anomaly_type: '物流不便', description: '山东地区物流配送延迟', coordination_needs: '协调物流供应商', reporter_id: emp3, status: '待处理' },
    ]);

    await supabase.from('process_steps').insert([
      { name: '配料', unit_id: u1, sort_order: 1 },
      { name: '混炼', unit_id: u1, sort_order: 2 },
      { name: '检验', unit_id: u1, sort_order: 3 },
    ]);

    const { data: steps } = await supabase.from('process_steps').select('id').eq('unit_id', u1).limit(1);

    await supabase.from('quality_inspections').insert([
      { inspection_no: 'QI-202403-001', batch_no: 'B20240301001', product_name: '天然橡胶混炼胶', process_step_id: steps?.[0]?.id, result: '合格', inspection_date: today },
      { inspection_no: 'QI-202403-002', batch_no: 'B20240301002', product_name: '合成橡胶混炼胶', process_step_id: steps?.[0]?.id, result: '让步接收', inspection_date: today },
    ]);

    await supabase.from('tasks').insert([
      { title: 'Q4营销方案策划', project: '年度营销计划', assignee_id: emp3, creator_id: emp2, priority: '高', status: '执行中', due_date: '2024-11-15' },
      { title: '新产品发布会物料准备', project: '新品发布', assignee_id: emp2, creator_id: emp2, priority: '中', status: '未开始', due_date: '2024-10-30' },
      { title: '客户满意度调查问卷设计', project: '客户服务提升', assignee_id: emp1, creator_id: emp2, priority: '低', status: '已完成', due_date: '2024-10-25', completed_at: new Date().toISOString() },
    ]);

    await supabase.from('performance_indicators').insert([
      { name: '代码质量与规范', dimension: '工作质量', weight: 30, criteria: 'Bug率、代码规范审查得分', is_active: true },
      { name: '需求按时交付率', dimension: '工作效率', weight: 40, criteria: '按期交付需求数 / 总需求数', is_active: true },
      { name: '销售业绩达成率', dimension: '业绩指标', weight: 60, criteria: '实际销售额 / 目标销售额', is_active: true },
      { name: '客户满意度', dimension: '服务质量', weight: 20, criteria: '客户评价平均分', is_active: false },
    ]);

    await supabase.from('performance_scores').insert([
      { employee_id: emp1, period: '2024-Q3', period_type: '季度', self_score: 85, manager_score: 88, final_score: 86.5, status: '已完成' },
      { employee_id: emp2, period: '2024-Q3', period_type: '季度', self_score: 90, manager_score: null, final_score: null, status: '待主管评分' },
      { employee_id: emp3, period: '2024-Q3', period_type: '季度', self_score: null, manager_score: null, final_score: null, status: '待自评' },
    ]);

    await supabase.from('yield_reports').insert([
      { report_date: today, unit_id: u1, product_name: '天然橡胶混炼胶', daily_plan: 120, daily_actual: 125, month_plan: 3600, month_actual: 2500 },
      { report_date: today, unit_id: u1, product_name: '合成橡胶混炼胶', daily_plan: 80, daily_actual: 75, month_plan: 2400, month_actual: 1600 },
      { report_date: today, unit_id: u2, product_name: '特种橡胶混炼胶', daily_plan: 50, daily_actual: 52, month_plan: 1500, month_actual: 1050 },
    ]);

    await supabase.from('consumption_records').insert([
      { record_date: today, unit_id: u1, material_name: '天然橡胶(NR)', plan_consumption: 100, actual_consumption: 102 },
      { record_date: today, unit_id: u1, material_name: '丁苯橡胶(SBR)', plan_consumption: 60, actual_consumption: 58 },
      { record_date: today, unit_id: u1, energy_type: '用电量', energy_value: 12450, energy_unit: 'kWh' },
      { record_date: today, unit_id: u1, energy_type: '用水量', energy_value: 320, energy_unit: '吨' },
    ]);

    await supabase.from('cost_records').insert([
      { record_date: today, unit_id: u1, product_name: '天然橡胶混炼胶', material_cost: 85000, energy_cost: 12000, labor_cost: 8000, other_cost: 5000, total_cost: 110000, unit_cost: 880 },
    ]);

    return { success: true, message: '测试数据初始化成功' };
  } catch (e) {
    console.error('Seed error:', e);
    return { success: false, message: String(e) };
  }
}
