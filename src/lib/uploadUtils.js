import { supabase } from './customSupabaseClient';

export const uploadFileToStorage = async (file, filePath) => {
  try {
    // Check file size (Vercel limit is ~4.5MB)
    if (file.size > 4.5 * 1024 * 1024) {
      throw new Error('File too large. Maximum size is 4.5MB for deployment.');
    }

    const response = await fetch(`/api/proxy-upload?filePath=${encodeURIComponent(filePath)}`, {
      method: 'POST',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (response.status === 413) {
      throw new Error('File too large for upload. Please use a smaller file.');
    }

    let result;
    try {
      result = await response.json();
    } catch {
      throw new Error('Upload failed - server error');
    }
    
    if (!response.ok) {
      throw new Error(result.error || 'Upload failed');
    }

    return { data: { path: filePath }, error: null };
  } catch (err) {
    console.error('Upload error:', err);
    return { data: null, error: err };
  }
};

export const getFileUrl = (filePath) => {
  if (!filePath) return '';
  
  // Use proxy endpoint for consistent access
  return `/api/proxy-storage?filePath=${encodeURIComponent(filePath)}`;
};

export const downloadFile = async (filePath, filename) => {
  try {
    const response = await fetch(getFileUrl(filePath));
    
    if (!response.ok) {
      throw new Error(`Download failed: ${response.status}`);
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || filePath.split('/').pop() || 'download';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
    
    return { success: true };
  } catch (error) {
    console.error('Download error:', error);
    return { success: false, error: error.message };
  }
};