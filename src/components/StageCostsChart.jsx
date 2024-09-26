import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import info from '../data.json'

ChartJS.register(ArcElement, Tooltip, Legend);

const StageCostsChart = ({ prodata, title, activeObject, stages, projects }) => {

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

    const labels = !activeObject ? [...new Set(info?.stage_costs.map(item => item.cost_type))] : [...new Set(info?.stage_costs.filter(item => item.stage_id === activeObject)?.map(el => el.cost_type))]

    const data = {
        labels: labels,
        datasets: [
            {
                // label: "Stage Costs (₽)",
                data: !activeObject ? info?.stage_costs.map(item => item.cost_amount) : info?.stage_costs.filter(item => item.stage_id === activeObject)?.map(el => el.cost_amount),
                backgroundColor: colors?.slice(0, labels?.length),
                hoverOffset: 4,
            },
        ],
    };

    console.log(info?.stage_costs.filter(item => item.stage_id === activeObject));


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "left",
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
        <div className='sc-chart'>
            <p className='plate-title'>{title}</p>
            <div style={{ height: '45vh' }}>
                <Doughnut data={data} options={options} />
            </div>
        </div>
    )
}

export default StageCostsChart