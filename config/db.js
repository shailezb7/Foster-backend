let mongoose= require('mongoose');

let connection=async ()=>{
    try {
        await mongoose.connect('mongodb+srv://shailezb7:shailesh@cluster007.cqxrggy.mongodb.net/Foster');
        console.log('Connected to mongoDB');
    } catch (error) {
        console.log('Error in Mongo DG Server');
    }
}

module.exports={connection};