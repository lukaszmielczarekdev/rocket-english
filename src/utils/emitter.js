import EventEmitter from "eventemitter3";

const eventEmitter = new EventEmitter();
const Emitter = {
  on: (event, fn) => eventEmitter.on(event, fn),
  off: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload),
};

Object.freeze(Emitter);
export default Emitter;

// singleton pattern
