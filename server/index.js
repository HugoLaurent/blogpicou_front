require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const users = [];

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      let user = users.find((u) => u.id === profile.id);
      if (!user) {
        user = { id: profile.id, username: profile.username };
        users.push(user);
      }
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

// Routes
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => res.redirect("http://localhost:5173/")
);

app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) return res.json(req.user);
  res.status(401).json({ error: "Not authenticated" });
});

app.get("/logout", (req, res) => {
  req.logout(() => res.redirect("http://localhost:5173/login"));
});

app.listen(3000, () => console.log("Server on http://localhost:3000"));
