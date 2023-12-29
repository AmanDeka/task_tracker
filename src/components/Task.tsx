import React, { useState, useEffect, useRef } from 'react';

export interface TaskProps {
    title: string;
    body: string;
}

const Task: React.FC<{task:TaskProps}> = ({ task }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [body, setBody] = useState(task.body);
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState('');
  const [isAddingLink, setIsAddingLink] = useState(false);
  const linkInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (isAddingLink) {
      linkInputRef.current?.focus();
    }
  }, [isAddingLink]);

  return (
    <div className="task">
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
      <div className="task-body">
        <textarea
          placeholder="Add task details..."
          value={body}
          onChange={handleBodyChange}
        />
        <div className="task-links">
          <p>Links:</p>
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
        {isAddingLink && (
          <div className="link-input">
            <input
              ref={linkInputRef}
              type="text"
              placeholder="Enter link..."
              value={linkInput}
              onChange={handleLinkInputChange}
              onBlur={handleLinkInputBlur}
            />
          </div>
        )}
        <button onClick={addLink}>Add Link</button>
      </div>
    </div>
  );
};

export default Task;
