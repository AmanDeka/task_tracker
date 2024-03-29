import { Schema } from "mongoose";
import mongoose from "../mongoose";

const CardSchema = new Schema({
    _id: Schema.Types.UUID,
    title: String,
    showDoneTasks: Boolean,
    userId:String,
    pageId:String
});

type cardType = {
    title:string,
    showDoneTasks: boolean,
    userId:string
};

const cardModel = mongoose.model('Card',CardSchema);

export const getCardsByPageId = async (pageId:string) => {
    try{
        const cards = await cardModel.find({pageId:pageId})
        .select({_id:1,title:1,showDoneTasks:1})
        .exec();
        return cards;
    }
    catch(e){
        throw e;
    }
}

export const getCardById = async (Id:string) => {
    try{
        const card = await cardModel.findOne({_id:Id})
        .select({_id:1,title:1,showDoneTasks:1})
        .exec();
        return card;
    }
    catch(e){
        throw e;
    }
}

export const insertCard = async (card:cardType) => {
    try{
        const newCard = await cardModel.create(card);
        const title = newCard.title;
        const id = newCard._id;
        const showDoneTasks = newCard.showDoneTasks;
        return {title,id,showDoneTasks};
    }
    catch(e){
        throw e;
    }
}







