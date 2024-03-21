import express from 'express';

import { register } from '../controllers/auth.js'; 
import { login } from '../controllers/auth.js'; 

const router = express.Router();


router.post('/register', async (req, res) => {
  const data = req.body;
  const response = await register(data);

  if (response.success) {
    res.json({ success: true, apiKey: response.apiKey });
  } else {
    res.status(400).json({ error: response.error });
  }
});

router.post('/login', async (req, res) => {
    try {
      const result = await login(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;
