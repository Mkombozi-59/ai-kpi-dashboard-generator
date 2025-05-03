import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Placeholder for chart component
// We will add Recharts here later
function ChartDisplay({ kpis }) {

  const chartData = kpis
    .map(kpi => ({
      name: kpi.name || 'Unnamed',
      value: parseFloat(kpi.value) || 0,
      unit: kpi.unit || '',
      // Trend could be visualized later, e.g., color-coding bars
      // trend: kpi.trend
    }))
    .filter(data => data.name !== 'Unnamed' && !isNaN(data.value)); // Filter out unnamed or non-numeric values

  if (chartData.length === 0) {
    return <div className="mt-6 text-center text-gray-500">Enter valid KPI name and numeric value to see chart.</div>;
  }

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4 text-center">KPI Visualization</h2>
      {/* Use ResponsiveContainer for chart sizing */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value, name, props) => [`${value} ${props.payload.unit}`, 'Value']} />
          <Legend />
          <Bar dataKey="value" fill="#3b82f6" /> {/* Using a Tailwind blue color */} 
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartDisplay; 