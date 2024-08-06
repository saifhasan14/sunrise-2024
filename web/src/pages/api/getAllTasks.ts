import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllTasks } from '@/modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  res.status(200).json(getAllTasks());
}
