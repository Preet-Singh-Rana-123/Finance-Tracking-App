import { Line } from 'react-chartjs-2';

export const LineChart = ({labels, expense}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Expenses',
        data: expense,
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
