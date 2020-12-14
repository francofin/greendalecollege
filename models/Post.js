const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
    static uplike(body, models) {
        return models.Like.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'title',
                    'body',
                    'created_at',
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)'),
                        'like_count'
                      ]
                ]
            });
        });
    }
}

Post.init(
    {
        id: {
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull:false
        },
        body: {
            type: DataTypes.STRING,
            allowNull:true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id'
            }
        },
        // image_id: {
        //     type:DataTypes.INTEGER,
        //     allowNull:true,
        //     references: {
        //         model:'image',
        //         key:'id'
        //     }
        // },
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        modelName: 'post'
      }
);

module.exports = Post;