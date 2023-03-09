const { Schema, model } = require("mongoose");

const Radio = model("Radio", userSchema);

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const radioSchema = new Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        img: { 
            type: String 
        },
        country: { 
            type: String 
        },
        review: [ { type: Schema.Types.ObjectId, ref:'Review' } ],
        genre: { 
        type: String 
},
        ranking : {
            type: Number,
            required: true,

        }
})

module.exports = Radio;


