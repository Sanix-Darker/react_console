/**
 * Sockets Call on the python service
 * @param {*} socket 
 * @param {*} cb 
 */

export const onConnect = (socket, cb) => {
    socket.emit('onConnect', {data: 'I\'m connected!'});
}

export const onDisConnect = (socket, cb) => {
    socket.emit('onDisConnect', {data: 'I\'m disconnected!'});
}

export const onConnected = (socket, cb) => {
    socket.on('onConnected', (parameter) => {
      cb(parameter);
    })
}


export const onDisConnected = (socket, cb) => {
    socket.on('onDisConnected', (parameter) => {
      cb(parameter);
    })
}

export const onLog = (socket, cb) => {
    socket.on('onLog', (parameter) => {
      cb(parameter);
    })
}