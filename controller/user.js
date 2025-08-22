const path = require('path');
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const User = require(path.join(__dirname, '../models/user.js'));

const jwtKey = "3110$";
async function  handleSignup(req,res){
    console.log('Received signup request:', req.body);
    const { email, password } = req.body;
    const existingUsers = await User.findOne({email: email});
    if (!existingUsers) {
    try{
        const uuid = uuidv4();
        
        const role =  "user";
        const newUser = await User.create({ email, password, role});
        const jwtPayload = {
            "email" : newUser.email,
            "role" : newUser.role,
            "uuid" : uuid
        }
        const token = jwt.sign(jwtPayload,jwtKey);
         res.cookie("token",token);
        res.redirect('/main');
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
    } else {
        console.log('User already exists:', email);
        res.render('signup', { 
            error: 'User already exists. Please log in.',
            email: email // preserve the email for better UX
        });
    }
}

async function handleSignin(req,res){
    const {email, password} = req.body;
   
    try {
           const uuid = uuidv4();
        
        const foundUser = await User.findOne({email: email});
        if (foundUser && foundUser.password === password) {
            console.log('Login successful for user:', foundUser.email);
        const jwtPayload = {
            "email" : foundUser.email,
            "role" : foundUser.role,
            "uuid": uuid
        }
        const token = jwt.sign(jwtPayload,jwtKey);
         res.cookie("token",token);
            return res.redirect('/main');
        }
        else {
            console.log('Login failed for user:', email);
            // Render login page with error message
            res.render('login', { 
                error: 'Invalid email or password',
                email: email // preserve the email for better UX
            });
            
        }
    }
    catch (error) {
        console.error('Error during login:', error);    
        res.render('login', { 
            error: 'Error during login. Please try again.',
            email: email
        });
    }
}

async function HandleAdminSignup(req,res){
    const adminKey = 3110;
  const {email, password, confirm_password, admin_key} = req.body;
  const existingUsers = await User.findOne({email : email, role:"admin"});
  if (!existingUsers){
    if (password == confirm_password && admin_key == adminKey){
    const adminUser = User.create({
        email : email,
        password : password,
        role : "admin"
    })
    const jwtPayload = {
        "email" : adminUser.email,
        "role" : adminUser.role,
    }
    res.status(202);
  } 
  else {
    if (password != confirm_password){
        res.render('adminSignup', {
            error : "Confirm Password Doesnt Match"
            
        });
        console.log("password doesnt match");
    }
    if (admin_key != adminKey){
        res.render('adminSignup', {
            error : "Admin Key is Incorrect"
        });
    console.log("admin key doesnt match");
    }
}
  }
  else {
       res.render('adminSignup', {
            error : "Already a User"
        });
  }
  
}

module.exports = {handleSignup,handleSignin,HandleAdminSignup };