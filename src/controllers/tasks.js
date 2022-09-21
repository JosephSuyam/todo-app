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
    const task = {
      user_id: req.user_id,
      title: req.body.title,
      description: req.body.description ?? null,
    };

    if (req.body.status) task.status = req.body.status;

    await Tasks.create(task);

    return res.status(201).json({ message: 'Task successfully added.' })
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export const updateTask = async (req, res) => {
  try {
    const update_task = {
      title: req.body.title,
      description: req.body.description ?? null,
    };

    if (req.body.status) update_task.status = req.body.status;

    await Tasks.update(update_task, {
      where: {
        id: req.params.task_id,
        user_id: req.user_id,
      },
    });

    return res.status(200).json({ message: "Task successfully updated." });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export const setTaskStatus = async (req, res) => {
  try {
    const status_update = {
      status: req.body.status,
    };

    if (req.body.status === TaskStatus.COMPLETE) status_update.completed_at = 0;

    await Tasks.update(status_update, {
      where: {
        id: req.params.task_id,
        user_id: req.user_id,
      },
    })

    return res.status(200).json({ message: "Task status updated." });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
}