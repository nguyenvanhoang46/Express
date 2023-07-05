const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {

        return res.status(401).json({ message: 'Không có token xác thực!' });

    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token hết hạn!' });
            }
            return res.status(403).json({ message: 'Token không hợp lệ!' });
        }
        req.userId = data.userId;
        next();
    });
};




module.exports = authMiddleware;
