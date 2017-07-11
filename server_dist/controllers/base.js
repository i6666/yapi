'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _yapi = require('../yapi.js');

var _yapi2 = _interopRequireDefault(_yapi);

var _project = require('../models/project.js');

var _project2 = _interopRequireDefault(_project);

var _user = require('../models/user.js');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwt = require('jsonwebtoken');

var baseController = function () {
    function baseController(ctx) {
        (0, _classCallCheck3.default)(this, baseController);
    }

    (0, _createClass3.default)(baseController, [{
        key: 'init',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.$user = null;

                                if (!(ctx.path === '/user/login' || ctx.path === '/user/reg' || ctx.path === '/user/status')) {
                                    _context.next = 5;
                                    break;
                                }

                                this.$auth = true;
                                _context.next = 7;
                                break;

                            case 5:
                                _context.next = 7;
                                return this.checkLogin(ctx);

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function init(_x) {
                return _ref.apply(this, arguments);
            }

            return init;
        }()
    }, {
        key: 'getUid',
        value: function getUid(ctx) {
            return this.$uid;
        }
    }, {
        key: 'checkLogin',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx) {
                var token, uid, userInst, result, decoded;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                token = ctx.cookies.get('_yapi_token');
                                uid = ctx.cookies.get('_yapi_uid');
                                _context2.prev = 2;

                                if (!(!token || !uid)) {
                                    _context2.next = 5;
                                    break;
                                }

                                return _context2.abrupt('return', false);

                            case 5:
                                userInst = _yapi2.default.getInst(_user2.default); //创建user实体

                                _context2.next = 8;
                                return userInst.findById(uid);

                            case 8:
                                result = _context2.sent;
                                decoded = jwt.verify(token, result.passsalt);

                                if (!(decoded.uid == uid)) {
                                    _context2.next = 16;
                                    break;
                                }

                                this.$uid = uid;
                                this.$auth = true;
                                console.log(11111);
                                this.$user = result;
                                return _context2.abrupt('return', true);

                            case 16:
                                return _context2.abrupt('return', false);

                            case 19:
                                _context2.prev = 19;
                                _context2.t0 = _context2['catch'](2);
                                return _context2.abrupt('return', false);

                            case 22:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[2, 19]]);
            }));

            function checkLogin(_x2) {
                return _ref2.apply(this, arguments);
            }

            return checkLogin;
        }()
    }, {
        key: 'getLoginStatus',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.checkLogin(ctx);

                            case 2:
                                _context3.t0 = _context3.sent;

                                if (!(_context3.t0 === true)) {
                                    _context3.next = 5;
                                    break;
                                }

                                return _context3.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(_yapi2.default.commons.fieldSelect(this.$user, ['_id', 'username', 'email', 'up_time', 'add_time'])));

                            case 5:
                                return _context3.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 400, 'Please login.'));

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getLoginStatus(_x3) {
                return _ref3.apply(this, arguments);
            }

            return getLoginStatus;
        }()
    }, {
        key: 'getRole',
        value: function getRole() {
            return 'admin';
        }
    }, {
        key: 'jungeProjectAuth',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(id) {
                var model, result;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                model = _yapi2.default.getInst(_project2.default);

                                if (!(this.getRole() === 'admin')) {
                                    _context4.next = 3;
                                    break;
                                }

                                return _context4.abrupt('return', true);

                            case 3:
                                if (id) {
                                    _context4.next = 5;
                                    break;
                                }

                                return _context4.abrupt('return', false);

                            case 5:
                                _context4.next = 7;
                                return model.get(id);

                            case 7:
                                result = _context4.sent;

                                if (!(result.uid === this.getUid())) {
                                    _context4.next = 10;
                                    break;
                                }

                                return _context4.abrupt('return', true);

                            case 10:
                                return _context4.abrupt('return', false);

                            case 11:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function jungeProjectAuth(_x4) {
                return _ref4.apply(this, arguments);
            }

            return jungeProjectAuth;
        }()
    }, {
        key: 'jungeMemberAuth',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(id, member_uid) {
                var model, result;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                model = _yapi2.default.getInst(_project2.default);

                                if (!(this.getRole() === 'admin')) {
                                    _context5.next = 3;
                                    break;
                                }

                                return _context5.abrupt('return', true);

                            case 3:
                                if (!(!id || !member_uid)) {
                                    _context5.next = 5;
                                    break;
                                }

                                return _context5.abrupt('return', false);

                            case 5:
                                _context5.next = 7;
                                return model.checkMemberRepeat(id, member_uid);

                            case 7:
                                result = _context5.sent;

                                if (!(result > 0)) {
                                    _context5.next = 10;
                                    break;
                                }

                                return _context5.abrupt('return', true);

                            case 10:
                                return _context5.abrupt('return', false);

                            case 11:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function jungeMemberAuth(_x5, _x6) {
                return _ref5.apply(this, arguments);
            }

            return jungeMemberAuth;
        }()
    }]);
    return baseController;
}();

module.exports = baseController;