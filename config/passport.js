// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/User'); // Adjust this based on your User model
// const bcrypt = require('bcryptjs');

// // Passport Local Strategy for login
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: 'email', // Field to match in the login request
//     },
//     async (email, password, done) => {
//       try {
//         // Find the user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//           return done(null, false, { message: 'Incorrect email or password' });
//         }

//         // Compare the password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//           return done(null, false, { message: 'Incorrect email or password' });
//         }

//         // Return the user object if authentication succeeds
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// // Serialize and deserialize user to maintain session
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error);
//   }
// });

// module.exports = passport;
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            username: profile.displayName,
          });
          await user.save();
        }

        done(null, user); // This will pass the user to the callback route
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Serialize and Deserialize User (if using sessions)
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
