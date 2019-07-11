const express = require('express');
const {createLightship} = require('lightship');
const port = Number(process.env.port || 8000);
const lightshipPort = Number(process.env.port || 9000);

const app = express();

app.get('/', (request, response) => {
  response.send(`
    <html>
      <head>
        <title>Hello!</title>
      </head>
      <body>
        <p style="color: green">Hello, World!</p>
      </body>
    </html>
 `);
});

app.get('/error', (request, response) => {
  response.status(500).send('Uh oh');
});

const lightship = createLightship({
  port: lightshipPort,
});

const server = app.listen(port, () => {
  console.log('Listening on', port);
  lightship.signalReady();
  console.log('Ready to serve traffic');
});

lightship.registerShutdownHandler(() => {
  return new Promise((resolve, reject) => {
    server.close((err) => err ? reject(err) : resolve());
  });
});
