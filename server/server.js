const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const http = require('http')
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)
const cors = require('cors')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('./models/user')

const authRouter = require('./controllers/auth/router')
const userRouter = require('./controllers/user/router')

app.use(cors());
app.options('*', cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true,limit: '50mb' }));

/**
 * connect to mongodb
 */
mongoose.connect('mongodb://localhost/goumath', {useNewUrlParser: true}, (err) => {
    if(err) console.log(err)
    else {
        console.log('connected to mongodb')
    }
});

/**
 * use authentication router
 */
app.use("/auth", authRouter)
app.use("/user", userRouter)

server.listen(process.env.PORT || 8081);