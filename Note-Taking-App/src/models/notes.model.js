const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title: {
        type:String,
        required:[true, "title is required"],
        minLength:[5, "title length must be greater than 5 character"]
    },
    content:{
        type:String,
        require:[true, "content is required"],
        minLength:[20, "The Content Characters must be atleast 20"]
    }
}, {
    timestamps:true
});

const Notes = mongoose.model("Notes", notesSchema);
module.exports = Notes;