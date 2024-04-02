const fs = require('fs');
const path = require('path');

function changeLineEndings(directory, currentDepth = 0, maxDepth = 4) {
  if (currentDepth > maxDepth) {
    return;
  }

  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(directory, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error getting file stats:', err);
          return;
        }

        if (stats.isFile() && path.extname(filePath) === '.ts') {
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              console.error('Error reading file:', err);
              return;
            }

            const updatedData = data.replace(/\r\n/g, '\n');

            fs.writeFile(filePath, updatedData, 'utf8', err => {
              if (err) {
                console.error('Error writing file:', err);
                return;
              }

              console.log(`Line endings changed for file: ${filePath}`);
            });
          });
        } else if (stats.isDirectory()) {
          changeLineEndings(filePath, currentDepth + 1, maxDepth);
        }
      });
    });
  });
}
// Usage
const directoryPaths = ['./scripts', './src'];
directoryPaths.forEach(changeLineEndings);
