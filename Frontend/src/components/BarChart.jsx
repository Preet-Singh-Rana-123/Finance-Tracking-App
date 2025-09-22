import { Bar } from 'react-chartjs-2';

export const BarChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Income',
        data: [2000, 2200, 2100, 2300],
        backgroundColor: '#22c55e',
      },
      {
        label: 'Expenses',
        data: [1500, 1700, 1600, 1800],
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
