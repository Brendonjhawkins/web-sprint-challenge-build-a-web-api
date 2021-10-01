const express = require('express'); 
const helmet = require('helmet'); 
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

const server = express();

server.use(express.json());
server.use(helmet()); 
server.use('/api/projects', logger, projectsRouter);
server.use('/api/actions', logger, actionsRouter);



server.use('*', logger, (req, res, next) => {
  next({ status: 404, message: `${req.method} ${req.originalUrl} not found!` })
});

server.use(errorHandling)

module.exports = server;

///////Global middleware/////////

function logger(req, res, next) {
    const timeStamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl
    console.log(` [${timeStamp}] ${method} to ${url}`)
    next()
  }

// eslint-disable-next-line
function errorHandling(err, req, res, next) { 
  res.status(err.status || 500).json({
    message: err.message,
  })
}
