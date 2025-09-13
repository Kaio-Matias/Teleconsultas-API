
import { Request, Response } from 'express';
import { uploadFile } from 'src/app/services/CloudStorage';

export async function uploadFiles(req: Request, res: Response) {
  if (!req.file) return res.status(400).json({ message: 'Nenhum arquivo enviado' });
  try {
    const file = req.file;

    if (!file) return res.status(400).send('Arquivo não enviado');

    const publicUrl = await uploadFile(file.path, file.originalname, file.mimetype);

    res.json({ url: publicUrl });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
