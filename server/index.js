import {app} from './server.js'
import connect from './data/database.js';

connect();

app.listen(process.env.PORT, ()=>{
    console.log(`Backend Server is Running on ${process.env.PORT}`);
});