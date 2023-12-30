import React, { FunctionComponent } from "react";
import { useState } from "react";
import Task,{TaskProps} from './Task';
import '../stylesheets/Card.css';



const Card:FunctionComponent = () => {
    const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('Card Title');
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [newTask, setNewTask] = useState<string>('');

    const onDelete = (taskId:string) => {

    }
  
    const handleTitleClick = () => {
      setIsEditingTitle(true);
    };
  
    const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    };
  
    const handleTitleBlur = () => {
      setIsEditingTitle(false);
    };
  
    const addTask = () => {
      if (newTask.trim() !== '') {
        setTasks([...tasks, { id:"1",title:newTask,body: newTask,onDelete:onDelete } ]);
        setNewTask('');
      }
    };
  
    return (
      <div className="card">
        <div className="card-title" onClick={handleTitleClick}>
          {isEditingTitle ? (
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
            />
          ) : (
            <div>{title}</div>
          )}
        </div>

        <div className="task-list">
          {tasks.map((task, index) => (
            <Task key={index} task={task} />
          ))}
        </div>

        <div className="add-task">
          <input
            type="text"
            placeholder="Add a task"
            value={newTask}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setNewTask(e.currentTarget.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>
    );
  };

  export default Card;