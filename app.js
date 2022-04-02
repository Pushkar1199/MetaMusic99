const express = require("express");
const bodyParser = require("body-parser");
// const {graphqlHttp} = require("express-graphql");
const graphqlHttp = require("express-graphql").graphqlHTTP;
const { buildSchema } = require("graphql");


const app = express();

app.use(bodyParser.json());
const musics = [
  {
    id: "m1",
    title: "string",
    album: "string",
    artist: "string",
    year: 2020,
    metaData: [
      {
        key: "string",
        value: "string",
      },
    ],
  },
  {
    id: "m2",
    title: "string2",
    album: "string2",
    artist: "string2",
    year: 2020,
    metaData: [
      {
        key: "string2",
        value: "string2",
      },
    ],
  },
  {
    id: "m3",
    title: "string3",
    album: "string3",
    artist: "string3",
    year: 2021,
    metaData: [
      { key: "string3", value: "string3" },
      { key: "string31", value: "string31" },
    ],
  },
];

app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
        type metadata {
            key : String!
            value: String!
        }
        input metadataInput {
            key : String!
            value: String!
        }
        input musicInput {
            id: String!
            title: String!
            album: String!
            artist: String!
            year: Int!
            metaData : [metadataInput]!
        }
        type music {
            id: String!
            title: String!
            album: String!
            artist: String!
            year: Int!
            metaData : [metadata!]!
        }
        type RootQuery {
            musics : [music!]!
            music : music
        }   
        type RootMutation {
            addMusic(MusicInput : musicInput) : [music!]!
            delMusic(musicId : String!) : [music!]!
            updateTitle (musicId : String!,title : String!) : music
            updateArtist(musicId : String!,artist : String!):music 
            updateYear(musicId : String!,year : Int!):music
            addMeta(musicId : String!,key : String!,value: String!):music
            rmMeta(musicId : String!,key : String!): music

        }  
        schema {
            query: RootQuery 
            mutation : RootMutation           
        }
    `),
    rootValue: {
      musics: () => {
        return musics;
      },
      music: () => {
        return musics[0];
      },
      addMusic: (args) => {
        const music = {
          id: Math.random().toString(),
          title: args.MusicInput.title,
          album: args.MusicInput.album,
          artist: args.MusicInput.artist,
          year: args.MusicInput.year,
          metaData: args.MusicInput.metaData,
        };
        musics.push(music);
        console.log(music);
        return musics;
      },
      delMusic: (args) => {
        const element = musics.find((music) => {
          music.id === args.musicId;
        });
        let index = musics.indexOf(element);
        musics.splice(index, 1);
        return musics;
      },
      updateTitle: (args) => {
        const music = musics.find((m) => m.id === args.musicId);
        music.title = args.title;
        return music;
      },
      updateArtist: (args) => {
        const music = musics.find((m) => m.id === args.musicId);
        music.artist = args.artist;
        return music;
      },
      updateYear: (args) => {
        const music = musics.find((m) => m.id === args.musicId);
        music.year = args.year;
        return music;
      },
      addMeta: (args) => {
          const meta = {
              key:args.key,
              value: args.value
          }
          const music = musics.find( m => m.id === args.musicId);
          music.metaData.push(meta);
          console.log(music);
          return music;
      },
      rmMeta: (args) => {
        const music = musics.find( m => m.id === args.musicId);
        const meta = music.metaData;
        meta.forEach((ele ,i) => {
            if(ele.key===args.key)
            {
                meta.splice(i,1);
            }
        })
        return music;
      }
    },
    graphiql: true,
  })
);

app.get("/", (req, res, next) => {
  res.send("hello Wolrd");
});

app.listen(5000);

//,metaData:[{key:"string3",value:"string3"},{key:"string31",value:"string31"}]
