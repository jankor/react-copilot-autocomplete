var ue = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Hr = { exports: {} }, Ze = {}, Gr = { exports: {} }, S = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bt;
function Qt() {
  if (bt)
    return S;
  bt = 1;
  var R = Symbol.for("react.element"), n = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), h = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), J = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), F = Symbol.iterator;
  function I(a) {
    return a === null || typeof a != "object" ? null : (a = F && a[F] || a["@@iterator"], typeof a == "function" ? a : null);
  }
  var X = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Q = Object.assign, be = {};
  function le(a, d, C) {
    this.props = a, this.context = d, this.refs = be, this.updater = C || X;
  }
  le.prototype.isReactComponent = {}, le.prototype.setState = function(a, d) {
    if (typeof a != "object" && typeof a != "function" && a != null)
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, a, d, "setState");
  }, le.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
  };
  function de() {
  }
  de.prototype = le.prototype;
  function U(a, d, C) {
    this.props = a, this.context = d, this.refs = be, this.updater = C || X;
  }
  var ye = U.prototype = new de();
  ye.constructor = U, Q(ye, le.prototype), ye.isPureReactComponent = !0;
  var ve = Array.isArray, H = Object.prototype.hasOwnProperty, re = { current: null }, pe = { key: !0, ref: !0, __self: !0, __source: !0 };
  function A(a, d, C) {
    var T, k = {}, N = null, W = null;
    if (d != null)
      for (T in d.ref !== void 0 && (W = d.ref), d.key !== void 0 && (N = "" + d.key), d)
        H.call(d, T) && !pe.hasOwnProperty(T) && (k[T] = d[T]);
    var L = arguments.length - 2;
    if (L === 1)
      k.children = C;
    else if (1 < L) {
      for (var $ = Array(L), Z = 0; Z < L; Z++)
        $[Z] = arguments[Z + 2];
      k.children = $;
    }
    if (a && a.defaultProps)
      for (T in L = a.defaultProps, L)
        k[T] === void 0 && (k[T] = L[T]);
    return { $$typeof: R, type: a, key: N, ref: W, props: k, _owner: re.current };
  }
  function se(a, d) {
    return { $$typeof: R, type: a.type, key: d, ref: a.ref, props: a.props, _owner: a._owner };
  }
  function Ee(a) {
    return typeof a == "object" && a !== null && a.$$typeof === R;
  }
  function Ce(a) {
    var d = { "=": "=0", ":": "=2" };
    return "$" + a.replace(/[=:]/g, function(C) {
      return d[C];
    });
  }
  var ce = /\/+/g;
  function te(a, d) {
    return typeof a == "object" && a !== null && a.key != null ? Ce("" + a.key) : d.toString(36);
  }
  function ne(a, d, C, T, k) {
    var N = typeof a;
    (N === "undefined" || N === "boolean") && (a = null);
    var W = !1;
    if (a === null)
      W = !0;
    else
      switch (N) {
        case "string":
        case "number":
          W = !0;
          break;
        case "object":
          switch (a.$$typeof) {
            case R:
            case n:
              W = !0;
          }
      }
    if (W)
      return W = a, k = k(W), a = T === "" ? "." + te(W, 0) : T, ve(k) ? (C = "", a != null && (C = a.replace(ce, "$&/") + "/"), ne(k, d, C, "", function(Z) {
        return Z;
      })) : k != null && (Ee(k) && (k = se(k, C + (!k.key || W && W.key === k.key ? "" : ("" + k.key).replace(ce, "$&/") + "/") + a)), d.push(k)), 1;
    if (W = 0, T = T === "" ? "." : T + ":", ve(a))
      for (var L = 0; L < a.length; L++) {
        N = a[L];
        var $ = T + te(N, L);
        W += ne(N, d, C, $, k);
      }
    else if ($ = I(a), typeof $ == "function")
      for (a = $.call(a), L = 0; !(N = a.next()).done; )
        N = N.value, $ = T + te(N, L++), W += ne(N, d, C, $, k);
    else if (N === "object")
      throw d = String(a), Error("Objects are not valid as a React child (found: " + (d === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : d) + "). If you meant to render a collection of children, use an array instead.");
    return W;
  }
  function z(a, d, C) {
    if (a == null)
      return a;
    var T = [], k = 0;
    return ne(a, T, "", "", function(N) {
      return d.call(C, N, k++);
    }), T;
  }
  function he(a) {
    if (a._status === -1) {
      var d = a._result;
      d = d(), d.then(function(C) {
        (a._status === 0 || a._status === -1) && (a._status = 1, a._result = C);
      }, function(C) {
        (a._status === 0 || a._status === -1) && (a._status = 2, a._result = C);
      }), a._status === -1 && (a._status = 0, a._result = d);
    }
    if (a._status === 1)
      return a._result.default;
    throw a._result;
  }
  var _ = { current: null }, ge = { transition: null }, xe = { ReactCurrentDispatcher: _, ReactCurrentBatchConfig: ge, ReactCurrentOwner: re };
  function Re() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return S.Children = { map: z, forEach: function(a, d, C) {
    z(a, function() {
      d.apply(this, arguments);
    }, C);
  }, count: function(a) {
    var d = 0;
    return z(a, function() {
      d++;
    }), d;
  }, toArray: function(a) {
    return z(a, function(d) {
      return d;
    }) || [];
  }, only: function(a) {
    if (!Ee(a))
      throw Error("React.Children.only expected to receive a single React element child.");
    return a;
  } }, S.Component = le, S.Fragment = f, S.Profiler = s, S.PureComponent = U, S.StrictMode = u, S.Suspense = D, S.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = xe, S.act = Re, S.cloneElement = function(a, d, C) {
    if (a == null)
      throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
    var T = Q({}, a.props), k = a.key, N = a.ref, W = a._owner;
    if (d != null) {
      if (d.ref !== void 0 && (N = d.ref, W = re.current), d.key !== void 0 && (k = "" + d.key), a.type && a.type.defaultProps)
        var L = a.type.defaultProps;
      for ($ in d)
        H.call(d, $) && !pe.hasOwnProperty($) && (T[$] = d[$] === void 0 && L !== void 0 ? L[$] : d[$]);
    }
    var $ = arguments.length - 2;
    if ($ === 1)
      T.children = C;
    else if (1 < $) {
      L = Array($);
      for (var Z = 0; Z < $; Z++)
        L[Z] = arguments[Z + 2];
      T.children = L;
    }
    return { $$typeof: R, type: a.type, key: k, ref: N, props: T, _owner: W };
  }, S.createContext = function(a) {
    return a = { $$typeof: h, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, a.Provider = { $$typeof: l, _context: a }, a.Consumer = a;
  }, S.createElement = A, S.createFactory = function(a) {
    var d = A.bind(null, a);
    return d.type = a, d;
  }, S.createRef = function() {
    return { current: null };
  }, S.forwardRef = function(a) {
    return { $$typeof: g, render: a };
  }, S.isValidElement = Ee, S.lazy = function(a) {
    return { $$typeof: P, _payload: { _status: -1, _result: a }, _init: he };
  }, S.memo = function(a, d) {
    return { $$typeof: J, type: a, compare: d === void 0 ? null : d };
  }, S.startTransition = function(a) {
    var d = ge.transition;
    ge.transition = {};
    try {
      a();
    } finally {
      ge.transition = d;
    }
  }, S.unstable_act = Re, S.useCallback = function(a, d) {
    return _.current.useCallback(a, d);
  }, S.useContext = function(a) {
    return _.current.useContext(a);
  }, S.useDebugValue = function() {
  }, S.useDeferredValue = function(a) {
    return _.current.useDeferredValue(a);
  }, S.useEffect = function(a, d) {
    return _.current.useEffect(a, d);
  }, S.useId = function() {
    return _.current.useId();
  }, S.useImperativeHandle = function(a, d, C) {
    return _.current.useImperativeHandle(a, d, C);
  }, S.useInsertionEffect = function(a, d) {
    return _.current.useInsertionEffect(a, d);
  }, S.useLayoutEffect = function(a, d) {
    return _.current.useLayoutEffect(a, d);
  }, S.useMemo = function(a, d) {
    return _.current.useMemo(a, d);
  }, S.useReducer = function(a, d, C) {
    return _.current.useReducer(a, d, C);
  }, S.useRef = function(a) {
    return _.current.useRef(a);
  }, S.useState = function(a) {
    return _.current.useState(a);
  }, S.useSyncExternalStore = function(a, d, C) {
    return _.current.useSyncExternalStore(a, d, C);
  }, S.useTransition = function() {
    return _.current.useTransition();
  }, S.version = "18.3.1", S;
}
var rr = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
rr.exports;
var Et;
function Zt() {
  return Et || (Et = 1, function(R, n) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var f = "18.3.1", u = Symbol.for("react.element"), s = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), h = Symbol.for("react.strict_mode"), g = Symbol.for("react.profiler"), D = Symbol.for("react.provider"), J = Symbol.for("react.context"), P = Symbol.for("react.forward_ref"), F = Symbol.for("react.suspense"), I = Symbol.for("react.suspense_list"), X = Symbol.for("react.memo"), Q = Symbol.for("react.lazy"), be = Symbol.for("react.offscreen"), le = Symbol.iterator, de = "@@iterator";
      function U(e) {
        if (e === null || typeof e != "object")
          return null;
        var r = le && e[le] || e[de];
        return typeof r == "function" ? r : null;
      }
      var ye = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, ve = {
        transition: null
      }, H = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, re = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, pe = {}, A = null;
      function se(e) {
        A = e;
      }
      pe.setExtraStackFrame = function(e) {
        A = e;
      }, pe.getCurrentStack = null, pe.getStackAddendum = function() {
        var e = "";
        A && (e += A);
        var r = pe.getCurrentStack;
        return r && (e += r() || ""), e;
      };
      var Ee = !1, Ce = !1, ce = !1, te = !1, ne = !1, z = {
        ReactCurrentDispatcher: ye,
        ReactCurrentBatchConfig: ve,
        ReactCurrentOwner: re
      };
      z.ReactDebugCurrentFrame = pe, z.ReactCurrentActQueue = H;
      function he(e) {
        {
          for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
            o[i - 1] = arguments[i];
          ge("warn", e, o);
        }
      }
      function _(e) {
        {
          for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
            o[i - 1] = arguments[i];
          ge("error", e, o);
        }
      }
      function ge(e, r, o) {
        {
          var i = z.ReactDebugCurrentFrame, p = i.getStackAddendum();
          p !== "" && (r += "%s", o = o.concat([p]));
          var m = o.map(function(y) {
            return String(y);
          });
          m.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, m);
        }
      }
      var xe = {};
      function Re(e, r) {
        {
          var o = e.constructor, i = o && (o.displayName || o.name) || "ReactClass", p = i + "." + r;
          if (xe[p])
            return;
          _("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", r, i), xe[p] = !0;
        }
      }
      var a = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(e) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(e, r, o) {
          Re(e, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(e, r, o, i) {
          Re(e, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(e, r, o, i) {
          Re(e, "setState");
        }
      }, d = Object.assign, C = {};
      Object.freeze(C);
      function T(e, r, o) {
        this.props = e, this.context = r, this.refs = C, this.updater = o || a;
      }
      T.prototype.isReactComponent = {}, T.prototype.setState = function(e, r) {
        if (typeof e != "object" && typeof e != "function" && e != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e, r, "setState");
      }, T.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      };
      {
        var k = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, N = function(e, r) {
          Object.defineProperty(T.prototype, e, {
            get: function() {
              he("%s(...) is deprecated in plain JavaScript React classes. %s", r[0], r[1]);
            }
          });
        };
        for (var W in k)
          k.hasOwnProperty(W) && N(W, k[W]);
      }
      function L() {
      }
      L.prototype = T.prototype;
      function $(e, r, o) {
        this.props = e, this.context = r, this.refs = C, this.updater = o || a;
      }
      var Z = $.prototype = new L();
      Z.constructor = $, d(Z, T.prototype), Z.isPureReactComponent = !0;
      function Sr() {
        var e = {
          current: null
        };
        return Object.seal(e), e;
      }
      var nr = Array.isArray;
      function We(e) {
        return nr(e);
      }
      function Cr(e) {
        {
          var r = typeof Symbol == "function" && Symbol.toStringTag, o = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
          return o;
        }
      }
      function Ve(e) {
        try {
          return Oe(e), !1;
        } catch {
          return !0;
        }
      }
      function Oe(e) {
        return "" + e;
      }
      function Ae(e) {
        if (Ve(e))
          return _("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Cr(e)), Oe(e);
      }
      function ar(e, r, o) {
        var i = e.displayName;
        if (i)
          return i;
        var p = r.displayName || r.name || "";
        return p !== "" ? o + "(" + p + ")" : o;
      }
      function De(e) {
        return e.displayName || "Context";
      }
      function _e(e) {
        if (e == null)
          return null;
        if (typeof e.tag == "number" && _("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
          return e.displayName || e.name || null;
        if (typeof e == "string")
          return e;
        switch (e) {
          case l:
            return "Fragment";
          case s:
            return "Portal";
          case g:
            return "Profiler";
          case h:
            return "StrictMode";
          case F:
            return "Suspense";
          case I:
            return "SuspenseList";
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case J:
              var r = e;
              return De(r) + ".Consumer";
            case D:
              var o = e;
              return De(o._context) + ".Provider";
            case P:
              return ar(e, e.render, "ForwardRef");
            case X:
              var i = e.displayName || null;
              return i !== null ? i : _e(e.type) || "Memo";
            case Q: {
              var p = e, m = p._payload, y = p._init;
              try {
                return _e(y(m));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Ie = Object.prototype.hasOwnProperty, Ne = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, or, ir, Ue;
      Ue = {};
      function He(e) {
        if (Ie.call(e, "ref")) {
          var r = Object.getOwnPropertyDescriptor(e, "ref").get;
          if (r && r.isReactWarning)
            return !1;
        }
        return e.ref !== void 0;
      }
      function Te(e) {
        if (Ie.call(e, "key")) {
          var r = Object.getOwnPropertyDescriptor(e, "key").get;
          if (r && r.isReactWarning)
            return !1;
        }
        return e.key !== void 0;
      }
      function Or(e, r) {
        var o = function() {
          or || (or = !0, _("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        o.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: o,
          configurable: !0
        });
      }
      function ur(e, r) {
        var o = function() {
          ir || (ir = !0, _("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        o.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: o,
          configurable: !0
        });
      }
      function sr(e) {
        if (typeof e.ref == "string" && re.current && e.__self && re.current.stateNode !== e.__self) {
          var r = _e(re.current.type);
          Ue[r] || (_('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, e.ref), Ue[r] = !0);
        }
      }
      var Fe = function(e, r, o, i, p, m, y) {
        var E = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: u,
          // Built-in properties that belong on the element
          type: e,
          key: r,
          ref: o,
          props: y,
          // Record the component responsible for creating this element.
          _owner: m
        };
        return E._store = {}, Object.defineProperty(E._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(E, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: i
        }), Object.defineProperty(E, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: p
        }), Object.freeze && (Object.freeze(E.props), Object.freeze(E)), E;
      };
      function Tr(e, r, o) {
        var i, p = {}, m = null, y = null, E = null, j = null;
        if (r != null) {
          He(r) && (y = r.ref, sr(r)), Te(r) && (Ae(r.key), m = "" + r.key), E = r.__self === void 0 ? null : r.__self, j = r.__source === void 0 ? null : r.__source;
          for (i in r)
            Ie.call(r, i) && !Ne.hasOwnProperty(i) && (p[i] = r[i]);
        }
        var V = arguments.length - 2;
        if (V === 1)
          p.children = o;
        else if (V > 1) {
          for (var Y = Array(V), B = 0; B < V; B++)
            Y[B] = arguments[B + 2];
          Object.freeze && Object.freeze(Y), p.children = Y;
        }
        if (e && e.defaultProps) {
          var q = e.defaultProps;
          for (i in q)
            p[i] === void 0 && (p[i] = q[i]);
        }
        if (m || y) {
          var ee = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          m && Or(p, ee), y && ur(p, ee);
        }
        return Fe(e, m, y, E, j, re.current, p);
      }
      function Pr(e, r) {
        var o = Fe(e.type, r, e.ref, e._self, e._source, e._owner, e.props);
        return o;
      }
      function jr(e, r, o) {
        if (e == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
        var i, p = d({}, e.props), m = e.key, y = e.ref, E = e._self, j = e._source, V = e._owner;
        if (r != null) {
          He(r) && (y = r.ref, V = re.current), Te(r) && (Ae(r.key), m = "" + r.key);
          var Y;
          e.type && e.type.defaultProps && (Y = e.type.defaultProps);
          for (i in r)
            Ie.call(r, i) && !Ne.hasOwnProperty(i) && (r[i] === void 0 && Y !== void 0 ? p[i] = Y[i] : p[i] = r[i]);
        }
        var B = arguments.length - 2;
        if (B === 1)
          p.children = o;
        else if (B > 1) {
          for (var q = Array(B), ee = 0; ee < B; ee++)
            q[ee] = arguments[ee + 2];
          p.children = q;
        }
        return Fe(e.type, m, y, E, j, V, p);
      }
      function Pe(e) {
        return typeof e == "object" && e !== null && e.$$typeof === u;
      }
      var cr = ".", kr = ":";
      function xr(e) {
        var r = /[=:]/g, o = {
          "=": "=0",
          ":": "=2"
        }, i = e.replace(r, function(p) {
          return o[p];
        });
        return "$" + i;
      }
      var Ye = !1, fr = /\/+/g;
      function we(e) {
        return e.replace(fr, "$&/");
      }
      function $e(e, r) {
        return typeof e == "object" && e !== null && e.key != null ? (Ae(e.key), xr("" + e.key)) : r.toString(36);
      }
      function je(e, r, o, i, p) {
        var m = typeof e;
        (m === "undefined" || m === "boolean") && (e = null);
        var y = !1;
        if (e === null)
          y = !0;
        else
          switch (m) {
            case "string":
            case "number":
              y = !0;
              break;
            case "object":
              switch (e.$$typeof) {
                case u:
                case s:
                  y = !0;
              }
          }
        if (y) {
          var E = e, j = p(E), V = i === "" ? cr + $e(E, 0) : i;
          if (We(j)) {
            var Y = "";
            V != null && (Y = we(V) + "/"), je(j, r, Y, "", function(Xt) {
              return Xt;
            });
          } else
            j != null && (Pe(j) && (j.key && (!E || E.key !== j.key) && Ae(j.key), j = Pr(
              j,
              // Keep both the (mapped) and old keys if they differ, just as
              // traverseAllChildren used to do for objects as children
              o + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
              (j.key && (!E || E.key !== j.key) ? (
                // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                // eslint-disable-next-line react-internal/safe-string-coercion
                we("" + j.key) + "/"
              ) : "") + V
            )), r.push(j));
          return 1;
        }
        var B, q, ee = 0, oe = i === "" ? cr : i + kr;
        if (We(e))
          for (var Rr = 0; Rr < e.length; Rr++)
            B = e[Rr], q = oe + $e(B, Rr), ee += je(B, r, o, q, p);
        else {
          var Kr = U(e);
          if (typeof Kr == "function") {
            var gt = e;
            Kr === gt.entries && (Ye || he("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Ye = !0);
            for (var Gt = Kr.call(gt), _t, Jt = 0; !(_t = Gt.next()).done; )
              B = _t.value, q = oe + $e(B, Jt++), ee += je(B, r, o, q, p);
          } else if (m === "object") {
            var mt = String(e);
            throw new Error("Objects are not valid as a React child (found: " + (mt === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : mt) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return ee;
      }
      function Me(e, r, o) {
        if (e == null)
          return e;
        var i = [], p = 0;
        return je(e, i, "", "", function(m) {
          return r.call(o, m, p++);
        }), i;
      }
      function Ar(e) {
        var r = 0;
        return Me(e, function() {
          r++;
        }), r;
      }
      function lr(e, r, o) {
        Me(e, function() {
          r.apply(this, arguments);
        }, o);
      }
      function Dr(e) {
        return Me(e, function(r) {
          return r;
        }) || [];
      }
      function dr(e) {
        if (!Pe(e))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return e;
      }
      function vr(e) {
        var r = {
          $$typeof: J,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: e,
          _currentValue2: e,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        r.Provider = {
          $$typeof: D,
          _context: r
        };
        var o = !1, i = !1, p = !1;
        {
          var m = {
            $$typeof: J,
            _context: r
          };
          Object.defineProperties(m, {
            Provider: {
              get: function() {
                return i || (i = !0, _("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), r.Provider;
              },
              set: function(y) {
                r.Provider = y;
              }
            },
            _currentValue: {
              get: function() {
                return r._currentValue;
              },
              set: function(y) {
                r._currentValue = y;
              }
            },
            _currentValue2: {
              get: function() {
                return r._currentValue2;
              },
              set: function(y) {
                r._currentValue2 = y;
              }
            },
            _threadCount: {
              get: function() {
                return r._threadCount;
              },
              set: function(y) {
                r._threadCount = y;
              }
            },
            Consumer: {
              get: function() {
                return o || (o = !0, _("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), r.Consumer;
              }
            },
            displayName: {
              get: function() {
                return r.displayName;
              },
              set: function(y) {
                p || (he("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", y), p = !0);
              }
            }
          }), r.Consumer = m;
        }
        return r._currentRenderer = null, r._currentRenderer2 = null, r;
      }
      var Le = -1, Ge = 0, Je = 1, pr = 2;
      function Ir(e) {
        if (e._status === Le) {
          var r = e._result, o = r();
          if (o.then(function(m) {
            if (e._status === Ge || e._status === Le) {
              var y = e;
              y._status = Je, y._result = m;
            }
          }, function(m) {
            if (e._status === Ge || e._status === Le) {
              var y = e;
              y._status = pr, y._result = m;
            }
          }), e._status === Le) {
            var i = e;
            i._status = Ge, i._result = o;
          }
        }
        if (e._status === Je) {
          var p = e._result;
          return p === void 0 && _(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, p), "default" in p || _(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, p), p.default;
        } else
          throw e._result;
      }
      function Fr(e) {
        var r = {
          // We use these fields to store the result.
          _status: Le,
          _result: e
        }, o = {
          $$typeof: Q,
          _payload: r,
          _init: Ir
        };
        {
          var i, p;
          Object.defineProperties(o, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return i;
              },
              set: function(m) {
                _("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), i = m, Object.defineProperty(o, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return p;
              },
              set: function(m) {
                _("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), p = m, Object.defineProperty(o, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return o;
      }
      function $r(e) {
        e != null && e.$$typeof === X ? _("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e != "function" ? _("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e) : e.length !== 0 && e.length !== 2 && _("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), e != null && (e.defaultProps != null || e.propTypes != null) && _("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var r = {
          $$typeof: P,
          render: e
        };
        {
          var o;
          Object.defineProperty(r, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return o;
            },
            set: function(i) {
              o = i, !e.name && !e.displayName && (e.displayName = i);
            }
          });
        }
        return r;
      }
      var hr;
      hr = Symbol.for("react.module.reference");
      function t(e) {
        return !!(typeof e == "string" || typeof e == "function" || e === l || e === g || ne || e === h || e === F || e === I || te || e === be || Ee || Ce || ce || typeof e == "object" && e !== null && (e.$$typeof === Q || e.$$typeof === X || e.$$typeof === D || e.$$typeof === J || e.$$typeof === P || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        e.$$typeof === hr || e.getModuleId !== void 0));
      }
      function c(e, r) {
        t(e) || _("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e);
        var o = {
          $$typeof: X,
          type: e,
          compare: r === void 0 ? null : r
        };
        {
          var i;
          Object.defineProperty(o, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return i;
            },
            set: function(p) {
              i = p, !e.name && !e.displayName && (e.displayName = p);
            }
          });
        }
        return o;
      }
      function v() {
        var e = ye.current;
        return e === null && _(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), e;
      }
      function b(e) {
        var r = v();
        if (e._context !== void 0) {
          var o = e._context;
          o.Consumer === e ? _("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : o.Provider === e && _("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return r.useContext(e);
      }
      function x(e) {
        var r = v();
        return r.useState(e);
      }
      function M(e, r, o) {
        var i = v();
        return i.useReducer(e, r, o);
      }
      function O(e) {
        var r = v();
        return r.useRef(e);
      }
      function w(e, r) {
        var o = v();
        return o.useEffect(e, r);
      }
      function ae(e, r) {
        var o = v();
        return o.useInsertionEffect(e, r);
      }
      function K(e, r) {
        var o = v();
        return o.useLayoutEffect(e, r);
      }
      function G(e, r) {
        var o = v();
        return o.useCallback(e, r);
      }
      function fe(e, r) {
        var o = v();
        return o.useMemo(e, r);
      }
      function ke(e, r, o) {
        var i = v();
        return i.useImperativeHandle(e, r, o);
      }
      function Se(e, r) {
        {
          var o = v();
          return o.useDebugValue(e, r);
        }
      }
      function ie() {
        var e = v();
        return e.useTransition();
      }
      function Xe(e) {
        var r = v();
        return r.useDeferredValue(e);
      }
      function Mr() {
        var e = v();
        return e.useId();
      }
      function Lr(e, r, o) {
        var i = v();
        return i.useSyncExternalStore(e, r, o);
      }
      var Qe = 0, Jr, Xr, Qr, Zr, et, rt, tt;
      function nt() {
      }
      nt.__reactDisabledLog = !0;
      function xt() {
        {
          if (Qe === 0) {
            Jr = console.log, Xr = console.info, Qr = console.warn, Zr = console.error, et = console.group, rt = console.groupCollapsed, tt = console.groupEnd;
            var e = {
              configurable: !0,
              enumerable: !0,
              value: nt,
              writable: !0
            };
            Object.defineProperties(console, {
              info: e,
              log: e,
              warn: e,
              error: e,
              group: e,
              groupCollapsed: e,
              groupEnd: e
            });
          }
          Qe++;
        }
      }
      function At() {
        {
          if (Qe--, Qe === 0) {
            var e = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: d({}, e, {
                value: Jr
              }),
              info: d({}, e, {
                value: Xr
              }),
              warn: d({}, e, {
                value: Qr
              }),
              error: d({}, e, {
                value: Zr
              }),
              group: d({}, e, {
                value: et
              }),
              groupCollapsed: d({}, e, {
                value: rt
              }),
              groupEnd: d({}, e, {
                value: tt
              })
            });
          }
          Qe < 0 && _("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Wr = z.ReactCurrentDispatcher, Vr;
      function yr(e, r, o) {
        {
          if (Vr === void 0)
            try {
              throw Error();
            } catch (p) {
              var i = p.stack.trim().match(/\n( *(at )?)/);
              Vr = i && i[1] || "";
            }
          return `
` + Vr + e;
        }
      }
      var Nr = !1, gr;
      {
        var Dt = typeof WeakMap == "function" ? WeakMap : Map;
        gr = new Dt();
      }
      function at(e, r) {
        if (!e || Nr)
          return "";
        {
          var o = gr.get(e);
          if (o !== void 0)
            return o;
        }
        var i;
        Nr = !0;
        var p = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var m;
        m = Wr.current, Wr.current = null, xt();
        try {
          if (r) {
            var y = function() {
              throw Error();
            };
            if (Object.defineProperty(y.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(y, []);
              } catch (oe) {
                i = oe;
              }
              Reflect.construct(e, [], y);
            } else {
              try {
                y.call();
              } catch (oe) {
                i = oe;
              }
              e.call(y.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (oe) {
              i = oe;
            }
            e();
          }
        } catch (oe) {
          if (oe && i && typeof oe.stack == "string") {
            for (var E = oe.stack.split(`
`), j = i.stack.split(`
`), V = E.length - 1, Y = j.length - 1; V >= 1 && Y >= 0 && E[V] !== j[Y]; )
              Y--;
            for (; V >= 1 && Y >= 0; V--, Y--)
              if (E[V] !== j[Y]) {
                if (V !== 1 || Y !== 1)
                  do
                    if (V--, Y--, Y < 0 || E[V] !== j[Y]) {
                      var B = `
` + E[V].replace(" at new ", " at ");
                      return e.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", e.displayName)), typeof e == "function" && gr.set(e, B), B;
                    }
                  while (V >= 1 && Y >= 0);
                break;
              }
          }
        } finally {
          Nr = !1, Wr.current = m, At(), Error.prepareStackTrace = p;
        }
        var q = e ? e.displayName || e.name : "", ee = q ? yr(q) : "";
        return typeof e == "function" && gr.set(e, ee), ee;
      }
      function It(e, r, o) {
        return at(e, !1);
      }
      function Ft(e) {
        var r = e.prototype;
        return !!(r && r.isReactComponent);
      }
      function _r(e, r, o) {
        if (e == null)
          return "";
        if (typeof e == "function")
          return at(e, Ft(e));
        if (typeof e == "string")
          return yr(e);
        switch (e) {
          case F:
            return yr("Suspense");
          case I:
            return yr("SuspenseList");
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case P:
              return It(e.render);
            case X:
              return _r(e.type, r, o);
            case Q: {
              var i = e, p = i._payload, m = i._init;
              try {
                return _r(m(p), r, o);
              } catch {
              }
            }
          }
        return "";
      }
      var ot = {}, it = z.ReactDebugCurrentFrame;
      function mr(e) {
        if (e) {
          var r = e._owner, o = _r(e.type, e._source, r ? r.type : null);
          it.setExtraStackFrame(o);
        } else
          it.setExtraStackFrame(null);
      }
      function $t(e, r, o, i, p) {
        {
          var m = Function.call.bind(Ie);
          for (var y in e)
            if (m(e, y)) {
              var E = void 0;
              try {
                if (typeof e[y] != "function") {
                  var j = Error((i || "React class") + ": " + o + " type `" + y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[y] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw j.name = "Invariant Violation", j;
                }
                E = e[y](r, y, i, o, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (V) {
                E = V;
              }
              E && !(E instanceof Error) && (mr(p), _("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", o, y, typeof E), mr(null)), E instanceof Error && !(E.message in ot) && (ot[E.message] = !0, mr(p), _("Failed %s type: %s", o, E.message), mr(null));
            }
        }
      }
      function Be(e) {
        if (e) {
          var r = e._owner, o = _r(e.type, e._source, r ? r.type : null);
          se(o);
        } else
          se(null);
      }
      var Ur;
      Ur = !1;
      function ut() {
        if (re.current) {
          var e = _e(re.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
      function Mt(e) {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), o = e.lineNumber;
          return `

Check your code at ` + r + ":" + o + ".";
        }
        return "";
      }
      function Lt(e) {
        return e != null ? Mt(e.__source) : "";
      }
      var st = {};
      function Wt(e) {
        var r = ut();
        if (!r) {
          var o = typeof e == "string" ? e : e.displayName || e.name;
          o && (r = `

Check the top-level render call using <` + o + ">.");
        }
        return r;
      }
      function ct(e, r) {
        if (!(!e._store || e._store.validated || e.key != null)) {
          e._store.validated = !0;
          var o = Wt(r);
          if (!st[o]) {
            st[o] = !0;
            var i = "";
            e && e._owner && e._owner !== re.current && (i = " It was passed a child from " + _e(e._owner.type) + "."), Be(e), _('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', o, i), Be(null);
          }
        }
      }
      function ft(e, r) {
        if (typeof e == "object") {
          if (We(e))
            for (var o = 0; o < e.length; o++) {
              var i = e[o];
              Pe(i) && ct(i, r);
            }
          else if (Pe(e))
            e._store && (e._store.validated = !0);
          else if (e) {
            var p = U(e);
            if (typeof p == "function" && p !== e.entries)
              for (var m = p.call(e), y; !(y = m.next()).done; )
                Pe(y.value) && ct(y.value, r);
          }
        }
      }
      function lt(e) {
        {
          var r = e.type;
          if (r == null || typeof r == "string")
            return;
          var o;
          if (typeof r == "function")
            o = r.propTypes;
          else if (typeof r == "object" && (r.$$typeof === P || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          r.$$typeof === X))
            o = r.propTypes;
          else
            return;
          if (o) {
            var i = _e(r);
            $t(o, e.props, "prop", i, e);
          } else if (r.PropTypes !== void 0 && !Ur) {
            Ur = !0;
            var p = _e(r);
            _("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", p || "Unknown");
          }
          typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && _("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Vt(e) {
        {
          for (var r = Object.keys(e.props), o = 0; o < r.length; o++) {
            var i = r[o];
            if (i !== "children" && i !== "key") {
              Be(e), _("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", i), Be(null);
              break;
            }
          }
          e.ref !== null && (Be(e), _("Invalid attribute `ref` supplied to `React.Fragment`."), Be(null));
        }
      }
      function dt(e, r, o) {
        var i = t(e);
        if (!i) {
          var p = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (p += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var m = Lt(r);
          m ? p += m : p += ut();
          var y;
          e === null ? y = "null" : We(e) ? y = "array" : e !== void 0 && e.$$typeof === u ? (y = "<" + (_e(e.type) || "Unknown") + " />", p = " Did you accidentally export a JSX literal instead of a component?") : y = typeof e, _("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", y, p);
        }
        var E = Tr.apply(this, arguments);
        if (E == null)
          return E;
        if (i)
          for (var j = 2; j < arguments.length; j++)
            ft(arguments[j], e);
        return e === l ? Vt(E) : lt(E), E;
      }
      var vt = !1;
      function Nt(e) {
        var r = dt.bind(null, e);
        return r.type = e, vt || (vt = !0, he("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(r, "type", {
          enumerable: !1,
          get: function() {
            return he("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: e
            }), e;
          }
        }), r;
      }
      function Ut(e, r, o) {
        for (var i = jr.apply(this, arguments), p = 2; p < arguments.length; p++)
          ft(arguments[p], i.type);
        return lt(i), i;
      }
      function Yt(e, r) {
        var o = ve.transition;
        ve.transition = {};
        var i = ve.transition;
        ve.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          e();
        } finally {
          if (ve.transition = o, o === null && i._updatedFibers) {
            var p = i._updatedFibers.size;
            p > 10 && he("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
          }
        }
      }
      var pt = !1, br = null;
      function Bt(e) {
        if (br === null)
          try {
            var r = ("require" + Math.random()).slice(0, 7), o = R && R[r];
            br = o.call(R, "timers").setImmediate;
          } catch {
            br = function(p) {
              pt === !1 && (pt = !0, typeof MessageChannel > "u" && _("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var m = new MessageChannel();
              m.port1.onmessage = p, m.port2.postMessage(void 0);
            };
          }
        return br(e);
      }
      var ze = 0, ht = !1;
      function yt(e) {
        {
          var r = ze;
          ze++, H.current === null && (H.current = []);
          var o = H.isBatchingLegacy, i;
          try {
            if (H.isBatchingLegacy = !0, i = e(), !o && H.didScheduleLegacyUpdate) {
              var p = H.current;
              p !== null && (H.didScheduleLegacyUpdate = !1, zr(p));
            }
          } catch (q) {
            throw Er(r), q;
          } finally {
            H.isBatchingLegacy = o;
          }
          if (i !== null && typeof i == "object" && typeof i.then == "function") {
            var m = i, y = !1, E = {
              then: function(q, ee) {
                y = !0, m.then(function(oe) {
                  Er(r), ze === 0 ? Yr(oe, q, ee) : q(oe);
                }, function(oe) {
                  Er(r), ee(oe);
                });
              }
            };
            return !ht && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              y || (ht = !0, _("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), E;
          } else {
            var j = i;
            if (Er(r), ze === 0) {
              var V = H.current;
              V !== null && (zr(V), H.current = null);
              var Y = {
                then: function(q, ee) {
                  H.current === null ? (H.current = [], Yr(j, q, ee)) : q(j);
                }
              };
              return Y;
            } else {
              var B = {
                then: function(q, ee) {
                  q(j);
                }
              };
              return B;
            }
          }
        }
      }
      function Er(e) {
        e !== ze - 1 && _("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), ze = e;
      }
      function Yr(e, r, o) {
        {
          var i = H.current;
          if (i !== null)
            try {
              zr(i), Bt(function() {
                i.length === 0 ? (H.current = null, r(e)) : Yr(e, r, o);
              });
            } catch (p) {
              o(p);
            }
          else
            r(e);
        }
      }
      var Br = !1;
      function zr(e) {
        if (!Br) {
          Br = !0;
          var r = 0;
          try {
            for (; r < e.length; r++) {
              var o = e[r];
              do
                o = o(!0);
              while (o !== null);
            }
            e.length = 0;
          } catch (i) {
            throw e = e.slice(r + 1), i;
          } finally {
            Br = !1;
          }
        }
      }
      var zt = dt, Kt = Ut, qt = Nt, Ht = {
        map: Me,
        forEach: lr,
        count: Ar,
        toArray: Dr,
        only: dr
      };
      n.Children = Ht, n.Component = T, n.Fragment = l, n.Profiler = g, n.PureComponent = $, n.StrictMode = h, n.Suspense = F, n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = z, n.act = yt, n.cloneElement = Kt, n.createContext = vr, n.createElement = zt, n.createFactory = qt, n.createRef = Sr, n.forwardRef = $r, n.isValidElement = Pe, n.lazy = Fr, n.memo = c, n.startTransition = Yt, n.unstable_act = yt, n.useCallback = G, n.useContext = b, n.useDebugValue = Se, n.useDeferredValue = Xe, n.useEffect = w, n.useId = Mr, n.useImperativeHandle = ke, n.useInsertionEffect = ae, n.useLayoutEffect = K, n.useMemo = fe, n.useReducer = M, n.useRef = O, n.useState = x, n.useSyncExternalStore = Lr, n.useTransition = ie, n.version = f, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(rr, rr.exports)), rr.exports;
}
process.env.NODE_ENV === "production" ? Gr.exports = Qt() : Gr.exports = Zt();
var me = Gr.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Rt;
function en() {
  if (Rt)
    return Ze;
  Rt = 1;
  var R = me, n = Symbol.for("react.element"), f = Symbol.for("react.fragment"), u = Object.prototype.hasOwnProperty, s = R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, l = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(g, D, J) {
    var P, F = {}, I = null, X = null;
    J !== void 0 && (I = "" + J), D.key !== void 0 && (I = "" + D.key), D.ref !== void 0 && (X = D.ref);
    for (P in D)
      u.call(D, P) && !l.hasOwnProperty(P) && (F[P] = D[P]);
    if (g && g.defaultProps)
      for (P in D = g.defaultProps, D)
        F[P] === void 0 && (F[P] = D[P]);
    return { $$typeof: n, type: g, key: I, ref: X, props: F, _owner: s.current };
  }
  return Ze.Fragment = f, Ze.jsx = h, Ze.jsxs = h, Ze;
}
var er = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wt;
function rn() {
  return wt || (wt = 1, process.env.NODE_ENV !== "production" && function() {
    var R = me, n = Symbol.for("react.element"), f = Symbol.for("react.portal"), u = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), l = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), g = Symbol.for("react.context"), D = Symbol.for("react.forward_ref"), J = Symbol.for("react.suspense"), P = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), I = Symbol.for("react.lazy"), X = Symbol.for("react.offscreen"), Q = Symbol.iterator, be = "@@iterator";
    function le(t) {
      if (t === null || typeof t != "object")
        return null;
      var c = Q && t[Q] || t[be];
      return typeof c == "function" ? c : null;
    }
    var de = R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function U(t) {
      {
        for (var c = arguments.length, v = new Array(c > 1 ? c - 1 : 0), b = 1; b < c; b++)
          v[b - 1] = arguments[b];
        ye("error", t, v);
      }
    }
    function ye(t, c, v) {
      {
        var b = de.ReactDebugCurrentFrame, x = b.getStackAddendum();
        x !== "" && (c += "%s", v = v.concat([x]));
        var M = v.map(function(O) {
          return String(O);
        });
        M.unshift("Warning: " + c), Function.prototype.apply.call(console[t], console, M);
      }
    }
    var ve = !1, H = !1, re = !1, pe = !1, A = !1, se;
    se = Symbol.for("react.module.reference");
    function Ee(t) {
      return !!(typeof t == "string" || typeof t == "function" || t === u || t === l || A || t === s || t === J || t === P || pe || t === X || ve || H || re || typeof t == "object" && t !== null && (t.$$typeof === I || t.$$typeof === F || t.$$typeof === h || t.$$typeof === g || t.$$typeof === D || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      t.$$typeof === se || t.getModuleId !== void 0));
    }
    function Ce(t, c, v) {
      var b = t.displayName;
      if (b)
        return b;
      var x = c.displayName || c.name || "";
      return x !== "" ? v + "(" + x + ")" : v;
    }
    function ce(t) {
      return t.displayName || "Context";
    }
    function te(t) {
      if (t == null)
        return null;
      if (typeof t.tag == "number" && U("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
      switch (t) {
        case u:
          return "Fragment";
        case f:
          return "Portal";
        case l:
          return "Profiler";
        case s:
          return "StrictMode";
        case J:
          return "Suspense";
        case P:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case g:
            var c = t;
            return ce(c) + ".Consumer";
          case h:
            var v = t;
            return ce(v._context) + ".Provider";
          case D:
            return Ce(t, t.render, "ForwardRef");
          case F:
            var b = t.displayName || null;
            return b !== null ? b : te(t.type) || "Memo";
          case I: {
            var x = t, M = x._payload, O = x._init;
            try {
              return te(O(M));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ne = Object.assign, z = 0, he, _, ge, xe, Re, a, d;
    function C() {
    }
    C.__reactDisabledLog = !0;
    function T() {
      {
        if (z === 0) {
          he = console.log, _ = console.info, ge = console.warn, xe = console.error, Re = console.group, a = console.groupCollapsed, d = console.groupEnd;
          var t = {
            configurable: !0,
            enumerable: !0,
            value: C,
            writable: !0
          };
          Object.defineProperties(console, {
            info: t,
            log: t,
            warn: t,
            error: t,
            group: t,
            groupCollapsed: t,
            groupEnd: t
          });
        }
        z++;
      }
    }
    function k() {
      {
        if (z--, z === 0) {
          var t = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ne({}, t, {
              value: he
            }),
            info: ne({}, t, {
              value: _
            }),
            warn: ne({}, t, {
              value: ge
            }),
            error: ne({}, t, {
              value: xe
            }),
            group: ne({}, t, {
              value: Re
            }),
            groupCollapsed: ne({}, t, {
              value: a
            }),
            groupEnd: ne({}, t, {
              value: d
            })
          });
        }
        z < 0 && U("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var N = de.ReactCurrentDispatcher, W;
    function L(t, c, v) {
      {
        if (W === void 0)
          try {
            throw Error();
          } catch (x) {
            var b = x.stack.trim().match(/\n( *(at )?)/);
            W = b && b[1] || "";
          }
        return `
` + W + t;
      }
    }
    var $ = !1, Z;
    {
      var Sr = typeof WeakMap == "function" ? WeakMap : Map;
      Z = new Sr();
    }
    function nr(t, c) {
      if (!t || $)
        return "";
      {
        var v = Z.get(t);
        if (v !== void 0)
          return v;
      }
      var b;
      $ = !0;
      var x = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var M;
      M = N.current, N.current = null, T();
      try {
        if (c) {
          var O = function() {
            throw Error();
          };
          if (Object.defineProperty(O.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(O, []);
            } catch (ie) {
              b = ie;
            }
            Reflect.construct(t, [], O);
          } else {
            try {
              O.call();
            } catch (ie) {
              b = ie;
            }
            t.call(O.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ie) {
            b = ie;
          }
          t();
        }
      } catch (ie) {
        if (ie && b && typeof ie.stack == "string") {
          for (var w = ie.stack.split(`
`), ae = b.stack.split(`
`), K = w.length - 1, G = ae.length - 1; K >= 1 && G >= 0 && w[K] !== ae[G]; )
            G--;
          for (; K >= 1 && G >= 0; K--, G--)
            if (w[K] !== ae[G]) {
              if (K !== 1 || G !== 1)
                do
                  if (K--, G--, G < 0 || w[K] !== ae[G]) {
                    var fe = `
` + w[K].replace(" at new ", " at ");
                    return t.displayName && fe.includes("<anonymous>") && (fe = fe.replace("<anonymous>", t.displayName)), typeof t == "function" && Z.set(t, fe), fe;
                  }
                while (K >= 1 && G >= 0);
              break;
            }
        }
      } finally {
        $ = !1, N.current = M, k(), Error.prepareStackTrace = x;
      }
      var ke = t ? t.displayName || t.name : "", Se = ke ? L(ke) : "";
      return typeof t == "function" && Z.set(t, Se), Se;
    }
    function We(t, c, v) {
      return nr(t, !1);
    }
    function Cr(t) {
      var c = t.prototype;
      return !!(c && c.isReactComponent);
    }
    function Ve(t, c, v) {
      if (t == null)
        return "";
      if (typeof t == "function")
        return nr(t, Cr(t));
      if (typeof t == "string")
        return L(t);
      switch (t) {
        case J:
          return L("Suspense");
        case P:
          return L("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case D:
            return We(t.render);
          case F:
            return Ve(t.type, c, v);
          case I: {
            var b = t, x = b._payload, M = b._init;
            try {
              return Ve(M(x), c, v);
            } catch {
            }
          }
        }
      return "";
    }
    var Oe = Object.prototype.hasOwnProperty, Ae = {}, ar = de.ReactDebugCurrentFrame;
    function De(t) {
      if (t) {
        var c = t._owner, v = Ve(t.type, t._source, c ? c.type : null);
        ar.setExtraStackFrame(v);
      } else
        ar.setExtraStackFrame(null);
    }
    function _e(t, c, v, b, x) {
      {
        var M = Function.call.bind(Oe);
        for (var O in t)
          if (M(t, O)) {
            var w = void 0;
            try {
              if (typeof t[O] != "function") {
                var ae = Error((b || "React class") + ": " + v + " type `" + O + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof t[O] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ae.name = "Invariant Violation", ae;
              }
              w = t[O](c, O, b, v, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (K) {
              w = K;
            }
            w && !(w instanceof Error) && (De(x), U("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", b || "React class", v, O, typeof w), De(null)), w instanceof Error && !(w.message in Ae) && (Ae[w.message] = !0, De(x), U("Failed %s type: %s", v, w.message), De(null));
          }
      }
    }
    var Ie = Array.isArray;
    function Ne(t) {
      return Ie(t);
    }
    function or(t) {
      {
        var c = typeof Symbol == "function" && Symbol.toStringTag, v = c && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return v;
      }
    }
    function ir(t) {
      try {
        return Ue(t), !1;
      } catch {
        return !0;
      }
    }
    function Ue(t) {
      return "" + t;
    }
    function He(t) {
      if (ir(t))
        return U("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", or(t)), Ue(t);
    }
    var Te = de.ReactCurrentOwner, Or = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ur, sr, Fe;
    Fe = {};
    function Tr(t) {
      if (Oe.call(t, "ref")) {
        var c = Object.getOwnPropertyDescriptor(t, "ref").get;
        if (c && c.isReactWarning)
          return !1;
      }
      return t.ref !== void 0;
    }
    function Pr(t) {
      if (Oe.call(t, "key")) {
        var c = Object.getOwnPropertyDescriptor(t, "key").get;
        if (c && c.isReactWarning)
          return !1;
      }
      return t.key !== void 0;
    }
    function jr(t, c) {
      if (typeof t.ref == "string" && Te.current && c && Te.current.stateNode !== c) {
        var v = te(Te.current.type);
        Fe[v] || (U('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', te(Te.current.type), t.ref), Fe[v] = !0);
      }
    }
    function Pe(t, c) {
      {
        var v = function() {
          ur || (ur = !0, U("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", c));
        };
        v.isReactWarning = !0, Object.defineProperty(t, "key", {
          get: v,
          configurable: !0
        });
      }
    }
    function cr(t, c) {
      {
        var v = function() {
          sr || (sr = !0, U("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", c));
        };
        v.isReactWarning = !0, Object.defineProperty(t, "ref", {
          get: v,
          configurable: !0
        });
      }
    }
    var kr = function(t, c, v, b, x, M, O) {
      var w = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: t,
        key: c,
        ref: v,
        props: O,
        // Record the component responsible for creating this element.
        _owner: M
      };
      return w._store = {}, Object.defineProperty(w._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(w, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: b
      }), Object.defineProperty(w, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: x
      }), Object.freeze && (Object.freeze(w.props), Object.freeze(w)), w;
    };
    function xr(t, c, v, b, x) {
      {
        var M, O = {}, w = null, ae = null;
        v !== void 0 && (He(v), w = "" + v), Pr(c) && (He(c.key), w = "" + c.key), Tr(c) && (ae = c.ref, jr(c, x));
        for (M in c)
          Oe.call(c, M) && !Or.hasOwnProperty(M) && (O[M] = c[M]);
        if (t && t.defaultProps) {
          var K = t.defaultProps;
          for (M in K)
            O[M] === void 0 && (O[M] = K[M]);
        }
        if (w || ae) {
          var G = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
          w && Pe(O, G), ae && cr(O, G);
        }
        return kr(t, w, ae, x, b, Te.current, O);
      }
    }
    var Ye = de.ReactCurrentOwner, fr = de.ReactDebugCurrentFrame;
    function we(t) {
      if (t) {
        var c = t._owner, v = Ve(t.type, t._source, c ? c.type : null);
        fr.setExtraStackFrame(v);
      } else
        fr.setExtraStackFrame(null);
    }
    var $e;
    $e = !1;
    function je(t) {
      return typeof t == "object" && t !== null && t.$$typeof === n;
    }
    function Me() {
      {
        if (Ye.current) {
          var t = te(Ye.current.type);
          if (t)
            return `

Check the render method of \`` + t + "`.";
        }
        return "";
      }
    }
    function Ar(t) {
      return "";
    }
    var lr = {};
    function Dr(t) {
      {
        var c = Me();
        if (!c) {
          var v = typeof t == "string" ? t : t.displayName || t.name;
          v && (c = `

Check the top-level render call using <` + v + ">.");
        }
        return c;
      }
    }
    function dr(t, c) {
      {
        if (!t._store || t._store.validated || t.key != null)
          return;
        t._store.validated = !0;
        var v = Dr(c);
        if (lr[v])
          return;
        lr[v] = !0;
        var b = "";
        t && t._owner && t._owner !== Ye.current && (b = " It was passed a child from " + te(t._owner.type) + "."), we(t), U('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', v, b), we(null);
      }
    }
    function vr(t, c) {
      {
        if (typeof t != "object")
          return;
        if (Ne(t))
          for (var v = 0; v < t.length; v++) {
            var b = t[v];
            je(b) && dr(b, c);
          }
        else if (je(t))
          t._store && (t._store.validated = !0);
        else if (t) {
          var x = le(t);
          if (typeof x == "function" && x !== t.entries)
            for (var M = x.call(t), O; !(O = M.next()).done; )
              je(O.value) && dr(O.value, c);
        }
      }
    }
    function Le(t) {
      {
        var c = t.type;
        if (c == null || typeof c == "string")
          return;
        var v;
        if (typeof c == "function")
          v = c.propTypes;
        else if (typeof c == "object" && (c.$$typeof === D || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        c.$$typeof === F))
          v = c.propTypes;
        else
          return;
        if (v) {
          var b = te(c);
          _e(v, t.props, "prop", b, t);
        } else if (c.PropTypes !== void 0 && !$e) {
          $e = !0;
          var x = te(c);
          U("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", x || "Unknown");
        }
        typeof c.getDefaultProps == "function" && !c.getDefaultProps.isReactClassApproved && U("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ge(t) {
      {
        for (var c = Object.keys(t.props), v = 0; v < c.length; v++) {
          var b = c[v];
          if (b !== "children" && b !== "key") {
            we(t), U("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", b), we(null);
            break;
          }
        }
        t.ref !== null && (we(t), U("Invalid attribute `ref` supplied to `React.Fragment`."), we(null));
      }
    }
    var Je = {};
    function pr(t, c, v, b, x, M) {
      {
        var O = Ee(t);
        if (!O) {
          var w = "";
          (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (w += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ae = Ar();
          ae ? w += ae : w += Me();
          var K;
          t === null ? K = "null" : Ne(t) ? K = "array" : t !== void 0 && t.$$typeof === n ? (K = "<" + (te(t.type) || "Unknown") + " />", w = " Did you accidentally export a JSX literal instead of a component?") : K = typeof t, U("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", K, w);
        }
        var G = xr(t, c, v, x, M);
        if (G == null)
          return G;
        if (O) {
          var fe = c.children;
          if (fe !== void 0)
            if (b)
              if (Ne(fe)) {
                for (var ke = 0; ke < fe.length; ke++)
                  vr(fe[ke], t);
                Object.freeze && Object.freeze(fe);
              } else
                U("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              vr(fe, t);
        }
        if (Oe.call(c, "key")) {
          var Se = te(t), ie = Object.keys(c).filter(function(Lr) {
            return Lr !== "key";
          }), Xe = ie.length > 0 ? "{key: someKey, " + ie.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Je[Se + Xe]) {
            var Mr = ie.length > 0 ? "{" + ie.join(": ..., ") + ": ...}" : "{}";
            U(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Xe, Se, Mr, Se), Je[Se + Xe] = !0;
          }
        }
        return t === u ? Ge(G) : Le(G), G;
      }
    }
    function Ir(t, c, v) {
      return pr(t, c, v, !0);
    }
    function Fr(t, c, v) {
      return pr(t, c, v, !1);
    }
    var $r = Fr, hr = Ir;
    er.Fragment = u, er.jsx = $r, er.jsxs = hr;
  }()), er;
}
process.env.NODE_ENV === "production" ? Hr.exports = en() : Hr.exports = rn();
var qr = Hr.exports, St = {}, Ct = {}, Ke = {}, Ot = {}, qe = {};
Object.defineProperty(qe, "__esModule", { value: !0 });
qe.IterableElementBase = qe.IterableEntryBase = void 0;
class tn {
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   *
   * The function is an implementation of the Symbol.iterator method that returns an iterable iterator.
   * @param {any[]} args - The `args` parameter in the code snippet represents a rest parameter. It
   * allows the function to accept any number of arguments as an array. In this case, the `args`
   * parameter is used to pass any additional arguments to the `_getIterator` method.
   */
  *[Symbol.iterator](...n) {
    yield* this._getIterator(...n);
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   *
   * The function returns an iterator that yields key-value pairs from the object, where the value can
   * be undefined.
   */
  *entries() {
    for (const n of this)
      yield n;
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   *
   * The function returns an iterator that yields the keys of a data structure.
   */
  *keys() {
    for (const n of this)
      yield n[0];
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   *
   * The function returns an iterator that yields the values of a collection.
   */
  *values() {
    for (const n of this)
      yield n[1];
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   *
   * The `every` function checks if every element in a collection satisfies a given condition.
   * @param predicate - The `predicate` parameter is a callback function that takes three arguments:
   * `value`, `key`, and `index`. It should return a boolean value indicating whether the condition is
   * met for the current element in the iteration.
   * @param {any} [thisArg] - The `thisArg` parameter is an optional argument that specifies the value
   * to be used as `this` when executing the `predicate` function. If `thisArg` is provided, it will be
   * passed as the first argument to the `predicate` function. If `thisArg` is not provided
   * @returns The `every` method is returning a boolean value. It returns `true` if every element in
   * the collection satisfies the provided predicate function, and `false` otherwise.
   */
  every(n, f) {
    let u = 0;
    for (const s of this)
      if (!n.call(f, s[1], s[0], u++, this))
        return !1;
    return !0;
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   *
   * The "some" function iterates over a collection and returns true if at least one element satisfies
   * a given predicate.
   * @param predicate - The `predicate` parameter is a callback function that takes three arguments:
   * `value`, `key`, and `index`. It should return a boolean value indicating whether the condition is
   * met for the current element in the iteration.
   * @param {any} [thisArg] - The `thisArg` parameter is an optional argument that specifies the value
   * to be used as the `this` value when executing the `predicate` function. If `thisArg` is provided,
   * it will be passed as the first argument to the `predicate` function. If `thisArg` is
   * @returns a boolean value. It returns true if the predicate function returns true for any pair in
   * the collection, and false otherwise.
   */
  some(n, f) {
    let u = 0;
    for (const s of this)
      if (n.call(f, s[1], s[0], u++, this))
        return !0;
    return !1;
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   *
   * The `forEach` function iterates over each key-value pair in a collection and executes a callback
   * function for each pair.
   * @param callbackfn - The callback function that will be called for each element in the collection.
   * It takes four parameters: the value of the current element, the key of the current element, the
   * index of the current element, and the collection itself.
   * @param {any} [thisArg] - The `thisArg` parameter is an optional argument that allows you to
   * specify the value of `this` within the callback function. If `thisArg` is provided, it will be
   * used as the `this` value when calling the callback function. If `thisArg` is not provided, `
   */
  forEach(n, f) {
    let u = 0;
    for (const s of this) {
      const [l, h] = s;
      n.call(f, h, l, u++, this);
    }
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   *
   * The `find` function iterates over the entries of a collection and returns the first value for
   * which the callback function returns true.
   * @param callbackfn - The callback function that will be called for each entry in the collection. It
   * takes three arguments: the value of the entry, the key of the entry, and the index of the entry in
   * the collection. It should return a boolean value indicating whether the current entry matches the
   * desired condition.
   * @param {any} [thisArg] - The `thisArg` parameter is an optional argument that specifies the value
   * to be used as `this` when executing the `callbackfn` function. If `thisArg` is provided, it will
   * be passed as the `this` value to the `callbackfn` function. If `thisArg
   * @returns The method `find` returns the value of the first element in the iterable that satisfies
   * the provided callback function. If no element satisfies the callback function, `undefined` is
   * returned.
   */
  find(n, f) {
    let u = 0;
    for (const s of this) {
      const [l, h] = s;
      if (n.call(f, h, l, u++, this))
        return s;
    }
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   *
   * The function checks if a given key exists in a collection.
   * @param {K} key - The parameter "key" is of type K, which means it can be any type. It represents
   * the key that we want to check for existence in the data structure.
   * @returns a boolean value. It returns true if the key is found in the collection, and false
   * otherwise.
   */
  has(n) {
    for (const f of this) {
      const [u] = f;
      if (u === n)
        return !0;
    }
    return !1;
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   *
   * The function checks if a given value exists in a collection.
   * @param {V} value - The parameter "value" is the value that we want to check if it exists in the
   * collection.
   * @returns a boolean value, either true or false.
   */
  hasValue(n) {
    for (const [, f] of this)
      if (f === n)
        return !0;
    return !1;
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   *
   * The `get` function retrieves the value associated with a given key from a collection.
   * @param {K} key - K (the type of the key) - This parameter represents the key that is being
   * searched for in the collection.
   * @returns The `get` method returns the value associated with the specified key if it exists in the
   * collection, otherwise it returns `undefined`.
   */
  get(n) {
    for (const f of this) {
      const [u, s] = f;
      if (u === n)
        return s;
    }
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   *
   * The `reduce` function iterates over key-value pairs and applies a callback function to each pair,
   * accumulating a single value.
   * @param callbackfn - The callback function that will be called for each element in the collection.
   * It takes four arguments: the current accumulator value, the current value of the element, the key
   * of the element, and the index of the element in the collection. It should return the updated
   * accumulator value.
   * @param {U} initialValue - The `initialValue` parameter is the initial value of the accumulator. It
   * is the value that will be used as the first argument to the `callbackfn` function when reducing
   * the elements of the collection.
   * @returns The `reduce` method is returning the final value of the accumulator after iterating over
   * all the elements in the collection.
   */
  reduce(n, f) {
    let u = f, s = 0;
    for (const l of this) {
      const [h, g] = l;
      u = n(u, g, h, s++, this);
    }
    return u;
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  print() {
    console.log([...this]);
  }
}
qe.IterableEntryBase = tn;
class nn {
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   *
   * The function is an implementation of the Symbol.iterator method that returns an IterableIterator.
   * @param {any[]} args - The `args` parameter in the code snippet represents a rest parameter. It
   * allows the function to accept any number of arguments as an array. In this case, the `args`
   * parameter is used to pass any number of arguments to the `_getIterator` method.
   */
  *[Symbol.iterator](...n) {
    yield* this._getIterator(...n);
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   *
   * The function returns an iterator that yields all the values in the object.
   */
  *values() {
    for (const n of this)
      yield n;
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   *
   * The `every` function checks if every element in the array satisfies a given predicate.
   * @param predicate - The `predicate` parameter is a callback function that takes three arguments:
   * the current element being processed, its index, and the array it belongs to. It should return a
   * boolean value indicating whether the element satisfies a certain condition or not.
   * @param {any} [thisArg] - The `thisArg` parameter is an optional argument that specifies the value
   * to be used as `this` when executing the `predicate` function. If `thisArg` is provided, it will be
   * passed as the `this` value to the `predicate` function. If `thisArg` is
   * @returns The `every` method is returning a boolean value. It returns `true` if every element in
   * the array satisfies the provided predicate function, and `false` otherwise.
   */
  every(n, f) {
    let u = 0;
    for (const s of this)
      if (!n.call(f, s, u++, this))
        return !1;
    return !0;
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   *
   * The "some" function checks if at least one element in a collection satisfies a given predicate.
   * @param predicate - The `predicate` parameter is a callback function that takes three arguments:
   * `value`, `index`, and `array`. It should return a boolean value indicating whether the current
   * element satisfies the condition.
   * @param {any} [thisArg] - The `thisArg` parameter is an optional argument that specifies the value
   * to be used as the `this` value when executing the `predicate` function. If `thisArg` is provided,
   * it will be passed as the `this` value to the `predicate` function. If `thisArg
   * @returns a boolean value. It returns true if the predicate function returns true for any element
   * in the collection, and false otherwise.
   */
  some(n, f) {
    let u = 0;
    for (const s of this)
      if (n.call(f, s, u++, this))
        return !0;
    return !1;
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   *
   * The `forEach` function iterates over each element in an array-like object and calls a callback
   * function for each element.
   * @param callbackfn - The callbackfn parameter is a function that will be called for each element in
   * the array. It takes three arguments: the current element being processed, the index of the current
   * element, and the array that forEach was called upon.
   * @param {any} [thisArg] - The `thisArg` parameter is an optional argument that specifies the value
   * to be used as `this` when executing the `callbackfn` function. If `thisArg` is provided, it will
   * be passed as the `this` value to the `callbackfn` function. If `thisArg
   */
  forEach(n, f) {
    let u = 0;
    for (const s of this)
      n.call(f, s, u++, this);
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   *
   * The `find` function iterates over the elements of an array-like object and returns the first
   * element that satisfies the provided callback function.
   * @param callbackfn - The callbackfn parameter is a function that will be called for each element in
   * the array. It takes three arguments: the current element being processed, the index of the current
   * element, and the array itself. The function should return a boolean value indicating whether the
   * current element matches the desired condition.
   * @param {any} [thisArg] - The `thisArg` parameter is an optional argument that specifies the value
   * to be used as `this` when executing the `callbackfn` function. If `thisArg` is provided, it will
   * be passed as the `this` value to the `callbackfn` function. If `thisArg
   * @returns The `find` method returns the first element in the array that satisfies the provided
   * callback function. If no element satisfies the callback function, `undefined` is returned.
   */
  find(n, f) {
    let u = 0;
    for (const s of this)
      if (n.call(f, s, u++, this))
        return s;
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   *
   * The function checks if a given element exists in a collection.
   * @param {E} element - The parameter "element" is of type E, which means it can be any type. It
   * represents the element that we want to check for existence in the collection.
   * @returns a boolean value. It returns true if the element is found in the collection, and false
   * otherwise.
   */
  has(n) {
    for (const f of this)
      if (f === n)
        return !0;
    return !1;
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   *
   * The `reduce` function iterates over the elements of an array-like object and applies a callback
   * function to reduce them into a single value.
   * @param callbackfn - The callbackfn parameter is a function that will be called for each element in
   * the array. It takes four arguments:
   * @param {U} initialValue - The initialValue parameter is the initial value of the accumulator. It
   * is the value that the accumulator starts with before the reduction operation begins.
   * @returns The `reduce` method is returning the final value of the accumulator after iterating over
   * all the elements in the array and applying the callback function to each element.
   */
  reduce(n, f) {
    let u = f, s = 0;
    for (const l of this)
      u = n(u, l, s++, this);
    return u;
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  print() {
    console.log([...this]);
  }
}
qe.IterableElementBase = nn;
(function(R) {
  var n = ue && ue.__createBinding || (Object.create ? function(u, s, l, h) {
    h === void 0 && (h = l);
    var g = Object.getOwnPropertyDescriptor(s, l);
    (!g || ("get" in g ? !s.__esModule : g.writable || g.configurable)) && (g = { enumerable: !0, get: function() {
      return s[l];
    } }), Object.defineProperty(u, h, g);
  } : function(u, s, l, h) {
    h === void 0 && (h = l), u[h] = s[l];
  }), f = ue && ue.__exportStar || function(u, s) {
    for (var l in u)
      l !== "default" && !Object.prototype.hasOwnProperty.call(s, l) && n(s, u, l);
  };
  Object.defineProperty(R, "__esModule", { value: !0 }), f(qe, R);
})(Ot);
Object.defineProperty(Ke, "__esModule", { value: !0 });
Ke.Trie = Ke.TrieNode = void 0;
const an = Ot;
class wr {
  constructor(n) {
    this._key = n, this._isEnd = !1, this._children = /* @__PURE__ */ new Map();
  }
  /**
   * The function returns the value of the protected variable _key.
   * @returns The value of the `_key` property, which is a string.
   */
  get key() {
    return this._key;
  }
  /**
   * The above function sets the value of a protected variable called "key".
   * @param {string} value - The value parameter is a string that represents the value to be assigned
   * to the key.
   */
  set key(n) {
    this._key = n;
  }
  /**
   * The function returns the children of a TrieNode as a Map.
   * @returns The `children` property of the TrieNode object, which is a Map containing string keys and
   * TrieNode values.
   */
  get children() {
    return this._children;
  }
  /**
   * The function sets the value of the `_children` property of a TrieNode object.
   * @param value - The value parameter is a Map object that represents the children of a TrieNode. The
   * keys of the map are strings, which represent the characters that are associated with each child
   * TrieNode. The values of the map are TrieNode objects, which represent the child nodes of the
   * current TrieNode.
   */
  set children(n) {
    this._children = n;
  }
  /**
   * The function returns a boolean value indicating whether a certain condition is met.
   * @returns The method is returning a boolean value, specifically the value of the variable `_isEnd`.
   */
  get isEnd() {
    return this._isEnd;
  }
  /**
   * The function sets the value of the "_isEnd" property.
   * @param {boolean} value - The value parameter is a boolean value that indicates whether the current
   * state is the end state or not.
   */
  set isEnd(n) {
    this._isEnd = n;
  }
}
Ke.TrieNode = wr;
class tr extends an.IterableElementBase {
  /**
   * The constructor function for the Trie class.
   * @param words: Iterable string Initialize the trie with a set of words
   * @param options?: TrieOptions Allow the user to pass in options for the trie
   * @return This
   */
  constructor(n = [], f) {
    if (super(), this._size = 0, this._caseSensitive = !0, this._root = new wr(""), f) {
      const { caseSensitive: u } = f;
      u !== void 0 && (this._caseSensitive = u);
    }
    if (n)
      for (const u of n)
        this.add(u);
  }
  /**
   * The size function returns the size of the stack.
   * @return The number of elements in the list
   */
  get size() {
    return this._size;
  }
  /**
   * The caseSensitive function is a getter that returns the value of the protected _caseSensitive property.
   * @return The value of the _caseSensitive protected variable
   */
  get caseSensitive() {
    return this._caseSensitive;
  }
  /**
   * The root function returns the root node of the tree.
   * @return The root node
   */
  get root() {
    return this._root;
  }
  /**
   * Time Complexity: O(l), where l is the length of the word being added.
   * Space Complexity: O(l) - Each character in the word adds a TrieNode.
   */
  /**
   * Time Complexity: O(l), where l is the length of the word being added.
   * Space Complexity: O(l) - Each character in the word adds a TrieNode.
   *
   * Add a word to the Trie structure.
   * @param {string} word - The word to add.
   * @returns {boolean} True if the word was successfully added.
   */
  add(n) {
    n = this._caseProcess(n);
    let f = this.root, u = !1;
    for (const s of n) {
      let l = f.children.get(s);
      l || (l = new wr(s), f.children.set(s, l)), f = l;
    }
    return f.isEnd || (u = !0, f.isEnd = !0, this._size++), u;
  }
  /**
   * Time Complexity: O(l), where l is the length of the input word.
   * Space Complexity: O(1) - Constant space.
   */
  /**
   * Time Complexity: O(l), where l is the length of the input word.
   * Space Complexity: O(1) - Constant space.
   *
   * Check if the Trie contains a given word.
   * @param {string} word - The word to check for.
   * @returns {boolean} True if the word is present in the Trie.
   */
  has(n) {
    n = this._caseProcess(n);
    let f = this.root;
    for (const u of n) {
      const s = f.children.get(u);
      if (!s)
        return !1;
      f = s;
    }
    return f.isEnd;
  }
  /**
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  /**
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   *
   * The isEmpty function checks if the size of the queue is 0.
   * @return True if the size of the queue is 0
   */
  isEmpty() {
    return this.size === 0;
  }
  /**
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  /**
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   *
   * The clear function resets the size of the Trie to 0 and creates a new root TrieNode.
   */
  clear() {
    this._size = 0, this._root = new wr("");
  }
  /**
   * Time Complexity: O(l), where l is the length of the word being deleted.
   * Space Complexity: O(n) - Due to the recursive DFS approach.
   */
  /**
   * Time Complexity: O(l), where l is the length of the word being deleted.
   * Space Complexity: O(n) - Due to the recursive DFS approach.
   *
   * Remove a word from the Trie structure.
   * @param{string} word - The word to delete.
   * @returns {boolean} True if the word was successfully removed.
   */
  delete(n) {
    n = this._caseProcess(n);
    let f = !1;
    const u = (s, l) => {
      const h = n[l], g = s.children.get(h);
      return g ? l === n.length - 1 ? g.isEnd ? (g.children.size > 0 ? g.isEnd = !1 : s.children.delete(h), f = !0, !0) : !1 : u(g, l + 1) && !s.isEnd && g.children.size === 0 ? (s.children.delete(h), !0) : !1 : !1;
    };
    return u(this.root, 0), f && this._size--, f;
  }
  /**
   * Time Complexity: O(n), where n is the total number of nodes in the trie.
   * Space Complexity: O(1) - Constant space.
   */
  /**
   * Time Complexity: O(n), where n is the total number of nodes in the trie.
   * Space Complexity: O(1) - Constant space.
   *
   */
  getHeight() {
    const n = this.root;
    let f = 0;
    if (n) {
      const u = (s, l) => {
        l > f && (f = l);
        const { children: h } = s;
        if (h)
          for (const g of h.entries())
            u(g[1], l + 1);
      };
      u(n, 0);
    }
    return f;
  }
  /**
   * Time Complexity: O(l), where l is the length of the input prefix.
   * Space Complexity: O(1) - Constant space.
   */
  /**
   * Time Complexity: O(l), where l is the length of the input prefix.
   * Space Complexity: O(1) - Constant space.
   *
   * Check if a given input string has an absolute prefix in the Trie, meaning it's not a complete word.
   * @param {string} input - The input string to check.
   * @returns {boolean} True if it's an absolute prefix in the Trie.
   */
  hasPurePrefix(n) {
    n = this._caseProcess(n);
    let f = this.root;
    for (const u of n) {
      const s = f.children.get(u);
      if (!s)
        return !1;
      f = s;
    }
    return !f.isEnd;
  }
  /**
   * Time Complexity: O(l), where l is the length of the input prefix.
   * Space Complexity: O(1) - Constant space.
   */
  /**
   * Time Complexity: O(l), where l is the length of the input prefix.
   * Space Complexity: O(1) - Constant space.
   *
   * Check if a given input string is a prefix of any existing word in the Trie, whether as an absolute prefix or a complete word.
   * @param {string} input - The input string representing the prefix to check.
   * @returns {boolean} True if it's a prefix in the Trie.
   */
  hasPrefix(n) {
    n = this._caseProcess(n);
    let f = this.root;
    for (const u of n) {
      const s = f.children.get(u);
      if (!s)
        return !1;
      f = s;
    }
    return !0;
  }
  /**
   * Time Complexity: O(n), where n is the total number of nodes in the trie.
   * Space Complexity: O(l), where l is the length of the input prefix.
   */
  /**
   * Time Complexity: O(n), where n is the total number of nodes in the trie.
   * Space Complexity: O(l), where l is the length of the input prefix.
   *
   * Check if the input string is a common prefix in the Trie, meaning it's a prefix shared by all words in the Trie.
   * @param {string} input - The input string representing the common prefix to check for.
   * @returns {boolean} True if it's a common prefix in the Trie.
   */
  hasCommonPrefix(n) {
    n = this._caseProcess(n);
    let f = "";
    const u = (s) => {
      if (f += s.key, f !== n && !s.isEnd)
        if (s && s.children && s.children.size === 1)
          u(Array.from(s.children.values())[0]);
        else
          return;
    };
    return u(this.root), f === n;
  }
  /**
   * Time Complexity: O(n), where n is the total number of nodes in the trie.
   * Space Complexity: O(l), where l is the length of the longest common prefix.
   */
  /**
   * Time Complexity: O(n), where n is the total number of nodes in the trie.
   * Space Complexity: O(l), where l is the length of the longest common prefix.
   *
   * Get the longest common prefix among all the words stored in the Trie.
   * @returns {string} The longest common prefix found in the Trie.
   */
  getLongestCommonPrefix() {
    let n = "";
    const f = (u) => {
      if (n += u.key, !u.isEnd)
        if (u && u.children && u.children.size === 1)
          f(Array.from(u.children.values())[0]);
        else
          return;
    };
    return f(this.root), n;
  }
  /**
   * Time Complexity: O(w * l), where w is the number of words retrieved, and l is the average length of the words.
   * Space Complexity: O(w * l) - The space required for the output array.
   */
  /**
   * Time Complexity: O(w * l), where w is the number of words retrieved, and l is the average length of the words.
   * Space Complexity: O(w * l) - The space required for the output array.
   *
   * The `getAll` function returns an array of all words in a Trie data structure that start with a given prefix.
   * @param {string} prefix - The `prefix` parameter is a string that represents the prefix that we want to search for in the
   * trie. It is an optional parameter, so if no prefix is provided, it will default to an empty string.
   * @param {number} max - The max count of words will be found
   * @param isAllWhenEmptyPrefix - If true, when the prefix provided as '', returns all the words in the trie.
   * @returns {string[]} an array of strings.
   */
  getWords(n = "", f = Number.MAX_SAFE_INTEGER, u = !1) {
    n = this._caseProcess(n);
    const s = [];
    let l = 0;
    function h(D, J) {
      for (const P of D.children.keys()) {
        const F = D.children.get(P);
        F !== void 0 && h(F, J.concat(P));
      }
      if (D.isEnd) {
        if (l > f - 1)
          return;
        s.push(J), l++;
      }
    }
    let g = this.root;
    if (n)
      for (const D of n) {
        const J = g.children.get(D);
        J && (g = J);
      }
    return (u || g !== this.root) && h(g, n), s;
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   *
   * The `clone` function returns a new instance of the Trie class with the same values and case
   * sensitivity as the original Trie.
   * @returns A new instance of the Trie class is being returned.
   */
  clone() {
    return new tr(this.values(), { caseSensitive: this.caseSensitive });
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   *
   * The `filter` function takes a predicate function and returns a new array containing all the
   * elements for which the predicate function returns true.
   * @param predicate - The `predicate` parameter is a callback function that takes three arguments:
   * `word`, `index`, and `this`. It should return a boolean value indicating whether the current
   * element should be included in the filtered results or not.
   * @param {any} [thisArg] - The `thisArg` parameter is an optional argument that allows you to
   * specify the value of `this` within the `predicate` function. It is used when you want to bind a
   * specific object as the context for the `predicate` function. If `thisArg` is provided, it will be
   * @returns The `filter` method is returning an array of strings (`string[]`).
   */
  filter(n, f) {
    const u = new tr();
    let s = 0;
    for (const l of this)
      n.call(f, l, s, this) && u.add(l), s++;
    return u;
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   *
   * The `map` function creates a new Trie by applying a callback function to each element in the Trie.
   * @param callback - The callback parameter is a function that will be called for each element in the
   * Trie. It takes three arguments: the current element in the Trie, the index of the current element,
   * and the Trie itself. The callback function should return a new value for the element.
   * @param {any} [thisArg] - The `thisArg` parameter is an optional argument that specifies the value
   * to be used as `this` when executing the `callback` function. If `thisArg` is provided, it will be
   * passed as the `this` value to the `callback` function. If `thisArg` is
   * @returns The `map` function is returning a new Trie object.
   */
  map(n, f) {
    const u = new tr();
    let s = 0;
    for (const l of this)
      u.add(n.call(f, l, s, this)), s++;
    return u;
  }
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   *
   * The function `_getIterator` returns an iterable iterator that performs a depth-first search on a
   * trie data structure and yields all the paths to the end nodes.
   */
  *_getIterator() {
    function* n(f, u) {
      f.isEnd && (yield u);
      for (const [s, l] of f.children)
        yield* n(l, u + s);
    }
    yield* n(this.root, "");
  }
  /**
   * Time Complexity: O(l), where l is the length of the input string.
   * Space Complexity: O(1) - Constant space.
   */
  /**
   * Time Complexity: O(l), where l is the length of the input string.
   * Space Complexity: O(1) - Constant space.
   *
   * @param str
   * @protected
   */
  _caseProcess(n) {
    return this._caseSensitive || (n = n.toLowerCase()), n;
  }
}
Ke.Trie = tr;
(function(R) {
  var n = ue && ue.__createBinding || (Object.create ? function(u, s, l, h) {
    h === void 0 && (h = l);
    var g = Object.getOwnPropertyDescriptor(s, l);
    (!g || ("get" in g ? !s.__esModule : g.writable || g.configurable)) && (g = { enumerable: !0, get: function() {
      return s[l];
    } }), Object.defineProperty(u, h, g);
  } : function(u, s, l, h) {
    h === void 0 && (h = l), u[h] = s[l];
  }), f = ue && ue.__exportStar || function(u, s) {
    for (var l in u)
      l !== "default" && !Object.prototype.hasOwnProperty.call(s, l) && n(s, u, l);
  };
  Object.defineProperty(R, "__esModule", { value: !0 }), f(Ke, R);
})(Ct);
var Tt = {}, Pt = {};
Object.defineProperty(Pt, "__esModule", { value: !0 });
(function(R) {
  var n = ue && ue.__createBinding || (Object.create ? function(u, s, l, h) {
    h === void 0 && (h = l);
    var g = Object.getOwnPropertyDescriptor(s, l);
    (!g || ("get" in g ? !s.__esModule : g.writable || g.configurable)) && (g = { enumerable: !0, get: function() {
      return s[l];
    } }), Object.defineProperty(u, h, g);
  } : function(u, s, l, h) {
    h === void 0 && (h = l), u[h] = s[l];
  }), f = ue && ue.__exportStar || function(u, s) {
    for (var l in u)
      l !== "default" && !Object.prototype.hasOwnProperty.call(s, l) && n(s, u, l);
  };
  Object.defineProperty(R, "__esModule", { value: !0 }), f(Pt, R);
})(Tt);
var jt = {};
Object.defineProperty(jt, "__esModule", { value: !0 });
(function(R) {
  var n = ue && ue.__createBinding || (Object.create ? function(u, s, l, h) {
    h === void 0 && (h = l);
    var g = Object.getOwnPropertyDescriptor(s, l);
    (!g || ("get" in g ? !s.__esModule : g.writable || g.configurable)) && (g = { enumerable: !0, get: function() {
      return s[l];
    } }), Object.defineProperty(u, h, g);
  } : function(u, s, l, h) {
    h === void 0 && (h = l), u[h] = s[l];
  }), f = ue && ue.__exportStar || function(u, s) {
    for (var l in u)
      l !== "default" && !Object.prototype.hasOwnProperty.call(s, l) && n(s, u, l);
  };
  Object.defineProperty(R, "__esModule", { value: !0 });
  /**
   * data-structure-typed
   *
   * @author Tyler Zeng
   * @copyright Copyright (c) 2022 Tyler Zeng <zrwusa@gmail.com>
   * @license MIT License
   */
  f(Ct, R), f(Tt, R), f(jt, R);
})(St);
var kt = /* @__PURE__ */ ((R) => (R.TAB = "Tab", R))(kt || {});
const on = ({
  styles: R,
  classNames: n,
  dictionary: f = [],
  autocompleteEnabled: u = !0,
  onChange: s,
  onMouseDown: l,
  handleCompletion: h,
  caseSensitive: g = !1,
  ...D
}, J) => {
  const [P, F] = me.useState(""), I = me.useRef(null), X = me.useRef(null);
  me.useImperativeHandle(J, () => (I.current.clearSuggestion = () => {
    var A;
    F(((A = I == null ? void 0 : I.current) == null ? void 0 : A.value) || "");
  }, I.current));
  const Q = me.useRef(""), be = me.useMemo(
    () => new St.Trie(f, { caseSensitive: g }),
    [f]
  ), le = me.useCallback((A) => A.slice(A.lastIndexOf(" ") + 1), []), de = (A) => {
    X.current && (X.current.scrollTop = A.currentTarget.scrollTop);
  }, U = (A) => {
    if (u)
      switch (Object.values(kt).includes(A.key) && A.preventDefault(), A.key) {
        case "Tab":
          if (!P)
            return;
          I.current && (I.current.value = P), Q.current = "", F(P);
          break;
      }
  }, ye = (A) => {
    if (l && l(A), !!u && P && I.current) {
      if (P === I.current.value)
        return;
      I.current.value = P, I.current.selectionStart = I.current.selectionEnd = I.current.value.length + 1, Q.current = "", F(P), A.preventDefault();
    }
  }, ve = (A) => {
    const se = A.target.value;
    if (s && s(A), h) {
      F(se), h({
        value: A.target.value,
        currentSuggestion: P,
        setSuggestion: (z) => F(se + z),
        onChangeEvent: A
      });
      return;
    }
    if (!u)
      return;
    const Ee = A.target.selectionStart, Ce = A.target.selectionEnd, ce = le(se);
    if (I.current && X.current && (X.current.scrollTop = I.current.scrollTop), F(se), ce.length < 2 || Ee !== Ce || Ce !== se.length) {
      (ce.length === 0 || Q.current) && (Q.current = "");
      return;
    }
    if (Q.current && Q.current.toLowerCase().startsWith(ce.toLowerCase())) {
      const z = Q.current.slice(
        ce.length
      );
      F(se + z);
      return;
    }
    const te = be.hasPrefix(ce), [ne] = te ? be.getWords(ce, 1) : [null];
    if (ne) {
      Q.current = ne;
      const z = ne.slice(
        ce.length
      );
      F(se + z);
      return;
    }
    Q.current = "";
  }, H = {
    position: "relative",
    margin: 0,
    padding: 0,
    ...R == null ? void 0 : R.wrapper
  }, re = {
    fontFamily: "inherit",
    width: "100%",
    height: "300px",
    boxSizing: "border-box",
    backgroundColor: "transparent",
    border: "1px solid #d9d9d9",
    fontSize: "15px",
    resize: "none",
    padding: "10px",
    zIndex: 1,
    ...R == null ? void 0 : R.area
  }, pe = {
    ...re,
    position: "absolute",
    overflowY: "scroll",
    backgroundColor: "white",
    display: "block !important",
    top: 0,
    color: "#c9c9c9",
    borderColor: "transparent",
    zIndex: -1,
    ...R == null ? void 0 : R.suggestion
  };
  return /* @__PURE__ */ qr.jsxs("div", { style: H, className: n == null ? void 0 : n.wrapper, children: [
    /* @__PURE__ */ qr.jsx(
      "textarea",
      {
        style: re,
        className: n == null ? void 0 : n.area,
        ref: I,
        onChange: ve,
        onKeyDown: U,
        onMouseDown: ye,
        onScroll: de,
        ...D
      }
    ),
    u ? /* @__PURE__ */ qr.jsx("div", { ref: X, style: pe, className: n == null ? void 0 : n.suggestion, children: P }) : !1
  ] });
}, un = me.forwardRef(on);
export {
  un as default
};
