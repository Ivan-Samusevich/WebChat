import { Sequelize, DataTypes, INTEGER } from 'sequelize';

const sequelize = new Sequelize('webchat', 'root', 'GfHjKm123456', {
  host: 'localhost',
  dialect: 'mysql',
});

const Message = sequelize.define('messages', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        text: {
          type: DataTypes.STRING,
        },
        image: {
          type: DataTypes.STRING,
        },
        senderId:{
          type: DataTypes.INTEGER,
        },
        receiverId:{
          type: DataTypes.INTEGER,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        }
});

  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: 'senderId',
      as: 'sender'
    });
    
    Message.belongsTo(models.User, {
      foreignKey: 'receiverId',
      as: 'receiver'
    });
  };

export default Message
// export default (sequelize) => {
//   const Message = sequelize.define('Message', {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     text: {
//       type: DataTypes.STRING,
//     },
//     image: {
//       type: DataTypes.STRING,
//     },
//     senderId:{
//       type: DataTypes.INTEGER,
//     },
//     receiverId:{
//       type: DataTypes.INTEGER,
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW
//     }
//   });

//   // Связи с пользователями
//   Message.associate = (models) => {
//     Message.belongsTo(models.User, {
//       foreignKey: 'senderId',
//       as: 'sender'
//     });
    
//     Message.belongsTo(models.User, {
//       foreignKey: 'receiverId',
//       as: 'receiver'
//     });
//   };

//   return Message;
// };