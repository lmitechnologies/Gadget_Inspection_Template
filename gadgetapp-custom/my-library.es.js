var Ur = Object.defineProperty;
var Xr = (i, t, e) => t in i ? Ur(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var M = (i, t, e) => (Xr(i, typeof t != "symbol" ? t + "" : t, e), e);
import Pi, { forwardRef as ko, useRef as Kn, useEffect as It, useState as Zi } from "react";
var Qi = { exports: {} }, ge = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qn;
function Kr() {
  if (qn)
    return ge;
  qn = 1;
  var i = Pi, t = Symbol.for("react.element"), e = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, s = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function r(a, l, c) {
    var h, d = {}, u = null, f = null;
    c !== void 0 && (u = "" + c), l.key !== void 0 && (u = "" + l.key), l.ref !== void 0 && (f = l.ref);
    for (h in l)
      n.call(l, h) && !o.hasOwnProperty(h) && (d[h] = l[h]);
    if (a && a.defaultProps)
      for (h in l = a.defaultProps, l)
        d[h] === void 0 && (d[h] = l[h]);
    return { $$typeof: t, type: a, key: u, ref: f, props: d, _owner: s.current };
  }
  return ge.Fragment = e, ge.jsx = r, ge.jsxs = r, ge;
}
var pe = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gn;
function qr() {
  return Gn || (Gn = 1, process.env.NODE_ENV !== "production" && function() {
    var i = Pi, t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), r = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), h = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), u = Symbol.for("react.lazy"), f = Symbol.for("react.offscreen"), g = Symbol.iterator, p = "@@iterator";
    function b(m) {
      if (m === null || typeof m != "object")
        return null;
      var w = g && m[g] || m[p];
      return typeof w == "function" ? w : null;
    }
    var _ = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function x(m) {
      {
        for (var w = arguments.length, O = new Array(w > 1 ? w - 1 : 0), A = 1; A < w; A++)
          O[A - 1] = arguments[A];
        k("error", m, O);
      }
    }
    function k(m, w, O) {
      {
        var A = _.ReactDebugCurrentFrame, V = A.getStackAddendum();
        V !== "" && (w += "%s", O = O.concat([V]));
        var $ = O.map(function(B) {
          return String(B);
        });
        $.unshift("Warning: " + w), Function.prototype.apply.call(console[m], console, $);
      }
    }
    var v = !1, y = !1, S = !1, P = !1, C = !1, D;
    D = Symbol.for("react.module.reference");
    function R(m) {
      return !!(typeof m == "string" || typeof m == "function" || m === n || m === o || C || m === s || m === c || m === h || P || m === f || v || y || S || typeof m == "object" && m !== null && (m.$$typeof === u || m.$$typeof === d || m.$$typeof === r || m.$$typeof === a || m.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      m.$$typeof === D || m.getModuleId !== void 0));
    }
    function E(m, w, O) {
      var A = m.displayName;
      if (A)
        return A;
      var V = w.displayName || w.name || "";
      return V !== "" ? O + "(" + V + ")" : O;
    }
    function L(m) {
      return m.displayName || "Context";
    }
    function j(m) {
      if (m == null)
        return null;
      if (typeof m.tag == "number" && x("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof m == "function")
        return m.displayName || m.name || null;
      if (typeof m == "string")
        return m;
      switch (m) {
        case n:
          return "Fragment";
        case e:
          return "Portal";
        case o:
          return "Profiler";
        case s:
          return "StrictMode";
        case c:
          return "Suspense";
        case h:
          return "SuspenseList";
      }
      if (typeof m == "object")
        switch (m.$$typeof) {
          case a:
            var w = m;
            return L(w) + ".Consumer";
          case r:
            var O = m;
            return L(O._context) + ".Provider";
          case l:
            return E(m, m.render, "ForwardRef");
          case d:
            var A = m.displayName || null;
            return A !== null ? A : j(m.type) || "Memo";
          case u: {
            var V = m, $ = V._payload, B = V._init;
            try {
              return j(B($));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Z = Object.assign, z = 0, H, q, ct, it, wt, Yt, Mt;
    function Lt() {
    }
    Lt.__reactDisabledLog = !0;
    function St() {
      {
        if (z === 0) {
          H = console.log, q = console.info, ct = console.warn, it = console.error, wt = console.group, Yt = console.groupCollapsed, Mt = console.groupEnd;
          var m = {
            configurable: !0,
            enumerable: !0,
            value: Lt,
            writable: !0
          };
          Object.defineProperties(console, {
            info: m,
            log: m,
            warn: m,
            error: m,
            group: m,
            groupCollapsed: m,
            groupEnd: m
          });
        }
        z++;
      }
    }
    function Ut() {
      {
        if (z--, z === 0) {
          var m = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Z({}, m, {
              value: H
            }),
            info: Z({}, m, {
              value: q
            }),
            warn: Z({}, m, {
              value: ct
            }),
            error: Z({}, m, {
              value: it
            }),
            group: Z({}, m, {
              value: wt
            }),
            groupCollapsed: Z({}, m, {
              value: Yt
            }),
            groupEnd: Z({}, m, {
              value: Mt
            })
          });
        }
        z < 0 && x("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var mt = _.ReactCurrentDispatcher, Ei;
    function Ye(m, w, O) {
      {
        if (Ei === void 0)
          try {
            throw Error();
          } catch (V) {
            var A = V.stack.trim().match(/\n( *(at )?)/);
            Ei = A && A[1] || "";
          }
        return `
` + Ei + m;
      }
    }
    var Li = !1, Ue;
    {
      var wr = typeof WeakMap == "function" ? WeakMap : Map;
      Ue = new wr();
    }
    function Ln(m, w) {
      if (!m || Li)
        return "";
      {
        var O = Ue.get(m);
        if (O !== void 0)
          return O;
      }
      var A;
      Li = !0;
      var V = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var $;
      $ = mt.current, mt.current = null, St();
      try {
        if (w) {
          var B = function() {
            throw Error();
          };
          if (Object.defineProperty(B.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(B, []);
            } catch (Pt) {
              A = Pt;
            }
            Reflect.construct(m, [], B);
          } else {
            try {
              B.call();
            } catch (Pt) {
              A = Pt;
            }
            m.call(B.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Pt) {
            A = Pt;
          }
          m();
        }
      } catch (Pt) {
        if (Pt && A && typeof Pt.stack == "string") {
          for (var F = Pt.stack.split(`
`), lt = A.stack.split(`
`), Q = F.length - 1, et = lt.length - 1; Q >= 1 && et >= 0 && F[Q] !== lt[et]; )
            et--;
          for (; Q >= 1 && et >= 0; Q--, et--)
            if (F[Q] !== lt[et]) {
              if (Q !== 1 || et !== 1)
                do
                  if (Q--, et--, et < 0 || F[Q] !== lt[et]) {
                    var gt = `
` + F[Q].replace(" at new ", " at ");
                    return m.displayName && gt.includes("<anonymous>") && (gt = gt.replace("<anonymous>", m.displayName)), typeof m == "function" && Ue.set(m, gt), gt;
                  }
                while (Q >= 1 && et >= 0);
              break;
            }
        }
      } finally {
        Li = !1, mt.current = $, Ut(), Error.prepareStackTrace = V;
      }
      var re = m ? m.displayName || m.name : "", Xn = re ? Ye(re) : "";
      return typeof m == "function" && Ue.set(m, Xn), Xn;
    }
    function Mr(m, w, O) {
      return Ln(m, !1);
    }
    function Sr(m) {
      var w = m.prototype;
      return !!(w && w.isReactComponent);
    }
    function Xe(m, w, O) {
      if (m == null)
        return "";
      if (typeof m == "function")
        return Ln(m, Sr(m));
      if (typeof m == "string")
        return Ye(m);
      switch (m) {
        case c:
          return Ye("Suspense");
        case h:
          return Ye("SuspenseList");
      }
      if (typeof m == "object")
        switch (m.$$typeof) {
          case l:
            return Mr(m.render);
          case d:
            return Xe(m.type, w, O);
          case u: {
            var A = m, V = A._payload, $ = A._init;
            try {
              return Xe($(V), w, O);
            } catch {
            }
          }
        }
      return "";
    }
    var Ke = Object.prototype.hasOwnProperty, Fn = {}, In = _.ReactDebugCurrentFrame;
    function qe(m) {
      if (m) {
        var w = m._owner, O = Xe(m.type, m._source, w ? w.type : null);
        In.setExtraStackFrame(O);
      } else
        In.setExtraStackFrame(null);
    }
    function Pr(m, w, O, A, V) {
      {
        var $ = Function.call.bind(Ke);
        for (var B in m)
          if ($(m, B)) {
            var F = void 0;
            try {
              if (typeof m[B] != "function") {
                var lt = Error((A || "React class") + ": " + O + " type `" + B + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof m[B] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw lt.name = "Invariant Violation", lt;
              }
              F = m[B](w, B, A, O, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Q) {
              F = Q;
            }
            F && !(F instanceof Error) && (qe(V), x("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", A || "React class", O, B, typeof F), qe(null)), F instanceof Error && !(F.message in Fn) && (Fn[F.message] = !0, qe(V), x("Failed %s type: %s", O, F.message), qe(null));
          }
      }
    }
    var Cr = Array.isArray;
    function Fi(m) {
      return Cr(m);
    }
    function Or(m) {
      {
        var w = typeof Symbol == "function" && Symbol.toStringTag, O = w && m[Symbol.toStringTag] || m.constructor.name || "Object";
        return O;
      }
    }
    function Dr(m) {
      try {
        return zn(m), !1;
      } catch {
        return !0;
      }
    }
    function zn(m) {
      return "" + m;
    }
    function Bn(m) {
      if (Dr(m))
        return x("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Or(m)), zn(m);
    }
    var fe = _.ReactCurrentOwner, Ar = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Wn, Vn, Ii;
    Ii = {};
    function Tr(m) {
      if (Ke.call(m, "ref")) {
        var w = Object.getOwnPropertyDescriptor(m, "ref").get;
        if (w && w.isReactWarning)
          return !1;
      }
      return m.ref !== void 0;
    }
    function Rr(m) {
      if (Ke.call(m, "key")) {
        var w = Object.getOwnPropertyDescriptor(m, "key").get;
        if (w && w.isReactWarning)
          return !1;
      }
      return m.key !== void 0;
    }
    function Er(m, w) {
      if (typeof m.ref == "string" && fe.current && w && fe.current.stateNode !== w) {
        var O = j(fe.current.type);
        Ii[O] || (x('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', j(fe.current.type), m.ref), Ii[O] = !0);
      }
    }
    function Lr(m, w) {
      {
        var O = function() {
          Wn || (Wn = !0, x("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", w));
        };
        O.isReactWarning = !0, Object.defineProperty(m, "key", {
          get: O,
          configurable: !0
        });
      }
    }
    function Fr(m, w) {
      {
        var O = function() {
          Vn || (Vn = !0, x("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", w));
        };
        O.isReactWarning = !0, Object.defineProperty(m, "ref", {
          get: O,
          configurable: !0
        });
      }
    }
    var Ir = function(m, w, O, A, V, $, B) {
      var F = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: m,
        key: w,
        ref: O,
        props: B,
        // Record the component responsible for creating this element.
        _owner: $
      };
      return F._store = {}, Object.defineProperty(F._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(F, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: A
      }), Object.defineProperty(F, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: V
      }), Object.freeze && (Object.freeze(F.props), Object.freeze(F)), F;
    };
    function zr(m, w, O, A, V) {
      {
        var $, B = {}, F = null, lt = null;
        O !== void 0 && (Bn(O), F = "" + O), Rr(w) && (Bn(w.key), F = "" + w.key), Tr(w) && (lt = w.ref, Er(w, V));
        for ($ in w)
          Ke.call(w, $) && !Ar.hasOwnProperty($) && (B[$] = w[$]);
        if (m && m.defaultProps) {
          var Q = m.defaultProps;
          for ($ in Q)
            B[$] === void 0 && (B[$] = Q[$]);
        }
        if (F || lt) {
          var et = typeof m == "function" ? m.displayName || m.name || "Unknown" : m;
          F && Lr(B, et), lt && Fr(B, et);
        }
        return Ir(m, F, lt, V, A, fe.current, B);
      }
    }
    var zi = _.ReactCurrentOwner, Nn = _.ReactDebugCurrentFrame;
    function oe(m) {
      if (m) {
        var w = m._owner, O = Xe(m.type, m._source, w ? w.type : null);
        Nn.setExtraStackFrame(O);
      } else
        Nn.setExtraStackFrame(null);
    }
    var Bi;
    Bi = !1;
    function Wi(m) {
      return typeof m == "object" && m !== null && m.$$typeof === t;
    }
    function jn() {
      {
        if (zi.current) {
          var m = j(zi.current.type);
          if (m)
            return `

Check the render method of \`` + m + "`.";
        }
        return "";
      }
    }
    function Br(m) {
      {
        if (m !== void 0) {
          var w = m.fileName.replace(/^.*[\\\/]/, ""), O = m.lineNumber;
          return `

Check your code at ` + w + ":" + O + ".";
        }
        return "";
      }
    }
    var Hn = {};
    function Wr(m) {
      {
        var w = jn();
        if (!w) {
          var O = typeof m == "string" ? m : m.displayName || m.name;
          O && (w = `

Check the top-level render call using <` + O + ">.");
        }
        return w;
      }
    }
    function $n(m, w) {
      {
        if (!m._store || m._store.validated || m.key != null)
          return;
        m._store.validated = !0;
        var O = Wr(w);
        if (Hn[O])
          return;
        Hn[O] = !0;
        var A = "";
        m && m._owner && m._owner !== zi.current && (A = " It was passed a child from " + j(m._owner.type) + "."), oe(m), x('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', O, A), oe(null);
      }
    }
    function Yn(m, w) {
      {
        if (typeof m != "object")
          return;
        if (Fi(m))
          for (var O = 0; O < m.length; O++) {
            var A = m[O];
            Wi(A) && $n(A, w);
          }
        else if (Wi(m))
          m._store && (m._store.validated = !0);
        else if (m) {
          var V = b(m);
          if (typeof V == "function" && V !== m.entries)
            for (var $ = V.call(m), B; !(B = $.next()).done; )
              Wi(B.value) && $n(B.value, w);
        }
      }
    }
    function Vr(m) {
      {
        var w = m.type;
        if (w == null || typeof w == "string")
          return;
        var O;
        if (typeof w == "function")
          O = w.propTypes;
        else if (typeof w == "object" && (w.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        w.$$typeof === d))
          O = w.propTypes;
        else
          return;
        if (O) {
          var A = j(w);
          Pr(O, m.props, "prop", A, m);
        } else if (w.PropTypes !== void 0 && !Bi) {
          Bi = !0;
          var V = j(w);
          x("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", V || "Unknown");
        }
        typeof w.getDefaultProps == "function" && !w.getDefaultProps.isReactClassApproved && x("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Nr(m) {
      {
        for (var w = Object.keys(m.props), O = 0; O < w.length; O++) {
          var A = w[O];
          if (A !== "children" && A !== "key") {
            oe(m), x("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", A), oe(null);
            break;
          }
        }
        m.ref !== null && (oe(m), x("Invalid attribute `ref` supplied to `React.Fragment`."), oe(null));
      }
    }
    function Un(m, w, O, A, V, $) {
      {
        var B = R(m);
        if (!B) {
          var F = "";
          (m === void 0 || typeof m == "object" && m !== null && Object.keys(m).length === 0) && (F += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var lt = Br(V);
          lt ? F += lt : F += jn();
          var Q;
          m === null ? Q = "null" : Fi(m) ? Q = "array" : m !== void 0 && m.$$typeof === t ? (Q = "<" + (j(m.type) || "Unknown") + " />", F = " Did you accidentally export a JSX literal instead of a component?") : Q = typeof m, x("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Q, F);
        }
        var et = zr(m, w, O, V, $);
        if (et == null)
          return et;
        if (B) {
          var gt = w.children;
          if (gt !== void 0)
            if (A)
              if (Fi(gt)) {
                for (var re = 0; re < gt.length; re++)
                  Yn(gt[re], m);
                Object.freeze && Object.freeze(gt);
              } else
                x("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Yn(gt, m);
        }
        return m === n ? Nr(et) : Vr(et), et;
      }
    }
    function jr(m, w, O) {
      return Un(m, w, O, !0);
    }
    function Hr(m, w, O) {
      return Un(m, w, O, !1);
    }
    var $r = Hr, Yr = jr;
    pe.Fragment = n, pe.jsx = $r, pe.jsxs = Yr;
  }()), pe;
}
process.env.NODE_ENV === "production" ? Qi.exports = Kr() : Qi.exports = qr();
var bi = Qi.exports;
/*!
 * @kurkle/color v0.3.2
 * https://github.com/kurkle/color#readme
 * (c) 2023 Jukka Kurkela
 * Released under the MIT License
 */
function je(i) {
  return i + 0.5 | 0;
}
const zt = (i, t, e) => Math.max(Math.min(i, e), t);
function ve(i) {
  return zt(je(i * 2.55), 0, 255);
}
function Nt(i) {
  return zt(je(i * 255), 0, 255);
}
function At(i) {
  return zt(je(i / 2.55) / 100, 0, 1);
}
function Jn(i) {
  return zt(je(i * 100), 0, 100);
}
const pt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, tn = [..."0123456789ABCDEF"], Gr = (i) => tn[i & 15], Jr = (i) => tn[(i & 240) >> 4] + tn[i & 15], Ge = (i) => (i & 240) >> 4 === (i & 15), Zr = (i) => Ge(i.r) && Ge(i.g) && Ge(i.b) && Ge(i.a);
function Qr(i) {
  var t = i.length, e;
  return i[0] === "#" && (t === 4 || t === 5 ? e = {
    r: 255 & pt[i[1]] * 17,
    g: 255 & pt[i[2]] * 17,
    b: 255 & pt[i[3]] * 17,
    a: t === 5 ? pt[i[4]] * 17 : 255
  } : (t === 7 || t === 9) && (e = {
    r: pt[i[1]] << 4 | pt[i[2]],
    g: pt[i[3]] << 4 | pt[i[4]],
    b: pt[i[5]] << 4 | pt[i[6]],
    a: t === 9 ? pt[i[7]] << 4 | pt[i[8]] : 255
  })), e;
}
const ta = (i, t) => i < 255 ? t(i) : "";
function ea(i) {
  var t = Zr(i) ? Gr : Jr;
  return i ? "#" + t(i.r) + t(i.g) + t(i.b) + ta(i.a, t) : void 0;
}
const ia = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function wo(i, t, e) {
  const n = t * Math.min(e, 1 - e), s = (o, r = (o + i / 30) % 12) => e - n * Math.max(Math.min(r - 3, 9 - r, 1), -1);
  return [s(0), s(8), s(4)];
}
function na(i, t, e) {
  const n = (s, o = (s + i / 60) % 6) => e - e * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [n(5), n(3), n(1)];
}
function sa(i, t, e) {
  const n = wo(i, 1, 0.5);
  let s;
  for (t + e > 1 && (s = 1 / (t + e), t *= s, e *= s), s = 0; s < 3; s++)
    n[s] *= 1 - t - e, n[s] += t;
  return n;
}
function oa(i, t, e, n, s) {
  return i === s ? (t - e) / n + (t < e ? 6 : 0) : t === s ? (e - i) / n + 2 : (i - t) / n + 4;
}
function bn(i) {
  const e = i.r / 255, n = i.g / 255, s = i.b / 255, o = Math.max(e, n, s), r = Math.min(e, n, s), a = (o + r) / 2;
  let l, c, h;
  return o !== r && (h = o - r, c = a > 0.5 ? h / (2 - o - r) : h / (o + r), l = oa(e, n, s, h, o), l = l * 60 + 0.5), [l | 0, c || 0, a];
}
function _n(i, t, e, n) {
  return (Array.isArray(t) ? i(t[0], t[1], t[2]) : i(t, e, n)).map(Nt);
}
function xn(i, t, e) {
  return _n(wo, i, t, e);
}
function ra(i, t, e) {
  return _n(sa, i, t, e);
}
function aa(i, t, e) {
  return _n(na, i, t, e);
}
function Mo(i) {
  return (i % 360 + 360) % 360;
}
function la(i) {
  const t = ia.exec(i);
  let e = 255, n;
  if (!t)
    return;
  t[5] !== n && (e = t[6] ? ve(+t[5]) : Nt(+t[5]));
  const s = Mo(+t[2]), o = +t[3] / 100, r = +t[4] / 100;
  return t[1] === "hwb" ? n = ra(s, o, r) : t[1] === "hsv" ? n = aa(s, o, r) : n = xn(s, o, r), {
    r: n[0],
    g: n[1],
    b: n[2],
    a: e
  };
}
function ca(i, t) {
  var e = bn(i);
  e[0] = Mo(e[0] + t), e = xn(e), i.r = e[0], i.g = e[1], i.b = e[2];
}
function ha(i) {
  if (!i)
    return;
  const t = bn(i), e = t[0], n = Jn(t[1]), s = Jn(t[2]);
  return i.a < 255 ? `hsla(${e}, ${n}%, ${s}%, ${At(i.a)})` : `hsl(${e}, ${n}%, ${s}%)`;
}
const Zn = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
}, Qn = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function da() {
  const i = {}, t = Object.keys(Qn), e = Object.keys(Zn);
  let n, s, o, r, a;
  for (n = 0; n < t.length; n++) {
    for (r = a = t[n], s = 0; s < e.length; s++)
      o = e[s], a = a.replace(o, Zn[o]);
    o = parseInt(Qn[r], 16), i[a] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return i;
}
let Je;
function ua(i) {
  Je || (Je = da(), Je.transparent = [0, 0, 0, 0]);
  const t = Je[i.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const fa = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function ga(i) {
  const t = fa.exec(i);
  let e = 255, n, s, o;
  if (t) {
    if (t[7] !== n) {
      const r = +t[7];
      e = t[8] ? ve(r) : zt(r * 255, 0, 255);
    }
    return n = +t[1], s = +t[3], o = +t[5], n = 255 & (t[2] ? ve(n) : zt(n, 0, 255)), s = 255 & (t[4] ? ve(s) : zt(s, 0, 255)), o = 255 & (t[6] ? ve(o) : zt(o, 0, 255)), {
      r: n,
      g: s,
      b: o,
      a: e
    };
  }
}
function pa(i) {
  return i && (i.a < 255 ? `rgba(${i.r}, ${i.g}, ${i.b}, ${At(i.a)})` : `rgb(${i.r}, ${i.g}, ${i.b})`);
}
const Vi = (i) => i <= 31308e-7 ? i * 12.92 : Math.pow(i, 1 / 2.4) * 1.055 - 0.055, ae = (i) => i <= 0.04045 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
function ma(i, t, e) {
  const n = ae(At(i.r)), s = ae(At(i.g)), o = ae(At(i.b));
  return {
    r: Nt(Vi(n + e * (ae(At(t.r)) - n))),
    g: Nt(Vi(s + e * (ae(At(t.g)) - s))),
    b: Nt(Vi(o + e * (ae(At(t.b)) - o))),
    a: i.a + e * (t.a - i.a)
  };
}
function Ze(i, t, e) {
  if (i) {
    let n = bn(i);
    n[t] = Math.max(0, Math.min(n[t] + n[t] * e, t === 0 ? 360 : 1)), n = xn(n), i.r = n[0], i.g = n[1], i.b = n[2];
  }
}
function So(i, t) {
  return i && Object.assign(t || {}, i);
}
function ts(i) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(i) ? i.length >= 3 && (t = { r: i[0], g: i[1], b: i[2], a: 255 }, i.length > 3 && (t.a = Nt(i[3]))) : (t = So(i, { r: 0, g: 0, b: 0, a: 1 }), t.a = Nt(t.a)), t;
}
function ba(i) {
  return i.charAt(0) === "r" ? ga(i) : la(i);
}
class Le {
  constructor(t) {
    if (t instanceof Le)
      return t;
    const e = typeof t;
    let n;
    e === "object" ? n = ts(t) : e === "string" && (n = Qr(t) || ua(t) || ba(t)), this._rgb = n, this._valid = !!n;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = So(this._rgb);
    return t && (t.a = At(t.a)), t;
  }
  set rgb(t) {
    this._rgb = ts(t);
  }
  rgbString() {
    return this._valid ? pa(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? ea(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? ha(this._rgb) : void 0;
  }
  mix(t, e) {
    if (t) {
      const n = this.rgb, s = t.rgb;
      let o;
      const r = e === o ? 0.5 : e, a = 2 * r - 1, l = n.a - s.a, c = ((a * l === -1 ? a : (a + l) / (1 + a * l)) + 1) / 2;
      o = 1 - c, n.r = 255 & c * n.r + o * s.r + 0.5, n.g = 255 & c * n.g + o * s.g + 0.5, n.b = 255 & c * n.b + o * s.b + 0.5, n.a = r * n.a + (1 - r) * s.a, this.rgb = n;
    }
    return this;
  }
  interpolate(t, e) {
    return t && (this._rgb = ma(this._rgb, t._rgb, e)), this;
  }
  clone() {
    return new Le(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Nt(t), this;
  }
  clearer(t) {
    const e = this._rgb;
    return e.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, e = je(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = e, this;
  }
  opaquer(t) {
    const e = this._rgb;
    return e.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return Ze(this._rgb, 2, t), this;
  }
  darken(t) {
    return Ze(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Ze(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Ze(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return ca(this._rgb, t), this;
  }
}
/*!
 * Chart.js v4.4.2
 * https://www.chartjs.org
 * (c) 2024 Chart.js Contributors
 * Released under the MIT License
 */
function Ct() {
}
const _a = /* @__PURE__ */ (() => {
  let i = 0;
  return () => i++;
})();
function W(i) {
  return i === null || typeof i > "u";
}
function U(i) {
  if (Array.isArray && Array.isArray(i))
    return !0;
  const t = Object.prototype.toString.call(i);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function I(i) {
  return i !== null && Object.prototype.toString.call(i) === "[object Object]";
}
function G(i) {
  return (typeof i == "number" || i instanceof Number) && isFinite(+i);
}
function ut(i, t) {
  return G(i) ? i : t;
}
function T(i, t) {
  return typeof i > "u" ? t : i;
}
const xa = (i, t) => typeof i == "string" && i.endsWith("%") ? parseFloat(i) / 100 : +i / t, Po = (i, t) => typeof i == "string" && i.endsWith("%") ? parseFloat(i) / 100 * t : +i;
function Y(i, t, e) {
  if (i && typeof i.call == "function")
    return i.apply(e, t);
}
function N(i, t, e, n) {
  let s, o, r;
  if (U(i))
    if (o = i.length, n)
      for (s = o - 1; s >= 0; s--)
        t.call(e, i[s], s);
    else
      for (s = 0; s < o; s++)
        t.call(e, i[s], s);
  else if (I(i))
    for (r = Object.keys(i), o = r.length, s = 0; s < o; s++)
      t.call(e, i[r[s]], r[s]);
}
function _i(i, t) {
  let e, n, s, o;
  if (!i || !t || i.length !== t.length)
    return !1;
  for (e = 0, n = i.length; e < n; ++e)
    if (s = i[e], o = t[e], s.datasetIndex !== o.datasetIndex || s.index !== o.index)
      return !1;
  return !0;
}
function xi(i) {
  if (U(i))
    return i.map(xi);
  if (I(i)) {
    const t = /* @__PURE__ */ Object.create(null), e = Object.keys(i), n = e.length;
    let s = 0;
    for (; s < n; ++s)
      t[e[s]] = xi(i[e[s]]);
    return t;
  }
  return i;
}
function Co(i) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(i) === -1;
}
function ya(i, t, e, n) {
  if (!Co(i))
    return;
  const s = t[i], o = e[i];
  I(s) && I(o) ? Fe(s, o, n) : t[i] = xi(o);
}
function Fe(i, t, e) {
  const n = U(t) ? t : [
    t
  ], s = n.length;
  if (!I(i))
    return i;
  e = e || {};
  const o = e.merger || ya;
  let r;
  for (let a = 0; a < s; ++a) {
    if (r = n[a], !I(r))
      continue;
    const l = Object.keys(r);
    for (let c = 0, h = l.length; c < h; ++c)
      o(l[c], i, r, e);
  }
  return i;
}
function Ce(i, t) {
  return Fe(i, t, {
    merger: va
  });
}
function va(i, t, e) {
  if (!Co(i))
    return;
  const n = t[i], s = e[i];
  I(n) && I(s) ? Ce(n, s) : Object.prototype.hasOwnProperty.call(t, i) || (t[i] = xi(s));
}
const es = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (i) => i,
  // default resolvers
  x: (i) => i.x,
  y: (i) => i.y
};
function ka(i) {
  const t = i.split("."), e = [];
  let n = "";
  for (const s of t)
    n += s, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (e.push(n), n = "");
  return e;
}
function wa(i) {
  const t = ka(i);
  return (e) => {
    for (const n of t) {
      if (n === "")
        break;
      e = e && e[n];
    }
    return e;
  };
}
function jt(i, t) {
  return (es[t] || (es[t] = wa(t)))(i);
}
function yn(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
const Ie = (i) => typeof i < "u", Ht = (i) => typeof i == "function", is = (i, t) => {
  if (i.size !== t.size)
    return !1;
  for (const e of i)
    if (!t.has(e))
      return !1;
  return !0;
};
function Ma(i) {
  return i.type === "mouseup" || i.type === "click" || i.type === "contextmenu";
}
const K = Math.PI, X = 2 * K, Sa = X + K, yi = Number.POSITIVE_INFINITY, Pa = K / 180, tt = K / 2, Xt = K / 4, ns = K * 2 / 3, Bt = Math.log10, kt = Math.sign;
function Oe(i, t, e) {
  return Math.abs(i - t) < e;
}
function ss(i) {
  const t = Math.round(i);
  i = Oe(i, t, i / 1e3) ? t : i;
  const e = Math.pow(10, Math.floor(Bt(i))), n = i / e;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * e;
}
function Ca(i) {
  const t = [], e = Math.sqrt(i);
  let n;
  for (n = 1; n < e; n++)
    i % n === 0 && (t.push(n), t.push(i / n));
  return e === (e | 0) && t.push(e), t.sort((s, o) => s - o).pop(), t;
}
function he(i) {
  return !isNaN(parseFloat(i)) && isFinite(i);
}
function Oa(i, t) {
  const e = Math.round(i);
  return e - t <= i && e + t >= i;
}
function Oo(i, t, e) {
  let n, s, o;
  for (n = 0, s = i.length; n < s; n++)
    o = i[n][e], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function bt(i) {
  return i * (K / 180);
}
function vn(i) {
  return i * (180 / K);
}
function os(i) {
  if (!G(i))
    return;
  let t = 1, e = 0;
  for (; Math.round(i * t) / t !== i; )
    t *= 10, e++;
  return e;
}
function Do(i, t) {
  const e = t.x - i.x, n = t.y - i.y, s = Math.sqrt(e * e + n * n);
  let o = Math.atan2(n, e);
  return o < -0.5 * K && (o += X), {
    angle: o,
    distance: s
  };
}
function en(i, t) {
  return Math.sqrt(Math.pow(t.x - i.x, 2) + Math.pow(t.y - i.y, 2));
}
function Da(i, t) {
  return (i - t + Sa) % X - K;
}
function ft(i) {
  return (i % X + X) % X;
}
function ze(i, t, e, n) {
  const s = ft(i), o = ft(t), r = ft(e), a = ft(o - s), l = ft(r - s), c = ft(s - o), h = ft(s - r);
  return s === o || s === r || n && o === r || a > l && c < h;
}
function st(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function Aa(i) {
  return st(i, -32768, 32767);
}
function Tt(i, t, e, n = 1e-6) {
  return i >= Math.min(t, e) - n && i <= Math.max(t, e) + n;
}
function kn(i, t, e) {
  e = e || ((r) => i[r] < t);
  let n = i.length - 1, s = 0, o;
  for (; n - s > 1; )
    o = s + n >> 1, e(o) ? s = o : n = o;
  return {
    lo: s,
    hi: n
  };
}
const Rt = (i, t, e, n) => kn(i, e, n ? (s) => {
  const o = i[s][t];
  return o < e || o === e && i[s + 1][t] === e;
} : (s) => i[s][t] < e), Ta = (i, t, e) => kn(i, e, (n) => i[n][t] >= e);
function Ra(i, t, e) {
  let n = 0, s = i.length;
  for (; n < s && i[n] < t; )
    n++;
  for (; s > n && i[s - 1] > e; )
    s--;
  return n > 0 || s < i.length ? i.slice(n, s) : i;
}
const Ao = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Ea(i, t) {
  if (i._chartjs) {
    i._chartjs.listeners.push(t);
    return;
  }
  Object.defineProperty(i, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [
        t
      ]
    }
  }), Ao.forEach((e) => {
    const n = "_onData" + yn(e), s = i[e];
    Object.defineProperty(i, e, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const r = s.apply(this, o);
        return i._chartjs.listeners.forEach((a) => {
          typeof a[n] == "function" && a[n](...o);
        }), r;
      }
    });
  });
}
function rs(i, t) {
  const e = i._chartjs;
  if (!e)
    return;
  const n = e.listeners, s = n.indexOf(t);
  s !== -1 && n.splice(s, 1), !(n.length > 0) && (Ao.forEach((o) => {
    delete i[o];
  }), delete i._chartjs);
}
function To(i) {
  const t = new Set(i);
  return t.size === i.length ? i : Array.from(t);
}
const Ro = function() {
  return typeof window > "u" ? function(i) {
    return i();
  } : window.requestAnimationFrame;
}();
function Eo(i, t) {
  let e = [], n = !1;
  return function(...s) {
    e = s, n || (n = !0, Ro.call(window, () => {
      n = !1, i.apply(t, e);
    }));
  };
}
function La(i, t) {
  let e;
  return function(...n) {
    return t ? (clearTimeout(e), e = setTimeout(i, t, n)) : i.apply(this, n), t;
  };
}
const wn = (i) => i === "start" ? "left" : i === "end" ? "right" : "center", ot = (i, t, e) => i === "start" ? t : i === "end" ? e : (t + e) / 2, Fa = (i, t, e, n) => i === (n ? "left" : "right") ? e : i === "center" ? (t + e) / 2 : t;
function Lo(i, t, e) {
  const n = t.length;
  let s = 0, o = n;
  if (i._sorted) {
    const { iScale: r, _parsed: a } = i, l = r.axis, { min: c, max: h, minDefined: d, maxDefined: u } = r.getUserBounds();
    d && (s = st(Math.min(
      // @ts-expect-error Need to type _parsed
      Rt(a, l, c).lo,
      // @ts-expect-error Need to fix types on _lookupByKey
      e ? n : Rt(t, l, r.getPixelForValue(c)).lo
    ), 0, n - 1)), u ? o = st(Math.max(
      // @ts-expect-error Need to type _parsed
      Rt(a, r.axis, h, !0).hi + 1,
      // @ts-expect-error Need to fix types on _lookupByKey
      e ? 0 : Rt(t, l, r.getPixelForValue(h), !0).hi + 1
    ), s, n) - s : o = n - s;
  }
  return {
    start: s,
    count: o
  };
}
function Fo(i) {
  const { xScale: t, yScale: e, _scaleRanges: n } = i, s = {
    xmin: t.min,
    xmax: t.max,
    ymin: e.min,
    ymax: e.max
  };
  if (!n)
    return i._scaleRanges = s, !0;
  const o = n.xmin !== t.min || n.xmax !== t.max || n.ymin !== e.min || n.ymax !== e.max;
  return Object.assign(n, s), o;
}
const Qe = (i) => i === 0 || i === 1, as = (i, t, e) => -(Math.pow(2, 10 * (i -= 1)) * Math.sin((i - t) * X / e)), ls = (i, t, e) => Math.pow(2, -10 * i) * Math.sin((i - t) * X / e) + 1, De = {
  linear: (i) => i,
  easeInQuad: (i) => i * i,
  easeOutQuad: (i) => -i * (i - 2),
  easeInOutQuad: (i) => (i /= 0.5) < 1 ? 0.5 * i * i : -0.5 * (--i * (i - 2) - 1),
  easeInCubic: (i) => i * i * i,
  easeOutCubic: (i) => (i -= 1) * i * i + 1,
  easeInOutCubic: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i : 0.5 * ((i -= 2) * i * i + 2),
  easeInQuart: (i) => i * i * i * i,
  easeOutQuart: (i) => -((i -= 1) * i * i * i - 1),
  easeInOutQuart: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i * i : -0.5 * ((i -= 2) * i * i * i - 2),
  easeInQuint: (i) => i * i * i * i * i,
  easeOutQuint: (i) => (i -= 1) * i * i * i * i + 1,
  easeInOutQuint: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i * i * i : 0.5 * ((i -= 2) * i * i * i * i + 2),
  easeInSine: (i) => -Math.cos(i * tt) + 1,
  easeOutSine: (i) => Math.sin(i * tt),
  easeInOutSine: (i) => -0.5 * (Math.cos(K * i) - 1),
  easeInExpo: (i) => i === 0 ? 0 : Math.pow(2, 10 * (i - 1)),
  easeOutExpo: (i) => i === 1 ? 1 : -Math.pow(2, -10 * i) + 1,
  easeInOutExpo: (i) => Qe(i) ? i : i < 0.5 ? 0.5 * Math.pow(2, 10 * (i * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (i * 2 - 1)) + 2),
  easeInCirc: (i) => i >= 1 ? i : -(Math.sqrt(1 - i * i) - 1),
  easeOutCirc: (i) => Math.sqrt(1 - (i -= 1) * i),
  easeInOutCirc: (i) => (i /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - i * i) - 1) : 0.5 * (Math.sqrt(1 - (i -= 2) * i) + 1),
  easeInElastic: (i) => Qe(i) ? i : as(i, 0.075, 0.3),
  easeOutElastic: (i) => Qe(i) ? i : ls(i, 0.075, 0.3),
  easeInOutElastic(i) {
    return Qe(i) ? i : i < 0.5 ? 0.5 * as(i * 2, 0.1125, 0.45) : 0.5 + 0.5 * ls(i * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(i) {
    return i * i * ((1.70158 + 1) * i - 1.70158);
  },
  easeOutBack(i) {
    return (i -= 1) * i * ((1.70158 + 1) * i + 1.70158) + 1;
  },
  easeInOutBack(i) {
    let t = 1.70158;
    return (i /= 0.5) < 1 ? 0.5 * (i * i * (((t *= 1.525) + 1) * i - t)) : 0.5 * ((i -= 2) * i * (((t *= 1.525) + 1) * i + t) + 2);
  },
  easeInBounce: (i) => 1 - De.easeOutBounce(1 - i),
  easeOutBounce(i) {
    return i < 1 / 2.75 ? 7.5625 * i * i : i < 2 / 2.75 ? 7.5625 * (i -= 1.5 / 2.75) * i + 0.75 : i < 2.5 / 2.75 ? 7.5625 * (i -= 2.25 / 2.75) * i + 0.9375 : 7.5625 * (i -= 2.625 / 2.75) * i + 0.984375;
  },
  easeInOutBounce: (i) => i < 0.5 ? De.easeInBounce(i * 2) * 0.5 : De.easeOutBounce(i * 2 - 1) * 0.5 + 0.5
};
function Mn(i) {
  if (i && typeof i == "object") {
    const t = i.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function cs(i) {
  return Mn(i) ? i : new Le(i);
}
function Ni(i) {
  return Mn(i) ? i : new Le(i).saturate(0.5).darken(0.1).hexString();
}
const Ia = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], za = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Ba(i) {
  i.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  }), i.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (t) => t !== "onProgress" && t !== "onComplete" && t !== "fn"
  }), i.set("animations", {
    colors: {
      type: "color",
      properties: za
    },
    numbers: {
      type: "number",
      properties: Ia
    }
  }), i.describe("animations", {
    _fallback: "animation"
  }), i.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (t) => t | 0
        }
      }
    }
  });
}
function Wa(i) {
  i.set("layout", {
    autoPadding: !0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const hs = /* @__PURE__ */ new Map();
function Va(i, t) {
  t = t || {};
  const e = i + JSON.stringify(t);
  let n = hs.get(e);
  return n || (n = new Intl.NumberFormat(i, t), hs.set(e, n)), n;
}
function He(i, t, e) {
  return Va(t, e).format(i);
}
const Io = {
  values(i) {
    return U(i) ? i : "" + i;
  },
  numeric(i, t, e) {
    if (i === 0)
      return "0";
    const n = this.chart.options.locale;
    let s, o = i;
    if (e.length > 1) {
      const c = Math.max(Math.abs(e[0].value), Math.abs(e[e.length - 1].value));
      (c < 1e-4 || c > 1e15) && (s = "scientific"), o = Na(i, e);
    }
    const r = Bt(Math.abs(o)), a = isNaN(r) ? 1 : Math.max(Math.min(-1 * Math.floor(r), 20), 0), l = {
      notation: s,
      minimumFractionDigits: a,
      maximumFractionDigits: a
    };
    return Object.assign(l, this.options.ticks.format), He(i, n, l);
  },
  logarithmic(i, t, e) {
    if (i === 0)
      return "0";
    const n = e[t].significand || i / Math.pow(10, Math.floor(Bt(i)));
    return [
      1,
      2,
      3,
      5,
      10,
      15
    ].includes(n) || t > 0.8 * e.length ? Io.numeric.call(this, i, t, e) : "";
  }
};
function Na(i, t) {
  let e = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(e) >= 1 && i !== Math.floor(i) && (e = i - Math.floor(i)), e;
}
var Ci = {
  formatters: Io
};
function ja(i) {
  i.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (t, e) => e.lineWidth,
      tickColor: (t, e) => e.color,
      offset: !1
    },
    border: {
      display: !0,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: !1,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Ci.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  }), i.route("scale.ticks", "color", "", "color"), i.route("scale.grid", "color", "", "borderColor"), i.route("scale.border", "color", "", "borderColor"), i.route("scale.title", "color", "", "color"), i.describe("scale", {
    _fallback: !1,
    _scriptable: (t) => !t.startsWith("before") && !t.startsWith("after") && t !== "callback" && t !== "parser",
    _indexable: (t) => t !== "borderDash" && t !== "tickBorderDash" && t !== "dash"
  }), i.describe("scales", {
    _fallback: "scale"
  }), i.describe("scale.ticks", {
    _scriptable: (t) => t !== "backdropPadding" && t !== "callback",
    _indexable: (t) => t !== "backdropPadding"
  });
}
const ie = /* @__PURE__ */ Object.create(null), nn = /* @__PURE__ */ Object.create(null);
function Ae(i, t) {
  if (!t)
    return i;
  const e = t.split(".");
  for (let n = 0, s = e.length; n < s; ++n) {
    const o = e[n];
    i = i[o] || (i[o] = /* @__PURE__ */ Object.create(null));
  }
  return i;
}
function ji(i, t, e) {
  return typeof t == "string" ? Fe(Ae(i, t), e) : Fe(Ae(i, ""), t);
}
class Ha {
  constructor(t, e) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (n) => n.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ], this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    }, this.hover = {}, this.hoverBackgroundColor = (n, s) => Ni(s.backgroundColor), this.hoverBorderColor = (n, s) => Ni(s.borderColor), this.hoverColor = (n, s) => Ni(s.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(e);
  }
  set(t, e) {
    return ji(this, t, e);
  }
  get(t) {
    return Ae(this, t);
  }
  describe(t, e) {
    return ji(nn, t, e);
  }
  override(t, e) {
    return ji(ie, t, e);
  }
  route(t, e, n, s) {
    const o = Ae(this, t), r = Ae(this, n), a = "_" + e;
    Object.defineProperties(o, {
      [a]: {
        value: o[e],
        writable: !0
      },
      [e]: {
        enumerable: !0,
        get() {
          const l = this[a], c = r[s];
          return I(l) ? Object.assign({}, c, l) : T(l, c);
        },
        set(l) {
          this[a] = l;
        }
      }
    });
  }
  apply(t) {
    t.forEach((e) => e(this));
  }
}
var J = /* @__PURE__ */ new Ha({
  _scriptable: (i) => !i.startsWith("on"),
  _indexable: (i) => i !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
}, [
  Ba,
  Wa,
  ja
]);
function $a(i) {
  return !i || W(i.size) || W(i.family) ? null : (i.style ? i.style + " " : "") + (i.weight ? i.weight + " " : "") + i.size + "px " + i.family;
}
function vi(i, t, e, n, s) {
  let o = t[s];
  return o || (o = t[s] = i.measureText(s).width, e.push(s)), o > n && (n = o), n;
}
function Ya(i, t, e, n) {
  n = n || {};
  let s = n.data = n.data || {}, o = n.garbageCollect = n.garbageCollect || [];
  n.font !== t && (s = n.data = {}, o = n.garbageCollect = [], n.font = t), i.save(), i.font = t;
  let r = 0;
  const a = e.length;
  let l, c, h, d, u;
  for (l = 0; l < a; l++)
    if (d = e[l], d != null && !U(d))
      r = vi(i, s, o, r, d);
    else if (U(d))
      for (c = 0, h = d.length; c < h; c++)
        u = d[c], u != null && !U(u) && (r = vi(i, s, o, r, u));
  i.restore();
  const f = o.length / 2;
  if (f > e.length) {
    for (l = 0; l < f; l++)
      delete s[o[l]];
    o.splice(0, f);
  }
  return r;
}
function Kt(i, t, e) {
  const n = i.currentDevicePixelRatio, s = e !== 0 ? Math.max(e / 2, 0.5) : 0;
  return Math.round((t - s) * n) / n + s;
}
function ds(i, t) {
  t = t || i.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, i.width, i.height), t.restore();
}
function sn(i, t, e, n) {
  zo(i, t, e, n, null);
}
function zo(i, t, e, n, s) {
  let o, r, a, l, c, h, d, u;
  const f = t.pointStyle, g = t.rotation, p = t.radius;
  let b = (g || 0) * Pa;
  if (f && typeof f == "object" && (o = f.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    i.save(), i.translate(e, n), i.rotate(b), i.drawImage(f, -f.width / 2, -f.height / 2, f.width, f.height), i.restore();
    return;
  }
  if (!(isNaN(p) || p <= 0)) {
    switch (i.beginPath(), f) {
      default:
        s ? i.ellipse(e, n, s / 2, p, 0, 0, X) : i.arc(e, n, p, 0, X), i.closePath();
        break;
      case "triangle":
        h = s ? s / 2 : p, i.moveTo(e + Math.sin(b) * h, n - Math.cos(b) * p), b += ns, i.lineTo(e + Math.sin(b) * h, n - Math.cos(b) * p), b += ns, i.lineTo(e + Math.sin(b) * h, n - Math.cos(b) * p), i.closePath();
        break;
      case "rectRounded":
        c = p * 0.516, l = p - c, r = Math.cos(b + Xt) * l, d = Math.cos(b + Xt) * (s ? s / 2 - c : l), a = Math.sin(b + Xt) * l, u = Math.sin(b + Xt) * (s ? s / 2 - c : l), i.arc(e - d, n - a, c, b - K, b - tt), i.arc(e + u, n - r, c, b - tt, b), i.arc(e + d, n + a, c, b, b + tt), i.arc(e - u, n + r, c, b + tt, b + K), i.closePath();
        break;
      case "rect":
        if (!g) {
          l = Math.SQRT1_2 * p, h = s ? s / 2 : l, i.rect(e - h, n - l, 2 * h, 2 * l);
          break;
        }
        b += Xt;
      case "rectRot":
        d = Math.cos(b) * (s ? s / 2 : p), r = Math.cos(b) * p, a = Math.sin(b) * p, u = Math.sin(b) * (s ? s / 2 : p), i.moveTo(e - d, n - a), i.lineTo(e + u, n - r), i.lineTo(e + d, n + a), i.lineTo(e - u, n + r), i.closePath();
        break;
      case "crossRot":
        b += Xt;
      case "cross":
        d = Math.cos(b) * (s ? s / 2 : p), r = Math.cos(b) * p, a = Math.sin(b) * p, u = Math.sin(b) * (s ? s / 2 : p), i.moveTo(e - d, n - a), i.lineTo(e + d, n + a), i.moveTo(e + u, n - r), i.lineTo(e - u, n + r);
        break;
      case "star":
        d = Math.cos(b) * (s ? s / 2 : p), r = Math.cos(b) * p, a = Math.sin(b) * p, u = Math.sin(b) * (s ? s / 2 : p), i.moveTo(e - d, n - a), i.lineTo(e + d, n + a), i.moveTo(e + u, n - r), i.lineTo(e - u, n + r), b += Xt, d = Math.cos(b) * (s ? s / 2 : p), r = Math.cos(b) * p, a = Math.sin(b) * p, u = Math.sin(b) * (s ? s / 2 : p), i.moveTo(e - d, n - a), i.lineTo(e + d, n + a), i.moveTo(e + u, n - r), i.lineTo(e - u, n + r);
        break;
      case "line":
        r = s ? s / 2 : Math.cos(b) * p, a = Math.sin(b) * p, i.moveTo(e - r, n - a), i.lineTo(e + r, n + a);
        break;
      case "dash":
        i.moveTo(e, n), i.lineTo(e + Math.cos(b) * (s ? s / 2 : p), n + Math.sin(b) * p);
        break;
      case !1:
        i.closePath();
        break;
    }
    i.fill(), t.borderWidth > 0 && i.stroke();
  }
}
function Et(i, t, e) {
  return e = e || 0.5, !t || i && i.x > t.left - e && i.x < t.right + e && i.y > t.top - e && i.y < t.bottom + e;
}
function Oi(i, t) {
  i.save(), i.beginPath(), i.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), i.clip();
}
function Di(i) {
  i.restore();
}
function Ua(i, t, e, n, s) {
  if (!t)
    return i.lineTo(e.x, e.y);
  if (s === "middle") {
    const o = (t.x + e.x) / 2;
    i.lineTo(o, t.y), i.lineTo(o, e.y);
  } else
    s === "after" != !!n ? i.lineTo(t.x, e.y) : i.lineTo(e.x, t.y);
  i.lineTo(e.x, e.y);
}
function Xa(i, t, e, n) {
  if (!t)
    return i.lineTo(e.x, e.y);
  i.bezierCurveTo(n ? t.cp1x : t.cp2x, n ? t.cp1y : t.cp2y, n ? e.cp2x : e.cp1x, n ? e.cp2y : e.cp1y, e.x, e.y);
}
function Ka(i, t) {
  t.translation && i.translate(t.translation[0], t.translation[1]), W(t.rotation) || i.rotate(t.rotation), t.color && (i.fillStyle = t.color), t.textAlign && (i.textAlign = t.textAlign), t.textBaseline && (i.textBaseline = t.textBaseline);
}
function qa(i, t, e, n, s) {
  if (s.strikethrough || s.underline) {
    const o = i.measureText(n), r = t - o.actualBoundingBoxLeft, a = t + o.actualBoundingBoxRight, l = e - o.actualBoundingBoxAscent, c = e + o.actualBoundingBoxDescent, h = s.strikethrough ? (l + c) / 2 : c;
    i.strokeStyle = i.fillStyle, i.beginPath(), i.lineWidth = s.decorationWidth || 2, i.moveTo(r, h), i.lineTo(a, h), i.stroke();
  }
}
function Ga(i, t) {
  const e = i.fillStyle;
  i.fillStyle = t.color, i.fillRect(t.left, t.top, t.width, t.height), i.fillStyle = e;
}
function ne(i, t, e, n, s, o = {}) {
  const r = U(t) ? t : [
    t
  ], a = o.strokeWidth > 0 && o.strokeColor !== "";
  let l, c;
  for (i.save(), i.font = s.string, Ka(i, o), l = 0; l < r.length; ++l)
    c = r[l], o.backdrop && Ga(i, o.backdrop), a && (o.strokeColor && (i.strokeStyle = o.strokeColor), W(o.strokeWidth) || (i.lineWidth = o.strokeWidth), i.strokeText(c, e, n, o.maxWidth)), i.fillText(c, e, n, o.maxWidth), qa(i, e, n, c, o), n += Number(s.lineHeight);
  i.restore();
}
function Be(i, t) {
  const { x: e, y: n, w: s, h: o, radius: r } = t;
  i.arc(e + r.topLeft, n + r.topLeft, r.topLeft, 1.5 * K, K, !0), i.lineTo(e, n + o - r.bottomLeft), i.arc(e + r.bottomLeft, n + o - r.bottomLeft, r.bottomLeft, K, tt, !0), i.lineTo(e + s - r.bottomRight, n + o), i.arc(e + s - r.bottomRight, n + o - r.bottomRight, r.bottomRight, tt, 0, !0), i.lineTo(e + s, n + r.topRight), i.arc(e + s - r.topRight, n + r.topRight, r.topRight, 0, -tt, !0), i.lineTo(e + r.topLeft, n);
}
const Ja = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Za = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Qa(i, t) {
  const e = ("" + i).match(Ja);
  if (!e || e[1] === "normal")
    return t * 1.2;
  switch (i = +e[2], e[3]) {
    case "px":
      return i;
    case "%":
      i /= 100;
      break;
  }
  return t * i;
}
const tl = (i) => +i || 0;
function Sn(i, t) {
  const e = {}, n = I(t), s = n ? Object.keys(t) : t, o = I(i) ? n ? (r) => T(i[r], i[t[r]]) : (r) => i[r] : () => i;
  for (const r of s)
    e[r] = tl(o(r));
  return e;
}
function Bo(i) {
  return Sn(i, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function te(i) {
  return Sn(i, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function at(i) {
  const t = Bo(i);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function nt(i, t) {
  i = i || {}, t = t || J.font;
  let e = T(i.size, t.size);
  typeof e == "string" && (e = parseInt(e, 10));
  let n = T(i.style, t.style);
  n && !("" + n).match(Za) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
  const s = {
    family: T(i.family, t.family),
    lineHeight: Qa(T(i.lineHeight, t.lineHeight), e),
    size: e,
    style: n,
    weight: T(i.weight, t.weight),
    string: ""
  };
  return s.string = $a(s), s;
}
function ke(i, t, e, n) {
  let s = !0, o, r, a;
  for (o = 0, r = i.length; o < r; ++o)
    if (a = i[o], a !== void 0 && (t !== void 0 && typeof a == "function" && (a = a(t), s = !1), e !== void 0 && U(a) && (a = a[e % a.length], s = !1), a !== void 0))
      return n && !s && (n.cacheable = !1), a;
}
function el(i, t, e) {
  const { min: n, max: s } = i, o = Po(t, (s - n) / 2), r = (a, l) => e && a === 0 ? 0 : a + l;
  return {
    min: r(n, -Math.abs(o)),
    max: r(s, o)
  };
}
function $t(i, t) {
  return Object.assign(Object.create(i), t);
}
function Pn(i, t = [
  ""
], e, n, s = () => i[0]) {
  const o = e || i;
  typeof n > "u" && (n = jo("_fallback", i));
  const r = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: i,
    _rootScopes: o,
    _fallback: n,
    _getTarget: s,
    override: (a) => Pn([
      a,
      ...i
    ], t, o, n)
  };
  return new Proxy(r, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(a, l) {
      return delete a[l], delete a._keys, delete i[0][l], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(a, l) {
      return Vo(a, l, () => cl(l, t, i, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(a, l) {
      return Reflect.getOwnPropertyDescriptor(a._scopes[0], l);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(i[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(a, l) {
      return fs(a).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(a) {
      return fs(a);
    },
    /**
    * A trap for setting property values.
    */
    set(a, l, c) {
      const h = a._storage || (a._storage = s());
      return a[l] = h[l] = c, delete a._keys, !0;
    }
  });
}
function de(i, t, e, n) {
  const s = {
    _cacheable: !1,
    _proxy: i,
    _context: t,
    _subProxy: e,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Wo(i, n),
    setContext: (o) => de(i, o, e, n),
    override: (o) => de(i.override(o), t, e, n)
  };
  return new Proxy(s, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, r) {
      return delete o[r], delete i[r], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, r, a) {
      return Vo(o, r, () => nl(o, r, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(o, r) {
      return o._descriptors.allKeys ? Reflect.has(i, r) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(i, r);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(i);
    },
    /**
    * A trap for the in operator.
    */
    has(o, r) {
      return Reflect.has(i, r);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(i);
    },
    /**
    * A trap for setting property values.
    */
    set(o, r, a) {
      return i[r] = a, delete o[r], !0;
    }
  });
}
function Wo(i, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: e = t.scriptable, _indexable: n = t.indexable, _allKeys: s = t.allKeys } = i;
  return {
    allKeys: s,
    scriptable: e,
    indexable: n,
    isScriptable: Ht(e) ? e : () => e,
    isIndexable: Ht(n) ? n : () => n
  };
}
const il = (i, t) => i ? i + yn(t) : t, Cn = (i, t) => I(t) && i !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Vo(i, t, e) {
  if (Object.prototype.hasOwnProperty.call(i, t))
    return i[t];
  const n = e();
  return i[t] = n, n;
}
function nl(i, t, e) {
  const { _proxy: n, _context: s, _subProxy: o, _descriptors: r } = i;
  let a = n[t];
  return Ht(a) && r.isScriptable(t) && (a = sl(t, a, i, e)), U(a) && a.length && (a = ol(t, a, i, r.isIndexable)), Cn(t, a) && (a = de(a, s, o && o[t], r)), a;
}
function sl(i, t, e, n) {
  const { _proxy: s, _context: o, _subProxy: r, _stack: a } = e;
  if (a.has(i))
    throw new Error("Recursion detected: " + Array.from(a).join("->") + "->" + i);
  a.add(i);
  let l = t(o, r || n);
  return a.delete(i), Cn(i, l) && (l = On(s._scopes, s, i, l)), l;
}
function ol(i, t, e, n) {
  const { _proxy: s, _context: o, _subProxy: r, _descriptors: a } = e;
  if (typeof o.index < "u" && n(i))
    return t[o.index % t.length];
  if (I(t[0])) {
    const l = t, c = s._scopes.filter((h) => h !== l);
    t = [];
    for (const h of l) {
      const d = On(c, s, i, h);
      t.push(de(d, o, r && r[i], a));
    }
  }
  return t;
}
function No(i, t, e) {
  return Ht(i) ? i(t, e) : i;
}
const rl = (i, t) => i === !0 ? t : typeof i == "string" ? jt(t, i) : void 0;
function al(i, t, e, n, s) {
  for (const o of t) {
    const r = rl(e, o);
    if (r) {
      i.add(r);
      const a = No(r._fallback, e, s);
      if (typeof a < "u" && a !== e && a !== n)
        return a;
    } else if (r === !1 && typeof n < "u" && e !== n)
      return null;
  }
  return !1;
}
function On(i, t, e, n) {
  const s = t._rootScopes, o = No(t._fallback, e, n), r = [
    ...i,
    ...s
  ], a = /* @__PURE__ */ new Set();
  a.add(n);
  let l = us(a, r, e, o || e, n);
  return l === null || typeof o < "u" && o !== e && (l = us(a, r, o, l, n), l === null) ? !1 : Pn(Array.from(a), [
    ""
  ], s, o, () => ll(t, e, n));
}
function us(i, t, e, n, s) {
  for (; e; )
    e = al(i, t, e, n, s);
  return e;
}
function ll(i, t, e) {
  const n = i._getTarget();
  t in n || (n[t] = {});
  const s = n[t];
  return U(s) && I(e) ? e : s || {};
}
function cl(i, t, e, n) {
  let s;
  for (const o of t)
    if (s = jo(il(o, i), e), typeof s < "u")
      return Cn(i, s) ? On(e, n, i, s) : s;
}
function jo(i, t) {
  for (const e of t) {
    if (!e)
      continue;
    const n = e[i];
    if (typeof n < "u")
      return n;
  }
}
function fs(i) {
  let t = i._keys;
  return t || (t = i._keys = hl(i._scopes)), t;
}
function hl(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i)
    for (const n of Object.keys(e).filter((s) => !s.startsWith("_")))
      t.add(n);
  return Array.from(t);
}
function Ho(i, t, e, n) {
  const { iScale: s } = i, { key: o = "r" } = this._parsing, r = new Array(n);
  let a, l, c, h;
  for (a = 0, l = n; a < l; ++a)
    c = a + e, h = t[c], r[a] = {
      r: s.parse(jt(h, o), c)
    };
  return r;
}
const dl = Number.EPSILON || 1e-14, ue = (i, t) => t < i.length && !i[t].skip && i[t], $o = (i) => i === "x" ? "y" : "x";
function ul(i, t, e, n) {
  const s = i.skip ? t : i, o = t, r = e.skip ? t : e, a = en(o, s), l = en(r, o);
  let c = a / (a + l), h = l / (a + l);
  c = isNaN(c) ? 0 : c, h = isNaN(h) ? 0 : h;
  const d = n * c, u = n * h;
  return {
    previous: {
      x: o.x - d * (r.x - s.x),
      y: o.y - d * (r.y - s.y)
    },
    next: {
      x: o.x + u * (r.x - s.x),
      y: o.y + u * (r.y - s.y)
    }
  };
}
function fl(i, t, e) {
  const n = i.length;
  let s, o, r, a, l, c = ue(i, 0);
  for (let h = 0; h < n - 1; ++h)
    if (l = c, c = ue(i, h + 1), !(!l || !c)) {
      if (Oe(t[h], 0, dl)) {
        e[h] = e[h + 1] = 0;
        continue;
      }
      s = e[h] / t[h], o = e[h + 1] / t[h], a = Math.pow(s, 2) + Math.pow(o, 2), !(a <= 9) && (r = 3 / Math.sqrt(a), e[h] = s * r * t[h], e[h + 1] = o * r * t[h]);
    }
}
function gl(i, t, e = "x") {
  const n = $o(e), s = i.length;
  let o, r, a, l = ue(i, 0);
  for (let c = 0; c < s; ++c) {
    if (r = a, a = l, l = ue(i, c + 1), !a)
      continue;
    const h = a[e], d = a[n];
    r && (o = (h - r[e]) / 3, a[`cp1${e}`] = h - o, a[`cp1${n}`] = d - o * t[c]), l && (o = (l[e] - h) / 3, a[`cp2${e}`] = h + o, a[`cp2${n}`] = d + o * t[c]);
  }
}
function pl(i, t = "x") {
  const e = $o(t), n = i.length, s = Array(n).fill(0), o = Array(n);
  let r, a, l, c = ue(i, 0);
  for (r = 0; r < n; ++r)
    if (a = l, l = c, c = ue(i, r + 1), !!l) {
      if (c) {
        const h = c[t] - l[t];
        s[r] = h !== 0 ? (c[e] - l[e]) / h : 0;
      }
      o[r] = a ? c ? kt(s[r - 1]) !== kt(s[r]) ? 0 : (s[r - 1] + s[r]) / 2 : s[r - 1] : s[r];
    }
  fl(i, s, o), gl(i, o, t);
}
function ti(i, t, e) {
  return Math.max(Math.min(i, e), t);
}
function ml(i, t) {
  let e, n, s, o, r, a = Et(i[0], t);
  for (e = 0, n = i.length; e < n; ++e)
    r = o, o = a, a = e < n - 1 && Et(i[e + 1], t), o && (s = i[e], r && (s.cp1x = ti(s.cp1x, t.left, t.right), s.cp1y = ti(s.cp1y, t.top, t.bottom)), a && (s.cp2x = ti(s.cp2x, t.left, t.right), s.cp2y = ti(s.cp2y, t.top, t.bottom)));
}
function bl(i, t, e, n, s) {
  let o, r, a, l;
  if (t.spanGaps && (i = i.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    pl(i, s);
  else {
    let c = n ? i[i.length - 1] : i[0];
    for (o = 0, r = i.length; o < r; ++o)
      a = i[o], l = ul(c, a, i[Math.min(o + 1, r - (n ? 0 : 1)) % r], t.tension), a.cp1x = l.previous.x, a.cp1y = l.previous.y, a.cp2x = l.next.x, a.cp2y = l.next.y, c = a;
  }
  t.capBezierPoints && ml(i, e);
}
function Dn() {
  return typeof window < "u" && typeof document < "u";
}
function An(i) {
  let t = i.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function ki(i, t, e) {
  let n;
  return typeof i == "string" ? (n = parseInt(i, 10), i.indexOf("%") !== -1 && (n = n / 100 * t.parentNode[e])) : n = i, n;
}
const Ai = (i) => i.ownerDocument.defaultView.getComputedStyle(i, null);
function _l(i, t) {
  return Ai(i).getPropertyValue(t);
}
const xl = [
  "top",
  "right",
  "bottom",
  "left"
];
function ee(i, t, e) {
  const n = {};
  e = e ? "-" + e : "";
  for (let s = 0; s < 4; s++) {
    const o = xl[s];
    n[o] = parseFloat(i[t + "-" + o + e]) || 0;
  }
  return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}
const yl = (i, t, e) => (i > 0 || t > 0) && (!e || !e.shadowRoot);
function vl(i, t) {
  const e = i.touches, n = e && e.length ? e[0] : i, { offsetX: s, offsetY: o } = n;
  let r = !1, a, l;
  if (yl(s, o, i.target))
    a = s, l = o;
  else {
    const c = t.getBoundingClientRect();
    a = n.clientX - c.left, l = n.clientY - c.top, r = !0;
  }
  return {
    x: a,
    y: l,
    box: r
  };
}
function Jt(i, t) {
  if ("native" in i)
    return i;
  const { canvas: e, currentDevicePixelRatio: n } = t, s = Ai(e), o = s.boxSizing === "border-box", r = ee(s, "padding"), a = ee(s, "border", "width"), { x: l, y: c, box: h } = vl(i, e), d = r.left + (h && a.left), u = r.top + (h && a.top);
  let { width: f, height: g } = t;
  return o && (f -= r.width + a.width, g -= r.height + a.height), {
    x: Math.round((l - d) / f * e.width / n),
    y: Math.round((c - u) / g * e.height / n)
  };
}
function kl(i, t, e) {
  let n, s;
  if (t === void 0 || e === void 0) {
    const o = An(i);
    if (!o)
      t = i.clientWidth, e = i.clientHeight;
    else {
      const r = o.getBoundingClientRect(), a = Ai(o), l = ee(a, "border", "width"), c = ee(a, "padding");
      t = r.width - c.width - l.width, e = r.height - c.height - l.height, n = ki(a.maxWidth, o, "clientWidth"), s = ki(a.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: e,
    maxWidth: n || yi,
    maxHeight: s || yi
  };
}
const ei = (i) => Math.round(i * 10) / 10;
function wl(i, t, e, n) {
  const s = Ai(i), o = ee(s, "margin"), r = ki(s.maxWidth, i, "clientWidth") || yi, a = ki(s.maxHeight, i, "clientHeight") || yi, l = kl(i, t, e);
  let { width: c, height: h } = l;
  if (s.boxSizing === "content-box") {
    const u = ee(s, "border", "width"), f = ee(s, "padding");
    c -= f.width + u.width, h -= f.height + u.height;
  }
  return c = Math.max(0, c - o.width), h = Math.max(0, n ? c / n : h - o.height), c = ei(Math.min(c, r, l.maxWidth)), h = ei(Math.min(h, a, l.maxHeight)), c && !h && (h = ei(c / 2)), (t !== void 0 || e !== void 0) && n && l.height && h > l.height && (h = l.height, c = ei(Math.floor(h * n))), {
    width: c,
    height: h
  };
}
function gs(i, t, e) {
  const n = t || 1, s = Math.floor(i.height * n), o = Math.floor(i.width * n);
  i.height = Math.floor(i.height), i.width = Math.floor(i.width);
  const r = i.canvas;
  return r.style && (e || !r.style.height && !r.style.width) && (r.style.height = `${i.height}px`, r.style.width = `${i.width}px`), i.currentDevicePixelRatio !== n || r.height !== s || r.width !== o ? (i.currentDevicePixelRatio = n, r.height = s, r.width = o, i.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}
const Ml = function() {
  let i = !1;
  try {
    const t = {
      get passive() {
        return i = !0, !1;
      }
    };
    Dn() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return i;
}();
function ps(i, t) {
  const e = _l(i, t), n = e && e.match(/^(\d+)(\.\d+)?px$/);
  return n ? +n[1] : void 0;
}
function Zt(i, t, e, n) {
  return {
    x: i.x + e * (t.x - i.x),
    y: i.y + e * (t.y - i.y)
  };
}
function Sl(i, t, e, n) {
  return {
    x: i.x + e * (t.x - i.x),
    y: n === "middle" ? e < 0.5 ? i.y : t.y : n === "after" ? e < 1 ? i.y : t.y : e > 0 ? t.y : i.y
  };
}
function Pl(i, t, e, n) {
  const s = {
    x: i.cp2x,
    y: i.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, r = Zt(i, s, e), a = Zt(s, o, e), l = Zt(o, t, e), c = Zt(r, a, e), h = Zt(a, l, e);
  return Zt(c, h, e);
}
const Cl = function(i, t) {
  return {
    x(e) {
      return i + i + t - e;
    },
    setWidth(e) {
      t = e;
    },
    textAlign(e) {
      return e === "center" ? e : e === "right" ? "left" : "right";
    },
    xPlus(e, n) {
      return e - n;
    },
    leftForLtr(e, n) {
      return e - n;
    }
  };
}, Ol = function() {
  return {
    x(i) {
      return i;
    },
    setWidth(i) {
    },
    textAlign(i) {
      return i;
    },
    xPlus(i, t) {
      return i + t;
    },
    leftForLtr(i, t) {
      return i;
    }
  };
};
function ce(i, t, e) {
  return i ? Cl(t, e) : Ol();
}
function Yo(i, t) {
  let e, n;
  (t === "ltr" || t === "rtl") && (e = i.canvas.style, n = [
    e.getPropertyValue("direction"),
    e.getPropertyPriority("direction")
  ], e.setProperty("direction", t, "important"), i.prevTextDirection = n);
}
function Uo(i, t) {
  t !== void 0 && (delete i.prevTextDirection, i.canvas.style.setProperty("direction", t[0], t[1]));
}
function Xo(i) {
  return i === "angle" ? {
    between: ze,
    compare: Da,
    normalize: ft
  } : {
    between: Tt,
    compare: (t, e) => t - e,
    normalize: (t) => t
  };
}
function ms({ start: i, end: t, count: e, loop: n, style: s }) {
  return {
    start: i % e,
    end: t % e,
    loop: n && (t - i + 1) % e === 0,
    style: s
  };
}
function Dl(i, t, e) {
  const { property: n, start: s, end: o } = e, { between: r, normalize: a } = Xo(n), l = t.length;
  let { start: c, end: h, loop: d } = i, u, f;
  if (d) {
    for (c += l, h += l, u = 0, f = l; u < f && r(a(t[c % l][n]), s, o); ++u)
      c--, h--;
    c %= l, h %= l;
  }
  return h < c && (h += l), {
    start: c,
    end: h,
    loop: d,
    style: i.style
  };
}
function Ko(i, t, e) {
  if (!e)
    return [
      i
    ];
  const { property: n, start: s, end: o } = e, r = t.length, { compare: a, between: l, normalize: c } = Xo(n), { start: h, end: d, loop: u, style: f } = Dl(i, t, e), g = [];
  let p = !1, b = null, _, x, k;
  const v = () => l(s, k, _) && a(s, k) !== 0, y = () => a(o, _) === 0 || l(o, k, _), S = () => p || v(), P = () => !p || y();
  for (let C = h, D = h; C <= d; ++C)
    x = t[C % r], !x.skip && (_ = c(x[n]), _ !== k && (p = l(_, s, o), b === null && S() && (b = a(_, s) === 0 ? C : D), b !== null && P() && (g.push(ms({
      start: b,
      end: C,
      loop: u,
      count: r,
      style: f
    })), b = null), D = C, k = _));
  return b !== null && g.push(ms({
    start: b,
    end: d,
    loop: u,
    count: r,
    style: f
  })), g;
}
function qo(i, t) {
  const e = [], n = i.segments;
  for (let s = 0; s < n.length; s++) {
    const o = Ko(n[s], i.points, t);
    o.length && e.push(...o);
  }
  return e;
}
function Al(i, t, e, n) {
  let s = 0, o = t - 1;
  if (e && !n)
    for (; s < t && !i[s].skip; )
      s++;
  for (; s < t && i[s].skip; )
    s++;
  for (s %= t, e && (o += s); o > s && i[o % t].skip; )
    o--;
  return o %= t, {
    start: s,
    end: o
  };
}
function Tl(i, t, e, n) {
  const s = i.length, o = [];
  let r = t, a = i[t], l;
  for (l = t + 1; l <= e; ++l) {
    const c = i[l % s];
    c.skip || c.stop ? a.skip || (n = !1, o.push({
      start: t % s,
      end: (l - 1) % s,
      loop: n
    }), t = r = c.stop ? l : null) : (r = l, a.skip && (t = l)), a = c;
  }
  return r !== null && o.push({
    start: t % s,
    end: r % s,
    loop: n
  }), o;
}
function Rl(i, t) {
  const e = i.points, n = i.options.spanGaps, s = e.length;
  if (!s)
    return [];
  const o = !!i._loop, { start: r, end: a } = Al(e, s, o, n);
  if (n === !0)
    return bs(i, [
      {
        start: r,
        end: a,
        loop: o
      }
    ], e, t);
  const l = a < r ? a + s : a, c = !!i._fullLoop && r === 0 && a === s - 1;
  return bs(i, Tl(e, r, l, c), e, t);
}
function bs(i, t, e, n) {
  return !n || !n.setContext || !e ? t : El(i, t, e, n);
}
function El(i, t, e, n) {
  const s = i._chart.getContext(), o = _s(i.options), { _datasetIndex: r, options: { spanGaps: a } } = i, l = e.length, c = [];
  let h = o, d = t[0].start, u = d;
  function f(g, p, b, _) {
    const x = a ? -1 : 1;
    if (g !== p) {
      for (g += l; e[g % l].skip; )
        g -= x;
      for (; e[p % l].skip; )
        p += x;
      g % l !== p % l && (c.push({
        start: g % l,
        end: p % l,
        loop: b,
        style: _
      }), h = _, d = p % l);
    }
  }
  for (const g of t) {
    d = a ? d : g.start;
    let p = e[d % l], b;
    for (u = d + 1; u <= g.end; u++) {
      const _ = e[u % l];
      b = _s(n.setContext($t(s, {
        type: "segment",
        p0: p,
        p1: _,
        p0DataIndex: (u - 1) % l,
        p1DataIndex: u % l,
        datasetIndex: r
      }))), Ll(b, h) && f(d, u - 1, g.loop, h), p = _, h = b;
    }
    d < u - 1 && f(d, u - 1, g.loop, h);
  }
  return c;
}
function _s(i) {
  return {
    backgroundColor: i.backgroundColor,
    borderCapStyle: i.borderCapStyle,
    borderDash: i.borderDash,
    borderDashOffset: i.borderDashOffset,
    borderJoinStyle: i.borderJoinStyle,
    borderWidth: i.borderWidth,
    borderColor: i.borderColor
  };
}
function Ll(i, t) {
  if (!t)
    return !1;
  const e = [], n = function(s, o) {
    return Mn(o) ? (e.includes(o) || e.push(o), e.indexOf(o)) : o;
  };
  return JSON.stringify(i, n) !== JSON.stringify(t, n);
}
/*!
 * Chart.js v4.4.2
 * https://www.chartjs.org
 * (c) 2024 Chart.js Contributors
 * Released under the MIT License
 */
class Fl {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, e, n, s) {
    const o = e.listeners[s], r = e.duration;
    o.forEach((a) => a({
      chart: t,
      initial: e.initial,
      numSteps: r,
      currentStep: Math.min(n - e.start, r)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Ro.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let e = 0;
    this._charts.forEach((n, s) => {
      if (!n.running || !n.items.length)
        return;
      const o = n.items;
      let r = o.length - 1, a = !1, l;
      for (; r >= 0; --r)
        l = o[r], l._active ? (l._total > n.duration && (n.duration = l._total), l.tick(t), a = !0) : (o[r] = o[o.length - 1], o.pop());
      a && (s.draw(), this._notify(s, n, t, "progress")), o.length || (n.running = !1, this._notify(s, n, t, "complete"), n.initial = !1), e += o.length;
    }), this._lastDate = t, e === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const e = this._charts;
    let n = e.get(t);
    return n || (n = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, e.set(t, n)), n;
  }
  listen(t, e, n) {
    this._getAnims(t).listeners[e].push(n);
  }
  add(t, e) {
    !e || !e.length || this._getAnims(t).items.push(...e);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const e = this._charts.get(t);
    e && (e.running = !0, e.start = Date.now(), e.duration = e.items.reduce((n, s) => Math.max(n, s._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const e = this._charts.get(t);
    return !(!e || !e.running || !e.items.length);
  }
  stop(t) {
    const e = this._charts.get(t);
    if (!e || !e.items.length)
      return;
    const n = e.items;
    let s = n.length - 1;
    for (; s >= 0; --s)
      n[s].cancel();
    e.items = [], this._notify(t, e, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var Ot = /* @__PURE__ */ new Fl();
const xs = "transparent", Il = {
  boolean(i, t, e) {
    return e > 0.5 ? t : i;
  },
  color(i, t, e) {
    const n = cs(i || xs), s = n.valid && cs(t || xs);
    return s && s.valid ? s.mix(n, e).hexString() : t;
  },
  number(i, t, e) {
    return i + (t - i) * e;
  }
};
class zl {
  constructor(t, e, n, s) {
    const o = e[n];
    s = ke([
      t.to,
      s,
      o,
      t.from
    ]);
    const r = ke([
      t.from,
      o,
      s
    ]);
    this._active = !0, this._fn = t.fn || Il[t.type || typeof r], this._easing = De[t.easing] || De.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = e, this._prop = n, this._from = r, this._to = s, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, e, n) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop], o = n - this._start, r = this._duration - o;
      this._start = n, this._duration = Math.floor(Math.max(r, t.duration)), this._total += o, this._loop = !!t.loop, this._to = ke([
        t.to,
        e,
        s,
        t.from
      ]), this._from = ke([
        t.from,
        s,
        e
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const e = t - this._start, n = this._duration, s = this._prop, o = this._from, r = this._loop, a = this._to;
    let l;
    if (this._active = o !== a && (r || e < n), !this._active) {
      this._target[s] = a, this._notify(!0);
      return;
    }
    if (e < 0) {
      this._target[s] = o;
      return;
    }
    l = e / n % 2, l = r && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[s] = this._fn(o, a, l);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((e, n) => {
      t.push({
        res: e,
        rej: n
      });
    });
  }
  _notify(t) {
    const e = t ? "res" : "rej", n = this._promises || [];
    for (let s = 0; s < n.length; s++)
      n[s][e]();
  }
}
class Go {
  constructor(t, e) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(e);
  }
  configure(t) {
    if (!I(t))
      return;
    const e = Object.keys(J.animation), n = this._properties;
    Object.getOwnPropertyNames(t).forEach((s) => {
      const o = t[s];
      if (!I(o))
        return;
      const r = {};
      for (const a of e)
        r[a] = o[a];
      (U(o.properties) && o.properties || [
        s
      ]).forEach((a) => {
        (a === s || !n.has(a)) && n.set(a, r);
      });
    });
  }
  _animateOptions(t, e) {
    const n = e.options, s = Wl(t, n);
    if (!s)
      return [];
    const o = this._createAnimations(s, n);
    return n.$shared && Bl(t.options.$animations, n).then(() => {
      t.options = n;
    }, () => {
    }), o;
  }
  _createAnimations(t, e) {
    const n = this._properties, s = [], o = t.$animations || (t.$animations = {}), r = Object.keys(e), a = Date.now();
    let l;
    for (l = r.length - 1; l >= 0; --l) {
      const c = r[l];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        s.push(...this._animateOptions(t, e));
        continue;
      }
      const h = e[c];
      let d = o[c];
      const u = n.get(c);
      if (d)
        if (u && d.active()) {
          d.update(u, h, a);
          continue;
        } else
          d.cancel();
      if (!u || !u.duration) {
        t[c] = h;
        continue;
      }
      o[c] = d = new zl(u, t, c, h), s.push(d);
    }
    return s;
  }
  update(t, e) {
    if (this._properties.size === 0) {
      Object.assign(t, e);
      return;
    }
    const n = this._createAnimations(t, e);
    if (n.length)
      return Ot.add(this._chart, n), !0;
  }
}
function Bl(i, t) {
  const e = [], n = Object.keys(t);
  for (let s = 0; s < n.length; s++) {
    const o = i[n[s]];
    o && o.active() && e.push(o.wait());
  }
  return Promise.all(e);
}
function Wl(i, t) {
  if (!t)
    return;
  let e = i.options;
  if (!e) {
    i.options = t;
    return;
  }
  return e.$shared && (i.options = e = Object.assign({}, e, {
    $shared: !1,
    $animations: {}
  })), e;
}
function ys(i, t) {
  const e = i && i.options || {}, n = e.reverse, s = e.min === void 0 ? t : 0, o = e.max === void 0 ? t : 0;
  return {
    start: n ? o : s,
    end: n ? s : o
  };
}
function Vl(i, t, e) {
  if (e === !1)
    return !1;
  const n = ys(i, e), s = ys(t, e);
  return {
    top: s.end,
    right: n.end,
    bottom: s.start,
    left: n.start
  };
}
function Nl(i) {
  let t, e, n, s;
  return I(i) ? (t = i.top, e = i.right, n = i.bottom, s = i.left) : t = e = n = s = i, {
    top: t,
    right: e,
    bottom: n,
    left: s,
    disabled: i === !1
  };
}
function Jo(i, t) {
  const e = [], n = i._getSortedDatasetMetas(t);
  let s, o;
  for (s = 0, o = n.length; s < o; ++s)
    e.push(n[s].index);
  return e;
}
function vs(i, t, e, n = {}) {
  const s = i.keys, o = n.mode === "single";
  let r, a, l, c;
  if (t !== null) {
    for (r = 0, a = s.length; r < a; ++r) {
      if (l = +s[r], l === e) {
        if (n.all)
          continue;
        break;
      }
      c = i.values[l], G(c) && (o || t === 0 || kt(t) === kt(c)) && (t += c);
    }
    return t;
  }
}
function jl(i) {
  const t = Object.keys(i), e = new Array(t.length);
  let n, s, o;
  for (n = 0, s = t.length; n < s; ++n)
    o = t[n], e[n] = {
      x: o,
      y: i[o]
    };
  return e;
}
function ks(i, t) {
  const e = i && i.options.stacked;
  return e || e === void 0 && t.stack !== void 0;
}
function Hl(i, t, e) {
  return `${i.id}.${t.id}.${e.stack || e.type}`;
}
function $l(i) {
  const { min: t, max: e, minDefined: n, maxDefined: s } = i.getUserBounds();
  return {
    min: n ? t : Number.NEGATIVE_INFINITY,
    max: s ? e : Number.POSITIVE_INFINITY
  };
}
function Yl(i, t, e) {
  const n = i[t] || (i[t] = {});
  return n[e] || (n[e] = {});
}
function ws(i, t, e, n) {
  for (const s of t.getMatchingVisibleMetas(n).reverse()) {
    const o = i[s.index];
    if (e && o > 0 || !e && o < 0)
      return s.index;
  }
  return null;
}
function Ms(i, t) {
  const { chart: e, _cachedMeta: n } = i, s = e._stacks || (e._stacks = {}), { iScale: o, vScale: r, index: a } = n, l = o.axis, c = r.axis, h = Hl(o, r, n), d = t.length;
  let u;
  for (let f = 0; f < d; ++f) {
    const g = t[f], { [l]: p, [c]: b } = g, _ = g._stacks || (g._stacks = {});
    u = _[c] = Yl(s, h, p), u[a] = b, u._top = ws(u, r, !0, n.type), u._bottom = ws(u, r, !1, n.type);
    const x = u._visualValues || (u._visualValues = {});
    x[a] = b;
  }
}
function Hi(i, t) {
  const e = i.scales;
  return Object.keys(e).filter((n) => e[n].axis === t).shift();
}
function Ul(i, t) {
  return $t(i, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Xl(i, t, e) {
  return $t(i, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: e,
    index: t,
    mode: "default",
    type: "data"
  });
}
function me(i, t) {
  const e = i.controller.index, n = i.vScale && i.vScale.axis;
  if (n) {
    t = t || i._parsed;
    for (const s of t) {
      const o = s._stacks;
      if (!o || o[n] === void 0 || o[n][e] === void 0)
        return;
      delete o[n][e], o[n]._visualValues !== void 0 && o[n]._visualValues[e] !== void 0 && delete o[n]._visualValues[e];
    }
  }
}
const $i = (i) => i === "reset" || i === "none", Ss = (i, t) => t ? i : Object.assign({}, i), Kl = (i, t, e) => i && !t.hidden && t._stacked && {
  keys: Jo(e, !0),
  values: null
};
class _t {
  constructor(t, e) {
    this.chart = t, this._ctx = t.ctx, this.index = e, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = ks(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && me(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, e = this._cachedMeta, n = this.getDataset(), s = (d, u, f, g) => d === "x" ? u : d === "r" ? g : f, o = e.xAxisID = T(n.xAxisID, Hi(t, "x")), r = e.yAxisID = T(n.yAxisID, Hi(t, "y")), a = e.rAxisID = T(n.rAxisID, Hi(t, "r")), l = e.indexAxis, c = e.iAxisID = s(l, o, r, a), h = e.vAxisID = s(l, r, o, a);
    e.xScale = this.getScaleForId(o), e.yScale = this.getScaleForId(r), e.rScale = this.getScaleForId(a), e.iScale = this.getScaleForId(c), e.vScale = this.getScaleForId(h);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(t) {
    return this.chart.scales[t];
  }
  _getOtherScale(t) {
    const e = this._cachedMeta;
    return t === e.iScale ? e.vScale : e.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && rs(this._data, this), t._stacked && me(t);
  }
  _dataCheck() {
    const t = this.getDataset(), e = t.data || (t.data = []), n = this._data;
    if (I(e))
      this._data = jl(e);
    else if (n !== e) {
      if (n) {
        rs(n, this);
        const s = this._cachedMeta;
        me(s), s._parsed = [];
      }
      e && Object.isExtensible(e) && Ea(e, this), this._syncList = [], this._data = e;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const e = this._cachedMeta, n = this.getDataset();
    let s = !1;
    this._dataCheck();
    const o = e._stacked;
    e._stacked = ks(e.vScale, e), e.stack !== n.stack && (s = !0, me(e), e.stack = n.stack), this._resyncElements(t), (s || o !== e._stacked) && Ms(this, e._parsed);
  }
  configure() {
    const t = this.chart.config, e = t.datasetScopeKeys(this._type), n = t.getOptionScopes(this.getDataset(), e, !0);
    this.options = t.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, e) {
    const { _cachedMeta: n, _data: s } = this, { iScale: o, _stacked: r } = n, a = o.axis;
    let l = t === 0 && e === s.length ? !0 : n._sorted, c = t > 0 && n._parsed[t - 1], h, d, u;
    if (this._parsing === !1)
      n._parsed = s, n._sorted = !0, u = s;
    else {
      U(s[t]) ? u = this.parseArrayData(n, s, t, e) : I(s[t]) ? u = this.parseObjectData(n, s, t, e) : u = this.parsePrimitiveData(n, s, t, e);
      const f = () => d[a] === null || c && d[a] < c[a];
      for (h = 0; h < e; ++h)
        n._parsed[h + t] = d = u[h], l && (f() && (l = !1), c = d);
      n._sorted = l;
    }
    r && Ms(this, u);
  }
  parsePrimitiveData(t, e, n, s) {
    const { iScale: o, vScale: r } = t, a = o.axis, l = r.axis, c = o.getLabels(), h = o === r, d = new Array(s);
    let u, f, g;
    for (u = 0, f = s; u < f; ++u)
      g = u + n, d[u] = {
        [a]: h || o.parse(c[g], g),
        [l]: r.parse(e[g], g)
      };
    return d;
  }
  parseArrayData(t, e, n, s) {
    const { xScale: o, yScale: r } = t, a = new Array(s);
    let l, c, h, d;
    for (l = 0, c = s; l < c; ++l)
      h = l + n, d = e[h], a[l] = {
        x: o.parse(d[0], h),
        y: r.parse(d[1], h)
      };
    return a;
  }
  parseObjectData(t, e, n, s) {
    const { xScale: o, yScale: r } = t, { xAxisKey: a = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(s);
    let h, d, u, f;
    for (h = 0, d = s; h < d; ++h)
      u = h + n, f = e[u], c[h] = {
        x: o.parse(jt(f, a), u),
        y: r.parse(jt(f, l), u)
      };
    return c;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, e, n) {
    const s = this.chart, o = this._cachedMeta, r = e[t.axis], a = {
      keys: Jo(s, !0),
      values: e._stacks[t.axis]._visualValues
    };
    return vs(a, r, o.index, {
      mode: n
    });
  }
  updateRangeFromParsed(t, e, n, s) {
    const o = n[e.axis];
    let r = o === null ? NaN : o;
    const a = s && n._stacks[e.axis];
    s && a && (s.values = a, r = vs(s, o, this._cachedMeta.index)), t.min = Math.min(t.min, r), t.max = Math.max(t.max, r);
  }
  getMinMax(t, e) {
    const n = this._cachedMeta, s = n._parsed, o = n._sorted && t === n.iScale, r = s.length, a = this._getOtherScale(t), l = Kl(e, n, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: h, max: d } = $l(a);
    let u, f;
    function g() {
      f = s[u];
      const p = f[a.axis];
      return !G(f[t.axis]) || h > p || d < p;
    }
    for (u = 0; u < r && !(!g() && (this.updateRangeFromParsed(c, t, f, l), o)); ++u)
      ;
    if (o) {
      for (u = r - 1; u >= 0; --u)
        if (!g()) {
          this.updateRangeFromParsed(c, t, f, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const e = this._cachedMeta._parsed, n = [];
    let s, o, r;
    for (s = 0, o = e.length; s < o; ++s)
      r = e[s][t.axis], G(r) && n.push(r);
    return n;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, n = e.iScale, s = e.vScale, o = this.getParsed(t);
    return {
      label: n ? "" + n.getLabelForValue(o[n.axis]) : "",
      value: s ? "" + s.getLabelForValue(o[s.axis]) : ""
    };
  }
  _update(t) {
    const e = this._cachedMeta;
    this.update(t || "default"), e._clip = Nl(T(this.options.clip, Vl(e.xScale, e.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, e = this.chart, n = this._cachedMeta, s = n.data || [], o = e.chartArea, r = [], a = this._drawStart || 0, l = this._drawCount || s.length - a, c = this.options.drawActiveElementsOnTop;
    let h;
    for (n.dataset && n.dataset.draw(t, o, a, l), h = a; h < a + l; ++h) {
      const d = s[h];
      d.hidden || (d.active && c ? r.push(d) : d.draw(t, o));
    }
    for (h = 0; h < r.length; ++h)
      r[h].draw(t, o);
  }
  getStyle(t, e) {
    const n = e ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(n) : this.resolveDataElementOptions(t || 0, n);
  }
  getContext(t, e, n) {
    const s = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const r = this._cachedMeta.data[t];
      o = r.$context || (r.$context = Xl(this.getContext(), t, r)), o.parsed = this.getParsed(t), o.raw = s.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = Ul(this.chart.getContext(), this.index)), o.dataset = s, o.index = o.datasetIndex = this.index;
    return o.active = !!e, o.mode = n, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, e) {
    return this._resolveElementOptions(this.dataElementType.id, e, t);
  }
  _resolveElementOptions(t, e = "default", n) {
    const s = e === "active", o = this._cachedDataOpts, r = t + "-" + e, a = o[r], l = this.enableOptionSharing && Ie(n);
    if (a)
      return Ss(a, l);
    const c = this.chart.config, h = c.datasetElementScopeKeys(this._type, t), d = s ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], u = c.getOptionScopes(this.getDataset(), h), f = Object.keys(J.elements[t]), g = () => this.getContext(n, s, e), p = c.resolveNamedOptions(u, f, g, d);
    return p.$shared && (p.$shared = l, o[r] = Object.freeze(Ss(p, l))), p;
  }
  _resolveAnimations(t, e, n) {
    const s = this.chart, o = this._cachedDataOpts, r = `animation-${e}`, a = o[r];
    if (a)
      return a;
    let l;
    if (s.options.animation !== !1) {
      const h = this.chart.config, d = h.datasetAnimationScopeKeys(this._type, e), u = h.getOptionScopes(this.getDataset(), d);
      l = h.createResolver(u, this.getContext(t, n, e));
    }
    const c = new Go(s, l && l.animations);
    return l && l._cacheable && (o[r] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, e) {
    return !e || $i(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, e) {
    const n = this.resolveDataElementOptions(t, e), s = this._sharedOptions, o = this.getSharedOptions(n), r = this.includeOptions(e, o) || o !== s;
    return this.updateSharedOptions(o, e, n), {
      sharedOptions: o,
      includeOptions: r
    };
  }
  updateElement(t, e, n, s) {
    $i(s) ? Object.assign(t, n) : this._resolveAnimations(e, s).update(t, n);
  }
  updateSharedOptions(t, e, n) {
    t && !$i(e) && this._resolveAnimations(void 0, e).update(t, n);
  }
  _setStyle(t, e, n, s) {
    t.active = s;
    const o = this.getStyle(e, s);
    this._resolveAnimations(e, n, s).update(t, {
      options: !s && this.getSharedOptions(o) || o
    });
  }
  removeHoverStyle(t, e, n) {
    this._setStyle(t, n, "active", !1);
  }
  setHoverStyle(t, e, n) {
    this._setStyle(t, n, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !0);
  }
  _resyncElements(t) {
    const e = this._data, n = this._cachedMeta.data;
    for (const [a, l, c] of this._syncList)
      this[a](l, c);
    this._syncList = [];
    const s = n.length, o = e.length, r = Math.min(o, s);
    r && this.parse(0, r), o > s ? this._insertElements(s, o - s, t) : o < s && this._removeElements(o, s - o);
  }
  _insertElements(t, e, n = !0) {
    const s = this._cachedMeta, o = s.data, r = t + e;
    let a;
    const l = (c) => {
      for (c.length += e, a = c.length - 1; a >= r; a--)
        c[a] = c[a - e];
    };
    for (l(o), a = t; a < r; ++a)
      o[a] = new this.dataElementType();
    this._parsing && l(s._parsed), this.parse(t, e), n && this.updateElements(o, t, e, "reset");
  }
  updateElements(t, e, n, s) {
  }
  _removeElements(t, e) {
    const n = this._cachedMeta;
    if (this._parsing) {
      const s = n._parsed.splice(t, e);
      n._stacked && me(n, s);
    }
    n.data.splice(t, e);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [e, n, s] = t;
      this[e](n, s);
    }
    this.chart._dataChanges.push([
      this.index,
      ...t
    ]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - t,
      t
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(t, e) {
    e && this._sync([
      "_removeElements",
      t,
      e
    ]);
    const n = arguments.length - 2;
    n && this._sync([
      "_insertElements",
      t,
      n
    ]);
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
}
M(_t, "defaults", {}), M(_t, "datasetElementType", null), M(_t, "dataElementType", null);
function ql(i, t) {
  if (!i._cache.$bar) {
    const e = i.getMatchingVisibleMetas(t);
    let n = [];
    for (let s = 0, o = e.length; s < o; s++)
      n = n.concat(e[s].controller.getAllParsedValues(i));
    i._cache.$bar = To(n.sort((s, o) => s - o));
  }
  return i._cache.$bar;
}
function Gl(i) {
  const t = i.iScale, e = ql(t, i.type);
  let n = t._length, s, o, r, a;
  const l = () => {
    r === 32767 || r === -32768 || (Ie(a) && (n = Math.min(n, Math.abs(r - a) || n)), a = r);
  };
  for (s = 0, o = e.length; s < o; ++s)
    r = t.getPixelForValue(e[s]), l();
  for (a = void 0, s = 0, o = t.ticks.length; s < o; ++s)
    r = t.getPixelForTick(s), l();
  return n;
}
function Jl(i, t, e, n) {
  const s = e.barThickness;
  let o, r;
  return W(s) ? (o = t.min * e.categoryPercentage, r = e.barPercentage) : (o = s * n, r = 1), {
    chunk: o / n,
    ratio: r,
    start: t.pixels[i] - o / 2
  };
}
function Zl(i, t, e, n) {
  const s = t.pixels, o = s[i];
  let r = i > 0 ? s[i - 1] : null, a = i < s.length - 1 ? s[i + 1] : null;
  const l = e.categoryPercentage;
  r === null && (r = o - (a === null ? t.end - t.start : a - o)), a === null && (a = o + o - r);
  const c = o - (o - Math.min(r, a)) / 2 * l;
  return {
    chunk: Math.abs(a - r) / 2 * l / n,
    ratio: e.barPercentage,
    start: c
  };
}
function Ql(i, t, e, n) {
  const s = e.parse(i[0], n), o = e.parse(i[1], n), r = Math.min(s, o), a = Math.max(s, o);
  let l = r, c = a;
  Math.abs(r) > Math.abs(a) && (l = a, c = r), t[e.axis] = c, t._custom = {
    barStart: l,
    barEnd: c,
    start: s,
    end: o,
    min: r,
    max: a
  };
}
function Zo(i, t, e, n) {
  return U(i) ? Ql(i, t, e, n) : t[e.axis] = e.parse(i, n), t;
}
function Ps(i, t, e, n) {
  const s = i.iScale, o = i.vScale, r = s.getLabels(), a = s === o, l = [];
  let c, h, d, u;
  for (c = e, h = e + n; c < h; ++c)
    u = t[c], d = {}, d[s.axis] = a || s.parse(r[c], c), l.push(Zo(u, d, o, c));
  return l;
}
function Yi(i) {
  return i && i.barStart !== void 0 && i.barEnd !== void 0;
}
function tc(i, t, e) {
  return i !== 0 ? kt(i) : (t.isHorizontal() ? 1 : -1) * (t.min >= e ? 1 : -1);
}
function ec(i) {
  let t, e, n, s, o;
  return i.horizontal ? (t = i.base > i.x, e = "left", n = "right") : (t = i.base < i.y, e = "bottom", n = "top"), t ? (s = "end", o = "start") : (s = "start", o = "end"), {
    start: e,
    end: n,
    reverse: t,
    top: s,
    bottom: o
  };
}
function ic(i, t, e, n) {
  let s = t.borderSkipped;
  const o = {};
  if (!s) {
    i.borderSkipped = o;
    return;
  }
  if (s === !0) {
    i.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: r, end: a, reverse: l, top: c, bottom: h } = ec(i);
  s === "middle" && e && (i.enableBorderRadius = !0, (e._top || 0) === n ? s = c : (e._bottom || 0) === n ? s = h : (o[Cs(h, r, a, l)] = !0, s = c)), o[Cs(s, r, a, l)] = !0, i.borderSkipped = o;
}
function Cs(i, t, e, n) {
  return n ? (i = nc(i, t, e), i = Os(i, e, t)) : i = Os(i, t, e), i;
}
function nc(i, t, e) {
  return i === t ? e : i === e ? t : i;
}
function Os(i, t, e) {
  return i === "start" ? t : i === "end" ? e : i;
}
function sc(i, { inflateAmount: t }, e) {
  i.inflateAmount = t === "auto" ? e === 1 ? 0.33 : 0 : t;
}
class Te extends _t {
  parsePrimitiveData(t, e, n, s) {
    return Ps(t, e, n, s);
  }
  parseArrayData(t, e, n, s) {
    return Ps(t, e, n, s);
  }
  parseObjectData(t, e, n, s) {
    const { iScale: o, vScale: r } = t, { xAxisKey: a = "x", yAxisKey: l = "y" } = this._parsing, c = o.axis === "x" ? a : l, h = r.axis === "x" ? a : l, d = [];
    let u, f, g, p;
    for (u = n, f = n + s; u < f; ++u)
      p = e[u], g = {}, g[o.axis] = o.parse(jt(p, c), u), d.push(Zo(jt(p, h), g, r, u));
    return d;
  }
  updateRangeFromParsed(t, e, n, s) {
    super.updateRangeFromParsed(t, e, n, s);
    const o = n._custom;
    o && e === this._cachedMeta.vScale && (t.min = Math.min(t.min, o.min), t.max = Math.max(t.max, o.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, { iScale: n, vScale: s } = e, o = this.getParsed(t), r = o._custom, a = Yi(r) ? "[" + r.start + ", " + r.end + "]" : "" + s.getLabelForValue(o[s.axis]);
    return {
      label: "" + n.getLabelForValue(o[n.axis]),
      value: a
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const t = this._cachedMeta;
    t.stack = this.getDataset().stack;
  }
  update(t) {
    const e = this._cachedMeta;
    this.updateElements(e.data, 0, e.data.length, t);
  }
  updateElements(t, e, n, s) {
    const o = s === "reset", { index: r, _cachedMeta: { vScale: a } } = this, l = a.getBasePixel(), c = a.isHorizontal(), h = this._getRuler(), { sharedOptions: d, includeOptions: u } = this._getSharedOptions(e, s);
    for (let f = e; f < e + n; f++) {
      const g = this.getParsed(f), p = o || W(g[a.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(f), b = this._calculateBarIndexPixels(f, h), _ = (g._stacks || {})[a.axis], x = {
        horizontal: c,
        base: p.base,
        enableBorderRadius: !_ || Yi(g._custom) || r === _._top || r === _._bottom,
        x: c ? p.head : b.center,
        y: c ? b.center : p.head,
        height: c ? b.size : Math.abs(p.size),
        width: c ? Math.abs(p.size) : b.size
      };
      u && (x.options = d || this.resolveDataElementOptions(f, t[f].active ? "active" : s));
      const k = x.options || t[f].options;
      ic(x, k, _, r), sc(x, k, h.ratio), this.updateElement(t[f], f, x, s);
    }
  }
  _getStacks(t, e) {
    const { iScale: n } = this._cachedMeta, s = n.getMatchingVisibleMetas(this._type).filter((l) => l.controller.options.grouped), o = n.options.stacked, r = [], a = (l) => {
      const c = l.controller.getParsed(e), h = c && c[l.vScale.axis];
      if (W(h) || isNaN(h))
        return !0;
    };
    for (const l of s)
      if (!(e !== void 0 && a(l)) && ((o === !1 || r.indexOf(l.stack) === -1 || o === void 0 && l.stack === void 0) && r.push(l.stack), l.index === t))
        break;
    return r.length || r.push(void 0), r;
  }
  _getStackCount(t) {
    return this._getStacks(void 0, t).length;
  }
  _getStackIndex(t, e, n) {
    const s = this._getStacks(t, n), o = e !== void 0 ? s.indexOf(e) : -1;
    return o === -1 ? s.length - 1 : o;
  }
  _getRuler() {
    const t = this.options, e = this._cachedMeta, n = e.iScale, s = [];
    let o, r;
    for (o = 0, r = e.data.length; o < r; ++o)
      s.push(n.getPixelForValue(this.getParsed(o)[n.axis], o));
    const a = t.barThickness;
    return {
      min: a || Gl(e),
      pixels: s,
      start: n._startPixel,
      end: n._endPixel,
      stackCount: this._getStackCount(),
      scale: n,
      grouped: t.grouped,
      ratio: a ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: e, _stacked: n, index: s }, options: { base: o, minBarLength: r } } = this, a = o || 0, l = this.getParsed(t), c = l._custom, h = Yi(c);
    let d = l[e.axis], u = 0, f = n ? this.applyStack(e, l, n) : d, g, p;
    f !== d && (u = f - d, f = d), h && (d = c.barStart, f = c.barEnd - c.barStart, d !== 0 && kt(d) !== kt(c.barEnd) && (u = 0), u += d);
    const b = !W(o) && !h ? o : u;
    let _ = e.getPixelForValue(b);
    if (this.chart.getDataVisibility(t) ? g = e.getPixelForValue(u + f) : g = _, p = g - _, Math.abs(p) < r) {
      p = tc(p, e, a) * r, d === a && (_ -= p / 2);
      const x = e.getPixelForDecimal(0), k = e.getPixelForDecimal(1), v = Math.min(x, k), y = Math.max(x, k);
      _ = Math.max(Math.min(_, y), v), g = _ + p, n && !h && (l._stacks[e.axis]._visualValues[s] = e.getValueForPixel(g) - e.getValueForPixel(_));
    }
    if (_ === e.getPixelForValue(a)) {
      const x = kt(p) * e.getLineWidthForValue(a) / 2;
      _ += x, p -= x;
    }
    return {
      size: p,
      base: _,
      head: g,
      center: g + p / 2
    };
  }
  _calculateBarIndexPixels(t, e) {
    const n = e.scale, s = this.options, o = s.skipNull, r = T(s.maxBarThickness, 1 / 0);
    let a, l;
    if (e.grouped) {
      const c = o ? this._getStackCount(t) : e.stackCount, h = s.barThickness === "flex" ? Zl(t, e, s, c) : Jl(t, e, s, c), d = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0);
      a = h.start + h.chunk * d + h.chunk / 2, l = Math.min(r, h.chunk * h.ratio);
    } else
      a = n.getPixelForValue(this.getParsed(t)[n.axis], t), l = Math.min(r, e.min * e.ratio);
    return {
      base: a - l / 2,
      head: a + l / 2,
      center: a,
      size: l
    };
  }
  draw() {
    const t = this._cachedMeta, e = t.vScale, n = t.data, s = n.length;
    let o = 0;
    for (; o < s; ++o)
      this.getParsed(o)[e.axis] !== null && n[o].draw(this._ctx);
  }
}
M(Te, "id", "bar"), M(Te, "defaults", {
  datasetElementType: !1,
  dataElementType: "bar",
  categoryPercentage: 0.8,
  barPercentage: 0.9,
  grouped: !0,
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "base",
        "width",
        "height"
      ]
    }
  }
}), M(Te, "overrides", {
  scales: {
    _index_: {
      type: "category",
      offset: !0,
      grid: {
        offset: !0
      }
    },
    _value_: {
      type: "linear",
      beginAtZero: !0
    }
  }
});
class hi extends _t {
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
  }
  parsePrimitiveData(t, e, n, s) {
    const o = super.parsePrimitiveData(t, e, n, s);
    for (let r = 0; r < o.length; r++)
      o[r]._custom = this.resolveDataElementOptions(r + n).radius;
    return o;
  }
  parseArrayData(t, e, n, s) {
    const o = super.parseArrayData(t, e, n, s);
    for (let r = 0; r < o.length; r++) {
      const a = e[n + r];
      o[r]._custom = T(a[2], this.resolveDataElementOptions(r + n).radius);
    }
    return o;
  }
  parseObjectData(t, e, n, s) {
    const o = super.parseObjectData(t, e, n, s);
    for (let r = 0; r < o.length; r++) {
      const a = e[n + r];
      o[r]._custom = T(a && a.r && +a.r, this.resolveDataElementOptions(r + n).radius);
    }
    return o;
  }
  getMaxOverflow() {
    const t = this._cachedMeta.data;
    let e = 0;
    for (let n = t.length - 1; n >= 0; --n)
      e = Math.max(e, t[n].size(this.resolveDataElementOptions(n)) / 2);
    return e > 0 && e;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, n = this.chart.data.labels || [], { xScale: s, yScale: o } = e, r = this.getParsed(t), a = s.getLabelForValue(r.x), l = o.getLabelForValue(r.y), c = r._custom;
    return {
      label: n[t] || "",
      value: "(" + a + ", " + l + (c ? ", " + c : "") + ")"
    };
  }
  update(t) {
    const e = this._cachedMeta.data;
    this.updateElements(e, 0, e.length, t);
  }
  updateElements(t, e, n, s) {
    const o = s === "reset", { iScale: r, vScale: a } = this._cachedMeta, { sharedOptions: l, includeOptions: c } = this._getSharedOptions(e, s), h = r.axis, d = a.axis;
    for (let u = e; u < e + n; u++) {
      const f = t[u], g = !o && this.getParsed(u), p = {}, b = p[h] = o ? r.getPixelForDecimal(0.5) : r.getPixelForValue(g[h]), _ = p[d] = o ? a.getBasePixel() : a.getPixelForValue(g[d]);
      p.skip = isNaN(b) || isNaN(_), c && (p.options = l || this.resolveDataElementOptions(u, f.active ? "active" : s), o && (p.options.radius = 0)), this.updateElement(f, u, p, s);
    }
  }
  resolveDataElementOptions(t, e) {
    const n = this.getParsed(t);
    let s = super.resolveDataElementOptions(t, e);
    s.$shared && (s = Object.assign({}, s, {
      $shared: !1
    }));
    const o = s.radius;
    return e !== "active" && (s.radius = 0), s.radius += T(n && n._custom, o), s;
  }
}
M(hi, "id", "bubble"), M(hi, "defaults", {
  datasetElementType: !1,
  dataElementType: "point",
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "borderWidth",
        "radius"
      ]
    }
  }
}), M(hi, "overrides", {
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
});
function oc(i, t, e) {
  let n = 1, s = 1, o = 0, r = 0;
  if (t < X) {
    const a = i, l = a + t, c = Math.cos(a), h = Math.sin(a), d = Math.cos(l), u = Math.sin(l), f = (k, v, y) => ze(k, a, l, !0) ? 1 : Math.max(v, v * e, y, y * e), g = (k, v, y) => ze(k, a, l, !0) ? -1 : Math.min(v, v * e, y, y * e), p = f(0, c, d), b = f(tt, h, u), _ = g(K, c, d), x = g(K + tt, h, u);
    n = (p - _) / 2, s = (b - x) / 2, o = -(p + _) / 2, r = -(b + x) / 2;
  }
  return {
    ratioX: n,
    ratioY: s,
    offsetX: o,
    offsetY: r
  };
}
class Qt extends _t {
  constructor(t, e) {
    super(t, e), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(t, e) {
    const n = this.getDataset().data, s = this._cachedMeta;
    if (this._parsing === !1)
      s._parsed = n;
    else {
      let o = (l) => +n[l];
      if (I(n[t])) {
        const { key: l = "value" } = this._parsing;
        o = (c) => +jt(n[c], l);
      }
      let r, a;
      for (r = t, a = t + e; r < a; ++r)
        s._parsed[r] = o(r);
    }
  }
  _getRotation() {
    return bt(this.options.rotation - 90);
  }
  _getCircumference() {
    return bt(this.options.circumference);
  }
  _getRotationExtents() {
    let t = X, e = -X;
    for (let n = 0; n < this.chart.data.datasets.length; ++n)
      if (this.chart.isDatasetVisible(n) && this.chart.getDatasetMeta(n).type === this._type) {
        const s = this.chart.getDatasetMeta(n).controller, o = s._getRotation(), r = s._getCircumference();
        t = Math.min(t, o), e = Math.max(e, o + r);
      }
    return {
      rotation: t,
      circumference: e - t
    };
  }
  update(t) {
    const e = this.chart, { chartArea: n } = e, s = this._cachedMeta, o = s.data, r = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, a = Math.max((Math.min(n.width, n.height) - r) / 2, 0), l = Math.min(xa(this.options.cutout, a), 1), c = this._getRingWeight(this.index), { circumference: h, rotation: d } = this._getRotationExtents(), { ratioX: u, ratioY: f, offsetX: g, offsetY: p } = oc(d, h, l), b = (n.width - r) / u, _ = (n.height - r) / f, x = Math.max(Math.min(b, _) / 2, 0), k = Po(this.options.radius, x), v = Math.max(k * l, 0), y = (k - v) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * k, this.offsetY = p * k, s.total = this.calculateTotal(), this.outerRadius = k - y * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - y * c, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, e) {
    const n = this.options, s = this._cachedMeta, o = this._getCircumference();
    return e && n.animation.animateRotate || !this.chart.getDataVisibility(t) || s._parsed[t] === null || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * o / X);
  }
  updateElements(t, e, n, s) {
    const o = s === "reset", r = this.chart, a = r.chartArea, c = r.options.animation, h = (a.left + a.right) / 2, d = (a.top + a.bottom) / 2, u = o && c.animateScale, f = u ? 0 : this.innerRadius, g = u ? 0 : this.outerRadius, { sharedOptions: p, includeOptions: b } = this._getSharedOptions(e, s);
    let _ = this._getRotation(), x;
    for (x = 0; x < e; ++x)
      _ += this._circumference(x, o);
    for (x = e; x < e + n; ++x) {
      const k = this._circumference(x, o), v = t[x], y = {
        x: h + this.offsetX,
        y: d + this.offsetY,
        startAngle: _,
        endAngle: _ + k,
        circumference: k,
        outerRadius: g,
        innerRadius: f
      };
      b && (y.options = p || this.resolveDataElementOptions(x, v.active ? "active" : s)), _ += k, this.updateElement(v, x, y, s);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, e = t.data;
    let n = 0, s;
    for (s = 0; s < e.length; s++) {
      const o = t._parsed[s];
      o !== null && !isNaN(o) && this.chart.getDataVisibility(s) && !e[s].hidden && (n += Math.abs(o));
    }
    return n;
  }
  calculateCircumference(t) {
    const e = this._cachedMeta.total;
    return e > 0 && !isNaN(t) ? X * (Math.abs(t) / e) : 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, n = this.chart, s = n.data.labels || [], o = He(e._parsed[t], n.options.locale);
    return {
      label: s[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let e = 0;
    const n = this.chart;
    let s, o, r, a, l;
    if (!t) {
      for (s = 0, o = n.data.datasets.length; s < o; ++s)
        if (n.isDatasetVisible(s)) {
          r = n.getDatasetMeta(s), t = r.data, a = r.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (s = 0, o = t.length; s < o; ++s)
      l = a.resolveDataElementOptions(s), l.borderAlign !== "inner" && (e = Math.max(e, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return e;
  }
  getMaxOffset(t) {
    let e = 0;
    for (let n = 0, s = t.length; n < s; ++n) {
      const o = this.resolveDataElementOptions(n);
      e = Math.max(e, o.offset || 0, o.hoverOffset || 0);
    }
    return e;
  }
  _getRingWeightOffset(t) {
    let e = 0;
    for (let n = 0; n < t; ++n)
      this.chart.isDatasetVisible(n) && (e += this._getRingWeight(n));
    return e;
  }
  _getRingWeight(t) {
    return Math.max(T(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
M(Qt, "id", "doughnut"), M(Qt, "defaults", {
  datasetElementType: !1,
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !1
  },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "circumference",
        "endAngle",
        "innerRadius",
        "outerRadius",
        "startAngle",
        "x",
        "y",
        "offset",
        "borderWidth",
        "spacing"
      ]
    }
  },
  cutout: "50%",
  rotation: 0,
  circumference: 360,
  radius: "100%",
  spacing: 0,
  indexAxis: "r"
}), M(Qt, "descriptors", {
  _scriptable: (t) => t !== "spacing",
  _indexable: (t) => t !== "spacing" && !t.startsWith("borderDash") && !t.startsWith("hoverBorderDash")
}), M(Qt, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(t) {
          const e = t.data;
          if (e.labels.length && e.datasets.length) {
            const { labels: { pointStyle: n, color: s } } = t.legend.options;
            return e.labels.map((o, r) => {
              const l = t.getDatasetMeta(0).controller.getStyle(r);
              return {
                text: o,
                fillStyle: l.backgroundColor,
                strokeStyle: l.borderColor,
                fontColor: s,
                lineWidth: l.borderWidth,
                pointStyle: n,
                hidden: !t.getDataVisibility(r),
                index: r
              };
            });
          }
          return [];
        }
      },
      onClick(t, e, n) {
        n.chart.toggleDataVisibility(e.index), n.chart.update();
      }
    }
  }
});
class Re extends _t {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(t) {
    const e = this._cachedMeta, { dataset: n, data: s = [], _dataset: o } = e, r = this.chart._animationsDisabled;
    let { start: a, count: l } = Lo(e, s, r);
    this._drawStart = a, this._drawCount = l, Fo(e) && (a = 0, l = s.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!o._decimated, n.points = s;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
      animated: !r,
      options: c
    }, t), this.updateElements(s, a, l, t);
  }
  updateElements(t, e, n, s) {
    const o = s === "reset", { iScale: r, vScale: a, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: h, includeOptions: d } = this._getSharedOptions(e, s), u = r.axis, f = a.axis, { spanGaps: g, segment: p } = this.options, b = he(g) ? g : Number.POSITIVE_INFINITY, _ = this.chart._animationsDisabled || o || s === "none", x = e + n, k = t.length;
    let v = e > 0 && this.getParsed(e - 1);
    for (let y = 0; y < k; ++y) {
      const S = t[y], P = _ ? S : {};
      if (y < e || y >= x) {
        P.skip = !0;
        continue;
      }
      const C = this.getParsed(y), D = W(C[f]), R = P[u] = r.getPixelForValue(C[u], y), E = P[f] = o || D ? a.getBasePixel() : a.getPixelForValue(l ? this.applyStack(a, C, l) : C[f], y);
      P.skip = isNaN(R) || isNaN(E) || D, P.stop = y > 0 && Math.abs(C[u] - v[u]) > b, p && (P.parsed = C, P.raw = c.data[y]), d && (P.options = h || this.resolveDataElementOptions(y, S.active ? "active" : s)), _ || this.updateElement(S, y, P, s), v = C;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, e = t.dataset, n = e.options && e.options.borderWidth || 0, s = t.data || [];
    if (!s.length)
      return n;
    const o = s[0].size(this.resolveDataElementOptions(0)), r = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
    return Math.max(n, o, r) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
M(Re, "id", "line"), M(Re, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}), M(Re, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
class Ee extends _t {
  constructor(t, e) {
    super(t, e), this.innerRadius = void 0, this.outerRadius = void 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, n = this.chart, s = n.data.labels || [], o = He(e._parsed[t].r, n.options.locale);
    return {
      label: s[t] || "",
      value: o
    };
  }
  parseObjectData(t, e, n, s) {
    return Ho.bind(this)(t, e, n, s);
  }
  update(t) {
    const e = this._cachedMeta.data;
    this._updateRadius(), this.updateElements(e, 0, e.length, t);
  }
  getMinMax() {
    const t = this._cachedMeta, e = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    };
    return t.data.forEach((n, s) => {
      const o = this.getParsed(s).r;
      !isNaN(o) && this.chart.getDataVisibility(s) && (o < e.min && (e.min = o), o > e.max && (e.max = o));
    }), e;
  }
  _updateRadius() {
    const t = this.chart, e = t.chartArea, n = t.options, s = Math.min(e.right - e.left, e.bottom - e.top), o = Math.max(s / 2, 0), r = Math.max(n.cutoutPercentage ? o / 100 * n.cutoutPercentage : 1, 0), a = (o - r) / t.getVisibleDatasetCount();
    this.outerRadius = o - a * this.index, this.innerRadius = this.outerRadius - a;
  }
  updateElements(t, e, n, s) {
    const o = s === "reset", r = this.chart, l = r.options.animation, c = this._cachedMeta.rScale, h = c.xCenter, d = c.yCenter, u = c.getIndexAngle(0) - 0.5 * K;
    let f = u, g;
    const p = 360 / this.countVisibleElements();
    for (g = 0; g < e; ++g)
      f += this._computeAngle(g, s, p);
    for (g = e; g < e + n; g++) {
      const b = t[g];
      let _ = f, x = f + this._computeAngle(g, s, p), k = r.getDataVisibility(g) ? c.getDistanceFromCenterForValue(this.getParsed(g).r) : 0;
      f = x, o && (l.animateScale && (k = 0), l.animateRotate && (_ = x = u));
      const v = {
        x: h,
        y: d,
        innerRadius: 0,
        outerRadius: k,
        startAngle: _,
        endAngle: x,
        options: this.resolveDataElementOptions(g, b.active ? "active" : s)
      };
      this.updateElement(b, g, v, s);
    }
  }
  countVisibleElements() {
    const t = this._cachedMeta;
    let e = 0;
    return t.data.forEach((n, s) => {
      !isNaN(this.getParsed(s).r) && this.chart.getDataVisibility(s) && e++;
    }), e;
  }
  _computeAngle(t, e, n) {
    return this.chart.getDataVisibility(t) ? bt(this.resolveDataElementOptions(t, e).angle || n) : 0;
  }
}
M(Ee, "id", "polarArea"), M(Ee, "defaults", {
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !0
  },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "startAngle",
        "endAngle",
        "innerRadius",
        "outerRadius"
      ]
    }
  },
  indexAxis: "r",
  startAngle: 0
}), M(Ee, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(t) {
          const e = t.data;
          if (e.labels.length && e.datasets.length) {
            const { labels: { pointStyle: n, color: s } } = t.legend.options;
            return e.labels.map((o, r) => {
              const l = t.getDatasetMeta(0).controller.getStyle(r);
              return {
                text: o,
                fillStyle: l.backgroundColor,
                strokeStyle: l.borderColor,
                fontColor: s,
                lineWidth: l.borderWidth,
                pointStyle: n,
                hidden: !t.getDataVisibility(r),
                index: r
              };
            });
          }
          return [];
        }
      },
      onClick(t, e, n) {
        n.chart.toggleDataVisibility(e.index), n.chart.update();
      }
    }
  },
  scales: {
    r: {
      type: "radialLinear",
      angleLines: {
        display: !1
      },
      beginAtZero: !0,
      grid: {
        circular: !0
      },
      pointLabels: {
        display: !1
      },
      startAngle: 0
    }
  }
});
class on extends Qt {
}
M(on, "id", "pie"), M(on, "defaults", {
  cutout: 0,
  rotation: 0,
  circumference: 360,
  radius: "100%"
});
class di extends _t {
  getLabelAndValue(t) {
    const e = this._cachedMeta.vScale, n = this.getParsed(t);
    return {
      label: e.getLabels()[t],
      value: "" + e.getLabelForValue(n[e.axis])
    };
  }
  parseObjectData(t, e, n, s) {
    return Ho.bind(this)(t, e, n, s);
  }
  update(t) {
    const e = this._cachedMeta, n = e.dataset, s = e.data || [], o = e.iScale.getLabels();
    if (n.points = s, t !== "resize") {
      const r = this.resolveDatasetElementOptions(t);
      this.options.showLine || (r.borderWidth = 0);
      const a = {
        _loop: !0,
        _fullLoop: o.length === s.length,
        options: r
      };
      this.updateElement(n, void 0, a, t);
    }
    this.updateElements(s, 0, s.length, t);
  }
  updateElements(t, e, n, s) {
    const o = this._cachedMeta.rScale, r = s === "reset";
    for (let a = e; a < e + n; a++) {
      const l = t[a], c = this.resolveDataElementOptions(a, l.active ? "active" : s), h = o.getPointPositionForValue(a, this.getParsed(a).r), d = r ? o.xCenter : h.x, u = r ? o.yCenter : h.y, f = {
        x: d,
        y: u,
        angle: h.angle,
        skip: isNaN(d) || isNaN(u),
        options: c
      };
      this.updateElement(l, a, f, s);
    }
  }
}
M(di, "id", "radar"), M(di, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  indexAxis: "r",
  showLine: !0,
  elements: {
    line: {
      fill: "start"
    }
  }
}), M(di, "overrides", {
  aspectRatio: 1,
  scales: {
    r: {
      type: "radialLinear"
    }
  }
});
class ui extends _t {
  getLabelAndValue(t) {
    const e = this._cachedMeta, n = this.chart.data.labels || [], { xScale: s, yScale: o } = e, r = this.getParsed(t), a = s.getLabelForValue(r.x), l = o.getLabelForValue(r.y);
    return {
      label: n[t] || "",
      value: "(" + a + ", " + l + ")"
    };
  }
  update(t) {
    const e = this._cachedMeta, { data: n = [] } = e, s = this.chart._animationsDisabled;
    let { start: o, count: r } = Lo(e, n, s);
    if (this._drawStart = o, this._drawCount = r, Fo(e) && (o = 0, r = n.length), this.options.showLine) {
      this.datasetElementType || this.addElements();
      const { dataset: a, _dataset: l } = e;
      a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!l._decimated, a.points = n;
      const c = this.resolveDatasetElementOptions(t);
      c.segment = this.options.segment, this.updateElement(a, void 0, {
        animated: !s,
        options: c
      }, t);
    } else
      this.datasetElementType && (delete e.dataset, this.datasetElementType = !1);
    this.updateElements(n, o, r, t);
  }
  addElements() {
    const { showLine: t } = this.options;
    !this.datasetElementType && t && (this.datasetElementType = this.chart.registry.getElement("line")), super.addElements();
  }
  updateElements(t, e, n, s) {
    const o = s === "reset", { iScale: r, vScale: a, _stacked: l, _dataset: c } = this._cachedMeta, h = this.resolveDataElementOptions(e, s), d = this.getSharedOptions(h), u = this.includeOptions(s, d), f = r.axis, g = a.axis, { spanGaps: p, segment: b } = this.options, _ = he(p) ? p : Number.POSITIVE_INFINITY, x = this.chart._animationsDisabled || o || s === "none";
    let k = e > 0 && this.getParsed(e - 1);
    for (let v = e; v < e + n; ++v) {
      const y = t[v], S = this.getParsed(v), P = x ? y : {}, C = W(S[g]), D = P[f] = r.getPixelForValue(S[f], v), R = P[g] = o || C ? a.getBasePixel() : a.getPixelForValue(l ? this.applyStack(a, S, l) : S[g], v);
      P.skip = isNaN(D) || isNaN(R) || C, P.stop = v > 0 && Math.abs(S[f] - k[f]) > _, b && (P.parsed = S, P.raw = c.data[v]), u && (P.options = d || this.resolveDataElementOptions(v, y.active ? "active" : s)), x || this.updateElement(y, v, P, s), k = S;
    }
    this.updateSharedOptions(d, s, h);
  }
  getMaxOverflow() {
    const t = this._cachedMeta, e = t.data || [];
    if (!this.options.showLine) {
      let a = 0;
      for (let l = e.length - 1; l >= 0; --l)
        a = Math.max(a, e[l].size(this.resolveDataElementOptions(l)) / 2);
      return a > 0 && a;
    }
    const n = t.dataset, s = n.options && n.options.borderWidth || 0;
    if (!e.length)
      return s;
    const o = e[0].size(this.resolveDataElementOptions(0)), r = e[e.length - 1].size(this.resolveDataElementOptions(e.length - 1));
    return Math.max(s, o, r) / 2;
  }
}
M(ui, "id", "scatter"), M(ui, "defaults", {
  datasetElementType: !1,
  dataElementType: "point",
  showLine: !1,
  fill: !1
}), M(ui, "overrides", {
  interaction: {
    mode: "point"
  },
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
});
var rc = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BarController: Te,
  BubbleController: hi,
  DoughnutController: Qt,
  LineController: Re,
  PieController: on,
  PolarAreaController: Ee,
  RadarController: di,
  ScatterController: ui
});
function qt() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Tn {
  constructor(t) {
    M(this, "options");
    this.options = t || {};
  }
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(t) {
    Object.assign(Tn.prototype, t);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return qt();
  }
  parse() {
    return qt();
  }
  format() {
    return qt();
  }
  add() {
    return qt();
  }
  diff() {
    return qt();
  }
  startOf() {
    return qt();
  }
  endOf() {
    return qt();
  }
}
var ac = {
  _date: Tn
};
function lc(i, t, e, n) {
  const { controller: s, data: o, _sorted: r } = i, a = s._cachedMeta.iScale;
  if (a && t === a.axis && t !== "r" && r && o.length) {
    const l = a._reversePixels ? Ta : Rt;
    if (n) {
      if (s._sharedOptions) {
        const c = o[0], h = typeof c.getRange == "function" && c.getRange(t);
        if (h) {
          const d = l(o, t, e - h), u = l(o, t, e + h);
          return {
            lo: d.lo,
            hi: u.hi
          };
        }
      }
    } else
      return l(o, t, e);
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function $e(i, t, e, n, s) {
  const o = i.getSortedVisibleDatasetMetas(), r = e[t];
  for (let a = 0, l = o.length; a < l; ++a) {
    const { index: c, data: h } = o[a], { lo: d, hi: u } = lc(o[a], t, r, s);
    for (let f = d; f <= u; ++f) {
      const g = h[f];
      g.skip || n(g, c, f);
    }
  }
}
function cc(i) {
  const t = i.indexOf("x") !== -1, e = i.indexOf("y") !== -1;
  return function(n, s) {
    const o = t ? Math.abs(n.x - s.x) : 0, r = e ? Math.abs(n.y - s.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(r, 2));
  };
}
function Ui(i, t, e, n, s) {
  const o = [];
  return !s && !i.isPointInArea(t) || $e(i, e, t, function(a, l, c) {
    !s && !Et(a, i.chartArea, 0) || a.inRange(t.x, t.y, n) && o.push({
      element: a,
      datasetIndex: l,
      index: c
    });
  }, !0), o;
}
function hc(i, t, e, n) {
  let s = [];
  function o(r, a, l) {
    const { startAngle: c, endAngle: h } = r.getProps([
      "startAngle",
      "endAngle"
    ], n), { angle: d } = Do(r, {
      x: t.x,
      y: t.y
    });
    ze(d, c, h) && s.push({
      element: r,
      datasetIndex: a,
      index: l
    });
  }
  return $e(i, e, t, o), s;
}
function dc(i, t, e, n, s, o) {
  let r = [];
  const a = cc(e);
  let l = Number.POSITIVE_INFINITY;
  function c(h, d, u) {
    const f = h.inRange(t.x, t.y, s);
    if (n && !f)
      return;
    const g = h.getCenterPoint(s);
    if (!(!!o || i.isPointInArea(g)) && !f)
      return;
    const b = a(t, g);
    b < l ? (r = [
      {
        element: h,
        datasetIndex: d,
        index: u
      }
    ], l = b) : b === l && r.push({
      element: h,
      datasetIndex: d,
      index: u
    });
  }
  return $e(i, e, t, c), r;
}
function Xi(i, t, e, n, s, o) {
  return !o && !i.isPointInArea(t) ? [] : e === "r" && !n ? hc(i, t, e, s) : dc(i, t, e, n, s, o);
}
function Ds(i, t, e, n, s) {
  const o = [], r = e === "x" ? "inXRange" : "inYRange";
  let a = !1;
  return $e(i, e, t, (l, c, h) => {
    l[r](t[e], s) && (o.push({
      element: l,
      datasetIndex: c,
      index: h
    }), a = a || l.inRange(t.x, t.y, s));
  }), n && !a ? [] : o;
}
var uc = {
  evaluateInteractionItems: $e,
  modes: {
    index(i, t, e, n) {
      const s = Jt(t, i), o = e.axis || "x", r = e.includeInvisible || !1, a = e.intersect ? Ui(i, s, o, n, r) : Xi(i, s, o, !1, n, r), l = [];
      return a.length ? (i.getSortedVisibleDatasetMetas().forEach((c) => {
        const h = a[0].index, d = c.data[h];
        d && !d.skip && l.push({
          element: d,
          datasetIndex: c.index,
          index: h
        });
      }), l) : [];
    },
    dataset(i, t, e, n) {
      const s = Jt(t, i), o = e.axis || "xy", r = e.includeInvisible || !1;
      let a = e.intersect ? Ui(i, s, o, n, r) : Xi(i, s, o, !1, n, r);
      if (a.length > 0) {
        const l = a[0].datasetIndex, c = i.getDatasetMeta(l).data;
        a = [];
        for (let h = 0; h < c.length; ++h)
          a.push({
            element: c[h],
            datasetIndex: l,
            index: h
          });
      }
      return a;
    },
    point(i, t, e, n) {
      const s = Jt(t, i), o = e.axis || "xy", r = e.includeInvisible || !1;
      return Ui(i, s, o, n, r);
    },
    nearest(i, t, e, n) {
      const s = Jt(t, i), o = e.axis || "xy", r = e.includeInvisible || !1;
      return Xi(i, s, o, e.intersect, n, r);
    },
    x(i, t, e, n) {
      const s = Jt(t, i);
      return Ds(i, s, "x", e.intersect, n);
    },
    y(i, t, e, n) {
      const s = Jt(t, i);
      return Ds(i, s, "y", e.intersect, n);
    }
  }
};
const Qo = [
  "left",
  "top",
  "right",
  "bottom"
];
function be(i, t) {
  return i.filter((e) => e.pos === t);
}
function As(i, t) {
  return i.filter((e) => Qo.indexOf(e.pos) === -1 && e.box.axis === t);
}
function _e(i, t) {
  return i.sort((e, n) => {
    const s = t ? n : e, o = t ? e : n;
    return s.weight === o.weight ? s.index - o.index : s.weight - o.weight;
  });
}
function fc(i) {
  const t = [];
  let e, n, s, o, r, a;
  for (e = 0, n = (i || []).length; e < n; ++e)
    s = i[e], { position: o, options: { stack: r, stackWeight: a = 1 } } = s, t.push({
      index: e,
      box: s,
      pos: o,
      horizontal: s.isHorizontal(),
      weight: s.weight,
      stack: r && o + r,
      stackWeight: a
    });
  return t;
}
function gc(i) {
  const t = {};
  for (const e of i) {
    const { stack: n, pos: s, stackWeight: o } = e;
    if (!n || !Qo.includes(s))
      continue;
    const r = t[n] || (t[n] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    r.count++, r.weight += o;
  }
  return t;
}
function pc(i, t) {
  const e = gc(i), { vBoxMaxWidth: n, hBoxMaxHeight: s } = t;
  let o, r, a;
  for (o = 0, r = i.length; o < r; ++o) {
    a = i[o];
    const { fullSize: l } = a.box, c = e[a.stack], h = c && a.stackWeight / c.weight;
    a.horizontal ? (a.width = h ? h * n : l && t.availableWidth, a.height = s) : (a.width = n, a.height = h ? h * s : l && t.availableHeight);
  }
  return e;
}
function mc(i) {
  const t = fc(i), e = _e(t.filter((c) => c.box.fullSize), !0), n = _e(be(t, "left"), !0), s = _e(be(t, "right")), o = _e(be(t, "top"), !0), r = _e(be(t, "bottom")), a = As(t, "x"), l = As(t, "y");
  return {
    fullSize: e,
    leftAndTop: n.concat(o),
    rightAndBottom: s.concat(l).concat(r).concat(a),
    chartArea: be(t, "chartArea"),
    vertical: n.concat(s).concat(l),
    horizontal: o.concat(r).concat(a)
  };
}
function Ts(i, t, e, n) {
  return Math.max(i[e], t[e]) + Math.max(i[n], t[n]);
}
function tr(i, t) {
  i.top = Math.max(i.top, t.top), i.left = Math.max(i.left, t.left), i.bottom = Math.max(i.bottom, t.bottom), i.right = Math.max(i.right, t.right);
}
function bc(i, t, e, n) {
  const { pos: s, box: o } = e, r = i.maxPadding;
  if (!I(s)) {
    e.size && (i[s] -= e.size);
    const d = n[e.stack] || {
      size: 0,
      count: 1
    };
    d.size = Math.max(d.size, e.horizontal ? o.height : o.width), e.size = d.size / d.count, i[s] += e.size;
  }
  o.getPadding && tr(r, o.getPadding());
  const a = Math.max(0, t.outerWidth - Ts(r, i, "left", "right")), l = Math.max(0, t.outerHeight - Ts(r, i, "top", "bottom")), c = a !== i.w, h = l !== i.h;
  return i.w = a, i.h = l, e.horizontal ? {
    same: c,
    other: h
  } : {
    same: h,
    other: c
  };
}
function _c(i) {
  const t = i.maxPadding;
  function e(n) {
    const s = Math.max(t[n] - i[n], 0);
    return i[n] += s, s;
  }
  i.y += e("top"), i.x += e("left"), e("right"), e("bottom");
}
function xc(i, t) {
  const e = t.maxPadding;
  function n(s) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return s.forEach((r) => {
      o[r] = Math.max(t[r], e[r]);
    }), o;
  }
  return n(i ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function we(i, t, e, n) {
  const s = [];
  let o, r, a, l, c, h;
  for (o = 0, r = i.length, c = 0; o < r; ++o) {
    a = i[o], l = a.box, l.update(a.width || t.w, a.height || t.h, xc(a.horizontal, t));
    const { same: d, other: u } = bc(t, e, a, n);
    c |= d && s.length, h = h || u, l.fullSize || s.push(a);
  }
  return c && we(s, t, e, n) || h;
}
function ii(i, t, e, n, s) {
  i.top = e, i.left = t, i.right = t + n, i.bottom = e + s, i.width = n, i.height = s;
}
function Rs(i, t, e, n) {
  const s = e.padding;
  let { x: o, y: r } = t;
  for (const a of i) {
    const l = a.box, c = n[a.stack] || {
      count: 1,
      placed: 0,
      weight: 1
    }, h = a.stackWeight / c.weight || 1;
    if (a.horizontal) {
      const d = t.w * h, u = c.size || l.height;
      Ie(c.start) && (r = c.start), l.fullSize ? ii(l, s.left, r, e.outerWidth - s.right - s.left, u) : ii(l, t.left + c.placed, r, d, u), c.start = r, c.placed += d, r = l.bottom;
    } else {
      const d = t.h * h, u = c.size || l.width;
      Ie(c.start) && (o = c.start), l.fullSize ? ii(l, o, s.top, u, e.outerHeight - s.bottom - s.top) : ii(l, o, t.top + c.placed, u, d), c.start = o, c.placed += d, o = l.right;
    }
  }
  t.x = o, t.y = r;
}
var rt = {
  addBox(i, t) {
    i.boxes || (i.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [
        {
          z: 0,
          draw(e) {
            t.draw(e);
          }
        }
      ];
    }, i.boxes.push(t);
  },
  removeBox(i, t) {
    const e = i.boxes ? i.boxes.indexOf(t) : -1;
    e !== -1 && i.boxes.splice(e, 1);
  },
  configure(i, t, e) {
    t.fullSize = e.fullSize, t.position = e.position, t.weight = e.weight;
  },
  update(i, t, e, n) {
    if (!i)
      return;
    const s = at(i.options.layout.padding), o = Math.max(t - s.width, 0), r = Math.max(e - s.height, 0), a = mc(i.boxes), l = a.vertical, c = a.horizontal;
    N(i.boxes, (p) => {
      typeof p.beforeLayout == "function" && p.beforeLayout();
    });
    const h = l.reduce((p, b) => b.box.options && b.box.options.display === !1 ? p : p + 1, 0) || 1, d = Object.freeze({
      outerWidth: t,
      outerHeight: e,
      padding: s,
      availableWidth: o,
      availableHeight: r,
      vBoxMaxWidth: o / 2 / h,
      hBoxMaxHeight: r / 2
    }), u = Object.assign({}, s);
    tr(u, at(n));
    const f = Object.assign({
      maxPadding: u,
      w: o,
      h: r,
      x: s.left,
      y: s.top
    }, s), g = pc(l.concat(c), d);
    we(a.fullSize, f, d, g), we(l, f, d, g), we(c, f, d, g) && we(l, f, d, g), _c(f), Rs(a.leftAndTop, f, d, g), f.x += f.w, f.y += f.h, Rs(a.rightAndBottom, f, d, g), i.chartArea = {
      left: f.left,
      top: f.top,
      right: f.left + f.w,
      bottom: f.top + f.h,
      height: f.h,
      width: f.w
    }, N(a.chartArea, (p) => {
      const b = p.box;
      Object.assign(b, i.chartArea), b.update(f.w, f.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class er {
  acquireContext(t, e) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, e, n) {
  }
  removeEventListener(t, e, n) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, e, n, s) {
    return e = Math.max(0, e || t.width), n = n || t.height, {
      width: e,
      height: Math.max(0, s ? Math.floor(e / s) : n)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class yc extends er {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const fi = "$chartjs", vc = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Es = (i) => i === null || i === "";
function kc(i, t) {
  const e = i.style, n = i.getAttribute("height"), s = i.getAttribute("width");
  if (i[fi] = {
    initial: {
      height: n,
      width: s,
      style: {
        display: e.display,
        height: e.height,
        width: e.width
      }
    }
  }, e.display = e.display || "block", e.boxSizing = e.boxSizing || "border-box", Es(s)) {
    const o = ps(i, "width");
    o !== void 0 && (i.width = o);
  }
  if (Es(n))
    if (i.style.height === "")
      i.height = i.width / (t || 2);
    else {
      const o = ps(i, "height");
      o !== void 0 && (i.height = o);
    }
  return i;
}
const ir = Ml ? {
  passive: !0
} : !1;
function wc(i, t, e) {
  i && i.addEventListener(t, e, ir);
}
function Mc(i, t, e) {
  i && i.canvas && i.canvas.removeEventListener(t, e, ir);
}
function Sc(i, t) {
  const e = vc[i.type] || i.type, { x: n, y: s } = Jt(i, t);
  return {
    type: e,
    chart: t,
    native: i,
    x: n !== void 0 ? n : null,
    y: s !== void 0 ? s : null
  };
}
function wi(i, t) {
  for (const e of i)
    if (e === t || e.contains(t))
      return !0;
}
function Pc(i, t, e) {
  const n = i.canvas, s = new MutationObserver((o) => {
    let r = !1;
    for (const a of o)
      r = r || wi(a.addedNodes, n), r = r && !wi(a.removedNodes, n);
    r && e();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
function Cc(i, t, e) {
  const n = i.canvas, s = new MutationObserver((o) => {
    let r = !1;
    for (const a of o)
      r = r || wi(a.removedNodes, n), r = r && !wi(a.addedNodes, n);
    r && e();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
const We = /* @__PURE__ */ new Map();
let Ls = 0;
function nr() {
  const i = window.devicePixelRatio;
  i !== Ls && (Ls = i, We.forEach((t, e) => {
    e.currentDevicePixelRatio !== i && t();
  }));
}
function Oc(i, t) {
  We.size || window.addEventListener("resize", nr), We.set(i, t);
}
function Dc(i) {
  We.delete(i), We.size || window.removeEventListener("resize", nr);
}
function Ac(i, t, e) {
  const n = i.canvas, s = n && An(n);
  if (!s)
    return;
  const o = Eo((a, l) => {
    const c = s.clientWidth;
    e(a, l), c < s.clientWidth && e();
  }, window), r = new ResizeObserver((a) => {
    const l = a[0], c = l.contentRect.width, h = l.contentRect.height;
    c === 0 && h === 0 || o(c, h);
  });
  return r.observe(s), Oc(i, o), r;
}
function Ki(i, t, e) {
  e && e.disconnect(), t === "resize" && Dc(i);
}
function Tc(i, t, e) {
  const n = i.canvas, s = Eo((o) => {
    i.ctx !== null && e(Sc(o, i));
  }, i);
  return wc(n, t, s), s;
}
class Rc extends er {
  acquireContext(t, e) {
    const n = t && t.getContext && t.getContext("2d");
    return n && n.canvas === t ? (kc(t, e), n) : null;
  }
  releaseContext(t) {
    const e = t.canvas;
    if (!e[fi])
      return !1;
    const n = e[fi].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const r = n[o];
      W(r) ? e.removeAttribute(o) : e.setAttribute(o, r);
    });
    const s = n.style || {};
    return Object.keys(s).forEach((o) => {
      e.style[o] = s[o];
    }), e.width = e.width, delete e[fi], !0;
  }
  addEventListener(t, e, n) {
    this.removeEventListener(t, e);
    const s = t.$proxies || (t.$proxies = {}), r = {
      attach: Pc,
      detach: Cc,
      resize: Ac
    }[e] || Tc;
    s[e] = r(t, e, n);
  }
  removeEventListener(t, e) {
    const n = t.$proxies || (t.$proxies = {}), s = n[e];
    if (!s)
      return;
    ({
      attach: Ki,
      detach: Ki,
      resize: Ki
    }[e] || Mc)(t, e, s), n[e] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, e, n, s) {
    return wl(t, e, n, s);
  }
  isAttached(t) {
    const e = An(t);
    return !!(e && e.isConnected);
  }
}
function Ec(i) {
  return !Dn() || typeof OffscreenCanvas < "u" && i instanceof OffscreenCanvas ? yc : Rc;
}
class xt {
  constructor() {
    M(this, "x");
    M(this, "y");
    M(this, "active", !1);
    M(this, "options");
    M(this, "$animations");
  }
  tooltipPosition(t) {
    const { x: e, y: n } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: e,
      y: n
    };
  }
  hasValue() {
    return he(this.x) && he(this.y);
  }
  getProps(t, e) {
    const n = this.$animations;
    if (!e || !n)
      return this;
    const s = {};
    return t.forEach((o) => {
      s[o] = n[o] && n[o].active() ? n[o]._to : this[o];
    }), s;
  }
}
M(xt, "defaults", {}), M(xt, "defaultRoutes");
function Lc(i, t) {
  const e = i.options.ticks, n = Fc(i), s = Math.min(e.maxTicksLimit || n, n), o = e.major.enabled ? zc(t) : [], r = o.length, a = o[0], l = o[r - 1], c = [];
  if (r > s)
    return Bc(t, c, o, r / s), c;
  const h = Ic(o, t, s);
  if (r > 0) {
    let d, u;
    const f = r > 1 ? Math.round((l - a) / (r - 1)) : null;
    for (ni(t, c, h, W(f) ? 0 : a - f, a), d = 0, u = r - 1; d < u; d++)
      ni(t, c, h, o[d], o[d + 1]);
    return ni(t, c, h, l, W(f) ? t.length : l + f), c;
  }
  return ni(t, c, h), c;
}
function Fc(i) {
  const t = i.options.offset, e = i._tickSize(), n = i._length / e + (t ? 0 : 1), s = i._maxLength / e;
  return Math.floor(Math.min(n, s));
}
function Ic(i, t, e) {
  const n = Wc(i), s = t.length / e;
  if (!n)
    return Math.max(s, 1);
  const o = Ca(n);
  for (let r = 0, a = o.length - 1; r < a; r++) {
    const l = o[r];
    if (l > s)
      return l;
  }
  return Math.max(s, 1);
}
function zc(i) {
  const t = [];
  let e, n;
  for (e = 0, n = i.length; e < n; e++)
    i[e].major && t.push(e);
  return t;
}
function Bc(i, t, e, n) {
  let s = 0, o = e[0], r;
  for (n = Math.ceil(n), r = 0; r < i.length; r++)
    r === o && (t.push(i[r]), s++, o = e[s * n]);
}
function ni(i, t, e, n, s) {
  const o = T(n, 0), r = Math.min(T(s, i.length), i.length);
  let a = 0, l, c, h;
  for (e = Math.ceil(e), s && (l = s - n, e = l / Math.floor(l / e)), h = o; h < 0; )
    a++, h = Math.round(o + a * e);
  for (c = Math.max(o, 0); c < r; c++)
    c === h && (t.push(i[c]), a++, h = Math.round(o + a * e));
}
function Wc(i) {
  const t = i.length;
  let e, n;
  if (t < 2)
    return !1;
  for (n = i[0], e = 1; e < t; ++e)
    if (i[e] - i[e - 1] !== n)
      return !1;
  return n;
}
const Vc = (i) => i === "left" ? "right" : i === "right" ? "left" : i, Fs = (i, t, e) => t === "top" || t === "left" ? i[t] + e : i[t] - e, Is = (i, t) => Math.min(t || i, i);
function zs(i, t) {
  const e = [], n = i.length / t, s = i.length;
  let o = 0;
  for (; o < s; o += n)
    e.push(i[Math.floor(o)]);
  return e;
}
function Nc(i, t, e) {
  const n = i.ticks.length, s = Math.min(t, n - 1), o = i._startPixel, r = i._endPixel, a = 1e-6;
  let l = i.getPixelForTick(s), c;
  if (!(e && (n === 1 ? c = Math.max(l - o, r - l) : t === 0 ? c = (i.getPixelForTick(1) - l) / 2 : c = (l - i.getPixelForTick(s - 1)) / 2, l += s < t ? c : -c, l < o - a || l > r + a)))
    return l;
}
function jc(i, t) {
  N(i, (e) => {
    const n = e.gc, s = n.length / 2;
    let o;
    if (s > t) {
      for (o = 0; o < s; ++o)
        delete e.data[n[o]];
      n.splice(0, s);
    }
  });
}
function xe(i) {
  return i.drawTicks ? i.tickLength : 0;
}
function Bs(i, t) {
  if (!i.display)
    return 0;
  const e = nt(i.font, t), n = at(i.padding);
  return (U(i.text) ? i.text.length : 1) * e.lineHeight + n.height;
}
function Hc(i, t) {
  return $t(i, {
    scale: t,
    type: "scale"
  });
}
function $c(i, t, e) {
  return $t(i, {
    tick: e,
    index: t,
    type: "tick"
  });
}
function Yc(i, t, e) {
  let n = wn(i);
  return (e && t !== "right" || !e && t === "right") && (n = Vc(n)), n;
}
function Uc(i, t, e, n) {
  const { top: s, left: o, bottom: r, right: a, chart: l } = i, { chartArea: c, scales: h } = l;
  let d = 0, u, f, g;
  const p = r - s, b = a - o;
  if (i.isHorizontal()) {
    if (f = ot(n, o, a), I(e)) {
      const _ = Object.keys(e)[0], x = e[_];
      g = h[_].getPixelForValue(x) + p - t;
    } else
      e === "center" ? g = (c.bottom + c.top) / 2 + p - t : g = Fs(i, e, t);
    u = a - o;
  } else {
    if (I(e)) {
      const _ = Object.keys(e)[0], x = e[_];
      f = h[_].getPixelForValue(x) - b + t;
    } else
      e === "center" ? f = (c.left + c.right) / 2 - b + t : f = Fs(i, e, t);
    g = ot(n, r, s), d = e === "left" ? -tt : tt;
  }
  return {
    titleX: f,
    titleY: g,
    maxWidth: u,
    rotation: d
  };
}
class se extends xt {
  constructor(t) {
    super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(t) {
    this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax);
  }
  parse(t, e) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: e, _suggestedMin: n, _suggestedMax: s } = this;
    return t = ut(t, Number.POSITIVE_INFINITY), e = ut(e, Number.NEGATIVE_INFINITY), n = ut(n, Number.POSITIVE_INFINITY), s = ut(s, Number.NEGATIVE_INFINITY), {
      min: ut(t, n),
      max: ut(e, s),
      minDefined: G(t),
      maxDefined: G(e)
    };
  }
  getMinMax(t) {
    let { min: e, max: n, minDefined: s, maxDefined: o } = this.getUserBounds(), r;
    if (s && o)
      return {
        min: e,
        max: n
      };
    const a = this.getMatchingVisibleMetas();
    for (let l = 0, c = a.length; l < c; ++l)
      r = a[l].controller.getMinMax(this, t), s || (e = Math.min(e, r.min)), o || (n = Math.max(n, r.max));
    return e = o && e > n ? n : e, n = s && e > n ? e : n, {
      min: ut(e, ut(n, e)),
      max: ut(n, ut(e, n))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const t = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
  }
  getLabelItems(t = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(t));
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    Y(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, e, n) {
    const { beginAtZero: s, grace: o, ticks: r } = this.options, a = r.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this._margins = n = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = el(this, o, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = a < this.ticks.length;
    this._convertTicksToLabels(l ? zs(this.ticks, a) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), r.display && (r.autoSkip || r.source === "auto") && (this.ticks = Lc(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, e, n;
    this.isHorizontal() ? (e = this.left, n = this.right) : (e = this.top, n = this.bottom, t = !t), this._startPixel = e, this._endPixel = n, this._reversePixels = t, this._length = n - e, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    Y(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    Y(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    Y(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), Y(this.options[t], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    Y(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const e = this.options.ticks;
    let n, s, o;
    for (n = 0, s = t.length; n < s; n++)
      o = t[n], o.label = Y(e.callback, [
        o.value,
        n,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    Y(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    Y(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, e = t.ticks, n = Is(this.ticks.length, t.ticks.maxTicksLimit), s = e.minRotation || 0, o = e.maxRotation;
    let r = s, a, l, c;
    if (!this._isVisible() || !e.display || s >= o || n <= 1 || !this.isHorizontal()) {
      this.labelRotation = s;
      return;
    }
    const h = this._getLabelSizes(), d = h.widest.width, u = h.highest.height, f = st(this.chart.width - d, 0, this.maxWidth);
    a = t.offset ? this.maxWidth / n : f / (n - 1), d + 6 > a && (a = f / (n - (t.offset ? 0.5 : 1)), l = this.maxHeight - xe(t.grid) - e.padding - Bs(t.title, this.chart.options.font), c = Math.sqrt(d * d + u * u), r = vn(Math.min(Math.asin(st((h.highest.height + 6) / a, -1, 1)), Math.asin(st(l / c, -1, 1)) - Math.asin(st(u / c, -1, 1)))), r = Math.max(s, Math.min(o, r))), this.labelRotation = r;
  }
  afterCalculateLabelRotation() {
    Y(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    Y(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: e, options: { ticks: n, title: s, grid: o } } = this, r = this._isVisible(), a = this.isHorizontal();
    if (r) {
      const l = Bs(s, e.options.font);
      if (a ? (t.width = this.maxWidth, t.height = xe(o) + l) : (t.height = this.maxHeight, t.width = xe(o) + l), n.display && this.ticks.length) {
        const { first: c, last: h, widest: d, highest: u } = this._getLabelSizes(), f = n.padding * 2, g = bt(this.labelRotation), p = Math.cos(g), b = Math.sin(g);
        if (a) {
          const _ = n.mirror ? 0 : b * d.width + p * u.height;
          t.height = Math.min(this.maxHeight, t.height + _ + f);
        } else {
          const _ = n.mirror ? 0 : p * d.width + b * u.height;
          t.width = Math.min(this.maxWidth, t.width + _ + f);
        }
        this._calculatePadding(c, h, b, p);
      }
    }
    this._handleMargins(), a ? (this.width = this._length = e.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = e.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, e, n, s) {
    const { ticks: { align: o, padding: r }, position: a } = this.options, l = this.labelRotation !== 0, c = a !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const h = this.getPixelForTick(0) - this.left, d = this.right - this.getPixelForTick(this.ticks.length - 1);
      let u = 0, f = 0;
      l ? c ? (u = s * t.width, f = n * e.height) : (u = n * t.height, f = s * e.width) : o === "start" ? f = e.width : o === "end" ? u = t.width : o !== "inner" && (u = t.width / 2, f = e.width / 2), this.paddingLeft = Math.max((u - h + r) * this.width / (this.width - h), 0), this.paddingRight = Math.max((f - d + r) * this.width / (this.width - d), 0);
    } else {
      let h = e.height / 2, d = t.height / 2;
      o === "start" ? (h = 0, d = t.height) : o === "end" && (h = e.height, d = 0), this.paddingTop = h + r, this.paddingBottom = d + r;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    Y(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: e } = this.options;
    return e === "top" || e === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let e, n;
    for (e = 0, n = t.length; e < n; e++)
      W(t[e].label) && (t.splice(e, 1), n--, e--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const e = this.options.ticks.sampleSize;
      let n = this.ticks;
      e < n.length && (n = zs(n, e)), this._labelSizes = t = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, e, n) {
    const { ctx: s, _longestTextCache: o } = this, r = [], a = [], l = Math.floor(e / Is(e, n));
    let c = 0, h = 0, d, u, f, g, p, b, _, x, k, v, y;
    for (d = 0; d < e; d += l) {
      if (g = t[d].label, p = this._resolveTickFontOptions(d), s.font = b = p.string, _ = o[b] = o[b] || {
        data: {},
        gc: []
      }, x = p.lineHeight, k = v = 0, !W(g) && !U(g))
        k = vi(s, _.data, _.gc, k, g), v = x;
      else if (U(g))
        for (u = 0, f = g.length; u < f; ++u)
          y = g[u], !W(y) && !U(y) && (k = vi(s, _.data, _.gc, k, y), v += x);
      r.push(k), a.push(v), c = Math.max(k, c), h = Math.max(v, h);
    }
    jc(o, e);
    const S = r.indexOf(c), P = a.indexOf(h), C = (D) => ({
      width: r[D] || 0,
      height: a[D] || 0
    });
    return {
      first: C(0),
      last: C(e - 1),
      widest: C(S),
      highest: C(P),
      widths: r,
      heights: a
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, e) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const e = this._startPixel + t * this._length;
    return Aa(this._alignToPixels ? Kt(this.chart, e, 0) : e);
  }
  getDecimalForPixel(t) {
    const e = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - e : e;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: e } = this;
    return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0;
  }
  getContext(t) {
    const e = this.ticks || [];
    if (t >= 0 && t < e.length) {
      const n = e[t];
      return n.$context || (n.$context = $c(this.getContext(), t, n));
    }
    return this.$context || (this.$context = Hc(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, e = bt(this.labelRotation), n = Math.abs(Math.cos(e)), s = Math.abs(Math.sin(e)), o = this._getLabelSizes(), r = t.autoSkipPadding || 0, a = o ? o.widest.width + r : 0, l = o ? o.highest.height + r : 0;
    return this.isHorizontal() ? l * n > a * s ? a / n : l / s : l * s < a * n ? l / n : a / s;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const e = this.axis, n = this.chart, s = this.options, { grid: o, position: r, border: a } = s, l = o.offset, c = this.isHorizontal(), d = this.ticks.length + (l ? 1 : 0), u = xe(o), f = [], g = a.setContext(this.getContext()), p = g.display ? g.width : 0, b = p / 2, _ = function(H) {
      return Kt(n, H, p);
    };
    let x, k, v, y, S, P, C, D, R, E, L, j;
    if (r === "top")
      x = _(this.bottom), P = this.bottom - u, D = x - b, E = _(t.top) + b, j = t.bottom;
    else if (r === "bottom")
      x = _(this.top), E = t.top, j = _(t.bottom) - b, P = x + b, D = this.top + u;
    else if (r === "left")
      x = _(this.right), S = this.right - u, C = x - b, R = _(t.left) + b, L = t.right;
    else if (r === "right")
      x = _(this.left), R = t.left, L = _(t.right) - b, S = x + b, C = this.left + u;
    else if (e === "x") {
      if (r === "center")
        x = _((t.top + t.bottom) / 2 + 0.5);
      else if (I(r)) {
        const H = Object.keys(r)[0], q = r[H];
        x = _(this.chart.scales[H].getPixelForValue(q));
      }
      E = t.top, j = t.bottom, P = x + b, D = P + u;
    } else if (e === "y") {
      if (r === "center")
        x = _((t.left + t.right) / 2);
      else if (I(r)) {
        const H = Object.keys(r)[0], q = r[H];
        x = _(this.chart.scales[H].getPixelForValue(q));
      }
      S = x - b, C = S - u, R = t.left, L = t.right;
    }
    const Z = T(s.ticks.maxTicksLimit, d), z = Math.max(1, Math.ceil(d / Z));
    for (k = 0; k < d; k += z) {
      const H = this.getContext(k), q = o.setContext(H), ct = a.setContext(H), it = q.lineWidth, wt = q.color, Yt = ct.dash || [], Mt = ct.dashOffset, Lt = q.tickWidth, St = q.tickColor, Ut = q.tickBorderDash || [], mt = q.tickBorderDashOffset;
      v = Nc(this, k, l), v !== void 0 && (y = Kt(n, v, it), c ? S = C = R = L = y : P = D = E = j = y, f.push({
        tx1: S,
        ty1: P,
        tx2: C,
        ty2: D,
        x1: R,
        y1: E,
        x2: L,
        y2: j,
        width: it,
        color: wt,
        borderDash: Yt,
        borderDashOffset: Mt,
        tickWidth: Lt,
        tickColor: St,
        tickBorderDash: Ut,
        tickBorderDashOffset: mt
      }));
    }
    return this._ticksLength = d, this._borderValue = x, f;
  }
  _computeLabelItems(t) {
    const e = this.axis, n = this.options, { position: s, ticks: o } = n, r = this.isHorizontal(), a = this.ticks, { align: l, crossAlign: c, padding: h, mirror: d } = o, u = xe(n.grid), f = u + h, g = d ? -h : f, p = -bt(this.labelRotation), b = [];
    let _, x, k, v, y, S, P, C, D, R, E, L, j = "middle";
    if (s === "top")
      S = this.bottom - g, P = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      S = this.top + g, P = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const z = this._getYAxisLabelAlignment(u);
      P = z.textAlign, y = z.x;
    } else if (s === "right") {
      const z = this._getYAxisLabelAlignment(u);
      P = z.textAlign, y = z.x;
    } else if (e === "x") {
      if (s === "center")
        S = (t.top + t.bottom) / 2 + f;
      else if (I(s)) {
        const z = Object.keys(s)[0], H = s[z];
        S = this.chart.scales[z].getPixelForValue(H) + f;
      }
      P = this._getXAxisLabelAlignment();
    } else if (e === "y") {
      if (s === "center")
        y = (t.left + t.right) / 2 - f;
      else if (I(s)) {
        const z = Object.keys(s)[0], H = s[z];
        y = this.chart.scales[z].getPixelForValue(H);
      }
      P = this._getYAxisLabelAlignment(u).textAlign;
    }
    e === "y" && (l === "start" ? j = "top" : l === "end" && (j = "bottom"));
    const Z = this._getLabelSizes();
    for (_ = 0, x = a.length; _ < x; ++_) {
      k = a[_], v = k.label;
      const z = o.setContext(this.getContext(_));
      C = this.getPixelForTick(_) + o.labelOffset, D = this._resolveTickFontOptions(_), R = D.lineHeight, E = U(v) ? v.length : 1;
      const H = E / 2, q = z.color, ct = z.textStrokeColor, it = z.textStrokeWidth;
      let wt = P;
      r ? (y = C, P === "inner" && (_ === x - 1 ? wt = this.options.reverse ? "left" : "right" : _ === 0 ? wt = this.options.reverse ? "right" : "left" : wt = "center"), s === "top" ? c === "near" || p !== 0 ? L = -E * R + R / 2 : c === "center" ? L = -Z.highest.height / 2 - H * R + R : L = -Z.highest.height + R / 2 : c === "near" || p !== 0 ? L = R / 2 : c === "center" ? L = Z.highest.height / 2 - H * R : L = Z.highest.height - E * R, d && (L *= -1), p !== 0 && !z.showLabelBackdrop && (y += R / 2 * Math.sin(p))) : (S = C, L = (1 - E) * R / 2);
      let Yt;
      if (z.showLabelBackdrop) {
        const Mt = at(z.backdropPadding), Lt = Z.heights[_], St = Z.widths[_];
        let Ut = L - Mt.top, mt = 0 - Mt.left;
        switch (j) {
          case "middle":
            Ut -= Lt / 2;
            break;
          case "bottom":
            Ut -= Lt;
            break;
        }
        switch (P) {
          case "center":
            mt -= St / 2;
            break;
          case "right":
            mt -= St;
            break;
          case "inner":
            _ === x - 1 ? mt -= St : _ > 0 && (mt -= St / 2);
            break;
        }
        Yt = {
          left: mt,
          top: Ut,
          width: St + Mt.width,
          height: Lt + Mt.height,
          color: z.backdropColor
        };
      }
      b.push({
        label: v,
        font: D,
        textOffset: L,
        options: {
          rotation: p,
          color: q,
          strokeColor: ct,
          strokeWidth: it,
          textAlign: wt,
          textBaseline: j,
          translation: [
            y,
            S
          ],
          backdrop: Yt
        }
      });
    }
    return b;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: e } = this.options;
    if (-bt(this.labelRotation))
      return t === "top" ? "left" : "right";
    let s = "center";
    return e.align === "start" ? s = "left" : e.align === "end" ? s = "right" : e.align === "inner" && (s = "inner"), s;
  }
  _getYAxisLabelAlignment(t) {
    const { position: e, ticks: { crossAlign: n, mirror: s, padding: o } } = this.options, r = this._getLabelSizes(), a = t + o, l = r.widest.width;
    let c, h;
    return e === "left" ? s ? (h = this.right + o, n === "near" ? c = "left" : n === "center" ? (c = "center", h += l / 2) : (c = "right", h += l)) : (h = this.right - a, n === "near" ? c = "right" : n === "center" ? (c = "center", h -= l / 2) : (c = "left", h = this.left)) : e === "right" ? s ? (h = this.left + o, n === "near" ? c = "right" : n === "center" ? (c = "center", h -= l / 2) : (c = "left", h -= l)) : (h = this.left + a, n === "near" ? c = "left" : n === "center" ? (c = "center", h += l / 2) : (c = "right", h = this.right)) : c = "right", {
      textAlign: c,
      x: h
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, e = this.options.position;
    if (e === "left" || e === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (e === "top" || e === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: e }, left: n, top: s, width: o, height: r } = this;
    e && (t.save(), t.fillStyle = e, t.fillRect(n, s, o, r), t.restore());
  }
  getLineWidthForValue(t) {
    const e = this.options.grid;
    if (!this._isVisible() || !e.display)
      return 0;
    const s = this.ticks.findIndex((o) => o.value === t);
    return s >= 0 ? e.setContext(this.getContext(s)).lineWidth : 0;
  }
  drawGrid(t) {
    const e = this.options.grid, n = this.ctx, s = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let o, r;
    const a = (l, c, h) => {
      !h.width || !h.color || (n.save(), n.lineWidth = h.width, n.strokeStyle = h.color, n.setLineDash(h.borderDash || []), n.lineDashOffset = h.borderDashOffset, n.beginPath(), n.moveTo(l.x, l.y), n.lineTo(c.x, c.y), n.stroke(), n.restore());
    };
    if (e.display)
      for (o = 0, r = s.length; o < r; ++o) {
        const l = s[o];
        e.drawOnChartArea && a({
          x: l.x1,
          y: l.y1
        }, {
          x: l.x2,
          y: l.y2
        }, l), e.drawTicks && a({
          x: l.tx1,
          y: l.ty1
        }, {
          x: l.tx2,
          y: l.ty2
        }, {
          color: l.tickColor,
          width: l.tickWidth,
          borderDash: l.tickBorderDash,
          borderDashOffset: l.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: e, options: { border: n, grid: s } } = this, o = n.setContext(this.getContext()), r = n.display ? o.width : 0;
    if (!r)
      return;
    const a = s.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let c, h, d, u;
    this.isHorizontal() ? (c = Kt(t, this.left, r) - r / 2, h = Kt(t, this.right, a) + a / 2, d = u = l) : (d = Kt(t, this.top, r) - r / 2, u = Kt(t, this.bottom, a) + a / 2, c = h = l), e.save(), e.lineWidth = o.width, e.strokeStyle = o.color, e.beginPath(), e.moveTo(c, d), e.lineTo(h, u), e.stroke(), e.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const n = this.ctx, s = this._computeLabelArea();
    s && Oi(n, s);
    const o = this.getLabelItems(t);
    for (const r of o) {
      const a = r.options, l = r.font, c = r.label, h = r.textOffset;
      ne(n, c, 0, h, l, a);
    }
    s && Di(n);
  }
  drawTitle() {
    const { ctx: t, options: { position: e, title: n, reverse: s } } = this;
    if (!n.display)
      return;
    const o = nt(n.font), r = at(n.padding), a = n.align;
    let l = o.lineHeight / 2;
    e === "bottom" || e === "center" || I(e) ? (l += r.bottom, U(n.text) && (l += o.lineHeight * (n.text.length - 1))) : l += r.top;
    const { titleX: c, titleY: h, maxWidth: d, rotation: u } = Uc(this, l, e, a);
    ne(t, n.text, 0, 0, o, {
      color: n.color,
      maxWidth: d,
      rotation: u,
      textAlign: Yc(a, e, s),
      textBaseline: "middle",
      translation: [
        c,
        h
      ]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, e = t.ticks && t.ticks.z || 0, n = T(t.grid && t.grid.z, -1), s = T(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== se.prototype.draw ? [
      {
        z: e,
        draw: (o) => {
          this.draw(o);
        }
      }
    ] : [
      {
        z: n,
        draw: (o) => {
          this.drawBackground(), this.drawGrid(o), this.drawTitle();
        }
      },
      {
        z: s,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: e,
        draw: (o) => {
          this.drawLabels(o);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const e = this.chart.getSortedVisibleDatasetMetas(), n = this.axis + "AxisID", s = [];
    let o, r;
    for (o = 0, r = e.length; o < r; ++o) {
      const a = e[o];
      a[n] === this.id && (!t || a.type === t) && s.push(a);
    }
    return s;
  }
  _resolveTickFontOptions(t) {
    const e = this.options.ticks.setContext(this.getContext(t));
    return nt(e.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class si {
  constructor(t, e, n) {
    this.type = t, this.scope = e, this.override = n, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const e = Object.getPrototypeOf(t);
    let n;
    qc(e) && (n = this.register(e));
    const s = this.items, o = t.id, r = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in s || (s[o] = t, Xc(t, r, n), this.override && J.override(t.id, t.overrides)), r;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const e = this.items, n = t.id, s = this.scope;
    n in e && delete e[n], s && n in J[s] && (delete J[s][n], this.override && delete ie[n]);
  }
}
function Xc(i, t, e) {
  const n = Fe(/* @__PURE__ */ Object.create(null), [
    e ? J.get(e) : {},
    J.get(t),
    i.defaults
  ]);
  J.set(t, n), i.defaultRoutes && Kc(t, i.defaultRoutes), i.descriptors && J.describe(t, i.descriptors);
}
function Kc(i, t) {
  Object.keys(t).forEach((e) => {
    const n = e.split("."), s = n.pop(), o = [
      i
    ].concat(n).join("."), r = t[e].split("."), a = r.pop(), l = r.join(".");
    J.route(o, s, l, a);
  });
}
function qc(i) {
  return "id" in i && "defaults" in i;
}
class Gc {
  constructor() {
    this.controllers = new si(_t, "datasets", !0), this.elements = new si(xt, "elements"), this.plugins = new si(Object, "plugins"), this.scales = new si(se, "scales"), this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...t) {
    this._each("register", t);
  }
  remove(...t) {
    this._each("unregister", t);
  }
  addControllers(...t) {
    this._each("register", t, this.controllers);
  }
  addElements(...t) {
    this._each("register", t, this.elements);
  }
  addPlugins(...t) {
    this._each("register", t, this.plugins);
  }
  addScales(...t) {
    this._each("register", t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, "controller");
  }
  getElement(t) {
    return this._get(t, this.elements, "element");
  }
  getPlugin(t) {
    return this._get(t, this.plugins, "plugin");
  }
  getScale(t) {
    return this._get(t, this.scales, "scale");
  }
  removeControllers(...t) {
    this._each("unregister", t, this.controllers);
  }
  removeElements(...t) {
    this._each("unregister", t, this.elements);
  }
  removePlugins(...t) {
    this._each("unregister", t, this.plugins);
  }
  removeScales(...t) {
    this._each("unregister", t, this.scales);
  }
  _each(t, e, n) {
    [
      ...e
    ].forEach((s) => {
      const o = n || this._getRegistryForType(s);
      n || o.isForType(s) || o === this.plugins && s.id ? this._exec(t, o, s) : N(s, (r) => {
        const a = n || this._getRegistryForType(r);
        this._exec(t, a, r);
      });
    });
  }
  _exec(t, e, n) {
    const s = yn(t);
    Y(n["before" + s], [], n), e[t](n), Y(n["after" + s], [], n);
  }
  _getRegistryForType(t) {
    for (let e = 0; e < this._typedRegistries.length; e++) {
      const n = this._typedRegistries[e];
      if (n.isForType(t))
        return n;
    }
    return this.plugins;
  }
  _get(t, e, n) {
    const s = e.get(t);
    if (s === void 0)
      throw new Error('"' + t + '" is not a registered ' + n + ".");
    return s;
  }
}
var vt = /* @__PURE__ */ new Gc();
class Jc {
  constructor() {
    this._init = [];
  }
  notify(t, e, n, s) {
    e === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install"));
    const o = s ? this._descriptors(t).filter(s) : this._descriptors(t), r = this._notify(o, t, e, n);
    return e === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall")), r;
  }
  _notify(t, e, n, s) {
    s = s || {};
    for (const o of t) {
      const r = o.plugin, a = r[n], l = [
        e,
        s,
        o.options
      ];
      if (Y(a, l, r) === !1 && s.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    W(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const e = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), e;
  }
  _createDescriptors(t, e) {
    const n = t && t.config, s = T(n.options && n.options.plugins, {}), o = Zc(n);
    return s === !1 && !e ? [] : th(t, o, s, e);
  }
  _notifyStateChanges(t) {
    const e = this._oldCache || [], n = this._cache, s = (o, r) => o.filter((a) => !r.some((l) => a.plugin.id === l.plugin.id));
    this._notify(s(e, n), t, "stop"), this._notify(s(n, e), t, "start");
  }
}
function Zc(i) {
  const t = {}, e = [], n = Object.keys(vt.plugins.items);
  for (let o = 0; o < n.length; o++)
    e.push(vt.getPlugin(n[o]));
  const s = i.plugins || [];
  for (let o = 0; o < s.length; o++) {
    const r = s[o];
    e.indexOf(r) === -1 && (e.push(r), t[r.id] = !0);
  }
  return {
    plugins: e,
    localIds: t
  };
}
function Qc(i, t) {
  return !t && i === !1 ? null : i === !0 ? {} : i;
}
function th(i, { plugins: t, localIds: e }, n, s) {
  const o = [], r = i.getContext();
  for (const a of t) {
    const l = a.id, c = Qc(n[l], s);
    c !== null && o.push({
      plugin: a,
      options: eh(i.config, {
        plugin: a,
        local: e[l]
      }, c, r)
    });
  }
  return o;
}
function eh(i, { plugin: t, local: e }, n, s) {
  const o = i.pluginScopeKeys(t), r = i.getOptionScopes(n, o);
  return e && t.defaults && r.push(t.defaults), i.createResolver(r, s, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function rn(i, t) {
  const e = J.datasets[i] || {};
  return ((t.datasets || {})[i] || {}).indexAxis || t.indexAxis || e.indexAxis || "x";
}
function ih(i, t) {
  let e = i;
  return i === "_index_" ? e = t : i === "_value_" && (e = t === "x" ? "y" : "x"), e;
}
function nh(i, t) {
  return i === t ? "_index_" : "_value_";
}
function Ws(i) {
  if (i === "x" || i === "y" || i === "r")
    return i;
}
function sh(i) {
  if (i === "top" || i === "bottom")
    return "x";
  if (i === "left" || i === "right")
    return "y";
}
function an(i, ...t) {
  if (Ws(i))
    return i;
  for (const e of t) {
    const n = e.axis || sh(e.position) || i.length > 1 && Ws(i[0].toLowerCase());
    if (n)
      return n;
  }
  throw new Error(`Cannot determine type of '${i}' axis. Please provide 'axis' or 'position' option.`);
}
function Vs(i, t, e) {
  if (e[t + "AxisID"] === i)
    return {
      axis: t
    };
}
function oh(i, t) {
  if (t.data && t.data.datasets) {
    const e = t.data.datasets.filter((n) => n.xAxisID === i || n.yAxisID === i);
    if (e.length)
      return Vs(i, "x", e[0]) || Vs(i, "y", e[0]);
  }
  return {};
}
function rh(i, t) {
  const e = ie[i.type] || {
    scales: {}
  }, n = t.scales || {}, s = rn(i.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((r) => {
    const a = n[r];
    if (!I(a))
      return console.error(`Invalid scale configuration for scale: ${r}`);
    if (a._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${r}`);
    const l = an(r, a, oh(r, i), J.scales[a.type]), c = nh(l, s), h = e.scales || {};
    o[r] = Ce(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      a,
      h[l],
      h[c]
    ]);
  }), i.data.datasets.forEach((r) => {
    const a = r.type || i.type, l = r.indexAxis || rn(a, t), h = (ie[a] || {}).scales || {};
    Object.keys(h).forEach((d) => {
      const u = ih(d, l), f = r[u + "AxisID"] || u;
      o[f] = o[f] || /* @__PURE__ */ Object.create(null), Ce(o[f], [
        {
          axis: u
        },
        n[f],
        h[d]
      ]);
    });
  }), Object.keys(o).forEach((r) => {
    const a = o[r];
    Ce(a, [
      J.scales[a.type],
      J.scale
    ]);
  }), o;
}
function sr(i) {
  const t = i.options || (i.options = {});
  t.plugins = T(t.plugins, {}), t.scales = rh(i, t);
}
function or(i) {
  return i = i || {}, i.datasets = i.datasets || [], i.labels = i.labels || [], i;
}
function ah(i) {
  return i = i || {}, i.data = or(i.data), sr(i), i;
}
const Ns = /* @__PURE__ */ new Map(), rr = /* @__PURE__ */ new Set();
function oi(i, t) {
  let e = Ns.get(i);
  return e || (e = t(), Ns.set(i, e), rr.add(e)), e;
}
const ye = (i, t, e) => {
  const n = jt(t, e);
  n !== void 0 && i.add(n);
};
class lh {
  constructor(t) {
    this._config = ah(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(t) {
    this._config.type = t;
  }
  get data() {
    return this._config.data;
  }
  set data(t) {
    this._config.data = or(t);
  }
  get options() {
    return this._config.options;
  }
  set options(t) {
    this._config.options = t;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const t = this._config;
    this.clearCache(), sr(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return oi(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, e) {
    return oi(`${t}.transition.${e}`, () => [
      [
        `datasets.${t}.transitions.${e}`,
        `transitions.${e}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, e) {
    return oi(`${t}-${e}`, () => [
      [
        `datasets.${t}.elements.${e}`,
        `datasets.${t}`,
        `elements.${e}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const e = t.id, n = this.type;
    return oi(`${n}-plugin-${e}`, () => [
      [
        `plugins.${e}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, e) {
    const n = this._scopeCache;
    let s = n.get(t);
    return (!s || e) && (s = /* @__PURE__ */ new Map(), n.set(t, s)), s;
  }
  getOptionScopes(t, e, n) {
    const { options: s, type: o } = this, r = this._cachedScopes(t, n), a = r.get(e);
    if (a)
      return a;
    const l = /* @__PURE__ */ new Set();
    e.forEach((h) => {
      t && (l.add(t), h.forEach((d) => ye(l, t, d))), h.forEach((d) => ye(l, s, d)), h.forEach((d) => ye(l, ie[o] || {}, d)), h.forEach((d) => ye(l, J, d)), h.forEach((d) => ye(l, nn, d));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), rr.has(e) && r.set(e, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: e } = this;
    return [
      t,
      ie[e] || {},
      J.datasets[e] || {},
      {
        type: e
      },
      J,
      nn
    ];
  }
  resolveNamedOptions(t, e, n, s = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: r, subPrefixes: a } = js(this._resolverCache, t, s);
    let l = r;
    if (hh(r, e)) {
      o.$shared = !1, n = Ht(n) ? n() : n;
      const c = this.createResolver(t, n, a);
      l = de(r, n, c);
    }
    for (const c of e)
      o[c] = l[c];
    return o;
  }
  createResolver(t, e, n = [
    ""
  ], s) {
    const { resolver: o } = js(this._resolverCache, t, n);
    return I(e) ? de(o, e, void 0, s) : o;
  }
}
function js(i, t, e) {
  let n = i.get(t);
  n || (n = /* @__PURE__ */ new Map(), i.set(t, n));
  const s = e.join();
  let o = n.get(s);
  return o || (o = {
    resolver: Pn(t, e),
    subPrefixes: e.filter((a) => !a.toLowerCase().includes("hover"))
  }, n.set(s, o)), o;
}
const ch = (i) => I(i) && Object.getOwnPropertyNames(i).some((t) => Ht(i[t]));
function hh(i, t) {
  const { isScriptable: e, isIndexable: n } = Wo(i);
  for (const s of t) {
    const o = e(s), r = n(s), a = (r || o) && i[s];
    if (o && (Ht(a) || ch(a)) || r && U(a))
      return !0;
  }
  return !1;
}
var dh = "4.4.2";
const uh = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Hs(i, t) {
  return i === "top" || i === "bottom" || uh.indexOf(i) === -1 && t === "x";
}
function $s(i, t) {
  return function(e, n) {
    return e[i] === n[i] ? e[t] - n[t] : e[i] - n[i];
  };
}
function Ys(i) {
  const t = i.chart, e = t.options.animation;
  t.notifyPlugins("afterRender"), Y(e && e.onComplete, [
    i
  ], t);
}
function fh(i) {
  const t = i.chart, e = t.options.animation;
  Y(e && e.onProgress, [
    i
  ], t);
}
function ar(i) {
  return Dn() && typeof i == "string" ? i = document.getElementById(i) : i && i.length && (i = i[0]), i && i.canvas && (i = i.canvas), i;
}
const gi = {}, Us = (i) => {
  const t = ar(i);
  return Object.values(gi).filter((e) => e.canvas === t).pop();
};
function gh(i, t, e) {
  const n = Object.keys(i);
  for (const s of n) {
    const o = +s;
    if (o >= t) {
      const r = i[s];
      delete i[s], (e > 0 || o > t) && (i[o + e] = r);
    }
  }
}
function ph(i, t, e, n) {
  return !e || i.type === "mouseout" ? null : n ? t : i;
}
function ri(i, t, e) {
  return i.options.clip ? i[e] : t[e];
}
function mh(i, t) {
  const { xScale: e, yScale: n } = i;
  return e && n ? {
    left: ri(e, t, "left"),
    right: ri(e, t, "right"),
    top: ri(n, t, "top"),
    bottom: ri(n, t, "bottom")
  } : t;
}
var Ft;
let Ti = (Ft = class {
  static register(...t) {
    vt.add(...t), Xs();
  }
  static unregister(...t) {
    vt.remove(...t), Xs();
  }
  constructor(t, e) {
    const n = this.config = new lh(e), s = ar(t), o = Us(s);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const r = n.createResolver(n.chartOptionScopes(), this.getContext());
    this.platform = new (n.platform || Ec(s))(), this.platform.updateConfig(n);
    const a = this.platform.acquireContext(s, r.aspectRatio), l = a && a.canvas, c = l && l.height, h = l && l.width;
    if (this.id = _a(), this.ctx = a, this.canvas = l, this.width = h, this.height = c, this._options = r, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Jc(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = La((d) => this.update(d), r.resizeDelay || 0), this._dataChanges = [], gi[this.id] = this, !a || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Ot.listen(this, "complete", Ys), Ot.listen(this, "progress", fh), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: e }, width: n, height: s, _aspectRatio: o } = this;
    return W(t) ? e && o ? o : s ? n / s : null : t;
  }
  get data() {
    return this.config.data;
  }
  set data(t) {
    this.config.data = t;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this.config.options = t;
  }
  get registry() {
    return vt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : gs(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return ds(this.canvas, this.ctx), this;
  }
  stop() {
    return Ot.stop(this), this;
  }
  resize(t, e) {
    Ot.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: e
    } : this._resize(t, e);
  }
  _resize(t, e) {
    const n = this.options, s = this.canvas, o = n.maintainAspectRatio && this.aspectRatio, r = this.platform.getMaximumSize(s, t, e, o), a = n.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = r.width, this.height = r.height, this._aspectRatio = this.aspectRatio, gs(this, a, !0) && (this.notifyPlugins("resize", {
      size: r
    }), Y(n.onResize, [
      this,
      r
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const e = this.options.scales || {};
    N(e, (n, s) => {
      n.id = s;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, e = t.scales, n = this.scales, s = Object.keys(n).reduce((r, a) => (r[a] = !1, r), {});
    let o = [];
    e && (o = o.concat(Object.keys(e).map((r) => {
      const a = e[r], l = an(r, a), c = l === "r", h = l === "x";
      return {
        options: a,
        dposition: c ? "chartArea" : h ? "bottom" : "left",
        dtype: c ? "radialLinear" : h ? "category" : "linear"
      };
    }))), N(o, (r) => {
      const a = r.options, l = a.id, c = an(l, a), h = T(a.type, r.dtype);
      (a.position === void 0 || Hs(a.position, c) !== Hs(r.dposition)) && (a.position = r.dposition), s[l] = !0;
      let d = null;
      if (l in n && n[l].type === h)
        d = n[l];
      else {
        const u = vt.getScale(h);
        d = new u({
          id: l,
          type: h,
          ctx: this.ctx,
          chart: this
        }), n[d.id] = d;
      }
      d.init(a, t);
    }), N(s, (r, a) => {
      r || delete n[a];
    }), N(n, (r) => {
      rt.configure(this, r, r.options), rt.addBox(this, r);
    });
  }
  _updateMetasets() {
    const t = this._metasets, e = this.data.datasets.length, n = t.length;
    if (t.sort((s, o) => s.index - o.index), n > e) {
      for (let s = e; s < n; ++s)
        this._destroyDatasetMeta(s);
      t.splice(e, n - e);
    }
    this._sortedMetasets = t.slice(0).sort($s("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: e } } = this;
    t.length > e.length && delete this._stacks, t.forEach((n, s) => {
      e.filter((o) => o === n._dataset).length === 0 && this._destroyDatasetMeta(s);
    });
  }
  buildOrUpdateControllers() {
    const t = [], e = this.data.datasets;
    let n, s;
    for (this._removeUnreferencedMetasets(), n = 0, s = e.length; n < s; n++) {
      const o = e[n];
      let r = this.getDatasetMeta(n);
      const a = o.type || this.config.type;
      if (r.type && r.type !== a && (this._destroyDatasetMeta(n), r = this.getDatasetMeta(n)), r.type = a, r.indexAxis = o.indexAxis || rn(a, this.options), r.order = o.order || 0, r.index = n, r.label = "" + o.label, r.visible = this.isDatasetVisible(n), r.controller)
        r.controller.updateIndex(n), r.controller.linkScales();
      else {
        const l = vt.getController(a), { datasetElementType: c, dataElementType: h } = J.datasets[a];
        Object.assign(l, {
          dataElementType: vt.getElement(h),
          datasetElementType: c && vt.getElement(c)
        }), r.controller = new l(this, n), t.push(r.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    N(this.data.datasets, (t, e) => {
      this.getDatasetMeta(e).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const e = this.config;
    e.update();
    const n = this._options = e.createResolver(e.chartOptionScopes(), this.getContext()), s = this._animationsDisabled = !n.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let r = 0;
    for (let c = 0, h = this.data.datasets.length; c < h; c++) {
      const { controller: d } = this.getDatasetMeta(c), u = !s && o.indexOf(d) === -1;
      d.buildOrUpdateElements(u), r = Math.max(+d.getMaxOverflow(), r);
    }
    r = this._minPadding = n.layout.autoPadding ? r : 0, this._updateLayout(r), s || N(o, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort($s("z", "_idx"));
    const { _active: a, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : a.length && this._updateHoverStyles(a, a, !0), this.render();
  }
  _updateScales() {
    N(this.scales, (t) => {
      rt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, e = new Set(Object.keys(this._listeners)), n = new Set(t.events);
    (!is(e, n) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, e = this._getUniformDataChanges() || [];
    for (const { method: n, start: s, count: o } of e) {
      const r = n === "_removeElements" ? -o : o;
      gh(t, s, r);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const e = this.data.datasets.length, n = (o) => new Set(t.filter((r) => r[0] === o).map((r, a) => a + "," + r.splice(1).join(","))), s = n(0);
    for (let o = 1; o < e; o++)
      if (!is(s, n(o)))
        return;
    return Array.from(s).map((o) => o.split(",")).map((o) => ({
      method: o[1],
      start: +o[2],
      count: +o[3]
    }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    rt.update(this, this.width, this.height, t);
    const e = this.chartArea, n = e.width <= 0 || e.height <= 0;
    this._layers = [], N(this.boxes, (s) => {
      n && s.position === "chartArea" || (s.configure && s.configure(), this._layers.push(...s._layers()));
    }, this), this._layers.forEach((s, o) => {
      s._idx = o;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let e = 0, n = this.data.datasets.length; e < n; ++e)
        this.getDatasetMeta(e).controller.configure();
      for (let e = 0, n = this.data.datasets.length; e < n; ++e)
        this._updateDataset(e, Ht(t) ? t({
          datasetIndex: e
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, e) {
    const n = this.getDatasetMeta(t), s = {
      meta: n,
      index: t,
      mode: e,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", s) !== !1 && (n.controller._update(e), s.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", s));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (Ot.has(this) ? this.attached && !Ot.running(this) && Ot.start(this) : (this.draw(), Ys({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: n, height: s } = this._resizeBeforeDraw;
      this._resize(n, s), this._resizeBeforeDraw = null;
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const e = this._layers;
    for (t = 0; t < e.length && e[t].z <= 0; ++t)
      e[t].draw(this.chartArea);
    for (this._drawDatasets(); t < e.length; ++t)
      e[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const e = this._sortedMetasets, n = [];
    let s, o;
    for (s = 0, o = e.length; s < o; ++s) {
      const r = e[s];
      (!t || r.visible) && n.push(r);
    }
    return n;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: !0
    }) === !1)
      return;
    const t = this.getSortedVisibleDatasetMetas();
    for (let e = t.length - 1; e >= 0; --e)
      this._drawDataset(t[e]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const e = this.ctx, n = t._clip, s = !n.disabled, o = mh(t, this.chartArea), r = {
      meta: t,
      index: t.index,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetDraw", r) !== !1 && (s && Oi(e, {
      left: n.left === !1 ? 0 : o.left - n.left,
      right: n.right === !1 ? this.width : o.right + n.right,
      top: n.top === !1 ? 0 : o.top - n.top,
      bottom: n.bottom === !1 ? this.height : o.bottom + n.bottom
    }), t.controller.draw(), s && Di(e), r.cancelable = !1, this.notifyPlugins("afterDatasetDraw", r));
  }
  isPointInArea(t) {
    return Et(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, e, n, s) {
    const o = uc.modes[e];
    return typeof o == "function" ? o(this, t, n, s) : [];
  }
  getDatasetMeta(t) {
    const e = this.data.datasets[t], n = this._metasets;
    let s = n.filter((o) => o && o._dataset === e).pop();
    return s || (s = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: e && e.order || 0,
      index: t,
      _dataset: e,
      _parsed: [],
      _sorted: !1
    }, n.push(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = $t(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const e = this.data.datasets[t];
    if (!e)
      return !1;
    const n = this.getDatasetMeta(t);
    return typeof n.hidden == "boolean" ? !n.hidden : !e.hidden;
  }
  setDatasetVisibility(t, e) {
    const n = this.getDatasetMeta(t);
    n.hidden = !e;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, e, n) {
    const s = n ? "show" : "hide", o = this.getDatasetMeta(t), r = o.controller._resolveAnimations(void 0, s);
    Ie(e) ? (o.data[e].hidden = !n, this.update()) : (this.setDatasetVisibility(t, n), r.update(o, {
      visible: n
    }), this.update((a) => a.datasetIndex === t ? s : void 0));
  }
  hide(t, e) {
    this._updateVisibility(t, e, !1);
  }
  show(t, e) {
    this._updateVisibility(t, e, !0);
  }
  _destroyDatasetMeta(t) {
    const e = this._metasets[t];
    e && e.controller && e.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, e;
    for (this.stop(), Ot.remove(this), t = 0, e = this.data.datasets.length; t < e; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: e } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), ds(t, e), this.platform.releaseContext(e), this.canvas = null, this.ctx = null), delete gi[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, e = this.platform, n = (o, r) => {
      e.addEventListener(this, o, r), t[o] = r;
    }, s = (o, r, a) => {
      o.offsetX = r, o.offsetY = a, this._eventHandler(o);
    };
    N(this.options.events, (o) => n(o, s));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, e = this.platform, n = (l, c) => {
      e.addEventListener(this, l, c), t[l] = c;
    }, s = (l, c) => {
      t[l] && (e.removeEventListener(this, l, c), delete t[l]);
    }, o = (l, c) => {
      this.canvas && this.resize(l, c);
    };
    let r;
    const a = () => {
      s("attach", a), this.attached = !0, this.resize(), n("resize", o), n("detach", r);
    };
    r = () => {
      this.attached = !1, s("resize", o), this._stop(), this._resize(0, 0), n("attach", a);
    }, e.isAttached(this.canvas) ? a() : r();
  }
  unbindEvents() {
    N(this._listeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._listeners = {}, N(this._responsiveListeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, e, n) {
    const s = n ? "set" : "remove";
    let o, r, a, l;
    for (e === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + s + "DatasetHoverStyle"]()), a = 0, l = t.length; a < l; ++a) {
      r = t[a];
      const c = r && this.getDatasetMeta(r.datasetIndex).controller;
      c && c[s + "HoverStyle"](r.element, r.datasetIndex, r.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const e = this._active || [], n = t.map(({ datasetIndex: o, index: r }) => {
      const a = this.getDatasetMeta(o);
      if (!a)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: a.data[r],
        index: r
      };
    });
    !_i(n, e) && (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, e));
  }
  notifyPlugins(t, e, n) {
    return this._plugins.notify(this, t, e, n);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((e) => e.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, e, n) {
    const s = this.options.hover, o = (l, c) => l.filter((h) => !c.some((d) => h.datasetIndex === d.datasetIndex && h.index === d.index)), r = o(e, t), a = n ? t : o(t, e);
    r.length && this.updateHoverStyle(r, s.mode, !1), a.length && s.mode && this.updateHoverStyle(a, s.mode, !0);
  }
  _eventHandler(t, e) {
    const n = {
      event: t,
      replay: e,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, s = (r) => (r.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", n, s) === !1)
      return;
    const o = this._handleEvent(t, e, n.inChartArea);
    return n.cancelable = !1, this.notifyPlugins("afterEvent", n, s), (o || n.changed) && this.render(), this;
  }
  _handleEvent(t, e, n) {
    const { _active: s = [], options: o } = this, r = e, a = this._getActiveElements(t, s, n, r), l = Ma(t), c = ph(t, this._lastEvent, n, l);
    n && (this._lastEvent = null, Y(o.onHover, [
      t,
      a,
      this
    ], this), l && Y(o.onClick, [
      t,
      a,
      this
    ], this));
    const h = !_i(a, s);
    return (h || e) && (this._active = a, this._updateHoverStyles(a, s, e)), this._lastEvent = c, h;
  }
  _getActiveElements(t, e, n, s) {
    if (t.type === "mouseout")
      return [];
    if (!n)
      return e;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, s);
  }
}, M(Ft, "defaults", J), M(Ft, "instances", gi), M(Ft, "overrides", ie), M(Ft, "registry", vt), M(Ft, "version", dh), M(Ft, "getChart", Us), Ft);
function Xs() {
  return N(Ti.instances, (i) => i._plugins.invalidate());
}
function bh(i, t, e) {
  const { startAngle: n, pixelMargin: s, x: o, y: r, outerRadius: a, innerRadius: l } = t;
  let c = s / a;
  i.beginPath(), i.arc(o, r, a, n - c, e + c), l > s ? (c = s / l, i.arc(o, r, l, e + c, n - c, !0)) : i.arc(o, r, s, e + tt, n - tt), i.closePath(), i.clip();
}
function _h(i) {
  return Sn(i, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function xh(i, t, e, n) {
  const s = _h(i.options.borderRadius), o = (e - t) / 2, r = Math.min(o, n * t / 2), a = (l) => {
    const c = (e - Math.min(o, l)) * n / 2;
    return st(l, 0, Math.min(o, c));
  };
  return {
    outerStart: a(s.outerStart),
    outerEnd: a(s.outerEnd),
    innerStart: st(s.innerStart, 0, r),
    innerEnd: st(s.innerEnd, 0, r)
  };
}
function le(i, t, e, n) {
  return {
    x: e + i * Math.cos(t),
    y: n + i * Math.sin(t)
  };
}
function Mi(i, t, e, n, s, o) {
  const { x: r, y: a, startAngle: l, pixelMargin: c, innerRadius: h } = t, d = Math.max(t.outerRadius + n + e - c, 0), u = h > 0 ? h + n + e + c : 0;
  let f = 0;
  const g = s - l;
  if (n) {
    const z = h > 0 ? h - n : 0, H = d > 0 ? d - n : 0, q = (z + H) / 2, ct = q !== 0 ? g * q / (q + n) : g;
    f = (g - ct) / 2;
  }
  const p = Math.max(1e-3, g * d - e / K) / d, b = (g - p) / 2, _ = l + b + f, x = s - b - f, { outerStart: k, outerEnd: v, innerStart: y, innerEnd: S } = xh(t, u, d, x - _), P = d - k, C = d - v, D = _ + k / P, R = x - v / C, E = u + y, L = u + S, j = _ + y / E, Z = x - S / L;
  if (i.beginPath(), o) {
    const z = (D + R) / 2;
    if (i.arc(r, a, d, D, z), i.arc(r, a, d, z, R), v > 0) {
      const it = le(C, R, r, a);
      i.arc(it.x, it.y, v, R, x + tt);
    }
    const H = le(L, x, r, a);
    if (i.lineTo(H.x, H.y), S > 0) {
      const it = le(L, Z, r, a);
      i.arc(it.x, it.y, S, x + tt, Z + Math.PI);
    }
    const q = (x - S / u + (_ + y / u)) / 2;
    if (i.arc(r, a, u, x - S / u, q, !0), i.arc(r, a, u, q, _ + y / u, !0), y > 0) {
      const it = le(E, j, r, a);
      i.arc(it.x, it.y, y, j + Math.PI, _ - tt);
    }
    const ct = le(P, _, r, a);
    if (i.lineTo(ct.x, ct.y), k > 0) {
      const it = le(P, D, r, a);
      i.arc(it.x, it.y, k, _ - tt, D);
    }
  } else {
    i.moveTo(r, a);
    const z = Math.cos(D) * d + r, H = Math.sin(D) * d + a;
    i.lineTo(z, H);
    const q = Math.cos(R) * d + r, ct = Math.sin(R) * d + a;
    i.lineTo(q, ct);
  }
  i.closePath();
}
function yh(i, t, e, n, s) {
  const { fullCircles: o, startAngle: r, circumference: a } = t;
  let l = t.endAngle;
  if (o) {
    Mi(i, t, e, n, l, s);
    for (let c = 0; c < o; ++c)
      i.fill();
    isNaN(a) || (l = r + (a % X || X));
  }
  return Mi(i, t, e, n, l, s), i.fill(), l;
}
function vh(i, t, e, n, s) {
  const { fullCircles: o, startAngle: r, circumference: a, options: l } = t, { borderWidth: c, borderJoinStyle: h, borderDash: d, borderDashOffset: u } = l, f = l.borderAlign === "inner";
  if (!c)
    return;
  i.setLineDash(d || []), i.lineDashOffset = u, f ? (i.lineWidth = c * 2, i.lineJoin = h || "round") : (i.lineWidth = c, i.lineJoin = h || "bevel");
  let g = t.endAngle;
  if (o) {
    Mi(i, t, e, n, g, s);
    for (let p = 0; p < o; ++p)
      i.stroke();
    isNaN(a) || (g = r + (a % X || X));
  }
  f && bh(i, t, g), o || (Mi(i, t, e, n, g, s), i.stroke());
}
class Me extends xt {
  constructor(e) {
    super();
    M(this, "circumference");
    M(this, "endAngle");
    M(this, "fullCircles");
    M(this, "innerRadius");
    M(this, "outerRadius");
    M(this, "pixelMargin");
    M(this, "startAngle");
    this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, e && Object.assign(this, e);
  }
  inRange(e, n, s) {
    const o = this.getProps([
      "x",
      "y"
    ], s), { angle: r, distance: a } = Do(o, {
      x: e,
      y: n
    }), { startAngle: l, endAngle: c, innerRadius: h, outerRadius: d, circumference: u } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], s), f = (this.options.spacing + this.options.borderWidth) / 2, p = T(u, c - l) >= X || ze(r, l, c), b = Tt(a, h + f, d + f);
    return p && b;
  }
  getCenterPoint(e) {
    const { x: n, y: s, startAngle: o, endAngle: r, innerRadius: a, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], e), { offset: c, spacing: h } = this.options, d = (o + r) / 2, u = (a + l + h + c) / 2;
    return {
      x: n + Math.cos(d) * u,
      y: s + Math.sin(d) * u
    };
  }
  tooltipPosition(e) {
    return this.getCenterPoint(e);
  }
  draw(e) {
    const { options: n, circumference: s } = this, o = (n.offset || 0) / 4, r = (n.spacing || 0) / 2, a = n.circular;
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = s > X ? Math.floor(s / X) : 0, s === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    e.save();
    const l = (this.startAngle + this.endAngle) / 2;
    e.translate(Math.cos(l) * o, Math.sin(l) * o);
    const c = 1 - Math.sin(Math.min(K, s || 0)), h = o * c;
    e.fillStyle = n.backgroundColor, e.strokeStyle = n.borderColor, yh(e, this, h, r, a), vh(e, this, h, r, a), e.restore();
  }
}
M(Me, "id", "arc"), M(Me, "defaults", {
  borderAlign: "center",
  borderColor: "#fff",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: void 0,
  borderRadius: 0,
  borderWidth: 2,
  offset: 0,
  spacing: 0,
  angle: void 0,
  circular: !0
}), M(Me, "defaultRoutes", {
  backgroundColor: "backgroundColor"
}), M(Me, "descriptors", {
  _scriptable: !0,
  _indexable: (e) => e !== "borderDash"
});
function lr(i, t, e = t) {
  i.lineCap = T(e.borderCapStyle, t.borderCapStyle), i.setLineDash(T(e.borderDash, t.borderDash)), i.lineDashOffset = T(e.borderDashOffset, t.borderDashOffset), i.lineJoin = T(e.borderJoinStyle, t.borderJoinStyle), i.lineWidth = T(e.borderWidth, t.borderWidth), i.strokeStyle = T(e.borderColor, t.borderColor);
}
function kh(i, t, e) {
  i.lineTo(e.x, e.y);
}
function wh(i) {
  return i.stepped ? Ua : i.tension || i.cubicInterpolationMode === "monotone" ? Xa : kh;
}
function cr(i, t, e = {}) {
  const n = i.length, { start: s = 0, end: o = n - 1 } = e, { start: r, end: a } = t, l = Math.max(s, r), c = Math.min(o, a), h = s < r && o < r || s > a && o > a;
  return {
    count: n,
    start: l,
    loop: t.loop,
    ilen: c < l && !h ? n + c - l : c - l
  };
}
function Mh(i, t, e, n) {
  const { points: s, options: o } = t, { count: r, start: a, loop: l, ilen: c } = cr(s, e, n), h = wh(o);
  let { move: d = !0, reverse: u } = n || {}, f, g, p;
  for (f = 0; f <= c; ++f)
    g = s[(a + (u ? c - f : f)) % r], !g.skip && (d ? (i.moveTo(g.x, g.y), d = !1) : h(i, p, g, u, o.stepped), p = g);
  return l && (g = s[(a + (u ? c : 0)) % r], h(i, p, g, u, o.stepped)), !!l;
}
function Sh(i, t, e, n) {
  const s = t.points, { count: o, start: r, ilen: a } = cr(s, e, n), { move: l = !0, reverse: c } = n || {};
  let h = 0, d = 0, u, f, g, p, b, _;
  const x = (v) => (r + (c ? a - v : v)) % o, k = () => {
    p !== b && (i.lineTo(h, b), i.lineTo(h, p), i.lineTo(h, _));
  };
  for (l && (f = s[x(0)], i.moveTo(f.x, f.y)), u = 0; u <= a; ++u) {
    if (f = s[x(u)], f.skip)
      continue;
    const v = f.x, y = f.y, S = v | 0;
    S === g ? (y < p ? p = y : y > b && (b = y), h = (d * h + v) / ++d) : (k(), i.lineTo(v, y), g = S, d = 0, p = b = y), _ = y;
  }
  k();
}
function ln(i) {
  const t = i.options, e = t.borderDash && t.borderDash.length;
  return !i._decimated && !i._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !e ? Sh : Mh;
}
function Ph(i) {
  return i.stepped ? Sl : i.tension || i.cubicInterpolationMode === "monotone" ? Pl : Zt;
}
function Ch(i, t, e, n) {
  let s = t._path;
  s || (s = t._path = new Path2D(), t.path(s, e, n) && s.closePath()), lr(i, t.options), i.stroke(s);
}
function Oh(i, t, e, n) {
  const { segments: s, options: o } = t, r = ln(t);
  for (const a of s)
    lr(i, o, a.style), i.beginPath(), r(i, t, a, {
      start: e,
      end: e + n - 1
    }) && i.closePath(), i.stroke();
}
const Dh = typeof Path2D == "function";
function Ah(i, t, e, n) {
  Dh && !t.options.segment ? Ch(i, t, e, n) : Oh(i, t, e, n);
}
class Wt extends xt {
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, e) {
    const n = this.options;
    if ((n.tension || n.cubicInterpolationMode === "monotone") && !n.stepped && !this._pointsUpdated) {
      const s = n.spanGaps ? this._loop : this._fullLoop;
      bl(this._points, n, t, s, e), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Rl(this, this.options.segment));
  }
  first() {
    const t = this.segments, e = this.points;
    return t.length && e[t[0].start];
  }
  last() {
    const t = this.segments, e = this.points, n = t.length;
    return n && e[t[n - 1].end];
  }
  interpolate(t, e) {
    const n = this.options, s = t[e], o = this.points, r = qo(this, {
      property: e,
      start: s,
      end: s
    });
    if (!r.length)
      return;
    const a = [], l = Ph(n);
    let c, h;
    for (c = 0, h = r.length; c < h; ++c) {
      const { start: d, end: u } = r[c], f = o[d], g = o[u];
      if (f === g) {
        a.push(f);
        continue;
      }
      const p = Math.abs((s - f[e]) / (g[e] - f[e])), b = l(f, g, p, n.stepped);
      b[e] = t[e], a.push(b);
    }
    return a.length === 1 ? a[0] : a;
  }
  pathSegment(t, e, n) {
    return ln(this)(t, this, e, n);
  }
  path(t, e, n) {
    const s = this.segments, o = ln(this);
    let r = this._loop;
    e = e || 0, n = n || this.points.length - e;
    for (const a of s)
      r &= o(t, this, a, {
        start: e,
        end: e + n - 1
      });
    return !!r;
  }
  draw(t, e, n, s) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), Ah(t, this, n, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
M(Wt, "id", "line"), M(Wt, "defaults", {
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: "miter",
  borderWidth: 3,
  capBezierPoints: !0,
  cubicInterpolationMode: "default",
  fill: !1,
  spanGaps: !1,
  stepped: !1,
  tension: 0
}), M(Wt, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}), M(Wt, "descriptors", {
  _scriptable: !0,
  _indexable: (t) => t !== "borderDash" && t !== "fill"
});
function Ks(i, t, e, n) {
  const s = i.options, { [e]: o } = i.getProps([
    e
  ], n);
  return Math.abs(t - o) < s.radius + s.hitRadius;
}
class pi extends xt {
  constructor(e) {
    super();
    M(this, "parsed");
    M(this, "skip");
    M(this, "stop");
    this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, e && Object.assign(this, e);
  }
  inRange(e, n, s) {
    const o = this.options, { x: r, y: a } = this.getProps([
      "x",
      "y"
    ], s);
    return Math.pow(e - r, 2) + Math.pow(n - a, 2) < Math.pow(o.hitRadius + o.radius, 2);
  }
  inXRange(e, n) {
    return Ks(this, e, "x", n);
  }
  inYRange(e, n) {
    return Ks(this, e, "y", n);
  }
  getCenterPoint(e) {
    const { x: n, y: s } = this.getProps([
      "x",
      "y"
    ], e);
    return {
      x: n,
      y: s
    };
  }
  size(e) {
    e = e || this.options || {};
    let n = e.radius || 0;
    n = Math.max(n, n && e.hoverRadius || 0);
    const s = n && e.borderWidth || 0;
    return (n + s) * 2;
  }
  draw(e, n) {
    const s = this.options;
    this.skip || s.radius < 0.1 || !Et(this, n, this.size(s) / 2) || (e.strokeStyle = s.borderColor, e.lineWidth = s.borderWidth, e.fillStyle = s.backgroundColor, sn(e, s, this.x, this.y));
  }
  getRange() {
    const e = this.options || {};
    return e.radius + e.hitRadius;
  }
}
M(pi, "id", "point"), /**
* @type {any}
*/
M(pi, "defaults", {
  borderWidth: 1,
  hitRadius: 1,
  hoverBorderWidth: 1,
  hoverRadius: 4,
  pointStyle: "circle",
  radius: 3,
  rotation: 0
}), /**
* @type {any}
*/
M(pi, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function hr(i, t) {
  const { x: e, y: n, base: s, width: o, height: r } = i.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let a, l, c, h, d;
  return i.horizontal ? (d = r / 2, a = Math.min(e, s), l = Math.max(e, s), c = n - d, h = n + d) : (d = o / 2, a = e - d, l = e + d, c = Math.min(n, s), h = Math.max(n, s)), {
    left: a,
    top: c,
    right: l,
    bottom: h
  };
}
function Vt(i, t, e, n) {
  return i ? 0 : st(t, e, n);
}
function Th(i, t, e) {
  const n = i.options.borderWidth, s = i.borderSkipped, o = Bo(n);
  return {
    t: Vt(s.top, o.top, 0, e),
    r: Vt(s.right, o.right, 0, t),
    b: Vt(s.bottom, o.bottom, 0, e),
    l: Vt(s.left, o.left, 0, t)
  };
}
function Rh(i, t, e) {
  const { enableBorderRadius: n } = i.getProps([
    "enableBorderRadius"
  ]), s = i.options.borderRadius, o = te(s), r = Math.min(t, e), a = i.borderSkipped, l = n || I(s);
  return {
    topLeft: Vt(!l || a.top || a.left, o.topLeft, 0, r),
    topRight: Vt(!l || a.top || a.right, o.topRight, 0, r),
    bottomLeft: Vt(!l || a.bottom || a.left, o.bottomLeft, 0, r),
    bottomRight: Vt(!l || a.bottom || a.right, o.bottomRight, 0, r)
  };
}
function Eh(i) {
  const t = hr(i), e = t.right - t.left, n = t.bottom - t.top, s = Th(i, e / 2, n / 2), o = Rh(i, e / 2, n / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: e,
      h: n,
      radius: o
    },
    inner: {
      x: t.left + s.l,
      y: t.top + s.t,
      w: e - s.l - s.r,
      h: n - s.t - s.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(s.t, s.l)),
        topRight: Math.max(0, o.topRight - Math.max(s.t, s.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(s.b, s.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(s.b, s.r))
      }
    }
  };
}
function qi(i, t, e, n) {
  const s = t === null, o = e === null, a = i && !(s && o) && hr(i, n);
  return a && (s || Tt(t, a.left, a.right)) && (o || Tt(e, a.top, a.bottom));
}
function Lh(i) {
  return i.topLeft || i.topRight || i.bottomLeft || i.bottomRight;
}
function Fh(i, t) {
  i.rect(t.x, t.y, t.w, t.h);
}
function Gi(i, t, e = {}) {
  const n = i.x !== e.x ? -t : 0, s = i.y !== e.y ? -t : 0, o = (i.x + i.w !== e.x + e.w ? t : 0) - n, r = (i.y + i.h !== e.y + e.h ? t : 0) - s;
  return {
    x: i.x + n,
    y: i.y + s,
    w: i.w + o,
    h: i.h + r,
    radius: i.radius
  };
}
class mi extends xt {
  constructor(t) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t);
  }
  draw(t) {
    const { inflateAmount: e, options: { borderColor: n, backgroundColor: s } } = this, { inner: o, outer: r } = Eh(this), a = Lh(r.radius) ? Be : Fh;
    t.save(), (r.w !== o.w || r.h !== o.h) && (t.beginPath(), a(t, Gi(r, e, o)), t.clip(), a(t, Gi(o, -e, r)), t.fillStyle = n, t.fill("evenodd")), t.beginPath(), a(t, Gi(o, e)), t.fillStyle = s, t.fill(), t.restore();
  }
  inRange(t, e, n) {
    return qi(this, t, e, n);
  }
  inXRange(t, e) {
    return qi(this, t, null, e);
  }
  inYRange(t, e) {
    return qi(this, null, t, e);
  }
  getCenterPoint(t) {
    const { x: e, y: n, base: s, horizontal: o } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: o ? (e + s) / 2 : e,
      y: o ? n : (n + s) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
M(mi, "id", "bar"), M(mi, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
}), M(mi, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
var Ih = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcElement: Me,
  BarElement: mi,
  LineElement: Wt,
  PointElement: pi
});
const cn = [
  "rgb(54, 162, 235)",
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)"
  // grey
], qs = /* @__PURE__ */ cn.map((i) => i.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function dr(i) {
  return cn[i % cn.length];
}
function ur(i) {
  return qs[i % qs.length];
}
function zh(i, t) {
  return i.borderColor = dr(t), i.backgroundColor = ur(t), ++t;
}
function Bh(i, t) {
  return i.backgroundColor = i.data.map(() => dr(t++)), t;
}
function Wh(i, t) {
  return i.backgroundColor = i.data.map(() => ur(t++)), t;
}
function Vh(i) {
  let t = 0;
  return (e, n) => {
    const s = i.getDatasetMeta(n).controller;
    s instanceof Qt ? t = Bh(e, t) : s instanceof Ee ? t = Wh(e, t) : s && (t = zh(e, t));
  };
}
function Gs(i) {
  let t;
  for (t in i)
    if (i[t].borderColor || i[t].backgroundColor)
      return !0;
  return !1;
}
function Nh(i) {
  return i && (i.borderColor || i.backgroundColor);
}
var jh = {
  id: "colors",
  defaults: {
    enabled: !0,
    forceOverride: !1
  },
  beforeLayout(i, t, e) {
    if (!e.enabled)
      return;
    const { data: { datasets: n }, options: s } = i.config, { elements: o } = s;
    if (!e.forceOverride && (Gs(n) || Nh(s) || o && Gs(o)))
      return;
    const r = Vh(i);
    n.forEach(r);
  }
};
function Hh(i, t, e, n, s) {
  const o = s.samples || n;
  if (o >= e)
    return i.slice(t, t + e);
  const r = [], a = (e - 2) / (o - 2);
  let l = 0;
  const c = t + e - 1;
  let h = t, d, u, f, g, p;
  for (r[l++] = i[h], d = 0; d < o - 2; d++) {
    let b = 0, _ = 0, x;
    const k = Math.floor((d + 1) * a) + 1 + t, v = Math.min(Math.floor((d + 2) * a) + 1, e) + t, y = v - k;
    for (x = k; x < v; x++)
      b += i[x].x, _ += i[x].y;
    b /= y, _ /= y;
    const S = Math.floor(d * a) + 1 + t, P = Math.min(Math.floor((d + 1) * a) + 1, e) + t, { x: C, y: D } = i[h];
    for (f = g = -1, x = S; x < P; x++)
      g = 0.5 * Math.abs((C - b) * (i[x].y - D) - (C - i[x].x) * (_ - D)), g > f && (f = g, u = i[x], p = x);
    r[l++] = u, h = p;
  }
  return r[l++] = i[c], r;
}
function $h(i, t, e, n) {
  let s = 0, o = 0, r, a, l, c, h, d, u, f, g, p;
  const b = [], _ = t + e - 1, x = i[t].x, v = i[_].x - x;
  for (r = t; r < t + e; ++r) {
    a = i[r], l = (a.x - x) / v * n, c = a.y;
    const y = l | 0;
    if (y === h)
      c < g ? (g = c, d = r) : c > p && (p = c, u = r), s = (o * s + a.x) / ++o;
    else {
      const S = r - 1;
      if (!W(d) && !W(u)) {
        const P = Math.min(d, u), C = Math.max(d, u);
        P !== f && P !== S && b.push({
          ...i[P],
          x: s
        }), C !== f && C !== S && b.push({
          ...i[C],
          x: s
        });
      }
      r > 0 && S !== f && b.push(i[S]), b.push(a), h = y, o = 0, g = p = c, d = u = f = r;
    }
  }
  return b;
}
function fr(i) {
  if (i._decimated) {
    const t = i._data;
    delete i._decimated, delete i._data, Object.defineProperty(i, "data", {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: t
    });
  }
}
function Js(i) {
  i.data.datasets.forEach((t) => {
    fr(t);
  });
}
function Yh(i, t) {
  const e = t.length;
  let n = 0, s;
  const { iScale: o } = i, { min: r, max: a, minDefined: l, maxDefined: c } = o.getUserBounds();
  return l && (n = st(Rt(t, o.axis, r).lo, 0, e - 1)), c ? s = st(Rt(t, o.axis, a).hi + 1, n, e) - n : s = e - n, {
    start: n,
    count: s
  };
}
var Uh = {
  id: "decimation",
  defaults: {
    algorithm: "min-max",
    enabled: !1
  },
  beforeElementsUpdate: (i, t, e) => {
    if (!e.enabled) {
      Js(i);
      return;
    }
    const n = i.width;
    i.data.datasets.forEach((s, o) => {
      const { _data: r, indexAxis: a } = s, l = i.getDatasetMeta(o), c = r || s.data;
      if (ke([
        a,
        i.options.indexAxis
      ]) === "y" || !l.controller.supportsDecimation)
        return;
      const h = i.scales[l.xAxisID];
      if (h.type !== "linear" && h.type !== "time" || i.options.parsing)
        return;
      let { start: d, count: u } = Yh(l, c);
      const f = e.threshold || 4 * n;
      if (u <= f) {
        fr(s);
        return;
      }
      W(r) && (s._data = c, delete s.data, Object.defineProperty(s, "data", {
        configurable: !0,
        enumerable: !0,
        get: function() {
          return this._decimated;
        },
        set: function(p) {
          this._data = p;
        }
      }));
      let g;
      switch (e.algorithm) {
        case "lttb":
          g = Hh(c, d, u, n, e);
          break;
        case "min-max":
          g = $h(c, d, u, n);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`);
      }
      s._decimated = g;
    });
  },
  destroy(i) {
    Js(i);
  }
};
function Xh(i, t, e) {
  const n = i.segments, s = i.points, o = t.points, r = [];
  for (const a of n) {
    let { start: l, end: c } = a;
    c = Rn(l, c, s);
    const h = hn(e, s[l], s[c], a.loop);
    if (!t.segments) {
      r.push({
        source: a,
        target: h,
        start: s[l],
        end: s[c]
      });
      continue;
    }
    const d = qo(t, h);
    for (const u of d) {
      const f = hn(e, o[u.start], o[u.end], u.loop), g = Ko(a, s, f);
      for (const p of g)
        r.push({
          source: p,
          target: u,
          start: {
            [e]: Zs(h, f, "start", Math.max)
          },
          end: {
            [e]: Zs(h, f, "end", Math.min)
          }
        });
    }
  }
  return r;
}
function hn(i, t, e, n) {
  if (n)
    return;
  let s = t[i], o = e[i];
  return i === "angle" && (s = ft(s), o = ft(o)), {
    property: i,
    start: s,
    end: o
  };
}
function Kh(i, t) {
  const { x: e = null, y: n = null } = i || {}, s = t.points, o = [];
  return t.segments.forEach(({ start: r, end: a }) => {
    a = Rn(r, a, s);
    const l = s[r], c = s[a];
    n !== null ? (o.push({
      x: l.x,
      y: n
    }), o.push({
      x: c.x,
      y: n
    })) : e !== null && (o.push({
      x: e,
      y: l.y
    }), o.push({
      x: e,
      y: c.y
    }));
  }), o;
}
function Rn(i, t, e) {
  for (; t > i; t--) {
    const n = e[t];
    if (!isNaN(n.x) && !isNaN(n.y))
      break;
  }
  return t;
}
function Zs(i, t, e, n) {
  return i && t ? n(i[e], t[e]) : i ? i[e] : t ? t[e] : 0;
}
function gr(i, t) {
  let e = [], n = !1;
  return U(i) ? (n = !0, e = i) : e = Kh(i, t), e.length ? new Wt({
    points: e,
    options: {
      tension: 0
    },
    _loop: n,
    _fullLoop: n
  }) : null;
}
function Qs(i) {
  return i && i.fill !== !1;
}
function qh(i, t, e) {
  let s = i[t].fill;
  const o = [
    t
  ];
  let r;
  if (!e)
    return s;
  for (; s !== !1 && o.indexOf(s) === -1; ) {
    if (!G(s))
      return s;
    if (r = i[s], !r)
      return !1;
    if (r.visible)
      return s;
    o.push(s), s = r.fill;
  }
  return !1;
}
function Gh(i, t, e) {
  const n = td(i);
  if (I(n))
    return isNaN(n.value) ? !1 : n;
  let s = parseFloat(n);
  return G(s) && Math.floor(s) === s ? Jh(n[0], t, s, e) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(n) >= 0 && n;
}
function Jh(i, t, e, n) {
  return (i === "-" || i === "+") && (e = t + e), e === t || e < 0 || e >= n ? !1 : e;
}
function Zh(i, t) {
  let e = null;
  return i === "start" ? e = t.bottom : i === "end" ? e = t.top : I(i) ? e = t.getPixelForValue(i.value) : t.getBasePixel && (e = t.getBasePixel()), e;
}
function Qh(i, t, e) {
  let n;
  return i === "start" ? n = e : i === "end" ? n = t.options.reverse ? t.min : t.max : I(i) ? n = i.value : n = t.getBaseValue(), n;
}
function td(i) {
  const t = i.options, e = t.fill;
  let n = T(e && e.target, e);
  return n === void 0 && (n = !!t.backgroundColor), n === !1 || n === null ? !1 : n === !0 ? "origin" : n;
}
function ed(i) {
  const { scale: t, index: e, line: n } = i, s = [], o = n.segments, r = n.points, a = id(t, e);
  a.push(gr({
    x: null,
    y: t.bottom
  }, n));
  for (let l = 0; l < o.length; l++) {
    const c = o[l];
    for (let h = c.start; h <= c.end; h++)
      nd(s, r[h], a);
  }
  return new Wt({
    points: s,
    options: {}
  });
}
function id(i, t) {
  const e = [], n = i.getMatchingVisibleMetas("line");
  for (let s = 0; s < n.length; s++) {
    const o = n[s];
    if (o.index === t)
      break;
    o.hidden || e.unshift(o.dataset);
  }
  return e;
}
function nd(i, t, e) {
  const n = [];
  for (let s = 0; s < e.length; s++) {
    const o = e[s], { first: r, last: a, point: l } = sd(o, t, "x");
    if (!(!l || r && a)) {
      if (r)
        n.unshift(l);
      else if (i.push(l), !a)
        break;
    }
  }
  i.push(...n);
}
function sd(i, t, e) {
  const n = i.interpolate(t, e);
  if (!n)
    return {};
  const s = n[e], o = i.segments, r = i.points;
  let a = !1, l = !1;
  for (let c = 0; c < o.length; c++) {
    const h = o[c], d = r[h.start][e], u = r[h.end][e];
    if (Tt(s, d, u)) {
      a = s === d, l = s === u;
      break;
    }
  }
  return {
    first: a,
    last: l,
    point: n
  };
}
class pr {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, e, n) {
    const { x: s, y: o, radius: r } = this;
    return e = e || {
      start: 0,
      end: X
    }, t.arc(s, o, r, e.end, e.start, !0), !n.bounds;
  }
  interpolate(t) {
    const { x: e, y: n, radius: s } = this, o = t.angle;
    return {
      x: e + Math.cos(o) * s,
      y: n + Math.sin(o) * s,
      angle: o
    };
  }
}
function od(i) {
  const { chart: t, fill: e, line: n } = i;
  if (G(e))
    return rd(t, e);
  if (e === "stack")
    return ed(i);
  if (e === "shape")
    return !0;
  const s = ad(i);
  return s instanceof pr ? s : gr(s, n);
}
function rd(i, t) {
  const e = i.getDatasetMeta(t);
  return e && i.isDatasetVisible(t) ? e.dataset : null;
}
function ad(i) {
  return (i.scale || {}).getPointPositionForValue ? cd(i) : ld(i);
}
function ld(i) {
  const { scale: t = {}, fill: e } = i, n = Zh(e, t);
  if (G(n)) {
    const s = t.isHorizontal();
    return {
      x: s ? n : null,
      y: s ? null : n
    };
  }
  return null;
}
function cd(i) {
  const { scale: t, fill: e } = i, n = t.options, s = t.getLabels().length, o = n.reverse ? t.max : t.min, r = Qh(e, t, o), a = [];
  if (n.grid.circular) {
    const l = t.getPointPositionForValue(0, o);
    return new pr({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(r)
    });
  }
  for (let l = 0; l < s; ++l)
    a.push(t.getPointPositionForValue(l, r));
  return a;
}
function Ji(i, t, e) {
  const n = od(t), { line: s, scale: o, axis: r } = t, a = s.options, l = a.fill, c = a.backgroundColor, { above: h = c, below: d = c } = l || {};
  n && s.points.length && (Oi(i, e), hd(i, {
    line: s,
    target: n,
    above: h,
    below: d,
    area: e,
    scale: o,
    axis: r
  }), Di(i));
}
function hd(i, t) {
  const { line: e, target: n, above: s, below: o, area: r, scale: a } = t, l = e._loop ? "angle" : t.axis;
  i.save(), l === "x" && o !== s && (to(i, n, r.top), eo(i, {
    line: e,
    target: n,
    color: s,
    scale: a,
    property: l
  }), i.restore(), i.save(), to(i, n, r.bottom)), eo(i, {
    line: e,
    target: n,
    color: o,
    scale: a,
    property: l
  }), i.restore();
}
function to(i, t, e) {
  const { segments: n, points: s } = t;
  let o = !0, r = !1;
  i.beginPath();
  for (const a of n) {
    const { start: l, end: c } = a, h = s[l], d = s[Rn(l, c, s)];
    o ? (i.moveTo(h.x, h.y), o = !1) : (i.lineTo(h.x, e), i.lineTo(h.x, h.y)), r = !!t.pathSegment(i, a, {
      move: r
    }), r ? i.closePath() : i.lineTo(d.x, e);
  }
  i.lineTo(t.first().x, e), i.closePath(), i.clip();
}
function eo(i, t) {
  const { line: e, target: n, property: s, color: o, scale: r } = t, a = Xh(e, n, s);
  for (const { source: l, target: c, start: h, end: d } of a) {
    const { style: { backgroundColor: u = o } = {} } = l, f = n !== !0;
    i.save(), i.fillStyle = u, dd(i, r, f && hn(s, h, d)), i.beginPath();
    const g = !!e.pathSegment(i, l);
    let p;
    if (f) {
      g ? i.closePath() : io(i, n, d, s);
      const b = !!n.pathSegment(i, c, {
        move: g,
        reverse: !0
      });
      p = g && b, p || io(i, n, h, s);
    }
    i.closePath(), i.fill(p ? "evenodd" : "nonzero"), i.restore();
  }
}
function dd(i, t, e) {
  const { top: n, bottom: s } = t.chart.chartArea, { property: o, start: r, end: a } = e || {};
  o === "x" && (i.beginPath(), i.rect(r, n, a - r, s - n), i.clip());
}
function io(i, t, e, n) {
  const s = t.interpolate(e, n);
  s && i.lineTo(s.x, s.y);
}
var ud = {
  id: "filler",
  afterDatasetsUpdate(i, t, e) {
    const n = (i.data.datasets || []).length, s = [];
    let o, r, a, l;
    for (r = 0; r < n; ++r)
      o = i.getDatasetMeta(r), a = o.dataset, l = null, a && a.options && a instanceof Wt && (l = {
        visible: i.isDatasetVisible(r),
        index: r,
        fill: Gh(a, r, n),
        chart: i,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: a
      }), o.$filler = l, s.push(l);
    for (r = 0; r < n; ++r)
      l = s[r], !(!l || l.fill === !1) && (l.fill = qh(s, r, e.propagate));
  },
  beforeDraw(i, t, e) {
    const n = e.drawTime === "beforeDraw", s = i.getSortedVisibleDatasetMetas(), o = i.chartArea;
    for (let r = s.length - 1; r >= 0; --r) {
      const a = s[r].$filler;
      a && (a.line.updateControlPoints(o, a.axis), n && a.fill && Ji(i.ctx, a, o));
    }
  },
  beforeDatasetsDraw(i, t, e) {
    if (e.drawTime !== "beforeDatasetsDraw")
      return;
    const n = i.getSortedVisibleDatasetMetas();
    for (let s = n.length - 1; s >= 0; --s) {
      const o = n[s].$filler;
      Qs(o) && Ji(i.ctx, o, i.chartArea);
    }
  },
  beforeDatasetDraw(i, t, e) {
    const n = t.meta.$filler;
    !Qs(n) || e.drawTime !== "beforeDatasetDraw" || Ji(i.ctx, n, i.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const no = (i, t) => {
  let { boxHeight: e = t, boxWidth: n = t } = i;
  return i.usePointStyle && (e = Math.min(e, t), n = i.pointStyleWidth || Math.min(n, t)), {
    boxWidth: n,
    boxHeight: e,
    itemHeight: Math.max(t, e)
  };
}, fd = (i, t) => i !== null && t !== null && i.datasetIndex === t.datasetIndex && i.index === t.index;
class so extends xt {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, e, n) {
    this.maxWidth = t, this.maxHeight = e, this._margins = n, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let e = Y(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (e = e.filter((n) => t.filter(n, this.chart.data))), t.sort && (e = e.sort((n, s) => t.sort(n, s, this.chart.data))), this.options.reverse && e.reverse(), this.legendItems = e;
  }
  fit() {
    const { options: t, ctx: e } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const n = t.labels, s = nt(n.font), o = s.size, r = this._computeTitleHeight(), { boxWidth: a, itemHeight: l } = no(n, o);
    let c, h;
    e.font = s.string, this.isHorizontal() ? (c = this.maxWidth, h = this._fitRows(r, o, a, l) + 10) : (h = this.maxHeight, c = this._fitCols(r, s, a, l) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(h, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, e, n, s) {
    const { ctx: o, maxWidth: r, options: { labels: { padding: a } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], h = s + a;
    let d = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let u = -1, f = -h;
    return this.legendItems.forEach((g, p) => {
      const b = n + e / 2 + o.measureText(g.text).width;
      (p === 0 || c[c.length - 1] + b + 2 * a > r) && (d += h, c[c.length - (p > 0 ? 0 : 1)] = 0, f += h, u++), l[p] = {
        left: 0,
        top: f,
        row: u,
        width: b,
        height: s
      }, c[c.length - 1] += b + a;
    }), d;
  }
  _fitCols(t, e, n, s) {
    const { ctx: o, maxHeight: r, options: { labels: { padding: a } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], h = r - t;
    let d = a, u = 0, f = 0, g = 0, p = 0;
    return this.legendItems.forEach((b, _) => {
      const { itemWidth: x, itemHeight: k } = gd(n, e, o, b, s);
      _ > 0 && f + k + 2 * a > h && (d += u + a, c.push({
        width: u,
        height: f
      }), g += u + a, p++, u = f = 0), l[_] = {
        left: g,
        top: f,
        col: p,
        width: x,
        height: k
      }, u = Math.max(u, x), f += k + a;
    }), d += u, c.push({
      width: u,
      height: f
    }), d;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: e, options: { align: n, labels: { padding: s }, rtl: o } } = this, r = ce(o, this.left, this.width);
    if (this.isHorizontal()) {
      let a = 0, l = ot(n, this.left + s, this.right - this.lineWidths[a]);
      for (const c of e)
        a !== c.row && (a = c.row, l = ot(n, this.left + s, this.right - this.lineWidths[a])), c.top += this.top + t + s, c.left = r.leftForLtr(r.x(l), c.width), l += c.width + s;
    } else {
      let a = 0, l = ot(n, this.top + t + s, this.bottom - this.columnSizes[a].height);
      for (const c of e)
        c.col !== a && (a = c.col, l = ot(n, this.top + t + s, this.bottom - this.columnSizes[a].height)), c.top = l, c.left += this.left + s, c.left = r.leftForLtr(r.x(c.left), c.width), l += c.height + s;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Oi(t, this), this._draw(), Di(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: e, lineWidths: n, ctx: s } = this, { align: o, labels: r } = t, a = J.color, l = ce(t.rtl, this.left, this.width), c = nt(r.font), { padding: h } = r, d = c.size, u = d / 2;
    let f;
    this.drawTitle(), s.textAlign = l.textAlign("left"), s.textBaseline = "middle", s.lineWidth = 0.5, s.font = c.string;
    const { boxWidth: g, boxHeight: p, itemHeight: b } = no(r, d), _ = function(S, P, C) {
      if (isNaN(g) || g <= 0 || isNaN(p) || p < 0)
        return;
      s.save();
      const D = T(C.lineWidth, 1);
      if (s.fillStyle = T(C.fillStyle, a), s.lineCap = T(C.lineCap, "butt"), s.lineDashOffset = T(C.lineDashOffset, 0), s.lineJoin = T(C.lineJoin, "miter"), s.lineWidth = D, s.strokeStyle = T(C.strokeStyle, a), s.setLineDash(T(C.lineDash, [])), r.usePointStyle) {
        const R = {
          radius: p * Math.SQRT2 / 2,
          pointStyle: C.pointStyle,
          rotation: C.rotation,
          borderWidth: D
        }, E = l.xPlus(S, g / 2), L = P + u;
        zo(s, R, E, L, r.pointStyleWidth && g);
      } else {
        const R = P + Math.max((d - p) / 2, 0), E = l.leftForLtr(S, g), L = te(C.borderRadius);
        s.beginPath(), Object.values(L).some((j) => j !== 0) ? Be(s, {
          x: E,
          y: R,
          w: g,
          h: p,
          radius: L
        }) : s.rect(E, R, g, p), s.fill(), D !== 0 && s.stroke();
      }
      s.restore();
    }, x = function(S, P, C) {
      ne(s, C.text, S, P + b / 2, c, {
        strikethrough: C.hidden,
        textAlign: l.textAlign(C.textAlign)
      });
    }, k = this.isHorizontal(), v = this._computeTitleHeight();
    k ? f = {
      x: ot(o, this.left + h, this.right - n[0]),
      y: this.top + h + v,
      line: 0
    } : f = {
      x: this.left + h,
      y: ot(o, this.top + v + h, this.bottom - e[0].height),
      line: 0
    }, Yo(this.ctx, t.textDirection);
    const y = b + h;
    this.legendItems.forEach((S, P) => {
      s.strokeStyle = S.fontColor, s.fillStyle = S.fontColor;
      const C = s.measureText(S.text).width, D = l.textAlign(S.textAlign || (S.textAlign = r.textAlign)), R = g + u + C;
      let E = f.x, L = f.y;
      l.setWidth(this.width), k ? P > 0 && E + R + h > this.right && (L = f.y += y, f.line++, E = f.x = ot(o, this.left + h, this.right - n[f.line])) : P > 0 && L + y > this.bottom && (E = f.x = E + e[f.line].width + h, f.line++, L = f.y = ot(o, this.top + v + h, this.bottom - e[f.line].height));
      const j = l.x(E);
      if (_(j, L, S), E = Fa(D, E + g + u, k ? E + R : this.right, t.rtl), x(l.x(E), L, S), k)
        f.x += R + h;
      else if (typeof S.text != "string") {
        const Z = c.lineHeight;
        f.y += mr(S, Z) + h;
      } else
        f.y += y;
    }), Uo(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, e = t.title, n = nt(e.font), s = at(e.padding);
    if (!e.display)
      return;
    const o = ce(t.rtl, this.left, this.width), r = this.ctx, a = e.position, l = n.size / 2, c = s.top + l;
    let h, d = this.left, u = this.width;
    if (this.isHorizontal())
      u = Math.max(...this.lineWidths), h = this.top + c, d = ot(t.align, d, this.right - u);
    else {
      const g = this.columnSizes.reduce((p, b) => Math.max(p, b.height), 0);
      h = c + ot(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const f = ot(a, d, d + u);
    r.textAlign = o.textAlign(wn(a)), r.textBaseline = "middle", r.strokeStyle = e.color, r.fillStyle = e.color, r.font = n.string, ne(r, e.text, f, h, n);
  }
  _computeTitleHeight() {
    const t = this.options.title, e = nt(t.font), n = at(t.padding);
    return t.display ? e.lineHeight + n.height : 0;
  }
  _getLegendItemAt(t, e) {
    let n, s, o;
    if (Tt(t, this.left, this.right) && Tt(e, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, n = 0; n < o.length; ++n)
        if (s = o[n], Tt(t, s.left, s.left + s.width) && Tt(e, s.top, s.top + s.height))
          return this.legendItems[n];
    }
    return null;
  }
  handleEvent(t) {
    const e = this.options;
    if (!bd(t.type, e))
      return;
    const n = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const s = this._hoveredItem, o = fd(s, n);
      s && !o && Y(e.onLeave, [
        t,
        s,
        this
      ], this), this._hoveredItem = n, n && !o && Y(e.onHover, [
        t,
        n,
        this
      ], this);
    } else
      n && Y(e.onClick, [
        t,
        n,
        this
      ], this);
  }
}
function gd(i, t, e, n, s) {
  const o = pd(n, i, t, e), r = md(s, n, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: r
  };
}
function pd(i, t, e, n) {
  let s = i.text;
  return s && typeof s != "string" && (s = s.reduce((o, r) => o.length > r.length ? o : r)), t + e.size / 2 + n.measureText(s).width;
}
function md(i, t, e) {
  let n = i;
  return typeof t.text != "string" && (n = mr(t, e)), n;
}
function mr(i, t) {
  const e = i.text ? i.text.length : 0;
  return t * e;
}
function bd(i, t) {
  return !!((i === "mousemove" || i === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (i === "click" || i === "mouseup"));
}
var _d = {
  id: "legend",
  _element: so,
  start(i, t, e) {
    const n = i.legend = new so({
      ctx: i.ctx,
      options: e,
      chart: i
    });
    rt.configure(i, n, e), rt.addBox(i, n);
  },
  stop(i) {
    rt.removeBox(i, i.legend), delete i.legend;
  },
  beforeUpdate(i, t, e) {
    const n = i.legend;
    rt.configure(i, n, e), n.options = e;
  },
  afterUpdate(i) {
    const t = i.legend;
    t.buildLabels(), t.adjustHitBoxes();
  },
  afterEvent(i, t) {
    t.replay || i.legend.handleEvent(t.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(i, t, e) {
      const n = t.datasetIndex, s = e.chart;
      s.isDatasetVisible(n) ? (s.hide(n), t.hidden = !0) : (s.show(n), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (i) => i.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(i) {
        const t = i.data.datasets, { labels: { usePointStyle: e, pointStyle: n, textAlign: s, color: o, useBorderRadius: r, borderRadius: a } } = i.legend.options;
        return i._getSortedDatasetMetas().map((l) => {
          const c = l.controller.getStyle(e ? 0 : void 0), h = at(c.borderWidth);
          return {
            text: t[l.index].label,
            fillStyle: c.backgroundColor,
            fontColor: o,
            hidden: !l.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (h.width + h.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: n || c.pointStyle,
            rotation: c.rotation,
            textAlign: s || c.textAlign,
            borderRadius: r && (a || c.borderRadius),
            datasetIndex: l.index
          };
        }, this);
      }
    },
    title: {
      color: (i) => i.chart.options.color,
      display: !1,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (i) => !i.startsWith("on"),
    labels: {
      _scriptable: (i) => ![
        "generateLabels",
        "filter",
        "sort"
      ].includes(i)
    }
  }
};
class En extends xt {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, e) {
    const n = this.options;
    if (this.left = 0, this.top = 0, !n.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = e;
    const s = U(n.text) ? n.text.length : 1;
    this._padding = at(n.padding);
    const o = s * nt(n.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: e, left: n, bottom: s, right: o, options: r } = this, a = r.align;
    let l = 0, c, h, d;
    return this.isHorizontal() ? (h = ot(a, n, o), d = e + t, c = o - n) : (r.position === "left" ? (h = n + t, d = ot(a, s, e), l = K * -0.5) : (h = o - t, d = ot(a, e, s), l = K * 0.5), c = s - e), {
      titleX: h,
      titleY: d,
      maxWidth: c,
      rotation: l
    };
  }
  draw() {
    const t = this.ctx, e = this.options;
    if (!e.display)
      return;
    const n = nt(e.font), o = n.lineHeight / 2 + this._padding.top, { titleX: r, titleY: a, maxWidth: l, rotation: c } = this._drawArgs(o);
    ne(t, e.text, 0, 0, n, {
      color: e.color,
      maxWidth: l,
      rotation: c,
      textAlign: wn(e.align),
      textBaseline: "middle",
      translation: [
        r,
        a
      ]
    });
  }
}
function xd(i, t) {
  const e = new En({
    ctx: i.ctx,
    options: t,
    chart: i
  });
  rt.configure(i, e, t), rt.addBox(i, e), i.titleBlock = e;
}
var yd = {
  id: "title",
  _element: En,
  start(i, t, e) {
    xd(i, e);
  },
  stop(i) {
    const t = i.titleBlock;
    rt.removeBox(i, t), delete i.titleBlock;
  },
  beforeUpdate(i, t, e) {
    const n = i.titleBlock;
    rt.configure(i, n, e), n.options = e;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "bold"
    },
    fullSize: !0,
    padding: 10,
    position: "top",
    text: "",
    weight: 2e3
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const ai = /* @__PURE__ */ new WeakMap();
var vd = {
  id: "subtitle",
  start(i, t, e) {
    const n = new En({
      ctx: i.ctx,
      options: e,
      chart: i
    });
    rt.configure(i, n, e), rt.addBox(i, n), ai.set(i, n);
  },
  stop(i) {
    rt.removeBox(i, ai.get(i)), ai.delete(i);
  },
  beforeUpdate(i, t, e) {
    const n = ai.get(i);
    rt.configure(i, n, e), n.options = e;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "normal"
    },
    fullSize: !0,
    padding: 0,
    position: "top",
    text: "",
    weight: 1500
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const Se = {
  average(i) {
    if (!i.length)
      return !1;
    let t, e, n = /* @__PURE__ */ new Set(), s = 0, o = 0;
    for (t = 0, e = i.length; t < e; ++t) {
      const a = i[t].element;
      if (a && a.hasValue()) {
        const l = a.tooltipPosition();
        n.add(l.x), s += l.y, ++o;
      }
    }
    return {
      x: [
        ...n
      ].reduce((a, l) => a + l) / n.size,
      y: s / o
    };
  },
  nearest(i, t) {
    if (!i.length)
      return !1;
    let e = t.x, n = t.y, s = Number.POSITIVE_INFINITY, o, r, a;
    for (o = 0, r = i.length; o < r; ++o) {
      const l = i[o].element;
      if (l && l.hasValue()) {
        const c = l.getCenterPoint(), h = en(t, c);
        h < s && (s = h, a = l);
      }
    }
    if (a) {
      const l = a.tooltipPosition();
      e = l.x, n = l.y;
    }
    return {
      x: e,
      y: n
    };
  }
};
function yt(i, t) {
  return t && (U(t) ? Array.prototype.push.apply(i, t) : i.push(t)), i;
}
function Dt(i) {
  return (typeof i == "string" || i instanceof String) && i.indexOf(`
`) > -1 ? i.split(`
`) : i;
}
function kd(i, t) {
  const { element: e, datasetIndex: n, index: s } = t, o = i.getDatasetMeta(n).controller, { label: r, value: a } = o.getLabelAndValue(s);
  return {
    chart: i,
    label: r,
    parsed: o.getParsed(s),
    raw: i.data.datasets[n].data[s],
    formattedValue: a,
    dataset: o.getDataset(),
    dataIndex: s,
    datasetIndex: n,
    element: e
  };
}
function oo(i, t) {
  const e = i.chart.ctx, { body: n, footer: s, title: o } = i, { boxWidth: r, boxHeight: a } = t, l = nt(t.bodyFont), c = nt(t.titleFont), h = nt(t.footerFont), d = o.length, u = s.length, f = n.length, g = at(t.padding);
  let p = g.height, b = 0, _ = n.reduce((v, y) => v + y.before.length + y.lines.length + y.after.length, 0);
  if (_ += i.beforeBody.length + i.afterBody.length, d && (p += d * c.lineHeight + (d - 1) * t.titleSpacing + t.titleMarginBottom), _) {
    const v = t.displayColors ? Math.max(a, l.lineHeight) : l.lineHeight;
    p += f * v + (_ - f) * l.lineHeight + (_ - 1) * t.bodySpacing;
  }
  u && (p += t.footerMarginTop + u * h.lineHeight + (u - 1) * t.footerSpacing);
  let x = 0;
  const k = function(v) {
    b = Math.max(b, e.measureText(v).width + x);
  };
  return e.save(), e.font = c.string, N(i.title, k), e.font = l.string, N(i.beforeBody.concat(i.afterBody), k), x = t.displayColors ? r + 2 + t.boxPadding : 0, N(n, (v) => {
    N(v.before, k), N(v.lines, k), N(v.after, k);
  }), x = 0, e.font = h.string, N(i.footer, k), e.restore(), b += g.width, {
    width: b,
    height: p
  };
}
function wd(i, t) {
  const { y: e, height: n } = t;
  return e < n / 2 ? "top" : e > i.height - n / 2 ? "bottom" : "center";
}
function Md(i, t, e, n) {
  const { x: s, width: o } = n, r = e.caretSize + e.caretPadding;
  if (i === "left" && s + o + r > t.width || i === "right" && s - o - r < 0)
    return !0;
}
function Sd(i, t, e, n) {
  const { x: s, width: o } = e, { width: r, chartArea: { left: a, right: l } } = i;
  let c = "center";
  return n === "center" ? c = s <= (a + l) / 2 ? "left" : "right" : s <= o / 2 ? c = "left" : s >= r - o / 2 && (c = "right"), Md(c, i, t, e) && (c = "center"), c;
}
function ro(i, t, e) {
  const n = e.yAlign || t.yAlign || wd(i, e);
  return {
    xAlign: e.xAlign || t.xAlign || Sd(i, t, e, n),
    yAlign: n
  };
}
function Pd(i, t) {
  let { x: e, width: n } = i;
  return t === "right" ? e -= n : t === "center" && (e -= n / 2), e;
}
function Cd(i, t, e) {
  let { y: n, height: s } = i;
  return t === "top" ? n += e : t === "bottom" ? n -= s + e : n -= s / 2, n;
}
function ao(i, t, e, n) {
  const { caretSize: s, caretPadding: o, cornerRadius: r } = i, { xAlign: a, yAlign: l } = e, c = s + o, { topLeft: h, topRight: d, bottomLeft: u, bottomRight: f } = te(r);
  let g = Pd(t, a);
  const p = Cd(t, l, c);
  return l === "center" ? a === "left" ? g += c : a === "right" && (g -= c) : a === "left" ? g -= Math.max(h, u) + s : a === "right" && (g += Math.max(d, f) + s), {
    x: st(g, 0, n.width - t.width),
    y: st(p, 0, n.height - t.height)
  };
}
function li(i, t, e) {
  const n = at(e.padding);
  return t === "center" ? i.x + i.width / 2 : t === "right" ? i.x + i.width - n.right : i.x + n.left;
}
function lo(i) {
  return yt([], Dt(i));
}
function Od(i, t, e) {
  return $t(i, {
    tooltip: t,
    tooltipItems: e,
    type: "tooltip"
  });
}
function co(i, t) {
  const e = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return e ? i.override(e) : i;
}
const br = {
  beforeTitle: Ct,
  title(i) {
    if (i.length > 0) {
      const t = i[0], e = t.chart.data.labels, n = e ? e.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (n > 0 && t.dataIndex < n)
        return e[t.dataIndex];
    }
    return "";
  },
  afterTitle: Ct,
  beforeBody: Ct,
  beforeLabel: Ct,
  label(i) {
    if (this && this.options && this.options.mode === "dataset")
      return i.label + ": " + i.formattedValue || i.formattedValue;
    let t = i.dataset.label || "";
    t && (t += ": ");
    const e = i.formattedValue;
    return W(e) || (t += e), t;
  },
  labelColor(i) {
    const e = i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);
    return {
      borderColor: e.borderColor,
      backgroundColor: e.backgroundColor,
      borderWidth: e.borderWidth,
      borderDash: e.borderDash,
      borderDashOffset: e.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(i) {
    const e = i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);
    return {
      pointStyle: e.pointStyle,
      rotation: e.rotation
    };
  },
  afterLabel: Ct,
  afterBody: Ct,
  beforeFooter: Ct,
  footer: Ct,
  afterFooter: Ct
};
function ht(i, t, e, n) {
  const s = i[t].call(e, n);
  return typeof s > "u" ? br[t].call(e, n) : s;
}
class dn extends xt {
  constructor(t) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t.chart, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(t) {
    this.options = t, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const t = this._cachedAnimations;
    if (t)
      return t;
    const e = this.chart, n = this.options.setContext(this.getContext()), s = n.enabled && e.options.animation && n.animations, o = new Go(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = Od(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, e) {
    const { callbacks: n } = e, s = ht(n, "beforeTitle", this, t), o = ht(n, "title", this, t), r = ht(n, "afterTitle", this, t);
    let a = [];
    return a = yt(a, Dt(s)), a = yt(a, Dt(o)), a = yt(a, Dt(r)), a;
  }
  getBeforeBody(t, e) {
    return lo(ht(e.callbacks, "beforeBody", this, t));
  }
  getBody(t, e) {
    const { callbacks: n } = e, s = [];
    return N(t, (o) => {
      const r = {
        before: [],
        lines: [],
        after: []
      }, a = co(n, o);
      yt(r.before, Dt(ht(a, "beforeLabel", this, o))), yt(r.lines, ht(a, "label", this, o)), yt(r.after, Dt(ht(a, "afterLabel", this, o))), s.push(r);
    }), s;
  }
  getAfterBody(t, e) {
    return lo(ht(e.callbacks, "afterBody", this, t));
  }
  getFooter(t, e) {
    const { callbacks: n } = e, s = ht(n, "beforeFooter", this, t), o = ht(n, "footer", this, t), r = ht(n, "afterFooter", this, t);
    let a = [];
    return a = yt(a, Dt(s)), a = yt(a, Dt(o)), a = yt(a, Dt(r)), a;
  }
  _createItems(t) {
    const e = this._active, n = this.chart.data, s = [], o = [], r = [];
    let a = [], l, c;
    for (l = 0, c = e.length; l < c; ++l)
      a.push(kd(this.chart, e[l]));
    return t.filter && (a = a.filter((h, d, u) => t.filter(h, d, u, n))), t.itemSort && (a = a.sort((h, d) => t.itemSort(h, d, n))), N(a, (h) => {
      const d = co(t.callbacks, h);
      s.push(ht(d, "labelColor", this, h)), o.push(ht(d, "labelPointStyle", this, h)), r.push(ht(d, "labelTextColor", this, h));
    }), this.labelColors = s, this.labelPointStyles = o, this.labelTextColors = r, this.dataPoints = a, a;
  }
  update(t, e) {
    const n = this.options.setContext(this.getContext()), s = this._active;
    let o, r = [];
    if (!s.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const a = Se[n.position].call(this, s, this._eventPosition);
      r = this._createItems(n), this.title = this.getTitle(r, n), this.beforeBody = this.getBeforeBody(r, n), this.body = this.getBody(r, n), this.afterBody = this.getAfterBody(r, n), this.footer = this.getFooter(r, n);
      const l = this._size = oo(this, n), c = Object.assign({}, a, l), h = ro(this.chart, n, c), d = ao(n, c, h, this.chart);
      this.xAlign = h.xAlign, this.yAlign = h.yAlign, o = {
        opacity: 1,
        x: d.x,
        y: d.y,
        width: l.width,
        height: l.height,
        caretX: a.x,
        caretY: a.y
      };
    }
    this._tooltipItems = r, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && n.external && n.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: e
    });
  }
  drawCaret(t, e, n, s) {
    const o = this.getCaretPosition(t, n, s);
    e.lineTo(o.x1, o.y1), e.lineTo(o.x2, o.y2), e.lineTo(o.x3, o.y3);
  }
  getCaretPosition(t, e, n) {
    const { xAlign: s, yAlign: o } = this, { caretSize: r, cornerRadius: a } = n, { topLeft: l, topRight: c, bottomLeft: h, bottomRight: d } = te(a), { x: u, y: f } = t, { width: g, height: p } = e;
    let b, _, x, k, v, y;
    return o === "center" ? (v = f + p / 2, s === "left" ? (b = u, _ = b - r, k = v + r, y = v - r) : (b = u + g, _ = b + r, k = v - r, y = v + r), x = b) : (s === "left" ? _ = u + Math.max(l, h) + r : s === "right" ? _ = u + g - Math.max(c, d) - r : _ = this.caretX, o === "top" ? (k = f, v = k - r, b = _ - r, x = _ + r) : (k = f + p, v = k + r, b = _ + r, x = _ - r), y = k), {
      x1: b,
      x2: _,
      x3: x,
      y1: k,
      y2: v,
      y3: y
    };
  }
  drawTitle(t, e, n) {
    const s = this.title, o = s.length;
    let r, a, l;
    if (o) {
      const c = ce(n.rtl, this.x, this.width);
      for (t.x = li(this, n.titleAlign, n), e.textAlign = c.textAlign(n.titleAlign), e.textBaseline = "middle", r = nt(n.titleFont), a = n.titleSpacing, e.fillStyle = n.titleColor, e.font = r.string, l = 0; l < o; ++l)
        e.fillText(s[l], c.x(t.x), t.y + r.lineHeight / 2), t.y += r.lineHeight + a, l + 1 === o && (t.y += n.titleMarginBottom - a);
    }
  }
  _drawColorBox(t, e, n, s, o) {
    const r = this.labelColors[n], a = this.labelPointStyles[n], { boxHeight: l, boxWidth: c } = o, h = nt(o.bodyFont), d = li(this, "left", o), u = s.x(d), f = l < h.lineHeight ? (h.lineHeight - l) / 2 : 0, g = e.y + f;
    if (o.usePointStyle) {
      const p = {
        radius: Math.min(c, l) / 2,
        pointStyle: a.pointStyle,
        rotation: a.rotation,
        borderWidth: 1
      }, b = s.leftForLtr(u, c) + c / 2, _ = g + l / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, sn(t, p, b, _), t.strokeStyle = r.borderColor, t.fillStyle = r.backgroundColor, sn(t, p, b, _);
    } else {
      t.lineWidth = I(r.borderWidth) ? Math.max(...Object.values(r.borderWidth)) : r.borderWidth || 1, t.strokeStyle = r.borderColor, t.setLineDash(r.borderDash || []), t.lineDashOffset = r.borderDashOffset || 0;
      const p = s.leftForLtr(u, c), b = s.leftForLtr(s.xPlus(u, 1), c - 2), _ = te(r.borderRadius);
      Object.values(_).some((x) => x !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, Be(t, {
        x: p,
        y: g,
        w: c,
        h: l,
        radius: _
      }), t.fill(), t.stroke(), t.fillStyle = r.backgroundColor, t.beginPath(), Be(t, {
        x: b,
        y: g + 1,
        w: c - 2,
        h: l - 2,
        radius: _
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(p, g, c, l), t.strokeRect(p, g, c, l), t.fillStyle = r.backgroundColor, t.fillRect(b, g + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[n];
  }
  drawBody(t, e, n) {
    const { body: s } = this, { bodySpacing: o, bodyAlign: r, displayColors: a, boxHeight: l, boxWidth: c, boxPadding: h } = n, d = nt(n.bodyFont);
    let u = d.lineHeight, f = 0;
    const g = ce(n.rtl, this.x, this.width), p = function(C) {
      e.fillText(C, g.x(t.x + f), t.y + u / 2), t.y += u + o;
    }, b = g.textAlign(r);
    let _, x, k, v, y, S, P;
    for (e.textAlign = r, e.textBaseline = "middle", e.font = d.string, t.x = li(this, b, n), e.fillStyle = n.bodyColor, N(this.beforeBody, p), f = a && b !== "right" ? r === "center" ? c / 2 + h : c + 2 + h : 0, v = 0, S = s.length; v < S; ++v) {
      for (_ = s[v], x = this.labelTextColors[v], e.fillStyle = x, N(_.before, p), k = _.lines, a && k.length && (this._drawColorBox(e, t, v, g, n), u = Math.max(d.lineHeight, l)), y = 0, P = k.length; y < P; ++y)
        p(k[y]), u = d.lineHeight;
      N(_.after, p);
    }
    f = 0, u = d.lineHeight, N(this.afterBody, p), t.y -= o;
  }
  drawFooter(t, e, n) {
    const s = this.footer, o = s.length;
    let r, a;
    if (o) {
      const l = ce(n.rtl, this.x, this.width);
      for (t.x = li(this, n.footerAlign, n), t.y += n.footerMarginTop, e.textAlign = l.textAlign(n.footerAlign), e.textBaseline = "middle", r = nt(n.footerFont), e.fillStyle = n.footerColor, e.font = r.string, a = 0; a < o; ++a)
        e.fillText(s[a], l.x(t.x), t.y + r.lineHeight / 2), t.y += r.lineHeight + n.footerSpacing;
    }
  }
  drawBackground(t, e, n, s) {
    const { xAlign: o, yAlign: r } = this, { x: a, y: l } = t, { width: c, height: h } = n, { topLeft: d, topRight: u, bottomLeft: f, bottomRight: g } = te(s.cornerRadius);
    e.fillStyle = s.backgroundColor, e.strokeStyle = s.borderColor, e.lineWidth = s.borderWidth, e.beginPath(), e.moveTo(a + d, l), r === "top" && this.drawCaret(t, e, n, s), e.lineTo(a + c - u, l), e.quadraticCurveTo(a + c, l, a + c, l + u), r === "center" && o === "right" && this.drawCaret(t, e, n, s), e.lineTo(a + c, l + h - g), e.quadraticCurveTo(a + c, l + h, a + c - g, l + h), r === "bottom" && this.drawCaret(t, e, n, s), e.lineTo(a + f, l + h), e.quadraticCurveTo(a, l + h, a, l + h - f), r === "center" && o === "left" && this.drawCaret(t, e, n, s), e.lineTo(a, l + d), e.quadraticCurveTo(a, l, a + d, l), e.closePath(), e.fill(), s.borderWidth > 0 && e.stroke();
  }
  _updateAnimationTarget(t) {
    const e = this.chart, n = this.$animations, s = n && n.x, o = n && n.y;
    if (s || o) {
      const r = Se[t.position].call(this, this._active, this._eventPosition);
      if (!r)
        return;
      const a = this._size = oo(this, t), l = Object.assign({}, r, this._size), c = ro(e, t, l), h = ao(t, l, c, e);
      (s._to !== h.x || o._to !== h.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = a.width, this.height = a.height, this.caretX = r.x, this.caretY = r.y, this._resolveAnimations().update(this, h));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const e = this.options.setContext(this.getContext());
    let n = this.opacity;
    if (!n)
      return;
    this._updateAnimationTarget(e);
    const s = {
      width: this.width,
      height: this.height
    }, o = {
      x: this.x,
      y: this.y
    };
    n = Math.abs(n) < 1e-3 ? 0 : n;
    const r = at(e.padding), a = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    e.enabled && a && (t.save(), t.globalAlpha = n, this.drawBackground(o, t, s, e), Yo(t, e.textDirection), o.y += r.top, this.drawTitle(o, t, e), this.drawBody(o, t, e), this.drawFooter(o, t, e), Uo(t, e.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, e) {
    const n = this._active, s = t.map(({ datasetIndex: a, index: l }) => {
      const c = this.chart.getDatasetMeta(a);
      if (!c)
        throw new Error("Cannot find a dataset at index " + a);
      return {
        datasetIndex: a,
        element: c.data[l],
        index: l
      };
    }), o = !_i(n, s), r = this._positionChanged(s, e);
    (o || r) && (this._active = s, this._eventPosition = e, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, e, n = !0) {
    if (e && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options, o = this._active || [], r = this._getActiveElements(t, o, e, n), a = this._positionChanged(r, t), l = e || !_i(r, o) || a;
    return l && (this._active = r, (s.enabled || s.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, e))), l;
  }
  _getActiveElements(t, e, n, s) {
    const o = this.options;
    if (t.type === "mouseout")
      return [];
    if (!s)
      return e.filter((a) => this.chart.data.datasets[a.datasetIndex] && this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index) !== void 0);
    const r = this.chart.getElementsAtEventForMode(t, o.mode, o, n);
    return o.reverse && r.reverse(), r;
  }
  _positionChanged(t, e) {
    const { caretX: n, caretY: s, options: o } = this, r = Se[o.position].call(this, t, e);
    return r !== !1 && (n !== r.x || s !== r.y);
  }
}
M(dn, "positioners", Se);
var Dd = {
  id: "tooltip",
  _element: dn,
  positioners: Se,
  afterInit(i, t, e) {
    e && (i.tooltip = new dn({
      chart: i,
      options: e
    }));
  },
  beforeUpdate(i, t, e) {
    i.tooltip && i.tooltip.initialize(e);
  },
  reset(i, t, e) {
    i.tooltip && i.tooltip.initialize(e);
  },
  afterDraw(i) {
    const t = i.tooltip;
    if (t && t._willRender()) {
      const e = {
        tooltip: t
      };
      if (i.notifyPlugins("beforeTooltipDraw", {
        ...e,
        cancelable: !0
      }) === !1)
        return;
      t.draw(i.ctx), i.notifyPlugins("afterTooltipDraw", e);
    }
  },
  afterEvent(i, t) {
    if (i.tooltip) {
      const e = t.replay;
      i.tooltip.handleEvent(t.event, e, t.inChartArea) && (t.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (i, t) => t.bodyFont.size,
    boxWidth: (i, t) => t.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: !0,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "width",
          "height",
          "caretX",
          "caretY"
        ]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: br
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (i) => i !== "filter" && i !== "itemSort" && i !== "external",
    _indexable: !1,
    callbacks: {
      _scriptable: !1,
      _indexable: !1
    },
    animation: {
      _fallback: !1
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: [
    "interaction"
  ]
}, Ad = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Colors: jh,
  Decimation: Uh,
  Filler: ud,
  Legend: _d,
  SubTitle: vd,
  Title: yd,
  Tooltip: Dd
});
const Td = (i, t, e, n) => (typeof t == "string" ? (e = i.push(t) - 1, n.unshift({
  index: e,
  label: t
})) : isNaN(t) && (e = null), e);
function Rd(i, t, e, n) {
  const s = i.indexOf(t);
  if (s === -1)
    return Td(i, t, e, n);
  const o = i.lastIndexOf(t);
  return s !== o ? e : s;
}
const Ed = (i, t) => i === null ? null : st(Math.round(i), 0, t);
function ho(i) {
  const t = this.getLabels();
  return i >= 0 && i < t.length ? t[i] : i;
}
class un extends se {
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const e = this._addedLabels;
    if (e.length) {
      const n = this.getLabels();
      for (const { index: s, label: o } of e)
        n[s] === o && n.splice(s, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, e) {
    if (W(t))
      return null;
    const n = this.getLabels();
    return e = isFinite(e) && n[e] === t ? e : Rd(n, t, T(e, t), this._addedLabels), Ed(e, n.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: e } = this.getUserBounds();
    let { min: n, max: s } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (n = 0), e || (s = this.getLabels().length - 1)), this.min = n, this.max = s;
  }
  buildTicks() {
    const t = this.min, e = this.max, n = this.options.offset, s = [];
    let o = this.getLabels();
    o = t === 0 && e === o.length - 1 ? o : o.slice(t, e + 1), this._valueRange = Math.max(o.length - (n ? 0 : 1), 1), this._startValue = this.min - (n ? 0.5 : 0);
    for (let r = t; r <= e; r++)
      s.push({
        value: r
      });
    return s;
  }
  getLabelForValue(t) {
    return ho.call(this, t);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
M(un, "id", "category"), M(un, "defaults", {
  ticks: {
    callback: ho
  }
});
function Ld(i, t) {
  const e = [], { bounds: s, step: o, min: r, max: a, precision: l, count: c, maxTicks: h, maxDigits: d, includeBounds: u } = i, f = o || 1, g = h - 1, { min: p, max: b } = t, _ = !W(r), x = !W(a), k = !W(c), v = (b - p) / (d + 1);
  let y = ss((b - p) / g / f) * f, S, P, C, D;
  if (y < 1e-14 && !_ && !x)
    return [
      {
        value: p
      },
      {
        value: b
      }
    ];
  D = Math.ceil(b / y) - Math.floor(p / y), D > g && (y = ss(D * y / g / f) * f), W(l) || (S = Math.pow(10, l), y = Math.ceil(y * S) / S), s === "ticks" ? (P = Math.floor(p / y) * y, C = Math.ceil(b / y) * y) : (P = p, C = b), _ && x && o && Oa((a - r) / o, y / 1e3) ? (D = Math.round(Math.min((a - r) / y, h)), y = (a - r) / D, P = r, C = a) : k ? (P = _ ? r : P, C = x ? a : C, D = c - 1, y = (C - P) / D) : (D = (C - P) / y, Oe(D, Math.round(D), y / 1e3) ? D = Math.round(D) : D = Math.ceil(D));
  const R = Math.max(os(y), os(P));
  S = Math.pow(10, W(l) ? R : l), P = Math.round(P * S) / S, C = Math.round(C * S) / S;
  let E = 0;
  for (_ && (u && P !== r ? (e.push({
    value: r
  }), P < r && E++, Oe(Math.round((P + E * y) * S) / S, r, uo(r, v, i)) && E++) : P < r && E++); E < D; ++E) {
    const L = Math.round((P + E * y) * S) / S;
    if (x && L > a)
      break;
    e.push({
      value: L
    });
  }
  return x && u && C !== a ? e.length && Oe(e[e.length - 1].value, a, uo(a, v, i)) ? e[e.length - 1].value = a : e.push({
    value: a
  }) : (!x || C === a) && e.push({
    value: C
  }), e;
}
function uo(i, t, { horizontal: e, minRotation: n }) {
  const s = bt(n), o = (e ? Math.sin(s) : Math.cos(s)) || 1e-3, r = 0.75 * t * ("" + i).length;
  return Math.min(t / o, r);
}
class Si extends se {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, e) {
    return W(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: e, maxDefined: n } = this.getUserBounds();
    let { min: s, max: o } = this;
    const r = (l) => s = e ? s : l, a = (l) => o = n ? o : l;
    if (t) {
      const l = kt(s), c = kt(o);
      l < 0 && c < 0 ? a(0) : l > 0 && c > 0 && r(0);
    }
    if (s === o) {
      let l = o === 0 ? 1 : Math.abs(o * 0.05);
      a(o + l), t || r(s - l);
    }
    this.min = s, this.max = o;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: e, stepSize: n } = t, s;
    return n ? (s = Math.ceil(this.max / n) - Math.floor(this.min / n) + 1, s > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${n} would result generating up to ${s} ticks. Limiting to 1000.`), s = 1e3)) : (s = this.computeTickLimit(), e = e || 11), e && (s = Math.min(e, s)), s;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, e = t.ticks;
    let n = this.getTickLimit();
    n = Math.max(2, n);
    const s = {
      maxTicks: n,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: e.precision,
      step: e.stepSize,
      count: e.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: e.minRotation || 0,
      includeBounds: e.includeBounds !== !1
    }, o = this._range || this, r = Ld(s, o);
    return t.bounds === "ticks" && Oo(r, this, "value"), t.reverse ? (r.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), r;
  }
  configure() {
    const t = this.ticks;
    let e = this.min, n = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const s = (n - e) / Math.max(t.length - 1, 1) / 2;
      e -= s, n += s;
    }
    this._startValue = e, this._endValue = n, this._valueRange = n - e;
  }
  getLabelForValue(t) {
    return He(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class fn extends Si {
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    this.min = G(t) ? t : 0, this.max = G(e) ? e : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), e = t ? this.width : this.height, n = bt(this.options.ticks.minRotation), s = (t ? Math.sin(n) : Math.cos(n)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(e / Math.min(40, o.lineHeight / s));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
M(fn, "id", "linear"), M(fn, "defaults", {
  ticks: {
    callback: Ci.formatters.numeric
  }
});
const Ve = (i) => Math.floor(Bt(i)), Gt = (i, t) => Math.pow(10, Ve(i) + t);
function fo(i) {
  return i / Math.pow(10, Ve(i)) === 1;
}
function go(i, t, e) {
  const n = Math.pow(10, e), s = Math.floor(i / n);
  return Math.ceil(t / n) - s;
}
function Fd(i, t) {
  const e = t - i;
  let n = Ve(e);
  for (; go(i, t, n) > 10; )
    n++;
  for (; go(i, t, n) < 10; )
    n--;
  return Math.min(n, Ve(i));
}
function Id(i, { min: t, max: e }) {
  t = ut(i.min, t);
  const n = [], s = Ve(t);
  let o = Fd(t, e), r = o < 0 ? Math.pow(10, Math.abs(o)) : 1;
  const a = Math.pow(10, o), l = s > o ? Math.pow(10, s) : 0, c = Math.round((t - l) * r) / r, h = Math.floor((t - l) / a / 10) * a * 10;
  let d = Math.floor((c - h) / Math.pow(10, o)), u = ut(i.min, Math.round((l + h + d * Math.pow(10, o)) * r) / r);
  for (; u < e; )
    n.push({
      value: u,
      major: fo(u),
      significand: d
    }), d >= 10 ? d = d < 15 ? 15 : 20 : d++, d >= 20 && (o++, d = 2, r = o >= 0 ? 1 : r), u = Math.round((l + h + d * Math.pow(10, o)) * r) / r;
  const f = ut(i.max, u);
  return n.push({
    value: f,
    major: fo(f),
    significand: d
  }), n;
}
class gn extends se {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
  }
  parse(t, e) {
    const n = Si.prototype.parse.apply(this, [
      t,
      e
    ]);
    if (n === 0) {
      this._zero = !0;
      return;
    }
    return G(n) && n > 0 ? n : null;
  }
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    this.min = G(t) ? Math.max(0, t) : null, this.max = G(e) ? Math.max(0, e) : null, this.options.beginAtZero && (this._zero = !0), this._zero && this.min !== this._suggestedMin && !G(this._userMin) && (this.min = t === Gt(this.min, 0) ? Gt(this.min, -1) : Gt(this.min, 0)), this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined: t, maxDefined: e } = this.getUserBounds();
    let n = this.min, s = this.max;
    const o = (a) => n = t ? n : a, r = (a) => s = e ? s : a;
    n === s && (n <= 0 ? (o(1), r(10)) : (o(Gt(n, -1)), r(Gt(s, 1)))), n <= 0 && o(Gt(s, -1)), s <= 0 && r(Gt(n, 1)), this.min = n, this.max = s;
  }
  buildTicks() {
    const t = this.options, e = {
      min: this._userMin,
      max: this._userMax
    }, n = Id(e, this);
    return t.bounds === "ticks" && Oo(n, this, "value"), t.reverse ? (n.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), n;
  }
  getLabelForValue(t) {
    return t === void 0 ? "0" : He(t, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const t = this.min;
    super.configure(), this._startValue = Bt(t), this._valueRange = Bt(this.max) - Bt(t);
  }
  getPixelForValue(t) {
    return (t === void 0 || t === 0) && (t = this.min), t === null || isNaN(t) ? NaN : this.getPixelForDecimal(t === this.min ? 0 : (Bt(t) - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    const e = this.getDecimalForPixel(t);
    return Math.pow(10, this._startValue + e * this._valueRange);
  }
}
M(gn, "id", "logarithmic"), M(gn, "defaults", {
  ticks: {
    callback: Ci.formatters.logarithmic,
    major: {
      enabled: !0
    }
  }
});
function pn(i) {
  const t = i.ticks;
  if (t.display && i.display) {
    const e = at(t.backdropPadding);
    return T(t.font && t.font.size, J.font.size) + e.height;
  }
  return 0;
}
function zd(i, t, e) {
  return e = U(e) ? e : [
    e
  ], {
    w: Ya(i, t.string, e),
    h: e.length * t.lineHeight
  };
}
function po(i, t, e, n, s) {
  return i === n || i === s ? {
    start: t - e / 2,
    end: t + e / 2
  } : i < n || i > s ? {
    start: t - e,
    end: t
  } : {
    start: t,
    end: t + e
  };
}
function Bd(i) {
  const t = {
    l: i.left + i._padding.left,
    r: i.right - i._padding.right,
    t: i.top + i._padding.top,
    b: i.bottom - i._padding.bottom
  }, e = Object.assign({}, t), n = [], s = [], o = i._pointLabels.length, r = i.options.pointLabels, a = r.centerPointLabels ? K / o : 0;
  for (let l = 0; l < o; l++) {
    const c = r.setContext(i.getPointLabelContext(l));
    s[l] = c.padding;
    const h = i.getPointPosition(l, i.drawingArea + s[l], a), d = nt(c.font), u = zd(i.ctx, d, i._pointLabels[l]);
    n[l] = u;
    const f = ft(i.getIndexAngle(l) + a), g = Math.round(vn(f)), p = po(g, h.x, u.w, 0, 180), b = po(g, h.y, u.h, 90, 270);
    Wd(e, t, f, p, b);
  }
  i.setCenterPoint(t.l - e.l, e.r - t.r, t.t - e.t, e.b - t.b), i._pointLabelItems = jd(i, n, s);
}
function Wd(i, t, e, n, s) {
  const o = Math.abs(Math.sin(e)), r = Math.abs(Math.cos(e));
  let a = 0, l = 0;
  n.start < t.l ? (a = (t.l - n.start) / o, i.l = Math.min(i.l, t.l - a)) : n.end > t.r && (a = (n.end - t.r) / o, i.r = Math.max(i.r, t.r + a)), s.start < t.t ? (l = (t.t - s.start) / r, i.t = Math.min(i.t, t.t - l)) : s.end > t.b && (l = (s.end - t.b) / r, i.b = Math.max(i.b, t.b + l));
}
function Vd(i, t, e) {
  const n = i.drawingArea, { extra: s, additionalAngle: o, padding: r, size: a } = e, l = i.getPointPosition(t, n + s + r, o), c = Math.round(vn(ft(l.angle + tt))), h = Yd(l.y, a.h, c), d = Hd(c), u = $d(l.x, a.w, d);
  return {
    visible: !0,
    x: l.x,
    y: h,
    textAlign: d,
    left: u,
    top: h,
    right: u + a.w,
    bottom: h + a.h
  };
}
function Nd(i, t) {
  if (!t)
    return !0;
  const { left: e, top: n, right: s, bottom: o } = i;
  return !(Et({
    x: e,
    y: n
  }, t) || Et({
    x: e,
    y: o
  }, t) || Et({
    x: s,
    y: n
  }, t) || Et({
    x: s,
    y: o
  }, t));
}
function jd(i, t, e) {
  const n = [], s = i._pointLabels.length, o = i.options, { centerPointLabels: r, display: a } = o.pointLabels, l = {
    extra: pn(o) / 2,
    additionalAngle: r ? K / s : 0
  };
  let c;
  for (let h = 0; h < s; h++) {
    l.padding = e[h], l.size = t[h];
    const d = Vd(i, h, l);
    n.push(d), a === "auto" && (d.visible = Nd(d, c), d.visible && (c = d));
  }
  return n;
}
function Hd(i) {
  return i === 0 || i === 180 ? "center" : i < 180 ? "left" : "right";
}
function $d(i, t, e) {
  return e === "right" ? i -= t : e === "center" && (i -= t / 2), i;
}
function Yd(i, t, e) {
  return e === 90 || e === 270 ? i -= t / 2 : (e > 270 || e < 90) && (i -= t), i;
}
function Ud(i, t, e) {
  const { left: n, top: s, right: o, bottom: r } = e, { backdropColor: a } = t;
  if (!W(a)) {
    const l = te(t.borderRadius), c = at(t.backdropPadding);
    i.fillStyle = a;
    const h = n - c.left, d = s - c.top, u = o - n + c.width, f = r - s + c.height;
    Object.values(l).some((g) => g !== 0) ? (i.beginPath(), Be(i, {
      x: h,
      y: d,
      w: u,
      h: f,
      radius: l
    }), i.fill()) : i.fillRect(h, d, u, f);
  }
}
function Xd(i, t) {
  const { ctx: e, options: { pointLabels: n } } = i;
  for (let s = t - 1; s >= 0; s--) {
    const o = i._pointLabelItems[s];
    if (!o.visible)
      continue;
    const r = n.setContext(i.getPointLabelContext(s));
    Ud(e, r, o);
    const a = nt(r.font), { x: l, y: c, textAlign: h } = o;
    ne(e, i._pointLabels[s], l, c + a.lineHeight / 2, a, {
      color: r.color,
      textAlign: h,
      textBaseline: "middle"
    });
  }
}
function _r(i, t, e, n) {
  const { ctx: s } = i;
  if (e)
    s.arc(i.xCenter, i.yCenter, t, 0, X);
  else {
    let o = i.getPointPosition(0, t);
    s.moveTo(o.x, o.y);
    for (let r = 1; r < n; r++)
      o = i.getPointPosition(r, t), s.lineTo(o.x, o.y);
  }
}
function Kd(i, t, e, n, s) {
  const o = i.ctx, r = t.circular, { color: a, lineWidth: l } = t;
  !r && !n || !a || !l || e < 0 || (o.save(), o.strokeStyle = a, o.lineWidth = l, o.setLineDash(s.dash), o.lineDashOffset = s.dashOffset, o.beginPath(), _r(i, e, r, n), o.closePath(), o.stroke(), o.restore());
}
function qd(i, t, e) {
  return $t(i, {
    label: e,
    index: t,
    type: "pointLabel"
  });
}
class Pe extends Si {
  constructor(t) {
    super(t), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
  }
  setDimensions() {
    const t = this._padding = at(pn(this.options) / 2), e = this.width = this.maxWidth - t.width, n = this.height = this.maxHeight - t.height;
    this.xCenter = Math.floor(this.left + e / 2 + t.left), this.yCenter = Math.floor(this.top + n / 2 + t.top), this.drawingArea = Math.floor(Math.min(e, n) / 2);
  }
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!1);
    this.min = G(t) && !isNaN(t) ? t : 0, this.max = G(e) && !isNaN(e) ? e : 0, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / pn(this.options));
  }
  generateTickLabels(t) {
    Si.prototype.generateTickLabels.call(this, t), this._pointLabels = this.getLabels().map((e, n) => {
      const s = Y(this.options.pointLabels.callback, [
        e,
        n
      ], this);
      return s || s === 0 ? s : "";
    }).filter((e, n) => this.chart.getDataVisibility(n));
  }
  fit() {
    const t = this.options;
    t.display && t.pointLabels.display ? Bd(this) : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(t, e, n, s) {
    this.xCenter += Math.floor((t - e) / 2), this.yCenter += Math.floor((n - s) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(t, e, n, s));
  }
  getIndexAngle(t) {
    const e = X / (this._pointLabels.length || 1), n = this.options.startAngle || 0;
    return ft(t * e + bt(n));
  }
  getDistanceFromCenterForValue(t) {
    if (W(t))
      return NaN;
    const e = this.drawingArea / (this.max - this.min);
    return this.options.reverse ? (this.max - t) * e : (t - this.min) * e;
  }
  getValueForDistanceFromCenter(t) {
    if (W(t))
      return NaN;
    const e = t / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - e : this.min + e;
  }
  getPointLabelContext(t) {
    const e = this._pointLabels || [];
    if (t >= 0 && t < e.length) {
      const n = e[t];
      return qd(this.getContext(), t, n);
    }
  }
  getPointPosition(t, e, n = 0) {
    const s = this.getIndexAngle(t) - tt + n;
    return {
      x: Math.cos(s) * e + this.xCenter,
      y: Math.sin(s) * e + this.yCenter,
      angle: s
    };
  }
  getPointPositionForValue(t, e) {
    return this.getPointPosition(t, this.getDistanceFromCenterForValue(e));
  }
  getBasePosition(t) {
    return this.getPointPositionForValue(t || 0, this.getBaseValue());
  }
  getPointLabelPosition(t) {
    const { left: e, top: n, right: s, bottom: o } = this._pointLabelItems[t];
    return {
      left: e,
      top: n,
      right: s,
      bottom: o
    };
  }
  drawBackground() {
    const { backgroundColor: t, grid: { circular: e } } = this.options;
    if (t) {
      const n = this.ctx;
      n.save(), n.beginPath(), _r(this, this.getDistanceFromCenterForValue(this._endValue), e, this._pointLabels.length), n.closePath(), n.fillStyle = t, n.fill(), n.restore();
    }
  }
  drawGrid() {
    const t = this.ctx, e = this.options, { angleLines: n, grid: s, border: o } = e, r = this._pointLabels.length;
    let a, l, c;
    if (e.pointLabels.display && Xd(this, r), s.display && this.ticks.forEach((h, d) => {
      if (d !== 0 || d === 0 && this.min < 0) {
        l = this.getDistanceFromCenterForValue(h.value);
        const u = this.getContext(d), f = s.setContext(u), g = o.setContext(u);
        Kd(this, f, l, r, g);
      }
    }), n.display) {
      for (t.save(), a = r - 1; a >= 0; a--) {
        const h = n.setContext(this.getPointLabelContext(a)), { color: d, lineWidth: u } = h;
        !u || !d || (t.lineWidth = u, t.strokeStyle = d, t.setLineDash(h.borderDash), t.lineDashOffset = h.borderDashOffset, l = this.getDistanceFromCenterForValue(e.ticks.reverse ? this.min : this.max), c = this.getPointPosition(a, l), t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(c.x, c.y), t.stroke());
      }
      t.restore();
    }
  }
  drawBorder() {
  }
  drawLabels() {
    const t = this.ctx, e = this.options, n = e.ticks;
    if (!n.display)
      return;
    const s = this.getIndexAngle(0);
    let o, r;
    t.save(), t.translate(this.xCenter, this.yCenter), t.rotate(s), t.textAlign = "center", t.textBaseline = "middle", this.ticks.forEach((a, l) => {
      if (l === 0 && this.min >= 0 && !e.reverse)
        return;
      const c = n.setContext(this.getContext(l)), h = nt(c.font);
      if (o = this.getDistanceFromCenterForValue(this.ticks[l].value), c.showLabelBackdrop) {
        t.font = h.string, r = t.measureText(a.label).width, t.fillStyle = c.backdropColor;
        const d = at(c.backdropPadding);
        t.fillRect(-r / 2 - d.left, -o - h.size / 2 - d.top, r + d.width, h.size + d.height);
      }
      ne(t, a.label, 0, -o, h, {
        color: c.color,
        strokeColor: c.textStrokeColor,
        strokeWidth: c.textStrokeWidth
      });
    }), t.restore();
  }
  drawTitle() {
  }
}
M(Pe, "id", "radialLinear"), M(Pe, "defaults", {
  display: !0,
  animate: !0,
  position: "chartArea",
  angleLines: {
    display: !0,
    lineWidth: 1,
    borderDash: [],
    borderDashOffset: 0
  },
  grid: {
    circular: !1
  },
  startAngle: 0,
  ticks: {
    showLabelBackdrop: !0,
    callback: Ci.formatters.numeric
  },
  pointLabels: {
    backdropColor: void 0,
    backdropPadding: 2,
    display: !0,
    font: {
      size: 10
    },
    callback(t) {
      return t;
    },
    padding: 5,
    centerPointLabels: !1
  }
}), M(Pe, "defaultRoutes", {
  "angleLines.color": "borderColor",
  "pointLabels.color": "color",
  "ticks.color": "color"
}), M(Pe, "descriptors", {
  angleLines: {
    _fallback: "grid"
  }
});
const Ri = {
  millisecond: {
    common: !0,
    size: 1,
    steps: 1e3
  },
  second: {
    common: !0,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: !0,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: !0,
    size: 36e5,
    steps: 24
  },
  day: {
    common: !0,
    size: 864e5,
    steps: 30
  },
  week: {
    common: !1,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: !0,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: !1,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: !0,
    size: 3154e7
  }
}, dt = /* @__PURE__ */ Object.keys(Ri);
function mo(i, t) {
  return i - t;
}
function bo(i, t) {
  if (W(t))
    return null;
  const e = i._adapter, { parser: n, round: s, isoWeekday: o } = i._parseOpts;
  let r = t;
  return typeof n == "function" && (r = n(r)), G(r) || (r = typeof n == "string" ? e.parse(r, n) : e.parse(r)), r === null ? null : (s && (r = s === "week" && (he(o) || o === !0) ? e.startOf(r, "isoWeek", o) : e.startOf(r, s)), +r);
}
function _o(i, t, e, n) {
  const s = dt.length;
  for (let o = dt.indexOf(i); o < s - 1; ++o) {
    const r = Ri[dt[o]], a = r.steps ? r.steps : Number.MAX_SAFE_INTEGER;
    if (r.common && Math.ceil((e - t) / (a * r.size)) <= n)
      return dt[o];
  }
  return dt[s - 1];
}
function Gd(i, t, e, n, s) {
  for (let o = dt.length - 1; o >= dt.indexOf(e); o--) {
    const r = dt[o];
    if (Ri[r].common && i._adapter.diff(s, n, r) >= t - 1)
      return r;
  }
  return dt[e ? dt.indexOf(e) : 0];
}
function Jd(i) {
  for (let t = dt.indexOf(i) + 1, e = dt.length; t < e; ++t)
    if (Ri[dt[t]].common)
      return dt[t];
}
function xo(i, t, e) {
  if (!e)
    i[t] = !0;
  else if (e.length) {
    const { lo: n, hi: s } = kn(e, t), o = e[n] >= t ? e[n] : e[s];
    i[o] = !0;
  }
}
function Zd(i, t, e, n) {
  const s = i._adapter, o = +s.startOf(t[0].value, n), r = t[t.length - 1].value;
  let a, l;
  for (a = o; a <= r; a = +s.add(a, 1, n))
    l = e[a], l >= 0 && (t[l].major = !0);
  return t;
}
function yo(i, t, e) {
  const n = [], s = {}, o = t.length;
  let r, a;
  for (r = 0; r < o; ++r)
    a = t[r], s[a] = r, n.push({
      value: a,
      major: !1
    });
  return o === 0 || !e ? n : Zd(i, n, s, e);
}
class Ne extends se {
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, e = {}) {
    const n = t.time || (t.time = {}), s = this._adapter = new ac._date(t.adapters.date);
    s.init(e), Ce(n.displayFormats, s.formats()), this._parseOpts = {
      parser: n.parser,
      round: n.round,
      isoWeekday: n.isoWeekday
    }, super.init(t), this._normalized = e.normalized;
  }
  parse(t, e) {
    return t === void 0 ? null : bo(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, e = this._adapter, n = t.time.unit || "day";
    let { min: s, max: o, minDefined: r, maxDefined: a } = this.getUserBounds();
    function l(c) {
      !r && !isNaN(c.min) && (s = Math.min(s, c.min)), !a && !isNaN(c.max) && (o = Math.max(o, c.max));
    }
    (!r || !a) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), s = G(s) && !isNaN(s) ? s : +e.startOf(Date.now(), n), o = G(o) && !isNaN(o) ? o : +e.endOf(Date.now(), n) + 1, this.min = Math.min(s, o - 1), this.max = Math.max(s + 1, o);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let e = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY;
    return t.length && (e = t[0], n = t[t.length - 1]), {
      min: e,
      max: n
    };
  }
  buildTicks() {
    const t = this.options, e = t.time, n = t.ticks, s = n.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && s.length && (this.min = this._userMin || s[0], this.max = this._userMax || s[s.length - 1]);
    const o = this.min, r = this.max, a = Ra(s, o, r);
    return this._unit = e.unit || (n.autoSkip ? _o(e.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Gd(this, a.length, e.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : Jd(this._unit), this.initOffsets(s), t.reverse && a.reverse(), yo(this, a, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let e = 0, n = 0, s, o;
    this.options.offset && t.length && (s = this.getDecimalForValue(t[0]), t.length === 1 ? e = 1 - s : e = (this.getDecimalForValue(t[1]) - s) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? n = o : n = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const r = t.length < 3 ? 0.5 : 0.25;
    e = st(e, 0, r), n = st(n, 0, r), this._offsets = {
      start: e,
      end: n,
      factor: 1 / (e + 1 + n)
    };
  }
  _generate() {
    const t = this._adapter, e = this.min, n = this.max, s = this.options, o = s.time, r = o.unit || _o(o.minUnit, e, n, this._getLabelCapacity(e)), a = T(s.ticks.stepSize, 1), l = r === "week" ? o.isoWeekday : !1, c = he(l) || l === !0, h = {};
    let d = e, u, f;
    if (c && (d = +t.startOf(d, "isoWeek", l)), d = +t.startOf(d, c ? "day" : r), t.diff(n, e, r) > 1e5 * a)
      throw new Error(e + " and " + n + " are too far apart with stepSize of " + a + " " + r);
    const g = s.ticks.source === "data" && this.getDataTimestamps();
    for (u = d, f = 0; u < n; u = +t.add(u, a, r), f++)
      xo(h, u, g);
    return (u === n || s.bounds === "ticks" || f === 1) && xo(h, u, g), Object.keys(h).sort(mo).map((p) => +p);
  }
  getLabelForValue(t) {
    const e = this._adapter, n = this.options.time;
    return n.tooltipFormat ? e.format(t, n.tooltipFormat) : e.format(t, n.displayFormats.datetime);
  }
  format(t, e) {
    const s = this.options.time.displayFormats, o = this._unit, r = e || s[o];
    return this._adapter.format(t, r);
  }
  _tickFormatFunction(t, e, n, s) {
    const o = this.options, r = o.ticks.callback;
    if (r)
      return Y(r, [
        t,
        e,
        n
      ], this);
    const a = o.time.displayFormats, l = this._unit, c = this._majorUnit, h = l && a[l], d = c && a[c], u = n[e], f = c && d && u && u.major;
    return this._adapter.format(t, s || (f ? d : h));
  }
  generateTickLabels(t) {
    let e, n, s;
    for (e = 0, n = t.length; e < n; ++e)
      s = t[e], s.label = this._tickFormatFunction(s.value, e, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const e = this._offsets, n = this.getDecimalForValue(t);
    return this.getPixelForDecimal((e.start + n) * e.factor);
  }
  getValueForPixel(t) {
    const e = this._offsets, n = this.getDecimalForPixel(t) / e.factor - e.end;
    return this.min + n * (this.max - this.min);
  }
  _getLabelSize(t) {
    const e = this.options.ticks, n = this.ctx.measureText(t).width, s = bt(this.isHorizontal() ? e.maxRotation : e.minRotation), o = Math.cos(s), r = Math.sin(s), a = this._resolveTickFontOptions(0).size;
    return {
      w: n * o + a * r,
      h: n * r + a * o
    };
  }
  _getLabelCapacity(t) {
    const e = this.options.time, n = e.displayFormats, s = n[e.unit] || n.millisecond, o = this._tickFormatFunction(t, 0, yo(this, [
      t
    ], this._majorUnit), s), r = this._getLabelSize(o), a = Math.floor(this.isHorizontal() ? this.width / r.w : this.height / r.h) - 1;
    return a > 0 ? a : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], e, n;
    if (t.length)
      return t;
    const s = this.getMatchingVisibleMetas();
    if (this._normalized && s.length)
      return this._cache.data = s[0].controller.getAllParsedValues(this);
    for (e = 0, n = s.length; e < n; ++e)
      t = t.concat(s[e].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let e, n;
    if (t.length)
      return t;
    const s = this.getLabels();
    for (e = 0, n = s.length; e < n; ++e)
      t.push(bo(this, s[e]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return To(t.sort(mo));
  }
}
M(Ne, "id", "time"), M(Ne, "defaults", {
  bounds: "data",
  adapters: {},
  time: {
    parser: !1,
    unit: !1,
    round: !1,
    isoWeekday: !1,
    minUnit: "millisecond",
    displayFormats: {}
  },
  ticks: {
    source: "auto",
    callback: !1,
    major: {
      enabled: !1
    }
  }
});
function ci(i, t, e) {
  let n = 0, s = i.length - 1, o, r, a, l;
  e ? (t >= i[n].pos && t <= i[s].pos && ({ lo: n, hi: s } = Rt(i, "pos", t)), { pos: o, time: a } = i[n], { pos: r, time: l } = i[s]) : (t >= i[n].time && t <= i[s].time && ({ lo: n, hi: s } = Rt(i, "time", t)), { time: o, pos: a } = i[n], { time: r, pos: l } = i[s]);
  const c = r - o;
  return c ? a + (l - a) * (t - o) / c : a;
}
class mn extends Ne {
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), e = this._table = this.buildLookupTable(t);
    this._minPos = ci(e, this.min), this._tableRange = ci(e, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: e, max: n } = this, s = [], o = [];
    let r, a, l, c, h;
    for (r = 0, a = t.length; r < a; ++r)
      c = t[r], c >= e && c <= n && s.push(c);
    if (s.length < 2)
      return [
        {
          time: e,
          pos: 0
        },
        {
          time: n,
          pos: 1
        }
      ];
    for (r = 0, a = s.length; r < a; ++r)
      h = s[r + 1], l = s[r - 1], c = s[r], Math.round((h + l) / 2) !== c && o.push({
        time: c,
        pos: r / (a - 1)
      });
    return o;
  }
  _generate() {
    const t = this.min, e = this.max;
    let n = super.getDataTimestamps();
    return (!n.includes(t) || !n.length) && n.splice(0, 0, t), (!n.includes(e) || n.length === 1) && n.push(e), n.sort((s, o) => s - o);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const e = this.getDataTimestamps(), n = this.getLabelTimestamps();
    return e.length && n.length ? t = this.normalize(e.concat(n)) : t = e.length ? e : n, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (ci(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const e = this._offsets, n = this.getDecimalForPixel(t) / e.factor - e.end;
    return ci(this._table, n * this._tableRange + this._minPos, !0);
  }
}
M(mn, "id", "timeseries"), M(mn, "defaults", Ne.defaults);
var Qd = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  CategoryScale: un,
  LinearScale: fn,
  LogarithmicScale: gn,
  RadialLinearScale: Pe,
  TimeScale: Ne,
  TimeSeriesScale: mn
});
const tu = [
  rc,
  Ih,
  Ad,
  Qd
], xr = "label";
function vo(i, t) {
  typeof i == "function" ? i(t) : i && (i.current = t);
}
function eu(i, t) {
  const e = i.options;
  e && t && Object.assign(e, t);
}
function yr(i, t) {
  i.labels = t;
}
function vr(i, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : xr;
  const n = [];
  i.datasets = t.map((s) => {
    const o = i.datasets.find((r) => r[e] === s[e]);
    return !o || !s.data || n.includes(o) ? {
      ...s
    } : (n.push(o), Object.assign(o, s), o);
  });
}
function iu(i) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : xr;
  const e = {
    labels: [],
    datasets: []
  };
  return yr(e, i.labels), vr(e, i.datasets, t), e;
}
function nu(i, t) {
  const { height: e = 150, width: n = 300, redraw: s = !1, datasetIdKey: o, type: r, data: a, options: l, plugins: c = [], fallbackContent: h, updateMode: d, ...u } = i, f = Kn(null), g = Kn(), p = () => {
    f.current && (g.current = new Ti(f.current, {
      type: r,
      data: iu(a, o),
      options: l && {
        ...l
      },
      plugins: c
    }), vo(t, g.current));
  }, b = () => {
    vo(t, null), g.current && (g.current.destroy(), g.current = null);
  };
  return It(() => {
    !s && g.current && l && eu(g.current, l);
  }, [
    s,
    l
  ]), It(() => {
    !s && g.current && yr(g.current.config.data, a.labels);
  }, [
    s,
    a.labels
  ]), It(() => {
    !s && g.current && a.datasets && vr(g.current.config.data, a.datasets, o);
  }, [
    s,
    a.datasets
  ]), It(() => {
    g.current && (s ? (b(), setTimeout(p)) : g.current.update(d));
  }, [
    s,
    l,
    a.labels,
    a.datasets,
    d
  ]), It(() => {
    g.current && (b(), setTimeout(p));
  }, [
    r
  ]), It(() => (p(), () => b()), []), /* @__PURE__ */ Pi.createElement("canvas", Object.assign({
    ref: f,
    role: "img",
    height: e,
    width: n
  }, u), h);
}
const su = /* @__PURE__ */ ko(nu);
function kr(i, t) {
  return Ti.register(t), /* @__PURE__ */ ko((e, n) => /* @__PURE__ */ Pi.createElement(su, Object.assign({}, e, {
    ref: n,
    type: i
  })));
}
const ou = /* @__PURE__ */ kr("line", Re), ru = /* @__PURE__ */ kr("bar", Te);
Ti.register(...tu);
const du = ({ id: i, inspection: t, topic: e, decision_key: n }) => {
  const [s, o] = Zi(JSON.parse(localStorage.getItem(`bar_chart_${i}`)) || []), [r, a] = Zi(JSON.parse(localStorage.getItem(`bar_chart_${i}_labels`)) || []);
  It(() => {
    if (t && t.results[n] != null) {
      let d = t.results[n];
      a((u) => {
        const f = u.indexOf(d);
        return f === -1 ? (o((g) => [...g, 1]), [...u, d]) : (o((g) => {
          const p = [...g];
          return p[f]++, p;
        }), u);
      }), localStorage.setItem(`bar_chart_${i}`, JSON.stringify(s)), localStorage.setItem(`bar_chart_${i}_labels`, JSON.stringify(r));
    }
  }, [t]);
  const l = {
    labels: r,
    datasets: [
      {
        label: e,
        data: s,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }
    ]
  }, c = {
    animation: !0,
    maintainAspectRatio: !1,
    plugins: {
      legend: {
        display: !1
      }
    },
    scales: {
      y: {
        beginAtZero: !0,
        ticks: {
          fontColor: "white",
          color: "white"
        }
      },
      x: {
        ticks: {
          fontColor: "white",
          color: "white"
        }
      }
    }
  }, h = {
    height: "90%",
    position: "relative",
    fontSize: "20px",
    width: "100%"
  };
  return /* @__PURE__ */ bi.jsx("div", { style: h, children: /* @__PURE__ */ bi.jsx(ru, { data: l, options: c }) });
};
function au(i, t, e) {
  const n = [...i, t];
  return n.length > e ? n.slice(1) : n;
}
const uu = ({ id: i, inspection: t, decision_key: e, history_len: n = 10 }) => {
  const [s, o] = Zi(JSON.parse(localStorage.getItem(`line_chart_${i}`)) || []);
  let r = [];
  for (let h = 0; h < n; h++)
    r.push(h);
  const a = {
    labels: r,
    datasets: s
  }, l = {
    animation: !1,
    maintainAspectRatio: !1,
    plugins: {
      legend: {
        labels: {
          color: "white"
        }
      }
    },
    scales: {
      y: {
        beginAtZero: !0,
        ticks: {
          color: "white"
        }
      },
      x: {
        ticks: {
          color: "white"
        }
      }
    }
  };
  It(() => {
    if (t && t.results[e] != null) {
      let h = t.results[e];
      o((d) => d.length === 0 ? [{
        label: e,
        data: [parseInt(h)],
        tension: 0.1,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)"
      }] : d.map((f) => ({ ...f, data: au(f.data, parseInt(h), n) }))), localStorage.setItem(`line_chart_${i}`, JSON.stringify(s));
    }
  }, [t]);
  const c = {
    height: "90%",
    position: "relative",
    fontSize: "20px",
    width: "100%"
  };
  return /* @__PURE__ */ bi.jsx("div", { style: c, children: /* @__PURE__ */ bi.jsx(ou, { data: a, options: l }) });
};
export {
  du as BarChart,
  uu as LineChart
};
