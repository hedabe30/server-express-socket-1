

const socketController = (socket) => {
  console.log('Cliente conectado', socket.id)

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  })

  socket.on('enviar-mensaje', ( payload, callback ) => {

    const id = 123456;
    callback({ id, fecha: new Date().getTime() });
    socket.broadcast.emit('enviar-mensaje', payload);   //Devuelve mensajes a todos los usuarios conectados

  })
}

module.exports = {
  socketController
}