// This code only flattens 2-D arrays and lower. This is a good introduction to flattening an array. Check out my FlattenDeeply to
// see how to take the idea to a new level

const flat = (oldArr) => oldArr.reduce((arr, elem) => arr.concat(elem), []);

const flatMap = (oldArr) =>  [].concat(...oldArr);
