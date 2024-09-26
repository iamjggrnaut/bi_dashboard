import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import info from '../data.json'

ChartJS.register(ArcElement, Tooltip, Legend);

const OverheadsChart = ({ prodata, title, activeObject, stages, projects }) => {

    const colors = [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
        "#FF6384",
        "#36A2EB",
    ]

    const labels = [...new Set(info?.project_overheads.map(item => item.overhead_type))]

    const data = {
        labels: [...new Set(info?.project_overheads.map(item => item.overhead_type))],
        datasets: [
            {
                label: "Overheads (₽)",
                data: info?.project_overheads.map(item => item.overhead_amount),
                backgroundColor: colors?.slice(0, labels?.length),
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const value = tooltipItem.raw.toLocaleString();
                        return `${tooltipItem.label}: ${value} ₽`;
                    },
                },
            },
        },
    };

    return (
        <div className='o-chart'>
            <p className='plate-title'>{title}</p>
            <Pie data={data} options={options} />
        </div>
    )
}

export default OverheadsChart