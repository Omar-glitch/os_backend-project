## Project OS backend

Project created to handle the fyle system. Created with NodeJS.

## Installation

Requires [Node.js](https://nodejs.org/) v16+ to run and [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable).

Install the dependencies and devDependencies and start the server.

```sh
cd os_backend_project
yarn
yarn dev
```

## ENV configuration
Create an .env file in the root directory and add this variables.

```sh
PORT=5000
ROOT=C:\\Path\\to\\my\\root\\directory
MAX_FILE_SIZE=4294967296
MAX_DISK_SIZE=4294967296
MAX_NUM_FILES_IN_FOLDER=65536
MAX_FILENAME_LENGTH=8
BLOCK_SIZE=256
FRONTEND_URL=http://localhost:3000
MAX_NUM_OF_FILES_AND_FOLDERS_IN_ROOT = 512
MAX_FOLDER_SIZE= 2097152
```

## License

MIT

**Free Software**
