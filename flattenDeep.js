// This is my solution to flattening array of any dimension. It also handles objects that are deeply nested. 
// It is capable of taking an unlimited amount of arguments and will always default to returning a new array.

function flatten(oldArr = []) {
	if(arguments.length > 1){
  	const args = [].slice.call(arguments);
    console.log("Hi " + args);
    return flatten(args);
    
  }
  return oldArr.reduce(
  	function flatHelper(arr, elem) {
      if(elem == null) {
        return arr;
      } 
      else if(Array.isArray(elem)) {
        return elem.reduce(flatHelper, arr);
      }
      else if(typeof elem === 'object') {
      	return Object.key(elem).map(k => elem.k).reduce(flatHelper, arr);
      } 
      else {
      	return arr.concat(elem);
      }
  }, [])
}
