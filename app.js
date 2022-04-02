const express = require("express");
const bodyParser = require("body-parser");
// const {graphqlHttp} = require("express-graphql");
const graphqlHttp = require("express-graphql").graphqlHTTP;
//const { buildSchema } = require("graphql");
const graphQlSchema = require('./schema/schema')
const graphQlResolvers = require('./resolver/resolver')

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
  res.send("hello Wolrd");
});

app.listen(5000);

//,metaData:[{key:"string3",value:"string3"},{key:"string31",value:"string31"}]
