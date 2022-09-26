import { object, string, boolean, mixed } from 'yup';
import { TaskStatus } from '../../models/enums/tasks.enum.js';

const taskSchema = {
  taskSchema: (
    object({
      title: string().max(255).required(),
      description: string(),
      status: mixed().oneOf(Object.values(TaskStatus)),
    })
  ),
  setTaskStatusSchema: (
    object({
      status: mixed().oneOf(Object.values(TaskStatus)),
    })
  ),
};

export default taskSchema;