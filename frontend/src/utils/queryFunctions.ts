import axios from "axios";
import { CardProps,SignUpFormData } from "./customTypes";

export const getUser = () => {
    const response = axios({ url: '/auth/user', method: 'GET', withCredentials: true, })
      .then(data => {
        return data.data;
      })
      .then(data => {
        return data.user;
      })
  
    return response;
  }


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

export const signupUser = (formData: SignUpFormData) => {
    const response = axios({
        url: '/auth/signup', method: 'POST', withCredentials: true,
        data: formData
    })
    return response;
}

export const createDailyTaskPage = () => {
    const response = axios({
        url: '/data/page/dailytaskpage', method: 'POST', withCredentials: true,
    }).then(data=>data.data).then(data=>data.page);
    return response;
}

export const getDailyTaskPage = () => {
    const response = axios({
        url: '/data/page/dailytaskpage', method: 'GET', withCredentials: true,
    }).then(data=>data.data).then(data=>data.page);
    return response;
}