const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    first_name: {type: String, trim:true, required:true},
    last_name: {type: String, trim:true, required:true},
    address: {type: String, trim:true, required:true},
    email: {  type: String,  trim: true,  unique: 'Email already exists',  match: [/.+\@.+\..+/, 'Please fill a valid email address'],  required: 'Email is required' },
    phone: {type: Number, trim:true, required:true, min: [10, 'Phone number must contain 10 digits']},
    password: {  type:String,required: true},
    created: {  type: Date,  default: Date.now }, 
    token:{  type:String}
})

const User=mongoose.model("user",userSchema)

module.exports=User