# MetaMusic


MetaMusic is a backend server using GraphQL API.
<img alt="GraphQL Logo" align="right" src="https://graphql.org/img/logo.svg" width="15%" />

### Features

1. `music`: A user can query/mutate the music
2. Only title, artist and year are mutable in a `music`.
3. `metaData`: A user can add/remove `metaData` to/from `music`


### Tech
1. GraphQL.js 
2. ExpressJS
3. DB (POSTGRES)

Dillinger uses a number of open source projects to work properly:


## Testing Instruction
[http://music-lib99.herokuapp.com/](http://music-lib99.herokuapp.com/) Hosted App URL

Testing can be performed on [http://music-lib99.herokuapp.com/graphql](http://music-lib99.herokuapp.com/graphql)

### Data-Type
```
music  {
    id: string
    title: string
    album: string
    artist: string
    year: number
    metaData: [{
        key: string,
        value: string
    }]
}
```

```
metaData {
    key: string
    value: string
}
```

### Query Syntax
An example query on the above schema would be:

```graphql
query{
  musics{
    id
    title
    album 
    artist
    year
    metaData {
        key
        value
    }
  }
}
```
A Query to Get a music 
```graphql
query{
    music(musicId:""){
        id
        title
        album 
        artist
        year
        metaData{
            key
            value
        }
    }
}
```
Properties responsed are variable according to request parameters.

A Query To mutate data is like
```graphql
mutation{
    (MusicInput:{id:"m4",title:"music4",album:"album4",artist:"artist4",year: 2022,metaData:[{key:"k4",value:"v4"},{key:"k41",value:"k41"}]}){
        id
        title
        .
        .
    }
}
```
Queries for getting data ara `musics`: to gather all data & `music(musicId:"id")` to request a specific data point.

### Queries for data mutation are 
1. `addMusic` to add music record to database. 
2. `delMusic(muiscId:"")` to delete a specific data record.
3. `UpdateTitle(musicId:"",title:"")`,`UpdateArtist(musicId:"",atist:"")`and `UpdateYear(musicId:"",year:number` for updating mutable records.

4. For meta Data `addMeta(musicId:"",key:"",value:"")` for adding meta data to existing music record.
5. `rmMeta(musicId:"",key:"")` for removing specific meta data record from music database.

For example queries (the demo data contains musicId strings from "m1" to "m4")
```graphql
query{
    music(musicId="m1")
    {
        id
        title
        album 
        artist
        year
        metaData{
            key
            value
        }
    }
}
```
This generates following response 
```graphql
{
  "data": {
    "music": {
      "id": "m1",
      "title": "Title_string",
      "album": "album_string",
      "artist": "Himesh",
      "year": 1869,
      "metaData": [
        {
          "key": "k1",
          "value": "v1"
        },
        {
          "key": "k2",
          "value": "v2"
        },
        {
          "key": "k3",
          "value": "v3"
        }
      ]
    }
  }
}
```
987a1c2ae6f3ed1a418faeb7096ea36f3633cd85
