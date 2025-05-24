const jwt = require('jsonwebtoken')

const authentication = async (req, res, next)=>{
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) return res.status(403).json({message: 'Token not given'})

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = {
            id:decoded.id,
            role: decoded.role
        }
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')
    }
}

module.exports = authentication