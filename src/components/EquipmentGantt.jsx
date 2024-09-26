import React, { useEffect } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import gantt from 'dhtmlx-gantt';

const EquipmentGantt = ({ data, title, activeObject, stages, projects }) => {

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
            const filteredStages = projects.filter(stage => stage.project_id === activeObject);

            filteredStages.forEach(stage => {
                console.log(filteredStages);

                tasks.data.push({
                    id: stage.equipment_id,
                    text: stage.equipment_name,
                    start_date: new Date(stage.start_date).toLocaleDateString(),
                    end_date: new Date(stage.end_date).toLocaleDateString(),
                    operating_hours: stage.operating_hours
                    // parent: activeObject // Указываем родительский проект
                });
            });
        } else {
            // Если проект не выбран, добавляем все проекты и их стадии
            projects.forEach(project => {
                tasks.data.push({
                    id: project.project_id,
                    text: project.equipment_name,
                    start_date: new Date(project.start_date).toLocaleDateString(),
                    end_date: new Date(project.end_date).toLocaleDateString(),
                    operating_hours: project.operating_hours
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
            { name: "text", label: "Оборудование", width: 400 },
            { name: "start_date", label: "Начало работы", width: 300 },
            { name: "end_date", label: "Окончание работы", width: 300 },
            { name: "operating_hours", label: "Всего часов", align: "center", width: 200 } // Добавьте ширину
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

export default EquipmentGantt