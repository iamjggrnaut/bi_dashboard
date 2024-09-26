import React from 'react'
import GanttChart from '../components/GanttChart'
import PlannedVsActual from '../components/PlannedVsActual'
import RemainingBudget from '../components/RemainingBudget'
import OverheadsChart from '../components/OverheadsChart'
import StageCostsChart from '../components/StageCostsChart'

const OverallReview = ({
    data,
    activeObject,
    title,
    stages,
    projects,
    filtered
}) => {

    console.log(data);


    return (
        <div>
            <GanttChart
                data={filtered}
                activeObject={activeObject}
                title={'План работ'}
                stages={data.project_stages}
                projects={data.projects}
            />

            <PlannedVsActual
                data={filtered}
                activeObject={activeObject}
                title={'Планируемый vs Фактический бюджет'}
            />

            <RemainingBudget
                data={filtered}
                title={'Остаточный бюджет'}
                activeObject={activeObject}
            />

            <div className="d-flex gap-3">
                <OverheadsChart
                    data={filtered}
                    activeObject={activeObject}
                    title={'Сквозные затраты'}
                    stages={data.project_stages}
                    projects={data.equipment}
                />

                <StageCostsChart
                    data={filtered}
                    activeObject={activeObject}
                    title={'Затраты на этапах'}
                    stages={data.project_stages}
                    projects={data.equipment}
                />
            </div>
        </div>
    )
}

export default OverallReview