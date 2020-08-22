const mongoose = require('mongoose');
const Schema = mongoose.Schema
const userSchema = new Schema({
    username : { type : String, trim : true, required : true },    
    fullname : { type : String, required : true, trim : true },
    email : { type : String, trim : true, required : true },
    phone : { type : String, trim : true, required : true },
    password : { type : String, trim : true, required : true, },
    gender : { type : String },
    dob: { type: Date },
    address: { type : String },
    role: { type : String },
    avatar: { type: String},
    is_admin : { type : Boolean, default : false },
    my_post: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    favorite_posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
})

module.exports = mongoose.model('User',userSchema);