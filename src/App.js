import React, { useState } from "react";
import KpiInputRow from "./components/KpiInputRow";
import SummaryDisplay from "./components/SummaryDisplay";
import ChartDisplay from "./components/ChartDisplay";

// Sample Data Sets
const sampleDataSets = [
  {
    description: "Monthly Website Analytics",
    kpis: [
      { name: "Unique Visitors", value: "15230", unit: "users", trend: "+12%" },
      { name: "Bounce Rate", value: "45.5", unit: "%", trend: "-2%" },
      { name: "Avg. Session Duration", value: "185", unit: "seconds", trend: "+15s" },
      { name: "Conversion Rate", value: "3.1", unit: "%", trend: "+0.5%" },
    ]
  },
  {
    description: "Quarterly Sales Performance",
    kpis: [
      { name: "Total Revenue", value: "1250000", unit: "USD", trend: "+8%" },
      { name: "New Customers Acquired", value: "350", unit: "customers", trend: "+45" },
      { name: "Average Deal Size", value: "8500", unit: "USD", trend: "-200 USD" },
      { name: "Sales Cycle Length", value: "45", unit: "days", trend: "-3 days" },
    ]
  },
  {
    description: "Social Media Engagement",
    kpis: [
      { name: "Total Followers", value: "55800", unit: "followers", trend: "+1.2k" },
      { name: "Engagement Rate", value: "2.5", unit: "%", trend: "+0.3%" },
      { name: "Mentions", value: "850", unit: "", trend: "+50" },
      { name: "Reach", value: "180000", unit: "users", trend: "+15k" },
    ]
  },
  {
    description: "Customer Support Metrics",
    kpis: [
        { name: "Avg. Response Time", value: "15", unit: "minutes", trend: "-2m" },
        { name: "Resolution Rate", value: "88", unit: "%", trend: "+3%" },
        { name: "Customer Satisfaction (CSAT)", value: "4.2", unit: "/ 5", trend: "+0.1" },
        { name: "Ticket Volume", value: "1200", unit: "tickets", trend: "+150" },
    ]
  },
  // Added Examples:
  {
    description: "Project Management Health",
    kpis: [
      { name: "Tasks Completed On Time", value: "92", unit: "%", trend: "+5%" },
      { name: "Budget Variance", value: "-3.5", unit: "%", trend: "+1%" }, // Negative is good (under budget)
      { name: "Team Velocity", value: "35", unit: "story points", trend: "+3" },
      { name: "Open Critical Issues", value: "2", unit: "issues", trend: "-1" },
    ]
  },
  {
    description: "HR & Employee Metrics",
    kpis: [
      { name: "Employee Turnover Rate", value: "8", unit: "%", trend: "-1.5%" },
      { name: "Avg. Time to Hire", value: "32", unit: "days", trend: "-4 days" },
      { name: "Employee Satisfaction (eNPS)", value: "45", unit: "", trend: "+5" },
      { name: "Training Hours per Employee", value: "20", unit: "hours", trend: "+2" },
    ]
  },
  {
    description: "E-commerce Conversion Funnel",
    kpis: [
      { name: "Product Views", value: "50000", unit: "views", trend: "+10k" },
      { name: "Add to Cart Rate", value: "10", unit: "%", trend: "+1%" },
      { name: "Checkout Rate", value: "40", unit: "%", trend: "-2%" }, // Percentage of carts that reach checkout
      { name: "Purchase Conversion Rate", value: "2.5", unit: "%", trend: "+0.2%" }, // Overall conversion
    ]
  },
  {
    description: "Manufacturing Output",
    kpis: [
      { name: "Units Produced", value: "25000", unit: "units", trend: "+1500" },
      { name: "Defect Rate", value: "1.2", unit: "%", trend: "-0.3%" },
      { name: "Machine Downtime", value: "3", unit: "%", trend: "-0.5%" },
      { name: "Production Cycle Time", value: "4", unit: "hours", trend: "-15m" },
    ]
  }
];

function App() {
  const [kpis, setKpis] = useState([{ name: "", value: "", unit: "", trend: "" }]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleKpiChange = (index, field, value) => {
    const updated = [...kpis];
    updated[index][field] = value;
    setKpis(updated);
  };

  const addKpi = () => {
    if (kpis.length < 5) {
      setKpis([...kpis, { name: "", value: "", unit: "", trend: "" }]);
    }
  };

  const generateSummary = async () => {
    setLoading(true);
    setError("");
    setSummary("");

    const validKpis = kpis.filter(kpi => kpi.name.trim() !== "" || kpi.value.trim() !== "");
    if (validKpis.length === 0) {
        setError("Please enter at least one KPI.");
        setLoading(false);
        return;
    }

    const prompt = `Generate an executive summary for the following KPIs:\n${validKpis
      .map(kpi => `${kpi.name}: ${kpi.value} ${kpi.unit} (${kpi.trend})`)
      .join("\n")}`;

    try {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error("OpenAI API key not found. Make sure REACT_APP_OPENAI_API_KEY is set in your .env file.");
      }

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error (${response.status}): ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      setSummary(data.choices?.[0]?.message?.content || "No summary returned.");
    } catch (err) {
      console.error("Error generating summary:", err);
      setError(`Failed to generate summary: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to load sample data
  const loadSampleData = (sampleKpis) => {
    setKpis(sampleKpis);
    setSummary(""); // Clear previous summary
    setError(""); // Clear previous error
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">AI KPI Dashboard Generator</h1>

      {/* Add Sample Data Buttons */} 
      <div className="mb-6 p-4 border rounded bg-gray-50">
          <h3 className="text-md font-semibold mb-2 text-gray-700">Load Sample Data:</h3>
          <div className="flex flex-wrap gap-2">
              {sampleDataSets.map((sample, index) => (
                  <button 
                      key={index}
                      onClick={() => loadSampleData(sample.kpis)}
                      className="text-xs bg-teal-100 hover:bg-teal-200 text-teal-800 py-1 px-3 rounded"
                      title={`Load: ${sample.description}`}
                  >
                      {sample.description}
                  </button>
              ))}
          </div>
      </div>

      {kpis.map((kpi, idx) => (
        <KpiInputRow
          key={idx}
          index={idx}
          kpi={kpi}
          onChange={handleKpiChange}
        />
      ))}

      {kpis.length < 5 && (
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded mb-4 text-sm"
          onClick={addKpi}
        >
          ➕ Add KPI
        </button>
      )}

      <div className="mb-6">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 w-full sm:w-auto"
          onClick={generateSummary}
          disabled={loading || kpis.every(k => !k.name && !k.value)}
        >
          {loading ? "Generating..." : "Generate Summary"}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <ChartDisplay kpis={kpis} />

      <SummaryDisplay summary={summary} />

    </div>
  );
}

export default App;
