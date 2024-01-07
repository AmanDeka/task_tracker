import express,{Request,Response} from 'express';
import dotenv from 'dotenv';
import path from 'path';

const app = express()
dotenv.config();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("D:/WebDev/task_tracker/frontend/build"))


app.get('/',(req:Request,res:Response)=>{
    res.sendFile('D:/WebDev/task_tracker/frontend/build/index.html');
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});