// server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import fs from 'fs';
import matter from 'gray-matter';
import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const PORT = process.env.PORT || 5555;

// ES modules path fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Markdown posts folder
const POSTS_DIR = path.join(__dirname, 'devPostsMd');
console.log('Dev posts folder path:', POSTS_DIR);
console.log('Exists?', fs.existsSync(POSTS_DIR));
console.log('Files:', fs.existsSync(POSTS_DIR) ? fs.readdirSync(POSTS_DIR) : 'No folder');

// Serve frontend static files in production
// Vite builds to 'dist' folder by default
const buildPath = path.join(__dirname, 'dist');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(buildPath));
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simple request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Helper: Load Markdown posts
const loadPosts = () => {
  if (!fs.existsSync(POSTS_DIR)) {
    console.warn('Dev posts folder not found:', POSTS_DIR);
    return [];
  }

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  const posts = files.map((file, idx) => {
    try {
      const filePath = path.join(POSTS_DIR, file);
      const contentRaw = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(contentRaw);

      return {
        id: idx + 1,
        title: data.title || file.replace('.md', ''),
        date: data.date || fs.statSync(filePath).mtime.toISOString().split('T')[0],
        content,
      };
    } catch (err) {
      console.error('Error loading post:', file, err);
      return null;
    }
  }).filter(Boolean);

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  console.log('Loaded posts:', posts.map(p => p.title));
  return posts;
};

// === API ROUTER ===
const apiRouter = express.Router();

apiRouter.get('/devPosts', (req, res) => {
  const posts = loadPosts();
  if (!posts.length) console.warn('No dev posts found!');
  res.json(posts);
});

apiRouter.post('/contact', async (req, res, next) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message)
    return res.status(400).json({ error: 'All fields are required' });

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: 'me@joshuamost.com',
      subject,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    next(err);
  }
});

apiRouter.post('/newsletter/signup', async (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    await sgMail.send({
      to: email,
      from: 'mostjr@masters.edu',
      subject: 'Thanks for subscribing!',
      text: 'Welcome to the newsletter!',
      html: '<strong>Welcome to the newsletter!</strong>',
    });

    res.status(200).json({ message: 'Thank you for subscribing!' });
  } catch (err) {
    next(err);
  }
});

app.use('/api', apiRouter);

// === SPA fallback ===
if (process.env.NODE_ENV === 'production') {
  app.get(/^\/.*$/, (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// === Error handling middleware ===
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error on ${req.method} ${req.originalUrl}:`, err);
  res.status(500).json({ error: 'Internal server error' });
});

// === Start server ===
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));