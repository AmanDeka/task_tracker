import { Schema } from "mongoose";
import mongoose from "../mongoose";

const PageSchema = new Schema({
    title: String,
    userId:String,
    isDailyTasks:Boolean
});

type pageType = {
    title:string,
    userId:string,
    isDailyTasks:boolean
};

const pageModel = mongoose.model('Page',PageSchema);

export const getDailyTaskPage = async (userId:string) => {
    try{
        const page = await pageModel.findOne({userId:userId,isDailyTasks:true})
        .select({_id:1,title:1,isDailyTasks:1})
        .exec();
        return page;
    }
    catch(e){
        throw e;
    }
}

export const getPagesByUserId = async (userId:string) => {
    try{
        const pages = await pageModel.find({userId:userId,isDailyTasks:false})
        .select({_id:1,title:1,isDailyTasks:1})
        .exec();
        return pages;
    }
    catch(e){
        throw e;
    }
}

export const getPageById = async (Id:string) => {
    try{
        const page = await pageModel.findOne({_id:Id})
        .select({_id:1,title:1,isDailyTasks:1})
        .exec();
        return page;
    }
    catch(e){
        throw e;
    }
}

export const insertPage = async (page:pageType) => {
    try{
        const newPage = await pageModel.create(page);
        const title = newPage.title;
        const id = newPage._id;
        const isDailyTasks = newPage.isDailyTasks;
        return {title,id,isDailyTasks};
    }
    catch(e){
        throw e;
    }
}







