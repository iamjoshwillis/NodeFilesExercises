const fs = require('fs');
const process = require('process');
const axios = require('axios')

function handleOutput(text, out) {
    if (out) {
      fs.writeFile(out, text, 'utf8', function(err) {
        if (err) {
          console.log("Error", err);
          process.kill(1);
        }
      });
    } else {
      console.log(text);
    }
  }

function cat(path, out) {
    fs.readFile(path, 'utf8', (err,data) => {
    if(err) {
        console.log("Error", err)
        process.kill(1)
    }
    handleOutput(data, out);
})
}

async function webCat(url, out) {
    try {
        let res = await axios.get(url);
        console.log(res.data);
    } catch (err) {
        console.log("Error", err)
        process.kill(1)
    }
}

let path;
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0,4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out);
}