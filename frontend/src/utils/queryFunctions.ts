import { CardProps } from "../components/Card";
import axios from "axios";

export const addCard = () => {
    const newCard: CardProps = {
      title: `New Card`,
      showDoneTasks: false,
    };
    const response = axios({
      url: '/card/insert', method: 'POST', withCredentials: true,
      data: newCard
    }).then(data => data.data).then(data => data.card);
    return response;
  };

  const getAllCards = ()=>{
    
  }