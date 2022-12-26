import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/elephantsql.js'
import users_router from './routes/Users.js'
import path from 'path';


dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(users_router);

app.listen(process.env.PORT||8080, ()=>{
  console.log(`run on ${process.env.PORT||8080}`);
})

try {
  await db.authenticate();
  console.log('Database conneted... ');
}
catch(e){
  console.log(e);
}

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', (req,res)=>{
  res.sendFile(path.resolve(__dirname,'./client/build', 'index.html'));
})
