const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const pngToIco = require('png-to-ico');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get("/", function (request, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post("/", upload.single("icon") ,function (req, res) {
  console.log(req.file.originalname);
  pngToIco(req.file.buffer).then(buf => {
    res.status(200);
    res.setHeader("Content-Disposition", "attachment; filename=favicon.ico");
    res.send(buf);
   } )
  .catch(error => res.status(500).json({error:error}));
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
