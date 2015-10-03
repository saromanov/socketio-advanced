'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _socketIo = require('socket.io');

var _socketIo2 = _interopRequireDefault(_socketIo);

var _moment = require('moment');

var moment = _interopRequireWildcard(_moment);

var _underscoreString = require('underscore.string');

var understring = _interopRequireWildcard(_underscoreString);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var app = (0, _express2['default'])();

var http = _http2['default'].Server(app);
var si = (0, _socketIo2['default'])(http);

var _default = (function () {
    function _default() {
        _classCallCheck(this, _default);
    }

    _createClass(_default, [{
        key: 'construct',
        value: function construct() {}
    }, {
        key: 'initMoment',
        value: function initMoment() {
            si.on('date', function (item) {
                si.emit('Current date', moment().format('llll'));
            });

            si.on('zone', function (item) {
                si.emit('Current zone', moment.parseZone(item));
            });

            si.on('isvaliddate', function (item) {
                console.log(moment.isValid(item));
                //si.emit('Valid', moment.isValid(item));
            });
        }
    }, {
        key: 'start',
        value: function start() {
            si.on('connection', function (socket) {
                console.log('connect');
            });
            app.get('/', function (req, res) {
                si.emit("isvaliddate", "dsdds");
                res.send("Emit");
            });

            http.listen(3000, function () {
                console.log('Listen on *:3000');
            });
        }
    }]);

    return _default;
})();

exports['default'] = _default;

si.on('capitalize', function (item) {
    si.emit('capital', understring.capitalize(item));
});
module.exports = exports['default'];