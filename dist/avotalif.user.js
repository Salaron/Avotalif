// ==UserScript==
// @run-at       document-start
// @name         avotalif
// @description  Yet another script for VK.
// @author       Salaron
// @version      1.0.0
// @updateURL    https://raw.githubusercontent.com/Salaron/Avotalif/main/dist/avotalif.meta.js
// @downloadURL  https://raw.githubusercontent.com/Salaron/Avotalif/main/dist/avotalif.user.js
// @match        *://*.vk.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @noframes
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 771:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var _1 = __webpack_require__(607);
var Fia = /** @class */ (function () {
    function Fia() {
    }
    Fia.getVariable = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // what will be if variable doesn't exist?
                return [2 /*return*/, new Promise(function (res) {
                        // @ts-expect-error
                        if (typeof unsafeWindow[name] !== "undefined") {
                            _1.logger.Debug("Got variable: " + name);
                            // @ts-expect-error
                            return res(unsafeWindow[name]);
                        }
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = res;
                                    return [4 /*yield*/, Fia.getVariable(name)];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]);
                                    return [2 /*return*/];
                            }
                        }); }); }, 10);
                    })];
            });
        });
    };
    Fia.getElementById = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res) {
                        var result = document.getElementById(name);
                        if (result != null)
                            return res(result);
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = res;
                                    return [4 /*yield*/, Fia.getElementById(name)];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]);
                                    return [2 /*return*/];
                            }
                        }); }); }, 10);
                    })];
            });
        });
    };
    Fia.getElementsByClass = function (className) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res) {
                        var result = document.getElementsByClassName(className);
                        if (result.length > 0)
                            return res(result);
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = res;
                                    return [4 /*yield*/, Fia.getElementsByClass(className)];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]);
                                    return [2 /*return*/];
                            }
                        }); }); }, 10);
                    })];
            });
        });
    };
    Fia.querySelector = function (selectors) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res) {
                        var result = document.querySelector(selectors);
                        if (result)
                            return res(result);
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = res;
                                    return [4 /*yield*/, Fia.querySelector(selectors)];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]);
                                    return [2 /*return*/];
                            }
                        }); }); }, 10);
                    })];
            });
        });
    };
    return Fia;
}());
exports.default = Fia;


/***/ }),

/***/ 607:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logger = void 0;
var logger_1 = __webpack_require__(473);
var fia_1 = __importDefault(__webpack_require__(771));
var utils_1 = __importDefault(__webpack_require__(593));
exports.logger = new logger_1.Logger("Avotalif", 3 /* INFO */);
/*
Planned features:
0. Replace a_send calls with messages.send
0.1. Don't parse links option
0.2. Don't send notification option
1. Enchanced DNR // done 20.04
2. Ability to HIDE call buttons
3. Return old buttons order in profiles
4. Dark mode?
5. Audio sync in tabs
6. Show time with seconds
7. DNR & DNT managers
8. Dialog stats
9. Ability to hide some dialogs from dialog list?
10. Settings
11. Hide small buttons under left menu // done 20.04
12. Image background in dialog
13. Custom context menu for dialogs and messages
14. Dialog like in mobile apps
15. Additional information in profile
*/
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fia_1.default.getVariable("Notifier")];
            case 1:
                _a.sent();
                return [4 /*yield*/, fia_1.default.getVariable("ajax")];
            case 2:
                _a.sent();
                utils_1.default.Hook(ajax, "post", function (next) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    exports.logger.Verbose(args[0] + " : " + JSON.stringify(args[1], null, 2), "Ajax POST");
                    next.apply(void 0, args);
                });
                utils_1.default.onLPEvent("", function (response) {
                    exports.logger.Verbose(JSON.stringify(response, null, 2), "Long Pool");
                });
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(__webpack_require__(815)); })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();


/***/ }),

/***/ 473:
/***/ ((__unused_webpack_module, exports) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Logger = void 0;
// colors[LEVEL].
var colors = (_a = {},
    _a[0 /* NONE */] = {
        bgColor: "",
        fgColor: ""
    },
    _a[1 /* ERROR */] = {
        bgColor: "#ff00ff",
        fgColor: "#000000"
    },
    _a[2 /* WARN */] = {
        bgColor: "#FFFF00",
        fgColor: "#000000"
    },
    _a[3 /* INFO */] = {
        bgColor: "#FFFFFF",
        fgColor: "#000000"
    },
    _a[4 /* DEBUG */] = {
        bgColor: "#00ffff",
        fgColor: "#000000"
    },
    _a[5 /* VERBOSE */] = {
        bgColor: "",
        fgColor: ""
    },
    _a);
// TODO: use console.warn console.error etc.
var Logger = /** @class */ (function () {
    function Logger(label, level) {
        this.label = label;
        this.logLevel = typeof level === "number" ? level : 3 /* INFO */;
    }
    Logger.prototype.Error = function (message, label) {
        this.print(label || this.label, message, 1 /* ERROR */);
    };
    Logger.prototype.Warn = function (message, label) {
        this.print(label || this.label, message, 2 /* WARN */);
    };
    Logger.prototype.Info = function (message, label) {
        this.print(label || this.label, message, 3 /* INFO */);
    };
    Logger.prototype.Debug = function (message, label) {
        this.print(label || this.label, message, 4 /* DEBUG */);
    };
    Logger.prototype.Verbose = function (message, label) {
        this.print(label || this.label, message, 5 /* VERBOSE */);
    };
    Logger.prototype.print = function (label, message, level) {
        if (level <= this.logLevel) {
            // tslint:disable-next-line:no-console
            console.log("%c" + label, "background: " + colors[level].bgColor + "; color: " + colors[level].fgColor + "; padding: 3px;", message);
        }
    };
    return Logger;
}());
exports.Logger = Logger;


/***/ }),

/***/ 359:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getToken = exports.checkToken = exports.sendRequest = void 0;
function sendRequest(method, data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.sendRequest = sendRequest;
function checkToken(token) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.checkToken = checkToken;
function getToken(appID) {
    return __awaiter(this, void 0, void 0, function () {
        var ID;
        return __generator(this, function (_a) {
            ID = unsafeWindow.vk.id;
            return [2 /*return*/, ""];
        });
    });
}
exports.getToken = getToken;


/***/ }),

/***/ 602:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isDNTEnabled = exports.isDNREnabled = void 0;
var __1 = __webpack_require__(607);
var fia_1 = __importDefault(__webpack_require__(771));
var utils_1 = __importDefault(__webpack_require__(593));
// TODO: store settings in localStorage
var DNR = true;
var DNT = false;
var specialStates = {};
function isDNREnabled(peerID) {
    if (specialStates[peerID] && typeof specialStates[peerID].DNR === "boolean")
        return specialStates[peerID].DNR;
    return DNR;
}
exports.isDNREnabled = isDNREnabled;
function isDNTEnabled(peerID) {
    if (specialStates[peerID] && typeof specialStates[peerID].DNT === "boolean")
        return specialStates[peerID].DNT;
    return DNT;
}
exports.isDNTEnabled = isDNTEnabled;
unsafeWindow.changeDNRForChat = function (peerID) {
    if (!specialStates[peerID])
        specialStates[peerID] = {};
    if (typeof specialStates[peerID].DNR !== "boolean")
        specialStates[peerID].DNR = !DNR;
    else
        specialStates[peerID].DNR = !specialStates[peerID].DNR;
    var contextLabel = document.getElementById("context-dnr");
    if (specialStates[peerID].DNR === true) {
        // нечиталка была включена
        utils_1.default.showNotification("Нечиталка включена для данного чата");
        // update context menu action
        if (contextLabel)
            contextLabel.innerText = "Выключить нечиталку";
    }
    else {
        // нечиталка была выключена
        utils_1.default.showNotification("Нечиталка выключена для данного чата");
        curNotifier.idle_manager.is_idle = false;
        if (contextLabel)
            contextLabel.innerText = "Включить нечиталку";
    }
};
unsafeWindow.changeDNTForChat = function (peerID) {
    if (!specialStates[peerID])
        specialStates[peerID] = {};
    if (typeof specialStates[peerID].DNT !== "boolean")
        specialStates[peerID].DNT = !DNT;
    else
        specialStates[peerID].DNT = !specialStates[peerID].DNT;
    var contextLabel = document.getElementById("context-dnt");
    if (specialStates[peerID].DNT === true) {
        utils_1.default.showNotification("Неписалка включена для данного чата");
        if (contextLabel)
            contextLabel.innerText = "Выключить неписалку";
    }
    else {
        utils_1.default.showNotification("Неписалка выключена для данного чата");
        if (contextLabel)
            contextLabel.innerText = "Включить неписалку";
    }
};
unsafeWindow.changeDNRState = function (state) {
    DNR = state;
    utils_1.default.showNotification("\u041D\u0435\u0447\u0438\u0442\u0430\u043B\u043A\u0430 " + (state === true ? "включена" : "выключена"));
};
unsafeWindow.changeDNTState = function (state) {
    DNT = state;
    utils_1.default.showNotification("\u041D\u0435\u043F\u0438\u0441\u0430\u043B\u043A\u0430 " + (state === true ? "включена" : "выключена"));
};
/*
// css for background image in dialog
im-page--chat-body:before {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  background-image: url(https://i.pinimg.com/originals/f7/ae/e8/f7aee8753832af613b63e51d5f07011a.jpg);
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: cover;
}
*/
(function () { return __awaiter(void 0, void 0, void 0, function () {
    function createLi(id, actionName, clickAction) {
        return "<li id=\"context-" + id + "\" onclick=" + (clickAction === null ? "" : clickAction) + ">" + actionName + "</li>";
    }
    var selectedByContext;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // prepare all needed global variables
            return [4 /*yield*/, Promise.all([
                    fia_1.default.getVariable("ajax"),
                    fia_1.default.getVariable("Notifier"),
                    fia_1.default.getVariable("curNotifier")
                ])];
            case 1:
                // prepare all needed global variables
                _a.sent();
                utils_1.default.Hook(ajax, "post", function (next) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    var url = args[0];
                    var body = args[1];
                    if (url === "al_im.php" && body.act === "a_mark_read" && isDNREnabled(body.peer)) {
                        __1.logger.Debug("Don't read messages");
                        // is it safe to kill idle_manager?
                        curNotifier.idle_manager.is_idle = true;
                        args[2].onFail();
                        return;
                    }
                    if (url === "al_im.php" && body.act === "a_activity" && isDNTEnabled(body.peer)) {
                        __1.logger.Debug("Don't send type status");
                        return;
                    }
                    return next.apply(void 0, args);
                });
                utils_1.default.Hook(Notifier.getLpInstance(), "push", function (next) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    args[0] = args[0].filter(function (val) {
                        return val.type !== "event_read_inbound" || (val.type === "event_read_inbound" && !isDNREnabled(val.peer));
                    });
                    /*args[0] = args[0].map((val: any) => {
                        if (val.type === "event_read_inbound") {
                          val.unread = 1111
                        }
                        return val
                      }) */
                    if (args[0].length > 0)
                        next.apply(void 0, args);
                });
                // style for context menu
                GM_addStyle("\n    .custom-menu {\n      display: none;\n      z-index: 1000;\n      position: absolute;\n      overflow: hidden;\n      border: 1px solid #CCC;\n      white-space: nowrap;\n      font-family: sans-serif;\n      background: #FFF;\n      color: #333;\n      border-radius: 5px;\n      padding: 0;\n    }\n\n    /* Each of the items in the list */\n    .custom-menu li {\n      padding: 8px 12px;\n      cursor: pointer;\n      list-style-type: none;\n      transition: all .3s ease;\n      user-select: none;\n    }\n\n    .custom-menu li:hover {\n      background-color: #DEF;\n    }\n  ");
                window.addEventListener("load", function () {
                    document.body.insertAdjacentHTML("afterbegin", "<div><ul id=\"custom-context-menu\" class=\"custom-menu\"></ul></div>");
                });
                // context menu for dialogs
                $(document).on("contextmenu", ".nim-dialog", function (event) {
                    __1.logger.Debug("Show context menu for dialog");
                    var menu = "";
                    var peerID = parseInt(event.currentTarget.getAttribute("data-peer"), 10);
                    var isGroup = peerID < 0;
                    var isConversation = peerID > 2000000000;
                    var isDM = !isGroup && !isConversation;
                    var isUnreaded = event.currentTarget.classList.contains("nim-dialog_unread");
                    var isMuted = event.currentTarget.classList.contains("nim-dialog_muted");
                    var isPinned = event.currentTarget.classList.contains("nim-dialog_pinned");
                    if (isUnreaded)
                        menu += createLi("mark-as-read", "Отметить прочитанным", null);
                    if (isGroup)
                        menu += createLi("open-group", "Перейти в группу", "window.open(\"https://vk.com/club" + Math.abs(peerID) + "\")");
                    if (isDM)
                        menu += createLi("open-profile", "Открыть профиль", "window.open(\"https://vk.com/id" + Math.abs(peerID) + "\")");
                    if (isMuted)
                        menu += createLi("notifications", "Включить уведомления", null);
                    else
                        menu += createLi("notifications", "Выключить уведомления", null);
                    if (isPinned)
                        menu += createLi("pin", "Открепить", null);
                    else
                        menu += createLi("pin", "Закрепить", null);
                    if (isDNREnabled(peerID))
                        menu += createLi("dnr", "Выключить нечиталку", "changeDNRForChat(" + peerID + ")");
                    else
                        menu += createLi("dnr", "Включить нечиталку", "changeDNRForChat(" + peerID + ")");
                    if (isDNTEnabled(peerID))
                        menu += createLi("dnt", "Выключить неписалку", "changeDNTForChat(" + peerID + ")");
                    else
                        menu += createLi("dnt", "Включить неписалку", "changeDNTForChat(" + peerID + ")");
                    $("#custom-context-menu").append(menu);
                    $("#custom-context-menu").finish().toggle(100).css({
                        top: event.pageY + "px",
                        left: event.pageX + "px"
                    });
                    event.preventDefault();
                });
                selectedByContext = null;
                $(document).on("contextmenu", ".im-mess", function (event) {
                    __1.logger.Debug("Show message context menu");
                    if (selectedByContext) {
                        selectedByContext.classList.remove("im-mess_selected");
                    }
                    selectedByContext = event.currentTarget;
                    selectedByContext === null || selectedByContext === void 0 ? void 0 : selectedByContext.classList.add("im-mess_selected");
                    var menu = "";
                    if (true) // (unreaded)
                        menu += createLi("read", "Прочитать до текущего", "");
                    menu += createLi("reply", "Ответить", "");
                    menu += createLi("forward", "Переслать", "");
                    menu += createLi("delete", "Удалить", "");
                    menu += createLi("spam", "Это спам", "");
                    $("#custom-context-menu").append(menu);
                    $("#custom-context-menu").finish().toggle(100).css({
                        top: event.pageY + "px",
                        left: event.pageX + "px"
                    });
                    event.preventDefault();
                });
                $(document).on("mousedown keyup", function (event) {
                    // If the clicked element is not the menu
                    if ($(event.target).parents(".custom-menu").length === 0) {
                        // Hide it
                        $("#custom-context-menu").hide(100);
                        // and remove elements
                        $("#custom-context-menu").empty();
                        if (selectedByContext) {
                            selectedByContext.classList.remove("im-mess_selected");
                            selectedByContext = null;
                        }
                    }
                });
                __1.logger.Info("Loaded module 'im'");
                return [2 /*return*/];
        }
    });
}); })();


/***/ }),

/***/ 815:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(359), exports);
__exportStar(__webpack_require__(602), exports);
__exportStar(__webpack_require__(188), exports);
__exportStar(__webpack_require__(314), exports);


/***/ }),

/***/ 314:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.miniChat = exports.bar = void 0;
var __1 = __webpack_require__(607);
var fia_1 = __importDefault(__webpack_require__(771));
var vkAway = true;
var hideLinksInMenu = true;
var hideMiniChat = true;
function bar(visible) {
    return __awaiter(this, void 0, void 0, function () {
        var element, visibility;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fia_1.default.getElementsByClass("left_menu_nav_wrap")];
                case 1:
                    element = _a.sent();
                    visibility = "hidden";
                    if (visible) {
                        visibility = "";
                    }
                    element[0].style.visibility = visibility;
                    return [2 /*return*/];
            }
        });
    });
}
exports.bar = bar;
function miniChat(visible) {
    return __awaiter(this, void 0, void 0, function () {
        var element, visibility;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fia_1.default.getElementById("chat_onl_wrap")];
                case 1:
                    element = _a.sent();
                    visibility = "hidden";
                    if (visible) {
                        visibility = "";
                    }
                    element.style.visibility = visibility;
                    return [2 /*return*/];
            }
        });
    });
}
exports.miniChat = miniChat;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bar(!hideLinksInMenu)];
            case 1:
                _a.sent();
                return [4 /*yield*/, miniChat(!hideMiniChat)];
            case 2:
                _a.sent();
                __1.logger.Info("Loaded module 'misc'");
                return [2 /*return*/];
        }
    });
}); })();


/***/ }),

/***/ 188:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var __1 = __webpack_require__(607);
var utils_1 = __importDefault(__webpack_require__(593));
var typingNotif = false;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        utils_1.default.onLPEvent("event_typing", function (response) {
            if (typingNotif) {
                var isConversantion = response.peerId >= 2000000000;
                var isGroup = response.peerId < 0;
                if (isConversantion) {
                    // get conversantion name
                    //
                }
                Notifier.showEvent({
                    title: "Avotalif",
                    text: response.peerId + " \u043F\u0435\u0447\u0430\u0442\u0430\u0435\u0442..."
                });
            }
        });
        __1.logger.Info("Loaded module 'notifications'");
        return [2 /*return*/];
    });
}); })();


/***/ }),

/***/ 593:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var fia_1 = __importDefault(__webpack_require__(771));
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.postRequest = function (url, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        GM_xmlhttpRequest({
                            method: "POST",
                            url: url,
                            data: data,
                            onload: resolve,
                            onerror: reject
                        });
                    })];
            });
        });
    };
    Utils.onLPEvent = function (eventType, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var Notifier;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fia_1.default.getVariable("Notifier")];
                    case 1:
                        Notifier = _a.sent();
                        Notifier.getLpInstance().onData(function (answer) {
                            if (answer.type === eventType || eventType === "")
                                callback(answer);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Utils.Hook = function (proto, name, replacement) {
        if (!proto[name + "_hook"]) {
            proto[name + "_hook"] = {
                original: proto[name],
                hooks: []
            };
            proto[name] = function () {
                var _this = this;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                /*         if (!this.on_finish_hook_callbacks) this.on_finish_hook_callbacks = []
                        this.callOnDone = function(callback: Function) {
                          this.on_finish_hook_callbacks.push(callback)
                        } */
                var ho = __spreadArray([], proto[name + "_hook"].hooks); // create a copy of hooks
                var next = function () {
                    var _a;
                    var _args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _args[_i] = arguments[_i];
                    }
                    var res = ho.shift();
                    if (!res) {
                        return (_a = proto[name + "_hook"].original).call.apply(_a, __spreadArray([_this], _args));
                    }
                    else {
                        return res.call.apply(res, __spreadArray([_this, next], _args));
                    }
                };
                var result = next.apply(void 0, args);
                /*         if (this.on_finish_hook_callbacks.length > 0) {
                          for (const cb of this.on_finish_hook_callbacks) {
                            cb()
                          }
                        }
                        this.on_finish_hook_callbacks = undefined
                        this.callOnDone = undefined */
                return result;
            };
        }
        proto[name + "_hook"].hooks.push(replacement);
        // TODO: return function for hook remove
    };
    // not safe for functions
    Utils.clone = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };
    Utils.showNotification = function (text) {
        Notifier.showEvent({
            title: "Avotalif",
            text: text
        });
    };
    return Utils;
}());
exports.default = Utils;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(607);
/******/ 	
/******/ })()
;