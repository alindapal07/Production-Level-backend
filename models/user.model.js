import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    { 
      name :
       {
        type : String,
        required : true ,
        trim : true,
        minLength : 3,
        maxLength : 50
       },

       email :
       {
        type : String ,
        required : true ,
        unique : true ,
        trim : true ,
        lowercase : true ,
        minLength : 5,
        maxLength : 255 ,
        match : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        index : true 
       },


       password :
       {
        type : String ,
        required  : true ,
        minLength : 6, 
        maxLength : 1024,
       }
    }, 
    {
        Timestamps: true 

    }
)

const User = mongoose.model ("User",userSchema);
export default User ;