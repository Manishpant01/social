const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const o_id = mongoose.Schema.Types.ObjectId
const PostSchema = new Schema({
    title :{
        type : String,
        required: true
    },
    body : {
        type :String,
        required:true
    },
    photo : {
        type : String,
        default : "no photo"
    },
    postedby :{
        type : o_id,
        ref : "userdata"
    }
})

module.exports=mongoose.model('post',PostSchema);