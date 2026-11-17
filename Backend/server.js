require('dotenv').config();
const app = require('./src/app')
const connectDB = require('./src/db/db')


connectDB();


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "GetHired Backend is running!"
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{

    console.log("Server is running on port 3000")

})
