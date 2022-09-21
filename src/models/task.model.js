import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js";

const Tasks = sequelize.define('tasks', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: Sequelize.ENUM("TODO", "ACTIVE", "COMPLETE"),
    defaultValue: 'TODO',
  },
  completed_at: {
    type: DataTypes.DATE,
  },
},
{
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default Tasks;