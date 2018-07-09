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