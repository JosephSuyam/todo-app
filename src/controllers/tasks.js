import Op from "sequelize";
import Tasks from '../models/task.model.js';
import { TaskStatus } from '../models/enums/tasks.enum.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.findAll({
      where: { user_id: req.user_id },
      group: 'status',
    });

    console.log({tasks});

    return res.status(200).json(tasks ? tasks : { message: "Task List.", data: tasks });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export const fetchTask = async (req, res) => {
  try {
    const task = await Tasks.findOne({
      where: {
        id: req.params.task_id,
        user_id: req.user_id,
      }
  });

    console.log(task);

    return res.status(200).json({ message: "Task Info.", data: task });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export const addTask = async (req, res) => {
  try {
    await Tasks.create({
      user_id: req.user_id,
      ...req.body
    });

    return res.status(201).json({ message: 'Task added.' })
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export const updateTask = async (req, res) => {
  try {
    await Tasks.update(req.body, {
      where: {
        id: req.params.task_id,
        user_id: req.user_id,
      },
    });

    return res.status(200).json({ message: "User Updated." });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export const setTaskStatus = async (req, res) => {
  try {
    await Tasks.update(req.body, {
      where: {
        id: req.params.task_id,
        user_id: req.user_id,
      },
    })

    return res.status(200).json({ message: "User Deactivated." });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
}