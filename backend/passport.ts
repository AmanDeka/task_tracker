// auth/index.ts
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

// Mock user data for testing
export type User = {
    id?: number,
    username?: string,
    password?: string
};
const users: User[] = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
];



passport.use(
    new LocalStrategy((username, password, done) => {
        console.log(username, password);
        const user = users.find((u) => u.username === username && u.password === password);

        if (!user) {
            return done(null, false, { message: 'Incorrect username or password' });
        }

        return done(null, user);
    })
);

passport.serializeUser((user: User, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find((u) => u.id === id);
    done(null, user);
});

export default passport;
