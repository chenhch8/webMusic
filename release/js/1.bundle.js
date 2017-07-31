webpackJsonp([1],Array(22).concat([
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(124)
}
var Component = __webpack_require__(27)(
  /* script */
  __webpack_require__(126),
  /* template */
  __webpack_require__(160),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3704c20f",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/chenhch8/Desktop/workplace/vue/music/src/pages/MusicPlaying.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MusicPlaying.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3704c20f", Component.options)
  } else {
    hotAPI.reload("data-v-3704c20f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
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
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(40)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(30)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(36)
  , defined = __webpack_require__(37);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(45);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(59);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(31)
  , core      = __webpack_require__(33)
  , ctx       = __webpack_require__(48)
  , hide      = __webpack_require__(50)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(57)
  , enumBugKeys = __webpack_require__(66);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(51)
  , IE8_DOM_DEFINE = __webpack_require__(52)
  , toPrimitive    = __webpack_require__(54)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(29) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(37);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(46), __esModule: true };

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47);
module.exports = __webpack_require__(33).Object.assign;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(39);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(56)});

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(49);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(42)
  , createDesc = __webpack_require__(55);
module.exports = __webpack_require__(29) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(32);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(29) && !__webpack_require__(30)(function(){
  return Object.defineProperty(__webpack_require__(53)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(32)
  , document = __webpack_require__(31).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(32);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(41)
  , gOPS     = __webpack_require__(67)
  , pIE      = __webpack_require__(43)
  , toObject = __webpack_require__(44)
  , IObject  = __webpack_require__(36)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(30)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(58)
  , toIObject    = __webpack_require__(34)
  , arrayIndexOf = __webpack_require__(60)(false)
  , IE_PROTO     = __webpack_require__(63)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 58 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 59 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(34)
  , toLength  = __webpack_require__(61)
  , toIndex   = __webpack_require__(62);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(38)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(38)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(64)('keys')
  , uid    = __webpack_require__(65);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(31)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 65 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 66 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 67 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 68 */,
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Search", function() { return Search; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetRecommend", function() { return GetRecommend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetRankList", function() { return GetRankList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetRankSongs", function() { return GetRankSongs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetLyric", function() { return GetLyric; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_api__ = __webpack_require__(71);





function Search(key) {
    return apiFactory(__WEBPACK_IMPORTED_MODULE_1__config_api__["a" /* default */].search)(key);
}

function GetRecommend() {
    return apiFactory(__WEBPACK_IMPORTED_MODULE_1__config_api__["a" /* default */].recommend)();
}

function GetRankList() {
    return apiFactory(__WEBPACK_IMPORTED_MODULE_1__config_api__["a" /* default */].rank_list)();
}

function GetRankSongs(id) {
    return apiFactory(__WEBPACK_IMPORTED_MODULE_1__config_api__["a" /* default */].rank_songs)(id);
}

function GetLyric(id) {
    return __WEBPACK_IMPORTED_MODULE_0_vue___default.a.http.jsonp('https://api.darlin.me/music/lyric/' + id + '/', {
        jsonp: 'callback'
    })
}

function apiFactory(api) {
    return (id = null) => __WEBPACK_IMPORTED_MODULE_0_vue___default.a.http.jsonp(
        api.url, {
            params: api.params(id),
            jsonp: 'jsonpCallback'
        }
    );
}

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABVCAYAAAA49ahaAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAFF0lEQVR42u3dW0gjVxwG8MmFmATJBWutSawNlqjRaKkVjNbLgw9agpcqtdRSsUqsUnyoFS+YgvhQpNZYpQgK1irekBVW0PUaqBXXGDVKkapBpZYQbyFoPG+F9KFJKuyKu2aSM3NmPvgeA+f8CMOfyZwJhtGBl4mJCQ2fz79UKpWm8fHxPNjrQSJyuXwPwzCXuyAzM/PZzs6OAva6yB6A/Y/qwjDMxWKxnNXV1T9eXV3xYS+OrHkB1VOxWGzt7u6uhL1AMuZeVHdBfHy8cWlpKRX2QsmUh1C9uEVFRcPHx8dvwV4wGfKqqC4Mw1w8Hs+u0+kaYS+a6HktVHdBRETEwdjYGD2C3ZPHoHpxMzIynm1vb8fA3gTR4guqC8MwF5PJdFZVVekvLi6CYW+GKPEZ1VOxWGzt6urSwt4QEYIbqrsgLi7OtLi4SOkRDG9UL25hYeEIVUcwf6G6MAxzcblce0tLS/Pt7S0T9kYDGb+ieiqTyQ5GRkYKYG8WKVR3QVpa2uLW1hbyI1ggUb0jmFar1Z+fnyM7ggUc1VORSGTV6/VIjmDQUN0FSqXSND8//yFsCJRQvbgFBQUjR0dHSIxgREH1jmBNTU0tTqeT1CMYoVA9lUqlluHh4Y9h4yCF6i5ITU1d3NzcVMJGQgnVO4JVVlb+RKYRjPCongqFQltnZ+dXsMGQQnUXxMbGbs3NzWXAhkMJ1Yubl5c3ZrFYJLABUUJ1YRjmCgoKcjQ2Nn53c3PDhg2JDKqnEonEMjQ0VAwbEylUd4FarV7e2NiIp1FxLpPJdFZUVPScnZ0JaFScKxQKbR0dHTU0qh8uCdHR0ebZ2dksGtUPuBqNZuLw8FBGo+JcDofjaGho8PsIRilUT8PDw48GBwc/oVH9cElISUlZNhqNuI9gVEZ1Ydh/I1h5efnPNpsNtxGM8qieCgQCW3t7+9c0qh8uCQqFwuzrXTAa9SVlMBigr6/vcxoV50qlUstdKFL/EkmUsNnsfx77Wfqb+pKyWCzn6OhoAY2KT4FarV5eW1t777GgNOodzKioqD8mJyc/8gWTRnU3JCTkb7wflKMsKpfLtdfX17c6HA4OnqCURGUwGKC0tLT/5OTkTbwxqYgKsrKyZkwmk98fI6ICKoiJidmanp7O9jcmJVDDwsJOent7vwgUJtKofD7/UqfTNcJ6zhUpVM/P01arVQQDEzVUkJOT82R3d/ddmJiooILExMTnCwsLhDqIQVZUIJPJDgYGBj6FDYgEqkAgsLW1tX0DGw4JVDabfV1TU/MDGR5TJwMqyM/PH9vf338bNhYKqCA5Ofm3lZWVD2AjoYAK5HL5ni933mGHUKhisdgK6/FH5FA5HI6jrq6uzW63c2GDkB6VwWCAkpKSX1A56AsbFaSnp8+vr68nwAZAARUoFArz1NRUDuyNI4EaGhr6V09Pz5ewN4wEKo/Hszc3N7dcX18T6gAZKVGZTKazrKys9/T09A3Ymwx0/IEKsrOzn5rNZsq+MBxPVKBSqYwzMzNZsDcFO7igSiQSS39//2ewN0OU+IQaHBx83tra+i3V3uX3UB6Fymazr7VarR7Pwwco5XVRgUajmdjb23sH9sKJnFd+JX1SUtLvBoMhBfaCyZAH/zwhMjLyTzK/IwpG7kUViURWvM4VUSoMBuMFVA6H46itrf3+8vKS/kOax0SlUhmxO/c2i4uLfw3U8W1kYzAYUhISEp7n5uY+WV1dfR/2eujQoeNr/gXVzNsC/CR0GwAAAABJRU5ErkJggg=="

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    search: {
        url: 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',
        params: (key) => {
            return {
                is_xml: 0,
                format: 'jsonp',
                key: key,
                g_tk: 5381,
                loginUin: 0,
                hostUin: 0,
                inCharset: 'utf8',
                outCharset: 'utf-8',
                notice: 0,
                platform: 'yqq',
                needNewCode: 0
            }
        }
    },
    recommend: {
        url: "https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg",
        params() {
            return {
                format: 'jsonp',
                tpl: 'v12',
                page: 'other',
                rnd: 0,
                g_tk: new Date().getTime(),
                loginUin: 0,
                hostUin: 0,
                inCharset: 'utf8',
                outCharset: 'GB2312',
                notice: 0,
                platform: 'yqq',
                needNewCode: 0
            }
        }
    },
    rank_list: {
        url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
        params: () => {
            return {
                format: 'jsonp',
                g_tk: 5381,
                uin: 0,
                inCharset: 'utf-8',
                outCharset: 'utf-8',
                notice: 0,
                platform: 'h5',
                needNewCode: 1,
                _: new Date().getTime()
            }
        }
    },
    rank_songs: {
        url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
        params: (id) => {
            return {
                g_tk: 5381,
                uin: 0,
                format: 'json',
                inCharset: 'utf-8',
                outCharset: 'utf-8',
                notice: 0,
                platform: 'h5',
                needNewCode: 1,
                tpl: 3,
                page: 'detail',
                type: 'top',
                topid: id,
                _: new Date().getTime()
            }
        }
    },
    rank_songs: {
        url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
        params: (id) => {
            return {
                g_tk: 5381,
                uin: 0,
                format: 'json',
                inCharset: 'utf-8',
                outCharset: 'utf-8',
                notice: 0,
                platform: 'h5',
                needNewCode: 1,
                tpl: 3,
                page: 'detail',
                type: 'top',
                topid: id,
                _: new Date().getTime()
            }
        }
    }
});

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABVCAYAAAA49ahaAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAABl0lEQVR42u3dsU7CQByA8fNiF8JjuDk6A1KLb2j6LobgYEJwEFkwMfokDtXFRcOgvfvkIN8v6XjX/33p1jQNQZIk6dfWy/mwmY7bGONLCOG17xVjfGmm43a9nA+PaZ5emum4DSF85LquLkftMc3Ty9cTke0QX/sd/Dwx5RBd1yWt37Xf8+P9aUnz9FmXdYgMzvY9QA6lRT0KRgUYFWBUgFEBRgUYFWBUgFEBRgUYFWBUgFEBRgUUF/WjwJn+6uAPUCKjAowKMCrAqACjAowKMCrAqACjAowKMCrAqACjAoqLehJCt+8ZUhUX9RgYFWBUgFEBRgUUF9UXf9rJqACjAowKMCrAqACjAowKMCrAqACjAowKMCrAqACjAowKMCrAqACjAowKMCrAqACjAowKMCrAqACjAowKMCrAqIDSor7te4AckqLGGLN+SRJj7M4vRu8lzdNrXcpNZ/XkNuchZldp+6Wu/+k6836/slndDZp60lZVtQ0Jf4Coqmrb1JP2abVI+gPE5iHfPLN6crNZLQb/HlWS9M0nNcbLUFmjGAwAAAAASUVORK5CYII="

/***/ }),
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(125);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(28)("1ba1cd92", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.4@css-loader/index.js?sourceMap=true!../../node_modules/_vue-loader@12.2.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3704c20f\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/postcss-loader/lib/index.js?{\"config\":{\"path\":\"./postcss.config.js\"},\"sourceMap\":true}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js?sourceMap=true!../../node_modules/_vue-loader@12.2.2@vue-loader/lib/selector.js?type=styles&index=0!./MusicPlaying.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.4@css-loader/index.js?sourceMap=true!../../node_modules/_vue-loader@12.2.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3704c20f\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/postcss-loader/lib/index.js?{\"config\":{\"path\":\"./postcss.config.js\"},\"sourceMap\":true}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js?sourceMap=true!../../node_modules/_vue-loader@12.2.2@vue-loader/lib/selector.js?type=styles&index=0!./MusicPlaying.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(true);
// imports


// module
exports.push([module.i, "\n#playing-page[data-v-3704c20f] {\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n}\n#playing-page .btg-back[data-v-3704c20f] {\n    position: absolute;\n    width: 27px;\n    height: 27px;\n    left: 20px;\n    top: 20px;\n    background-color: rgba(255, 255, 255, 0.9);\n    border-radius: 50%;\n    z-index: 5;\n    cursor: pointer;\n}\n#playing-page .btg-back img[data-v-3704c20f] {\n      width: 60%;\n      height: 60%;\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      -webkit-transform: translate(-50%, -50%);\n      -o-transform: translate(-50%, -50%);\n      transform: translate(-50%, -50%);\n}\n#playing-page img[data-v-3704c20f] {\n    width: 100%;\n}\n#playing-page .content[data-v-3704c20f] {\n    width: 100%;\n    height: 100%;\n}\n#playing-page .content .album-pic[data-v-3704c20f] {\n      position: relative;\n      width: 100%;\n      height: 58%;\n      overflow: hidden;\n}\n#playing-page .content .album-pic img[data-v-3704c20f] {\n        height: 100%;\n}\n#playing-page .content .song-info[data-v-3704c20f] {\n      position: relative;\n      height: 42%;\n}\n#playing-page .content .song-info img[data-v-3704c20f] {\n        -webkit-filter: blur(30px);\n        filter: blur(30px);\n        position: absolute;\n        top: 0;\n}\n#playing-page .content .song-info .mask[data-v-3704c20f] {\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        top: 0;\n        background-color: rgba(255, 255, 255, 0.7);\n}\n#playing-page .content .song-info .procgress[data-v-3704c20f] {\n        top: -11px;\n}\n#playing-page .content .song-info .lyrc[data-v-3704c20f] {\n        position: relative;\n        top: -11px;\n        z-index: 2;\n}\n#playing-page .playing-bar[data-v-3704c20f] {\n    position: absolute;\n    bottom: 0;\n}\n", "", {"version":3,"sources":["/home/chenhch8/Desktop/workplace/vue/music/src/pages/MusicPlaying.vue"],"names":[],"mappings":";AACA;EACE,aAAa;EACb,mBAAmB;EACnB,iBAAiB;CAClB;AACD;IACI,mBAAmB;IACnB,YAAY;IACZ,aAAa;IACb,WAAW;IACX,UAAU;IACV,2CAA2C;IAC3C,mBAAmB;IACnB,WAAW;IACX,gBAAgB;CACnB;AACD;MACM,WAAW;MACX,YAAY;MACZ,mBAAmB;MACnB,SAAS;MACT,UAAU;MACV,yCAAyC;MACzC,oCAAoC;MACpC,iCAAiC;CACtC;AACD;IACI,YAAY;CACf;AACD;IACI,YAAY;IACZ,aAAa;CAChB;AACD;MACM,mBAAmB;MACnB,YAAY;MACZ,YAAY;MACZ,iBAAiB;CACtB;AACD;QACQ,aAAa;CACpB;AACD;MACM,mBAAmB;MACnB,YAAY;CACjB;AACD;QACQ,2BAA2B;QAC3B,mBAAmB;QACnB,mBAAmB;QACnB,OAAO;CACd;AACD;QACQ,mBAAmB;QACnB,YAAY;QACZ,aAAa;QACb,OAAO;QACP,2CAA2C;CAClD;AACD;QACQ,WAAW;CAClB;AACD;QACQ,mBAAmB;QACnB,WAAW;QACX,WAAW;CAClB;AACD;IACI,mBAAmB;IACnB,UAAU;CACb","file":"MusicPlaying.vue","sourcesContent":["\n#playing-page[data-v-3704c20f] {\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n}\n#playing-page .btg-back[data-v-3704c20f] {\n    position: absolute;\n    width: 27px;\n    height: 27px;\n    left: 20px;\n    top: 20px;\n    background-color: rgba(255, 255, 255, 0.9);\n    border-radius: 50%;\n    z-index: 5;\n    cursor: pointer;\n}\n#playing-page .btg-back img[data-v-3704c20f] {\n      width: 60%;\n      height: 60%;\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      -webkit-transform: translate(-50%, -50%);\n      -o-transform: translate(-50%, -50%);\n      transform: translate(-50%, -50%);\n}\n#playing-page img[data-v-3704c20f] {\n    width: 100%;\n}\n#playing-page .content[data-v-3704c20f] {\n    width: 100%;\n    height: 100%;\n}\n#playing-page .content .album-pic[data-v-3704c20f] {\n      position: relative;\n      width: 100%;\n      height: 58%;\n      overflow: hidden;\n}\n#playing-page .content .album-pic img[data-v-3704c20f] {\n        height: 100%;\n}\n#playing-page .content .song-info[data-v-3704c20f] {\n      position: relative;\n      height: 42%;\n}\n#playing-page .content .song-info img[data-v-3704c20f] {\n        -webkit-filter: blur(30px);\n        filter: blur(30px);\n        position: absolute;\n        top: 0;\n}\n#playing-page .content .song-info .mask[data-v-3704c20f] {\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        top: 0;\n        background-color: rgba(255, 255, 255, 0.7);\n}\n#playing-page .content .song-info .procgress[data-v-3704c20f] {\n        top: -11px;\n}\n#playing-page .content .song-info .lyrc[data-v-3704c20f] {\n        position: relative;\n        top: -11px;\n        z-index: 2;\n}\n#playing-page .playing-bar[data-v-3704c20f] {\n    position: absolute;\n    bottom: 0;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _extends2=__webpack_require__(35),_extends3=_interopRequireDefault(_extends2),_PlayingBar=__webpack_require__(127),_PlayingBar2=_interopRequireDefault(_PlayingBar),_PlayingProgress=__webpack_require__(137),_PlayingProgress2=_interopRequireDefault(_PlayingProgress),_PlayingLyrc=__webpack_require__(142),_PlayingLyrc2=_interopRequireDefault(_PlayingLyrc),_vuex=__webpack_require__(68);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default={components:{PlayingBar:_PlayingBar2.default,PlayingProgress:_PlayingProgress2.default,PlayingLyrc:_PlayingLyrc2.default},methods:{},computed:(0,_extends3.default)({},(0,_vuex.mapGetters)(['coverImgUrl']))};

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(128)
}
var Component = __webpack_require__(27)(
  /* script */
  __webpack_require__(130),
  /* template */
  __webpack_require__(131),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2420d022",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/chenhch8/Desktop/workplace/vue/music/src/components/PlayingBar2.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PlayingBar2.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2420d022", Component.options)
  } else {
    hotAPI.reload("data-v-2420d022", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(129);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(28)("ffc4cdf4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.4@css-loader/index.js?sourceMap=true!../../node_modules/_vue-loader@12.2.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2420d022\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/postcss-loader/lib/index.js?{\"config\":{\"path\":\"./postcss.config.js\"},\"sourceMap\":true}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js?sourceMap=true!../../node_modules/_vue-loader@12.2.2@vue-loader/lib/selector.js?type=styles&index=0!./PlayingBar2.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.4@css-loader/index.js?sourceMap=true!../../node_modules/_vue-loader@12.2.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2420d022\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/postcss-loader/lib/index.js?{\"config\":{\"path\":\"./postcss.config.js\"},\"sourceMap\":true}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js?sourceMap=true!../../node_modules/_vue-loader@12.2.2@vue-loader/lib/selector.js?type=styles&index=0!./PlayingBar2.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(true);
// imports


// module
exports.push([module.i, "\n#playing-bar[data-v-2420d022] {\n  width: 100%;\n  height: 8%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n#playing-bar > div[data-v-2420d022] {\n    position: relative;\n}\n#playing-bar img[data-v-2420d022] {\n    width: 70%;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n    -o-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n    cursor: pointer;\n}\n#playing-bar .like[data-v-2420d022], #playing-bar .song-list[data-v-2420d022] {\n    width: 14%;\n}\n#playing-bar .btn-group[data-v-2420d022] {\n    width: 56%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n}\n#playing-bar .btn-group > div[data-v-2420d022] {\n      -webkit-box-flex: 1;\n      -webkit-flex: 1;\n      -ms-flex: 1;\n      flex: 1;\n      position: relative;\n}\n#playing-bar .btn-group > div img[data-v-2420d022] {\n        width: 50%;\n}\n", "", {"version":3,"sources":["/home/chenhch8/Desktop/workplace/vue/music/src/components/PlayingBar2.vue"],"names":[],"mappings":";AACA;EACE,YAAY;EACZ,WAAW;EACX,qBAAqB;EACrB,sBAAsB;EACtB,qBAAqB;EACrB,cAAc;EACd,0BAA0B;EAC1B,uCAAuC;EACvC,uBAAuB;EACvB,+BAA+B;CAChC;AACD;IACI,mBAAmB;CACtB;AACD;IACI,WAAW;IACX,mBAAmB;IACnB,SAAS;IACT,UAAU;IACV,yCAAyC;IACzC,oCAAoC;IACpC,iCAAiC;IACjC,gBAAgB;CACnB;AACD;IACI,WAAW;CACd;AACD;IACI,WAAW;IACX,qBAAqB;IACrB,sBAAsB;IACtB,qBAAqB;IACrB,cAAc;IACd,0BAA0B;IAC1B,uCAAuC;IACvC,uBAAuB;IACvB,+BAA+B;CAClC;AACD;MACM,oBAAoB;MACpB,gBAAgB;MAChB,YAAY;MACZ,QAAQ;MACR,mBAAmB;CACxB;AACD;QACQ,WAAW;CAClB","file":"PlayingBar2.vue","sourcesContent":["\n#playing-bar[data-v-2420d022] {\n  width: 100%;\n  height: 8%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n#playing-bar > div[data-v-2420d022] {\n    position: relative;\n}\n#playing-bar img[data-v-2420d022] {\n    width: 70%;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n    -o-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n    cursor: pointer;\n}\n#playing-bar .like[data-v-2420d022], #playing-bar .song-list[data-v-2420d022] {\n    width: 14%;\n}\n#playing-bar .btn-group[data-v-2420d022] {\n    width: 56%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n}\n#playing-bar .btn-group > div[data-v-2420d022] {\n      -webkit-box-flex: 1;\n      -webkit-flex: 1;\n      -ms-flex: 1;\n      flex: 1;\n      position: relative;\n}\n#playing-bar .btn-group > div img[data-v-2420d022] {\n        width: 50%;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _extends2=__webpack_require__(35),_extends3=_interopRequireDefault(_extends2),_vuex=__webpack_require__(68);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default={computed:(0,_extends3.default)({},(0,_vuex.mapState)({playing:function playing(a){return a.PlayingService.playing},song:function song(a){return a.PlayingService.song}}),(0,_vuex.mapGetters)(['like'])),methods:(0,_extends3.default)({},(0,_vuex.mapMutations)(['play','pause','playFront','playNext','setLike']),{changeCurrState:function changeCurrState(){this.playing?this.pause():this.play()},goPlayingList:function goPlayingList(){this.$router.push({name:'PlayingList'},'up')},setState:function setState(){this.setLike({songid:this.song.id,type:!this.like})}})};

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "playing-bar"
    }
  }, [_c('div', {
    staticClass: "like",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        _vm.setState($event)
      }
    }
  }, [(_vm.like) ? _c('img', {
    attrs: {
      "src": __webpack_require__(132)
    }
  }) : _c('img', {
    attrs: {
      "src": __webpack_require__(133)
    }
  })]), _c('div', {
    staticClass: "btn-group"
  }, [_c('div', {
    staticClass: "btn-front",
    on: {
      "click": function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        _vm.playFront($event)
      }
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(134)
    }
  })]), _c('div', {
    staticClass: "btn-play",
    on: {
      "click": function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        _vm.changeCurrState($event)
      }
    }
  }, [(_vm.playing) ? _c('img', {
    attrs: {
      "src": __webpack_require__(72)
    }
  }) : _c('img', {
    attrs: {
      "src": __webpack_require__(70)
    }
  })]), _c('div', {
    staticClass: "btn-next",
    on: {
      "click": function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        _vm.playNext($event)
      }
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(135)
    }
  })])]), _c('div', {
    staticClass: "song-list",
    on: {
      "click": function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        _vm.goPlayingList($event)
      }
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(136)
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2420d022", module.exports)
  }
}

/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABVCAYAAAA49ahaAAAC00lEQVR42u2csYsaQRSHhxRHCEcQCTlJkSKkOFKEFCGtTZCgNsphIRokBAuRNGIMMSLXCEeKoKBBgoKkiHpFTJFSBEGw0Ea2UDRsIf4dF1+xEI7zWHO7s7Ozvw8eWKzz5n3oMs68lTEAAAAAAAAAAAAAAAAAAADd9Hq9l9ls9vSCsYtdUavVYoqiHN40F41BYyUSiequXDQXmpPtRC4Wi3upVOrsOpFXhd/vPx8MBs/3zUfv2TcXBc2R5iq80Hw+//F/Crwceoqla4zItZ3zByFlbr96HiMK/Dc6nY5/V75ut/vK6HyqqrqEETqdTh8bXaAWlUrlzeV85XL5rVn5ZrPZIyHun2YVqEW9Xo9q+ei12fnW67XbUqlmF6jFZDI5Ho1Gz3jls0xoJpM55VUk78jlcp+4C53P5w9kFarFarW6z1VqMpn8IrvU7Tr2MzehxWLxluxCtaBauUhtNBoRp0httVonXKRGo9FvTpEaiUQaUi2jRAlIhVRIhVRIhVRIjcfjX50iNBaL1blIpT1Op0i9aj/XFGgj1ylSuW5a435qAoVC4b3sQrnvqfI4RrE6FEV5KO1RihXh8/l+WnKc0u/3X8gqlWqT/uCPZ3i93t+WnqYOh8Onskmlmiw/+5fpFxbVIkSHymazuSOLVKpFmNafdrsdtLtQqkG4JjU7Cw2FQt+F7PxTVfW2XaXS3IXtTx2Px0/sJpTmLHzjL7WI20VotVp9zexCOp0+E10ozZHZjWAw+ENUoYFAoMPsiMg9V9x6pMyAHsMRcEvvkNmd5XJ5V6Clk4vJwvbT4RbgE+pmsmGlWCmFWnmPleIeqkPswa+joz+chB4wJxEOh1tmyaSxmVMx47EhGpM5nWazeWKUUBqLAePOuoQ4WxJwP9aFRb1J7PMHDHQtjOlEz/P8dA1M7b+e9Vyz/vTA0A0olUppTeb29TsYAQAAAAAAAAAAAJCMv3URiOIDnS1CAAAAAElFTkSuQmCC"

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/416a0c19.icon-like.png";

/***/ }),
/* 134 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABVCAYAAAA49ahaAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAFIUlEQVR42u2bS0hjVxjHj69oggrWaGQMgmM0UVzUscYHgYCK4CvOZkS6sb5KheLGIlprRLoQhIpJqd34oJvEsRZTXAyViEqoUERGE4uMTZlcaxFpYnx2J9NFTfGRx03ueUnPD87+z+/ey/3Od74DAIPBYDAYDAaDwWAwGAwGg8Fg4GVhYaFOpVJtJSQkeIxGYyfpPIEwm806pVL5WiwWe6anp1tI5/HL4eHhe01NTWYAwBUA4B0A4J1UKuVI57oPx3HS+vr672/nVCgUO6RzPWBycvKj5OTkI1/IW+vq4uIimnQ+HwaDoTMpKen4fs7Y2Ngz0tn+Y29vL0uj0fwEbj31+8vr9YpI53Q4HE/Ly8tXguS8Ip0RAADAyMjIZ/Hx8d4AIamRqtfr+0UiUaicZKVubGy8X1hY+AsI8nYCCqTabLZn+fn5WzxzkpF6fn4e29PTMxodHX3BRyYpqWdnZ7Hd3d1fhZkTv9SlpaXKrKysvXBkkpBqsVhq5HL5mwhy4pN6fHyc2NLSMg14fuqkpB4dHSW/ePHiOwE58UidmZlpSU1N/SNSmbikTk1NfZiSkvKnwJxopTqdzifV1dU/AgFvJw6p+/v78srKyiVIOdFJHRsb+1QikfwFQyZKqaOjoz1isdgDMSd8qVtbW6ri4mIbgPR2opK6ublZUFRU9DOCnHCl9vX1jdxs06DKhC21t7f3S4Q54Ui1Wq0VOTk5DoDg7YQpdXl5WZOdnf0r4pzCpLrdbklbW9s3UVFRSGUKlep2uyWtra3fon7ogqWazWadTCZ7i0OmEKkmk+l5WloahzFn+FI5jpM2Nja+xPTUI5bKcZy0rq7uTq+TSqlGo7EzQK+TKqkGg6EzMTHxmFBOflJ3d3dD9RCpkOpwOJ6WlZWRzhla6vDwcB+PHiJxqXq9vj8uLg5ZOQdFapg9RGJSbTbbM5VKRVPOh1Ij7CFil+rLiauci1iqgB4iVqkWi6UmMzPzN9J5gko9PT0VNTc3z1L0CfldLpcr/RHk/FdqQ0PDSwrChFwajYZ4Bj5SowAAICYm5uL6+joRMGDwdzQAAFRVVVlJJ+GDWq0mHYE/brdbotPp7ozZ0LicTueTR5Dz7t9/bm5Ol5GR8TsFwfwu39+f8pwP69STk5OEjo6Oryms/+7UqRTnDLyjWl1dVefl5b2m6VPzt6NaWVkpy83N3aEoZ+i9/+Dg4OeU7KmD7v0HBga+oCQnvy6V3W5XlJaWrpJ+G0J1qXZ2dhRqtZp0zvD6qYFmMmmR6mNiYuJj6vupt3lMnf/7U87USvVBoqyJ5IyKwFmasNNU3GVNpKepHo8nob29HVdOOOf+uMovoef+mMovuBMqqMsvWBMqiMsv+LNUdrtdgeqQEOYsFcLyC93UH4rjbBRTfwjKL7TzqQcHB1KYXSVU86mQyy88k9Tz8/MNMMov1JPUkMovfDP/Xq9X1NXVZRBS1uCY+YcwdIf/dsra2ppaqVRGVH7hvJ1itVorbu6ZhpuT3OW0oaGhsCdKSFxO6+/v14c5IEz2xh+Pe57EpQIAwPb2dl5JSck6z5x03E3lW36Rvps6Pj7+CY/yiw6pAPArv0hLBQAAl8uVXltb+0OQnPRI9RGk/Lq6vLyk5r6/yWR6np6e/qD8uvlP0Ie/8utGNFX4K78KCgo2SecKyvr6+gdarfaVXC5/Mzs720w6TyCsVmuFVqt9JZPJ3i4uLtaQzsNgMBgMBoPBYDAYDAaDwWAwGIz/Mf8AYvF035sC+WAAAAAASUVORK5CYII="

/***/ }),
/* 135 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABVCAYAAAA49ahaAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAFgUlEQVR42u2bbUibVxTHjzEmEmKIuiqNZtaXiIZCS5iiQVR0jFbnXHXGUYZMGa0VHUOGKAxfGIgy6hSdU1otc0ytJRaVIVJl+DqGyhS1InaojS+trajI0693H8wjTmPe89z7sPuD8zl/flzCec49F4BCoVAoFAqFQqFQKBQKhUKhUCgUnDx8+PC2WCzeV6lU811dXZ/gznMR9fX1d0Qi0X54ePjfPT09H+POY5aQkJAFAEDGYm7evKlfX1/3w53rLL6+vobTOdPT07sMBoMP7lwmkcvlW6fCIgBAUqn0dV1dXT7ubGdgzuaUyWQ7TU1NebiDncOUVGMxUVFRo3Nzc+G4Mxo5J5XNqdVqny0uLobgDniCGakIAJBQKDwsLS0tx50TLpaKAACJRKL98vLyUtwhAcCyVGMxYWFh88PDw1qMUc1KZXNGRETMjo2NfYAxp9VSEQAgNzc3Jjc396e3b99KCJV6kjM/P//+wcGBiHipbPn5+a11dnZ+SqpUthQKxaper7/BC6mAp/2yWSqb89atW79tbm5y1345IPWk/aqvr79DsNST9qu5uflLXkg1FhMdHf3H/Px8GKlS2ZxxcXFDz58/v8IHqQgAkIeHx2FZWdl3BEtFAIDEYvF+ZWVlCS+kGotRqVTzIyMjMaRKZXOq1erpiYkJDR+knrQ1eXl5jXt7e56ESkUAgAQCwdG9e/fuHx4eComXypa/v/+ak6ZfLpHKVkBAwOrTp08/4oVUYzGpqalPNjY23iNVKpszMzPz1+3tbTkfpCIAh9svLqQiAEByuXyrpaUlhxdS2dNgZ/vFmVQ2Z3x8/ODy8vL7fJCKAOxqv7iWigCO26+qqqpveSGVPQ02tF9YpLI5r169+tfU1NR1PkhFAFa3XzilIoDj9quoqKjWYvtFglS2LLRf2KWypVQqV/r6+j7khVRjXdR+ESOVzZmVlfXLzs6OjA9SEQAgLy+v1w0NDV8RLBUBHLdfDx48uM0LqexpiI2NHTFeRRMplc2ZlJQ0sLu7K+WDVAQASKvVYs9gTaWkpDzhjVR3d3fsGawpX19fgwD4wTudTtcOAO9wB7EiZw8AkH1S2b7QGJrY/9RzuxGESmXUavX05OTk9VMngUSpjEajGZ+ZmVH/58ySJlUsFu9XVFSYuuogSqpEInlTU1PzNZiCIKmMVqt9trS0dAVMQ4pUJjk5eWB1dVUBF0GCVJlMttPY2Ghpew+7VG9v7622trbPwRK4p1RpaWmPX758ac2NANYplU6ne2Tyk5Qkqf7+/mvd3d223F1hkRoYGGh+eEKCVHbJzY5bVk6lCgSCo4KCgh/sumXlUCoTGhq64MA6JldSmcjIyNnx8XH79wG4kCoUCg9LSkqq7A7JkVSnLQ67WCqj0WjGZ2dnIxwO6lqpTExMzMjCwoJzVtxdJVUikbypra0tdEpIF0qVSqVn57ZESmWSk5MHXrx4obAtCedSmZSUFEcXPFwv1cfHx9De3m65OcYs9dKlSxsu3QR31n5qdnb2o1evXlnXHOOTyuTk5Pzs8jcLjkpVKpUr/f39tjXH3EtlgoODl4aGhuI4yGm/VIFAcFRYWGj5DhyzVHd396Pi4uLvOcpot1RTs04SpTLXrl37c3p6Wm3fz3Ek1cyskyipnp6ee9XV1d9gymn9iz8Ls04usOrFX2Ji4u8rKyuBGHNalmrlrJMLzEqVy+Vbra2tX+AOCQDmX1HbMOvkggtfUWdkZDi+/exMTEm1Y9bJBeekKhSK1d7eXu6fSVoiMjJylg3pwKzT5Vy+fPmf0znv3r37I7YHvZbQ6/U3goKCluPj4wcxPz03S0dHx2dKpXIlISFhcHR0FO/TcwqFQqFQKBQKhUKhUCgUCoXyf+NfAYhJlmoRVlIAAAAASUVORK5CYII="

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/9da9a38a.icon-list.png";

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(138)
}
var Component = __webpack_require__(27)(
  /* script */
  __webpack_require__(140),
  /* template */
  __webpack_require__(141),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-1cbc3ec6",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/chenhch8/Desktop/workplace/vue/music/src/components/PlayingProgress.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PlayingProgress.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1cbc3ec6", Component.options)
  } else {
    hotAPI.reload("data-v-1cbc3ec6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(139);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(28)("62e4d638", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.4@css-loader/index.js?sourceMap=true!../../node_modules/_vue-loader@12.2.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1cbc3ec6\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/postcss-loader/lib/index.js?{\"config\":{\"path\":\"./postcss.config.js\"},\"sourceMap\":true}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js?sourceMap=true!../../node_modules/_vue-loader@12.2.2@vue-loader/lib/selector.js?type=styles&index=0!./PlayingProgress.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.4@css-loader/index.js?sourceMap=true!../../node_modules/_vue-loader@12.2.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1cbc3ec6\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/postcss-loader/lib/index.js?{\"config\":{\"path\":\"./postcss.config.js\"},\"sourceMap\":true}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js?sourceMap=true!../../node_modules/_vue-loader@12.2.2@vue-loader/lib/selector.js?type=styles&index=0!./PlayingProgress.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(true);
// imports


// module
exports.push([module.i, "\n#process-bg[data-v-1cbc3ec6] {\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  z-index: 2;\n}\n#process-bg > *[data-v-1cbc3ec6] {\n    margin: 0;\n    position: relative;\n}\n#process-bg .time[data-v-1cbc3ec6] {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    padding: 0 2%;\n}\n#process-bg .time span[data-v-1cbc3ec6] {\n      -webkit-box-flex: 1;\n      -webkit-flex: 1;\n      -ms-flex: 1;\n      flex: 1;\n      color: rgba(0, 0, 0, 0.7);\n      font-size: 1em;\n}\n#process-bg .time span[data-v-1cbc3ec6]:nth-child(2) {\n      text-align: right;\n}\n", "", {"version":3,"sources":["/home/chenhch8/Desktop/workplace/vue/music/src/components/PlayingProgress.vue"],"names":[],"mappings":";AACA;EACE,YAAY;EACZ,mBAAmB;EACnB,iBAAiB;EACjB,WAAW;CACZ;AACD;IACI,UAAU;IACV,mBAAmB;CACtB;AACD;IACI,qBAAqB;IACrB,sBAAsB;IACtB,qBAAqB;IACrB,cAAc;IACd,cAAc;CACjB;AACD;MACM,oBAAoB;MACpB,gBAAgB;MAChB,YAAY;MACZ,QAAQ;MACR,0BAA0B;MAC1B,eAAe;CACpB;AACD;MACM,kBAAkB;CACvB","file":"PlayingProgress.vue","sourcesContent":["\n#process-bg[data-v-1cbc3ec6] {\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  z-index: 2;\n}\n#process-bg > *[data-v-1cbc3ec6] {\n    margin: 0;\n    position: relative;\n}\n#process-bg .time[data-v-1cbc3ec6] {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    padding: 0 2%;\n}\n#process-bg .time span[data-v-1cbc3ec6] {\n      -webkit-box-flex: 1;\n      -webkit-flex: 1;\n      -ms-flex: 1;\n      flex: 1;\n      color: rgba(0, 0, 0, 0.7);\n      font-size: 1em;\n}\n#process-bg .time span[data-v-1cbc3ec6]:nth-child(2) {\n      text-align: right;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _extends2=__webpack_require__(35),_extends3=_interopRequireDefault(_extends2),_vuex=__webpack_require__(68),_rx=__webpack_require__(199),_rx2=_interopRequireDefault(_rx);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default={computed:(0,_vuex.mapState)({duration:function duration(a){return a.PlayingService.duration},currtime:function currtime(a){return a.PlayingService.currentTime},percent:function percent(a){var b=a.PlayingService;return parseInt(100*(b.currentTime/b.duration))}}),filters:{format:function format(a){return a=parseInt(a),('0'+parseInt(a/60)).slice(-2)+':'+('0'+a%60).slice(-2)}},methods:(0,_extends3.default)({setCurrTime:function setCurrTime(a){this.value=a}},(0,_vuex.mapMutations)(['setCurrentTime'])),data:function data(){return{value:void 0}},mounted:function mounted(){var a=this;_rx2.default.Observable.interval(200).map(function(){return a.value}).filter(function(a){return a!=void 0}).distinctUntilChanged().subscribe(function(b){a.setCurrentTime(parseInt(b*a.duration/100)),a.value=void 0,a.percent=b},function(a){return console.log('Rx err:',a)})}};

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "process-bg"
    }
  }, [_c('mu-slider', {
    attrs: {
      "step": 2
    },
    on: {
      "change": function($event) {
        _vm.setCurrTime($event)
      }
    },
    model: {
      value: (_vm.percent),
      callback: function($$v) {
        _vm.percent = $$v
      },
      expression: "percent"
    }
  }), _c('div', {
    staticClass: "time"
  }, [_c('span', [_vm._v(_vm._s(_vm._f("format")(_vm.currtime)))]), _c('span', [_vm._v(_vm._s(_vm._f("format")(_vm.duration)))])])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-1cbc3ec6", module.exports)
  }
}

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(143)
}
var Component = __webpack_require__(27)(
  /* script */
  __webpack_require__(145),
  /* template */
  __webpack_require__(159),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-15f93324",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/chenhch8/Desktop/workplace/vue/music/src/components/PlayingLyrc.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PlayingLyrc.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-15f93324", Component.options)
  } else {
    hotAPI.reload("data-v-15f93324", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(144);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(28)("2c4291f4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.4@css-loader/index.js?sourceMap=true!../../node_modules/_vue-loader@12.2.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-15f93324\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/postcss-loader/lib/index.js?{\"config\":{\"path\":\"./postcss.config.js\"},\"sourceMap\":true}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js?sourceMap=true!../../node_modules/_vue-loader@12.2.2@vue-loader/lib/selector.js?type=styles&index=0!./PlayingLyrc.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.4@css-loader/index.js?sourceMap=true!../../node_modules/_vue-loader@12.2.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-15f93324\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/postcss-loader/lib/index.js?{\"config\":{\"path\":\"./postcss.config.js\"},\"sourceMap\":true}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js?sourceMap=true!../../node_modules/_vue-loader@12.2.2@vue-loader/lib/selector.js?type=styles&index=0!./PlayingLyrc.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(true);
// imports


// module
exports.push([module.i, "\n#playing-lyric[data-v-15f93324] {\n  width: 100%;\n  height: 72%;\n  position: relative;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n}\n#playing-lyric > *[data-v-15f93324] {\n    margin: 0;\n}\n#playing-lyric .song-name[data-v-15f93324] {\n    font-size: 1.5em;\n    font-weight: 700;\n    text-align: center;\n}\n#playing-lyric .lyric[data-v-15f93324] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    overflow: hidden;\n}\n#playing-lyric .lyric .error[data-v-15f93324] {\n      font-size: 1.3em;\n      color: rgba(0, 0, 0, 0.5);\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      -webkit-transform: translate(-50%, -50%);\n      -o-transform: translate(-50%, -50%);\n      transform: translate(-50%, -50%);\n}\n#playing-lyric .lyric .scroll-penal[data-v-15f93324] {\n      -webkit-transition: -webkit-transform .2s linear;\n      transition: -webkit-transform .2s linear;\n      -o-transition: -o-transform .2s linear;\n      transition: transform .2s linear;\n      transition: transform .2s linear, -webkit-transform .2s linear, -o-transform .2s linear;\n      overflow-y: auto;\n}\n#playing-lyric .lyric .scroll-penal p[data-v-15f93324] {\n        color: rgba(0, 0, 0, 0.5);\n        font-size: 15px;\n        text-align: center;\n        margin: 10px;\n        height: 25px;\n        -webkit-box-sizing: border-box;\n        box-sizing: border-box;\n}\n#playing-lyric .lyric .scroll-penal .strong[data-v-15f93324] {\n        color: rgba(0, 0, 0, 0.85);\n        font-size: 17px;\n}\n", "", {"version":3,"sources":["/home/chenhch8/Desktop/workplace/vue/music/src/components/PlayingLyrc.vue"],"names":[],"mappings":";AACA;EACE,YAAY;EACZ,YAAY;EACZ,mBAAmB;EACnB,iBAAiB;EACjB,qBAAqB;EACrB,sBAAsB;EACtB,qBAAqB;EACrB,cAAc;EACd,6BAA6B;EAC7B,8BAA8B;EAC9B,+BAA+B;EAC/B,2BAA2B;EAC3B,uBAAuB;CACxB;AACD;IACI,UAAU;CACb;AACD;IACI,iBAAiB;IACjB,iBAAiB;IACjB,mBAAmB;CACtB;AACD;IACI,oBAAoB;IACpB,gBAAgB;IAChB,YAAY;IACZ,QAAQ;IACR,iBAAiB;CACpB;AACD;MACM,iBAAiB;MACjB,0BAA0B;MAC1B,mBAAmB;MACnB,SAAS;MACT,UAAU;MACV,yCAAyC;MACzC,oCAAoC;MACpC,iCAAiC;CACtC;AACD;MACM,iDAAiD;MACjD,yCAAyC;MACzC,uCAAuC;MACvC,iCAAiC;MACjC,wFAAwF;MACxF,iBAAiB;CACtB;AACD;QACQ,0BAA0B;QAC1B,gBAAgB;QAChB,mBAAmB;QACnB,aAAa;QACb,aAAa;QACb,+BAA+B;QAC/B,uBAAuB;CAC9B;AACD;QACQ,2BAA2B;QAC3B,gBAAgB;CACvB","file":"PlayingLyrc.vue","sourcesContent":["\n#playing-lyric[data-v-15f93324] {\n  width: 100%;\n  height: 72%;\n  position: relative;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n}\n#playing-lyric > *[data-v-15f93324] {\n    margin: 0;\n}\n#playing-lyric .song-name[data-v-15f93324] {\n    font-size: 1.5em;\n    font-weight: 700;\n    text-align: center;\n}\n#playing-lyric .lyric[data-v-15f93324] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    overflow: hidden;\n}\n#playing-lyric .lyric .error[data-v-15f93324] {\n      font-size: 1.3em;\n      color: rgba(0, 0, 0, 0.5);\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      -webkit-transform: translate(-50%, -50%);\n      -o-transform: translate(-50%, -50%);\n      transform: translate(-50%, -50%);\n}\n#playing-lyric .lyric .scroll-penal[data-v-15f93324] {\n      -webkit-transition: -webkit-transform .2s linear;\n      transition: -webkit-transform .2s linear;\n      -o-transition: -o-transform .2s linear;\n      transition: transform .2s linear;\n      transition: transform .2s linear, -webkit-transform .2s linear, -o-transform .2s linear;\n      overflow-y: auto;\n}\n#playing-lyric .lyric .scroll-penal p[data-v-15f93324] {\n        color: rgba(0, 0, 0, 0.5);\n        font-size: 15px;\n        text-align: center;\n        margin: 10px;\n        height: 25px;\n        -webkit-box-sizing: border-box;\n        box-sizing: border-box;\n}\n#playing-lyric .lyric .scroll-penal .strong[data-v-15f93324] {\n        color: rgba(0, 0, 0, 0.85);\n        font-size: 17px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _keys=__webpack_require__(146),_keys2=_interopRequireDefault(_keys),_extends2=__webpack_require__(35),_extends3=_interopRequireDefault(_extends2),_values=__webpack_require__(150),_values2=_interopRequireDefault(_values),_defineProperty2=__webpack_require__(154),_defineProperty3=_interopRequireDefault(_defineProperty2),_ApiService=__webpack_require__(69),_vuex=__webpack_require__(68),_base=__webpack_require__(158),_base2=_interopRequireDefault(_base);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default={data:function data(){return{lyric:null,keys:null,nonius:0,oldnonius:void 0,newnonius:0,offset:{transform:'translate(0, 0)'}}},computed:(0,_vuex.mapState)({song:function song(a){return this.nonius=0,a.PlayingService.song},currtime:function currtime(a){return a.PlayingService.currentTime},changTo:function changTo(a){return a.PlayingService.currentTime}}),created:function created(){this.getLyric()},watch:{song:function song(){this.getLyric()},currtime:function currtime(){this.keys&&this.updateLyricLoc(this.format(this.currtime))},changTo:function changTo(){this.keys&&(this.newnonius=0,this.changeLyricLoc(this.format(this.changTo)))}},methods:{getLyric:function getLyric(){var a=this;if(void 0!==this.song.id){var b=/^\s+$/;(0,_ApiService.GetLyric)(this.song.id).then(function(c){200!==c.status||(a.lyric=_base2.default.decode(c.data.lyric).split('[').slice(5).map(function(a){var b=a.split(']');return(0,_defineProperty3.default)({},b[0],b[1])}).filter(function(a){return!b.test((0,_values2.default)(a)[0])}).reduce(function(c,a){return(0,_extends3.default)({},c,a)},{}),a.keys=(0,_keys2.default)(a.lyric).slice(1))})}},updateLyricLoc:function updateLyricLoc(a){for('00:00.00'===a&&this.oldnonius>=this.keys.length-1&&(this.nonius=0);this.keys[this.nonius]<a&&(this.nonius++,this.nonius!==this.keys.length););this.oldnonius===this.nonius||(this.oldnonius=this.nonius,this.offset={transform:'translate(0,-'+35*this.nonius+'px)'})},changeLyricLoc:function changeLyricLoc(a){for(;this.keys[this.newnonius]<a&&(this.newnonius++,this.newnonius!==this.keys.length););this.nonius=this.newnonius},format:function format(a){return('0'+parseInt(a/60)).slice(-2)+':'+('0'+parseInt(a%60)).slice(-2)+'.'+(a-parseInt(a)).toFixed(2).slice(-2)}}};

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(147), __esModule: true };

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(148);
module.exports = __webpack_require__(33).Object.keys;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(44)
  , $keys    = __webpack_require__(41);

__webpack_require__(149)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(39)
  , core    = __webpack_require__(33)
  , fails   = __webpack_require__(30);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(151), __esModule: true };

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(152);
module.exports = __webpack_require__(33).Object.values;

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(39)
  , $values = __webpack_require__(153)(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(41)
  , toIObject = __webpack_require__(34)
  , isEnum    = __webpack_require__(43).f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(155);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(156), __esModule: true };

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(157);
var $Object = __webpack_require__(33).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(39);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(29), 'Object', {defineProperty: __webpack_require__(42).f});

/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * Created by sioxa on 2016/12/30 0030.
 */

// //1.加密
// var str = '124中文内容';
// var base = new Base64();
// var result = base.encode(str);
// //document.write(result);
//
// //2.解密
// var result2 = base.decode(result);
// document.write(result2);
const _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

// private method for UTF-8 encoding
function _utf8_encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }
    return utftext;
}

function _utf8_decode(utftext) {
    var string = "";
    var i = 0;
    var c = 0;
    var c3 = 0;
    var c2 = 0;
    while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        } else if ((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return string;
}

/* harmony default export */ __webpack_exports__["default"] = ({
    // public method for encoding
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    },

    // public method for decoding
    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }
});

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.song.id) ? _c('div', {
    attrs: {
      "id": "playing-lyric"
    }
  }, [_c('h2', {
    staticClass: "song-name"
  }, [_vm._v(_vm._s(_vm.song.name))]), (_vm.lyric) ? _c('div', {
    staticClass: "lyric"
  }, [_c('div', {
    staticClass: "scroll-penal",
    style: (_vm.offset)
  }, _vm._l((_vm.lyric), function(item, index, order) {
    return _c('p', {
      key: index,
      class: {
        strong: order == _vm.nonius
      }
    }, [_vm._v(_vm._s(item))])
  }))]) : _c('div', {
    staticClass: "lyric"
  }, [_c('span', {
    staticClass: "error"
  }, [_vm._v("未找到歌词")])])]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-15f93324", module.exports)
  }
}

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "playing-page"
    }
  }, [_c('div', {
    staticClass: "btg-back",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        _vm.$router.go(-1, 'down')
      }
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(161)
    }
  })]), _c('div', {
    staticClass: "content"
  }, [_c('div', {
    staticClass: "album-pic"
  }, [_c('img', {
    attrs: {
      "src": _vm.coverImgUrl
    }
  })]), _c('div', {
    staticClass: "song-info"
  }, [_c('playing-progress', {
    staticClass: "procgress"
  }), _c('playing-lyrc', {
    staticClass: "lyrc"
  }), _c('img', {
    attrs: {
      "src": _vm.coverImgUrl
    }
  }), _c('div', {
    staticClass: "mask"
  })], 1)]), _c('playing-bar', {
    staticClass: "playing-bar"
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3704c20f", module.exports)
  }
}

/***/ }),
/* 161 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAB3klEQVRYw+2XsUrDQBjHv9OaRbBqfAGfoNvd2pZCg30CwWJbJwdxKlyh0kXaYBR3xeLQJ6gRuqVDO1yeokuHDimRQAcjxEECaW1irlFEyQ8y3OXy/34c34UEIOavYJrWmmlaa7/tERMT8yMYhilcXd085vMHjiQVnOvr2wfDMIXvzy84klRwFGU+P+Fd3G4/3KmqeuyOu91uZTKZ7BuGKYni9mtUEVmWe4yxjDv39NStCMLGDADOAADmXnSDwfBwMYQxlpFluRdlh1wRXWcZhAC8V7/fP3HXzcnYtr20YBQhr8iy+96aczLZbLbtF7qK0FciAAC5XO5+qUy5XD4lhGh+D+p6eKEwIhgTrVgsnrtj5BfibTSEPodQSn2bOqzIYgYKCmPso+HChkUR8ZVZNTSKSKAMbzgAQIi1oCiyb81AmXBCCDAmAACg68w3B2MClNJNUUzOVpZxqVZrTlCxIMKIACwc7SAopVvuDvyECJeMKCYtXiGMSUNRWiiMCJcMrxAh5KJWo02efO4/AlFMWorSQhiTRpAIpVTe3U2+8WSv88q4qOrzcDQa2ePxOOudT6VSzXq9fskrAsBxmpYxnb4kOp3OkaZpGdu2hXQ6rZVKpce9vZ1I3z4xMTH/infigDUn5X46BwAAAABJRU5ErkJggg=="

/***/ })
]));