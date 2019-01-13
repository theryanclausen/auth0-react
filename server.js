const express = require("express");
const port = 3001;
const cors = require("cors");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://ps-auth0.auth0.com/.well-known/jwks.json`
  }),

  audience: 'http://localhost:3001',
  issuer: `https://ps-auth0.auth0.com/`,

  algorithms: ["RS256"]
});

const app = express();

app.use(cors());

app.get("/public", (req, res) => {
  res.json({ message: "I am public on the server" });
});

app.get("/private",checkJwt, (req, res) => {
    res.json({ message: "I am private on the server" });
  });

app.listen(port, () => console.log(`${port} hears you`));
