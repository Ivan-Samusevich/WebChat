import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({success: false, message: "Не авторизован: отсутствует токен" 
            });
        }

        // Верификация токена
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({success: false, message: "Не авторизован: недействительный токен" 
            });
        }

        // Поиск пользователя
        const user = await User.findByPk(decoded.user_id, {attributes: {exclude: ['-password']}});
        if (!user) {
            return res.status(401).json({success: false, message: "Пользователь не найден " + decoded.user_id});
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Ошибка в protectRoute:", error);
        res.status(500).json({success: false, message: "Внутренняя ошибка сервера" 
        });
    }
};