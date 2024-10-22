const express = require('express');
const http = require('http');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const socketConnection = require('./services/service.socketConnection')
const connectIO = require('./sockets/app.socket');

const AuthRouter = require('./routers/router.auth')
const OAuthRouter = require('./routers/router.oauth');
const LogRequest = require('./middlewares/middleware.requestlogger');
const connectDB = require('./services/service.connectDatabase')

require('./services/service.passport')



const app = express();
const server = http.createServer(app);
const io = socketConnection(server)
connectIO(io);

//connect Router / MiddleWares

app.use(session({
  secret: 'your_secret_key', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(cors({
  origin: ['http://localhost:5173','https://localhost:5173','https://localhost:5173/chat'],
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use("/",LogRequest);
app.use("/auth",AuthRouter);
app.use("/oauth",OAuthRouter);

connectDB();

server.listen(3000, () => {
  console.log('Socket Server is running on port 3000');
});

app.listen(5000,()=>{
  console.log('App Server is running on port 5000');
})


