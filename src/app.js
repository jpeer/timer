var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var scramble = require('./scramble');
console.log("Module scramble:", scramble);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/demo');


var Schema = mongoose.Schema;
var measurementsSchema = new Schema({
  userToken: mongoose.Schema.Types.String,
  measurements: [
    {
      startTime : mongoose.Schema.Types.Number,
      elapsedTime : mongoose.Schema.Types.Number,
      scramble : [ mongoose.Schema.Types.String ]
    }
  ]
});

var measurementsModel = mongoose.model('measurements', measurementsSchema);

app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));

app.get('/scramble', function (req, res) {
  console.log("Module scramble:", scramble);
  var scramble = this.scramble.createScramble();
  res.json(JSON.stringify(scramble));
}.bind({scramble: scramble}));

app.post('/addMeasurements', function(req, res) {
  console.log("ok got:", req.body);
  var userToken = req.body.userToken;
  this.measurementsModel.findOne({'userToken' : userToken}, function(err, entity) {
    if(!entity) {
      console.log("no such entity found, need to construct it first");
      entity = { userToken : userToken, measurements : req.body.measurements };
    } else {
      console.log("ok adding new measurements to existing...")
      entity.measurements.push.apply(entity.measurements, req.body.measurements);
    }

    var obj = new this.measurementsModel(entity);
    obj.save(function(err, obj) {
      if(err) {
        console.error(err);
        return;
      }
      res.json(obj);
    });
  }.bind({measurementsModel:this.measurementsModel}));
}.bind({measurementsModel:measurementsModel}));

app.get('/getMeasurements/:userToken', function(req, res) {
  console.log("getMeasurements called!!!");
  var userToken = req.params.userToken;
  console.log("ok got:", req.body);
  this.measurementsModel.findOne({'userToken' : userToken}, function(err, entity) {
    if(!entity) {
        entity = { userToken : userToken, measurements : [] };
    }
    res.json(entity);
  });
}.bind({measurementsModel:measurementsModel}));


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'index.html'))
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
if (app.get('env')== 'development')
{
  app.listen(3000, function () {
    console.log('Example listening on port 3000!');
  });
}
else{
  app.listen(8080, function () {
    console.log('Example listening on port 8080!');
  });
}
module.exports = app;
