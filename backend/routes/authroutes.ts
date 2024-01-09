import express,{Response,Request} from 'express';
import passport from '../passport';

const authroutes = express.Router();

authroutes.post('/password',passport.authenticate('local'),(req:Request,res:Response)=>{
    if(req.user)res.json({user:req.user});
})

authroutes.get('/user',(req:Request,res:Response)=>{
    if(req.user)res.json({user:req.user});
    else res.json({user:null});
})


export default authroutes;
