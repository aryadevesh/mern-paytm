const mongoose = require("mongoose");

// Use environment variables for sensitive data
const dbUri = process.env.MONGO_URI || "mongodb+srv://devesh:Kirti12@cluster0.vvu8psh.mongodb.net/paytm1";

// Connect to MongoDB with error handling
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

const paytmUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    firstname: String,
    lastname: String,
    password: {
        type: String,
        required: true,
        minLength: 6, // Ensure password has a minimum length
    },
});

const User = mongoose.model('User', paytmUserSchema);

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        min: 0, // Ensure balance cannot be negative
    },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account,
};
