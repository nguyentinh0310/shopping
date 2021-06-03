const Users = require('../models/userModel')

const authorizeAdmin = async (req, res, next) => {
    try {
        const user = await Users.findOne({_id: req.user.id})

        if(user.role !== "admin") 
            return res.status(500).json({message: "Chỉ có admin với được quyền truy cập"})

        next()
    } catch (err) {
        next(err)
    }
}

module.exports= authorizeAdmin