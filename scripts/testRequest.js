var request = require('request');
const dayjs = require('dayjs');
const fs = require('fs');
console.log('dayjs', dayjs().format('YYYY-MM-DD HH:mm:ss'));

const tempTextUrl = './scripts/temp.txt';

const url =
  'https://uatjmxwh5.gdrcu.com:8080/ensure-validate/house-loan-start?smsToken=e433fbcdd0ee35263d7229adfaeffc3e1684231713699&esignBusinessType=3&creditApplyId=10120419600013112';
function doFn() {
  request(url, function (error, response, body) {
    //body为返回的数据
    if (error) {
      console.log('error', dayjs().format('YYYY-MM-DD HH:mm:ss'), error); // 请求成功的处理逻辑
      fs.appendFileSync(
        tempTextUrl,
        dayjs().format('YYYY-MM-DD HH:mm:ss') + JSON.stringify(error) + ' \n',
      );
      return;
    }
    console.log('success', dayjs().format('YYYY-MM-DD HH:mm:ss'));
  });
}

doFn();
setInterval(function () {
  doFn();
}, 20 * 1000);
