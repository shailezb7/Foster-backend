let mongoose=require('mongoose');

let empSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    course_interest:{
        type:String,
        required:true,
        enum:["Operational CRM","Collaborative CRM","Analytical CRM"]
    }
})

let Empmodel=mongoose.model('employee',empSchema);
module.exports={Empmodel};