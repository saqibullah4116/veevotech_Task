const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your name"],
        maxLength:[30,"name should be 30 characters long"],
        minLength:[4,"Name should should not be less than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter your Email"],
       unique:true,
        sparse:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter your password"],
        minLength:[8,"password should not be less than 8 characters"],
        select:false //so that find() unable to show password
    },

    //user image
    image: 
        {
          //i will be using cloudinary for managind image
          // cloudinary use two things publicID and url
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
        resetPasswordToken:String,
        resetPasswordExpire:Date,
});

// for encrypting the passowrd
userSchema.pre("save",async function(next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

// creating token 
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}
//Comparing password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports  = mongoose.model("User",userSchema);