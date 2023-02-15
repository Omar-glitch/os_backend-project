const router = require("express").Router()
const fs = require("fs");
const { canAddFolder } = require("../utils/utils");
const ROOT = process.env.ROOT;

router.get('/', (req, res) => {
  const path = req.query.path;

  const filePath = `${ROOT}\\${path}`;
  if (fs.existsSync(filePath)) {
    const files = fs.readdirSync(filePath);
    return res.json({data: files});
  }

  res.status(404).json({error : 'folder cannot be found'})
})

router.post('/', (req, res) => {
  const path = req.body.path;

  const folderValidate = canAddFolder(path);
  if (typeof folderValidate === 'object')
    return res.status(400).json(folderValidate)

  fs.mkdirSync(folderValidate)
  res.json({data: 'folder created'})
})

router.put('/', (req, res) => {
  const oldPath = req.body.oldPath;
  const newPath = req.body.newPath;

  if (!fs.existsSync(`${ROOT}\\${oldPath}`))
    return res.status(400).json({error: 'cannot find folder to rename'})

  const folderValidate = canAddFolder(newPath);
  if (typeof folderValidate === 'object')
    return res.status(400).json(folderValidate)

  fs.renameSync(`${ROOT}/${oldPath}`, folderValidate);
  res.json({data : 'folder renamed'})
})

router.put('/copy', (req, res) => {
  const oldPath = req.body.oldPath;
  const newPath = req.body.newPath;

  if (!fs.existsSync(`${ROOT}\\${oldPath}`))
    return res.status(400).json({error: 'cannot find folder to copy'})

  const nameVerified = canAddFolder(newPath)
  if (typeof nameVerified === 'object')
    return res.status(400).json(nameVerified)

  fs.cpSync(`${ROOT}\\${oldPath}`, nameVerified, {force: true, recursive: true})
  res.json({data : 'folder copied'})
})

router.delete('/', (req, res) => {
  const path = req.query.path;

  if (!fs.existsSync(`${ROOT}\\${path}`))
    return res.status(404).json({error : 'folder does not exists'})
  fs.rmSync(`${ROOT}\\${path}`, {force: true, recursive: true})
  res.json({data : 'folder deleted'})
})

module.exports = router;
