import express,{Request,Response}  from "express";
import { getCardByUserId ,getCardById} from "../models/card";

const cardRoutes = express.Router();

cardRoutes.get('/all', async (req: Request, res: Response) => {
    try {
        let userId: string | null = null;
        if (req.user) {
            if ('id' in req.user && typeof req.user.id == "string") userId = req.user.id;
        }

        if (!userId) {
            return res.status(400).json({ success: false, error: 'Not Authenticated' });
        }

        const userCards = await getCardByUserId(userId);


        res.status(200).json({ success: true, cards: userCards });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});



cardRoutes.get('/id/:cardId', async (req: Request, res: Response) => {
    try {
        let userId: string | null = null;
        if (req.user) {
            if ('id' in req.user && typeof req.user.id == "string") userId = req.user.id;
        }

        if (!userId) {
            return res.status(400).json({ success: false, error: 'Not Authenticated' });
        }

        const card = await getCardById(req.params.cardId);

        if(card?.userId !== userId){
            return res.status(400).json({ success: false, error: 'Not Authenticated for current user' });
        }


        res.status(200).json({ success: true, card: card });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


export default cardRoutes;