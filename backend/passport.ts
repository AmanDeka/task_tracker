// auth/index.ts
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

// Mock user data for testing
type User = {
    id?:number,
    username?:string,
    password?:string
};
const users:User[] = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

passport.serializeUser((user:User, done) => {
  done(null, user.id);
});

passport.deserializeUser<any, any>((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
      return done(null, false, { message: 'Incorrect username or password' });
    }

    return done(null, user);
  })
);

export default passport;
