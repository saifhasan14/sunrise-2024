import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteTask } from '@/modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ message: 'Task ID is required' });
  }

  deleteTask(parseInt(id as string));
  res.status(200).json({ message: 'Task deleted successfully' });
}
