
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

const tourSchema=new mongoose.Schema({
     name:{
         type:String,
         required:[true,'A tour must have the name'],
         unique:true
     },
     rating: {
         type:Number,
         default:4.5
     },
     price: {
         type:Number,
         required:[true,'A tour must have a price']
     }
});
const Tour =mongoose.model('Tour',tourSchema);

const testTour=new Tour({
    name:'The Park Camper',
    price:997
});

testTour.save()
.then(doc=>{
    console.log(doc);
}).catch(err=>console.log('ERROR 🔥 : ',err))


const port=process.env.PORT || 3000;
app.createServer().listen(port,()=>{
    console.log(`App running on port ${port}...`);
});