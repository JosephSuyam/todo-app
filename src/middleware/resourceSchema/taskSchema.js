import { object, string, boolean, mixed } from 'yup';
import { TaskStatus } from '../../models/enums/tasks.enum.js';

const taskSchema = {
  addTaskSchema: (
    object({
      title: string().max(255).required(),
      description: string(),
      status: mixed().oneOf(Object.values(TaskStatus)),
    })
  ),
  editTaskSchema: (
    object({
      task_id: string().uuid(),
      title: string().max(255).required(),
      description: string(),
      status: mixed().oneOf(Object.values(TaskStatus)),
      completed_at: boolean(),
    })
  ),
  setTaskStatusSchema: (
    object({
      status: mixed().oneOf(Object.values(TaskStatus)),
    })
  ),
};

export default taskSchema;