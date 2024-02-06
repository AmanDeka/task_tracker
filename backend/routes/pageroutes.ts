import express,{Request,Response}  from "express";
import { getDailyTaskPage ,getPagesByUserId,getPageById,insertPage} from "../models/page";

const pageRoutes = express.Router();

pageRoutes.get('/dailytaskpage', async (req: Request, res: Response) => {
    try {
        let userId: string | null = null;
        if (req.user) {
            if ('id' in req.user && typeof req.user.id == "string") userId = req.user.id;
        }

        if (!userId) {
            return res.status(400).json({ success: false, error: 'Not Authenticated' });
        }

        const page = await getDailyTaskPage(userId);


        res.status(200).json({ success: true, page:page });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

pageRoutes.get('/all', async (req: Request, res: Response) => {
    try {
        let userId: string | null = null;
        if (req.user) {
            if ('id' in req.user && typeof req.user.id == "string") userId = req.user.id;
        }

        if (!userId) {
            return res.status(400).json({ success: false, error: 'Not Authenticated' });
        }

        const pages = await getPagesByUserId(userId);


        res.status(200).json({ success: true, pages:pages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});



pageRoutes.get('/id/:pageId', async (req: Request, res: Response) => {
    try {
        let userId: string | null = null;
        if (req.user) {
            if ('id' in req.user && typeof req.user.id == "string") userId = req.user.id;
        }

        if (!userId) {
            return res.status(400).json({ success: false, error: 'Not Authenticated' });
        }

        const page = await getPageById(req.params.pageId);



        res.status(200).json({ success: true, page: page });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


pageRoutes.post('/insert', async (req: Request, res: Response) => {
    try {
        let userId: string | null = null;
        if (req.user) {
            if ('id' in req.user && typeof req.user.id == "string") userId = req.user.id;
        }

        if (!userId) {
            return res.status(400).json({ success: false, error: 'Not Authenticated' });
        }

        const page = req.body;

        const insertedPage = await insertPage({...page,userId:userId});


        res.status(200).json({ success: true, page: insertedPage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});



export default pageRoutes;