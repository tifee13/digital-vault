import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase:true,
            trim: true, 
            minLength: 1,
            maxLength: 30
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        email: {
            type: String,
            required: true, 
            unique: true,
            lowercase: true,
            trim: true
        }
        
    },

    {
        timestamps: true
    },

);

userSchema.pre("save", async function () {

    if (!this.isModified("password")) return ;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        
    } catch(error) {
        throw error;
    }
});

userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};

export const User = mongoose.model ('User', userSchema);