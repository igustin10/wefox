const bcrypt = require('bcryptjs')

const {Schema, model} = require('mongoose')

/**
 * definitions:
 *   User:
 *     type: "object"
 *     properties:
 *       email:
 *         type: "string"
 *       password:
 *         type: "string"
 *       quantity:
 *     xml:
 *       name: "User"
 **/

const UserSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
};

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
};

module.exports = model("User", UserSchema)