
const router = require("express").Router()
const fs = require("fs");
const { canAddFile } = require("../utils/utils");
const ROOT = process.env.ROOT;

router.get('/', (req, res) => {
  const path = req.query.path;

  const filePath = `${ROOT}/${path}`;
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, {encoding: 'utf-8', flag: 'r'});
    return res.json({data : content})
  }
  res.status(400).json({ error: 'file does not exist' })
})

router.post('/', (req, res) => {
  const path = req.body.path;
  const content = req.body.content || '';

  const nameVerified = canAddFile(path, content)
  if (typeof nameVerified === 'object')
    return res.status(400).json(nameVerified)

  fs.writeFileSync(nameVerified, content, {flag: 'w', encoding: 'utf-8'})
  res.json({data: 'txt file created'})
})

router.put('/', (req, res) => {
  const oldPath = req.body.oldPath;
  const newPath = req.body.newPath;

  if (!fs.existsSync(`${ROOT}\\${oldPath}`))
    return res.status(400).json({error: 'cannot find file to rename'})

  const nameVerified = canAddFile(newPath)
  if (typeof nameVerified === 'object')
    return res.status(400).json(nameVerified)

  fs.renameSync(`${ROOT}\\${oldPath}`, nameVerified)
  res.json({data : 'file renamed'})
})

router.put('/copy', (req, res) => {
  const oldPath = req.body.oldPath;
  const newPath = req.body.newPath;

  if (!fs.existsSync(`${ROOT}\\${oldPath}`))
    return res.status(400).json({error: 'cannot find file to copy'})

  const nameVerified = canAddFile(newPath)
  if (typeof nameVerified === 'object')
    return res.status(400).json(nameVerified)

  fs.copyFileSync(`${ROOT}\\${oldPath}`, nameVerified)
  res.json({data : 'file copied'})
})

router.delete('/', (req, res) => {
  const path = req.body.path;

  if (!fs.existsSync(`${ROOT}\\${path}`))
    return res.status(400).json({error: 'cannot find file to delete'})

  fs.unlinkSync(`${ROOT}\\${path}`)
  res.json({data : 'file deleted'})
})

module.exports = router;
