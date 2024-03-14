const router=require('express').Router();
const User=require('./userModel');

router.post('/register',async(req,res)=>{
  try{
    const userExist= await User.findOne({email: req.body.email});

    if(userExist){
      return res.send({
        success:false,
        message:"User already exists",
      });
    }
    const newUser = new User(req.body);          //fetches data from Front end & creates new obj
    await newUser.save();                             //mongoose command to save in db

    res.send({
      success:true,
      message:"User added!"
    })
  }
  catch(error){
    console.log(error);
  }
})

// router.get('/profile', async (req, res) => {
//   try {
//     const users = await User.find();

//     if (!users.length) {
//       return res.send({
//         success: false,
//         message: "No users found",
//       });
//     }

//     res.send({
//       success: true,
//       data: users,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });



module.exports=router;