import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    try {
        // Check both cookies and Authorization header for token
        let token = req.cookies.token;

        if (!token && req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Not authorized, token missing" });
        }

        try {
            // Use JWT_SECRET from env (not JWT_SECRET_KEY)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from database
            const user = await User.findById(decoded.userId).select("-password");

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Token invalid or expired" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error in auth middleware" });
    }
};

// 🔹 Super Admin Access
const superAdmin = (req, res, next) => {
    if (req.user && req.user.role === "SuperAdmin") {
        next();
    } else {
        res.status(403).json({ message: "Super Admin access required" });
    }
};

// 🔹 Admin Access
const admin = (req, res, next) => {
    if (req.user && req.user.role === "Admin") {
        next();
    } else {
        res.status(403).json({ message: "Admin access required" });
    }
};

// 🔹 Instructor Access (New)
const instructorOnly = (req, res, next) => {
    if (req.user && req.user.role === "Instructor") {
        next();
    } else {
        res.status(403).json({ message: "Instructor access required" });
    }
};

export { protect, admin, superAdmin, instructorOnly };
