import mongoose, { Schema } from "mongoose";

const CardSchema = new Schema({
    _id: Schema.Types.UUID,
    title: String,
    showDoneTasks: Boolean,
    userId:String
});


mongoose.connect(process.env.MONGODB_URL||'');

const cardModel = mongoose.model('Card',CardSchema);

export const getCardByUserId = async (userId:string) => {
    try{
        const card = await cardModel.find({userId:userId})
        .select({_id:1,title:1,showDoneTasks:1})
        .exec();
        return card;
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







