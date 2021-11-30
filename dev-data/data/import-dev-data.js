const fs=require('fs');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});

const Tour=require('./../../models/tourModel');

const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);   //for cloud atlas connexions
const DB_LOCAL=process.env.DATABASE_LOCAL;   //for local connexion

 
mongoose.connect(DB_LOCAL,{   //use DB or DB_LOCAL
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(con_cloud =>{   
    // console.log(con_cloud.connections); //renvoie les donnees necessaire au cours de la connexion a distance
    console.log('DB CLOUD connections successful!')
    
}).catch(err=>console.log(err));


//READ JSON FILE

const tours=JSON.parse(fs.readFileSync(`${__dirname}/tours.json`,'utf-8'));

///IMPORT DATA INTO DB
const importData=async()=>{
    try{
        await Tour.create(tours);
        console.log('Data successfully loaded !');
       
    }catch(err){
        console.log(err);
    }
    process.exit();
}

//DELETE ALL DATA FROM DB
const deleteData=async()=>{
    try{
        await Tour.deleteMany();
        console.log('Data successfully deleted !');
        process.exit();
    }catch(err){
        console.log(err);
    }
}

if(process.argv[2] ==='--import'){
    importData()
}else if(process.argv[2] =='--delete'){
    deleteData();
}
//console.log(process.argv);


//cmd : node .\dev-data\data\import-dev-data.js --delete
//cmd : node .\dev-data\data\import-dev-data.js --import