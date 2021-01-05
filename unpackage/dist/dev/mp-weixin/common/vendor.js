(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });var


EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {var _this = this;_classCallCheck(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this.on(name, events[name]);
      });
    }
  }_createClass(EventChannel, [{ key: "emit", value: function emit(

    eventName) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {return opt.type !== 'once';});
    } }, { key: "on", value: function on(

    eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    } }, { key: "once", value: function once(

    eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    } }, { key: "off", value: function off(

    eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    } }, { key: "_clearCache", value: function _clearCache(

    eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    } }, { key: "_addListener", value: function _addListener(

    eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type });

    } }]);return EventChannel;}();


var eventChannels = {};

var eventChannelStack = [];

var id = 0;

function initEventChannel(events) {var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  } };


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  navigateTo: navigateTo,
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {args[_key4 - 1] = arguments[_key4];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!****************************************************************************************!*\
  !*** C:/Users/戴尔/Desktop/testdome/weather/components/zhouWei-request/requestConfig.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 12));var _request = _interopRequireDefault(__webpack_require__(/*! ./request */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}
// 全局配置的请求域名
var baseUrl = "https://devapi.qweather.com/";
//可以new多个request来支持多个域名请求
var $http = new _request.default({
  //接口请求地址
  baseUrl: "https://devapi.qweather.com/",
  //服务器本地上传文件地址
  fileUrl: baseUrl,
  // 服务器上传图片默认url
  defaultUploadUrl: "api/common/v1/upload_image",
  //设置请求头（如果使用报错跨域问题，可能是content-type请求类型和后台那边设置的不一致）
  // header: {
  // 	'content-type': 'application/json;charset=UTF-8'
  // },
  // 请求超时时间（默认6000）
  timeout: 6000,
  // 默认配置（可不写）
  config: {
    // 是否自动提示错误
    isPrompt: false,
    // 是否显示加载动画
    load: false,
    // 是否使用数据工厂
    isFactory: false } });



// 添加获取七牛云token的方法
$http.getQnToken = function (callback) {
  //该地址需要开发者自行配置（每个后台的接口风格都不一样）
  $http.get("api/kemean/aid/qn_upload").then(function (data) {
    /*
                                                               *接口返回参数：
                                                               *visitPrefix:访问文件的域名
                                                               *token:七牛云上传token
                                                               *folderPath:上传的文件夹
                                                               *region: 地区 默认为：SCN
                                                               */
    callback({
      visitPrefix: data.visitPrefix,
      token: data.token,
      folderPath: data.folderPath,
      region: "SCN" });

  });
};

//当前接口请求数
var requestNum = 0;
//请求开始拦截器
$http.requestStart = function (options) {
  if (options.load) {
    if (requestNum <= 0) {
      //打开加载动画
      uni.showLoading({
        title: '加载中',
        mask: true });

    }
    requestNum += 1;
  }
  // 图片上传大小限制
  if (options.method == "FILE" && options.maxSize) {
    // 文件最大字节: options.maxSize 可以在调用方法的时候加入参数
    var maxSize = options.maxSize;var _iterator = _createForOfIteratorHelper(
    options.files),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var item = _step.value;
        if (item.size > maxSize) {
          setTimeout(function () {
            uni.showToast({
              title: "图片过大，请重新上传",
              icon: "none" });

          }, 500);
          return false;
        }
      }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
  }
  //请求前加入token
  // options.header['token'] = "你的项目登录token";
  return options; // return false 表示请求拦截，不会继续请求
};
//请求结束
$http.requestEnd = function (options) {
  //判断当前接口是否需要加载动画
  if (options.load) {
    requestNum = requestNum - 1;
    if (requestNum <= 0) {
      uni.hideLoading();
    }
  }
};
//登录弹窗次数
var loginPopupNum = 0;
//所有接口数据处理（可在接口里设置不调用此方法）
//此方法需要开发者根据各自的接口返回类型修改，以下只是模板
$http.dataFactory = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(res) {var httpData, content;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            console.log("接口请求数据", {
              url: res.url,
              resolve: res.response,
              header: res.header,
              data: res.data,
              method: res.method });if (!(

            res.response.statusCode && res.response.statusCode == 200)) {_context.next = 18;break;}
            httpData = res.response.data;
            if (typeof httpData == "string") {
              httpData = JSON.parse(httpData);
            }
            /*********以下只是模板(及共参考)，需要开发者根据各自的接口返回类型修改*********/

            //判断数据是否请求成功
            if (!(httpData.success || httpData.code == 200)) {_context.next = 8;break;}return _context.abrupt("return",

            Promise.resolve(httpData.data));case 8:if (!(
            httpData.code == "1000" || httpData.code == "1001" || httpData.code == 1100)) {_context.next = 14;break;}
            content = '此时此刻需要您登录喔~';
            if (loginPopupNum <= 0) {
              loginPopupNum++;
              uni.showModal({
                title: '温馨提示',
                content: content,
                confirmText: "去登录",
                cancelText: "再逛会",
                success: function success(res) {
                  loginPopupNum--;
                  if (res.confirm) {
                    uni.navigateTo({
                      url: "/pages/user/login" });

                  }
                } });

            }
            // 返回错误的结果(catch接受数据)
            return _context.abrupt("return", Promise.reject({
              statusCode: 0,
              errMsg: "【request】" + (httpData.info || httpData.msg) }));case 14:

            //其他错误提示
            if (res.isPrompt) {
              uni.showToast({
                title: httpData.info || httpData.msg,
                icon: "none",
                duration: 3000 });

            }
            // 返回错误的结果(catch接受数据)
            return _context.abrupt("return", Promise.reject({
              statusCode: 0,
              errMsg: "【request】" + (httpData.info || httpData.msg) }));case 16:_context.next = 19;break;case 18:return _context.abrupt("return",







            Promise.reject({
              statusCode: res.response.statusCode,
              errMsg: "【request】数据工厂验证不通过" }));case 19:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}();



// 错误回调
$http.requestError = function (e) {
  // e.statusCode === 0 是参数效验错误抛出的
  if (e.statusCode === 0) {
    throw e;
  } else {
    uni.showToast({
      title: "网络错误，请检查一下网络",
      icon: "none" });

  }
};var _default =
$http;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 112:
/*!**************************************************************************!*\
  !*** C:/Users/戴尔/Desktop/testdome/weather/components/uni-icons/icons.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 12:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 13);

/***/ }),

/***/ 13:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 14);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 14:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 15:
/*!****************************************************************************************!*\
  !*** C:/Users/戴尔/Desktop/testdome/weather/components/zhouWei-request/request/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;




var _upload = _interopRequireDefault(__webpack_require__(/*! ./upload/upload.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /***************纯粹的数据请求（如果使用这种可以删除掉fileUpload.js）******************/ // import request from "./core/request.js";
// export default request;
/********数据请求同时继承了文件上传（包括七牛云上传）************/var _default = _upload.default;exports.default = _default;

/***/ }),

/***/ 16:
/*!************************************************************************************************!*\
  !*** C:/Users/戴尔/Desktop/testdome/weather/components/zhouWei-request/request/upload/upload.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 12));var _request2 = _interopRequireDefault(__webpack_require__(/*! ./../core/request.js */ 17));






var _utils = __webpack_require__(/*! ./../core/utils.js */ 18);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}var _require = __webpack_require__(/*! ./utils */ 19),chooseImage = _require.chooseImage,chooseVideo = _require.chooseVideo,qiniuUpload = _require.qiniuUpload,urlUpload = _require.urlUpload;var


fileUpload = /*#__PURE__*/function (_request) {_inherits(fileUpload, _request);var _super = _createSuper(fileUpload);
  function fileUpload(props) {_classCallCheck(this, fileUpload);
    // 调用实现父类的构造函数
    return _super.call(this, props);
  }
  //七牛云上传图片
  _createClass(fileUpload, [{ key: "qnImgUpload", value: function () {var _qnImgUpload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,files,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};_context.prev = 1;_context.next = 4;return (


                  chooseImage(options));case 4:files = _context.sent;
                // 选择完成回调
                options.onSelectComplete && options.onSelectComplete(files);_context.next = 12;break;case 8:_context.prev = 8;_context.t0 = _context["catch"](1);

                this.requestError && this.requestError(_context.t0);return _context.abrupt("return",
                Promise.reject(_context.t0));case 12:if (!

                files) {_context.next = 14;break;}return _context.abrupt("return",
                this.qnFileUpload(_objectSpread(_objectSpread({},
                options), {}, {
                  files: files })));case 14:case "end":return _context.stop();}}}, _callee, this, [[1, 8]]);}));function qnImgUpload() {return _qnImgUpload.apply(this, arguments);}return qnImgUpload;}()



    //七牛云上传视频
  }, { key: "qnVideoUpload", value: function () {var _qnVideoUpload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var options,files,_args2 = arguments;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};_context2.prev = 1;_context2.next = 4;return (


                  chooseVideo(options));case 4:files = _context2.sent;
                // 选择完成回调
                options.onSelectComplete && options.onSelectComplete(files);_context2.next = 12;break;case 8:_context2.prev = 8;_context2.t0 = _context2["catch"](1);

                this.requestError && this.requestError(_context2.t0);return _context2.abrupt("return",
                Promise.reject(_context2.t0));case 12:if (!

                files) {_context2.next = 14;break;}return _context2.abrupt("return",
                this.qnFileUpload(_objectSpread(_objectSpread({},
                options), {}, {
                  files: files })));case 14:case "end":return _context2.stop();}}}, _callee2, this, [[1, 8]]);}));function qnVideoUpload() {return _qnVideoUpload.apply(this, arguments);}return qnVideoUpload;}()




    //七牛云文件上传（支持多张上传）
  }, { key: "qnFileUpload", value: function () {var _qnFileUpload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var options,requestInfo,requestStart,changekeys,requestResult,_args3 = arguments;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:options = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};_context3.prev = 1;


                // 数据合并
                requestInfo = _objectSpread(_objectSpread(_objectSpread({},
                this.config),
                options), {}, {
                  header: {},
                  method: "FILE" });

                //请求前回调
                if (!this.requestStart) {_context3.next = 11;break;}
                requestStart = this.requestStart(requestInfo);if (!(
                typeof requestStart == "object")) {_context3.next = 10;break;}
                changekeys = ["load", "files"];
                changekeys.forEach(function (key) {
                  requestInfo[key] = requestStart[key];
                });_context3.next = 11;break;case 10:throw (

                  {
                    errMsg: "【request】请求开始拦截器未通过",
                    statusCode: 0,
                    data: requestInfo.data,
                    method: requestInfo.method,
                    header: requestInfo.header,
                    url: requestInfo.url });case 11:_context3.next = 13;return (



                  qiniuUpload(requestInfo, this.getQnToken));case 13:requestResult = _context3.sent;return _context3.abrupt("return",
                Promise.resolve(requestResult));case 17:_context3.prev = 17;_context3.t0 = _context3["catch"](1);

                this.requestError && this.requestError(_context3.t0);return _context3.abrupt("return",
                Promise.reject(_context3.t0));case 21:_context3.prev = 21;

                this.requestEnd && this.requestEnd(requestInfo);return _context3.finish(21);case 24:case "end":return _context3.stop();}}}, _callee3, this, [[1, 17, 21, 24]]);}));function qnFileUpload() {return _qnFileUpload.apply(this, arguments);}return qnFileUpload;}()


    //本地服务器图片上传
  }, { key: "urlImgUpload", value: function () {var _urlImgUpload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var options,_args4 = arguments;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                options = {};
                if (_args4[0]) {
                  if (typeof _args4[0] == "string") {
                    options.url = _args4[0];
                  } else if (typeof _args4[0] == "object") {
                    options = Object.assign(options, _args4[0]);
                  }
                }
                if (_args4[1] && typeof _args4[1] == "object") {
                  options = Object.assign(options, _args4[1]);
                }_context4.prev = 3;_context4.next = 6;return (

                  chooseImage(options));case 6:options.files = _context4.sent;
                // 选择完成回调
                options.onSelectComplete && options.onSelectComplete(options.files);_context4.next = 14;break;case 10:_context4.prev = 10;_context4.t0 = _context4["catch"](3);

                this.requestError && this.requestError(_context4.t0);return _context4.abrupt("return",
                Promise.reject(_context4.t0));case 14:if (!

                options.files) {_context4.next = 16;break;}return _context4.abrupt("return",
                this.urlFileUpload(options));case 16:case "end":return _context4.stop();}}}, _callee4, this, [[3, 10]]);}));function urlImgUpload() {return _urlImgUpload.apply(this, arguments);}return urlImgUpload;}()


    //本地服务器上传视频
  }, { key: "urlVideoUpload", value: function () {var _urlVideoUpload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var options,_args5 = arguments;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
                options = {};
                if (_args5[0]) {
                  if (typeof _args5[0] == "string") {
                    options.url = _args5[0];
                  } else if (typeof _args5[0] == "object") {
                    options = Object.assign(options, _args5[0]);
                  }
                }
                if (_args5[1] && typeof _args5[1] == "object") {
                  options = Object.assign(options, _args5[1]);
                }_context5.prev = 3;_context5.next = 6;return (

                  chooseVideo(options));case 6:options.files = _context5.sent;
                // 选择完成回调
                options.onSelectComplete && options.onSelectComplete(options.files);_context5.next = 14;break;case 10:_context5.prev = 10;_context5.t0 = _context5["catch"](3);

                this.requestError && this.requestError(_context5.t0);return _context5.abrupt("return",
                Promise.reject(_context5.t0));case 14:if (!

                options.files) {_context5.next = 16;break;}return _context5.abrupt("return",
                this.urlFileUpload(options));case 16:case "end":return _context5.stop();}}}, _callee5, this, [[3, 10]]);}));function urlVideoUpload() {return _urlVideoUpload.apply(this, arguments);}return urlVideoUpload;}()


    //本地服务器文件上传方法
  }, { key: "urlFileUpload", value: function () {var _urlFileUpload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var requestInfo,runRequestStart,requestStart,changekeys,requestResult,_args6 = arguments;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
                requestInfo = {
                  method: "FILE" };

                if (_args6[0]) {
                  if (typeof _args6[0] == "string") {
                    requestInfo.url = _args6[0];
                  } else if (typeof _args6[0] == "object") {
                    requestInfo = Object.assign(requestInfo, _args6[0]);
                  }
                }
                if (_args6[1] && typeof _args6[1] == "object") {
                  requestInfo = Object.assign(requestInfo, _args6[1]);
                }
                if (!requestInfo.url && this.defaultUploadUrl) {
                  requestInfo.url = this.defaultUploadUrl;
                }
                // 请求数据
                // 是否运行过请求开始钩子
                runRequestStart = false;_context6.prev = 5;if (

                requestInfo.url) {_context6.next = 8;break;}throw (
                  {
                    errMsg: "【request】文件上传缺失数据url",
                    statusCode: 0,
                    data: requestInfo.data,
                    method: requestInfo.method,
                    header: requestInfo.header,
                    url: requestInfo.url });case 8:


                // 数据合并
                requestInfo = (0, _utils.mergeConfig)(this, requestInfo);
                // 代表之前运行到这里
                runRequestStart = true;
                //请求前回调
                if (!this.requestStart) {_context6.next = 18;break;}
                requestStart = this.requestStart(requestInfo);if (!(
                typeof requestStart == "object")) {_context6.next = 17;break;}
                changekeys = ["data", "header", "isPrompt", "load", "isFactory", "files"];
                changekeys.forEach(function (key) {
                  requestInfo[key] = requestStart[key];
                });_context6.next = 18;break;case 17:throw (

                  {
                    errMsg: "【request】请求开始拦截器未通过",
                    statusCode: 0,
                    data: requestInfo.data,
                    method: requestInfo.method,
                    header: requestInfo.header,
                    url: requestInfo.url });case 18:_context6.next = 20;return (



                  urlUpload(requestInfo, this.dataFactory));case 20:requestResult = _context6.sent;return _context6.abrupt("return",
                Promise.resolve(requestResult));case 24:_context6.prev = 24;_context6.t0 = _context6["catch"](5);

                this.requestError && this.requestError(_context6.t0);return _context6.abrupt("return",
                Promise.reject(_context6.t0));case 28:_context6.prev = 28;

                if (runRequestStart) {
                  this.requestEnd && this.requestEnd(requestInfo);
                }return _context6.finish(28);case 31:case "end":return _context6.stop();}}}, _callee6, this, [[5, 24, 28, 31]]);}));function urlFileUpload() {return _urlFileUpload.apply(this, arguments);}return urlFileUpload;}() }]);return fileUpload;}(_request2.default);exports.default = fileUpload;

/***/ }),

/***/ 17:
/*!***********************************************************************************************!*\
  !*** C:/Users/戴尔/Desktop/testdome/weather/components/zhouWei-request/request/core/request.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 12));var _utils = __webpack_require__(/*! ./utils.js */ 18);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
request = /*#__PURE__*/function () {
  function request(options) {_classCallCheck(this, request);
    //请求公共地址
    this.baseUrl = options.baseUrl || "";
    //公共文件上传请求地址
    this.fileUrl = options.fileUrl || "";
    // 超时时间
    this.timeout = options.timeout || 6000;
    // 服务器上传图片默认url
    this.defaultUploadUrl = options.defaultUploadUrl || "";
    //默认请求头
    this.header = options.header || {};
    //默认配置
    this.config = options.config || {
      isPrompt: true,
      load: true,
      isFactory: true,
      resend: 0 };

  }
  //post请求
  _createClass(request, [{ key: "post", value: function post() {var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        method: "POST",
        data: data,
        url: url },
      options));

    }

    //get请求
  }, { key: "get", value: function get() {var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        method: "GET",
        data: data,
        url: url },
      options));

    }

    //put请求
  }, { key: "put", value: function put() {var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        method: "PUT",
        data: data,
        url: url },
      options));

    }

    //delete请求
  }, { key: "delete", value: function _delete() {var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        method: "DELETE",
        data: data,
        url: url },
      options));

    }
    //jsonp请求(只限于H5使用)
  }, { key: "jsonp", value: function jsonp() {var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        method: "JSONP",
        data: data,
        url: url },
      options));

    }
    //接口请求方法
  }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(data) {var requestInfo, runRequestStart, requestStart, changekeys, requestResult, result;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                // 请求数据


                runRequestStart = false;_context.prev = 1;if (

                data.url) {_context.next = 4;break;}throw (
                  { errMsg: "【request】缺失数据url", statusCode: 0 });case 4:

                // 数据合并
                requestInfo = (0, _utils.mergeConfig)(this, data);
                // 代表之前运行到这里
                runRequestStart = true;
                //请求前回调
                if (!this.requestStart) {_context.next = 14;break;}
                requestStart = this.requestStart(requestInfo);if (!(
                typeof requestStart == "object")) {_context.next = 13;break;}
                changekeys = ["data", "header", "isPrompt", "load", "isFactory"];
                changekeys.forEach(function (key) {
                  requestInfo[key] = requestStart[key];
                });_context.next = 14;break;case 13:throw (

                  {
                    errMsg: "【request】请求开始拦截器未通过",
                    statusCode: 0,
                    data: requestInfo.data,
                    method: requestInfo.method,
                    header: requestInfo.header,
                    url: requestInfo.url });case 14:



                requestResult = {};if (!(
                requestInfo.method == "JSONP")) {_context.next = 21;break;}_context.next = 18;return (
                  (0, _utils.jsonpRequest)(requestInfo));case 18:requestResult = _context.sent;_context.next = 24;break;case 21:_context.next = 23;return (

                  (0, _utils.dispatchRequest)(requestInfo));case 23:requestResult = _context.sent;case 24:if (!(


                requestInfo.isFactory && this.dataFactory)) {_context.next = 31;break;}_context.next = 27;return (

                  this.dataFactory(_objectSpread(_objectSpread({},
                  requestInfo), {}, {
                    response: requestResult })));case 27:result = _context.sent;return _context.abrupt("return",

                Promise.resolve(result));case 31:return _context.abrupt("return",

                Promise.resolve(requestResult));case 32:_context.next = 38;break;case 34:_context.prev = 34;_context.t0 = _context["catch"](1);


                this.requestError && this.requestError(_context.t0);return _context.abrupt("return",
                Promise.reject(_context.t0));case 38:_context.prev = 38;

                // 如果请求开始未运行到，请求结束也不运行
                if (runRequestStart) {
                  this.requestEnd && this.requestEnd(requestInfo);
                }return _context.finish(38);case 41:case "end":return _context.stop();}}}, _callee, this, [[1, 34, 38, 41]]);}));function request(_x) {return _request.apply(this, arguments);}return request;}() }]);return request;}();exports.default = request;

/***/ }),

/***/ 18:
/*!*********************************************************************************************!*\
  !*** C:/Users/戴尔/Desktop/testdome/weather/components/zhouWei-request/request/core/utils.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.jsonpRequest = exports.dispatchRequest = exports.mergeConfig = void 0; // 获取合并的数据
var mergeConfig = function mergeConfig(_this, options) {
  //判断url是不是链接
  var urlType = /^(http|https):\/\//.test(options.url);
  var config = Object.assign({
    timeout: _this.timeout },
  _this.config, options);
  if (options.method == "FILE") {
    config.url = urlType ? options.url : _this.fileUrl + options.url;
  } else {
    config.url = urlType ? options.url : _this.baseUrl + options.url;
  }
  //请求头
  if (options.header) {
    config.header = Object.assign({}, _this.header, options.header);
  } else {
    config.header = Object.assign({}, _this.header);
  }
  return config;
};
// 请求
exports.mergeConfig = mergeConfig;var dispatchRequest = function dispatchRequest(requestInfo) {
  return new Promise(function (resolve, reject) {
    var requestAbort = true;
    var requestData = {
      url: requestInfo.url,
      header: requestInfo.header, //加入请求头
      success: function success(res) {
        requestAbort = false;
        resolve(res);
      },
      fail: function fail(err) {
        requestAbort = false;
        if (err.errMsg == "request:fail abort") {
          reject({
            errMsg: "请求超时，请重新尝试",
            statusCode: 0 });

        } else {
          reject(err);
        }
      } };

    //请求类型
    if (requestInfo.method) {
      requestData.method = requestInfo.method;
    }
    if (requestInfo.data) {
      requestData.data = requestInfo.data;
    }

    if (requestInfo.timeout) {
      requestData.timeout = requestInfo.timeout;
    }

    if (requestInfo.dataType) {
      requestData.dataType = requestInfo.dataType;
    }

    if (requestInfo.responseType) {
      requestData.responseType = requestInfo.responseType;
    }






    var requestTask = uni.request(requestData);
    setTimeout(function () {
      if (requestAbort) {
        requestTask.abort();
      }
    }, requestInfo.timeout);
  });
};
// jsonp请求
exports.dispatchRequest = dispatchRequest;var jsonpRequest = function jsonpRequest(requestInfo) {
  return new Promise(function (resolve, reject) {
    var dataStr = '';
    Object.keys(requestInfo.data).forEach(function (key) {
      dataStr += key + '=' + requestInfo.data[key] + '&';
    });
    //匹配最后一个&并去除
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
    }
    requestInfo.url = requestInfo.url + '?' + dataStr;
    var callbackName = "callback" + Math.ceil(Math.random() * 1000000);










  });
};exports.jsonpRequest = jsonpRequest;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!***********************************************************************************************!*\
  !*** C:/Users/戴尔/Desktop/testdome/weather/components/zhouWei-request/request/upload/utils.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.urlUpload = exports.qiniuUpload = exports.chooseVideo = exports.chooseImage = exports.randomChar = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var qiniuUploader = __webpack_require__(/*! ./qiniuUploader */ 20);
//七牛云上传文件命名
var randomChar = function randomChar(l) {var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
  var tmp = "";
  var time = new Date();
  for (var i = 0; i < l; i++) {
    tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
  }
  return (
    "file/" +
    url +
    time.getTime() +
    tmp);

};
//图片选择
exports.randomChar = randomChar;var chooseImage = function chooseImage(data) {
  return new Promise(function (resolve, reject) {
    uni.chooseImage({
      count: data.count || 9, //默认9
      sizeType: data.sizeType || ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: data.sourceType || ['album', 'camera'], //从相册选择
      success: function success(res) {
        resolve(res.tempFiles);
      },
      fail: function fail(err) {
        reject({
          errMsg: err.errMsg,
          errCode: err.errCode,
          statusCode: 0 });

      } });

  });
};
//视频选择
exports.chooseImage = chooseImage;var chooseVideo = function chooseVideo(data) {
  return new Promise(function (resolve, reject) {
    uni.chooseVideo({
      sourceType: data.sourceType || ['album', 'camera'], //从相册选择
      compressed: data.compressed || false, //是否压缩所选的视频源文件，默认值为 true，需要压缩。
      maxDuration: data.maxDuration || 60, //拍摄视频最长拍摄时间，单位秒。最长支持 60 秒。
      camera: data.camera || 'back', //'front'、'back'，默认'back'
      success: function success(res) {
        var files = [{
          path: res.tempFilePath }];


        files[0].duration = res.duration;
        files[0].size = res.size;
        files[0].height = res.height;
        files[0].width = res.width;




        resolve(files);
      },
      fail: function fail(err) {
        reject({
          errMsg: err.errMsg,
          errCode: err.errCode,
          statusCode: 0 });

      } });

  });
};
// 七牛云上传
exports.chooseVideo = chooseVideo;var qiniuUpload = function qiniuUpload(requestInfo, getQnToken) {
  return new Promise(function (resolve, reject) {
    if (Array.isArray(requestInfo.files)) {
      var len = requestInfo.files.length;
      var fileList = new Array();
      if (getQnToken) {
        getQnToken(function (qnRes) {
          /*
                                      *接口返回参数：
                                      *visitPrefix:访问文件的域名
                                      *token:七牛云上传token
                                      *folderPath:上传的文件夹
                                      *region: 地区 默认为：SCN
                                      */
          var prefixLen = qnRes.visitPrefix.length;
          if (qnRes.visitPrefix.charAt(prefixLen - 1) == '/') {
            qnRes.visitPrefix = qnRes.visitPrefix.substring(0, prefixLen - 1);
          }
          uploadFile(0);

          function uploadFile(i) {
            var item = requestInfo.files[i];
            var updateUrl = randomChar(10, qnRes.folderPath);
            var fileData = _objectSpread({
              fileIndex: i,
              files: requestInfo.files },
            item);

            if (item.name) {
              fileData.name = item.name;
              var nameArr = item.name.split(".");
              updateUrl += "." + nameArr[nameArr.length - 1];
            }
            // 交给七牛上传
            qiniuUploader.upload(item.path || item, function (res) {
              fileData.url = res.imageURL;
              requestInfo.onEachUpdate && requestInfo.onEachUpdate(_objectSpread({
                url: res.imageURL },
              fileData));

              fileList.push(res.imageURL);
              if (len - 1 > i) {
                uploadFile(i + 1);
              } else {
                resolve(fileList);
              }
            }, function (error) {
              reject(error);
            }, {
              region: qnRes.region || 'SCN', //地区
              domain: qnRes.visitPrefix, // bucket 域名，下载资源时用到。
              key: updateUrl,
              uptoken: qnRes.token, // 由其他程序生成七牛 uptoken
              uptokenURL: 'UpTokenURL.com/uptoken' // 上传地址
            }, function (res) {
              console.log(requestInfo);
              requestInfo.onProgressUpdate && requestInfo.onProgressUpdate(Object.assign({}, fileData, res));
              // console.log('上传进度', res.progress)
              // console.log('已经上传的数据长度', res.totalBytesSent)
              // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
            });
          }
        });
      } else {
        reject({
          errMsg: "请添加七牛云回调方法：getQnToken",
          statusCode: 0 });

      }
    } else {
      reject({
        errMsg: "files 必须是数组类型",
        statusCode: 0 });

    };
  });
};
// 服务器URL上传
exports.qiniuUpload = qiniuUpload;var urlUpload = function urlUpload(requestInfo, dataFactory) {
  return new Promise(function (resolve, reject) {
    // 本地文件上传去掉默认Content-Type
    if (requestInfo.header['Content-Type']) {
      delete requestInfo.header['Content-Type'];
    }
    // 本地文件上传去掉默认Content-Type
    if (requestInfo.header['content-type']) {
      delete requestInfo.header['content-type'];
    }
    if (Array.isArray(requestInfo.files)) {var






























































      fileUpload = function fileUpload(i) {
        var item = requestInfo.files[i];
        var fileData = _objectSpread({
          fileIndex: i,
          files: requestInfo.files },
        item);

        var config = {
          url: requestInfo.url,
          filePath: item.path,
          header: requestInfo.header, //加入请求头
          name: requestInfo.name || "file",
          success: function success(response) {
            //是否用外部的数据处理方法
            if (requestInfo.isFactory && dataFactory) {
              //数据处理
              dataFactory(_objectSpread(_objectSpread({},
              requestInfo), {}, {
                response: response })).
              then(function (data) {
                fileList.push(data);
                requestInfo.onEachUpdate && requestInfo.onEachUpdate(_objectSpread({
                  data: data },
                fileData));

                if (len <= i) {
                  resolve(fileList);
                } else {
                  fileUpload(i + 1);
                }
              }, function (err) {
                reject(err);
              });
            } else {
              requestInfo.onEachUpdate && requestInfo.onEachUpdate(_objectSpread({
                data: response },
              fileData));

              fileList.push(response);
              if (len <= i) {
                resolve(fileList);
              } else {
                fileUpload(i + 1);
              }
            }
          },
          fail: function fail(err) {
            reject(err);
          } };

        if (requestInfo.data) {
          config.formData = requestInfo.data;
        }
        var uploadTask = uni.uploadFile(config);
        uploadTask.onProgressUpdate(function (res) {
          requestInfo.onProgressUpdate && requestInfo.onProgressUpdate(Object.assign({}, fileData, res));
        });
      };var len = requestInfo.files.length - 1;var fileList = new Array();fileUpload(0);

    } else {
      reject({
        errMsg: "files 必须是数组类型",
        statusCode: 0 });

    }
  });
};exports.urlUpload = urlUpload;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!*******************************************************************************************************!*\
  !*** C:/Users/戴尔/Desktop/testdome/weather/components/zhouWei-request/request/upload/qiniuUploader.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// created by gpake
(function () {

  var config = {
    qiniuRegion: '',
    qiniuImageURLPrefix: '',
    qiniuUploadToken: '',
    qiniuUploadTokenURL: '',
    qiniuUploadTokenFunction: null,
    qiniuShouldUseQiniuFileName: false };


  module.exports = {
    init: init,
    upload: upload };


  // 在整个程序生命周期中，只需要 init 一次即可
  // 如果需要变更参数，再调用 init 即可
  function init(options) {
    config = {
      qiniuRegion: '',
      qiniuImageURLPrefix: '',
      qiniuUploadToken: '',
      qiniuUploadTokenURL: '',
      qiniuUploadTokenFunction: null,
      qiniuShouldUseQiniuFileName: false };

    updateConfigWithOptions(options);
  }

  function updateConfigWithOptions(options) {
    if (options.region) {
      config.qiniuRegion = options.region;
    } else {
      console.error('qiniu uploader need your bucket region');
    }
    if (options.uptoken) {
      config.qiniuUploadToken = options.uptoken;
    } else if (options.uptokenURL) {
      config.qiniuUploadTokenURL = options.uptokenURL;
    } else if (options.uptokenFunc) {
      config.qiniuUploadTokenFunction = options.uptokenFunc;
    }
    if (options.domain) {
      config.qiniuImageURLPrefix = options.domain;
    }
    config.qiniuShouldUseQiniuFileName = options.shouldUseQiniuFileName;
  }

  function upload(filePath, success, fail, options, progress, cancelTask) {
    if (null == filePath) {
      console.error('qiniu uploader need filePath to upload');
      return;
    }
    if (options) {
      updateConfigWithOptions(options);
    }
    if (config.qiniuUploadToken) {
      doUpload(filePath, success, fail, options, progress, cancelTask);
    } else if (config.qiniuUploadTokenURL) {
      getQiniuToken(function () {
        doUpload(filePath, success, fail, options, progress, cancelTask);
      });
    } else if (config.qiniuUploadTokenFunction) {
      config.qiniuUploadToken = config.qiniuUploadTokenFunction();
      if (null == config.qiniuUploadToken && config.qiniuUploadToken.length > 0) {
        console.error('qiniu UploadTokenFunction result is null, please check the return value');
        return;
      }
      doUpload(filePath, success, fail, options, progress, cancelTask);
    } else {
      console.error('qiniu uploader need one of [uptoken, uptokenURL, uptokenFunc]');
      return;
    }
  }

  function doUpload(filePath, _success, _fail, options, progress, cancelTask) {
    if (null == config.qiniuUploadToken && config.qiniuUploadToken.length > 0) {
      console.error('qiniu UploadToken is null, please check the init config or networking');
      return;
    }
    var url = uploadURLFromRegionCode(config.qiniuRegion);
    var fileName = filePath.split('//')[1];
    if (options && options.key) {
      fileName = options.key;
    }
    var formData = {
      'token': config.qiniuUploadToken };

    if (!config.qiniuShouldUseQiniuFileName) {
      formData['key'] = fileName;
    }
    var uploadTask = wx.uploadFile({
      url: url,
      filePath: filePath,
      name: 'file',
      formData: formData,
      success: function success(res) {
        var dataString = res.data;
        if (res.data.hasOwnProperty('type') && res.data.type === 'Buffer') {
          dataString = String.fromCharCode.apply(null, res.data.data);
        }
        try {
          var dataObject = JSON.parse(dataString);
          //do something
          var imageUrl = config.qiniuImageURLPrefix + '/' + dataObject.key;
          dataObject.imageURL = imageUrl;
          if (_success) {
            _success(dataObject);
          }
        } catch (e) {
          console.log('parse JSON failed, origin String is: ' + dataString);
          if (_fail) {
            _fail(e);
          }
        }
      },
      fail: function fail(error) {
        console.error(error);
        if (_fail) {
          _fail(error);
        }
      } });


    uploadTask.onProgressUpdate(function (res) {
      progress && progress(res);
    });

    cancelTask && cancelTask(function () {
      uploadTask.abort();
    });
  }

  function getQiniuToken(callback) {
    wx.request({
      url: config.qiniuUploadTokenURL,
      success: function success(res) {
        var token = res.data.uptoken;
        if (token && token.length > 0) {
          config.qiniuUploadToken = token;
          if (callback) {
            callback();
          }
        } else {
          console.error('qiniuUploader cannot get your token, please check the uptokenURL or server');
        }
      },
      fail: function fail(error) {
        console.error('qiniu UploadToken is null, please check the init config or networking: ' + error);
      } });

  }

  function uploadURLFromRegionCode(code) {
    var uploadURL = null;
    switch (code) {
      case 'ECN':uploadURL = 'https://up.qbox.me';break;
      case 'NCN':uploadURL = 'https://up-z1.qbox.me';break;
      case 'SCN':uploadURL = 'https://up-z2.qbox.me';break;
      case 'NA':uploadURL = 'https://up-na0.qbox.me';break;
      case 'ASG':uploadURL = 'https://up-as0.qbox.me';break;
      default:console.error('please make the region is with one of [ECN, SCN, NCN, NA, ASG]');}

    return uploadURL;
  }

})();

/***/ }),

/***/ 27:
/*!****************************************************************************!*\
  !*** C:/Users/戴尔/Desktop/testdome/weather/static/js/qqmap-wx-jssdk.min.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var ERROR_CONF = { KEY_ERR: 311, KEY_ERR_MSG: 'key格式错误', PARAM_ERR: 310, PARAM_ERR_MSG: '请求参数信息有误', SYSTEM_ERR: 600, SYSTEM_ERR_MSG: '系统错误', WX_ERR_CODE: 1000, WX_OK_CODE: 200 };var BASE_URL = 'https://apis.map.qq.com/ws/';var URL_SEARCH = BASE_URL + 'place/v1/search';var URL_SUGGESTION = BASE_URL + 'place/v1/suggestion';var URL_GET_GEOCODER = BASE_URL + 'geocoder/v1/';var URL_CITY_LIST = BASE_URL + 'district/v1/list';var URL_AREA_LIST = BASE_URL + 'district/v1/getchildren';var URL_DISTANCE = BASE_URL + 'distance/v1/';var URL_DIRECTION = BASE_URL + 'direction/v1/';var MODE = { driving: 'driving', transit: 'transit' };var EARTH_RADIUS = 6378136.49;var Utils = { safeAdd: function safeAdd(x, y) {var lsw = (x & 0xffff) + (y & 0xffff);var msw = (x >> 16) + (y >> 16) + (lsw >> 16);return msw << 16 | lsw & 0xffff;}, bitRotateLeft: function bitRotateLeft(num, cnt) {return num << cnt | num >>> 32 - cnt;}, md5cmn: function md5cmn(q, a, b, x, s, t) {return this.safeAdd(this.bitRotateLeft(this.safeAdd(this.safeAdd(a, q), this.safeAdd(x, t)), s), b);}, md5ff: function md5ff(a, b, c, d, x, s, t) {return this.md5cmn(b & c | ~b & d, a, b, x, s, t);}, md5gg: function md5gg(a, b, c, d, x, s, t) {return this.md5cmn(b & d | c & ~d, a, b, x, s, t);}, md5hh: function md5hh(a, b, c, d, x, s, t) {return this.md5cmn(b ^ c ^ d, a, b, x, s, t);}, md5ii: function md5ii(a, b, c, d, x, s, t) {return this.md5cmn(c ^ (b | ~d), a, b, x, s, t);}, binlMD5: function binlMD5(x, len) {x[len >> 5] |= 0x80 << len % 32;x[(len + 64 >>> 9 << 4) + 14] = len;var i;var olda;var oldb;var oldc;var oldd;var a = 1732584193;var b = -271733879;var c = -1732584194;var d = 271733878;for (i = 0; i < x.length; i += 16) {olda = a;oldb = b;oldc = c;oldd = d;a = this.md5ff(a, b, c, d, x[i], 7, -680876936);d = this.md5ff(d, a, b, c, x[i + 1], 12, -389564586);c = this.md5ff(c, d, a, b, x[i + 2], 17, 606105819);b = this.md5ff(b, c, d, a, x[i + 3], 22, -1044525330);a = this.md5ff(a, b, c, d, x[i + 4], 7, -176418897);d = this.md5ff(d, a, b, c, x[i + 5], 12, 1200080426);c = this.md5ff(c, d, a, b, x[i + 6], 17, -1473231341);b = this.md5ff(b, c, d, a, x[i + 7], 22, -45705983);a = this.md5ff(a, b, c, d, x[i + 8], 7, 1770035416);d = this.md5ff(d, a, b, c, x[i + 9], 12, -1958414417);c = this.md5ff(c, d, a, b, x[i + 10], 17, -42063);b = this.md5ff(b, c, d, a, x[i + 11], 22, -1990404162);a = this.md5ff(a, b, c, d, x[i + 12], 7, 1804603682);d = this.md5ff(d, a, b, c, x[i + 13], 12, -40341101);c = this.md5ff(c, d, a, b, x[i + 14], 17, -1502002290);b = this.md5ff(b, c, d, a, x[i + 15], 22, 1236535329);a = this.md5gg(a, b, c, d, x[i + 1], 5, -165796510);d = this.md5gg(d, a, b, c, x[i + 6], 9, -1069501632);c = this.md5gg(c, d, a, b, x[i + 11], 14, 643717713);b = this.md5gg(b, c, d, a, x[i], 20, -373897302);a = this.md5gg(a, b, c, d, x[i + 5], 5, -701558691);d = this.md5gg(d, a, b, c, x[i + 10], 9, 38016083);c = this.md5gg(c, d, a, b, x[i + 15], 14, -660478335);b = this.md5gg(b, c, d, a, x[i + 4], 20, -405537848);a = this.md5gg(a, b, c, d, x[i + 9], 5, 568446438);d = this.md5gg(d, a, b, c, x[i + 14], 9, -1019803690);c = this.md5gg(c, d, a, b, x[i + 3], 14, -187363961);b = this.md5gg(b, c, d, a, x[i + 8], 20, 1163531501);a = this.md5gg(a, b, c, d, x[i + 13], 5, -1444681467);d = this.md5gg(d, a, b, c, x[i + 2], 9, -51403784);c = this.md5gg(c, d, a, b, x[i + 7], 14, 1735328473);b = this.md5gg(b, c, d, a, x[i + 12], 20, -1926607734);a = this.md5hh(a, b, c, d, x[i + 5], 4, -378558);d = this.md5hh(d, a, b, c, x[i + 8], 11, -2022574463);c = this.md5hh(c, d, a, b, x[i + 11], 16, 1839030562);b = this.md5hh(b, c, d, a, x[i + 14], 23, -35309556);a = this.md5hh(a, b, c, d, x[i + 1], 4, -1530992060);d = this.md5hh(d, a, b, c, x[i + 4], 11, 1272893353);c = this.md5hh(c, d, a, b, x[i + 7], 16, -155497632);b = this.md5hh(b, c, d, a, x[i + 10], 23, -1094730640);a = this.md5hh(a, b, c, d, x[i + 13], 4, 681279174);d = this.md5hh(d, a, b, c, x[i], 11, -358537222);c = this.md5hh(c, d, a, b, x[i + 3], 16, -722521979);b = this.md5hh(b, c, d, a, x[i + 6], 23, 76029189);a = this.md5hh(a, b, c, d, x[i + 9], 4, -640364487);d = this.md5hh(d, a, b, c, x[i + 12], 11, -421815835);c = this.md5hh(c, d, a, b, x[i + 15], 16, 530742520);b = this.md5hh(b, c, d, a, x[i + 2], 23, -995338651);a = this.md5ii(a, b, c, d, x[i], 6, -198630844);d = this.md5ii(d, a, b, c, x[i + 7], 10, 1126891415);c = this.md5ii(c, d, a, b, x[i + 14], 15, -1416354905);b = this.md5ii(b, c, d, a, x[i + 5], 21, -57434055);a = this.md5ii(a, b, c, d, x[i + 12], 6, 1700485571);d = this.md5ii(d, a, b, c, x[i + 3], 10, -1894986606);c = this.md5ii(c, d, a, b, x[i + 10], 15, -1051523);b = this.md5ii(b, c, d, a, x[i + 1], 21, -2054922799);a = this.md5ii(a, b, c, d, x[i + 8], 6, 1873313359);d = this.md5ii(d, a, b, c, x[i + 15], 10, -30611744);c = this.md5ii(c, d, a, b, x[i + 6], 15, -1560198380);b = this.md5ii(b, c, d, a, x[i + 13], 21, 1309151649);a = this.md5ii(a, b, c, d, x[i + 4], 6, -145523070);d = this.md5ii(d, a, b, c, x[i + 11], 10, -1120210379);c = this.md5ii(c, d, a, b, x[i + 2], 15, 718787259);b = this.md5ii(b, c, d, a, x[i + 9], 21, -343485551);a = this.safeAdd(a, olda);b = this.safeAdd(b, oldb);c = this.safeAdd(c, oldc);d = this.safeAdd(d, oldd);}return [a, b, c, d];}, binl2rstr: function binl2rstr(input) {var i;var output = '';var length32 = input.length * 32;for (i = 0; i < length32; i += 8) {output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);}return output;}, rstr2binl: function rstr2binl(input) {var i;var output = [];output[(input.length >> 2) - 1] = undefined;for (i = 0; i < output.length; i += 1) {output[i] = 0;}var length8 = input.length * 8;for (i = 0; i < length8; i += 8) {output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;}return output;}, rstrMD5: function rstrMD5(s) {return this.binl2rstr(this.binlMD5(this.rstr2binl(s), s.length * 8));}, rstrHMACMD5: function rstrHMACMD5(key, data) {var i;var bkey = this.rstr2binl(key);var ipad = [];var opad = [];var hash;ipad[15] = opad[15] = undefined;if (bkey.length > 16) {bkey = this.binlMD5(bkey, key.length * 8);}for (i = 0; i < 16; i += 1) {ipad[i] = bkey[i] ^ 0x36363636;opad[i] = bkey[i] ^ 0x5c5c5c5c;}hash = this.binlMD5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);return this.binl2rstr(this.binlMD5(opad.concat(hash), 512 + 128));}, rstr2hex: function rstr2hex(input) {var hexTab = '0123456789abcdef';var output = '';var x;var i;for (i = 0; i < input.length; i += 1) {x = input.charCodeAt(i);output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);}return output;}, str2rstrUTF8: function str2rstrUTF8(input) {return unescape(encodeURIComponent(input));}, rawMD5: function rawMD5(s) {return this.rstrMD5(this.str2rstrUTF8(s));}, hexMD5: function hexMD5(s) {return this.rstr2hex(this.rawMD5(s));}, rawHMACMD5: function rawHMACMD5(k, d) {return this.rstrHMACMD5(this.str2rstrUTF8(k), str2rstrUTF8(d));}, hexHMACMD5: function hexHMACMD5(k, d) {return this.rstr2hex(this.rawHMACMD5(k, d));}, md5: function md5(string, key, raw) {if (!key) {if (!raw) {return this.hexMD5(string);}return this.rawMD5(string);}if (!raw) {return this.hexHMACMD5(key, string);}return this.rawHMACMD5(key, string);}, getSig: function getSig(requestParam, sk, feature, mode) {var sig = null;var requestArr = [];Object.keys(requestParam).sort().forEach(function (key) {requestArr.push(key + '=' + requestParam[key]);});if (feature == 'search') {sig = '/ws/place/v1/search?' + requestArr.join('&') + sk;}if (feature == 'suggest') {sig = '/ws/place/v1/suggestion?' + requestArr.join('&') + sk;}if (feature == 'reverseGeocoder') {sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;}if (feature == 'geocoder') {sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;}if (feature == 'getCityList') {sig = '/ws/district/v1/list?' + requestArr.join('&') + sk;}if (feature == 'getDistrictByCityId') {sig = '/ws/district/v1/getchildren?' + requestArr.join('&') + sk;}if (feature == 'calculateDistance') {sig = '/ws/distance/v1/?' + requestArr.join('&') + sk;}if (feature == 'direction') {sig = '/ws/direction/v1/' + mode + '?' + requestArr.join('&') + sk;}sig = this.md5(sig);return sig;}, location2query: function location2query(data) {if (typeof data == 'string') {return data;}var query = '';for (var i = 0; i < data.length; i++) {var d = data[i];if (!!query) {query += ';';}if (d.location) {query = query + d.location.lat + ',' + d.location.lng;}if (d.latitude && d.longitude) {query = query + d.latitude + ',' + d.longitude;}}return query;}, rad: function rad(d) {return d * Math.PI / 180.0;}, getEndLocation: function getEndLocation(location) {var to = location.split(';');var endLocation = [];for (var i = 0; i < to.length; i++) {endLocation.push({ lat: parseFloat(to[i].split(',')[0]), lng: parseFloat(to[i].split(',')[1]) });}return endLocation;}, getDistance: function getDistance(latFrom, lngFrom, latTo, lngTo) {var radLatFrom = this.rad(latFrom);var radLatTo = this.rad(latTo);var a = radLatFrom - radLatTo;var b = this.rad(lngFrom) - this.rad(lngTo);var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLatFrom) * Math.cos(radLatTo) * Math.pow(Math.sin(b / 2), 2)));distance = distance * EARTH_RADIUS;distance = Math.round(distance * 10000) / 10000;return parseFloat(distance.toFixed(0));}, getWXLocation: function getWXLocation(success, fail, complete) {wx.getLocation({ type: 'gcj02', success: success, fail: fail, complete: complete });}, getLocationParam: function getLocationParam(location) {if (typeof location == 'string') {var locationArr = location.split(',');if (locationArr.length === 2) {location = { latitude: location.split(',')[0], longitude: location.split(',')[1] };} else {location = {};}}return location;}, polyfillParam: function polyfillParam(param) {param.success = param.success || function () {};param.fail = param.fail || function () {};param.complete = param.complete || function () {};}, checkParamKeyEmpty: function checkParamKeyEmpty(param, key) {if (!param[key]) {var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + key + '参数格式有误');param.fail(errconf);param.complete(errconf);return true;}return false;}, checkKeyword: function checkKeyword(param) {return !this.checkParamKeyEmpty(param, 'keyword');}, checkLocation: function checkLocation(param) {var location = this.getLocationParam(param.location);if (!location || !location.latitude || !location.longitude) {var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + ' location参数格式有误');param.fail(errconf);param.complete(errconf);return false;}return true;}, buildErrorConfig: function buildErrorConfig(errCode, errMsg) {return { status: errCode, message: errMsg };}, handleData: function handleData(param, data, feature) {if (feature == 'search') {var searchResult = data.data;var searchSimplify = [];for (var i = 0; i < searchResult.length; i++) {searchSimplify.push({ id: searchResult[i].id || null, title: searchResult[i].title || null, latitude: searchResult[i].location && searchResult[i].location.lat || null, longitude: searchResult[i].location && searchResult[i].location.lng || null, address: searchResult[i].address || null, category: searchResult[i].category || null, tel: searchResult[i].tel || null, adcode: searchResult[i].ad_info && searchResult[i].ad_info.adcode || null, city: searchResult[i].ad_info && searchResult[i].ad_info.city || null, district: searchResult[i].ad_info && searchResult[i].ad_info.district || null, province: searchResult[i].ad_info && searchResult[i].ad_info.province || null });}param.success(data, { searchResult: searchResult, searchSimplify: searchSimplify });} else if (feature == 'suggest') {var suggestResult = data.data;var suggestSimplify = [];for (var i = 0; i < suggestResult.length; i++) {suggestSimplify.push({ adcode: suggestResult[i].adcode || null, address: suggestResult[i].address || null, category: suggestResult[i].category || null, city: suggestResult[i].city || null, district: suggestResult[i].district || null, id: suggestResult[i].id || null, latitude: suggestResult[i].location && suggestResult[i].location.lat || null, longitude: suggestResult[i].location && suggestResult[i].location.lng || null, province: suggestResult[i].province || null, title: suggestResult[i].title || null, type: suggestResult[i].type || null });}param.success(data, { suggestResult: suggestResult, suggestSimplify: suggestSimplify });} else if (feature == 'reverseGeocoder') {var reverseGeocoderResult = data.result;var reverseGeocoderSimplify = { address: reverseGeocoderResult.address || null, latitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lat || null, longitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lng || null, adcode: reverseGeocoderResult.ad_info && reverseGeocoderResult.ad_info.adcode || null, city: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.city || null, district: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.district || null, nation: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.nation || null, province: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.province || null, street: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street || null, street_number: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street_number || null, recommend: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.recommend || null, rough: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.rough || null };if (reverseGeocoderResult.pois) {var pois = reverseGeocoderResult.pois;var poisSimplify = [];for (var i = 0; i < pois.length; i++) {poisSimplify.push({ id: pois[i].id || null, title: pois[i].title || null, latitude: pois[i].location && pois[i].location.lat || null, longitude: pois[i].location && pois[i].location.lng || null, address: pois[i].address || null, category: pois[i].category || null, adcode: pois[i].ad_info && pois[i].ad_info.adcode || null, city: pois[i].ad_info && pois[i].ad_info.city || null, district: pois[i].ad_info && pois[i].ad_info.district || null, province: pois[i].ad_info && pois[i].ad_info.province || null });}param.success(data, { reverseGeocoderResult: reverseGeocoderResult, reverseGeocoderSimplify: reverseGeocoderSimplify, pois: pois, poisSimplify: poisSimplify });} else {param.success(data, { reverseGeocoderResult: reverseGeocoderResult, reverseGeocoderSimplify: reverseGeocoderSimplify });}} else if (feature == 'geocoder') {var geocoderResult = data.result;var geocoderSimplify = { title: geocoderResult.title || null, latitude: geocoderResult.location && geocoderResult.location.lat || null, longitude: geocoderResult.location && geocoderResult.location.lng || null, adcode: geocoderResult.ad_info && geocoderResult.ad_info.adcode || null, province: geocoderResult.address_components && geocoderResult.address_components.province || null, city: geocoderResult.address_components && geocoderResult.address_components.city || null, district: geocoderResult.address_components && geocoderResult.address_components.district || null, street: geocoderResult.address_components && geocoderResult.address_components.street || null, street_number: geocoderResult.address_components && geocoderResult.address_components.street_number || null, level: geocoderResult.level || null };param.success(data, { geocoderResult: geocoderResult, geocoderSimplify: geocoderSimplify });} else if (feature == 'getCityList') {var provinceResult = data.result[0];var cityResult = data.result[1];var districtResult = data.result[2];param.success(data, { provinceResult: provinceResult, cityResult: cityResult, districtResult: districtResult });} else if (feature == 'getDistrictByCityId') {var districtByCity = data.result[0];param.success(data, districtByCity);} else if (feature == 'calculateDistance') {var calculateDistanceResult = data.result.elements;var distance = [];for (var i = 0; i < calculateDistanceResult.length; i++) {distance.push(calculateDistanceResult[i].distance);}param.success(data, { calculateDistanceResult: calculateDistanceResult, distance: distance });} else if (feature == 'direction') {var direction = data.result.routes;param.success(data, direction);} else {param.success(data);}}, buildWxRequestConfig: function buildWxRequestConfig(param, options, feature) {var that = this;options.header = { "content-type": "application/json" };options.method = 'GET';options.success = function (res) {var data = res.data;if (data.status === 0) {that.handleData(param, data, feature);} else {param.fail(data);}};options.fail = function (res) {res.statusCode = ERROR_CONF.WX_ERR_CODE;param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));};options.complete = function (res) {var statusCode = +res.statusCode;switch (statusCode) {case ERROR_CONF.WX_ERR_CODE:{param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));break;}case ERROR_CONF.WX_OK_CODE:{var data = res.data;if (data.status === 0) {param.complete(data);} else {param.complete(that.buildErrorConfig(data.status, data.message));}break;}default:{param.complete(that.buildErrorConfig(ERROR_CONF.SYSTEM_ERR, ERROR_CONF.SYSTEM_ERR_MSG));}}};return options;}, locationProcess: function locationProcess(param, locationsuccess, locationfail, locationcomplete) {var that = this;locationfail = locationfail || function (res) {res.statusCode = ERROR_CONF.WX_ERR_CODE;param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));};locationcomplete = locationcomplete || function (res) {if (res.statusCode == ERROR_CONF.WX_ERR_CODE) {param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));}};if (!param.location) {that.getWXLocation(locationsuccess, locationfail, locationcomplete);} else if (that.checkLocation(param)) {var location = Utils.getLocationParam(param.location);locationsuccess(location);}} };var QQMapWX = /*#__PURE__*/function () {"use strict";function QQMapWX(options) {_classCallCheck(this, QQMapWX);if (!options.key) {throw Error('key值不能为空');}this.key = options.key;}_createClass(QQMapWX, [{ key: "search", value: function search(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (!Utils.checkKeyword(options)) {return;}var requestParam = { keyword: options.keyword, orderby: options.orderby || '_distance', page_size: options.page_size || 10, page_index: options.page_index || 1, output: 'json', key: that.key };if (options.address_format) {requestParam.address_format = options.address_format;}if (options.filter) {requestParam.filter = options.filter;}var distance = options.distance || "1000";var auto_extend = options.auto_extend || 1;var region = null;var rectangle = null;if (options.region) {region = options.region;}if (options.rectangle) {rectangle = options.rectangle;}var locationsuccess = function locationsuccess(result) {if (region && !rectangle) {requestParam.boundary = "region(" + region + "," + auto_extend + "," + result.latitude + "," + result.longitude + ")";if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');}} else if (rectangle && !region) {requestParam.boundary = "rectangle(" + rectangle + ")";if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');}} else {requestParam.boundary = "nearby(" + result.latitude + "," + result.longitude + "," + distance + "," + auto_extend + ")";if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');}}wx.request(Utils.buildWxRequestConfig(options, { url: URL_SEARCH, data: requestParam }, 'search'));};Utils.locationProcess(options, locationsuccess);} }, { key: "getSuggestion", value: function getSuggestion(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (!Utils.checkKeyword(options)) {return;}var requestParam = { keyword: options.keyword, region: options.region || '全国', region_fix: options.region_fix || 0, policy: options.policy || 0, page_size: options.page_size || 10, page_index: options.page_index || 1, get_subpois: options.get_subpois || 0, output: 'json', key: that.key };if (options.address_format) {requestParam.address_format = options.address_format;}if (options.filter) {requestParam.filter = options.filter;}if (options.location) {var locationsuccess = function locationsuccess(result) {requestParam.location = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_SUGGESTION, data: requestParam }, "suggest"));};Utils.locationProcess(options, locationsuccess);} else {if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_SUGGESTION, data: requestParam }, "suggest"));}} }, { key: "reverseGeocoder", value: function reverseGeocoder(options) {var that = this;options = options || {};Utils.polyfillParam(options);var requestParam = { coord_type: options.coord_type || 5, get_poi: options.get_poi || 0, output: 'json', key: that.key };if (options.poi_options) {requestParam.poi_options = options.poi_options;}var locationsuccess = function locationsuccess(result) {requestParam.location = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'reverseGeocoder');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_GET_GEOCODER, data: requestParam }, 'reverseGeocoder'));};Utils.locationProcess(options, locationsuccess);} }, { key: "geocoder", value: function geocoder(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'address')) {return;}var requestParam = { address: options.address, output: 'json', key: that.key };if (options.region) {requestParam.region = options.region;}if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'geocoder');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_GET_GEOCODER, data: requestParam }, 'geocoder'));} }, { key: "getCityList", value: function getCityList(options) {var that = this;options = options || {};Utils.polyfillParam(options);var requestParam = { output: 'json', key: that.key };if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'getCityList');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_CITY_LIST, data: requestParam }, 'getCityList'));} }, { key: "getDistrictByCityId", value: function getDistrictByCityId(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'id')) {return;}var requestParam = { id: options.id || '', output: 'json', key: that.key };if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'getDistrictByCityId');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_AREA_LIST, data: requestParam }, 'getDistrictByCityId'));} }, { key: "calculateDistance", value: function calculateDistance(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'to')) {return;}var requestParam = { mode: options.mode || 'walking', to: Utils.location2query(options.to), output: 'json', key: that.key };if (options.from) {options.location = options.from;}if (requestParam.mode == 'straight') {var locationsuccess = function locationsuccess(result) {var locationTo = Utils.getEndLocation(requestParam.to);var data = { message: "query ok", result: { elements: [] }, status: 0 };for (var i = 0; i < locationTo.length; i++) {data.result.elements.push({ distance: Utils.getDistance(result.latitude, result.longitude, locationTo[i].lat, locationTo[i].lng), duration: 0, from: { lat: result.latitude, lng: result.longitude }, to: { lat: locationTo[i].lat, lng: locationTo[i].lng } });}var calculateResult = data.result.elements;var distanceResult = [];for (var i = 0; i < calculateResult.length; i++) {distanceResult.push(calculateResult[i].distance);}return options.success(data, { calculateResult: calculateResult, distanceResult: distanceResult });};Utils.locationProcess(options, locationsuccess);} else {var locationsuccess = function locationsuccess(result) {requestParam.from = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'calculateDistance');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_DISTANCE, data: requestParam }, 'calculateDistance'));};Utils.locationProcess(options, locationsuccess);}} }, { key: "direction", value: function direction(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'to')) {return;}var requestParam = { output: 'json', key: that.key };if (typeof options.to == 'string') {requestParam.to = options.to;} else {requestParam.to = options.to.latitude + ',' + options.to.longitude;}var SET_URL_DIRECTION = null;options.mode = options.mode || MODE.driving;SET_URL_DIRECTION = URL_DIRECTION + options.mode;if (options.from) {options.location = options.from;}if (options.mode == MODE.driving) {if (options.from_poi) {requestParam.from_poi = options.from_poi;}if (options.heading) {requestParam.heading = options.heading;}if (options.speed) {requestParam.speed = options.speed;}if (options.accuracy) {requestParam.accuracy = options.accuracy;}if (options.road_type) {requestParam.road_type = options.road_type;}if (options.to_poi) {requestParam.to_poi = options.to_poi;}if (options.from_track) {requestParam.from_track = options.from_track;}if (options.waypoints) {requestParam.waypoints = options.waypoints;}if (options.policy) {requestParam.policy = options.policy;}if (options.plate_number) {requestParam.plate_number = options.plate_number;}}if (options.mode == MODE.transit) {if (options.departure_time) {requestParam.departure_time = options.departure_time;}if (options.policy) {requestParam.policy = options.policy;}}var locationsuccess = function locationsuccess(result) {requestParam.from = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'direction', options.mode);}wx.request(Utils.buildWxRequestConfig(options, { url: SET_URL_DIRECTION, data: requestParam }, 'direction'));};Utils.locationProcess(options, locationsuccess);} }]);return QQMapWX;}();;module.exports = QQMapWX;
var qqmapsdk = new QQMapWX({ key: 'IROBZ-RBB3W-KVPRO-RKR7W-HMJH5-FFFSJ' });

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 36:
/*!**************************************************************!*\
  !*** C:/Users/戴尔/Desktop/testdome/weather/static/404/x2.png ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 37:
/*!**************************************************************!*\
  !*** C:/Users/戴尔/Desktop/testdome/weather/static/404/x3.png ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 38:
/*!**************************************************************!*\
  !*** C:/Users/戴尔/Desktop/testdome/weather/static/404/x4.png ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 39:
/*!**************************************************************!*\
  !*** C:/Users/戴尔/Desktop/testdome/weather/static/404/x5.png ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 4:
/*!*******************************************************!*\
  !*** C:/Users/戴尔/Desktop/testdome/weather/pages.json ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!**************************************************************!*\
  !*** C:/Users/戴尔/Desktop/testdome/weather/static/404/x6.png ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 41:
/*!**************************************************************!*\
  !*** C:/Users/戴尔/Desktop/testdome/weather/static/404/x7.png ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 42:
/*!**************************************************************!*\
  !*** C:/Users/戴尔/Desktop/testdome/weather/static/404/x8.png ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map