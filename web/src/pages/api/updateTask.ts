import type { NextApiRequest, NextApiResponse } from 'next';
import { updateTask } from '@/modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id, ...updatedTask } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Task ID is required' });
  }

  updateTask(parseInt(id), updatedTask);
  res.status(200).json({ message: 'Task updated successfully' });
}
