// Emitter

// I recently did a Facebook interview and was asked to create my own simple Emitter. 
// If you need to know what an emitter does I suggest looking on medium.com they have an excellent example and definition

class Emitter {
	constructor() {
  	this.eventMap = {};
  }
  
	subscribe(event_name, callback) {
  	(event_name in this.eventMap)
    	? this.eventMap[event_name].push(callback)
    	: this.eventMap[event_name] = [callback];
    
    return {
    	release:  () => {
      	let index = this.eventMap[event_name].indexOf(callback);
        this.eventMap[event_name].splice(index, 1);
      }
    }
  }
  
  emit(event_name) {
  	const [,...args] = [].slice.call(arguments);
    let callArray = this.eventMap[event_name];
    for(const calls of callArray) {
    	calls(...args);
    }
  }
}

emitter = new Emitter();

function callback(greet, right){
	console.log(`We did it ${greet} ${right}`);
}

function callback2(greet, fight){
	console.log(`We didn't it ${greet} ${fight}`);
}



sub = emitter.subscribe('event_name', callback);
sub2 = emitter.subscribe('event_name', callback);
sub3 = emitter.subscribe('event_name', callback2);

emitter.emit('event_name', "Reddit", "Name");

sub.release(); // `sub` is the reference returned by `subscribe` above

emitter.emit('event_name', "Tumblr", "Shame");
