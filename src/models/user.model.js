import { Sequelize, DataTypes } from "sequelize";
import { genSaltSync, hashSync } from 'bcrypt';
import sequelize from "./index.js";
import Tasks from "./task.model.js";

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
    defaultValue: 'ACTIVE',
  },
},
{
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: (instance) => {
      const salt = genSaltSync(10);
      instance.password = hashSync(instance.password, salt);
    },
    beforeBulkUpdate: (instance) => {
      if (instance.attributes.password) {
        const salt = genSaltSync(10);
        instance.attributes.password = hashSync(instance.attributes.password, salt);
      }
    },
  }
});

Users.hasMany(Tasks, {
  foreignKey: 'user_id'
});

export default Users;