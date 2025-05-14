import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

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
            return res.status(400).json({ success: false, message: "Данная почта уже используется другим пользователем!" });
        }

        const newUser = await User.create({
            fullName,
            email,
            password,
        });

        const token = generateToken(newUser.user_id, res);
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
            return res.status(400).json({success: false, message: "Нет пользователя с данной почтой"});
        }

        if(password != user.password)
        {
            return res.status(400).json({success: false, message: "Неверный пароль"});
        }
        const token = generateToken(user.user_id, res)

        res.status(201).json({
            success: true,
            data:{
                user_id: user.user_id,
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

export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user.id;

    if(!profilePic){
        return res.status(400).json({success: false, message: "Необходима фотография"})
    }

    const uploadResponce = await cloudinary.uploader.upload(profilePic)
    const updateUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponce.secure_url}, {new:true})
    res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error"});        
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json({success: true, message: req.user});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error"});        
    }
}
