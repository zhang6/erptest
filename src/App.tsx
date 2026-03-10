import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { EmployeeList } from './pages/HR';
import { QualityStats, ProcessInspection, QualityAnomaly } from './pages/Quality';
import { UnitStatus, DailyReport, EquipmentAnomaly, DispatchCommand } from './pages/Production';
import { YieldReport, ConsumptionStats, CostAccounting, ProductionAnomalies, SummaryAnalysis } from './pages/ProductionDaily';
import { TaskList } from './pages/Tasks';
import { CustomerDailyReport, QualityCompare, AnomaliesCoordination, ReportingTracking, MonthlyQuarterlyAssessment } from './pages/Marketing';
import { PerformanceScoring, IndicatorConfig } from './pages/Performance';
import { BasicSettings, OrganizationSettings, RoleSettings, OperationLogs } from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          
          {/* HR */}
          <Route path="hr/employees" element={<EmployeeList />} />
          
          {/* Quality */}
          <Route path="quality/stats" element={<QualityStats />} />
          <Route path="quality/inspection" element={<ProcessInspection />} />
          <Route path="quality/anomaly" element={<QualityAnomaly />} />
          
          {/* Production */}
          <Route path="production/unit-status" element={<UnitStatus />} />
          <Route path="production/daily-report" element={<DailyReport />} />
          <Route path="production/equipment-anomaly" element={<EquipmentAnomaly />} />
          <Route path="production/dispatch-command" element={<DispatchCommand />} />

          {/* Production Daily */}
          <Route path="production-daily/yield" element={<YieldReport />} />
          <Route path="production-daily/consumption" element={<ConsumptionStats />} />
          <Route path="production-daily/cost" element={<CostAccounting />} />
          <Route path="production-daily/anomalies" element={<ProductionAnomalies />} />
          <Route path="production-daily/summary" element={<SummaryAnalysis />} />
          
          {/* Tasks */}
          <Route path="tasks/list" element={<TaskList />} />
          
          {/* Marketing */}
          <Route path="marketing/customer-daily" element={<CustomerDailyReport />} />
          <Route path="marketing/quality-compare" element={<QualityCompare />} />
          <Route path="marketing/anomalies" element={<AnomaliesCoordination />} />
          <Route path="marketing/tracking" element={<ReportingTracking />} />
          <Route path="marketing/assessment" element={<MonthlyQuarterlyAssessment />} />
          
          {/* Performance */}
          <Route path="performance/scoring" element={<PerformanceScoring />} />
          <Route path="performance/indicators" element={<IndicatorConfig />} />

          {/* Settings */}
          <Route path="settings/basic" element={<BasicSettings />} />
          <Route path="settings/organization" element={<OrganizationSettings />} />
          <Route path="settings/roles" element={<RoleSettings />} />
          <Route path="settings/logs" element={<OperationLogs />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
