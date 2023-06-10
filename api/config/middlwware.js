const myMiddleware = (req, res, next) => {
    console.log('meu middleware!');
    next(); 
  }
  
  const express = require('express');
  const app = express();
  app.use(myMiddleware);
  
 
  app.listen(21262, () => {
    console.log('Server listening on port 21262!');
  });
  