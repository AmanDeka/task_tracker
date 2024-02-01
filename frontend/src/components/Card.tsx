// Card.js
//

import React, { FunctionComponent, useState } from 'react';
import Task, { TaskProps } from './Task';
import CountingTask, { CountingTaskProps } from './CountingTask';
import '../stylesheets/Card.css';

export interface CardProps{
  id:string;
  title:string;
  showDoneTasks:boolean;
  tasks:(TaskProps | CountingTaskProps)[];
};


const Card: FunctionComponent<{card:CardProps}> = ({card}) => {
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(card.title);
  const [tasks, setTasks] = useState<(TaskProps | CountingTaskProps)[]>(card.tasks);
  const [newTask, setNewTask] = useState<string>('');
  const [taskIdCounter, setTaskIdCounter] = useState<number>(1);
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [taskType, setTaskType] = useState<'normal' | 'counting'>('normal');
  const [showDoneTasks, setShowDoneTasks] = useState<boolean>(card.showDoneTasks);

  const onDelete = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleAddTaskClick = () => {
    setIsAddingTask(isAddingTask => !isAddingTask);
  };

  const handleShowDoneTasksChange = () => {
    setShowDoneTasks(!showDoneTasks);
  };

  const handleAddTask = (type: 'normal' | 'counting') => {
    setIsAddingTask(false);
    if (type === 'normal') {
      setTaskType('normal');
      addNormalTask();
    } else if (type === 'counting') {
      setTaskType('counting');
      addCountingTask();
    }
  };


  const addNormalTask = () => {
    if (newTask.trim() !== '') {
      const newTaskId = `task_${taskIdCounter}`;
      const normalTask: TaskProps = {
        id: newTaskId,
        title: newTask,
        body: newTask,
        done:false,
        type: 'normal',
        onDelete: () => onDelete(newTaskId),
      };
      setTasks(tasks => [...tasks, normalTask]);
      setNewTask('');
      setTaskIdCounter((prevCounter) => prevCounter + 1);
    }
  };

  const addCountingTask = () => {
    if (newTask.trim() !== '') {
      const newTaskId = `countingTask_${taskIdCounter}`;
      const countingTask: CountingTaskProps = {
        id: newTaskId,
        title: newTask,
        targetCount: 10,
        currentCount: 0,
        type: 'counting',
        done:false,
        onIncrement: () => {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === newTaskId
                ? { ...task, currentCount: (task as CountingTaskProps).currentCount + 1 }
                : task
            )
          );
        },
        onDelete: () => onDelete(newTaskId),
        onTargetCountChange: (newTargetCount) => {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === newTaskId ? { ...task, targetCount: newTargetCount } : task
            )
          );
        },
      };
      setTasks([...tasks, countingTask]);
      setNewTask('');
      setTaskIdCounter((prevCounter) => prevCounter + 1);
    }
  };


  const handleTaskTypeChange = (type: 'normal' | 'counting') => {
    setTaskType(type);
  };
  console.log(tasks);
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

      <div className="options">
        <label>
          <input
            type="checkbox"
            checked={showDoneTasks}
            onChange={handleShowDoneTasksChange}
          />
          Show Done Tasks
        </label>
      </div>

      <div className="add-task">
        <input
          type="text"
          placeholder="Add a task"
          value={newTask}
          onChange={(e: React.FormEvent<HTMLInputElement>) => setNewTask(e.currentTarget.value)}
        />
        <button onClick={handleAddTaskClick}>Add Task</button>
        {isAddingTask && (
          <div className="add-task-dropdown">
            <button onClick={() => handleAddTask('normal')}>Add Normal Task</button>
            <button onClick={() => handleAddTask('counting')}>Add Counting Task</button>
          </div>
        )}
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <React.Fragment key={task.id}>
            {task.type === 'normal' && 'body' in task ? (
               <Task task={task as TaskProps} show={showDoneTasks}/>
            ) : task.type === 'counting' && 'currentCount' in task ? (
              <CountingTask task={task as CountingTaskProps} show={showDoneTasks} />
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Card;
