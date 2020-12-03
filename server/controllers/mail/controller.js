const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv').config()
class MailController {
    send(req, res){
        let { emails, name } = req.body
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        console.log(emails)

        const msg = {
            to: emails,
            from: 'thaonp041099@gmail.com',
            subject: 'New post for you - Bài đăng mới dành cho bạn',
            text: 'click to see the new post',
            html: '<strong>click to see the new post</strong>',
        };
        sgMail
            .sendMultiple(msg)
            .then(() => { 
                console.log("success")
            })
            .catch((err) => {
                console.log(err)
            });
    
        res.send({ status: 1 })
    }
}
module.exports = new MailController()