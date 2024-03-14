const express=require('express');
const app=express();
const bodyParser = require('body-parser');
const cors = require('cors');

const User=require('./userModel');

app.use(cors());


require('dotenv').config();
const dbConfig=require('./dbconfig');


const userRoute=require('./userRoute');
app.use(express.json());
app.use(bodyParser.json());
app.use('/users',userRoute);

//fetch user data
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.listen(5800,()=>{
  console.log('Server started');
});
