const express = require('express')
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const dotenv = require("dotenv");

dotenv.config(); // Ensure this is at the top
console.log(dotenv.config());
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@regform.gqif0d0.mongodb.net/?retryWrites=true&w=majority&appName=RegForm`, {
    serverSelectionTimeoutMS: 5000, 
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get('/',async(req,res) => {
    const articles = await Article.find().sort({createAt:'desc'})
    res.render('articles/index',{articles:articles})
})
 
app.use('/articles',articleRouter)

app.listen(4949)
