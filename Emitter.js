// Emitter

// I recently did a Facebook interview and was asked to create my own simple Emitter. 
// If you need to know what an emitter does I suggest looking on medium.com they have an excellent example and definition

/*
I have been thinking about the problem and I think it is close but its not there. The sub variables below do indeed get a release function BUT they are changing the same array value in the map. Thats not good. If you call sub.release() twice then you will in fact change the array twice when what you really wanted to do is do it once and then flag attempts to do it again from the same sub. On another example if you do a sub.release() then follow up with a sub3.release() then... well I think you see the issue. So part of this challenge is how to release without changing the array in away that will affect other releases.

Solution: when we release we won't splice out the callback. Instead we will make it null. When we subscribe a new call back with a the same eventname then we will search the array for the first null index and change it to the new callback with its index. When we do not find a null then we push the callback on to the array
*/

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

const emitter = new Emitter();

function callback(greet, right){
	console.log(`We did it ${greet} ${right}`);
}

function callback2(greet, fight){
	console.log(`We didn't it ${greet} ${fight}`);
}



const sub = emitter.subscribe('event_name', callback);
const sub2 = emitter.subscribe('event_name', callback);
const sub3 = emitter.subscribe('event_name', callback2);

emitter.emit('event_name', "Reddit", "Name");

sub.release(); // `sub` is the reference returned by `subscribe` above

emitter.emit('event_name', "Tumblr", "Shame");
