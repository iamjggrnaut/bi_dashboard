import React from 'react'
import EmployeeTable from '../components/EmployeeTable'
import EmployeeGantt from '../components/EmployeeGantt'

const ReviewByEmployee = ({
    data,
    activeObject,
    title,
    stages,
    projects,
    filtered
}) => {

    return (
        <div>
            <EmployeeTable
                data={filtered}
                activeObject={activeObject}
                title={'Показатели сотрудников'}
                stages={stages}
                projects={projects}
            />

        </div>
    )
}

export default ReviewByEmployee