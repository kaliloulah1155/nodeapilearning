
const mongoose=require('mongoose');
const dotenv=require('dotenv');
var app = require('http');
dotenv.config({path:'./config.env'});

const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);   //for cloud atlas connexions
const DB_LOCAL=process.env.DATABASE_LOCAL;   //for local connexion

mongoose.connect(DB,{   //use DB or DB_LOCAL
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(con_cloud =>{   
    // console.log(con_cloud.connections); //renvoie les donnees necessaire au cours de la connexion a distance
    console.log('DB CLOUD connections successful !')
}).catch(err=>console.log(err));

// mongoose.connect(DB_LOCAL,{   //use DB or DB_LOCAL
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useFindAndModify:false
// }).then(con =>{   
//      //console.log(con.connections); //renvoie les donnees necessaire au cours de la connexion a distance
//     console.log('DB LOCAL connections successful !')
// }).catch(err=>console.log(err));




const port=process.env.PORT || 3000;
app.createServer().listen(port,()=>{
    console.log(`App running on port ${port}...`);
});