const express = require('express');
require('dotenv').config(); // inclure les variables
const mongoose = require('mongoose');
const app = express();
const UserRoute = require('./Routes/user')



app.use(express.json())
app.use('/user',UserRoute)
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
}).then(() => {
    console.info("Databse Connected Successfully!!");    
}).catch(err => {
    console.error('Could not connect to the database', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});
app.listen(process.env.PORT, () => {
    console.log("Server is listening on port 3000");
});