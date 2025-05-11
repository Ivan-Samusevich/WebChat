import { Op } from "sequelize";
import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user.user_id;
        const filteredUsers = await User.findAll({where: {user_id: {[Op.ne]: loggedInUserId}}, attributes: {exclude: ['password']}});
        res.status(200).json(filteredUsers)
    } catch (error) {
        res.status(500).json("Ошибка в поиске")
    }
};

export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId} = req.params
        const myId = req.user.user_id;


        const messages = await Message.findAll({where: {[Op.or]: [{ senderId: myId, receiverId: userToChatId },{ senderId: userToChatId, receiverId: myId }]}});
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json("Ошибка в отправке");
    }
};

export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user.user_id;

        let imageUrl;
        if(image){
            const uploadResponce = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponce.secure_url;
        }

        const newMessage = new Message ({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(200).json(newMessage);
    } catch (error) {
        res.status(500).json("Ошибка в отправке");
    }
}

