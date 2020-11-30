const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const http = require('http')
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)
const cors = require('cors')
const mongoose = require('mongoose');

const authRouter = require('./controllers/auth/router')
const userRouter = require('./controllers/user/router')
const postRouter = require('./controllers/post/router')
const utilityRouter = require('./controllers/utility/router')
const notificationRouter = require('./controllers/notification/router')
const mailRouter = require('./controllers/mail/router')
const predictRouter = require('./controllers/predict/router')

app.use(cors());
app.options('*', cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

/**
 * connect to mongodb
 */
mongoose.connect('mongodb://localhost/goumath', { useNewUrlParser: true }, (err) => {
    if (err) console.log(err)
    else {
        console.log('connected to mongodb')
    }
});

/** notification socket */
io.on('connection', function (socket) {
    socket.on('message:send', function (data) {
        console.log(data)
        socket.broadcast.emit('respond:test', { message: "hi from server" });
    });
    socket.on('noti:send', function (data) {
        console.log(data)
        socket.broadcast.emit('noti:respond', data);
    });
})
/**
 * use authentication router
 */
app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/post", postRouter)
app.use("/utility", utilityRouter)
app.use("/notification", notificationRouter)
app.use("/mail", mailRouter)
app.use("/predict", predictRouter)

server.listen(process.env.PORT || 8081);