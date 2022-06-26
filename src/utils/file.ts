import fs from 'fs';

export async function deletefile(fileName: string) {
  try {
    await fs.promises.stat(fileName);
  } catch {
    return;
  }

  await fs.promises.unlink(fileName);
}
