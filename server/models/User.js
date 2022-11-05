const mongoose = require("mongoose")

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        appeal : {
            type: [String],
            enum : ["Science and Technology","Sports","Religion","Startups","Movies","Anime","Culture","Politics","Military","Food","Gym"],
            require: true
        }
    },
    { timestaps: true }
)

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await (enteredPassword === this.password)
}

const User = mongoose.model("User", UserSchema)

module.exports = User