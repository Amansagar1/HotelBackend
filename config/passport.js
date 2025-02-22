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
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Adjust this based on your User model
const bcrypt = require('bcryptjs');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET,CALLBACK_URL } = process.env; 

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Field to match in the login request
    },
    async (email, password, done) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        // Return the user object if authentication succeeds
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Passport Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL, // Make sure this matches the callback URL in your Google Console
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find the user by Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If user doesn't exist, create a new user
          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value, // Use the user's email from Google profile
            // You can store more info like profile photos or Google account details if needed
          });

          await user.save();
        }

        // Pass the user object to the next middleware or route
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize and deserialize user to maintain session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;