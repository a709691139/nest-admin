const data = {
  port: parseInt(process.env.PORT, 10) || 3000,
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
    timezone: 'Asia/Shanghai',
    charset: 'utf8mb4',
    entities: ['./**/*.entity.js'],
    synchronize: true,
    logging: true,
  },
};
export default data;
