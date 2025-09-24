// Service for automatically saving video thumbnails
class ThumbnailSaveService {
  private static baseUrl = import.meta.env.VITE_THUMBNAIL_SERVER_URL || 'http://localhost:3001';

  /**
   * Automatically saves a generated thumbnail to the server
   */
  static async saveThumbnail(
    dataUrl: string, 
    videoPath: string, 
    title: string
  ): Promise<{ success: boolean; path?: string; error?: string }> {
    try {
      // Generate filename from video path
      const filename = this.generateThumbnailFilename(videoPath);
      
      // Determine category from video path
      const category = this.extractCategory(videoPath);

      const response = await fetch(`${this.baseUrl}/api/save-thumbnail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dataUrl,
          filename,
          category,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Thumbnail save failed:', errorData);
        return { success: false, error: errorData.error || 'Save failed' };
      }

      const result = await response.json();
      console.log('Thumbnail saved successfully:', result.path);
      
      return { success: true, path: result.path };

    } catch (error) {
      console.error('Error saving thumbnail:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  }

  /**
   * Generate a safe filename from video path
   */
  private static generateThumbnailFilename(videoPath: string): string {
    if (!videoPath) return 'thumbnail.jpg';
    
    const pathParts = videoPath.split('/');
    const filename = pathParts[pathParts.length - 1];
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    
    // Clean filename for filesystem safety
    const cleanName = nameWithoutExt
      .replace(/[^a-zA-Z0-9-_\s]/g, '_') // Replace special chars with underscore
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .toLowerCase();
    
    return `${cleanName}-thumb.jpg`;
  }

  /**
   * Extract category from video path
   */
  private static extractCategory(videoPath: string): string {
    if (videoPath.includes('human-hair')) return 'human-hair';
    if (videoPath.includes('hair-styling')) return 'hair-styling';
    if (videoPath.includes('wig-installation')) return 'wig-installation';
    if (videoPath.includes('treatments')) return 'treatments';
    return ''; // Default category
  }

  /**
   * Check if thumbnail server is available
   */
  static async isServerAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export default ThumbnailSaveService;
