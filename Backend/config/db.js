const mongoose = require('mongoose')

async  function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    }catch(error){

        console.log(error.message)
    }

}


module.exports = connectDB