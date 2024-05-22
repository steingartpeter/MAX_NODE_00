// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");

// const { tstFunc } = require("./middleware/helper.funcs");

// const app = express();
// dotenv.config();
// //app.use(express.json());
// app.use(cors());
// app.options("*", cors());
// const port = Number(process.env.PORT || 3556);
// app.listen(port, () => console.log(`🚀 Server running on port ${port}!`));

// tstFunc();

// module.exports = app;

// +--------------------+
// ### MAX's APP:JS  ###|
// +--------------------+
const http = require("http");
const fs = require("fs");
const { MAT_NAMES, MAT_CHNCS, MAT_AMNOUNTS, MAT_COLORS, MAT_BGRNDS } = require("./assets/db_mining.js");
const { tstFunc, gnrtRndmInt, findChncIdx } = require("./middleware/helper.funcs");

// function rqListener(req, res) {}
// http.createServer(rqListener);

const srvr = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    // handle BASE ROUTE

    let gnrt = "";
    for (let idx1 = 0; idx1 < 100; idx1++) {
      const rndm = Math.random().toFixed(2);
      const idx = findChncIdx(rndm, MAT_CHNCS);
      const matNm = MAT_NAMES[idx];
      const qtty = gnrtRndmInt(MAT_AMNOUNTS[idx], MAT_AMNOUNTS[idx + 1]);
      gnrt += `You found ${qtty} unit of <b style="color:${MAT_COLORS[idx]};background-color:${MAT_BGRNDS[idx]}">${matNm}</b><br>`;
    }

    // set the content type (header must be touched ONCE!!! like in PHP)
    res.setHeader("Content-type", "text/html");
    // as res is a STREAM, we can continously write into it

    res.write("<html>");
    res.write("<head>");
    res.write("<title>Enter Mesage</title>");
    res.write(`<style>
      .btn01{
        width:150px;
        height:45px;
        border-radius:26px;
        background-color:#888;
        color:#fff;
        text-align:center;
        padding-top:20px;
        box-shadow:6px 6px 12px #000;
      }
      .clickedBtn{
        width:150px;
        height:43px;
        border-radius:26px;
        background-color:#888;
        color:#000;
        text-align:center;
        padding-top:24px;
        box-shadow:inset 6px 6px 12px #000;
      }
    </style>`);
    res.write("</head>");
    res.write("<body>");
    res.write('<div><form action="/message" method="POST">');
    res.write("<label>Enter your message:</label>");
    res.write('<input type="text" name="message"></input>');
    res.write('<button type="submit">SEND</button>');
    res.write("</form></hr>");
    res.write(`<div class="btn01" onclick="" >MINTA GOMB</div>`);
    res.write(gnrt);
    res.write("</div>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (url === "/message" && method === "POST") {
    // Handle MESSAGE route
    const body = [];
    // use req.on == EVENT DRIVEN CODING, first parameter is a constant EVENT name
    req.on("data", (dataChnk) => {
      //console.log(dataChnk);
      body.push(dataChnk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const flContent = parsedBody.split("=")[1];
      // console.log(parsedBody);
      // fs.writeFileSync("message.txt", flContent);
      fs.writeFile("message.txt", flContent, (err) => {
        if (!err) {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          return res.end();
        }
      });
    });
  }
  // console.log(req.url, req.method, req.headers);
  // process.exit();
  //
});

srvr.listen(7501);
