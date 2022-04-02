const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
})

pool.connect((err) => {
    if (err) {
        return console.error(err);
    }
    console.log("PostgreSQL DATABASE CONNECTED");
});

const text =` CREATE TABLE IF NOT EXIST music(
    id varchar(255) primary key,
    title  varchar(255),
    album  varchar(255),
    artist  varchar(255),
    year    integer
);

CREATE TABLE IF NOT EXIST metaData (
    id serial primary key,
    key   varchar(255),
    value varchar(255),
    music_id varchar(255)   
);

INSERT INTO MUSIC (id,title,album,artist,year) VALUES("m1","Title_string","album_string","artist_string",2020);
INSERT INTO MUSIC (id,title,album,artist,year) VALUES("m2","Title_string2","album_string2","artist_string2",2020);
INSERT INTO MUSIC (id,title,album,artist,year) VALUES("m3","Title_string3","album_string3","artist_string3",2020);

`
pool.query(text,(err,res)=>{
    if(err){
        console.log(err);
    }
})

module.exports = {
    pool
}