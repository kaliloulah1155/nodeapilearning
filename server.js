const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const DB_LOCAL = process.env.DATABASE_LOCAL.replace(
    '<PASSWORD>',
  //  process.env.DATABASE_PASSWORD
  );

mongoose
  .connect(DB_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server= app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});


//Detect all problem in apps 
process.on('unhandledRejection',err=>{
  console.log(err.name,err.message);
  console.log('UNHANDLER REJECTION! 🧯 Shutting down...')
  server.close(()=>{
     process.exit(1); //met fin au programme   
  });
 
});



