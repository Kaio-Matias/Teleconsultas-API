// supabase.ts
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
require('dotenv').config();

const supabaseUrl = process.env.SUPABSE_URL;
const supabaseKey = process.env.SUPABSE_PUBLIC_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadFile(localPath: string, fileName: string, contentType: string) {
  const fileBuffer = fs.readFileSync(localPath);

  const { error } = await supabase.storage
    .from('i-saude')
    .upload(fileName, fileBuffer, {
      contentType,
      upsert: true,
    });

  fs.unlinkSync(localPath);

  if (error) throw error;

  const { data: publicUrlData, } = await supabase.storage
    .from('i-saude')
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}
