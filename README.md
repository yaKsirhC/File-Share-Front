# File Sharing Web App Frontend.

## Install dependencies.

```
npm i

#or

yarn install

#or

pnpm install
```

## Replace.

replace every \<your-public-ip\> instance with your public ip.

## Build The App for production.

```
npm run build

#or

yarn build

#or

pnpm run build
```

But it is adviced to take a look to the code to understand how it works and maybe improve it. I created this for you to learn something, not copy.

## Serve the dist folder 
- Copy the dist folder to the server directory
- Add express middleware to serve the folder statically.
```
app.use('/', express.static('File-Share-front'))
```
