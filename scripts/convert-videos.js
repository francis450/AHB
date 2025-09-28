#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

const VIDEO_CONFIG = {
  // Web-optimized settings
  web: {
    format: 'mp4',
    codec: 'libx264',
    crf: 23, // Quality (lower = better quality, higher file size)
    preset: 'medium',
    maxWidth: 1920,
    maxHeight: 1080,
    maxBitrate: '3M'
  },
  // Mobile-optimized settings
  mobile: {
    format: 'mp4',
    codec: 'libx264',
    crf: 26,
    preset: 'fast',
    maxWidth: 1280,
    maxHeight: 720,
    maxBitrate: '1.5M'
  }
};

async function convertVideo(inputPath, outputDir, config, suffix = '') {
  const inputName = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(outputDir, `${inputName}${suffix}.${config.format}`);

  console.log(`Converting ${inputPath} to ${outputPath}...`);

  const ffmpegCmd = [
    'ffmpeg',
    '-i', `"${inputPath}"`,
    '-c:v', config.codec,
    '-crf', config.crf,
    '-preset', config.preset,
    '-vf', `"scale='min(${config.maxWidth},iw)':'min(${config.maxHeight},ih)':force_original_aspect_ratio=decrease"`,
    '-maxrate', config.maxBitrate,
    '-bufsize', `${parseInt(config.maxBitrate) * 2}M`,
    '-c:a', 'aac',
    '-b:a', '128k',
    '-movflags', '+faststart', // Optimize for web streaming
    '-y', // Overwrite output files
    `"${outputPath}"`
  ].join(' ');

  try {
    const { stdout, stderr } = await execAsync(ffmpegCmd);
    console.log(`✅ Successfully converted: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
    throw error;
  }
}

async function processVideos() {
  const videosDir = 'public/gallery/videos';
  const outputDir = 'public/gallery/videos/optimized';

  try {
    // Create output directory
    await fs.mkdir(outputDir, { recursive: true });

    // Find all video files
    const findVideos = async (dir) => {
      const files = await fs.readdir(dir, { withFileTypes: true });
      const videos = [];

      for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
          const subVideos = await findVideos(fullPath);
          videos.push(...subVideos);
        } else if (file.name.match(/\.(mov|mp4|avi|mkv)$/i)) {
          videos.push(fullPath);
        }
      }
      return videos;
    };

    const videoFiles = await findVideos(videosDir);
    console.log(`Found ${videoFiles.length} video files to process`);

    // Convert each video
    const conversions = [];
    for (const videoPath of videoFiles) {
      // Skip if already in optimized folder
      if (videoPath.includes('/optimized/')) continue;

      // Create web and mobile versions
      conversions.push(
        convertVideo(videoPath, outputDir, VIDEO_CONFIG.web, '-web'),
        convertVideo(videoPath, outputDir, VIDEO_CONFIG.mobile, '-mobile')
      );
    }

    await Promise.all(conversions);
    console.log('🎉 All videos converted successfully!');

  } catch (error) {
    console.error('❌ Video conversion failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  processVideos();
}