const genterateToken = require("./generateToken");
const User = require("../Model/userModel");


const registerUser = (async (req,res) =>{
    const {name,email,password,phone} = req.body;
    
    if(!name || !email || !password || !phone){
        res.status(400);
        throw new Error("Please Enter all the fields");
    }
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User already Exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        phone,
    });

    if(user) {
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            phone:user.phone,
        });
    }
    else{
        res.status(400);
        throw new Error("Failed to create user");
    }
});

const userLogin = (async (req, res) => {
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email : user.email,
            role : user.role,
            password:user.password,
            phone:user.phone,
            token : genterateToken(user._id),
        });
    }
    else{
        res.status(400);
        throw new Error("Unable to find the User");
    }
})

module.exports = {registerUser,userLogin};