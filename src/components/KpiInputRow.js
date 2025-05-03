import React from 'react';

function KpiInputRow({ kpi, index, onChange }) {
  return (
    <div className="mb-4 grid grid-cols-4 gap-4">
      <input
        className="p-2 border rounded"
        placeholder="KPI Name"
        value={kpi.name}
        onChange={e => onChange(index, "name", e.target.value)}
      />
      <input
        className="p-2 border rounded"
        placeholder="Value"
        type="number" // Consider using number type for value
        value={kpi.value}
        onChange={e => onChange(index, "value", e.target.value)}
      />
      <input
        className="p-2 border rounded"
        placeholder="Unit"
        value={kpi.unit}
        onChange={e => onChange(index, "unit", e.target.value)}
      />
      <input
        className="p-2 border rounded"
        placeholder="Trend (e.g., +5%)"
        value={kpi.trend}
        onChange={e => onChange(index, "trend", e.target.value)}
      />
    </div>
  );
}

export default KpiInputRow; 