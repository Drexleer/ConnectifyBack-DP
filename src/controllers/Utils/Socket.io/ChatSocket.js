module.exports = (io) => {
  const userConnections = {};

  const adminId = 'connectify2023';

  io.on('connection', (socket) => {
    console.log('Client connected');

    // Manejar la autenticación y registro de usuarios
    socket.on('userAuthenticated', (userId) => {
      // Asocia el socket con el ID de usuario (nombre de usuario o identificador único)
      userConnections[userId] = socket;
    });
    // Manejar el envío de mensajes
    socket.on('sendMessage', (message, fromUserId, toUserId) => {
      // Verificar si el usuario de destino es el administrador
      if (toUserId === adminId) {
        // Verificar si el usuario está autenticado
        if (userConnections[toUserId]) {
          // Enviar el mensaje al administrador
          userConnections[toUserId].emit('message', {
            body: message,
            from: fromUserId,
          });
        } else {
          socket.emit(
            'adminNotConnected',
            'El administrador no está disponible en este momento'
          );
        }
      } else {
        // Manejar el caso de mensajes a otros usuarios (si es necesario)
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
