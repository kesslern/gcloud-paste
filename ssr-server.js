require('svelte/register');
const express = require('express');
const fs = require('fs');
const path = require('path');
const Prism = require('prismjs');
const App = require('./src/App.svelte').default;

const prismCss = fs.readFileSync(require.resolve('prismjs/themes/prism.css'), 'utf8');

const server = express();
const port = 3000;

const code = `var data = 1;`;
const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');

server.get(`/`, (req, res) => {
  const { html: renderedHtml, css } = App.render({ html })

  res.send(
    index
      .toString()
      .replace(
        '<body></body>',
        `<body><style>${css.code}</style>${renderedHtml}</body>`
      )
  );
});

server.use(`/`, express.static(path.resolve(__dirname, 'public')));

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const index = `
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset='utf-8'>
	<meta name='viewport' content='width=device-width,initial-scale=1'>
	<title>Svelte app</title>
	<link rel='icon' type='image/png' href='/favicon.png'>
	<link rel='stylesheet' href='/global.css'>
	<link rel='stylesheet' href='/build/bundle.css'>
  <style>${prismCss}</style>
</head>

<body></body>

</html>
`