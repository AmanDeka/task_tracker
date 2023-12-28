import React, { FunctionComponent } from 'react';

type taskProp = {
    text:string
};


const Task:FunctionComponent<{task:taskProp}> = ({ task }) => {
    return (
      <div className="task">
        {task.text}
      </div>
    );
};
  

export default Task;