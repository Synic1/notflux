var express     = require('express');
var favicon     = require('serve-favicon');
var app         = express();
var port        = process.env.port || 8080;
var morgan      = require('morgan'); // middleware manager (log requests)
var mongoose    = require('mongoose');// mongo
var bodyParser  = require('body-parser');// application/x-www-form-urlencoded
var router      = express.Router();
var appRoutes   = require('./app/routes/api')(router);// param!
var path        = require('path');
var passport    = require('passport');// parafacebook login
var social      = require('./app/passport/passport')(app, passport);// facebook

app.use(morgan('dev')); // log every request into the server 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(__dirname + '/public'));//Front end
app.use('/api', appRoutes);// prefijar

app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));

mongoose.Promise = global.Promise;
// cholo's: 104.237.131.97           vm's: 192.168.0.17   192.168.0.101
mongoose.connect('mongodb://192.168.0.16:27017/tutorial', function(err) {
    if (err)
        console.log('Not Connected to the database: ' + err);
    else
        console.log('Succesfully connected to MongoDB');
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// COMENZAR
app.listen(port, function() {
    console.log('Running the sever on port: ' + port);
});


/*/ TODO: Lista de tareas por hacer... tengo hueva. LAs hago luego (Si, aja!)

    TODO: manejo de cuenta
    TODO: manejo de cuenta (desde admin)
    TODO: ver series vistas por usuarios
    ...
    TODO: fechas
    ...
    TODO: Borrar.. cosas, no se
    TODO: Desabilitar video, esta ahi, mas no se puede ver
    TODO: Agregar videos
    ...
    TODO: puntuar 
    TODO: mejor puntuadas
    ...
    TODO: recomendar (amigos?)
    TODO: comentarios
    ...

    TODO: REPORTES

    TODO: /// AUDIO PTM! ///
    TODO: ///--------------------------------------------------------------///

*/ 