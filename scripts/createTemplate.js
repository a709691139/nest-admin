const fs = require('fs');
const path = require('path');
const template = require('lodash/template');

const originFileConfig = {
  folderPaths: {
    one: path.join('./scripts/template/demoOne'),
    oneToMany: path.join('./scripts/template/demoOneToMany'),
    manyToMany: 'TODO',
    oneToOne: 'TODO',
    tree: 'TODO',
  },
};

const config = {
  folderPath: path.join(`./scripts/output/`),
  type: 'oneToMany', // one oneToOne oneToMany manyToMany tree
  isSoftDelete: false, // 是否软删除
  name: '系统字典表',
  entityName: 'Dict', // 会自动拿开头字母小写当文件名
  tableName: 'sys_dict',
  fileNamePrefix: '', // 不用填
  sub: {
    name: '系统字典项表',
    entityName: 'DictItem',
    tableName: 'sys_dict_item',
    fileNamePrefix: '',
  },
};
config.fileNamePrefix =
  config.entityName[0].toLowerCase() +
  config.entityName.slice(1, config.entityName.length);
config.sub.fileNamePrefix =
  config.sub.entityName[0].toLowerCase() +
  config.sub.entityName.slice(1, config.sub.entityName.length);
console.log(config);

if (['oneToOne', 'manyToMany'].includes(config.type)) {
  console.log('还没开发相关demo:' + config.type);
  return;
}

function copyFolderSync(source, target) {
  fs.existsSync(target) && fs.rmdirSync(target, { recursive: true });
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

function renameFilesInFolder(folderPath) {
  // 读取文件夹中的所有文件
  const files = fs.readdirSync(folderPath);
  console.log('files', files);

  // 遍历文件夹中的所有文件
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      renameFilesInFolder(filePath);
      return;
    }
    const fileExt = path.extname(file);

    const fileName = path.basename(file, fileExt);
    console.log('fileName', fileName);

    // 修改文件名
    const nameCompiledTemplate = template(fileName);
    const newFileName = nameCompiledTemplate(config);

    // 构造新的文件路径
    const newFilePath = path.join(folderPath, newFileName + '.ts');

    // 读取文件内容
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // 进行部分修改替换
    // const modifiedContent = transFileText(fileContent);
    const compiledTemplate = template(fileContent);
    const modifiedContent = compiledTemplate(config);

    // 使用 fs.writeFileSync() 方法写入修改后的内容
    fs.writeFileSync(newFilePath, modifiedContent);

    // 使用 fs.unlinkSync() 方法删除原始文件
    fs.unlinkSync(filePath);
  });
}

copyFolderSync(
  originFileConfig.folderPaths[config.type],
  config.folderPath + config.fileNamePrefix,
);
renameFilesInFolder(config.folderPath + config.fileNamePrefix);

console.log(
  `done output targetFolder: ${config.folderPath}${config.fileNamePrefix}`,
);
