import socketio from 'socket.io';
import * as moment from 'moment';
import * as understring from 'underscore.string';
import express from 'express';
let app = express();
import h from 'http';
let http = h.Server(app);
let si = socketio(http);

export default class {
    construct() {

    }

    initMoment() {
        si.on('date', item => {
           si.emit('Current date', moment().format('llll')); 
       });

       si.on('zone', item => {
          si.emit('Current zone', moment.parseZone(item));
       });

       si.on('isvaliddate', item => {
           console.log(moment.isValid(item));
          //si.emit('Valid', moment.isValid(item));
       });

    }


    start() {
        si.on('connection',  socket => {
           console.log('connect');
       });
        app.get('/', (req, res) => {
            si.emit("isvaliddate", "dsdds");
            res.send("Emit")
        });

        http.listen(3000, function(){
          console.log('Listen on *:3000');   
        });

    }
}


si.on('capitalize', item => {
    si.emit('capital', understring.capitalize(item));
});



