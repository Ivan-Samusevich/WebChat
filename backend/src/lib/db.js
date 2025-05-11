import mysql from "mysql2";
  
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "webchat",
    password: "GfHjKm123456"
});

export const connectDB = async () => {
    connection.connect(function(err){
        try{
            console.log("Подключение к серверу MySQL успешно установлено ");
        }catch(err){
            return console.error("Ошибка: " + err.message);
        }
    });
};