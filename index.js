const instagramDl = require("@sasmeee/igdl");
// let url =
//   "https://www.instagram.com/reel/Cz0MW5QRef7/?igshid=NzBmMjdhZWRiYQ%3D%3D";

const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const cors = require("cors");
dotEnv.config();
console.log("base url", process.env.BASE_URL, process.env.PORT);
const port = 3000;
let app = express();
// cors
app.use(cors({ origin: true, credentials: true }));

// Parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("ok");
});

app.post("/download_insta_reels", async (req, res, next) => {
  try {
    const data = req.body;
    console.log("post data", data);
    let out = await instagramDl(data.url);
    //console.log("out!!!", out);
    res.status(200).json({
      status: true,
      message: "ok",
      data: out,
    })
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      status: false,
      message: "data not fetch",
      data: error.message,
    });
  }
});

app.get('/random',(req,res)=>{
  let random = Math.random(1,10).toFixed(3)
  console.log(random);

  let obj = {};
  obj[random] = new Date().toLocaleString();
  obj.status = true;
  obj.message = "ok";
 
  console.log("resdata",obj);
  res.json(obj)
})

app.listen(process.env.PORT || port, () => {
  console.log(`Server running on port ${process.env.PORT || port}`);
});
