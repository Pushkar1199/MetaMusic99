const { buildSchema} = require('graphql')

module.exports = buildSchema(`
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
`);