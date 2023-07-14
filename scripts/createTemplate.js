const fs = require('fs');
const path = require('path');

const originFileConfig = {
  entityName: 'DemoOne',
  fileNamePrefix: 'demoOne',
  folderPath: path.join('./src/modules/demo/demoOne'),
};
const newFileConfig = {
  entityName: 'User',
  fileNamePrefix: 'user',
  folderPath: path.join(`./scripts/output/user`),
};

function copyFolderSync(source, target) {
  // 创建目标文件夹
  fs.mkdirSync(target, { recursive: true });

  // 获取源文件夹中的文件和子文件夹
  const files = fs.readdirSync(source);

  // 遍历源文件夹中的文件和子文件夹
  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    // 判断当前遍历的路径是文件还是文件夹
    if (fs.statSync(sourcePath).isDirectory()) {
      // 如果是文件夹，则递归调用 copyFolderSync() 来复制子文件夹
      copyFolderSync(sourcePath, targetPath);
    } else {
      // 如果是文件，则使用 fs.copyFileSync() 方法复制文件
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

function renameFilesInFolder(folderPath, name) {
  // 读取文件夹中的所有文件
  const files = fs.readdirSync(folderPath);

  // 遍历文件夹中的所有文件
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const fileExt = path.extname(file);
    const fileName = path.basename(file, fileExt);
    const newName = `${name}${fileExt}`;

    // 使用正则表达式将文件名中的目标部分替换为新的名字
    const newFileName = fileName.replace(/^[^.]+/, name);

    // 构造新的文件路径
    const newFilePath = path.join(folderPath, newFileName + fileExt);

    // 读取文件内容
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // 进行部分修改替换
    const modifiedContent = transFileText(fileContent);

    // 使用 fs.writeFileSync() 方法写入修改后的内容
    fs.writeFileSync(newFilePath, modifiedContent);

    // 使用 fs.unlinkSync() 方法删除原始文件
    fs.unlinkSync(filePath);
  });
}
function transFileText(text) {
  text = text.replaceAll(originFileConfig.entityName, newFileConfig.entityName);
  text = text.replaceAll(
    originFileConfig.fileNamePrefix,
    newFileConfig.fileNamePrefix,
  );
  // 替换变量名
  return text;
}

copyFolderSync(originFileConfig.folderPath, newFileConfig.folderPath);
renameFilesInFolder(newFileConfig.folderPath, newFileConfig.fileNamePrefix);

console.log(`done output targetFolder: ${newFileConfig.folderPath}`);
