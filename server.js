const express = require("express");
const port = process.env.PORT || 3001;
const cors = require("cors");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const checkScope = require("express-jwt-authz");
const knex = require("knex");
const knexConfig = require("./knexfile");

const db = knex(knexConfig.development);

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
app.use(express.json())

app.get("/public", (req, res) => {
  res.json({ message: "I am public on the server" });
});

app.get("/private", checkJwt, (req, res) => {
  res.json({ message: "I am private on the server" });
});

app.get("/calendar", checkJwt, checkScope(["read:calendar"]), (req, res) => {
  res
    .status(200)
    .json({
      events: [
        { id: 1, event: "Baseball game", date: "2019-01-22" },
        { id: 2, event: "Tap Dance Contest", date: "2019-01-23" }
      ]
    });
});

const checkRole = role => {
  return (req, res, next) => {
    const assignedRoles =
      req.user[`https://silly-allen-077c12.netlify.com/roles`];
    if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
      return next();
    } else {
      return res.status(401).send("Insufficient role");
    }
  };
};

app.get("/admin", checkJwt, checkRole("admin"), (req, res) => {
  res.json({
    message: "You must have used google or else you wouldn't be seeing this"
  });
});

app.get('/profile', async (req,res)=>{
  try{
    const profiles = await db('userTable')
    return res.status(200).json(profiles)
  }catch(err){
    return res.json(err)
  }
})

app.get('/family', async (req,res)=>{
  try{
    const profiles = await db('family')
    return res.status(200).json(profiles)
  }catch(err){
    return res.json(err)
  }
})

app.get("/profile/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const profile = await db("userTable")
      .where({ email })
      .join("family", "userTable.family_id", "=", "family.id")
      .select(
        "userTable.id",
        "userTable.email",
        "userTable.name",
        "userTable.family_id",
        "family.family_name"
      )
      .first();

      profile.email = profile.email.toLowerCase()
      if(!profile.name){
        res.status(200).json({message: 'no profile'})
      }
    return res.status(200).json(profile);
  } catch (err) {
    res.json({ err });
  }
});

app.post('/profile', async (req,res) =>{
  const body = req.body;
  body.email = body.email.toLowerCase()
  try{
    const id = await db('userTable').insert(body)
    const newProfile = await db('userTable').where({id:id[0]}).first()
    return res.status(201).json(newProfile)
  }catch(err){
    res.json({err})
  }
})

app.post('/family', async (req,res) =>{
  const {body} = req;
   try{
    const id = await db('family').insert(body)
    const newProfile = await db('family').where({id:id[0]}).first()
    return res.status(201).json(newProfile)
  }catch(err){
    res.json({err})
  }
})

app.listen(port, () => console.log(`${port} hears you`));
