import React, { useEffect } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import gantt from 'dhtmlx-gantt';

const GanttChart = ({ data, title, activeObject, stages, projects }) => {


    useEffect(() => {

        gantt.config.readonly = true;  // Отключаем все взаимодействие

        gantt.config.drag_move = false; // Отключаем перетаскивание задач
        gantt.config.drag_resize = false; // Отключаем изменение размера задач
        gantt.config.drag_progress = false; // Отключаем изменение прогресса задач
        gantt.config.show_tasks_outside_timescale = true;

        gantt.init('gantt_here');
        gantt.clearAll();

        // Преобразуйте данные в формат, подходящий для dhtmlx-gantt
        const tasks = {
            data: [],
            links: []
        };

        if (activeObject) {
            // Фильтруем стадии по выбранному проекту
            const filteredStages = stages.filter(stage => stage.project_id === activeObject);

            filteredStages.forEach(stage => {
                tasks.data.push({
                    id: stage.stage_id,
                    text: stage.stage_name,
                    start_date: new Date(stage.start_date).toLocaleDateString(),
                    end_date: new Date(stage.end_date).toLocaleDateString(),
                    // parent: activeObject // Указываем родительский проект
                });
            });
        } else {
            // Если проект не выбран, добавляем все проекты и их стадии
            projects.forEach(project => {
                tasks.data.push({
                    id: project.project_id,
                    text: project.project_name,
                    start_date: new Date(project.start_date).toLocaleDateString(),
                    end_date: new Date(project.end_date).toLocaleDateString(),
                    // type: "project"
                });
            });
        }

        // Теперь добавляем проектам родительский идентификатор
        tasks.data.forEach(task => {
            if (task.parent === null) {
                task.parent = 0; // Основные задачи без родителей указываем в 0
            }
        });

        gantt.parse(tasks);

        gantt.config.columns = [
            { name: "text", label: "Проект", width: 400 },
            { name: "start_date", label: "Дата начала", align: "center", width: 280 },
            { name: "end_date", label: "Дата окончания", align: "center", width: 280 }, // Добавьте ширину
            { name: "duration", label: "Продолжительность (дн.)", align: "center", width: 100 } // Добавьте ширину
        ];


        gantt.config.scale_unit = "month";
        gantt.config.date_scale = "%m.%Y";  // Отображение только месяца
        // gantt.config.subscales = [
        //     { unit: "week", step: 1, template: "%W" } // Добавление недель для детализации
        // ];

        // Оптимизация размера шкалы
        gantt.config.min_column_width = 5; // Минимальная ширина колонки

        // Уборка при размонтировании компонента
        return () => {
            gantt.clearAll();
        };
    }, [projects, stages, activeObject]);

    return (
        <div className='g-chart'>
            <p className='plate-title'>{title}</p>
            <div>
                <div id="gantt_here" style={{ width: '100%', minHeight: '50vh', margin: 'auto' }}></div>
            </div>
        </div>
    )
}

export default GanttChart