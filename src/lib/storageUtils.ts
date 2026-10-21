/**
 * Supabase Storage Image Uploader with Robust Server Fallback for KBZLife LMS
 */

import { getSupabaseClient } from './supabase';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Validates image file type and size
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Unsupported format. Please select a JPG, PNG, or WebP image.',
    };
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File is too large (${sizeMb} MB). Maximum allowed image size is 5 MB.`,
    };
  }

  return { valid: true };
}

/**
 * Uploads an image file to Supabase Storage (bucket: company-news, video-thumbnails, etc.)
 * If Supabase is unavailable or fails, gracefully falls back to the server asset store.
 */
export async function uploadImageFile(
  file: File,
  bucketName: 'company-news' | 'video-thumbnails' | 'profile-pictures' | 'top-performers' = 'company-news'
): Promise<UploadResult> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  // Generate unique file path
  const ext = file.name.split('.').pop() || 'jpg';
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
  const storagePath = `${timestamp}_${randomStr}_${sanitizedName}`;

  // 1. Attempt Direct Client-side Upload via Supabase Storage if configured
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from(bucketName)
        .upload(storagePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type,
        });

      if (!uploadErr && uploadData?.path) {
        const { data: publicUrlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(uploadData.path);

        if (publicUrlData?.publicUrl) {
          return {
            success: true,
            url: publicUrlData.publicUrl,
          };
        }
      } else if (uploadErr) {
        console.warn('[KBZLife Storage] Client Supabase storage upload notice:', uploadErr.message);
      }
    } catch (err: unknown) {
      console.warn('[KBZLife Storage] Client upload attempt skipped to server route:', err);
    }
  }

  // 2. Fallback to Server Upload Handler
  try {
    const reader = new FileReader();
    const dataUrl = await new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read selected image file.'));
      reader.readAsDataURL(file);
    });

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        dataUrl,
        bucket: bucketName,
      }),
    });

    const result = await res.json();
    if (res.ok && result.success && result.url) {
      return { success: true, url: result.url };
    }

    return {
      success: false,
      error: result.message || 'Image upload failed. Please try again.',
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, error: msg || 'Upload failed due to a network error.' };
  }
}
