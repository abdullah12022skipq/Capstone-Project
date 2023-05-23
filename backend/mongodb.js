const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://abdullahniaziskipq:aba9613366@cluster0.w33xuy4.mongodb.net/DigitalMedia?retryWrites=true&w=majority"
const connectToMongo = async () => {
    await mongoose.connect(mongoURI,{serverSelectionTimeoutMS: 60000})
    console.log("connected successfully")
    
}
module.exports = connectToMongo;