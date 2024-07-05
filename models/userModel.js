import { Schema,model } from "mongoose";

const userShema=new Schema({
    name :{type:String,required:true},
    email :{type:String,required:true},
    password:{type:String,required:true},
    address:{type:String,required:true},
    avatar :{type:String},
    oders:{type:Schema.Types.ObjectId,ref:'Oder'}
})

export default model("User",userShema);