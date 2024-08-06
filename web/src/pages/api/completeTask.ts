import type { NextApiRequest, NextApiResponse } from 'next';
import { completeTask } from '@/modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Task title is required' });
  }

  completeTask(title);
  res.status(200).json({ message: 'Task completed successfully' });
}
