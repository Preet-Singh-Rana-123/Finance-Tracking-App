import { Bar } from 'react-chartjs-2';

export const BarChart = ({labels,income,expense}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Income',
        data: income,
        backgroundColor: '#22c55e',
      },
      {
        label: 'Expenses',
        data: expense,
        backgroundColor: '#64748b',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#334155' } },
    },
    scales: {
      x: { ticks: { color: '#334155' } },
      y: { ticks: { color: '#334155' } },
    },
  };

  return <Bar data={data} options={options} />;
};
