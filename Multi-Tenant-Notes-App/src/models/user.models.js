import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "firstname is required"],
        trim: true,
        minLength: [3, 'First name must be at least 3 characters long'],
        maxLength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        // Use select: false so the hash isn't accidentally leaked in API responses
        select: false,
        validate: {
            validator: function (v) {
                // Enforces: Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
            },
            message: () =>
                'Password must be at least 8 characters long and contain at least ' +
                'one uppercase letter, one lowercase letter, one number, and one special character.'
        }
    }
}, {
    timestamps: true
});

// Pre-save middleware to automatically hash the password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;