const mongoose = require('mongoose');

const connectDb =  () => mongoose.connect(process.env.MONGOOSE_URI)

module.exports = connectDb;