const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3000 || process.env.PORT;

// List of allowed frontend origins for CORS
const allowedOrigins = [
  "https://japanesegardening.live",
  "http://japanesegardening.live",
  "http://127.0.0.1:5500",
  "https://shootinggamejapan.netlify.app",
  "http://shootinggamejapan.netlify.app",
];

// List of allowed referrers
const allowedReferrers = [
  "https://japanesegardening.live",
  "http://japanesegardening.live",
  "http://127.0.0.1:5500",
  "https://shootinggamejapan.netlify.app",
  "http://shootinggamejapan.netlify.app",
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Apply the CORS middleware
app.use(cors(corsOptions));

// Check against the allowedReferrers
app.get(
  "/",
  (req, res, next) => {
    const referer = req.headers.referer;

    // Check if the referer exists in the allowedReferrers array
    if (
      referer &&
      allowedReferrers.some((domain) => referer.startsWith(domain))
    ) {
      next();
    } else {
      res.status(403).send("Access forbidden");
    }
  },
  (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
    // res.send(`<iframe width="100%" height="100%" margin-top:"30%" src="https://www.youtube.com/embed/463tZXEDhig?si=okMgnV6S1RF1XDhN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`);
  }
);

app.listen(PORT, () => {
  console.log(`Server is running`);
});
