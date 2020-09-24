const Notification = require('../../models/notification')
class NotificationController {
    create(req, res) {
        let { userId, postId, content, postType } = req.body
        Notification.create({
            userId,
            postId,
            postType,
            content,
        }).then(notiCreated => {
            if (notiCreated) {
               res.send({status: true, notiCreated })
            } else {
                res.send({ status: false })
            }
        })
    }
    getAllNotisByUserId(req, res) {
        let userId = req.query.userId
        Notification.find({ userId }).then(noti => {
            if(noti){
                res.send(noti)
            }else{
                res.send({ status: false })
            } 
        })
    }
    updateNotiStt(req, res){
        let notiId = req.query.notiId 
        Notification.findOneAndUpdate({ _id: notiId }, { $set: { status: true } }, { new: true }, (err, doc) => {
            if (err) res.send({ status: false })
            else {
                res.send({ status: true })
            }
        })
    }
}
module.exports = new NotificationController()