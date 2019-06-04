import app from './app';
import * as https from 'https';
import * as http from 'http';

var PORT = process.env.PORT || 8080;


// ## configurações https
// const httpsOptions = {
//     key: fs.readFileSync('../config/key.pem'),
//     cert: fs.readFileSync('../config/cert.pem')
// }

// https.createServer(httpsOptions, app).listen(PORT, () => {

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})