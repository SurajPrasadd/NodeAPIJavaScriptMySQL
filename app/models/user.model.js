import {TABLE_NAME} from '../config/constants.js';

export default (sequelize, {Model, DataTypes}) => {
    class User extends Model {
        static associate(db) {
            User.belongsToMany(db.role, {
                through: TABLE_NAME.USER_ROLES,
                foreignKey: "userId",
                otherKey: "roleId",
                as: "roles",
            });
            User.hasMany(db.session, {
                foreignKey: 'userId',
                as: 'sessions',
                onDelete: 'CASCADE',
            });
        }
    }

    User.init(
        {
            username: {
                type: DataTypes.STRING,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,              // Pass the Sequelize instance
            modelName: "User",      // Model name (used internally by Sequelize)
            tableName: TABLE_NAME.USER,     // Optional, useful to enforce exact table name
            freezeTableName: true,  // Prevent Sequelize from pluralizing the table
            timestamps: true,      // Disable `createdAt` and `updatedAt` if not needed
        }
    );

    return User;
};