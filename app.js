const express = require("express");
const bodyParser = require("body-parser");
// const {graphqlHttp} = require("express-graphql");
const graphqlHttp = require("express-graphql").graphqlHTTP;
//const { buildSchema } = require("graphql");
const graphQlSchema = require('./schema/schema')
const graphQlResolvers = require('./resolver/resolver')
const { pool } = require("./Db/Db")

const app = express();

app.use(bodyParser.json()); 

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

app.get("/", (req, res, next) => {
  res.send(`<h2><a href = '/graphql'>CLICK TO CONTINUE TO UI </a></h2><h3><a href = "https://github.com/Pushkar1199/music-lib/blob/master/README.md">README</a></h3>`);
});

app.listen(process.env.PORT || 5000);

//,metaData:[{key:"string3",value:"string3"},{key:"string31",value:"string31"}]
