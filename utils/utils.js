const path = require('path')
const fs = require('fs');
const getFolderSize = require('fast-folder-size/sync')

const MAX_NUM_FILES_IN_FOLDER = Number(process.env.MAX_NUM_FILES_IN_FOLDER);
const MAX_FILENAME_LENGTH = Number(process.env.MAX_FILENAME_LENGTH);
const MAX_NUM_OF_FILES_AND_FOLDERS_IN_ROOT = Number(process.env.MAX_NUM_OF_FILES_AND_FOLDERS_IN_ROOT);
const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE);
const MAX_FOLDER_SIZE = Number(process.env.MAX_FOLDER_SIZE);
const ROOT = process.env.ROOT;

const folderSize = (folderPath) => getFolderSize(folderPath)

const stringSize = (string) => Buffer.byteLength(string, 'utf8');

const filesInFolder = (folderPath) => fs.readdirSync(folderPath).length;

const getValidNameFromPath = (filePath) => {
  if (path === undefined) return {error: 'path is not defined'};

  const filename = path.parse(filePath);
  if (filename.dir.includes('..'))
    return {error : 'cannot create txt with .. in dir'}
  if (filename.name.trim().length === 0)
    return {error : 'filaname cannot be empty'}
  if (filename.ext !== '.txt')
    return {error : 'file can only be txt'}
  return `${ROOT}/${filename.dir}/${filename.name.trim().slice(0, MAX_FILENAME_LENGTH)}${filename.ext}`
}

const canAddFile = (filePath, content = '') => {
  const pathParse = path.parse(filePath);
  const dirPath = `${ROOT}/${pathParse.dir}`;

  if (!fs.existsSync(dirPath))
    return {error : 'directory does not exists'}
  const files = filesInFolder(dirPath);

  if (files > MAX_NUM_OF_FILES_AND_FOLDERS_IN_ROOT) 
    if (pathParse.dir === '')
      return {error : 'cannot add file, max num of files in root reached'}
  if (files > MAX_NUM_FILES_IN_FOLDER) 
    return {error : 'cannot add file, max num of files reached'}

  const validateSize = stringSize(content);
  if (validateSize > MAX_FILE_SIZE) 
    return {error : 'file is too large'}

  const fsize = folderSize(dirPath);
  if (fsize === undefined) 
    return {error : 'cannot get size of folder'}
  if (fsize + validateSize > MAX_FOLDER_SIZE)
    return {error : 'folder size is exceeded when created this file'}

  return getValidNameFromPath(filePath);
}

const canAddFolder = (folderPath) => {
  const pathParse = path.parse(folderPath);
  if (pathParse.name.trim().length === 0) return {error : 'directory name is empty'}
  
  const dirPath = `${ROOT}/${pathParse.dir}`;
  if (!fs.existsSync(dirPath))
    return {error : 'directory does not exists'}

  const files = filesInFolder(dirPath);

  if (files > MAX_NUM_OF_FILES_AND_FOLDERS_IN_ROOT) 
    if (pathParse.dir === '')
      return {error : 'cannot add folder, max num of files in root reached'}
  if (files > MAX_NUM_FILES_IN_FOLDER) 
    return {error : 'cannot add folder, max num of files reached'}
  return `${ROOT}/${pathParse.dir}/${pathParse.name.trim()}`;
}   

module.exports = { canAddFile, canAddFolder }
