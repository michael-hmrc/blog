// src/index.ts
import express from 'express';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import App from './App';

const app = express();

app.get('*', (req, res) => {
  const stream = renderToPipeableStream(
    <App />,
    {
      onShellReady() {
        // When the shell (the non-interactive part) is ready, send the HTML structure
        res.setHeader('Content-Type', 'text/html');
        res.write(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>React 18 SSR</title>
            </head>
            <body>
              <div id="root">`);
        stream.pipe(res); // Pipe the rendered content to the response
        res.write(`</div>
              <script src="/bundle.js"></script>
            </body>
          </html>
        `);
      },
      onError(error) {
        console.error(error);
        res.status(500).send('An error occurred');
      },
    }
  );
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
