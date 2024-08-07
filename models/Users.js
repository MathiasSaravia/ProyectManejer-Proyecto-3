const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    token:{
        type:String,
    },
    cheked:{
        type:Boolean,
        default:false
    }
},
{timestamps:true});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.chekedPassword = async function(password){
    return await compare(password, this.password);
}

//Export the model
module.exports = mongoose.model('User', userSchema);