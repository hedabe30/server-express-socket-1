const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
const { socketController } = require('../sockets/controller');

class Server {

  constructor () {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);

    this.paths = {}

    //Middlewares
    this.middlewares();

    //Rutas de la App
    this.routes();

    //Sockets
    this.sockets();
  }

  middlewares() {

    //Mostrar peticiones
    this.app.use(morgan('tiny'));

    //cors
    this.app.use(cors());

    //Directorio publico
    this.app.use(express.static('public'));

  }

  routes () {

    // this.app.use(this.paths.auth, require('../routes/auth.routes'));

  }

  sockets() {

    this.io.on('connection', socketController)
  }

  listen () {
    this.server.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`)
    })
  }

}

module.exports = Server;