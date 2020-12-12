const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Image extends Model {};


Image.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true
    },
    file_type: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    data: {
        type: DataTypes.BLOB("long"),
        allowNull:true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
    },
    post_id: {
        type:DataTypes.INTEGER,
        allowNull:true,
        references: {
            model:'post',
            key:'id'
        }
    }
},
{
    sequelize,
    timestamps:true,
    freezeTableName: true, 
    underscored: true, 
    modelName: 'image'
});

module.exports = Image;