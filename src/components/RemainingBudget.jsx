import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const RemainingBudget = ({ data, title, activeObject }) => {

    const labels = !activeObject ? data?.projects?.map(project => project.project_name) : data?.project_stages?.filter(item => item.project_id === activeObject)?.map(el => el.stage_name);
    const plannedCosts = !activeObject ? data?.projects?.map(project => project.planned_budget) : data?.project_stages?.filter(item => item.project_id === activeObject)?.map(el => el.planned_budget);
    const actualCosts = !activeObject ? data?.projects?.map(project => project.actual_budget) : data?.project_stages?.filter(item => item.project_id === activeObject)?.map(el => el.actual_budget);

    const difference = !activeObject ? data.projects?.map(item => item.planned_budget - item.actual_budget) : data?.project_stages?.filter(item => item.project_id === activeObject)?.map(el => el.planned_cost - el.actual_cost)

    const rateDiff = !activeObject ? data.projects?.map(item => parseFloat((item.planned_budget - item.actual_budget) / item.planned_budget * 100).toFixed(1)) : data?.project_stages?.filter(item => item.project_id === activeObject)?.map(el => parseInt((el.planned_cost - el.actual_cost) / el.planned_cost * 100).toFixed(1))


    const dataset = {
        labels: labels,
        datasets: [
            {
                label: 'Остаточный бюджет',
                data: difference,
                borderColor: 'rgb(248, 85, 25)',
                backgroundColor: 'rgb(248, 85, 25, 0.7)',
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
            tooltip: {
                callbacks: {
                    // Кастомизация тултипа
                    label: function (tooltipItem) {
                        let label = tooltipItem.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += tooltipItem.raw;
                        const additionalInfo = rateDiff[tooltipItem.dataIndex]; // Добавляем дополнительные данные
                        return [label, `Процентное соотношение: ${additionalInfo}%`];
                    }
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: false,
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
        <div className='rem-budget' style={{ width: '100%' }}>
            <p className='plate-title'>{title}</p>
            <div style={{ height: '35vh', width: '100%' }}>
                <Line data={dataset} options={options} />
            </div>
        </div>
    )
}

export default RemainingBudget