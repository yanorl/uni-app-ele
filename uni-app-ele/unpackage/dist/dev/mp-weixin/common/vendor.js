(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

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
      promise = Promise.then(wrapperHook(hook));
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
      return 1;
    } else {
      return 0.5;
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
  interceptors: interceptors });


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
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

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
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
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
      var returnValue = wx[options.name || methodName].apply(wx, args);
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
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
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
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
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
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
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
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
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
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

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

function handleEvent(event) {var _this = this;
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
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
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
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

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
'onPageNotFound'];


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
  App(parseApp(vm));
  return vm;
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

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
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
      if (target[name]) {
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

/***/ 12:
/*!********************************************************************************!*\
  !*** /Users/yan/webserver/git/uniapp/uni-app-ele/uni-app-ele/common/config.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.key = void 0;




var key = '6112dbea4307dbaa7acbea5deb7c1b50';exports.key = key;

/***/ }),

/***/ 13:
/*!*********************************************************************************!*\
  !*** /Users/yan/webserver/git/uniapp/uni-app-ele/uni-app-ele/common/amap-wx.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function AMapWX(a) {this.key = a.key, this.requestConfig = { key: a.key, s: "rsx", platform: "WXJS", appname: a.key, sdkversion: "1.2.0", logversion: "2.0" };}AMapWX.prototype.getWxLocation = function (a, b) {wx.getLocation({ type: "gcj02", success: function success(a) {var c = a.longitude + "," + a.latitude;wx.setStorage({ key: "userLocation", data: c }), b(c);}, fail: function fail(c) {wx.getStorage({ key: "userLocation", success: function success(a) {a.data && b(a.data);} }), a.fail({ errCode: "0", errMsg: c.errMsg || "" });} });}, AMapWX.prototype.getRegeo = function (a) {function c(c) {var d = b.requestConfig;wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: c, extensions: "all", s: d.s, platform: d.platform, appname: b.key, sdkversion: d.sdkversion, logversion: d.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var d, e, f, g, h, i, j, k, l;b.data.status && "1" == b.data.status ? (d = b.data.regeocode, e = d.addressComponent, f = [], g = "", d && d.roads[0] && d.roads[0].name && (g = d.roads[0].name + "附近"), h = c.split(",")[0], i = c.split(",")[1], d.pois && d.pois[0] && (g = d.pois[0].name + "附近", j = d.pois[0].location, j && (h = parseFloat(j.split(",")[0]), i = parseFloat(j.split(",")[1]))), e.provice && f.push(e.provice), e.city && f.push(e.city), e.district && f.push(e.district), e.streetNumber && e.streetNumber.street && e.streetNumber.number ? (f.push(e.streetNumber.street), f.push(e.streetNumber.number)) : (k = "", d && d.roads[0] && d.roads[0].name && (k = d.roads[0].name), f.push(k)), f = f.join(""), l = [{ iconPath: a.iconPath, width: a.iconWidth, height: a.iconHeight, name: f, desc: g, longitude: h, latitude: i, id: 0, regeocodeData: d }], a.success(l)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this;a.location ? c(a.location) : b.getWxLocation(a, function (a) {c(a);});}, AMapWX.prototype.getWeather = function (a) {function d(d) {var e = "base";a.type && "forecast" == a.type && (e = "all"), wx.request({ url: "https://restapi.amap.com/v3/weather/weatherInfo", data: { key: b.key, city: d, extensions: e, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {function c(a) {var b = { city: { text: "城市", data: a.city }, weather: { text: "天气", data: a.weather }, temperature: { text: "温度", data: a.temperature }, winddirection: { text: "风向", data: a.winddirection + "风" }, windpower: { text: "风力", data: a.windpower + "级" }, humidity: { text: "湿度", data: a.humidity + "%" } };return b;}var d, e;b.data.status && "1" == b.data.status ? b.data.lives ? (d = b.data.lives, d && d.length > 0 && (d = d[0], e = c(d), e["liveData"] = d, a.success(e))) : b.data.forecasts && b.data.forecasts[0] && a.success({ forecast: b.data.forecasts[0] }) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}function e(e) {wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: e, extensions: "all", s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, e;b.data.status && "1" == b.data.status ? (e = b.data.regeocode, e.addressComponent ? c = e.addressComponent.adcode : e.aois && e.aois.length > 0 && (c = e.aois[0].adcode), d(c)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.city ? d(a.city) : b.getWxLocation(a, function (a) {e(a);});}, AMapWX.prototype.getPoiAround = function (a) {function d(d) {var e = { key: b.key, location: d, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.querytypes && (e["types"] = a.querytypes), a.querykeywords && (e["keywords"] = a.querykeywords), wx.request({ url: "https://restapi.amap.com/v3/place/around", data: e, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, d, e, f;if (b.data.status && "1" == b.data.status) {if (b = b.data, b && b.pois) {for (c = [], d = 0; d < b.pois.length; d++) {e = 0 == d ? a.iconPathSelected : a.iconPath, c.push({ latitude: parseFloat(b.pois[d].location.split(",")[1]), longitude: parseFloat(b.pois[d].location.split(",")[0]), iconPath: e, width: 22, height: 32, id: d, name: b.pois[d].name, address: b.pois[d].address });}f = { markers: c, poisData: b.pois }, a.success(f);}} else a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.location ? d(a.location) : b.getWxLocation(a, function (a) {d(a);});}, AMapWX.prototype.getStaticmap = function (a) {function f(b) {c.push("location=" + b), a.zoom && c.push("zoom=" + a.zoom), a.size && c.push("size=" + a.size), a.scale && c.push("scale=" + a.scale), a.markers && c.push("markers=" + a.markers), a.labels && c.push("labels=" + a.labels), a.paths && c.push("paths=" + a.paths), a.traffic && c.push("traffic=" + a.traffic);var e = d + c.join("&");a.success({ url: e });}var e,b = this,c = [],d = "https://restapi.amap.com/v3/staticmap?";c.push("key=" + b.key), e = b.requestConfig, c.push("s=" + e.s), c.push("platform=" + e.platform), c.push("appname=" + e.appname), c.push("sdkversion=" + e.sdkversion), c.push("logversion=" + e.logversion), a.location ? f(a.location) : b.getWxLocation(a, function (a) {f(a);});}, AMapWX.prototype.getInputtips = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.location && (d["location"] = a.location), a.keywords && (d["keywords"] = a.keywords), a.type && (d["type"] = a.type), a.city && (d["city"] = a.city), a.citylimit && (d["citylimit"] = a.citylimit), wx.request({ url: "https://restapi.amap.com/v3/assistant/inputtips", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.tips && a.success({ tips: b.data.tips });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getDrivingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.waypoints && (d["waypoints"] = a.waypoints), a.avoidpolygons && (d["avoidpolygons"] = a.avoidpolygons), a.avoidroad && (d["avoidroad"] = a.avoidroad), wx.request({ url: "https://restapi.amap.com/v3/direction/driving", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths, taxi_cost: b.data.route.taxi_cost || "" });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getWalkingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v3/direction/walking", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getTransitRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.city && (d["city"] = a.city), a.cityd && (d["cityd"] = a.cityd), wx.request({ url: "https://restapi.amap.com/v3/direction/transit/integrated", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {if (b && b.data && b.data.route) {var c = b.data.route;a.success({ distance: c.distance || "", taxi_cost: c.taxi_cost || "", transits: c.transits });}}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getRidingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v4/direction/bicycling", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.data && a.success({ paths: b.data.data.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, module.exports.AMapWX = AMapWX;

/***/ }),

/***/ 14:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 17:
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

/***/ 18:
/*!******************************************************************************!*\
  !*** /Users/yan/webserver/git/uniapp/uni-app-ele/uni-app-ele/store/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 14));
var _state = _interopRequireDefault(__webpack_require__(/*! ./state */ 19));
var _mutations = _interopRequireDefault(__webpack_require__(/*! ./mutations */ 21));
var getters = _interopRequireWildcard(__webpack_require__(/*! ./getters */ 23));
var actions = _interopRequireWildcard(__webpack_require__(/*! ./actions */ 24));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);var _default =

new _vuex.default.Store({
  state: _state.default,
  mutations: _mutations.default,
  getters: getters,
  actions: actions });exports.default = _default;

/***/ }),

/***/ 19:
/*!******************************************************************************!*\
  !*** /Users/yan/webserver/git/uniapp/uni-app-ele/uni-app-ele/store/state.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _cache = __webpack_require__(/*! ../common/cache.js */ 20);
// console.log('state')
// console.log(loadOrderInfo())
var state = {
  city: '定位',
  locationAddr: '',
  address: {},
  watchOption: false,
  orderInfo: (0, _cache.loadOrderInfo)(),
  userInfo: null,
  remarkInfo: {
    tableware: '',
    remark: '' } };var _default =


state;exports.default = _default;

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
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
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
      while (vm) {
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
        tree.push(vm);
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
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
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
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
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
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
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
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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

  Vue.config.errorHandler = function(err) {
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
    //TODO 暂不考虑 string,number
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
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
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
/*!*******************************************************************************!*\
  !*** /Users/yan/webserver/git/uniapp/uni-app-ele/uni-app-ele/common/cache.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.saveOrderInfo = saveOrderInfo;exports.loadOrderInfo = loadOrderInfo;function saveOrderInfo(orderInfo) {

  try {
    uni.setStorageSync('orderInfo', orderInfo);
    return orderInfo;
  } catch (e) {
    return null;
  }

}

function loadOrderInfo() {
  try {
    var value = uni.getStorageSync('orderInfo');
    if (value) {
      console.log('value');
      console.log(value);

      return value;
      // return value
    }
  } catch (e) {
    console.log(1);
    return null;
  }

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 203:
/*!******************************************************************************!*\
  !*** /Users/yan/webserver/git/uniapp/uni-app-ele/uni-app-ele/utils/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.debounce = debounce;function debounce(func, delay) {
  var timer;
  return function () {var _this = this;for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}
    // console.log(args)
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      func.apply(_this, args);
    }, delay);
  };
}

/***/ }),

/***/ 21:
/*!**********************************************************************************!*\
  !*** /Users/yan/webserver/git/uniapp/uni-app-ele/uni-app-ele/store/mutations.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var types = _interopRequireWildcard(__webpack_require__(/*! ./mutation-types.js */ 22));var _mutations;function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var mutations = (_mutations = {}, _defineProperty(_mutations,
types.SET_CITY, function (state, city) {
  state.city = city;
}), _defineProperty(_mutations,

types.SET_LOCATIONADDR, function (state, locationAddr) {
  state.locationAddr = locationAddr;
}), _defineProperty(_mutations,

types.SET_ADDRESS, function (state, address) {
  state.address = address;
}), _defineProperty(_mutations,

types.SET_WATCHOPTION, function (state, watchOption) {
  state.watchOption = watchOption;
}), _defineProperty(_mutations,

types.SET_ORDER_INFO, function (state, orderInfo) {
  state.orderInfo = orderInfo;
}), _defineProperty(_mutations,

types.SET_REMARK_INFO, function (state, remarkInfo) {
  state.remarkInfo = remarkInfo;
}), _defineProperty(_mutations,

types.SET_USER_INFO, function (state, userInfo) {
  state.userInfo = userInfo;
}), _mutations);var _default =




mutations;exports.default = _default;

/***/ }),

/***/ 22:
/*!***************************************************************************************!*\
  !*** /Users/yan/webserver/git/uniapp/uni-app-ele/uni-app-ele/store/mutation-types.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.SET_USER_INFO = exports.SET_REMARK_INFO = exports.SET_ORDER_INFO = exports.SET_WATCHOPTION = exports.SET_ADDRESS = exports.SET_LOCATIONADDR = exports.SET_CITY = void 0;var SET_CITY = 'SET_CITY';exports.SET_CITY = SET_CITY;

var SET_LOCATIONADDR = 'SET_LOCATIONADDR';exports.SET_LOCATIONADDR = SET_LOCATIONADDR;

var SET_ADDRESS = 'SET_ADDRESS';exports.SET_ADDRESS = SET_ADDRESS;

var SET_WATCHOPTION = 'SET_WATCHOPTION';exports.SET_WATCHOPTION = SET_WATCHOPTION;

var SET_ORDER_INFO = 'SET_ORDER_INFO';exports.SET_ORDER_INFO = SET_ORDER_INFO;

var SET_REMARK_INFO = 'SET_REMARK_INFO';exports.SET_REMARK_INFO = SET_REMARK_INFO;

var SET_USER_INFO = 'SET_USER_INFO';exports.SET_USER_INFO = SET_USER_INFO;

/***/ }),

/***/ 23:
/*!********************************************************************************!*\
  !*** /Users/yan/webserver/git/uniapp/uni-app-ele/uni-app-ele/store/getters.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.remarkInfo = exports.userInfo = exports.totalPrice = exports.orderInfo = exports.watchOption = exports.address = exports.locationAddr = exports.city = void 0;var city = function city(state) {return state.city;};exports.city = city;

var locationAddr = function locationAddr(state) {return state.locationAddr;};exports.locationAddr = locationAddr;

var address = function address(state) {return state.address;};exports.address = address;

var watchOption = function watchOption(state) {return state.watchOption;};exports.watchOption = watchOption;

var orderInfo = function orderInfo(state) {return state.orderInfo;};exports.orderInfo = orderInfo;

var totalPrice = function totalPrice(state) {
  var price = 0;
  if (state.orderInfo) {
    var selectFoods = state.orderInfo.selectFoods;
    selectFoods.forEach(function (food) {
      price += food.food_price * food.food_count;
    });
    price += state.orderInfo.shopInfo.float_delivery_fee;
  }
  return price;
};exports.totalPrice = totalPrice;

var userInfo = function userInfo(state) {return state.userInfo;};exports.userInfo = userInfo;

var remarkInfo = function remarkInfo(state) {return state.remarkInfo;};exports.remarkInfo = remarkInfo;

/***/ }),

/***/ 232:
/*!********************************************************************************!*\
  !*** /Users/yan/webserver/git/uniapp/uni-app-ele/uni-app-ele/common/mixins.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.cartControlMixin = void 0;var _vuex = __webpack_require__(/*! vuex */ 14);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}




var cartControlMixin = {
  computed: _objectSpread({},
  (0, _vuex.mapGetters)(['watchOption'])),

  methods: _objectSpread({},
  (0, _vuex.mapMutations)({
    setWatchOption: 'SET_WATCHOPTION' }), {

    add: function add(item, count) {
      this.joinCart(item, count);
      // this.sum();
    },
    sub: function sub(item, count) {
      var that = this;
      if (count <= 0) {
        // 更新storage
        uni.getStorage({
          key: "goodsList",
          success: function success(res) {
            var goodsList = res.data;
            // 本地删除选中商品
            goodsList.forEach(function (goods, index) {
              if (goods.food_id == item.food_id) {
                goodsList.splice(index, 1);
              }
            });
            that.setGoodsList(goodsList);
            // uni.setStorageSync("goodsList", goodsList);
            // that.setWatchOption(!that.watchOption)
          } });

      } else {
        this.joinCart(item, count);
      }
      // this.sum();
    },
    joinCart: function joinCart(item, count) {var _this = this;

      var parm = {
        'food_id': item.food_id,
        'food_name': item.food_name,
        'food_image': item.food_image,
        'food_count': count,
        'food_price': item.food_price };

      // 1.先去本地存储中取
      uni.getStorage({
        key: "goodsList",
        success: function success(res) {
          // 拿数据
          var goodsList = res.data;
          // 查找商品是否存在
          var isExist = false;
          goodsList.forEach(function (goods) {
            if (goods.food_id == parm.food_id) {
              // 如果存在  修改商品数量
              goods.food_count = Number(parm.food_count);
              isExist = true;
            }
          });
          if (!isExist) {// 不存在，存入数组
            goodsList.push(parm);
          }
          _this.setGoodsList(goodsList);
        },
        fail: function fail(err) {// 没有得到数据,那么就存
          // console.log("加入失败")
          var goodsList = [];
          goodsList.push(parm);

          // 往本地存储中存储数据
          _this.setGoodsList(goodsList);
        } });


    },
    setGoodsList: function setGoodsList(goodsList) {
      // console.log("存储到本地存储中")
      // 存储到本地存储中
      var that = this;
      uni.setStorage({
        key: 'goodsList',
        data: goodsList,
        success: function success() {
          that.setWatchOption(!that.watchOption);
        } });

    } }) };exports.cartControlMixin = cartControlMixin;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 24:
/*!********************************************************************************!*\
  !*** /Users/yan/webserver/git/uniapp/uni-app-ele/uni-app-ele/store/actions.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.setUserInfo = exports.setOrderInfo = void 0;var types = _interopRequireWildcard(__webpack_require__(/*! ./mutation-types */ 22));
var _cache = __webpack_require__(/*! ../common/cache.js */ 20);function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}



var setOrderInfo = function setOrderInfo(_ref,

orderInfo) {var commit = _ref.commit;
  commit(types.SET_ORDER_INFO, (0, _cache.saveOrderInfo)(orderInfo));
};exports.setOrderInfo = setOrderInfo;

var setUserInfo = function setUserInfo(_ref2,

userInfo) {var commit = _ref2.commit;
  commit(types.SET_USER_INFO, userInfo);
};exports.setUserInfo = setUserInfo;

/***/ }),

/***/ 25:
/*!******************************************************************************!*\
  !*** /Users/yan/webserver/git/uniapp/uni-app-ele/uni-app-ele/utils/https.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = function (param) {
  var url = param.url;
  var method = param.method;
  var header = param.header || {};
  var data = param.data || {};

  //请求的方式： GET POST
  if (method) {
    method = method.toUpperCase(); // 小写转成大写
    if (method == "POST" || method == 'DELETE') {
      header = {
        "content-type": "application/x-www-form-urlencoded" };

    }
  }

  // 发起请求 加载动画
  if (!param.hideLoading) {
    uni.showLoading({
      // title: "加载中..."
    });
  }

  //发起网络请求
  uni.request({
    url: url,
    method: method || "GET",
    header: header,
    data: data,
    success: function success(res) {
      if (res.statusCode && res.statusCode != '200') {//请求api错误
        uni.showModal({
          content: res.msg });

        return;
      }
      typeof param.success == 'function' && param.success(res.data);
    },
    fail: function fail(e) {
      console.log(e);
      uni.showModal({
        content: e.errMsg });

      typeof param.fail == 'function' && param.fail(res.data);
    },
    complete: function complete() {
      console.log('complete');
      uni.hideLoading();
      typeof param.complete == 'function' && param.complete(res.data);
      return;
    } });

};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

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

/***/ 32:
/*!***********************************************************************************!*\
  !*** /Users/yan/webserver/git/uniapp/uni-app-ele/uni-app-ele/utils/interfaces.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var domain = "https://ele-interface.herokuapp.com/api/";

var interfaces = {
  // 获取城市数据
  getCityData: domain + "posts/cities",
  // 获取banner数据
  getBanner: domain + "profile/shopping",
  // 获取商家列表筛选数据
  getfilter: domain + 'profile/filter',
  // 商家列表详情信息
  getShoplists: domain + "profile/restaurants",
  //商家详情信息
  getShops: domain + 'profile/batch_shop',

  //获取用户设置的地址
  getUserAddress: domain + 'user/user_info',

  deletAddress: domain + 'user/address',

  addAddress: domain + 'user/add_address',

  editAddress: domain + 'user/edit_address',

  sms_back: domain + 'posts/sms_back',

  sms_send: domain + 'posts/sms_send',

  seller: domain + 'profile/seller',

  comments: domain + 'profile/comments',

  uploadFace: domain + '' };

module.exports = interfaces;

/***/ }),

/***/ 4:
/*!**************************************************************************!*\
  !*** /Users/yan/webserver/git/uniapp/uni-app-ele/uni-app-ele/pages.json ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 47:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 48);

/***/ }),

/***/ 48:
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

module.exports = __webpack_require__(/*! ./runtime */ 49);

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

/***/ 49:
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

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _createSuper(Derived) {return function () {var Super = _getPrototypeOf(Derived),result;if (_isNativeReflectConstruct()) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);var _super = _createSuper(Stat);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _super.call(this);
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-26920200424005","_inBundle":false,"_integrity":"sha512-FT8Z/C5xSmIxooqhV1v69jTkxATPz+FsRQIFOrbdlWekjGkrE73jfrdNMWm7gL5u41ALPJTVArxN1Re9by1bjQ==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-26920200424005.tgz","_shasum":"47f4375095eda3089cf4678b4b96fc656a7ab623","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"94494d54ed23e2dcf9ab8e3245b48b770b4e98a9","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-26920200424005"};

/***/ }),

/***/ 66:
/*!*******************************************************************************!*\
  !*** /Users/yan/webserver/git/uniapp/uni-app-ele/uni-app-ele/mock/citys.json ***!
  \*******************************************************************************/
/*! exports provided: S, H, N, G, X, T, Q, W, C, F, Y, P, J, L, Z, B, D, K, M, R, A, E, hotCities, default */
/***/ (function(module) {

module.exports = {"S":[{"id":1,"name":"上海","abbr":"SH","area_code":"021","sort":1,"latitude":31.23037,"longitude":121.473701,"is_map":true,"pinyin":"shanghai"},{"id":31,"name":"石家庄","abbr":"SJZ","area_code":"0311","sort":17,"latitude":38.042759,"longitude":114.514297,"is_map":true,"pinyin":"shijiazhuang"},{"id":401,"name":"三门峡","abbr":"SMX","area_code":"0398","sort":1900,"latitude":34.77261,"longitude":111.200302,"is_map":true,"pinyin":"sanmenxia"},{"id":8,"name":"苏州","abbr":"SZ","area_code":"0512","sort":2000,"latitude":31.29834,"longitude":120.583191,"is_map":true,"pinyin":"suzhou"},{"id":11,"name":"深圳","abbr":"SZ","area_code":"0755","sort":2000,"latitude":22.54286,"longitude":114.059563,"is_map":true,"pinyin":"shenzhen"},{"id":16,"name":"沈阳","abbr":"SY","area_code":"024","sort":2000,"latitude":41.80563,"longitude":123.432358,"is_map":true,"pinyin":"shenyang"},{"id":69,"name":"绍兴","abbr":"SX","area_code":"0575","sort":2000,"latitude":30.030331,"longitude":120.5802,"is_map":true,"pinyin":"shaoxing"},{"id":72,"name":"韶关","abbr":"SG","area_code":"0751","sort":2000,"latitude":24.81039,"longitude":113.597229,"is_map":true,"pinyin":"shaoguan"},{"id":97,"name":"上饶","abbr":"SR","area_code":"0793","sort":2000,"latitude":28.45463,"longitude":117.943573,"is_map":true,"pinyin":"shangrao"},{"id":135,"name":"宿州","abbr":"SZ","area_code":"0557","sort":2000,"latitude":33.646141,"longitude":116.963913,"is_map":true,"pinyin":"suzhou"},{"id":165,"name":"三亚","abbr":"SY","area_code":"460200","sort":2000,"latitude":18.25248,"longitude":109.512093,"is_map":true,"pinyin":"sanya"},{"id":171,"name":"四平","abbr":"SP","area_code":"0434","sort":2000,"latitude":43.166458,"longitude":124.350357,"is_map":true,"pinyin":"siping"},{"id":173,"name":"邵阳","abbr":"SY","area_code":"0739","sort":2000,"latitude":27.238899,"longitude":111.467697,"is_map":true,"pinyin":"shaoyang"},{"id":196,"name":"十堰","abbr":"SY","area_code":"0719","sort":2000,"latitude":32.615768,"longitude":110.18734,"is_map":true,"pinyin":"shiyan"},{"id":200,"name":"汕头","abbr":"ST","area_code":"0754","sort":2000,"latitude":23.3535,"longitude":116.682213,"is_map":true,"pinyin":"shantou"},{"id":206,"name":"宿迁","abbr":"SQ","area_code":"0527","sort":2000,"latitude":33.961929,"longitude":118.27549,"is_map":true,"pinyin":"suqian"},{"id":228,"name":"绥化","abbr":"SH","area_code":"0455","sort":2000,"latitude":46.652458,"longitude":126.969322,"is_map":true,"pinyin":"suihua"},{"id":253,"name":"商丘","abbr":"SQ","area_code":"0370","sort":2000,"latitude":34.414268,"longitude":115.656349,"is_map":true,"pinyin":"shangqiu"},{"id":258,"name":"石河子","abbr":"SHZ","area_code":"0993","sort":2000,"latitude":44.30653,"longitude":86.078934,"is_map":true,"pinyin":"shihezi"},{"id":270,"name":"三明","abbr":"SM","area_code":"0598","sort":2000,"latitude":26.263849,"longitude":117.639221,"is_map":true,"pinyin":"sanming"},{"id":291,"name":"遂宁","abbr":"SNS","area_code":"0825","sort":2000,"latitude":30.53286,"longitude":105.592728,"is_map":true,"pinyin":"suiningshi"},{"id":329,"name":"石狮","abbr":"SS","area_code":"05951","sort":2000,"latitude":24.73172,"longitude":118.648048,"is_map":true,"pinyin":"shishi"},{"id":392,"name":"朔州","abbr":"SZ","area_code":"0349","sort":2000,"latitude":39.331589,"longitude":112.431808,"is_map":true,"pinyin":"shuozhou"},{"id":447,"name":"沙坪坝","abbr":"SPB","area_code":"10025","sort":2000,"latitude":29.540979,"longitude":106.457733,"is_map":true,"pinyin":"shapingba"},{"id":458,"name":"寿县","abbr":"SX","area_code":"200004","sort":2000,"latitude":32.573318,"longitude":116.787079,"is_map":true,"pinyin":"shouxian"},{"id":467,"name":"舒城","abbr":"SC","area_code":"200013","sort":2000,"latitude":31.46209,"longitude":116.9487,"is_map":true,"pinyin":"shucheng"},{"id":473,"name":"濉溪","abbr":"SX","area_code":"200019","sort":2000,"latitude":33.915371,"longitude":116.766197,"is_map":true,"pinyin":"suixi"},{"id":513,"name":"邵武","abbr":"SW","area_code":"200059","sort":2000,"latitude":27.340361,"longitude":117.492531,"is_map":true,"pinyin":"shaowu"},{"id":542,"name":"四会","abbr":"SH","area_code":"200088","sort":2000,"latitude":23.327431,"longitude":112.734039,"is_map":true,"pinyin":"sihui"},{"id":544,"name":"汕尾","abbr":"SW","area_code":"200090","sort":2000,"latitude":22.78566,"longitude":115.375137,"is_map":true,"pinyin":"shanwei"},{"id":560,"name":"遂溪","abbr":"SX","area_code":"200106","sort":2000,"latitude":21.377081,"longitude":110.250061,"is_map":true,"pinyin":"suixi"},{"id":604,"name":"沙河","abbr":"SH","area_code":"200150","sort":2000,"latitude":36.85516,"longitude":114.503319,"is_map":true,"pinyin":"shahe"},{"id":605,"name":"涉县","abbr":"SX","area_code":"200151","sort":2000,"latitude":36.584949,"longitude":113.691422,"is_map":true,"pinyin":"shexian"},{"id":609,"name":"深州","abbr":"SZ","area_code":"200155","sort":2000,"latitude":38.000221,"longitude":115.560013,"is_map":true,"pinyin":"shenzhou"},{"id":631,"name":"上蔡","abbr":"SC","area_code":"200177","sort":2000,"latitude":33.26255,"longitude":114.264351,"is_map":true,"pinyin":"shangcai"},{"id":646,"name":"沈丘","abbr":"SQ","area_code":"200192","sort":2000,"latitude":33.409401,"longitude":115.098557,"is_map":true,"pinyin":"shenqiu"},{"id":656,"name":"商水","abbr":"SS","area_code":"200202","sort":2000,"latitude":33.542561,"longitude":114.611649,"is_map":true,"pinyin":"shangshui"},{"id":658,"name":"社旗","abbr":"SQ","area_code":"200204","sort":2000,"latitude":33.056141,"longitude":112.947929,"is_map":true,"pinyin":"sheqi"},{"id":699,"name":"双鸭山","abbr":"SYS","area_code":"200245","sort":2000,"latitude":46.64658,"longitude":131.159103,"is_map":true,"pinyin":"shuangyashan"},{"id":702,"name":"尚志","abbr":"SZ","area_code":"200248","sort":2000,"latitude":45.211021,"longitude":127.960274,"is_map":true,"pinyin":"shangzhi"},{"id":704,"name":"双城","abbr":"SC","area_code":"200250","sort":2000,"latitude":45.383549,"longitude":126.312271,"is_map":true,"pinyin":"shuangcheng"},{"id":721,"name":"松滋","abbr":"SZ","area_code":"200267","sort":2000,"latitude":30.1696,"longitude":111.767433,"is_map":true,"pinyin":"songzi"},{"id":733,"name":"石首","abbr":"SS","area_code":"200279","sort":2000,"latitude":29.72085,"longitude":112.425499,"is_map":true,"pinyin":"shishou"},{"id":747,"name":"随县","abbr":"SX","area_code":"200293","sort":2000,"latitude":31.8538,"longitude":113.29995,"is_map":true,"pinyin":"suixian"},{"id":748,"name":"沙洋","abbr":"SY","area_code":"200294","sort":2000,"latitude":30.709181,"longitude":112.588539,"is_map":true,"pinyin":"shayang"},{"id":754,"name":"邵东","abbr":"SD","area_code":"200300","sort":2000,"latitude":27.25844,"longitude":111.744461,"is_map":true,"pinyin":"shaodong"},{"id":790,"name":"石门","abbr":"SM","area_code":"200336","sort":2000,"latitude":29.584129,"longitude":111.379822,"is_map":true,"pinyin":"shimen"},{"id":791,"name":"双峰","abbr":"SF","area_code":"200337","sort":2000,"latitude":27.45702,"longitude":112.193916,"is_map":true,"pinyin":"shuangfeng"},{"id":808,"name":"舒兰","abbr":"SL","area_code":"200354","sort":2000,"latitude":44.405861,"longitude":126.965317,"is_map":true,"pinyin":"shulan"},{"id":819,"name":"双辽","abbr":"SL","area_code":"200365","sort":2000,"latitude":43.518452,"longitude":123.50296,"is_map":true,"pinyin":"shuangliao"},{"id":826,"name":"沭阳","abbr":"SY","area_code":"200372","sort":2000,"latitude":34.112148,"longitude":118.804062,"is_map":true,"pinyin":"shuyang"},{"id":845,"name":"射阳","abbr":"SY","area_code":"200391","sort":2000,"latitude":33.77496,"longitude":120.258148,"is_map":true,"pinyin":"sheyang"},{"id":847,"name":"泗洪","abbr":"SH","area_code":"200393","sort":2000,"latitude":33.459,"longitude":118.21624,"is_map":true,"pinyin":"sihong"},{"id":849,"name":"泗阳","abbr":"SY","area_code":"200395","sort":2000,"latitude":33.721008,"longitude":118.703346,"is_map":true,"pinyin":"siyang"},{"id":889,"name":"上栗","abbr":"SL","area_code":"200435","sort":2000,"latitude":27.880421,"longitude":113.795372,"is_map":true,"pinyin":"shangli"},{"id":910,"name":"绥中","abbr":"SZ","area_code":"200456","sort":2000,"latitude":40.325649,"longitude":120.344307,"is_map":true,"pinyin":"suizhong"},{"id":921,"name":"石嘴山","abbr":"SZS","area_code":"200467","sort":2000,"latitude":38.9841,"longitude":106.384178,"is_map":true,"pinyin":"shizuishan"},{"id":932,"name":"寿光","abbr":"SG","area_code":"200478","sort":2000,"latitude":36.855412,"longitude":118.790977,"is_map":true,"pinyin":"shouguang"},{"id":947,"name":"莘县","abbr":"SX","area_code":"200493","sort":2000,"latitude":36.233608,"longitude":115.670723,"is_map":true,"pinyin":"shenxian"},{"id":1009,"name":"神木","abbr":"SM","area_code":"200555","sort":2000,"latitude":38.842388,"longitude":110.498962,"is_map":true,"pinyin":"shenmu"},{"id":1011,"name":"双流","abbr":"SL","area_code":"200557","sort":2000,"latitude":30.574471,"longitude":103.923767,"is_map":true,"pinyin":"shuangliu"},{"id":1016,"name":"射洪","abbr":"SH","area_code":"200562","sort":2000,"latitude":30.87113,"longitude":105.388359,"is_map":true,"pinyin":"shehong"},{"id":1040,"name":"三台","abbr":"ST","area_code":"200586","sort":2000,"latitude":31.095631,"longitude":105.094589,"is_map":true,"pinyin":"santai"},{"id":1048,"name":"什邡","abbr":"SF","area_code":"200594","sort":2000,"latitude":31.127359,"longitude":104.166939,"is_map":true,"pinyin":"shifang"},{"id":1089,"name":"上虞","abbr":"SY","area_code":"200635","sort":2000,"latitude":30.03227,"longitude":120.868584,"is_map":true,"pinyin":"shangyu"},{"id":1094,"name":"嵊州","abbr":"SZ","area_code":"200640","sort":2000,"latitude":29.58849,"longitude":120.821701,"is_map":true,"pinyin":"shengzhou"},{"id":1113,"name":"三门","abbr":"SM","area_code":"200659","sort":2000,"latitude":29.10467,"longitude":121.395683,"is_map":true,"pinyin":"sanmen"},{"id":1140,"name":"顺平","abbr":"SP","area_code":"130636","sort":2000,"latitude":38.837589,"longitude":115.135429,"is_map":false,"pinyin":"shunping"},{"id":347,"name":"三河","abbr":"SH","area_code":"03161","sort":9999,"latitude":39.98246,"longitude":117.078217,"is_map":true,"pinyin":"sanhe"},{"id":361,"name":"松原","abbr":"SY","area_code":"04381","sort":9999,"latitude":45.141102,"longitude":124.82515,"is_map":true,"pinyin":"songyuan"},{"id":383,"name":"随州","abbr":"SZ","area_code":"0722","sort":9999,"latitude":31.69013,"longitude":113.382622,"is_map":true,"pinyin":"suizhou"},{"id":1160,"name":"沙县","abbr":"SX","area_code":"350427","sort":9999,"latitude":26.39617,"longitude":117.792679,"is_map":true,"pinyin":"shaxian"},{"id":1163,"name":"绥棱","abbr":"SL","area_code":"231226","sort":9999,"latitude":47.236092,"longitude":127.114777,"is_map":true,"pinyin":"suiling"},{"id":1221,"name":"尚义","abbr":"SY","area_code":"130725","sort":9999,"latitude":41.08009,"longitude":113.977715,"is_map":true,"pinyin":"shangyi"},{"id":1241,"name":"肃宁","abbr":"SN","area_code":"130926","sort":9999,"latitude":38.427101,"longitude":115.835854,"is_map":true,"pinyin":"suning"},{"id":1389,"name":"商都","abbr":"SD","area_code":"150923","sort":9999,"latitude":41.560162,"longitude":113.560646,"is_map":true,"pinyin":"shangdu"},{"id":1395,"name":"四子王旗","abbr":"SZWQ","area_code":"150929","sort":9999,"latitude":41.528114,"longitude":111.701233,"is_map":true,"pinyin":"siziwangqi"},{"id":1406,"name":"苏尼特左旗","abbr":"SNTZQ","area_code":"152523","sort":9999,"latitude":43.854107,"longitude":113.653412,"is_map":true,"pinyin":"sunitezuoqi"},{"id":1407,"name":"苏尼特右旗","abbr":"SNTYQ","area_code":"152524","sort":9999,"latitude":42.746662,"longitude":112.655388,"is_map":true,"pinyin":"suniteyouqi"},{"id":1481,"name":"绥滨","abbr":"SB","area_code":"230422","sort":9999,"latitude":47.28989,"longitude":131.860519,"is_map":true,"pinyin":"suibin"},{"id":1499,"name":"绥芬河","abbr":"SFH","area_code":"231080","sort":9999,"latitude":44.396866,"longitude":131.164856,"is_map":true,"pinyin":"suifenhe"},{"id":1504,"name":"孙吴","abbr":"SW","area_code":"231124","sort":9999,"latitude":49.423943,"longitude":127.327316,"is_map":true,"pinyin":"sunwu"},{"id":1521,"name":"嵊泗","abbr":"SS","area_code":"330922","sort":9999,"latitude":30.727165,"longitude":122.457809,"is_map":true,"pinyin":"shengsi"},{"id":1522,"name":"遂昌","abbr":"SC","area_code":"331123","sort":9999,"latitude":28.5924,"longitude":119.275887,"is_map":true,"pinyin":"suichang"},{"id":1523,"name":"松阳","abbr":"SY","area_code":"331124","sort":9999,"latitude":28.449938,"longitude":119.485291,"is_map":true,"pinyin":"songyang"},{"id":1533,"name":"宿松","abbr":"SS","area_code":"340826","sort":9999,"latitude":30.158327,"longitude":116.120201,"is_map":true,"pinyin":"susong"},{"id":1561,"name":"顺昌","abbr":"SC","area_code":"350721","sort":9999,"latitude":26.79285,"longitude":117.807709,"is_map":true,"pinyin":"shunchang"},{"id":1563,"name":"松溪","abbr":"SX","area_code":"350724","sort":9999,"latitude":27.525785,"longitude":118.783493,"is_map":true,"pinyin":"songxi"},{"id":1565,"name":"上杭县","abbr":"SHX","area_code":"350823","sort":9999,"latitude":25.049431,"longitude":116.420258,"is_map":true,"pinyin":"shanghangxian"},{"id":1570,"name":"寿宁","abbr":"SN","area_code":"350924","sort":9999,"latitude":27.457798,"longitude":119.506737,"is_map":true,"pinyin":"shouning"},{"id":1582,"name":"深泽县","abbr":"SZX","area_code":"130128","sort":9999,"latitude":38.18454,"longitude":115.200211,"is_map":true,"pinyin":"shenze"},{"id":1587,"name":"上犹","abbr":"SY","area_code":"360724","sort":9999,"latitude":25.794285,"longitude":114.540535,"is_map":true,"pinyin":"shangyou"},{"id":1593,"name":"石城县","abbr":"SCX","area_code":"360735","sort":9999,"latitude":26.326582,"longitude":116.342247,"is_map":true,"pinyin":"shicheng"},{"id":1598,"name":"遂川县","abbr":"SCX","area_code":"360827","sort":9999,"latitude":26.323706,"longitude":114.516891,"is_map":true,"pinyin":"suichuan"},{"id":1604,"name":"上高","abbr":"SG","area_code":"360923","sort":9999,"latitude":28.234789,"longitude":114.932655,"is_map":true,"pinyin":"shanggao"},{"id":1625,"name":"商河","abbr":"SH","area_code":"370126","sort":9999,"latitude":37.310543,"longitude":117.156372,"is_map":true,"pinyin":"shanghe"},{"id":1632,"name":"泗水","abbr":"SS","area_code":"370831","sort":9999,"latitude":35.653217,"longitude":117.273605,"is_map":true,"pinyin":"sishui"},{"id":1643,"name":"嵩县","abbr":"SX","area_code":"410325","sort":9999,"latitude":34.131561,"longitude":112.087769,"is_map":true,"pinyin":"songxian"},{"id":1664,"name":"陕县","abbr":"SX","area_code":"411222","sort":9999,"latitude":34.701946,"longitude":111.090828,"is_map":true,"pinyin":"shanxian"},{"id":1671,"name":"商城","abbr":"SC","area_code":"411524","sort":9999,"latitude":31.799982,"longitude":115.406296,"is_map":true,"pinyin":"shangcheng"},{"id":1703,"name":"韶山","abbr":"SS","area_code":"430382","sort":9999,"latitude":27.922682,"longitude":112.528481,"is_map":true,"pinyin":"shaoshan"},{"id":1706,"name":"邵阳县","abbr":"SYX","area_code":"430523","sort":9999,"latitude":26.989714,"longitude":111.275703,"is_map":true,"pinyin":"shaoyang"},{"id":1715,"name":"双牌","abbr":"SP","area_code":"431123","sort":9999,"latitude":25.959396,"longitude":111.662148,"is_map":true,"pinyin":"shuangpai"},{"id":1769,"name":"上林","abbr":"SL","area_code":"450125","sort":9999,"latitude":23.431768,"longitude":108.603935,"is_map":true,"pinyin":"shanglin"},{"id":1777,"name":"三江侗族自治县","abbr":"SJDZZZX","area_code":"450226","sort":9999,"latitude":25.78553,"longitude":109.614845,"is_map":true,"pinyin":"sanjiangdongzuzizhixian"},{"id":1795,"name":"上思","abbr":"SS","area_code":"450621","sort":9999,"latitude":22.151423,"longitude":107.98214,"is_map":true,"pinyin":"shangsi"},{"id":1959,"name":"水城","abbr":"SC","area_code":"520221","sort":9999,"latitude":26.540478,"longitude":104.956848,"is_map":true,"pinyin":"shuicheng"},{"id":1962,"name":"绥阳","abbr":"SY","area_code":"520323","sort":9999,"latitude":27.951342,"longitude":107.191025,"is_map":true,"pinyin":"suiyang"},{"id":1980,"name":"石阡","abbr":"SQ","area_code":"520623","sort":9999,"latitude":27.519386,"longitude":108.229851,"is_map":true,"pinyin":"shiqian"},{"id":1981,"name":"思南","abbr":"SN","area_code":"520624","sort":9999,"latitude":27.941332,"longitude":108.255829,"is_map":true,"pinyin":"sinan"},{"id":1985,"name":"松桃苗族自治县","abbr":"STMZZZX","area_code":"520628","sort":9999,"latitude":28.165419,"longitude":109.202629,"is_map":true,"pinyin":"songtaomiaozuzizhixian"},{"id":1996,"name":"施秉","abbr":"SB","area_code":"522623","sort":9999,"latitude":27.034657,"longitude":108.126778,"is_map":true,"pinyin":"shibing"},{"id":1997,"name":"三穗","abbr":"SS","area_code":"522624","sort":9999,"latitude":26.959885,"longitude":108.681122,"is_map":true,"pinyin":"sansui"},{"id":2021,"name":"三都水族自治县","abbr":"SDSZZZX","area_code":"522732","sort":9999,"latitude":25.985184,"longitude":107.877472,"is_map":true,"pinyin":"sandushuizuzizhixian"},{"id":2024,"name":"石林彝族自治县","abbr":"SLYZZZX","area_code":"530126","sort":9999,"latitude":24.754545,"longitude":103.271965,"is_map":true,"pinyin":"shilinyizuzizhixian"},{"id":2025,"name":"嵩明","abbr":"SM","area_code":"530127","sort":9999,"latitude":25.335087,"longitude":103.03878,"is_map":true,"pinyin":"songming"},{"id":2029,"name":"师宗","abbr":"SZ","area_code":"530323","sort":9999,"latitude":24.825682,"longitude":103.993805,"is_map":true,"pinyin":"shizong"},{"id":2038,"name":"施甸","abbr":"SD","area_code":"530521","sort":9999,"latitude":24.730846,"longitude":99.183762,"is_map":true,"pinyin":"shidian"},{"id":2046,"name":"绥江","abbr":"SJ","area_code":"530626","sort":9999,"latitude":28.599953,"longitude":103.961098,"is_map":true,"pinyin":"suijiang"},{"id":2049,"name":"水富","abbr":"SF","area_code":"530630","sort":9999,"latitude":28.629688,"longitude":104.415375,"is_map":true,"pinyin":"shuifu"},{"id":2068,"name":"双江拉祜族佤族布朗族傣族自治县","abbr":"SJLHZWZBLZDZZZX","area_code":"530925","sort":9999,"latitude":23.477476,"longitude":99.824417,"is_map":true,"pinyin":"shuangjianglahuzuwazubulangzudaizuzizhixian"},{"id":2072,"name":"双柏","abbr":"SB","area_code":"532322","sort":9999,"latitude":24.685095,"longitude":101.638237,"is_map":true,"pinyin":"shuangbai"},{"id":2083,"name":"石屏","abbr":"SP","area_code":"532525","sort":9999,"latitude":23.712568,"longitude":102.484467,"is_map":true,"pinyin":"shiping"},{"id":2217,"name":"三原","abbr":"SY","area_code":"610422","sort":9999,"latitude":34.613995,"longitude":108.943481,"is_map":true,"pinyin":"sanyuan"},{"id":2269,"name":"石泉","abbr":"SQ","area_code":"610922","sort":9999,"latitude":33.038513,"longitude":108.250511,"is_map":true,"pinyin":"shiquan"},{"id":2277,"name":"商洛","abbr":"SL","area_code":"611000","sort":9999,"latitude":33.86832,"longitude":109.939774,"is_map":true,"pinyin":"shangluo"},{"id":2280,"name":"商南","abbr":"SN","area_code":"611023","sort":9999,"latitude":33.526367,"longitude":110.885437,"is_map":true,"pinyin":"shangnan"},{"id":2281,"name":"山阳","abbr":"SY","area_code":"611024","sort":9999,"latitude":33.530411,"longitude":109.880432,"is_map":true,"pinyin":"shanyang"},{"id":2299,"name":"肃南裕固族自治县","abbr":"SNYGZZZX","area_code":"620721","sort":9999,"latitude":38.837269,"longitude":99.617088,"is_map":true,"pinyin":"sunanyuguzuzizhixian"},{"id":2303,"name":"山丹","abbr":"SD","area_code":"620725","sort":9999,"latitude":38.78484,"longitude":101.08844,"is_map":true,"pinyin":"shandan"},{"id":5819,"name":"思茅区","abbr":"SMQ","area_code":"530802","sort":9999,"latitude":22.776594,"longitude":100.973228,"is_map":true,"pinyin":"simaoqu"}],"H":[{"id":10,"name":"哈尔滨","abbr":"HEB","area_code":"0451","sort":4,"latitude":45.802158,"longitude":126.535797,"is_map":true,"pinyin":"haerbin"},{"id":2,"name":"杭州","abbr":"HZ","area_code":"0571","sort":8,"latitude":30.274151,"longitude":120.155151,"is_map":true,"pinyin":"hangzhou"},{"id":385,"name":"黄骅","abbr":"HH","area_code":"03172","sort":1900,"latitude":38.371391,"longitude":117.330116,"is_map":true,"pinyin":"huanghua"},{"id":406,"name":"鹤壁","abbr":"HB","area_code":"0392","sort":1900,"latitude":35.747002,"longitude":114.297447,"is_map":true,"pinyin":"hebi"},{"id":17,"name":"合肥","abbr":"HF","area_code":"0551","sort":2000,"latitude":31.82057,"longitude":117.229012,"is_map":true,"pinyin":"hefei"},{"id":53,"name":"淮南","abbr":"HN","area_code":"0554","sort":2000,"latitude":32.625488,"longitude":116.999802,"is_map":true,"pinyin":"huainan"},{"id":57,"name":"惠州","abbr":"HZ","area_code":"0752","sort":2000,"latitude":23.11075,"longitude":114.416786,"is_map":true,"pinyin":"huizhou"},{"id":61,"name":"湖州","abbr":"HZ","area_code":"0572","sort":2000,"latitude":30.893049,"longitude":120.088051,"is_map":true,"pinyin":"huzhou"},{"id":62,"name":"海口","abbr":"HK","area_code":"0898","sort":2000,"latitude":20.04422,"longitude":110.19989,"is_map":true,"pinyin":"haikou"},{"id":92,"name":"呼和浩特","abbr":"HHHT","area_code":"0471","sort":2000,"latitude":40.841492,"longitude":111.751991,"is_map":true,"pinyin":"huhehaote"},{"id":114,"name":"淮安","abbr":"HA","area_code":"0517","sort":2000,"latitude":33.610161,"longitude":119.015953,"is_map":true,"pinyin":"huaian"},{"id":116,"name":"衡阳","abbr":"HY","area_code":"0734","sort":2000,"latitude":26.89324,"longitude":112.571953,"is_map":true,"pinyin":"hengyang"},{"id":133,"name":"怀化","abbr":"HH","area_code":"0745","sort":2000,"latitude":27.56974,"longitude":110.001602,"is_map":true,"pinyin":"huaihua"},{"id":152,"name":"黄石","abbr":"HS","area_code":"0714","sort":2000,"latitude":30.19953,"longitude":115.038902,"is_map":true,"pinyin":"huangshi"},{"id":170,"name":"邯郸","abbr":"HD","area_code":"0310","sort":2000,"latitude":36.625561,"longitude":114.539177,"is_map":true,"pinyin":"handan"},{"id":177,"name":"菏泽","abbr":"HZ","area_code":"0530","sort":2000,"latitude":35.233631,"longitude":115.481148,"is_map":true,"pinyin":"heze"},{"id":199,"name":"黄山","abbr":"HS","area_code":"0559","sort":2000,"latitude":29.71517,"longitude":118.338661,"is_map":true,"pinyin":"huangshan"},{"id":214,"name":"淮北","abbr":"HB","area_code":"0561","sort":2000,"latitude":33.67078,"longitude":116.926224,"is_map":true,"pinyin":"huaibei"},{"id":217,"name":"黄冈","abbr":"HG","area_code":"0713","sort":2000,"latitude":30.45347,"longitude":114.872383,"is_map":true,"pinyin":"huanggang"},{"id":218,"name":"葫芦岛","abbr":"HLD","area_code":"0429","sort":2000,"latitude":40.710999,"longitude":120.83699,"is_map":true,"pinyin":"huludao"},{"id":245,"name":"红河","abbr":"HHZZZ","area_code":"0873","sort":2000,"latitude":23.36907,"longitude":102.420792,"is_map":true,"pinyin":"honghezizhizhou"},{"id":252,"name":"贺州","abbr":"HZ","area_code":"4401002","sort":2000,"latitude":24.40346,"longitude":111.566551,"is_map":true,"pinyin":"hezhou"},{"id":259,"name":"汉中","abbr":"HZ","area_code":"0916","sort":2000,"latitude":33.067612,"longitude":107.023773,"is_map":true,"pinyin":"hanzhong"},{"id":266,"name":"衡水","abbr":"HS","area_code":"0318","sort":2000,"latitude":37.738861,"longitude":115.67054,"is_map":true,"pinyin":"hengshui"},{"id":398,"name":"呼伦贝尔","abbr":"HLBE","area_code":"0470","sort":2000,"latitude":49.211632,"longitude":119.765839,"is_map":true,"pinyin":"hulunbeier"},{"id":432,"name":"合川","abbr":"HC","area_code":"10010","sort":2000,"latitude":29.972879,"longitude":106.276787,"is_map":true,"pinyin":"hechuan"},{"id":433,"name":"河西","abbr":"HX","area_code":"10011","sort":2000,"latitude":39.109539,"longitude":117.223358,"is_map":true,"pinyin":"hexi"},{"id":466,"name":"霍邱","abbr":"HQ","area_code":"200012","sort":2000,"latitude":32.353199,"longitude":116.278229,"is_map":true,"pinyin":"huoqiu"},{"id":471,"name":"怀远","abbr":"HY","area_code":"200017","sort":2000,"latitude":32.9701,"longitude":117.205139,"is_map":true,"pinyin":"huaiyuan"},{"id":478,"name":"和县","abbr":"HX","area_code":"200024","sort":2000,"latitude":31.74423,"longitude":118.351448,"is_map":true,"pinyin":"hexian"},{"id":481,"name":"怀宁","abbr":"HN","area_code":"200027","sort":2000,"latitude":30.73381,"longitude":116.829742,"is_map":true,"pinyin":"huaining"},{"id":488,"name":"霍山","abbr":"HS","area_code":"200034","sort":2000,"latitude":31.39279,"longitude":116.332687,"is_map":true,"pinyin":"huoshan"},{"id":496,"name":"惠安","abbr":"HA","area_code":"200042","sort":2000,"latitude":25.030649,"longitude":118.796951,"is_map":true,"pinyin":"huian"},{"id":535,"name":"海丰","abbr":"HF","area_code":"200081","sort":2000,"latitude":22.96657,"longitude":115.32341,"is_map":true,"pinyin":"haifeng"},{"id":536,"name":"惠来","abbr":"HL","area_code":"200082","sort":2000,"latitude":23.033211,"longitude":116.295113,"is_map":true,"pinyin":"huilai"},{"id":537,"name":"惠东","abbr":"HD","area_code":"200083","sort":2000,"latitude":22.984859,"longitude":114.719994,"is_map":true,"pinyin":"huidong"},{"id":550,"name":"鹤山","abbr":"HS","area_code":"200096","sort":2000,"latitude":22.765301,"longitude":112.964363,"is_map":true,"pinyin":"heshan"},{"id":554,"name":"化州","abbr":"HZ","area_code":"200100","sort":2000,"latitude":21.663971,"longitude":110.639542,"is_map":true,"pinyin":"huazhou"},{"id":633,"name":"淮阳","abbr":"HY","area_code":"200179","sort":2000,"latitude":33.731499,"longitude":114.886139,"is_map":true,"pinyin":"huaiyang"},{"id":648,"name":"潢川","abbr":"HC","area_code":"200194","sort":2000,"latitude":32.131561,"longitude":115.051292,"is_map":true,"pinyin":"huangchuan"},{"id":653,"name":"辉县","abbr":"HX","area_code":"200199","sort":2000,"latitude":35.46212,"longitude":113.805397,"is_map":true,"pinyin":"huixian"},{"id":660,"name":"滑县","abbr":"HX","area_code":"200206","sort":2000,"latitude":35.57534,"longitude":114.519302,"is_map":true,"pinyin":"huaxian"},{"id":672,"name":"睢县","abbr":"HX","area_code":"200218","sort":2000,"latitude":34.445259,"longitude":115.071533,"is_map":true,"pinyin":"huixian"},{"id":682,"name":"淮滨","abbr":"HB","area_code":"200228","sort":2000,"latitude":32.473389,"longitude":115.419868,"is_map":true,"pinyin":"huaibin"},{"id":697,"name":"鹤岗","abbr":"HG","area_code":"200243","sort":2000,"latitude":47.349892,"longitude":130.297852,"is_map":true,"pinyin":"hegang"},{"id":711,"name":"汉川","abbr":"HC","area_code":"200257","sort":2000,"latitude":30.661221,"longitude":113.839073,"is_map":true,"pinyin":"hanchuan"},{"id":717,"name":"黄梅","abbr":"HM","area_code":"200263","sort":2000,"latitude":30.07037,"longitude":115.944321,"is_map":true,"pinyin":"huangmei"},{"id":720,"name":"洪湖","abbr":"HH","area_code":"200266","sort":2000,"latitude":29.82756,"longitude":113.477753,"is_map":true,"pinyin":"honghu"},{"id":738,"name":"红安","abbr":"HA","area_code":"200284","sort":2000,"latitude":31.288099,"longitude":114.618134,"is_map":true,"pinyin":"hongan"},{"id":759,"name":"衡南","abbr":"HN","area_code":"200305","sort":2000,"latitude":26.73831,"longitude":112.677917,"is_map":true,"pinyin":"hengnan"},{"id":775,"name":"汉寿","abbr":"HS","area_code":"200321","sort":2000,"latitude":28.905491,"longitude":111.970428,"is_map":true,"pinyin":"hanshou"},{"id":778,"name":"华容","abbr":"HR","area_code":"200324","sort":2000,"latitude":29.53023,"longitude":112.540947,"is_map":true,"pinyin":"huarong"},{"id":787,"name":"衡东","abbr":"HD","area_code":"200333","sort":2000,"latitude":27.08116,"longitude":112.953247,"is_map":true,"pinyin":"hengdong"},{"id":793,"name":"洪江","abbr":"HJ","area_code":"200339","sort":2000,"latitude":27.209249,"longitude":109.836548,"is_map":true,"pinyin":"hongjiang"},{"id":816,"name":"桦甸","abbr":"HD","area_code":"200362","sort":2000,"latitude":42.97208,"longitude":126.746269,"is_map":true,"pinyin":"huadian"},{"id":820,"name":"珲春","abbr":"HC","area_code":"200366","sort":2000,"latitude":42.862492,"longitude":130.365768,"is_map":true,"pinyin":"hunchun"},{"id":822,"name":"辉南","abbr":"HN","area_code":"200368","sort":2000,"latitude":42.68499,"longitude":126.046867,"is_map":true,"pinyin":"huinan"},{"id":835,"name":"睢宁","abbr":"HN","area_code":"200381","sort":2000,"latitude":33.912739,"longitude":117.941078,"is_map":true,"pinyin":"huining"},{"id":837,"name":"海门","abbr":"HM","area_code":"200383","sort":2000,"latitude":31.871651,"longitude":121.181793,"is_map":true,"pinyin":"haimen"},{"id":838,"name":"海安","abbr":"HA","area_code":"200384","sort":2000,"latitude":32.533081,"longitude":120.46759,"is_map":true,"pinyin":"haian"},{"id":882,"name":"会昌","abbr":"HC","area_code":"200428","sort":2000,"latitude":25.600389,"longitude":115.786003,"is_map":true,"pinyin":"huichang"},{"id":908,"name":"黑山","abbr":"HS","area_code":"200454","sort":2000,"latitude":41.693909,"longitude":122.120659,"is_map":true,"pinyin":"heishan"},{"id":961,"name":"桓台","abbr":"HT","area_code":"200507","sort":2000,"latitude":36.959332,"longitude":118.097969,"is_map":true,"pinyin":"huantai"},{"id":975,"name":"海阳","abbr":"HY","area_code":"200521","sort":2000,"latitude":36.776451,"longitude":121.158463,"is_map":true,"pinyin":"haiyang"},{"id":978,"name":"惠民","abbr":"HM","area_code":"200524","sort":2000,"latitude":37.489819,"longitude":117.509201,"is_map":true,"pinyin":"huimin"},{"id":998,"name":"洪洞","abbr":"HD","area_code":"200544","sort":2000,"latitude":36.253738,"longitude":111.674957,"is_map":true,"pinyin":"hongdong"},{"id":1006,"name":"河津","abbr":"HJ","area_code":"200552","sort":2000,"latitude":35.596432,"longitude":110.711861,"is_map":true,"pinyin":"hejin"},{"id":1038,"name":"合江","abbr":"HJ","area_code":"200584","sort":2000,"latitude":28.81147,"longitude":105.831352,"is_map":true,"pinyin":"hejiang"},{"id":1061,"name":"会泽","abbr":"HZ","area_code":"200607","sort":2000,"latitude":26.41791,"longitude":103.297371,"is_map":true,"pinyin":"huize"},{"id":1085,"name":"海宁","abbr":"HN","area_code":"200631","sort":2000,"latitude":30.50938,"longitude":120.681023,"is_map":true,"pinyin":"haining"},{"id":1101,"name":"海盐","abbr":"HY","area_code":"200647","sort":2000,"latitude":30.52553,"longitude":120.945793,"is_map":true,"pinyin":"haiyan"},{"id":365,"name":"河源","abbr":"HY","area_code":"0762","sort":9999,"latitude":23.74365,"longitude":114.700653,"is_map":true,"pinyin":"heyuan"},{"id":366,"name":"河间","abbr":"HJ","area_code":"03173","sort":9999,"latitude":38.44548,"longitude":116.098999,"is_map":true,"pinyin":"hejian"},{"id":368,"name":"海城","abbr":"HC","area_code":"04121","sort":9999,"latitude":40.881451,"longitude":122.684631,"is_map":true,"pinyin":"haicheng"},{"id":1149,"name":"黑河","abbr":"HH","area_code":"231100","sort":9999,"latitude":50.245232,"longitude":127.528519,"is_map":true,"pinyin":"heihe"},{"id":1156,"name":"海伦","abbr":"HL","area_code":"231283","sort":9999,"latitude":47.462101,"longitude":126.973381,"is_map":true,"pinyin":"hailun"},{"id":1167,"name":"河池","abbr":"HC","area_code":"451200","sort":9999,"latitude":24.692909,"longitude":108.085403,"is_map":true,"pinyin":"hechi"},{"id":1173,"name":"怀柔","abbr":"HY","area_code":"110116","sort":9999,"latitude":40.316002,"longitude":116.631767,"is_map":true,"pinyin":"huairou"},{"id":1224,"name":"怀安","abbr":"HA","area_code":"130728","sort":9999,"latitude":40.678555,"longitude":114.718155,"is_map":true,"pinyin":"huaian"},{"id":1226,"name":"怀来","abbr":"HL","area_code":"130730","sort":9999,"latitude":40.405403,"longitude":115.520844,"is_map":true,"pinyin":"huailai"},{"id":1240,"name":"海兴","abbr":"HX","area_code":"130924","sort":9999,"latitude":38.141582,"longitude":117.496605,"is_map":true,"pinyin":"haixing"},{"id":1289,"name":"怀仁县","abbr":"HRX","area_code":"140624","sort":9999,"latitude":39.820789,"longitude":113.10051,"is_map":true,"pinyin":"huairen"},{"id":1330,"name":"侯马","abbr":"HM","area_code":"141081","sort":9999,"latitude":35.6203,"longitude":111.371269,"is_map":true,"pinyin":"houma"},{"id":1345,"name":"和林格尔","abbr":"HLGE","area_code":"150123","sort":9999,"latitude":40.380287,"longitude":111.824142,"is_map":true,"pinyin":"helingeer"},{"id":1365,"name":"霍林郭勒","abbr":"HLGL","area_code":"150581","sort":9999,"latitude":45.53236,"longitude":119.65786,"is_map":true,"pinyin":"huolinguole"},{"id":1368,"name":"杭锦旗","abbr":"HJQ","area_code":"150625","sort":9999,"latitude":39.831787,"longitude":108.73632,"is_map":true,"pinyin":"hangjinqi"},{"id":1386,"name":"杭锦后旗","abbr":"HJHQ","area_code":"150826","sort":9999,"latitude":40.888798,"longitude":107.147682,"is_map":true,"pinyin":"hangjinhouqi"},{"id":1388,"name":"化德","abbr":"HD","area_code":"150922","sort":9999,"latitude":41.899334,"longitude":114.010078,"is_map":true,"pinyin":"huade"},{"id":1428,"name":"桓仁满族自治县","abbr":"HRMZZZX","area_code":"210522","sort":9999,"latitude":41.268997,"longitude":125.359192,"is_map":true,"pinyin":"huanrenmanzuzizhixian"},{"id":1462,"name":"和龙","abbr":"HL","area_code":"222406","sort":9999,"latitude":42.547005,"longitude":129.008743,"is_map":true,"pinyin":"helong"},{"id":1478,"name":"虎林","abbr":"HL","area_code":"230381","sort":9999,"latitude":45.767986,"longitude":132.973877,"is_map":true,"pinyin":"hulin"},{"id":1491,"name":"桦南","abbr":"HN","area_code":"230822","sort":9999,"latitude":46.240116,"longitude":130.570114,"is_map":true,"pinyin":"huanan"},{"id":1492,"name":"桦川","abbr":"HC","area_code":"230826","sort":9999,"latitude":47.023041,"longitude":130.723709,"is_map":true,"pinyin":"huachuan"},{"id":1500,"name":"海林","abbr":"HL","area_code":"231082","sort":9999,"latitude":44.57415,"longitude":129.387909,"is_map":true,"pinyin":"hailin"},{"id":1512,"name":"呼玛","abbr":"HM","area_code":"232721","sort":9999,"latitude":51.726997,"longitude":126.662102,"is_map":true,"pinyin":"huma"},{"id":1514,"name":"洪泽","abbr":"HZ","area_code":"320829","sort":9999,"latitude":33.294975,"longitude":118.867874,"is_map":true,"pinyin":"hongze"},{"id":1560,"name":"华安","abbr":"HA","area_code":"350629","sort":9999,"latitude":25.001415,"longitude":117.536308,"is_map":true,"pinyin":"huaan"},{"id":1580,"name":"湖口","abbr":"HK","area_code":"360429","sort":9999,"latitude":29.726299,"longitude":116.244316,"is_map":true,"pinyin":"hukou"},{"id":1618,"name":"横峰","abbr":"HF","area_code":"361125","sort":9999,"latitude":28.415104,"longitude":117.608246,"is_map":true,"pinyin":"hengfeng"},{"id":1653,"name":"获嘉","abbr":"HJ","area_code":"410724","sort":9999,"latitude":35.261684,"longitude":113.657249,"is_map":true,"pinyin":"huojia"},{"id":1705,"name":"衡山","abbr":"HS","area_code":"430423","sort":9999,"latitude":27.234808,"longitude":112.869713,"is_map":true,"pinyin":"hengshan"},{"id":1754,"name":"和平","abbr":"HP","area_code":"441624","sort":9999,"latitude":24.44318,"longitude":114.941475,"is_map":true,"pinyin":"heping"},{"id":1771,"name":"横县","abbr":"HX","area_code":"450127","sort":9999,"latitude":22.687429,"longitude":109.270988,"is_map":true,"pinyin":"hengxian"},{"id":1793,"name":"合浦","abbr":"HP","area_code":"450521","sort":9999,"latitude":21.663553,"longitude":109.200691,"is_map":true,"pinyin":"hepu"},{"id":1823,"name":"环江毛南族自治县","abbr":"HJMNZZZX","area_code":"451226","sort":9999,"latitude":24.827627,"longitude":108.258667,"is_map":true,"pinyin":"huanjiangmaonanzuzizhixian"},{"id":1832,"name":"合山","abbr":"HS","area_code":"451381","sort":9999,"latitude":23.81311,"longitude":108.88858,"is_map":true,"pinyin":"heshan"},{"id":1893,"name":"华蓥","abbr":"HY","area_code":"511681","sort":9999,"latitude":30.380573,"longitude":106.777885,"is_map":true,"pinyin":"huaying"},{"id":1977,"name":"赫章","abbr":"HZ","area_code":"520527","sort":9999,"latitude":27.119244,"longitude":104.72644,"is_map":true,"pinyin":"hezhang"},{"id":1995,"name":"黄平","abbr":"HP","area_code":"522622","sort":9999,"latitude":26.896973,"longitude":107.901337,"is_map":true,"pinyin":"huangping"},{"id":2020,"name":"惠水","abbr":"HS","area_code":"522731","sort":9999,"latitude":26.128637,"longitude":106.657845,"is_map":true,"pinyin":"huishui"},{"id":2033,"name":"华宁","abbr":"HN","area_code":"530424","sort":9999,"latitude":24.189808,"longitude":102.928986,"is_map":true,"pinyin":"huaning"},{"id":2052,"name":"华坪","abbr":"HP","area_code":"530723","sort":9999,"latitude":26.628834,"longitude":101.267799,"is_map":true,"pinyin":"huaping"},{"id":2081,"name":"红河哈尼族彝族自治州","abbr":"HHHNZYZZZZ","area_code":"532500","sort":9999,"latitude":23.366776,"longitude":103.384186,"is_map":true,"pinyin":"honghehanizuyizuzizhizhou"},{"id":2088,"name":"河口瑶族自治县","abbr":"HKYZZZX","area_code":"532532","sort":9999,"latitude":22.507563,"longitude":103.961594,"is_map":true,"pinyin":"hekouyaozuzizhixian"},{"id":2110,"name":"鹤庆","abbr":"HQ","area_code":"532932","sort":9999,"latitude":26.55839,"longitude":100.173378,"is_map":true,"pinyin":"heqing"},{"id":2231,"name":"合阳","abbr":"HY","area_code":"610524","sort":9999,"latitude":35.237099,"longitude":110.14798,"is_map":true,"pinyin":"heyang"},{"id":2236,"name":"韩城","abbr":"HC","area_code":"610581","sort":9999,"latitude":35.475239,"longitude":110.452393,"is_map":true,"pinyin":"hancheng"},{"id":2237,"name":"华阴","abbr":"HY","area_code":"610582","sort":9999,"latitude":34.565357,"longitude":110.089523,"is_map":true,"pinyin":"huayin"},{"id":2261,"name":"横山","abbr":"HS","area_code":"610823","sort":9999,"latitude":37.964046,"longitude":109.292595,"is_map":true,"pinyin":"hengshan"},{"id":2268,"name":"汉阴","abbr":"HY","area_code":"610921","sort":9999,"latitude":32.891121,"longitude":108.510948,"is_map":true,"pinyin":"hanyin"},{"id":2348,"name":"合作","abbr":"HZ","area_code":"623001","sort":9999,"latitude":34.985973,"longitude":102.911491,"is_map":true,"pinyin":"hezuo"},{"id":2359,"name":"海东","abbr":"HD","area_code":"630200","sort":9999,"latitude":36.502914,"longitude":102.103271,"is_map":true,"pinyin":"haidong"},{"id":2422,"name":"哈密","abbr":"HM","area_code":"650500","sort":9999,"latitude":42.833248,"longitude":93.513161,"is_map":true,"pinyin":"hami"},{"id":5106,"name":"海拉尔区","abbr":"HLEQ","area_code":"150702","sort":9999,"latitude":49.215385,"longitude":119.758965,"is_map":true,"pinyin":"hailaerqu"}],"N":[{"id":6,"name":"南京","abbr":"NJ","area_code":"025","sort":5,"latitude":31.84178,"longitude":118.504669,"is_map":true,"pinyin":"nanjing"},{"id":18,"name":"宁波","abbr":"NB","area_code":"0574","sort":18,"latitude":29.873859,"longitude":121.55027,"is_map":true,"pinyin":"ningbo"},{"id":25,"name":"南昌","abbr":"NC","area_code":"0791","sort":2000,"latitude":28.68202,"longitude":115.857941,"is_map":true,"pinyin":"nanchang"},{"id":39,"name":"南通","abbr":"NT","area_code":"0513","sort":2000,"latitude":31.97958,"longitude":120.893707,"is_map":true,"pinyin":"nantong"},{"id":45,"name":"南宁","abbr":"NN","area_code":"0771","sort":2000,"latitude":22.81673,"longitude":108.366898,"is_map":true,"pinyin":"nanning"},{"id":99,"name":"南充","abbr":"NC","area_code":"0817","sort":2000,"latitude":30.837311,"longitude":106.110733,"is_map":true,"pinyin":"nanchong"},{"id":104,"name":"内江","abbr":"NJ","area_code":"0832","sort":2000,"latitude":29.580151,"longitude":105.058441,"is_map":true,"pinyin":"neijiang"},{"id":117,"name":"南平","abbr":"NP","area_code":"0599","sort":2000,"latitude":26.64152,"longitude":118.177834,"is_map":true,"pinyin":"nanping"},{"id":260,"name":"南阳","abbr":"NY","area_code":"0377","sort":2000,"latitude":32.99073,"longitude":112.528511,"is_map":true,"pinyin":"nanyang"},{"id":271,"name":"宁德","abbr":"ND","area_code":"0593","sort":2000,"latitude":26.66571,"longitude":119.548187,"is_map":true,"pinyin":"ningde"},{"id":442,"name":"南岸","abbr":"NA","area_code":"10020","sort":2000,"latitude":29.521681,"longitude":106.562561,"is_map":true,"pinyin":"nanan"},{"id":443,"name":"南川","abbr":"NC","area_code":"10021","sort":2000,"latitude":29.157881,"longitude":107.098961,"is_map":true,"pinyin":"nanchuan"},{"id":480,"name":"宁国","abbr":"NG","area_code":"200026","sort":2000,"latitude":30.63364,"longitude":118.98336,"is_map":true,"pinyin":"ningguo"},{"id":495,"name":"南安","abbr":"NA","area_code":"200041","sort":2000,"latitude":24.9604,"longitude":118.386269,"is_map":true,"pinyin":"nanan"},{"id":579,"name":"纳雍","abbr":"NY","area_code":"200125","sort":2000,"latitude":26.7777,"longitude":105.38269,"is_map":true,"pinyin":"nayong"},{"id":590,"name":"宁晋","abbr":"NJ","area_code":"200136","sort":2000,"latitude":37.619801,"longitude":114.919319,"is_map":true,"pinyin":"ningjin"},{"id":616,"name":"南宫","abbr":"NG","area_code":"200162","sort":2000,"latitude":37.357948,"longitude":115.408661,"is_map":true,"pinyin":"nangong"},{"id":687,"name":"南召","abbr":"NZ","area_code":"200233","sort":2000,"latitude":33.489792,"longitude":112.429138,"is_map":true,"pinyin":"nanzhao"},{"id":691,"name":"内乡","abbr":"NX","area_code":"200237","sort":2000,"latitude":33.04483,"longitude":111.849258,"is_map":true,"pinyin":"neixiang"},{"id":703,"name":"嫩江","abbr":"NJ","area_code":"200249","sort":2000,"latitude":49.185719,"longitude":125.22094,"is_map":true,"pinyin":"nenjiang"},{"id":706,"name":"讷河","abbr":"NH","area_code":"200252","sort":2000,"latitude":48.484192,"longitude":124.883972,"is_map":true,"pinyin":"nehe"},{"id":742,"name":"南漳","abbr":"NZ","area_code":"200288","sort":2000,"latitude":31.77471,"longitude":111.83902,"is_map":true,"pinyin":"nanzhang"},{"id":751,"name":"宁乡","abbr":"NX","area_code":"200297","sort":2000,"latitude":28.277411,"longitude":112.551826,"is_map":true,"pinyin":"ningxiang"},{"id":765,"name":"南县","abbr":"NX","area_code":"200311","sort":2000,"latitude":29.36162,"longitude":112.396362,"is_map":true,"pinyin":"nanxian"},{"id":771,"name":"宁远","abbr":"NY","area_code":"200317","sort":2000,"latitude":25.569189,"longitude":111.94445,"is_map":true,"pinyin":"ningyuan"},{"id":815,"name":"农安","abbr":"NA","area_code":"200361","sort":2000,"latitude":44.43195,"longitude":125.18512,"is_map":true,"pinyin":"nongan"},{"id":872,"name":"南康","abbr":"NK","area_code":"200418","sort":2000,"latitude":25.66144,"longitude":114.76535,"is_map":true,"pinyin":"nankang"},{"id":881,"name":"宁都","abbr":"ND","area_code":"200427","sort":2000,"latitude":26.47019,"longitude":116.009407,"is_map":true,"pinyin":"ningdu"},{"id":967,"name":"宁阳","abbr":"NY","area_code":"200513","sort":2000,"latitude":35.759609,"longitude":116.807266,"is_map":true,"pinyin":"ningyang"},{"id":1033,"name":"南部","abbr":"NB","area_code":"200579","sort":2000,"latitude":31.353161,"longitude":106.067337,"is_map":true,"pinyin":"nanbu"},{"id":1051,"name":"宁河","abbr":"NH","area_code":"200597","sort":2000,"latitude":39.330761,"longitude":117.824738,"is_map":true,"pinyin":"ninghe"},{"id":1090,"name":"宁海","abbr":"NH","area_code":"200636","sort":2000,"latitude":29.288071,"longitude":121.429611,"is_map":true,"pinyin":"ninghai"},{"id":1172,"name":"宁化","abbr":"NH","area_code":"350424","sort":9999,"latitude":26.26178,"longitude":116.654427,"is_map":true,"pinyin":"ninghua"},{"id":1192,"name":"内丘","abbr":"NQ","area_code":"130523","sort":9999,"latitude":37.287663,"longitude":114.51152,"is_map":true,"pinyin":"neiqiu"},{"id":1195,"name":"南和","abbr":"NH","area_code":"130527","sort":9999,"latitude":37.003811,"longitude":114.691376,"is_map":true,"pinyin":"nanhe"},{"id":1242,"name":"南皮","abbr":"NP","area_code":"130927","sort":9999,"latitude":38.042439,"longitude":116.709167,"is_map":true,"pinyin":"nanpi"},{"id":1357,"name":"宁城","abbr":"NC","area_code":"150429","sort":9999,"latitude":41.598694,"longitude":119.339241,"is_map":true,"pinyin":"ningcheng"},{"id":1363,"name":"奈曼旗","abbr":"NMQ","area_code":"150525","sort":9999,"latitude":42.846851,"longitude":120.662544,"is_map":true,"pinyin":"naimanqi"},{"id":1501,"name":"宁安","abbr":"NA","area_code":"231084","sort":9999,"latitude":44.346836,"longitude":129.470016,"is_map":true,"pinyin":"ningan"},{"id":1528,"name":"南陵","abbr":"NL","area_code":"340223","sort":9999,"latitude":30.919638,"longitude":118.337105,"is_map":true,"pinyin":"nanling"},{"id":1559,"name":"南靖","abbr":"NJ","area_code":"350627","sort":9999,"latitude":24.516424,"longitude":117.365463,"is_map":true,"pinyin":"nanjing"},{"id":1608,"name":"南城","abbr":"NC","area_code":"361021","sort":9999,"latitude":27.555309,"longitude":116.63945,"is_map":true,"pinyin":"nancheng"},{"id":1610,"name":"南丰","abbr":"NF","area_code":"361023","sort":9999,"latitude":27.210133,"longitude":116.532997,"is_map":true,"pinyin":"nanfeng"},{"id":1634,"name":"宁津","abbr":"NJ","area_code":"371422","sort":9999,"latitude":37.64962,"longitude":116.793716,"is_map":true,"pinyin":"ningjin"},{"id":1650,"name":"内黄","abbr":"NH","area_code":"410527","sort":9999,"latitude":35.953701,"longitude":114.904579,"is_map":true,"pinyin":"neihuang"},{"id":1658,"name":"南乐","abbr":"NL","area_code":"410923","sort":9999,"latitude":36.075203,"longitude":115.204338,"is_map":true,"pinyin":"nanle"},{"id":1668,"name":"宁陵","abbr":"NL","area_code":"411423","sort":9999,"latitude":34.449299,"longitude":115.320053,"is_map":true,"pinyin":"ningling"},{"id":1740,"name":"南雄市","abbr":"NXS","area_code":"440282","sort":9999,"latitude":25.115328,"longitude":114.311234,"is_map":true,"pinyin":"nanxiongshi"},{"id":1808,"name":"那坡","abbr":"NP","area_code":"451026","sort":9999,"latitude":23.400785,"longitude":105.833549,"is_map":true,"pinyin":"napo"},{"id":1818,"name":"南丹","abbr":"ND","area_code":"451221","sort":9999,"latitude":24.983192,"longitude":107.546608,"is_map":true,"pinyin":"nandan"},{"id":2053,"name":"宁蒗彝族自治县","abbr":"NLYZZZX","area_code":"530724","sort":9999,"latitude":27.281109,"longitude":100.852425,"is_map":true,"pinyin":"ninglangyizuzizhixian"},{"id":2054,"name":"宁洱哈尼族彝族自治县","abbr":"NEHNZYZZZX","area_code":"530821","sort":9999,"latitude":23.062508,"longitude":101.045242,"is_map":true,"pinyin":"ningerhanizuyizuzizhixian"},{"id":2074,"name":"南华","abbr":"NH","area_code":"532324","sort":9999,"latitude":25.192408,"longitude":101.274994,"is_map":true,"pinyin":"nanhua"},{"id":2104,"name":"南涧彝族自治县","abbr":"NJYZZZX","area_code":"532926","sort":9999,"latitude":25.041279,"longitude":100.518684,"is_map":true,"pinyin":"nanjianyizuzizhixian"},{"id":2176,"name":"那曲地区","abbr":"NQDQ","area_code":"542400","sort":9999,"latitude":31.47694,"longitude":92.058083,"is_map":true,"pinyin":"naqudiqu"},{"id":5224,"name":"南岔区","abbr":"NCQ","area_code":"230703","sort":9999,"latitude":47.137314,"longitude":129.282455,"is_map":true,"pinyin":"nanchaqu"}],"G":[{"id":4,"name":"广州","abbr":"GZ","area_code":"020","sort":6,"latitude":23.12908,"longitude":113.264359,"is_map":true,"pinyin":"guangzhou"},{"id":417,"name":"巩义","abbr":"GY","area_code":"03712","sort":1900,"latitude":34.747978,"longitude":113.022057,"is_map":true,"pinyin":"gongyi"},{"id":98,"name":"桂林","abbr":"GL","area_code":"0773","sort":2000,"latitude":25.273609,"longitude":110.290024,"is_map":true,"pinyin":"guilin"},{"id":129,"name":"赣州","abbr":"GZ","area_code":"0797","sort":2000,"latitude":25.831091,"longitude":114.934761,"is_map":true,"pinyin":"ganzhou"},{"id":137,"name":"贵阳","abbr":"GY","area_code":"0851","sort":2000,"latitude":26.64702,"longitude":106.630241,"is_map":true,"pinyin":"guiyang"},{"id":197,"name":"广汉","abbr":"GHS","area_code":"510600","sort":2000,"latitude":30.97706,"longitude":104.282494,"is_map":true,"pinyin":"guanghanshi"},{"id":262,"name":"广元","abbr":"GY","area_code":"0839","sort":2000,"latitude":32.43549,"longitude":105.843567,"is_map":true,"pinyin":"guangyuan"},{"id":316,"name":"广安","abbr":"GA","area_code":"0826","sort":2000,"latitude":30.455959,"longitude":106.633217,"is_map":true,"pinyin":"guangan"},{"id":431,"name":"贵港","abbr":"GG","area_code":"10009","sort":2000,"latitude":23.11306,"longitude":109.597641,"is_map":true,"pinyin":"guigang"},{"id":477,"name":"广德","abbr":"GD","area_code":"200023","sort":2000,"latitude":30.893801,"longitude":119.417053,"is_map":true,"pinyin":"guangde"},{"id":551,"name":"高州","abbr":"GZ","area_code":"200097","sort":2000,"latitude":21.918119,"longitude":110.853378,"is_map":true,"pinyin":"gaozhou"},{"id":561,"name":"高要","abbr":"GY","area_code":"200107","sort":2000,"latitude":23.02581,"longitude":112.458389,"is_map":true,"pinyin":"gaoyao"},{"id":568,"name":"桂平","abbr":"GP","area_code":"200114","sort":2000,"latitude":23.3941,"longitude":110.07901,"is_map":true,"pinyin":"guiping"},{"id":593,"name":"藁城","abbr":"GC","area_code":"200139","sort":2000,"latitude":38.02166,"longitude":114.846764,"is_map":true,"pinyin":"gaocheng"},{"id":594,"name":"高碑店","abbr":"GBD","area_code":"200140","sort":2000,"latitude":39.32658,"longitude":115.873734,"is_map":true,"pinyin":"gaobeidian"},{"id":619,"name":"固安","abbr":"GA","area_code":"200165","sort":2000,"latitude":39.438251,"longitude":116.298523,"is_map":true,"pinyin":"guan"},{"id":632,"name":"固始","abbr":"GS","area_code":"200178","sort":2000,"latitude":32.168388,"longitude":115.654808,"is_map":true,"pinyin":"gushi"},{"id":683,"name":"光山","abbr":"GS","area_code":"200229","sort":2000,"latitude":32.009972,"longitude":114.918777,"is_map":true,"pinyin":"guangshan"},{"id":718,"name":"公安","abbr":"GA","area_code":"200264","sort":2000,"latitude":30.0583,"longitude":112.229477,"is_map":true,"pinyin":"gongan"},{"id":724,"name":"广水","abbr":"GS","area_code":"200270","sort":2000,"latitude":31.616859,"longitude":113.825996,"is_map":true,"pinyin":"guangshui"},{"id":741,"name":"谷城","abbr":"GC","area_code":"200287","sort":2000,"latitude":32.263378,"longitude":111.653038,"is_map":true,"pinyin":"gucheng"},{"id":773,"name":"桂阳","abbr":"GY","area_code":"200319","sort":2000,"latitude":25.754101,"longitude":112.733681,"is_map":true,"pinyin":"guiyang"},{"id":804,"name":"公主岭","abbr":"GZL","area_code":"200350","sort":2000,"latitude":43.504681,"longitude":124.8228,"is_map":true,"pinyin":"gongzhuling"},{"id":841,"name":"赣榆","abbr":"GY","area_code":"200387","sort":2000,"latitude":34.840649,"longitude":119.177299,"is_map":true,"pinyin":"ganyu"},{"id":854,"name":"高邮","abbr":"GY","area_code":"200400","sort":2000,"latitude":32.78112,"longitude":119.455582,"is_map":true,"pinyin":"gaoyou"},{"id":857,"name":"灌云","abbr":"GY","area_code":"200403","sort":2000,"latitude":34.284069,"longitude":119.240959,"is_map":true,"pinyin":"guanyun"},{"id":861,"name":"灌南","abbr":"GN","area_code":"200407","sort":2000,"latitude":34.086731,"longitude":119.315628,"is_map":true,"pinyin":"guannan"},{"id":864,"name":"高淳","abbr":"GC","area_code":"200410","sort":2000,"latitude":31.327511,"longitude":118.892097,"is_map":true,"pinyin":"gaochun"},{"id":869,"name":"广丰","abbr":"GF","area_code":"200415","sort":2000,"latitude":28.43631,"longitude":118.19133,"is_map":true,"pinyin":"guangfeng"},{"id":874,"name":"高安","abbr":"GA","area_code":"200420","sort":2000,"latitude":28.41729,"longitude":115.375618,"is_map":true,"pinyin":"gaoan"},{"id":885,"name":"贵溪","abbr":"GX","area_code":"200431","sort":2000,"latitude":28.292521,"longitude":117.245247,"is_map":true,"pinyin":"guixi"},{"id":892,"name":"赣县","abbr":"GX","area_code":"200438","sort":2000,"latitude":25.86062,"longitude":115.011749,"is_map":true,"pinyin":"ganxian"},{"id":906,"name":"盖州","abbr":"GZ","area_code":"200452","sort":2000,"latitude":40.400532,"longitude":122.348801,"is_map":true,"pinyin":"gaizhou"},{"id":922,"name":"格尔木","abbr":"GEM","area_code":"200468","sort":2000,"latitude":33.660332,"longitude":90,"is_map":true,"pinyin":"geermu"},{"id":929,"name":"高密","abbr":"GM","area_code":"200475","sort":2000,"latitude":36.382568,"longitude":119.755676,"is_map":true,"pinyin":"gaomi"},{"id":981,"name":"冠县","abbr":"GX","area_code":"200527","sort":2000,"latitude":36.483349,"longitude":115.442627,"is_map":true,"pinyin":"guanxian"},{"id":985,"name":"高唐","abbr":"GT","area_code":"200531","sort":2000,"latitude":36.86602,"longitude":116.23111,"is_map":true,"pinyin":"gaotang"},{"id":987,"name":"广饶","abbr":"GR","area_code":"200533","sort":2000,"latitude":37.053589,"longitude":118.407021,"is_map":true,"pinyin":"guangrao"},{"id":999,"name":"高平","abbr":"GP","area_code":"200545","sort":2000,"latitude":35.798069,"longitude":112.923576,"is_map":true,"pinyin":"gaoping"},{"id":1071,"name":"个旧","abbr":"GJ","area_code":"200617","sort":2000,"latitude":23.35899,"longitude":103.160042,"is_map":true,"pinyin":"gejiu"},{"id":1161,"name":"古田","abbr":"GT","area_code":"350922","sort":9999,"latitude":26.57762,"longitude":118.746063,"is_map":true,"pinyin":"gutian"},{"id":1165,"name":"高陵","abbr":"GL","area_code":"610126","sort":9999,"latitude":34.53487,"longitude":109.088219,"is_map":true,"pinyin":"gaoling"},{"id":1187,"name":"广平","abbr":"GP","area_code":"130432","sort":9999,"latitude":36.483604,"longitude":114.950859,"is_map":true,"pinyin":"guangping"},{"id":1188,"name":"馆陶","abbr":"GT","area_code":"130433","sort":9999,"latitude":36.539459,"longitude":115.289055,"is_map":true,"pinyin":"guantao"},{"id":1198,"name":"广宗县","abbr":"GZX","area_code":"130531","sort":9999,"latitude":37.075546,"longitude":115.142799,"is_map":true,"pinyin":"guangzong"},{"id":1207,"name":"高阳县","abbr":"GYX","area_code":"130628","sort":9999,"latitude":38.700069,"longitude":115.778839,"is_map":true,"pinyin":"gaoyangxian"},{"id":1220,"name":"沽源","abbr":"GY","area_code":"130724","sort":9999,"latitude":41.667419,"longitude":115.684837,"is_map":true,"pinyin":"guyuan"},{"id":1253,"name":"故城","abbr":"GC","area_code":"131126","sort":9999,"latitude":37.350983,"longitude":115.966743,"is_map":true,"pinyin":"gucheng"},{"id":1380,"name":"根河","abbr":"GH","area_code":"150785","sort":9999,"latitude":50.780453,"longitude":121.532722,"is_map":true,"pinyin":"genhe"},{"id":1472,"name":"甘南","abbr":"GN","area_code":"230225","sort":9999,"latitude":47.917839,"longitude":123.506035,"is_map":true,"pinyin":"gannan"},{"id":1529,"name":"固镇县","abbr":"GZX","area_code":"340323","sort":9999,"latitude":33.31868,"longitude":117.315964,"is_map":true,"pinyin":"guzhen"},{"id":1562,"name":"光泽","abbr":"GZ","area_code":"350723","sort":9999,"latitude":27.542803,"longitude":117.337898,"is_map":true,"pinyin":"guangze"},{"id":1583,"name":"共青城","abbr":"GQC","area_code":"360482","sort":9999,"latitude":29.2484,"longitude":115.79406,"is_map":true,"pinyin":"gongqingcheng"},{"id":1592,"name":"高邑","abbr":"GY","area_code":"130127","sort":9999,"latitude":37.605713,"longitude":114.610703,"is_map":true,"pinyin":"gaoyi"},{"id":1616,"name":"广昌县","abbr":"GCX","area_code":"361030","sort":9999,"latitude":26.838427,"longitude":116.327293,"is_map":true,"pinyin":"guangchang"},{"id":1626,"name":"高青","abbr":"GQ","area_code":"370322","sort":9999,"latitude":37.169582,"longitude":117.829842,"is_map":true,"pinyin":"gaoqing"},{"id":1714,"name":"桂东","abbr":"GD","area_code":"431027","sort":9999,"latitude":26.073917,"longitude":113.945877,"is_map":true,"pinyin":"guidong"},{"id":1783,"name":"灌阳","abbr":"GY","area_code":"450327","sort":9999,"latitude":25.489098,"longitude":111.160248,"is_map":true,"pinyin":"guanyang"},{"id":1788,"name":"恭城瑶族自治县","abbr":"GCYZZZX","area_code":"450332","sort":9999,"latitude":24.833612,"longitude":110.829521,"is_map":true,"pinyin":"gongchengyaozuzizhixian"},{"id":1919,"name":"甘孜藏族自治州","abbr":"GZZZZZZ","area_code":"513300","sort":9999,"latitude":31.618486,"longitude":99.991486,"is_map":true,"pinyin":"ganzizangzuzizhizhou"},{"id":1974,"name":"关岭布依族苗族自治县","abbr":"GLBYZMZZZX","area_code":"520424","sort":9999,"latitude":25.980713,"longitude":105.666855,"is_map":true,"pinyin":"guanlingbuyizumiaozuzizhixian"},{"id":2013,"name":"贵定","abbr":"GD","area_code":"522723","sort":9999,"latitude":26.580807,"longitude":107.233589,"is_map":true,"pinyin":"guiding"},{"id":2069,"name":"耿马傣族佤族自治县","abbr":"GMDZWZZZX","area_code":"530926","sort":9999,"latitude":23.534578,"longitude":99.402496,"is_map":true,"pinyin":"gengmadaizuwazuzizhixian"},{"id":2095,"name":"广南","abbr":"GN","area_code":"532627","sort":9999,"latitude":24.050699,"longitude":105.049263,"is_map":true,"pinyin":"guangnan"},{"id":2120,"name":"贡山独龙族怒族自治县","abbr":"GSDLZNZZZX","area_code":"533324","sort":9999,"latitude":27.738054,"longitude":98.666138,"is_map":true,"pinyin":"gongshandulongzunuzuzizhixian"},{"id":2302,"name":"高台","abbr":"GT","area_code":"620724","sort":9999,"latitude":39.376308,"longitude":99.81665,"is_map":true,"pinyin":"gaotai"},{"id":2381,"name":"果洛藏族自治州","abbr":"GLZZZZZ","area_code":"632600","sort":9999,"latitude":34.468685,"longitude":100.247078,"is_map":true,"pinyin":"guoluozangzuzizhizhou"},{"id":2384,"name":"甘德县","abbr":"GDX","area_code":"632623","sort":9999,"latitude":33.966988,"longitude":99.902588,"is_map":true,"pinyin":"gande"},{"id":2410,"name":"固原","abbr":"GY","area_code":"640400","sort":9999,"latitude":36.004562,"longitude":106.28524,"is_map":true,"pinyin":"guyuan"},{"id":5038,"name":"古冶区","abbr":"GYQ","area_code":"130204","sort":9999,"latitude":39.715736,"longitude":118.454292,"is_map":true,"pinyin":"guyequ"}],"X":[{"id":13,"name":"厦门","abbr":"XM","area_code":"0592","sort":7,"latitude":24.479509,"longitude":118.089478,"is_map":true,"pinyin":"xiamen"},{"id":15,"name":"西安","abbr":"XA","area_code":"029","sort":24,"latitude":34.34127,"longitude":108.939842,"is_map":true,"pinyin":"xian"},{"id":42,"name":"湘潭","abbr":"XT","area_code":"0732","sort":80,"latitude":27.82975,"longitude":112.944107,"is_map":true,"pinyin":"xiangtan"},{"id":29,"name":"徐州","abbr":"XZ","area_code":"0516","sort":2000,"latitude":34.204399,"longitude":117.285767,"is_map":true,"pinyin":"xuzhou"},{"id":76,"name":"新乡","abbr":"XX","area_code":"0373","sort":2000,"latitude":35.30323,"longitude":113.92675,"is_map":true,"pinyin":"xinxiang"},{"id":115,"name":"咸阳","abbr":"XY","area_code":"0910","sort":2000,"latitude":34.329319,"longitude":108.70929,"is_map":true,"pinyin":"xianyang"},{"id":127,"name":"新余","abbr":"XY","area_code":"0790","sort":2000,"latitude":27.81776,"longitude":114.91713,"is_map":true,"pinyin":"xinyu"},{"id":179,"name":"邢台","abbr":"XT","area_code":"0319","sort":2000,"latitude":37.070549,"longitude":114.504433,"is_map":true,"pinyin":"xingtai"},{"id":198,"name":"许昌","abbr":"XC","area_code":"0374","sort":2000,"latitude":34.035702,"longitude":113.852333,"is_map":true,"pinyin":"xuchang"},{"id":205,"name":"孝感","abbr":"XG","area_code":"0712","sort":2000,"latitude":30.924829,"longitude":113.916451,"is_map":true,"pinyin":"xiaogan"},{"id":215,"name":"香港","abbr":"XG","area_code":"00852","sort":2000,"latitude":22.276283,"longitude":114.163826,"is_map":true,"pinyin":"xianggang"},{"id":230,"name":"咸宁","abbr":"XN","area_code":"0715","sort":2000,"latitude":29.841261,"longitude":114.322449,"is_map":true,"pinyin":"xianning"},{"id":233,"name":"西宁","abbr":"XN","area_code":"0971","sort":2000,"latitude":36.61729,"longitude":101.777817,"is_map":true,"pinyin":"xining"},{"id":234,"name":"信阳","abbr":"XY","area_code":"0376","sort":2000,"latitude":32.147141,"longitude":114.092789,"is_map":true,"pinyin":"xinyang"},{"id":241,"name":"襄阳","abbr":"XY","area_code":"0710","sort":2000,"latitude":32.008999,"longitude":112.122551,"is_map":true,"pinyin":"xiangyang"},{"id":263,"name":"忻州","abbr":"XZ","area_code":"0350","sort":2000,"latitude":38.416698,"longitude":112.734177,"is_map":true,"pinyin":"xinzhou"},{"id":296,"name":"西昌","abbr":"XC","area_code":"0843","sort":2000,"latitude":27.894489,"longitude":102.263046,"is_map":true,"pinyin":"xichang"},{"id":314,"name":"宣城","abbr":"XC","area_code":"0563","sort":2000,"latitude":30.940781,"longitude":118.758659,"is_map":true,"pinyin":"xuancheng"},{"id":476,"name":"萧县","abbr":"XX","area_code":"200022","sort":2000,"latitude":34.188759,"longitude":116.947243,"is_map":true,"pinyin":"xiaoxian"},{"id":501,"name":"仙游","abbr":"XY","area_code":"200047","sort":2000,"latitude":25.36215,"longitude":118.691811,"is_map":true,"pinyin":"xianyou"},{"id":512,"name":"霞浦","abbr":"XP","area_code":"200058","sort":2000,"latitude":26.88517,"longitude":120.005562,"is_map":true,"pinyin":"xiapu"},{"id":543,"name":"兴宁","abbr":"XN","area_code":"200089","sort":2000,"latitude":24.136499,"longitude":115.731194,"is_map":true,"pinyin":"xingning"},{"id":553,"name":"信宜","abbr":"XY","area_code":"200099","sort":2000,"latitude":22.35429,"longitude":110.947098,"is_map":true,"pinyin":"xinyi"},{"id":558,"name":"徐闻","abbr":"XW","area_code":"200104","sort":2000,"latitude":20.326521,"longitude":110.175018,"is_map":true,"pinyin":"xuwen"},{"id":571,"name":"兴义","abbr":"XY","area_code":"200117","sort":2000,"latitude":25.091921,"longitude":104.895531,"is_map":true,"pinyin":"xingyi"},{"id":598,"name":"辛集","abbr":"XJ","area_code":"200144","sort":2000,"latitude":37.943161,"longitude":115.217918,"is_map":true,"pinyin":"xinji"},{"id":601,"name":"徐水","abbr":"XS","area_code":"200147","sort":2000,"latitude":39.01865,"longitude":115.655861,"is_map":true,"pinyin":"xushui"},{"id":613,"name":"香河","abbr":"XH","area_code":"200159","sort":2000,"latitude":39.761421,"longitude":117.006447,"is_map":true,"pinyin":"xianghe"},{"id":614,"name":"新乐","abbr":"XL","area_code":"200160","sort":2000,"latitude":38.34338,"longitude":114.683838,"is_map":true,"pinyin":"xinle"},{"id":625,"name":"新密","abbr":"XM","area_code":"200171","sort":2000,"latitude":34.53952,"longitude":113.390442,"is_map":true,"pinyin":"xinmi"},{"id":627,"name":"项城","abbr":"XC","area_code":"200173","sort":2000,"latitude":33.467232,"longitude":114.875618,"is_map":true,"pinyin":"xiangcheng"},{"id":628,"name":"新郑","abbr":"XZ","area_code":"200174","sort":2000,"latitude":34.396049,"longitude":113.741608,"is_map":true,"pinyin":"xinzheng"},{"id":644,"name":"荥阳","abbr":"XY","area_code":"200190","sort":2000,"latitude":34.787621,"longitude":113.383492,"is_map":true,"pinyin":"xingyang"},{"id":647,"name":"夏邑","abbr":"XY","area_code":"200193","sort":2000,"latitude":34.239288,"longitude":116.129692,"is_map":true,"pinyin":"xiayi"},{"id":650,"name":"息县","abbr":"XX","area_code":"200196","sort":2000,"latitude":32.342819,"longitude":114.740242,"is_map":true,"pinyin":"xixian"},{"id":655,"name":"淅川","abbr":"XC","area_code":"200201","sort":2000,"latitude":33.138149,"longitude":111.490784,"is_map":true,"pinyin":"xichuan"},{"id":661,"name":"西华","abbr":"XH","area_code":"200207","sort":2000,"latitude":33.76754,"longitude":114.529739,"is_map":true,"pinyin":"xihua"},{"id":668,"name":"新野","abbr":"XY","area_code":"200214","sort":2000,"latitude":32.520931,"longitude":112.360062,"is_map":true,"pinyin":"xinye"},{"id":669,"name":"新蔡","abbr":"XC","area_code":"200215","sort":2000,"latitude":32.74926,"longitude":114.98571,"is_map":true,"pinyin":"xincai"},{"id":671,"name":"襄城","abbr":"XC","area_code":"200217","sort":2000,"latitude":33.850719,"longitude":113.506691,"is_map":true,"pinyin":"xiangcheng"},{"id":675,"name":"西峡","abbr":"XX","area_code":"200221","sort":2000,"latitude":33.305599,"longitude":111.472443,"is_map":true,"pinyin":"xixia"},{"id":676,"name":"西平","abbr":"XP","area_code":"200222","sort":2000,"latitude":33.387798,"longitude":114.021584,"is_map":true,"pinyin":"xiping"},{"id":686,"name":"新安","abbr":"XA","area_code":"200232","sort":2000,"latitude":34.72818,"longitude":112.132423,"is_map":true,"pinyin":"xinan"},{"id":725,"name":"浠水","abbr":"XS","area_code":"200271","sort":2000,"latitude":30.451839,"longitude":115.265511,"is_map":true,"pinyin":"xishui"},{"id":739,"name":"孝昌","abbr":"XC","area_code":"200285","sort":2000,"latitude":31.25803,"longitude":113.998016,"is_map":true,"pinyin":"xiaochang"},{"id":761,"name":"湘阴","abbr":"XY","area_code":"200307","sort":2000,"latitude":28.689251,"longitude":112.909172,"is_map":true,"pinyin":"xiangyin"},{"id":772,"name":"新化","abbr":"XH","area_code":"200318","sort":2000,"latitude":27.726629,"longitude":111.327431,"is_map":true,"pinyin":"xinhua"},{"id":780,"name":"湘乡","abbr":"XX","area_code":"200326","sort":2000,"latitude":27.7341,"longitude":112.535042,"is_map":true,"pinyin":"xiangxiang"},{"id":781,"name":"新邵","abbr":"XS","area_code":"200327","sort":2000,"latitude":27.32091,"longitude":111.459,"is_map":true,"pinyin":"xinshao"},{"id":783,"name":"溆浦","abbr":"XP","area_code":"200329","sort":2000,"latitude":27.90834,"longitude":110.594856,"is_map":true,"pinyin":"xupu"},{"id":795,"name":"新宁","abbr":"XN","area_code":"200341","sort":2000,"latitude":26.43346,"longitude":110.856743,"is_map":true,"pinyin":"xinning"},{"id":829,"name":"兴化","abbr":"XH","area_code":"200375","sort":2000,"latitude":32.910412,"longitude":119.852722,"is_map":true,"pinyin":"xinghua"},{"id":843,"name":"新沂","abbr":"XY","area_code":"200389","sort":2000,"latitude":34.36927,"longitude":118.355476,"is_map":true,"pinyin":"xinyi"},{"id":859,"name":"盱眙","abbr":"XY","area_code":"200405","sort":2000,"latitude":33.010891,"longitude":118.544991,"is_map":true,"pinyin":"xuyi"},{"id":863,"name":"响水","abbr":"XS","area_code":"200409","sort":2000,"latitude":34.199188,"longitude":119.578392,"is_map":true,"pinyin":"xiangshui"},{"id":868,"name":"新建","abbr":"XJ","area_code":"200414","sort":2000,"latitude":28.333691,"longitude":115.651123,"is_map":true,"pinyin":"xinjian"},{"id":876,"name":"信丰","abbr":"XF","area_code":"200422","sort":2000,"latitude":25.386169,"longitude":114.922852,"is_map":true,"pinyin":"xinfeng"},{"id":883,"name":"修水","abbr":"XS","area_code":"200429","sort":2000,"latitude":29.02533,"longitude":114.546883,"is_map":true,"pinyin":"xiushui"},{"id":890,"name":"兴国","abbr":"XG","area_code":"200436","sort":2000,"latitude":26.33779,"longitude":115.363136,"is_map":true,"pinyin":"xingguo"},{"id":907,"name":"新民","abbr":"XM","area_code":"200453","sort":2000,"latitude":41.997669,"longitude":122.828003,"is_map":true,"pinyin":"xinmin"},{"id":912,"name":"兴城","abbr":"XC","area_code":"200458","sort":2000,"latitude":40.610191,"longitude":120.756187,"is_map":true,"pinyin":"xingcheng"},{"id":920,"name":"锡林浩特","abbr":"XLHT","area_code":"200466","sort":2000,"latitude":43.933392,"longitude":116.086082,"is_map":true,"pinyin":"xilinhaote"},{"id":924,"name":"新泰","abbr":"XT","area_code":"200470","sort":2000,"latitude":35.908779,"longitude":117.767998,"is_map":true,"pinyin":"xintai"},{"id":984,"name":"夏津","abbr":"XJ","area_code":"200530","sort":2000,"latitude":36.948559,"longitude":116.001747,"is_map":true,"pinyin":"xiajin"},{"id":997,"name":"孝义","abbr":"XY","area_code":"200543","sort":2000,"latitude":37.14534,"longitude":111.77903,"is_map":true,"pinyin":"xiaoyi"},{"id":1019,"name":"宣汉","abbr":"XH","area_code":"200565","sort":2000,"latitude":31.353861,"longitude":107.727097,"is_map":true,"pinyin":"xuanhan"},{"id":1059,"name":"宣威","abbr":"XW","area_code":"200605","sort":2000,"latitude":26.219891,"longitude":104.104477,"is_map":true,"pinyin":"xuanwei"},{"id":1072,"name":"祥云","abbr":"XY","area_code":"200618","sort":2000,"latitude":25.48381,"longitude":100.550591,"is_map":true,"pinyin":"xiangyun"},{"id":1098,"name":"象山","abbr":"XS","area_code":"200644","sort":2000,"latitude":29.47665,"longitude":121.869324,"is_map":true,"pinyin":"xiangshan"},{"id":1109,"name":"新昌","abbr":"XC","area_code":"200655","sort":2000,"latitude":29.49983,"longitude":120.903847,"is_map":true,"pinyin":"xinchang"},{"id":1110,"name":"仙居","abbr":"XJ","area_code":"200656","sort":2000,"latitude":28.84683,"longitude":120.728813,"is_map":true,"pinyin":"xianju"},{"id":350,"name":"仙桃","abbr":"XT","area_code":"0728","sort":9999,"latitude":30.362511,"longitude":113.454498,"is_map":true,"pinyin":"xiantao"},{"id":1170,"name":"寻乌","abbr":"XW","area_code":"360734","sort":9999,"latitude":24.963511,"longitude":115.646729,"is_map":true,"pinyin":"xunwu"},{"id":1197,"name":"新河","abbr":"XH","area_code":"130530","sort":9999,"latitude":37.526215,"longitude":115.247536,"is_map":true,"pinyin":"xinhe"},{"id":1215,"name":"雄县","abbr":"XX","area_code":"130638","sort":9999,"latitude":38.990818,"longitude":116.107475,"is_map":true,"pinyin":"xiongxian"},{"id":1231,"name":"兴隆","abbr":"XL","area_code":"130822","sort":9999,"latitude":40.418526,"longitude":117.507095,"is_map":true,"pinyin":"xinglong"},{"id":1244,"name":"献县","abbr":"XX","area_code":"130929","sort":9999,"latitude":38.189659,"longitude":116.12384,"is_map":true,"pinyin":"xianxian"},{"id":1273,"name":"襄垣县","abbr":"XYX","area_code":"140423","sort":9999,"latitude":36.532852,"longitude":113.050095,"is_map":true,"pinyin":"xiangyuan"},{"id":1300,"name":"新绛","abbr":"XJ","area_code":"140825","sort":9999,"latitude":35.613697,"longitude":111.225204,"is_map":true,"pinyin":"xinjiang"},{"id":1319,"name":"襄汾","abbr":"XF","area_code":"141023","sort":9999,"latitude":35.876141,"longitude":111.442932,"is_map":true,"pinyin":"xiangfen"},{"id":1376,"name":"新巴尔虎左旗","abbr":"XBEHZQ","area_code":"150726","sort":9999,"latitude":48.216572,"longitude":118.267456,"is_map":true,"pinyin":"xinbaerhuzuoqi"},{"id":1377,"name":"新巴尔虎右旗","abbr":"XBEHYQ","area_code":"150727","sort":9999,"latitude":48.669132,"longitude":116.825989,"is_map":true,"pinyin":"xinbaerhuyouqi"},{"id":1390,"name":"兴和","abbr":"XH","area_code":"150924","sort":9999,"latitude":40.872437,"longitude":113.834007,"is_map":true,"pinyin":"xinghe"},{"id":1397,"name":"兴安盟","abbr":"XAM","area_code":"152200","sort":9999,"latitude":46.076267,"longitude":122.07032,"is_map":true,"pinyin":"xinganmeng"},{"id":1409,"name":"西乌珠穆沁旗","abbr":"XWZMQQ","area_code":"152526","sort":9999,"latitude":44.586147,"longitude":117.61525,"is_map":true,"pinyin":"xiwuzhumuqinqi"},{"id":1411,"name":"镶黄旗","abbr":"XHQ","area_code":"152528","sort":9999,"latitude":42.239227,"longitude":113.843872,"is_map":true,"pinyin":"xianghuangqi"},{"id":1423,"name":"岫岩满族自治县","abbr":"XYMZZZX","area_code":"210323","sort":9999,"latitude":40.281509,"longitude":123.28833,"is_map":true,"pinyin":"xiuyanmanzuzizhixian"},{"id":1425,"name":"新宾满族自治县","abbr":"XBMZZZX","area_code":"210422","sort":9999,"latitude":41.732456,"longitude":125.037544,"is_map":true,"pinyin":"xinbinmanzuzizhixian"},{"id":1439,"name":"西丰","abbr":"XF","area_code":"211223","sort":9999,"latitude":42.738091,"longitude":124.72332,"is_map":true,"pinyin":"xifeng"},{"id":1503,"name":"逊克","abbr":"XK","area_code":"231123","sort":9999,"latitude":49.582973,"longitude":128.476151,"is_map":true,"pinyin":"xunke"},{"id":1519,"name":"行唐","abbr":"XT","area_code":"130125","sort":9999,"latitude":38.437424,"longitude":114.552734,"is_map":true,"pinyin":"xingtang"},{"id":1579,"name":"星子","abbr":"XZ","area_code":"360427","sort":9999,"latitude":29.456169,"longitude":116.043739,"is_map":true,"pinyin":"xingzi"},{"id":1595,"name":"峡江","abbr":"XJ","area_code":"360823","sort":9999,"latitude":27.580862,"longitude":115.319328,"is_map":true,"pinyin":"xiajiang"},{"id":1596,"name":"新干","abbr":"XG","area_code":"360824","sort":9999,"latitude":27.755758,"longitude":115.399292,"is_map":true,"pinyin":"xingan"},{"id":1652,"name":"新乡","abbr":"XX","area_code":"410721","sort":9999,"latitude":35.187477,"longitude":113.780563,"is_map":true,"pinyin":"xinxiang"},{"id":1655,"name":"修武","abbr":"XW","area_code":"410821","sort":9999,"latitude":35.229923,"longitude":113.447464,"is_map":true,"pinyin":"xiuwu"},{"id":1662,"name":"许昌县","abbr":"XCX","area_code":"411023","sort":9999,"latitude":33.995064,"longitude":113.800606,"is_map":true,"pinyin":"xuchangxian"},{"id":1670,"name":"新县","abbr":"XX","area_code":"411523","sort":9999,"latitude":31.635151,"longitude":114.877052,"is_map":true,"pinyin":"xinxian"},{"id":1680,"name":"兴山县","abbr":"XSX","area_code":"420526","sort":9999,"latitude":31.34795,"longitude":110.754501,"is_map":true,"pinyin":"xingshan"},{"id":1702,"name":"湘潭县","abbr":"XT","area_code":"430320","sort":9999,"latitude":27.778601,"longitude":112.952827,"is_map":true,"pinyin":"xiangtanxian"},{"id":1718,"name":"新田","abbr":"XT","area_code":"431128","sort":9999,"latitude":25.906927,"longitude":112.220345,"is_map":true,"pinyin":"xintian"},{"id":1764,"name":"新兴","abbr":"XX","area_code":"445321","sort":9999,"latitude":22.703203,"longitude":112.230827,"is_map":true,"pinyin":"xinxing"},{"id":1781,"name":"兴安","abbr":"XA","area_code":"450325","sort":9999,"latitude":25.609554,"longitude":110.670784,"is_map":true,"pinyin":"xingan"},{"id":1802,"name":"兴业","abbr":"XY","area_code":"450924","sort":9999,"latitude":22.741871,"longitude":109.877769,"is_map":true,"pinyin":"xingye"},{"id":1812,"name":"西林","abbr":"XL","area_code":"451030","sort":9999,"latitude":24.492041,"longitude":105.095024,"is_map":true,"pinyin":"xilin"},{"id":1828,"name":"忻城","abbr":"XC","area_code":"451321","sort":9999,"latitude":24.064779,"longitude":108.667358,"is_map":true,"pinyin":"xincheng"},{"id":1829,"name":"象州","abbr":"XZ","area_code":"451322","sort":9999,"latitude":23.959824,"longitude":109.684555,"is_map":true,"pinyin":"xiangzhou"},{"id":1852,"name":"秀山土家族苗族自治县","abbr":"XSTJZMZZZX","area_code":"500241","sort":9999,"latitude":28.444773,"longitude":108.99604,"is_map":true,"pinyin":"xiushantujiazumiaozuzizhixian"},{"id":1856,"name":"新津","abbr":"XJ","area_code":"510132","sort":9999,"latitude":30.414284,"longitude":103.812447,"is_map":true,"pinyin":"xinjin"},{"id":1859,"name":"叙永","abbr":"XY","area_code":"510524","sort":9999,"latitude":28.167919,"longitude":105.437775,"is_map":true,"pinyin":"xuyong"},{"id":1879,"name":"西充","abbr":"XC","area_code":"511325","sort":9999,"latitude":30.994616,"longitude":105.893021,"is_map":true,"pinyin":"xichong"},{"id":1956,"name":"息烽","abbr":"XF","area_code":"520122","sort":9999,"latitude":27.092665,"longitude":106.737694,"is_map":true,"pinyin":"xifeng"},{"id":1957,"name":"修文","abbr":"XW","area_code":"520123","sort":9999,"latitude":26.840672,"longitude":106.59922,"is_map":true,"pinyin":"xiuwen"},{"id":1969,"name":"习水","abbr":"XS","area_code":"520330","sort":9999,"latitude":28.327826,"longitude":106.200951,"is_map":true,"pinyin":"xishui"},{"id":1987,"name":"兴仁","abbr":"XR","area_code":"522322","sort":9999,"latitude":25.431377,"longitude":105.19278,"is_map":true,"pinyin":"xingren"},{"id":2027,"name":"寻甸回族彝族自治县","abbr":"XDHZYZZZX","area_code":"530129","sort":9999,"latitude":25.559475,"longitude":103.257591,"is_map":true,"pinyin":"xundianhuizuyizuzizhixian"},{"id":2036,"name":"新平彝族傣族自治县","abbr":"XPYZDZZZX","area_code":"530427","sort":9999,"latitude":24.066401,"longitude":101.990906,"is_map":true,"pinyin":"xinpingyizudaizuzizhixian"},{"id":2062,"name":"西盟佤族自治县","abbr":"XMWZZZX","area_code":"530829","sort":9999,"latitude":22.644423,"longitude":99.594376,"is_map":true,"pinyin":"ximengwazuzizhixian"},{"id":2091,"name":"西畴","abbr":"XC","area_code":"532623","sort":9999,"latitude":23.437439,"longitude":104.675713,"is_map":true,"pinyin":"xichou"},{"id":2097,"name":"西双版纳傣族自治州","abbr":"XSBNDZZZZ","area_code":"532800","sort":9999,"latitude":22.001724,"longitude":100.797943,"is_map":true,"pinyin":"xishuangbannadaizuzizhizhou"},{"id":2123,"name":"香格里拉","abbr":"XGLL","area_code":"533421","sort":9999,"latitude":27.825804,"longitude":99.708664,"is_map":true,"pinyin":"xianggelila"},{"id":2227,"name":"兴平","abbr":"XP","area_code":"610481","sort":9999,"latitude":34.297134,"longitude":108.488495,"is_map":true,"pinyin":"xingping"},{"id":5557,"name":"新洲区","abbr":"XZQ","area_code":"420117","sort":9999,"latitude":30.84215,"longitude":114.802109,"is_map":true,"pinyin":"xinzhouqu"}],"T":[{"id":5,"name":"天津","abbr":"TJ","area_code":"022","sort":14,"latitude":39.085098,"longitude":117.199371,"is_map":true,"pinyin":"tianjin"},{"id":43,"name":"太原","abbr":"TY","area_code":"0351","sort":2000,"latitude":37.87059,"longitude":112.550667,"is_map":true,"pinyin":"taiyuan"},{"id":52,"name":"台州","abbr":"TZ","area_code":"0576","sort":2000,"latitude":28.656111,"longitude":121.420563,"is_map":true,"pinyin":"taizhou"},{"id":65,"name":"铜陵","abbr":"TL","area_code":"0562","sort":2000,"latitude":30.908871,"longitude":117.742203,"is_map":true,"pinyin":"tongling"},{"id":74,"name":"泰安","abbr":"TA","area_code":"0538","sort":2000,"latitude":36.19994,"longitude":117.088402,"is_map":true,"pinyin":"taian"},{"id":87,"name":"唐山","abbr":"TS","area_code":"0315","sort":2000,"latitude":39.630482,"longitude":118.18058,"is_map":true,"pinyin":"tangshan"},{"id":93,"name":"泰州","abbr":"TZ","area_code":"0523","sort":2000,"latitude":32.45546,"longitude":119.925537,"is_map":true,"pinyin":"taizhou"},{"id":113,"name":"泰兴","abbr":"TX","area_code":"321200","sort":2000,"latitude":32.171909,"longitude":120.052002,"is_map":true,"pinyin":"taixing"},{"id":226,"name":"铜仁","abbr":"TR","area_code":"0856","sort":2000,"latitude":27.69066,"longitude":109.180992,"is_map":true,"pinyin":"tongren"},{"id":239,"name":"通化","abbr":"TH","area_code":"0435","sort":2000,"latitude":41.728291,"longitude":125.939903,"is_map":true,"pinyin":"tonghua"},{"id":268,"name":"通辽","abbr":"TL","area_code":"0475","sort":2000,"latitude":43.65247,"longitude":122.24469,"is_map":true,"pinyin":"tongliao"},{"id":298,"name":"天水","abbr":"TS","area_code":"0938","sort":2000,"latitude":34.580849,"longitude":105.724861,"is_map":true,"pinyin":"tianshui"},{"id":382,"name":"铁岭","abbr":"TL","area_code":"0241","sort":2000,"latitude":42.286201,"longitude":123.842407,"is_map":true,"pinyin":"tieling"},{"id":454,"name":"太和","abbr":"TH","area_code":"200000","sort":2000,"latitude":33.160259,"longitude":115.622032,"is_map":true,"pinyin":"taihe"},{"id":461,"name":"天长","abbr":"TC","area_code":"200007","sort":2000,"latitude":32.689449,"longitude":119.003548,"is_map":true,"pinyin":"tianchang"},{"id":474,"name":"桐城","abbr":"TC","area_code":"200020","sort":2000,"latitude":31.035851,"longitude":116.974159,"is_map":true,"pinyin":"tongcheng"},{"id":539,"name":"台山","abbr":"TS","area_code":"200085","sort":2000,"latitude":22.25156,"longitude":112.7939,"is_map":true,"pinyin":"taishan"},{"id":585,"name":"屯昌","abbr":"TC","area_code":"200131","sort":2000,"latitude":19.35182,"longitude":110.10347,"is_map":true,"pinyin":"tunchang"},{"id":622,"name":"唐河","abbr":"TH","area_code":"200168","sort":2000,"latitude":32.681171,"longitude":112.807449,"is_map":true,"pinyin":"tanghe"},{"id":638,"name":"太康","abbr":"TK","area_code":"200184","sort":2000,"latitude":34.063789,"longitude":114.837791,"is_map":true,"pinyin":"taikang"},{"id":694,"name":"通许","abbr":"TX","area_code":"200240","sort":2000,"latitude":34.480438,"longitude":114.467407,"is_map":true,"pinyin":"tongxu"},{"id":707,"name":"铁力","abbr":"TL","area_code":"200253","sort":2000,"latitude":46.986641,"longitude":128.032425,"is_map":true,"pinyin":"tieli"},{"id":710,"name":"天门","abbr":"TM","area_code":"200256","sort":2000,"latitude":30.663389,"longitude":113.166138,"is_map":true,"pinyin":"tianmen"},{"id":766,"name":"桃江","abbr":"TJ","area_code":"200312","sort":2000,"latitude":28.51819,"longitude":112.155708,"is_map":true,"pinyin":"taojiang"},{"id":776,"name":"桃源","abbr":"TY","area_code":"200322","sort":2000,"latitude":28.90259,"longitude":111.48893,"is_map":true,"pinyin":"taoyuan"},{"id":823,"name":"洮南","abbr":"TN","area_code":"200369","sort":2000,"latitude":45.33559,"longitude":122.786346,"is_map":true,"pinyin":"taonan"},{"id":842,"name":"太仓","abbr":"TC","area_code":"200388","sort":2000,"latitude":31.45911,"longitude":121.129753,"is_map":true,"pinyin":"taicang"},{"id":894,"name":"泰和","abbr":"TH","area_code":"200440","sort":2000,"latitude":26.78993,"longitude":114.908867,"is_map":true,"pinyin":"taihe"},{"id":913,"name":"调兵山","abbr":"TBS","area_code":"200459","sort":2000,"latitude":42.467548,"longitude":123.566902,"is_map":true,"pinyin":"tiaobingshan"},{"id":923,"name":"滕州","abbr":"TZ","area_code":"200469","sort":2000,"latitude":35.11338,"longitude":117.165962,"is_map":true,"pinyin":"tengzhou"},{"id":942,"name":"郯城","abbr":"TC","area_code":"200488","sort":2000,"latitude":34.613571,"longitude":118.367172,"is_map":true,"pinyin":"tancheng"},{"id":1008,"name":"铜川","abbr":"TC","area_code":"200554","sort":2000,"latitude":34.896729,"longitude":108.945152,"is_map":true,"pinyin":"tongchuan"},{"id":1074,"name":"腾冲","abbr":"TC","area_code":"200620","sort":2000,"latitude":25.020531,"longitude":98.490967,"is_map":true,"pinyin":"tengchong"},{"id":1084,"name":"桐乡","abbr":"TX","area_code":"200630","sort":2000,"latitude":30.630739,"longitude":120.564323,"is_map":true,"pinyin":"tongxiang"},{"id":1104,"name":"桐庐","abbr":"TL","area_code":"200650","sort":2000,"latitude":29.793171,"longitude":119.691498,"is_map":true,"pinyin":"tonglu"},{"id":1108,"name":"天台","abbr":"TT","area_code":"200654","sort":2000,"latitude":29.14304,"longitude":121.007278,"is_map":true,"pinyin":"tiantai"},{"id":1126,"name":"铜梁","abbr":"TL","area_code":"200672","sort":2000,"latitude":29.844749,"longitude":106.056381,"is_map":true,"pinyin":"tongliang"},{"id":1127,"name":"潼南","abbr":"TN","area_code":"200673","sort":2000,"latitude":30.19054,"longitude":105.839523,"is_map":true,"pinyin":"tongnan"},{"id":1164,"name":"土默特右旗","abbr":"TMTYQ","area_code":"150221","sort":9999,"latitude":40.568829,"longitude":110.524208,"is_map":true,"pinyin":"tumoteyouqi"},{"id":1206,"name":"唐县","abbr":"TX","area_code":"130627","sort":9999,"latitude":38.759914,"longitude":115.003204,"is_map":true,"pinyin":"tangxian"},{"id":1295,"name":"太谷县","abbr":"TGX","area_code":"140726","sort":9999,"latitude":37.424595,"longitude":112.5541,"is_map":true,"pinyin":"taigu"},{"id":1343,"name":"土默特左旗","abbr":"TMTZQ","area_code":"150121","sort":9999,"latitude":40.720417,"longitude":111.133614,"is_map":true,"pinyin":"tumotezuoqi"},{"id":1402,"name":"突泉","abbr":"TQ","area_code":"152224","sort":9999,"latitude":45.380985,"longitude":121.564857,"is_map":true,"pinyin":"tuquan"},{"id":1410,"name":"太仆寺旗","abbr":"TPSQ","area_code":"152527","sort":9999,"latitude":41.895199,"longitude":115.287277,"is_map":true,"pinyin":"taipusiqi"},{"id":1422,"name":"台安","abbr":"TA","area_code":"210320","sort":9999,"latitude":41.38686,"longitude":122.429733,"is_map":true,"pinyin":"taian"},{"id":1449,"name":"通化","abbr":"TH","area_code":"220521","sort":9999,"latitude":41.677917,"longitude":125.75312,"is_map":true,"pinyin":"tonghua"},{"id":1459,"name":"通榆","abbr":"TY","area_code":"220822","sort":9999,"latitude":44.809151,"longitude":123.088547,"is_map":true,"pinyin":"tongyu"},{"id":1460,"name":"图们","abbr":"TM","area_code":"222402","sort":9999,"latitude":42.966621,"longitude":129.846695,"is_map":true,"pinyin":"tumen"},{"id":1469,"name":"通河县","abbr":"THX","area_code":"230128","sort":9999,"latitude":45.455647,"longitude":128.331879,"is_map":true,"pinyin":"tonghe"},{"id":1471,"name":"泰来","abbr":"TL","area_code":"230224","sort":9999,"latitude":46.39233,"longitude":123.419533,"is_map":true,"pinyin":"tailai"},{"id":1493,"name":"汤原","abbr":"TY","area_code":"230828","sort":9999,"latitude":46.730049,"longitude":129.904465,"is_map":true,"pinyin":"tangyuan"},{"id":1495,"name":"同江","abbr":"TJ","area_code":"230881","sort":9999,"latitude":47.651131,"longitude":132.510117,"is_map":true,"pinyin":"tongjiang"},{"id":1513,"name":"塔河","abbr":"TH","area_code":"232722","sort":9999,"latitude":52.335228,"longitude":124.710518,"is_map":true,"pinyin":"tahe"},{"id":1517,"name":"泰顺县","abbr":"TSX","area_code":"330329","sort":9999,"latitude":27.557308,"longitude":119.71624,"is_map":true,"pinyin":"taishun"},{"id":1532,"name":"太湖县","abbr":"THX","area_code":"340825","sort":9999,"latitude":30.451868,"longitude":116.305222,"is_map":true,"pinyin":"taihu"},{"id":1555,"name":"泰宁","abbr":"TN","area_code":"350429","sort":9999,"latitude":26.897995,"longitude":117.177521,"is_map":true,"pinyin":"taining"},{"id":1607,"name":"铜鼓","abbr":"TG","area_code":"360926","sort":9999,"latitude":28.520956,"longitude":114.37014,"is_map":true,"pinyin":"tonggu"},{"id":1649,"name":"汤阴","abbr":"TY","area_code":"410523","sort":9999,"latitude":35.922348,"longitude":114.362358,"is_map":true,"pinyin":"tangyin"},{"id":1660,"name":"台前","abbr":"TQ","area_code":"410927","sort":9999,"latitude":35.996475,"longitude":115.855682,"is_map":true,"pinyin":"taiqian"},{"id":1686,"name":"团风","abbr":"TF","area_code":"421121","sort":9999,"latitude":30.635691,"longitude":114.872032,"is_map":true,"pinyin":"tuanfeng"},{"id":1689,"name":"通城县","abbr":"TCX","area_code":"421222","sort":9999,"latitude":29.246077,"longitude":113.814133,"is_map":true,"pinyin":"tongcheng"},{"id":1790,"name":"藤县","abbr":"TX","area_code":"450422","sort":9999,"latitude":23.373962,"longitude":110.931824,"is_map":true,"pinyin":"tengxian"},{"id":1803,"name":"田阳","abbr":"TY","area_code":"451021","sort":9999,"latitude":23.736078,"longitude":106.904312,"is_map":true,"pinyin":"tianyang"},{"id":1804,"name":"田东","abbr":"TD","area_code":"451022","sort":9999,"latitude":23.600445,"longitude":107.12426,"is_map":true,"pinyin":"tiandong"},{"id":1811,"name":"田林","abbr":"TL","area_code":"451029","sort":9999,"latitude":24.290262,"longitude":106.235046,"is_map":true,"pinyin":"tianlin"},{"id":1819,"name":"天峨","abbr":"TE","area_code":"451222","sort":9999,"latitude":24.985964,"longitude":107.174942,"is_map":true,"pinyin":"tiane"},{"id":1961,"name":"桐梓","abbr":"TZ","area_code":"520322","sort":9999,"latitude":28.131559,"longitude":106.826591,"is_map":true,"pinyin":"tongzi"},{"id":2000,"name":"天柱","abbr":"TZ","area_code":"522627","sort":9999,"latitude":26.909683,"longitude":109.212799,"is_map":true,"pinyin":"tianzhu"},{"id":2003,"name":"台江","abbr":"TJ","area_code":"522630","sort":9999,"latitude":26.669138,"longitude":108.314636,"is_map":true,"pinyin":"taijiang"},{"id":2032,"name":"通海","abbr":"TH","area_code":"530423","sort":9999,"latitude":24.112206,"longitude":102.76004,"is_map":true,"pinyin":"tonghai"},{"id":2229,"name":"潼关","abbr":"TG","area_code":"610522","sort":9999,"latitude":34.544514,"longitude":110.247261,"is_map":true,"pinyin":"tongguan"},{"id":2371,"name":"同仁县","abbr":"TRX","area_code":"632321","sort":9999,"latitude":35.516338,"longitude":102.017601,"is_map":true,"pinyin":"tongren"}],"Q":[{"id":28,"name":"青岛","abbr":"QD","area_code":"0532","sort":15,"latitude":36.066231,"longitude":120.382988,"is_map":true,"pinyin":"qingdao"},{"id":341,"name":"庆阳","abbr":"QY","area_code":"0934","sort":1900,"latitude":35.709782,"longitude":107.642921,"is_map":true,"pinyin":"qingyang"},{"id":63,"name":"秦皇岛","abbr":"QHD","area_code":"0335","sort":2000,"latitude":39.935452,"longitude":119.59964,"is_map":true,"pinyin":"qinhuangdao"},{"id":91,"name":"齐齐哈尔","abbr":"QQHE","area_code":"0452","sort":2000,"latitude":47.354309,"longitude":123.917961,"is_map":true,"pinyin":"qiqihaer"},{"id":102,"name":"泉州","abbr":"QZ","area_code":"0595","sort":2000,"latitude":24.87389,"longitude":118.675873,"is_map":true,"pinyin":"quanzhou"},{"id":157,"name":"钦州","abbr":"QZ","area_code":"0777","sort":2000,"latitude":21.9797,"longitude":108.654312,"is_map":true,"pinyin":"qinzhou"},{"id":182,"name":"衢州","abbr":"QZ","area_code":"0570","sort":2000,"latitude":28.935921,"longitude":118.874191,"is_map":true,"pinyin":"quzhou"},{"id":265,"name":"曲靖","abbr":"QJS","area_code":"0874","sort":2000,"latitude":25.490021,"longitude":103.796249,"is_map":true,"pinyin":"qujingshi"},{"id":278,"name":"琼海","abbr":"QH","area_code":"469002","sort":2000,"latitude":19.258381,"longitude":110.47464,"is_map":true,"pinyin":"qionghai"},{"id":444,"name":"綦江","abbr":"QJ","area_code":"10022","sort":2000,"latitude":28.96463,"longitude":106.92852,"is_map":true,"pinyin":"qijiang"},{"id":445,"name":"潜江","abbr":"QJ","area_code":"10023","sort":2000,"latitude":30.40147,"longitude":112.8993,"is_map":true,"pinyin":"qianjiang"},{"id":491,"name":"全椒","abbr":"QJ","area_code":"200037","sort":2000,"latitude":32.0853,"longitude":118.273033,"is_map":true,"pinyin":"quanjiao"},{"id":492,"name":"潜山","abbr":"QS","area_code":"200038","sort":2000,"latitude":30.631069,"longitude":116.581329,"is_map":true,"pinyin":"qianshan"},{"id":549,"name":"清新","abbr":"QX","area_code":"200095","sort":2000,"latitude":23.734739,"longitude":113.016579,"is_map":true,"pinyin":"qingxin"},{"id":573,"name":"黔西","abbr":"QX","area_code":"200119","sort":2000,"latitude":27.008659,"longitude":106.032303,"is_map":true,"pinyin":"qianxi"},{"id":597,"name":"清苑","abbr":"QY","area_code":"200143","sort":2000,"latitude":38.765259,"longitude":115.489891,"is_map":true,"pinyin":"qingyuan"},{"id":611,"name":"青县","abbr":"QX","area_code":"200157","sort":2000,"latitude":38.583481,"longitude":116.803177,"is_map":true,"pinyin":"qingxian"},{"id":615,"name":"清河","abbr":"QH","area_code":"200161","sort":2000,"latitude":37.039928,"longitude":115.667183,"is_map":true,"pinyin":"qinghe"},{"id":651,"name":"杞县","abbr":"QX","area_code":"200197","sort":2000,"latitude":34.550339,"longitude":114.782829,"is_map":true,"pinyin":"qixian"},{"id":666,"name":"沁阳","abbr":"QY","area_code":"200212","sort":2000,"latitude":35.087601,"longitude":112.9506,"is_map":true,"pinyin":"qinyang"},{"id":698,"name":"七台河","abbr":"QTH","area_code":"200244","sort":2000,"latitude":45.770649,"longitude":131.003067,"is_map":true,"pinyin":"qitaihe"},{"id":730,"name":"蕲春","abbr":"QC","area_code":"200276","sort":2000,"latitude":30.22617,"longitude":115.436211,"is_map":true,"pinyin":"qichun"},{"id":755,"name":"祁东","abbr":"QD","area_code":"200301","sort":2000,"latitude":26.79965,"longitude":112.090431,"is_map":true,"pinyin":"qidong"},{"id":764,"name":"祁阳","abbr":"QY","area_code":"200310","sort":2000,"latitude":26.58012,"longitude":111.840149,"is_map":true,"pinyin":"qiyang"},{"id":836,"name":"启东","abbr":"QD","area_code":"200382","sort":2000,"latitude":31.80805,"longitude":121.657867,"is_map":true,"pinyin":"qidong"},{"id":943,"name":"青州","abbr":"QZ","area_code":"200489","sort":2000,"latitude":36.684559,"longitude":118.47966,"is_map":true,"pinyin":"qingzhou"},{"id":956,"name":"齐河","abbr":"QH","area_code":"200502","sort":2000,"latitude":36.794922,"longitude":116.760017,"is_map":true,"pinyin":"qihe"},{"id":957,"name":"曲阜","abbr":"QF","area_code":"200503","sort":2000,"latitude":35.580818,"longitude":116.986481,"is_map":true,"pinyin":"qufu"},{"id":989,"name":"栖霞","abbr":"QX","area_code":"200535","sort":2000,"latitude":37.335049,"longitude":120.84977,"is_map":true,"pinyin":"qixia"},{"id":1020,"name":"渠县","abbr":"QX","area_code":"200566","sort":2000,"latitude":30.836639,"longitude":106.972992,"is_map":true,"pinyin":"quxian"},{"id":1042,"name":"邛崃","abbr":"QL","area_code":"200588","sort":2000,"latitude":30.41032,"longitude":103.464363,"is_map":true,"pinyin":"qionglai"},{"id":1114,"name":"青田","abbr":"QT","area_code":"200660","sort":2000,"latitude":28.13987,"longitude":120.289551,"is_map":true,"pinyin":"qingtian"},{"id":371,"name":"清远","abbr":"QY","area_code":"0763","sort":9999,"latitude":23.682011,"longitude":113.056152,"is_map":true,"pinyin":"qingyuan"},{"id":378,"name":"迁安","abbr":"QA","area_code":"03152","sort":9999,"latitude":39.99836,"longitude":118.700729,"is_map":true,"pinyin":"qianan"},{"id":1150,"name":"青阳","abbr":"QY","area_code":"341723","sort":9999,"latitude":30.639351,"longitude":117.847488,"is_map":true,"pinyin":"qingyang"},{"id":1175,"name":"黔南","abbr":"QN","area_code":"522700","sort":9999,"latitude":26.254271,"longitude":107.522263,"is_map":true,"pinyin":"qiannan"},{"id":1176,"name":"黔东南","abbr":"QDN","area_code":"522600","sort":9999,"latitude":26.583639,"longitude":107.984161,"is_map":true,"pinyin":"qiandongnan"},{"id":1177,"name":"黔西南","abbr":"QXN","area_code":"522300","sort":9999,"latitude":25.08988,"longitude":104.904373,"is_map":true,"pinyin":"qianxinan"},{"id":1185,"name":"邱县","abbr":"QX","area_code":"130430","sort":9999,"latitude":36.813251,"longitude":115.168587,"is_map":true,"pinyin":"qiuxian"},{"id":1189,"name":"曲周","abbr":"QZ","area_code":"130435","sort":9999,"latitude":36.773399,"longitude":114.957588,"is_map":true,"pinyin":"quzhou"},{"id":1212,"name":"曲阳","abbr":"QY","area_code":"130634","sort":9999,"latitude":38.619991,"longitude":114.704056,"is_map":true,"pinyin":"quyang"},{"id":1296,"name":"祁县","abbr":"QX","area_code":"140727","sort":9999,"latitude":37.358738,"longitude":112.330528,"is_map":true,"pinyin":"qixian"},{"id":1317,"name":"曲沃","abbr":"QW","area_code":"141021","sort":9999,"latitude":35.641388,"longitude":111.475533,"is_map":true,"pinyin":"quwo"},{"id":1426,"name":"清原满族自治县","abbr":"QYMZZZX","area_code":"210423","sort":9999,"latitude":42.101349,"longitude":124.927193,"is_map":true,"pinyin":"qingyuanmanzuzizhixian"},{"id":1456,"name":"乾安","abbr":"QA","area_code":"220723","sort":9999,"latitude":45.006847,"longitude":124.024361,"is_map":true,"pinyin":"qianan"},{"id":1507,"name":"青冈","abbr":"QG","area_code":"231223","sort":9999,"latitude":46.686596,"longitude":126.112267,"is_map":true,"pinyin":"qinggang"},{"id":1508,"name":"庆安","abbr":"QA","area_code":"231224","sort":9999,"latitude":46.879204,"longitude":127.510025,"is_map":true,"pinyin":"qingan"},{"id":1525,"name":"庆元","abbr":"QY","area_code":"331126","sort":9999,"latitude":27.618231,"longitude":119.06723,"is_map":true,"pinyin":"qingyuan"},{"id":1552,"name":"清流","abbr":"QL","area_code":"350423","sort":9999,"latitude":26.17761,"longitude":116.815819,"is_map":true,"pinyin":"qingliu"},{"id":1591,"name":"全南","abbr":"QN","area_code":"360729","sort":9999,"latitude":24.742651,"longitude":114.531586,"is_map":true,"pinyin":"quannan"},{"id":1635,"name":"庆云","abbr":"QY","area_code":"371423","sort":9999,"latitude":37.777725,"longitude":117.390511,"is_map":true,"pinyin":"qingyun"},{"id":1651,"name":"淇县","abbr":"QX","area_code":"410622","sort":9999,"latitude":35.609478,"longitude":114.200378,"is_map":true,"pinyin":"qixian"},{"id":1657,"name":"清丰","abbr":"QF","area_code":"410922","sort":9999,"latitude":35.902412,"longitude":115.107285,"is_map":true,"pinyin":"qingfeng"},{"id":1780,"name":"全州","abbr":"QZ","area_code":"450324","sort":9999,"latitude":25.929897,"longitude":111.07299,"is_map":true,"pinyin":"quanzhou"},{"id":1849,"name":"琼中黎族苗族自治县","abbr":"QZLZMZZZX","area_code":"469030","sort":9999,"latitude":19.03557,"longitude":109.839996,"is_map":true,"pinyin":"qiongzhonglizumiaozuzizhixian"},{"id":1958,"name":"清镇","abbr":"QZ","area_code":"520181","sort":9999,"latitude":26.551289,"longitude":106.470276,"is_map":true,"pinyin":"qingzhen"},{"id":1986,"name":"迁西","abbr":"QX","area_code":"130227","sort":9999,"latitude":40.146236,"longitude":118.305138,"is_map":true,"pinyin":"qianxi"},{"id":1989,"name":"晴隆","abbr":"QL","area_code":"522324","sort":9999,"latitude":25.832882,"longitude":105.218773,"is_map":true,"pinyin":"qinglong"},{"id":2042,"name":"巧家","abbr":"QJ","area_code":"530622","sort":9999,"latitude":26.911699,"longitude":102.929283,"is_map":true,"pinyin":"qiaojia"},{"id":2094,"name":"丘北","abbr":"QB","area_code":"532626","sort":9999,"latitude":24.040981,"longitude":104.194366,"is_map":true,"pinyin":"qiubei"},{"id":2409,"name":"青铜峡","abbr":"QTX","area_code":"640381","sort":9999,"latitude":38.021507,"longitude":106.075394,"is_map":true,"pinyin":"qingtongxia"},{"id":5419,"name":"泉港区","abbr":"QGX","area_code":"350505","sort":9999,"latitude":25.12686,"longitude":118.912285,"is_map":true,"pinyin":"quangangqu"},{"id":5738,"name":"黔江区","abbr":"QJQ","area_code":"500114","sort":9999,"latitude":29.527548,"longitude":108.782578,"is_map":true,"pinyin":"qianjiangqu"}],"W":[{"id":7,"name":"武汉","abbr":"WH","area_code":"027","sort":20,"latitude":30.59276,"longitude":114.305252,"is_map":true,"pinyin":"wuhan"},{"id":30,"name":"温州","abbr":"WZ","area_code":"0577","sort":2000,"latitude":27.994921,"longitude":120.699387,"is_map":true,"pinyin":"wenzhou"},{"id":34,"name":"威海","abbr":"WH","area_code":"0631","sort":2000,"latitude":37.513481,"longitude":122.121712,"is_map":true,"pinyin":"weihai"},{"id":35,"name":"无锡","abbr":"WX","area_code":"0510","sort":2000,"latitude":31.49099,"longitude":120.31237,"is_map":true,"pinyin":"wuxi"},{"id":38,"name":"芜湖","abbr":"WH","area_code":"0553","sort":2000,"latitude":31.352461,"longitude":118.433128,"is_map":true,"pinyin":"wuhu"},{"id":48,"name":"潍坊","abbr":"WF","area_code":"0536","sort":2000,"latitude":36.70686,"longitude":119.161758,"is_map":true,"pinyin":"weifang"},{"id":236,"name":"乌鲁木齐","abbr":"WLMQ","area_code":"0991","sort":2000,"latitude":43.82663,"longitude":87.616882,"is_map":true,"pinyin":"wulumuqi"},{"id":243,"name":"梧州","abbr":"WZ","area_code":"0774","sort":2000,"latitude":23.47703,"longitude":111.279129,"is_map":true,"pinyin":"wuzhou"},{"id":282,"name":"文昌","abbr":"WC","area_code":"0989","sort":2000,"latitude":19.543289,"longitude":110.797737,"is_map":true,"pinyin":"wenchang"},{"id":293,"name":"文山","abbr":"WS","area_code":"0876","sort":2000,"latitude":23.38678,"longitude":104.233002,"is_map":true,"pinyin":"wenshan"},{"id":306,"name":"渭南","abbr":"WN","area_code":"0913","sort":2000,"latitude":34.499969,"longitude":109.510147,"is_map":true,"pinyin":"weinan"},{"id":393,"name":"乌海","abbr":"WH","area_code":"0473","sort":2000,"latitude":39.653839,"longitude":106.795464,"is_map":true,"pinyin":"wuhai"},{"id":394,"name":"乌兰察布","abbr":"WLCB","area_code":"0474","sort":2000,"latitude":40.993912,"longitude":113.133759,"is_map":true,"pinyin":"wulanchabu"},{"id":396,"name":"吴忠","abbr":"WZ","area_code":"0953","sort":2000,"latitude":37.997551,"longitude":106.198792,"is_map":true,"pinyin":"wuzhong"},{"id":449,"name":"万州","abbr":"WZ","area_code":"10027","sort":2000,"latitude":30.807899,"longitude":108.40873,"is_map":true,"pinyin":"wanzhou"},{"id":455,"name":"无为","abbr":"WW","area_code":"200001","sort":2000,"latitude":31.303169,"longitude":117.902237,"is_map":true,"pinyin":"wuwei"},{"id":463,"name":"涡阳","abbr":"WY","area_code":"200009","sort":2000,"latitude":33.492851,"longitude":116.215813,"is_map":true,"pinyin":"woyang"},{"id":483,"name":"五河","abbr":"WH","area_code":"200029","sort":2000,"latitude":33.145069,"longitude":117.885292,"is_map":true,"pinyin":"wuhe"},{"id":489,"name":"望江","abbr":"WJ","area_code":"200035","sort":2000,"latitude":30.12442,"longitude":116.694229,"is_map":true,"pinyin":"wangjiang"},{"id":523,"name":"武威","abbr":"WW","area_code":"200069","sort":2000,"latitude":37.9282,"longitude":102.63797,"is_map":true,"pinyin":"wuwei"},{"id":546,"name":"吴川","abbr":"WC","area_code":"200092","sort":2000,"latitude":21.44182,"longitude":110.778236,"is_map":true,"pinyin":"wuchuan"},{"id":557,"name":"五华","abbr":"WH","area_code":"200103","sort":2000,"latitude":23.932541,"longitude":115.776093,"is_map":true,"pinyin":"wuhua"},{"id":581,"name":"万宁","abbr":"WN","area_code":"200127","sort":2000,"latitude":18.795321,"longitude":110.389748,"is_map":true,"pinyin":"wanning"},{"id":588,"name":"魏县","abbr":"WX","area_code":"200134","sort":2000,"latitude":36.359909,"longitude":114.93882,"is_map":true,"pinyin":"weixian"},{"id":602,"name":"文安","abbr":"WA","area_code":"200148","sort":2000,"latitude":38.87328,"longitude":116.458481,"is_map":true,"pinyin":"wenan"},{"id":654,"name":"尉氏","abbr":"WS","area_code":"200200","sort":2000,"latitude":34.41161,"longitude":114.19297,"is_map":true,"pinyin":"weishi"},{"id":673,"name":"武陟","abbr":"WZ","area_code":"200219","sort":2000,"latitude":35.099522,"longitude":113.40184,"is_map":true,"pinyin":"wuzhi"},{"id":677,"name":"舞阳","abbr":"WY","area_code":"200223","sort":2000,"latitude":33.437649,"longitude":113.609306,"is_map":true,"pinyin":"wuyang"},{"id":688,"name":"卫辉","abbr":"WH","area_code":"200234","sort":2000,"latitude":35.398472,"longitude":114.06459,"is_map":true,"pinyin":"weihui"},{"id":693,"name":"温县","abbr":"WX","area_code":"200239","sort":2000,"latitude":34.940231,"longitude":113.080566,"is_map":true,"pinyin":"wenxian"},{"id":701,"name":"五常","abbr":"WC","area_code":"200247","sort":2000,"latitude":44.931911,"longitude":127.167458,"is_map":true,"pinyin":"wuchang"},{"id":726,"name":"武穴","abbr":"WX","area_code":"200272","sort":2000,"latitude":29.84433,"longitude":115.561302,"is_map":true,"pinyin":"wuxue"},{"id":774,"name":"望城","abbr":"WC","area_code":"200320","sort":2000,"latitude":28.36121,"longitude":112.817902,"is_map":true,"pinyin":"wangcheng"},{"id":788,"name":"武冈","abbr":"WG","area_code":"200334","sort":2000,"latitude":26.726589,"longitude":110.631378,"is_map":true,"pinyin":"wugang"},{"id":824,"name":"汪清","abbr":"WQ","area_code":"200370","sort":2000,"latitude":43.312809,"longitude":129.771255,"is_map":true,"pinyin":"wangqing"},{"id":825,"name":"吴江","abbr":"WJ","area_code":"200371","sort":2000,"latitude":31.137621,"longitude":120.645042,"is_map":true,"pinyin":"wujiang"},{"id":916,"name":"乌兰浩特","abbr":"WLHT","area_code":"200462","sort":2000,"latitude":46.072819,"longitude":122.093163,"is_map":true,"pinyin":"wulanhaote"},{"id":960,"name":"文登","abbr":"WD","area_code":"200506","sort":2000,"latitude":37.19397,"longitude":122.058098,"is_map":true,"pinyin":"wendeng"},{"id":964,"name":"微山","abbr":"WS","area_code":"200510","sort":2000,"latitude":34.807178,"longitude":117.12886,"is_map":true,"pinyin":"weishan"},{"id":983,"name":"汶上","abbr":"WS","area_code":"200529","sort":2000,"latitude":35.732811,"longitude":116.489166,"is_map":true,"pinyin":"wenshang"},{"id":990,"name":"无棣","abbr":"WD","area_code":"200536","sort":2000,"latitude":37.769932,"longitude":117.625771,"is_map":true,"pinyin":"wudi"},{"id":991,"name":"武城","abbr":"WC","area_code":"200537","sort":2000,"latitude":37.213169,"longitude":116.069229,"is_map":true,"pinyin":"wucheng"},{"id":1007,"name":"闻喜","abbr":"WX","area_code":"200553","sort":2000,"latitude":35.356628,"longitude":111.224716,"is_map":true,"pinyin":"wenxi"},{"id":1031,"name":"威远","abbr":"WY","area_code":"200577","sort":2000,"latitude":29.52742,"longitude":104.668854,"is_map":true,"pinyin":"weiyuan"},{"id":1077,"name":"温岭","abbr":"WL","area_code":"200623","sort":2000,"latitude":28.371799,"longitude":121.385986,"is_map":true,"pinyin":"wenling"},{"id":1103,"name":"武义","abbr":"WY","area_code":"200649","sort":2000,"latitude":28.892599,"longitude":119.816513,"is_map":true,"pinyin":"wuyi"},{"id":1132,"name":"巫山","abbr":"WS","area_code":"200678","sort":2000,"latitude":31.074619,"longitude":109.878799,"is_map":true,"pinyin":"wushan"},{"id":1133,"name":"武隆","abbr":"WL","area_code":"200679","sort":2000,"latitude":29.32543,"longitude":107.759933,"is_map":true,"pinyin":"wulong"},{"id":1134,"name":"巫溪","abbr":"WX","area_code":"200680","sort":2000,"latitude":31.3986,"longitude":109.57016,"is_map":true,"pinyin":"wuxi"},{"id":363,"name":"武安","abbr":"WA","area_code":"03101","sort":9999,"latitude":36.696709,"longitude":114.203758,"is_map":true,"pinyin":"wuan"},{"id":375,"name":"瓦房店","abbr":"WFD","area_code":"04111","sort":9999,"latitude":39.626438,"longitude":121.97995,"is_map":true,"pinyin":"wafangdian"},{"id":1200,"name":"威县","abbr":"WX","area_code":"130533","sort":9999,"latitude":36.983273,"longitude":115.272751,"is_map":true,"pinyin":"weixian"},{"id":1210,"name":"望都","abbr":"WD","area_code":"130631","sort":9999,"latitude":38.707447,"longitude":115.154007,"is_map":true,"pinyin":"wangdu"},{"id":1225,"name":"万全","abbr":"WQ","area_code":"130729","sort":9999,"latitude":40.765137,"longitude":114.73613,"is_map":true,"pinyin":"wanquan"},{"id":1237,"name":"围场满族蒙古族自治县","abbr":"WCMZMGZZZX","area_code":"130828","sort":9999,"latitude":41.949406,"longitude":117.764084,"is_map":true,"pinyin":"weichangmanzumengguzuzizhixian"},{"id":1243,"name":"吴桥","abbr":"WQ","area_code":"130928","sort":9999,"latitude":37.628181,"longitude":116.39151,"is_map":true,"pinyin":"wuqiao"},{"id":1249,"name":"武邑","abbr":"WY","area_code":"131122","sort":9999,"latitude":37.803776,"longitude":115.892418,"is_map":true,"pinyin":"wuyi"},{"id":1250,"name":"武强","abbr":"WQ","area_code":"131123","sort":9999,"latitude":38.03698,"longitude":115.970238,"is_map":true,"pinyin":"wuqiang"},{"id":1298,"name":"万荣","abbr":"WR","area_code":"140822","sort":9999,"latitude":35.417042,"longitude":110.843559,"is_map":true,"pinyin":"wanrong"},{"id":1355,"name":"翁牛特旗","abbr":"WNTQ","area_code":"150426","sort":9999,"latitude":42.937126,"longitude":119.022621,"is_map":true,"pinyin":"wengniuteqi"},{"id":1369,"name":"乌审旗","abbr":"WSQ","area_code":"150626","sort":9999,"latitude":38.603703,"longitude":108.840927,"is_map":true,"pinyin":"wushenqi"},{"id":1381,"name":"五原","abbr":"WY","area_code":"150821","sort":9999,"latitude":41.097637,"longitude":108.27066,"is_map":true,"pinyin":"wuyuan"},{"id":1383,"name":"乌拉特前旗","abbr":"WLTQQ","area_code":"150823","sort":9999,"latitude":40.725208,"longitude":108.656815,"is_map":true,"pinyin":"wulateqianqi"},{"id":1384,"name":"乌拉特中旗","abbr":"WLTZQ","area_code":"150824","sort":9999,"latitude":41.57254,"longitude":108.515259,"is_map":true,"pinyin":"wulatezhongqi"},{"id":1385,"name":"乌拉特后旗","abbr":"WLTHQ","area_code":"150825","sort":9999,"latitude":41.084309,"longitude":107.074944,"is_map":true,"pinyin":"wulatehouqi"},{"id":1505,"name":"五大连池市","abbr":"WDLC","area_code":"231182","sort":9999,"latitude":48.512688,"longitude":126.197693,"is_map":true,"pinyin":"wudalianchi"},{"id":1506,"name":"望奎","abbr":"WK","area_code":"231221","sort":9999,"latitude":46.833519,"longitude":126.484192,"is_map":true,"pinyin":"wangkui"},{"id":1516,"name":"文成县","abbr":"WCX","area_code":"330328","sort":9999,"latitude":27.789133,"longitude":120.092453,"is_map":true,"pinyin":"wencheng"},{"id":1527,"name":"芜湖县","abbr":"WH","area_code":"340220","sort":9999,"latitude":31.145262,"longitude":118.572304,"is_map":true,"pinyin":"wuhuxian"},{"id":1564,"name":"武夷山","abbr":"WYS","area_code":"350782","sort":9999,"latitude":27.751734,"longitude":118.032799,"is_map":true,"pinyin":"wuyishan"},{"id":1566,"name":"武平","abbr":"WP","area_code":"350824","sort":9999,"latitude":25.08865,"longitude":116.100929,"is_map":true,"pinyin":"wuping"},{"id":1577,"name":"武宁","abbr":"WN","area_code":"360423","sort":9999,"latitude":29.260181,"longitude":115.105644,"is_map":true,"pinyin":"wuning"},{"id":1599,"name":"万安","abbr":"WA","area_code":"360828","sort":9999,"latitude":26.462086,"longitude":114.784691,"is_map":true,"pinyin":"wanan"},{"id":1603,"name":"万载","abbr":"WZ","area_code":"360922","sort":9999,"latitude":28.104528,"longitude":114.449013,"is_map":true,"pinyin":"wanzai"},{"id":1620,"name":"万年","abbr":"WN","area_code":"361129","sort":9999,"latitude":28.692589,"longitude":117.070152,"is_map":true,"pinyin":"wannian"},{"id":1621,"name":"婺源","abbr":"WY","area_code":"361130","sort":9999,"latitude":29.254015,"longitude":117.86219,"is_map":true,"pinyin":"wuyuan"},{"id":1633,"name":"五莲县","abbr":"WLX","area_code":"371121","sort":9999,"latitude":35.751938,"longitude":119.206741,"is_map":true,"pinyin":"wulian"},{"id":1647,"name":"舞钢","abbr":"WG","area_code":"410481","sort":9999,"latitude":33.302082,"longitude":113.526253,"is_map":true,"pinyin":"wugang"},{"id":1766,"name":"武鸣","abbr":"WM","area_code":"450122","sort":9999,"latitude":23.157164,"longitude":108.280716,"is_map":true,"pinyin":"wuming"},{"id":1830,"name":"武宣","abbr":"WX","area_code":"451323","sort":9999,"latitude":23.604162,"longitude":109.662872,"is_map":true,"pinyin":"wuxuan"},{"id":1892,"name":"武胜","abbr":"WS","area_code":"511622","sort":9999,"latitude":30.344292,"longitude":106.292473,"is_map":true,"pinyin":"wusheng"},{"id":1965,"name":"务川仡佬族苗族自治县","abbr":"WCGLZMZZZX","area_code":"520326","sort":9999,"latitude":28.521566,"longitude":107.887856,"is_map":true,"pinyin":"wuchuangelaozumiaozuzizhixian"},{"id":1976,"name":"威宁彝族回族苗族自治县","abbr":"WNYZHZMZZZX","area_code":"520526","sort":9999,"latitude":26.859098,"longitude":104.286522,"is_map":true,"pinyin":"weiningyizuhuizumiaozuzizhixian"},{"id":1991,"name":"望谟","abbr":"WM","area_code":"522326","sort":9999,"latitude":25.166668,"longitude":106.09156,"is_map":true,"pinyin":"wangmo"},{"id":2014,"name":"瓮安","abbr":"WA","area_code":"522725","sort":9999,"latitude":27.066339,"longitude":107.478416,"is_map":true,"pinyin":"wengan"},{"id":2048,"name":"威信","abbr":"WX","area_code":"530629","sort":9999,"latitude":27.843382,"longitude":105.048691,"is_map":true,"pinyin":"weixin"},{"id":2079,"name":"武定","abbr":"WD","area_code":"532329","sort":9999,"latitude":25.5301,"longitude":102.406784,"is_map":true,"pinyin":"wuding"},{"id":2105,"name":"巍山彝族回族自治县","abbr":"WSYZHZZZX","area_code":"532927","sort":9999,"latitude":25.230909,"longitude":100.30793,"is_map":true,"pinyin":"weishanyizuhuizuzizhixian"},{"id":2125,"name":"维西傈僳族自治县","abbr":"WXLSZZZX","area_code":"533423","sort":9999,"latitude":27.180948,"longitude":99.286354,"is_map":true,"pinyin":"weixilisuzuzizhixian"},{"id":2243,"name":"吴起","abbr":"WQ","area_code":"610626","sort":9999,"latitude":36.92485,"longitude":108.176979,"is_map":true,"pinyin":"wuqi"},{"id":5013,"name":"无极","abbr":"WJ","area_code":"130130","sort":9999,"latitude":38.176376,"longitude":114.977844,"is_map":true,"pinyin":"wuji"},{"id":5231,"name":"五营区","abbr":"WYQ","area_code":"230710","sort":9999,"latitude":48.108204,"longitude":129.245026,"is_map":true,"pinyin":"wuyingqu"},{"id":5235,"name":"乌伊岭区","abbr":"WYLQ","area_code":"230714","sort":9999,"latitude":48.591122,"longitude":129.437851,"is_map":true,"pinyin":"wuyilingqu"},{"id":5428,"name":"湾里区","abbr":"WLQ","area_code":"360105","sort":9999,"latitude":28.676081,"longitude":115.746628,"is_map":true,"pinyin":"wanliqu"}],"C":[{"id":14,"name":"成都","abbr":"CD","area_code":"028","sort":21,"latitude":30.5702,"longitude":104.064758,"is_map":true,"pinyin":"chengdu"},{"id":337,"name":"赤峰","abbr":"CF","area_code":"476","sort":1500,"latitude":42.258598,"longitude":118.888939,"is_map":true,"pinyin":"chifeng"},{"id":360,"name":"朝阳","abbr":"CY","area_code":"04211","sort":1900,"latitude":41.573471,"longitude":120.450798,"is_map":true,"pinyin":"chaoyang"},{"id":12,"name":"长春","abbr":"CC","area_code":"0431","sort":2000,"latitude":43.816021,"longitude":125.32357,"is_map":true,"pinyin":"changchun"},{"id":21,"name":"长沙","abbr":"CS","area_code":"0731","sort":2000,"latitude":28.227779,"longitude":112.938858,"is_map":true,"pinyin":"changsha"},{"id":44,"name":"重庆","abbr":"CQ","area_code":"023","sort":2000,"latitude":29.564711,"longitude":106.550728,"is_map":true,"pinyin":"chongqing"},{"id":59,"name":"常州","abbr":"CZ","area_code":"0519","sort":2000,"latitude":31.81072,"longitude":119.973648,"is_map":true,"pinyin":"changzhou"},{"id":83,"name":"滁州","abbr":"CZ","area_code":"0550","sort":2000,"latitude":32.301811,"longitude":118.316833,"is_map":true,"pinyin":"chuzhou"},{"id":120,"name":"常德","abbr":"CD","area_code":"0736","sort":2000,"latitude":29.03158,"longitude":111.69854,"is_map":true,"pinyin":"changde"},{"id":172,"name":"承德","abbr":"CD","area_code":"0314","sort":2000,"latitude":40.9515,"longitude":117.963402,"is_map":true,"pinyin":"chengde"},{"id":175,"name":"沧州","abbr":"CZ","area_code":"0317","sort":2000,"latitude":38.304409,"longitude":116.838692,"is_map":true,"pinyin":"cangzhou"},{"id":178,"name":"郴州","abbr":"CZ","area_code":"0735","sort":2000,"latitude":25.77063,"longitude":113.014847,"is_map":false,"pinyin":"chenzhou"},{"id":235,"name":"潮州","abbr":"CZ","area_code":"0768","sort":2000,"latitude":23.6567,"longitude":116.622963,"is_map":true,"pinyin":"chaozhou"},{"id":237,"name":"长治","abbr":"CZ","area_code":"0355","sort":2000,"latitude":36.195808,"longitude":113.116493,"is_map":true,"pinyin":"changzhi"},{"id":238,"name":"巢湖","abbr":"CH","area_code":"0565","sort":2000,"latitude":31.623289,"longitude":117.889374,"is_map":true,"pinyin":"chaohu"},{"id":246,"name":"池州","abbr":"CZ","area_code":"0566","sort":2000,"latitude":30.66469,"longitude":117.491417,"is_map":true,"pinyin":"chizhou"},{"id":267,"name":"昌吉","abbr":"CJ","area_code":"0994","sort":2000,"latitude":44.01437,"longitude":87.267487,"is_map":true,"pinyin":"changji"},{"id":279,"name":"楚雄","abbr":"CX","area_code":"0878","sort":2000,"latitude":25.032881,"longitude":101.545822,"is_map":true,"pinyin":"chuxiong"},{"id":289,"name":"崇左","abbr":"CZ","area_code":"4401004","sort":2000,"latitude":22.37895,"longitude":107.364853,"is_map":true,"pinyin":"chongzuo"},{"id":482,"name":"长丰","abbr":"CF","area_code":"200028","sort":2000,"latitude":32.477959,"longitude":117.167664,"is_map":true,"pinyin":"changfeng"},{"id":505,"name":"长乐","abbr":"CL","area_code":"200051","sort":2000,"latitude":25.96283,"longitude":119.523239,"is_map":true,"pinyin":"changle"},{"id":514,"name":"长汀","abbr":"CT","area_code":"200060","sort":2000,"latitude":25.833481,"longitude":116.357651,"is_map":true,"pinyin":"changting"},{"id":530,"name":"潮安","abbr":"CA","area_code":"200076","sort":2000,"latitude":23.46244,"longitude":116.678093,"is_map":true,"pinyin":"chaoan"},{"id":563,"name":"从化","abbr":"CH","area_code":"200109","sort":2000,"latitude":23.548349,"longitude":113.586456,"is_map":true,"pinyin":"conghua"},{"id":582,"name":"澄迈","abbr":"CM","area_code":"200128","sort":2000,"latitude":19.738489,"longitude":110.004868,"is_map":true,"pinyin":"chengmai"},{"id":592,"name":"磁县","abbr":"CX","area_code":"200138","sort":2000,"latitude":36.373959,"longitude":114.373917,"is_map":true,"pinyin":"cixian"},{"id":636,"name":"长垣","abbr":"CY","area_code":"200182","sort":2000,"latitude":35.200489,"longitude":114.668861,"is_map":true,"pinyin":"changyuan"},{"id":641,"name":"长葛","abbr":"CG","area_code":"200187","sort":2000,"latitude":34.216721,"longitude":113.768272,"is_map":true,"pinyin":"changge"},{"id":740,"name":"赤壁","abbr":"CB","area_code":"200286","sort":2000,"latitude":29.72476,"longitude":113.900543,"is_map":true,"pinyin":"chibi"},{"id":749,"name":"崇阳","abbr":"CY","area_code":"200295","sort":2000,"latitude":29.55537,"longitude":114.038918,"is_map":true,"pinyin":"chongyang"},{"id":758,"name":"常宁","abbr":"CN","area_code":"200304","sort":2000,"latitude":26.420931,"longitude":112.399918,"is_map":true,"pinyin":"changning"},{"id":760,"name":"茶陵","abbr":"CL","area_code":"200306","sort":2000,"latitude":26.777451,"longitude":113.539268,"is_map":true,"pinyin":"chaling"},{"id":797,"name":"慈利","abbr":"CL","area_code":"200343","sort":2000,"latitude":29.429701,"longitude":111.139214,"is_map":true,"pinyin":"cili"},{"id":812,"name":"长岭","abbr":"CL","area_code":"200358","sort":2000,"latitude":44.275909,"longitude":123.9673,"is_map":true,"pinyin":"changling"},{"id":911,"name":"昌图","abbr":"CT","area_code":"200457","sort":2000,"latitude":42.786129,"longitude":124.110924,"is_map":true,"pinyin":"changtu"},{"id":931,"name":"曹县","abbr":"CX","area_code":"200477","sort":2000,"latitude":34.825531,"longitude":115.542137,"is_map":true,"pinyin":"caoxian"},{"id":959,"name":"昌邑","abbr":"CY","area_code":"200505","sort":2000,"latitude":36.858841,"longitude":119.398621,"is_map":true,"pinyin":"changyi"},{"id":962,"name":"昌乐","abbr":"CL","area_code":"200508","sort":2000,"latitude":36.70702,"longitude":118.829842,"is_map":true,"pinyin":"changle"},{"id":979,"name":"茌平","abbr":"CP","area_code":"200525","sort":2000,"latitude":36.580681,"longitude":116.255219,"is_map":true,"pinyin":"chiping"},{"id":982,"name":"成武","abbr":"CW","area_code":"200528","sort":2000,"latitude":34.95245,"longitude":115.889641,"is_map":true,"pinyin":"chengwu"},{"id":1010,"name":"崇明","abbr":"CM","area_code":"200556","sort":2000,"latitude":31.6229,"longitude":121.397301,"is_map":true,"pinyin":"chongming"},{"id":1037,"name":"崇州","abbr":"CZ","area_code":"200583","sort":2000,"latitude":30.630211,"longitude":103.67289,"is_map":true,"pinyin":"chongzhou"},{"id":1075,"name":"慈溪","abbr":"CX","area_code":"200621","sort":2000,"latitude":30.16964,"longitude":121.266472,"is_map":true,"pinyin":"cixi"},{"id":1080,"name":"苍南","abbr":"CN","area_code":"200626","sort":2000,"latitude":27.517429,"longitude":120.426308,"is_map":true,"pinyin":"cangnan"},{"id":1096,"name":"长兴","abbr":"CX","area_code":"200642","sort":2000,"latitude":31.02663,"longitude":119.91011,"is_map":true,"pinyin":"changxing"},{"id":1118,"name":"淳安","abbr":"CA","area_code":"200664","sort":2000,"latitude":29.608521,"longitude":119.041878,"is_map":true,"pinyin":"chunan"},{"id":355,"name":"常熟","abbr":"CS","area_code":"05121","sort":9999,"latitude":31.65382,"longitude":120.752373,"is_map":true,"pinyin":"changshu"},{"id":373,"name":"澄海","abbr":"CH","area_code":"07541","sort":9999,"latitude":23.466129,"longitude":116.756081,"is_map":true,"pinyin":"chenghai"},{"id":1158,"name":"长泰","abbr":"CT","area_code":"350625","sort":9999,"latitude":24.625799,"longitude":117.759483,"is_map":true,"pinyin":"changtai"},{"id":1168,"name":"常山县","abbr":"CS","area_code":"330822","sort":9999,"latitude":28.901409,"longitude":118.511162,"is_map":true,"pinyin":"changshan"},{"id":1174,"name":"潮南","abbr":"CN","area_code":"440514","sort":9999,"latitude":23.25029,"longitude":116.433098,"is_map":true,"pinyin":"chaonan"},{"id":1179,"name":"昌黎","abbr":"CL","area_code":"130321","sort":9999,"latitude":39.709728,"longitude":119.164543,"is_map":true,"pinyin":"changli"},{"id":1183,"name":"成安","abbr":"CA","area_code":"130424","sort":9999,"latitude":36.442997,"longitude":114.691841,"is_map":true,"pinyin":"chengan"},{"id":1228,"name":"赤城","abbr":"CC","area_code":"130732","sort":9999,"latitude":40.912083,"longitude":115.83271,"is_map":true,"pinyin":"chicheng"},{"id":1375,"name":"陈巴尔虎旗","abbr":"CBEHQ","area_code":"150725","sort":9999,"latitude":49.328423,"longitude":119.437607,"is_map":true,"pinyin":"chenbaerhuqi"},{"id":1392,"name":"察哈尔右翼前旗","abbr":"CHEYYQQ","area_code":"150926","sort":9999,"latitude":40.786858,"longitude":113.21196,"is_map":true,"pinyin":"chahaeryouyiqianqi"},{"id":1393,"name":"察哈尔右翼中旗","abbr":"CHEYYZQ","area_code":"150927","sort":9999,"latitude":41.274212,"longitude":112.63356,"is_map":true,"pinyin":"chahaeryouyizhongqi"},{"id":1394,"name":"察哈尔右翼后旗","abbr":"CHEYYHQ","area_code":"150928","sort":9999,"latitude":41.447212,"longitude":113.190598,"is_map":true,"pinyin":"chahaeryouyihouqi"},{"id":1421,"name":"长海县","abbr":"CHX","area_code":"210224","sort":9999,"latitude":39.2724,"longitude":122.587822,"is_map":true,"pinyin":"changhai"},{"id":1453,"name":"长白朝鲜族自治县","abbr":"CZBCXZZZX","area_code":"220623","sort":9999,"latitude":41.419361,"longitude":128.203384,"is_map":true,"pinyin":"changbaichaoxianzuzizhixian"},{"id":1588,"name":"崇义","abbr":"CY","area_code":"360725","sort":9999,"latitude":25.68791,"longitude":114.30735,"is_map":true,"pinyin":"chongyi"},{"id":1611,"name":"崇仁县","abbr":"CRX","area_code":"361024","sort":9999,"latitude":27.760906,"longitude":116.059113,"is_map":true,"pinyin":"chongren"},{"id":1721,"name":"辰溪县","abbr":"CXX","area_code":"431223","sort":9999,"latitude":28.005474,"longitude":110.196953,"is_map":true,"pinyin":"chenxi"},{"id":1789,"name":"苍梧","abbr":"CW","area_code":"450421","sort":9999,"latitude":23.40996,"longitude":111.246033,"is_map":true,"pinyin":"cangwu"},{"id":1792,"name":"岑溪","abbr":"CX","area_code":"450481","sort":9999,"latitude":22.918406,"longitude":110.998116,"is_map":true,"pinyin":"cenxi"},{"id":1970,"name":"赤水","abbr":"CS","area_code":"520381","sort":9999,"latitude":28.587057,"longitude":105.698112,"is_map":true,"pinyin":"chishui"},{"id":1992,"name":"册亨","abbr":"CH","area_code":"522327","sort":9999,"latitude":24.983337,"longitude":105.812408,"is_map":true,"pinyin":"ceheng"},{"id":1999,"name":"岑巩","abbr":"CG","area_code":"522626","sort":9999,"latitude":27.173244,"longitude":108.81646,"is_map":true,"pinyin":"cengong"},{"id":2006,"name":"从江","abbr":"CJ","area_code":"522633","sort":9999,"latitude":25.747059,"longitude":108.912651,"is_map":true,"pinyin":"congjiang"},{"id":2018,"name":"长顺","abbr":"CS","area_code":"522729","sort":9999,"latitude":26.022116,"longitude":106.447372,"is_map":true,"pinyin":"changshun"},{"id":2031,"name":"澄江","abbr":"CJ","area_code":"530422","sort":9999,"latitude":24.66968,"longitude":102.916649,"is_map":true,"pinyin":"chengjiang"},{"id":2040,"name":"昌宁","abbr":"CN","area_code":"530524","sort":9999,"latitude":24.823662,"longitude":99.612343,"is_map":true,"pinyin":"changning"},{"id":2070,"name":"沧源佤族自治县","abbr":"CYWZZZX","area_code":"530927","sort":9999,"latitude":23.146887,"longitude":99.247398,"is_map":true,"pinyin":"cangyuanwazuzizhixian"},{"id":2151,"name":"昌都地区","abbr":"CDDQ","area_code":"542100","sort":9999,"latitude":31.136875,"longitude":97.178452,"is_map":true,"pinyin":"changdudiqu"},{"id":2232,"name":"澄城","abbr":"CC","area_code":"610525","sort":9999,"latitude":35.183998,"longitude":109.937607,"is_map":true,"pinyin":"chengcheng"},{"id":2425,"name":"昌吉回族自治州","abbr":"CJHZZZZ","area_code":"652300","sort":9999,"latitude":44.014576,"longitude":87.304008,"is_map":true,"pinyin":"changjihuizuzizhizhou"},{"id":5042,"name":"曹妃甸区","abbr":"CFD","area_code":"130209","sort":9999,"latitude":39.273129,"longitude":118.460228,"is_map":true,"pinyin":"caofeidianqu"},{"id":5647,"name":"潮阳区","abbr":"CYQ","area_code":"440513","sort":9999,"latitude":23.262337,"longitude":116.6026,"is_map":true,"pinyin":"chaoyangqu"},{"id":5687,"name":"城中区","abbr":"CZQ","area_code":"450202","sort":9999,"latitude":0,"longitude":0,"is_map":true,"pinyin":"chengzhongqu"},{"id":5813,"name":"呈贡区","abbr":"CGQ","area_code":"530114","sort":9999,"latitude":24.889275,"longitude":102.801384,"is_map":true,"pinyin":"chenggongqu"}],"F":[{"id":24,"name":"佛山","abbr":"FS","area_code":"0757","sort":23,"latitude":23.021851,"longitude":113.121918,"is_map":true,"pinyin":"foshan"},{"id":9,"name":"福州","abbr":"FZ","area_code":"0591","sort":2000,"latitude":26.074209,"longitude":119.296471,"is_map":true,"pinyin":"fuzhou"},{"id":108,"name":"抚顺","abbr":"FS","area_code":"0413","sort":2000,"latitude":41.879711,"longitude":123.957222,"is_map":true,"pinyin":"fushun"},{"id":118,"name":"阜新","abbr":"FX","area_code":"0418","sort":2000,"latitude":42.02166,"longitude":121.670113,"is_map":true,"pinyin":"fuxin"},{"id":195,"name":"阜阳","abbr":"FY","area_code":"0558","sort":2000,"latitude":32.889629,"longitude":115.814949,"is_map":true,"pinyin":"fuyang"},{"id":219,"name":"抚州","abbr":"FZ","area_code":"0794","sort":2000,"latitude":27.947809,"longitude":116.358093,"is_map":true,"pinyin":"fuzhou"},{"id":429,"name":"涪陵","abbr":"FL","area_code":"10007","sort":2000,"latitude":29.70315,"longitude":107.389816,"is_map":true,"pinyin":"fuling"},{"id":459,"name":"肥东","abbr":"FD","area_code":"200005","sort":2000,"latitude":31.887699,"longitude":117.469276,"is_map":true,"pinyin":"feidong"},{"id":460,"name":"肥西","abbr":"FX","area_code":"200006","sort":2000,"latitude":31.70653,"longitude":117.158401,"is_map":true,"pinyin":"feixi"},{"id":468,"name":"阜南","abbr":"FN","area_code":"200014","sort":2000,"latitude":32.658871,"longitude":115.593193,"is_map":true,"pinyin":"funan"},{"id":475,"name":"凤台","abbr":"FT","area_code":"200021","sort":2000,"latitude":32.709461,"longitude":116.71077,"is_map":true,"pinyin":"fengtai"},{"id":490,"name":"凤阳","abbr":"FY","area_code":"200036","sort":2000,"latitude":32.866001,"longitude":117.561241,"is_map":true,"pinyin":"fengyang"},{"id":497,"name":"福清","abbr":"FQ","area_code":"200043","sort":2000,"latitude":25.72024,"longitude":119.384109,"is_map":true,"pinyin":"fuqing"},{"id":500,"name":"福安","abbr":"FA","area_code":"200046","sort":2000,"latitude":27.087971,"longitude":119.647682,"is_map":true,"pinyin":"fuan"},{"id":504,"name":"福鼎","abbr":"FD","area_code":"200050","sort":2000,"latitude":27.32436,"longitude":120.216713,"is_map":true,"pinyin":"fuding"},{"id":635,"name":"方城","abbr":"FC","area_code":"200181","sort":2000,"latitude":33.254391,"longitude":113.01255,"is_map":true,"pinyin":"fangcheng"},{"id":667,"name":"封丘","abbr":"FQ","area_code":"200213","sort":2000,"latitude":35.041191,"longitude":114.41861,"is_map":true,"pinyin":"fengqiu"},{"id":680,"name":"扶沟","abbr":"FG","area_code":"200226","sort":2000,"latitude":34.060001,"longitude":114.394821,"is_map":true,"pinyin":"fugou"},{"id":708,"name":"富锦","abbr":"FJ","area_code":"200254","sort":2000,"latitude":47.250221,"longitude":132.037277,"is_map":true,"pinyin":"fujin"},{"id":811,"name":"抚松","abbr":"FS","area_code":"200357","sort":2000,"latitude":42.342018,"longitude":127.280357,"is_map":true,"pinyin":"fusong"},{"id":821,"name":"扶余","abbr":"FY","area_code":"200367","sort":2000,"latitude":44.990139,"longitude":126.049721,"is_map":true,"pinyin":"fuyu"},{"id":840,"name":"丰县","abbr":"FX","area_code":"200386","sort":2000,"latitude":34.693958,"longitude":116.595322,"is_map":true,"pinyin":"fengxian"},{"id":848,"name":"阜宁","abbr":"FN","area_code":"200394","sort":2000,"latitude":33.759312,"longitude":119.802582,"is_map":true,"pinyin":"funing"},{"id":871,"name":"丰城","abbr":"FC","area_code":"200417","sort":2000,"latitude":28.159201,"longitude":115.77121,"is_map":true,"pinyin":"fengcheng"},{"id":884,"name":"浮梁","abbr":"FL","area_code":"200430","sort":2000,"latitude":29.351589,"longitude":117.215233,"is_map":true,"pinyin":"fuliang"},{"id":904,"name":"凤城","abbr":"FC","area_code":"200450","sort":2000,"latitude":40.452789,"longitude":124.066048,"is_map":true,"pinyin":"fengcheng"},{"id":934,"name":"费县","abbr":"FX","area_code":"200480","sort":2000,"latitude":35.26659,"longitude":117.977112,"is_map":true,"pinyin":"feixian"},{"id":935,"name":"肥城","abbr":"FC","area_code":"200481","sort":2000,"latitude":36.182449,"longitude":116.769173,"is_map":true,"pinyin":"feicheng"},{"id":1030,"name":"富顺","abbr":"FS","area_code":"200576","sort":2000,"latitude":29.181271,"longitude":104.974953,"is_map":true,"pinyin":"fushun"},{"id":1060,"name":"富源","abbr":"FY","area_code":"200606","sort":2000,"latitude":25.674219,"longitude":104.254852,"is_map":true,"pinyin":"fuyuan"},{"id":1087,"name":"富阳","abbr":"FY","area_code":"200633","sort":2000,"latitude":30.048849,"longitude":119.960426,"is_map":true,"pinyin":"fuyang"},{"id":1102,"name":"奉化","abbr":"FH","area_code":"200648","sort":2000,"latitude":29.655029,"longitude":121.40686,"is_map":true,"pinyin":"fenghua"},{"id":1122,"name":"奉节","abbr":"FJ","area_code":"200668","sort":2000,"latitude":31.018459,"longitude":109.464058,"is_map":true,"pinyin":"fengjie"},{"id":1131,"name":"丰都","abbr":"FD","area_code":"200677","sort":2000,"latitude":29.86352,"longitude":107.73085,"is_map":true,"pinyin":"fengdu"},{"id":1151,"name":"繁昌","abbr":"FC","area_code":"340222","sort":9999,"latitude":31.082911,"longitude":118.199341,"is_map":true,"pinyin":"fanchang"},{"id":1180,"name":"抚宁","abbr":"FN","area_code":"130323","sort":9999,"latitude":39.887054,"longitude":119.240654,"is_map":true,"pinyin":"funing"},{"id":1184,"name":"肥乡","abbr":"FX","area_code":"130428","sort":9999,"latitude":36.555779,"longitude":114.805153,"is_map":true,"pinyin":"feixiang"},{"id":1204,"name":"阜平","abbr":"FP","area_code":"130624","sort":9999,"latitude":38.847275,"longitude":114.198799,"is_map":true,"pinyin":"fuping"},{"id":1235,"name":"丰宁满族自治县","abbr":"FNMZZZX","area_code":"130826","sort":9999,"latitude":41.209904,"longitude":116.651207,"is_map":true,"pinyin":"fengningmanzuzizhixian"},{"id":1254,"name":"阜城","abbr":"FC","area_code":"131128","sort":9999,"latitude":37.869946,"longitude":116.164726,"is_map":true,"pinyin":"fucheng"},{"id":1308,"name":"繁峙县","abbr":"FZX","area_code":"140924","sort":9999,"latitude":39.2663,"longitude":113.559258,"is_map":true,"pinyin":"fanzhi"},{"id":1342,"name":"汾阳","abbr":"FY","area_code":"141182","sort":9999,"latitude":37.267742,"longitude":111.785271,"is_map":true,"pinyin":"fenyang"},{"id":1396,"name":"丰镇","abbr":"FZ","area_code":"150981","sort":9999,"latitude":40.437534,"longitude":113.16346,"is_map":true,"pinyin":"fengzhen"},{"id":1420,"name":"法库县","abbr":"FKX","area_code":"210124","sort":9999,"latitude":42.507046,"longitude":123.416725,"is_map":true,"pinyin":"faku"},{"id":1433,"name":"阜新蒙古族自治县","abbr":"FXMGZZZX","area_code":"210921","sort":9999,"latitude":42.058605,"longitude":121.743126,"is_map":true,"pinyin":"fuxinmengguzuzizhixian"},{"id":1465,"name":"方正","abbr":"FZ","area_code":"230124","sort":9999,"latitude":45.839535,"longitude":128.836136,"is_map":true,"pinyin":"fangzheng"},{"id":1473,"name":"富裕","abbr":"FY","area_code":"230227","sort":9999,"latitude":47.797173,"longitude":124.469109,"is_map":true,"pinyin":"fuyu"},{"id":1494,"name":"抚远","abbr":"FY","area_code":"230833","sort":9999,"latitude":48.364708,"longitude":134.294495,"is_map":true,"pinyin":"fuyuan"},{"id":1584,"name":"分宜","abbr":"FY","area_code":"360521","sort":9999,"latitude":27.8113,"longitude":114.675262,"is_map":true,"pinyin":"fenyi"},{"id":1602,"name":"奉新","abbr":"FX","area_code":"360921","sort":9999,"latitude":28.700672,"longitude":115.3899,"is_map":true,"pinyin":"fengxin"},{"id":1659,"name":"范县","abbr":"FX","area_code":"410926","sort":9999,"latitude":35.851955,"longitude":115.504204,"is_map":true,"pinyin":"fanxian"},{"id":1748,"name":"丰顺","abbr":"FS","area_code":"441423","sort":9999,"latitude":23.752771,"longitude":116.184418,"is_map":true,"pinyin":"fengshun"},{"id":1757,"name":"佛冈县","abbr":"FG","area_code":"441821","sort":9999,"latitude":23.866739,"longitude":113.534096,"is_map":true,"pinyin":"fogang"},{"id":1794,"name":"防城港","abbr":"FCG","area_code":"450600","sort":9999,"latitude":21.6138,"longitude":108.33799,"is_map":true,"pinyin":"fangchenggang"},{"id":1816,"name":"富川瑶族自治县","abbr":"FCYZZZX","area_code":"451123","sort":9999,"latitude":24.81896,"longitude":111.277229,"is_map":true,"pinyin":"fuchuanyaozuzizhixian"},{"id":1820,"name":"凤山","abbr":"FS","area_code":"451223","sort":9999,"latitude":24.544561,"longitude":107.044594,"is_map":true,"pinyin":"fengshan"},{"id":1833,"name":"扶绥","abbr":"FS","area_code":"451421","sort":9999,"latitude":22.63582,"longitude":107.91153,"is_map":true,"pinyin":"fusui"},{"id":1966,"name":"凤冈","abbr":"FG","area_code":"520327","sort":9999,"latitude":27.960857,"longitude":107.722023,"is_map":true,"pinyin":"fenggang"},{"id":2011,"name":"福泉","abbr":"FQ","area_code":"522702","sort":9999,"latitude":26.702509,"longitude":107.513512,"is_map":true,"pinyin":"fuquan"},{"id":2023,"name":"富民","abbr":"FM","area_code":"530124","sort":9999,"latitude":25.219667,"longitude":102.497887,"is_map":true,"pinyin":"fumin"},{"id":2064,"name":"凤庆","abbr":"FQ","area_code":"530921","sort":9999,"latitude":24.592737,"longitude":99.918709,"is_map":true,"pinyin":"fengqing"},{"id":2096,"name":"富宁","abbr":"FN","area_code":"532628","sort":9999,"latitude":23.626493,"longitude":105.628563,"is_map":true,"pinyin":"funing"},{"id":2119,"name":"福贡","abbr":"FG","area_code":"533323","sort":9999,"latitude":26.902739,"longitude":98.867416,"is_map":true,"pinyin":"fugong"},{"id":2235,"name":"富平","abbr":"FP","area_code":"610528","sort":9999,"latitude":34.746677,"longitude":109.187172,"is_map":true,"pinyin":"fuping"},{"id":2260,"name":"府谷","abbr":"FG","area_code":"610822","sort":9999,"latitude":39.029243,"longitude":111.069649,"is_map":true,"pinyin":"fugu"},{"id":5199,"name":"富拉尔基区","abbr":"FLEJQ","area_code":"230206","sort":9999,"latitude":47.20697,"longitude":123.63887,"is_map":true,"pinyin":"fulaerjiqu"}],"Y":[{"id":339,"name":"营口","abbr":"YK","area_code":"04171","sort":80,"latitude":40.666828,"longitude":122.234901,"is_map":true,"pinyin":"yingkou"},{"id":421,"name":"云浮","abbr":"YF","area_code":"07662","sort":1900,"latitude":22.915251,"longitude":112.044533,"is_map":true,"pinyin":"yunfu"},{"id":22,"name":"扬州","abbr":"YZ","area_code":"0514","sort":2000,"latitude":32.393581,"longitude":119.412689,"is_map":true,"pinyin":"yangzhou"},{"id":71,"name":"盐城","abbr":"YC","area_code":"0515","sort":2000,"latitude":33.34951,"longitude":120.161636,"is_map":true,"pinyin":"yancheng"},{"id":77,"name":"烟台","abbr":"YT","area_code":"0535","sort":2000,"latitude":37.463531,"longitude":121.448013,"is_map":true,"pinyin":"yantai"},{"id":80,"name":"宜昌","abbr":"YC","area_code":"0717","sort":2000,"latitude":30.69186,"longitude":111.286423,"is_map":true,"pinyin":"yichang"},{"id":103,"name":"宜宾","abbr":"YB","area_code":"0831","sort":2000,"latitude":28.751301,"longitude":104.641701,"is_map":true,"pinyin":"yibin"},{"id":119,"name":"益阳","abbr":"YY","area_code":"0737","sort":2000,"latitude":28.553909,"longitude":112.355164,"is_map":true,"pinyin":"yiyang"},{"id":124,"name":"岳阳","abbr":"YY","area_code":"0730","sort":2000,"latitude":29.357281,"longitude":113.129189,"is_map":true,"pinyin":"yueyang"},{"id":128,"name":"宜春","abbr":"YC","area_code":"0795","sort":2000,"latitude":27.81443,"longitude":114.416122,"is_map":true,"pinyin":"yichun"},{"id":166,"name":"运城","abbr":"YC","area_code":"0359","sort":2000,"latitude":35.026279,"longitude":111.006989,"is_map":true,"pinyin":"yuncheng"},{"id":167,"name":"延边","abbr":"YBZXZZZZ","area_code":"0433","sort":2000,"latitude":42.89119,"longitude":129.509094,"is_map":true,"pinyin":"yan bian"},{"id":176,"name":"永州","abbr":"YZ","area_code":"0746","sort":2000,"latitude":26.42034,"longitude":111.612251,"is_map":true,"pinyin":"yongzhou"},{"id":191,"name":"义乌","abbr":"YW","area_code":"579","sort":2000,"latitude":29.30558,"longitude":120.074677,"is_map":true,"pinyin":"yiwu"},{"id":194,"name":"银川","abbr":"YC","area_code":"0951","sort":2000,"latitude":38.486439,"longitude":106.232483,"is_map":true,"pinyin":"yinchuan"},{"id":202,"name":"阳江","abbr":"YJ","area_code":"0662","sort":2000,"latitude":21.85829,"longitude":111.982559,"is_map":true,"pinyin":"yangjiang"},{"id":240,"name":"雅安","abbr":"YA","area_code":"0835","sort":2000,"latitude":30.01543,"longitude":103.039803,"is_map":true,"pinyin":"yaan"},{"id":242,"name":"延安","abbr":"YA","area_code":"0911","sort":2000,"latitude":36.585289,"longitude":109.489777,"is_map":true,"pinyin":"yanan"},{"id":254,"name":"玉林","abbr":"YL","area_code":"0775","sort":2000,"latitude":22.65451,"longitude":110.180977,"is_map":true,"pinyin":"yulin"},{"id":292,"name":"玉溪","abbr":"YX","area_code":"0877","sort":2000,"latitude":24.351931,"longitude":102.5466,"is_map":true,"pinyin":"yuxi"},{"id":297,"name":"宜州","abbr":"YZ","area_code":"0778","sort":2000,"latitude":24.48513,"longitude":108.636559,"is_map":true,"pinyin":"yizhou"},{"id":307,"name":"榆林","abbr":"YL","area_code":"0912","sort":2000,"latitude":38.285198,"longitude":109.734581,"is_map":true,"pinyin":"yulin"},{"id":335,"name":"伊宁市","abbr":"YNS","area_code":"0999","sort":2000,"latitude":43.9095,"longitude":81.277252,"is_map":true,"pinyin":"yiningshi"},{"id":450,"name":"永川","abbr":"YC","area_code":"10028","sort":2000,"latitude":29.356001,"longitude":105.927094,"is_map":true,"pinyin":"yongchuan"},{"id":451,"name":"渝北","abbr":"YB","area_code":"10029","sort":2000,"latitude":29.717979,"longitude":106.630432,"is_map":true,"pinyin":"yubei"},{"id":452,"name":"渝中","abbr":"YZ","area_code":"10030","sort":2000,"latitude":29.553141,"longitude":106.568604,"is_map":true,"pinyin":"yuzhong"},{"id":457,"name":"颍上","abbr":"YS","area_code":"200003","sort":2000,"latitude":32.628929,"longitude":116.264549,"is_map":true,"pinyin":"yingshang"},{"id":494,"name":"延庆","abbr":"YQ","area_code":"200040","sort":2000,"latitude":40.456779,"longitude":115.975029,"is_map":true,"pinyin":"yanqing"},{"id":506,"name":"永春","abbr":"YC","area_code":"200052","sort":2000,"latitude":25.32188,"longitude":118.294243,"is_map":true,"pinyin":"yongchun"},{"id":507,"name":"永安","abbr":"YA","area_code":"200053","sort":2000,"latitude":25.94138,"longitude":117.365181,"is_map":true,"pinyin":"yongan"},{"id":515,"name":"云霄","abbr":"YX","area_code":"200061","sort":2000,"latitude":23.958059,"longitude":117.339653,"is_map":true,"pinyin":"yunxiao"},{"id":521,"name":"尤溪","abbr":"YX","area_code":"200067","sort":2000,"latitude":26.17004,"longitude":118.190491,"is_map":true,"pinyin":"youxi"},{"id":548,"name":"英德","abbr":"YD","area_code":"200094","sort":2000,"latitude":24.18572,"longitude":113.415047,"is_map":true,"pinyin":"yingde"},{"id":556,"name":"阳春","abbr":"YC","area_code":"200102","sort":2000,"latitude":22.1703,"longitude":111.791527,"is_map":true,"pinyin":"yangchun"},{"id":565,"name":"阳东","abbr":"YD","area_code":"200111","sort":2000,"latitude":21.86829,"longitude":112.006699,"is_map":true,"pinyin":"yangdong"},{"id":589,"name":"永年","abbr":"YN","area_code":"200135","sort":2000,"latitude":36.77771,"longitude":114.490952,"is_map":true,"pinyin":"yongnian"},{"id":591,"name":"玉田","abbr":"YT","area_code":"200137","sort":2000,"latitude":39.900501,"longitude":117.738808,"is_map":true,"pinyin":"yutian"},{"id":617,"name":"盐山","abbr":"YS","area_code":"200163","sort":2000,"latitude":38.0583,"longitude":117.230247,"is_map":true,"pinyin":"yanshan"},{"id":623,"name":"永城","abbr":"YC","area_code":"200169","sort":2000,"latitude":33.92915,"longitude":116.449463,"is_map":true,"pinyin":"yongcheng"},{"id":624,"name":"禹州","abbr":"YZ","area_code":"200170","sort":2000,"latitude":34.14048,"longitude":113.487938,"is_map":true,"pinyin":"yuzhou"},{"id":640,"name":"偃师","abbr":"YS","area_code":"200186","sort":2000,"latitude":34.727631,"longitude":112.78965,"is_map":true,"pinyin":"yanshi"},{"id":645,"name":"虞城","abbr":"YC","area_code":"200191","sort":2000,"latitude":34.397369,"longitude":115.865189,"is_map":true,"pinyin":"yucheng"},{"id":657,"name":"叶县","abbr":"YX","area_code":"200203","sort":2000,"latitude":33.626831,"longitude":113.357368,"is_map":true,"pinyin":"yexian"},{"id":678,"name":"伊川","abbr":"YC","area_code":"200224","sort":2000,"latitude":34.421349,"longitude":112.425682,"is_map":true,"pinyin":"yichuan"},{"id":685,"name":"鄢陵","abbr":"YL","area_code":"200231","sort":2000,"latitude":34.102329,"longitude":114.177391,"is_map":true,"pinyin":"yanling"},{"id":692,"name":"原阳","abbr":"YY","area_code":"200238","sort":2000,"latitude":35.065689,"longitude":113.939972,"is_map":true,"pinyin":"yuanyang"},{"id":696,"name":"伊春","abbr":"YC","area_code":"200242","sort":2000,"latitude":47.72752,"longitude":128.840485,"is_map":true,"pinyin":"yichun"},{"id":722,"name":"应城","abbr":"YC","area_code":"200268","sort":2000,"latitude":30.928379,"longitude":113.572922,"is_map":true,"pinyin":"yingcheng"},{"id":727,"name":"阳新","abbr":"YX","area_code":"200273","sort":2000,"latitude":29.830391,"longitude":115.215302,"is_map":true,"pinyin":"yangxin"},{"id":732,"name":"云梦","abbr":"YM","area_code":"200278","sort":2000,"latitude":31.02103,"longitude":113.753311,"is_map":true,"pinyin":"yunmeng"},{"id":736,"name":"宜城","abbr":"YC","area_code":"200282","sort":2000,"latitude":31.719761,"longitude":112.257759,"is_map":true,"pinyin":"yicheng"},{"id":743,"name":"郧县","abbr":"YX","area_code":"200289","sort":2000,"latitude":32.834881,"longitude":110.811974,"is_map":true,"pinyin":"yunxian"},{"id":745,"name":"宜都","abbr":"YD","area_code":"200291","sort":2000,"latitude":30.37846,"longitude":111.450104,"is_map":true,"pinyin":"yidu"},{"id":763,"name":"攸县","abbr":"YX","area_code":"200309","sort":2000,"latitude":27.000231,"longitude":113.345688,"is_map":true,"pinyin":"youxian"},{"id":768,"name":"沅江","abbr":"YJ","area_code":"200314","sort":2000,"latitude":28.844021,"longitude":112.354683,"is_map":true,"pinyin":"yuanjiang"},{"id":777,"name":"宜章","abbr":"YZ","area_code":"200323","sort":2000,"latitude":25.39957,"longitude":112.948868,"is_map":true,"pinyin":"yizhang"},{"id":786,"name":"永兴","abbr":"YX","area_code":"200332","sort":2000,"latitude":26.127199,"longitude":113.116592,"is_map":true,"pinyin":"yongxing"},{"id":794,"name":"沅陵","abbr":"YL","area_code":"200340","sort":2000,"latitude":28.45277,"longitude":110.393883,"is_map":true,"pinyin":"yuanling"},{"id":802,"name":"永顺","abbr":"YS","area_code":"200348","sort":2000,"latitude":29.00515,"longitude":109.848068,"is_map":true,"pinyin":"yongshun"},{"id":805,"name":"榆树","abbr":"YS","area_code":"200351","sort":2000,"latitude":44.83989,"longitude":126.532997,"is_map":true,"pinyin":"yushu"},{"id":862,"name":"仪征","abbr":"YZ","area_code":"200408","sort":2000,"latitude":32.27203,"longitude":119.184441,"is_map":true,"pinyin":"yizheng"},{"id":866,"name":"扬中","abbr":"YZ","area_code":"200412","sort":2000,"latitude":32.237019,"longitude":119.796822,"is_map":true,"pinyin":"yangzhong"},{"id":875,"name":"余干","abbr":"YG","area_code":"200421","sort":2000,"latitude":28.70211,"longitude":116.695602,"is_map":true,"pinyin":"yugan"},{"id":877,"name":"于都","abbr":"YD","area_code":"200423","sort":2000,"latitude":25.951839,"longitude":115.415443,"is_map":true,"pinyin":"yudu"},{"id":878,"name":"玉山","abbr":"YS","area_code":"200424","sort":2000,"latitude":28.68194,"longitude":118.244812,"is_map":true,"pinyin":"yushan"},{"id":879,"name":"铅山","abbr":"YS","area_code":"200425","sort":2000,"latitude":28.31535,"longitude":117.709419,"is_map":true,"pinyin":"yanshan"},{"id":886,"name":"永新","abbr":"YX","area_code":"200432","sort":2000,"latitude":26.944981,"longitude":114.243073,"is_map":true,"pinyin":"yongxin"},{"id":891,"name":"永修","abbr":"YX","area_code":"200437","sort":2000,"latitude":29.020969,"longitude":115.809158,"is_map":true,"pinyin":"yongxiu"},{"id":915,"name":"牙克石","abbr":"YKS","area_code":"200461","sort":2000,"latitude":49.285629,"longitude":120.711739,"is_map":true,"pinyin":"yakeshi"},{"id":930,"name":"沂水","abbr":"YS","area_code":"200476","sort":2000,"latitude":35.79034,"longitude":118.627823,"is_map":true,"pinyin":"yishui"},{"id":936,"name":"郓城","abbr":"YC","area_code":"200482","sort":2000,"latitude":35.599838,"longitude":115.943642,"is_map":true,"pinyin":"yuncheng"},{"id":941,"name":"沂南","abbr":"YN","area_code":"200487","sort":2000,"latitude":35.550011,"longitude":118.46566,"is_map":true,"pinyin":"yinan"},{"id":946,"name":"兖州","abbr":"YZ","area_code":"200492","sort":2000,"latitude":35.552601,"longitude":116.785698,"is_map":true,"pinyin":"yanzhou"},{"id":958,"name":"阳谷","abbr":"YG","area_code":"200504","sort":2000,"latitude":36.114471,"longitude":115.791313,"is_map":true,"pinyin":"yanggu"},{"id":977,"name":"沂源","abbr":"YY","area_code":"200523","sort":2000,"latitude":36.184879,"longitude":118.170769,"is_map":true,"pinyin":"yiyuan"},{"id":992,"name":"禹城","abbr":"YC","area_code":"200538","sort":2000,"latitude":36.933941,"longitude":116.63813,"is_map":true,"pinyin":"yucheng"},{"id":995,"name":"阳泉","abbr":"YQ","area_code":"200541","sort":2000,"latitude":37.856682,"longitude":113.580467,"is_map":true,"pinyin":"yangquan"},{"id":1002,"name":"原平","abbr":"YP","area_code":"200548","sort":2000,"latitude":38.730511,"longitude":112.710922,"is_map":true,"pinyin":"yuanping"},{"id":1004,"name":"永济","abbr":"YJ","area_code":"200550","sort":2000,"latitude":34.867161,"longitude":110.447731,"is_map":true,"pinyin":"yongji"},{"id":1013,"name":"仪陇","abbr":"YL","area_code":"200559","sort":2000,"latitude":31.269979,"longitude":106.303299,"is_map":true,"pinyin":"yilong"},{"id":1039,"name":"营山","abbr":"YS","area_code":"200585","sort":2000,"latitude":31.0767,"longitude":106.565529,"is_map":true,"pinyin":"yingshan"},{"id":1044,"name":"岳池","abbr":"YC","area_code":"200590","sort":2000,"latitude":30.537951,"longitude":106.43988,"is_map":true,"pinyin":"yuechi"},{"id":1054,"name":"伊宁县","abbr":"YN","area_code":"200600","sort":2000,"latitude":43.9095,"longitude":81.277252,"is_map":true,"pinyin":"yining"},{"id":1068,"name":"宜良","abbr":"YL","area_code":"200614","sort":2000,"latitude":24.92005,"longitude":103.14119,"is_map":true,"pinyin":"yiliang"},{"id":1073,"name":"砚山","abbr":"YS","area_code":"200619","sort":2000,"latitude":23.60586,"longitude":104.33709,"is_map":true,"pinyin":"yanshan"},{"id":1079,"name":"余姚","abbr":"YY","area_code":"200625","sort":2000,"latitude":30.037109,"longitude":121.15435,"is_map":true,"pinyin":"yuyao"},{"id":1086,"name":"永嘉","abbr":"YJ","area_code":"200632","sort":2000,"latitude":28.15336,"longitude":120.691711,"is_map":true,"pinyin":"yongjia"},{"id":1091,"name":"玉环","abbr":"YH","area_code":"200637","sort":2000,"latitude":28.135889,"longitude":121.231644,"is_map":true,"pinyin":"yuhuan"},{"id":1092,"name":"永康","abbr":"YK","area_code":"200638","sort":2000,"latitude":28.88851,"longitude":120.04731,"is_map":true,"pinyin":"yongkang"},{"id":1121,"name":"云阳","abbr":"YY","area_code":"200667","sort":2000,"latitude":30.93063,"longitude":108.696983,"is_map":true,"pinyin":"yunyang"},{"id":354,"name":"宜兴","abbr":"YX","area_code":"05102","sort":9999,"latitude":31.34042,"longitude":119.823463,"is_map":true,"pinyin":"yixin"},{"id":356,"name":"延吉","abbr":"YJ","area_code":"04331","sort":9999,"latitude":42.891071,"longitude":129.509094,"is_map":true,"pinyin":"yanji"},{"id":384,"name":"鹰潭","abbr":"YT","area_code":"0701","sort":9999,"latitude":28.260189,"longitude":117.069191,"is_map":true,"pinyin":"yingtan"},{"id":1211,"name":"易县","abbr":"YX","area_code":"130633","sort":9999,"latitude":39.35297,"longitude":115.501144,"is_map":true,"pinyin":"yixian"},{"id":1222,"name":"蔚县","abbr":"YX","area_code":"130726","sort":9999,"latitude":39.837181,"longitude":114.582695,"is_map":true,"pinyin":"yuxian"},{"id":1223,"name":"阳原","abbr":"YY","area_code":"130727","sort":9999,"latitude":40.113419,"longitude":114.167343,"is_map":true,"pinyin":"yangyuan"},{"id":1246,"name":"永清","abbr":"YQ","area_code":"131023","sort":9999,"latitude":39.319717,"longitude":116.498093,"is_map":true,"pinyin":"yongqing"},{"id":1271,"name":"盂县","abbr":"YX","area_code":"140322","sort":9999,"latitude":38.086132,"longitude":113.412231,"is_map":true,"pinyin":"yuxian"},{"id":1370,"name":"伊金霍洛旗","abbr":"YJHLQ","area_code":"150627","sort":9999,"latitude":39.604313,"longitude":109.787399,"is_map":true,"pinyin":"yijinhuoluoqi"},{"id":1430,"name":"义县","abbr":"YX","area_code":"210727","sort":9999,"latitude":41.537224,"longitude":121.242828,"is_map":true,"pinyin":"yixian"},{"id":1445,"name":"永吉县","abbr":"YJX","area_code":"220221","sort":9999,"latitude":43.667416,"longitude":126.501625,"is_map":true,"pinyin":"yongji"},{"id":1446,"name":"伊通满族自治县","abbr":"YTMZZZX","area_code":"220323","sort":9999,"latitude":43.345463,"longitude":125.303123,"is_map":true,"pinyin":"yitongmanzuzizhixian"},{"id":1464,"name":"依兰","abbr":"YL","area_code":"230123","sort":9999,"latitude":46.315105,"longitude":129.565598,"is_map":true,"pinyin":"yilan"},{"id":1470,"name":"依安","abbr":"YA","area_code":"230223","sort":9999,"latitude":47.890099,"longitude":125.307564,"is_map":true,"pinyin":"yian"},{"id":1524,"name":"云和","abbr":"YH","area_code":"331125","sort":9999,"latitude":28.111076,"longitude":119.569458,"is_map":true,"pinyin":"yunhe"},{"id":1585,"name":"余江县","abbr":"YJX","area_code":"360622","sort":9999,"latitude":28.206177,"longitude":116.822762,"is_map":true,"pinyin":"yujiang"},{"id":1597,"name":"永丰","abbr":"YF","area_code":"360825","sort":9999,"latitude":27.321087,"longitude":115.435562,"is_map":true,"pinyin":"yongfeng"},{"id":1605,"name":"宜丰","abbr":"YF","area_code":"360924","sort":9999,"latitude":28.388288,"longitude":114.787384,"is_map":true,"pinyin":"yifeng"},{"id":1613,"name":"宜黄","abbr":"YH","area_code":"361026","sort":9999,"latitude":27.546513,"longitude":116.223022,"is_map":true,"pinyin":"yihuang"},{"id":1619,"name":"弋阳","abbr":"YY","area_code":"361126","sort":9999,"latitude":28.402391,"longitude":117.435005,"is_map":true,"pinyin":"yiyang"},{"id":1631,"name":"鱼台","abbr":"YT","area_code":"370827","sort":9999,"latitude":34.997707,"longitude":116.650024,"is_map":true,"pinyin":"yutai"},{"id":1638,"name":"阳信县","abbr":"YXX","area_code":"371622","sort":9999,"latitude":37.640491,"longitude":117.581329,"is_map":true,"pinyin":"yangxin"},{"id":1645,"name":"宜阳","abbr":"YY","area_code":"410327","sort":9999,"latitude":34.516479,"longitude":112.179993,"is_map":true,"pinyin":"yiyang"},{"id":1654,"name":"延津","abbr":"YJ","area_code":"410726","sort":9999,"latitude":35.149513,"longitude":114.200981,"is_map":true,"pinyin":"yanjin"},{"id":1666,"name":"义马","abbr":"YM","area_code":"411281","sort":9999,"latitude":34.746868,"longitude":111.869415,"is_map":true,"pinyin":"yima"},{"id":1679,"name":"远安","abbr":"YA","area_code":"420525","sort":9999,"latitude":31.059626,"longitude":111.643311,"is_map":true,"pinyin":"yuanan"},{"id":1701,"name":"炎陵县","abbr":"YLX","area_code":"430225","sort":9999,"latitude":26.489458,"longitude":113.776886,"is_map":true,"pinyin":"yanling"},{"id":1709,"name":"岳阳","abbr":"YY","area_code":"430621","sort":9999,"latitude":29.144842,"longitude":113.116074,"is_map":true,"pinyin":"yueyang"},{"id":1756,"name":"阳西","abbr":"YX","area_code":"441721","sort":9999,"latitude":21.75367,"longitude":111.617554,"is_map":true,"pinyin":"yangxi"},{"id":1765,"name":"郁南","abbr":"YN","area_code":"445322","sort":9999,"latitude":23.237709,"longitude":111.535919,"is_map":true,"pinyin":"yunan"},{"id":1778,"name":"阳朔","abbr":"YS","area_code":"450321","sort":9999,"latitude":24.775339,"longitude":110.494698,"is_map":true,"pinyin":"yangshuo"},{"id":1782,"name":"永福","abbr":"YF","area_code":"450326","sort":9999,"latitude":24.986692,"longitude":109.989204,"is_map":true,"pinyin":"yongfu"},{"id":1968,"name":"余庆","abbr":"YQ","area_code":"520329","sort":9999,"latitude":27.221552,"longitude":107.892563,"is_map":true,"pinyin":"yuqing"},{"id":1979,"name":"玉屏侗族自治县","abbr":"YPDZZZX","area_code":"520622","sort":9999,"latitude":27.238024,"longitude":108.917885,"is_map":true,"pinyin":"yupingdongzuzizhixian"},{"id":1982,"name":"印江土家族苗族自治县","abbr":"YJTJZMZZZX","area_code":"520625","sort":9999,"latitude":27.997976,"longitude":108.405518,"is_map":true,"pinyin":"yinjiangtujiazumiaozuzizhixian"},{"id":1984,"name":"沿河土家族自治县","abbr":"YHTJZZZX","area_code":"520627","sort":9999,"latitude":28.560488,"longitude":108.495743,"is_map":true,"pinyin":"yanhetujiazuzizhixian"},{"id":2010,"name":"元氏","abbr":"YS","area_code":"130132","sort":9999,"latitude":37.762512,"longitude":114.526176,"is_map":true,"pinyin":"yuanshi"},{"id":2034,"name":"易门","abbr":"YM","area_code":"530425","sort":9999,"latitude":24.669598,"longitude":102.162109,"is_map":true,"pinyin":"yimen"},{"id":2037,"name":"元江哈尼族彝族傣族自治县","abbr":"YJHNZYZDZZZX","area_code":"530428","sort":9999,"latitude":23.597618,"longitude":101.999657,"is_map":true,"pinyin":"yuanjianghanizuyizudaizuzizhixian"},{"id":2043,"name":"盐津","abbr":"YJ","area_code":"530623","sort":9999,"latitude":28.106922,"longitude":104.235062,"is_map":true,"pinyin":"yanjin"},{"id":2045,"name":"永善","abbr":"YS","area_code":"530625","sort":9999,"latitude":28.231525,"longitude":103.637321,"is_map":true,"pinyin":"yongshan"},{"id":2047,"name":"彝良","abbr":"YL","area_code":"530628","sort":9999,"latitude":27.627424,"longitude":104.048492,"is_map":true,"pinyin":"yiliang"},{"id":2050,"name":"玉龙纳西族自治县","abbr":"YLNXZZZX","area_code":"530721","sort":9999,"latitude":26.830593,"longitude":100.238312,"is_map":true,"pinyin":"yulongnaxizuzizhixian"},{"id":2051,"name":"永胜","abbr":"YS","area_code":"530722","sort":9999,"latitude":26.685623,"longitude":100.7509,"is_map":true,"pinyin":"yongsheng"},{"id":2065,"name":"云县","abbr":"YX","area_code":"530922","sort":9999,"latitude":24.439026,"longitude":100.125633,"is_map":true,"pinyin":"yunxian"},{"id":2066,"name":"永德","abbr":"YD","area_code":"530923","sort":9999,"latitude":24.028158,"longitude":99.253677,"is_map":true,"pinyin":"yongde"},{"id":2075,"name":"姚安","abbr":"YA","area_code":"532325","sort":9999,"latitude":25.505404,"longitude":101.238396,"is_map":true,"pinyin":"yaoan"},{"id":2077,"name":"永仁","abbr":"YR","area_code":"532327","sort":9999,"latitude":26.056316,"longitude":101.671173,"is_map":true,"pinyin":"yongren"},{"id":2078,"name":"元谋","abbr":"YM","area_code":"532328","sort":9999,"latitude":25.703314,"longitude":101.870834,"is_map":true,"pinyin":"yuanmou"},{"id":2085,"name":"元阳","abbr":"YY","area_code":"532528","sort":9999,"latitude":23.219772,"longitude":102.837059,"is_map":true,"pinyin":"yuanyang"},{"id":2101,"name":"漾濞彝族自治县","abbr":"YBYZZZX","area_code":"532922","sort":9999,"latitude":25.669542,"longitude":99.95797,"is_map":true,"pinyin":"yangbiyizuzizhixian"},{"id":2106,"name":"永平","abbr":"YP","area_code":"532928","sort":9999,"latitude":25.461281,"longitude":99.533539,"is_map":true,"pinyin":"yongping"},{"id":2107,"name":"云龙","abbr":"YL","area_code":"532929","sort":9999,"latitude":25.884954,"longitude":99.3694,"is_map":true,"pinyin":"yunlong"},{"id":2115,"name":"盈江","abbr":"YJ","area_code":"533123","sort":9999,"latitude":24.709541,"longitude":97.933929,"is_map":true,"pinyin":"yingjiang"},{"id":2389,"name":"玉树","abbr":"YS","area_code":"632701","sort":9999,"latitude":33.004047,"longitude":97.008522,"is_map":true,"pinyin":"yushu"},{"id":2407,"name":"盐池","abbr":"YC","area_code":"640323","sort":9999,"latitude":37.784222,"longitude":107.405411,"is_map":true,"pinyin":"yanchi"},{"id":5829,"name":"阎良区","abbr":"YLQ","area_code":"610114","sort":9999,"latitude":34.66214,"longitude":109.22802,"is_map":true,"pinyin":"yanliangqu"}],"P":[{"id":340,"name":"盘锦","abbr":"PJ","area_code":"0427","sort":80,"latitude":41.119961,"longitude":122.070778,"is_map":true,"pinyin":"panjin"},{"id":150,"name":"萍乡","abbr":"PX","area_code":"0799","sort":2000,"latitude":27.62289,"longitude":113.854271,"is_map":true,"pinyin":"pingxiang"},{"id":180,"name":"莆田","abbr":"PT","area_code":"0594","sort":2000,"latitude":25.454,"longitude":119.007713,"is_map":true,"pinyin":"putian"},{"id":269,"name":"平顶山","abbr":"PDS","area_code":"0375","sort":2000,"latitude":33.76609,"longitude":113.192413,"is_map":true,"pinyin":"pingdingshan"},{"id":294,"name":"普洱","abbr":"PE","area_code":"0879","sort":2000,"latitude":22.825211,"longitude":100.96624,"is_map":true,"pinyin":"puer"},{"id":315,"name":"攀枝花","abbr":"PZH","area_code":"0812","sort":2000,"latitude":26.582279,"longitude":101.718719,"is_map":true,"pinyin":"panzhihua"},{"id":516,"name":"平和","abbr":"PH","area_code":"200062","sort":2000,"latitude":24.36344,"longitude":117.315872,"is_map":true,"pinyin":"pinghe"},{"id":520,"name":"浦城","abbr":"PC","area_code":"200066","sort":2000,"latitude":27.91721,"longitude":118.541382,"is_map":true,"pinyin":"pucheng"},{"id":524,"name":"平凉","abbr":"PL","area_code":"200070","sort":2000,"latitude":35.54303,"longitude":106.665298,"is_map":true,"pinyin":"pingliang"},{"id":529,"name":"普宁","abbr":"PN","area_code":"200075","sort":2000,"latitude":23.297359,"longitude":116.165688,"is_map":true,"pinyin":"puning"},{"id":569,"name":"平南","abbr":"PN","area_code":"200115","sort":2000,"latitude":23.53919,"longitude":110.392151,"is_map":true,"pinyin":"pingnan"},{"id":578,"name":"盘县","abbr":"PX","area_code":"200124","sort":2000,"latitude":25.70993,"longitude":104.471581,"is_map":true,"pinyin":"panxian"},{"id":664,"name":"平舆","abbr":"PY","area_code":"200210","sort":2000,"latitude":32.96183,"longitude":114.619408,"is_map":true,"pinyin":"pingyu"},{"id":757,"name":"平江","abbr":"PJ","area_code":"200303","sort":2000,"latitude":28.70203,"longitude":113.581337,"is_map":true,"pinyin":"pingjiang"},{"id":810,"name":"磐石","abbr":"PS","area_code":"200356","sort":2000,"latitude":42.946621,"longitude":126.060463,"is_map":true,"pinyin":"panshi"},{"id":827,"name":"邳州","abbr":"PZ","area_code":"200373","sort":2000,"latitude":34.335201,"longitude":118.012459,"is_map":true,"pinyin":"pizhou"},{"id":830,"name":"沛县","abbr":"PX","area_code":"200376","sort":2000,"latitude":34.721661,"longitude":116.9375,"is_map":true,"pinyin":"peixian"},{"id":870,"name":"鄱阳","abbr":"PY","area_code":"200416","sort":2000,"latitude":29.00563,"longitude":116.70343,"is_map":true,"pinyin":"poyang"},{"id":900,"name":"普兰店","abbr":"PLD","area_code":"200446","sort":2000,"latitude":39.394428,"longitude":121.963226,"is_map":true,"pinyin":"pulandian"},{"id":933,"name":"平度","abbr":"PD","area_code":"200479","sort":2000,"latitude":36.786701,"longitude":119.959938,"is_map":true,"pinyin":"pingdu"},{"id":951,"name":"平邑","abbr":"PY","area_code":"200497","sort":2000,"latitude":35.505871,"longitude":117.64048,"is_map":true,"pinyin":"pingyi"},{"id":1005,"name":"平遥","abbr":"PY","area_code":"200551","sort":2000,"latitude":37.189339,"longitude":112.175568,"is_map":true,"pinyin":"pingyao"},{"id":1012,"name":"郫县","abbr":"PX","area_code":"200558","sort":2000,"latitude":30.795891,"longitude":103.902557,"is_map":true,"pinyin":"pixian"},{"id":1029,"name":"彭州","abbr":"PZ","area_code":"200575","sort":2000,"latitude":30.990179,"longitude":103.958107,"is_map":true,"pinyin":"pengzhou"},{"id":1034,"name":"平昌","abbr":"PC","area_code":"200580","sort":2000,"latitude":31.560539,"longitude":107.103577,"is_map":true,"pinyin":"pingchang"},{"id":1041,"name":"蓬安","abbr":"PA","area_code":"200587","sort":2000,"latitude":31.028601,"longitude":106.4123,"is_map":true,"pinyin":"pengan"},{"id":1088,"name":"平湖","abbr":"PH","area_code":"200634","sort":2000,"latitude":30.67585,"longitude":121.01606,"is_map":true,"pinyin":"pinghu"},{"id":1093,"name":"平阳","abbr":"PY","area_code":"200639","sort":2000,"latitude":27.6621,"longitude":120.565948,"is_map":true,"pinyin":"pingyang"},{"id":1099,"name":"浦江","abbr":"PJ","area_code":"200645","sort":2000,"latitude":29.452511,"longitude":119.892059,"is_map":true,"pinyin":"pujiang"},{"id":374,"name":"濮阳市","abbr":"PA","area_code":"03931","sort":9999,"latitude":35.895161,"longitude":115.498688,"is_map":true,"pinyin":"puyang"},{"id":1159,"name":"平谷","abbr":"PG","area_code":"110117","sort":9999,"latitude":40.140621,"longitude":117.121407,"is_map":true,"pinyin":"pinggu"},{"id":1178,"name":"濮阳县","abbr":"PY","area_code":"410928","sort":9999,"latitude":35.712212,"longitude":115.02903,"is_map":true,"pinyin":"puyangxian"},{"id":1199,"name":"平乡","abbr":"PX","area_code":"130532","sort":9999,"latitude":37.069405,"longitude":115.029221,"is_map":true,"pinyin":"pingxiang"},{"id":1232,"name":"平泉","abbr":"PQ","area_code":"130823","sort":9999,"latitude":41.005611,"longitude":118.690239,"is_map":true,"pinyin":"pingquan"},{"id":1518,"name":"磐安","abbr":"PA","area_code":"330727","sort":9999,"latitude":29.052628,"longitude":120.445129,"is_map":true,"pinyin":"panan"},{"id":1550,"name":"平潭","abbr":"PT","area_code":"350128","sort":9999,"latitude":25.503672,"longitude":119.791199,"is_map":true,"pinyin":"pingtan"},{"id":1569,"name":"屏南","abbr":"PN","area_code":"350923","sort":9999,"latitude":26.910826,"longitude":118.987541,"is_map":true,"pinyin":"pingnan"},{"id":1581,"name":"彭泽县","abbr":"PZX","area_code":"360430","sort":9999,"latitude":29.898865,"longitude":116.55584,"is_map":true,"pinyin":"pengze"},{"id":1623,"name":"平阴","abbr":"PY","area_code":"370124","sort":9999,"latitude":36.286922,"longitude":116.455055,"is_map":true,"pinyin":"pingyin"},{"id":1630,"name":"蓬莱","abbr":"PL","area_code":"370684","sort":9999,"latitude":37.811169,"longitude":120.762688,"is_map":true,"pinyin":"penglai"},{"id":1749,"name":"平远","abbr":"PY","area_code":"441426","sort":9999,"latitude":24.569651,"longitude":115.891731,"is_map":true,"pinyin":"pingyuan"},{"id":1786,"name":"平乐","abbr":"PL","area_code":"450330","sort":9999,"latitude":24.632215,"longitude":110.642822,"is_map":true,"pinyin":"pingle"},{"id":1798,"name":"浦北","abbr":"PB","area_code":"450722","sort":9999,"latitude":22.268335,"longitude":109.556343,"is_map":true,"pinyin":"pubei"},{"id":1805,"name":"平果","abbr":"PG","area_code":"451023","sort":9999,"latitude":23.320478,"longitude":107.580406,"is_map":true,"pinyin":"pingguo"},{"id":1838,"name":"凭祥","abbr":"PX","area_code":"451481","sort":9999,"latitude":22.108883,"longitude":106.759041,"is_map":true,"pinyin":"pingxiang"},{"id":1855,"name":"蒲江","abbr":"PJ","area_code":"510131","sort":9999,"latitude":30.194359,"longitude":103.511543,"is_map":true,"pinyin":"pujiang"},{"id":1880,"name":"彭山区","abbr":"PSQ","area_code":"511403","sort":9999,"latitude":30.192299,"longitude":103.870102,"is_map":true,"pinyin":"pengshanqu"},{"id":1971,"name":"平坝","abbr":"PB","area_code":"520421","sort":9999,"latitude":26.40608,"longitude":106.259941,"is_map":true,"pinyin":"pingba"},{"id":1972,"name":"普定","abbr":"PD","area_code":"520422","sort":9999,"latitude":26.305794,"longitude":105.745605,"is_map":true,"pinyin":"puding"},{"id":1988,"name":"普安","abbr":"PA","area_code":"522323","sort":9999,"latitude":25.786404,"longitude":104.955345,"is_map":true,"pinyin":"puan"},{"id":2016,"name":"平塘","abbr":"PT","area_code":"522727","sort":9999,"latitude":25.831802,"longitude":107.324051,"is_map":true,"pinyin":"pingtang"},{"id":2082,"name":"屏边苗族自治县","abbr":"PBMZZZX","area_code":"532523","sort":9999,"latitude":22.987013,"longitude":103.687225,"is_map":true,"pinyin":"pingbianmiaozuzizhixian"},{"id":2233,"name":"蒲城","abbr":"PC","area_code":"610526","sort":9999,"latitude":34.956036,"longitude":109.589653,"is_map":true,"pinyin":"pucheng"},{"id":2406,"name":"平罗","abbr":"PL","area_code":"640221","sort":9999,"latitude":38.906738,"longitude":106.544891,"is_map":true,"pinyin":"pingluo"},{"id":5648,"name":"平山","abbr":"PS","area_code":"130131","sort":9999,"latitude":38.25449,"longitude":114.20929,"is_map":true,"pinyin":"pingshan"}],"J":[{"id":415,"name":"济源","abbr":"JY","area_code":"03912","sort":1867,"latitude":35.06707,"longitude":112.60273,"is_map":true,"pinyin":"jiyuan"},{"id":19,"name":"济南","abbr":"JN","area_code":"0531","sort":2000,"latitude":36.665291,"longitude":116.994926,"is_map":true,"pinyin":"jinan"},{"id":47,"name":"济宁","abbr":"JN","area_code":"0537","sort":2000,"latitude":35.414589,"longitude":116.587242,"is_map":true,"pinyin":"jining"},{"id":49,"name":"景德镇","abbr":"JDZ","area_code":"0798","sort":2000,"latitude":29.26869,"longitude":117.178391,"is_map":true,"pinyin":"jingdezhen"},{"id":55,"name":"嘉兴","abbr":"JX","area_code":"0573","sort":2000,"latitude":30.74501,"longitude":120.755501,"is_map":true,"pinyin":"jiaxing"},{"id":66,"name":"九江市","abbr":"JJ","area_code":"0792","sort":2000,"latitude":29.705481,"longitude":116.001457,"is_map":true,"pinyin":"jiujiang"},{"id":67,"name":"金华","abbr":"JH","area_code":"0579","sort":2000,"latitude":29.078119,"longitude":119.647591,"is_map":true,"pinyin":"jinhua"},{"id":88,"name":"佳木斯","abbr":"JMS","area_code":"0454","sort":2000,"latitude":46.80019,"longitude":130.320602,"is_map":true,"pinyin":"jiamusi"},{"id":100,"name":"荆州","abbr":"JZ","area_code":"0716","sort":2000,"latitude":30.334789,"longitude":112.240692,"is_map":true,"pinyin":"jingzhou"},{"id":101,"name":"吉林","abbr":"JL","area_code":"0432","sort":2000,"latitude":43.837841,"longitude":126.549438,"is_map":true,"pinyin":"jilin"},{"id":110,"name":"锦州","abbr":"JZ","area_code":"0416","sort":2000,"latitude":41.09515,"longitude":121.127029,"is_map":true,"pinyin":"jinzhou"},{"id":130,"name":"江门","abbr":"JM","area_code":"0750","sort":2000,"latitude":22.57865,"longitude":113.081612,"is_map":true,"pinyin":"jiangmen"},{"id":144,"name":"焦作","abbr":"JZ","area_code":"03911","sort":2000,"latitude":35.21563,"longitude":113.242012,"is_map":true,"pinyin":"jiaozuo"},{"id":151,"name":"荆门","abbr":"JM","area_code":"0724","sort":2000,"latitude":31.03546,"longitude":112.199448,"is_map":true,"pinyin":"jingmen"},{"id":153,"name":"晋中","abbr":"JZ","area_code":"0354","sort":2000,"latitude":37.687019,"longitude":112.752777,"is_map":true,"pinyin":"jinzhong"},{"id":220,"name":"吉安","abbr":"JA","area_code":"0796","sort":2000,"latitude":27.113819,"longitude":114.993759,"is_map":true,"pinyin":"jian"},{"id":221,"name":"鸡西","abbr":"JX","area_code":"0467","sort":2000,"latitude":45.295238,"longitude":130.969543,"is_map":true,"pinyin":"jixi"},{"id":231,"name":"揭阳","abbr":"JY","area_code":"0663","sort":2000,"latitude":23.549721,"longitude":116.372711,"is_map":true,"pinyin":"jieyang"},{"id":274,"name":"吉首","abbr":"JS","area_code":"0743","sort":2000,"latitude":28.26244,"longitude":109.698112,"is_map":true,"pinyin":"jishou"},{"id":319,"name":"江油","abbr":"JY","area_code":"08161","sort":2000,"latitude":31.75691,"longitude":104.724579,"is_map":true,"pinyin":"jiangyou"},{"id":334,"name":"晋江","abbr":"JJ","area_code":"0595111","sort":2000,"latitude":24.781441,"longitude":118.551987,"is_map":true,"pinyin":"jinjiang"},{"id":434,"name":"简阳","abbr":"JY","area_code":"10012","sort":2000,"latitude":30.411329,"longitude":104.547333,"is_map":true,"pinyin":"jianyang"},{"id":435,"name":"江北","abbr":"JB","area_code":"10013","sort":2000,"latitude":29.606609,"longitude":106.574387,"is_map":true,"pinyin":"jiangbei"},{"id":436,"name":"江津","abbr":"JJ","area_code":"10014","sort":2000,"latitude":29.29014,"longitude":106.259361,"is_map":true,"pinyin":"jiangjin"},{"id":437,"name":"晋城","abbr":"JC","area_code":"10015","sort":2000,"latitude":35.490391,"longitude":112.851128,"is_map":true,"pinyin":"jincheng"},{"id":438,"name":"九龙坡","abbr":"JLP","area_code":"10016","sort":2000,"latitude":29.502069,"longitude":106.511398,"is_map":true,"pinyin":"jiulongpo"},{"id":487,"name":"界首","abbr":"JS","area_code":"200033","sort":2000,"latitude":33.257179,"longitude":115.374512,"is_map":true,"pinyin":"jieshou"},{"id":509,"name":"建瓯","abbr":"JO","area_code":"200055","sort":2000,"latitude":27.022659,"longitude":118.304977,"is_map":true,"pinyin":"jianou"},{"id":517,"name":"建阳","abbr":"JY","area_code":"200063","sort":2000,"latitude":27.331751,"longitude":118.12043,"is_map":true,"pinyin":"jianyang"},{"id":526,"name":"酒泉","abbr":"JQ","area_code":"200072","sort":2000,"latitude":39.732552,"longitude":98.493942,"is_map":true,"pinyin":"jiuquan"},{"id":527,"name":"嘉峪关","abbr":"JYG","area_code":"200073","sort":2000,"latitude":39.772011,"longitude":98.290108,"is_map":true,"pinyin":"jiayuguan"},{"id":528,"name":"金昌","abbr":"JC","area_code":"200074","sort":2000,"latitude":38.520061,"longitude":102.187592,"is_map":true,"pinyin":"jinchang"},{"id":533,"name":"揭东","abbr":"JD","area_code":"200079","sort":2000,"latitude":23.566059,"longitude":116.412109,"is_map":true,"pinyin":"jiedong"},{"id":552,"name":"揭西","abbr":"JX","area_code":"200098","sort":2000,"latitude":23.43141,"longitude":115.841888,"is_map":true,"pinyin":"jiexi"},{"id":580,"name":"金沙","abbr":"JS","area_code":"200126","sort":2000,"latitude":27.459221,"longitude":106.220139,"is_map":true,"pinyin":"jinsha"},{"id":610,"name":"景县","abbr":"JX","area_code":"200156","sort":2000,"latitude":37.692341,"longitude":116.270599,"is_map":true,"pinyin":"jingxian"},{"id":674,"name":"郏县","abbr":"JX","area_code":"200220","sort":2000,"latitude":33.971802,"longitude":113.212624,"is_map":true,"pinyin":"jiaxian"},{"id":689,"name":"浚县","abbr":"JX","area_code":"200235","sort":2000,"latitude":35.67617,"longitude":114.550781,"is_map":true,"pinyin":"junxian"},{"id":716,"name":"监利","abbr":"JL","area_code":"200262","sort":2000,"latitude":29.839279,"longitude":112.904922,"is_map":true,"pinyin":"jianli"},{"id":723,"name":"京山","abbr":"JS","area_code":"200269","sort":2000,"latitude":31.01848,"longitude":113.11953,"is_map":true,"pinyin":"jingshan"},{"id":800,"name":"津市","abbr":"JS","area_code":"200346","sort":2000,"latitude":29.605431,"longitude":111.877411,"is_map":true,"pinyin":"jinshi"},{"id":814,"name":"蛟河","abbr":"JH","area_code":"200360","sort":2000,"latitude":43.72393,"longitude":127.344772,"is_map":true,"pinyin":"jiaohe"},{"id":817,"name":"九台","abbr":"JT","area_code":"200363","sort":2000,"latitude":44.151741,"longitude":125.839493,"is_map":true,"pinyin":"jiutai"},{"id":833,"name":"江都","abbr":"JD","area_code":"200379","sort":2000,"latitude":32.434582,"longitude":119.570061,"is_map":true,"pinyin":"jiangdu"},{"id":846,"name":"靖江","abbr":"JJ","area_code":"200392","sort":2000,"latitude":32.014938,"longitude":120.274544,"is_map":true,"pinyin":"jingjiang"},{"id":850,"name":"姜堰","abbr":"JY","area_code":"200396","sort":2000,"latitude":32.50882,"longitude":120.127007,"is_map":true,"pinyin":"jiangyan"},{"id":851,"name":"建湖","abbr":"JH","area_code":"200397","sort":2000,"latitude":33.464062,"longitude":119.798576,"is_map":true,"pinyin":"jianhu"},{"id":858,"name":"句容","abbr":"JR","area_code":"200404","sort":2000,"latitude":31.94482,"longitude":119.16864,"is_map":true,"pinyin":"jurong"},{"id":860,"name":"金坛","abbr":"JT","area_code":"200406","sort":2000,"latitude":31.723221,"longitude":119.597939,"is_map":true,"pinyin":"jintan"},{"id":867,"name":"金湖","abbr":"JH","area_code":"200413","sort":2000,"latitude":33.02359,"longitude":119.020432,"is_map":true,"pinyin":"jinhu"},{"id":887,"name":"进贤","abbr":"JX","area_code":"200433","sort":2000,"latitude":28.376789,"longitude":116.242493,"is_map":true,"pinyin":"jinxian"},{"id":888,"name":"吉水","abbr":"JS","area_code":"200434","sort":2000,"latitude":27.229759,"longitude":115.135498,"is_map":true,"pinyin":"jishui"},{"id":940,"name":"胶州","abbr":"JZ","area_code":"200486","sort":2000,"latitude":36.26445,"longitude":120.033539,"is_map":true,"pinyin":"jiaozhou"},{"id":945,"name":"巨野","abbr":"JY","area_code":"200491","sort":2000,"latitude":35.396332,"longitude":116.094948,"is_map":true,"pinyin":"juye"},{"id":950,"name":"莒南","abbr":"JN","area_code":"200496","sort":2000,"latitude":35.174858,"longitude":118.835426,"is_map":true,"pinyin":"junan"},{"id":968,"name":"莒县","abbr":"JX","area_code":"200514","sort":2000,"latitude":35.579971,"longitude":118.836868,"is_map":true,"pinyin":"juxian"},{"id":969,"name":"鄄城","abbr":"JC","area_code":"200515","sort":2000,"latitude":35.563499,"longitude":115.510048,"is_map":true,"pinyin":"juancheng"},{"id":976,"name":"金乡","abbr":"JX","area_code":"200522","sort":2000,"latitude":35.066608,"longitude":116.311478,"is_map":true,"pinyin":"jinxiang"},{"id":988,"name":"嘉祥","abbr":"JX","area_code":"200534","sort":2000,"latitude":35.407501,"longitude":116.342491,"is_map":true,"pinyin":"jiaxiang"},{"id":1000,"name":"介休","abbr":"JX","area_code":"200546","sort":2000,"latitude":37.0271,"longitude":111.916718,"is_map":true,"pinyin":"jiexiu"},{"id":1043,"name":"金堂","abbr":"JT","area_code":"200589","sort":2000,"latitude":30.86203,"longitude":104.412048,"is_map":true,"pinyin":"jintang"},{"id":1049,"name":"静海","abbr":"JH","area_code":"200595","sort":2000,"latitude":38.947369,"longitude":116.974281,"is_map":true,"pinyin":"jinghai"},{"id":1050,"name":"蓟县","abbr":"JX","area_code":"200596","sort":2000,"latitude":40.045769,"longitude":117.408287,"is_map":true,"pinyin":"jixian"},{"id":1069,"name":"建水","abbr":"JS","area_code":"200615","sort":2000,"latitude":23.634991,"longitude":102.826988,"is_map":true,"pinyin":"jianshui"},{"id":1095,"name":"嘉善","abbr":"JS","area_code":"200641","sort":2000,"latitude":30.83075,"longitude":120.927162,"is_map":true,"pinyin":"jiashan"},{"id":1107,"name":"江山","abbr":"JS","area_code":"200653","sort":2000,"latitude":28.737249,"longitude":118.6269,"is_map":true,"pinyin":"jiangshan"},{"id":1111,"name":"建德","abbr":"JD","area_code":"200657","sort":2000,"latitude":29.474751,"longitude":119.281212,"is_map":true,"pinyin":"jiande"},{"id":1112,"name":"缙云","abbr":"JY","area_code":"200658","sort":2000,"latitude":28.659281,"longitude":120.091583,"is_map":true,"pinyin":"jinyun"},{"id":353,"name":"即墨","abbr":"JM","area_code":"05321","sort":9999,"latitude":36.38932,"longitude":120.447151,"is_map":true,"pinyin":"jimo"},{"id":359,"name":"景洪","abbr":"JH","area_code":"0691","sort":9999,"latitude":22.00008,"longitude":100.771629,"is_map":true,"pinyin":"jinghong"},{"id":364,"name":"江阴","abbr":"JY","area_code":"05101","sort":9999,"latitude":31.92005,"longitude":120.2854,"is_map":true,"pinyin":"jiangyin"},{"id":1154,"name":"靖边县","abbr":"JBX","area_code":"610824","sort":9999,"latitude":37.599312,"longitude":108.795677,"is_map":true,"pinyin":"jingbian"},{"id":1155,"name":"晋州","abbr":"JZ","area_code":"130183","sort":9999,"latitude":38.033562,"longitude":115.044098,"is_map":true,"pinyin":"jinzhou"},{"id":1186,"name":"鸡泽","abbr":"JZ","area_code":"130431","sort":9999,"latitude":36.914909,"longitude":114.878517,"is_map":true,"pinyin":"jize"},{"id":1196,"name":"巨鹿","abbr":"JL","area_code":"130529","sort":9999,"latitude":37.217682,"longitude":115.03878,"is_map":true,"pinyin":"julu"},{"id":1255,"name":"冀州","abbr":"JZ","area_code":"131181","sort":9999,"latitude":37.542789,"longitude":115.57917,"is_map":true,"pinyin":"jizhou"},{"id":1299,"name":"稷山","abbr":"JS","area_code":"140824","sort":9999,"latitude":35.60041,"longitude":110.978996,"is_map":true,"pinyin":"jishan"},{"id":1444,"name":"建昌","abbr":"JC","area_code":"211422","sort":9999,"latitude":40.81308,"longitude":119.804108,"is_map":true,"pinyin":"jianchang"},{"id":1451,"name":"集安","abbr":"JA","area_code":"220582","sort":9999,"latitude":41.126274,"longitude":126.186203,"is_map":true,"pinyin":"jian"},{"id":1452,"name":"靖宇","abbr":"JY","area_code":"220622","sort":9999,"latitude":42.38969,"longitude":126.808388,"is_map":true,"pinyin":"jingyu"},{"id":1477,"name":"鸡东","abbr":"JD","area_code":"230321","sort":9999,"latitude":45.252918,"longitude":131.146378,"is_map":true,"pinyin":"jidong"},{"id":1482,"name":"集贤","abbr":"JX","area_code":"230521","sort":9999,"latitude":46.728981,"longitude":131.139328,"is_map":true,"pinyin":"jixian"},{"id":1490,"name":"嘉荫","abbr":"JY","area_code":"230722","sort":9999,"latitude":48.891376,"longitude":130.39769,"is_map":true,"pinyin":"jiayin"},{"id":1526,"name":"景宁畲族自治县","abbr":"JNSZZZX","area_code":"331127","sort":9999,"latitude":27.977247,"longitude":119.634666,"is_map":true,"pinyin":"jingningshezuzizhixian"},{"id":1541,"name":"金寨","abbr":"JZ","area_code":"341524","sort":9999,"latitude":31.681623,"longitude":115.878517,"is_map":true,"pinyin":"jinzhai"},{"id":1554,"name":"将乐","abbr":"JL","area_code":"350428","sort":9999,"latitude":26.728666,"longitude":117.473557,"is_map":true,"pinyin":"jiangle"},{"id":1556,"name":"建宁","abbr":"JN","area_code":"350430","sort":9999,"latitude":26.831398,"longitude":116.845833,"is_map":true,"pinyin":"jianning"},{"id":1576,"name":"九江县","abbr":"JJ","area_code":"360421","sort":9999,"latitude":29.610264,"longitude":115.892975,"is_map":true,"pinyin":"jiujiang"},{"id":1594,"name":"吉安县","abbr":"JAX","area_code":"360821","sort":9999,"latitude":27.040043,"longitude":114.905113,"is_map":true,"pinyin":"jianxian"},{"id":1601,"name":"井冈山","abbr":"JGS","area_code":"360881","sort":9999,"latitude":26.57053,"longitude":114.166115,"is_map":true,"pinyin":"jinggangshan"},{"id":1606,"name":"靖安","abbr":"JA","area_code":"360925","sort":9999,"latitude":28.86054,"longitude":115.361748,"is_map":true,"pinyin":"jingan"},{"id":1614,"name":"金溪","abbr":"JX","area_code":"361027","sort":9999,"latitude":27.907387,"longitude":116.778748,"is_map":true,"pinyin":"jinxi"},{"id":1624,"name":"济阳","abbr":"JY","area_code":"370125","sort":9999,"latitude":36.976772,"longitude":117.176033,"is_map":true,"pinyin":"jiyang"},{"id":1685,"name":"江陵","abbr":"JL","area_code":"421024","sort":9999,"latitude":30.033918,"longitude":112.417351,"is_map":true,"pinyin":"jiangling"},{"id":1692,"name":"建始","abbr":"JS","area_code":"422822","sort":9999,"latitude":30.601631,"longitude":109.723824,"is_map":true,"pinyin":"jianshi"},{"id":1711,"name":"嘉禾","abbr":"JH","area_code":"431024","sort":9999,"latitude":25.587309,"longitude":112.370621,"is_map":true,"pinyin":"jiahe"},{"id":1716,"name":"江永","abbr":"JY","area_code":"431125","sort":9999,"latitude":25.268154,"longitude":111.346802,"is_map":true,"pinyin":"jiangyong"},{"id":1719,"name":"江华瑶族自治县","abbr":"JHYZZZX","area_code":"431129","sort":9999,"latitude":25.182596,"longitude":111.577278,"is_map":true,"pinyin":"jianghuayaozuzizhixian"},{"id":1750,"name":"蕉岭县","abbr":"JLX","area_code":"441427","sort":9999,"latitude":24.653313,"longitude":116.170532,"is_map":true,"pinyin":"jiaoling"},{"id":1807,"name":"靖西","abbr":"JX","area_code":"451025","sort":9999,"latitude":23.134766,"longitude":106.417549,"is_map":true,"pinyin":"jingxi"},{"id":1817,"name":"井陉","abbr":"JX","area_code":"130121","sort":9999,"latitude":38.033615,"longitude":114.144485,"is_map":true,"pinyin":"jingxing"},{"id":1831,"name":"金秀瑶族自治县","abbr":"JXYZZZX","area_code":"451324","sort":9999,"latitude":24.134941,"longitude":110.188553,"is_map":true,"pinyin":"jinxiuyaozuzizhixian"},{"id":1978,"name":"江口","abbr":"JK","area_code":"520621","sort":9999,"latitude":27.691904,"longitude":108.848427,"is_map":true,"pinyin":"jiangkou"},{"id":2001,"name":"锦屏","abbr":"JP","area_code":"522628","sort":9999,"latitude":26.680626,"longitude":109.202522,"is_map":true,"pinyin":"jinping"},{"id":2002,"name":"剑河","abbr":"JH","area_code":"522629","sort":9999,"latitude":26.652386,"longitude":108.589508,"is_map":true,"pinyin":"jianhe"},{"id":2022,"name":"晋宁","abbr":"JN","area_code":"530122","sort":9999,"latitude":24.666945,"longitude":102.594986,"is_map":true,"pinyin":"jinning"},{"id":2030,"name":"江川","abbr":"JC","area_code":"530421","sort":9999,"latitude":24.291006,"longitude":102.74984,"is_map":true,"pinyin":"jiangchuan"},{"id":2056,"name":"景东彝族自治县","abbr":"JDYZZZX","area_code":"530823","sort":9999,"latitude":24.448523,"longitude":100.840012,"is_map":true,"pinyin":"jingdongyizuzizhixian"},{"id":2057,"name":"景谷傣族彝族自治县","abbr":"JGDZYZZZX","area_code":"530824","sort":9999,"latitude":23.500278,"longitude":100.701424,"is_map":true,"pinyin":"jinggudaizuyizuzizhixian"},{"id":2059,"name":"江城哈尼族彝族自治县","abbr":"JCHNZYZZZX","area_code":"530826","sort":9999,"latitude":22.583361,"longitude":101.859146,"is_map":true,"pinyin":"jiangchenghanizuyizuzizhixian"},{"id":2086,"name":"金平苗族瑶族傣族自治县","abbr":"JPMZYZDZZZX","area_code":"532530","sort":9999,"latitude":22.779982,"longitude":103.228355,"is_map":true,"pinyin":"jinpingmiaozuyaozudaizuzizhixian"},{"id":2109,"name":"剑川","abbr":"JC","area_code":"532931","sort":9999,"latitude":26.530066,"longitude":99.905884,"is_map":true,"pinyin":"jianchuan"},{"id":2218,"name":"泾阳","abbr":"JY","area_code":"610423","sort":9999,"latitude":34.528492,"longitude":108.837837,"is_map":true,"pinyin":"jingyang"},{"id":2386,"name":"久治县","abbr":"JZX","area_code":"632625","sort":9999,"latitude":33.430218,"longitude":101.484886,"is_map":true,"pinyin":"jiuzhi"},{"id":5904,"name":"加格达奇区","abbr":"JGDQQ","area_code":"232701","sort":9999,"latitude":50.424652,"longitude":124.126717,"is_map":true,"pinyin":"jiagedaqiqu"}],"L":[{"id":400,"name":"漯河","abbr":"LH","area_code":"0395","sort":1868,"latitude":33.58149,"longitude":114.016808,"is_map":true,"pinyin":"luohe"},{"id":40,"name":"廊坊","abbr":"LF","area_code":"0316","sort":2000,"latitude":39.02177,"longitude":116.756378,"is_map":true,"pinyin":"langfang"},{"id":41,"name":"兰州","abbr":"LZ","area_code":"0931","sort":2000,"latitude":36.19622,"longitude":103.125,"is_map":true,"pinyin":"lanzhou"},{"id":60,"name":"临沂","abbr":"LY","area_code":"0539","sort":2000,"latitude":35.104649,"longitude":118.356461,"is_map":true,"pinyin":"linyi"},{"id":73,"name":"丽水","abbr":"LS","area_code":"0578","sort":2000,"latitude":28.467199,"longitude":119.922928,"is_map":true,"pinyin":"lishui"},{"id":81,"name":"柳州","abbr":"LZ","area_code":"0772","sort":2000,"latitude":24.32543,"longitude":109.41552,"is_map":true,"pinyin":"liuzhou"},{"id":84,"name":"聊城","abbr":"LC","area_code":"0635","sort":2000,"latitude":36.45702,"longitude":115.985489,"is_map":true,"pinyin":"liaocheng"},{"id":85,"name":"六安","abbr":"LA","area_code":"0564","sort":2000,"latitude":31.73488,"longitude":116.523239,"is_map":true,"pinyin":"luan"},{"id":89,"name":"连云港","abbr":"LYG","area_code":"0518","sort":2000,"latitude":34.596691,"longitude":119.222954,"is_map":true,"pinyin":"lianyungang"},{"id":94,"name":"洛阳","abbr":"LY","area_code":"0379","sort":2000,"latitude":34.618118,"longitude":112.453613,"is_map":true,"pinyin":"luoyang"},{"id":106,"name":"泸州","abbr":"LZ","area_code":"0830","sort":2000,"latitude":28.8717,"longitude":105.442574,"is_map":true,"pinyin":"luzhou"},{"id":139,"name":"乐山","abbr":"LS","area_code":"0833","sort":2000,"latitude":29.55221,"longitude":103.765388,"is_map":true,"pinyin":"leshan"},{"id":143,"name":"娄底","abbr":"LD","area_code":"0738","sort":2000,"latitude":27.697281,"longitude":111.994583,"is_map":true,"pinyin":"loudi"},{"id":155,"name":"丽江","abbr":"LJ","area_code":"0888","sort":2000,"latitude":26.85648,"longitude":100.227097,"is_map":true,"pinyin":"lijiang"},{"id":168,"name":"临汾","abbr":"LF","area_code":"0357","sort":2000,"latitude":36.088219,"longitude":111.519623,"is_map":true,"pinyin":"linfen"},{"id":181,"name":"龙岩","abbr":"LY","area_code":"0597","sort":2000,"latitude":25.075041,"longitude":117.01722,"is_map":true,"pinyin":"longyan"},{"id":201,"name":"罗定","abbr":"LD","area_code":"0766","sort":2000,"latitude":22.768299,"longitude":111.570038,"is_map":true,"pinyin":"luoding"},{"id":222,"name":"辽阳市","abbr":"LYS","area_code":"0419","sort":2000,"latitude":41.268089,"longitude":123.237358,"is_map":true,"pinyin":"liaoyangshi"},{"id":227,"name":"辽源","abbr":"LY","area_code":"0437","sort":2000,"latitude":42.88805,"longitude":125.143677,"is_map":true,"pinyin":"liaoyuan"},{"id":232,"name":"拉萨","abbr":"LS","area_code":"0891","sort":2000,"latitude":29.64415,"longitude":91.114502,"is_map":true,"pinyin":"lasa"},{"id":281,"name":"吕梁","abbr":"LL","area_code":"0358","sort":2000,"latitude":37.519341,"longitude":111.141647,"is_map":true,"pinyin":"lvliang"},{"id":391,"name":"莱芜","abbr":"LW","area_code":"0634","sort":2000,"latitude":36.213589,"longitude":117.676666,"is_map":true,"pinyin":"laiwu"},{"id":441,"name":"六盘水","abbr":"LPS","area_code":"10019","sort":2000,"latitude":26.68469,"longitude":104.746681,"is_map":true,"pinyin":"liupanshui"},{"id":456,"name":"庐江","abbr":"LJ","area_code":"200002","sort":2000,"latitude":31.255671,"longitude":117.287361,"is_map":true,"pinyin":"lujiang"},{"id":462,"name":"临泉","abbr":"LQ","area_code":"200008","sort":2000,"latitude":33.064571,"longitude":115.25811,"is_map":true,"pinyin":"linquan"},{"id":470,"name":"利辛","abbr":"LX","area_code":"200016","sort":2000,"latitude":33.14484,"longitude":116.208389,"is_map":true,"pinyin":"lixin"},{"id":472,"name":"灵璧","abbr":"LB","area_code":"200018","sort":2000,"latitude":33.54232,"longitude":117.558548,"is_map":true,"pinyin":"lingbi"},{"id":498,"name":"龙海","abbr":"LH","area_code":"200044","sort":2000,"latitude":24.446581,"longitude":117.81813,"is_map":true,"pinyin":"longhai"},{"id":510,"name":"连江","abbr":"LJ","area_code":"200056","sort":2000,"latitude":26.197531,"longitude":119.539574,"is_map":true,"pinyin":"lianjiang"},{"id":525,"name":"临夏","abbr":"LX","area_code":"200071","sort":2000,"latitude":35.6045,"longitude":103.243172,"is_map":true,"pinyin":"linxia"},{"id":532,"name":"陆丰","abbr":"LF","area_code":"200078","sort":2000,"latitude":22.94511,"longitude":115.644623,"is_map":true,"pinyin":"lufeng"},{"id":538,"name":"廉江","abbr":"LJ","area_code":"200084","sort":2000,"latitude":21.609619,"longitude":110.286247,"is_map":true,"pinyin":"lianjiang"},{"id":541,"name":"雷州","abbr":"LZ","area_code":"200087","sort":2000,"latitude":20.91444,"longitude":110.096512,"is_map":true,"pinyin":"leizhou"},{"id":584,"name":"临高","abbr":"LG","area_code":"200130","sort":2000,"latitude":19.91243,"longitude":109.690773,"is_map":true,"pinyin":"lingao"},{"id":599,"name":"临漳","abbr":"LZ","area_code":"200145","sort":2000,"latitude":36.334641,"longitude":114.619553,"is_map":true,"pinyin":"linzhang"},{"id":600,"name":"滦县","abbr":"LX","area_code":"200146","sort":2000,"latitude":39.740582,"longitude":118.703506,"is_map":true,"pinyin":"luanxian"},{"id":603,"name":"滦南","abbr":"LN","area_code":"200149","sort":2000,"latitude":39.166672,"longitude":118.068031,"is_map":true,"pinyin":"luannan"},{"id":607,"name":"隆尧","abbr":"LY","area_code":"200153","sort":2000,"latitude":37.35025,"longitude":114.770309,"is_map":true,"pinyin":"longyao"},{"id":639,"name":"林州","abbr":"LZ","area_code":"200185","sort":2000,"latitude":36.08308,"longitude":113.819077,"is_map":true,"pinyin":"linzhou"},{"id":643,"name":"鹿邑","abbr":"LY","area_code":"200189","sort":2000,"latitude":33.860088,"longitude":115.484428,"is_map":true,"pinyin":"luyi"},{"id":649,"name":"临颍","abbr":"LY","area_code":"200195","sort":2000,"latitude":33.809582,"longitude":113.934433,"is_map":true,"pinyin":"linying"},{"id":659,"name":"灵宝","abbr":"LB","area_code":"200205","sort":2000,"latitude":34.51685,"longitude":110.894562,"is_map":true,"pinyin":"lingbao"},{"id":662,"name":"鲁山","abbr":"LS","area_code":"200208","sort":2000,"latitude":33.738541,"longitude":112.90802,"is_map":true,"pinyin":"lushan"},{"id":681,"name":"兰考","abbr":"LK","area_code":"200227","sort":2000,"latitude":34.8223,"longitude":114.821152,"is_map":true,"pinyin":"lankao"},{"id":695,"name":"罗山","abbr":"LS","area_code":"200241","sort":2000,"latitude":32.20314,"longitude":114.513069,"is_map":true,"pinyin":"luoshan"},{"id":734,"name":"利川","abbr":"LC","area_code":"200280","sort":2000,"latitude":30.29121,"longitude":108.935951,"is_map":true,"pinyin":"lichuan"},{"id":735,"name":"老河口","abbr":"LHK","area_code":"200281","sort":2000,"latitude":32.386711,"longitude":111.675072,"is_map":true,"pinyin":"laohekou"},{"id":737,"name":"罗田","abbr":"LT","area_code":"200283","sort":2000,"latitude":30.78397,"longitude":115.399429,"is_map":true,"pinyin":"luotian"},{"id":750,"name":"浏阳","abbr":"LY","area_code":"200296","sort":2000,"latitude":28.16378,"longitude":113.643173,"is_map":true,"pinyin":"liuyang"},{"id":752,"name":"耒阳","abbr":"LY","area_code":"200298","sort":2000,"latitude":26.42243,"longitude":112.859879,"is_map":true,"pinyin":"leiyang"},{"id":753,"name":"醴陵","abbr":"LL","area_code":"200299","sort":2000,"latitude":27.64617,"longitude":113.497032,"is_map":true,"pinyin":"liling"},{"id":762,"name":"隆回","abbr":"LH","area_code":"200308","sort":2000,"latitude":27.114019,"longitude":111.032494,"is_map":true,"pinyin":"longhui"},{"id":767,"name":"澧县","abbr":"LX","area_code":"200313","sort":2000,"latitude":29.633181,"longitude":111.758682,"is_map":true,"pinyin":"lixian"},{"id":769,"name":"涟源","abbr":"LY","area_code":"200315","sort":2000,"latitude":27.692711,"longitude":111.664459,"is_map":true,"pinyin":"lianyuan"},{"id":779,"name":"冷水江","abbr":"LSJ","area_code":"200325","sort":2000,"latitude":27.68615,"longitude":111.435249,"is_map":true,"pinyin":"lengshuijiang"},{"id":782,"name":"临湘","abbr":"LX","area_code":"200328","sort":2000,"latitude":29.476839,"longitude":113.450577,"is_map":true,"pinyin":"linxiang"},{"id":798,"name":"临澧","abbr":"LL","area_code":"200344","sort":2000,"latitude":29.440981,"longitude":111.647346,"is_map":true,"pinyin":"linli"},{"id":799,"name":"龙山","abbr":"LS","area_code":"200345","sort":2000,"latitude":29.457899,"longitude":109.443871,"is_map":true,"pinyin":"longshan"},{"id":809,"name":"梨树","abbr":"LS","area_code":"200355","sort":2000,"latitude":43.307171,"longitude":124.33564,"is_map":true,"pinyin":"lishu"},{"id":852,"name":"溧阳","abbr":"LY","area_code":"200398","sort":2000,"latitude":31.415859,"longitude":119.484596,"is_map":true,"pinyin":"liyang"},{"id":853,"name":"涟水","abbr":"LS","area_code":"200399","sort":2000,"latitude":33.780979,"longitude":119.260887,"is_map":true,"pinyin":"lianshui"},{"id":865,"name":"溧水","abbr":"LS","area_code":"200411","sort":2000,"latitude":31.381029,"longitude":118.969948,"is_map":true,"pinyin":"lishui"},{"id":873,"name":"乐平","abbr":"LP","area_code":"200419","sort":2000,"latitude":28.961729,"longitude":117.128998,"is_map":true,"pinyin":"leping"},{"id":897,"name":"龙南","abbr":"LN","area_code":"200443","sort":2000,"latitude":24.911051,"longitude":114.789932,"is_map":true,"pinyin":"longnan"},{"id":909,"name":"凌源","abbr":"LY","area_code":"200455","sort":2000,"latitude":41.24548,"longitude":119.401337,"is_map":true,"pinyin":"lingyuan"},{"id":938,"name":"兰陵","abbr":"LL","area_code":"200484","sort":2000,"latitude":34.857288,"longitude":118.070717,"is_map":true,"pinyin":"lanling"},{"id":944,"name":"龙口","abbr":"LK","area_code":"200490","sort":2000,"latitude":37.643452,"longitude":120.478722,"is_map":true,"pinyin":"longkou"},{"id":948,"name":"莱西","abbr":"LX","area_code":"200494","sort":2000,"latitude":36.888081,"longitude":120.517769,"is_map":true,"pinyin":"laixi"},{"id":949,"name":"莱州","abbr":"LZ","area_code":"200495","sort":2000,"latitude":37.177021,"longitude":119.942169,"is_map":true,"pinyin":"laizhou"},{"id":952,"name":"莱阳","abbr":"LY","area_code":"200498","sort":2000,"latitude":36.978779,"longitude":120.711807,"is_map":true,"pinyin":"laiyang"},{"id":954,"name":"临清","abbr":"LQ","area_code":"200500","sort":2000,"latitude":36.838341,"longitude":115.70504,"is_map":true,"pinyin":"linqing"},{"id":955,"name":"临沭","abbr":"LS","area_code":"200501","sort":2000,"latitude":34.919849,"longitude":118.650627,"is_map":true,"pinyin":"linshu"},{"id":973,"name":"临朐","abbr":"LQ","area_code":"200519","sort":2000,"latitude":36.51231,"longitude":118.542999,"is_map":true,"pinyin":"linqu"},{"id":974,"name":"梁山","abbr":"LS","area_code":"200520","sort":2000,"latitude":35.802399,"longitude":116.09584,"is_map":true,"pinyin":"liangshan"},{"id":980,"name":"乐陵","abbr":"LL","area_code":"200526","sort":2000,"latitude":37.72979,"longitude":117.231712,"is_map":true,"pinyin":"leling"},{"id":986,"name":"临邑","abbr":"LY","area_code":"200532","sort":2000,"latitude":37.18998,"longitude":116.8666,"is_map":true,"pinyin":"linyi"},{"id":993,"name":"陵县","abbr":"LX","area_code":"200539","sort":2000,"latitude":37.335659,"longitude":116.57634,"is_map":true,"pinyin":"lingxian"},{"id":1001,"name":"临猗","abbr":"LY","area_code":"200547","sort":2000,"latitude":35.144711,"longitude":110.774078,"is_map":true,"pinyin":"linyi"},{"id":1023,"name":"隆昌","abbr":"LC","area_code":"200569","sort":2000,"latitude":29.339479,"longitude":105.287727,"is_map":true,"pinyin":"longchang"},{"id":1026,"name":"泸县","abbr":"LX","area_code":"200572","sort":2000,"latitude":29.1516,"longitude":105.381851,"is_map":true,"pinyin":"luxian"},{"id":1035,"name":"阆中","abbr":"LZ","area_code":"200581","sort":2000,"latitude":31.558371,"longitude":106.00499,"is_map":true,"pinyin":"langzhong"},{"id":1036,"name":"邻水","abbr":"LS","area_code":"200582","sort":2000,"latitude":30.334579,"longitude":106.930481,"is_map":true,"pinyin":"linshui"},{"id":1063,"name":"陆良","abbr":"LL","area_code":"200609","sort":2000,"latitude":25.029409,"longitude":103.666832,"is_map":true,"pinyin":"luliang"},{"id":1064,"name":"罗平","abbr":"LP","area_code":"200610","sort":2000,"latitude":24.88468,"longitude":104.308701,"is_map":true,"pinyin":"luoping"},{"id":1078,"name":"乐清","abbr":"LQ","area_code":"200624","sort":2000,"latitude":28.11289,"longitude":120.983383,"is_map":true,"pinyin":"leqing"},{"id":1082,"name":"临海","abbr":"LH","area_code":"200628","sort":2000,"latitude":28.8584,"longitude":121.144951,"is_map":true,"pinyin":"linhai"},{"id":1097,"name":"临安","abbr":"LA","area_code":"200643","sort":2000,"latitude":30.233829,"longitude":119.7248,"is_map":true,"pinyin":"linan"},{"id":1106,"name":"兰溪","abbr":"LX","area_code":"200652","sort":2000,"latitude":29.20838,"longitude":119.46051,"is_map":true,"pinyin":"lanxi"},{"id":1115,"name":"龙游","abbr":"LY","area_code":"200661","sort":2000,"latitude":29.028271,"longitude":119.172249,"is_map":true,"pinyin":"longyou"},{"id":1117,"name":"龙泉","abbr":"LQ","area_code":"200663","sort":2000,"latitude":28.074341,"longitude":119.141678,"is_map":true,"pinyin":"longquan"},{"id":1130,"name":"梁平","abbr":"LP","area_code":"200676","sort":2000,"latitude":30.673731,"longitude":107.802353,"is_map":true,"pinyin":"liangping"},{"id":1146,"name":"陵水黎族自治县","abbr":"LSLZZZX","area_code":"469028","sort":9999,"latitude":18.50596,"longitude":110.037201,"is_map":true,"pinyin":"lingshuilizuzizhixian"},{"id":1147,"name":"兰西","abbr":"LX","area_code":"231222","sort":9999,"latitude":46.252411,"longitude":126.28788,"is_map":true,"pinyin":"lanxi"},{"id":1148,"name":"龙江","abbr":"LJ","area_code":"230221","sort":9999,"latitude":47.337372,"longitude":123.204826,"is_map":true,"pinyin":"longjiang"},{"id":1153,"name":"辽中区","abbr":"LZQ","area_code":"210122","sort":9999,"latitude":41.511799,"longitude":122.731613,"is_map":true,"pinyin":"liaozhongqu"},{"id":1181,"name":"卢龙","abbr":"LL","area_code":"130324","sort":9999,"latitude":39.883953,"longitude":118.872932,"is_map":true,"pinyin":"lulong"},{"id":1191,"name":"临城","abbr":"LC","area_code":"130522","sort":9999,"latitude":37.444008,"longitude":114.506874,"is_map":true,"pinyin":"lincheng"},{"id":1201,"name":"临西","abbr":"LX","area_code":"130535","sort":9999,"latitude":36.864201,"longitude":115.498688,"is_map":true,"pinyin":"linxi"},{"id":1203,"name":"涞水","abbr":"LS","area_code":"130623","sort":9999,"latitude":39.393147,"longitude":115.711983,"is_map":true,"pinyin":"laishui"},{"id":1209,"name":"涞源","abbr":"LY","area_code":"130630","sort":9999,"latitude":39.357552,"longitude":114.692566,"is_map":true,"pinyin":"laiyuan"},{"id":1213,"name":"蠡县","abbr":"LX","area_code":"130635","sort":9999,"latitude":38.496429,"longitude":115.583633,"is_map":true,"pinyin":"lixian"},{"id":1233,"name":"滦平","abbr":"LP","area_code":"130824","sort":9999,"latitude":40.936646,"longitude":117.337128,"is_map":true,"pinyin":"luanping"},{"id":1234,"name":"隆化","abbr":"LH","area_code":"130825","sort":9999,"latitude":41.316666,"longitude":117.736343,"is_map":true,"pinyin":"longhua"},{"id":1297,"name":"灵石","abbr":"LS","area_code":"140729","sort":9999,"latitude":36.847469,"longitude":111.772758,"is_map":true,"pinyin":"lingshi"},{"id":1353,"name":"林西","abbr":"LX","area_code":"150424","sort":9999,"latitude":43.605328,"longitude":118.057747,"is_map":true,"pinyin":"linxi"},{"id":1371,"name":"灵寿","abbr":"LS","area_code":"130126","sort":9999,"latitude":38.306545,"longitude":114.379463,"is_map":true,"pinyin":"lingshou"},{"id":1391,"name":"凉城","abbr":"LC","area_code":"150925","sort":9999,"latitude":40.531628,"longitude":112.500908,"is_map":true,"pinyin":"liangcheng"},{"id":1431,"name":"凌海","abbr":"LH","area_code":"210781","sort":9999,"latitude":41.171738,"longitude":121.364235,"is_map":true,"pinyin":"linghai"},{"id":1435,"name":"辽阳县","abbr":"LYX","area_code":"211021","sort":9999,"latitude":41.21648,"longitude":123.079674,"is_map":true,"pinyin":"liaoyangxian"},{"id":1450,"name":"柳河","abbr":"LH","area_code":"220524","sort":9999,"latitude":42.281483,"longitude":125.74054,"is_map":true,"pinyin":"liuhe"},{"id":1454,"name":"临江","abbr":"LJ","area_code":"220681","sort":9999,"latitude":41.810688,"longitude":126.919296,"is_map":true,"pinyin":"linjiang"},{"id":1461,"name":"龙井","abbr":"LJ","area_code":"222405","sort":9999,"latitude":42.77103,"longitude":129.425751,"is_map":true,"pinyin":"longjing"},{"id":1480,"name":"萝北","abbr":"LB","area_code":"230421","sort":9999,"latitude":47.429726,"longitude":130.544571,"is_map":true,"pinyin":"luobei"},{"id":1488,"name":"林甸","abbr":"LD","area_code":"230623","sort":9999,"latitude":47.186413,"longitude":124.877739,"is_map":true,"pinyin":"lindian"},{"id":1498,"name":"林口","abbr":"LK","area_code":"231025","sort":9999,"latitude":45.286644,"longitude":130.268402,"is_map":true,"pinyin":"linkou"},{"id":1547,"name":"罗源","abbr":"LY","area_code":"350123","sort":9999,"latitude":26.487234,"longitude":119.552643,"is_map":true,"pinyin":"luoyuan"},{"id":1567,"name":"连城","abbr":"LC","area_code":"350825","sort":9999,"latitude":25.708506,"longitude":116.756683,"is_map":true,"pinyin":"liancheng"},{"id":1574,"name":"莲花","abbr":"LH","area_code":"360321","sort":9999,"latitude":27.127808,"longitude":113.955582,"is_map":true,"pinyin":"lianhua"},{"id":1575,"name":"芦溪","abbr":"LX","area_code":"360323","sort":9999,"latitude":27.633633,"longitude":114.041206,"is_map":true,"pinyin":"luxi"},{"id":1609,"name":"黎川","abbr":"LC","area_code":"361022","sort":9999,"latitude":27.292561,"longitude":116.914574,"is_map":true,"pinyin":"lichuan"},{"id":1612,"name":"乐安","abbr":"LA","area_code":"361025","sort":9999,"latitude":27.420101,"longitude":115.838432,"is_map":true,"pinyin":"lean"},{"id":1628,"name":"利津县","abbr":"LJX","area_code":"370522","sort":9999,"latitude":37.493366,"longitude":118.248856,"is_map":true,"pinyin":"lijin"},{"id":1642,"name":"栾川","abbr":"LC","area_code":"410324","sort":9999,"latitude":33.783195,"longitude":111.618385,"is_map":true,"pinyin":"luanchuan"},{"id":1646,"name":"洛宁","abbr":"LN","area_code":"410328","sort":9999,"latitude":34.38718,"longitude":111.655396,"is_map":true,"pinyin":"luoning"},{"id":1665,"name":"卢氏","abbr":"LS","area_code":"411224","sort":9999,"latitude":34.053993,"longitude":111.05265,"is_map":true,"pinyin":"lushi"},{"id":1712,"name":"临武","abbr":"LW","area_code":"431025","sort":9999,"latitude":25.279119,"longitude":112.56459,"is_map":true,"pinyin":"linwu"},{"id":1717,"name":"蓝山","abbr":"LS","area_code":"431127","sort":9999,"latitude":25.375256,"longitude":112.194199,"is_map":true,"pinyin":"lanshan"},{"id":1739,"name":"乐昌","abbr":"LC","area_code":"440281","sort":9999,"latitude":25.128445,"longitude":113.352409,"is_map":true,"pinyin":"lechang"},{"id":1746,"name":"龙门","abbr":"LM","area_code":"441324","sort":9999,"latitude":23.723894,"longitude":114.259987,"is_map":true,"pinyin":"longmen"},{"id":1751,"name":"陆河","abbr":"LH","area_code":"441523","sort":9999,"latitude":23.302683,"longitude":115.657562,"is_map":true,"pinyin":"luhe"},{"id":1752,"name":"龙川","abbr":"LC","area_code":"441622","sort":9999,"latitude":24.101173,"longitude":115.256416,"is_map":true,"pinyin":"longchuan"},{"id":1753,"name":"连平","abbr":"LP","area_code":"441623","sort":9999,"latitude":24.364227,"longitude":114.495949,"is_map":true,"pinyin":"lianping"},{"id":1767,"name":"隆安","abbr":"LA","area_code":"450123","sort":9999,"latitude":23.174763,"longitude":107.68866,"is_map":true,"pinyin":"longan"},{"id":1772,"name":"柳江","abbr":"LJ","area_code":"450221","sort":9999,"latitude":24.257511,"longitude":109.334503,"is_map":true,"pinyin":"liujiang"},{"id":1773,"name":"柳城","abbr":"LC","area_code":"450222","sort":9999,"latitude":24.655121,"longitude":109.245811,"is_map":true,"pinyin":"liucheng"},{"id":1774,"name":"鹿寨","abbr":"LZ","area_code":"450223","sort":9999,"latitude":24.483404,"longitude":109.740807,"is_map":true,"pinyin":"luzhai"},{"id":1779,"name":"灵川","abbr":"LC","area_code":"450323","sort":9999,"latitude":25.408541,"longitude":110.325714,"is_map":true,"pinyin":"lingchuan"},{"id":1784,"name":"龙胜各族自治县","abbr":"LSGZZZX","area_code":"450328","sort":9999,"latitude":25.796429,"longitude":110.009422,"is_map":true,"pinyin":"longshenggezuzizhixian"},{"id":1787,"name":"荔浦","abbr":"LP","area_code":"450331","sort":9999,"latitude":24.497786,"longitude":110.400146,"is_map":true,"pinyin":"lipu"},{"id":1797,"name":"灵山县","abbr":"LSX","area_code":"450721","sort":9999,"latitude":22.418041,"longitude":109.293465,"is_map":true,"pinyin":"lingshan"},{"id":1800,"name":"陆川","abbr":"LC","area_code":"450922","sort":9999,"latitude":22.321054,"longitude":110.264839,"is_map":true,"pinyin":"luchuan"},{"id":1809,"name":"凌云","abbr":"LY","area_code":"451027","sort":9999,"latitude":24.345642,"longitude":106.564873,"is_map":true,"pinyin":"lingyun"},{"id":1810,"name":"乐业","abbr":"LY","area_code":"451028","sort":9999,"latitude":24.782204,"longitude":106.559639,"is_map":true,"pinyin":"leye"},{"id":1813,"name":"隆林各族自治县","abbr":"LLGZZZX","area_code":"451031","sort":9999,"latitude":24.774319,"longitude":105.342361,"is_map":true,"pinyin":"longlingezuzizhixian"},{"id":1822,"name":"罗城仫佬族自治县","abbr":"LCMLZZZX","area_code":"451225","sort":9999,"latitude":24.779327,"longitude":108.902451,"is_map":true,"pinyin":"luochengmulaozuzizhixian"},{"id":1827,"name":"来宾","abbr":"LB","area_code":"451300","sort":9999,"latitude":23.733767,"longitude":109.229774,"is_map":true,"pinyin":"laibin"},{"id":1904,"name":"乐至","abbr":"LZ","area_code":"512022","sort":9999,"latitude":30.27562,"longitude":105.031143,"is_map":true,"pinyin":"lezhi"},{"id":1938,"name":"凉山彝族自治州","abbr":"LSYZZZZ","area_code":"513400","sort":9999,"latitude":27.886763,"longitude":102.258743,"is_map":true,"pinyin":"liangshanyizuzizhizhou"},{"id":1994,"name":"乐亭","abbr":"LT","area_code":"130225","sort":9999,"latitude":39.428131,"longitude":118.905342,"is_map":true,"pinyin":"laoting"},{"id":2004,"name":"黎平","abbr":"LP","area_code":"522631","sort":9999,"latitude":26.230637,"longitude":109.136505,"is_map":true,"pinyin":"liping"},{"id":2007,"name":"雷山","abbr":"LS","area_code":"522634","sort":9999,"latitude":26.381027,"longitude":108.079613,"is_map":true,"pinyin":"leishan"},{"id":2012,"name":"荔波","abbr":"LB","area_code":"522722","sort":9999,"latitude":25.412239,"longitude":107.883797,"is_map":true,"pinyin":"libo"},{"id":2017,"name":"罗甸","abbr":"LD","area_code":"522728","sort":9999,"latitude":25.429893,"longitude":106.750008,"is_map":true,"pinyin":"luodian"},{"id":2019,"name":"龙里","abbr":"LL","area_code":"522730","sort":9999,"latitude":26.448809,"longitude":106.97773,"is_map":true,"pinyin":"longli"},{"id":2026,"name":"禄劝彝族苗族自治县","abbr":"LQYZMZZZX","area_code":"530128","sort":9999,"latitude":25.556534,"longitude":102.469048,"is_map":true,"pinyin":"luquanyizumiaozuzizhixian"},{"id":2039,"name":"龙陵","abbr":"LL","area_code":"530523","sort":9999,"latitude":24.591911,"longitude":98.693565,"is_map":true,"pinyin":"longling"},{"id":2041,"name":"鲁甸","abbr":"LD","area_code":"530621","sort":9999,"latitude":27.191637,"longitude":103.549332,"is_map":true,"pinyin":"ludian"},{"id":2061,"name":"澜沧拉祜族自治县","abbr":"LCLHZZZX","area_code":"530828","sort":9999,"latitude":22.553083,"longitude":99.931198,"is_map":true,"pinyin":"lancanglahuzuzizhixian"},{"id":2063,"name":"临沧","abbr":"LC","area_code":"530900","sort":9999,"latitude":23.886566,"longitude":100.086967,"is_map":true,"pinyin":"lincang"},{"id":2080,"name":"禄丰","abbr":"LF","area_code":"532331","sort":9999,"latitude":25.14327,"longitude":102.075691,"is_map":true,"pinyin":"lufeng"},{"id":2084,"name":"泸西","abbr":"LX","area_code":"532527","sort":9999,"latitude":24.532368,"longitude":103.759621,"is_map":true,"pinyin":"luxi"},{"id":2087,"name":"绿春","abbr":"LC","area_code":"532531","sort":9999,"latitude":22.993521,"longitude":102.39286,"is_map":true,"pinyin":"lvchun"},{"id":2114,"name":"梁河","abbr":"LH","area_code":"533122","sort":9999,"latitude":24.807421,"longitude":98.298195,"is_map":true,"pinyin":"lianghe"},{"id":2116,"name":"陇川","abbr":"LC","area_code":"533124","sort":9999,"latitude":24.184065,"longitude":97.794441,"is_map":true,"pinyin":"longchuan"},{"id":2118,"name":"泸水","abbr":"LS","area_code":"533321","sort":9999,"latitude":25.851143,"longitude":98.854065,"is_map":true,"pinyin":"lushui"},{"id":2121,"name":"兰坪白族普米族自治县","abbr":"LPBZPMZZZX","area_code":"533325","sort":9999,"latitude":26.453838,"longitude":99.421379,"is_map":true,"pinyin":"lanpingbaizupumizuzizhixian"},{"id":2196,"name":"林芝地区","abbr":"LZDQ","area_code":"542600","sort":9999,"latitude":29.654694,"longitude":94.36235,"is_map":true,"pinyin":"linzhidiqu"},{"id":2204,"name":"蓝田县","abbr":"LTX","area_code":"610122","sort":9999,"latitude":34.156189,"longitude":109.317635,"is_map":true,"pinyin":"lantian"},{"id":2278,"name":"洛南","abbr":"LN","area_code":"611021","sort":9999,"latitude":34.088501,"longitude":110.145714,"is_map":true,"pinyin":"luonan"},{"id":2301,"name":"临泽","abbr":"LZ","area_code":"620723","sort":9999,"latitude":39.152149,"longitude":100.166336,"is_map":true,"pinyin":"linze"},{"id":2330,"name":"陇南","abbr":"LN","area_code":"621200","sort":9999,"latitude":33.388599,"longitude":104.929382,"is_map":true,"pinyin":"longnan"},{"id":2405,"name":"灵武","abbr":"LW","area_code":"640181","sort":9999,"latitude":38.094059,"longitude":106.334702,"is_map":true,"pinyin":"lingwu"},{"id":5034,"name":"鹿泉区","abbr":"LQQ","area_code":"130110","sort":9999,"latitude":38.085869,"longitude":114.313438,"is_map":true,"pinyin":"luquanqu"},{"id":5035,"name":"栾城区","abbr":"LCQ","area_code":"130111","sort":9999,"latitude":37.900249,"longitude":114.648392,"is_map":true,"pinyin":"luanchengqu"},{"id":5696,"name":"临桂区","abbr":"LGQ","area_code":"450312","sort":9999,"latitude":25.24774,"longitude":110.201714,"is_map":true,"pinyin":"linguiqu"},{"id":5820,"name":"临翔区","abbr":"LXQ","area_code":"530902","sort":9999,"latitude":23.886562,"longitude":100.086487,"is_map":true,"pinyin":"linxiangqu"},{"id":5830,"name":"临潼区","abbr":"LTQ","area_code":"610115","sort":9999,"latitude":34.372066,"longitude":109.213989,"is_map":true,"pinyin":"lintongqu"}],"Z":[{"id":342,"name":"张掖","abbr":"ZY","area_code":"0936","sort":1900,"latitude":38.925919,"longitude":100.449806,"is_map":true,"pinyin":"zhangye"},{"id":399,"name":"驻马店","abbr":"ZMD","area_code":"0396","sort":1900,"latitude":33.011421,"longitude":114.022987,"is_map":true,"pinyin":"zhumadian"},{"id":26,"name":"珠海","abbr":"ZH","area_code":"0756","sort":2000,"latitude":22.270729,"longitude":113.576683,"is_map":true,"pinyin":"zhuhai"},{"id":27,"name":"镇江","abbr":"ZJ","area_code":"0511","sort":2000,"latitude":32.18959,"longitude":119.425003,"is_map":true,"pinyin":"zhenjiang"},{"id":32,"name":"郑州","abbr":"ZZ","area_code":"0371","sort":2000,"latitude":34.74725,"longitude":113.624931,"is_map":true,"pinyin":"zhengzhou"},{"id":50,"name":"淄博","abbr":"ZB","area_code":"0533","sort":2000,"latitude":36.813099,"longitude":118.054802,"is_map":true,"pinyin":"zibo"},{"id":54,"name":"枣庄","abbr":"ZZ","area_code":"0632","sort":2000,"latitude":34.810711,"longitude":117.32196,"is_map":true,"pinyin":"zaozhuang"},{"id":64,"name":"肇庆","abbr":"ZQ","area_code":"0758","sort":2000,"latitude":23.0469,"longitude":112.465279,"is_map":true,"pinyin":"zhaoqing"},{"id":79,"name":"湛江","abbr":"ZJ","area_code":"0759","sort":2000,"latitude":21.271339,"longitude":110.35894,"is_map":true,"pinyin":"zhanjiang"},{"id":105,"name":"自贡","abbr":"ZG","area_code":"0813","sort":2000,"latitude":29.339199,"longitude":104.778442,"is_map":true,"pinyin":"zigong"},{"id":111,"name":"漳州","abbr":"ZZ","area_code":"0596","sort":2000,"latitude":24.51347,"longitude":117.647247,"is_map":true,"pinyin":"zhangzhou"},{"id":126,"name":"株洲","abbr":"ZZ","area_code":"430200","sort":2000,"latitude":27.827669,"longitude":113.133957,"is_map":true,"pinyin":"zhuzhou"},{"id":154,"name":"张家口","abbr":"ZJK","area_code":"0313","sort":2000,"latitude":40.82444,"longitude":114.88755,"is_map":true,"pinyin":"zhangjiakou"},{"id":203,"name":"中山","abbr":"ZS","area_code":"0760","sort":2000,"latitude":22.515949,"longitude":113.392601,"is_map":true,"pinyin":"zhongshan"},{"id":204,"name":"周口","abbr":"ZK","area_code":"0394","sort":2000,"latitude":33.625832,"longitude":114.696953,"is_map":true,"pinyin":"zhoukou"},{"id":280,"name":"张家界","abbr":"ZJJ","area_code":"0744","sort":2000,"latitude":29.116671,"longitude":110.478394,"is_map":true,"pinyin":"zhangjiajie"},{"id":295,"name":"昭通","abbr":"ZTS","area_code":"88888888888","sort":2000,"latitude":27.338169,"longitude":103.716797,"is_map":true,"pinyin":"zhaotongshi"},{"id":299,"name":"舟山","abbr":"ZS","area_code":"0580","sort":2000,"latitude":29.98539,"longitude":122.207779,"is_map":true,"pinyin":"zhoushan"},{"id":323,"name":"资阳","abbr":"ZY","area_code":"02811","sort":2000,"latitude":30.12859,"longitude":104.627983,"is_map":true,"pinyin":"ziyang"},{"id":453,"name":"长寿","abbr":"ZS","area_code":"10031","sort":2000,"latitude":29.857809,"longitude":107.081047,"is_map":true,"pinyin":"zhangshou"},{"id":485,"name":"枞阳","abbr":"ZY","area_code":"200031","sort":2000,"latitude":30.69961,"longitude":117.220192,"is_map":true,"pinyin":"zongyang"},{"id":503,"name":"漳浦","abbr":"ZP","area_code":"200049","sort":2000,"latitude":24.1171,"longitude":117.613724,"is_map":true,"pinyin":"zhangpu"},{"id":508,"name":"诏安","abbr":"ZA","area_code":"200054","sort":2000,"latitude":23.711519,"longitude":117.175079,"is_map":true,"pinyin":"zhaoan"},{"id":531,"name":"增城","abbr":"ZC","area_code":"200077","sort":2000,"latitude":23.260929,"longitude":113.810898,"is_map":true,"pinyin":"zengcheng"},{"id":564,"name":"紫金","abbr":"ZJ","area_code":"200110","sort":2000,"latitude":23.635321,"longitude":115.183983,"is_map":true,"pinyin":"zijin"},{"id":574,"name":"织金","abbr":"ZJ","area_code":"200120","sort":2000,"latitude":26.66301,"longitude":105.774879,"is_map":true,"pinyin":"zhijin"},{"id":606,"name":"正定","abbr":"ZD","area_code":"200152","sort":2000,"latitude":38.146179,"longitude":114.570961,"is_map":true,"pinyin":"zhengding"},{"id":612,"name":"赵县","abbr":"ZX","area_code":"200158","sort":2000,"latitude":37.75631,"longitude":114.776161,"is_map":true,"pinyin":"zhaoxian"},{"id":637,"name":"镇平","abbr":"ZP","area_code":"200183","sort":2000,"latitude":33.033909,"longitude":112.234482,"is_map":true,"pinyin":"zhenping"},{"id":663,"name":"柘城","abbr":"ZC","area_code":"200209","sort":2000,"latitude":34.091141,"longitude":115.305443,"is_map":true,"pinyin":"zhecheng"},{"id":670,"name":"中牟","abbr":"ZM","area_code":"200216","sort":2000,"latitude":34.719028,"longitude":113.976242,"is_map":true,"pinyin":"zhongmou"},{"id":700,"name":"肇东","abbr":"ZD","area_code":"200246","sort":2000,"latitude":46.051208,"longitude":125.962502,"is_map":true,"pinyin":"zhaodong"},{"id":713,"name":"枣阳","abbr":"ZY","area_code":"200259","sort":2000,"latitude":32.128361,"longitude":112.773979,"is_map":true,"pinyin":"zaoyang"},{"id":715,"name":"钟祥","abbr":"ZX","area_code":"200261","sort":2000,"latitude":31.167971,"longitude":112.588173,"is_map":true,"pinyin":"zhongxiang"},{"id":731,"name":"枝江","abbr":"ZJ","area_code":"200277","sort":2000,"latitude":30.425831,"longitude":111.760437,"is_map":true,"pinyin":"zhijiang"},{"id":785,"name":"资兴","abbr":"ZX","area_code":"200331","sort":2000,"latitude":25.976191,"longitude":113.236008,"is_map":true,"pinyin":"zixing"},{"id":893,"name":"樟树","abbr":"ZS","area_code":"200439","sort":2000,"latitude":28.055889,"longitude":115.54615,"is_map":true,"pinyin":"zhangshu"},{"id":899,"name":"庄河","abbr":"ZH","area_code":"200445","sort":2000,"latitude":39.68037,"longitude":122.96611,"is_map":true,"pinyin":"zhuanghe"},{"id":918,"name":"准格尔","abbr":"ZGE","area_code":"200464","sort":2000,"latitude":39.864262,"longitude":111.239868,"is_map":true,"pinyin":"zhungeer"},{"id":925,"name":"诸城","abbr":"ZC","area_code":"200471","sort":2000,"latitude":35.995831,"longitude":119.409828,"is_map":true,"pinyin":"zhucheng"},{"id":926,"name":"章丘","abbr":"ZQ","area_code":"200472","sort":2000,"latitude":36.67968,"longitude":117.52578,"is_map":true,"pinyin":"zhangqiu"},{"id":927,"name":"邹城","abbr":"ZC","area_code":"200473","sort":2000,"latitude":35.40522,"longitude":117.003853,"is_map":true,"pinyin":"zoucheng"},{"id":939,"name":"邹平","abbr":"ZP","area_code":"200485","sort":2000,"latitude":36.862991,"longitude":117.743088,"is_map":true,"pinyin":"zouping"},{"id":965,"name":"招远","abbr":"ZY","area_code":"200511","sort":2000,"latitude":37.355309,"longitude":120.434212,"is_map":true,"pinyin":"zhaoyuan"},{"id":1003,"name":"泽州","abbr":"ZZ","area_code":"200549","sort":2000,"latitude":35.500431,"longitude":112.943657,"is_map":true,"pinyin":"zezhou"},{"id":1025,"name":"资中","abbr":"ZZ","area_code":"200571","sort":2000,"latitude":29.76416,"longitude":104.852119,"is_map":true,"pinyin":"zizhong"},{"id":1028,"name":"中江","abbr":"ZJ","area_code":"200574","sort":2000,"latitude":31.033039,"longitude":104.678719,"is_map":true,"pinyin":"zhongjiang"},{"id":1066,"name":"镇雄","abbr":"ZX","area_code":"200612","sort":2000,"latitude":27.4415,"longitude":104.873596,"is_map":true,"pinyin":"zhenxiong"},{"id":1067,"name":"沾益","abbr":"ZY","area_code":"200613","sort":2000,"latitude":25.60009,"longitude":103.822258,"is_map":true,"pinyin":"zhanyi"},{"id":1081,"name":"诸暨","abbr":"ZJ","area_code":"200627","sort":2000,"latitude":29.71364,"longitude":120.23632,"is_map":true,"pinyin":"zhuji"},{"id":1128,"name":"忠县","abbr":"ZX","area_code":"200674","sort":2000,"latitude":30.300261,"longitude":108.037666,"is_map":true,"pinyin":"zhongxian"},{"id":1142,"name":"樟木头","abbr":"ZMT","area_code":"441900000","sort":2000,"latitude":23.020691,"longitude":113.751808,"is_map":false,"pinyin":"zhangmutou"},{"id":357,"name":"张家港","abbr":"ZJG","area_code":"05123","sort":9999,"latitude":31.875469,"longitude":120.555496,"is_map":true,"pinyin":"zhangjiagang"},{"id":370,"name":"涿州","abbr":"ZZ","area_code":"03121","sort":9999,"latitude":39.485291,"longitude":115.974388,"is_map":true,"pinyin":"zhuozhou"},{"id":379,"name":"遵义","abbr":"ZY","area_code":"0852","sort":9999,"latitude":28.17544,"longitude":107.816093,"is_map":true,"pinyin":"zunyi"},{"id":380,"name":"遵化","abbr":"ZH","area_code":"03151","sort":9999,"latitude":40.18924,"longitude":117.965668,"is_map":true,"pinyin":"zunhua"},{"id":1144,"name":"中卫","abbr":"ZW","area_code":"640500","sort":9999,"latitude":37.500259,"longitude":105.196762,"is_map":true,"pinyin":"zhongwei"},{"id":1145,"name":"政和","abbr":"ZH","area_code":"350725","sort":9999,"latitude":27.366091,"longitude":118.857536,"is_map":true,"pinyin":"zhenghe"},{"id":1152,"name":"柘荣","abbr":"ZR","area_code":"350926","sort":9999,"latitude":27.23513,"longitude":119.900848,"is_map":true,"pinyin":"zherong"},{"id":1162,"name":"正阳","abbr":"ZY","area_code":"411724","sort":9999,"latitude":32.605659,"longitude":114.392738,"is_map":true,"pinyin":"zhengyang"},{"id":1218,"name":"张北","abbr":"ZB","area_code":"130722","sort":9999,"latitude":41.151714,"longitude":114.71595,"is_map":true,"pinyin":"zhangbei"},{"id":1227,"name":"涿鹿","abbr":"ZL","area_code":"130731","sort":9999,"latitude":40.3787,"longitude":115.219246,"is_map":true,"pinyin":"zhuolu"},{"id":1248,"name":"枣强","abbr":"ZQ","area_code":"131121","sort":9999,"latitude":37.511513,"longitude":115.726501,"is_map":true,"pinyin":"zaoqiang"},{"id":1278,"name":"长子","abbr":"ZZ","area_code":"140428","sort":9999,"latitude":36.119484,"longitude":112.884659,"is_map":true,"pinyin":"zhangzi"},{"id":1364,"name":"扎鲁特旗","abbr":"ZLTQ","area_code":"150526","sort":9999,"latitude":44.555294,"longitude":120.905273,"is_map":true,"pinyin":"zhaluteqi"},{"id":1378,"name":"扎兰屯","abbr":"ZLT","area_code":"150783","sort":9999,"latitude":48.007412,"longitude":122.7444,"is_map":true,"pinyin":"zhalantun"},{"id":1387,"name":"卓资","abbr":"ZZ","area_code":"150921","sort":9999,"latitude":40.89576,"longitude":112.577705,"is_map":true,"pinyin":"zhuozi"},{"id":1401,"name":"扎赉特旗","abbr":"ZLTQ","area_code":"152223","sort":9999,"latitude":46.725136,"longitude":122.909332,"is_map":true,"pinyin":"zhalaiteqi"},{"id":1412,"name":"正镶白旗","abbr":"ZXBQ","area_code":"152529","sort":9999,"latitude":42.307152,"longitude":115.005943,"is_map":true,"pinyin":"zhengxiangbaiqi"},{"id":1413,"name":"正蓝旗","abbr":"ZLQ","area_code":"152530","sort":9999,"latitude":42.245895,"longitude":116.003311,"is_map":true,"pinyin":"zhenglanqi"},{"id":1434,"name":"彰武","abbr":"ZW","area_code":"210922","sort":9999,"latitude":42.384823,"longitude":122.537445,"is_map":true,"pinyin":"zhangwu"},{"id":1458,"name":"镇赉","abbr":"ZL","area_code":"220821","sort":9999,"latitude":45.846088,"longitude":123.202248,"is_map":true,"pinyin":"zhenlai"},{"id":1486,"name":"肇州","abbr":"ZZ","area_code":"230621","sort":9999,"latitude":45.708687,"longitude":125.273254,"is_map":true,"pinyin":"zhaozhou"},{"id":1487,"name":"肇源","abbr":"ZY","area_code":"230622","sort":9999,"latitude":45.518833,"longitude":125.08197,"is_map":true,"pinyin":"zhaoyuan"},{"id":1553,"name":"赞皇","abbr":"ZH","area_code":"130129","sort":9999,"latitude":37.660198,"longitude":114.387756,"is_map":true,"pinyin":"zanhuang"},{"id":1568,"name":"漳平","abbr":"ZP","area_code":"350881","sort":9999,"latitude":25.291597,"longitude":117.420731,"is_map":true,"pinyin":"zhangping"},{"id":1571,"name":"周宁","abbr":"ZN","area_code":"350925","sort":9999,"latitude":27.103106,"longitude":119.338242,"is_map":true,"pinyin":"zhouning"},{"id":1615,"name":"资溪","abbr":"ZX","area_code":"361028","sort":9999,"latitude":27.70653,"longitude":117.066093,"is_map":true,"pinyin":"zixi"},{"id":1700,"name":"株洲县","abbr":"ZZX","area_code":"430221","sort":9999,"latitude":27.705845,"longitude":113.146179,"is_map":true,"pinyin":"zhuzhou"},{"id":1785,"name":"资源","abbr":"ZY","area_code":"450329","sort":9999,"latitude":26.034201,"longitude":110.642586,"is_map":true,"pinyin":"ziyuan"},{"id":1814,"name":"昭平","abbr":"ZP","area_code":"451121","sort":9999,"latitude":24.172958,"longitude":110.810867,"is_map":true,"pinyin":"zhaoping"},{"id":1815,"name":"钟山","abbr":"ZS","area_code":"451122","sort":9999,"latitude":24.528566,"longitude":111.303627,"is_map":true,"pinyin":"zhongshan"},{"id":1963,"name":"正安","abbr":"ZA","area_code":"520324","sort":9999,"latitude":28.550337,"longitude":107.441872,"is_map":true,"pinyin":"zhengan"},{"id":1973,"name":"镇宁布依族苗族自治县","abbr":"ZNBYZMZZZX","area_code":"520423","sort":9999,"latitude":26.056095,"longitude":105.768654,"is_map":true,"pinyin":"zhenningbuyizumiaozuzizhixian"},{"id":1975,"name":"紫云苗族布依族自治县","abbr":"ZYMZBYZZZX","area_code":"520425","sort":9999,"latitude":25.751568,"longitude":106.084518,"is_map":true,"pinyin":"ziyunmiaozubuyizuzizhixian"},{"id":1990,"name":"贞丰","abbr":"ZF","area_code":"522325","sort":9999,"latitude":25.385752,"longitude":105.650131,"is_map":true,"pinyin":"zhenfeng"},{"id":1998,"name":"镇远","abbr":"ZY","area_code":"522625","sort":9999,"latitude":27.050234,"longitude":108.423653,"is_map":true,"pinyin":"zhenyuan"},{"id":2058,"name":"镇沅彝族哈尼族拉祜族自治县","abbr":"ZYYZHNZLHZZZX","area_code":"530825","sort":9999,"latitude":24.005713,"longitude":101.108513,"is_map":true,"pinyin":"zhenyuanyizuhanizulahuzuzizhixian"},{"id":2067,"name":"镇康","abbr":"ZK","area_code":"530924","sort":9999,"latitude":23.88583,"longitude":99.024818,"is_map":true,"pinyin":"zhenkang"},{"id":2242,"name":"志丹","abbr":"ZD","area_code":"610625","sort":9999,"latitude":36.823032,"longitude":108.768898,"is_map":true,"pinyin":"zhidan"},{"id":2282,"name":"镇安","abbr":"ZA","area_code":"611025","sort":9999,"latitude":33.423981,"longitude":109.151077,"is_map":true,"pinyin":"zhenan"},{"id":2283,"name":"柞水","abbr":"ZS","area_code":"611026","sort":9999,"latitude":33.682774,"longitude":109.111252,"is_map":true,"pinyin":"zuoshui"},{"id":2415,"name":"中宁县","abbr":"ZNX","area_code":"640521","sort":9999,"latitude":37.489735,"longitude":105.675781,"is_map":true,"pinyin":"zhongning"}],"B":[{"id":3,"name":"北京","abbr":"BJ","area_code":"010","sort":2000,"latitude":39.90469,"longitude":116.407173,"is_map":true,"pinyin":"beijing"},{"id":68,"name":"包头","abbr":"BT","area_code":"0472","sort":2000,"latitude":40.65781,"longitude":109.84021,"is_map":true,"pinyin":"baotou"},{"id":75,"name":"蚌埠","abbr":"BB","area_code":"0552","sort":2000,"latitude":32.915482,"longitude":117.38932,"is_map":true,"pinyin":"bengbu"},{"id":95,"name":"保定","abbr":"BD","area_code":"0312","sort":2000,"latitude":38.873959,"longitude":115.464592,"is_map":true,"pinyin":"baoding"},{"id":134,"name":"滨州","abbr":"BZ","area_code":"0543","sort":2000,"latitude":37.382111,"longitude":117.972794,"is_map":true,"pinyin":"binzhou"},{"id":136,"name":"毕节","abbr":"BJ","area_code":"0857","sort":2000,"latitude":27.29847,"longitude":105.305038,"is_map":true,"pinyin":"bijie"},{"id":156,"name":"百色","abbr":"BS","area_code":"0776","sort":2000,"latitude":23.902161,"longitude":106.618378,"is_map":true,"pinyin":"baise"},{"id":223,"name":"白城","abbr":"BC","area_code":"0436","sort":2000,"latitude":45.619598,"longitude":122.838707,"is_map":true,"pinyin":"baicheng"},{"id":244,"name":"宝鸡","abbr":"BJ","area_code":"0917","sort":2000,"latitude":34.361938,"longitude":107.23732,"is_map":true,"pinyin":"baoji"},{"id":264,"name":"保山","abbr":"BS","area_code":"0875","sort":2000,"latitude":25.112049,"longitude":99.161812,"is_map":true,"pinyin":"baoshan"},{"id":290,"name":"北海","abbr":"BH","area_code":"0779","sort":2000,"latitude":21.481119,"longitude":109.120079,"is_map":true,"pinyin":"beihai"},{"id":313,"name":"亳州","abbr":"BZ","area_code":"05581","sort":2000,"latitude":33.844608,"longitude":115.779312,"is_map":true,"pinyin":"bozhou"},{"id":317,"name":"巴中","abbr":"BZ","area_code":"0827","sort":2000,"latitude":31.867149,"longitude":106.74733,"is_map":true,"pinyin":"bazhong"},{"id":336,"name":"本溪","abbr":"BX","area_code":"0414","sort":2000,"latitude":41.294128,"longitude":123.766861,"is_map":true,"pinyin":"benxi"},{"id":397,"name":"白山","abbr":"BS","area_code":"0439","sort":2000,"latitude":41.9408,"longitude":126.424431,"is_map":true,"pinyin":"baishan"},{"id":422,"name":"巴南","abbr":"BN","area_code":"10000","sort":2000,"latitude":29.402679,"longitude":106.540413,"is_map":true,"pinyin":"banan"},{"id":423,"name":"北碚","abbr":"BB","area_code":"10001","sort":2000,"latitude":29.80583,"longitude":106.396278,"is_map":true,"pinyin":"beibei"},{"id":425,"name":"璧山","abbr":"BS","area_code":"10003","sort":2000,"latitude":29.59202,"longitude":106.227417,"is_map":true,"pinyin":"bishan"},{"id":522,"name":"白银","abbr":"BY","area_code":"200068","sort":2000,"latitude":36.544701,"longitude":104.137733,"is_map":true,"pinyin":"baiyin"},{"id":534,"name":"博罗","abbr":"BL","area_code":"200080","sort":2000,"latitude":23.173149,"longitude":114.289726,"is_map":true,"pinyin":"boluo"},{"id":566,"name":"北流","abbr":"BL","area_code":"200112","sort":2000,"latitude":22.70837,"longitude":110.354263,"is_map":true,"pinyin":"beiliu"},{"id":596,"name":"霸州","abbr":"BZ","area_code":"200142","sort":2000,"latitude":39.12709,"longitude":116.391342,"is_map":true,"pinyin":"bazhou"},{"id":652,"name":"泌阳","abbr":"BY","area_code":"200198","sort":2000,"latitude":32.724098,"longitude":113.327087,"is_map":true,"pinyin":"biyang"},{"id":684,"name":"博爱","abbr":"BA","area_code":"200230","sort":2000,"latitude":35.17123,"longitude":113.064529,"is_map":true,"pinyin":"boai"},{"id":690,"name":"宝丰","abbr":"BF","area_code":"200236","sort":2000,"latitude":33.868401,"longitude":113.054787,"is_map":true,"pinyin":"baofeng"},{"id":705,"name":"北安","abbr":"BA","area_code":"200251","sort":2000,"latitude":48.241459,"longitude":126.491081,"is_map":true,"pinyin":"beian"},{"id":839,"name":"滨海","abbr":"BH","area_code":"200385","sort":2000,"latitude":33.98975,"longitude":119.820641,"is_map":true,"pinyin":"binhai"},{"id":856,"name":"宝应","abbr":"BY","area_code":"200402","sort":2000,"latitude":33.241421,"longitude":119.358414,"is_map":true,"pinyin":"baoying"},{"id":914,"name":"巴彦淖尔","abbr":"BYNE","area_code":"200460","sort":2000,"latitude":40.743172,"longitude":107.387733,"is_map":true,"pinyin":"bayannaoer"},{"id":970,"name":"博兴","abbr":"BX","area_code":"200516","sort":2000,"latitude":37.152988,"longitude":118.110962,"is_map":true,"pinyin":"boxing"},{"id":367,"name":"泊头","abbr":"BT","area_code":"03174","sort":9999,"latitude":38.083641,"longitude":116.578278,"is_map":true,"pinyin":"botou"},{"id":1157,"name":"宾县","abbr":"BX","area_code":"230125","sort":9999,"latitude":45.75864,"longitude":127.485863,"is_map":true,"pinyin":"binxian"},{"id":1193,"name":"柏乡","abbr":"BX","area_code":"130524","sort":9999,"latitude":37.483597,"longitude":114.693382,"is_map":true,"pinyin":"baixiang"},{"id":1214,"name":"博野","abbr":"BY","area_code":"130637","sort":9999,"latitude":38.458271,"longitude":115.4618,"is_map":true,"pinyin":"boye"},{"id":1351,"name":"巴林左旗","abbr":"BLZQ","area_code":"150422","sort":9999,"latitude":43.980717,"longitude":119.391739,"is_map":true,"pinyin":"balinzuoqi"},{"id":1352,"name":"巴林右旗","abbr":"BLYQ","area_code":"150423","sort":9999,"latitude":43.528961,"longitude":118.678345,"is_map":true,"pinyin":"balinyouqi"},{"id":1427,"name":"本溪满族自治县","abbr":"BXMZZZX","area_code":"210521","sort":9999,"latitude":41.300343,"longitude":124.12616,"is_map":true,"pinyin":"benximanzuzizhixian"},{"id":1432,"name":"北镇","abbr":"BZ","area_code":"210782","sort":9999,"latitude":41.598763,"longitude":121.795959,"is_map":true,"pinyin":"beizhen"},{"id":1443,"name":"北票","abbr":"BP","area_code":"211381","sort":9999,"latitude":41.803288,"longitude":120.766953,"is_map":true,"pinyin":"beipiao"},{"id":1466,"name":"巴彦","abbr":"BY","area_code":"230126","sort":9999,"latitude":46.08189,"longitude":127.403603,"is_map":true,"pinyin":"bayan"},{"id":1476,"name":"拜泉","abbr":"BQ","area_code":"230231","sort":9999,"latitude":47.607365,"longitude":126.091911,"is_map":true,"pinyin":"baiquan"},{"id":1484,"name":"宝清","abbr":"BQ","area_code":"230522","sort":9999,"latitude":46.328781,"longitude":132.206421,"is_map":true,"pinyin":"baoqing"},{"id":1496,"name":"勃利","abbr":"BL","area_code":"230921","sort":9999,"latitude":45.751572,"longitude":130.575027,"is_map":true,"pinyin":"boli"},{"id":1770,"name":"宾阳","abbr":"BY","area_code":"450126","sort":9999,"latitude":23.216885,"longitude":108.816734,"is_map":true,"pinyin":"binyang"},{"id":1801,"name":"博白","abbr":"BB","area_code":"450923","sort":9999,"latitude":22.271284,"longitude":109.980003,"is_map":true,"pinyin":"bobai"},{"id":1824,"name":"巴马瑶族自治县","abbr":"BMYZZZX","area_code":"451227","sort":9999,"latitude":24.139538,"longitude":107.253128,"is_map":true,"pinyin":"bamayaozuzizhixian"},{"id":1845,"name":"白沙黎族自治县","abbr":"BSLZZZX","area_code":"469025","sort":9999,"latitude":19.360565,"longitude":109.122688,"is_map":true,"pinyin":"baishalizuzizhixian"},{"id":1848,"name":"保亭黎族苗族自治县","abbr":"BTLZMZZZX","area_code":"469029","sort":9999,"latitude":18.636372,"longitude":109.702454,"is_map":true,"pinyin":"baotinglizumiaozuzizhixian"},{"id":2102,"name":"宾川","abbr":"BC","area_code":"532924","sort":9999,"latitude":25.829161,"longitude":100.584801,"is_map":true,"pinyin":"binchuan"},{"id":2234,"name":"白水","abbr":"BS","area_code":"610527","sort":9999,"latitude":35.177292,"longitude":109.594307,"is_map":true,"pinyin":"baishui"},{"id":2383,"name":"班玛县","abbr":"BMX","area_code":"632622","sort":9999,"latitude":32.931587,"longitude":100.737953,"is_map":true,"pinyin":"banma"},{"id":5026,"name":"宝坻区","abbr":"BCQ","area_code":"120115","sort":9999,"latitude":39.716965,"longitude":117.30809,"is_map":true,"pinyin":"baochiqu"},{"id":5145,"name":"鲅鱼圈区","abbr":"BYQQ","area_code":"210804","sort":9999,"latitude":40.263645,"longitude":122.127243,"is_map":true,"pinyin":"bayuquanqu"}],"D":[{"id":20,"name":"大连","abbr":"DL","area_code":"0411","sort":2000,"latitude":38.913689,"longitude":121.614761,"is_map":true,"pinyin":"dalian"},{"id":51,"name":"东莞","abbr":"DG","area_code":"0769","sort":2000,"latitude":23.020691,"longitude":113.751808,"is_map":true,"pinyin":"dongguan"},{"id":86,"name":"大庆","abbr":"DQ","area_code":"0459","sort":2000,"latitude":46.587582,"longitude":125.103073,"is_map":true,"pinyin":"daqing"},{"id":131,"name":"德阳","abbr":"DY","area_code":"0838","sort":2000,"latitude":31.126789,"longitude":104.397903,"is_map":true,"pinyin":"deyang"},{"id":132,"name":"东营","abbr":"DY","area_code":"0546","sort":2000,"latitude":37.433651,"longitude":118.67466,"is_map":true,"pinyin":"dongying"},{"id":145,"name":"丹东","abbr":"DD","area_code":"0415","sort":2000,"latitude":39.999802,"longitude":124.35601,"is_map":true,"pinyin":"dandong"},{"id":169,"name":"大同","abbr":"DT","area_code":"0352","sort":2000,"latitude":40.07637,"longitude":113.300011,"is_map":true,"pinyin":"datong"},{"id":174,"name":"大理","abbr":"DL","area_code":"0872","sort":2000,"latitude":25.591579,"longitude":100.229759,"is_map":true,"pinyin":"dali"},{"id":224,"name":"德州","abbr":"DZ","area_code":"0534","sort":2000,"latitude":37.435501,"longitude":116.359268,"is_map":true,"pinyin":"dezhou"},{"id":247,"name":"达州","abbr":"DZ","area_code":"0818","sort":2000,"latitude":31.208639,"longitude":107.467911,"is_map":true,"pinyin":"dazhou"},{"id":286,"name":"儋州","abbr":"DZ","area_code":"4600003","sort":2000,"latitude":19.520929,"longitude":109.580688,"is_map":true,"pinyin":"danzhou"},{"id":426,"name":"大渡口","abbr":"DDK","area_code":"10004","sort":2000,"latitude":29.484079,"longitude":106.482246,"is_map":true,"pinyin":"dadukou"},{"id":427,"name":"大足","abbr":"DZ","area_code":"10005","sort":2000,"latitude":29.48604,"longitude":105.780167,"is_map":true,"pinyin":"dazu"},{"id":428,"name":"都江堰","abbr":"DJY","area_code":"10006","sort":2000,"latitude":30.988371,"longitude":103.646622,"is_map":true,"pinyin":"doujiangyan"},{"id":464,"name":"当涂","abbr":"DT","area_code":"200010","sort":2000,"latitude":31.569901,"longitude":118.497803,"is_map":true,"pinyin":"dangtu"},{"id":465,"name":"砀山","abbr":"DS","area_code":"200011","sort":2000,"latitude":34.440971,"longitude":116.366058,"is_map":true,"pinyin":"dangshan"},{"id":479,"name":"定远","abbr":"DY","area_code":"200025","sort":2000,"latitude":32.52998,"longitude":117.698563,"is_map":true,"pinyin":"dingyuan"},{"id":484,"name":"东至","abbr":"DZ","area_code":"200030","sort":2000,"latitude":30.09663,"longitude":117.027657,"is_map":true,"pinyin":"dongzhi"},{"id":511,"name":"德化","abbr":"DH","area_code":"200057","sort":2000,"latitude":25.4916,"longitude":118.240982,"is_map":true,"pinyin":"dehua"},{"id":518,"name":"大田","abbr":"DT","area_code":"200064","sort":2000,"latitude":25.69261,"longitude":117.84713,"is_map":true,"pinyin":"datian"},{"id":545,"name":"电白","abbr":"DB","area_code":"200091","sort":2000,"latitude":21.514139,"longitude":111.013557,"is_map":true,"pinyin":"dianbai"},{"id":575,"name":"大方","abbr":"DF","area_code":"200121","sort":2000,"latitude":27.141609,"longitude":105.612999,"is_map":true,"pinyin":"dafang"},{"id":576,"name":"都匀","abbr":"DY","area_code":"200122","sort":2000,"latitude":26.25979,"longitude":107.518669,"is_map":true,"pinyin":"duyun"},{"id":583,"name":"东方","abbr":"DF","area_code":"200129","sort":2000,"latitude":19.09614,"longitude":108.653671,"is_map":true,"pinyin":"dongfang"},{"id":586,"name":"定安","abbr":"DA","area_code":"200132","sort":2000,"latitude":19.68121,"longitude":110.359299,"is_map":true,"pinyin":"dingan"},{"id":587,"name":"定州","abbr":"DZ","area_code":"200133","sort":2000,"latitude":38.516258,"longitude":114.99025,"is_map":true,"pinyin":"dingzhou"},{"id":595,"name":"大名","abbr":"DM","area_code":"200141","sort":2000,"latitude":36.28558,"longitude":115.147881,"is_map":true,"pinyin":"daming"},{"id":618,"name":"大城","abbr":"DC","area_code":"200164","sort":2000,"latitude":38.704689,"longitude":116.654228,"is_map":true,"pinyin":"daicheng"},{"id":621,"name":"邓州","abbr":"DZ","area_code":"200167","sort":2000,"latitude":32.687771,"longitude":112.087357,"is_map":true,"pinyin":"dengzhou"},{"id":630,"name":"登封","abbr":"DF","area_code":"200176","sort":2000,"latitude":34.45348,"longitude":113.050278,"is_map":true,"pinyin":"dengfeng"},{"id":642,"name":"郸城","abbr":"DC","area_code":"200188","sort":2000,"latitude":33.644749,"longitude":115.17704,"is_map":true,"pinyin":"dancheng"},{"id":712,"name":"大冶","abbr":"DY","area_code":"200258","sort":2000,"latitude":30.09551,"longitude":114.979767,"is_map":true,"pinyin":"daye"},{"id":728,"name":"大悟","abbr":"DW","area_code":"200274","sort":2000,"latitude":31.560961,"longitude":114.126938,"is_map":true,"pinyin":"dawu"},{"id":744,"name":"丹江口","abbr":"DJK","area_code":"200290","sort":2000,"latitude":32.540401,"longitude":111.513222,"is_map":true,"pinyin":"danjiangkou"},{"id":746,"name":"当阳","abbr":"DY","area_code":"200292","sort":2000,"latitude":30.82118,"longitude":111.78833,"is_map":true,"pinyin":"dangyang"},{"id":784,"name":"洞口","abbr":"DK","area_code":"200330","sort":2000,"latitude":27.060381,"longitude":110.575829,"is_map":true,"pinyin":"dongkou"},{"id":789,"name":"东安","abbr":"DA","area_code":"200335","sort":2000,"latitude":26.392059,"longitude":111.316437,"is_map":true,"pinyin":"dongan"},{"id":792,"name":"道县","abbr":"DX","area_code":"200338","sort":2000,"latitude":25.527531,"longitude":111.600067,"is_map":true,"pinyin":"daoxian"},{"id":806,"name":"敦化","abbr":"DH","area_code":"200352","sort":2000,"latitude":43.372711,"longitude":128.232056,"is_map":true,"pinyin":"dunhua"},{"id":813,"name":"大安","abbr":"DA","area_code":"200359","sort":2000,"latitude":45.507111,"longitude":124.292519,"is_map":true,"pinyin":"daan"},{"id":818,"name":"德惠","abbr":"DH","area_code":"200364","sort":2000,"latitude":44.53709,"longitude":125.705582,"is_map":true,"pinyin":"dehui"},{"id":834,"name":"东台","abbr":"DT","area_code":"200380","sort":2000,"latitude":32.866951,"longitude":120.320503,"is_map":true,"pinyin":"dongtai"},{"id":844,"name":"东海","abbr":"DH","area_code":"200390","sort":2000,"latitude":34.54216,"longitude":118.771469,"is_map":true,"pinyin":"donghai"},{"id":855,"name":"大丰","abbr":"DF","area_code":"200401","sort":2000,"latitude":33.201069,"longitude":120.501022,"is_map":true,"pinyin":"dafeng"},{"id":895,"name":"东乡","abbr":"DX","area_code":"200441","sort":2000,"latitude":28.247709,"longitude":116.60334,"is_map":true,"pinyin":"dongxiang"},{"id":896,"name":"都昌","abbr":"DC","area_code":"200442","sort":2000,"latitude":29.273069,"longitude":116.204086,"is_map":true,"pinyin":"duchang"},{"id":901,"name":"大石桥","abbr":"DSQ","area_code":"200447","sort":2000,"latitude":40.644482,"longitude":122.509171,"is_map":true,"pinyin":"dashiqiao"},{"id":902,"name":"东港","abbr":"DG","area_code":"200448","sort":2000,"latitude":39.861721,"longitude":124.152092,"is_map":true,"pinyin":"donggang"},{"id":905,"name":"大洼","abbr":"DW","area_code":"200451","sort":2000,"latitude":41.002468,"longitude":122.082451,"is_map":true,"pinyin":"dawa"},{"id":919,"name":"达拉特","abbr":"DLT","area_code":"200465","sort":2000,"latitude":40.400162,"longitude":110.032928,"is_map":true,"pinyin":"dalate"},{"id":937,"name":"单县","abbr":"DX","area_code":"200483","sort":2000,"latitude":34.79438,"longitude":116.087242,"is_map":true,"pinyin":"danxian"},{"id":966,"name":"东平","abbr":"DP","area_code":"200512","sort":2000,"latitude":35.93708,"longitude":116.470238,"is_map":true,"pinyin":"dongping"},{"id":971,"name":"东明","abbr":"DM","area_code":"200517","sort":2000,"latitude":35.289532,"longitude":115.090157,"is_map":true,"pinyin":"dongming"},{"id":1018,"name":"达县","abbr":"DX","area_code":"200564","sort":2000,"latitude":31.19603,"longitude":107.511772,"is_map":true,"pinyin":"daxian"},{"id":1024,"name":"大竹","abbr":"DZ","area_code":"200570","sort":2000,"latitude":30.736071,"longitude":107.204407,"is_map":true,"pinyin":"dazhu"},{"id":1045,"name":"大邑","abbr":"DY","area_code":"200591","sort":2000,"latitude":30.58757,"longitude":103.520851,"is_map":true,"pinyin":"dayi"},{"id":1083,"name":"东阳","abbr":"DY","area_code":"200629","sort":2000,"latitude":29.289459,"longitude":120.241913,"is_map":true,"pinyin":"dongyang"},{"id":1100,"name":"德清","abbr":"DQ","area_code":"200646","sort":2000,"latitude":30.54269,"longitude":119.977539,"is_map":true,"pinyin":"deqing"},{"id":1116,"name":"岱山","abbr":"DS","area_code":"200662","sort":2000,"latitude":30.24369,"longitude":122.204979,"is_map":true,"pinyin":"daishan"},{"id":1129,"name":"垫江","abbr":"DJ","area_code":"200675","sort":2000,"latitude":30.326799,"longitude":107.335152,"is_map":true,"pinyin":"dianjiang"},{"id":349,"name":"丹阳","abbr":"DY","area_code":"05111","sort":9999,"latitude":32.009449,"longitude":119.606941,"is_map":true,"pinyin":"danyang"},{"id":1143,"name":"定边","abbr":"DB","area_code":"610825","sort":9999,"latitude":37.59454,"longitude":107.60128,"is_map":true,"pinyin":"dingbian"},{"id":1166,"name":"代县","abbr":"DX","area_code":"140923","sort":9999,"latitude":39.066891,"longitude":112.959961,"is_map":true,"pinyin":"daixian"},{"id":1205,"name":"定兴县","abbr":"DXX","area_code":"130626","sort":9999,"latitude":39.266193,"longitude":115.796898,"is_map":true,"pinyin":"dingxing"},{"id":1239,"name":"东光","abbr":"DG","area_code":"130923","sort":9999,"latitude":37.886551,"longitude":116.542061,"is_map":true,"pinyin":"dongguang"},{"id":1247,"name":"大厂回族自治县","abbr":"DCHZZZX","area_code":"131028","sort":9999,"latitude":39.889267,"longitude":116.986504,"is_map":true,"pinyin":"dachanghuizuzizhixian"},{"id":1382,"name":"磴口","abbr":"DK","area_code":"150822","sort":9999,"latitude":40.330479,"longitude":107.006058,"is_map":true,"pinyin":"dengkou"},{"id":1408,"name":"东乌珠穆沁旗","abbr":"DWZMQQ","area_code":"152525","sort":9999,"latitude":45.510307,"longitude":116.980019,"is_map":true,"pinyin":"dongwuzhumuqinqi"},{"id":1436,"name":"灯塔市","abbr":"DT","area_code":"211081","sort":9999,"latitude":41.427837,"longitude":123.325867,"is_map":true,"pinyin":"dengta"},{"id":1447,"name":"东丰","abbr":"DF","area_code":"220421","sort":9999,"latitude":42.675228,"longitude":125.529625,"is_map":true,"pinyin":"dongfeng"},{"id":1448,"name":"东辽","abbr":"DL","area_code":"220422","sort":9999,"latitude":42.927723,"longitude":124.991997,"is_map":true,"pinyin":"dongliao"},{"id":1489,"name":"杜尔伯特蒙古族自治县","abbr":"DEBTMGZZZX","area_code":"230624","sort":9999,"latitude":46.865974,"longitude":124.446259,"is_map":true,"pinyin":"duerbotemengguzuzizhixian"},{"id":1497,"name":"东宁","abbr":"DN","area_code":"231024","sort":9999,"latitude":44.06358,"longitude":131.12529,"is_map":true,"pinyin":"dongning"},{"id":1515,"name":"洞头","abbr":"DT","area_code":"330322","sort":9999,"latitude":27.836058,"longitude":121.156181,"is_map":true,"pinyin":"dongtou"},{"id":1558,"name":"东山","abbr":"DS","area_code":"350626","sort":9999,"latitude":23.702845,"longitude":117.427681,"is_map":true,"pinyin":"dongshan"},{"id":1578,"name":"德安","abbr":"DA","area_code":"360426","sort":9999,"latitude":29.327475,"longitude":115.762611,"is_map":true,"pinyin":"dean"},{"id":1586,"name":"大余","abbr":"DY","area_code":"360723","sort":9999,"latitude":25.395937,"longitude":114.362244,"is_map":true,"pinyin":"dayu"},{"id":1590,"name":"定南","abbr":"DN","area_code":"360728","sort":9999,"latitude":24.774277,"longitude":115.032669,"is_map":true,"pinyin":"dingnan"},{"id":1622,"name":"德兴","abbr":"DX","area_code":"361181","sort":9999,"latitude":28.945034,"longitude":117.578735,"is_map":true,"pinyin":"dexing"},{"id":1637,"name":"东阿","abbr":"DE","area_code":"371524","sort":9999,"latitude":36.336002,"longitude":116.248856,"is_map":true,"pinyin":"donge"},{"id":1639,"name":"定陶","abbr":"DT","area_code":"371727","sort":9999,"latitude":35.072701,"longitude":115.569603,"is_map":true,"pinyin":"dingtao"},{"id":1747,"name":"大埔","abbr":"DP","area_code":"441422","sort":9999,"latitude":24.351587,"longitude":116.695518,"is_map":true,"pinyin":"dapu"},{"id":1755,"name":"东源","abbr":"DY","area_code":"441625","sort":9999,"latitude":23.789093,"longitude":114.742714,"is_map":true,"pinyin":"dongyuan"},{"id":1796,"name":"东兴","abbr":"DX","area_code":"450681","sort":9999,"latitude":21.541172,"longitude":107.970169,"is_map":true,"pinyin":"dongxing"},{"id":1806,"name":"德保","abbr":"DB","area_code":"451024","sort":9999,"latitude":23.321465,"longitude":106.618164,"is_map":true,"pinyin":"debao"},{"id":1821,"name":"东兰","abbr":"DL","area_code":"451224","sort":9999,"latitude":24.509367,"longitude":107.373695,"is_map":true,"pinyin":"donglan"},{"id":1825,"name":"都安瑶族自治县","abbr":"DAYZZZX","area_code":"451228","sort":9999,"latitude":23.934963,"longitude":108.10276,"is_map":true,"pinyin":"duanyaozuzizhixian"},{"id":1826,"name":"大化瑶族自治县","abbr":"DHYZZZX","area_code":"451229","sort":9999,"latitude":23.739595,"longitude":107.994499,"is_map":true,"pinyin":"dahuayaozuzizhixian"},{"id":1836,"name":"大新","abbr":"DX","area_code":"451424","sort":9999,"latitude":22.833368,"longitude":107.200806,"is_map":true,"pinyin":"daxin"},{"id":1964,"name":"道真仡佬族苗族自治县","abbr":"DZGLZMZZZX","area_code":"520325","sort":9999,"latitude":28.880089,"longitude":107.605339,"is_map":true,"pinyin":"daozhengelaozumiaozuzizhixian"},{"id":1983,"name":"德江","abbr":"DJ","area_code":"520626","sort":9999,"latitude":28.260941,"longitude":108.117317,"is_map":true,"pinyin":"dejiang"},{"id":2009,"name":"丹寨","abbr":"DZ","area_code":"522636","sort":9999,"latitude":26.19875,"longitude":107.792107,"is_map":true,"pinyin":"danzhai"},{"id":2015,"name":"独山","abbr":"DS","area_code":"522726","sort":9999,"latitude":25.826283,"longitude":107.542755,"is_map":true,"pinyin":"dushan"},{"id":2044,"name":"大关","abbr":"DG","area_code":"530624","sort":9999,"latitude":27.747114,"longitude":103.891609,"is_map":true,"pinyin":"daguan"},{"id":2076,"name":"大姚","abbr":"DY","area_code":"532326","sort":9999,"latitude":25.722347,"longitude":101.323601,"is_map":true,"pinyin":"dayao"},{"id":2111,"name":"德宏傣族景颇族自治州","abbr":"DHDZJPZZZZ","area_code":"533100","sort":9999,"latitude":24.436693,"longitude":98.578362,"is_map":true,"pinyin":"dehongdaizujingpozuzizhizhou"},{"id":2122,"name":"迪庆藏族自治州","abbr":"DQZZZZZ","area_code":"533400","sort":9999,"latitude":27.826853,"longitude":99.706467,"is_map":true,"pinyin":"diqingzangzuzizhizhou"},{"id":2124,"name":"德钦","abbr":"DQ","area_code":"533422","sort":9999,"latitude":28.483273,"longitude":98.915062,"is_map":true,"pinyin":"deqin"},{"id":2230,"name":"大荔","abbr":"DL","area_code":"610523","sort":9999,"latitude":34.79501,"longitude":109.943123,"is_map":true,"pinyin":"dali"},{"id":2279,"name":"丹凤","abbr":"DF","area_code":"611022","sort":9999,"latitude":33.69471,"longitude":110.331909,"is_map":true,"pinyin":"danfeng"},{"id":2315,"name":"敦煌","abbr":"DH","area_code":"620982","sort":9999,"latitude":40.141117,"longitude":94.664276,"is_map":true,"pinyin":"dunhuang"},{"id":2323,"name":"定西","abbr":"DX","area_code":"621100","sort":9999,"latitude":35.579578,"longitude":104.626297,"is_map":true,"pinyin":"dingxi"},{"id":2385,"name":"达日县","abbr":"DRX","area_code":"632624","sort":9999,"latitude":33.753258,"longitude":99.651718,"is_map":true,"pinyin":"dari"},{"id":2396,"name":"德令哈","abbr":"DLH","area_code":"632802","sort":9999,"latitude":37.374554,"longitude":97.37014,"is_map":true,"pinyin":"delingha"}],"K":[{"id":23,"name":"昆明","abbr":"KM","area_code":"0871","sort":2000,"latitude":24.87966,"longitude":102.833221,"is_map":true,"pinyin":"kunming"},{"id":140,"name":"凯里","abbr":"KL","area_code":"0855","sort":2000,"latitude":26.56756,"longitude":107.9804,"is_map":true,"pinyin":"kaili"},{"id":183,"name":"开封","abbr":"KF","area_code":"410203","sort":2000,"latitude":34.79726,"longitude":114.307312,"is_map":true,"pinyin":"kaifeng"},{"id":326,"name":"库尔勒","abbr":"KEL","area_code":"0996","sort":2000,"latitude":41.726429,"longitude":86.173691,"is_map":true,"pinyin":"kuerle"},{"id":439,"name":"开县","abbr":"KX","area_code":"10017","sort":2000,"latitude":31.16098,"longitude":108.393112,"is_map":true,"pinyin":"kaixian"},{"id":547,"name":"开平","abbr":"KP","area_code":"200093","sort":2000,"latitude":22.376381,"longitude":112.698509,"is_map":true,"pinyin":"kaiping"},{"id":903,"name":"开原","abbr":"KY","area_code":"200449","sort":2000,"latitude":42.546452,"longitude":124.0382,"is_map":true,"pinyin":"kaiyuan"},{"id":1053,"name":"克拉玛依","abbr":"KLMY","area_code":"200599","sort":2000,"latitude":44.67762,"longitude":84.76297,"is_map":true,"pinyin":"kelamayi"},{"id":1055,"name":"喀什","abbr":"KS","area_code":"200601","sort":2000,"latitude":39.46772,"longitude":75.993813,"is_map":true,"pinyin":"kashi"},{"id":1058,"name":"库车","abbr":"KC","area_code":"200604","sort":2000,"latitude":41.717411,"longitude":82.96212,"is_map":true,"pinyin":"kuche"},{"id":1070,"name":"开远","abbr":"KY","area_code":"200616","sort":2000,"latitude":23.71434,"longitude":103.266762,"is_map":true,"pinyin":"kaiyuan"},{"id":358,"name":"昆山","abbr":"KS","area_code":"05122","sort":9999,"latitude":31.38475,"longitude":120.981812,"is_map":true,"pinyin":"kunshan"},{"id":1219,"name":"康保","abbr":"KB","area_code":"130723","sort":9999,"latitude":41.850044,"longitude":114.615807,"is_map":true,"pinyin":"kangbao"},{"id":1236,"name":"宽城满族自治县","abbr":"KCMZZZX","area_code":"130827","sort":9999,"latitude":40.607983,"longitude":118.48864,"is_map":true,"pinyin":"kuanchengmanzuzizhixian"},{"id":1354,"name":"克什克腾旗","abbr":"KSKTQ","area_code":"150425","sort":9999,"latitude":43.256233,"longitude":117.542465,"is_map":true,"pinyin":"keshiketengqi"},{"id":1356,"name":"喀喇沁旗","abbr":"KLQQ","area_code":"150428","sort":9999,"latitude":41.92778,"longitude":118.708572,"is_map":true,"pinyin":"kalaqinqi"},{"id":1359,"name":"科尔沁左翼中旗","abbr":"KEQZYZQ","area_code":"150521","sort":9999,"latitude":44.127167,"longitude":123.313873,"is_map":true,"pinyin":"keerqinzuoyizhongqi"},{"id":1360,"name":"科尔沁左翼后旗","abbr":"KEQZYHQ","area_code":"150522","sort":9999,"latitude":42.954563,"longitude":122.355156,"is_map":true,"pinyin":"keerqinzuoyihouqi"},{"id":1361,"name":"开鲁","abbr":"KL","area_code":"150523","sort":9999,"latitude":43.602432,"longitude":121.3088,"is_map":true,"pinyin":"kailu"},{"id":1362,"name":"库伦旗","abbr":"KLQ","area_code":"150524","sort":9999,"latitude":42.734692,"longitude":121.774887,"is_map":true,"pinyin":"kulunqi"},{"id":1399,"name":"科尔沁右翼前旗","abbr":"KEQYYQQ","area_code":"152221","sort":9999,"latitude":46.076496,"longitude":121.957542,"is_map":true,"pinyin":"keerqinyouyiqianqi"},{"id":1400,"name":"科尔沁右翼中旗","abbr":"KEQYYZQ","area_code":"152222","sort":9999,"latitude":45.059647,"longitude":121.472816,"is_map":true,"pinyin":"keerqinyouyizhongqi"},{"id":1419,"name":"康平","abbr":"KP","area_code":"210123","sort":9999,"latitude":42.741531,"longitude":124.352699,"is_map":true,"pinyin":"kangping"},{"id":1429,"name":"宽甸满族自治县","abbr":"KDMZZZX","area_code":"210624","sort":9999,"latitude":40.730412,"longitude":124.784866,"is_map":true,"pinyin":"kuandianmanzuzizhixian"},{"id":1474,"name":"克山","abbr":"KS","area_code":"230229","sort":9999,"latitude":48.034344,"longitude":125.874352,"is_map":true,"pinyin":"keshan"},{"id":1475,"name":"克东","abbr":"KD","area_code":"230230","sort":9999,"latitude":48.037319,"longitude":126.249092,"is_map":true,"pinyin":"kedong"},{"id":1520,"name":"开化","abbr":"KH","area_code":"330824","sort":9999,"latitude":29.136503,"longitude":118.414436,"is_map":true,"pinyin":"kaihua"},{"id":1627,"name":"垦利县","abbr":"KLX","area_code":"370521","sort":9999,"latitude":37.58868,"longitude":118.551315,"is_map":true,"pinyin":"kenli"},{"id":1955,"name":"开阳","abbr":"KY","area_code":"520121","sort":9999,"latitude":27.056793,"longitude":106.969437,"is_map":true,"pinyin":"kaiyang"},{"id":2481,"name":"奎屯","abbr":"KT","area_code":"654003","sort":9999,"latitude":44.423447,"longitude":84.901604,"is_map":true,"pinyin":"kuitun"}],"M":[{"id":56,"name":"梅州","abbr":"MZ","area_code":"0753","sort":2000,"latitude":24.288441,"longitude":116.122643,"is_map":true,"pinyin":"meizhou"},{"id":82,"name":"绵阳","abbr":"MY","area_code":"0816","sort":2000,"latitude":31.46751,"longitude":104.679604,"is_map":true,"pinyin":"mianyang"},{"id":90,"name":"马鞍山","abbr":"MAS","area_code":"0555","sort":2000,"latitude":31.67067,"longitude":118.506111,"is_map":true,"pinyin":"maanshan"},{"id":123,"name":"茂名","abbr":"MM","area_code":"0668","sort":2000,"latitude":21.66329,"longitude":110.925232,"is_map":true,"pinyin":"maoming"},{"id":138,"name":"牡丹江","abbr":"MDJ","area_code":"0453","sort":2000,"latitude":44.552689,"longitude":129.632446,"is_map":true,"pinyin":"mudanjiang"},{"id":312,"name":"眉山","abbr":"MS","area_code":"0281","sort":2000,"latitude":30.07563,"longitude":103.848511,"is_map":true,"pinyin":"meishan"},{"id":325,"name":"绵竹","abbr":"MZ","area_code":"08381","sort":2000,"latitude":31.337761,"longitude":104.220833,"is_map":true,"pinyin":"mianzhu"},{"id":469,"name":"蒙城","abbr":"MC","area_code":"200015","sort":2000,"latitude":33.265839,"longitude":116.564499,"is_map":true,"pinyin":"mengcheng"},{"id":486,"name":"明光","abbr":"MG","area_code":"200032","sort":2000,"latitude":32.776989,"longitude":117.989441,"is_map":true,"pinyin":"mingguang"},{"id":493,"name":"密云","abbr":"MY","area_code":"200039","sort":2000,"latitude":40.376251,"longitude":116.84317,"is_map":true,"pinyin":"miyun"},{"id":502,"name":"闽侯","abbr":"MH","area_code":"200048","sort":2000,"latitude":26.150209,"longitude":119.131393,"is_map":true,"pinyin":"minhou"},{"id":559,"name":"梅县","abbr":"MX","area_code":"200105","sort":2000,"latitude":24.26539,"longitude":116.082451,"is_map":true,"pinyin":"meixian"},{"id":679,"name":"民权","abbr":"MQ","area_code":"200225","sort":2000,"latitude":34.646912,"longitude":115.147659,"is_map":true,"pinyin":"minquan"},{"id":719,"name":"麻城","abbr":"MC","area_code":"200265","sort":2000,"latitude":31.17333,"longitude":115.00869,"is_map":true,"pinyin":"macheng"},{"id":756,"name":"汨罗","abbr":"ML","area_code":"200302","sort":2000,"latitude":28.806419,"longitude":113.067108,"is_map":true,"pinyin":"miluo"},{"id":807,"name":"梅河口","abbr":"MHK","area_code":"200353","sort":2000,"latitude":42.538731,"longitude":125.712097,"is_map":true,"pinyin":"meihekou"},{"id":917,"name":"满洲里","abbr":"MZL","area_code":"200463","sort":2000,"latitude":49.59655,"longitude":117.378357,"is_map":true,"pinyin":"manzhouli"},{"id":994,"name":"蒙阴","abbr":"MY","area_code":"200540","sort":2000,"latitude":35.710098,"longitude":117.944939,"is_map":true,"pinyin":"mengyin"},{"id":1065,"name":"弥勒","abbr":"ML","area_code":"200611","sort":2000,"latitude":24.410509,"longitude":103.41465,"is_map":true,"pinyin":"mile"},{"id":1135,"name":"漠河","abbr":"MH","area_code":"333333","sort":2000,"latitude":52.972092,"longitude":122.538643,"is_map":true,"pinyin":"mohe"},{"id":377,"name":"蒙自","abbr":"MZ","area_code":"08731","sort":9999,"latitude":23.396219,"longitude":103.364807,"is_map":true,"pinyin":"mengzi"},{"id":1202,"name":"满城县","abbr":"MCX","area_code":"130621","sort":9999,"latitude":38.948921,"longitude":115.322166,"is_map":true,"pinyin":"manchengxian"},{"id":1245,"name":"孟村回族自治县","abbr":"MCHZZZX","area_code":"130930","sort":9999,"latitude":38.057953,"longitude":117.105103,"is_map":true,"pinyin":"mengcunhuizuzizhixian"},{"id":1372,"name":"莫力达瓦达斡尔族自治旗","abbr":"MLDWDWEZZZQ","area_code":"150722","sort":9999,"latitude":48.478386,"longitude":124.507401,"is_map":true,"pinyin":"molidawadawoerzuzizhiqi"},{"id":1467,"name":"木兰","abbr":"ML","area_code":"230127","sort":9999,"latitude":45.949825,"longitude":128.042679,"is_map":true,"pinyin":"mulan"},{"id":1479,"name":"密山","abbr":"MS","area_code":"230382","sort":9999,"latitude":45.5457,"longitude":131.872726,"is_map":true,"pinyin":"mishan"},{"id":1502,"name":"穆棱","abbr":"ML","area_code":"231085","sort":9999,"latitude":44.91967,"longitude":130.527084,"is_map":true,"pinyin":"muleng"},{"id":1509,"name":"明水","abbr":"MS","area_code":"231225","sort":9999,"latitude":47.183529,"longitude":125.907547,"is_map":true,"pinyin":"mingshui"},{"id":1548,"name":"闽清","abbr":"MQ","area_code":"350124","sort":9999,"latitude":26.223793,"longitude":118.868416,"is_map":true,"pinyin":"minqing"},{"id":1551,"name":"明溪","abbr":"MX","area_code":"350421","sort":9999,"latitude":26.357374,"longitude":117.201843,"is_map":true,"pinyin":"mingxi"},{"id":1641,"name":"孟津","abbr":"MJ","area_code":"410322","sort":9999,"latitude":34.826485,"longitude":112.443893,"is_map":true,"pinyin":"mengjin"},{"id":1656,"name":"孟州","abbr":"MZ","area_code":"410883","sort":9999,"latitude":34.90963,"longitude":112.787079,"is_map":true,"pinyin":"mengzhou"},{"id":1663,"name":"渑池","abbr":"MC","area_code":"411221","sort":9999,"latitude":34.763489,"longitude":111.762993,"is_map":true,"pinyin":"mianchi"},{"id":1768,"name":"马山","abbr":"MS","area_code":"450124","sort":9999,"latitude":23.711758,"longitude":108.172905,"is_map":true,"pinyin":"mashan"},{"id":1791,"name":"蒙山","abbr":"MS","area_code":"450423","sort":9999,"latitude":24.199829,"longitude":110.522598,"is_map":true,"pinyin":"mengshan"},{"id":1967,"name":"湄潭","abbr":"MT","area_code":"520328","sort":9999,"latitude":27.765839,"longitude":107.485725,"is_map":true,"pinyin":"meitan"},{"id":2008,"name":"麻江","abbr":"MJ","area_code":"522635","sort":9999,"latitude":26.494802,"longitude":107.59317,"is_map":true,"pinyin":"majiang"},{"id":2028,"name":"马龙","abbr":"ML","area_code":"530321","sort":9999,"latitude":25.429451,"longitude":103.578758,"is_map":true,"pinyin":"malong"},{"id":2055,"name":"墨江哈尼族自治县","abbr":"MJHNZZZX","area_code":"530822","sort":9999,"latitude":23.428165,"longitude":101.687607,"is_map":true,"pinyin":"mojianghanizuzizhixian"},{"id":2060,"name":"孟连傣族拉祜族佤族自治县","abbr":"MLDZLHZWZZZX","area_code":"530827","sort":9999,"latitude":22.325924,"longitude":99.585403,"is_map":true,"pinyin":"mengliandaizulahuzuwazuzizhixian"},{"id":2073,"name":"牟定","abbr":"MD","area_code":"532323","sort":9999,"latitude":25.312111,"longitude":101.543045,"is_map":true,"pinyin":"mouding"},{"id":2092,"name":"麻栗坡","abbr":"MLP","area_code":"532624","sort":9999,"latitude":23.124203,"longitude":104.701897,"is_map":true,"pinyin":"malipo"},{"id":2093,"name":"马关","abbr":"MG","area_code":"532625","sort":9999,"latitude":23.011723,"longitude":104.398621,"is_map":true,"pinyin":"maguan"},{"id":2098,"name":"勐海","abbr":"MH","area_code":"532822","sort":9999,"latitude":21.955866,"longitude":100.448288,"is_map":true,"pinyin":"menghai"},{"id":2099,"name":"勐腊","abbr":"ML","area_code":"532823","sort":9999,"latitude":21.479448,"longitude":101.567055,"is_map":true,"pinyin":"mengla"},{"id":2103,"name":"弥渡","abbr":"MD","area_code":"532925","sort":9999,"latitude":25.342594,"longitude":100.490669,"is_map":true,"pinyin":"midu"},{"id":2113,"name":"芒市","abbr":"MS","area_code":"533103","sort":9999,"latitude":24.436699,"longitude":98.577606,"is_map":true,"pinyin":"mangshi"},{"id":2254,"name":"勉县","abbr":"MX","area_code":"610725","sort":9999,"latitude":33.155617,"longitude":106.680176,"is_map":true,"pinyin":"mianxian"},{"id":2300,"name":"民乐","abbr":"ML","area_code":"620722","sort":9999,"latitude":38.434456,"longitude":100.81662,"is_map":true,"pinyin":"minle"},{"id":2382,"name":"玛沁县","abbr":"MQX","area_code":"632621","sort":9999,"latitude":34.473385,"longitude":100.24353,"is_map":true,"pinyin":"maqin"},{"id":2387,"name":"玛多县","abbr":"MDX","area_code":"632626","sort":9999,"latitude":34.915279,"longitude":98.211342,"is_map":true,"pinyin":"maduo"}],"R":[{"id":58,"name":"日照","abbr":"RZ","area_code":"0633","sort":2000,"latitude":35.416458,"longitude":119.527191,"is_map":true,"pinyin":"rizhao"},{"id":446,"name":"荣昌县","abbr":"RCX","area_code":"10024","sort":2000,"latitude":29.40485,"longitude":105.594437,"is_map":true,"pinyin":"rongchangxian"},{"id":540,"name":"饶平","abbr":"RP","area_code":"200086","sort":2000,"latitude":23.66412,"longitude":117.003899,"is_map":true,"pinyin":"raoping"},{"id":577,"name":"仁怀","abbr":"RH","area_code":"200123","sort":2000,"latitude":27.792339,"longitude":106.401558,"is_map":true,"pinyin":"renhuai"},{"id":629,"name":"汝州","abbr":"RZ","area_code":"200175","sort":2000,"latitude":34.167171,"longitude":112.844368,"is_map":true,"pinyin":"ruzhou"},{"id":665,"name":"汝南","abbr":"RN","area_code":"200211","sort":2000,"latitude":33.006851,"longitude":114.362289,"is_map":true,"pinyin":"runan"},{"id":828,"name":"如皋","abbr":"RG","area_code":"200374","sort":2000,"latitude":32.371601,"longitude":120.573822,"is_map":true,"pinyin":"rugao"},{"id":832,"name":"如东","abbr":"RD","area_code":"200378","sort":2000,"latitude":32.329559,"longitude":121.18502,"is_map":true,"pinyin":"rudong"},{"id":880,"name":"瑞金","abbr":"RJ","area_code":"200426","sort":2000,"latitude":25.88562,"longitude":116.027092,"is_map":true,"pinyin":"ruijin"},{"id":953,"name":"荣成","abbr":"RC","area_code":"200499","sort":2000,"latitude":37.16523,"longitude":122.486282,"is_map":true,"pinyin":"rongcheng"},{"id":972,"name":"乳山","abbr":"RS","area_code":"200518","sort":2000,"latitude":36.920212,"longitude":121.540199,"is_map":true,"pinyin":"rushan"},{"id":1027,"name":"仁寿","abbr":"RS","area_code":"200573","sort":2000,"latitude":29.99572,"longitude":104.134071,"is_map":true,"pinyin":"renshou"},{"id":1046,"name":"荣县","abbr":"RX","area_code":"200592","sort":2000,"latitude":29.4445,"longitude":104.417664,"is_map":true,"pinyin":"rongxian"},{"id":1076,"name":"瑞安","abbr":"RA","area_code":"200622","sort":2000,"latitude":27.778379,"longitude":120.655182,"is_map":true,"pinyin":"ruian"},{"id":1123,"name":"荣昌","abbr":"RC","area_code":"200669","sort":2000,"latitude":29.40485,"longitude":105.594437,"is_map":true,"pinyin":"rongchang"},{"id":351,"name":"任丘","abbr":"RQ","area_code":"03171","sort":9999,"latitude":38.711639,"longitude":116.099541,"is_map":true,"pinyin":"renqiu"},{"id":1171,"name":"瑞昌","abbr":"RC","area_code":"360481","sort":9999,"latitude":29.67658,"longitude":115.68103,"is_map":true,"pinyin":"ruichang"},{"id":1194,"name":"任县","abbr":"RX","area_code":"130526","sort":9999,"latitude":37.129951,"longitude":114.684471,"is_map":true,"pinyin":"renxian"},{"id":1208,"name":"容城","abbr":"RC","area_code":"130629","sort":9999,"latitude":39.052818,"longitude":115.866249,"is_map":true,"pinyin":"rongcheng"},{"id":1251,"name":"饶阳","abbr":"RY","area_code":"131124","sort":9999,"latitude":38.23267,"longitude":115.726578,"is_map":true,"pinyin":"raoyang"},{"id":1305,"name":"芮城","abbr":"RC","area_code":"140830","sort":9999,"latitude":34.694771,"longitude":110.691139,"is_map":true,"pinyin":"ruicheng"},{"id":1485,"name":"饶河","abbr":"RH","area_code":"230524","sort":9999,"latitude":46.801289,"longitude":134.021164,"is_map":true,"pinyin":"raohe"},{"id":1644,"name":"汝阳","abbr":"RY","area_code":"410326","sort":9999,"latitude":34.153229,"longitude":112.473785,"is_map":true,"pinyin":"ruyang"},{"id":1713,"name":"汝城","abbr":"RC","area_code":"431026","sort":9999,"latitude":25.553759,"longitude":113.685684,"is_map":true,"pinyin":"rucheng"},{"id":1737,"name":"乳源瑶族自治县","abbr":"RYYZZZX","area_code":"440232","sort":9999,"latitude":24.77611,"longitude":113.278419,"is_map":true,"pinyin":"ruyuanyaozuzizhixian"},{"id":1775,"name":"融安","abbr":"RA","area_code":"450224","sort":9999,"latitude":25.214703,"longitude":109.403618,"is_map":true,"pinyin":"rongan"},{"id":1776,"name":"融水苗族自治县","abbr":"RSMZZZX","area_code":"450225","sort":9999,"latitude":25.068811,"longitude":109.252747,"is_map":true,"pinyin":"rongshuimiaozuzizhixian"},{"id":1799,"name":"容县","abbr":"RX","area_code":"450921","sort":9999,"latitude":22.856436,"longitude":110.552467,"is_map":true,"pinyin":"rongxian"},{"id":2005,"name":"榕江","abbr":"RJ","area_code":"522632","sort":9999,"latitude":25.931086,"longitude":108.521027,"is_map":true,"pinyin":"rongjiang"},{"id":2112,"name":"瑞丽","abbr":"RL","area_code":"533102","sort":9999,"latitude":24.010735,"longitude":97.855881,"is_map":true,"pinyin":"ruili"},{"id":2133,"name":"日喀则","abbr":"RKZ","area_code":"540200","sort":9999,"latitude":29.261454,"longitude":88.884346,"is_map":true,"pinyin":"rikaze"}],"A":[{"id":70,"name":"安庆","abbr":"AQ","area_code":"0556","sort":2000,"latitude":30.54294,"longitude":117.063538,"is_map":true,"pinyin":"anqing"},{"id":96,"name":"鞍山","abbr":"AS","area_code":"0412","sort":2000,"latitude":41.107769,"longitude":122.994598,"is_map":true,"pinyin":"anshan"},{"id":216,"name":"澳门","abbr":"AM","area_code":"00853","sort":2000,"latitude":22.186834,"longitude":113.54303,"is_map":true,"pinyin":"aomen"},{"id":257,"name":"安宁","abbr":"AN","area_code":"4401003","sort":2000,"latitude":24.91954,"longitude":102.477997,"is_map":true,"pinyin":"anning"},{"id":261,"name":"安阳","abbr":"AY","area_code":"0372","sort":2000,"latitude":36.09771,"longitude":114.393097,"is_map":true,"pinyin":"anyang"},{"id":272,"name":"安康","abbr":"AK","area_code":"0915","sort":2000,"latitude":32.68486,"longitude":109.02932,"is_map":true,"pinyin":"ankang"},{"id":273,"name":"安顺","abbr":"AS","area_code":"085","sort":2000,"latitude":26.25367,"longitude":105.946198,"is_map":true,"pinyin":"anshun"},{"id":327,"name":"阿拉尔","abbr":"ALE","area_code":"0997","sort":2000,"latitude":40.547981,"longitude":81.28067,"is_map":true,"pinyin":"alaer"},{"id":499,"name":"安溪","abbr":"AX","area_code":"200045","sort":2000,"latitude":25.055441,"longitude":118.186852,"is_map":true,"pinyin":"anxi"},{"id":608,"name":"安新","abbr":"AX","area_code":"200154","sort":2000,"latitude":38.935349,"longitude":115.935638,"is_map":true,"pinyin":"anxin"},{"id":729,"name":"安陆","abbr":"AL","area_code":"200275","sort":2000,"latitude":31.255541,"longitude":113.689133,"is_map":true,"pinyin":"anlu"},{"id":770,"name":"安化","abbr":"AH","area_code":"200316","sort":2000,"latitude":28.374281,"longitude":111.213028,"is_map":true,"pinyin":"anhua"},{"id":796,"name":"安乡","abbr":"AX","area_code":"200342","sort":2000,"latitude":29.411421,"longitude":112.170959,"is_map":true,"pinyin":"anxiang"},{"id":801,"name":"安仁","abbr":"AR","area_code":"200347","sort":2000,"latitude":26.709419,"longitude":113.269478,"is_map":true,"pinyin":"anren"},{"id":963,"name":"安丘","abbr":"AQ","area_code":"200509","sort":2000,"latitude":36.47842,"longitude":119.217842,"is_map":true,"pinyin":"anqiu"},{"id":1032,"name":"安岳","abbr":"AY","area_code":"200578","sort":2000,"latitude":30.09733,"longitude":105.335373,"is_map":true,"pinyin":"anyue"},{"id":1057,"name":"阿克苏","abbr":"AKS","area_code":"200603","sort":2000,"latitude":39.48328,"longitude":81.08432,"is_map":true,"pinyin":"akesu"},{"id":1105,"name":"安吉","abbr":"AJ","area_code":"200651","sort":2000,"latitude":30.638241,"longitude":119.68219,"is_map":true,"pinyin":"anji"},{"id":1169,"name":"阿荣旗","abbr":"ARQ","area_code":"150721","sort":9999,"latitude":48.12582,"longitude":123.459442,"is_map":true,"pinyin":"arongqi"},{"id":1216,"name":"安国","abbr":"AG","area_code":"130683","sort":9999,"latitude":38.421368,"longitude":115.331413,"is_map":true,"pinyin":"anguo"},{"id":1252,"name":"安平","abbr":"AP","area_code":"131125","sort":9999,"latitude":38.233513,"longitude":115.51963,"is_map":true,"pinyin":"anping"},{"id":1350,"name":"阿鲁科尔沁旗","abbr":"ALKEQQ","area_code":"150421","sort":9999,"latitude":43.878769,"longitude":120.094971,"is_map":true,"pinyin":"alukeerqinqi"},{"id":1358,"name":"敖汉旗","abbr":"AHQ","area_code":"150430","sort":9999,"latitude":42.28701,"longitude":119.906487,"is_map":true,"pinyin":"aohanqi"},{"id":1398,"name":"阿尔山","abbr":"AES","area_code":"152202","sort":9999,"latitude":47.176998,"longitude":119.943657,"is_map":true,"pinyin":"aershan"},{"id":1405,"name":"阿巴嘎旗","abbr":"ABGQ","area_code":"152522","sort":9999,"latitude":44.022728,"longitude":114.970619,"is_map":true,"pinyin":"abagaqi"},{"id":1416,"name":"阿拉善左旗","abbr":"ALSZQ","area_code":"152921","sort":9999,"latitude":38.844841,"longitude":105.705528,"is_map":true,"pinyin":"alashanzuoqi"},{"id":1417,"name":"阿拉善右旗","abbr":"ALSYQ","area_code":"152922","sort":9999,"latitude":39.21159,"longitude":101.671982,"is_map":true,"pinyin":"alashanyouqi"},{"id":1463,"name":"安图","abbr":"AT","area_code":"222426","sort":9999,"latitude":43.110992,"longitude":128.901871,"is_map":true,"pinyin":"antu"},{"id":1510,"name":"安达","abbr":"AD","area_code":"231281","sort":9999,"latitude":46.410614,"longitude":125.329926,"is_map":true,"pinyin":"anda"},{"id":1573,"name":"安义","abbr":"AY","area_code":"360123","sort":9999,"latitude":28.841333,"longitude":115.553108,"is_map":true,"pinyin":"anyi"},{"id":1589,"name":"安远","abbr":"AY","area_code":"360726","sort":9999,"latitude":25.13459,"longitude":115.392326,"is_map":true,"pinyin":"anyuan"},{"id":1600,"name":"安福","abbr":"AF","area_code":"360829","sort":9999,"latitude":27.382746,"longitude":114.613838,"is_map":true,"pinyin":"anfu"},{"id":1648,"name":"安阳","abbr":"AY","area_code":"410522","sort":9999,"latitude":36.130585,"longitude":114.130203,"is_map":true,"pinyin":"anyang"},{"id":1905,"name":"阿坝藏族羌族自治州","abbr":"ABZZQZZZZ","area_code":"513200","sort":9999,"latitude":31.899792,"longitude":102.221375,"is_map":true,"pinyin":"abazangzuqiangzuzizhizhou"},{"id":1993,"name":"安龙","abbr":"AL","area_code":"522328","sort":9999,"latitude":25.106426,"longitude":105.469063,"is_map":true,"pinyin":"anlong"},{"id":2241,"name":"安塞","abbr":"AS","area_code":"610624","sort":9999,"latitude":36.86441,"longitude":109.32534,"is_map":true,"pinyin":"ansai"}],"E":[{"id":184,"name":"鄂州","abbr":"EZ","area_code":"0711","sort":2000,"latitude":30.39085,"longitude":114.894951,"is_map":true,"pinyin":"ezhou"},{"id":213,"name":"峨眉山","abbr":"EMS","area_code":"440100","sort":2000,"latitude":29.60125,"longitude":103.484467,"is_map":true,"pinyin":"emeishan"},{"id":229,"name":"恩施","abbr":"ES","area_code":"0718","sort":2000,"latitude":30.29504,"longitude":109.479179,"is_map":true,"pinyin":"enshi"},{"id":395,"name":"鄂尔多斯","abbr":"EEDS","area_code":"0477","sort":2000,"latitude":39.608452,"longitude":109.780869,"is_map":true,"pinyin":"eerduosi"},{"id":555,"name":"恩平","abbr":"EP","area_code":"200101","sort":2000,"latitude":22.18294,"longitude":112.305321,"is_map":true,"pinyin":"enping"},{"id":1366,"name":"鄂托克前旗","abbr":"ETKQQ","area_code":"150623","sort":9999,"latitude":38.183258,"longitude":107.48172,"is_map":true,"pinyin":"etuokeqianqi"},{"id":1367,"name":"鄂托克旗","abbr":"ETKQ","area_code":"150624","sort":9999,"latitude":39.095753,"longitude":107.982605,"is_map":true,"pinyin":"etuokeqi"},{"id":1373,"name":"鄂伦春自治旗","abbr":"ELCZZQ","area_code":"150723","sort":9999,"latitude":50.590176,"longitude":123.725685,"is_map":true,"pinyin":"elunchunzizhiqi"},{"id":1374,"name":"鄂温克族自治旗","abbr":"EWKZZZQ","area_code":"150724","sort":9999,"latitude":49.143291,"longitude":119.754044,"is_map":true,"pinyin":"ewenkezuzizhiqi"},{"id":1379,"name":"额尔古纳","abbr":"EEGN","area_code":"150784","sort":9999,"latitude":50.2439,"longitude":120.178635,"is_map":true,"pinyin":"eerguna"},{"id":1404,"name":"二连浩特","abbr":"ELHT","area_code":"152501","sort":9999,"latitude":43.652897,"longitude":111.979813,"is_map":true,"pinyin":"erlianhaote"},{"id":1418,"name":"额济纳旗","abbr":"EJNQ","area_code":"152923","sort":9999,"latitude":41.958813,"longitude":101.069443,"is_map":true,"pinyin":"ejinaqi"},{"id":2035,"name":"峨山彝族自治县","abbr":"ESYZZZX","area_code":"530426","sort":9999,"latitude":24.173256,"longitude":102.404358,"is_map":true,"pinyin":"eshanyizuzizhixian"},{"id":2108,"name":"洱源","abbr":"EY","area_code":"532930","sort":9999,"latitude":26.111183,"longitude":99.951706,"is_map":true,"pinyin":"eryuan"}],"hotCities":[{"id":1,"name":"上海","abbr":"SH","area_code":"021","sort":1,"latitude":31.23037,"longitude":121.473701,"is_map":true,"pinyin":"shanghai"},{"id":10,"name":"哈尔滨","abbr":"HEB","area_code":"0451","sort":4,"latitude":45.802158,"longitude":126.535797,"is_map":true,"pinyin":"haerbin"},{"id":6,"name":"南京","abbr":"NJ","area_code":"025","sort":5,"latitude":31.84178,"longitude":118.504669,"is_map":true,"pinyin":"nanjing"},{"id":4,"name":"广州","abbr":"GZ","area_code":"020","sort":6,"latitude":23.12908,"longitude":113.264359,"is_map":true,"pinyin":"guangzhou"},{"id":13,"name":"厦门","abbr":"XM","area_code":"0592","sort":7,"latitude":24.479509,"longitude":118.089478,"is_map":true,"pinyin":"xiamen"},{"id":2,"name":"杭州","abbr":"HZ","area_code":"0571","sort":8,"latitude":30.274151,"longitude":120.155151,"is_map":true,"pinyin":"hangzhou"},{"id":5,"name":"天津","abbr":"TJ","area_code":"022","sort":14,"latitude":39.085098,"longitude":117.199371,"is_map":true,"pinyin":"tianjin"},{"id":28,"name":"青岛","abbr":"QD","area_code":"0532","sort":15,"latitude":36.066231,"longitude":120.382988,"is_map":true,"pinyin":"qingdao"}]};

/***/ }),

/***/ 7:
/*!*******************************************************************************************!*\
  !*** /Users/yan/webserver/git/uniapp/uni-app-ele/uni-app-ele/pages.json?{"type":"style"} ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/tabBar/home/home": { "navigationBarTitleText": "首页", "enablePullDownRefresh": true, "usingComponents": { "page-header": "/components/pageheader/pageHeader", "filter-view": "/components/filterView/filterView", "shop-lists": "/components/shopLists/shopLists" }, "usingAutoImportComponents": {} }, "pages/tabBar/cart/cart": { "navigationBarTitleText": "购物车", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/tabBar/category/category": { "navigationBarTitleText": "分类", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/tabBar/user/user": { "navigationBarTitleText": "我的", "navigationBarBackgroundColor": "#f06c7a", "backgroundTextStyle": "light", "backgroundColorTop": "#f06c7a", "navigationBarTextStyle": "white", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/city/city": { "navigationBarTitleText": "选择城市", "usingComponents": { "page-status": "/components/status/status", "location": "/components/location/location", "alphabet": "/components/alphabet/alphabet" }, "usingAutoImportComponents": { "location": "/components/location/location", "alphabet": "/components/alphabet/alphabet" } }, "pages/address/address": { "navigationBarTitleText": "选择收货地址", "navigationBarBackgroundColor": "#009eef", "backgroundTextStyle": "light", "backgroundColorTop": "#009eef", "navigationBarTextStyle": "white", "usingComponents": { "set-address": "/components/setAddress/setAddress" }, "usingAutoImportComponents": {} }, "pages/shops/shops": { "enablePullDownRefresh": true, "navigationBarTitleText": "商家", "usingComponents": { "page-status": "/components/status/status", "shops-header": "/pages/shops/shopsHeader", "info-model": "/pages/shops/infoModel", "activity": "/pages/shops/activity", "goods": "/pages/shops/goods", "goods-lists": "/pages/shops/goodsLists", "shop-cart": "/pages/shops/shopCart", "seller": "/pages/shops/seller", "comments": "/pages/shops/comments" }, "usingAutoImportComponents": {} }, "pages/orders/orders": { "navigationBarTextStyle": "white", "navigationBarTitleText": "确认订单", "navigationBarBackgroundColor": "#009eef", "usingComponents": { "delivery": "/pages/orders/delivery", "order-cart-group": "/pages/orders/orderCartGroup", "cart-item": "/pages/orders/cartItem", "table-ware": "/pages/orders/tableWare" }, "usingAutoImportComponents": {} }, "pages/login/login": { "usingComponents": { "page-status": "/components/status/status", "input-group": "/components/inputGroup/inputGroup" }, "usingAutoImportComponents": {} }, "pages/userInfo/userInfo": { "navigationBarTitleText": "我的信息", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/myFace/myFace": { "navigationBarTextStyle": "white", "navigationBarTitleText": "头像上传", "navigationBarBackgroundColor": "#000000", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/faceCrop/faceCrop": { "navigationBarTextStyle": "white", "navigationBarTitleText": "头像剪裁", "navigationBarBackgroundColor": "#000000", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/remark/remark": { "navigationBarTitleText": "订单备注", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/myAddress/myAddress": { "navigationBarTextStyle": "white", "navigationBarTitleText": "收货地址管理", "navigationBarBackgroundColor": "#009eef", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/addAddress/addAddress": { "navigationBarTextStyle": "white", "navigationBarBackgroundColor": "#009eef", "usingComponents": { "input-group": "/components/inputGroup/inputGroup", "tab-tag": "/components/tabTag/tabTag", "set-address": "/components/setAddress/setAddress" }, "usingAutoImportComponents": {} }, "pages/pay/pay": { "navigationBarTextStyle": "white", "navigationBarTitleText": "在线支付", "navigationBarBackgroundColor": "#009eef", "usingComponents": {}, "usingAutoImportComponents": {} } }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarBackgroundColor": "#FFFFFF", "backgroundColor": "#FFFFFF" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!******************************************************************************************!*\
  !*** /Users/yan/webserver/git/uniapp/uni-app-ele/uni-app-ele/pages.json?{"type":"stat"} ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__2F7F322" };exports.default = _default;

/***/ }),

/***/ 81:
/*!***************************************************************************************!*\
  !*** /Users/yan/webserver/git/uniapp/uni-app-ele/uni-app-ele/common/shopCartClass.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var shopCartClass =
function shopCartClass(_ref) {var food_id = _ref.food_id,food_name = _ref.food_name,food_image = _ref.food_image,food_count = _ref.food_count,food_price = _ref.food_price,month_sales = _ref.month_sales,satisfy_rate = _ref.satisfy_rate,description = _ref.description;_classCallCheck(this, shopCartClass);
  this.food_id = food_id;
  this.food_name = food_name;
  this.food_image = food_image;
  this.food_count = food_count;
  this.food_price = food_price;
  this.month_sales = month_sales; // 月售
  this.satisfy_rate = satisfy_rate; // 好评率
  this.description = description;
};exports.default = shopCartClass;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map