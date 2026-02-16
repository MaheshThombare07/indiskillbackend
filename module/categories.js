const mongoose = require('mongoose');

const cetegoriesSchema = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
     priority:{
        type : String,
        required : true
     }
})
module.exports = mongoose.model("Cetegories", cetegoriesSchema);