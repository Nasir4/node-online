const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts')

//Load env vars
dotenv.config({path:'./config/config.env'});

const app = express();

//connection
mongoose.connect(process.env.DB_ENV,{useNewUrlParser:true, useUnifiedTopology: true})
.then(()=>{console.log('successfully Connected DB')})
.catch((err)=>{console.log('db not connected',err)})

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views',__dirname +'/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});