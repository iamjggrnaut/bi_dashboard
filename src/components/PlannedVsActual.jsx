import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const PlannedVsActual = ({ data, title, activeObject }) => {

    const labels = !activeObject ? data?.projects?.map(project => project.project_name) : data?.project_stages?.filter(item => item.project_id === activeObject)?.map(el => el.stage_name);
    const plannedCosts = !activeObject ? data?.projects?.map(project => project.planned_budget) : data?.project_stages?.filter(item => item.project_id === activeObject)?.map(el => el.planned_cost);
    const actualCosts = !activeObject ? data?.projects?.map(project => project.actual_budget) : data?.project_stages?.filter(item => item.project_id === activeObject)?.map(el => el.actual_cost);

    const dataset = {
        labels: labels,
        datasets: [
            {
                label: 'Планируемый бюджет',
                data: plannedCosts,
                borderColor: 'rgb(53, 78, 156)',
                backgroundColor: 'rgb(53, 78, 156, 0.9)',
                fill: true,
            },
            {
                label: 'Фактические затраты',
                data: actualCosts,
                borderColor: 'rgb(248, 85, 25,)',
                backgroundColor: 'rgb(248, 85, 25, 0.9)',
                fill: true,
            },
        ],
    };


    const options = {
        responsive: true,
        aspectRatio: 4.8,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            title: {
                display: false,
                text: 'Планируемые и фактические затраты по проектам',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Затраты (руб.)',
                },
            },
            x: {
                title: {
                    display: false,
                    text: 'Проекты',
                },
            },
        },
    };

    return (
        <div className='planned-actual'>
            <p className='plate-title'>{title}</p>
            <div style={{ height: '35vh', width: '100%' }}>
                <Bar data={dataset} options={options} />
            </div>
        </div>
    )
}

export default PlannedVsActual