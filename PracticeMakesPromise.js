// I am not the orignating author of this code. But I wanted to keep it as I make small changes to test out the best practices of using
// Promises. 20% of the code below is mine. I plan on making it 100% as I learn more about async programming.

fakeApiBackend = () => {
  const user = {
    username: 'treyhuffine',
    favoriteNumber: 42,
    profile: 'https://gitconnected.com/treyhuffine'
  };

  // Introduce a randomizer to simulate the
  // the probability of encountering an error
  if ((Math.floor(Math.random() * (10 - 0 + 1)) + 0)%2 == 0) {
    return { 
      data: user, 
      statusCode: 200,
    };
  } else {
    const error = {
      statusCode: 404,
      message: 'Could not find user',
      error: 'Not Found',
    };
    
    return error;
  }
};

// Assume this is your AJAX library. Almost all newer
// ones return a Promise Object
const makeApiCall = () => {
  return new Promise((resolve, reject) => {
    // Use a timeout to simulate the network delay waiting for the response.
    // This is THE reason you use a promise. It waits for the API to respond
    // and after received, it executes code in the `then()` blocks in order.
    // If it executed is immediately, there would be no data.
    
      const apiResponse = fakeApiBackend();

      if (apiResponse.statusCode >= 400) {
        reject(apiResponse);
      } else {
        resolve(apiResponse.data);
      }
    
  });
};

makeApiCall()
  .then((user) => {
    console.log('In the first .then()');
  	
    return user;
  })
  .then((user) => {
    console.log(`User ${user.username}'s favorite number is ${user.favoriteNumber}`);
  
    return user;
  })
  .then((user) => {
    console.log('The previous .then() told you the favoriteNumber')
  
    return user.profile;
  })
  .then((profile) => {
    console.log(`The profile URL is ${profile}`);
  })
  .then(() => {
    console.log('This is the last then()');
  })
  .catch((error) => {
    console.log(error.message);
  });
  
  console.log("This will come first");
