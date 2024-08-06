import type { NextApiRequest, NextApiResponse } from 'next';
import { createTask } from '@/modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { title, description, persona, group } = req.body;
  
  if (!title || !description || !persona || group === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  createTask(title, description, persona, parseInt(group));
  res.status(201).json({ message: 'Task created successfully' });
}
