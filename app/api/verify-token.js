// /pages/api/verify-token.js
import jwt from 'jsonwebtoken';

export async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins, adjust as needed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allowed methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers

    console.log("---reached---")
    const { token } = req.cookies;

    console.log("---xx---x--",token)
    
    if (!token) {
        return res.status(401).json({ message: 'No access token found' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Your JWT secret
        return res.status(200).json({ user: decoded });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}
