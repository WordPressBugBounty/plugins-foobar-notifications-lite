"use strict";

(function ($, _) {
  /**
   * @summary A reference to the jQuery object the plugin is registered with.
   * @memberof FooBar.
   * @name $
   * @type {jQuery}
   * @description This is used internally for all jQuery operations to help work around issues where multiple jQuery libraries have been included in a single page.
   * @example {@caption The following shows the issue when multiple jQuery's are included in a single page.}{@lang xml}
   * <script src="jquery-1.12.4.js"></script>
   * <script src="your-plugin.js"></script>
   * <script src="jquery-2.2.4.js"></script>
   * <script>
   * 	jQuery(function($){
   * 		$(".selector").yourPlugin(); // => This would throw a TypeError: $(...).yourPlugin is not a function
   * 	});
   * </script>
   * @example {@caption The reason the above throws an error is that the `$.fn.yourPlugin` function is registered to the first instance of jQuery in the page however the instance used to create the ready callback and actually try to execute `$(...).yourPlugin()` is the second. To resolve this issue ideally you would remove the second instance of jQuery however you can use the `FooBar.$` member to ensure you are always working with the instance of jQuery the plugin was registered with.}{@lang xml}
   * <script src="jquery-1.12.4.js"></script>
   * <script src="your-plugin.js"></script>
   * <script src="jquery-2.2.4.js"></script>
   * <script>
   * 	FooBar.$(function($){
   * 		$(".selector").yourPlugin(); // => It works!
   * 	});
   * </script>
   */
  _.$ = $;
})(
// dependencies
jQuery,
/**
 * @summary The core namespace for the plugin containing all its code.
 * @global
 * @namespace FooBar
 * @description This plugin houses all it's code within a single `FooBar` global variable to prevent polluting the global namespace and to make accessing its various members simpler.
 * @example {@caption As this namespace is registered as a global on the `window` object, it can be accessed using the `window.` prefix.}
 * var fm = window.FooBar;
 * @example {@caption Or without it.}
 * var fm = FooBar;
 * @example {@caption When using this namespace I would recommend aliasing it to a short variable name such as `fm` or as used internally `_`.}
 * // alias the FooBar namespace
 * var _ = FooBar;
 * @example {@caption This is not required but lets us write less code and allows the alias to be minified by compressors like UglifyJS. How you choose to alias the namespace is up to you. You can use the simple `var` method as seen above or supply the namespace as a parameter when creating a new scope as seen below.}
 * // create a new scope to work in passing the namespace as a parameter
 * (function(_){
 *
 * 	// use `_.` to access members and methods
 *
 * })(FooBar);
 */
window.FooBar = window.FooBar || {});
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}

/*!
* FooBar.utils - Contains common utility methods and classes used in our plugins.
* @version 1.0.0
* @link https://github.com/steveush/foo-utils#readme
* @copyright Steve Usher 2021
* @license Released under the GPL-3.0 license.
*/

/**
 * @file This creates the global FooBar.utils namespace
 */
(function ($) {
  if (!$) {
    console.warn('jQuery must be included in the page prior to the FooBar.utils library.');
    return;
  }
  function __exists() {
    try {
      return !!window.FooBar.utils; // does the namespace already exist?
    } catch (err) {
      return false;
    }
  }
  if (!__exists()) {
    /**
     * @summary This namespace contains common utility methods and code shared between our plugins.
     * @global
     * @namespace FooBar.utils
     * @description This namespace relies on jQuery being included in the page prior to it being loaded.
     */
    window.FooBar.utils = {
      /**
       * @summary A reference to the jQuery object the library is registered with.
       * @memberof FooBar.utils.
       * @name $
       * @type {jQuery}
       * @description This is used internally for all jQuery operations to help work around issues where multiple jQuery libraries have been included in a single page.
       * @example {@caption The following shows the issue when multiple jQuery's are included in a single page.}{@lang html}
       * <script src="jquery-1.12.4.js"></script>
       * <script src="my-plugin.js"></script>
       * <script src="jquery-2.2.4.js"></script>
       * <script>
       * 	jQuery(function($){
       * 		$(".selector").myPlugin(); // => This would throw a TypeError: $(...).myPlugin is not a function
       * 	});
       * </script>
       * @example {@caption The reason the above throws an error is that the `$.fn.myPlugin` function is registered to the first instance of jQuery in the page however the instance used to create the ready callback and actually try to execute `$(...).myPlugin()` is the second. To resolve this issue ideally you would remove the second instance of jQuery however you can use the `FooBar.utils.$` member to ensure you are always working with the instance of jQuery the library was registered with.}{@lang html}
       * <script src="jquery-1.12.4.js"></script>
       * <script src="my-plugin.js"></script>
       * <script src="jquery-2.2.4.js"></script>
       * <script>
       * 	FooBar.utils.$(function($){
       * 		$(".selector").myPlugin(); // => It works!
       * 	});
       * </script>
       */
      $: $,
      /**
       * @summary The version of this library.
       * @memberof FooBar.utils.
       * @name version
       * @type {string}
       */
      version: '1.0.0'
    };
  } // at this point there will always be a FooBar.utils namespace registered to the global scope.
})(jQuery);
(function ($, _) {
  // only register methods if this version is the current version
  if (_.version !== '1.0.0') return;
  /**
   * @summary Contains common type checking utility methods.
   * @memberof FooBar.utils.
   * @namespace is
   */

  _.is = {};
  /**
   * @summary Checks if the `value` is an array.
   * @memberof FooBar.utils.is.
   * @function array
   * @param {*} value - The value to check.
   * @returns {boolean} `true` if the supplied `value` is an array.
   * @example {@run true}
   * // alias the FooBar.utils.is namespace
   * var _is = FooBar.utils.is;
   *
   * console.log( _is.array( [] ) ); // => true
   * console.log( _is.array( null ) ); // => false
   * console.log( _is.array( 123 ) ); // => false
   * console.log( _is.array( "" ) ); // => false
   */

  _.is.array = function (value) {
    return '[object Array]' === Object.prototype.toString.call(value);
  };
  /**
   * @summary Checks if the `value` is a boolean.
   * @memberof FooBar.utils.is.
   * @function boolean
   * @param {*} value - The value to check.
   * @returns {boolean} `true` if the supplied `value` is a boolean.
   * @example {@run true}
   * // alias the FooBar.utils.is namespace
   * var _is = FooBar.utils.is;
   *
   * console.log( _is.boolean( true ) ); // => true
   * console.log( _is.boolean( false ) ); // => true
   * console.log( _is.boolean( "true" ) ); // => false
   * console.log( _is.boolean( "false" ) ); // => false
   * console.log( _is.boolean( 1 ) ); // => false
   * console.log( _is.boolean( 0 ) ); // => false
   */

  _.is.boolean = function (value) {
    return '[object Boolean]' === Object.prototype.toString.call(value);
  };
  /**
   * @summary Checks if the `value` is an element.
   * @memberof FooBar.utils.is.
   * @function element
   * @param {*} value - The value to check.
   * @returns {boolean} `true` if the supplied `value` is an element.
   * @example {@run true}
   * // alias the FooBar.utils.is namespace
   * var _is = FooBar.utils.is,
   * 	// create an element to test
   * 	el = document.createElement("span");
   *
   * console.log( _is.element( el ) ); // => true
   * console.log( _is.element( $(el) ) ); // => false
   * console.log( _is.element( null ) ); // => false
   * console.log( _is.element( {} ) ); // => false
   */

  _.is.element = function (value) {
    return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === 'object' ? value instanceof HTMLElement : !!value && _typeof(value) === 'object' && value.nodeType === 1 && typeof value.nodeName === 'string';
  };
  /**
   * @summary Checks if the `value` is empty.
   * @memberof FooBar.utils.is.
   * @function empty
   * @param {*} value - The value to check.
   * @returns {boolean} `true` if the supplied `value` is empty.
   * @description The following values are considered to be empty by this method:
   *
   * <ul><!--
   * --><li>`""`			- An empty string</li><!--
   * --><li>`0`			- 0 as an integer</li><!--
   * --><li>`0.0`		- 0 as a float</li><!--
   * --><li>`[]`			- An empty array</li><!--
   * --><li>`{}`			- An empty object</li><!--
   * --><li>`$()`		- An empty jQuery object</li><!--
   * --><li>`false`</li><!--
   * --><li>`null`</li><!--
   * --><li>`undefined`</li><!--
   * --></ul>
   * @example {@run true}
   * // alias the FooBar.utils.is namespace
   * var _is = FooBar.utils.is;
   *
   * console.log( _is.empty( undefined ) ); // => true
   * console.log( _is.empty( null ) ); // => true
   * console.log( _is.empty( 0 ) ); // => true
   * console.log( _is.empty( 0.0 ) ); // => true
   * console.log( _is.empty( "" ) ); // => true
   * console.log( _is.empty( [] ) ); // => true
   * console.log( _is.empty( {} ) ); // => true
   * console.log( _is.empty( 1 ) ); // => false
   * console.log( _is.empty( 0.1 ) ); // => false
   * console.log( _is.empty( "one" ) ); // => false
   * console.log( _is.empty( ["one"] ) ); // => false
   * console.log( _is.empty( { "name": "My Object" } ) ); // => false
   */

  _.is.empty = function (value) {
    if (_.is.undef(value) || value === null) return true;
    if (_.is.number(value) && value === 0) return true;
    if (_.is.boolean(value) && value === false) return true;
    if (_.is.string(value) && value.length === 0) return true;
    if (_.is.array(value) && value.length === 0) return true;
    if (_.is.jq(value) && value.length === 0) return true;
    if (_.is.hash(value)) {
      for (var prop in value) {
        if (value.hasOwnProperty(prop)) return false;
      }
      return true;
    }
    return false;
  };
  /**
   * @summary Checks if the `value` is an error.
   * @memberof FooBar.utils.is.
   * @function error
   * @param {*} value - The value to check.
   * @returns {boolean} `true` if the supplied `value` is an error.
   * @example {@run true}
   * // alias the FooBar.utils.is namespace
   * var _is = FooBar.utils.is,
   * 	// create some errors to test
   * 	err1 = new Error("err1"),
   * 	err2 = new SyntaxError("err2");
   *
   * console.log( _is.error( err1 ) ); // => true
   * console.log( _is.error( err2 ) ); // => true
   * console.log( _is.error( null ) ); // => false
   * console.log( _is.error( 123 ) ); // => false
   * console.log( _is.error( "" ) ); // => false
   * console.log( _is.error( {} ) ); // => false
   * console.log( _is.error( [] ) ); // => false
   */

  _.is.error = function (value) {
    return '[object Error]' === Object.prototype.toString.call(value);
  };
  /**
   * @summary Checks if the `value` is a function.
   * @memberof FooBar.utils.is.
   * @function fn
   * @param {*} value - The value to check.
   * @returns {boolean} `true` if the supplied `value` is a function.
   * @example {@run true}
   * // alias the FooBar.utils.is namespace
   * var _is = FooBar.utils.is,
   * 	// create a function to test
   * 	func = function(){};
   *
   * console.log( _is.fn( func ) ); // => true
   * console.log( _is.fn( null ) ); // => false
   * console.log( _is.fn( 123 ) ); // => false
   * console.log( _is.fn( "" ) ); // => false
   */

  _.is.fn = function (value) {
    return value === window.alert || '[object Function]' === Object.prototype.toString.call(value);
  };
  /**
   * @summary Checks if the `value` is a hash.
   * @memberof FooBar.utils.is.
   * @function hash
   * @param {*} value - The value to check.
   * @returns {boolean} `true` if the supplied `value` is a hash.
   * @example {@run true}
   * // alias the FooBar.utils.is namespace
   * var _is = FooBar.utils.is;
   *
   * console.log( _is.hash( {"some": "prop"} ) ); // => true
   * console.log( _is.hash( {} ) ); // => true
   * console.log( _is.hash( window ) ); // => false
   * console.log( _is.hash( document ) ); // => false
   * console.log( _is.hash( "" ) ); // => false
   * console.log( _is.hash( 123 ) ); // => false
   */

  _.is.hash = function (value) {
    return _.is.object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
  };
  /**
   * @summary Checks if the `value` is a jQuery object.
   * @memberof FooBar.utils.is.
   * @function jq
   * @param {*} value - The value to check.
   * @returns {boolean} `true` if the supplied `value` is a jQuery object.
   * @example {@run true}
   * // alias the FooBar.utils.is namespace
   * var _is = FooBar.utils.is,
   * 	// create an element to test
   * 	el = document.createElement("span");
   *
   * console.log( _is.jq( $(el) ) ); // => true
   * console.log( _is.jq( $() ) ); // => true
   * console.log( _is.jq( el ) ); // => false
   * console.log( _is.jq( {} ) ); // => false
   * console.log( _is.jq( null ) ); // => false
   * console.log( _is.jq( 123 ) ); // => false
   * console.log( _is.jq( "" ) ); // => false
   */

  _.is.jq = function (value) {
    return !_.is.undef($) && value instanceof $;
  };
  /**
   * @summary Checks if the `value` is a number.
   * @memberof FooBar.utils.is.
   * @function number
   * @param {*} value - The value to check.
   * @returns {boolean}
   * @example {@run true}
   * // alias the FooBar.utils.is namespace
   * var _is = FooBar.utils.is;
   *
   * console.log( _is.number( 123 ) ); // => true
   * console.log( _is.number( undefined ) ); // => false
   * console.log( _is.number( null ) ); // => false
   * console.log( _is.number( "" ) ); // => false
   */

  _.is.number = function (value) {
    return '[object Number]' === Object.prototype.toString.call(value) && !isNaN(value);
  };
  /**
   * @summary Checks if the `value` is an object.
   * @memberof FooBar.utils.is.
   * @function object
   * @param {*} value - The value to check.
   * @returns {boolean} `true` if the supplied `value` is an object.
   * @example {@run true}
   * // alias the FooBar.utils.is namespace
   * var _is = FooBar.utils.is;
   *
   * console.log( _is.object( {"some": "prop"} ) ); // => true
   * console.log( _is.object( {} ) ); // => true
   * console.log( _is.object( window ) ); // => true
   * console.log( _is.object( document ) ); // => true
   * console.log( _is.object( undefined ) ); // => false
   * console.log( _is.object( null ) ); // => false
   * console.log( _is.object( "" ) ); // => false
   * console.log( _is.object( 123 ) ); // => false
   */

  _.is.object = function (value) {
    return '[object Object]' === Object.prototype.toString.call(value) && !_.is.undef(value) && value !== null;
  };
  /**
   * @summary Checks if the `value` is a promise.
   * @memberof FooBar.utils.is.
   * @function promise
   * @param {*} value - The object to check.
   * @returns {boolean} `true` if the supplied `value` is an object.
   * @description This is a simple check to determine if an object is a jQuery promise object. It simply checks the object has a `then` and `promise` function defined.
   *
   * The promise object is created as an object literal inside of `jQuery.Deferred`, it has no prototype, nor any other truly unique properties that could be used to distinguish it.
   *
   * This method should be a little more accurate than the internal jQuery one that simply checks for a `promise` function.
   * @example {@run true}
   * // alias the FooBar.utils.is namespace
   * var _is = FooBar.utils.is;
   *
   * console.log( _is.promise( $.Deferred() ) ); // => true
   * console.log( _is.promise( {} ) ); // => false
   * console.log( _is.promise( undefined ) ); // => false
   * console.log( _is.promise( null ) ); // => false
   * console.log( _is.promise( "" ) ); // => false
   * console.log( _is.promise( 123 ) ); // => false
   */

  _.is.promise = function (value) {
    return _.is.object(value) && _.is.fn(value.then) && _.is.fn(value.promise);
  };
  /**
   * @summary Checks if the `value` is a valid CSS length.
   * @memberof FooBar.utils.is.
   * @function size
   * @param {*} value - The value to check.
   * @returns {boolean} `true` if the `value` is a number or CSS length.
   * @example {@run true}
   * // alias the FooBar.utils.is namespace
   * var _is = FooBar.utils.is;
   *
   * console.log( _is.size( 80 ) ); // => true
   * console.log( _is.size( "80px" ) ); // => true
   * console.log( _is.size( "80em" ) ); // => true
   * console.log( _is.size( "80%" ) ); // => true
   * console.log( _is.size( {} ) ); // => false
   * console.log( _is.size( undefined ) ); // => false
   * console.log( _is.size( null ) ); // => false
   * console.log( _is.size( "" ) ); // => false
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/length|&lt;length&gt; - CSS | MDN} for more information on CSS length values.
   */

  _.is.size = function (value) {
    if (!(_.is.string(value) && !_.is.empty(value)) && !_.is.number(value)) return false;
    return /^(auto|none|(?:[\d.]*)+?(?:%|px|mm|q|cm|in|pt|pc|em|ex|ch|rem|vh|vw|vmin|vmax)?)$/.test(value);
  };
  /**
   * @summary Checks if the `value` is a string.
   * @memberof FooBar.utils.is.
   * @function string
   * @param {*} value - The value to check.
   * @returns {boolean} `true` if the `value` is a string.
   * @example {@run true}
   * // alias the FooBar.utils.is namespace
   * var _is = FooBar.utils.is;
   *
   * console.log( _is.string( "" ) ); // => true
   * console.log( _is.string( undefined ) ); // => false
   * console.log( _is.string( null ) ); // => false
   * console.log( _is.string( 123 ) ); // => false
   */

  _.is.string = function (value) {
    return '[object String]' === Object.prototype.toString.call(value);
  };
  /**
   * @summary Checks if the `value` is `undefined`.
   * @memberof FooBar.utils.is.
   * @function undef
   * @param {*} value - The value to check is undefined.
   * @returns {boolean} `true` if the supplied `value` is `undefined`.
   * @example {@run true}
   * // alias the FooBar.utils.is namespace
   * var _is = FooBar.utils.is;
   *
   * console.log( _is.undef( undefined ) ); // => true
   * console.log( _is.undef( null ) ); // => false
   * console.log( _is.undef( 123 ) ); // => false
   * console.log( _is.undef( "" ) ); // => false
   */

  _.is.undef = function (value) {
    return typeof value === 'undefined';
  };
})(
// dependencies
FooBar.utils.$, FooBar.utils);
(function ($, _, _is) {
  // only register methods if this version is the current version
  if (_.version !== '1.0.0') return;
  /**
   * @memberof FooBar.utils.
   * @namespace fn
   * @summary Contains common function utility methods.
   */

  _.fn = {};
  var fnStr = Function.prototype.toString;
  /**
   * @summary The regular expression to test if a function uses the `this._super` method applied by the {@link FooBar.utils.fn.add} method.
   * @memberof FooBar.utils.fn.
   * @name CONTAINS_SUPER
   * @type {RegExp}
   * @default /\b_super\b/
   * @readonly
   * @description When the script is first loaded into the page this performs a quick check to see if the browser supports function decompilation. If it does the regular expression is set to match the expected `_super`, however if  function decompilation is not supported, the regular expression is set to match anything effectively making the test always return `true`.
   * @example {@run true}
   * // alias the FooBar.utils.fn namespace
   * var _fn = FooBar.utils.fn;
   *
   * // create some functions to test
   * function testFn1(){}
   * function testFn2(){
   * 	this._super();
   * }
   *
   * console.log( _fn.CONTAINS_SUPER.test( testFn1 ) ); // => false
   * console.log( _fn.CONTAINS_SUPER.test( testFn2 ) ); // => true
   *
   * // NOTE: in browsers that don't support functional decompilation both tests will return `true`
   */

  _.fn.CONTAINS_SUPER = /xyz/.test(fnStr.call(function () {
    //noinspection JSUnresolvedVariable,BadExpressionStatementJS
    xyz;
  })) ? /\b_super\b/ : /.*/;
  /**
   * @summary An empty function that does nothing. Useful for setting a default value and checking if it has changed.
   * @memberof FooBar.utils.fn.
   * @function noop
   */

  _.fn.noop = function () {};
  /**
   * @summary Adds or overrides the given method `name` on the `proto` using the supplied `fn`.
   * @memberof FooBar.utils.fn.
   * @function addOrOverride
   * @param {Object} proto - The prototype to add the method to.
   * @param {string} name - The name of the method to add, if this already exists the original will be exposed within the scope of the supplied `fn` as `this._super`.
   * @param {function} fn - The function to add to the prototype, if this is overriding an existing method you can use `this._super` to access the original within its' scope.
   * @description If the new method overrides a pre-existing one, this function will expose the overridden method as `this._super` within the new methods scope.
   *
   * This replaces having to write out the following to override a method and call its original:
   *
   * ```javascript
   * var original = MyClass.prototype.someMethod;
   * MyClass.prototype.someMethod = function(arg1, arg2){
   * 	// execute the original
   * 	original.call(this, arg1, arg2);
   * };
   * ```
   *
   * With the following:
   *
   * ```javascript
   * FooBar.utils.fn.addOrOverride( MyClass.prototype, "someMethod", function(arg1, arg2){
   * 	// execute the original
   * 	this._super(arg1, arg2);
   * });
   * ```
   *
   * This method is used by the {@link FooBar.utils.Class} to implement the inheritance of individual methods.
   * @example {@run true}
   * // alias the FooBar.utils.fn namespace
   * var _fn = FooBar.utils.fn;
   *
   * var proto = {
   * 	write: function( message ){
   * 		console.log( "Original#write: " + message );
   * 	}
   * };
   *
   * proto.write( "My message" ); // => "Original#write: My message"
   *
   * _fn.addOrOverride( proto, "write", function( message ){
   * 	message = "Override#write: " + message;
   * 	this._super( message );
   * } );
   *
   * proto.write( "My message" ); // => "Original#write: Override#write: My message"
   */

  _.fn.addOrOverride = function (proto, name, fn) {
    if (!_is.object(proto) || !_is.string(name) || _is.empty(name) || !_is.fn(fn)) return;
    var _super = proto[name],
      wrap = _is.fn(_super) && _.fn.CONTAINS_SUPER.test(fnStr.call(fn)); // only wrap the function if it overrides a method and makes use of `_super` within it's body.

    proto[name] = wrap ? function (_super, fn) {
      // create a new wrapped that exposes the original method as `_super`
      return function () {
        var tmp = this._super;
        this._super = _super;
        var ret = fn.apply(this, arguments);
        this._super = tmp;
        return ret;
      };
    }(_super, fn) : fn;
  };
  /**
   * @summary Exposes the `methods` from the `source` on the `target`.
   * @memberof FooBar.utils.fn.
   * @function expose
   * @param {Object} source - The object to expose methods from.
   * @param {Object} target - The object to expose methods on.
   * @param {String[]} methods - An array of method names to expose.
   * @param {*} [thisArg] - The value of `this` within the exposed `methods`. Defaults to the `source` object.
   */

  _.fn.expose = function (source, target, methods, thisArg) {
    if (_is.object(source) && _is.object(target) && _is.array(methods)) {
      thisArg = _is.undef(thisArg) ? source : thisArg;
      methods.forEach(function (method) {
        if (_is.string(method) && _is.fn(source[method])) {
          target[method] = source[method].bind(thisArg);
        }
      });
    }
  };
  /**
   * @summary Use the `Function.prototype.apply` method on a class constructor using the `new` keyword.
   * @memberof FooBar.utils.fn.
   * @function apply
   * @param {Object} klass - The class to create.
   * @param {Array} [args=[]] - The arguments to pass to the constructor.
   * @returns {Object} The new instance of the `klass` created with the supplied `args`.
   * @description When using the default `Function.prototype.apply` you can't use it on class constructors requiring the `new` keyword, this method allows us to do that.
   * @example {@run true}
   * // alias the FooBar.utils.fn namespace
   * var _fn = FooBar.utils.fn;
   *
   * // create a class to test with
   * function Test( name, value ){
   * 	if ( !( this instanceof Test )){
   * 		console.log( "Test instantiated without the `new` keyword." );
   * 		return;
   * 	}
   * 	console.log( "Test: name = " + name + ", value = " + value );
   * }
   *
   * Test.apply( Test, ["My name", "My value"] ); // => "Test instantiated without the `new` keyword."
   * _fn.apply( Test, ["My name", "My value"] ); // => "Test: name = My name, value = My value"
   */

  _.fn.apply = function (klass, args) {
    args.unshift(klass);
    return new (Function.prototype.bind.apply(klass, args))();
  };
  /**
   * @summary Converts the default `arguments` object into a proper array.
   * @memberof FooBar.utils.fn.
   * @function arg2arr
   * @param {IArguments} args - The arguments object to create an array from.
   * @returns {Array}
   * @description This method is simply a replacement for calling `Array.prototype.slice.call()` to create an array from an `arguments` object.
   * @example {@run true}
   * // alias the FooBar.utils.fn namespace
   * var _fn = FooBar.utils.fn;
   *
   * function callMe(){
   * 	var args = _fn.arg2arr(arguments);
   * 	console.log( arguments instanceof Array ); // => false
   * 	console.log( args instanceof Array ); // => true
   * 	console.log( args ); // => [ "arg1", "arg2" ]
   * }
   *
   * callMe("arg1", "arg2");
   */

  _.fn.arg2arr = function (args) {
    return Array.prototype.slice.call(args);
  };
  /**
   * @summary Debounce the `fn` by the supplied `time`.
   * @memberof FooBar.utils.fn.
   * @function debounce
   * @param {function} fn - The function to debounce.
   * @param {number} time - The time in milliseconds to delay execution.
   * @returns {function}
   * @description This returns a wrapped version of the `fn` which delays its' execution by the supplied `time`. Additional calls to the function will extend the delay until the `time` expires.
   */

  _.fn.debounce = function (fn, time) {
    var timeout;
    return function () {
      var ctx = this,
        args = _.fn.arg2arr(arguments);
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        fn.apply(ctx, args);
      }, time);
    };
  };
  /**
   * @summary Throttles the `fn` by the supplied `time`.
   * @memberof FooBar.utils.fn.
   * @function throttle
   * @param {function} fn - The function to throttle.
   * @param {number} time - The time in milliseconds to delay execution.
   * @returns {function}
   * @description This returns a wrapped version of the `fn` which ensures it's executed only once every `time` milliseconds. The first call to the function will be executed, after that only the last of any additional calls will be executed once the `time` expires.
   */

  _.fn.throttle = function (fn, time) {
    var last, timeout;
    return function () {
      var ctx = this,
        args = _.fn.arg2arr(arguments);
      if (!last) {
        fn.apply(ctx, args);
        last = Date.now();
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          if (Date.now() - last >= time) {
            fn.apply(ctx, args);
            last = Date.now();
          }
        }, time - (Date.now() - last));
      }
    };
  };
  /**
   * @summary A resolved promise object.
   * @memberof FooBar.utils.fn.
   * @name resolved
   * @type {Promise}
   */

  _.fn.resolved = $.Deferred().resolve().promise();
  /**
   * @summary A rejected promise object.
   * @memberof FooBar.utils.fn.
   * @name rejected
   * @type {Promise}
   */

  _.fn.rejected = $.Deferred().reject().promise();
  /**
   * @summary Return a promise rejected using the supplied args.
   * @memberof FooBar.utils.fn.
   * @function reject
   * @param {*} [arg1] - The first argument to reject the promise with.
   * @param {...*} [argN] - Any additional arguments to reject the promise with.
   * @returns {Promise}
   */

  _.fn.reject = function (arg1, argN) {
    var def = $.Deferred(),
      args = _.fn.arg2arr(arguments);
    return def.reject.apply(def, args).promise();
  };
  /**
   * @summary Return a promise resolved using the supplied args.
   * @memberof FooBar.utils.fn.
   * @function resolve
   * @param {*} [arg1] - The first argument to resolve the promise with.
   * @param {...*} [argN] - Any additional arguments to resolve the promise with.
   * @returns {Promise}
   */

  _.fn.resolve = function (arg1, argN) {
    var def = $.Deferred(),
      args = _.fn.arg2arr(arguments);
    return def.resolve.apply(def, args).promise();
  };
  /**
   * @summary Return a promise rejected using the supplied args.
   * @memberof FooBar.utils.fn.
   * @function rejectWith
   * @param {*} thisArg - The value of `this` within the promises callbacks.
   * @param {*} [arg1] - The first argument to reject the promise with.
   * @param {...*} [argN] - Any additional arguments to reject the promise with.
   * @returns {Promise}
   */

  _.fn.rejectWith = function (thisArg, arg1, argN) {
    var def = $.Deferred(),
      args = _.fn.arg2arr(arguments);
    args.shift(); // remove the thisArg

    return def.rejectWith(thisArg, args).promise();
  };
  /**
   * @summary Return a promise resolved using the supplied args.
   * @memberof FooBar.utils.fn.
   * @function resolveWith
   * @param {*} thisArg - The value of `this` within the promises callbacks.
   * @param {*} [arg1] - The first argument to resolve the promise with.
   * @param {...*} [argN] - Any additional arguments to resolve the promise with.
   * @returns {Promise}
   */

  _.fn.resolveWith = function (thisArg, arg1, argN) {
    var def = $.Deferred(),
      args = _.fn.arg2arr(arguments);
    args.shift(); // remove the thisArg

    return def.resolveWith(thisArg, args).promise();
  };
  /**
   * @summary Waits for all promises to complete before resolving with an array containing the return value of each. This method will reject immediately with the first rejection message or error.
   * @memberof FooBar.utils.fn.
   * @function all
   * @param {Promise[]} promises - The array of promises to wait for.
   * @returns {Promise}
   */

  _.fn.all = function (promises) {
    var d = $.Deferred(),
      results = [];
    if (_is.array(promises) && promises.length > 0) {
      (function () {
        /**
         * Pushes the arguments into the results array at the supplied index.
         * @ignore
         * @param {number} index
         * @param {Array} args
         */
        var pushResult = function pushResult(index, args) {
          if (rejected) return;
          results[index] = args.length === 0 ? undefined : args.length === 1 ? args[0] : args;
          remaining--;
          if (!remaining) d.resolve(results);
        };
        var remaining = promises.length,
          rejected = false;
        var i = 0,
          l = promises.length;
        var _loop = function _loop() {
          if (rejected) return "break";
          var j = i; // hold a scoped reference that can be used in the async callbacks

          if (_is.promise(promises[j])) {
            promises[j].then(function () {
              pushResult(j, _.fn.arg2arr(arguments));
            }, function () {
              if (rejected) return;
              rejected = true;
              d.reject.apply(d, _.fn.arg2arr(arguments));
            });
          } else {
            // if we were supplied something that was not a promise then just add it as a fulfilled result
            pushResult(j, [promises[j]]);
          }
        };
        for (; i < l; i++) {
          var _ret = _loop();
          if (_ret === "break") break;
        }
      })();
    } else {
      d.resolve(results);
    }
    return d.promise();
  };
  /**
   * @summary Waits for all promises to complete before resolving with an array containing the outcome of each.
   * @memberof FooBar.utils.fn.
   * @function allSettled
   * @param {Promise[]} promises - The array of promises to wait for.
   * @returns {Promise}
   */

  _.fn.allSettled = function (promises) {
    var d = $.Deferred(),
      results = [];
    if (_is.array(promises) && promises.length > 0) {
      (function () {
        /**
         * Sets the value in the results array using the status and args.
         * @ignore
         * @param {number} index
         * @param {string} status
         * @param {Array} args
         */
        var setResult = function setResult(index, status, args) {
          results[index] = {
            status: status
          };
          if (args.length > 0) {
            var prop = status === "rejected" ? "reason" : "value";
            results[index][prop] = args.length === 1 ? args[0] : args;
          }
          remaining--;
          if (!remaining) d.resolve(results);
        };
        var remaining = promises.length;
        var i = 0,
          l = promises.length;
        var _loop2 = function _loop2() {
          var j = i; // hold a scoped reference that can be used in the async callbacks

          if (_is.promise(promises[j])) {
            promises[j].then(function () {
              setResult(j, "fulfilled", _.fn.arg2arr(arguments));
            }, function () {
              setResult(j, "rejected", _.fn.arg2arr(arguments));
            });
          } else {
            // if we were supplied something that was not a promise then just add it as a fulfilled result
            setResult(j, "fulfilled", [promises[j]]);
          }
        };
        for (; i < l; i++) {
          _loop2();
        }
      })();
    } else {
      d.resolve(results);
    }
    return d.promise();
  };
})(
// dependencies
FooBar.utils.$, FooBar.utils, FooBar.utils.is);
(function (_, _is) {
  // only register methods if this version is the current version
  if (_.version !== '1.0.0') return;
  /**
   * @summary Contains common url utility methods.
   * @memberof FooBar.utils.
   * @namespace url
   */

  _.url = {}; // used for parsing a url into it's parts.

  var _a = document.createElement('a');
  /**
   * @summary Parses the supplied url into an object containing it's component parts.
   * @memberof FooBar.utils.url.
   * @function parts
   * @param {string} url - The url to parse.
   * @returns {FooBar.utils.url~Parts}
   * @example {@run true}
   * // alias the FooBar.utils.url namespace
   * var _url = FooBar.utils.url;
   *
   * console.log( _url.parts( "http://example.com/path/?param=true#something" ) ); // => {"hash":"#something", ...}
   */

  _.url.parts = function (url) {
    _a.href = url;
    var port = _a.port ? _a.port : ["http:", "https:"].indexOf(_a.protocol) !== -1 ? _a.protocol === "https:" ? "443" : "80" : "",
      host = _a.hostname + (port ? ":" + port : ""),
      origin = _a.origin ? _a.origin : _a.protocol + "//" + host,
      pathname = _a.pathname.slice(0, 1) === "/" ? _a.pathname : "/" + _a.pathname;
    return {
      hash: _a.hash,
      host: host,
      hostname: _a.hostname,
      href: _a.href,
      origin: origin,
      pathname: pathname,
      port: port,
      protocol: _a.protocol,
      search: _a.search
    };
  };
  /**
   * @summary Given a <code>url</code> that could be relative or full this ensures a full url is returned.
   * @memberof FooBar.utils.url.
   * @function full
   * @param {string} url - The url to ensure is full.
   * @returns {?string} `null` if the given `path` is not a string or empty.
   * @description Given a full url this will simply return it however if given a relative url this will create a full url using the current location to fill in the blanks.
   * @example {@run true}
   * // alias the FooBar.utils.url namespace
   * var _url = FooBar.utils.url;
   *
   * console.log( _url.full( "http://example.com/path/" ) ); // => "http://example.com/path/"
   * console.log( _url.full( "/path/" ) ); // => "{protocol}//{host}/path/"
   * console.log( _url.full( "path/" ) ); // => "{protocol}//{host}/{pathname}/path/"
   * console.log( _url.full( "../path/" ) ); // => "{protocol}//{host}/{calculated pathname}/path/"
   * console.log( _url.full() ); // => null
   * console.log( _url.full( 123 ) ); // => null
   */

  _.url.full = function (url) {
    if (!_is.string(url) || _is.empty(url)) return null;
    _a.href = url;
    return _a.href;
  };
  /**
   * @summary Gets or sets a parameter in the given <code>search</code> string.
   * @memberof FooBar.utils.url.
   * @function param
   * @param {string} search - The search string to use (usually `location.search`).
   * @param {string} key - The key of the parameter.
   * @param {?string} [value] - The value to set for the parameter. If not provided the current value for the `key` is returned.
   * @returns {?string} The value of the `key` in the given `search` string if no `value` is supplied or `null` if the `key` does not exist.
   * @returns {string} A modified `search` string if a `value` is supplied.
   * @example <caption>Shows how to retrieve a parameter value from a search string.</caption>{@run true}
   * // alias the FooBar.utils.url namespace
   * var _url = FooBar.utils.url,
   * 	// create a search string to test
   * 	search = "?wmode=opaque&autoplay=1";
   *
   * console.log( _url.param( search, "wmode" ) ); // => "opaque"
   * console.log( _url.param( search, "autoplay" ) ); // => "1"
   * console.log( _url.param( search, "nonexistent" ) ); // => null
   * @example <caption>Shows how to set a parameter value in the given search string.</caption>{@run true}
   * // alias the FooBar.utils.url namespace
   * var _url = FooBar.utils.url,
   * 	// create a search string to test
   * 	search = "?wmode=opaque&autoplay=1";
   *
   * console.log( _url.param( search, "wmode", "window" ) ); // => "?wmode=window&autoplay=1"
   * console.log( _url.param( search, "autoplay", "0" ) ); // => "?wmode=opaque&autoplay=0"
   * console.log( _url.param( search, "v", "2" ) ); // => "?wmode=opaque&autoplay=1&v=2"
   */

  _.url.param = function (search, key, value) {
    if (!_is.string(search) || !_is.string(key) || _is.empty(key)) return search;
    var regex, match, result, param;
    if (_is.undef(value)) {
      regex = new RegExp('[?|&]' + key + '=([^&;]+?)(&|#|;|$)'); // regex to match the key and it's value but only capture the value

      match = regex.exec(search) || ["", ""]; // match the param otherwise return an empty string match

      result = match[1].replace(/\+/g, '%20'); // replace any + character's with spaces

      return _is.string(result) && !_is.empty(result) ? decodeURIComponent(result) : null; // decode the result otherwise return null
    }
    if (_is.empty(value)) {
      regex = new RegExp('^([^#]*\?)(([^#]*)&)?' + key + '(\=[^&#]*)?(&|#|$)');
      result = search.replace(regex, '$1$3$5').replace(/^([^#]*)((\?)&|\?(#|$))/, '$1$3$4');
    } else {
      regex = new RegExp('([?&])' + key + '[^&]*'); // regex to match the key and it's current value but only capture the preceding ? or & char

      param = key + '=' + encodeURIComponent(value);
      result = search.replace(regex, '$1' + param); // replace any existing instance of the key with the new value
      // If nothing was replaced, then add the new param to the end

      if (result === search && !regex.test(result)) {
        // if no replacement occurred and the parameter is not currently in the result then add it
        result += (result.indexOf("?") !== -1 ? '&' : '?') + param;
      }
    }
    return result;
  }; //######################
  //## Type Definitions ##
  //######################

  /**
   * @summary A plain JavaScript object returned by the {@link FooBar.utils.url.parts} method.
   * @typedef {Object} FooBar.utils.url~Parts
   * @property {string} hash - A string containing a `#` followed by the fragment identifier of the URL.
   * @property {string} host - A string containing the host, that is the hostname, a `:`, and the port of the URL.
   * @property {string} hostname - A string containing the domain of the URL.
   * @property {string} href - A string containing the entire URL.
   * @property {string} origin - A string containing the canonical form of the origin of the specific location.
   * @property {string} pathname - A string containing an initial `/` followed by the path of the URL.
   * @property {string} port - A string containing the port number of the URL.
   * @property {string} protocol - A string containing the protocol scheme of the URL, including the final `:`.
   * @property {string} search - A string containing a `?` followed by the parameters of the URL. Also known as "querystring".
   * @see {@link FooBar.utils.url.parts} for example usage.
   */
})(
// dependencies
FooBar.utils, FooBar.utils.is);
(function (_, _is, _fn) {
  // only register methods if this version is the current version
  if (_.version !== '1.0.0') return;
  /**
   * @summary Contains common string utility methods.
   * @memberof FooBar.utils.
   * @namespace str
   */

  _.str = {};
  /**
   * @summary Removes whitespace from both ends of the target string.
   * @memberof FooBar.utils.str.
   * @function trim
   * @param {string} target - The string to trim.
   * @returns {string|null} Returns `null` if the supplied target is not a string.
   */

  _.str.trim = function (target) {
    return _is.string(target) ? target.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') : null;
  };
  /**
   * @summary Converts the given `target` to camel case.
   * @memberof FooBar.utils.str.
   * @function camel
   * @param {string} target - The string to camel case.
   * @returns {string}
   * @example {@run true}
   * // alias the FooBar.utils.str namespace
   * var _str = FooBar.utils.str;
   *
   * console.log( _str.camel( "max-width" ) ); // => "maxWidth"
   * console.log( _str.camel( "max--width" ) ); // => "maxWidth"
   * console.log( _str.camel( "max Width" ) ); // => "maxWidth"
   * console.log( _str.camel( "Max_width" ) ); // => "maxWidth"
   * console.log( _str.camel( "MaxWidth" ) ); // => "maxWidth"
   * console.log( _str.camel( "Abbreviations like CSS are left intact" ) ); // => "abbreviationsLikeCSSAreLeftIntact"
   */

  _.str.camel = function (target) {
    if (!_is.string(target)) return target;
    if (target.toUpperCase() === target) return target.toLowerCase();
    return target.replace(/^([A-Z])|[-\s_]+(\w)/g, function (match, p1, p2) {
      if (_is.string(p2)) return p2.toUpperCase();
      return p1.toLowerCase();
    });
  };
  /**
   * @summary Converts the given `target` to kebab case. Non-alphanumeric characters are converted to `-`.
   * @memberof FooBar.utils.str.
   * @function kebab
   * @param {string} target - The string to kebab case.
   * @returns {string}
   * @example {@run true}
   * // alias the FooBar.utils.str namespace
   * var _str = FooBar.utils.str;
   *
   * console.log( _str.kebab( "max-width" ) ); // => "max-width"
   * console.log( _str.kebab( "max--width" ) ); // => "max-width"
   * console.log( _str.kebab( "max Width" ) ); // => "max-width"
   * console.log( _str.kebab( "Max_width" ) ); // => "max-width"
   * console.log( _str.kebab( "MaxWidth" ) ); // => "max-width"
   * console.log( _str.kebab( "Non-alphanumeric ch@racters are converted to dashes!" ) ); // => "non-alphanumeric-ch-racters-are-converted-to-dashes"
   */

  _.str.kebab = function (target) {
    if (!_is.string(target)) return target;
    return target.match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g).filter(Boolean).map(function (x) {
      return x.toLowerCase();
    }).join('-');
  };
  /**
   * @summary Checks if the `target` contains the given `substr`.
   * @memberof FooBar.utils.str.
   * @function contains
   * @param {string} target - The string to check.
   * @param {string} substr - The string to check for.
   * @param {boolean} [ignoreCase=false] - Whether or not to ignore casing when performing the check.
   * @returns {boolean} `true` if the `target` contains the given `substr`.
   * @example {@run true}
   * // alias the FooBar.utils.str namespace
   * var _str = FooBar.utils.str,
   * 	// create a string to test
   * 	target = "To be, or not to be, that is the question.";
   *
   * console.log( _str.contains( target, "To be" ) ); // => true
   * console.log( _str.contains( target, "question" ) ); // => true
   * console.log( _str.contains( target, "no" ) ); // => true
   * console.log( _str.contains( target, "nonexistent" ) ); // => false
   * console.log( _str.contains( target, "TO BE" ) ); // => false
   * console.log( _str.contains( target, "TO BE", true ) ); // => true
   */

  _.str.contains = function (target, substr, ignoreCase) {
    if (!_is.string(target) || _is.empty(target) || !_is.string(substr) || _is.empty(substr)) return false;
    return substr.length <= target.length && (!!ignoreCase ? target.toUpperCase().indexOf(substr.toUpperCase()) : target.indexOf(substr)) !== -1;
  };
  /**
   * @summary Checks if the `target` contains the given `word`.
   * @memberof FooBar.utils.str.
   * @function containsWord
   * @param {string} target - The string to check.
   * @param {string} word - The word to check for.
   * @param {boolean} [ignoreCase=false] - Whether or not to ignore casing when performing the check.
   * @returns {boolean} `true` if the `target` contains the given `word`.
   * @description This method differs from {@link FooBar.utils.str.contains} in that it searches for whole words by splitting the `target` string on word boundaries (`\b`) and then comparing the individual parts.
   * @example {@run true}
   * // alias the FooBar.utils.str namespace
   * var _str = FooBar.utils.str,
   * 	// create a string to test
   * 	target = "To be, or not to be, that is the question.";
   *
   * console.log( _str.containsWord( target, "question" ) ); // => true
   * console.log( _str.containsWord( target, "no" ) ); // => false
   * console.log( _str.containsWord( target, "NOT" ) ); // => false
   * console.log( _str.containsWord( target, "NOT", true ) ); // => true
   * console.log( _str.containsWord( target, "nonexistent" ) ); // => false
   */

  _.str.containsWord = function (target, word, ignoreCase) {
    if (!_is.string(target) || _is.empty(target) || !_is.string(word) || _is.empty(word) || target.length < word.length) return false;
    var parts = target.split(/\W/);
    var i = 0,
      len = parts.length;
    for (; i < len; i++) {
      if (ignoreCase ? parts[i].toUpperCase() === word.toUpperCase() : parts[i] === word) return true;
    }
    return false;
  };
  /**
   * @summary Checks if the `target` ends with the given `substr`.
   * @memberof FooBar.utils.str.
   * @function endsWith
   * @param {string} target - The string to check.
   * @param {string} substr - The substr to check for.
   * @returns {boolean} `true` if the `target` ends with the given `substr`.
   * @example {@run true}
   * // alias the FooBar.utils.str namespace
   * var _str = FooBar.utils.str;
   *
   * console.log( _str.endsWith( "something", "g" ) ); // => true
   * console.log( _str.endsWith( "something", "ing" ) ); // => true
   * console.log( _str.endsWith( "something", "no" ) ); // => false
   */

  _.str.endsWith = function (target, substr) {
    if (!_is.string(target) || !_is.string(substr) || substr.length > target.length) return false;
    return target.slice(target.length - substr.length) === substr;
  };
  /**
   * @summary Checks if the `target` starts with the given `substr`.
   * @memberof FooBar.utils.str.
   * @function startsWith
   * @param {string} target - The string to check.
   * @param {string} substr - The substr to check for.
   * @returns {boolean} `true` if the `target` starts with the given `substr`.
   * @example {@run true}
   * // alias the FooBar.utils.str namespace
   * var _str = FooBar.utils.str;
   *
   * console.log( _str.startsWith( "something", "s" ) ); // => true
   * console.log( _str.startsWith( "something", "some" ) ); // => true
   * console.log( _str.startsWith( "something", "no" ) ); // => false
   */

  _.str.startsWith = function (target, substr) {
    if (_is.empty(target) || _is.empty(substr)) return false;
    return target.slice(0, substr.length) === substr;
  };
  /**
   * @summary Escapes the `target` for use in a regular expression.
   * @memberof FooBar.utils.str.
   * @function escapeRegExp
   * @param {string} target - The string to escape.
   * @returns {string}
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
   */

  _.str.escapeRegExp = function (target) {
    if (!_is.string(target)) return target;
    return target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };
  /**
   * @summary Generates a 32 bit FNV-1a hash from the given `target`.
   * @memberof FooBar.utils.str.
   * @function fnv1a
   * @param {string} target - The string to generate a hash from.
   * @returns {?number} `null` if the `target` is not a string or empty otherwise a 32 bit FNV-1a hash.
   * @example {@run true}
   * // alias the FooBar.utils.str namespace
   * var _str = FooBar.utils.str;
   *
   * console.log( _str.fnv1a( "Some string to generate a hash for." ) ); // => 207568994
   * console.log( _str.fnv1a( "Some string to generate a hash for" ) ); // => 1350435704
   * @see {@link https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function|Fowler–Noll–Vo hash function}
   */

  _.str.fnv1a = function (target) {
    if (!_is.string(target) || _is.empty(target)) return null;
    var i,
      l,
      hval = 0x811c9dc5;
    for (i = 0, l = target.length; i < l; i++) {
      hval ^= target.charCodeAt(i);
      hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    return hval >>> 0;
  };
  /**
   * @summary Returns the remainder of the `target` split on the first index of the given `substr`.
   * @memberof FooBar.utils.str.
   * @function from
   * @param {string} target - The string to split.
   * @param {string} substr - The substring to split on.
   * @returns {?string} `null` if the given `substr` does not exist within the `target`.
   * @example {@run true}
   * // alias the FooBar.utils.str namespace
   * var _str = FooBar.utils.str,
   * 	// create a string to test
   * 	target = "To be, or not to be, that is the question.";
   *
   * console.log( _str.from( target, "no" ) ); // => "t to be, that is the question."
   * console.log( _str.from( target, "that" ) ); // => " is the question."
   * console.log( _str.from( target, "question" ) ); // => "."
   * console.log( _str.from( target, "nonexistent" ) ); // => null
   */

  _.str.from = function (target, substr) {
    return _.str.contains(target, substr) ? target.substring(target.indexOf(substr) + substr.length) : null;
  };
  /**
   * @summary Joins any number of strings using the given `separator`.
   * @memberof FooBar.utils.str.
   * @function join
   * @param {string} separator - The separator to use to join the strings.
   * @param {string} part - The first string to join.
   * @param {...string} [partN] - Any number of additional strings to join.
   * @returns {?string}
   * @description This method differs from using the standard `Array.prototype.join` function to join strings in that it ignores empty parts and checks to see if each starts with the supplied `separator`. If the part starts with the `separator` it is removed before appending it to the final result.
   * @example {@run true}
   * // alias the FooBar.utils.str namespace
   * var _str = FooBar.utils.str;
   *
   * console.log( _str.join( "_", "all", "in", "one" ) ); // => "all_in_one"
   * console.log( _str.join( "_", "all", "_in", "one" ) ); // => "all_in_one"
   * console.log( _str.join( "/", "http://", "/example.com/", "/path/to/image.png" ) ); // => "http://example.com/path/to/image.png"
   * console.log( _str.join( "/", "http://", "/example.com", "/path/to/image.png" ) ); // => "http://example.com/path/to/image.png"
   * console.log( _str.join( "/", "http://", "example.com", "path/to/image.png" ) ); // => "http://example.com/path/to/image.png"
   */

  _.str.join = function (separator, part, partN) {
    if (!_is.string(separator) || !_is.string(part)) return null;
    var parts = _fn.arg2arr(arguments);
    separator = parts.shift();
    var i,
      l,
      result = parts.shift();
    for (i = 0, l = parts.length; i < l; i++) {
      part = parts[i];
      if (_is.empty(part)) continue;
      if (_.str.endsWith(result, separator)) {
        result = result.slice(0, result.length - separator.length);
      }
      if (_.str.startsWith(part, separator)) {
        part = part.slice(separator.length);
      }
      result += separator + part;
    }
    return result;
  };
  /**
   * @summary Returns the first part of the `target` split on the first index of the given `substr`.
   * @memberof FooBar.utils.str.
   * @function until
   * @param {string} target - The string to split.
   * @param {string} substr - The substring to split on.
   * @returns {string} The `target` if the `substr` does not exist.
   * @example {@run true}
   * // alias the FooBar.utils.str namespace
   * var _str = FooBar.utils.str,
   * 	// create a string to test
   * 	target = "To be, or not to be, that is the question.";
   *
   * console.log( _str.until( target, "no" ) ); // => "To be, or "
   * console.log( _str.until( target, "that" ) ); // => "To be, or not to be, "
   * console.log( _str.until( target, "question" ) ); // => "To be, or not to be, that is the "
   * console.log( _str.until( target, "nonexistent" ) ); // => "To be, or not to be, that is the question."
   */

  _.str.until = function (target, substr) {
    return _.str.contains(target, substr) ? target.substring(0, target.indexOf(substr)) : target;
  };
  /**
   * @summary A basic string formatter that can use both index and name based placeholders but handles only string or number replacements.
   * @memberof FooBar.utils.str.
   * @function format
   * @param {string} target - The format string containing any placeholders to replace.
   * @param {string|number|Object|Array} arg1 - The first value to format the target with. If an object is supplied it's properties are used to match named placeholders. If an array, string or number is supplied it's values are used to match any index placeholders.
   * @param {...(string|number)} [argN] - Any number of additional strings or numbers to format the target with.
   * @returns {string} The string formatted with the supplied arguments.
   * @description This method allows you to supply the replacements as an object when using named placeholders or as an array or additional arguments when using index placeholders.
   *
   * This does not perform a simultaneous replacement of placeholders, which is why it's referred to as a basic formatter. This means replacements that contain placeholders within there value could end up being replaced themselves as seen in the last example.
   * @example {@caption The following shows how to use index placeholders.}{@run true}
   * // alias the FooBar.utils.str namespace
   * var _str = FooBar.utils.str,
   * 	// create a format string using index placeholders
   * 	format = "Hello, {0}, are you feeling {1}?";
   *
   * console.log( _str.format( format, "Steve", "OK" ) ); // => "Hello, Steve, are you feeling OK?"
   * // or
   * console.log( _str.format( format, [ "Steve", "OK" ] ) ); // => "Hello, Steve, are you feeling OK?"
   * @example {@caption While the above works perfectly fine the downside is that the placeholders provide no clues as to what should be supplied as a replacement value, this is were supplying an object and using named placeholders steps in.}{@run true}
   * // alias the FooBar.utils.str namespace
   * var _str = FooBar.utils.str,
   * 	// create a format string using named placeholders
   * 	format = "Hello, {name}, are you feeling {adjective}?";
   *
   * console.log( _str.format( format, {name: "Steve", adjective: "OK"} ) ); // => "Hello, Steve, are you feeling OK?"
   * @example {@caption The following demonstrates the issue with not performing a simultaneous replacement of placeholders.}{@run true}
   * // alias the FooBar.utils.str namespace
   * var _str = FooBar.utils.str;
   *
   * console.log( _str.format("{0}{1}", "{1}", "{0}") ); // => "{0}{0}"
   *
   * // If the replacement happened simultaneously the result would be "{1}{0}" but this method executes
   * // replacements synchronously as seen below:
   *
   * // "{0}{1}".replace( "{0}", "{1}" )
   * // => "{1}{1}".replace( "{1}", "{0}" )
   * // => "{0}{0}"
   */

  _.str.format = function (target, arg1, argN) {
    var args = _fn.arg2arr(arguments);
    target = args.shift(); // remove the target from the args

    if (_is.string(target) && args.length > 0) {
      if (args.length === 1 && (_is.array(args[0]) || _is.object(args[0]))) {
        args = args[0];
      }
      _.each(args, function (value, placeholder) {
        target = target.replace(new RegExp("\\{" + placeholder + "\\}", "gi"), value + "");
      });
    }
    return target;
  };
})(
// dependencies
FooBar.utils, FooBar.utils.is, FooBar.utils.fn);
(function ($, _, _is, _fn, _str) {
  // only register methods if this version is the current version
  if (_.version !== '1.0.0') return;
  /**
   * @summary Contains common object utility methods.
   * @memberof FooBar.utils.
   * @namespace obj
   */

  _.obj = {};
  /**
   * @summary Creates a new object with the specified prototype.
   * @memberof FooBar.utils.obj.
   * @function create
   * @param {Object} proto - The object which should be the prototype of the newly-created object.
   * @returns {Object} A new object with the specified prototype.
   * @description This is a basic implementation of the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create|Object.create} method.
   */

  _.obj.create = function (proto) {
    if (!_is.object(proto)) throw TypeError('Argument must be an object');
    function Obj() {}
    Obj.prototype = proto;
    return new Obj();
  };
  /**
   * @summary Merge the contents of two or more objects together into the first `target` object.
   * @memberof FooBar.utils.obj.
   * @function extend
   * @param {Object} target - The object to merge properties into.
   * @param {Object} object - An object containing properties to merge.
   * @param {...Object} [objectN] - Additional objects containing properties to merge.
   * @returns {Object} The `target` merged with the contents from any additional objects.
   * @description This does not merge arrays by index as jQuery does, it treats them as a single property and replaces the array with a shallow copy of the new one.
   *
   * This method makes use of the {@link FooBar.utils.obj.merge} method internally.
   * @example {@run true}
   * // alias the FooBar.utils.obj namespace
   * var _obj = FooBar.utils.obj,
   * 	// create some objects to merge
   * 	defaults = {"name": "My Object", "enabled": false, "arr": [1,2,3]},
   * 	options = {"enabled": true, "something": 123, "arr": [4,5,6]};
   *
   * // merge the two objects into a new third one without modifying either of the originals
   * var settings = _obj.extend( {}, defaults, options );
   *
   * console.log( settings ); // => {"name": "My Object", "enabled": true, "arr": [4,5,6], "something": 123}
   * console.log( defaults ); // => {"name": "My Object", "enabled": true, "arr": [1,2,3]}
   * console.log( options ); // => {"enabled": true, "arr": [4,5,6], "something": 123}
   */

  _.obj.extend = function (target, object, objectN) {
    target = _is.object(target) ? target : {};
    var objects = _fn.arg2arr(arguments);
    objects.shift();
    _.each(objects, function (object) {
      _.obj.merge(target, object);
    });
    return target;
  };
  /**
   * @summary Merge the contents of two objects together into the first `target` object.
   * @memberof FooBar.utils.obj.
   * @function merge
   * @param {Object} target - The object to merge properties into.
   * @param {Object} object - The object containing properties to merge.
   * @returns {Object} The `target` merged with the contents from the `object`.
   * @description This does not merge arrays by index as jQuery does, it treats them as a single property and replaces the array with a shallow copy of the new one.
   *
   * This method is used internally by the {@link FooBar.utils.obj.extend} method.
   * @example {@run true}
   * // alias the FooBar.utils.obj namespace
   * var _obj = FooBar.utils.obj,
   * 	// create some objects to merge
   * 	target = {"name": "My Object", "enabled": false, "arr": [1,2,3]},
   * 	object = {"enabled": true, "something": 123, "arr": [4,5,6]};
   *
   * console.log( _obj.merge( target, object ) ); // => {"name": "My Object", "enabled": true, "arr": [4,5,6], "something": 123}
   */

  _.obj.merge = function (target, object) {
    target = _is.hash(target) ? target : {};
    object = _is.hash(object) ? object : {};
    for (var prop in object) {
      if (object.hasOwnProperty(prop)) {
        if (_is.hash(object[prop])) {
          target[prop] = _is.hash(target[prop]) ? target[prop] : {};
          _.obj.merge(target[prop], object[prop]);
        } else if (_is.array(object[prop])) {
          target[prop] = object[prop].slice();
        } else {
          target[prop] = object[prop];
        }
      }
    }
    return target;
  };
  /**
   * @summary Merge the validated properties of the `object` into the `target` using the optional `mappings`.
   * @memberof FooBar.utils.obj.
   * @function mergeValid
   * @param {Object} target - The object to merge properties into.
   * @param {FooBar.utils.obj~Validators} validators - An object containing validators for the `target` object properties.
   * @param {Object} object - The object containing properties to merge.
   * @param {FooBar.utils.obj~Mappings} [mappings] - An object containing property name mappings.
   * @returns {Object} The modified `target` object containing any valid properties from the supplied `object`.
   * @example {@caption Shows the basic usage for this method and shows how invalid properties or those with no corresponding validator are ignored.}{@run true}
   * // alias the FooBar.utils.obj and FooBar.utils.is namespaces
   * var _obj = FooBar.utils.obj,
   * 	_is = FooBar.utils.is;
   *
   * //create the target object and it's validators
   * var target = {"name":"John","location":"unknown"},
   * 	validators = {"name":_is.string,"location":_is.string};
   *
   * // create the object to merge into the target
   * var object = {
   * 	"name": 1234, // invalid
   * 	"location": "Liverpool", // updated
   * 	"notMerged": true // ignored
   * };
   *
   * // merge the object into the target, invalid properties or those with no corresponding validator are ignored.
   * console.log( _obj.mergeValid( target, validators, object ) ); // => { "name": "John", "location": "Liverpool" }
   * @example {@caption Shows how to supply a mappings object for this method.}{@run true}
   * // alias the FooBar.utils.obj and FooBar.utils.is namespaces
   * var _obj = FooBar.utils.obj,
   * 	_is = FooBar.utils.is;
   *
   * //create the target object and it's validators
   * var target = {"name":"John","location":"unknown"},
   * 	validators = {"name":_is.string,"location":_is.string};
   *
   * // create the object to merge into the target
   * var object = {
   * 	"name": { // ignored
   * 		"proper": "Christopher", // mapped to name if short is invalid
   * 		"short": "Chris" // map to name
   * 	},
   * 	"city": "London" // map to location
   * };
   *
   * // create the mapping object
   * var mappings = {
   * 	"name": [ "name.short", "name.proper" ], // try use the short name and fallback to the proper
   * 	"location": "city"
   * };
   *
   * // merge the object into the target using the mappings, invalid properties or those with no corresponding validator are ignored.
   * console.log( _obj.mergeValid( target, validators, object, mappings ) ); // => { "name": "Chris", "location": "London" }
   */

  _.obj.mergeValid = function (target, validators, object, mappings) {
    if (!_is.hash(object) || !_is.hash(validators)) return target;
    validators = _is.hash(validators) ? validators : {};
    mappings = _is.hash(mappings) ? mappings : {};
    var prop, maps, value;
    for (prop in validators) {
      if (!validators.hasOwnProperty(prop) || !_is.fn(validators[prop])) continue;
      maps = _is.array(mappings[prop]) ? mappings[prop] : _is.string(mappings[prop]) ? [mappings[prop]] : [prop];
      _.each(maps, function (map) {
        value = _.obj.prop(object, map);
        if (_is.undef(value)) return; // continue

        if (validators[prop](value)) {
          _.obj.prop(target, prop, value);
          return false; // break
        }
      });
    }
    return target;
  };
  /**
   * @summary Get or set a property value given its `name`.
   * @memberof FooBar.utils.obj.
   * @function prop
   * @param {Object} object - The object to inspect for the property.
   * @param {string} name - The name of the property to fetch. This can be a `.` notated name.
   * @param {*} [value] - If supplied this is the value to set for the property.
   * @returns {*} The value for the `name` property, if it does not exist then `undefined`.
   * @returns {undefined} If a `value` is supplied this method returns nothing.
   * @example {@caption Shows how to get a property value from an object.}{@run true}
   * // alias the FooBar.utils.obj namespace
   * var _obj = FooBar.utils.obj,
   * 	// create an object to test
   * 	object = {
   * 		"name": "My Object",
   * 		"some": {
   * 			"thing": 123
   * 		}
   * 	};
   *
   * console.log( _obj.prop( object, "name" ) ); // => "My Object"
   * console.log( _obj.prop( object, "some.thing" ) ); // => 123
   * @example {@caption Shows how to set a property value for an object.}{@run true}
   * // alias the FooBar.utils.obj namespace
   * var _obj = FooBar.utils.obj,
   * 	// create an object to test
   * 	object = {
   * 		"name": "My Object",
   * 		"some": {
   * 			"thing": 123
   * 		}
   * 	};
   *
   * _obj.prop( object, "name", "My Updated Object" );
   * _obj.prop( object, "some.thing", 987 );
   *
   * console.log( object ); // => { "name": "My Updated Object", "some": { "thing": 987 } }
   */

  _.obj.prop = function (object, name, value) {
    if (!_is.object(object) || _is.empty(name)) return;
    var parts, last;
    if (_is.undef(value)) {
      if (_str.contains(name, '.')) {
        parts = name.split('.');
        last = parts.length - 1;
        _.each(parts, function (part, i) {
          if (i === last) {
            value = object[part];
          } else if (_is.hash(object[part])) {
            object = object[part];
          } else {
            // exit early
            return false;
          }
        });
      } else if (!_is.undef(object[name])) {
        value = object[name];
      }
      return value;
    }
    if (_str.contains(name, '.')) {
      parts = name.split('.');
      last = parts.length - 1;
      _.each(parts, function (part, i) {
        if (i === last) {
          object[part] = value;
        } else {
          object = _is.hash(object[part]) ? object[part] : object[part] = {};
        }
      });
    } else if (!_is.undef(object[name])) {
      object[name] = value;
    }
  }; //######################
  //## Type Definitions ##
  //######################

  /**
   * @summary An object used by the {@link FooBar.utils.obj.mergeValid|mergeValid} method to map new values onto the `target` object.
   * @typedef {Object.<string,(string|Array.<string>)>} FooBar.utils.obj~Mappings
   * @description The mappings object is a single level object. If you want to map a property from/to a child object on either the source or target objects you must supply the name using `.` notation as seen in the below example with the `"name.first"` to `"Name.Short"` mapping.
   * @example {@caption The basic structure of a mappings object is the below.}
   * {
   * 	"TargetName": "SourceName", // for top level properties
   * 	"Child.TargetName": "Child.SourceName" // for child properties
   * }
   * @example {@caption Given the following target object.}
   * var target = {
   * 	"name": {
   * 		"first": "",
   * 		"last": null
   * 	},
   * 	"age": 0
   * };
   * @example {@caption And the following object to merge.}
   * var object = {
   * 	"Name": {
   * 		"Full": "Christopher",
   * 		"Short": "Chris"
   * 	},
   * 	"Age": 32
   * };
   * @example {@caption The mappings object would look like the below.}
   * var mappings = {
   * 	"name.first": "Name.Short",
   * 	"age": "Age"
   * };
   * @example {@caption If you want the `"name.first"` property to try to use the `"Name.Short"` value but fallback to `"Name.Proper"` you can specify the mapping value as an array.}
   * var mappings = {
   * 	"name.first": [ "Name.Short", "Name.Proper" ],
   * 	"age": "Age"
   * };
   */

  /**
   * @summary An object used by the {@link FooBar.utils.obj.mergeValid|mergeValid} method to validate properties.
   * @typedef {Object.<string,function(*):boolean>} FooBar.utils.obj~Validators
   * @description The validators object is a single level object. If you want to validate a property of a child object you must supply the name using `.` notation as seen in the below example with the `"name.first"` and `"name.last"` properties.
   *
   * Any function that accepts a value to test as the first argument and returns a boolean can be used as a validator. This means the majority of the {@link FooBar.utils.is} methods can be used directly. If the property supports multiple types just provide your own function as seen with `"name.last"` in the below example.
   * @example {@caption The basic structure of a validators object is the below.}
   * {
   * 	"PropName": function(*):boolean, // for top level properties
   * 	"Child.PropName": function(*):boolean // for child properties
   * }
   * @example {@caption Given the following target object.}
   * var target = {
   * 	"name": {
   * 		"first": "", // must be a string
   * 		"last": null // must be a string or null
   * 	},
   * 	"age": 0 // must be a number
   * };
   * @example {@caption The validators object could be created as seen below.}
   * // alias the FooBar.utils.is namespace
   * var _is = FooBar.utils.is;
   *
   * var validators = {
   * 	"name.first": _is.string,
   * 	"name.last": function(value){
   * 		return _is.string(value) || value === null;
   * 	},
   * 	"age": _is.number
   * };
   */
})(
// dependencies
FooBar.utils.$, FooBar.utils, FooBar.utils.is, FooBar.utils.fn, FooBar.utils.str);
(function ($, _, _is) {
  // only register methods if this version is the current version
  if (_.version !== '1.0.0') return; // any methods that have dependencies but don't fall into a specific subset or namespace can be added here

  /**
   * @summary The callback for the {@link FooBar.utils.ready} method.
   * @callback FooBar.utils~readyCallback
   * @param {jQuery} $ - The instance of jQuery the plugin was registered with.
   * @this window
   * @see Take a look at the {@link FooBar.utils.ready} method for example usage.
   */

  /**
   * @summary Waits for the DOM to be accessible and then executes the supplied callback.
   * @memberof FooBar.utils.
   * @function ready
   * @param {FooBar.utils~readyCallback} callback - The function to execute once the DOM is accessible.
   * @example {@caption This method can be used as a replacement for the jQuery ready callback to avoid an error in another script stopping our scripts from running.}
   * FooBar.utils.ready(function($){
   * 	// do something
   * });
   */

  _.ready = function (callback) {
    function onready() {
      try {
        callback.call(window, _.$);
      } catch (err) {
        console.error(err);
      }
    }
    if (Function('/*@cc_on return true@*/')() ? document.readyState === "complete" : document.readyState !== "loading") onready();else document.addEventListener('DOMContentLoaded', onready, false);
  };
  /**
   * @summary Executed once for each array index or object property until it returns a truthy value.
   * @callback FooBar.utils~findCallback
   * @param {*} value - The current value being iterated over. This could be either an element in an array or the value of an object property.
   * @param {(number|string)} [key] - The array index or property name of the `value`.
   * @param {(Object|Array)} [object] - The array or object currently being searched.
   * @returns {boolean} A truthy value.
   */

  /**
   * @summary Returns the value of the first element or property in the provided target that satisfies the provided test function.
   * @memberof FooBar.utils.
   * @function find
   * @param {(Object|Array)} target - The object or array to search.
   * @param {FooBar.utils~findCallback} callback - A function to execute for each value in the target.
   * @param {*} [thisArg] - The `this` value within the `callback`.
   * @returns {*} The value of the first element or property in the provided target that satisfies the provided test function. Otherwise, `undefined` is returned.
   */

  _.find = function (target, callback, thisArg) {
    if (!_is.fn(callback)) return;
    thisArg = _is.undef(thisArg) ? callback : thisArg;
    var i, l;
    if (_is.array(target)) {
      for (i = 0, l = target.length; i < l; i++) {
        if (callback.call(thisArg, target[i], i, target)) {
          return target[i];
        }
      }
    } else if (_is.object(target)) {
      var keys = Object.keys(target);
      for (i = 0, l = keys.length; i < l; i++) {
        if (callback.call(thisArg, target[keys[i]], keys[i], target)) {
          return target[keys[i]];
        }
      }
    }
  };
  /**
   * @summary Executed once for each array index or object property.
   * @callback FooBar.utils~eachCallback
   * @param {*} value - The current value being iterated over. This could be either an element in an array or the value of an object property.
   * @param {(number|string)} [key] - The array index or property name of the `value`.
   * @param {(Object|Array)} [object] - The array or object currently being searched.
   * @returns {(boolean|void)} Return `false` to break out of the loop, all other values are ignored.
   */

  /**
   * @summary Iterate over all indexes or properties of the provided target executing the provided callback once per value.
   * @memberof FooBar.utils.
   * @function each
   * @param {(Object|Array)} object - The object or array to search.
   * @param {FooBar.utils~eachCallback} callback - A function to execute for each value in the target.
   * @param {*} [thisArg] - The `this` value within the `callback`.
   */

  _.each = function (object, callback, thisArg) {
    if (!_is.fn(callback)) return;
    thisArg = _is.undef(thisArg) ? callback : thisArg;
    var i, l, result;
    if (_is.array(object)) {
      for (i = 0, l = object.length; i < l; i++) {
        result = callback.call(thisArg, object[i], i, object);
        if (result === false) break;
      }
    } else if (_is.object(object)) {
      var keys = Object.keys(object);
      for (i = 0, l = keys.length; i < l; i++) {
        result = callback.call(thisArg, object[keys[i]], keys[i], object);
        if (result === false) break;
      }
    }
  };
  /**
   * @summary Checks if a value exists within an array.
   * @memberof FooBar.utils.
   * @function inArray
   * @param {*} needle - The value to search for.
   * @param {Array} haystack - The array to search within.
   * @returns {number} Returns the index of the value if found otherwise -1.
   */

  _.inArray = function (needle, haystack) {
    if (_is.array(haystack)) {
      return haystack.indexOf(needle);
    }
    return -1;
  };
  /**
   * @summary Convert CSS class names into CSS selectors.
   * @memberof FooBar.utils.
   * @function selectify
   * @param {(string|string[]|object)} classes - A space delimited string of CSS class names or an array of them with each item being included in the selector using the OR (`,`) syntax as a separator. If an object is supplied the result will be an object with the same property names but the values converted to selectors.
   * @returns {(object|string)}
   * @example {@caption Shows how the method can be used.}
   * // alias the FooBar.utils namespace
   * var _ = FooBar.utils;
   *
   * console.log( _.selectify("my-class") ); // => ".my-class"
   * console.log( _.selectify("my-class my-other-class") ); // => ".my-class.my-other-class"
   * console.log( _.selectify(["my-class", "my-other-class"]) ); // => ".my-class,.my-other-class"
   * console.log( _.selectify({
   * 	class1: "my-class",
   * 	class2: "my-class my-other-class",
   * 	class3: ["my-class", "my-other-class"]
   * }) ); // => { class1: ".my-class", class2: ".my-class.my-other-class", class3: ".my-class,.my-other-class" }
   */

  _.selectify = function (classes) {
    if (_is.empty(classes)) return null;
    if (_is.hash(classes)) {
      var result = {},
        selector;
      for (var name in classes) {
        if (!classes.hasOwnProperty(name)) continue;
        selector = _.selectify(classes[name]);
        if (selector) {
          result[name] = selector;
        }
      }
      return result;
    }
    if (_is.string(classes) || _is.array(classes)) {
      if (_is.string(classes)) classes = [classes];
      return classes.map(function (str) {
        return _is.string(str) ? "." + str.split(/\s/g).join(".") : null;
      }).join(",");
    }
    return null;
  };
  /**
   * @ignore
   * @summary Internal replacement for the `requestAnimationFrame` method if the browser doesn't support any form of the method.
   * @param {function} callback - The function to call when it's time to update your animation for the next repaint.
   * @return {number} - The request id that uniquely identifies the entry in the callback list.
   */

  function raf(callback) {
    return setTimeout(callback, 1000 / 60);
  }
  /**
   * @ignore
   * @summary Internal replacement for the `cancelAnimationFrame` method if the browser doesn't support any form of the method.
   * @param {number} requestID - The ID value returned by the call to {@link FooBar.utils.requestFrame|requestFrame} that requested the callback.
   */

  function caf(requestID) {
    clearTimeout(requestID);
  }
  /**
   * @summary A cross browser wrapper for the `requestAnimationFrame` method.
   * @memberof FooBar.utils.
   * @function requestFrame
   * @param {function} callback - The function to call when it's time to update your animation for the next repaint.
   * @return {number} - The request id that uniquely identifies the entry in the callback list.
   */

  _.requestFrame = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || raf).bind(window);
  /**
   * @summary A cross browser wrapper for the `cancelAnimationFrame` method.
   * @memberof FooBar.utils.
   * @function cancelFrame
   * @param {number} requestID - The ID value returned by the call to {@link FooBar.utils.requestFrame|requestFrame} that requested the callback.
   */

  _.cancelFrame = (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || caf).bind(window);
  /**
   * @summary Registers a callback with the next available animation frame.
   * @memberof FooBar.utils.
   * @function nextFrame
   * @param {function} callback - The callback to execute for the next frame.
   * @param {*} [thisArg] - The value of `this` within the callback. Defaults to the callback itself.
   * @returns {Promise} Returns a promise object that is resolved using the return value of the callback.
   */

  _.nextFrame = function (callback, thisArg) {
    return $.Deferred(function (def) {
      if (!_is.fn(callback)) {
        def.reject(new Error('Provided callback is not a function.'));
      } else {
        thisArg = _is.undef(thisArg) ? callback : thisArg;
        _.requestFrame(function () {
          try {
            def.resolve(callback.call(thisArg));
          } catch (err) {
            def.reject(err);
          }
        });
      }
    }).promise();
  };
})(
// dependencies
FooBar.utils.$, FooBar.utils, FooBar.utils.is);
(function ($, _, _is, _obj, _fn) {
  // only register methods if this version is the current version
  if (_.version !== '1.0.0') return;
  /**
   * @summary A base class providing some helper methods for prototypal inheritance.
   * @memberof FooBar.utils.
   * @constructs Class
   * @description This is a base class for making prototypal inheritance simpler to work with. It provides an easy way to inherit from another class and exposes a `_super` method within the scope of any overriding methods that allows a simple way to execute the overridden function.
   *
   * Have a look at the {@link FooBar.utils.Class.extend|extend} and {@link FooBar.utils.Class.override|override} method examples to see some basic usage.
   * @example {@caption When using this base class the actual construction of a class is performed by the `construct` method.}
   * var MyClass = FooBar.utils.Class.extend({
   * 	construct: function(arg1, arg2){
   * 		// handle the construction logic here
   * 	}
   * });
   *
   * // use the class
   * var myClass = new MyClass( "arg1:value", "arg2:value" );
   */

  _.Class = function () {};
  /**
   * @ignore
   * @summary The original function when within the scope of an overriding method.
   * @memberof FooBar.utils.Class#
   * @function _super
   * @param {...*} [argN] - The same arguments as the base method.
   * @returns {*} The result of the base method.
   * @description This is only available within the scope of an overriding method if it was created using the {@link FooBar.utils.Class.extend|extend}, {@link FooBar.utils.Class.override|override} or {@link FooBar.utils.fn.addOrOverride} methods.
   * @see {@link FooBar.utils.fn.addOrOverride} to see an example of how this property is used.
   */

  /**
   * @summary Creates a new class that inherits from this one which in turn allows itself to be extended.
   * @memberof FooBar.utils.Class.
   * @function extend
   * @param {Object} [definition] - An object containing any methods to implement/override.
   * @returns {function} A new class that inherits from the base class.
   * @description Every class created using this method has both the {@link FooBar.utils.Class.extend|extend} and {@link FooBar.utils.Class.override|override} static methods added to it to allow it to be extended.
   * @example {@caption The below shows an example of how to implement inheritance using this method.}{@run true}
   * // create a base Person class
   * var Person = FooBar.utils.Class.extend({
   * 	construct: function(isDancing){
   * 		this.dancing = isDancing;
   * 	},
   * 	dance: function(){
   * 		return this.dancing;
   * 	}
   * });
   *
   * var Ninja = Person.extend({
   * 	construct: function(){
   * 		// Call the inherited version of construct()
   * 		this._super( false );
   * 	},
   * 	dance: function(){
   * 		// Call the inherited version of dance()
   * 		return this._super();
   * 	},
   * 	swingSword: function(){
   * 		return true;
   * 	}
   * });
   *
   * var p = new Person(true);
   * console.log( p.dance() ); // => true
   *
   * var n = new Ninja();
   * console.log( n.dance() ); // => false
   * console.log( n.swingSword() ); // => true
   * console.log(
   * 	p instanceof Person && p.constructor === Person && p instanceof FooBar.utils.Class
   * 	&& n instanceof Ninja && n.constructor === Ninja && n instanceof Person && n instanceof FooBar.utils.Class
   * ); // => true
   */

  _.Class.extend = function (definition) {
    definition = _is.hash(definition) ? definition : {};
    var proto = _obj.create(this.prototype); // create a new prototype to work with so we don't modify the original
    // iterate over all properties in the supplied definition and update the prototype

    for (var name in definition) {
      if (!definition.hasOwnProperty(name)) continue;
      _fn.addOrOverride(proto, name, definition[name]);
    } // if no construct method is defined add a default one that does nothing

    proto.construct = _is.fn(proto.construct) ? proto.construct : function () {}; // create the new class using the prototype made above

    function Class() {
      if (!_is.fn(this.construct)) throw new SyntaxError('FooBar.utils.Class objects must be constructed with the "new" keyword.');
      this.construct.apply(this, arguments);
    }
    Class.prototype = proto; //noinspection JSUnresolvedVariable

    Class.prototype.constructor = _is.fn(proto.__ctor__) ? proto.__ctor__ : Class;
    Class.extend = _.Class.extend;
    Class.override = _.Class.override;
    Class.getBaseClasses = _.Class.getBaseClasses;
    Class.__baseClass__ = this;
    return Class;
  };
  /**
   * @summary Overrides a single method on this class.
   * @memberof FooBar.utils.Class.
   * @function override
   * @param {string} name - The name of the function to override.
   * @param {function} fn - The new function to override with, the `_super` method will be made available within this function.
   * @description This is a helper method for overriding a single function of a {@link FooBar.utils.Class} or one of its child classes. This uses the {@link FooBar.utils.fn.addOrOverride} method internally and simply provides the correct prototype.
   * @example {@caption The below example wraps the `Person.prototype.dance` method with a new one that inverts the result. Note the override applies even to instances of the class that are already created.}{@run true}
   * var Person = FooBar.utils.Class.extend({
   *   construct: function(isDancing){
   *     this.dancing = isDancing;
   *   },
   *   dance: function(){
   *     return this.dancing;
   *   }
   * });
   *
   * var p = new Person(true);
   * console.log( p.dance() ); // => true
   *
   * Person.override("dance", function(){
   * 	// Call the original version of dance()
   * 	return !this._super();
   * });
   *
   * console.log( p.dance() ); // => false
   */

  _.Class.override = function (name, fn) {
    _fn.addOrOverride(this.prototype, name, fn);
  };
  /**
   * @summary The base class for this class.
   * @memberof FooBar.utils.Class.
   * @name __baseClass__
   * @type {?FooBar.utils.Class}
   * @private
   */

  _.Class.__baseClass__ = null;
  function getBaseClasses(klass, result) {
    if (!_is.array(result)) result = [];
    if (_is.fn(klass) && klass.__baseClass__ !== null) {
      result.unshift(klass.__baseClass__);
      return getBaseClasses(klass.__baseClass__, result);
    }
    return result;
  }
  /**
   * @summary Get an array of all base classes for this class.
   * @memberof FooBar.utils.Class.
   * @function getBaseClasses
   * @returns {FooBar.utils.Class[]}
   */

  _.Class.getBaseClasses = function () {
    return getBaseClasses(this, []);
  };
})(
// dependencies
FooBar.utils.$, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.fn);
(function ($, _, _is, _fn, _obj) {
  /**
   * @summary A registry class allowing classes to be easily registered and created.
   * @memberof FooBar.utils.
   * @class ClassRegistry
   * @param {FooBar.utils.ClassRegistry~Options} [options] - The options for the registry.
   * @augments FooBar.utils.Class
   * @borrows FooBar.utils.Class.extend as extend
   * @borrows FooBar.utils.Class.override as override
   * @borrows FooBar.utils.Class.getBaseClasses as getBaseClasses
   */
  _.ClassRegistry = _.Class.extend(/** @lends FooBar.utils.ClassRegistry.prototype */
  {
    /**
     * @ignore
     * @constructs
     * @param {FooBar.utils.ClassRegistry~Options} [options] - The options for the registry.
     */
    construct: function construct(options) {
      var self = this;
      /**
       * @summary A callback allowing the arguments supplied to the constructor of a new class to be modified.
       * @callback FooBar.utils.ClassRegistry~beforeCreate
       * @param {FooBar.utils.ClassRegistry~RegisteredClass} registered - The registered object containing all the information for the class being created.
       * @param {Array} args - An array of all arguments to be supplied to the constructor of the new class.
       * @returns {Array} Returns an array of all arguments to be supplied to the constructor of the new class.
       * @this FooBar.utils.ClassRegistry
       */

      /**
       * @summary The options for the registry.
       * @typedef {?Object} FooBar.utils.ClassRegistry~Options
       * @property {boolean} [allowBase] - Whether or not to allow base classes to be created. Base classes are registered with a priority below 0.
       * @property {?FooBar.utils.ClassRegistry~beforeCreate} [beforeCreate] - A callback executed just prior to creating an instance of a registered class. This must return an array of arguments to supply to the constructor of the new class.
       */

      /**
       * @summary The options for this instance.
       * @memberof FooBar.utils.ClassRegistry#
       * @name opt
       * @type {FooBar.utils.ClassRegistry~Options}
       */

      self.opt = _obj.extend({
        allowBase: true,
        beforeCreate: null
      }, options);
      /**
       * @summary An object detailing a registered class.
       * @typedef {?Object} FooBar.utils.ClassRegistry~RegisteredClass
       * @property {string} name - The name of the class.
       * @property {FooBar.utils.Class} ctor - The class constructor.
       * @property {string} selector - The CSS selector for the class.
       * @property {Object} config - The configuration object for the class providing default values that can be overridden at runtime.
       * @property {number} priority - This determines the index for the class when using the {@link FooBar.utils.ClassRegistry#find|find} method, a higher value equals a lower index.
       */

      /**
       * @summary An object containing all registered classes.
       * @memberof FooBar.utils.ClassRegistry#
       * @name registered
       * @type {Object.<string, FooBar.utils.ClassRegistry~RegisteredClass>}
       * @readonly
       * @example {@caption The following shows the structure of this object. The `<name>` placeholders would be the name the class was registered with.}
       * {
       * 	"<name>": {
       * 		"name": <string>,
       * 		"ctor": <function>,
       * 		"selector": <string>,
       * 		"config": <object>,
       * 		"priority": <number>
       * 	},
       * 	"<name>": {
       * 		"name": <string>,
       * 		"ctor": <function>,
       * 		"selector": <string>,
       * 		"config": <object>,
       * 		"priority": <number>
       * 	},
       * 	...
       * }
       */

      self.registered = {};
    },
    /**
     * @summary Register a class constructor with the provided `name`.
     * @memberof FooBar.utils.ClassRegistry#
     * @function register
     * @param {string} name - The name of the class.
     * @param {FooBar.utils.Class} klass - The class constructor to register.
     * @param {Object} [config] - The configuration object for the class providing default values that can be overridden at runtime.
     * @param {number} [priority=0] - This determines the index for the class when using the {@link FooBar.utils.ClassRegistry#find|find} method, a higher value equals a lower index.
     * @returns {boolean} Returns `true` if the class was successfully registered.
     */
    register: function register(name, klass, config, priority) {
      var self = this;
      if (_is.string(name) && !_is.empty(name) && _is.fn(klass)) {
        priority = _is.number(priority) ? priority : 0;
        var current = self.registered[name];
        self.registered[name] = {
          name: name,
          ctor: klass,
          config: _is.hash(config) ? config : {},
          priority: !_is.undef(current) ? current.priority : priority
        };
        return true;
      }
      return false;
    },
    /**
     * @summary The callback function for the {@link FooBar.utils.ClassRegistry#each|each} method.
     * @callback FooBar.utils.ClassRegistry~eachCallback
     * @param {FooBar.utils.ClassRegistry~RegisteredClass} registered - The current registered class being iterated over.
     * @param {number} index - The array index of the `registered` object.
     * @returns {(boolean|undefined)} Return `false` to break out of the loop, all other values are ignored.
     */

    /**
     * @summary Iterates over all registered classes executing the provided callback once per class.
     * @param {FooBar.utils.ClassRegistry~eachCallback} callback - The callback to execute for each registered class.
     * @param {boolean} [prioritize=false] - Whether or not the registered classes should be prioritized before iteration.
     * @param {*} [thisArg] - The value of `this` within the callback.
     */
    each: function each(callback, prioritize, thisArg) {
      prioritize = _is.boolean(prioritize) ? prioritize : false;
      thisArg = _is.undef(thisArg) ? callback : thisArg;
      var self = this,
        names = Object.keys(self.registered),
        registered = names.map(function (name) {
          return self.registered[name];
        });
      if (prioritize) {
        registered.sort(function (a, b) {
          return b.priority - a.priority;
        });
      }
      var i = 0,
        l = registered.length;
      for (; i < l; i++) {
        var result = callback.call(thisArg, registered[i], i);
        if (result === false) break;
      }
    },
    /**
     * @summary The callback function for the {@link FooBar.utils.ClassRegistry#find|find} method.
     * @callback FooBar.utils.ClassRegistry~findCallback
     * @param {FooBar.utils.ClassRegistry~RegisteredClass} registered - The current registered class being iterated over.
     * @param {number} index - The array index of the `registered` object.
     * @returns {boolean} `true` to return the current registered class.
     */

    /**
     * @summary Iterates through all registered classes until the supplied `callback` returns a truthy value.
     * @param {FooBar.utils.ClassRegistry~findCallback} callback - The callback to execute for each registered class.
     * @param {boolean} [prioritize=false] - Whether or not the registered classes should be prioritized before iteration.
     * @param {*} [thisArg] - The value of `this` within the callback.
     * @returns {?FooBar.utils.ClassRegistry~RegisteredClass} `null` if no registered class satisfied the `callback`.
     */
    find: function find(callback, prioritize, thisArg) {
      prioritize = _is.boolean(prioritize) ? prioritize : false;
      thisArg = _is.undef(thisArg) ? callback : thisArg;
      var self = this,
        names = Object.keys(self.registered),
        registered = names.map(function (name) {
          return self.registered[name];
        });
      if (prioritize) {
        registered.sort(function (a, b) {
          return b.priority - a.priority;
        });
      }
      var i = 0,
        l = registered.length;
      for (; i < l; i++) {
        if (callback.call(thisArg, registered[i], i)) {
          return registered[i];
        }
      }
      return null;
    },
    /**
     * @summary Create a new instance of a registered class by `name`.
     * @memberof FooBar.utils.ClassRegistry#
     * @function create
     * @param {string} name - The name of the class to create.
     * @param {Object} [config] - Any custom configuration to supply to the class.
     * @param {...*} [argN] - Any number of additional arguments to pass to the class constructor.
     * @returns {?FooBar.utils.Class} Returns `null` if no registered class can handle the supplied `element`.
     */
    create: function create(name, config, argN) {
      var self = this,
        args = _fn.arg2arr(arguments);
      name = args.shift();
      if (_is.string(name) && self.registered.hasOwnProperty(name)) {
        var registered = self.registered[name];
        var allowed = true;
        if (registered.priority < 0 && !self.opt.allowBase) allowed = false;
        if (allowed && _is.fn(registered.ctor)) {
          config = args.shift();
          config = self.mergeConfigurations(registered.name, config);
          args.unshift.apply(args, [registered.name, config]);
          return _fn.apply(registered.ctor, self.onBeforeCreate(registered, args));
        }
      }
      return null;
    },
    /**
     * @summary Executes the beforeCreate callback if supplied and gives sub-classes an easy way to modify the arguments supplied to newly created classes.
     * @memberof FooBar.utils.ClassRegistry#
     * @function onBeforeCreate
     * @param {FooBar.utils.ClassRegistry~RegisteredClass} registered - The registered class about to be created.
     * @param {Array} args - The array of arguments to be supplied to the registered class constructor.
     * @returns {Array}
     */
    onBeforeCreate: function onBeforeCreate(registered, args) {
      var self = this;
      if (self.opt.beforeCreate !== null && _is.fn(self.opt.beforeCreate)) {
        return self.opt.beforeCreate.call(self, registered, args);
      }
      return args;
    },
    /**
     * @summary Get the merged configuration for a class.
     * @memberof FooBar.utils.ClassRegistry#
     * @function mergeConfigurations
     * @param {string} name - The name of the class to get the config for.
     * @param {Object} [config] - The user supplied defaults to override.
     * @returns {Object}
     */
    mergeConfigurations: function mergeConfigurations(name, config) {
      var self = this;
      if (_is.string(name) && self.registered.hasOwnProperty(name)) {
        // check params
        config = _is.hash(config) ? config : {};
        var baseClasses = self.getBaseClasses(name),
          eArgs = [{}];
        baseClasses.push(self.registered[name]);
        baseClasses.forEach(function (reg) {
          eArgs.push(reg.config);
        });
        eArgs.push(config);
        return _obj.extend.apply(_obj, eArgs);
      }
      return {};
    },
    /**
     * @summary Gets the registered base class for this instance.
     * @memberof FooBar.utils.ClassRegistry#
     * @function getBaseClass
     * @returns {?FooBar.utils.ClassRegistry~RegisteredClass}
     */
    getBaseClass: function getBaseClass() {
      return this.find(function (registered) {
        return registered.priority < 0;
      }, true);
    },
    /**
     * @summary Get all registered base classes for the supplied `name`.
     * @memberof FooBar.utils.ClassRegistry#
     * @function getBaseClasses
     * @param {string} name - The name of the class to get the base classes for.
     * @returns {FooBar.utils.ClassRegistry~RegisteredClass[]}
     */
    getBaseClasses: function getBaseClasses(name) {
      var self = this,
        reg = self.registered[name],
        result = [];
      if (!_is.undef(reg)) {
        reg.ctor.getBaseClasses().forEach(function (base) {
          var found = self.fromType(base);
          if (_is.hash(found)) {
            result.push(found);
          }
        });
      }
      return result;
    },
    /**
     * @summary Attempts to find a registered class given the type/constructor.
     * @memberof FooBar.utils.ClassRegistry#
     * @function fromType
     * @param {FooBar.utils.Class} type - The type/constructor of the registered class to find.
     * @returns {(FooBar.utils.ClassRegistry~RegisteredClass|undefined)} Returns the registered class if found. Otherwise, `undefined` is returned.
     */
    fromType: function fromType(type) {
      if (!_is.fn(type)) return;
      return this.find(function (registered) {
        return registered.ctor === type;
      });
    }
  });
})(FooBar.utils.$, FooBar.utils, FooBar.utils.is, FooBar.utils.fn, FooBar.utils.obj);
(function (_, _is, _str) {
  // only register methods if this version is the current version
  if (_.version !== '1.0.0') return; // noinspection JSUnusedGlobalSymbols

  /**
   * @summary A base event class providing just a type and defaultPrevented properties.
   * @memberof FooBar.utils.
   * @class Event
   * @param {string} type - The type for this event.
   * @augments FooBar.utils.Class
   * @borrows FooBar.utils.Class.extend as extend
   * @borrows FooBar.utils.Class.override as override
   * @description This is a very basic event class that is used internally by the {@link FooBar.utils.EventClass#trigger} method when the first parameter supplied is simply the event name.
   *
   * To trigger your own custom event you will need to inherit from this class and then supply the instantiated event object as the first parameter to the {@link FooBar.utils.EventClass#trigger} method.
   * @example {@caption The following shows how to use this class to create a custom event.}
   * var MyEvent = FooBar.utils.Event.extend({
   * 	construct: function(type, customProp){
   * 	    this._super(type);
   * 	    this.myCustomProp = customProp;
   * 	}
   * });
   *
   * // to use the class you would then instantiate it and pass it as the first argument to a FooBar.utils.EventClass's trigger method
   * var eventClass = ...; // any class inheriting from FooBar.utils.EventClass
   * var event = new MyEvent( "my-event-type", true );
   * eventClass.trigger(event);
   */

  _.Event = _.Class.extend(/** @lends FooBar.utils.Event.prototype */
  {
    /**
     * @ignore
     * @constructs
     * @param {string} type
     **/
    construct: function construct(type) {
      if (_is.empty(type)) throw new SyntaxError('FooBar.utils.Event objects must be supplied a `type`.');
      var self = this,
        parsed = _.Event.parse(type);
      /**
       * @summary The type of event.
       * @memberof FooBar.utils.Event#
       * @name type
       * @type {string}
       * @readonly
       */

      self.type = parsed.type;
      /**
       * @summary The namespace of the event.
       * @memberof FooBar.utils.Event#
       * @name namespace
       * @type {string}
       * @readonly
       */

      self.namespace = parsed.namespace;
      /**
       * @summary Whether the default action should be taken or not.
       * @memberof FooBar.utils.Event#
       * @name defaultPrevented
       * @type {boolean}
       * @readonly
       */

      self.defaultPrevented = false;
      /**
       * @summary The original {@link FooBar.utils.EventClass} that triggered this event.
       * @memberof FooBar.utils.Event#
       * @name target
       * @type {FooBar.utils.EventClass}
       */

      self.target = null;
    },
    /**
     * @summary Informs the class that raised this event that its default action should not be taken.
     * @memberof FooBar.utils.Event#
     * @function preventDefault
     */
    preventDefault: function preventDefault() {
      this.defaultPrevented = true;
    },
    /**
     * @summary Gets whether the default action should be taken or not.
     * @memberof FooBar.utils.Event#
     * @function isDefaultPrevented
     * @returns {boolean}
     */
    isDefaultPrevented: function isDefaultPrevented() {
      return this.defaultPrevented;
    }
  });
  /**
   * @summary Parse the provided event string into a type and namespace.
   * @memberof FooBar.utils.Event.
   * @function parse
   * @param {string} event - The event to parse.
   * @returns {{namespaced: boolean, type: string, namespace: string}} Returns an object containing the type and namespace for the event.
   */

  _.Event.parse = function (event) {
    event = _is.string(event) && !_is.empty(event) ? event : null;
    var namespaced = _str.contains(event, ".");
    return {
      namespaced: namespaced,
      type: namespaced ? _str.startsWith(event, ".") ? null : _str.until(event, ".") : event,
      namespace: namespaced ? _str.from(event, ".") : null
    };
  }; // noinspection JSUnusedGlobalSymbols

  /**
   * @summary A base class that implements a basic events interface.
   * @memberof FooBar.utils.
   * @class EventClass
   * @augments FooBar.utils.Class
   * @borrows FooBar.utils.Class.extend as extend
   * @borrows FooBar.utils.Class.override as override
   * @description This is a very basic events implementation that provides just enough to cover most needs.
   */

  _.EventClass = _.Class.extend(/** @lends FooBar.utils.EventClass.prototype */
  {
    /**
     * @ignore
     * @constructs
     **/
    construct: function construct() {
      /**
       * @summary An object containing all the required info to execute a listener.
       * @typedef {Object} FooBar.utils.EventClass~RegisteredListener
       * @property {string} namespace - The namespace for the listener.
       * @property {function} fn - The callback function for the listener.
       * @property {*} thisArg - The `this` value to execute the callback with.
       */

      /**
       * @summary An object containing a mapping of events to listeners.
       * @typedef {Object.<string, Array<FooBar.utils.EventClass~RegisteredListener>>} FooBar.utils.EventClass~RegisteredEvents
       */

      /**
       * @summary The object used to register event handlers.
       * @memberof FooBar.utils.EventClass#
       * @name events
       * @type {FooBar.utils.EventClass~RegisteredEvents}
       */
      this.events = {};
    },
    /**
     * @summary Destroy the current instance releasing used resources.
     * @memberof FooBar.utils.EventClass#
     * @function destroy
     */
    destroy: function destroy() {
      this.events = {};
    },
    /**
     * @summary Attach multiple event listeners to the class.
     * @memberof FooBar.utils.EventClass#
     * @function on
     * @param {Object.<string, function>} events - An object containing event types to listener mappings.
     * @param {*} [thisArg] - The value of `this` within the listeners. Defaults to the class raising the event.
     * @returns {this}
     */

    /**
    * @summary Attach an event listener for one or more events to the class.
    * @memberof FooBar.utils.EventClass#
    * @function on
    * @param {string} events - One or more space-separated event types.
    * @param {function} listener - A function to execute when the event is triggered.
    * @param {*} [thisArg] - The value of `this` within the `listener`. Defaults to the class raising the event.
    * @returns {this}
    */
    on: function on(events, listener, thisArg) {
      var self = this;
      if (_is.object(events)) {
        thisArg = listener;
        Object.keys(events).forEach(function (key) {
          if (_is.fn(events[key])) {
            key.split(" ").forEach(function (type) {
              self.addListener(type, events[key], thisArg);
            });
          }
        });
      } else if (_is.string(events) && _is.fn(listener)) {
        events.split(" ").forEach(function (type) {
          self.addListener(type, listener, thisArg);
        });
      }
      return self;
    },
    /**
     * @summary Adds a single event listener to the current class.
     * @memberof FooBar.utils.EventClass#
     * @function addListener
     * @param {string} event - The event type, this can not contain any whitespace.
     * @param {function} listener - A function to execute when the event is triggered.
     * @param {*} [thisArg] - The value of `this` within the `listener`. Defaults to the class raising the event.
     * @returns {boolean} Returns `true` if added.
     */
    addListener: function addListener(event, listener, thisArg) {
      if (!_is.string(event) || /\s/.test(event) || !_is.fn(listener)) return false;
      var self = this,
        parsed = _.Event.parse(event);
      thisArg = _is.undef(thisArg) ? self : thisArg;
      if (!_is.array(self.events[parsed.type])) {
        self.events[parsed.type] = [];
      }
      var exists = self.events[parsed.type].some(function (h) {
        return h.namespace === parsed.namespace && h.fn === listener && h.thisArg === thisArg;
      });
      if (!exists) {
        self.events[parsed.type].push({
          namespace: parsed.namespace,
          fn: listener,
          thisArg: thisArg
        });
        return true;
      }
      return false;
    },
    /**
     * @summary Remove multiple event listeners from the class.
     * @memberof FooBar.utils.EventClass#
     * @function off
     * @param {Object.<string, function>} events - An object containing event types to listener mappings.
     * @param {*} [thisArg] - The value of `this` within the `listener` function. Defaults to the class raising the event.
     * @returns {this}
     */

    /**
    * @summary Remove an event listener from the class.
    * @memberof FooBar.utils.EventClass#
    * @function off
    * @param {string} events - One or more space-separated event types.
    * @param {function} listener - A function to execute when the event is triggered.
    * @param {*} [thisArg] - The value of `this` within the `listener`. Defaults to the class raising the event.
    * @returns {this}
    */
    off: function off(events, listener, thisArg) {
      var self = this;
      if (_is.object(events)) {
        thisArg = listener;
        Object.keys(events).forEach(function (key) {
          key.split(" ").forEach(function (type) {
            self.removeListener(type, events[key], thisArg);
          });
        });
      } else if (_is.string(events)) {
        events.split(" ").forEach(function (type) {
          self.removeListener(type, listener, thisArg);
        });
      }
      return self;
    },
    /**
     * @summary Removes a single event listener from the current class.
     * @memberof FooBar.utils.EventClass#
     * @function removeListener
     * @param {string} event - The event type, this can not contain any whitespace.
     * @param {function} [listener] - The listener registered to the event type.
     * @param {*} [thisArg] - The value of `this` registered for the `listener`. Defaults to the class raising the event.
     * @returns {boolean} Returns `true` if removed.
     */
    removeListener: function removeListener(event, listener, thisArg) {
      if (!_is.string(event) || /\s/.test(event)) return false;
      var self = this,
        parsed = _.Event.parse(event),
        types = [];
      thisArg = _is.undef(thisArg) ? self : thisArg;
      if (!_is.empty(parsed.type)) {
        types.push(parsed.type);
      } else if (!_is.empty(parsed.namespace)) {
        types.push.apply(types, Object.keys(self.events));
      }
      types.forEach(function (type) {
        if (!_is.array(self.events[type])) return;
        self.events[type] = self.events[type].filter(function (h) {
          if (listener != null) {
            return !(h.namespace === parsed.namespace && h.fn === listener && h.thisArg === thisArg);
          }
          if (parsed.namespace != null) {
            return h.namespace !== parsed.namespace;
          }
          return false;
        });
        if (self.events[type].length === 0) {
          delete self.events[type];
        }
      });
      return true;
    },
    /**
     * @summary Trigger an event on the current class.
     * @memberof FooBar.utils.EventClass#
     * @function trigger
     * @param {(string|FooBar.utils.Event)} event - Either a space-separated string of event types or a custom event object to raise.
     * @param {Array} [args] - An array of additional arguments to supply to the listeners after the event object.
     * @returns {(FooBar.utils.Event|FooBar.utils.Event[]|null)} Returns the {@link FooBar.utils.Event|event object} of the triggered event. If more than one event was triggered an array of {@link FooBar.utils.Event|event objects} is returned. If no `event` was supplied or triggered `null` is returned.
     */
    trigger: function trigger(event, args) {
      args = _is.array(args) ? args : [];
      var self = this,
        result = [];
      if (event instanceof _.Event) {
        result.push(event);
        self.emit(event, args);
      } else if (_is.string(event)) {
        event.split(" ").forEach(function (type) {
          var e = new _.Event(type);
          result.push(e);
          self.emit(e, args);
        });
      }
      return _is.empty(result) ? null : result.length === 1 ? result[0] : result;
    },
    /**
     * @summary Emits the supplied event on the current class.
     * @memberof FooBar.utils.EventClass#
     * @function emit
     * @param {FooBar.utils.Event} event - The event object to emit.
     * @param {Array} [args] - An array of additional arguments to supply to the listener after the event object.
     */
    emit: function emit(event, args) {
      if (!(event instanceof FooBar.utils.Event)) return;
      var self = this;
      args = _is.array(args) ? args : [];
      if (event.target === null) event.target = self;
      if (_is.array(self.events[event.type])) {
        self.events[event.type].forEach(function (h) {
          if (event.namespace != null && h.namespace !== event.namespace) return;
          h.fn.apply(h.thisArg, [event].concat(args));
        });
      }
      if (_is.array(self.events["__all__"])) {
        self.events["__all__"].forEach(function (h) {
          h.fn.apply(h.thisArg, [event].concat(args));
        });
      }
    }
  });
})(
// dependencies
FooBar.utils, FooBar.utils.is, FooBar.utils.str);
(function ($, _, _is, _fn, _obj) {
  // only register methods if this version is the current version
  if (_.version !== '1.0.0') return;
  /**
   * @summary A simple timer that triggers events.
   * @memberof FooBar.utils.
   * @class Timer
   * @param {number} [interval=1000] - The internal tick interval of the timer.
   */

  _.Timer = _.EventClass.extend(/** @lends FooBar.utils.Timer */
  {
    /**
     * @ignore
     * @constructs
     * @param {number} [interval=1000]
     */
    construct: function construct(interval) {
      var self = this;
      self._super();
      /**
       * @summary The internal tick interval of the timer in milliseconds.
       * @memberof FooBar.utils.Timer#
       * @name interval
       * @type {number}
       * @default 1000
       * @readonly
       */

      self.interval = _is.number(interval) ? interval : 1000;
      /**
       * @summary Whether the timer is currently running or not.
       * @memberof FooBar.utils.Timer#
       * @name isRunning
       * @type {boolean}
       * @default false
       * @readonly
       */

      self.isRunning = false;
      /**
       * @summary Whether the timer is currently paused or not.
       * @memberof FooBar.utils.Timer#
       * @name isPaused
       * @type {boolean}
       * @default false
       * @readonly
       */

      self.isPaused = false;
      /**
       * @summary Whether the timer can resume from a previous state or not.
       * @memberof FooBar.utils.Timer#
       * @name canResume
       * @type {boolean}
       * @default false
       * @readonly
       */

      self.canResume = false;
      /**
       * @summary Whether the timer can restart or not.
       * @memberof FooBar.utils.Timer#
       * @name canRestart
       * @type {boolean}
       * @default false
       * @readonly
       */

      self.canRestart = false;
      /**
       * @summary The internal tick timeout ID.
       * @memberof FooBar.utils.Timer#
       * @name __timeout
       * @type {?number}
       * @default null
       * @private
       */

      self.__timeout = null;
      /**
       * @summary Whether the timer is incrementing or decrementing.
       * @memberof FooBar.utils.Timer#
       * @name __decrement
       * @type {boolean}
       * @default false
       * @private
       */

      self.__decrement = false;
      /**
       * @summary The total time for the timer.
       * @memberof FooBar.utils.Timer#
       * @name __time
       * @type {number}
       * @default 0
       * @private
       */

      self.__time = 0;
      /**
       * @summary The remaining time for the timer.
       * @memberof FooBar.utils.Timer#
       * @name __remaining
       * @type {number}
       * @default 0
       * @private
       */

      self.__remaining = 0;
      /**
       * @summary The current time for the timer.
       * @memberof FooBar.utils.Timer#
       * @name __current
       * @type {number}
       * @default 0
       * @private
       */

      self.__current = 0;
      /**
       * @summary The final time for the timer.
       * @memberof FooBar.utils.Timer#
       * @name __finish
       * @type {number}
       * @default 0
       * @private
       */

      self.__finish = 0;
      /**
       * @summary The last arguments supplied to the {@link FooBar.utils.Timer#start|start} method.
       * @memberof FooBar.utils.Timer#
       * @name __restart
       * @type {Array}
       * @default []
       * @private
       */

      self.__restart = [];
    },
    /**
     * @summary Resets the timer back to a fresh starting state.
     * @memberof FooBar.utils.Timer#
     * @function __reset
     * @private
     */
    __reset: function __reset() {
      var self = this;
      clearTimeout(self.__timeout);
      self.__timeout = null;
      self.__decrement = false;
      self.__time = 0;
      self.__remaining = 0;
      self.__current = 0;
      self.__finish = 0;
      self.isRunning = false;
      self.isPaused = false;
      self.canResume = false;
    },
    /**
     * @summary Generates event args to be passed to listeners of the timer events.
     * @memberof FooBar.utils.Timer#
     * @function __eventArgs
     * @param {...*} [args] - Any number of additional arguments to pass to an event listener.
     * @return {Array} - The first 3 values of the result will always be the current time, the total time and boolean indicating if the timer is decremental.
     * @private
     */
    __eventArgs: function __eventArgs(args) {
      var self = this;
      return [self.__current, self.__time, self.__decrement].concat(_fn.arg2arr(arguments));
    },
    /**
     * @summary Performs the tick for the timer checking and modifying the various internal states.
     * @memberof FooBar.utils.Timer#
     * @function __tick
     * @private
     */
    __tick: function __tick() {
      var self = this;
      self.trigger("tick", self.__eventArgs());
      if (self.__current === self.__finish) {
        self.trigger("complete", self.__eventArgs());
        self.__reset();
      } else {
        if (self.__decrement) {
          self.__current--;
        } else {
          self.__current++;
        }
        self.__remaining--;
        self.canResume = self.__remaining > 0;
        self.__timeout = setTimeout(function () {
          self.__tick();
        }, self.interval);
      }
    },
    /**
     * @summary Starts the timer using the supplied `time` and whether or not to increment or decrement from the value.
     * @memberof FooBar.utils.Timer#
     * @function start
     * @param {number} time - The total time in seconds for the timer.
     * @param {boolean} [decrement=false] - Whether the timer should increment or decrement from or to the supplied time.
     */
    start: function start(time, decrement) {
      var self = this;
      if (self.isRunning) return;
      decrement = _is.boolean(decrement) ? decrement : false;
      self.__restart = [time, decrement];
      self.__decrement = decrement;
      self.__time = time;
      self.__remaining = time;
      self.__current = decrement ? time : 0;
      self.__finish = decrement ? 0 : time;
      self.canRestart = true;
      self.isRunning = true;
      self.isPaused = false;
      self.trigger("start", self.__eventArgs());
      self.__tick();
    },
    /**
     * @summary Starts the timer counting down to `0` from the supplied `time`.
     * @memberof FooBar.utils.Timer#
     * @function countdown
     * @param {number} time - The total time in seconds for the timer.
     */
    countdown: function countdown(time) {
      this.start(time, true);
    },
    /**
     * @summary Starts the timer counting up from `0` to the supplied `time`.
     * @memberof FooBar.utils.Timer#
     * @function countup
     * @param {number} time - The total time in seconds for the timer.
     */
    countup: function countup(time) {
      this.start(time, false);
    },
    /**
     * @summary Stops and then restarts the timer using the last arguments supplied to the {@link FooBar.utils.Timer#start|start} method.
     * @memberof FooBar.utils.Timer#
     * @function restart
     */
    restart: function restart() {
      var self = this;
      self.stop();
      if (self.canRestart) {
        self.start.apply(self, self.__restart);
      }
    },
    /**
     * @summary Stops the timer.
     * @memberof FooBar.utils.Timer#
     * @function stop
     */
    stop: function stop() {
      var self = this;
      if (self.isRunning || self.isPaused) {
        self.__reset();
        self.trigger("stop", self.__eventArgs());
      }
    },
    /**
     * @summary Pauses the timer and returns the remaining seconds.
     * @memberof FooBar.utils.Timer#
     * @function pause
     * @return {number} - The number of seconds remaining for the timer.
     */
    pause: function pause() {
      var self = this;
      if (self.__timeout != null) {
        clearTimeout(self.__timeout);
        self.__timeout = null;
      }
      if (self.isRunning) {
        self.isRunning = false;
        self.isPaused = true;
        self.trigger("pause", self.__eventArgs());
      }
      return self.__remaining;
    },
    /**
     * @summary Resumes the timer from a previously paused state.
     * @memberof FooBar.utils.Timer#
     * @function resume
     */
    resume: function resume() {
      var self = this;
      if (self.canResume) {
        self.isRunning = true;
        self.isPaused = false;
        self.trigger("resume", self.__eventArgs());
        self.__tick();
      }
    },
    /**
     * @summary Resets the timer back to a fresh starting state.
     * @memberof FooBar.utils.Timer#
     * @function reset
     */
    reset: function reset() {
      var self = this;
      self.__reset();
      self.trigger("reset", this.__eventArgs());
    }
  });
})(FooBar.utils.$, FooBar.utils, FooBar.utils.is, FooBar.utils.fn, FooBar.utils.obj);
(function ($, _, _fn) {
  // only register methods if this version is the current version
  if (_.version !== '1.0.0') return; // noinspection JSUnusedGlobalSymbols

  /**
   * @summary A wrapper around the fullscreen API to ensure cross browser compatibility.
   * @memberof FooBar.utils.
   * @class FullscreenAPI
   * @augments FooBar.utils.EventClass
   * @borrows FooBar.utils.EventClass.extend as extend
   * @borrows FooBar.utils.EventClass.override as override
   */

  _.FullscreenAPI = _.EventClass.extend(/** @lends FooBar.utils.FullscreenAPI */
  {
    /**
     * @ignore
     * @constructs
     */
    construct: function construct() {
      this._super();
      /**
       * @summary An object containing a single browsers various methods and events needed for this wrapper.
       * @typedef {?Object} FooBar.utils.FullscreenAPI~BrowserAPI
       * @property {string} enabled
       * @property {string} element
       * @property {string} request
       * @property {string} exit
       * @property {Object} events
       * @property {string} events.change
       * @property {string} events.error
       */

      /**
       * @summary An object containing the supported fullscreen browser API's.
       * @typedef {Object.<string, FooBar.utils.FullscreenAPI~BrowserAPI>} FooBar.utils.FullscreenAPI~SupportedBrowsers
       */

      /**
       * @summary Contains the various browser specific method and event names.
       * @memberof FooBar.utils.FullscreenAPI#
       * @name apis
       * @type {FooBar.utils.FullscreenAPI~SupportedBrowsers}
       */

      this.apis = {
        w3: {
          enabled: "fullscreenEnabled",
          element: "fullscreenElement",
          request: "requestFullscreen",
          exit: "exitFullscreen",
          events: {
            change: "fullscreenchange",
            error: "fullscreenerror"
          }
        },
        webkit: {
          enabled: "webkitFullscreenEnabled",
          element: "webkitCurrentFullScreenElement",
          request: "webkitRequestFullscreen",
          exit: "webkitExitFullscreen",
          events: {
            change: "webkitfullscreenchange",
            error: "webkitfullscreenerror"
          }
        },
        moz: {
          enabled: "mozFullScreenEnabled",
          element: "mozFullScreenElement",
          request: "mozRequestFullScreen",
          exit: "mozCancelFullScreen",
          events: {
            change: "mozfullscreenchange",
            error: "mozfullscreenerror"
          }
        },
        ms: {
          enabled: "msFullscreenEnabled",
          element: "msFullscreenElement",
          request: "msRequestFullscreen",
          exit: "msExitFullscreen",
          events: {
            change: "MSFullscreenChange",
            error: "MSFullscreenError"
          }
        }
      };
      /**
       * @summary The current browsers specific method and event names.
       * @memberof FooBar.utils.FullscreenAPI#
       * @name api
       * @type {FooBar.utils.FullscreenAPI~BrowserAPI}
       */

      this.api = this.getAPI();
      /**
       * @summary Whether or not the fullscreen API is supported in the current browser.
       * @memberof FooBar.utils.FullscreenAPI#
       * @name supported
       * @type {boolean}
       */

      this.supported = this.api != null;
      this.__listen();
    },
    /**
     * @summary Destroys the current wrapper unbinding events and freeing up resources.
     * @memberof FooBar.utils.FullscreenAPI#
     * @function destroy
     * @returns {boolean}
     */
    destroy: function destroy() {
      this.__stopListening();
      return this._super();
    },
    /**
     * @summary Fetches the correct API for the current browser.
     * @memberof FooBar.utils.FullscreenAPI#
     * @function getAPI
     * @return {?FooBar.utils.FullscreenAPI~BrowserAPI} Returns `null` if the fullscreen API is not supported.
     */
    getAPI: function getAPI() {
      for (var vendor in this.apis) {
        if (!this.apis.hasOwnProperty(vendor)) continue; // Check if document has the "enabled" property

        if (this.apis[vendor].enabled in document) {
          // It seems this browser supports the fullscreen API
          return this.apis[vendor];
        }
      }
      return null;
    },
    /**
     * @summary Gets the current fullscreen element or null.
     * @memberof FooBar.utils.FullscreenAPI#
     * @function element
     * @returns {?Element}
     */
    element: function element() {
      return this.supported ? document[this.api.element] : null;
    },
    /**
     * @summary Requests the browser to place the specified element into fullscreen mode.
     * @memberof FooBar.utils.FullscreenAPI#
     * @function request
     * @param {Element} element - The element to place into fullscreen mode.
     * @returns {Promise} A Promise which is resolved once the element is placed into fullscreen mode.
     */
    request: function request(element) {
      if (this.supported && !!element[this.api.request]) {
        var result = element[this.api.request]();
        return !result ? $.Deferred(this.__resolver(this.api.request)).promise() : result;
      }
      return _fn.rejected;
    },
    /**
     * @summary Requests that the browser switch from fullscreen mode back to windowed mode.
     * @memberof FooBar.utils.FullscreenAPI#
     * @function exit
     * @returns {Promise} A Promise which is resolved once fullscreen mode is exited.
     */
    exit: function exit() {
      if (this.supported && !!this.element()) {
        var result = document[this.api.exit]();
        return !result ? $.Deferred(this.__resolver(this.api.exit)).promise() : result;
      }
      return _fn.rejected;
    },
    /**
     * @summary Toggles the supplied element between fullscreen and windowed modes.
     * @memberof FooBar.utils.FullscreenAPI#
     * @function toggle
     * @param {Element} element - The element to switch between modes.
     * @returns {Promise} A Promise that is resolved once fullscreen mode is either entered or exited.
     */
    toggle: function toggle(element) {
      return !!this.element() ? this.exit() : this.request(element);
    },
    /**
     * @summary Starts listening to the document level fullscreen events and triggers an abbreviated version on this class.
     * @memberof FooBar.utils.FullscreenAPI#
     * @function __listen
     * @private
     */
    __listen: function __listen() {
      var self = this;
      if (!self.supported) return;
      $(document).on(self.api.events.change + ".utils", function () {
        self.trigger("change");
      }).on(self.api.events.error + ".utils", function () {
        self.trigger("error");
      });
    },
    /**
     * @summary Stops listening to the document level fullscreen events.
     * @memberof FooBar.utils.FullscreenAPI#
     * @function __stopListening
     * @private
     */
    __stopListening: function __stopListening() {
      var self = this;
      if (!self.supported) return;
      $(document).off(self.api.events.change + ".utils").off(self.api.events.error + ".utils");
    },
    /**
     * @summary Creates a resolver function to patch browsers which do not return a Promise from there request and exit methods.
     * @memberof FooBar.utils.FullscreenAPI#
     * @function __resolver
     * @param {string} method - The request or exit method the resolver is being created for.
     * @returns {FooBar.utils.FullscreenAPI~resolver}
     * @private
     */
    __resolver: function __resolver(method) {
      var self = this;
      /**
       * @summary Binds to the fullscreen change and error events and resolves or rejects the supplied deferred accordingly.
       * @callback FooBar.utils.FullscreenAPI~resolver
       * @param {jQuery.Deferred} def - The jQuery.Deferred object to resolve.
       */

      return function resolver(def) {
        // Reject the promise if asked to exitFullscreen and there is no element currently in fullscreen
        if (method === self.api.exit && !!self.element()) {
          setTimeout(function () {
            // noinspection JSUnresolvedFunction
            def.reject(new TypeError());
          }, 1);
          return;
        } // When receiving an internal fullscreenchange event, fulfill the promise

        function change() {
          // noinspection JSUnresolvedFunction
          def.resolve();
          $(document).off(self.api.events.change, change).off(self.api.events.error, error);
        } // When receiving an internal fullscreenerror event, reject the promise

        function error() {
          // noinspection JSUnresolvedFunction
          def.reject(new TypeError());
          $(document).off(self.api.events.change, change).off(self.api.events.error, error);
        }
        $(document).on(self.api.events.change, change).on(self.api.events.error, error);
      };
    }
  });
})(FooBar.utils.$, FooBar.utils, FooBar.utils.fn);
(function ($, _, _is, _fn) {
  // only register methods if this version is the current version
  if (_.version !== '1.0.0') return;
  /**
   * @summary Contains common utility methods and members for the CSS transition property.
   * @memberof FooBar.utils.
   * @namespace transition
   */

  _.transition = {};
  /**
   * @summary The data name used by transitions to ensure promises are resolved.
   * @memberof FooBar.utils.transition.
   * @name dataName
   * @type {string}
   * @default "__foo-transition__"
   */

  _.transition.dataName = '__foo-transition__';
  /**
   * @summary The CSS className used to disable transitions when using the {@link FooBar.utils.transition.disable|disable} method instead of inline styles.
   * @memberof FooBar.utils.transition.
   * @name disableClassName
   * @type {?string}
   * @default null
   */

  _.transition.disableClassName = null;
  /**
   * @summary The global timeout used as a safety measure when using the {@link FooBar.utils.transition.start|start} method. This can be overridden using the `timeout` parameter of the {@link FooBar.utils.transition.start|start} method.
   * @memberof FooBar.utils.transition.
   * @name timeout
   * @type {number}
   * @default 3000
   */

  _.transition.timeout = 3000;
  /**
   * @summary Disable transitions temporarily on the provided element so changes can be made immediately within the callback.
   * @memberof FooBar.utils.transition.
   * @function disable
   * @param {(jQuery|HTMLElement)} element - The element to disable transitions on.
   * @param {FooBar.utils.transition~modifyFn} modifyFn - A function to execute while the elements transitions are disabled.
   */

  _.transition.disable = function (element, modifyFn) {
    var $el = _is.jq(element) ? element : $(element);
    if ($el.length > 0 && _is.fn(modifyFn)) {
      var el = $el.get(0),
        hasClass = _is.string(_.transition.disableClassName);
      var restore = null;
      if (hasClass) $el.addClass(_.transition.disableClassName);else {
        restore = {
          value: el.style.getPropertyValue('transition'),
          priority: el.style.getPropertyPriority('transition')
        };
        el.style.setProperty('transition', 'none', 'important');
      }
      modifyFn.call(modifyFn, $el);
      $el.prop("offsetWidth");
      if (hasClass) $el.removeClass(_.transition.disableClassName);else {
        el.style.removeProperty('transition');
        if (_is.string(restore.value) && restore.value.length > 0) {
          el.style.setProperty('transition', restore.value, restore.priority);
        }
      }
    }
  };
  /**
   * @summary Stop a transition started using the {@link FooBar.utils.transition.start|start} method.
   * @memberof FooBar.utils.transition.
   * @function stop
   * @param {(jQuery|HTMLElement)} element - The element to stop the transition on.
   * @returns {Promise}
   */

  _.transition.stop = function (element) {
    var d = $.Deferred(),
      $el = _is.jq(element) ? element : $(element);
    if ($el.length > 0) {
      var current = $el.data(_.transition.dataName);
      if (_is.promise(current)) {
        current.always(function () {
          // request the next frame to give the previous event unbinds time to settle
          _.requestFrame(function () {
            d.resolve($el);
          });
        }).reject(new Error("Transition cancelled."));
      } else {
        d.resolve($el);
      }
    } else {
      d.reject(new Error("Unable to stop transition. Make sure the element exists."));
    }
    return d.promise();
  };
  /**
   * @summary Creates a new transition event listener ensuring the element and optionally the propertyName matches before executing the callback.
   * @memberof FooBar.utils.transition.
   * @function createListener
   * @param {HTMLElement} element - The element being listened to.
   * @param {function(*): void} callback - The callback to execute once the element and optional propertyName are matched.
   * @param {?string} [propertyName=null] - The propertyName to match on the TransitionEvent object.
   * @returns {function(*): void}
   */

  _.transition.createListener = function (element, callback, propertyName) {
    var el = element,
      fn = callback,
      prop = propertyName,
      hasProp = _is.string(propertyName);
    return function (event) {
      var evt = event.originalEvent instanceof TransitionEvent ? event.originalEvent : event;
      var matches = false;
      if (evt.target === el) {
        matches = hasProp ? evt.propertyName === prop : true;
      }
      if (matches) fn.apply(fn, _fn.arg2arr(arguments));
    };
  };
  /**
   * @summary Start a transition on an element returning a promise that is resolved once the transition ends.
   * @memberof FooBar.utils.transition.
   * @function start
   * @param {(jQuery|HTMLElement)} element - The element to perform the transition on.
   * @param {FooBar.utils.transition~modifyFn} triggerFn - The callback that triggers the transition on the element.
   * @param {?string} [propertyName] - A specific property name to wait for before resolving. If not supplied the first instance of the transitionend event will resolve the promise.
   * @param {number} [timeout] - A safety timeout to ensure the returned promise is finalized. If not supplied the value of the {@link FooBar.utils.transition.timeout} property is used.
   * @returns {Promise}
   */

  _.transition.start = function (element, triggerFn, propertyName, timeout) {
    var d = $.Deferred(),
      $el = _is.jq(element) ? element : $(element);
    if ($el.length > 0 && _is.fn(triggerFn)) {
      var el = $el.get(0); // first stop any active transitions

      _.transition.stop($el).always(function () {
        // then setup the data object and event listeners for the new transition
        var listener = _.transition.createListener(el, function () {
          d.resolve($el);
        }, propertyName);
        $el.data(_.transition.dataName, d).on("transitionend.foo-utils", listener).prop("offsetWidth"); // force layout to ensure transitions on newly appended elements occur
        // request the next frame to give the event bindings time to settle

        _.requestFrame(function () {
          // just in case a transition is cancelled by some other means and the transitionend event is never fired this
          // timeout ensures the returned promise is always finalized.
          var safety = setTimeout(function () {
            d.reject(new Error("Transition safety timeout triggered."));
          }, _is.number(timeout) ? timeout : _.transition.timeout); // we always want to cleanup after ourselves so clear the safety, remove the data object and unbind the events

          d.always(function () {
            clearTimeout(safety);
            $el.removeData(_.transition.dataName).off("transitionend.foo-utils", listener);
          }); // now that everything is setup kick off the transition by calling the triggerFn

          triggerFn.call(triggerFn, $el);
        });
      });
    } else {
      d.reject(new Error("Unable to perform transition. Make sure the element exists and a trigger function is supplied."));
    }
    return d.promise();
  };
  /**
   * @summary Used to modify an element which has transitions optionally allowing the transition to occur or not.
   * @memberof FooBar.utils.transition.
   * @function modify
   * @param {(jQuery|HTMLElement)} element - The element to perform the modifications to.
   * @param {FooBar.utils.transition~modifyFn} modifyFn - The callback used to perform the modifications.
   * @param {boolean} [immediate=false] - Whether or not transitions should be allowed to execute and waited on. The default value of `false` means transitions are allowed and the promise will only resolve once there transitionend event has fired.
   * @param {?string} [propertyName=null] - A specific property name to wait for before resolving. If not supplied the first instance of the transitionend event will resolve the promise.
   * @returns {Promise} Returns a promise that is resolved once the modifications to the element have ended.
   */

  _.transition.modify = function (element, modifyFn, immediate, propertyName) {
    var $el = _is.jq(element) ? element : $(element);
    if ($el.length > 0 && _is.fn(modifyFn)) {
      if (immediate) {
        _.transition.disable($el, modifyFn);
        return _fn.resolve();
      }
      return _.transition.start($el, modifyFn, propertyName);
    }
    return _fn.reject(new Error("Unable to perform modification. Make sure the element exists and a modify function is supplied."));
  };
  /**
   * @summary Perform one or more modifications to the element such as setting inline styles or toggling classNames.
   * @callback FooBar.utils.transition~modifyFn
   * @param {jQuery} $element - The jQuery object for the element to modify.
   */
})(
// dependencies
FooBar.utils.$, FooBar.utils, FooBar.utils.is, FooBar.utils.fn);
"use strict";

(function ($, _, _utils, _is, _fn, _str, _obj, _t) {
  /**
   * @summary Exposes the `methods` from the `source` on the `target`.
   * @memberof FooBar.utils.fn.
   * @function expose
   * @param {Object} source - The object to expose methods from.
   * @param {Object} target - The object to expose methods on.
   * @param {String[]} methods - An array of method names to expose.
   * @param {*} [thisArg] - The value of `this` within the exposed `methods`. Defaults to the `source` object.
   */
  _fn.expose = function (source, target, methods, thisArg) {
    if (_is.object(source) && _is.object(target) && _is.array(methods)) {
      thisArg = _is.undef(thisArg) ? source : thisArg;
      methods.forEach(function (method) {
        if (_is.string(method) && _is.fn(source[method])) {
          target[method] = source[method].bind(thisArg);
        }
      });
    }
  };

  /**
   * @summary Executed while an elements transitions are disabled allowing changes to be made immediately.
   * @callback FooBar.utils.transition~doWhileDisabled
   * @param {jQuery} $element - The jQuery element with transitions disabled.
   */

  /**
   * @summary Disable transitions temporarily on the provided element so changes can be made immediately within the provided callback.
   * @memberof FooBar.utils.transition.
   * @function disable
   * @param {jQuery} $element - The jQuery element to disable transitions on.
   * @param {FooBar.utils.transition~doWhileDisabled} callback - A function to execute while the elements transitions are disabled.
   * @param {*} [thisArg] - The `this` value within the `callback`. Defaults to the callback itself.
   */
  _t.disable = function ($element, callback, thisArg) {
    if (!_is.jq($element) || !_is.fn(callback)) return;
    thisArg = _is.undef(thisArg) ? callback : thisArg;
    $element.addClass("fbr-transitions-disabled");
    callback.call(thisArg, $element);
    $element.prop("offsetHeight");
    $element.removeClass("fbr-transitions-disabled");
  };

  /**
   * @summary Called to perform modifications on the supplied element.
   * @callback FooBar.utils.transition~modifyCallback
   * @param {jQuery} $element - The jQuery element to modify.
   */

  /**
   * @summary Modify the provided `$element` by executing the `callback`.
   * @memberof FooBar.utils.transition.
   * @function modify
   * @param {jQuery} $element - The jQuery element to modify.
   * @param {FooBar.utils.transition~modifyCallback} callback - The callback that modifies the provided `$element`.
   * @param {boolean} [immediate=false] - Whether or not to disable transitions while performing the modification.
   * @param {number} [timeout] - The safety timeout for any transitions triggered by the modification.
   * @returns {Promise} Resolved once the modification is complete.
   */
  _t.modify = function ($element, callback, immediate, timeout) {
    if (immediate) {
      _t.disable($element, callback);
      return _fn.resolved;
    }
    return _t.start($element, callback, false, timeout);
  };

  /**
   * @summary Waits for the outcome of all promises regardless of failure and resolves supplying the results of just those that succeeded.
   * @memberof FooBar.utils.fn.
   * @function when
   * @param {Promise[]} promises - The array of promises to wait for.
   * @returns {Promise}
   */
  _fn.whenAll = function (promises) {
    return _fn.allSettled(promises).then(function (settled) {
      return settled.reduce(function (results, result) {
        if (result.status === 'fulfilled') {
          results.push(result.value);
        }
        return results;
      }, []);
    });
  };

  /**
   * @typedef {Object} ResizeObserverSize
   * @property {number} inlineSize
   * @property {number} blockSize
   * @property {number} width
   * @property {number} height
   */
  /**
   * @typedef {Object} ResizeObserverEntry
   * @property {ResizeObserverSize|Array<ResizeObserverSize>|undefined} contentBoxSize
   * @property {DOMRect} contentRect
   */
  /**
   * @summary Gets the width and height from the ResizeObserverEntry
   * @memberof FooBar.utils.
   * @function getResizeObserverSize
   * @param {ResizeObserverEntry} entry - The entry to retrieve the size from.
   * @returns {{width: Number,height: Number}}
   */
  _utils.getResizeObserverSize = function (entry) {
    let width, height;
    if (entry.contentBoxSize) {
      // Checking for chrome as using a non-standard array
      if (entry.contentBoxSize[0]) {
        width = entry.contentBoxSize[0].inlineSize;
        height = entry.contentBoxSize[0].blockSize;
      } else {
        width = entry.contentBoxSize.inlineSize;
        height = entry.contentBoxSize.blockSize;
      }
    } else {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
    }
    return {
      width,
      height
    };
  };

  /**
   * Checks if two values are equal. Arrays and objects are checked at the item/key value level, not by reference.
   * @param {any} a
   * @param {any} b
   * @returns {boolean}
   */
  _obj.equal = function (a, b) {
    // Same reference or equal primitives
    if (a === b) return true;

    // Null / undefined mismatch
    if (a == null || b == null) return false;

    // Arrays
    if (_is.array(a) && _is.array(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!_obj.equal(a[i], b[i])) return false;
      }
      return true;
    }

    // Plain objects
    if (_is.hash(a) && _is.hash(b)) {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
      for (const key of keysA) {
        if (!Object.hasOwn(b, key)) return false;
        if (!_obj.equal(a[key], b[key])) return false;
      }
      return true;
    }
    return false;
  };
})(/** @type jQuery */FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.fn, FooBar.utils.str, FooBar.utils.obj, FooBar.utils.transition);
"use strict";

(function ($, _, _is, _fn, _obj, _str) {
  /**
   * @summary The base component class used by the plugin to provide advanced functionality to an `element`.
   * @memberof FooBar.utils.
   * @class Component
   * @param {string} name - The name of the component.
   * @param {(jQuery|Element)} element - The element the component is being created for.
   * @param {FooBar.utils.Component~Configuration} [config] - The configuration object for the component.
   * @param {FooBar.utils.Component} [parent] - The parent component for this component.
   * @augments FooBar.utils.EventClass
   * @borrows FooBar.utils.Class.extend as extend
   * @borrows FooBar.utils.Class.override as override
   * @borrows FooBar.utils.Class.bases as bases
   */
  _.Component = _.EventClass.extend(/** @lends FooBar.utils.Component.prototype */{
    /**
     * @ignore
     * @constructs
     * @param {string} name - The name of the component.
     * @param {(jQuery|Element)} element - The element the component is being created for.
     * @param {FooBar.utils.Component~Configuration} [config] - The configuration object for the component.
     * @param {FooBar.utils.Component} [parent] - The parent component for this component.
     */
    construct: function (name, element, config, parent) {
      const self = this;
      self._super();
      /**
       * @summary The default configuration object used by all components.
       * @typedef {?Object} FooBar.utils.Component~Configuration
       * @property {FooBar.utils.Component~Options} [options] - An object containing any options for a component.
       * @property {Object} [i18n] - An object containing any i18n strings for a component.
       * @property {Object} [classes] - An object containing any CSS classes for a component.
       */

      /**
       * @summary The default options object used by all components.
       * @typedef {?Object} FooBar.utils.Component~Options
       * @property {boolean} [domEvents=false] - Whether or not this component should also trigger events on its DOM {@link FooBar.utils.Component#el|element}.
       * @property {boolean} [bubbleEvents=true] - Whether or not this component should bubble events.
       */

      /**
       * @summary The name of this component.
       * @memberof FooBar.utils.Component#
       * @name name
       * @type {string}
       */
      self.name = name;
      if (!_is.string(self.name)) throw "Invalid argument `name`.";
      /**
       * @summary The jQuery wrapper for this components primary element.
       * @memberof FooBar.utils.Component#
       * @name $el
       * @type {jQuery}
       */
      self.$el = _is.jq(element) ? element : $(element);
      if (self.$el.length === 0) throw "Invalid argument `element`.";
      /**
       * @summary This components primary element.
       * @memberof FooBar.utils.Component#
       * @name el
       * @type {Element}
       */
      self.el = self.$el.get(0);
      /**
       * @summary The parent component for this component.
       * @memberof FooBar.utils.Component#
       * @name parent
       * @type {?FooBar.utils.Component}
       */
      self.parent = parent instanceof _.Component ? parent : null;
      /**
       * @summary The raw configuration object as it was supplied to this components constructor.
       * @memberof FooBar.utils.Component#
       * @name raw
       * @type {FooBar.utils.Component~Configuration}
       */
      self.raw = _is.hash(config) ? config : {};
      /**
       * @summary The options for this component.
       * @memberof FooBar.utils.Component#
       * @name opt
       * @type {FooBar.utils.Component~Options}
       */
      self.opt = _obj.extend({
        domEvents: false,
        bubbleEvents: true
      }, self.raw.options);
      /**
       * @summary The i18n strings for this component.
       * @memberof FooBar.utils.Component#
       * @name i18n
       * @type {Object}
       */
      self.i18n = _is.hash(self.raw.i18n) ? self.raw.i18n : {};
      /**
       * @summary The CSS classes for this component.
       * @memberof FooBar.utils.Component#
       * @name cls
       * @type {Object}
       */
      self.cls = _is.hash(self.raw.classes) ? self.raw.classes : {};
      /**
       * @summary The CSS selectors for this component.
       * @memberof FooBar.utils.Component#
       * @name sel
       * @type {Object}
       */
      self.sel = _is.hash(self.raw.classes) ? _.selectify(self.raw.classes) : {};
      /**
       * @summary The Promise object returned from the {@link FooBar.utils.Component#init|init} method.
       * @memberof FooBar.utils.Component#
       * @name __initialize
       * @type {?Promise}
       * @private
       */
      self.__initialize = null;
      /**
       * @summary Whether or not this component is being initialized.
       * @memberof FooBar.utils.Component#
       * @name isInitializing
       * @type {boolean}
       */
      self.isInitializing = false;
      /**
       * @summary Whether or not this component has been initialized.
       * @memberof FooBar.utils.Component#
       * @name isInitialized
       * @type {boolean}
       */
      self.isInitialized = false;
      /**
       * @summary Whether or not this component is being destroyed.
       * @memberof FooBar.utils.Component#
       * @name isDestroying
       * @type {boolean}
       */
      self.isDestroying = false;
      /**
       * @summary Whether or not this component has been destroyed.
       * @memberof FooBar.utils.Component#
       * @name isDestroyed
       * @type {boolean}
       */
      self.isDestroyed = false;
    },
    /**
     * @summary Merges the supplied config into the component updating various properties.
     * @memberof FooBar.utils.Component#
     * @function configure
     * @param {FooBar.utils.Component~Configuration} config - The configuration object to merge.
     */
    configure: function (config) {
      if (!_is.hash(config)) return;
      const self = this;
      _obj.merge(self.raw, config);
      if (_is.hash(config.options)) _obj.merge(self.opt, config.options);
      if (_is.hash(config.i18n)) _obj.merge(self.i18n, config.i18n);
      if (_is.hash(config.classes)) {
        _obj.merge(self.cls, config.classes);
        self.sel = _.selectify(self.cls);
      }
      self.trigger("configure", [config]);
    },
    /**
     * @summary Initializes the component adding extra functionality to the {@link FooBar.utils.Component#$el|element}.
     * @memberof FooBar.utils.Component#
     * @function init
     * @returns {Promise}
     */
    init: function () {
      const self = this;
      if (_is.promise(self.__initialize)) return self.__initialize;
      self.isInitializing = true;
      self.trigger("initializing");
      return self.__initialize = _fn.resolved.then(function () {
        self.trigger("before-setup");
        return self.beforeSetup();
      }).then(function () {
        self.trigger("setup");
        return self.setup();
      }).then(function () {
        self.trigger("after-setup");
        return self.afterSetup();
      }).then(function () {
        self.isInitializing = false;
        self.isInitialized = true;
        self.trigger("initialized");
      }, function () {
        self.isInitializing = false;
        self.isInitialized = false;
        const errors = _fn.arg2arr(arguments);
        self.trigger("setup-error", errors);
        return _fn.rejectWith.apply(null, errors);
      });
    },
    /**
     * @summary Used by subclasses to perform any internal work before the component setup is called.
     * @memberof FooBar.utils.Component#
     * @function beforeSetup
     * @returns {(Promise|void)}
     */
    beforeSetup: function () {},
    /**
     * @summary Used by subclasses to perform any additional setup the component requires.
     * @memberof FooBar.utils.Component#
     * @function setup
     * @returns {(Promise|void)}
     */
    setup: function () {},
    /**
     * @summary Used by subclasses to perform any internal work after the component setup is called.
     * @memberof FooBar.utils.Component#
     * @function afterSetup
     * @returns {(Promise|void)}
     */
    afterSetup: function () {},
    /**
     * @summary Destroys the component removing any added functionality and returning the {@link FooBar.utils.Component#$el|element} to its original state.
     * @memberof FooBar.utils.Component#
     * @function destroy
     */
    destroy: function () {
      const self = this;
      self.isDestroying = true;
      self.trigger("destroying");
      self.trigger("before-teardown");
      self.beforeTeardown();
      self.trigger("teardown");
      self.teardown();
      self.trigger("after-teardown");
      self.afterTeardown();
      self.__initialize = null;
      self.isInitialized = false;
      self.isDestroying = false;
      self.isDestroyed = true;
      self.trigger("destroyed");
      self._super();
    },
    /**
     * @summary Used by subclasses to perform any internal work before the component teardown is called.
     * @memberof FooBar.utils.Component#
     * @function beforeTeardown
     */
    beforeTeardown: function () {},
    /**
     * @summary Used by subclasses to perform any additional teardown the component requires.
     * @memberof FooBar.utils.Component#
     * @function teardown
     */
    teardown: function () {},
    /**
     * @summary Used by subclasses to perform any internal work after the component teardown is called.
     * @memberof FooBar.utils.Component#
     * @function afterTeardown
     */
    afterTeardown: function () {},
    /**
     * @summary Emits the supplied event on the current class.
     * @memberof FooBar.utils.Component#
     * @function emit
     * @param {FooBar.utils.Event} event - The event object to emit.
     * @param {Array} [args] - An array of additional arguments to supply to the listener after the event object.
     */
    emit: function (event, args) {
      const self = this;
      if (event instanceof _.Event) {
        const bubbled = event.target !== null && event.target !== self;
        if (!bubbled || bubbled && self.opt.bubbleEvents) {
          self._super(event, args);
          if (self.opt.domEvents) {
            let eventName = event.type;
            if (_is.string(event.namespace)) eventName += "." + event.namespace;
            self.$el.trigger(eventName, args);
          }
        }
        if (self.opt.bubbleEvents && self.parent instanceof _.Component) {
          self.parent.emit(event, args);
        }
      }
    }
  });
})(FooBar.utils.$, FooBar.utils, FooBar.utils.is, FooBar.utils.fn, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _is, _fn, _obj) {
  /**
   * @summary A registry class allowing components to be easily registered and created.
   * @memberof FooBar.utils.
   * @class ComponentRegistry
   * @param {FooBar.utils.ComponentRegistry~Options} [options] - The options for the registry.
   * @augments FooBar.utils.Class
   * @borrows FooBar.utils.Class.extend as extend
   * @borrows FooBar.utils.Class.override as override
   * @borrows FooBar.utils.Class.bases as bases
   */
  _.ComponentRegistry = _.Class.extend(/** @lends FooBar.utils.ComponentRegistry.prototype */{
    /**
     * @ignore
     * @constructs
     * @param {FooBar.utils.ComponentRegistry~Options} [options] - The options for the registry.
     */
    construct: function (options) {
      const self = this;
      /**
       * @summary The options for the registry.
       * @typedef {?Object} FooBar.utils.ComponentRegistry~Options
       * @property {boolean} [allowBase=true] - Whether or not to allow base components to be created. Base components are registered with a priority below 0.
       */

      /**
       * @summary The options for this instance.
       * @memberof FooBar.utils.ComponentRegistry#
       * @name opt
       * @type {FooBar.utils.ComponentRegistry~Options}
       */
      self.opt = _obj.extend({
        allowBase: true
      }, options);

      /**
       * @summary An object detailing a registered component.
       * @typedef {?Object} FooBar.utils.ComponentRegistry~RegisteredComponent
       * @property {string} name - The name of the component.
       * @property {FooBar.utils.Component} ctor - The component constructor.
       * @property {string} selector - The CSS selector for the component.
       * @property {FooBar.utils.Component~Configuration} config - The configuration object for the component providing default values that can be overridden at runtime.
       * @property {number} priority - This determines the index for the component when using the {@link FooBar.utils.ComponentRegistry#find|find} method, a higher value equals a lower index.
       */

      /**
       * @summary An object containing all registered components.
       * @memberof FooBar.utils.ComponentRegistry#
       * @name registered
       * @type {Object.<string, FooBar.utils.ComponentRegistry~RegisteredComponent>}
       * @readonly
       * @example {@caption The following shows the structure of this object. The `<name>` placeholders would be the name the component was registered with.}
       * {
       * 	"<name>": {
       * 		"name": <string>,
       * 		"ctor": <function>,
       * 		"selector": <string>,
       * 		"config": <object>,
       * 		"priority": <number>
       * 	},
       * 	"<name>": {
       * 		"name": <string>,
       * 		"ctor": <function>,
       * 		"selector": <string>,
       * 		"config": <object>,
       * 		"priority": <number>
       * 	},
       * 	...
       * }
       */
      self.registered = {};
    },
    /**
     * @summary The callback function for the {@link FooBar.utils.ComponentRegistry#each|each} method.
     * @callback FooBar.utils.ComponentRegistry~eachCallback
     * @param {FooBar.utils.ComponentRegistry~RegisteredComponent} registered - The current registered component being iterated over.
     * @returns {(boolean|undefined)} Return `false` to break out of the loop, all other values are ignored.
     */
    /**
     * @summary Iterates over all registered components executing the provided callback once per component.
     * @param {FooBar.utils.ComponentRegistry~eachCallback} callback - The callback to execute for each registered component.
     * @param {boolean} [prioritize=false] - Whether or not the registered components should be prioritized before iteration.
     * @param {*} [thisArg] - The value of `this` within the callback.
     */
    each: function (callback, prioritize, thisArg) {
      prioritize = _is.boolean(prioritize) ? prioritize : false;
      const self = this,
        names = Object.keys(self.registered),
        registered = names.map(function (name) {
          return self.registered[name];
        });
      if (prioritize) {
        registered.sort(function (a, b) {
          return b.priority - a.priority;
        });
      }
      let i = 0,
        l = registered.length;
      for (; i < l; i++) {
        const result = callback.call(thisArg, registered[i]);
        if (result === false) break;
      }
    },
    /**
     * @summary The callback function for the {@link FooBar.utils.ComponentRegistry#find|find} method.
     * @callback FooBar.utils.ComponentRegistry~findCallback
     * @param {FooBar.utils.ComponentRegistry~RegisteredComponent} registered - The current registered component being iterated over.
     * @returns {boolean} `true` to return the current registered component.
     */
    /**
     * @summary Iterates through all registered components until the supplied `callback` returns a truthy value.
     * @param {FooBar.utils.ComponentRegistry~findCallback} callback - The callback to execute for each registered component.
     * @param {boolean} [prioritize=false] - Whether or not the registered components should be prioritized before iteration.
     * @param {*} [thisArg] - The value of `this` within the callback.
     * @returns {?FooBar.utils.ComponentRegistry~RegisteredComponent} `null` if no registered component satisfied the `callback`.
     */
    find: function (callback, prioritize, thisArg) {
      prioritize = _is.boolean(prioritize) ? prioritize : false;
      const self = this,
        names = Object.keys(self.registered),
        registered = names.map(function (name) {
          return self.registered[name];
        });
      if (prioritize) {
        registered.sort(function (a, b) {
          return b.priority - a.priority;
        });
      }
      let i = 0,
        l = registered.length;
      for (; i < l; i++) {
        if (callback.call(thisArg, registered[i])) {
          return registered[i];
        }
      }
      return null;
    },
    /**
     * @summary Register a component constructor with the provided `name`.
     * @memberof FooBar.utils.ComponentRegistry#
     * @function register
     * @param {string} name - The name of the component.
     * @param {FooBar.utils.Component} component - The component constructor to register.
     * @param {string} selector - The CSS selector string used to determine whether a component handles an element.
     * @param {FooBar.utils.Component~Configuration} [config] - The configuration object for the component providing default values that can be overridden at runtime.
     * @param {number} [priority=0] - This determines the index for the component when using the {@link FooBar.utils.ComponentRegistry#find|find} method, a higher value equals a lower index.
     * @returns {boolean} Returns `true` if the component was successfully registered.
     */
    register: function (name, component, selector, config, priority) {
      const self = this;
      if (_is.string(name) && !_is.empty(name) && _is.fn(component) && _is.string(selector)) {
        priority = _is.number(priority) ? priority : 0;
        const current = self.registered[name];
        self.registered[name] = {
          name: name,
          ctor: component,
          selector: selector,
          config: _is.hash(config) ? config : {},
          priority: !_is.undef(current) ? current.priority : priority
        };
        return true;
      }
      return false;
    },
    /**
     * @summary Create a new instance of a registered component by inspecting the supplied `element`.
     * @memberof FooBar.utils.ComponentRegistry#
     * @function create
     * @param {(jQuery|Element)} element - The element to create a new component for.
     * @param {FooBar.utils.Component~Configuration} [config] - Any custom configuration to supply to the component.
     * @param {FooBar.utils.Component} [parent] - The parent component for the new component.
     * @param {...*} [argN] - Any number of additional arguments to pass to the component constructor.
     * @returns {?FooBar.utils.Component} Returns `null` if no registered component can handle the supplied `element`.
     */
    create: function (element, config, parent, argN) {
      const self = this,
        args = _fn.arg2arr(arguments);
      element = args.shift();
      const registered = self.fromElement(element);
      if (registered !== null) {
        let allowed = true;
        if (registered.priority < 0 && !self.opt.allowBase) allowed = false;
        if (allowed && _is.fn(registered.ctor)) {
          config = args.shift();
          parent = args.shift();
          // get a merged user supplied config including any options supplied using data attributes
          config = self.mergeConfigurations(registered.name, config, element, parent);
          args.unshift.apply(args, [registered.name, element, config, parent]);
          return _fn.apply(registered.ctor, args);
        }
      }
      return null;
    },
    /**
     * @summary Create new instances of all registered components found within the provided `root` element.
     * @memberof FooBar.utils.ComponentRegistry#
     * @function createAll
     * @param {(jQuery|element)} root - The element to search for components.
     * @param {FooBar.utils.Component~Configuration} [config] - Any custom configuration to supply to the components.
     * @param {FooBar.utils.Component} [parent] - The parent component for new components.
     * @param {...*} [argN] - Any number of additional arguments to pass to the component constructors.
     * @returns {Array.<FooBar.utils.Component>} Returns an array of all created components.
     */
    createAll: function (root, config, parent, argN) {
      const self = this,
        args = _fn.arg2arr(arguments),
        result = [];
      root = args.shift();
      root = _is.jq(root) ? root : $(root);
      if (root.length > 0) {
        const selectors = [],
          registeredBase = self.getBaseComponent();
        if (registeredBase !== null) {
          selectors.push(registeredBase.selector);
        } else {
          self.each(function (registered) {
            selectors.push(registered.selector);
          }, true);
        }
        root.find(selectors.join(",")).each(function (i, element) {
          const cArgs = args.slice();
          cArgs.unshift(element);
          const component = self.create.apply(self, cArgs);
          if (component instanceof _.Component) {
            result.push(component);
          }
        });
      }
      return result;
    },
    /**
     * @summary Get the merged configuration for a component including values supplied through data attributes.
     * @memberof FooBar.utils.ComponentRegistry#
     * @function mergeConfigurations
     * @param {string} name - The name of the component to get the config for.
     * @param {FooBar.utils.Component~Configuration} [config] - The user supplied defaults to override.
     * @param {(jQuery|Element)} [element] - The element to pull data attributes from.
     * @param {FooBar.utils.Component} [parent] - The parent component for the new component.
     * @returns {FooBar.utils.Component~Configuration}
     */
    mergeConfigurations: function (name, config, element, parent) {
      const self = this;
      if (_is.string(name) && self.registered.hasOwnProperty(name)) {
        // check params
        config = _is.hash(config) ? config : {};
        element = _is.jq(element) ? element : $(element);

        // if supplied a parent merge its configuration for the component into the provided config
        if (parent instanceof _.Component && _is.hash(parent.raw[name])) {
          config = _obj.extend({}, config, parent.raw[name]);
        }
        // if we have a valid element merge any data attributes into the provided config
        if (element.length > 0) {
          config = _obj.extend({}, config, element.data());
        }
        const baseComponents = self.getBaseComponents(name),
          eArgs = [{}];
        baseComponents.push(self.registered[name]);
        baseComponents.forEach(function (reg) {
          eArgs.push(reg.config);
        });
        eArgs.push(config);
        return _obj.extend.apply(_obj, eArgs);
      }
      return {};
    },
    /**
     * @summary Gets the registered base component for this instance.
     * @memberof FooBar.utils.ComponentRegistry#
     * @function getBaseComponent
     * @returns {?FooBar.utils.ComponentRegistry~RegisteredComponent}
     */
    getBaseComponent: function () {
      return this.find(function (registered) {
        return registered.priority < 0;
      }, true);
    },
    /**
     * @summary Get all registered base components for the supplied `name`.
     * @memberof FooBar.utils.ComponentRegistry#
     * @function getBaseComponents
     * @param {string} name - The name of the component to get the bases for.
     * @returns {FooBar.utils.ComponentRegistry~RegisteredComponent[]}
     */
    getBaseComponents: function (name) {
      const self = this,
        reg = self.registered[name],
        result = [];
      if (!_is.undef(reg)) {
        reg.ctor.getBaseClasses().forEach(function (base) {
          const found = self.fromType(base);
          if (_is.hash(found)) {
            result.push(found);
          }
        });
      }
      return result;
    },
    /**
     * @summary Attempts to find a registered component given the type/constructor.
     * @memberof FooBar.utils.ComponentRegistry#
     * @function fromType
     * @param {FooBar.utils.Component} type - The type/constructor of the registered component to find.
     * @returns {(FooBar.utils.ComponentRegistry~RegisteredComponent|undefined)} Returns the registered component if found. Otherwise, `undefined` is returned.
     */
    fromType: function (type) {
      if (!_is.fn(type)) return;
      return this.find(function (registered) {
        return registered.ctor === type;
      });
    },
    /**
     * @summary Attempts to find a registered component that can handle the provided element.
     * @memberof FooBar.utils.ComponentRegistry#
     * @function fromElement
     * @param {(jQuery|Element)} element - The jQuery wrapper around an element or the actual element itself.
     * @returns {(FooBar.utils.ComponentRegistry~RegisteredComponent|undefined)} Returns the registered component if found. Otherwise, `undefined` is returned.
     */
    fromElement: function (element) {
      element = _is.jq(element) ? element : $(element);
      if (element.length === 0) return;
      return this.find(function (registered) {
        return element.is(registered.selector);
      }, true);
    }
  });
})(FooBar.utils.$, FooBar.utils, FooBar.utils.is, FooBar.utils.fn, FooBar.utils.obj);
"use strict";

(function ($, _, _is, _fn, _obj) {
  /**
   * @summary A parent component that manages all child components found within its element.
   * @memberof FooBar.utils.
   * @class ParentComponent
   * @param {string} name - The name of the component.
   * @param {(jQuery|HTMLElement)} element - The root element to manage.
   * @param {FooBar.utils.ParentComponent~Configuration} config - The configuration for the component.
   * @param {FooBar.utils.ParentComponent} parent - The parent component for this component.
   * @param {FooBar.utils.ComponentRegistry} childRegistry - The child component registry used to created child components.
   * @augments FooBar.utils.Component
   * @borrows FooBar.utils.Class.extend as extend
   * @borrows FooBar.utils.Class.override as override
   * @borrows FooBar.utils.Class.bases as bases
   */
  _.ParentComponent = _.Component.extend(/** @lends FooBar.utils.ParentComponent.prototype */{
    /**
     * @ignore
     * @constructs
     * @param {string} name - The name of the component.
     * @param {(jQuery|HTMLElement)} element - The root element to manage.
     * @param {FooBar.utils.ParentComponent~Configuration} config - The configuration for the component.
     * @param {FooBar.utils.Component} parent - The parent component for this component.
     * @param {FooBar.utils.ComponentRegistry} childRegistry - The child component registry used to created child components.
     */
    construct: function (name, element, config, parent, childRegistry) {
      let self = this;
      // call the base FooBar.utils.Component#construct method
      self._super(name, element, config, parent);
      /**
       * @summary The configuration object for a parent component.
       * @typedef {FooBar.utils.Component~Configuration} FooBar.utils.ParentComponent~Configuration
       * @property {FooBar.utils.Component~Configuration} [defaults] - An object containing a default configuration shared by all child components created by this parent.
       */

      /**
       * @summary The raw configuration object for this instance.
       * @memberof FooBar.ParentComponent#
       * @name raw
       * @type {FooBar.utils.ParentComponent~Configuration}
       */

      /**
       * @summary The registry of child components for this instance.
       * @memberof FooBar.utils.ParentComponent#
       * @name childRegistry
       * @type {FooBar.utils.ComponentRegistry}
       */
      self.childRegistry = childRegistry;
      const registeredBase = childRegistry.getBaseComponent();
      /**
       * @summary The base component type for all child components.
       * @memberof FooBar.utils.ParentComponent#
       * @name childComponentBase
       * @type {FooBar.utils.Component}
       */
      self.childComponentBase = registeredBase !== null ? registeredBase.ctor : _.Component;
      /**
       * @summary An array of all child components being managed.
       * @memberof FooBar.utils.ParentComponent#
       * @name children
       * @type {Array.<FooBar.utils.Component>}
       */
      self.children = [];
    },
    //region Internal Methods
    /**
     * @summary Create and then initialize all child components found within the {@link FooBar.utils.ParentComponent#el|element} before the {@link FooBar.utils.ParentComponent#setup|setup} method is called.
     * @memberof FooBar.utils.ParentComponent#
     * @function beforeSetup
     * @returns {Promise}
     */
    beforeSetup: function () {
      const self = this,
        wait = self.createChildren().map(function (child) {
          return child.init().fail(function () {
            child.destroy();
          });
        });
      return _fn.whenAll(wait);
    },
    /**
     * @summary Destroy all managed components after calling the {@link FooBar.utils.ParentComponent#teardown|teardown} method.
     * @memberof FooBar.utils.ParentComponent#
     * @function afterTeardown
     */
    afterTeardown: function () {
      const self = this;
      self.destroyChildren();
    },
    //endregion
    /**
     * @summary Create a single component using the child registry and the provided element.
     * @memberof FooBar.utils.ParentComponent#
     * @function registryCreate
     * @param {(string|jQuery|Element)} element - The element to create a child component for.
     * @returns {?FooBar.utils.Component}
     */
    registryCreate: function (element) {
      const self = this;
      return self.childRegistry.create(element, self.raw.defaults, self);
    },
    /**
     * @summary Create all child components found within the element using the child registry.
     * @memberof FooBar.utils.ParentComponent#
     * @function registryCreateAll
     * @returns {FooBar.utils.Component[]}
     */
    registryCreateAll: function () {
      const self = this;
      return self.childRegistry.createAll(self.$el, self.raw.defaults, self);
    },
    /**
     * @summary Find a child component.
     * @memberof FooBar.utils.ParentComponent#
     * @function findChild
     * @param {function(FooBar.utils.Component):boolean} callback - The callback used to find the child.
     * @returns {(FooBar.utils.Component|undefined)} Returns the child component that satisfies the provided callback. Otherwise, `undefined` is returned.
     */
    findChild: function (callback) {
      return _.find(this.children, callback);
    },
    /**
     * @summary Create a new instance of a child component from the provided element.
     * @memberof FooBar.utils.ParentComponent#
     * @function createChild
     * @param {(string|jQuery|Element)} element - A selector or element to create a child from. The element must exist within this parents {@link FooBar.utils.ParentComponent#el|element}.
     * @returns {?FooBar.utils.Component} Returns a new child component if created. Otherwise, `null` is returned.
     */
    createChild: function (element) {
      const self = this;
      const $target = self.$el.find(element);
      if ($target.length > 0) {
        element = $target.get(0);
        let child = self.findChild(function (child) {
          return child.el === element;
        });
        if (child instanceof self.childComponentBase) {
          child.destroy();
        }
        child = self.registryCreate($target);
        if (child instanceof self.childComponentBase) {
          child.on({
            "initializing": self.onChildInitializing,
            "destroyed": self.onChildDestroyed
          }, self);
          return /** @type {?FooBar.utils.Component} */child;
        }
      }
      return null;
    },
    /**
     * @summary Create new instances of all child components found within the {@link FooBar.utils.ParentComponent#el|element}.
     * @memberof FooBar.utils.ParentComponent#
     * @function createChildren
     * @returns {Array.<FooBar.utils.Component>}
     */
    createChildren: function () {
      const self = this;
      self.destroyChildren();
      const created = self.registryCreateAll();
      created.forEach(function (child) {
        child.on({
          "initializing": self.onChildInitializing,
          "destroyed": self.onChildDestroyed
        }, self);
      });
      return created;
    },
    /**
     * @summary Destroy all instances of child components.
     * @memberof FooBar.utils.ParentComponent#
     * @function destroyChildren
     * @returns {void}
     */
    destroyChildren: function () {
      const self = this;
      self.children.slice().forEach(function (child) {
        child.destroy();
      });
    },
    //region Listeners
    /**
     * @summary Whenever a child component created by this parent starts initializing this listener is called.
     * @memberof FooBar.utils.ParentComponent#
     * @function onChildInitializing
     * @param {FooBar.utils.Event} e - An object containing basic details about the event.
     * @description This listener adds any initializing child components to the {@link FooBar.utils.ParentComponent#children|children} array.
     */
    onChildInitializing: function (e) {
      const self = this;
      if (e.target instanceof self.childComponentBase) {
        const index = self.children.indexOf(e.target);
        if (index === -1) {
          self.children.push(e.target);
        }
      }
    },
    /**
     * @summary Whenever a child component created by this parent is destroyed this listener is called.
     * @memberof FooBar.utils.ParentComponent#
     * @function onChildDestroyed
     * @param {FooBar.utils.Event} e - An object containing basic details about the event.
     * @description This listener performs cleanup of any attached events on destroyed child components and removes
     * them from the {@link FooBar.utils.ParentComponent#children|children} array.
     */
    onChildDestroyed: function (e) {
      const self = this;
      if (e.target instanceof self.childComponentBase) {
        e.target.off({
          "initializing": self.onChildInitializing,
          "destroyed": self.onChildDestroyed
        }, self);
        const index = self.children.indexOf(e.target);
        if (index !== -1) {
          self.children.splice(index, 1);
        }
      }
    }
    //endregion
  });
})(FooBar.utils.$, FooBar.utils, FooBar.utils.is, FooBar.utils.fn, FooBar.utils.obj);
"use strict";

(function ($, _, _fn, _obj) {
  /**
   * @summary A parent component that manages all child components found within its observed element.
   * @memberof FooBar.utils.
   * @class ObservedParentComponent
   * @param {string} name - The name of the component.
   * @param {(jQuery|HTMLElement)} element - The root element to manage.
   * @param {FooBar.utils.ParentComponent~Configuration} config - The configuration for the component.
   * @param {FooBar.utils.ParentComponent} parent - The parent component for this component.
   * @param {FooBar.utils.ComponentRegistry} childRegistry - The child component registry used to created child components.
   * @augments FooBar.utils.ParentComponent
   * @borrows FooBar.utils.Class.extend as extend
   * @borrows FooBar.utils.Class.override as override
   * @borrows FooBar.utils.Class.bases as bases
   */
  _.ObservedParentComponent = _.ParentComponent.extend(/** @lends FooBar.utils.ObservedParentComponent.prototype */{
    /**
     * @ignore
     * @constructs
     * @param {string} name - The name of the component.
     * @param {(jQuery|HTMLElement)} element - The root element to manage.
     * @param {FooBar.utils.ParentComponent~Configuration} config - The configuration for the component.
     * @param {FooBar.utils.ParentComponent} parent - The parent component for this component.
     * @param {FooBar.utils.ComponentRegistry} childRegistry - The child component registry used to created child components.
     */
    construct: function (name, element, config, parent, childRegistry) {
      const self = this;
      self._super(name, element, config, parent, childRegistry);
      /**
       * @summary The configuration object for an observed parent component.
       * @typedef {FooBar.utils.Component~Configuration} FooBar.utils.ObservedParentComponent~Configuration
       * @property {FooBar.utils.ObservedParentComponent~Options} [options] - The options for the observed parent component.
       * @property {FooBar.utils.Component~Configuration} [defaults] - An object containing a default configuration shared by all child components created by this parent.
       */

      /**
       * @summary The options object for an observed parent component.
       * @typedef {?Object} FooBar.utils.ObservedParentComponent~Options
       * @property {number} [observeThrottle=1000/60] - Limit observations to X milliseconds.
       */

      /**
       * @summary The raw configuration object as it was supplied to this components constructor.
       * @memberof FooBar.utils.ObservedParentComponent#
       * @name raw
       * @type {FooBar.utils.ObservedParentComponent~Configuration}
       */

      /**
       * @summary The options for this component.
       * @memberof FooBar.utils.ObservedParentComponent#
       * @name opt
       * @type {FooBar.utils.ObservedParentComponent~Options}
       */
      self.opt = _obj.merge({
        observeThrottle: 1000 / 60
      }, self.opt);
      /**
       * @summary The ResizeObserver used by this component to adapt to size changes.
       * @memberof FooBar.utils.ObservedParentComponent#
       * @name rObserver
       * @type {ResizeObserver}
       */
      self.rObserver = new ResizeObserver(_fn.throttle(self.onResizeObserved.bind(self), self.opt.observeThrottle));
      /**
       * @summary The MutationObserver used by this component to adapt to CSS class changes.
       * @memberof FooBar.utils.ObservedParentComponent#
       * @name mObserver
       * @type {MutationObserver}
       */
      self.mObserver = new MutationObserver(_fn.throttle(self.onMutationObserved.bind(self), self.opt.observeThrottle));
      /**
       * @summary Whether or not the component is currently observing its {@link FooBar.utils.ObservedParentComponent#el|element}.
       * @memberof FooBar.utils.ObservedParentComponent#
       * @name isObserved
       * @type {boolean}
       */
      self.isObserved = false;
      /**
       * @summary The id of the timer used by the ignoreConnect param of the {@link FooBar.utils.ObservedParentComponent#observe|observe} method.
       * @memberof FooBar.utils.ObservedParentComponent#
       * @name _ignoreId
       * @type {number|null}
       * @private
       */
      self._ignoreId = null;
      /**
       * @summary Whether or not the first resize after connect should be ignored.
       * @memberof FooBar.utils.ObservedParentComponent#
       * @name _ignoreResize
       * @type {boolean}
       * @private
       */
      self._ignoreResize = false;
      /**
       * @summary Whether or not the first mutation after connect should be ignored.
       * @memberof FooBar.utils.ObservedParentComponent#
       * @name _ignoreResize
       * @type {boolean}
       * @private
       */
      self._ignoreMutation = false;
    },
    /**
     * @summary Unobserve the component element before the teardown is called.
     * @memberof FooBar.utils.Component#
     * @function beforeTeardown
     */
    beforeTeardown: function () {
      const self = this;
      self.unobserve();
      self._super();
    },
    /**
     * @summary Initiates the observing of the components {@link FooBar.utils.ObservedParentComponent#el|element}.
     * @memberof FooBar.utils.ObservedParentComponent#
     * @function observe
     * @param {boolean} [ignoreConnect] - Whether or not the first observation that triggers on connect is ignored or not.
     */
    observe: function (ignoreConnect) {
      const self = this;
      if (self.isInitialized && self.el instanceof Node && !self.isObserved) {
        if (ignoreConnect) {
          self._ignoreResize = true;
          self._ignoreMutation = true;
        }
        self.rObserver.observe(self.el);
        self.mObserver.observe(self.el, {
          attributes: true,
          attributeFilter: ["class"]
        });
        clearTimeout(self._ignoreId);
        self._ignoreId = setTimeout(function () {
          self._ignoreResize = false;
          self._ignoreMutation = false;
        }, 100);
        self.isObserved = true;
      }
    },
    /**
     * @summary Ends the observing of the components {@link FooBar.utils.ObservedParentComponent#el|element}.
     * @memberof FooBar.utils.ObservedParentComponent#
     * @function unobserve
     */
    unobserve: function () {
      const self = this;
      if (self.isInitialized && self.el instanceof Node && self.isObserved) {
        clearTimeout(self._ignoreId);
        self.rObserver.disconnect();
        self.mObserver.disconnect();
        self.isObserved = false;
      }
    },
    /**
     * @summary Called whenever a size change has been observed.
     * @memberof FooBar.utils.ObservedParentComponent#
     * @function onSizeChange
     */
    onSizeChange: function () {},
    /**
     * @summary Called whenever a CSS class change has been observed.
     * @memberof FooBar.utils.ObservedParentComponent#
     * @function onClassChange
     */
    onClassChange: function () {},
    //region Listeners
    /**
     * @summary The callback function for the ResizeObserver.
     * @memberof FooBar.utils.ObservedParentComponent#
     * @function onResizeObserved
     * @param entries
     */
    onResizeObserved: function (entries) {
      const self = this;
      if (self._ignoreResize) {
        self._ignoreResize = false;
        return;
      }

      // there should only ever be a single entry as we only monitor the bar element
      // but just in case lets iterate the collection
      let resized = false;
      entries.forEach(function (entry) {
        if (!resized && entry.target.id === self.el.id) {
          resized = true;
          const size = _.getResizeObserverSize(entry);
          self.onSizeChange(size);
        }
      });
    },
    /**
     * @summary The callback function for the MutationObserver.
     * @memberof FooBar.utils.ObservedParentComponent#
     * @function onMutationObserved
     * @param mutations
     */
    onMutationObserved: function (mutations) {
      const self = this;
      if (self._ignoreMutation) {
        self._ignoreMutation = false;
        return;
      }
      // even though we only watch a single element there can still be multiple mutations
      // and even though there should only be a single element being monitored we want to make
      // sure so lets iterate the collection
      let updated = false;
      mutations.forEach(function (mutation) {
        if (!updated && mutation.target.id === self.el.id) {
          updated = true;
          self.onClassChange();
        }
      });
    }
    //endregion
  });
})(FooBar.utils.$, FooBar.utils, FooBar.utils.fn, FooBar.utils.obj);
"use strict";

(function ($, _, _is, _obj) {
  /**
   * @summary Used to split all `symbol` elements from a single `svg` into multiple stand-alone `svg` elements.
   * @memberof FooBar.utils.
   * @class SVGSplitter
   * @param {FooBar.utils.SVGSplitter~Options} [options] - The options for the splitter.
   * @augments FooBar.utils.Class
   * @borrows FooBar.utils.Class.extend as extend
   * @borrows FooBar.utils.Class.override as override
   * @borrows FooBar.utils.Class.bases as bases
   */
  _.SVGSplitter = _.Class.extend(/** @lends FooBar.utils.SVGSplitter.prototype */{
    /**
     * @summary Performs the actual construction of a new instance of this class.
     * @memberof FooBar.utils.SVGSplitter#
     * @constructs
     * @param {FooBar.utils.SVGSplitter~Options} [options] - The options for the splitter.
     * @augments FooBar.utils.Class
     */
    construct: function (options) {
      const self = this;
      /**
       * @summary The options for the SVGSplitter class.
       * @typedef {Object} FooBar.utils.SVGSplitter~Options
       * @property {string} [xmlns="http://www.w3.org/2000/svg"] - The SVG XML namespace.
       * @property {string[]} [ignore] - An array of attribute names that will not be copied when splitting `symbol` elements into stand-alone `svg` elements.
       * @property {RegExp} [filterRegex] - The Regular Expression used to parse the target from a `filter` attribute.
       */

      /**
       * @summary The options for this instance of the splitter.
       * @memberof FooBar.utils.SVGSplitter#
       * @name opt
       * @type {FooBar.utils.SVGSplitter~Options}
       */
      self.opt = _obj.extend({
        xmlns: "http://www.w3.org/2000/svg",
        ignore: [],
        filterRegex: /^(?:url\(["']?)(#.*?)(?:["']?\))/
      }, options);
    },
    /**
     * @summary Get all attribute names from the supplied element.
     * @memberof FooBar.utils.SVGSplitter#
     * @function getAttributeNames
     * @param {Element} element - The element to retrieve all attribute names from.
     * @returns {string[]}
     */
    getAttributeNames: function (element) {
      if (element instanceof Element) {
        if (element.getAttributeNames) return element.getAttributeNames();
        const attrs = Array.prototype.slice.call(element.attributes);
        return attrs.map(function (attr) {
          return attr.name;
        });
      }
      return [];
    },
    /**
     * @summary Copy all attributes from one element to another.
     * @memberof FooBar.utils.SVGSplitter#
     * @function copyAttributes
     * @param {Element} source - The element to copy attributes from.
     * @param {Element} target - The element to copy attributes to.
     * @param {string[]} [ignore] - An optional array of attributes names to ignore.
     */
    copyAttributes: function (source, target, ignore) {
      if (source instanceof Element && target instanceof Element) {
        ignore = _is.array(ignore) ? ignore : [];
        this.getAttributeNames(source).forEach(function (name) {
          if (ignore.indexOf(name) !== -1) return;
          target.setAttribute(name, source.getAttribute(name));
        });
      }
    },
    /**
     * @summary Get the `href` or `xlink:href` attribute from the supplied element.
     * @memberof FooBar.utils.SVGSplitter#
     * @function getHref
     * @param {SVGElement} element - The element to get the attribute from.
     * @returns {?string} `null` if the element is not an SVGElement or no attribute could be found.
     */
    getHref: function (element) {
      if (element instanceof SVGElement) {
        if (element.hasAttribute("href")) return element.getAttribute("href");
        if (element.hasAttribute("xlink:href")) return element.getAttribute("xlink:href");
      }
      return null;
    },
    /**
     * @summary Get the target of the supplied <use> elements `href` or `xlink:href` attribute.
     * @memberof FooBar.utils.SVGSplitter#
     * @function getUseDef
     * @param {SVGUseElement} use - The <use> element to parse.
     * @returns {?Node}
     */
    getUseDef: function (use) {
      if (use instanceof SVGUseElement) {
        let selector = this.getHref(use);
        if (_is.string(selector)) {
          const element = use.ownerSVGElement.querySelector(selector);
          if (element instanceof Element) {
            return element.cloneNode(true);
          }
        }
      }
      return null;
    },
    /**
     * @summary Get the target of the supplied elements `filter` attribute.
     * @memberof FooBar.utils.SVGSplitter#
     * @function getFilterDef
     * @param {SVGElement} element - The element to parse.
     * @returns {?Node}
     */
    getFilterDef: function (element) {
      if (element instanceof SVGElement) {
        const attr = element.getAttribute("filter");
        if (_is.string(attr)) {
          const match = attr.match(this.opt.filterRegex);
          if (match !== null && match.length === 2) {
            // fetch the filter from the parent
            const filter = element.ownerSVGElement.querySelector(match[1]);
            if (filter instanceof SVGFilterElement) {
              return filter.cloneNode(true);
            }
          }
        }
      }
      return null;
    },
    /**
     * @summary Get all defs used by the supplied `symbol` element.
     * @memberof FooBar.utils.SVGSplitter#
     * @function getDefs
     * @param {SVGSymbolElement} symbol - The `symbol` to parse.
     * @returns {Node[]}
     */
    getDefs: function (symbol) {
      const self = this,
        defs = [];
      if (symbol instanceof SVGSymbolElement) {
        const uses = symbol.querySelectorAll("use");
        for (let i = 0, l = uses.length; i < l; i++) {
          const found = self.getUseDef(uses[i]);
          if (found instanceof Node && defs.indexOf(found) === -1) {
            defs.push(found);
          }
        }
        const elements = symbol.querySelectorAll('[filter]');
        for (let i = 0, l = elements.length; i < l; i++) {
          const filter = self.getFilterDef(elements[i]);
          if (filter instanceof Node && defs.indexOf(filter) === -1) {
            defs.unshift(filter);
          }
        }
      }
      return defs;
    },
    /**
     * @summary Create a stand-alone `svg` from the supplied `symbol` element.
     * @memberof FooBar.utils.SVGSplitter#
     * @function createSVGElement
     * @param {SVGSymbolElement} symbol - The `symbol` to parse.
     * @returns {?Element}
     */
    createSVGElement: function (symbol) {
      const self = this;
      if (symbol instanceof SVGSymbolElement) {
        const svg = document.createElementNS(self.opt.xmlns, "svg");
        self.copyAttributes(symbol.ownerSVGElement, svg, self.opt.ignore);
        self.copyAttributes(symbol, svg, self.opt.ignore);
        const length = symbol.childNodes.length;
        for (let i = 0, node; i < length; i++) {
          node = symbol.childNodes[i];
          if (node.nodeType !== 1) continue;
          svg.appendChild(node.cloneNode(true));
        }
        const definitions = self.getDefs(symbol);
        if (definitions.length > 0) {
          let defs = svg.querySelector("defs");
          if (defs === null) {
            defs = document.createElementNS(self.opt.xmlns, "defs");
            svg.insertBefore(defs, svg.firstChild);
          }
          definitions.forEach(function (def) {
            defs.appendChild(def);
          });
        }
        return svg;
      }
      return null;
    },
    /**
     * @summary Parse the supplied `svg` element and split out all `symbol` elements with an ID into there own `svg` element.
     * @memberof FooBar.utils.SVGSplitter#
     * @function parse
     * @param {SVGSVGElement} svg - The `svg` element to parse.
     * @returns {Object<string, SVGSVGElement>}
     */
    parse: function (svg) {
      const self = this,
        result = {};
      if (svg instanceof SVGSVGElement) {
        const symbols = svg.querySelectorAll("symbol[id]");
        for (let i = 0, l = symbols.length; i < l; i++) {
          if (symbols[i].id === "") continue;
          const created = self.createSVGElement(symbols[i]);
          if (created instanceof SVGSVGElement) {
            result[symbols[i].id] = created;
          }
        }
      }
      return result;
    }
  });
})(FooBar.utils.$, FooBar.utils, FooBar.utils.is, FooBar.utils.obj);
"use strict";

(function ($, _, _is, _obj, _str) {
  /**
   * @summary An SVG registry that provides CSS stylable stand-alone `svg` icons generated from SVG sprites.
   * @memberof FooBar.utils.
   * @class SVGRegistry
   * @param {FooBar.utils.SVGRegistry~Options} options - The options for the manager.
   * @augments FooBar.utils.Class
   * @borrows FooBar.utils.Class.extend as extend
   * @borrows FooBar.utils.Class.override as override
   * @borrows FooBar.utils.Class.bases as bases
   */
  _.SVGRegistry = _.Class.extend(/** @lends FooBar.utils.SVGRegistry.prototype */{
    /**
     * @ignore
     * @constructs
     * @param {FooBar.utils.SVGRegistry~Options} options - The options for the manager.
     */
    construct: function (options) {
      const self = this;
      /**
       * @summary The options for the SVGRegistry class.
       * @typedef {?Object} FooBar.utils.SVGRegistry~Options
       * @property {?string} [id=null] - The default id used to register additional `svg` elements from the page.
       * @property {string} [iconClass=""] - The CSS class to add to every icon. This is also used as a prefix when generating a unique CSS class for an icon based off its <symbol> id.
       * @property {FooBar.utils.SVGSplitter~Options} [splitter={ignore:["id","class"]}] - The options supplied to the SVG splitter used by the manager.
       */

      /**
       * @summary The options for this instance of the manager.
       * @memberof FooBar.utils.SVGRegistry#
       * @name opt
       * @type {FooBar.utils.SVGRegistry~Options}
       */
      self.opt = _obj.extend({
        id: null,
        iconClass: "",
        splitter: {
          ignore: ["id", "class"]
        }
      }, options);
      /**
       * @summary An object containing all registered icons.
       * @memberof FooBar.utils.SVGRegistry#
       * @name registered
       * @type {Object<string, Object<string, SVGSVGElement>>}
       */
      self.registered = {
        defaults: {}
      };
      /**
       * @summary The SVG splitter used to separate sprites into stand-alone `svg` elements.
       * @memberof FooBar.utils.SVGRegistry#
       * @name splitter
       * @type {FooBar.SVGSplitter}
       */
      self.splitter = new _.SVGSplitter(self.opt.splitter);
    },
    /**
     * @summary Initializes the manager registering any `svg` elements found in the page using the `id` option.
     * @memberof FooBar.utils.SVGRegistry#
     * @function init
     */
    init: function () {
      const self = this;
      if (_is.string(self.opt.id) && self.opt.id.length > 0) {
        $("svg[id|='" + self.opt.id + "']").each(function (i, svg) {
          if (svg.id === self.opt.id) {
            self.register("defaults", svg);
          } else if (svg.id.length > self.opt.id.length) {
            // if we're here that means the id begins with "foobar-icons-" so trim it to get the name
            const name = svg.id.splice(0, self.opt.id.length + 1);
            self.register(name, svg);
          }
        });
      }
    },
    /**
     * @summary Register an `svg` with the provided `name`.
     * @memberof FooBar.utils.SVGRegistry#
     * @function register
     * @param {string} name - The name for the `svg`, if it already exists any differences will be merged.
     * @param {(string|jQuery|SVGSVGElement)} svg - The SVG to register.
     * @returns {boolean}
     */
    register: function (name, svg) {
      if (_is.string(name)) {
        const self = this,
          $svg = $(svg);
        if ($svg.length === 1 && $svg.is("svg")) {
          const icons = self.splitter.parse($svg.get(0)),
            current = self.registered[name];
          self.registered[name] = _obj.extend({}, self.registered.defaults, current, icons);
          return true;
        }
      }
      return false;
    },
    /**
     * @summary Check if the provided icon exists.
     * @memberof FooBar.utils.SVGRegistry#
     * @function exists
     * @param {string} iconName - The name of the icon to check for.
     * @param {string} [svgName="defaults"] - The registered SVG to check for the icon.
     * @returns {boolean}
     */
    exists: function (iconName, svgName) {
      const self = this;
      // have to provide at least an icon name to check
      if (_is.string(iconName)) {
        let icons = _is.string(svgName) && self.registered.hasOwnProperty(svgName) ? self.registered[svgName] : null;
        if (icons === null || !icons.hasOwnProperty(iconName)) {
          icons = self.registered.defaults;
        }
        return icons[iconName] instanceof SVGSVGElement;
      }
      return false;
    },
    /**
     * @summary Get an icon.
     * @memberof FooBar.utils.SVGRegistry#
     * @function get
     * @param {string} iconName - The name of the icon to get.
     * @param {string} [svgName="defaults"] - The SVG to retrieve the icon from.
     * @param {string[]} [classes] - Any additional CSS classes to add to the returned icon.
     * @returns {?Node}
     */
    get: function (iconName, svgName, classes) {
      const self = this;
      // have to provide at least the icon name to try fetch something
      if (_is.string(iconName)) {
        let icons = _is.string(svgName) && self.registered.hasOwnProperty(svgName) ? self.registered[svgName] : null;
        if (icons === null || !icons.hasOwnProperty(iconName)) {
          icons = self.registered.defaults;
        }
        if (icons[iconName] instanceof Element) {
          // 2 default CSS classes: fbr-icon fbr-icon-ICON_NAME
          let classNames = [self.opt.iconClass, self.opt.iconClass + "-" + iconName];
          if (_is.array(classes)) {
            // merge any additional CSS classes
            classes.forEach(function (className) {
              // only merge if string and unique
              if (_is.string(className) && classNames.indexOf(className) === -1) {
                classNames.push(className);
              }
            });
          }
          // here we make a clone of the registered icon so that it is not modified
          const clone = icons[iconName].cloneNode(true);
          clone.setAttribute("class", classNames.join(" "));
          return clone;
        }
      }
      return null;
    },
    /**
     * @summary Get all icons for the provided SVG name.
     * @memberof FooBar.utils.SVGRegistry#
     * @function all
     * @param {string} [svgName="defaults"] - The name of the SVG to retrieve icons from.
     * @param {string[]} [classes] - Any additional CSS classes to add to the returned icons.
     * @returns {Object<string, Node>} An array of all icons for the provided `svgName`.
     */
    all: function (svgName, classes) {
      const self = this,
        all = {};
      let icons = _is.string(svgName) && self.registered.hasOwnProperty(svgName) ? self.registered[svgName] : self.registered.defaults;
      Object.keys(icons).forEach(function (key) {
        all[key] = self.get(key, svgName, classes);
      });
      return all;
    }
  });
})(FooBar.utils.$, FooBar.utils, FooBar.utils.is, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _fn, _obj) {
  /**
   * @summary A registry class allowing components to be easily registered and created.
   * @memberof FooBar.
   * @class ToggleRuleRegistry
   * @param {FooBar.utils.ClassRegistry~Options} [options] - The options for the registry.
   * @augments FooBar.utils.ClassRegistry
   * @borrows FooBar.utils.Class.extend as extend
   * @borrows FooBar.utils.Class.override as override
   * @borrows FooBar.utils.Class.bases as bases
   */
  _.ToggleRuleRegistry = _utils.ClassRegistry.extend(/** @lends FooBar.ToggleRuleRegistry.prototype */{
    /**
     * @ignore
     * @constructs
     * @param {FooBar.utils.ClassRegistry~Options} [options] - The options for the registry.
     */
    construct: function (options) {
      const self = this;
      // call the super while supplying our own default value
      self._super(_obj.merge({
        allowBase: false
      }, options));
    },
    prioritize: function (options) {
      const self = this,
        names = Object.keys(self.registered),
        registered = names.map(function (name) {
          return self.registered[name];
        });
      registered.sort(function (a, b) {
        return b.priority - a.priority;
      });
      const optionsMap = options.reduce(function (map, option) {
        if (_is.hash(option) && _is.string(option.name)) {
          map[option.name] = option;
        }
        return map;
      }, {});
      const result = [];
      registered.forEach(function (reg) {
        if (optionsMap.hasOwnProperty(reg.name)) {
          result.push(optionsMap[reg.name]);
        }
      });
      return result;
    },
    /**
     * @summary Create an array of all rules from the provided option.
     * @param {*} option - The option to create the rules from.
     * @param {*} [argN] - Any additional arguments to supply to the rule constructor after the name and configuration.
     * @returns {FooBar.ToggleRule[]}
     */
    fromOption: function (option, argN) {
      const self = this,
        args = _fn.arg2arr(arguments);
      option = args.shift();
      const options = _is.hash(option) ? [option] : _is.array(option) ? option : [],
        prioritized = self.prioritize(options);
      return prioritized.reduce(function (result, opt) {
        const ruleArgs = args.slice();
        ruleArgs.unshift(opt);
        ruleArgs.unshift(opt.name);
        const rule = self.create.apply(self, ruleArgs);
        if (rule !== null) result.push(rule);
        return result;
      }, []);
    },
    /**
     *
     * @param {FooBar.ToggleRule[]} openRules
     * @param {FooBar.ToggleRule[]} closeRules
     */
    beforeInitialized: function (openRules, closeRules) {
      if (_is.array(openRules) && _is.array(closeRules)) {
        const wait = closeRules.concat(openRules).filter(function (rule) {
          return !rule.cfg.allowTransition;
        }).map(function (rule) {
          const result = rule.init();
          if (_is.promise(result)) {
            return result.fail(function () {
              rule.destroy();
            });
          }
          return null;
        });
        return _fn.whenAll(wait);
      }
      return _fn.resolved;
    },
    afterInitialized: function (openRules, closeRules) {
      if (_is.array(openRules) && _is.array(closeRules)) {
        const wait = closeRules.concat(openRules).filter(function (rule) {
          return rule.cfg.allowTransition;
        }).map(function (rule) {
          const result = rule.init();
          if (_is.promise(result)) {
            return result.fail(function () {
              rule.destroy();
            });
          }
          return null;
        });
        return _fn.whenAll(wait);
      }
      return _fn.resolved;
    },
    teardownRules: function (openRules, closeRules) {
      if (_is.array(openRules) && _is.array(closeRules)) {
        openRules.concat(closeRules).forEach(function (rule) {
          rule.destroy();
        });
      }
    },
    /**
     * @summary Parses the open rules taking into account the bar state.
     * @param {FooBar.Bar} parent - The parent bar the open rules state is being set for.
     * @param {string|null} state - The state of the bar.
     * @param {FooBar.ToggleRule[]} rules - The open rules parsed from the options.
     * @returns {FooBar.ToggleRule[]}
     */
    setOpenRulesState: function (parent, state, rules) {
      const self = this;
      if (state === null || ['open', 'closed'].indexOf(state) === -1) return rules;
      const immediate = _utils.find(rules, function (rule) {
        return rule.name === 'immediate';
      });
      const transition = _utils.find(rules, function (rule) {
        return rule.name === 'transition';
      });
      if (state === 'open') {
        // the bar should start in an open state
        // there is already a rule configured to open the bar on page load so exit early
        if (immediate instanceof _.ToggleRule || transition instanceof _.ToggleRule) {
          return rules;
        }
        // if we're here then we need to add in a rule to open the bar
        const rule = self.create('immediate', {}, parent, 'open');
        if (rule instanceof _.ToggleRule) {
          rules.unshift(rule);
        }
      } else if (state === 'closed') {
        // the bar should start in a closed state
        let index = -1;
        if (immediate instanceof _.ToggleRule) {
          index = rules.indexOf(immediate);
          if (index !== -1) rules.splice(index, 1);
        }
        if (transition instanceof _.ToggleRule) {
          index = rules.indexOf(transition);
          if (index !== -1) rules.splice(index, 1);
        }
      }
      return rules;
    },
    /**
     * @summary Parses the close rules taking into account the bar state.
     * @param {FooBar.Bar} parent - The parent bar the close rules state is being set for.
     * @param {string|null} state - The state of the bar.
     * @param {FooBar.ToggleRule[]} rules - The close rules parsed from the options.
     * @returns {FooBar.ToggleRule[]}
     */
    setCloseRulesState: function (parent, state, rules) {
      const self = this;
      const immediate = _utils.find(rules, function (rule) {
        return rule.name === 'immediate';
      });
      const transition = _utils.find(rules, function (rule) {
        return rule.name === 'transition';
      });
      if (state === 'open') {
        // the bar should start in an open state
        let index = -1;
        // if a rule to close the bar immediately exists remove it
        if (immediate instanceof _.ToggleRule) {
          index = rules.indexOf(immediate);
          if (index !== -1) rules.splice(index, 1);
        }
        // if a rule to close the bar with transition exists remove it
        if (transition instanceof _.ToggleRule) {
          index = rules.indexOf(transition);
          if (index !== -1) rules.splice(index, 1);
        }
      } else if (state === 'closed' || state === null && parent.openRules.length === 0) {
        // the bar should start in a closed state
        // there is already a rule configured to close the bar
        if (immediate instanceof _.ToggleRule || transition instanceof _.ToggleRule) {
          return rules;
        }
        // if we're here then we need to add in a rule to close the bar
        const rule = self.create('immediate', {}, parent, 'close');
        if (rule instanceof _.ToggleRule) {
          rules.unshift(rule);
        }
      }
      return rules;
    },
    hasImmediate: function (rules) {
      return !!_utils.find(rules, function (rule) {
        return rule.name === 'immediate';
      });
    },
    hasTransition: function (rules) {
      return !!_utils.find(rules, function (rule) {
        return rule.name === 'transition';
      });
    }
  });
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.fn, FooBar.utils.obj);
"use strict";

(function ($, _, _utils) {
  /**
   * @summary Icon registry for FooBar.
   * @memberof FooBar.
   * @name icons
   * @type {FooBar.utils.SVGRegistry}
   */
  _.icons = new _utils.SVGRegistry({
    id: "foobar-icons",
    iconClass: "fbr-icon"
  });

  /**
   * @summary Toggle rules registry for FooBar.
   * @memberof FooBar.
   * @name toggleRules
   * @type {FooBar.ToggleRuleRegistry}
   */
  _.toggleRules = new _.ToggleRuleRegistry();

  /**
   * @summary Bar registry for FooBar.
   * @memberof FooBar.
   * @name bars
   * @type {FooBar.utils.ComponentRegistry}
   */
  _.bars = new _utils.ComponentRegistry();

  /**
   * @summary Item registry for FooBar.
   * @memberof FooBar.
   * @name items
   * @type {FooBar.utils.ComponentRegistry}
   */
  _.items = new _utils.ComponentRegistry();
})(FooBar.$, FooBar, FooBar.utils);
"use strict";

(function (_icons) {
  const defaults = `<svg xmlns="http://www.w3.org/2000/svg">
	<defs>
		<symbol id="blank" viewBox="0 0 16 16">
		</symbol>
		<symbol id="plus" viewBox="0 0 16 16">
			<path d="M15 7h-6v-6h-2v6h-6v2h6v6h2v-6h6z"></path>
		</symbol>
		<symbol id="plus2" viewBox="0 0 16 16">
			<path d="M15.5 6h-5.5v-5.5c0-0.276-0.224-0.5-0.5-0.5h-3c-0.276 0-0.5 0.224-0.5 0.5v5.5h-5.5c-0.276 0-0.5 0.224-0.5 0.5v3c0 0.276 0.224 0.5 0.5 0.5h5.5v5.5c0 0.276 0.224 0.5 0.5 0.5h3c0.276 0 0.5-0.224 0.5-0.5v-5.5h5.5c0.276 0 0.5-0.224 0.5-0.5v-3c0-0.276-0.224-0.5-0.5-0.5z"></path>
		</symbol>
		<symbol id="plus3" viewBox="0 0 16 16">
			<path d="M16 5h-5v-5h-6v5h-5v6h5v5h6v-5h5z"></path>
		</symbol>
		<symbol id="minus" viewBox="0 0 16 16">
			<path d="M1 7h14v2h-14v-2z"></path>
		</symbol>
		<symbol id="minus2" viewBox="0 0 16 16">
			<path d="M0 6.5v3c0 0.276 0.224 0.5 0.5 0.5h15c0.276 0 0.5-0.224 0.5-0.5v-3c0-0.276-0.224-0.5-0.5-0.5h-15c-0.276 0-0.5 0.224-0.5 0.5z"></path>
		</symbol>
		<symbol id="minus3" viewBox="0 0 16 16">
			<path d="M0 5h16v6h-16z"></path>
		</symbol>
		<symbol id="cross" viewBox="0 0 16 16">
			<path d="M12.207 10.793l-1.414 1.414-2.793-2.793-2.793 2.793-1.414-1.414 2.793-2.793-2.793-2.793 1.414-1.414 2.793 2.793 2.793-2.793 1.414 1.414-2.793 2.793 2.793 2.793z"></path>
		</symbol>
		<symbol id="cross2" viewBox="0 0 16 16">
			<path d="M13.957 3.457l-1.414-1.414-4.543 4.543-4.543-4.543-1.414 1.414 4.543 4.543-4.543 4.543 1.414 1.414 4.543-4.543 4.543 4.543 1.414-1.414-4.543-4.543z"></path>
		</symbol>
		<symbol id="cross3" viewBox="0 0 16 16">
			<path d="M15.854 12.854c-0-0-0-0-0-0l-4.854-4.854 4.854-4.854c0-0 0-0 0-0 0.052-0.052 0.090-0.113 0.114-0.178 0.066-0.178 0.028-0.386-0.114-0.529l-2.293-2.293c-0.143-0.143-0.351-0.181-0.529-0.114-0.065 0.024-0.126 0.062-0.178 0.114 0 0-0 0-0 0l-4.854 4.854-4.854-4.854c-0-0-0-0-0-0-0.052-0.052-0.113-0.090-0.178-0.114-0.178-0.066-0.386-0.029-0.529 0.114l-2.293 2.293c-0.143 0.143-0.181 0.351-0.114 0.529 0.024 0.065 0.062 0.126 0.114 0.178 0 0 0 0 0 0l4.854 4.854-4.854 4.854c-0 0-0 0-0 0-0.052 0.052-0.090 0.113-0.114 0.178-0.066 0.178-0.029 0.386 0.114 0.529l2.293 2.293c0.143 0.143 0.351 0.181 0.529 0.114 0.065-0.024 0.126-0.062 0.178-0.114 0-0 0-0 0-0l4.854-4.854 4.854 4.854c0 0 0 0 0 0 0.052 0.052 0.113 0.090 0.178 0.114 0.178 0.066 0.386 0.029 0.529-0.114l2.293-2.293c0.143-0.143 0.181-0.351 0.114-0.529-0.024-0.065-0.062-0.126-0.114-0.178z"></path>
		</symbol>
		<symbol id="arrow-up" viewBox="0 0 16 16">
			<path d="M0 10.5l1 1 7-7 7 7 1-1-8-8-8 8z"></path>
		</symbol>
		<symbol id="arrow-up2" viewBox="0 0 16 16">
			<path d="M0 10.5l2 2 6-6 6 6 2-2-8-8-8 8z"></path>
		</symbol>
		<symbol id="arrow-up3" viewBox="0 0 16 16">
			<path d="M0 10.5l3 3 5-5 5 5 3-3-8-8z"></path>
		</symbol>
		<symbol id="arrow-right" viewBox="0 0 16 16">
			<path d="M5.5 0l-1 1 7 7-7 7 1 1 8-8-8-8z"></path>
		</symbol>
		<symbol id="arrow-right2" viewBox="0 0 16 16">
			<path d="M5.5 0l-2 2 6 6-6 6 2 2 8-8-8-8z"></path>
		</symbol>
		<symbol id="arrow-right3" viewBox="0 0 16 16">
			<path d="M5.5 0l-3 3 5 5-5 5 3 3 8-8z"></path>
		</symbol>
		<symbol id="arrow-down" viewBox="0 0 16 16">
			<path d="M16 5.5l-1-1-7 7-7-7-1 1 8 8 8-8z"></path>
		</symbol>
		<symbol id="arrow-down2" viewBox="0 0 16 16">
			<path d="M16 5.5l-2-2-6 6-6-6-2 2 8 8 8-8z"></path>
		</symbol>
		<symbol id="arrow-down3" viewBox="0 0 16 16">
			<path d="M16 5.5l-3-3-5 5-5-5-3 3 8 8z"></path>
		</symbol>
		<symbol id="arrow-left" viewBox="0 0 16 16">
			<path d="M10.5 16l1-1-7-7 7-7-1-1-8 8 8 8z"></path>
		</symbol>
		<symbol id="arrow-left2" viewBox="0 0 16 16">
			<path d="M10.5 16l2-2-6-6 6-6-2-2-8 8 8 8z"></path>
		</symbol>
		<symbol id="arrow-left3" viewBox="0 0 16 16">
			<path d="M10.5 16l3-3-5-5 5-5-3-3-8 8z"></path>
		</symbol>

		<symbol id="bullhorn" viewBox="0 0 16 16">
			<path d="M16 6.707c0-3.139-0.919-5.687-2.054-5.707 0.005-0 0.009-0 0.014-0h-1.296c0 0-3.044 2.287-7.425 3.184-0.134 0.708-0.219 1.551-0.219 2.523s0.085 1.816 0.219 2.523c4.382 0.897 7.425 3.184 7.425 3.184h1.296c-0.005 0-0.009-0-0.014-0.001 1.136-0.020 2.054-2.567 2.054-5.707zM13.513 11.551c-0.147 0-0.305-0.152-0.387-0.243-0.197-0.22-0.387-0.562-0.55-0.989-0.363-0.957-0.564-2.239-0.564-3.611s0.2-2.655 0.564-3.611c0.162-0.428 0.353-0.77 0.55-0.99 0.081-0.091 0.24-0.243 0.387-0.243s0.305 0.152 0.387 0.243c0.197 0.22 0.387 0.562 0.55 0.99 0.363 0.957 0.564 2.239 0.564 3.611s-0.2 2.655-0.564 3.611c-0.162 0.428-0.353 0.77-0.55 0.989-0.081 0.091-0.24 0.243-0.387 0.243zM3.935 6.707c0-0.812 0.060-1.6 0.173-2.33-0.74 0.102-1.39 0.161-2.193 0.161-1.048 0-1.048 0-1.048 0l-0.867 1.479v1.378l0.867 1.479c0 0 0 0 1.048 0 0.803 0 1.453 0.059 2.193 0.161-0.113-0.729-0.173-1.518-0.173-2.33zM5.752 10.034l-2-0.383 1.279 5.024c0.066 0.26 0.324 0.391 0.573 0.291l1.852-0.741c0.249-0.1 0.349-0.374 0.222-0.611l-1.926-3.581zM13.513 8.574c-0.057 0-0.118-0.059-0.149-0.094-0.076-0.085-0.149-0.217-0.212-0.381-0.14-0.369-0.217-0.863-0.217-1.392s0.077-1.023 0.217-1.392c0.063-0.165 0.136-0.297 0.212-0.381 0.031-0.035 0.092-0.094 0.149-0.094s0.118 0.059 0.149 0.094c0.076 0.085 0.149 0.217 0.212 0.381 0.14 0.369 0.217 0.863 0.217 1.392s-0.077 1.023-0.217 1.392c-0.063 0.165-0.136 0.297-0.212 0.381-0.031 0.035-0.092 0.094-0.149 0.094z"></path>
		</symbol>
		<symbol id="megaphone" viewBox="0 0 16 16">
			<path d="M2 6h-2v5h2v-1l2 0.572c-0 0.008-0 0.015-0 0.023v1.406c0 0.55 0.45 1 1 1h2c0.55 0 1-0.45 1-1v-0.286l5 1.429v-9.286l-11 3.143v-1zM5 10.857l1.998 0.571v0.572h-1.998v-1.143zM14 3.571v9.857l2 0.571v-11z"></path>
		</symbol>
		<symbol id="envelop" viewBox="0 0 16 16">
			<path d="M14.998 3c0.001 0.001 0.001 0.001 0.002 0.002v9.996c-0.001 0.001-0.001 0.001-0.002 0.002h-13.996c-0.001-0.001-0.001-0.001-0.002-0.002v-9.996c0.001-0.001 0.001-0.001 0.002-0.002h13.996zM15 2h-14c-0.55 0-1 0.45-1 1v10c0 0.55 0.45 1 1 1h14c0.55 0 1-0.45 1-1v-10c0-0.55-0.45-1-1-1v0z"></path>
			<path d="M5.831 9.773l-3 2.182c-0.1 0.073-0.216 0.108-0.33 0.108-0.174 0-0.345-0.080-0.455-0.232-0.183-0.251-0.127-0.603 0.124-0.786l3-2.182c0.251-0.183 0.603-0.127 0.786 0.124s0.127 0.603-0.124 0.786z"></path>
			<path d="M13.955 11.831c-0.11 0.151-0.282 0.232-0.455 0.232-0.115 0-0.23-0.035-0.33-0.108l-3-2.182c-0.251-0.183-0.307-0.534-0.124-0.786s0.534-0.307 0.786-0.124l3 2.182c0.251 0.183 0.307 0.535 0.124 0.786z"></path>
			<path d="M13.831 4.955l-5.5 4c-0.099 0.072-0.215 0.108-0.331 0.108s-0.232-0.036-0.331-0.108l-5.5-4c-0.251-0.183-0.307-0.534-0.124-0.786s0.535-0.307 0.786-0.124l5.169 3.759 5.169-3.759c0.251-0.183 0.603-0.127 0.786 0.124s0.127 0.603-0.124 0.786v0z"></path>
		</symbol>
		<symbol id="envelop2" viewBox="0 0 16 16">
			<path d="M15 2h-14c-0.55 0-1 0.45-1 1v10c0 0.55 0.45 1 1 1h14c0.55 0 1-0.45 1-1v-10c0-0.55-0.45-1-1-1zM14 4v0.719l-6 3.536-6-3.536v-0.719h12zM2 12v-5.54l6 3.536 6-3.536v5.54h-12z"></path>
		</symbol>
		<symbol id="paper-plane" viewBox="0 0 16 16">
			<path d="M7 11l6.151 2.195 2.849-12.459zM5 10.311l11-9.575-16 7.913zM7 12.062v3.938l2.902-2.902z"></path>
		</symbol>
		<symbol id="bell" viewBox="0 0 16 16">
			<path d="M16 13c-1.657 0-3-1.343-3-3v-4.455c0-2.199-1.718-4.033-4-4.454v-1.091h-2v1.091c-2.282 0.421-4 2.255-4 4.454v4.455c0 1.657-1.343 3-3 3v1h6.712c-0.081 0.178-0.127 0.377-0.127 0.586 0 0.781 0.633 1.414 1.414 1.414s1.414-0.633 1.414-1.414c0-0.209-0.045-0.407-0.127-0.586h6.713v-1z"></path>
		</symbol>
		<symbol id="bell2" viewBox="0 0 16 16">
			<path d="M16 13c-1.657 0-3-1.343-3-3v-4.455c0-2.199-1.718-4.033-4-4.454v-1.091h-2v1.091c-2.282 0.421-4 2.255-4 4.454v4.455c0 1.657-1.343 3-3 3v1h6.712c-0.081 0.178-0.127 0.377-0.127 0.586 0 0.781 0.633 1.414 1.414 1.414s1.414-0.633 1.414-1.414c0-0.209-0.045-0.407-0.127-0.586h6.713v-1z"></path>
			<path d="M15.483 6c-0.261 0-0.481-0.203-0.498-0.467-0.118-1.787-0.908-3.444-2.226-4.666-0.202-0.188-0.214-0.504-0.027-0.707s0.504-0.214 0.707-0.027c1.506 1.397 2.409 3.291 2.543 5.334 0.018 0.276-0.191 0.514-0.466 0.532-0.011 0.001-0.022 0.001-0.033 0.001z"></path>
			<path d="M0.517 6c-0.011 0-0.022-0-0.033-0.001-0.276-0.018-0.484-0.256-0.466-0.532 0.134-2.043 1.038-3.937 2.543-5.334 0.203-0.188 0.519-0.176 0.707 0.027s0.176 0.519-0.027 0.707c-1.318 1.222-2.108 2.879-2.226 4.666-0.017 0.264-0.237 0.467-0.498 0.467z"></path>
		</symbol>
		<symbol id="price-tag" viewBox="0 0 16 16">
			<path d="M6 8h1v2h-1zM8 11h1v2h-1zM12.514 4.47l-3.611-3.939c-0.267-0.292-0.796-0.53-1.174-0.53h-0.458c-0.378 0-0.906 0.239-1.174 0.53l-3.611 3.939c-0.267 0.292-0.486 0.868-0.486 1.28v9.5c0 0.412 0.309 0.75 0.688 0.75h9.625c0.378 0 0.688-0.338 0.688-0.75v-9.5c0-0.412-0.219-0.989-0.486-1.28zM10 8h-2v2h2v4h-2v1h-1v-1h-2v-1h2v-2h-2v-4h2v-1h1v1h2v1zM8.281 2.5c0 0.431-0.35 0.781-0.781 0.781s-0.781-0.35-0.781-0.781 0.35-0.781 0.781-0.781 0.781 0.35 0.781 0.781z"></path>
		</symbol>
		<symbol id="price-tag2" viewBox="0 0 16 16">
			<path d="M15.25 0h-6c-0.412 0-0.989 0.239-1.28 0.53l-7.439 7.439c-0.292 0.292-0.292 0.769 0 1.061l6.439 6.439c0.292 0.292 0.769 0.292 1.061 0l7.439-7.439c0.292-0.292 0.53-0.868 0.53-1.28v-6c0-0.412-0.338-0.75-0.75-0.75zM11.5 6c-0.828 0-1.5-0.672-1.5-1.5s0.672-1.5 1.5-1.5 1.5 0.672 1.5 1.5-0.672 1.5-1.5 1.5z"></path>
		</symbol>
		<symbol id="price-tags" viewBox="0 0 20 16">
			<path d="M19.25 0h-6c-0.412 0-0.989 0.239-1.28 0.53l-7.439 7.439c-0.292 0.292-0.292 0.769 0 1.061l6.439 6.439c0.292 0.292 0.769 0.292 1.061 0l7.439-7.439c0.292-0.292 0.53-0.868 0.53-1.28v-6c0-0.412-0.337-0.75-0.75-0.75zM15.5 6c-0.828 0-1.5-0.672-1.5-1.5s0.672-1.5 1.5-1.5 1.5 0.672 1.5 1.5-0.672 1.5-1.5 1.5z"></path>
			<path d="M2 8.5l8.5-8.5h-1.25c-0.412 0-0.989 0.239-1.28 0.53l-7.439 7.439c-0.292 0.292-0.292 0.769 0 1.061l6.439 6.439c0.292 0.292 0.769 0.292 1.061 0l0.47-0.47-6.5-6.5z"></path>
		</symbol>
		<symbol id="piggy-bank" viewBox="0 0 16 16">
			<path d="M15.023 6h-1.523c-0.359-0.684-0.896-1.289-1.562-1.772 0.005-0.43 0.167-0.84 0.458-1.158 0.059-0.064 0.123-0.125 0.19-0.179 0.16-0.13 0.224-0.346 0.16-0.542s-0.242-0.334-0.448-0.345c-0.037-0.002-0.074-0.003-0.111-0.003-0.885 0-1.637 0.578-1.9 1.377-0.705-0.243-1.477-0.377-2.287-0.377-3.243 0-5.885 2.145-5.996 4.825-0.059-0.002-0.118-0.002-0.179-0.002-0.682 0.011-0.782-0.792-0.815-1.328-0.065-0.597-0.967-0.606-1 0.010-0.116 0.385 0.010 0.983 0.122 1.346 0.262 0.851 0.998 1.255 1.834 1.328 0.068 0.005 0.135-0 0.198-0.013 0.193 0.675 0.551 1.296 1.035 1.834v0c0.041 0.045 0.083 0.090 0.126 0.134 0.225 0.265 0.674 0.912 0.674 1.866v1c0 0.552 0.672 1 1.5 1s1.5-0.448 1.5-1v-1.070c0.325 0.045 0.659 0.070 1 0.070s0.675-0.024 1-0.070v1.070c0 0.552 0.672 1 1.5 1s1.5-0.448 1.5-1v-1c0-0.954 0.449-1.601 0.674-1.866 0.043-0.044 0.085-0.089 0.126-0.134 0-0 0-0 0-0h-0c0.277-0.308 0.513-0.643 0.7-1h1.523c0.552 0 1-0.895 1-2s-0.448-2-1-2zM9.5 5h-3c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h3c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5zM12 8c-0.552 0-1-0.448-1-1s0.448-1 1-1 1 0.448 1 1c0 0.552-0.448 1-1 1z"></path>
		</symbol>
		<symbol id="cash" viewBox="0 0 17 16">
			<path d="M7 7h1v1h-1v-1z"></path>
			<path d="M0 4v9h17v-9h-17zM3 12h-2v-2h1v1h1v1zM3 6h-1v1h-1v-2h2v1zM10.5 8c0.276 0 0.5 0.224 0.5 0.5v2c0 0.276-0.224 0.5-0.5 0.5h-1.5v0.5c0 0.276-0.224 0.5-0.5 0.5s-0.5-0.224-0.5-0.5v-0.5h-1.5c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h1.5v-1h-1.5c-0.276 0-0.5-0.224-0.5-0.5v-2c0-0.276 0.224-0.5 0.5-0.5h1.5v-0.5c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v0.5h1.5c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5h-1.5v1h1.5zM16 12h-2v-1h1v-1h1v2zM16 7h-1v-1h-1v-1h2v2z"></path>
			<path d="M9 9h1v1h-1v-1z"></path>
		</symbol>
		<symbol id="quill" viewBox="0 0 16 16">
			<path d="M0 16c2-6 7.234-16 16-16-4.109 3.297-6 11-9 11s-3 0-3 0l-3 5h-1z"></path>
		</symbol>
		<symbol id="quill2" viewBox="0 0 16 16">
			<path d="M0 16c0-2.291 0.377-4.698 1.122-6.663 0.719-1.899 1.764-3.574 3.104-4.979 1.327-1.391 2.902-2.474 4.682-3.218 1.809-0.757 3.775-1.14 5.843-1.14 0.085 0 0.164 0.043 0.21 0.115s0.053 0.161 0.017 0.239c-0.522 1.148-1.851 2.212-3.952 3.162-0.298 0.135-0.594 0.259-0.879 0.372 0.195-0.007 0.393-0.010 0.594-0.010 1.176 0 2.010 0.12 2.045 0.125 0.084 0.012 0.156 0.066 0.191 0.143s0.029 0.167-0.016 0.238c-0.755 1.186-2.404 2.281-4.901 3.255-0.206 0.080-0.409 0.156-0.608 0.228 0.146-0.004 0.292-0.006 0.438-0.006 1.163 0 1.878 0.138 1.908 0.144 0.086 0.017 0.157 0.078 0.187 0.161s0.014 0.175-0.042 0.243c-2.28 2.786-3.837 3.592-6.944 3.592-0.707 0-1.258 0.614-1.636 1.825-0.3 0.96-0.364 2.175-0.364 2.175z"></path>
		</symbol>
		<symbol id="pen" viewBox="0 0 16 16">
			<path d="M8.313 3.813c-0.663 0.643-2.003 1.973-2.239 2.209-1.838 1.838-6.153 6.957-6.074 9.977 3.020 0.080 8.139-4.236 9.977-6.074 0.236-0.236 1.566-1.576 2.209-2.239l-3.873-3.873zM14.761 3.19l-0.282-0.281 1.521-1.257-1.652-1.652-1.257 1.521-0.282-0.282c-0.872-0.051-2.278 0.793-3.663 1.907l3.707 3.707c0.419-0.521 0.798-1.045 1.107-1.542 0.93 0.767 0.243 3.017-3.682 5.967l0.722 0.722c3.5-2.5 5.766-5.5 3.571-7.882 0.131-0.346 0.205-0.663 0.19-0.928z"></path>
		</symbol>
		<symbol id="pencil" viewBox="0 0 16 16">
			<path d="M16 2.5c0-1.381-1.119-2.5-2.5-2.5-0.818 0-1.544 0.393-2 1l-9 9 3.5 3.5 9-9c0.607-0.456 1-1.182 1-2z"></path>
			<path d="M0 16l1.5-5 3.5 3.5z"></path>
		</symbol>
		<symbol id="bag" viewBox="0 0 16 16">
			<path d="M11 3v-0.5c0-1.381-1.119-2.5-2.5-2.5-0.563 0-1.082 0.186-1.5 0.5-0.418-0.314-0.937-0.5-1.5-0.5-1.381 0-2.5 1.119-2.5 2.5v1.7l-2 0.3v10.5h2l1 1 10-1.5v-10.5l-3-1zM3 14h-1v-8.639l1-0.15v8.789zM8.5 1c0.827 0 1.5 0.673 1.5 1.5v0.65l-2 0.3v-0.95c0-0.454-0.122-0.88-0.333-1.247 0.239-0.16 0.525-0.253 0.833-0.253zM4 2.5c0-0.827 0.673-1.5 1.5-1.5 0.308 0 0.595 0.093 0.833 0.253-0.212 0.367-0.333 0.792-0.333 1.247v1.25l-2 0.3v-1.55zM13 13.639l-8 1.2v-8.478l8-1.2v8.478z"></path>
		</symbol>
		<symbol id="lifebuoy" viewBox="0 0 16 16">
			<path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM5 8c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zM14.468 10.679v0l-2.772-1.148c0.196-0.472 0.304-0.989 0.304-1.531s-0.108-1.059-0.304-1.531l2.772-1.148c0.342 0.825 0.532 1.73 0.532 2.679s-0.189 1.854-0.532 2.679v0zM10.679 1.532v0 0l-1.148 2.772c-0.472-0.196-0.989-0.304-1.531-0.304s-1.059 0.108-1.531 0.304l-1.148-2.772c0.825-0.342 1.73-0.532 2.679-0.532s1.854 0.189 2.679 0.532zM1.532 5.321l2.772 1.148c-0.196 0.472-0.304 0.989-0.304 1.531s0.108 1.059 0.304 1.531l-2.772 1.148c-0.342-0.825-0.532-1.73-0.532-2.679s0.189-1.854 0.532-2.679zM5.321 14.468l1.148-2.772c0.472 0.196 0.989 0.304 1.531 0.304s1.059-0.108 1.531-0.304l1.148 2.772c-0.825 0.342-1.73 0.532-2.679 0.532s-1.854-0.189-2.679-0.532z"></path>
		</symbol>

		<symbol id="spinner" viewBox="0 0 16 16">
			<path d="M8 16c-2.137 0-4.146-0.832-5.657-2.343s-2.343-3.52-2.343-5.657c0-1.513 0.425-2.986 1.228-4.261 0.781-1.239 1.885-2.24 3.193-2.895l0.672 1.341c-1.063 0.533-1.961 1.347-2.596 2.354-0.652 1.034-0.997 2.231-0.997 3.461 0 3.584 2.916 6.5 6.5 6.5s6.5-2.916 6.5-6.5c0-1.23-0.345-2.426-0.997-3.461-0.635-1.008-1.533-1.822-2.596-2.354l0.672-1.341c1.308 0.655 2.412 1.656 3.193 2.895 0.803 1.274 1.228 2.748 1.228 4.261 0 2.137-0.832 4.146-2.343 5.657s-3.52 2.343-5.657 2.343z"></path>
		</symbol>
		<symbol id="spinner2" viewBox="0 0 16 16">
			<path d="M8 4.736c-0.515 0-0.933-0.418-0.933-0.933v-2.798c0-0.515 0.418-0.933 0.933-0.933s0.933 0.418 0.933 0.933v2.798c0 0.515-0.418 0.933-0.933 0.933z"></path>
			<path d="M8 15.577c-0.322 0-0.583-0.261-0.583-0.583v-2.798c0-0.322 0.261-0.583 0.583-0.583s0.583 0.261 0.583 0.583v2.798c0 0.322-0.261 0.583-0.583 0.583z"></path>
			<path d="M5.902 5.24c-0.302 0-0.596-0.157-0.758-0.437l-1.399-2.423c-0.241-0.418-0.098-0.953 0.32-1.194s0.953-0.098 1.194 0.32l1.399 2.423c0.241 0.418 0.098 0.953-0.32 1.194-0.138 0.079-0.288 0.117-0.436 0.117z"></path>
			<path d="M11.498 14.582c-0.181 0-0.358-0.094-0.455-0.262l-1.399-2.423c-0.145-0.251-0.059-0.572 0.192-0.717s0.572-0.059 0.717 0.192l1.399 2.423c0.145 0.251 0.059 0.572-0.192 0.717-0.083 0.048-0.173 0.070-0.262 0.070z"></path>
			<path d="M4.365 6.718c-0.138 0-0.279-0.035-0.407-0.109l-2.423-1.399c-0.39-0.225-0.524-0.724-0.299-1.115s0.724-0.524 1.115-0.299l2.423 1.399c0.39 0.225 0.524 0.724 0.299 1.115-0.151 0.262-0.425 0.408-0.707 0.408z"></path>
			<path d="M14.057 11.964c-0.079 0-0.159-0.020-0.233-0.063l-2.423-1.399c-0.223-0.129-0.299-0.414-0.171-0.637s0.414-0.299 0.637-0.171l2.423 1.399c0.223 0.129 0.299 0.414 0.171 0.637-0.086 0.15-0.243 0.233-0.404 0.233z"></path>
			<path d="M3.803 8.758h-2.798c-0.418 0-0.758-0.339-0.758-0.758s0.339-0.758 0.758-0.758h2.798c0.419 0 0.758 0.339 0.758 0.758s-0.339 0.758-0.758 0.758z"></path>
			<path d="M14.995 8.466c-0 0 0 0 0 0h-2.798c-0.258-0-0.466-0.209-0.466-0.466s0.209-0.466 0.466-0.466c0 0 0 0 0 0h2.798c0.258 0 0.466 0.209 0.466 0.466s-0.209 0.466-0.466 0.466z"></path>
			<path d="M1.943 12.197c-0.242 0-0.477-0.125-0.606-0.35-0.193-0.335-0.079-0.762 0.256-0.955l2.423-1.399c0.335-0.193 0.762-0.079 0.955 0.256s0.079 0.762-0.256 0.955l-2.423 1.399c-0.11 0.064-0.23 0.094-0.349 0.094z"></path>
			<path d="M11.635 6.368c-0.161 0-0.318-0.084-0.404-0.233-0.129-0.223-0.052-0.508 0.171-0.637l2.423-1.399c0.223-0.129 0.508-0.052 0.637 0.171s0.052 0.508-0.171 0.637l-2.423 1.399c-0.073 0.042-0.154 0.063-0.233 0.063z"></path>
			<path d="M4.502 14.699c-0.109 0-0.219-0.028-0.32-0.086-0.307-0.177-0.412-0.569-0.235-0.876l1.399-2.423c0.177-0.307 0.569-0.412 0.876-0.235s0.412 0.569 0.235 0.876l-1.399 2.423c-0.119 0.206-0.334 0.321-0.556 0.321z"></path>
			<path d="M10.098 4.832c-0.079 0-0.159-0.020-0.233-0.063-0.223-0.129-0.299-0.414-0.171-0.637l1.399-2.423c0.129-0.223 0.414-0.299 0.637-0.171s0.299 0.414 0.171 0.637l-1.399 2.423c-0.086 0.15-0.243 0.233-0.404 0.233z"></path>
		</symbol>
		<symbol id="spinner3" viewBox="0 0 16 16">
			<path d="M16 8c-0.020-1.045-0.247-2.086-0.665-3.038-0.417-0.953-1.023-1.817-1.766-2.53s-1.624-1.278-2.578-1.651c-0.953-0.374-1.978-0.552-2.991-0.531-1.013 0.020-2.021 0.24-2.943 0.646-0.923 0.405-1.758 0.992-2.449 1.712s-1.237 1.574-1.597 2.497c-0.361 0.923-0.533 1.914-0.512 2.895 0.020 0.981 0.234 1.955 0.627 2.847 0.392 0.892 0.961 1.7 1.658 2.368s1.523 1.195 2.416 1.543c0.892 0.348 1.851 0.514 2.799 0.493 0.949-0.020 1.89-0.227 2.751-0.608 0.862-0.379 1.642-0.929 2.287-1.604s1.154-1.472 1.488-2.335c0.204-0.523 0.342-1.069 0.415-1.622 0.019 0.001 0.039 0.002 0.059 0.002 0.552 0 1-0.448 1-1 0-0.028-0.001-0.056-0.004-0.083h0.004zM14.411 10.655c-0.367 0.831-0.898 1.584-1.55 2.206s-1.422 1.112-2.254 1.434c-0.832 0.323-1.723 0.476-2.608 0.454-0.884-0.020-1.759-0.215-2.56-0.57-0.801-0.354-1.526-0.867-2.125-1.495s-1.071-1.371-1.38-2.173c-0.31-0.801-0.457-1.66-0.435-2.512s0.208-1.694 0.551-2.464c0.342-0.77 0.836-1.468 1.441-2.044s1.321-1.029 2.092-1.326c0.771-0.298 1.596-0.438 2.416-0.416s1.629 0.202 2.368 0.532c0.74 0.329 1.41 0.805 1.963 1.387s0.988 1.27 1.272 2.011c0.285 0.74 0.418 1.532 0.397 2.32h0.004c-0.002 0.027-0.004 0.055-0.004 0.083 0 0.516 0.39 0.94 0.892 0.994-0.097 0.544-0.258 1.075-0.481 1.578z"></path>
		</symbol>
		<symbol id="spinner4" viewBox="0 0 16 16">
			<path d="M3 8c0-0.19 0.011-0.378 0.032-0.563l-2.89-0.939c-0.092 0.487-0.141 0.989-0.141 1.502 0 2.3 0.971 4.374 2.526 5.833l1.786-2.458c-0.814-0.889-1.312-2.074-1.312-3.375zM13 8c0 1.301-0.497 2.486-1.312 3.375l1.786 2.458c1.555-1.459 2.526-3.533 2.526-5.833 0-0.513-0.049-1.015-0.141-1.502l-2.89 0.939c0.021 0.185 0.032 0.373 0.032 0.563zM9 3.1c1.436 0.292 2.649 1.199 3.351 2.435l2.89-0.939c-1.144-2.428-3.473-4.188-6.241-4.534v3.038zM3.649 5.535c0.702-1.236 1.914-2.143 3.351-2.435v-3.038c-2.769 0.345-5.097 2.105-6.241 4.534l2.89 0.939zM10.071 12.552c-0.631 0.288-1.332 0.448-2.071 0.448s-1.44-0.16-2.071-0.448l-1.786 2.458c1.144 0.631 2.458 0.99 3.857 0.99s2.713-0.359 3.857-0.99l-1.786-2.458z"></path>
		</symbol>
		<symbol id="spinner5" viewBox="0 0 16 16">
			<path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 4c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zM12.773 12.773c-1.275 1.275-2.97 1.977-4.773 1.977s-3.498-0.702-4.773-1.977-1.977-2.97-1.977-4.773c0-1.803 0.702-3.498 1.977-4.773l1.061 1.061c0 0 0 0 0 0-2.047 2.047-2.047 5.378 0 7.425 0.992 0.992 2.31 1.538 3.712 1.538s2.721-0.546 3.712-1.538c2.047-2.047 2.047-5.378 0-7.425l1.061-1.061c1.275 1.275 1.977 2.97 1.977 4.773s-0.702 3.498-1.977 4.773z"></path>
		</symbol>
		<symbol id="spinner6" viewBox="0 0 16 16">
			<path d="M6 2c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2s-2-0.895-2-2zM12.359 8c0 0 0 0 0 0 0-0.906 0.735-1.641 1.641-1.641s1.641 0.735 1.641 1.641c0 0 0 0 0 0 0 0.906-0.735 1.641-1.641 1.641s-1.641-0.735-1.641-1.641zM10.757 12.243c0-0.821 0.665-1.486 1.486-1.486s1.486 0.665 1.486 1.486c0 0.821-0.665 1.486-1.486 1.486s-1.486-0.665-1.486-1.486zM6.654 14c0-0.743 0.603-1.346 1.346-1.346s1.346 0.603 1.346 1.346c0 0.743-0.603 1.346-1.346 1.346s-1.346-0.603-1.346-1.346zM2.538 12.243c0-0.673 0.546-1.219 1.219-1.219s1.219 0.546 1.219 1.219c0 0.673-0.546 1.219-1.219 1.219s-1.219-0.546-1.219-1.219zM0.896 8c0-0.61 0.494-1.104 1.104-1.104s1.104 0.494 1.104 1.104c0 0.61-0.494 1.104-1.104 1.104s-1.104-0.494-1.104-1.104zM2.757 3.757c0 0 0 0 0 0 0-0.552 0.448-1 1-1s1 0.448 1 1c0 0 0 0 0 0 0 0.552-0.448 1-1 1s-1-0.448-1-1zM14.054 3.757c0 1-0.811 1.811-1.812 1.811s-1.812-0.811-1.812-1.811c0-1.001 0.811-1.811 1.812-1.811s1.812 0.811 1.812 1.811z"></path>
		</symbol>
		<symbol id="twitter" viewBox="0 0 16 16">
			<path d="M16 3.538c-0.588 0.263-1.222 0.438-1.884 0.516 0.678-0.406 1.197-1.050 1.444-1.816-0.634 0.375-1.338 0.65-2.084 0.797-0.6-0.638-1.453-1.034-2.397-1.034-1.813 0-3.281 1.469-3.281 3.281 0 0.256 0.028 0.506 0.084 0.747-2.728-0.138-5.147-1.444-6.766-3.431-0.281 0.484-0.444 1.050-0.444 1.65 0 1.138 0.578 2.144 1.459 2.731-0.538-0.016-1.044-0.166-1.488-0.409 0 0.013 0 0.028 0 0.041 0 1.591 1.131 2.919 2.634 3.219-0.275 0.075-0.566 0.116-0.866 0.116-0.212 0-0.416-0.022-0.619-0.059 0.419 1.303 1.631 2.253 3.066 2.281-1.125 0.881-2.538 1.406-4.078 1.406-0.266 0-0.525-0.016-0.784-0.047 1.456 0.934 3.181 1.475 5.034 1.475 6.037 0 9.341-5.003 9.341-9.341 0-0.144-0.003-0.284-0.009-0.425 0.641-0.459 1.197-1.038 1.637-1.697z"></path>
		</symbol>
		<symbol id="truck" viewBox="0 0 16 16">
			<path d="M16 9l-2-4h-3v-2c0-0.55-0.45-1-1-1h-9c-0.55 0-1 0.45-1 1v8l1 1h1.268c-0.17 0.294-0.268 0.636-0.268 1 0 1.105 0.895 2 2 2s2-0.895 2-2c0-0.364-0.098-0.706-0.268-1h5.536c-0.17 0.294-0.268 0.636-0.268 1 0 1.105 0.895 2 2 2s2-0.895 2-2c0-0.364-0.098-0.706-0.268-1h1.268v-3zM11 9v-3h2.073l1.5 3h-3.573z"></path>
		</symbol>
		<symbol id="cart" viewBox="0 0 16 16">
			<path d="M13.238 9c0.55 0 1.124-0.433 1.275-0.962l1.451-5.077c0.151-0.529-0.175-0.962-0.725-0.962h-10.238c0-1.105-0.895-2-2-2h-3v2h3v8.5c0 0.828 0.672 1.5 1.5 1.5h9.5c0.552 0 1-0.448 1-1s-0.448-1-1-1h-9v-1h8.238zM5 4h9.044l-0.857 3h-8.187v-3z"></path>
			<path d="M6 14.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z"></path>
			<path d="M15 14.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z"></path>
		</symbol>
		<symbol id="cart2" viewBox="0 0 16 16">
			<path d="M15.275 3.038c0.531 0.152 0.839 0.705 0.687 1.236l-2 7c-0.123 0.429-0.515 0.725-0.962 0.725h-8.5c-0.504 0-0.93-0.376-0.992-0.876l-0.89-7.124h-1.617c-0.552 0-1-0.448-1-1s0.448-1 1-1h2.5c0.504 0 0.93 0.376 0.992 0.876l0.891 7.124h6.863l1.793-6.275c0.152-0.531 0.705-0.838 1.236-0.687zM4 14.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5zM10 14.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5zM12.313 6h-2.313v3h-2v-3h-2.313l3.313-3.563z"></path>
		</symbol>
		<symbol id="basket" viewBox="0 0 16 16">
			<path d="M12.703 6l-2.779-3.618c0.049-0.118 0.076-0.247 0.076-0.382 0-0.552-0.448-1-1-1s-1 0.448-1 1 0.448 1 1 1c0.044 0 0.088-0.003 0.131-0.009l2.311 3.009h-6.884l2.311-3.009c0.043 0.006 0.086 0.009 0.131 0.009 0.552 0 1-0.448 1-1s-0.448-1-1-1-1 0.448-1 1c0 0.135 0.027 0.265 0.076 0.382l-2.779 3.618h-3.297v2h1l1 8h12l1-8h1v-2h-3.297zM5 14h-2v-2h2v2zM5 10h-2v-2h2v2zM9 14h-2v-2h2v2zM9 10h-2v-2h2v2zM13 14h-2v-2h2v2zM13 10h-2v-2h2v2z"></path>
		</symbol>
		<symbol id="checkmark" viewBox="0 0 16 16">
			<path d="M13.5 2l-7.5 7.5-3.5-3.5-2.5 2.5 6 6 10-10z"></path>
		</symbol>
		<symbol id="credit-card" viewBox="0 0 16 16">
			<path d="M14.5 2h-13c-0.825 0-1.5 0.675-1.5 1.5v9c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-9c0-0.825-0.675-1.5-1.5-1.5zM1.5 3h13c0.271 0 0.5 0.229 0.5 0.5v1.5h-14v-1.5c0-0.271 0.229-0.5 0.5-0.5zM14.5 13h-13c-0.271 0-0.5-0.229-0.5-0.5v-4.5h14v4.5c0 0.271-0.229 0.5-0.5 0.5zM2 10h1v2h-1zM4 10h1v2h-1zM6 10h1v2h-1z"></path>
		</symbol>
	</defs>
</svg>`;
  _icons.register("defaults", defaults);
})(FooBar.icons);
"use strict";

(function ($, _, _utils, _is, _fn, _obj, _str) {
  /**
   * @summary A single instance class that manages all FooBars within the supplied root element.
   * @memberof FooBar.
   * @class Plugin
   * @param {(jQuery|HTMLElement)} element - The root element the instance will manage.
   * @param {FooBar.Plugin~Configuration} config - The configuration object for the instance.
   * @augments FooBar.utils.ParentComponent
   * @borrows FooBar.utils.Class.extend as extend
   * @borrows FooBar.utils.Class.override as override
   * @borrows FooBar.utils.Class.bases as bases
   */
  _.Plugin = _utils.ParentComponent.extend(/** @lends FooBar.Plugin.prototype */{
    /**
     * @ignore
     * @constructs
     * @param {(jQuery|HTMLElement)} element - The root element the instance will manage.
     * @param {FooBar.Plugin~Configuration} config - The configuration object for the instance.
     */
    construct: function (element, config) {
      const self = this;
      // call the base FooBar.utils.ParentComponent#construct method
      self._super("foobar", element, config, null, _.bars);
      /**
       * @summary The bar manager configuration object.
       * @typedef {FooBar.utils.ParentComponent~Configuration} FooBar.Plugin~Configuration
       */

      /**
       * @summary The raw configuration object for this instance.
       * @memberof FooBar.Plugin#
       * @name raw
       * @type {FooBar.Plugin~Configuration}
       */

      /**
       * @summary An array of all bar components managed by this instance.
       * @memberof FooBar.Plugin#
       * @name children
       * @type {Array.<FooBar.Bar>}
       */

      /**
       * @summary The state stored in local storage for the plugin.
       * @memberof FooBar.Plugin#
       * @name stored
       * @type {Object.<string, string>}
       */
      self.stored = JSON.parse(localStorage.getItem(self.name)) || {};
      /**
       * @summary Whether or not the plugin is bound to the document element.
       * @memberof FooBar.Plugin#
       * @name isDocumentElement
       * @type {boolean}
       */
      self.isDocumentElement = self.el === document.documentElement;
      /**
       * @summary The jQuery window object for the plugin.
       * @memberof FooBar.Plugin#
       * @name $window
       * @type {jQuery}
       */
      self.$window = $(window);
      /**
       * @summary The jQuery scroll parent object for the plugin.
       * @memberof FooBar.Plugin#
       * @name $scrollParent
       * @type {jQuery}
       */
      self.$scrollParent = self.isDocumentElement ? self.$window : self.$el;
      /**
       * @summary The jQuery viewport object for the plugin.
       * @memberof FooBar.Plugin#
       * @name $viewport
       * @type {jQuery}
       */
      self.$viewport = self.isDocumentElement ? $(document) : self.$el;
      /**
       * @summary Contains the original offsets for the element being managed by this instance of the plugin.
       * @memberof FooBar.Plugin#
       * @name offsets
       * @type {{top: number, left: number, bottom: number, right: number}}
       */
      self.offsets = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
      self.screenLG = window.matchMedia("(max-width: 960px)");
      self.screenMD = window.matchMedia("(max-width: 782px)");
      self.screenSM = window.matchMedia("(max-width: 600px)");
      self.screenXS = window.matchMedia("(max-width: 480px)");
      self.isWPToolbar = self.$el.hasClass('wp-toolbar');
      self.useWPBody = false;
      /**
       * @summary The type of offset being used, either padding or margin.
       * @memberof FooBar.Plugin#
       * @name offsetType
       * @type {string}
       */
      self.offsetType = self.isWPToolbar ? 'padding' : 'margin';
      self.$offsetRoot = self.$el;
      self.offsetRoot = self.$offsetRoot.get(0);
      self.onScreenChange = self.onScreenChange.bind(self);
    },
    shouldUseWPBody: function () {
      const self = this;
      return self.isWPToolbar && (self.screenSM.matches || self.screenXS.matches) && self.$el.find('#wpbody').length > 0;
    },
    parseOffsets: function (reset) {
      const self = this,
        style = getComputedStyle(self.offsetRoot),
        result = Object.keys(self.offsets).reduce(function (result, prop) {
          const propName = self.offsetType + '-' + prop,
            propValue = parseInt(style.getPropertyValue(propName)) || 0;
          result[prop] = {
            name: prop,
            value: propValue,
            push: {
              name: propName,
              value: propValue
            }
          };
          if (reset) self.offsetRoot.style.removeProperty(propName);
          return result;
        }, {});
      if (reset) self.offsetRoot.offsetHeight;
      return result;
    },
    onScreenChange: function (e) {
      const self = this,
        props = Object.keys(self.offsets);
      self.offsetRoot.style.setProperty('transition', 'none', 'important');
      let changed = false,
        current = self.parseOffsets(true);
      const shouldUseWPBody = self.shouldUseWPBody();
      if (self.useWPBody !== shouldUseWPBody) {
        self.useWPBody = shouldUseWPBody;
        self.offsetRoot.style.removeProperty('transition');
        self.$offsetRoot = self.useWPBody ? self.$el.find('#wpbody') : self.$el;
        self.offsetRoot = self.$offsetRoot.get(0);
        self.offsetRoot.style.setProperty('transition', 'none', 'important');
        self.offsetRoot.offsetHeight;
        current = self.parseOffsets(true);
        changed = true;
      }
      const parsed = self.parseOffsets();
      props.forEach(function (prop) {
        const current_push = current[prop].push,
          parsed_push = parsed[prop].push;
        if (current_push.value > 0 && current_push.value !== parsed_push.value) {
          self.offsetRoot.style.setProperty(current_push.name, parsed_push.value + 'px', 'important');
        }
      });
      self.offsetRoot.offsetHeight;
      self.offsetRoot.style.removeProperty('transition');

      // finally check if any offsets changed
      props.forEach(function (prop) {
        if (self.offsets[prop].value !== parsed[prop].value) {
          changed = true;
        }
      });
      // if they have then set the current object values and raise an event
      if (changed) {
        const old = self.offsets;
        self.offsets = parsed;
        self.trigger('offset-change', [self.offsets, old]);
      }
    },
    beforeSetup: function () {
      const self = this;
      self.useWPBody = self.shouldUseWPBody();
      self.$offsetRoot = self.useWPBody ? self.$el.find('#wpbody') : self.$el;
      self.offsetRoot = self.$offsetRoot.get(0);
      self.offsets = self.parseOffsets();
      if (!!self.screenLG.addEventListener) {
        self.screenLG.addEventListener('change', self.onScreenChange);
        self.screenMD.addEventListener('change', self.onScreenChange);
        self.screenSM.addEventListener('change', self.onScreenChange);
        self.screenXS.addEventListener('change', self.onScreenChange);
      } else {
        self.screenLG.addListener(self.onScreenChange);
        self.screenMD.addListener(self.onScreenChange);
        self.screenSM.addListener(self.onScreenChange);
        self.screenXS.addListener(self.onScreenChange);
      }
      self.$window.on("beforeunload", {
        self: self
      }, self.onBeforeUnload);
      return self._super();
    },
    position: function (immediate) {
      const self = this,
        offsets = _obj.extend({}, self.offsets),
        max = _obj.extend({}, self.offsets),
        transition = !immediate && self.children.some(function (bar) {
          return bar.hasTransition;
        });
      self.children.forEach(function (bar) {
        self.addOffsets(bar, max);
      });
      let zIndex = self.opt.zIndex;
      zIndex = self.positionLayouts(["top", "top-inline"], offsets, max, zIndex, immediate);
      zIndex = self.positionLayouts(["bottom"], offsets, max, zIndex, immediate);
      zIndex = self.positionLayouts(["left"], offsets, max, zIndex, immediate);
      zIndex = self.positionLayouts(["right"], offsets, max, zIndex, immediate);
      self.positionLayouts(["top", "top-inline", "bottom", "left", "right"], offsets, max, zIndex, immediate, true);

      // finally push the element
      self.$offsetRoot.toggleClass(self.cls.pushTransition, !immediate && transition);
      Object.keys(offsets).forEach(function (prop) {
        const push = offsets[prop].push;
        if (_is.hash(push) && _is.string(push.name)) {
          if (_is.number(push.value) && push.value > 0) {
            self.offsetRoot.style.setProperty(push.name, push.value + 'px', 'important');
          } else {
            self.offsetRoot.style.removeProperty(push.name);
          }
        }
      });
    },
    positionLayouts: function (layouts, offsets, max, zIndex, immediate, exclude) {
      exclude = _is.boolean(exclude) ? exclude : false;
      const self = this,
        bars = self.children.filter(function (bar) {
          return exclude ? layouts.indexOf(bar.layout) === -1 : layouts.indexOf(bar.layout) !== -1;
        });
      if (layouts.length > 1) {
        // ensure we order the bars as per the layouts array
        bars.sort(function (a, b) {
          return layouts.indexOf(a.layout) - layouts.indexOf(b.layout);
        });
      }
      let maxIndex = bars.length - 1,
        openedMax = -1,
        closedMax = -1,
        toggleMax = {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        };
      bars.forEach(function (bar) {
        if (bar.isOpen) openedMax++;else closedMax++;
        self.addToggleOffsets(bar, toggleMax);
      });
      let opened = -1,
        closed = -1,
        toggleOffsets = {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        };
      bars.forEach(function (bar, index) {
        if (bar.isOpen) opened++;else closed++;
        const opt = {
          offset: {
            top: offsets.top.value,
            right: offsets.right.value,
            bottom: offsets.bottom.value,
            left: offsets.left.value,
            total: {
              top: max.top.value,
              right: max.right.value,
              bottom: max.bottom.value,
              left: max.left.value
            },
            toggle: {
              top: toggleOffsets.top,
              right: toggleOffsets.right,
              bottom: toggleOffsets.bottom,
              left: toggleOffsets.left,
              total: {
                top: toggleMax.top,
                right: toggleMax.right,
                bottom: toggleMax.bottom,
                left: toggleMax.left
              }
            }
          },
          index: {
            current: index,
            max: maxIndex,
            closed: {
              current: closed,
              max: closedMax
            },
            open: {
              current: opened,
              max: openedMax
            }
          }
        };
        bar.position(opt, immediate);
        if (bar.isOpen) {
          bar.el.style.setProperty('z-index', zIndex--);
        } else {
          bar.el.style.removeProperty('z-index');
        }
        self.addOffsets(bar, offsets);
        self.addToggleOffsets(bar, toggleOffsets);
      });
      return zIndex;
    },
    addOffsets: function (bar, offsets) {
      // update the offsets with the bars dimensions
      if (['top', 'top-inline'].indexOf(bar.layout) !== -1) {
        if (bar.isOpen) {
          offsets.top.value += bar.lastHeight;
          if (bar.opt.push) offsets.top.push.value += bar.lastHeight;
        }
      }
      if (bar.layout === 'bottom') {
        if (bar.isOpen) {
          offsets.bottom.value += bar.lastHeight;
          if (bar.opt.push) offsets.bottom.push.value += bar.lastHeight;
        }
      }
      if (bar.layout === 'left') {
        if (bar.isOpen) {
          offsets.left.value += bar.lastWidth;
          if (bar.opt.push) offsets.left.push.value += bar.lastWidth;
        }
      }
      if (bar.layout === 'right') {
        if (bar.isOpen) {
          offsets.right.value += bar.lastWidth;
          if (bar.opt.push) offsets.right.push.value += bar.lastWidth;
        }
      }
    },
    addToggleOffsets: function (bar, offsets) {
      // update the offsets with the bars toggle dimensions
      if (!bar.isOpen) {
        if (['top', 'top-inline', 'bottom'].indexOf(bar.layout) !== -1) {
          if (bar.togglePosition === 'left') {
            if (offsets.left === 0) offsets.left += bar.raw.toggleOffset;
            offsets.left += bar.raw.toggleSize;
            if (bar.toggleStyle === 'circle') {
              offsets.left += bar.raw.toggleOffset;
            }
          }
          if (bar.togglePosition === 'right' || bar.togglePosition === null) {
            if (offsets.right === 0) offsets.right += bar.raw.toggleOffset;
            offsets.right += bar.raw.toggleSize;
            if (bar.toggleStyle === 'circle') {
              offsets.right += bar.raw.toggleOffset;
            }
          }
        }
        if (['left', 'right'].indexOf(bar.layout) !== -1) {
          offsets.top += bar.raw.toggleSize;
          if (bar.toggleStyle === 'circle') {
            offsets.top += bar.raw.toggleOffset;
          }
        }
      }
    },
    afterTeardown: function () {
      const self = this;
      if (!!self.screenLG.removeEventListener) {
        self.screenLG.removeEventListener('change', self.onScreenChange);
        self.screenMD.removeEventListener('change', self.onScreenChange);
        self.screenSM.removeEventListener('change', self.onScreenChange);
        self.screenXS.removeEventListener('change', self.onScreenChange);
      } else {
        self.screenLG.removeListener(self.onScreenChange);
        self.screenMD.removeListener(self.onScreenChange);
        self.screenSM.removeListener(self.onScreenChange);
        self.screenXS.removeListener(self.onScreenChange);
      }
      self._super();
    },
    /**
     * @summary Create a single bar using the child registry and the provided element.
     * @memberof FooBar.Plugin#
     * @function registryCreate
     * @param {(string|jQuery|Element)} element - The element to create a bar component for.
     * @returns {?FooBar.Bar}
     */
    registryCreate: function (element) {
      const self = this;
      return /** @type {?FooBar.Bar} */self.childRegistry.create(element, self.raw.defaults, self, _.items);
    },
    /**
     * @summary Create all bar components found within the element using the child registry.
     * @memberof FooBar.Plugin#
     * @function registryCreateAll
     * @returns {FooBar.Bar[]}
     */
    registryCreateAll: function () {
      const self = this;
      return /** @type {FooBar.Bar[]} */self.childRegistry.createAll(self.$el, self.raw.defaults, self, _.items);
    },
    observe: function (ignoreConnect) {
      this.children.forEach(function (child) {
        child.observe(ignoreConnect);
      });
    },
    unobserve: function () {
      this.children.forEach(function (child) {
        child.unobserve();
      });
    },
    state: function (id, value) {
      const self = this;
      if (_is.string(id)) {
        if (_is.undef(value)) {
          return self.stored.hasOwnProperty(id) ? self.stored[id] : null;
        }
        self.stored[id] = value;
        self.store();
        return self.stored[id];
      }
      return self.stored;
    },
    forget: function (id) {
      const self = this;
      if (_is.string(id)) {
        if (self.stored.hasOwnProperty(id)) {
          delete self.stored[id];
        }
      } else {
        self.stored = {};
      }
    },
    store: function () {
      const self = this;
      if (Object.keys(self.stored).length > 0) {
        localStorage.setItem(self.name, JSON.stringify(self.stored));
      } else {
        localStorage.removeItem(self.name);
      }
    },
    onBeforeUnload: function (e) {
      e.data.self.store();
    },
    onChildDestroyed: function (e) {
      const self = this;
      self._super(e);
      if (e.target instanceof self.childComponentBase) {
        self.position(true);
      }
    }
  });
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.fn, FooBar.utils.obj, FooBar.utils.str);
"use strict";

(function ($, _, _utils, _is, _fn, _obj, _str, _t) {
  /**
   * @summary The base bar class providing the core functionality of FooBar.
   * @memberof FooBar.
   * @class Bar
   * @param {string} name - The name the bar was registered with.
   * @param {(jQuery|Element)} element - The element the bar is being created for.
   * @param {FooBar.Bar~Configuration} config - The configuration for the bar.
   * @param {FooBar.Plugin} plugin - The plugin for the bar.
   * @augments FooBar.utils.ObservedParentComponent
   * @borrows FooBar.utils.Class.extend as extend
   * @borrows FooBar.utils.Class.override as override
   * @borrows FooBar.utils.Class.bases as bases
   */
  _.Bar = _utils.ObservedParentComponent.extend(/** @lends FooBar.Bar.prototype */{
    /**
     * @ignore
     * @constructs
     * @param {string} name - The name the bar was registered with.
     * @param {(jQuery|Element)} element - The element the bar is being created for.
     * @param {FooBar.Bar~Configuration} config - The configuration for the bar.
     * @param {FooBar.Plugin} plugin - The plugin for the bar.
     * @param {FooBar.utils.ComponentRegistry} itemsRegistry - The registry containing all items for the bar.
     */
    construct: function (name, element, config, plugin, itemsRegistry) {
      let self = this;
      // call the base FooBar.utils.ObservedParentComponent#construct method
      self._super(name, element, config, plugin, itemsRegistry);
      /**
       * @summary A simple configuration object used by all bars.
       * @typedef {FooBar.utils.ObservedParentComponent~Configuration} FooBar.Bar~Configuration
       * @property {Object} [regex] - An object containing Regular Expressions used by the bar.
       */

      /**
       * @summary The raw configuration object as it was supplied to this bars constructor.
       * @memberof FooBar.Bar#
       * @name raw
       * @type {FooBar.Bar~Configuration}
       */

      /**
       * @summary The plugin controlling this bar.
       * @memberof FooBar.Bar#
       * @name parent
       * @type {FooBar.Plugin}
       */

      /**
       * @summary The Regular Expressions for this bar.
       * @memberof FooBar.Bar#
       * @name regex
       * @type {Object}
       */
      self.regex = _is.hash(self.raw.regex) ? self.raw.regex : {};
      /**
       * @summary The ID of this bar.
       * @memberof FooBar.Bar#
       * @name id
       * @type {string}
       */
      self.id = self.$el.prop("id");
      /**
       * @summary The layout used by this bar.
       * @memberof FooBar.Bar#
       * @name layout
       * @type {string}
       */
      self.layout = self.getCSSOption(self.regex.layout);
      /**
       * @summary The toggle position used by this bar.
       * @memberof FooBar.Bar#
       * @name togglePosition
       * @type {string}
       */
      self.togglePosition = self.getCSSOption(self.regex.togglePosition);
      /**
       * @summary The toggle style used by this bar.
       * @memberof FooBar.Bar#
       * @name toggleStyle
       * @type {string}
       */
      self.toggleStyle = self.getCSSOption(self.regex.toggleStyle);
      /**
       * @summary The transition used by this bar.
       * @memberof FooBar.Bar#
       * @name transition
       * @type {string}
       */
      self.transition = self.getCSSOption(self.regex.transition);
      /**
       * @summary The item transition used by this bar.
       * @memberof FooBar.Bar#
       * @name itemTransition
       * @type {string}
       */
      self.itemTransition = self.getCSSOption(self.regex.itemTransition);
      /**
       * @summary Whether or not the bar is currently open.
       * @memberof FooBar.Bar#
       * @name isOpen
       * @type {boolean}
       */
      self.isOpen = self.$el.hasClass(self.cls.open);
      /**
       * @summary Whether or not the bar is using any toggle transitions.
       * @memberof FooBar.Bar#
       * @name hasTransition
       * @type {boolean}
       */
      self.hasTransition = !_is.empty(self.transition);
      /**
       * @summary Whether or not the bar is using any item transitions.
       * @memberof FooBar.Bar#
       * @name hasItemTransition
       * @type {boolean}
       */
      self.hasItemTransition = !_is.empty(self.itemTransition);
      /**
       * @summary The jQuery loader div element.
       * @memberof FooBar.Bar#
       * @name $loader
       * @type {jQuery}
       */
      self.$loader = $("<div/>", {
        "class": self.cls.loader
      });
      /**
       * @summary The jQuery inner div element.
       * @memberof FooBar.Bar#
       * @name $inner
       * @type {jQuery}
       */
      self.$inner = self.$el.find(self.sel.inner);
      /**
       * @summary The jQuery toggle button element.
       * @memberof FooBar.Bar#
       * @name $toggle
       * @type {jQuery}
       */
      self.$toggle = self.$el.find(self.sel.toggle);
      /**
       * @summary The jQuery content div element.
       * @memberof FooBar.Bar#
       * @name $content
       * @type {jQuery}
       */
      self.$content = self.$el.find(self.sel.content);
      /**
       * @summary The jQuery previous button element.
       * @memberof FooBar.Bar#
       * @name $prev
       * @type {jQuery}
       */
      self.$prev = self.$content.find(self.sel.prev);
      /**
       * @summary The jQuery next button element.
       * @memberof FooBar.Bar#
       * @name $next
       * @type {jQuery}
       */
      self.$next = self.$content.find(self.sel.next);
      /**
       * @summary The jQuery items ul element.
       * @memberof FooBar.Bar#
       * @name $items
       * @type {jQuery}
       */
      self.$items = self.$content.find(self.sel.items);
      /**
       * @summary The active item for this bar.
       * @memberof FooBar.Bar#
       * @name item
       * @type {?FooBar.Item}
       */
      self.item = null;
      /**
       * @summary The last recorded height of the bar.
       * @memberof FooBar.Bar#
       * @name lastHeight
       * @type {number}
       */
      self.lastHeight = 0;
      /**
       * @summary The last recorded width of the bar.
       * @memberof FooBar.Bar#
       * @name lastWidth
       * @type {number}
       */
      self.lastWidth = self.$el.width();
      /**
       * @summary The minimum height for the bar.
       * @memberof FooBar.Bar#
       * @name minHeight
       * @type {number}
       */
      self.minHeight = parseInt(self.$el.css('min-height')) || 0;
      /**
       * @summary An array of all open rules.
       * @memberof FooBar.Bar#
       * @name openRules
       * @type {FooBar.ToggleRule[]}
       */
      self.openRules = _.toggleRules.fromOption(self.opt.open, self, "open");
      /**
       * @summary An array of all close rules.
       * @memberof FooBar.Bar#
       * @name openRules
       * @type {FooBar.ToggleRule[]}
       */
      self.closeRules = _.toggleRules.fromOption(self.opt.close, self, "close");
      /**
       * @summary Whether or not the bar is in the process of being dismissed.
       * @memberof FooBar.Bar#
       * @name isDismissing
       * @type {boolean}
       */
      self.isDismissing = false;
      /**
       * @summary Whether or not the bar has had any user interaction.
       * @memberof FooBar.Bar#
       * @name hasUserInteracted
       * @type {boolean}
       */
      self.hasUserInteracted = false;
      /**
       * @summary An array of all items for this bar.
       * @memberof FooBar.Bar#
       * @name children
       * @type {Array.<FooBar.Item>}
       */
      /**
       * @summary Find a child item.
       * @memberof FooBar.Bar#
       * @function findChild
       * @param {function(FooBar.Item):boolean} callback - The callback used to find the item.
       * @returns {(FooBar.Item|undefined)}
       */
    },
    //region Init Methods
    init: function () {
      const self = this;
      return self._super().then(function () {
        self.observe(true);
      }, function (err) {
        console.debug(err);
      });
    },
    beforeSetup: function () {
      const self = this;
      // the bar always starts in a closed state regardless of the CSS classes applied in the markup
      _t.disable(self.$el, function ($el) {
        $el.removeClass(self.cls.open).addClass(self.cls.closed).css('display', '');
      });
      return self._super().then(function () {
        if (self.children.length === 0) {
          return _fn.rejectWith(new Error(self.i18n.empty));
        }
        const state = self.state();
        if (state.action === 'dismissed') {
          return _fn.rejectWith(self.i18n.dismissed);
        }
        self.openRules = _.toggleRules.setOpenRulesState(self, state.action, self.openRules);
        self.closeRules = _.toggleRules.setCloseRulesState(self, state.action, self.closeRules);
        self.$prev.on("click.foobar", {
          self: self
        }, self.onPrevClick).append(self.icon('prev'));
        self.$next.on("click.foobar", {
          self: self
        }, self.onNextClick).append(self.icon('next'));
        self.$toggle.on("click.foobar", {
          self: self
        }, self.onToggleClick).append(self.icon('expand'), self.opt.dismiss ? self.icon('dismiss') : self.icon('collapse'));
        self.$loader.append(self.icon('loading'));
        self.$el.on("click.foobar", {
          self: self
        }, self.onUserInteraction).on("click.foobar", "[data-foobar-action]", {
          self: self
        }, self.onActionClick);
      });
    },
    afterSetup: function () {
      const self = this;
      if (self.children.length === 0) {
        return _fn.rejectWith(new Error(self.i18n.empty));
      }
      // toggle CSS class that indicates there are multiple items being displayed
      const multiple = self.children.length > 1;
      self.$el.toggleClass(self.cls.multiple, multiple).toggleClass(self.cls.pushing, self.opt.push);
      return self.setActive(self.getInitial(), null, true).then(function () {
        self.parent.position(true);
        return _.toggleRules.beforeInitialized(self.openRules, self.closeRules);
      }).then(function () {
        const immediate = _.toggleRules.hasImmediate(self.openRules);
        return _t.modify(self.$el, function ($el) {
          $el.addClass(self.cls.initialized);
        }, immediate || !self.hasTransition, self.opt.transitionTimeout);
      }).then(function () {
        return _.toggleRules.afterInitialized(self.openRules, self.closeRules);
      });
    },
    replaceItems(...items) {
      const self = this;
      self.destroyChildren();
      self.$items.empty().append(...items);
      const newItems = self.createChildren();
      return Promise.allSettled(newItems.map(i => i.init().then(() => i.update()))).then(() => {
        const multiple = self.children.length > 1;
        self.$el.toggleClass(self.cls.multiple, multiple);
      });
    },
    //endregion

    //region Destroy Methods

    beforeTeardown: function () {
      const self = this;
      self._super();
      self.$el.removeClass(self.cls.initialized);
    },
    afterTeardown: function () {
      const self = this;
      self._super();
      _.toggleRules.teardownRules(self.openRules, self.closeRules);
      self.$prev.off("click.foobar").empty();
      self.$next.off("click.foobar").empty();
      self.$toggle.off("click.foobar").empty();
      self.$loader.empty();
      self.$content.removeClass(self.cls.hidden);
      self.$el.off("click.foobar").removeClass([self.cls.open, self.cls.interacted, self.cls.noEffects, self.cls.multiple, self.cls.pushing]).removeAttr('style');
    },
    //endregion

    prev: function (immediate) {
      const self = this;
      return self.setActive(self.getPrev(), "prev", immediate);
    },
    next: function (immediate) {
      const self = this;
      return self.setActive(self.getNext(), "next", immediate);
    },
    goto: function (item, immediate) {
      const self = this;
      if (_is.number(item) && item >= 0 && item < self.children.length) {
        item = self.children[item];
      }
      if (item instanceof _.Item) {
        let current = self.children.indexOf(item);
        if (current !== -1) {
          let old = -1;
          if (self.item instanceof _.Item) {
            old = self.children.indexOf(self.item);
          }
          if (old === -1) {
            return self.setActive(item, null, immediate);
          }
          const action = current < old ? 'prev' : 'next';
          return self.setActive(item, action, immediate);
        }
      }
      return _fn.rejectWith(new Error(self.i18n.itemInvalidArg));
    },
    setActive: function (item, action, immediate) {
      const self = this;
      if (item instanceof _.Item) {
        const wait = [];
        if (self.item instanceof _.Item) {
          wait.push(self.item.active(false, action, immediate));
        }
        self.item = item;
        item.update();
        wait.push(item.active(true, action, immediate));
        wait.push(self.height(item.lastContentHeight, immediate, true));
        return _fn.whenAll(wait).then(function () {
          self.state({
            active: self.children.indexOf(item)
          });
        });
      }
      return _fn.rejectWith(new Error(self.i18n.itemInvalidArg));
    },
    getInitial: function () {
      const self = this;
      if (self.children.length > 0) {
        let initial;
        const state = self.state();
        if (_is.number(state.active) && state.active >= 0 && state.active < self.children.length) {
          // we have a valid state value so use it
          initial = self.children[state.active];
        } else {
          // otherwise try find the first item flagged as active
          initial = self.findChild(function (item) {
            return item.isActive;
          });
        }
        // if no item was found then just set it to the first item
        if (!(initial instanceof _.Item)) initial = self.children[0];
        return initial;
      }
      return null;
    },
    getByType: function (itemType) {
      const self = this;
      if (self.children.length > 0) {
        const found = _utils.find(self.children, function (item) {
          return item instanceof itemType;
        });
        return found instanceof _.Item ? found : null;
      }
      return null;
    },
    getByIndex: function (index) {
      const self = this;
      if (_is.number(index) && index >= 0 && index < self.children.length) {
        return self.children[index];
      }
      return null;
    },
    getNext: function () {
      const self = this;
      if (self.children.length > 1 && self.item instanceof _.Item) {
        let index = self.children.indexOf(self.item) + 1;
        if (index >= self.children.length) index = 0;
        return self.children[index];
      }
      return null;
    },
    getPrev: function () {
      const self = this;
      if (self.children.length > 1 && self.item instanceof _.Item) {
        let index = self.children.indexOf(self.item) - 1;
        if (index < 0) index = self.children.length - 1;
        return self.children[index];
      }
      return null;
    },
    getNth: function (n) {
      const self = this,
        l = self.children.length;
      if (_is.string(n)) {
        switch (n) {
          case 'first':
            n = 1;
            break;
          case 'last':
            n = l;
            break;
        }
      }
      if (_is.number(n)) {
        if (l > 0 && n > 0 && n <= l) {
          return self.children[n - 1];
        }
      }
      return null;
    },
    getFirst: function () {
      return this.getNth('first');
    },
    getLast: function () {
      return this.getNth('last');
    },
    toggle: function (state, immediate) {
      const self = this;
      if (!_is.boolean(state)) {
        state = !self.$el.hasClass(self.cls.open);
      }
      self.isOpen = state;
      self.parent.unobserve();
      self.parent.position(immediate);
      _t.disable(self.$content, function ($el) {
        $el.removeClass(self.cls.hidden).css("height", self.lastHeight);
      });
      return _t.modify(self.$el, function ($el) {
        $el.toggleClass(self.cls.open, state).toggleClass(self.cls.closed, !state);
      }, !self.hasTransition || immediate, self.opt.transitionTimeout).always(function () {
        _t.disable(self.$content, function ($el) {
          $el.css("height", "");
          if (!state) $el.addClass(self.cls.hidden);
        });
        if (self.item instanceof _.Item) {
          self.item.toggled(self.isOpen);
        }
        self.parent.observe(true);
        self.state({
          action: self.isOpen ? 'open' : 'closed'
        });
      });
    },
    dismiss: function (immediate) {
      const self = this;
      if (self.isDismissing) return _fn.rejectWith(self.i18n.dismissing);
      self.isDismissing = true;
      if (!_is.boolean(immediate)) {
        immediate = self.opt.dismissImmediate;
      }
      self.$el.addClass(self.cls.dismissed);
      return self.toggle(false, immediate).always(function () {
        self.destroy();
        self.$el.remove();
        self.state({
          action: 'dismissed'
        });
        self.isDismissing = false;
      });
    },
    height: function (value, immediate, reposition) {
      const self = this;
      if (_is.number(value)) {
        if (self.minHeight > 0 && value < self.minHeight) value = self.minHeight;
        if (self.lastHeight === value) return _fn.resolved;
        self.lastHeight = value;
        self.parent.unobserve();
        if (!!reposition) self.parent.position(immediate);
        return _t.modify(self.$el, function ($el) {
          $el.css("height", value);
        }, !self.hasItemTransition || immediate, self.opt.transitionTimeout).always(function () {
          self.parent.observe(true);
        });
      }
      return self.$el.css("height");
    },
    width: function () {
      const self = this;
      const inlineMax = self.$el.css('max-width');
      self.el.style.removeProperty('max-width');
      // noinspection BadExpressionStatementJS
      self.el.offsetWidth;
      const width = self.$el.width(),
        actualMax = self.$el.css('max-width');
      if (inlineMax !== actualMax) {
        self.$el.css('max-width');
      }
      // noinspection BadExpressionStatementJS
      self.el.offsetWidth;
      return width;
    },
    perform: function (action, immediate) {
      const self = this;
      switch (action) {
        case 'prev':
          return self.prev(immediate);
        case 'next':
          return self.next(immediate);
        case 'dismiss':
          return self.dismiss(immediate);
        case 'open':
          return self.toggle(true, immediate);
        case 'close':
          return self.toggle(false, immediate);
        case 'toggle':
          return self.toggle(null, immediate);
        default:
          if (self.item instanceof _.Item && _is.fn(self.item[action])) {
            return self.item[action](immediate);
          }
          return _fn.rejectWith(new Error(_str.format(self.i18n.unsupported, {
            action: action
          })));
      }
    },
    modify: function (doModifyCallback, immediate) {
      const self = this,
        wasObserved = self.isObserved;
      if (wasObserved) self.unobserve();
      return _t.modify(self.$el, doModifyCallback, immediate, self.opt.transitionTimeout).always(function () {
        if (wasObserved) self.observe();
      });
    },
    icon: function (name, svgName, classes) {
      const self = this;
      if (!_is.string(svgName)) svgName = self.opt.svg;
      if (!_is.array(classes)) classes = [];
      if (self.cls.icons.hasOwnProperty(name)) {
        classes.push(self.cls.icons[name]);
      }
      // first see if this is a named icon and use the mapped value
      if (self.opt.icons.hasOwnProperty(name)) {
        return _.icons.get(self.opt.icons[name], svgName, classes);
      }
      // otherwise just query the icons registry
      return _.icons.get(name, svgName, classes);
    },
    getCSSOption: function (regex) {
      const self = this;
      if (regex instanceof RegExp) {
        const match = self.el.className.match(regex);
        if (match !== null && match.length === 2) {
          return match[1];
        }
      }
      return null;
    },
    disableTransitionsTemporarily: function (doWhileDisabled) {
      const self = this;
      _t.disable(self.$el, doWhileDisabled, self);
    },
    state: function (value) {
      const self = this;
      // if state is not persisted or this is a preview then return just the default state
      if (!self.opt.remember || self.opt.preview) return _obj.extend({}, self.raw.state);

      // handle the previous string only state
      let state = self.parent.state(self.id);
      if (_is.string(state)) {
        state = {
          action: state
        };
      }

      // handle the current object state
      state = _obj.extend({}, self.raw.state, state);

      // handle the new modified property, adding where necessary
      if (!_is.number(state.modified)) {
        state = self.parent.state(self.id, _obj.extend(state, {
          modified: Date.now()
        }));
      }

      // if there is no value then treat this as a GET
      if (_is.undef(value)) {
        // if the state should expire check the modified date and reset the state to defaults if necessary
        if (self.opt.stateDuration > 0 && Date.now() - state.modified > self.opt.stateDuration * self.opt.stateDurationModifier) {
          return self.parent.state(self.id, _obj.extend({}, self.raw.state, {
            modified: Date.now()
          }));
        }
        return state;
      }
      // if there is a value then treat this as a SET
      return self.parent.state(self.id, _obj.extend({}, state, value, {
        modified: Date.now()
      }));
    },
    forget: function () {
      const self = this;
      if (!self.opt.preview) {
        self.parent.forget(self.id);
      }
    },
    position: function (options, immediate) {
      const self = this,
        css = {};
      if (self.isOpen && options.offset.left > 0 && ['left', 'left-top', 'left-center', 'left-bottom'].indexOf(self.layout) !== -1) {
        css.left = options.offset.left + 'px';
      } else if (!self.isOpen && options.offset.total.left > 0 && ['left', 'left-top', 'left-center', 'left-bottom'].indexOf(self.layout) !== -1) {
        css.left = options.offset.total.left + 'px';
      } else {
        css.left = '';
      }
      if (options.offset.right > 0 && ['right', 'right-top', 'right-center', 'right-bottom'].indexOf(self.layout) !== -1) {
        css.right = (self.isOpen ? options.offset.right : options.offset.total.right) + 'px';
      } else {
        css.right = '';
      }
      if (options.offset.top > 0) {
        if (['left-top', 'right-top'].indexOf(self.layout) !== -1) {
          css.top = options.offset.top + self.raw.toggleOffset + self.raw.toggleSize + 'px';
        } else if (['top', 'top-left', 'top-right', 'top-inline', 'left', 'right'].indexOf(self.layout) !== -1) {
          css.top = options.offset.top + 'px';
        } else {
          css.top = '';
        }
      } else {
        css.top = '';
      }
      if (options.offset.bottom > 0) {
        if (['left-bottom', 'right-bottom'].indexOf(self.layout) !== -1) {
          css.bottom = options.offset.bottom + self.raw.toggleOffset + self.raw.toggleSize + 'px';
        } else if (['bottom', 'bottom-left', 'bottom-right', 'left', 'right'].indexOf(self.layout) !== -1) {
          css.bottom = options.offset.bottom + 'px';
        } else {
          css.bottom = '';
        }
      } else {
        css.bottom = '';
      }
      if (['inline', 'top-inline'].indexOf(self.layout) === -1) {
        const vOffset = options.offset.total.top + options.offset.total.bottom;
        if (vOffset > 0) {
          css.maxHeight = 'calc(100% - ' + vOffset + 'px)';
        } else {
          css.maxHeight = '';
        }
        if (vOffset > 0 && ['left-center', 'right-center'].indexOf(self.layout) !== -1) {
          css.top = 'calc(50% + ' + (options.offset.total.top / 2 - options.offset.total.bottom / 2) + 'px)';
        }
      } else {
        css.maxHeight = '';
      }
      if (immediate) self.el.style.setProperty('transition', 'none', 'important');
      self.$el.css(css);
      if (immediate) {
        self.el.offsetHeight;
        self.el.style.removeProperty('transition');
      }
      if (options.index.max > 0) {
        const toggleCSS = {
          position: '',
          top: '',
          right: '',
          bottom: '',
          left: '',
          transform: ''
        };
        if (!self.isOpen) {
          if (['top', 'top-inline'].indexOf(self.layout) !== -1) {
            if (options.offset.total.top - options.offset.top > 0) {
              toggleCSS.top = options.offset.total.top - options.offset.top;
              if (self.toggleStyle === 'circle') {
                toggleCSS.top += self.raw.toggleOffset;
              }
            }
          }
          if (['bottom'].indexOf(self.layout) !== -1) {
            if (options.offset.total.bottom - options.offset.bottom > 0) {
              toggleCSS.bottom = options.offset.total.bottom - options.offset.bottom;
              if (self.toggleStyle === 'circle') {
                toggleCSS.bottom += self.raw.toggleOffset;
              }
            }
          }
          if (['top', 'top-inline', 'bottom'].indexOf(self.layout) !== -1) {
            if (options.offset.toggle.left > 0 && self.togglePosition === 'left') {
              toggleCSS.left = options.offset.toggle.left;
            } else if (options.offset.toggle.right > 0 && ['right', null].indexOf(self.togglePosition)) {
              toggleCSS.right = options.offset.toggle.right;
            }
          }
          if (['left', 'right'].indexOf(self.layout) !== -1) {
            if (options.offset.toggle.top > 0 || options.offset.toggle.total.top > 0) {
              toggleCSS.transform = 'translateY(-50%) translateY(' + options.offset.toggle.top + 'px) translateY(-' + options.offset.toggle.total.top / 2 + 'px)';
              if (self.toggleStyle === 'circle') {
                toggleCSS.transform = 'translateY(-50%) translateY(' + (options.offset.toggle.top + self.raw.toggleOffset) + 'px) translateY(-' + options.offset.toggle.total.top / 2 + 'px)';
              }
            }
            if (options.offset.toggle.left > 0 && self.layout === 'left') {
              toggleCSS.left = options.offset.toggle.left;
            } else if (options.offset.toggle.right > 0 && self.layout === 'right') {
              toggleCSS.right = options.offset.toggle.right;
            }
          }
        }
        const toggleEl = self.$toggle.get(0);
        if (immediate) toggleEl.style.setProperty('transition', 'none', 'important');
        self.$toggle.css(toggleCSS);
        if (immediate) {
          toggleEl.offsetHeight;
          toggleEl.style.removeProperty('transition');
        }
      }
    },
    performLayout: function (reposition) {
      const self = this,
        width = self.width();
      self.minHeight = parseInt(self.$el.css('min-height')) || 0;
      self.isOpen = self.$el.hasClass(self.cls.open);
      self.layout = self.getCSSOption(self.regex.layout);
      self.togglePosition = self.getCSSOption(self.regex.togglePosition);
      self.toggleStyle = self.getCSSOption(self.regex.toggleStyle);
      self.transition = self.getCSSOption(self.regex.transition);
      self.itemTransition = self.getCSSOption(self.regex.itemTransition);
      self.hasTransition = !_is.empty(self.transition);
      self.hasItemTransition = !_is.empty(self.itemTransition);
      if (self.lastHeight < self.minHeight) {
        self.lastHeight = self.minHeight;
      }
      if (width !== self.lastWidth) {
        self.lastWidth = width;
      }
      if (self.item instanceof _.Item) {
        if (self.item.update() || self.lastHeight !== self.item.lastContentHeight) {
          // the content size has changed so update the bar
          self.height(self.item.lastContentHeight, true, false);
        }
      }
      reposition = _is.boolean(reposition) ? reposition : true;
      if (reposition) self.parent.position(true);
    },
    //region Listeners

    onPrevClick: function (e) {
      e.preventDefault();
      e.data.self.prev();
    },
    onNextClick: function (e) {
      e.preventDefault();
      e.data.self.next();
    },
    onToggleClick: function (e) {
      e.preventDefault();
      const self = /** @type FooBar.Bar */e.data.self;
      if (self.opt.dismiss && self.isOpen) self.dismiss(self.opt.dismissImmediate);else self.toggle();
    },
    onUserInteraction: function (e) {
      const self = /** @type FooBar.Bar */e.data.self;
      if (!self.hasUserInteracted) {
        self.hasUserInteracted = true;
        self.unobserve();
        self.$el.addClass(self.cls.interacted);
        if (self.opt.disableEffects) {
          self.$el.addClass(self.cls.noEffects);
        }
        self.$el.prop('offsetHeight');
        self.observe(true);
      }
    },
    onActionClick: function (e) {
      e.preventDefault();
      const self = /** @type FooBar.Bar */e.data.self,
        $this = $(this),
        action = $this.data('foobar-action'),
        immediate = $this.data('immediate');
      self.perform(action, immediate);
    },
    onSizeChange: function () {
      this.performLayout(true);
    },
    onClassChange: function () {
      this.performLayout(true);
    }

    //endregion
  });
  _.bars.register("bar", _.Bar, ".foobar", {
    options: {
      icons: {
        expand: "plus",
        collapse: "minus",
        dismiss: "cross",
        prev: "arrow-left",
        next: "arrow-right",
        loading: "spinner"
      },
      offset: 0,
      push: false,
      remember: false,
      stateDuration: 0,
      // 0 = infinite otherwise this should be a duration in days
      stateDurationModifier: 86400000,
      // to get the total milliseconds in a day: 24hr * 60min * 60sec * 1000ms = 86400000ms
      dismiss: false,
      dismissImmediate: false,
      disableEffects: false,
      open: {},
      close: {},
      transitionTimeout: 350,
      on: {},
      preview: false,
      svg: "defaults"
    },
    state: {
      action: null,
      active: -1,
      modified: null
    },
    toggleOffset: 10,
    toggleSize: 46,
    regex: {
      layout: /(?:\s|^)?fbr-layout-(.*?)(?:\s|$)/,
      togglePosition: /(?:\s|^)?fbr-toggle-(left|right|none)(?:\s|$)/,
      toggleStyle: /(?:\s|^)?fbr-toggle-(default|circle|overlap)(?:\s|$)/,
      transition: /(?:\s|^)?fbr-transition-(?!item-)?(.*?)(?:\s|$)/,
      itemTransition: /(?:\s|^)?fbr-transition-item-(.*?)(?:\s|$)/
    },
    classes: {
      el: "foobar",
      dismissed: "fbr-dismissed",
      closed: "fbr-closed",
      open: "fbr-open",
      loader: "fbr-loader",
      inner: "fbr-inner",
      content: "fbr-content",
      toggle: "fbr-toggle",
      items: "fbr-items",
      prev: "fbr-prev",
      next: "fbr-next",
      item: "fbr-item",
      pushing: "fbr-pushing",
      hidden: "fbr-hidden",
      initialized: "fbr-initialized",
      multiple: "fbr-multiple-items",
      interacted: "fbr-interacted",
      noEffects: "fbr-no-effects",
      icons: {
        expand: "fbr-expand-icon",
        collapse: "fbr-collapse-icon",
        dismiss: "fbr-dismiss-icon",
        prev: "fbr-prev-icon",
        next: "fbr-next-icon",
        loading: "fbr-loading-icon"
      }
    },
    i18n: {
      empty: "No items were initialized.",
      unsupported: "The provided '{action}' action is not supported.",
      dismissed: "The bar has been dismissed previously and will not be initialized.",
      dismissing: "The bar is currently being dismissed.",
      itemInvalidArg: "The first argument supplied to the 'setActive' method must be an instance of FooBar.Item."
    },
    defaults: {}
  }, -1);
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.fn, FooBar.utils.obj, FooBar.utils.str, FooBar.utils.transition);
"use strict";

(function ($, _, _utils, _fn, _obj) {
  _.ToggleRule = _utils.Class.extend(/** @lends FooBar.ToggleRule.prototype */{
    construct: function (name, config, parent, action) {
      const self = this;
      self.name = name;
      self.cfg = _obj.extend({}, config);
      self.parent = parent;
      self.plugin = parent.parent;
      self.action = action;
    },
    init: function () {
      const self = this;
      return _fn.resolved.then(function () {
        return self.setup();
      });
    },
    setup: function () {},
    destroy: function () {
      const self = this;
      self.teardown();
    },
    teardown: function () {},
    apply: function () {
      const self = this;
      switch (self.action) {
        case "open":
          if (!self.parent.isOpen) {
            self.parent.trigger("open-rule", [self]);
            return self.parent.toggle(true, !self.cfg.allowTransition);
          }
          return _fn.resolved;
        case "close":
          if (self.parent.isOpen) {
            self.parent.trigger("close-rule", [self]);
            return self.parent.toggle(false, !self.cfg.allowTransition);
          }
          return _fn.resolved;
        default:
          return _fn.rejectWith(new Error("Unknown action '" + self.action + "' in rule '" + self.name + "'."));
      }
    }
  });
  _.toggleRules.register("toggle-rule", _.ToggleRule, {
    allowTransition: true
  }, -1);
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.fn, FooBar.utils.obj);
"use strict";

(function ($, _, _utils, _fn, _obj) {
  _.ToggleRule.Delay = _.ToggleRule.extend(/** @lends FooBar.ToggleRule.Delay.prototype */{
    setup: function () {
      const self = this;
      if (self.cfg.value > 0) {
        self.delayHandle = setTimeout(function () {
          self.apply();
        }, self.cfg.value);
      } else {
        return self.apply();
      }
    },
    teardown: function () {
      clearTimeout(this.delayHandle);
    }
  });
  _.toggleRules.register("delay", _.ToggleRule.Delay, {
    value: 0
  });
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.fn, FooBar.utils.obj);
"use strict";

(function ($, _, _utils, _fn, _obj) {
  _.ToggleRule.ElementVisibility = _.ToggleRule.extend(/** @lends FooBar.ToggleRule.ElementVisibility.prototype */{
    construct: function (name, config, parent, action) {
      const self = this;
      self._super(name, config, parent, action);
      self.$root = self.plugin.$viewport;
      self.$target = self.$root.find(self.cfg.selector);
      self.iObserver = new IntersectionObserver(self.onIntersectionObserved.bind(self), {
        // this is done as the polyfill doesn't support passing in the document as the root but does default to it if supplied null
        root: self.plugin.isDocumentElement && !!IntersectionObserver.prototype.POLL_INTERVAL ? null : self.$root.get(0),
        rootMargin: self.cfg.rootMargin,
        threshold: self.cfg.threshold
      });
    },
    setup: function () {
      const self = this;
      if (self.$target.length > 0) {
        self.iObserver.observe(self.$target.get(0));
      }
    },
    teardown: function () {
      const self = this;
      self.iObserver.disconnect();
    },
    onIntersectionObserved: function (entries) {
      const self = this;
      entries.forEach(function (entry) {
        if (entry.target === self.$target.get(0)) {
          switch (self.action) {
            case "open":
            case "close":
              if (entry.isIntersecting && self.cfg.visible || !entry.isIntersecting && !self.cfg.visible) {
                if (self.cfg.once) self.iObserver.disconnect();
                self.apply();
              }
              break;
          }
        }
      });
    }
  });
  _.toggleRules.register("element-visibility", _.ToggleRule.ElementVisibility, {
    selector: null,
    rootMargin: "0px",
    threshold: 0,
    visible: true,
    once: true
  }, 10);
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.fn, FooBar.utils.obj);
"use strict";

(function ($, _, _utils, _is, _obj) {
  _.ToggleRule.ExitIntent = _.ToggleRule.extend(/** @lends FooBar.ToggleRule.ExitIntent.prototype */{
    construct: function (name, config, parent, action) {
      const self = this;
      self._super(name, config, parent, action);
      self.$root = self.plugin.$viewport;
      self.root = self.$root.get(0);
      self.isElement = self.root instanceof Element;
      self.delayId = null;
    },
    setup: function () {
      const self = this;
      if (_is.number(self.cfg.delay) && self.cfg.delay > 0) {
        self.delayId = setTimeout(function () {
          self.$root.on("mouseout.foobar", {
            self: self
          }, self.onMouseout);
        }, self.cfg.delay * 1000);
      } else {
        self.$root.on("mouseout.foobar", {
          self: self
        }, self.onMouseout);
      }
    },
    teardown: function () {
      const self = this;
      clearTimeout(self.delayId);
      self.delayId = null;
      self.$root.off("mouseout.foobar", self.onMouseout);
    },
    onMouseout: function (e) {
      const self = e.data.self;
      switch (self.action) {
        case "open":
        case "close":
          if (self.getIsExiting(e)) {
            if (self.cfg.once) self.$root.off("mouseout.foobar", self.onMouseout);
            self.apply();
          }
          break;
      }
    },
    getIsExiting: function (mouseoutEvent) {
      const self = this,
        elementExit = self.isElement && !self.root.contains(mouseoutEvent.toElement),
        viewportExit = !self.isElement && mouseoutEvent.toElement === null && mouseoutEvent.relatedTarget === null;
      return elementExit || viewportExit;
    }
  });
  _.toggleRules.register("exit-intent", _.ToggleRule.ExitIntent, {
    delay: 0,
    once: true
  });
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj);
"use strict";

(function ($, _, _utils, _obj) {
  _.ToggleRule.Immediate = _.ToggleRule.extend(/** @lends FooBar.ToggleRule.Immediate.prototype */{
    setup: function () {
      return this.apply();
    }
  });
  _.toggleRules.register("immediate", _.ToggleRule.Immediate, {
    allowTransition: false
  });
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.obj);
"use strict";

(function ($, _, _utils, _is, _obj) {
  _.ToggleRule.Scroll = _.ToggleRule.extend(/** @lends FooBar.ToggleRule.Scroll.prototype */{
    construct: function (name, config, parent, action) {
      const self = this;
      self._super(name, config, parent, action);
      self.$document = $(document);
      self.$root = self.plugin.$scrollParent;
      self.isElement = self.$root.get(0) instanceof Element;
    },
    update: function () {
      const self = this;
      self.teardown();
      self.$document = $(document);
      self.$root = self.plugin.$scrollParent;
      self.isElement = self.$root.get(0) instanceof Element;
      self.setup();
    },
    setup: function () {
      const self = this;
      if (_is.number(self.cfg.value) && self.cfg.value > 0) {
        self.$root.on("scroll.foobar", {
          self: self
        }, self.onScroll);
      }
    },
    teardown: function () {
      const self = this;
      self.$root.off("scroll.foobar", self.onScroll);
    },
    onScroll: function (e) {
      const self = e.data.self;
      switch (self.action) {
        case "open":
        case "close":
          if (self.compare(self.getScrollOffset(), self.cfg.value, self.cfg.comparator)) {
            if (self.cfg.once) self.$root.off("scroll.foobar", self.onScroll);
            self.apply();
          }
          break;
      }
    },
    compare: function (scrollOffset, value, comparator) {
      if (_is.fn(comparator)) {
        return comparator.call(this, scrollOffset, value);
      }
      if (_is.string(comparator)) {
        switch (comparator) {
          case "<":
            return scrollOffset < value;
          case ">":
            return scrollOffset > value;
          case "<=":
            return scrollOffset <= value;
          case ">=":
            return scrollOffset >= value;
          case "===":
            return scrollOffset === value;
        }
      }
      return false;
    },
    getScrollOffset: function () {
      const self = this;
      switch (self.name) {
        case "scroll-top":
          return self.$root.scrollTop();
        case "scroll-bottom":
          const scrollHeight = self.isElement ? self.$root.prop("scrollHeight") : self.$document.height();
          return scrollHeight - self.$root.height() - self.$root.scrollTop();
      }
    }
  });
  _.toggleRules.register("scroll-top", _.ToggleRule.Scroll, {
    value: 0,
    comparator: ">=",
    once: true
  });
  _.toggleRules.register("scroll-bottom", _.ToggleRule.Scroll, {
    value: 0,
    comparator: "<=",
    once: true
  });
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.obj);
"use strict";

(function ($, _, _utils, _fn, _obj) {
  _.ToggleRule.Transition = _.ToggleRule.extend(/** @lends FooBar.ToggleRule.Transition.prototype */{
    setup: function () {
      return this.apply();
    }
  });
  _.toggleRules.register("transition", _.ToggleRule.Transition);
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.fn, FooBar.utils.obj);
"use strict";

(function ($, _, _utils, _is, _fn, _t) {
  /**
   * @summary The base item class that simply knows how to fetch its dimensions.
   * @memberof FooBar.
   * @class Item
   * @param {string} name - The name the item was registered with.
   * @param {string} type - The type of the component.
   * @param {(jQuery|Element)} element - The element for the item.
   * @param {FooBar.Item~Configuration} [config] - The configuration for the item.
   * @param {FooBar.Bar} [bar] - The parent bar this item belongs to.
   * @augments FooBar.utils.Component
   * @borrows FooBar.utils.Class.extend as extend
   * @borrows FooBar.utils.Class.override as override
   * @borrows FooBar.utils.Class.bases as bases
   */
  _.Item = _utils.Component.extend(/** @lends FooBar.Item.prototype */{
    /**
     * @ignore
     * @constructs
     * @param {string} name - The name the item was registered with.
     * @param {(jQuery|Element)} element - The element for the item.
     * @param {FooBar.Item~Configuration} [config] - The configuration for the item.
     * @param {FooBar.Bar} [bar] - The parent bar this item belongs to.
     */
    construct: function (name, element, config, bar) {
      let self = this;
      // call the base FooBar.utils.Component#construct method
      self._super(name, element, config, bar);
      /**
       * @summary The default configuration object for an item.
       * @typedef {FooBar.utils.Component~Configuration} FooBar.Item~Configuration
       * @property {string} [classes.inner="fbr-item-inner"] - The CSS class used on the items inner element.
       */

      /**
       * @summary The raw configuration object as it was supplied to this items constructor.
       * @memberof FooBar.Item#
       * @name raw
       * @type {FooBar.Item~Configuration}
       */

      /**
       * @summary The bar this item belongs to.
       * @memberof FooBar.Item#
       * @name parent
       * @type {FooBar.Bar}
       */

      /**
       * @summary The jQuery wrapper for this items inner element.
       * @memberof FooBar.Item#
       * @name $inner
       * @type {jQuery}
       */
      self.$inner = self.$el.find(self.sel.inner);
      /**
       * @summary The handle to the timeout for this item.
       * @memberof FooBar.Item#
       * @name timeoutHandle
       * @type {number|null}
       */
      self.timeoutHandle = null;
      /**
       * @summary The UI element used to represent the timeout duration for the item.
       * @memberof FooBar.Item#
       * @name $timeout
       * @type {jQuery}
       */
      self.$timeout = $('<span/>', {
        'class': self.cls.timeout
      });
      /**
       * @summary Whether or not this item is active.
       * @memberof FooBar.Item#
       * @name isActive
       * @type {boolean}
       */
      self.isActive = self.$el.hasClass(self.cls.active);
      /**
       * @summary The last height recorded for the items content.
       * @memberof FooBar.Item#
       * @name lastContentHeight
       * @type {number}
       */
      self.lastContentHeight = 0;
      /**
       * @summary Any bar specific capabilities this item supports.
       * @type {string[]}
       */
      self.capabilities = _is.array(self.raw.capabilities) ? self.raw.capabilities : [];
    },
    /**
     * @summary Override the base component destroy method to clear any timeouts
     * @memberof FooBar.Item#
     * @function destroy
     */
    destroy: function () {
      const self = this;
      // if (self.timeoutHandle !== null){
      // 	clearTimeout(self.timeoutHandle);
      // 	self.timeoutHandle = null;
      // }
      self.clearTimeout();
      self._super();
    },
    /**
     * @summary Sets the items active state.
     * @memberof FooBar.Item#
     * @function active
     * @param {boolean} [state] - Whether or not this item is active.
     * @param {string} [action] - The action performed that is changing the state.
     * @param {boolean} [immediate=false] - Whether or not to allow transitions and perform the change immediately.
     * @returns {Promise}
     */
    active: function (state, action, immediate) {
      const self = this;
      if (!_is.boolean(state)) {
        return _fn.rejectWith(new Error(self.i18n.activeInvalidArg));
      }
      return _fn.resolved.then(function () {
        self.clearTimeout();
        return self.beforeActive(state);
      }).then(function () {
        self.isActive = state;
        // first check the action and determine the class to use if any
        let actionClass = null;
        switch (action) {
          case "prev":
            // when activated start in the prev position,
            // when deactivated finish in the next position
            actionClass = state ? self.cls.prev : self.cls.next;
            break;
          case "next":
            // when activated start in the next position,
            // when deactivated finish in the prev position
            actionClass = state ? self.cls.next : self.cls.prev;
            break;
        }
        self.update();

        // if there is no transition or action supplied then changes are applied immediately
        immediate = immediate || !self.parent.hasItemTransition || actionClass === null;
        // if there is a transition and an action class then apply it immediately
        if (!immediate && actionClass !== null) {
          _t.disable(self.$el, function ($el) {
            $el.addClass(actionClass);
          });
        }

        // toggle the active class
        const promise = _t.modify(self.$el, function ($el) {
          $el.toggleClass(self.cls.active, state);
        }, immediate, self.parent.opt.transitionTimeout);

        // if there was an action class applied then remove it once the item is active
        if (!immediate && actionClass !== null) {
          function removeActionClass() {
            _t.disable(self.$el, function ($el) {
              $el.removeClass(actionClass);
            });
          }
          promise.then(removeActionClass, removeActionClass);
        }
        return promise;
      }).then(function () {
        if (self.parent.isOpen) {
          self.setTimeout(self.opt.duration);
        }
        self.afterActive(state);
      });
    },
    beforeActive: function (state) {},
    afterActive: function (state) {},
    onTimeout: function () {
      const self = this;
      self.parent.perform(self.opt.timeoutAction, self.opt.timeoutActionImmediate);
    },
    clearTimeout: function () {
      const self = this;
      if (self.timeoutHandle !== null) {
        clearTimeout(self.timeoutHandle);
        self.timeoutHandle = null;
      }
      self.$timeout.remove().css('animation-duration', '');
    },
    setTimeout: function (duration) {
      duration = _is.number(duration) ? duration : 0;
      const self = this;
      self.clearTimeout();
      self.opt.duration = duration;
      if (self.isActive && self.opt.duration > 0) {
        self.$timeout.css('animation-duration', self.opt.duration + 'ms');
        self.parent.$content.append(self.$timeout);
        self.timeoutHandle = setTimeout(function () {
          self.timeoutHandle = null;
          self.$timeout.remove().css('animation-duration', '');
          self.onTimeout();
        }, self.opt.duration);
      }
    },
    resetTimeout: function () {
      const self = this;
      self.setTimeout(self.opt.duration);
    },
    update: function () {
      const self = this;
      let updated = false;
      _t.disable(self.$inner, function ($el) {
        const el = $el.get(0);
        let height = el.scrollHeight;
        if (height > 0) {
          // ensure an even number to avoid sub-pixel rendering issues
          if (height % 2 === 1) {
            height++;
          }
          if (self.lastContentHeight !== height) {
            self.lastContentHeight = height;
            updated = true;
          }
        }
      });
      return updated;
    },
    toggled: function (state) {
      const self = this;
      if (state) {
        self.setTimeout(self.opt.duration);
      } else {
        self.clearTimeout();
      }
    }
  });
  _.items.register("item", _.Item, ".fbr-item", {
    options: {
      duration: 0,
      timeoutAction: 'next',
      timeoutActionImmediate: false
    },
    classes: {
      inner: "fbr-item-inner",
      timeout: 'fbr-item-timeout',
      active: "fbr-active",
      prev: "fbr-item-prev",
      next: "fbr-item-next",
      message: "fbr-message",
      buttons: "fbr-buttons",
      button: "fbr-button",
      input: "fbr-input",
      hidden: "fbr-hidden",
      icon: "fbr-icon",
      progress: {
        el: "fbr-progress-bar",
        fill: "fbr-progress-bar-fill",
        text: "fbr-progress-bar-text"
      }
    },
    i18n: {
      activeInvalidArg: "The first argument supplied to the 'active' method must be a boolean."
    },
    capabilities: []
  }, -1);
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.fn, FooBar.utils.transition);
"use strict";

(function ($, _, _utils, _is, _fn, _obj) {
  /**
   * @summary The default instance of the FooBar plugin.
   * @memberof FooBar.
   * @name plugin
   * @type {FooBar.Plugin}
   */
  _.plugin = new _.Plugin(document.documentElement, {
    options: {
      zIndex: 99998
    },
    classes: {
      pushTransition: "foobar-push-transition"
    },
    defaults: {}
  });

  // expose certain methods directly from the FooBar.plugin instance
  _fn.expose(_.plugin, _, ["on", "off", "trigger", "destroy", "configure", "forget"]);
  /**
   * @summary Add an event listener to the core plugin.
   * @memberof FooBar.
   * @function on
   * @see FooBar.utils.Component#on
   */
  /**
   * @summary Remove an event listener from the core plugin.
   * @memberof FooBar.
   * @function off
   * @see FooBar.utils.Component#off
   */
  /**
   * @summary Trigger an event on the core plugin.
   * @memberof FooBar.
   * @function trigger
   * @see FooBar.utils.Component#trigger
   */
  /**
   * @summary Destroy the plugin.
   * @memberof FooBar.
   * @function destroy
   * @see FooBar.utils.Component#destroy
   */
  /**
   * @summary Configure the plugin.
   * @memberof FooBar.
   * @function configure
   * @see FooBar.utils.Component#configure
   */
  /**
   * @summary Forget the remembered state of a single specific bar or all bars in the page.
   * @memberof FooBar.
   * @function forget
   * @see FooBar.Plugin#forget
   */

  // Create the documented public API for the plugin

  /**
   * @summary Create a new bar for the provided element `id`.
   * @memberof FooBar.
   * @function create
   * @param {string} id - The id of the element to create a bar for.
   * @returns {?FooBar.Bar} Returns a new bar if it was created. Otherwise, `null` is returned.
   */
  _.create = function (id) {
    if (_is.string(id)) {
      const $target = _.plugin.$el.find("#" + id);
      if ($target.length > 0) {
        return /** @type {?FooBar.Bar} */_.plugin.createChild($target);
      }
    }
    return null;
  };

  /**
   * @summary Create all bars found in the document.
   * @memberof FooBar.
   * @function createAll
   * @returns {FooBar.Bar[]}
   */
  _.createAll = function () {
    return /** @type {FooBar.Bar[]} */_.plugin.createChildren();
  };

  /**
   * @summary Get an initialized bar using the provided id.
   * @memberof FooBar.
   * @function get
   * @param {string} id - The id of the bar to get.
   * @returns {(FooBar.Bar|undefined)} Returns the bar component matching the provided `id` otherwise, `undefined` is returned.
   */
  _.get = function (id) {
    if (!_is.string(id)) return;
    return /** @type {(FooBar.Bar|undefined)} */_.plugin.findChild(function (bar) {
      return bar.el.id === id;
    });
  };

  /**
   * @summary Get all initialized bars.
   * @memberof FooBar.
   * @function getAll
   * @returns {FooBar.Bar[]}
   */
  _.getAll = function () {
    return /** @type {FooBar.Bar[]} */_.plugin.children.slice();
  };

  /**
   * @summary Destroy all initialized bars.
   * @memberof FooBar.
   * @function destroyAll
   */
  _.destroyAll = function () {
    _.getAll().forEach(function (bar) {
      bar.destroy();
    });
  };

  /**
   * @summary Dismisses all initialized bars.
   * @memberof FooBar.
   * @function dismissAll
   * @param {boolean} [immediate=false] - Whether or not to remove the bars immediately or allow them to transition out.
   */
  _.dismissAll = function (immediate) {
    _.getAll().forEach(function (bar) {
      bar.dismiss(immediate);
    });
  };

  /**
   * @summary Lays out all initialized bars.
   * @memberof FooBar.
   * @function layout
   * @param {boolean} [immediate=false] - Whether or not to layout the bars immediately or allow them to transition.
   */
  _.layout = function (immediate) {
    _.getAll().forEach(function (bar) {
      bar.performLayout(false);
    });
    return _.plugin.position(immediate);
  };
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.fn, FooBar.utils.obj);
"use strict";

(function ($, _, _utils, _is, _fn, _obj) {
  _utils.ready(function () {
    _.icons.init();
    _.plugin.configure(window.FOOBAR);
    _.plugin.init().then(function () {
      _.plugin.trigger("ready");
    });
  });
})(FooBar.$, FooBar, FooBar.utils, FooBar.utils.is, FooBar.utils.fn, FooBar.utils.obj);