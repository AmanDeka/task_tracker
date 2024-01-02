// CountingTask.js

import React, { useState } from 'react';

export interface CountingTaskProps {
  id: string;
  title: string;
  targetCount: number;
  currentCount: number;
  type:'counting';
  onIncrement: () => void;
  onDelete: () => void;
  onTargetCountChange: (newTargetCount: number) => void;
}

const CountingTask: React.FC<{ task: CountingTaskProps }> = ({ task }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [isEditingTargetCount, setIsEditingTargetCount] = useState(false);
  const [targetCount, setTargetCount] = useState(task.targetCount);


  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleIncrement = () => {
    task.onIncrement();
  };

  const handleDeleteTask = () => {
    task.onDelete();
  };

  const handleTargetCountClick = () => {
    setIsEditingTargetCount(true);
  };

  const handleTargetCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetCount(parseInt(e.target.value, 10) || 0);
  };

  const handleTargetCountBlur = () => {
    setIsEditingTargetCount(false);
    task.onTargetCountChange(targetCount);
  };

  const calculateProgress = () => {
    return Math.min((task.currentCount / task.targetCount) * 100, 100);
  };

  return (
    <div className="task">
      <div className="task-header">
        <div className="task-title" onClick={handleTitleClick}>
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
        <div className="task-actions">
          <button onClick={handleIncrement}>Increment</button>
          <button onClick={handleDeleteTask}>Delete</button>
        </div>
      </div>
      <div className="task-body">
        <p onClick={handleTargetCountClick}>
          Target Count:{' '}
          {isEditingTargetCount ? (
            <input
              type="number"
              value={targetCount}
              onChange={handleTargetCountChange}
              onBlur={handleTargetCountBlur}
              autoFocus
            />
          ) : (
            <span>{task.targetCount}</span>
          )}
        </p>
        <p>Current Count: {task.currentCount}</p>
        <progress max={task.targetCount} value={task.currentCount}></progress>
      </div>
    </div>
  );
};

export default CountingTask;
