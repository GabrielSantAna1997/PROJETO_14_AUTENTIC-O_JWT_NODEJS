import jwt from "jsonwebtoken"

export const isAuthenticated = (req, res, next) => {
    try {
        const token = req.headers['authorization'].replace('Bearer ', '');
        const secret = process.env.SECRET_KEY;

        if(!token){
            return res.status(401).json({msg: "acesso negado!"})
        }

        jwt.verify(token, secret)

        next();
        
    } catch (err) {
        res.status(401).json("Token inválido!");
    }
    
}