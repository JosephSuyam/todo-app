import Op from "sequelize";
import Tasks from '../models/task.model.js';
import { TaskStatus } from '../models/enums/tasks.enum.js';

export const getTasks = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const offset = req.query.page ? parseInt(req.query.page) : 1;
    let whereStatement = {};

    if(req.query.status)
      whereStatement.status = Object.values(TaskStatus).includes(req.query.status) ? req.query.status : TaskStatus.TODO;

    if(req.query.search)
      whereStatement.title = { [Op.like]: `%${req.query.search}%` };

    const tasks = await Tasks.findAndCountAll({
      limit,
      offset,
      where: whereStatement,
    });

    console.log({count: tasks.count, limit, 'page': Math.ceil(tasks.count / limit)});

    const data = {
      message: "Task List.",
      total_count: tasks.count,
      total_pages: Math.ceil(tasks.count / limit),
      data: tasks.rows,
    }

    console.log(data)

    return res.status(200).json(data);
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