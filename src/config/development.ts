const data = {
  appkey: '_1555233249358_7017',
  port: parseInt(process.env.PORT, 10) || 3000,
  // 静态文件路径
  staticAccestsPath: '/static',
  // 是否开启swagger
  enableSwagger: true,
  // 数据库配置
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'nestjs',
    charset: 'utf8mb4',
    entities: ['**/*.entity.js'],
    synchronize: true,
    logging: false,
  },
  redis: {
    host: 'localhost',
    port: 6379,
    database: 0,
    password: '',
    ttl: 60,
  },
  upload: {
    localPath: './public/upload',
    localDomain: 'http://localhost:3000',
  },
};
export default data;
