import React, { useState } from 'react';

function SummaryDisplay({ summary }) {
  const [copyStatus, setCopyStatus] = useState('Copy');

  const handleCopy = () => {
    navigator.clipboard.writeText(summary).then(() => {
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy'), 2000); // Reset after 2s
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      setCopyStatus('Failed');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = "kpi_summary.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href); 
  };

  if (!summary) return null;

  return (
    <div className="bg-gray-100 p-4 rounded whitespace-pre-wrap mt-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Executive Summary</h2>
        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded"
          >
            {copyStatus}
          </button>
          <button 
            onClick={handleDownload}
            className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded"
          >
            Download
          </button>
        </div>
      </div>
      <p>{summary}</p>
    </div>
  );
}

export default SummaryDisplay; 