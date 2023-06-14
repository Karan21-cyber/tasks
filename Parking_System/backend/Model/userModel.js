const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        name:{type:String},
        email:{type:String},
        password:{type:String},
        role:{type:String,default:"user"},
        phone:{type:String},
    },{
        timestamps:true,
    }
);

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

// encrypt the password
userSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();    
})

const User = mongoose.model("User",userSchema);

module.exports = User;