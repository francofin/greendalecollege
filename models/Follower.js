const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Follower extends Model {};


Follower.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    follower_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: 'user',
            key: 'id'
            }
        },
     },
    {
        sequelize,
        timestamps:true,
        freezeTableName: true,
        underscored: true,
        modelName: 'follower'
    });

module.exports = Follower;