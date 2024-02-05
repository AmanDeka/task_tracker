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

export const getAllCards = (pageId: string) => {
    const response = axios({
        url: `/all/${pageId}`, method: 'GET', withCredentials: true
    }).then(data => data.data).then(data => data.cards);
    return response;
}