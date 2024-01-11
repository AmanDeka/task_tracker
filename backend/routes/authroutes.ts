import express, { Response, Request } from 'express';
import passport from '../passport';
import bcrypt from 'bcrypt';
import { insertUser, User } from '../postgres';

const authroutes = express.Router();

function generateUniqueId() {
    const timestamp = Date.now().toString(36);
    const randomChars = Math.random().toString(36).substring(2, 7);
    const randomNumbers = Math.floor(Math.random() * 1000000).toString(36);

    return timestamp + randomChars + randomNumbers;
}

authroutes.post('/password', passport.authenticate('local'), (req: Request, res: Response) => {
    if (req.user) res.json({ user: req.user });
})

authroutes.get('/user', (req: Request, res: Response) => {
    if (req.user) res.json({ user: req.user });
    else res.json({ user: null });
})

authroutes.post('/logout', function (req: Request, res: Response, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.send();
    });
});

authroutes.post('/signup', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a unique ID (You can use UUID or any other method)
        const userId = generateUniqueId();

        const user: User = {
            id: userId,
            name: name,
            email: email,
            password: hashedPassword
        }

        // Insert user data into PostgreSQL table
        insertUser(user);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default authroutes;
