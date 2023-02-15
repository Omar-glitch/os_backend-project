const router = require("express").Router()

router.get('/', (req, res) => {
  return res.json({data : {
    MAX_FILE_SIZE: process.env.MAX_FILE_SIZE,
    MAX_DISK_SIZE: process.env.MAX_DISK_SIZE,
    MAX_NUM_FILES_IN_FOLDER: process.env.MAX_NUM_FILES_IN_FOLDER,
    MAX_FILENAME_LENGTH: process.env.MAX_FILENAME_LENGTH,
    BLOCK_SIZE: process.env.BLOCK_SIZE,
    FRONTEND_URL: process.env.FRONTEND_URL,
    MAX_NUM_OF_FILES_AND_FOLDERS_IN_ROOT: process.env.MAX_NUM_OF_FILES_AND_FOLDERS_IN_ROOT,
    MAX_FOLDER_SIZE: process.env.MAX_FOLDER_SIZE,
  }})
})

module.exports = router;