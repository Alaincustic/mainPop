const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3000 || process.env.PORT;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// List of allowed frontend origins for CORS
const allowedOrigins = [
  "https://thaibasiljp.com",
  "https://sakiinstant.shop",
  "https://sakiinstant.shop/",
  "http://sakiinstant.shop",
  "http://sakiinstant.shop/",
  "http://thaibasiljp.com",
  "https://theteamania.shop",
  "http://theteamania.shop",
  "https://theteamania.shop/",
  "http://theteamania.shop/",
  "http://127.0.0.1:5501",
  "http://127.0.0.1:5500",
  "https://halcyoninjp.live",
  "http://halcyoninjp.live",
  "https://halcyoninjp.live/",
  "http://halcyoninjp.live/",
  "https://hotnihonnews.today",
  "https://hotnihonnews.today/",
  "http://hotnihonnews.today",
  "http://hotnihonnews.today/",
];

// List of allowed referrers
const allowedReferrers = [
  "https://thaibasiljp.com",
  "https://sakiinstant.shop",
  "https://sakiinstant.shop/",
  "http://sakiinstant.shop",
  "http://sakiinstant.shop/",
  "http://thaibasiljp.com",
  "https://theteamania.shop",
  "http://theteamania.shop",
  "https://theteamania.shop/",
  "http://theteamania.shop/",
  "http://127.0.0.1:5501",
  "http://127.0.0.1:5500",
  "https://halcyoninjp.live",
  "http://halcyoninjp.live",
  "https://halcyoninjp.live/",
  "http://halcyoninjp.live/",
  "https://hotnihonnews.today",
  "https://hotnihonnews.today/",
  "http://hotnihonnews.today",
  "http://hotnihonnews.today/",
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

// app.use(cors());

// app.post("/submit-phone", (req, res) => {
//   // Log the phone number on the server side
//   console.log("Received phone number:", req.body);

//   res.header("Access-Control-Allow-Origin", "*"); // Allow CORS from any origin

//   // Send a response back to the client
//   res.json({ message: "Phone number submitted successfully" });
// });

app.listen(PORT, () => {
  console.log(`Server is running`);
});
