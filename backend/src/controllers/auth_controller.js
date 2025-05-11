import User from "../models/user.js";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
    const {fullName, email, password } = req.body || {};
    try {

        if(!fullName || !email || !password){
            return res.status(400).json({success: false, message: "Заполните обязательные поля"});
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Пароль должен быть длиной 6 и более символов" });
        }

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ success: false, message: "Электронная почта уже существует" });
        }

        const newUser = await User.create({
            fullName,
            email,
            password, // Пароль сохраняется "как есть" (без хеширования)
        });

        const token = generateToken(newUser.id, res);
        res.status(201).json({
            success: true,
            data: {
                user_id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                profile_pic: newUser.profilePic || null,
                token
            }
        });
    } catch (error) {
        console.error("Ошибка в регистрации:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    
    const {email, password} = req.body || {};
    try {
        const user = await User.findOne({where : {email}})
        if(!user)
        {
            return res.status(400).json({success: false, message: "Неверные данные"});
        }

        if(password != user.password)
        {
            return res.status(400).json({success: false, message: "Неверный пароль"});
        }

        const token = generateToken(user.id, res)

        res.status(201).json({
            success: true,
            data:{
                user_id: user.id,
                fullName: user.fullName,
                email: user.email,
                profile_pic: user.profilePic || null,
                token
            }
        })
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(201).json({success: true, message: "Успешный выход"});     
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error"});     
        
    }
};

