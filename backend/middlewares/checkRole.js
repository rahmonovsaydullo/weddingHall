const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        try {
            if(!req.user){
                return res.status(403).json({message: "User not logged in"})
            }
            if(allowedRoles.includes(req.user.role)) { // teacher
				next()
			}
			else {
				return res.status(403).json({ message: "You don't have access to this action" });
			}
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message)
        }
    }
}

module.exports = checkRole