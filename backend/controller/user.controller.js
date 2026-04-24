import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are important!" });
            }
        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });

        }

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
        });

        res.status(201).json({ 
            message: "User registered and logged in",
            user: { id: user._id, email: user.email, username: user.username } 
        });
    } catch (error) {
        console.log("THE ERROR IS HERE:", error); // This shows the error in your VS Code terminal
        res.status(500).json({ message: error.message }); // This shows the error in your browser
    }
};

const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user)
            return res.status(400).json({ message: "User not found" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials"});

        res.status(200).json({
            message: "Login successful",
        });
    } catch (error) {
        console.log("THE ERROR IS HERE:", error); 
        res.status(500).json({ message: error.message });
    }
};

const logoutUser = async (req, res) => {
    try{
        const { email } = req.body;
        const user = await User.findOne({email});

        if (!user) return res.status(404).json({ message: "User not found"});  
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error});
    }

}

export { registerUser, loginUser, logoutUser };