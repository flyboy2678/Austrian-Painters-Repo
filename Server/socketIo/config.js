let io = null;

const setSocketIO = (socketIO) => {
	io = socketIO;
};

const getSocketIO = () => {
	return io;
};

module.exports = { setSocketIO, getSocketIO };
