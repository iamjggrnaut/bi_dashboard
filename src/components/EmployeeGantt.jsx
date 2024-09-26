import React, { useEffect } from 'react';

const EmployeeGantt = ({ data, title, activeObject, stages, projects }) => {

    const people = data?.personnel?.filter(per => per.project_id === activeObject)
    const stageIds = people ? [...new Set(people.map(el => el.stage_id))] : []
    const uniqueStages = stageIds ? data?.project_stages?.filter(el => stageIds.includes(el.stage_id)) : []

    console.log(data);
    console.log(activeObject);
    console.log(stages);
    console.log(data?.project_stages);


    return (
        <div className='g-chart'>
            <div className="d-flex justify-content-between">
                <p className='plate-title'>{title}</p>
                <select name="" id="" className="selector">
                    <option value={Number(0)}>Все</option>
                    {
                        stages?.map((op, i) => (
                            <option value={op.stage_id} key={i}>{op.stage_name}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}

export default EmployeeGantt