import { Line } from 'react-chartjs-2';

export const LineChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Expenses',
        data: [500, 700, 600, 800, 750, 900],
        borderColor: '#22c55e',
        backgroundColor: '#86efac',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: { ticks: { color: '#334155' } },
      y: { ticks: { color: '#334155' } },
    },
    plugins: {
      legend: { labels: { color: '#334155' } },
    },
  };

  return <Line data={data} options={options} />;
};
