const jwt = require('jsonwebtoken')


const verifyToken = async(req, res, next) => {
    if(!re.headers.authorization) return res.status(403).json({msg: 'Not authorized.'})

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if(err) return res.status(403).json({msg: 'Wrong token'})
            else{
                req.user = data 
            }
        })
    }
}

module.exports = verifyToken