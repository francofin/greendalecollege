const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Image extends Model {
    static upvote(body, models) {
    return models.Vote.create({
        user_id: body.user_id,
        image_id: body.image_id
    }).then(() => {
        console.log(body);
        return Image.findOne({
            where: {
                id: body.image_id
            },
            attributes: [
                'id',
                'title',
                'name',
                'body_text',
                'data',
                'created_at',
                [
                    sequelize.literal("(SELECT COUNT(*) FROM vote WHERE image.id = vote.image_id)"),
                    'vote_count'
                  ]
            ]
        });
    });
}};


Image.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true
    },
    file_type: {
        type: DataTypes.STRING,
        allowNull:true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    title: {
        type:DataTypes.STRING,
        allowNull:true
    },
    body_text:{
        type: DataTypes.STRING,
        allowNull:true,
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
    // post_id: {
    //     type:DataTypes.INTEGER,
    //     references: {
    //         model:'post',
    //         key:'id'
    //     }
    // }
},
{
    sequelize,
    timestamps:true,
    freezeTableName: true, 
    underscored: true, 
    modelName: 'image'
});

module.exports = Image;