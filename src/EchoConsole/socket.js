/**
 * Sockets Call on the python service
 * @param {*} socket 
 * @param {*} cb 
 */

// import uuid from 'uuid/v4';

// let room = uuid();

// Generer le uuid ici et se balader avec en temps que room

export const onConnect = (room, socket, cb) => {
    socket.emit('onConnect', {data: 'I\'m connected!', room: room});
}

// export const onDisConnect = (socket, cb) => {
//     socket.emit('onDisConnect', {data: 'I\'m disconnected!', room: room});
// }

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

export const onStop = (socket, cb) => {
    socket.on('onStop', (parameter) => {
      cb(parameter);
    })
}

export const onStep = (socket, cb) => {
    socket.on('onStep', (parameter) => {
      cb(parameter);
    })
}

export const onEstimateTime = (socket, cb) => {
    socket.on('onEstimateTime', (parameter) => {
      cb(parameter);
    })
}