const app = require('./app');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const PORT = process.env.PORT || 3000 + (cluster.worker.id - 1);
    app.listen(PORT,()=>{
        console.log(`Hello from worker ${cluster.worker.id}`);
    });
}
