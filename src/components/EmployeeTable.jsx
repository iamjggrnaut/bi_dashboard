import React from 'react'

const EmployeeTable = ({ data, title, activeObject, stages, projects }) => {

    console.log(data);


    return (
        <div className='e-table'>
            <p className='plate-title'>{title}</p>
            <div>
                <div className="d-flex gap-2 mb-2 pb-3" style={{ borderBottom: '1px solid grey' }}>
                    <span className="fw-bold col-3">ФИО</span>
                    <span className="fw-bold col">Объект</span>
                    <span className="fw-bold col">Этап</span>
                    <span className="fw-bold col">Часовая ставка</span>
                    <span className="fw-bold col">Всего часов</span>
                    <span className="fw-bold col">Оплата (итог)</span>
                </div>
                {
                    data?.personnel?.map(em => (
                        <div className="d-flex gap-2 pb-2" style={{ borderBottom: '1px solid grey' }}>
                            <span className="col-3">{`${em.employee_name}`}</span>
                            <span className="col">{projects?.find(el => el.project_id === em.project_id)?.project_name}</span>
                            <span className="col">{stages?.find(el => el.stage_id === em.stage_id)?.stage_name}</span>
                            <span className="col">{`${em.hourly_rate || 0} руб.`}</span>
                            <span className="col">{`${em.labor_hours}`}</span>
                            <span className="col">{`${em.total_labor_cost || 0} руб.`}</span>
                        </div>
                    ))
                }
                <div className="d-flex gap-2 mb-2 pt-2" >
                    <span className="fw-bold col-3"> </span>
                    <span className="fw-bold col"> </span>
                    <span className="fw-bold col"> </span>
                    <span className="fw-bold col"></span>
                    <span className="fw-bold col">Итог:</span>
                    <span className="fw-bold col">{data?.personnel?.reduce((acc, el) => acc + el.total_labor_cost, 0) || 0} руб.</span>
                </div>
            </div>
        </div>
    )
}

export default EmployeeTable