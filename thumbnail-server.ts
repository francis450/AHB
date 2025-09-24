import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for the frontend
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Ensure thumbnail directories exist
const ensureThumbnailDir = async (category: string) => {
  const dir = path.join(process.cwd(), 'public', 'gallery', 'thumbnails', category);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
  return dir;
};

// Endpoint to save thumbnail
app.post('/api/save-thumbnail', async (req, res) => {
  try {
    const { dataUrl, filename, category = '' } = req.body;

    if (!dataUrl || !filename) {
      return res.status(400).json({ error: 'Missing dataUrl or filename' });
    }

    // Ensure the data URL is valid
    if (!dataUrl.startsWith('data:image/')) {
      return res.status(400).json({ error: 'Invalid data URL format' });
    }

    // Extract base64 data from data URL
    const base64Data = dataUrl.split(',')[1];
    if (!base64Data) {
      return res.status(400).json({ error: 'Invalid base64 data' });
    }

    // Create buffer from base64
    const buffer = Buffer.from(base64Data, 'base64');

    // Ensure thumbnail directory exists
    const thumbnailDir = await ensureThumbnailDir(category);
    
    // Create full file path
    const filePath = path.join(thumbnailDir, filename);

    // Write file
    await fs.writeFile(filePath, buffer);

    // Return the relative path for the client
    const relativePath = path.join('/gallery/thumbnails', category, filename).replace(/\\/g, '/');

    res.json({ 
      success: true, 
      path: relativePath,
      message: 'Thumbnail saved successfully' 
    });

  } catch (error) {
    console.error('Error saving thumbnail:', error);
    res.status(500).json({ 
      error: 'Failed to save thumbnail', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(port, () => {
  console.log(`Thumbnail server running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/api/health`);
});

export default app;
