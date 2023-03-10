const { Schema, model } = require("mongoose");


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
        reviews: [ { type: Schema.Types.ObjectId, ref:'Review' } ],
        genre: { 
        type: String 
},
        ranking : {
            type: Number,
            required: true,

        }
})
const Radio = model("Radio", radioSchema);

module.exports = Radio;


