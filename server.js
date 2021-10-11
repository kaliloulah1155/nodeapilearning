
const mongoose=require('mongoose');
const dotenv=require('dotenv');
var app = require('http');
dotenv.config({path:'./config.env'});

const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(con =>{
   // console.log(con.connections); //renvoie les donnees necessaire au cours de la connexion a distance
    console.log('DB connections successful !')
});

const port=process.env.PORT || 3000;
app.createServer().listen(port,()=>{
    console.log(`App running on port ${port}...`);
});