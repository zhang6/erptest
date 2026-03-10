export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      organizations: { Row: Organization; Insert: Omit<Organization, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Organization> };
      departments: { Row: Department; Insert: Omit<Department, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Department> };
      employees: { Row: Employee; Insert: Omit<Employee, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Employee> };
      customers: { Row: Customer; Insert: Omit<Customer, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Customer> };
      contracts: { Row: Contract; Insert: Omit<Contract, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Contract> };
      customer_daily_reports: { Row: CustomerDailyReport; Insert: Omit<CustomerDailyReport, 'id' | 'created_at' | 'updated_at'>; Update: Partial<CustomerDailyReport> };
      quality_compares: { Row: QualityCompare; Insert: Omit<QualityCompare, 'id' | 'created_at' | 'updated_at'>; Update: Partial<QualityCompare> };
      marketing_anomalies: { Row: MarketingAnomaly; Insert: Omit<MarketingAnomaly, 'id' | 'created_at' | 'updated_at'>; Update: Partial<MarketingAnomaly> };
      production_units: { Row: ProductionUnit; Insert: Omit<ProductionUnit, 'id' | 'created_at' | 'updated_at'>; Update: Partial<ProductionUnit> };
      production_unit_status: { Row: ProductionUnitStatus; Insert: Omit<ProductionUnitStatus, 'id' | 'created_at' | 'updated_at'>; Update: Partial<ProductionUnitStatus> };
      equipment_anomalies: { Row: EquipmentAnomaly; Insert: Omit<EquipmentAnomaly, 'id' | 'created_at' | 'updated_at'>; Update: Partial<EquipmentAnomaly> };
      dispatch_commands: { Row: DispatchCommand; Insert: Omit<DispatchCommand, 'id' | 'created_at' | 'updated_at'>; Update: Partial<DispatchCommand> };
      production_daily_reports: { Row: ProductionDailyReport; Insert: Omit<ProductionDailyReport, 'id' | 'created_at' | 'updated_at'>; Update: Partial<ProductionDailyReport> };
      yield_reports: { Row: YieldReport; Insert: Omit<YieldReport, 'id' | 'created_at' | 'updated_at'>; Update: Partial<YieldReport> };
      consumption_records: { Row: ConsumptionRecord; Insert: Omit<ConsumptionRecord, 'id' | 'created_at' | 'updated_at'>; Update: Partial<ConsumptionRecord> };
      cost_records: { Row: CostRecord; Insert: Omit<CostRecord, 'id' | 'created_at' | 'updated_at'>; Update: Partial<CostRecord> };
      process_steps: { Row: ProcessStep; Insert: Omit<ProcessStep, 'id' | 'created_at'>; Update: Partial<ProcessStep> };
      quality_inspections: { Row: QualityInspection; Insert: Omit<QualityInspection, 'id' | 'created_at' | 'updated_at'>; Update: Partial<QualityInspection> };
      quality_anomalies: { Row: QualityAnomaly; Insert: Omit<QualityAnomaly, 'id' | 'created_at' | 'updated_at'>; Update: Partial<QualityAnomaly> };
      tasks: { Row: Task; Insert: Omit<Task, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Task> };
      performance_indicators: { Row: PerformanceIndicator; Insert: Omit<PerformanceIndicator, 'id' | 'created_at' | 'updated_at'>; Update: Partial<PerformanceIndicator> };
      performance_scores: { Row: PerformanceScore; Insert: Omit<PerformanceScore, 'id' | 'created_at' | 'updated_at'>; Update: Partial<PerformanceScore> };
      employee_changes: { Row: EmployeeChange; Insert: Omit<EmployeeChange, 'id' | 'created_at'>; Update: Partial<EmployeeChange> };
      operation_logs: { Row: OperationLog; Insert: Omit<OperationLog, 'id' | 'created_at'>; Update: Partial<OperationLog> };
    };
  };
}

export interface Organization {
  id: string;
  name: string;
  code: string | null;
  created_at: string;
  updated_at: string;
}

export interface Department {
  id: string;
  organization_id: string | null;
  parent_id: string | null;
  name: string;
  code: string | null;
  manager_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: string;
  employee_no: string;
  name: string;
  department_id: string | null;
  position: string | null;
  phone: string | null;
  email: string | null;
  status: '正式' | '试用' | '离职';
  hire_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  name: string;
  region: string | null;
  contact_person: string | null;
  contact_phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface Contract {
  id: string;
  contract_no: string;
  customer_id: string | null;
  product_name: string | null;
  quality_standard: string | null;
  created_at: string;
  updated_at: string;
}

export interface CustomerDailyReport {
  id: string;
  report_date: string;
  customer_id: string | null;
  contract_id: string | null;
  reporter_id: string | null;
  sales_volume: number;
  collection_amount: number;
  shipment_vehicles: number;
  received_quantity: number;
  settlement_rate: number | null;
  exec_price: number | null;
  created_at: string;
  updated_at: string;
}

export interface QualityCompare {
  id: string;
  contract_id: string | null;
  contract_standard: string | null;
  actual_quality: string | null;
  status: '达标' | '异常';
  created_at: string;
  updated_at: string;
}

export interface MarketingAnomaly {
  id: string;
  report_date: string;
  region_customer: string | null;
  anomaly_type: string | null;
  description: string | null;
  coordination_needs: string | null;
  reporter_id: string | null;
  status: '待处理' | '处理中' | '已解决';
  created_at: string;
  updated_at: string;
}

export interface ProductionUnit {
  id: string;
  department_id: string | null;
  name: string;
  manager_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductionUnitStatus {
  id: string;
  unit_id: string | null;
  status: '运行中' | '设备异常' | '待料停机' | '检修中';
  current_task: string | null;
  progress: number;
  recorded_at: string;
  created_at: string;
}

export interface EquipmentAnomaly {
  id: string;
  unit_id: string | null;
  description: string | null;
  status: '待处理' | '处理中' | '已解决';
  reporter_id: string | null;
  handler_id: string | null;
  created_at: string;
  resolved_at: string | null;
  updated_at: string;
}

export interface DispatchCommand {
  id: string;
  title: string;
  content: string | null;
  from_unit_id: string | null;
  to_unit_id: string | null;
  creator_id: string | null;
  status: '待执行' | '执行中' | '已完成';
  created_at: string;
  completed_at: string | null;
  updated_at: string;
}

export interface ProductionDailyReport {
  id: string;
  report_date: string;
  unit_id: string | null;
  shift: string | null;
  product_name: string | null;
  plan_quantity: number | null;
  actual_quantity: number | null;
  defect_count: number;
  anomaly_hours: number;
  remark: string | null;
  reporter_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface YieldReport {
  id: string;
  report_date: string;
  unit_id: string | null;
  product_name: string | null;
  daily_plan: number | null;
  daily_actual: number | null;
  month_plan: number | null;
  month_actual: number | null;
  created_at: string;
  updated_at: string;
}

export interface ConsumptionRecord {
  id: string;
  record_date: string;
  unit_id: string | null;
  material_name: string | null;
  plan_consumption: number | null;
  actual_consumption: number | null;
  energy_type: string | null;
  energy_value: number | null;
  energy_unit: string | null;
  created_at: string;
  updated_at: string;
}

export interface CostRecord {
  id: string;
  record_date: string;
  unit_id: string | null;
  product_name: string | null;
  material_cost: number | null;
  energy_cost: number | null;
  labor_cost: number | null;
  other_cost: number | null;
  total_cost: number | null;
  unit_cost: number | null;
  created_at: string;
  updated_at: string;
}

export interface ProcessStep {
  id: string;
  name: string;
  unit_id: string | null;
  sort_order: number;
  created_at: string;
}

export interface QualityInspection {
  id: string;
  inspection_no: string | null;
  batch_no: string | null;
  product_name: string | null;
  process_step_id: string | null;
  result: '合格' | '不合格' | '让步接收';
  inspector_id: string | null;
  inspection_date: string | null;
  remark: string | null;
  created_at: string;
  updated_at: string;
}

export interface QualityAnomaly {
  id: string;
  description: string | null;
  inspection_id: string | null;
  status: '待处理' | '处理中' | '已解决';
  reporter_id: string | null;
  created_at: string;
  resolved_at: string | null;
  updated_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  source: string | null;
  project: string | null;
  assignee_id: string | null;
  creator_id: string | null;
  priority: '高' | '中' | '低';
  status: '未开始' | '执行中' | '已完成' | '超期';
  due_date: string | null;
  completed_at: string | null;
  quality_score: number | null;
  quality_comment: string | null;
  created_at: string;
  updated_at: string;
}

export interface PerformanceIndicator {
  id: string;
  name: string;
  department_ids: string[] | null;
  dimension: string | null;
  weight: number | null;
  criteria: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PerformanceScore {
  id: string;
  employee_id: string | null;
  period: string;
  period_type: '月度' | '季度' | '年度' | null;
  self_score: number | null;
  manager_score: number | null;
  final_score: number | null;
  status: '待自评' | '待主管评分' | '已完成';
  summary_comment: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmployeeChange {
  id: string;
  employee_id: string | null;
  change_type: '入职' | '调岗' | '晋升' | '奖惩' | '离职';
  before_value: string | null;
  after_value: string | null;
  remark: string | null;
  created_at: string;
}

export interface OperationLog {
  id: string;
  user_id: string | null;
  action: string | null;
  module: string | null;
  detail: string | null;
  created_at: string;
}
