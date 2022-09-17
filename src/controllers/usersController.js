import users from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'
dotenv.config()

class UserController {

    static createUser =  async (req,res) => {
    const { email, name, password } = req.body;

    if(users.findOne(email)){
        return res.status(422).json('Usuario já cadastrado.')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new users({
        email, name, password : hashedPassword
    })
    
    user.save((err) => {
        if(err) {
            res.status(500).send({message: err});
        }else{
            res.status(201).send(user.toJSON());
        }
    });

    };

    static authLogin =  async (req,res) => {
        const {email, password} = req.body;
        const user = await users.findOne({email:email})

        if(!user){
            return res.status(404).json({ msg: 'Este usuario não existe'})
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            return res.status(422).json({ msg: 'Senha incorreta.'})
        }

        try {
            const secret = process.env.SECRET_KEY
            console.log()
 
            const token = jwt.sign(
              {
                id: JSON.stringify(user._id),
              },
              secret,
              {
                expiresIn: "1m",
              }
            );
            res.status(200).json({msg: "Autenticação realizda com sucesso", token })
            
        } catch (err) {
            return res.status(500).json({ msg: err})
        }        
    };

    
    static listUser =  async (req,res) => {
        users.find((err, users) => {
            if(err) {
                res.status(500).send({message: err});
            }else{
                res.status(201).send(users);
            }
        })
    };

    static privateAccess =  async (req,res) => {
        res.status(200).send("olaa");
    };

}

export default UserController