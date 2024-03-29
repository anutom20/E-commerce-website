require("dotenv").config();
require("express-async-errors");
const cookieParser = require("cookie-parser");

const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDBSession = require("connect-mongodb-session")(session);

// extra security packages
const helmet = require("helmet");
const xss = require("xss-clean");

app.get("/ip", (req, res) => res.send(req.ip));

app.use(express.json());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "default-src": [
        "'self'",
        "https://anutom20-ecommerce.netlify.app",
      ],
      "img-src": ["'self'", "https: data:"],
    },
  })
);
app.use(xss());

const port = process.env.PORT || 5000;

// route controllers
const authRouter = require("./routes/auth");
const productRouter = require("./routes/products");
const userRouter = require("./routes/users");

// middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const NotFoundMiddleware = require("./middleware/NotFoundMiddleware");

// body parser

app.use(express.json());

// cookie parser

app.use(cookieParser());

// enable all CORS requests

app.use(
  cors({
    credentials: true,
    origin: [
      process.env.REACT_APP_CLIENT_URL,
      "https://anutom20-ecommerce.netlify.app",
    ],
  })
);

const store = new mongoDBSession({
  uri: process.env.MONGO_URI,
  collection: "mySessions",
});

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: store,
    proxy: true,
    cookie: {
      maxAge: parseInt(process.env.MAX_AGE),
      // sameSite: "none",
      // secure: true,
    },
    rolling: true,
  })
);

const setClientCookie = (req, res, next) => {
  if (req.session.userId) {
    res.cookie("username", req.session.name, {
      maxAge: parseInt(process.env.MAX_AGE),
      httpOnly: false,
      // secure: true,
      overwrite: true,
      // sameSite: "none",
    });
  }
  next();
};

app.use(setClientCookie);

// app.get('/', (req, res) => {
//   res.json({message : "Hello world"})
// })

// routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);


app.use(express.static(path.resolve(__dirname + "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/client/build/index.html"));
});


// app.get('/api/v1/test' , async (req, res) => {
//   throw Error("access denied")
// });

// app.use((err, req, res, next) => {

//   res.status(403).json({error : err.message})

//   next(err);
// });
app.use(errorHandlerMiddleware);
app.use(NotFoundMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });
    app.listen(port, () => {
      const FgBlue = "\x1b[34m";
      const Bright = "\x1b[1m";
      const Reset = "\x1b[0m";
      console.log(FgBlue + Bright , `Sat Mar 2 | DEBUG | Server listening on port ${port}` ,Reset );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
