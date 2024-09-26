import React from 'react'
import EquipmentGantt from '../components/EquipmentGantt'
import EquipmentDiagram from '../components/EquipmentDiagram'

const ReviewByEquipment = ({
    data,
    activeObject,
    title,
    stages,
    projects,
    filtered
}) => {

    return (
        <div>
            <EquipmentGantt
                data={filtered}
                activeObject={activeObject}
                title={'План работ'}
                stages={data.project_stages}
                projects={data.equipment}
            />

            <div className="d-flex gap-3">
                <EquipmentDiagram
                    title={'Простой оборудования'}
                    equipmentData={data}
                    activeObject={activeObject}
                    stages={data.project_stages}
                />
            </div>
        </div>
    )
}

export default ReviewByEquipment