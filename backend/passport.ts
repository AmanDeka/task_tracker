// auth/index.ts
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserByEmail, User, getUserById } from './postgres';
import bcrypt from 'bcrypt';





passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            // Fetch the user by email
            const user = await getUserByEmail(email);

            console.log(email,password);

            if (!user) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }

            // Compare the provided password with the hashed password from the database
            let isPasswordMatch = undefined;
            if (user.passwordhash) {
                isPasswordMatch = await bcrypt.compare(password, user.passwordhash);
            }

            if (!isPasswordMatch) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }

            // If the password matches, return the user object
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser((user: User, done) => {
    console.log("Serialize",user.id);
    done(null, user.id);
});

passport.deserializeUser(async (id:string, done) => {
    try {
      // Implement a function to fetch the user by ID from your database
      const user = await getUserById(id);
  
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error);
    }
  });
  

export default passport;
