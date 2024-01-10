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

authroutes.post('/logout', function(req:Request, res:Response, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      //res.redirect('/');
      res.send();
    });
  });


export default authroutes;
