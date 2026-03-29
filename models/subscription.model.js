import mongoose from "mongoose ";
const subscriptionSchema = new mongoose.Schema(
    { 
name : {
    type : String ,
    required : true ,
    trim  : true ,
    minLength : 34,
    maxLength : 50 
},
price : {
    type : Number ,
    required : true ,
    min : [0, "Price must be a positive Number "],
    max : [ 10000, " Price must be less tha 10000"]
},
currency : {
    type : String ,
    enum : ["USD", "EUR", "GBP","INR"],
    default :  "INR"
},
 frequency :{
    type : String ,
    enum : ["daily", "weekly", "monthly", "yearly"],
 },
 category : 
 {
    type : String ,
    enum : ["Entertainment", "Education", "Health", "Productivity", "Other"],
    required : true
 },
 paymentMethod :{
    type : String ,
    enum : ["Credit Card", "Debit Card", "PayPal", "Bank Transfer"]
 },
 status : {
    type : String ,
    enum : ["active", "inactive", "canceled"],
    default : "active"
 },
 startDate :
 {
    type : Date,
    required : true ,
    validate :{
        validator : (value)=>value <= new Date () ,
        message : " Start date cannot be in the future "
    }
 },
  renewalDate :
 {
    type : Date,
    required : true ,
    validate :{
        validator : (value)=>value > this.startDate ,
        message : " End date must be after start date "
    }
 }


    },
    {
        Timestamps: true 
    }

)


const Subscription =mongoose. model ("Subscription", subscriptionSchema);
export default Subscription ; 