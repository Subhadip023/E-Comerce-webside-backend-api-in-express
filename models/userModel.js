import { Schema,model } from "mongoose";

const userShema=new Schema({
    name :{type:String,required:true},
    email :{type:String,required:true},
    password:{type:String,required:true},
    address:{type:String,required:true},
    avatar :{type:String},
    oders:{type:Schema.Types.ObjectId,ref:'Oder'}, emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    emailVerificationExpires: { type: Date }
})

export default model("User",userShema);