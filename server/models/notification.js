const mongoose = require('mongoose');
const Schema = mongoose.Schema
const notificationSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    postType: { type: String }, 
    content: { type: String },
    status: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Notification',notificationSchema);