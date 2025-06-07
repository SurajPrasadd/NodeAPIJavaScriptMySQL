import {TABLE_NAME} from '../config/constants.js';

export default (sequelize, {Model, DataTypes}) => {
    class Role extends Model {
        static associate(db) {
            Role.belongsToMany(db.user, {
                through: TABLE_NAME.USER_ROLES,
                foreignKey: "roleId",
                otherKey: "userId",
            });
        }
    }

    Role.init(
        {
            id: {
                type: DataTypes.INTEGER,        //  should be INTEGER for autoIncrement
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,              // Pass the Sequelize instance
            modelName: "Role",      // Model name (used internally by Sequelize)
            tableName: TABLE_NAME.ROLES,     // Optional, useful to enforce exact table name
            freezeTableName: true,  // Prevent Sequelize from pluralizing the table
            timestamps: true,      // Disable `createdAt` and `updatedAt` if not needed
        }
    );

    return Role;
};
