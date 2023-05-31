const mongoose=require('mongoose');

function connect(){
    mongoose.connect('mongodb://localhost:27017/learningPassport', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log('Connected to MongoDB')) // no callbacks used now, instead use promise or async await
    .catch(err=>console.error('Could not connect to MongoDB',err));
}

const userSchema=new mongoose.Schema({
    name:String,
    password:String,
    salt:String
})

const Users=mongoose.model("users",userSchema);

module.exports={connect,Users}