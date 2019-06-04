import app from './app';
import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';

var PORT = process.env.PORT || 8080;


// ## configurações https
// const httpsOptions = {
//     key: fs.readFileSync('../config/key.pem'),
//     cert: fs.readFileSync('../config/cert.pem')
// }

// https.createServer(httpsOptions, app).listen(PORT, () => {


http.createServer(app).listen(PORT, () => {

    console.log('Express server listening on port ' + PORT);
})