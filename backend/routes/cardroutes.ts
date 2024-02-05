import express,{Request,Response}  from "express";
import { getCardsByPageId ,getCardById,insertCard} from "../models/card";

const cardRoutes = express.Router();

cardRoutes.get('/all/:pageId', async (req: Request, res: Response) => {
    try {
        let userId: string | null = null;
        if (req.user) {
            if ('id' in req.user && typeof req.user.id == "string") userId = req.user.id;
        }

        if (!userId) {
            return res.status(400).json({ success: false, error: 'Not Authenticated' });
        }

        const cards = await getCardsByPageId(req.params.pageId);


        res.status(200).json({ success: true, cards: cards });
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


cardRoutes.post('/insert', async (req: Request, res: Response) => {
    try {
        let userId: string | null = null;
        if (req.user) {
            if ('id' in req.user && typeof req.user.id == "string") userId = req.user.id;
        }

        if (!userId) {
            return res.status(400).json({ success: false, error: 'Not Authenticated' });
        }

        const card = req.body;

        const insertedCard = await insertCard({...card,userId:userId});


        res.status(200).json({ success: true, card: insertedCard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});



export default cardRoutes;