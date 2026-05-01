import { Doughnut } from "react-chartjs-2";

export const DoughnutChart = ({ category, spent }) => {
    const data = {
        labels: category,
        datasets: [
            {
                label: "Spending",
                data: spent,
                backgroundColor: [
                    "#EF4444",
                    "#F59E0B",
                    "#10B981",
                    "#8B5CF6",
                    "#06B6D4",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: "bottom",
                labels: { color: "#334155" },
            },
            tooltip: {
                callbacks: {
                    label: (ctx) => `${ctx.label}: ₹${ctx.raw}`,
                },
            },
        },
    };

    return <Doughnut data={data} options={options} />;
};
