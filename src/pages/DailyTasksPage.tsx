// DailyTasksPage.js

import React, { useState } from 'react';
import Card,{CardProps} from '../components/Card';

const DailyTasksPage = () => {
  const [cards, setCards] = useState<CardProps[]>([]);

  const addCard = () => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; // Get only the date part
    const cardId = `card_${cards.length + 1}_${formattedDate}`;
    const newCard:CardProps= {
      id: cardId,
      title: `New Card ${cards.length + 1}`,
      tasks: [],
    };
    setCards([...cards, newCard]);
  };

  return (
    <div className="daily-tasks-page">
      <h1>Daily Tasks</h1>
      <button onClick={addCard}>Add Card</button>

      <div className="cards">
        {cards.map((card) => (
          <Card card = {card as CardProps} />
        ))}
      </div>
    </div>
  );
};

export default DailyTasksPage;
