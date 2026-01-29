import path from 'node:path'
import fs from 'node:fs/promises'

export async function imageToBase64(relativePath){
    const absolutePath = path.resolve(relativePath);
    const ext = path.extname(absolutePath).slice(1);
    const file = await fs.readFile(absolutePath);
    return `data:image/${ext};base64,${file.toString("base64")}`;
}