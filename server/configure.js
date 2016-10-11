var path = require('path'),
    express = require('express'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    exhbs = require('express-handlebars'),
    errorHandler = require('errorhandler'),
    moment = require('moment');
    routers = require('./routers');
module.exports = function(app){
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json({uploadDir:path.join(__dirname,'public/upload/tmp')}));
    app.use(methodOverride());
    app.use(cookieParser('some-secret-value-here'));
    routers(app);
    app.use('/public/',express.static(path.join(__dirname,'../public')));
    if('development' === app.get('dev')){
        app.use(errorHandler());
    }
    
    app.engine('handlebars',exhbs.create({
        defaultLayout:'main',
        layoutsDir:app.get('views')+'/layouts',
        partialsDir:[app.get('views')+'/partials'],
        helpers:{
            timeago:function(timestamp){
                return moment(timestamp).startOf('minute').fromNow();
            }
        }
    }).engine);

    app.set('view engine','handlebars');
    return app;
};