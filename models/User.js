const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

const saltRounds = 20;

class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
      // return bcrypt.compareSync(loginPw, this.password);
      // better to use compare sync
      return bcrypt.compareSync(loginPw, this.password);
    }
    static follow(body, models) {
      return models.Follow.create({
          user_id: body.user_id
      }).then(() => {
          return Post.findOne({
              where: {
                  id: user.id
              },
              attributes: [
                'username'
                [
                    sequlelize.literal('(SELECT COUNT(*) FROM follow where user.id = follow.user_id)'),
                    'follow_count'
                ]
            ]
          });
      });
  }
  
  };

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cannot be any duplicate email values in this table
            unique: true,
            // if allowNull is set to false, we can run our data through validators before creating the table data
            validate: {
              isEmail: true
            }
          },
          // define a password column
          password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              // this means the password must be at least eight characters long
              len: [8]
            }
          }
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
       // beforeCreate(userData) {
       //   return bcrypt.hash(userData.password, saltRounds).then(newUserData => {
       //     return newUserData
       //   });
         // set up beforeCreate lifecycle "hook" functionality
       async beforeCreate(newUserData) {
         newUserData.password = await bcrypt.hash(newUserData.password, saltRounds);
         return newUserData;
       },
       // set up beforeUpdate lifecycle "hook" functionality
       async beforeUpdate(updatedUserData) {
         updatedUserData.password = await bcrypt.hash(updatedUserData.password, saltRounds);
         return updatedUserData;
       }
         },
         // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
     
         // pass in our imported sequelize connection (the direct connection to our database)
         sequelize,
         // don't automatically create createdAt/updatedAt timestamp fields
         timestamps: true,
         // don't pluralize name of database table
         freezeTableName: true,
         // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
         underscored: true,
         // make it so our model name stays lowercase in the database
         modelName: 'user'
    }
);

module.exports = User;