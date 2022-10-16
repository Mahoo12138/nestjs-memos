import * as fs from 'fs';
import * as crypto from 'crypto';

export const exitsFolder = async function (dir: string) {
  try {
    await fs.promises.stat(dir);
  } catch (e) {
    // 不存在文件夹，直接创建 {recursive: true}
    await fs.promises.mkdir(dir, { recursive: true });
  }
  return dir;
};

export const checkFileHash = (filePath: string) => {
  return new Promise<string>((resolve, reject) => {
    const fsHash = crypto.createHash('md5');
    fs.readFile(filePath, (err, data) => {
      // 读取文件
      if (err) {
        reject(err);
      } else {
        // 获取文件md5
        const md5 = fsHash.update(data).digest('hex');
        resolve(md5);
      }
    });
  });
};

export const deleteFile = (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.log('del error', error);
  }
};
