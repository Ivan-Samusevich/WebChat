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

        const token = generateToken(newUser.id);
        res.status(201).json({
            success: true,
            data: {
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic || null,
                token
            }
        });
    } catch (error) {
        console.error("Ошибка в регистрации:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = (req, res) => {
    res.send("login route");
};

export const logout = (req, res) => {
    res.send("logout route");
};

