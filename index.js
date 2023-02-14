const express = require("express");
require('dotenv').config();
const fileRoute = require("./routes/File")
const folderRoute = require("./routes/Folder")
const cors = require('cors')
const fs = require('fs');

if (!fs.existsSync(process.env.ROOT)) 
  throw 'No existe el directorio raiz'

const app = express();

// app.use(express.static(__dirname))
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/file", fileRoute);
app.use("/folder", folderRoute);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}\\view\\index.html`)
})

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening in PORT: ${PORT}`))