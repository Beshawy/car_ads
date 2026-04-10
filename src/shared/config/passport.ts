import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import prisma from '../prisma';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0]?.value;
        if (!email) {
          return done(new Error('Google account does not have an email address'), undefined);
        }

        // Check if user already exists by googleId
        let user = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });

        if (user) {
          return done(null, user);
        }

        // Check if user exists by email
        user = await prisma.user.findUnique({
          where: { email },
        });

        if (user) {
          // Link google account to existing user
          user = await prisma.user.update({
            where: { id: user.id },
            data: { googleId: profile.id },
          });
          return done(null, user);
        }

        // Create new user if neither googleId nor email matches
        user = await prisma.user.create({
          data: {
            name: profile.displayName || 'Google User',
            email: email,
            googleId: profile.id,
            // phone and password can remain null
          },
        });

        return done(null, user);
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);

export default passport;
