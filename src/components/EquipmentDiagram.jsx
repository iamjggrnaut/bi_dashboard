import React from "react";
import info from '../data.json'


const EquipmentDiagram = ({ equipmentData, title, activeObject, projects }) => {

    const downtimeData = equipmentData?.equipment || []

    const equipmentNames = downtimeData.map(item => item.equipment_name)

    const stages = [...new Set(downtimeData.flatMap(item => item.stage_id))];

    const formattedData = equipmentData?.equipment?.map(unit => ({
        equipment_name: unit.equipment_name,
        stages: equipmentData?.equipment?.map(el => ({
            stage_id: el.stage_id,
            downtime_hours: el.downtime_hours,
            hourly_rate: el.hourly_rate,
            operating_hours: el.operating_hours,
            total_equipment_cost: el.total_equipment_cost
        }))
    }))

    console.log(formattedData);



    return (
        <div className='d-chart'>
            <p className='plate-title'>{title}</p>
            <div className="eq-table">
                <div className="d-flex pb-3">
                    <span className="fw-bold col-2">Оборудование</span>
                    <span className="fw-bold col">Этапы</span>
                    <span className="fw-bold col">Часовая ставка</span>
                    <span className="fw-bold col">Простой</span>
                    <span className="fw-bold col">Расходы за простой</span>
                    <span className="fw-bold col">Всего часов</span>
                    <span className="fw-bold col">Оплата</span>
                </div>
                {
                    formattedData?.map((unit, key) => (
                        <div className="d-flex pb-3" key={key}>
                            <span className="col-2">{unit.equipment_name}</span>
                            <div className="col">
                                {
                                    unit.stages?.map((s, i) => (
                                        <div key={i}>{info?.project_stages?.find(el => el.stage_id === s.stage_id)?.stage_name}</div>
                                    ))
                                }
                            </div>
                            <div className="col">
                                {
                                    unit.stages?.map((s, i) => (
                                        <div key={i}>{s.hourly_rate || 0} руб.</div>
                                    ))
                                }
                            </div>
                            <div className="col">
                                {
                                    unit.stages?.map((s, i) => (
                                        <div key={i}>{s.downtime_hours || 0} ч.</div>
                                    ))
                                }
                            </div>
                            <div className="col">
                                {
                                    unit.stages?.map((s, i) => (
                                        <div key={i}>{s.downtime_hours * s.hourly_rate || 0} руб.</div>
                                    ))
                                }
                            </div>
                            <div className="col">
                                {
                                    unit.stages?.map((s, i) => (
                                        <div key={i}>{s.operating_hours}</div>
                                    ))
                                }
                            </div><div className="col">
                                {
                                    unit.stages?.map((s, i) => (
                                        <div key={i}>{s.total_equipment_cost || 0} руб.</div>
                                    ))
                                }
                            </div>

                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default EquipmentDiagram

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};