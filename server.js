const express = require('express')
const path = require('path')
const multer  = require('multer')
const {mergerPDF}  = require('./testpdf.js')

const app = express()
const port = 3000

const upload = multer({ dest: 'public/' })
app.use('/static', express.static('public'))



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"))
})
app.post('/merge', upload.array('pdfs', 10), async (req, res, next) => {
    
  console.log(req.files)

    const filePaths = req.files.map(file => path.join(__dirname, file.path));
    const mergedFileName = await mergerPDF(filePaths);
    res.redirect(`http://localhost:3000/static/${mergedFileName}.pdf`);
  //  let d = await mergerPDF(path.join(__dirname, req.files[0].path) ,path.join(__dirname, req.files[1].path) )
    // res.redirect(`http://localhost:3000/static/${d}.pdf`)
    // res.send({data: req.files})
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})