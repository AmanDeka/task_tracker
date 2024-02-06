import React, { useState, useEffect, useRef } from 'react';
import icon from "../icons/dots.png";
import { TaskProps } from '../utils/customTypes';


const Task: React.FC<{ task: TaskProps; show: boolean }> = ({ task, show }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [body, setBody] = useState(task.body);
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState('');
  const [isAddingLink, setIsAddingLink] = useState(false);
  const linkInputRef = useRef<HTMLInputElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTaskDone, setIsTaskDone] = useState(task.done);

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleLinkInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkInput(e.target.value);
  };

  const addLink = () => {
    setIsAddingLink(true);
  };

  const handleLinkInputBlur = () => {
    if (linkInput.trim() !== '') {
      setLinks([...links, linkInput]);
      setBody(`${body} [${linkInput}](#${linkInput})`);
      setLinkInput('');
    }
    setIsAddingLink(false);
  };

  const handleDeleteTask = () => {
    task.onDelete(task.id);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTaskDoneChange = () => {
    setIsTaskDone(!isTaskDone);
  };

  useEffect(() => {
    if (isTaskDone) {
      // Handle logic for a completed task (e.g., change styles, update database, etc.)
    }
  }, [isTaskDone]);

  useEffect(() => {
    if (isAddingLink) {
      linkInputRef.current?.focus();
    }
  }, [isAddingLink]);

  return (
    <div className={`task ${isTaskDone && !show ? 'hidden' : ''} ${isTaskDone ? 'completed' : ''}`}>
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
          <input
            type="checkbox"
            checked={isTaskDone}
            onChange={handleTaskDoneChange}
            className="done-checkbox"
          />

          <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>

            <button className="dropbtn" onClick={toggleDropdown}>
              <img className="dropicon" src={icon} />
            </button>
            <div className="dropdown-content">
              <button onClick={handleDeleteTask}>Delete</button>
              <button onClick={addLink}>Add Link</button>
            </div>
          </div>
        </div>
      </div>
      <div className="task-body">
        <textarea
          placeholder="Add task details..."
          value={body}
          onChange={handleBodyChange}
        />
        <div className="link-input">
          {isAddingLink && (
            <input
              ref={linkInputRef}
              type="text"
              placeholder="Enter link..."
              value={linkInput}
              onChange={handleLinkInputChange}
              onBlur={handleLinkInputBlur}
            />
          )}
        </div>
      </div>
      <div className="task-links">
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <a href={`#${link}`} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Task;
