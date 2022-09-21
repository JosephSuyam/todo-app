import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./index.js";
import { TaskStatus } from "./enums/tasks.enum.js";
import Users from "./user.model.js";

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
    // references: {
    //   model: Users,
    //   key: 'id'
    // },
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

// Tasks.belongsTo(Users);

export default Tasks;