# authify

### .env file
```
NODE_ENV=
MONGODB_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
```


### Install dependencies
```
npm i
```


### Start Server in development
```
npm run dev
```


### Build typescript project
```
npm run build
```


### Start Server from build
```
npm start
```


### Clean build files
```
npm run clean
```


### Check lint issues
```
npm run lint
```


### Fix autofixable lint issues
```
npm run lint:fix
```


### Run test
```
npm run test
```


### Build docker image
```
docker build -t authify:0.0.1 .
```


### Run docker image
```
docker run -d docker.io/library/authify:0.0.1
```


### Run docker image using docker-compose
```
docker-compose up -d
```
*or*
```
docker-compose up -d --force --remove-orphans
```