const createError = require('http-errors'),
      express = require('express'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      logger = require('morgan'),
      mongoose = require("mongoose");

const indexRouter = require('./routes/index'),
      usersRouter = require('./routes/users');

const app = express();
const main = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/test")
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

main()
.then(()=>{
    app.listen(3000,()=>console.log("server listening at port 3000"))
})
.catch(e=>console.error(e))


