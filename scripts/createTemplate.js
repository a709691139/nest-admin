const fs = require('fs');
const path = require('path');
const template = require('lodash/template');

const originFileConfig = {
  folderPaths: {
    one: path.join('./scripts/template/demoOne'),
  },
};

const config = {
  folderPath: path.join(`./scripts/output/`),
  type: 'one', // one oneToOne oneToMany manyToMany
  isSoftDelete: false, // 是否软删除
  name: '菜单权限表',
  entityName: 'Permission', // 会自动拿开头字母小写当文件名
  tableName: 'sys_permission',
  fileNamePrefix: '', // 不用填
  sub: {
    name: '用户表',
    entityName: 'Test1',
    tableName: 'test1',
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
    const fileExt = path.extname(file);
    const fileName = path.basename(file, fileExt);
    console.log('fileName', fileName);

    // 使用正则表达式将文件名中的目标部分替换为新的名字
    const newFileName = transJsTemplate(fileName);

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

/** 把普通字符串转换为模板  a=1; '${a}' 转成 '1' */
function transJsTemplate(template) {
  const result = template.replace(/\${(\w+)}/g, (match, key) => {
    return eval('config.' + key); // 使用 eval() 函数获取变量的值
  });
  return result;
}

copyFolderSync(
  originFileConfig.folderPaths[config.type],
  config.folderPath + config.fileNamePrefix,
);
renameFilesInFolder(config.folderPath + config.fileNamePrefix);

console.log(
  `done output targetFolder: ${config.folderPath}${config.fileNamePrefix}`,
);
