import { Sequelize, DataTypes, INTEGER } from 'sequelize';

const sequelize = new Sequelize('web_chat', 'root', 'GfHjKm123456', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('users', {
    userId:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6], // Минимум 6 символов
      },
    },
    profilePic: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  }, {
    timestamps: true, // Добавляет createdAt и updatedAt
  });
  
  export default User;
  