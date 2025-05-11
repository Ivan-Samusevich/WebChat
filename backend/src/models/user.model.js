import { Sequelize, DataTypes, INTEGER } from 'sequelize';

const sequelize = new Sequelize('webchat', 'root', 'GfHjKm123456', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('users', {
    user_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6] // Минимум 6 символов
      },
    },
    profile_pic: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
  }, 
  {
    timestamps: false, // Добавляет createdAt и updatedAt
  });
  
  export default User;
  