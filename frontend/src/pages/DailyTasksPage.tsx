// DailyTasksPage.js

import React, { useState } from 'react';
import Card from '../components/Card';
import { useMutation,useQueryClient ,useQuery} from '@tanstack/react-query';
import { addCard } from '../utils/queryFunctions';
import { CardProps } from '../utils/customTypes';



const DailyTasksPage: React.FC<{id:string}> = ({id}) => {
  const [cards, setCards] = useState<CardProps[]>([]);

  const queryClient = useQueryClient();

  const addTaskMutation = useMutation({
    mutationFn: addCard,
    onSuccess: (data) => {
      queryClient.setQueryData(['cards','dailytaskpage'],(prevData:CardProps[])=>{
        return [...prevData,data];
      });
    }
  })

  const handleAddCard = () => {

  }

  return (
    <div className="daily-tasks-page">
      <h1>Daily Tasks</h1>
      <button onClick={handleAddCard}>Add Card</button>


      <div className="cards">
        {cards.map((card) => (
          <Card card={card as CardProps} />
        ))}
      </div>
    </div>
  );
};

export default DailyTasksPage;
