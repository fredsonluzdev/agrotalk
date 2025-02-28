import React from 'react';
import { Attachment, ChartData, TableData } from '../types';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChatAttachmentProps {
  attachment: Attachment;
}

const ChatAttachment: React.FC<ChatAttachmentProps> = ({ attachment }) => {
  const renderChart = (chartData: ChartData) => {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: !!attachment.title,
          text: attachment.title || '',
        },
      },
      maintainAspectRatio: false,
    };

    const data = {
      labels: chartData.labels,
      datasets: chartData.datasets.map((dataset, index) => ({
        ...dataset,
        backgroundColor: dataset.backgroundColor || [
          'rgba(34, 197, 94, 0.6)',
          'rgba(139, 92, 246, 0.6)',
          'rgba(59, 130, 246, 0.6)',
          'rgba(249, 115, 22, 0.6)',
          'rgba(236, 72, 153, 0.6)',
          'rgba(168, 85, 247, 0.6)',
        ][index % 6],
        borderColor: dataset.borderColor || [
          'rgba(34, 197, 94, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(168, 85, 247, 1)',
        ][index % 6],
        borderWidth: dataset.borderWidth || 1,
      })),
    };

    switch (chartData.type) {
      case 'line':
        return <Line options={options} data={data} height={220} />;
      case 'bar':
        return <Bar options={options} data={data} height={220} />;
      case 'pie':
        return <Pie options={options} data={data} height={220} />;
      case 'doughnut':
        return <Doughnut options={options} data={data} height={220} />;
      default:
        return <Bar options={options} data={data} height={220} />;
    }
  };

  const renderTable = (tableData: TableData) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200 text-sm">
          <thead className="bg-neutral-50">
            <tr>
              {tableData.headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {tableData.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-3 py-2 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderImage = (src: string) => {
    return (
      <img
        src={src}
        alt={attachment.title || 'Attachment'}
        className="w-full h-auto rounded-lg"
      />
    );
  };

  return (
    <div className="card mb-3">
      {attachment.title && (
        <h3 className="text-sm font-medium text-neutral-700 mb-2">{attachment.title}</h3>
      )}
      
      {attachment.type === 'chart' && renderChart(attachment.data)}
      {attachment.type === 'table' && renderTable(attachment.data)}
      {attachment.type === 'image' && renderImage(attachment.data)}
    </div>
  );
};

export default ChatAttachment;