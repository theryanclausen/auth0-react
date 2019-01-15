const express = require("express");
const port = process.env.PORT || 3001;
const cors = require("cors");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const checkScope = require("express-jwt-authz");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://ps-auth0.auth0.com/.well-known/jwks.json`
  }),

  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,

  algorithms: ["RS256"]
});

const app = express();

app.use(cors());

app.get("/public", (req, res) => {
  res.json({ message: "I am public on the server" });
});

app.get("/private", checkJwt, (req, res) => {
  res.json({ message: "I am private on the server" });
});

app.get("/calendar", checkJwt,checkScope(['read:calendar']), (req, res) => {
  res.status(200).json({ events: [{id:1, event: 'Baseball game', date:'2019-01-22'},{id:2, event: 'Tap Dance Contest', date:'2019-01-23'}] });
});

const checkRole= role =>{
    return (req, res, next) => {
        const assignedRoles = req.user[`https://silly-allen-077c12.netlify.com/roles`]
        if (Array.isArray(assignedRoles) && assignedRoles.includes(role)){
            return next()
        }else{
            return res.status(401).send('Insufficient role')
        }
    }
}

app.get("/admin", checkJwt,checkRole('admin'), (req, res) => {
    res.json({ message: "You must have used google or else you wouldn't be seeing this" });
  });
  

app.listen(port, () => console.log(`${port} hears you`));
