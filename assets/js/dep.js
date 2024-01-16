window.matchMedia || (window.matchMedia = function() {
    "use strict";
    var e = window.styleMedia || window.media;
    if (!e) {
        var i, n = document.createElement("style"), t = document.getElementsByTagName("script")[0];
        n.type = "text/css",
        n.id = "matchmediajs-test",
        t.parentNode.insertBefore(n, t),
        i = "getComputedStyle"in window && window.getComputedStyle(n, null) || n.currentStyle,
        e = {
            matchMedium: function(t) {
                var e = "@media " + t + "{ #matchmediajs-test { width: 1px; } }";
                return n.styleSheet ? n.styleSheet.cssText = e : n.textContent = e,
                "1px" === i.width
            }
        }
    }
    return function(t) {
        return {
            matches: e.matchMedium(t || "all"),
            media: t || "all"
        }
    }
}());
var objectFitImages = function() {
    "use strict";
    var o = "fregante:object-fit-images"
      , r = /(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g
      , t = "undefined" == typeof Image ? {
        style: {
            "object-position": 1
        }
    } : new Image
      , n = "object-fit"in t.style
      , s = "object-position"in t.style
      , a = "background-size"in t.style
      , l = "string" == typeof t.currentSrc
      , c = t.getAttribute
      , u = t.setAttribute
      , d = !1;
    function h(t, e, i) {
        var n = function(t, e) {
            return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + t + "' height='" + e + "'%3E%3C/svg%3E"
        }(e || 1, i || 0);
        c.call(t, "src") !== n && u.call(t, "src", n)
    }
    function f(t, e) {
        t.naturalWidth ? e(t) : setTimeout(f, 100, t, e)
    }
    function p(e) {
        var t = function(t) {
            for (var e, i = getComputedStyle(t).fontFamily, n = {}; null !== (e = r.exec(i)); )
                n[e[1]] = e[2];
            return n
        }(e)
          , i = e[o];
        if (t["object-fit"] = t["object-fit"] || "fill",
        !i.img) {
            if ("fill" === t["object-fit"])
                return;
            if (!i.skipTest && n && !t["object-position"])
                return
        }
        if (!i.img) {
            i.img = new Image(e.width,e.height),
            i.img.srcset = c.call(e, "data-ofi-srcset") || e.srcset,
            i.img.src = c.call(e, "data-ofi-src") || e.src,
            u.call(e, "data-ofi-src", e.src),
            e.srcset && u.call(e, "data-ofi-srcset", e.srcset),
            h(e, e.naturalWidth || e.width, e.naturalHeight || e.height),
            e.srcset && (e.srcset = "");
            try {
                !function(i) {
                    var e = {
                        get: function(t) {
                            return i[o].img[t || "src"]
                        },
                        set: function(t, e) {
                            return i[o].img[e || "src"] = t,
                            u.call(i, "data-ofi-" + e, t),
                            p(i),
                            t
                        }
                    };
                    Object.defineProperty(i, "src", e),
                    Object.defineProperty(i, "currentSrc", {
                        get: function() {
                            return e.get("currentSrc")
                        }
                    }),
                    Object.defineProperty(i, "srcset", {
                        get: function() {
                            return e.get("srcset")
                        },
                        set: function(t) {
                            return e.set(t, "srcset")
                        }
                    })
                }(e)
            } catch (t) {
                window.console && console.warn("https://bit.ly/ofi-old-browser")
            }
        }
        !function(t) {
            if (t.srcset && !l && window.picturefill) {
                var e = window.picturefill._;
                t[e.ns] && t[e.ns].evaled || e.fillImg(t, {
                    reselect: !0
                }),
                t[e.ns].curSrc || (t[e.ns].supported = !1,
                e.fillImg(t, {
                    reselect: !0
                })),
                t.currentSrc = t[e.ns].curSrc || t.src
            }
        }(i.img),
        e.style.backgroundImage = 'url("' + (i.img.currentSrc || i.img.src).replace(/"/g, '\\"') + '")',
        e.style.backgroundPosition = t["object-position"] || "center",
        e.style.backgroundRepeat = "no-repeat",
        e.style.backgroundOrigin = "content-box",
        /scale-down/.test(t["object-fit"]) ? f(i.img, function() {
            i.img.naturalWidth > e.width || i.img.naturalHeight > e.height ? e.style.backgroundSize = "contain" : e.style.backgroundSize = "auto"
        }) : e.style.backgroundSize = t["object-fit"].replace("none", "auto").replace("fill", "100% 100%"),
        f(i.img, function(t) {
            h(e, t.naturalWidth, t.naturalHeight)
        })
    }
    function g(t, e) {
        var i = !d && !t;
        if (e = e || {},
        t = t || "img",
        s && !e.skipTest || !a)
            return !1;
        "img" === t ? t = document.getElementsByTagName("img") : "string" == typeof t ? t = document.querySelectorAll(t) : "length"in t || (t = [t]);
        for (var n = 0; n < t.length; n++)
            t[n][o] = t[n][o] || {
                skipTest: e.skipTest
            },
            p(t[n]);
        i && (document.body.addEventListener("load", function(t) {
            "IMG" === t.target.tagName && g(t.target, {
                skipTest: e.skipTest
            })
        }, !0),
        d = !0,
        t = "img"),
        e.watchMQ && window.addEventListener("resize", g.bind(null, t, {
            skipTest: e.skipTest
        }))
    }
    function i(t, e) {
        return t[o] && t[o].img && ("src" === e || "srcset" === e) ? t[o].img : t
    }
    return g.supportsObjectFit = n,
    (g.supportsObjectPosition = s) || (HTMLImageElement.prototype.getAttribute = function(t) {
        return c.call(i(this, t), t)
    }
    ,
    HTMLImageElement.prototype.setAttribute = function(t, e) {
        return u.call(i(this, t), t, String(e))
    }
    ),
    g
}();
RegExp && !RegExp.quote && (RegExp.quote = function(t) {
    return (t + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
}
),
window.observe = function(r) {
    var s = {}
      , a = [].slice;
    return r.on = function(t, i) {
        return "function" == typeof i && t.replace(/[^\s]+/g, function(t, e) {
            (s[t] = s[t] || []).push(i),
            i.typed = 0 < e
        }),
        r
    }
    ,
    r.off = function(t) {
        return t.replace(/[^\s]+/g, function(t) {
            s[t] = []
        }),
        "*" == t && (s = {}),
        r
    }
    ,
    r.one = function(t, e) {
        return e && (e.one = !0),
        r.on(t, e)
    }
    ,
    r.trigger = function(t) {
        for (var e, i = a.call(arguments, 1), n = s[t] || [], o = 0; e = n[o]; ++o)
            e.busy || (e.busy = !0,
            e.apply(r, e.typed ? [t].concat(i) : i),
            e.one && (n.splice(o, 1),
            o--),
            e.busy = !1);
        return r
    }
    ,
    r
}
,
function(t, e) {
    "undefined" != typeof module && module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : this.$script = e()
}(0, function() {
    var c, o, r = document, s = r.getElementsByTagName("head")[0], a = !1, u = "push", l = "readyState", d = "onreadystatechange", h = {}, f = {}, p = {}, g = {};
    function m(t, e) {
        for (var i = 0, n = t.length; i < n; ++i)
            if (!e(t[i]))
                return a;
        return 1
    }
    function v(t, e) {
        m(t, function(t) {
            return !e(t)
        })
    }
    function y(t, e, i) {
        t = t[u] ? t : [t];
        var n = e && e.call
          , o = n ? e : i
          , r = n ? t.join("") : e
          , s = t.length;
        function a(t) {
            return t.call ? t() : h[t]
        }
        function l() {
            if (!--s)
                for (var t in h[r] = 1,
                o && o(),
                p)
                    m(t.split("|"), a) && !v(p[t], a) && (p[t] = [])
        }
        return setTimeout(function() {
            v(t, function t(e, i) {
                return null === e ? l() : (e = i || -1 !== e.indexOf(".js") || /^https?:\/\//.test(e) || !c ? e : c + e + ".js",
                g[e] ? (r && (f[r] = 1),
                2 == g[e] ? l() : setTimeout(function() {
                    t(e, !0)
                }, 0)) : (g[e] = 1,
                r && (f[r] = 1),
                void b(e, l)))
            })
        }, 0),
        y
    }
    function b(t, e) {
        var i, n = r.createElement("script");
        n.onload = n.onerror = n[d] = function() {
            n[l] && !/^c|loade/.test(n[l]) || i || (n.onload = n[d] = null,
            i = 1,
            g[t] = 2,
            e())
        }
        ,
        n.async = 1,
        n.src = o ? t + (-1 === t.indexOf("?") ? "?" : "&") + o : t,
        s.insertBefore(n, s.lastChild)
    }
    return y.get = b,
    y.order = function(i, n, o) {
        !function t(e) {
            e = i.shift(),
            i.length ? y(e, t) : y(e, n, o)
        }()
    }
    ,
    y.path = function(t) {
        c = t
    }
    ,
    y.urlArgs = function(t) {
        o = t
    }
    ,
    y.ready = function(t, e, i) {
        t = t[u] ? t : [t];
        var n, o = [];
        return !v(t, function(t) {
            h[t] || o[u](t)
        }) && m(t, function(t) {
            return h[t]
        }) ? e() : (n = t.join("|"),
        p[n] = p[n] || [],
        p[n][u](e),
        i && i(o)),
        y
    }
    ,
    y.done = function(t) {
        y([null], t)
    }
    ,
    y
}),
function(t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).basicScroll = t()
}(function() {
    return function r(s, a, l) {
        function c(e, t) {
            if (!a[e]) {
                if (!s[e]) {
                    var i = "function" == typeof require && require;
                    if (!t && i)
                        return i(e, !0);
                    if (u)
                        return u(e, !0);
                    var n = new Error("Cannot find module '" + e + "'");
                    throw n.code = "MODULE_NOT_FOUND",
                    n
                }
                var o = a[e] = {
                    exports: {}
                };
                s[e][0].call(o.exports, function(t) {
                    return c(s[e][1][t] || t)
                }, o, o.exports, r, s, a, l)
            }
            return a[e].exports
        }
        for (var u = "function" == typeof require && require, t = 0; t < l.length; t++)
            c(l[t]);
        return c
    }({
        1: [function(t, e, i) {
            e.exports = function(t) {
                var e = 2.5949095;
                return (t *= 2) < 1 ? t * t * ((1 + e) * t - e) * .5 : .5 * ((t -= 2) * t * ((1 + e) * t + e) + 2)
            }
        }
        , {}],
        2: [function(t, e, i) {
            e.exports = function(t) {
                return t * t * (2.70158 * t - 1.70158)
            }
        }
        , {}],
        3: [function(t, e, i) {
            e.exports = function(t) {
                return --t * t * (2.70158 * t + 1.70158) + 1
            }
        }
        , {}],
        4: [function(t, e, i) {
            var n = t("./bounce-out");
            e.exports = function(t) {
                return t < .5 ? .5 * (1 - n(1 - 2 * t)) : .5 * n(2 * t - 1) + .5
            }
        }
        , {
            "./bounce-out": 6
        }],
        5: [function(t, e, i) {
            var n = t("./bounce-out");
            e.exports = function(t) {
                return 1 - n(1 - t)
            }
        }
        , {
            "./bounce-out": 6
        }],
        6: [function(t, e, i) {
            e.exports = function(t) {
                var e = t * t;
                return t < 4 / 11 ? 7.5625 * e : t < 8 / 11 ? 9.075 * e - 9.9 * t + 3.4 : t < .9 ? 4356 / 361 * e - 35442 / 1805 * t + 16061 / 1805 : 10.8 * t * t - 20.52 * t + 10.72
            }
        }
        , {}],
        7: [function(t, e, i) {
            e.exports = function(t) {
                return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
            }
        }
        , {}],
        8: [function(t, e, i) {
            e.exports = function(t) {
                return 1 - Math.sqrt(1 - t * t)
            }
        }
        , {}],
        9: [function(t, e, i) {
            e.exports = function(t) {
                return Math.sqrt(1 - --t * t)
            }
        }
        , {}],
        10: [function(t, e, i) {
            e.exports = function(t) {
                return t < .5 ? 4 * t * t * t : .5 * Math.pow(2 * t - 2, 3) + 1
            }
        }
        , {}],
        11: [function(t, e, i) {
            e.exports = function(t) {
                return t * t * t
            }
        }
        , {}],
        12: [function(t, e, i) {
            e.exports = function(t) {
                var e = t - 1;
                return e * e * e + 1
            }
        }
        , {}],
        13: [function(t, e, i) {
            e.exports = function(t) {
                return t < .5 ? .5 * Math.sin(13 * Math.PI / 2 * 2 * t) * Math.pow(2, 10 * (2 * t - 1)) : .5 * Math.sin(-13 * Math.PI / 2 * (2 * t - 1 + 1)) * Math.pow(2, -10 * (2 * t - 1)) + 1
            }
        }
        , {}],
        14: [function(t, e, i) {
            e.exports = function(t) {
                return Math.sin(13 * t * Math.PI / 2) * Math.pow(2, 10 * (t - 1))
            }
        }
        , {}],
        15: [function(t, e, i) {
            e.exports = function(t) {
                return Math.sin(-13 * (t + 1) * Math.PI / 2) * Math.pow(2, -10 * t) + 1
            }
        }
        , {}],
        16: [function(t, e, i) {
            e.exports = function(t) {
                return 0 === t || 1 === t ? t : t < .5 ? .5 * Math.pow(2, 20 * t - 10) : -.5 * Math.pow(2, 10 - 20 * t) + 1
            }
        }
        , {}],
        17: [function(t, e, i) {
            e.exports = function(t) {
                return 0 === t ? t : Math.pow(2, 10 * (t - 1))
            }
        }
        , {}],
        18: [function(t, e, i) {
            e.exports = function(t) {
                return 1 === t ? t : 1 - Math.pow(2, -10 * t)
            }
        }
        , {}],
        19: [function(t, e, i) {
            e.exports = {
                backInOut: t("./back-in-out"),
                backIn: t("./back-in"),
                backOut: t("./back-out"),
                bounceInOut: t("./bounce-in-out"),
                bounceIn: t("./bounce-in"),
                bounceOut: t("./bounce-out"),
                circInOut: t("./circ-in-out"),
                circIn: t("./circ-in"),
                circOut: t("./circ-out"),
                cubicInOut: t("./cubic-in-out"),
                cubicIn: t("./cubic-in"),
                cubicOut: t("./cubic-out"),
                elasticInOut: t("./elastic-in-out"),
                elasticIn: t("./elastic-in"),
                elasticOut: t("./elastic-out"),
                expoInOut: t("./expo-in-out"),
                expoIn: t("./expo-in"),
                expoOut: t("./expo-out"),
                linear: t("./linear"),
                quadInOut: t("./quad-in-out"),
                quadIn: t("./quad-in"),
                quadOut: t("./quad-out"),
                quartInOut: t("./quart-in-out"),
                quartIn: t("./quart-in"),
                quartOut: t("./quart-out"),
                quintInOut: t("./quint-in-out"),
                quintIn: t("./quint-in"),
                quintOut: t("./quint-out"),
                sineInOut: t("./sine-in-out"),
                sineIn: t("./sine-in"),
                sineOut: t("./sine-out")
            }
        }
        , {
            "./back-in": 2,
            "./back-in-out": 1,
            "./back-out": 3,
            "./bounce-in": 5,
            "./bounce-in-out": 4,
            "./bounce-out": 6,
            "./circ-in": 8,
            "./circ-in-out": 7,
            "./circ-out": 9,
            "./cubic-in": 11,
            "./cubic-in-out": 10,
            "./cubic-out": 12,
            "./elastic-in": 14,
            "./elastic-in-out": 13,
            "./elastic-out": 15,
            "./expo-in": 17,
            "./expo-in-out": 16,
            "./expo-out": 18,
            "./linear": 20,
            "./quad-in": 22,
            "./quad-in-out": 21,
            "./quad-out": 23,
            "./quart-in": 25,
            "./quart-in-out": 24,
            "./quart-out": 26,
            "./quint-in": 28,
            "./quint-in-out": 27,
            "./quint-out": 29,
            "./sine-in": 31,
            "./sine-in-out": 30,
            "./sine-out": 32
        }],
        20: [function(t, e, i) {
            e.exports = function(t) {
                return t
            }
        }
        , {}],
        21: [function(t, e, i) {
            e.exports = function(t) {
                return (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
            }
        }
        , {}],
        22: [function(t, e, i) {
            e.exports = function(t) {
                return t * t
            }
        }
        , {}],
        23: [function(t, e, i) {
            e.exports = function(t) {
                return -t * (t - 2)
            }
        }
        , {}],
        24: [function(t, e, i) {
            e.exports = function(t) {
                return t < .5 ? 8 * Math.pow(t, 4) : -8 * Math.pow(t - 1, 4) + 1
            }
        }
        , {}],
        25: [function(t, e, i) {
            e.exports = function(t) {
                return Math.pow(t, 4)
            }
        }
        , {}],
        26: [function(t, e, i) {
            e.exports = function(t) {
                return Math.pow(t - 1, 3) * (1 - t) + 1
            }
        }
        , {}],
        27: [function(t, e, i) {
            e.exports = function(t) {
                return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
            }
        }
        , {}],
        28: [function(t, e, i) {
            e.exports = function(t) {
                return t * t * t * t * t
            }
        }
        , {}],
        29: [function(t, e, i) {
            e.exports = function(t) {
                return --t * t * t * t * t + 1
            }
        }
        , {}],
        30: [function(t, e, i) {
            e.exports = function(t) {
                return -.5 * (Math.cos(Math.PI * t) - 1)
            }
        }
        , {}],
        31: [function(t, e, i) {
            e.exports = function(t) {
                var e = Math.cos(t * Math.PI * .5);
                return Math.abs(e) < 1e-14 ? 1 : 1 - e
            }
        }
        , {}],
        32: [function(t, e, i) {
            e.exports = function(t) {
                return Math.sin(t * Math.PI / 2)
            }
        }
        , {}],
        33: [function(t, e, i) {
            e.exports = function(t, e) {
                e = e || [0, ""],
                t = String(t);
                var i = parseFloat(t, 10);
                return e[0] = i,
                e[1] = t.match(/[\d.\-\+]*\s*(.*)/)[1] || "",
                e
            }
        }
        , {}],
        34: [function(t, e, i) {
            "use strict";
            Object.defineProperty(i, "__esModule", {
                value: !0
            }),
            i.create = void 0;
            var n = o(t("parse-unit"))
              , r = o(t("eases"));
            function o(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            function s(t) {
                return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t
                }
                : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                }
                )(t)
            }
            function u() {
                return (document.scrollingElement || document.documentElement).scrollTop
            }
            function a(t) {
                return !1 === isNaN((0,
                n.default)(t)[0])
            }
            function l(t) {
                var e = (0,
                n.default)(t);
                return {
                    value: e[0],
                    unit: e[1]
                }
            }
            function c(t) {
                return null !== String(t).match(/^[a-z]+-[a-z]+$/)
            }
            function d(t, e) {
                var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : u()
                  , n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : window.innerHeight || window.outerHeight
                  , o = e.getBoundingClientRect()
                  , r = t.match(/^[a-z]+/)[0]
                  , s = t.match(/[a-z]+$/)[0]
                  , a = 0;
                return "top" === s && (a -= 0),
                "middle" === s && (a -= n / 2),
                "bottom" === s && (a -= n),
                "top" === r && (a += o.top + i),
                "middle" === r && (a += o.top + i + o.height / 2),
                "bottom" === r && (a += o.top + i + o.height),
                "".concat(a, "px")
            }
            function h(t) {
                var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : u()
                  , l = t.getData()
                  , i = l.to.value - l.from.value
                  , n = (e - l.from.value) / (i / 100)
                  , c = Math.min(Math.max(n, 0), 100)
                  , o = function(t, e) {
                    return !0 === t ? e.elem : t instanceof HTMLElement == 1 ? e.direct : e.global
                }(l.direct, {
                    global: document.documentElement,
                    elem: l.elem,
                    direct: l.direct
                })
                  , r = Object.keys(l.props).reduce(function(t, e) {
                    var i = l.props[e]
                      , n = i.from.unit || i.to.unit
                      , o = i.from.value - i.to.value
                      , r = i.timing(c / 100)
                      , s = i.from.value - o * r
                      , a = Math.round(1e4 * s) / 1e4;
                    return t[e] = a + n,
                    t
                }, {})
                  , s = n < 0 || 100 < n;
                return !0 == (0 <= n && n <= 100) && l.inside(t, n, r),
                !0 == s && l.outside(t, n, r),
                {
                    elem: o,
                    props: r
                }
            }
            function f(n, o) {
                Object.keys(o).forEach(function(t) {
                    return e = n,
                    i = {
                        key: t,
                        value: o[t]
                    },
                    void e.style.setProperty(i.key, i.value);
                    var e, i
                })
            }
            var p, g, m = [], v = "undefined" != typeof window;
            i.create = function(t) {
                var e = null
                  , i = !1
                  , n = {
                    isActive: function() {
                        return i
                    },
                    getData: function() {
                        return e
                    },
                    calculate: function() {
                        e = function(t) {
                            var n = 0 < arguments.length && void 0 !== t ? t : {};
                            if (null == (n = Object.assign({}, n)).inside && (n.inside = function() {}
                            ),
                            null == n.outside && (n.outside = function() {}
                            ),
                            null == n.direct && (n.direct = !1),
                            null == n.track && (n.track = !0),
                            null == n.props && (n.props = {}),
                            null == n.from)
                                throw new Error("Missing property `from`");
                            if (null == n.to)
                                throw new Error("Missing property `to`");
                            if ("function" != typeof n.inside)
                                throw new Error("Property `inside` must be undefined or a function");
                            if ("function" != typeof n.outside)
                                throw new Error("Property `outside` must be undefined or a function");
                            if ("boolean" != typeof n.direct && n.direct instanceof HTMLElement == 0)
                                throw new Error("Property `direct` must be undefined, a boolean or a DOM element/node");
                            if (!0 === n.direct && null == n.elem)
                                throw new Error("Property `elem` is required when `direct` is true");
                            if ("boolean" != typeof n.track)
                                throw new Error("Property `track` must be undefined or a boolean");
                            if ("object" !== s(n.props))
                                throw new Error("Property `props` must be undefined or an object");
                            if (null == n.elem) {
                                if (!1 === a(n.from))
                                    throw new Error("Property `from` must be a absolute value when no `elem` has been provided");
                                if (!1 === a(n.to))
                                    throw new Error("Property `to` must be a absolute value when no `elem` has been provided")
                            } else
                                !0 === c(n.from) && (n.from = d(n.from, n.elem)),
                                !0 === c(n.to) && (n.to = d(n.to, n.elem));
                            return n.from = l(n.from),
                            n.to = l(n.to),
                            n.props = Object.keys(n.props).reduce(function(t, e) {
                                var i = Object.assign({}, n.props[e]);
                                if (!1 === a(i.from))
                                    throw new Error("Property `from` of prop must be a absolute value");
                                if (!1 === a(i.to))
                                    throw new Error("Property `from` of prop must be a absolute value");
                                if (i.from = l(i.from),
                                i.to = l(i.to),
                                null == i.timing && (i.timing = r.default.linear),
                                "string" != typeof i.timing && "function" != typeof i.timing)
                                    throw new Error("Property `timing` of prop must be undefined, a string or a function");
                                if ("string" == typeof i.timing && null == r.default[i.timing])
                                    throw new Error("Unknown timing for property `timing` of prop");
                                return "string" == typeof i.timing && (i.timing = r.default[i.timing]),
                                t[e] = i,
                                t
                            }, {}),
                            n
                        }(t)
                    },
                    update: function() {
                        var t = h(n)
                          , e = t.elem
                          , i = t.props;
                        return f(e, i),
                        i
                    },
                    start: function() {
                        i = !0
                    },
                    stop: function() {
                        i = !1
                    },
                    destroy: function() {
                        m[o] = void 0
                    }
                }
                  , o = m.push(n) - 1;
                return n.calculate(),
                n
            }
            ,
            !0 == v ? (function t(e, i) {
                function n() {
                    requestAnimationFrame(function() {
                        return t(e, i)
                    })
                }
                var o = m.filter(function(t) {
                    return null != t && t.isActive()
                });
                if (0 === o.length)
                    return n();
                var r = u();
                if (i === r)
                    return n();
                i = r,
                o.map(function(t) {
                    return h(t, r)
                }).forEach(function(t) {
                    var e = t.elem
                      , i = t.props;
                    return f(e, i)
                }),
                n()
            }(),
            window.addEventListener("resize", (p = function() {
                m.filter(function(t) {
                    return null != t && t.getData().track
                }).forEach(function(t) {
                    t.calculate(),
                    t.update()
                })
            }
            ,
            50,
            g = null,
            function() {
                for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
                    e[i] = arguments[i];
                clearTimeout(g),
                g = setTimeout(function() {
                    return p.apply(void 0, e)
                }, 50)
            }
            ))) : console.warn("basicScroll is not executing because you are using it in an environment without a `window` object")
        }
        , {
            eases: 19,
            "parse-unit": 33
        }]
    }, {}, [34])(34)
}),
function(t) {
    var e;
    if ("function" == typeof define && define.amd && (define(t),
    e = !0),
    "object" == typeof exports && (module.exports = t(),
    e = !0),
    !e) {
        var i = window.Cookies
          , n = window.Cookies = t();
        n.noConflict = function() {
            return window.Cookies = i,
            n
        }
    }
}(function() {
    function a() {
        for (var t = 0, e = {}; t < arguments.length; t++) {
            var i = arguments[t];
            for (var n in i)
                e[n] = i[n]
        }
        return e
    }
    function c(t) {
        return t.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
    }
    return function t(l) {
        function s() {}
        function i(t, e, i) {
            if ("undefined" != typeof document) {
                "number" == typeof (i = a({
                    path: "/"
                }, s.defaults, i)).expires && (i.expires = new Date(1 * new Date + 864e5 * i.expires)),
                i.expires = i.expires ? i.expires.toUTCString() : "";
                try {
                    var n = JSON.stringify(e);
                    /^[\{\[]/.test(n) && (e = n)
                } catch (t) {}
                e = l.write ? l.write(e, t) : encodeURIComponent(String(e)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                t = encodeURIComponent(String(t)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                var o = "";
                for (var r in i)
                    i[r] && (o += "; " + r,
                    !0 !== i[r] && (o += "=" + i[r].split(";")[0]));
                return document.cookie = t + "=" + e + o
            }
        }
        function e(t, e) {
            if ("undefined" != typeof document) {
                for (var i = {}, n = document.cookie ? document.cookie.split("; ") : [], o = 0; o < n.length; o++) {
                    var r = n[o].split("=")
                      , s = r.slice(1).join("=");
                    e || '"' !== s.charAt(0) || (s = s.slice(1, -1));
                    try {
                        var a = c(r[0]);
                        if (s = (l.read || l)(s, a) || c(s),
                        e)
                            try {
                                s = JSON.parse(s)
                            } catch (t) {}
                        if (i[a] = s,
                        t === a)
                            break
                    } catch (t) {}
                }
                return t ? i[t] : i
            }
        }
        return s.set = i,
        s.get = function(t) {
            return e(t, !1)
        }
        ,
        s.getJSON = function(t) {
            return e(t, !0)
        }
        ,
        s.remove = function(t, e) {
            i(t, "", a(e, {
                expires: -1
            }))
        }
        ,
        s.defaults = {},
        s.withConverter = t,
        s
    }(function() {})
}),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.dayjs = e()
}(this, function() {
    "use strict";
    function r(t, e, i) {
        var n = String(t);
        return !n || n.length >= e ? t : "" + Array(e + 1 - n.length).join(i) + t
    }
    var l = "millisecond"
      , f = "second"
      , p = "minute"
      , g = "hour"
      , m = "day"
      , v = "week"
      , y = "month"
      , c = "quarter"
      , b = "year"
      , o = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/
      , w = /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g
      , t = {
        s: r,
        z: function(t) {
            var e = -t.utcOffset()
              , i = Math.abs(e)
              , n = Math.floor(i / 60)
              , o = i % 60;
            return (e <= 0 ? "+" : "-") + r(n, 2, "0") + ":" + r(o, 2, "0")
        },
        m: function(t, e) {
            var i = 12 * (e.year() - t.year()) + (e.month() - t.month())
              , n = t.clone().add(i, y)
              , o = e - n < 0
              , r = t.clone().add(i + (o ? -1 : 1), y);
            return Number(-(i + (e - n) / (o ? n - r : r - n)) || 0)
        },
        a: function(t) {
            return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
        },
        p: function(t) {
            return {
                M: y,
                y: b,
                w: v,
                d: m,
                D: "date",
                h: g,
                m: p,
                s: f,
                ms: l,
                Q: c
            }[t] || String(t || "").toLowerCase().replace(/s$/, "")
        },
        u: function(t) {
            return void 0 === t
        }
    }
      , e = {
        name: "en",
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
    }
      , s = "en"
      , a = {};
    a[s] = e;
    function n(t) {
        return t instanceof h
    }
    function u(t, e, i) {
        var n;
        if (!t)
            return s;
        if ("string" == typeof t)
            a[t] && (n = t),
            e && (a[t] = e,
            n = t);
        else {
            var o = t.name;
            a[o] = t,
            n = o
        }
        return !i && n && (s = n),
        n || !i && s
    }
    function d(t, e) {
        if (n(t))
            return t.clone();
        var i = "object" == typeof e ? e : {};
        return i.date = t,
        i.args = arguments,
        new h(i)
    }
    var x = t;
    x.l = u,
    x.i = n,
    x.w = function(t, e) {
        return d(t, {
            locale: e.$L,
            utc: e.$u,
            $offset: e.$offset
        })
    }
    ;
    var i, h = ((i = k.prototype).parse = function(t) {
        this.$d = function(t) {
            var e = t.date
              , i = t.utc;
            if (null === e)
                return new Date(NaN);
            if (x.u(e))
                return new Date;
            if (e instanceof Date)
                return new Date(e);
            if ("string" == typeof e && !/Z$/i.test(e)) {
                var n = e.match(o);
                if (n)
                    return i ? new Date(Date.UTC(n[1], n[2] - 1, n[3] || 1, n[4] || 0, n[5] || 0, n[6] || 0, n[7] || 0)) : new Date(n[1],n[2] - 1,n[3] || 1,n[4] || 0,n[5] || 0,n[6] || 0,n[7] || 0)
            }
            return new Date(e)
        }(t),
        this.init()
    }
    ,
    i.init = function() {
        var t = this.$d;
        this.$y = t.getFullYear(),
        this.$M = t.getMonth(),
        this.$D = t.getDate(),
        this.$W = t.getDay(),
        this.$H = t.getHours(),
        this.$m = t.getMinutes(),
        this.$s = t.getSeconds(),
        this.$ms = t.getMilliseconds()
    }
    ,
    i.$utils = function() {
        return x
    }
    ,
    i.isValid = function() {
        return !("Invalid Date" === this.$d.toString())
    }
    ,
    i.isSame = function(t, e) {
        var i = d(t);
        return this.startOf(e) <= i && i <= this.endOf(e)
    }
    ,
    i.isAfter = function(t, e) {
        return d(t) < this.startOf(e)
    }
    ,
    i.isBefore = function(t, e) {
        return this.endOf(e) < d(t)
    }
    ,
    i.$g = function(t, e, i) {
        return x.u(t) ? this[e] : this.set(i, t)
    }
    ,
    i.year = function(t) {
        return this.$g(t, "$y", b)
    }
    ,
    i.month = function(t) {
        return this.$g(t, "$M", y)
    }
    ,
    i.day = function(t) {
        return this.$g(t, "$W", m)
    }
    ,
    i.date = function(t) {
        return this.$g(t, "$D", "date")
    }
    ,
    i.hour = function(t) {
        return this.$g(t, "$H", g)
    }
    ,
    i.minute = function(t) {
        return this.$g(t, "$m", p)
    }
    ,
    i.second = function(t) {
        return this.$g(t, "$s", f)
    }
    ,
    i.millisecond = function(t) {
        return this.$g(t, "$ms", l)
    }
    ,
    i.unix = function() {
        return Math.floor(this.valueOf() / 1e3)
    }
    ,
    i.valueOf = function() {
        return this.$d.getTime()
    }
    ,
    i.startOf = function(t, e) {
        function i(t, e) {
            var i = x.w(o.$u ? Date.UTC(o.$y, e, t) : new Date(o.$y,e,t), o);
            return r ? i : i.endOf(m)
        }
        function n(t, e) {
            return x.w(o.toDate()[t].apply(o.toDate("s"), (r ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), o)
        }
        var o = this
          , r = !!x.u(e) || e
          , s = x.p(t)
          , a = this.$W
          , l = this.$M
          , c = this.$D
          , u = "set" + (this.$u ? "UTC" : "");
        switch (s) {
        case b:
            return r ? i(1, 0) : i(31, 11);
        case y:
            return r ? i(1, l) : i(0, l + 1);
        case v:
            var d = this.$locale().weekStart || 0
              , h = (a < d ? a + 7 : a) - d;
            return i(r ? c - h : c + (6 - h), l);
        case m:
        case "date":
            return n(u + "Hours", 0);
        case g:
            return n(u + "Minutes", 1);
        case p:
            return n(u + "Seconds", 2);
        case f:
            return n(u + "Milliseconds", 3);
        default:
            return this.clone()
        }
    }
    ,
    i.endOf = function(t) {
        return this.startOf(t, !1)
    }
    ,
    i.$set = function(t, e) {
        var i, n = x.p(t), o = "set" + (this.$u ? "UTC" : ""), r = ((i = {}).day = o + "Date",
        i.date = o + "Date",
        i[y] = o + "Month",
        i[b] = o + "FullYear",
        i[g] = o + "Hours",
        i[p] = o + "Minutes",
        i[f] = o + "Seconds",
        i[l] = o + "Milliseconds",
        i)[n], s = n === m ? this.$D + (e - this.$W) : e;
        if (n === y || n === b) {
            var a = this.clone().set("date", 1);
            a.$d[r](s),
            a.init(),
            this.$d = a.set("date", Math.min(this.$D, a.daysInMonth())).toDate()
        } else
            r && this.$d[r](s);
        return this.init(),
        this
    }
    ,
    i.set = function(t, e) {
        return this.clone().$set(t, e)
    }
    ,
    i.get = function(t) {
        return this[x.p(t)]()
    }
    ,
    i.add = function(i, t) {
        var e, n = this;
        function o(t) {
            var e = d(n);
            return x.w(e.date(e.date() + Math.round(t * i)), n)
        }
        i = Number(i);
        var r = x.p(t);
        if (r === y)
            return this.set(y, this.$M + i);
        if (r === b)
            return this.set(b, this.$y + i);
        if (r === m)
            return o(1);
        if (r === v)
            return o(7);
        var s = ((e = {})[p] = 6e4,
        e[g] = 36e5,
        e[f] = 1e3,
        e)[r] || 1
          , a = this.$d.getTime() + i * s;
        return x.w(a, this)
    }
    ,
    i.subtract = function(t, e) {
        return this.add(-1 * t, e)
    }
    ,
    i.format = function(t) {
        var o = this;
        if (!this.isValid())
            return "Invalid Date";
        function e(t, e, i, n) {
            return t && (t[e] || t(o, r)) || i[e].substr(0, n)
        }
        function i(t) {
            return x.s(a % 12 || 12, t, "0")
        }
        var r = t || "YYYY-MM-DDTHH:mm:ssZ"
          , n = x.z(this)
          , s = this.$locale()
          , a = this.$H
          , l = this.$m
          , c = this.$M
          , u = s.weekdays
          , d = s.months
          , h = s.meridiem || function(t, e, i) {
            var n = t < 12 ? "AM" : "PM";
            return i ? n.toLowerCase() : n
        }
          , f = {
            YY: String(this.$y).slice(-2),
            YYYY: this.$y,
            M: c + 1,
            MM: x.s(c + 1, 2, "0"),
            MMM: e(s.monthsShort, c, d, 3),
            MMMM: e(d, c),
            D: this.$D,
            DD: x.s(this.$D, 2, "0"),
            d: String(this.$W),
            dd: e(s.weekdaysMin, this.$W, u, 2),
            ddd: e(s.weekdaysShort, this.$W, u, 3),
            dddd: u[this.$W],
            H: String(a),
            HH: x.s(a, 2, "0"),
            h: i(1),
            hh: i(2),
            a: h(a, l, !0),
            A: h(a, l, !1),
            m: String(l),
            mm: x.s(l, 2, "0"),
            s: String(this.$s),
            ss: x.s(this.$s, 2, "0"),
            SSS: x.s(this.$ms, 3, "0"),
            Z: n
        };
        return r.replace(w, function(t, e) {
            return e || f[t] || n.replace(":", "")
        })
    }
    ,
    i.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
    }
    ,
    i.diff = function(t, e, i) {
        var n, o = x.p(e), r = d(t), s = 6e4 * (r.utcOffset() - this.utcOffset()), a = this - r, l = x.m(this, r);
        return l = ((n = {})[b] = l / 12,
        n[y] = l,
        n[c] = l / 3,
        n[v] = (a - s) / 6048e5,
        n.day = (a - s) / 864e5,
        n[g] = a / 36e5,
        n[p] = a / 6e4,
        n[f] = a / 1e3,
        n)[o] || a,
        i ? l : x.a(l)
    }
    ,
    i.daysInMonth = function() {
        return this.endOf(y).$D
    }
    ,
    i.$locale = function() {
        return a[this.$L]
    }
    ,
    i.locale = function(t, e) {
        if (!t)
            return this.$L;
        var i = this.clone()
          , n = u(t, e, !0);
        return n && (i.$L = n),
        i
    }
    ,
    i.clone = function() {
        return x.w(this.$d, this)
    }
    ,
    i.toDate = function() {
        return new Date(this.valueOf())
    }
    ,
    i.toJSON = function() {
        return this.isValid() ? this.toISOString() : null
    }
    ,
    i.toISOString = function() {
        return this.$d.toISOString()
    }
    ,
    i.toString = function() {
        return this.$d.toUTCString()
    }
    ,
    k);
    function k(t) {
        this.$L = this.$L || u(t.locale, null, !0),
        this.parse(t)
    }
    return d.prototype = h.prototype,
    d.extend = function(t, e) {
        return t(e, h, d),
        d
    }
    ,
    d.locale = u,
    d.isDayjs = n,
    d.unix = function(t) {
        return d(1e3 * t)
    }
    ,
    d.en = a[s],
    d.Ls = a,
    d
}),
function(l) {
    function n(o, r) {
        r = l.extend({
            dataType: "json",
            sendingClass: "ajaxform-sending",
            findTarget: null
        }, r);
        var e = !1
          , s = window.app;
        function a(t, e) {
            return l(t, e).filter(":visible")
        }
        o.on("submit.ajaxform", function(t) {
            if (!(0 < l("[name]", o).filter('[type="file"]').length)) {
                if (t.preventDefault(),
                e)
                    return !1;
                e = !0,
                o.addClass(r.sendingClass),
                l.quicktip.detach(l(".has-quicktip", o)),
                l(".warning", o).removeClass("warning"),
                s.displayMsg(),
                l.ajax({
                    method: o.attr("method"),
                    url: o.attr("action"),
                    dataType: r.dataType,
                    data: o.serialize()
                }).done(function(t) {
                    var e = {
                        stop: !1
                    };
                    o.trigger(l.ajaxForm.DONE, [t, e]),
                    e.stop || (t.reroute ? s.reroute(t.reroute) : t.msg ? s.displayMsg(t.msg) : s.displayMsg("The form has been submitted", "ok"))
                }).fail(function(t) {
                    var e = t.responseJSON
                      , i = {
                        stop: !1
                    };
                    o.trigger(l.ajaxForm.FAIL, [e, i]),
                    i.stop || (e ? (e.msg && l.isArray(e.msg) && l.each(e.msg, function(t, e) {
                        var i = l();
                        if (e.path) {
                            var n = function(t) {
                                var i = ""
                                  , e = t.split(":")
                                  , n = e.length - 1;
                                return l.each(e, function(t, e) {
                                    i += i ? "[" + e + "]" : e,
                                    t === n && (i = e.match(/^\d+$/) ? '[name="' + i + '"],[name="' + i.replace(/\[\d+\]$/, "[]") + '"]:eq(' + e + ")" : '[name="' + i + '"],[name="' + i + '[]"]')
                                }),
                                i
                            }(e.path);
                            i = r.findTarget ? r.findTarget.apply(null, [n, o, a]) : a(n, o)
                        }
                        0 === i.length ? s.displayMsg(e) : i.hasClass("warning") || i.quicktip({
                            text: e.text,
                            class: "warning"
                        }).addClass("warning")
                    }),
                    s.displayMsg((e.text.match(/^HTTP/) ? e.status : e.text) || "Unknown error"),
                    l(".warning", o).first().focus()) : s.displayMsg("Unknown error"))
                }).always(function() {
                    o.trigger(l.ajaxForm.ALWAYS),
                    e = !1,
                    o.removeClass(r.sendingClass)
                })
            }
        })
    }
    l.ajaxForm = {
        DONE: "ajaxForm:done",
        FAIL: "ajaxForm:fail",
        ALWAYS: "ajaxForm:always"
    },
    l.fn.ajaxForm = function(i) {
        return this.each(function(t, e) {
            n(l(e), i)
        })
    }
}(jQuery),
jQuery.fn.captureImgLoad = function(t) {
    return this.each(function() {
        this.addEventListener("load", t, !0)
    })
}
,
function(t) {
    t.fn.clicktip = function() {
        return this.each(function() {
            var n = t(this)
              , o = t(n.attr("href"))
              , r = t(window);
            function e() {
                o.removeClass("is-visible")
            }
            n.on("click", function(t) {
                t.preventDefault(),
                o.hasClass("is-visible") ? e() : function() {
                    var t, e, i = r.scrollTop() + r.height() / 2;
                    e = n.offset().top > i ? (t = n.position().top,
                    "top") : (t = n.position().top + n.outerHeight(),
                    "bottom"),
                    o.attr("data-position", e).css("top", t + "px").addClass("is-visible")
                }()
            }),
            o.on("mouseleave", function() {
                e()
            })
        })
    }
}(jQuery),
function(s) {
    var n, i, o = "dialog-root", r = "is-open", t = "is-modal", a = "dialog-backdrop", l = "dialog-close", c = "dialog:init", u = "dialog:open", e = "dialog:close";
    function d(t, e) {
        var i = this;
        i.$el = t,
        i.options = s.extend({}, e),
        (n = n || s('<div class="' + o + '"></div>').appendTo("body")).append(i.$el),
        0 === s("." + l, i.$el).length && i.$el.append('<a href="#" rel="dialog:close" class="' + l + '"></a>'),
        i.$el.trigger(c)
    }
    d.prototype.isOpen = function() {
        return this.$el.hasClass(r)
    }
    ,
    d.prototype.isModal = function() {
        return this.$el.hasClass(t)
    }
    ,
    d.prototype.show = function(t) {
        var e = this;
        e.isOpen() || (e.isModal() && 0 === e.$el.parent("." + a).length && e.$el.wrap('<div class="' + a + '"></div>'),
        e.$el.addClass(r),
        e.$el.trigger(u, [t]))
    }
    ,
    d.prototype.close = function(t) {
        this.isOpen() && (this.$el.removeClass(r),
        this.$el.unwrap("." + a),
        this.$el.trigger(e, [t]))
    }
    ,
    s.dialog = {
        INIT: c,
        OPEN: u,
        CLOSE: e
    },
    s.fn.dialog = function(o, r) {
        return this.each(function(t, e) {
            var i = s(e)
              , n = i.data("dialog");
            ("string" == typeof o || o instanceof String) && o.match(/^show|close$/) ? n ? n[o](r) : i.dialog().dialog(o, r) : n || i.data("dialog", new d(i,o))
        })
    }
    ,
    s(document).on("click.dialog", '[rel~="dialog:show"]', function(t) {
        t.preventDefault();
        var e = s(this)
          , i = e.attr("data-href") || e.attr("href")
          , n = s(i && i.match(/^#/) ? i : "");
        0 < n.length && n.dialog("show", this)
    }).on("click.dialog", '[rel~="dialog:close"]', function(t) {
        if (t.preventDefault(),
        n) {
            var e = s(this).closest(".dialog");
            0 < e.length && e.data("dialog") && e.dialog("close", this)
        }
    }).on("mousedown.dialog", "." + a, function(t) {
        i = s.scrollbar.isMouseEventTarget(t) ? null : t.target
    }).on("mouseup.dialog", "." + a, function(t) {
        if (t.target === this && t.target === i && !s.scrollbar.isMouseEventTarget(t)) {
            t.preventDefault();
            var e = s(this).children(".dialog");
            0 < e.length && e.data("dialog") && e.dialog("close", this)
        }
        i = null
    })
}(jQuery),
function(e, i) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("jquery")) : e.jQueryBridget = i(e, e.jQuery)
}(window, function(t, e) {
    "use strict";
    var i = Array.prototype.slice
      , n = t.console
      , d = void 0 === n ? function() {}
    : function(t) {
        n.error(t)
    }
    ;
    function o(c, o, u) {
        (u = u || e || t.jQuery) && (o.prototype.option || (o.prototype.option = function(t) {
            u.isPlainObject(t) && (this.options = u.extend(!0, this.options, t))
        }
        ),
        u.fn[c] = function(t) {
            return "string" == typeof t ? function(t, r, s) {
                var a, l = "$()." + c + '("' + r + '")';
                return t.each(function(t, e) {
                    var i = u.data(e, c);
                    if (i) {
                        var n = i[r];
                        if (n && "_" != r.charAt(0)) {
                            var o = n.apply(i, s);
                            a = void 0 === a ? o : a
                        } else
                            d(l + " is not a valid method")
                    } else
                        d(c + " not initialized. Cannot call methods, i.e. " + l)
                }),
                void 0 !== a ? a : t
            }(this, t, i.call(arguments, 1)) : (function(t, n) {
                t.each(function(t, e) {
                    var i = u.data(e, c);
                    i ? (i.option(n),
                    i._init()) : (i = new o(e,n),
                    u.data(e, c, i))
                })
            }(this, t),
            this)
        }
        ,
        r(u))
    }
    function r(t) {
        !t || t && t.bridget || (t.bridget = o)
    }
    return r(e || t.jQuery),
    o
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
        return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";
    function v(t) {
        var e = parseFloat(t);
        return -1 == t.indexOf("%") && !isNaN(e) && e
    }
    var i = "undefined" == typeof console ? function() {}
    : function(t) {
        console.error(t)
    }
      , y = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"]
      , b = y.length;
    function w(t) {
        var e = getComputedStyle(t);
        return e || i("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),
        e
    }
    var x, k = !1;
    function C(t) {
        if (function() {
            if (!k) {
                k = !0;
                var t = document.createElement("div");
                t.style.width = "200px",
                t.style.padding = "1px 2px 3px 4px",
                t.style.borderStyle = "solid",
                t.style.borderWidth = "1px 2px 3px 4px",
                t.style.boxSizing = "border-box";
                var e = document.body || document.documentElement;
                e.appendChild(t);
                var i = w(t);
                C.isBoxSizeOuter = x = 200 == v(i.width),
                e.removeChild(t)
            }
        }(),
        "string" == typeof t && (t = document.querySelector(t)),
        t && "object" == typeof t && t.nodeType) {
            var e = w(t);
            if ("none" == e.display)
                return function() {
                    for (var t = {
                        width: 0,
                        height: 0,
                        innerWidth: 0,
                        innerHeight: 0,
                        outerWidth: 0,
                        outerHeight: 0
                    }, e = 0; e < b; e++) {
                        t[y[e]] = 0
                    }
                    return t
                }();
            var i = {};
            i.width = t.offsetWidth,
            i.height = t.offsetHeight;
            for (var n = i.isBorderBox = "border-box" == e.boxSizing, o = 0; o < b; o++) {
                var r = y[o]
                  , s = e[r]
                  , a = parseFloat(s);
                i[r] = isNaN(a) ? 0 : a
            }
            var l = i.paddingLeft + i.paddingRight
              , c = i.paddingTop + i.paddingBottom
              , u = i.marginLeft + i.marginRight
              , d = i.marginTop + i.marginBottom
              , h = i.borderLeftWidth + i.borderRightWidth
              , f = i.borderTopWidth + i.borderBottomWidth
              , p = n && x
              , g = v(e.width);
            !1 !== g && (i.width = g + (p ? 0 : l + h));
            var m = v(e.height);
            return !1 !== m && (i.height = m + (p ? 0 : c + f)),
            i.innerWidth = i.width - (l + h),
            i.innerHeight = i.height - (c + f),
            i.outerWidth = i.width + u,
            i.outerHeight = i.height + d,
            i
        }
    }
    return C
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {}
              , n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e),
            this
        }
    }
    ,
    e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[t] = i[t] || {})[e] = !0,
            this
        }
    }
    ,
    e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1),
            this
        }
    }
    ,
    e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0),
            e = e || [];
            for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
                var r = i[o];
                n && n[r] && (this.off(t, r),
                delete n[r]),
                r.apply(this, e)
            }
            return this
        }
    }
    ,
    e.allOff = function() {
        delete this._events,
        delete this._onceEvents
    }
    ,
    t
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("ev-emitter")) : e.Unipointer = i(e, e.EvEmitter)
}(window, function(o, t) {
    function e() {}
    var i = e.prototype = Object.create(t.prototype);
    i.bindStartEvent = function(t) {
        this._bindStartEvent(t, !0)
    }
    ,
    i.unbindStartEvent = function(t) {
        this._bindStartEvent(t, !1)
    }
    ,
    i._bindStartEvent = function(t, e) {
        var i = (e = void 0 === e || e) ? "addEventListener" : "removeEventListener"
          , n = "mousedown";
        o.PointerEvent ? n = "pointerdown" : "ontouchstart"in o && (n = "touchstart"),
        t[i](n, this)
    }
    ,
    i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    i.getTouch = function(t) {
        for (var e = 0; e < t.length; e++) {
            var i = t[e];
            if (i.identifier == this.pointerIdentifier)
                return i
        }
    }
    ,
    i.onmousedown = function(t) {
        var e = t.button;
        e && 0 !== e && 1 !== e || this._pointerDown(t, t)
    }
    ,
    i.ontouchstart = function(t) {
        this._pointerDown(t, t.changedTouches[0])
    }
    ,
    i.onpointerdown = function(t) {
        this._pointerDown(t, t)
    }
    ,
    i._pointerDown = function(t, e) {
        t.button || this.isPointerDown || (this.isPointerDown = !0,
        this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier,
        this.pointerDown(t, e))
    }
    ,
    i.pointerDown = function(t, e) {
        this._bindPostStartEvents(t),
        this.emitEvent("pointerDown", [t, e])
    }
    ;
    var n = {
        mousedown: ["mousemove", "mouseup"],
        touchstart: ["touchmove", "touchend", "touchcancel"],
        pointerdown: ["pointermove", "pointerup", "pointercancel"]
    };
    return i._bindPostStartEvents = function(t) {
        if (t) {
            var e = n[t.type];
            e.forEach(function(t) {
                o.addEventListener(t, this)
            }, this),
            this._boundPointerEvents = e
        }
    }
    ,
    i._unbindPostStartEvents = function() {
        this._boundPointerEvents && (this._boundPointerEvents.forEach(function(t) {
            o.removeEventListener(t, this)
        }, this),
        delete this._boundPointerEvents)
    }
    ,
    i.onmousemove = function(t) {
        this._pointerMove(t, t)
    }
    ,
    i.onpointermove = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerMove(t, t)
    }
    ,
    i.ontouchmove = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerMove(t, e)
    }
    ,
    i._pointerMove = function(t, e) {
        this.pointerMove(t, e)
    }
    ,
    i.pointerMove = function(t, e) {
        this.emitEvent("pointerMove", [t, e])
    }
    ,
    i.onmouseup = function(t) {
        this._pointerUp(t, t)
    }
    ,
    i.onpointerup = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerUp(t, t)
    }
    ,
    i.ontouchend = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerUp(t, e)
    }
    ,
    i._pointerUp = function(t, e) {
        this._pointerDone(),
        this.pointerUp(t, e)
    }
    ,
    i.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e])
    }
    ,
    i._pointerDone = function() {
        this._pointerReset(),
        this._unbindPostStartEvents(),
        this.pointerDone()
    }
    ,
    i._pointerReset = function() {
        this.isPointerDown = !1,
        delete this.pointerIdentifier
    }
    ,
    i.pointerDone = function() {}
    ,
    i.onpointercancel = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t)
    }
    ,
    i.ontouchcancel = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerCancel(t, e)
    }
    ,
    i._pointerCancel = function(t, e) {
        this._pointerDone(),
        this.pointerCancel(t, e)
    }
    ,
    i.pointerCancel = function(t, e) {
        this.emitEvent("pointerCancel", [t, e])
    }
    ,
    e.getPointerPoint = function(t) {
        return {
            x: t.pageX,
            y: t.pageY
        }
    }
    ,
    e
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("unipointer")) : e.Unidragger = i(e, e.Unipointer)
}(window, function(r, t) {
    function e() {}
    var i = e.prototype = Object.create(t.prototype);
    i.bindHandles = function() {
        this._bindHandles(!0)
    }
    ,
    i.unbindHandles = function() {
        this._bindHandles(!1)
    }
    ,
    i._bindHandles = function(t) {
        for (var e = (t = void 0 === t || t) ? "addEventListener" : "removeEventListener", i = t ? this._touchActionValue : "", n = 0; n < this.handles.length; n++) {
            var o = this.handles[n];
            this._bindStartEvent(o, t),
            o[e]("click", this),
            r.PointerEvent && (o.style.touchAction = i)
        }
    }
    ,
    i._touchActionValue = "none",
    i.pointerDown = function(t, e) {
        this.okayPointerDown(t) && (this.pointerDownPointer = e,
        t.preventDefault(),
        this.pointerDownBlur(),
        this._bindPostStartEvents(t),
        this.emitEvent("pointerDown", [t, e]))
    }
    ;
    var o = {
        TEXTAREA: !0,
        INPUT: !0,
        SELECT: !0,
        OPTION: !0
    }
      , s = {
        radio: !0,
        checkbox: !0,
        button: !0,
        submit: !0,
        image: !0,
        file: !0
    };
    return i.okayPointerDown = function(t) {
        var e = o[t.target.nodeName]
          , i = s[t.target.type]
          , n = !e || i;
        return n || this._pointerReset(),
        n
    }
    ,
    i.pointerDownBlur = function() {
        var t = document.activeElement;
        t && t.blur && t != document.body && t.blur()
    }
    ,
    i.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.emitEvent("pointerMove", [t, e, i]),
        this._dragMove(t, e, i)
    }
    ,
    i._dragPointerMove = function(t, e) {
        var i = {
            x: e.pageX - this.pointerDownPointer.pageX,
            y: e.pageY - this.pointerDownPointer.pageY
        };
        return !this.isDragging && this.hasDragStarted(i) && this._dragStart(t, e),
        i
    }
    ,
    i.hasDragStarted = function(t) {
        return 3 < Math.abs(t.x) || 3 < Math.abs(t.y)
    }
    ,
    i.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e]),
        this._dragPointerUp(t, e)
    }
    ,
    i._dragPointerUp = function(t, e) {
        this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e)
    }
    ,
    i._dragStart = function(t, e) {
        this.isDragging = !0,
        this.isPreventingClicks = !0,
        this.dragStart(t, e)
    }
    ,
    i.dragStart = function(t, e) {
        this.emitEvent("dragStart", [t, e])
    }
    ,
    i._dragMove = function(t, e, i) {
        this.isDragging && this.dragMove(t, e, i)
    }
    ,
    i.dragMove = function(t, e, i) {
        t.preventDefault(),
        this.emitEvent("dragMove", [t, e, i])
    }
    ,
    i._dragEnd = function(t, e) {
        this.isDragging = !1,
        setTimeout(function() {
            delete this.isPreventingClicks
        }
        .bind(this)),
        this.dragEnd(t, e)
    }
    ,
    i.dragEnd = function(t, e) {
        this.emitEvent("dragEnd", [t, e])
    }
    ,
    i.onclick = function(t) {
        this.isPreventingClicks && t.preventDefault()
    }
    ,
    i._staticClick = function(t, e) {
        this.isIgnoringMouseUp && "mouseup" == t.type || (this.staticClick(t, e),
        "mouseup" != t.type && (this.isIgnoringMouseUp = !0,
        setTimeout(function() {
            delete this.isIgnoringMouseUp
        }
        .bind(this), 400)))
    }
    ,
    i.staticClick = function(t, e) {
        this.emitEvent("staticClick", [t, e])
    }
    ,
    e.getPointerPoint = t.getPointerPoint,
    e
}),
function(i, n) {
    "function" == typeof define && define.amd ? define(["get-size/get-size", "unidragger/unidragger"], function(t, e) {
        return n(i, t, e)
    }) : "object" == typeof module && module.exports ? module.exports = n(i, require("get-size"), require("unidragger")) : i.Draggabilly = n(i, i.getSize, i.Unidragger)
}(window, function(r, l, t) {
    function i(t, e) {
        for (var i in e)
            t[i] = e[i];
        return t
    }
    var n = r.jQuery;
    function e(t, e) {
        this.element = "string" == typeof t ? document.querySelector(t) : t,
        n && (this.$element = n(this.element)),
        this.options = i({}, this.constructor.defaults),
        this.option(e),
        this._create()
    }
    var o = e.prototype = Object.create(t.prototype);
    e.defaults = {},
    o.option = function(t) {
        i(this.options, t)
    }
    ;
    var s = {
        relative: !0,
        absolute: !0,
        fixed: !0
    };
    function c(t, e, i) {
        return i = i || "round",
        e ? Math[i](t / e) * e : t
    }
    return o._create = function() {
        this.position = {},
        this._getPosition(),
        this.startPoint = {
            x: 0,
            y: 0
        },
        this.dragPoint = {
            x: 0,
            y: 0
        },
        this.startPosition = i({}, this.position);
        var t = getComputedStyle(this.element);
        s[t.position] || (this.element.style.position = "relative"),
        this.on("pointerDown", this.onPointerDown),
        this.on("pointerMove", this.onPointerMove),
        this.on("pointerUp", this.onPointerUp),
        this.enable(),
        this.setHandles()
    }
    ,
    o.setHandles = function() {
        this.handles = this.options.handle ? this.element.querySelectorAll(this.options.handle) : [this.element],
        this.bindHandles()
    }
    ,
    o.dispatchEvent = function(t, e, i) {
        var n = [e].concat(i);
        this.emitEvent(t, n),
        this.dispatchJQueryEvent(t, e, i)
    }
    ,
    o.dispatchJQueryEvent = function(t, e, i) {
        var n = r.jQuery;
        if (n && this.$element) {
            var o = n.Event(e);
            o.type = t,
            this.$element.trigger(o, i)
        }
    }
    ,
    o._getPosition = function() {
        var t = getComputedStyle(this.element)
          , e = this._getPositionCoord(t.left, "width")
          , i = this._getPositionCoord(t.top, "height");
        this.position.x = isNaN(e) ? 0 : e,
        this.position.y = isNaN(i) ? 0 : i,
        this._addTransformPosition(t)
    }
    ,
    o._getPositionCoord = function(t, e) {
        if (-1 == t.indexOf("%"))
            return parseInt(t, 10);
        var i = l(this.element.parentNode);
        return i ? parseFloat(t) / 100 * i[e] : 0
    }
    ,
    o._addTransformPosition = function(t) {
        var e = t.transform;
        if (0 === e.indexOf("matrix")) {
            var i = e.split(",")
              , n = 0 === e.indexOf("matrix3d") ? 12 : 4
              , o = parseInt(i[n], 10)
              , r = parseInt(i[1 + n], 10);
            this.position.x += o,
            this.position.y += r
        }
    }
    ,
    o.onPointerDown = function(t, e) {
        this.element.classList.add("is-pointer-down"),
        this.dispatchJQueryEvent("pointerDown", t, [e])
    }
    ,
    o.dragStart = function(t, e) {
        this.isEnabled && (this._getPosition(),
        this.measureContainment(),
        this.startPosition.x = this.position.x,
        this.startPosition.y = this.position.y,
        this.setLeftTop(),
        this.dragPoint.x = 0,
        this.dragPoint.y = 0,
        this.element.classList.add("is-dragging"),
        this.dispatchEvent("dragStart", t, [e]),
        this.animate())
    }
    ,
    o.measureContainment = function() {
        var t = this.getContainer();
        if (t) {
            var e = l(this.element)
              , i = l(t)
              , n = this.element.getBoundingClientRect()
              , o = t.getBoundingClientRect()
              , r = i.borderLeftWidth + i.borderRightWidth
              , s = i.borderTopWidth + i.borderBottomWidth
              , a = this.relativeStartPosition = {
                x: n.left - (o.left + i.borderLeftWidth),
                y: n.top - (o.top + i.borderTopWidth)
            };
            this.containSize = {
                width: i.width - r - a.x - e.width,
                height: i.height - s - a.y - e.height
            }
        }
    }
    ,
    o.getContainer = function() {
        var t = this.options.containment;
        if (t)
            return t instanceof HTMLElement ? t : "string" == typeof t ? document.querySelector(t) : this.element.parentNode
    }
    ,
    o.onPointerMove = function(t, e, i) {
        this.dispatchJQueryEvent("pointerMove", t, [e, i])
    }
    ,
    o.dragMove = function(t, e, i) {
        if (this.isEnabled) {
            var n = i.x
              , o = i.y
              , r = this.options.grid
              , s = r && r[0]
              , a = r && r[1];
            n = c(n, s),
            o = c(o, a),
            n = this.containDrag("x", n, s),
            o = this.containDrag("y", o, a),
            n = "y" == this.options.axis ? 0 : n,
            o = "x" == this.options.axis ? 0 : o,
            this.position.x = this.startPosition.x + n,
            this.position.y = this.startPosition.y + o,
            this.dragPoint.x = n,
            this.dragPoint.y = o,
            this.dispatchEvent("dragMove", t, [e, i])
        }
    }
    ,
    o.containDrag = function(t, e, i) {
        if (!this.options.containment)
            return e;
        var n = "x" == t ? "width" : "height"
          , o = c(-this.relativeStartPosition[t], i, "ceil")
          , r = this.containSize[n];
        return r = c(r, i, "floor"),
        Math.max(o, Math.min(r, e))
    }
    ,
    o.onPointerUp = function(t, e) {
        this.element.classList.remove("is-pointer-down"),
        this.dispatchJQueryEvent("pointerUp", t, [e])
    }
    ,
    o.dragEnd = function(t, e) {
        this.isEnabled && (this.element.style.transform = "",
        this.setLeftTop(),
        this.element.classList.remove("is-dragging"),
        this.dispatchEvent("dragEnd", t, [e]))
    }
    ,
    o.animate = function() {
        if (this.isDragging) {
            this.positionDrag();
            var t = this;
            requestAnimationFrame(function() {
                t.animate()
            })
        }
    }
    ,
    o.setLeftTop = function() {
        this.element.style.left = this.position.x + "px",
        this.element.style.top = this.position.y + "px"
    }
    ,
    o.positionDrag = function() {
        this.element.style.transform = "translate3d( " + this.dragPoint.x + "px, " + this.dragPoint.y + "px, 0)"
    }
    ,
    o.staticClick = function(t, e) {
        this.dispatchEvent("staticClick", t, [e])
    }
    ,
    o.setPosition = function(t, e) {
        this.position.x = t,
        this.position.y = e,
        this.setLeftTop()
    }
    ,
    o.enable = function() {
        this.isEnabled = !0
    }
    ,
    o.disable = function() {
        this.isEnabled = !1,
        this.isDragging && this.dragEnd()
    }
    ,
    o.destroy = function() {
        this.disable(),
        this.element.style.transform = "",
        this.element.style.left = "",
        this.element.style.top = "",
        this.element.style.position = "",
        this.unbindHandles(),
        this.$element && this.$element.removeData("draggabilly")
    }
    ,
    o._init = function() {}
    ,
    n && n.bridget && n.bridget("draggabilly", e),
    e
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("jquery")) : e.jQueryBridget = i(e, e.jQuery)
}(window, function(t, e) {
    "use strict";
    var i = Array.prototype.slice
      , n = t.console
      , d = void 0 === n ? function() {}
    : function(t) {
        n.error(t)
    }
    ;
    function o(c, o, u) {
        (u = u || e || t.jQuery) && (o.prototype.option || (o.prototype.option = function(t) {
            u.isPlainObject(t) && (this.options = u.extend(!0, this.options, t))
        }
        ),
        u.fn[c] = function(t) {
            return "string" == typeof t ? function(t, r, s) {
                var a, l = "$()." + c + '("' + r + '")';
                return t.each(function(t, e) {
                    var i = u.data(e, c);
                    if (i) {
                        var n = i[r];
                        if (n && "_" != r.charAt(0)) {
                            var o = n.apply(i, s);
                            a = void 0 === a ? o : a
                        } else
                            d(l + " is not a valid method")
                    } else
                        d(c + " not initialized. Cannot call methods, i.e. " + l)
                }),
                void 0 !== a ? a : t
            }(this, t, i.call(arguments, 1)) : (function(t, n) {
                t.each(function(t, e) {
                    var i = u.data(e, c);
                    i ? (i.option(n),
                    i._init()) : (i = new o(e,n),
                    u.data(e, c, i))
                })
            }(this, t),
            this)
        }
        ,
        r(u))
    }
    function r(t) {
        !t || t && t.bridget || (t.bridget = o)
    }
    return r(e || t.jQuery),
    o
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {}
              , n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e),
            this
        }
    }
    ,
    e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[t] = i[t] || {})[e] = !0,
            this
        }
    }
    ,
    e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1),
            this
        }
    }
    ,
    e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0),
            e = e || [];
            for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
                var r = i[o];
                n && n[r] && (this.off(t, r),
                delete n[r]),
                r.apply(this, e)
            }
            return this
        }
    }
    ,
    e.allOff = function() {
        delete this._events,
        delete this._onceEvents
    }
    ,
    t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";
    function v(t) {
        var e = parseFloat(t);
        return -1 == t.indexOf("%") && !isNaN(e) && e
    }
    var i = "undefined" == typeof console ? function() {}
    : function(t) {
        console.error(t)
    }
      , y = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"]
      , b = y.length;
    function w(t) {
        var e = getComputedStyle(t);
        return e || i("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),
        e
    }
    var x, k = !1;
    function C(t) {
        if (function() {
            if (!k) {
                k = !0;
                var t = document.createElement("div");
                t.style.width = "200px",
                t.style.padding = "1px 2px 3px 4px",
                t.style.borderStyle = "solid",
                t.style.borderWidth = "1px 2px 3px 4px",
                t.style.boxSizing = "border-box";
                var e = document.body || document.documentElement;
                e.appendChild(t);
                var i = w(t);
                x = 200 == Math.round(v(i.width)),
                C.isBoxSizeOuter = x,
                e.removeChild(t)
            }
        }(),
        "string" == typeof t && (t = document.querySelector(t)),
        t && "object" == typeof t && t.nodeType) {
            var e = w(t);
            if ("none" == e.display)
                return function() {
                    for (var t = {
                        width: 0,
                        height: 0,
                        innerWidth: 0,
                        innerHeight: 0,
                        outerWidth: 0,
                        outerHeight: 0
                    }, e = 0; e < b; e++) {
                        t[y[e]] = 0
                    }
                    return t
                }();
            var i = {};
            i.width = t.offsetWidth,
            i.height = t.offsetHeight;
            for (var n = i.isBorderBox = "border-box" == e.boxSizing, o = 0; o < b; o++) {
                var r = y[o]
                  , s = e[r]
                  , a = parseFloat(s);
                i[r] = isNaN(a) ? 0 : a
            }
            var l = i.paddingLeft + i.paddingRight
              , c = i.paddingTop + i.paddingBottom
              , u = i.marginLeft + i.marginRight
              , d = i.marginTop + i.marginBottom
              , h = i.borderLeftWidth + i.borderRightWidth
              , f = i.borderTopWidth + i.borderBottomWidth
              , p = n && x
              , g = v(e.width);
            !1 !== g && (i.width = g + (p ? 0 : l + h));
            var m = v(e.height);
            return !1 !== m && (i.height = m + (p ? 0 : c + f)),
            i.innerWidth = i.width - (l + h),
            i.innerHeight = i.height - (c + f),
            i.outerWidth = i.width + u,
            i.outerHeight = i.height + d,
            i
        }
    }
    return C
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var i = function() {
        var t = window.Element.prototype;
        if (t.matches)
            return "matches";
        if (t.matchesSelector)
            return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i] + "MatchesSelector";
            if (t[n])
                return n
        }
    }();
    return function(t, e) {
        return t[i](e)
    }
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("desandro-matches-selector")) : e.fizzyUIUtils = i(e, e.matchesSelector)
}(window, function(c, r) {
    var u = {
        extend: function(t, e) {
            for (var i in e)
                t[i] = e[i];
            return t
        },
        modulo: function(t, e) {
            return (t % e + e) % e
        }
    }
      , e = Array.prototype.slice;
    u.makeArray = function(t) {
        return Array.isArray(t) ? t : null == t ? [] : "object" == typeof t && "number" == typeof t.length ? e.call(t) : [t]
    }
    ,
    u.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1)
    }
    ,
    u.getParent = function(t, e) {
        for (; t.parentNode && t != document.body; )
            if (t = t.parentNode,
            r(t, e))
                return t
    }
    ,
    u.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }
    ,
    u.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    u.filterFindElements = function(t, n) {
        t = u.makeArray(t);
        var o = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement)
                if (n) {
                    r(t, n) && o.push(t);
                    for (var e = t.querySelectorAll(n), i = 0; i < e.length; i++)
                        o.push(e[i])
                } else
                    o.push(t)
        }),
        o
    }
    ,
    u.debounceMethod = function(t, e, n) {
        n = n || 100;
        var o = t.prototype[e]
          , r = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[r];
            clearTimeout(t);
            var e = arguments
              , i = this;
            this[r] = setTimeout(function() {
                o.apply(i, e),
                delete i[r]
            }, n)
        }
    }
    ,
    u.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }
    ,
    u.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    }
    ;
    var d = c.console;
    return u.htmlInit = function(a, l) {
        u.docReady(function() {
            var t = u.toDashed(l)
              , o = "data-" + t
              , e = document.querySelectorAll("[" + o + "]")
              , i = document.querySelectorAll(".js-" + t)
              , n = u.makeArray(e).concat(u.makeArray(i))
              , r = o + "-options"
              , s = c.jQuery;
            n.forEach(function(e) {
                var t, i = e.getAttribute(o) || e.getAttribute(r);
                try {
                    t = i && JSON.parse(i)
                } catch (t) {
                    return void (d && d.error("Error parsing " + o + " on " + e.className + ": " + t))
                }
                var n = new a(e,t);
                s && s.data(e, l, n)
            })
        })
    }
    ,
    u
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("get-size")) : (e.Flickity = e.Flickity || {},
    e.Flickity.Cell = i(e, e.getSize))
}(window, function(t, e) {
    function i(t, e) {
        this.element = t,
        this.parent = e,
        this.create()
    }
    var n = i.prototype;
    return n.create = function() {
        this.element.style.position = "absolute",
        this.element.setAttribute("aria-hidden", "true"),
        this.x = 0,
        this.shift = 0
    }
    ,
    n.destroy = function() {
        this.unselect(),
        this.element.style.position = "";
        var t = this.parent.originSide;
        this.element.style[t] = ""
    }
    ,
    n.getSize = function() {
        this.size = e(this.element)
    }
    ,
    n.setPosition = function(t) {
        this.x = t,
        this.updateTarget(),
        this.renderPosition(t)
    }
    ,
    n.updateTarget = n.setDefaultTarget = function() {
        var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
        this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign
    }
    ,
    n.renderPosition = function(t) {
        var e = this.parent.originSide;
        this.element.style[e] = this.parent.getPositionValue(t)
    }
    ,
    n.select = function() {
        this.element.classList.add("is-selected"),
        this.element.removeAttribute("aria-hidden")
    }
    ,
    n.unselect = function() {
        this.element.classList.remove("is-selected"),
        this.element.setAttribute("aria-hidden", "true")
    }
    ,
    n.wrapShift = function(t) {
        this.shift = t,
        this.renderPosition(this.x + this.parent.slideableWidth * t)
    }
    ,
    n.remove = function() {
        this.element.parentNode.removeChild(this.element)
    }
    ,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/slide", e) : "object" == typeof module && module.exports ? module.exports = e() : (t.Flickity = t.Flickity || {},
    t.Flickity.Slide = e())
}(window, function() {
    "use strict";
    function t(t) {
        this.parent = t,
        this.isOriginLeft = "left" == t.originSide,
        this.cells = [],
        this.outerWidth = 0,
        this.height = 0
    }
    var e = t.prototype;
    return e.addCell = function(t) {
        if (this.cells.push(t),
        this.outerWidth += t.size.outerWidth,
        this.height = Math.max(t.size.outerHeight, this.height),
        1 == this.cells.length) {
            this.x = t.x;
            var e = this.isOriginLeft ? "marginLeft" : "marginRight";
            this.firstMargin = t.size[e]
        }
    }
    ,
    e.updateTarget = function() {
        var t = this.isOriginLeft ? "marginRight" : "marginLeft"
          , e = this.getLastCell()
          , i = e ? e.size[t] : 0
          , n = this.outerWidth - (this.firstMargin + i);
        this.target = this.x + this.firstMargin + n * this.parent.cellAlign
    }
    ,
    e.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }
    ,
    e.select = function() {
        this.cells.forEach(function(t) {
            t.select()
        })
    }
    ,
    e.unselect = function() {
        this.cells.forEach(function(t) {
            t.unselect()
        })
    }
    ,
    e.getCellElements = function() {
        return this.cells.map(function(t) {
            return t.element
        })
    }
    ,
    t
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("fizzy-ui-utils")) : (e.Flickity = e.Flickity || {},
    e.Flickity.animatePrototype = i(e, e.fizzyUIUtils))
}(window, function(t, e) {
    var i = {
        startAnimation: function() {
            this.isAnimating || (this.isAnimating = !0,
            this.restingFrames = 0,
            this.animate())
        },
        animate: function() {
            this.applyDragForce(),
            this.applySelectedAttraction();
            var t = this.x;
            if (this.integratePhysics(),
            this.positionSlider(),
            this.settle(t),
            this.isAnimating) {
                var e = this;
                requestAnimationFrame(function() {
                    e.animate()
                })
            }
        },
        positionSlider: function() {
            var t = this.x;
            this.options.wrapAround && 1 < this.cells.length && (t = e.modulo(t, this.slideableWidth),
            t -= this.slideableWidth,
            this.shiftWrapCells(t)),
            this.setTranslateX(t, this.isAnimating),
            this.dispatchScrollEvent()
        },
        setTranslateX: function(t, e) {
            t += this.cursorPosition,
            t = this.options.rightToLeft ? -t : t;
            var i = this.getPositionValue(t);
            this.slider.style.transform = e ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")"
        },
        dispatchScrollEvent: function() {
            var t = this.slides[0];
            if (t) {
                var e = -this.x - t.target
                  , i = e / this.slidesWidth;
                this.dispatchEvent("scroll", null, [i, e])
            }
        },
        positionSliderAtSelected: function() {
            this.cells.length && (this.x = -this.selectedSlide.target,
            this.velocity = 0,
            this.positionSlider())
        },
        getPositionValue: function(t) {
            return this.options.percentPosition ? .01 * Math.round(t / this.size.innerWidth * 1e4) + "%" : Math.round(t) + "px"
        },
        settle: function(t) {
            this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * t) || this.restingFrames++,
            2 < this.restingFrames && (this.isAnimating = !1,
            delete this.isFreeScrolling,
            this.positionSlider(),
            this.dispatchEvent("settle", null, [this.selectedIndex]))
        },
        shiftWrapCells: function(t) {
            var e = this.cursorPosition + t;
            this._shiftCells(this.beforeShiftCells, e, -1);
            var i = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);
            this._shiftCells(this.afterShiftCells, i, 1)
        },
        _shiftCells: function(t, e, i) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n]
                  , r = 0 < e ? i : 0;
                o.wrapShift(r),
                e -= o.size.outerWidth
            }
        },
        _unshiftCells: function(t) {
            if (t && t.length)
                for (var e = 0; e < t.length; e++)
                    t[e].wrapShift(0)
        },
        integratePhysics: function() {
            this.x += this.velocity,
            this.velocity *= this.getFrictionFactor()
        },
        applyForce: function(t) {
            this.velocity += t
        },
        getFrictionFactor: function() {
            return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
        },
        getRestingPosition: function() {
            return this.x + this.velocity / (1 - this.getFrictionFactor())
        },
        applyDragForce: function() {
            if (this.isDraggable && this.isPointerDown) {
                var t = this.dragX - this.x - this.velocity;
                this.applyForce(t)
            }
        },
        applySelectedAttraction: function() {
            if (!(this.isDraggable && this.isPointerDown) && !this.isFreeScrolling && this.slides.length) {
                var t = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction;
                this.applyForce(t)
            }
        }
    };
    return i
}),
function(s, a) {
    if ("function" == typeof define && define.amd)
        define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function(t, e, i, n, o, r) {
            return a(s, t, e, i, n, o, r)
        });
    else if ("object" == typeof module && module.exports)
        module.exports = a(s, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
    else {
        var t = s.Flickity;
        s.Flickity = a(s, s.EvEmitter, s.getSize, s.fizzyUIUtils, t.Cell, t.Slide, t.animatePrototype)
    }
}(window, function(n, t, e, a, i, s, o) {
    var l = n.jQuery
      , r = n.getComputedStyle
      , c = n.console;
    function u(t, e) {
        for (t = a.makeArray(t); t.length; )
            e.appendChild(t.shift())
    }
    var d = 0
      , h = {};
    function f(t, e) {
        var i = a.getQueryElement(t);
        if (i) {
            if (this.element = i,
            this.element.flickityGUID) {
                var n = h[this.element.flickityGUID];
                return n.option(e),
                n
            }
            l && (this.$element = l(this.element)),
            this.options = a.extend({}, this.constructor.defaults),
            this.option(e),
            this._create()
        } else
            c && c.error("Bad element for Flickity: " + (i || t))
    }
    f.defaults = {
        accessibility: !0,
        cellAlign: "center",
        freeScrollFriction: .075,
        friction: .28,
        namespaceJQueryEvents: !0,
        percentPosition: !0,
        resize: !0,
        selectedAttraction: .025,
        setGallerySize: !0
    },
    f.createMethods = [];
    var p = f.prototype;
    a.extend(p, t.prototype),
    p._create = function() {
        var t = this.guid = ++d;
        for (var e in this.element.flickityGUID = t,
        (h[t] = this).selectedIndex = 0,
        this.restingFrames = 0,
        this.x = 0,
        this.velocity = 0,
        this.originSide = this.options.rightToLeft ? "right" : "left",
        this.viewport = document.createElement("div"),
        this.viewport.className = "flickity-viewport",
        this._createSlider(),
        (this.options.resize || this.options.watchCSS) && n.addEventListener("resize", this),
        this.options.on) {
            var i = this.options.on[e];
            this.on(e, i)
        }
        f.createMethods.forEach(function(t) {
            this[t]()
        }, this),
        this.options.watchCSS ? this.watchCSS() : this.activate()
    }
    ,
    p.option = function(t) {
        a.extend(this.options, t)
    }
    ,
    p.activate = function() {
        this.isActive || (this.isActive = !0,
        this.element.classList.add("flickity-enabled"),
        this.options.rightToLeft && this.element.classList.add("flickity-rtl"),
        this.getSize(),
        u(this._filterFindCellElements(this.element.children), this.slider),
        this.viewport.appendChild(this.slider),
        this.element.appendChild(this.viewport),
        this.reloadCells(),
        this.options.accessibility && (this.element.tabIndex = 0,
        this.element.addEventListener("keydown", this)),
        this.emitEvent("activate"),
        this.selectInitialIndex(),
        this.isInitActivated = !0,
        this.dispatchEvent("ready"))
    }
    ,
    p._createSlider = function() {
        var t = document.createElement("div");
        t.className = "flickity-slider",
        t.style[this.originSide] = 0,
        this.slider = t
    }
    ,
    p._filterFindCellElements = function(t) {
        return a.filterFindElements(t, this.options.cellSelector)
    }
    ,
    p.reloadCells = function() {
        this.cells = this._makeCells(this.slider.children),
        this.positionCells(),
        this._getWrapShiftCells(),
        this.setGallerySize()
    }
    ,
    p._makeCells = function(t) {
        return this._filterFindCellElements(t).map(function(t) {
            return new i(t,this)
        }, this)
    }
    ,
    p.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }
    ,
    p.getLastSlide = function() {
        return this.slides[this.slides.length - 1]
    }
    ,
    p.positionCells = function() {
        this._sizeCells(this.cells),
        this._positionCells(0)
    }
    ,
    p._positionCells = function(t) {
        t = t || 0,
        this.maxCellHeight = t && this.maxCellHeight || 0;
        var e = 0;
        if (0 < t) {
            var i = this.cells[t - 1];
            e = i.x + i.size.outerWidth
        }
        for (var n = this.cells.length, o = t; o < n; o++) {
            var r = this.cells[o];
            r.setPosition(e),
            e += r.size.outerWidth,
            this.maxCellHeight = Math.max(r.size.outerHeight, this.maxCellHeight)
        }
        this.slideableWidth = e,
        this.updateSlides(),
        this._containSlides(),
        this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0
    }
    ,
    p._sizeCells = function(t) {
        t.forEach(function(t) {
            t.getSize()
        })
    }
    ,
    p.updateSlides = function() {
        if (this.slides = [],
        this.cells.length) {
            var n = new s(this);
            this.slides.push(n);
            var o = "left" == this.originSide ? "marginRight" : "marginLeft"
              , r = this._getCanCellFit();
            this.cells.forEach(function(t, e) {
                if (n.cells.length) {
                    var i = n.outerWidth - n.firstMargin + (t.size.outerWidth - t.size[o]);
                    r.call(this, e, i) || (n.updateTarget(),
                    n = new s(this),
                    this.slides.push(n)),
                    n.addCell(t)
                } else
                    n.addCell(t)
            }, this),
            n.updateTarget(),
            this.updateSelectedSlide()
        }
    }
    ,
    p._getCanCellFit = function() {
        var t = this.options.groupCells;
        if (!t)
            return function() {
                return !1
            }
            ;
        if ("number" == typeof t) {
            var e = parseInt(t, 10);
            return function(t) {
                return t % e != 0
            }
        }
        var i = "string" == typeof t && t.match(/^(\d+)%$/)
          , n = i ? parseInt(i[1], 10) / 100 : 1;
        return function(t, e) {
            return e <= (this.size.innerWidth + 1) * n
        }
    }
    ,
    p._init = p.reposition = function() {
        this.positionCells(),
        this.positionSliderAtSelected()
    }
    ,
    p.getSize = function() {
        this.size = e(this.element),
        this.setCellAlign(),
        this.cursorPosition = this.size.innerWidth * this.cellAlign
    }
    ;
    var g = {
        center: {
            left: .5,
            right: .5
        },
        left: {
            left: 0,
            right: 1
        },
        right: {
            right: 0,
            left: 1
        }
    };
    return p.setCellAlign = function() {
        var t = g[this.options.cellAlign];
        this.cellAlign = t ? t[this.originSide] : this.options.cellAlign
    }
    ,
    p.setGallerySize = function() {
        if (this.options.setGallerySize) {
            var t = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
            this.viewport.style.height = t + "px"
        }
    }
    ,
    p._getWrapShiftCells = function() {
        if (this.options.wrapAround) {
            this._unshiftCells(this.beforeShiftCells),
            this._unshiftCells(this.afterShiftCells);
            var t = this.cursorPosition
              , e = this.cells.length - 1;
            this.beforeShiftCells = this._getGapCells(t, e, -1),
            t = this.size.innerWidth - this.cursorPosition,
            this.afterShiftCells = this._getGapCells(t, 0, 1)
        }
    }
    ,
    p._getGapCells = function(t, e, i) {
        for (var n = []; 0 < t; ) {
            var o = this.cells[e];
            if (!o)
                break;
            n.push(o),
            e += i,
            t -= o.size.outerWidth
        }
        return n
    }
    ,
    p._containSlides = function() {
        if (this.options.contain && !this.options.wrapAround && this.cells.length) {
            var t = this.options.rightToLeft
              , e = t ? "marginRight" : "marginLeft"
              , i = t ? "marginLeft" : "marginRight"
              , n = this.slideableWidth - this.getLastCell().size[i]
              , o = n < this.size.innerWidth
              , r = this.cursorPosition + this.cells[0].size[e]
              , s = n - this.size.innerWidth * (1 - this.cellAlign);
            this.slides.forEach(function(t) {
                o ? t.target = n * this.cellAlign : (t.target = Math.max(t.target, r),
                t.target = Math.min(t.target, s))
            }, this)
        }
    }
    ,
    p.dispatchEvent = function(t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n),
        l && this.$element) {
            var o = t += this.options.namespaceJQueryEvents ? ".flickity" : "";
            if (e) {
                var r = l.Event(e);
                r.type = t,
                o = r
            }
            this.$element.trigger(o, i)
        }
    }
    ,
    p.select = function(t, e, i) {
        if (this.isActive && (t = parseInt(t, 10),
        this._wrapSelect(t),
        (this.options.wrapAround || e) && (t = a.modulo(t, this.slides.length)),
        this.slides[t])) {
            var n = this.selectedIndex;
            this.selectedIndex = t,
            this.updateSelectedSlide(),
            i ? this.positionSliderAtSelected() : this.startAnimation(),
            this.options.adaptiveHeight && this.setGallerySize(),
            this.dispatchEvent("select", null, [t]),
            t != n && this.dispatchEvent("change", null, [t]),
            this.dispatchEvent("cellSelect")
        }
    }
    ,
    p._wrapSelect = function(t) {
        var e = this.slides.length;
        if (!(this.options.wrapAround && 1 < e))
            return t;
        var i = a.modulo(t, e)
          , n = Math.abs(i - this.selectedIndex)
          , o = Math.abs(i + e - this.selectedIndex)
          , r = Math.abs(i - e - this.selectedIndex);
        !this.isDragSelect && o < n ? t += e : !this.isDragSelect && r < n && (t -= e),
        t < 0 ? this.x -= this.slideableWidth : e <= t && (this.x += this.slideableWidth)
    }
    ,
    p.previous = function(t, e) {
        this.select(this.selectedIndex - 1, t, e)
    }
    ,
    p.next = function(t, e) {
        this.select(this.selectedIndex + 1, t, e)
    }
    ,
    p.updateSelectedSlide = function() {
        var t = this.slides[this.selectedIndex];
        t && (this.unselectSelectedSlide(),
        (this.selectedSlide = t).select(),
        this.selectedCells = t.cells,
        this.selectedElements = t.getCellElements(),
        this.selectedCell = t.cells[0],
        this.selectedElement = this.selectedElements[0])
    }
    ,
    p.unselectSelectedSlide = function() {
        this.selectedSlide && this.selectedSlide.unselect()
    }
    ,
    p.selectInitialIndex = function() {
        var t = this.options.initialIndex;
        if (this.isInitActivated)
            this.select(this.selectedIndex, !1, !0);
        else {
            if (t && "string" == typeof t)
                if (this.queryCell(t))
                    return void this.selectCell(t, !1, !0);
            var e = 0;
            t && this.slides[t] && (e = t),
            this.select(e, !1, !0)
        }
    }
    ,
    p.selectCell = function(t, e, i) {
        var n = this.queryCell(t);
        if (n) {
            var o = this.getCellSlideIndex(n);
            this.select(o, e, i)
        }
    }
    ,
    p.getCellSlideIndex = function(t) {
        for (var e = 0; e < this.slides.length; e++) {
            if (-1 != this.slides[e].cells.indexOf(t))
                return e
        }
    }
    ,
    p.getCell = function(t) {
        for (var e = 0; e < this.cells.length; e++) {
            var i = this.cells[e];
            if (i.element == t)
                return i
        }
    }
    ,
    p.getCells = function(t) {
        t = a.makeArray(t);
        var i = [];
        return t.forEach(function(t) {
            var e = this.getCell(t);
            e && i.push(e)
        }, this),
        i
    }
    ,
    p.getCellElements = function() {
        return this.cells.map(function(t) {
            return t.element
        })
    }
    ,
    p.getParentCell = function(t) {
        var e = this.getCell(t);
        return e || (t = a.getParent(t, ".flickity-slider > *"),
        this.getCell(t))
    }
    ,
    p.getAdjacentCellElements = function(t, e) {
        if (!t)
            return this.selectedSlide.getCellElements();
        e = void 0 === e ? this.selectedIndex : e;
        var i = this.slides.length;
        if (i <= 1 + 2 * t)
            return this.getCellElements();
        for (var n = [], o = e - t; o <= e + t; o++) {
            var r = this.options.wrapAround ? a.modulo(o, i) : o
              , s = this.slides[r];
            s && (n = n.concat(s.getCellElements()))
        }
        return n
    }
    ,
    p.queryCell = function(t) {
        if ("number" == typeof t)
            return this.cells[t];
        if ("string" == typeof t) {
            if (t.match(/^[#\.]?[\d\/]/))
                return;
            t = this.element.querySelector(t)
        }
        return this.getCell(t)
    }
    ,
    p.uiChange = function() {
        this.emitEvent("uiChange")
    }
    ,
    p.childUIPointerDown = function(t) {
        "touchstart" != t.type && t.preventDefault(),
        this.focus()
    }
    ,
    p.onresize = function() {
        this.watchCSS(),
        this.resize()
    }
    ,
    a.debounceMethod(f, "onresize", 150),
    p.resize = function() {
        if (this.isActive) {
            this.getSize(),
            this.options.wrapAround && (this.x = a.modulo(this.x, this.slideableWidth)),
            this.positionCells(),
            this._getWrapShiftCells(),
            this.setGallerySize(),
            this.emitEvent("resize");
            var t = this.selectedElements && this.selectedElements[0];
            this.selectCell(t, !1, !0)
        }
    }
    ,
    p.watchCSS = function() {
        this.options.watchCSS && (-1 != r(this.element, ":after").content.indexOf("flickity") ? this.activate() : this.deactivate())
    }
    ,
    p.onkeydown = function(t) {
        var e = document.activeElement && document.activeElement != this.element;
        if (this.options.accessibility && !e) {
            var i = f.keyboardHandlers[t.keyCode];
            i && i.call(this)
        }
    }
    ,
    f.keyboardHandlers = {
        37: function() {
            var t = this.options.rightToLeft ? "next" : "previous";
            this.uiChange(),
            this[t]()
        },
        39: function() {
            var t = this.options.rightToLeft ? "previous" : "next";
            this.uiChange(),
            this[t]()
        }
    },
    p.focus = function() {
        var t = n.pageYOffset;
        this.element.focus({
            preventScroll: !0
        }),
        n.pageYOffset != t && n.scrollTo(n.pageXOffset, t)
    }
    ,
    p.deactivate = function() {
        this.isActive && (this.element.classList.remove("flickity-enabled"),
        this.element.classList.remove("flickity-rtl"),
        this.unselectSelectedSlide(),
        this.cells.forEach(function(t) {
            t.destroy()
        }),
        this.element.removeChild(this.viewport),
        u(this.slider.children, this.element),
        this.options.accessibility && (this.element.removeAttribute("tabIndex"),
        this.element.removeEventListener("keydown", this)),
        this.isActive = !1,
        this.emitEvent("deactivate"))
    }
    ,
    p.destroy = function() {
        this.deactivate(),
        n.removeEventListener("resize", this),
        this.allOff(),
        this.emitEvent("destroy"),
        l && this.$element && l.removeData(this.element, "flickity"),
        delete this.element.flickityGUID,
        delete h[this.guid]
    }
    ,
    a.extend(p, o),
    f.data = function(t) {
        var e = (t = a.getQueryElement(t)) && t.flickityGUID;
        return e && h[e]
    }
    ,
    a.htmlInit(f, "flickity"),
    l && l.bridget && l.bridget("flickity", f),
    f.setJQuery = function(t) {
        l = t
    }
    ,
    f.Cell = i,
    f.Slide = s,
    f
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("ev-emitter")) : e.Unipointer = i(e, e.EvEmitter)
}(window, function(o, t) {
    function e() {}
    var i = e.prototype = Object.create(t.prototype);
    i.bindStartEvent = function(t) {
        this._bindStartEvent(t, !0)
    }
    ,
    i.unbindStartEvent = function(t) {
        this._bindStartEvent(t, !1)
    }
    ,
    i._bindStartEvent = function(t, e) {
        var i = (e = void 0 === e || e) ? "addEventListener" : "removeEventListener"
          , n = "mousedown";
        o.PointerEvent ? n = "pointerdown" : "ontouchstart"in o && (n = "touchstart"),
        t[i](n, this)
    }
    ,
    i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    i.getTouch = function(t) {
        for (var e = 0; e < t.length; e++) {
            var i = t[e];
            if (i.identifier == this.pointerIdentifier)
                return i
        }
    }
    ,
    i.onmousedown = function(t) {
        var e = t.button;
        e && 0 !== e && 1 !== e || this._pointerDown(t, t)
    }
    ,
    i.ontouchstart = function(t) {
        this._pointerDown(t, t.changedTouches[0])
    }
    ,
    i.onpointerdown = function(t) {
        this._pointerDown(t, t)
    }
    ,
    i._pointerDown = function(t, e) {
        t.button || this.isPointerDown || (this.isPointerDown = !0,
        this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier,
        this.pointerDown(t, e))
    }
    ,
    i.pointerDown = function(t, e) {
        this._bindPostStartEvents(t),
        this.emitEvent("pointerDown", [t, e])
    }
    ;
    var n = {
        mousedown: ["mousemove", "mouseup"],
        touchstart: ["touchmove", "touchend", "touchcancel"],
        pointerdown: ["pointermove", "pointerup", "pointercancel"]
    };
    return i._bindPostStartEvents = function(t) {
        if (t) {
            var e = n[t.type];
            e.forEach(function(t) {
                o.addEventListener(t, this)
            }, this),
            this._boundPointerEvents = e
        }
    }
    ,
    i._unbindPostStartEvents = function() {
        this._boundPointerEvents && (this._boundPointerEvents.forEach(function(t) {
            o.removeEventListener(t, this)
        }, this),
        delete this._boundPointerEvents)
    }
    ,
    i.onmousemove = function(t) {
        this._pointerMove(t, t)
    }
    ,
    i.onpointermove = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerMove(t, t)
    }
    ,
    i.ontouchmove = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerMove(t, e)
    }
    ,
    i._pointerMove = function(t, e) {
        this.pointerMove(t, e)
    }
    ,
    i.pointerMove = function(t, e) {
        this.emitEvent("pointerMove", [t, e])
    }
    ,
    i.onmouseup = function(t) {
        this._pointerUp(t, t)
    }
    ,
    i.onpointerup = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerUp(t, t)
    }
    ,
    i.ontouchend = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerUp(t, e)
    }
    ,
    i._pointerUp = function(t, e) {
        this._pointerDone(),
        this.pointerUp(t, e)
    }
    ,
    i.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e])
    }
    ,
    i._pointerDone = function() {
        this._pointerReset(),
        this._unbindPostStartEvents(),
        this.pointerDone()
    }
    ,
    i._pointerReset = function() {
        this.isPointerDown = !1,
        delete this.pointerIdentifier
    }
    ,
    i.pointerDone = function() {}
    ,
    i.onpointercancel = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t)
    }
    ,
    i.ontouchcancel = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerCancel(t, e)
    }
    ,
    i._pointerCancel = function(t, e) {
        this._pointerDone(),
        this.pointerCancel(t, e)
    }
    ,
    i.pointerCancel = function(t, e) {
        this.emitEvent("pointerCancel", [t, e])
    }
    ,
    e.getPointerPoint = function(t) {
        return {
            x: t.pageX,
            y: t.pageY
        }
    }
    ,
    e
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("unipointer")) : e.Unidragger = i(e, e.Unipointer)
}(window, function(r, t) {
    function e() {}
    var i = e.prototype = Object.create(t.prototype);
    i.bindHandles = function() {
        this._bindHandles(!0)
    }
    ,
    i.unbindHandles = function() {
        this._bindHandles(!1)
    }
    ,
    i._bindHandles = function(t) {
        for (var e = (t = void 0 === t || t) ? "addEventListener" : "removeEventListener", i = t ? this._touchActionValue : "", n = 0; n < this.handles.length; n++) {
            var o = this.handles[n];
            this._bindStartEvent(o, t),
            o[e]("click", this),
            r.PointerEvent && (o.style.touchAction = i)
        }
    }
    ,
    i._touchActionValue = "none",
    i.pointerDown = function(t, e) {
        this.okayPointerDown(t) && (this.pointerDownPointer = e,
        t.preventDefault(),
        this.pointerDownBlur(),
        this._bindPostStartEvents(t),
        this.emitEvent("pointerDown", [t, e]))
    }
    ;
    var o = {
        TEXTAREA: !0,
        INPUT: !0,
        SELECT: !0,
        OPTION: !0
    }
      , s = {
        radio: !0,
        checkbox: !0,
        button: !0,
        submit: !0,
        image: !0,
        file: !0
    };
    return i.okayPointerDown = function(t) {
        var e = o[t.target.nodeName]
          , i = s[t.target.type]
          , n = !e || i;
        return n || this._pointerReset(),
        n
    }
    ,
    i.pointerDownBlur = function() {
        var t = document.activeElement;
        t && t.blur && t != document.body && t.blur()
    }
    ,
    i.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.emitEvent("pointerMove", [t, e, i]),
        this._dragMove(t, e, i)
    }
    ,
    i._dragPointerMove = function(t, e) {
        var i = {
            x: e.pageX - this.pointerDownPointer.pageX,
            y: e.pageY - this.pointerDownPointer.pageY
        };
        return !this.isDragging && this.hasDragStarted(i) && this._dragStart(t, e),
        i
    }
    ,
    i.hasDragStarted = function(t) {
        return 3 < Math.abs(t.x) || 3 < Math.abs(t.y)
    }
    ,
    i.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e]),
        this._dragPointerUp(t, e)
    }
    ,
    i._dragPointerUp = function(t, e) {
        this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e)
    }
    ,
    i._dragStart = function(t, e) {
        this.isDragging = !0,
        this.isPreventingClicks = !0,
        this.dragStart(t, e)
    }
    ,
    i.dragStart = function(t, e) {
        this.emitEvent("dragStart", [t, e])
    }
    ,
    i._dragMove = function(t, e, i) {
        this.isDragging && this.dragMove(t, e, i)
    }
    ,
    i.dragMove = function(t, e, i) {
        t.preventDefault(),
        this.emitEvent("dragMove", [t, e, i])
    }
    ,
    i._dragEnd = function(t, e) {
        this.isDragging = !1,
        setTimeout(function() {
            delete this.isPreventingClicks
        }
        .bind(this)),
        this.dragEnd(t, e)
    }
    ,
    i.dragEnd = function(t, e) {
        this.emitEvent("dragEnd", [t, e])
    }
    ,
    i.onclick = function(t) {
        this.isPreventingClicks && t.preventDefault()
    }
    ,
    i._staticClick = function(t, e) {
        this.isIgnoringMouseUp && "mouseup" == t.type || (this.staticClick(t, e),
        "mouseup" != t.type && (this.isIgnoringMouseUp = !0,
        setTimeout(function() {
            delete this.isIgnoringMouseUp
        }
        .bind(this), 400)))
    }
    ,
    i.staticClick = function(t, e) {
        this.emitEvent("staticClick", [t, e])
    }
    ,
    e.getPointerPoint = t.getPointerPoint,
    e
}),
function(n, o) {
    "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function(t, e, i) {
        return o(n, t, e, i)
    }) : "object" == typeof module && module.exports ? module.exports = o(n, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : n.Flickity = o(n, n.Flickity, n.Unidragger, n.fizzyUIUtils)
}(window, function(i, t, e, a) {
    a.extend(t.defaults, {
        draggable: ">1",
        dragThreshold: 3
    }),
    t.createMethods.push("_createDrag");
    var n = t.prototype;
    a.extend(n, e.prototype),
    n._touchActionValue = "pan-y";
    var o = "createTouch"in document
      , r = !1;
    n._createDrag = function() {
        this.on("activate", this.onActivateDrag),
        this.on("uiChange", this._uiChangeDrag),
        this.on("deactivate", this.onDeactivateDrag),
        this.on("cellChange", this.updateDraggable),
        o && !r && (i.addEventListener("touchmove", function() {}),
        r = !0)
    }
    ,
    n.onActivateDrag = function() {
        this.handles = [this.viewport],
        this.bindHandles(),
        this.updateDraggable()
    }
    ,
    n.onDeactivateDrag = function() {
        this.unbindHandles(),
        this.element.classList.remove("is-draggable")
    }
    ,
    n.updateDraggable = function() {
        ">1" == this.options.draggable ? this.isDraggable = 1 < this.slides.length : this.isDraggable = this.options.draggable,
        this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable")
    }
    ,
    n.bindDrag = function() {
        this.options.draggable = !0,
        this.updateDraggable()
    }
    ,
    n.unbindDrag = function() {
        this.options.draggable = !1,
        this.updateDraggable()
    }
    ,
    n._uiChangeDrag = function() {
        delete this.isFreeScrolling
    }
    ,
    n.pointerDown = function(t, e) {
        this.isDraggable ? this.okayPointerDown(t) && (this._pointerDownPreventDefault(t),
        this.pointerDownFocus(t),
        document.activeElement != this.element && this.pointerDownBlur(),
        this.dragX = this.x,
        this.viewport.classList.add("is-pointer-down"),
        this.pointerDownScroll = l(),
        i.addEventListener("scroll", this),
        this._pointerDownDefault(t, e)) : this._pointerDownDefault(t, e)
    }
    ,
    n._pointerDownDefault = function(t, e) {
        this.pointerDownPointer = {
            pageX: e.pageX,
            pageY: e.pageY
        },
        this._bindPostStartEvents(t),
        this.dispatchEvent("pointerDown", t, [e])
    }
    ;
    var s = {
        INPUT: !0,
        TEXTAREA: !0,
        SELECT: !0
    };
    function l() {
        return {
            x: i.pageXOffset,
            y: i.pageYOffset
        }
    }
    return n.pointerDownFocus = function(t) {
        s[t.target.nodeName] || this.focus()
    }
    ,
    n._pointerDownPreventDefault = function(t) {
        var e = "touchstart" == t.type
          , i = "touch" == t.pointerType
          , n = s[t.target.nodeName];
        e || i || n || t.preventDefault()
    }
    ,
    n.hasDragStarted = function(t) {
        return Math.abs(t.x) > this.options.dragThreshold
    }
    ,
    n.pointerUp = function(t, e) {
        delete this.isTouchScrolling,
        this.viewport.classList.remove("is-pointer-down"),
        this.dispatchEvent("pointerUp", t, [e]),
        this._dragPointerUp(t, e)
    }
    ,
    n.pointerDone = function() {
        i.removeEventListener("scroll", this),
        delete this.pointerDownScroll
    }
    ,
    n.dragStart = function(t, e) {
        this.isDraggable && (this.dragStartPosition = this.x,
        this.startAnimation(),
        i.removeEventListener("scroll", this),
        this.dispatchEvent("dragStart", t, [e]))
    }
    ,
    n.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.dispatchEvent("pointerMove", t, [e, i]),
        this._dragMove(t, e, i)
    }
    ,
    n.dragMove = function(t, e, i) {
        if (this.isDraggable) {
            t.preventDefault(),
            this.previousDragX = this.dragX;
            var n = this.options.rightToLeft ? -1 : 1;
            this.options.wrapAround && (i.x = i.x % this.slideableWidth);
            var o = this.dragStartPosition + i.x * n;
            if (!this.options.wrapAround && this.slides.length) {
                var r = Math.max(-this.slides[0].target, this.dragStartPosition);
                o = r < o ? .5 * (o + r) : o;
                var s = Math.min(-this.getLastSlide().target, this.dragStartPosition);
                o = o < s ? .5 * (o + s) : o
            }
            this.dragX = o,
            this.dragMoveTime = new Date,
            this.dispatchEvent("dragMove", t, [e, i])
        }
    }
    ,
    n.dragEnd = function(t, e) {
        if (this.isDraggable) {
            this.options.freeScroll && (this.isFreeScrolling = !0);
            var i = this.dragEndRestingSelect();
            if (this.options.freeScroll && !this.options.wrapAround) {
                var n = this.getRestingPosition();
                this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target
            } else
                this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());
            delete this.previousDragX,
            this.isDragSelect = this.options.wrapAround,
            this.select(i),
            delete this.isDragSelect,
            this.dispatchEvent("dragEnd", t, [e])
        }
    }
    ,
    n.dragEndRestingSelect = function() {
        var t = this.getRestingPosition()
          , e = Math.abs(this.getSlideDistance(-t, this.selectedIndex))
          , i = this._getClosestResting(t, e, 1)
          , n = this._getClosestResting(t, e, -1);
        return i.distance < n.distance ? i.index : n.index
    }
    ,
    n._getClosestResting = function(t, e, i) {
        for (var n = this.selectedIndex, o = 1 / 0, r = this.options.contain && !this.options.wrapAround ? function(t, e) {
            return t <= e
        }
        : function(t, e) {
            return t < e
        }
        ; r(e, o) && (n += i,
        o = e,
        null !== (e = this.getSlideDistance(-t, n))); )
            e = Math.abs(e);
        return {
            distance: o,
            index: n - i
        }
    }
    ,
    n.getSlideDistance = function(t, e) {
        var i = this.slides.length
          , n = this.options.wrapAround && 1 < i
          , o = n ? a.modulo(e, i) : e
          , r = this.slides[o];
        if (!r)
            return null;
        var s = n ? this.slideableWidth * Math.floor(e / i) : 0;
        return t - (r.target + s)
    }
    ,
    n.dragEndBoostSelect = function() {
        if (void 0 === this.previousDragX || !this.dragMoveTime || 100 < new Date - this.dragMoveTime)
            return 0;
        var t = this.getSlideDistance(-this.dragX, this.selectedIndex)
          , e = this.previousDragX - this.dragX;
        return 0 < t && 0 < e ? 1 : t < 0 && e < 0 ? -1 : 0
    }
    ,
    n.staticClick = function(t, e) {
        var i = this.getParentCell(t.target)
          , n = i && i.element
          , o = i && this.cells.indexOf(i);
        this.dispatchEvent("staticClick", t, [e, n, o])
    }
    ,
    n.onscroll = function() {
        var t = l()
          , e = this.pointerDownScroll.x - t.x
          , i = this.pointerDownScroll.y - t.y;
        (3 < Math.abs(e) || 3 < Math.abs(i)) && this._pointerDone()
    }
    ,
    t
}),
function(n, o) {
    "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function(t, e, i) {
        return o(n, t, e, i)
    }) : "object" == typeof module && module.exports ? module.exports = o(n, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : o(n, n.Flickity, n.Unipointer, n.fizzyUIUtils)
}(window, function(t, e, i, n) {
    "use strict";
    var o = "http://www.w3.org/2000/svg";
    function r(t, e) {
        this.direction = t,
        this.parent = e,
        this._create()
    }
    (r.prototype = Object.create(i.prototype))._create = function() {
        this.isEnabled = !0,
        this.isPrevious = -1 == this.direction;
        var t = this.parent.options.rightToLeft ? 1 : -1;
        this.isLeft = this.direction == t;
        var e = this.element = document.createElement("button");
        e.className = "flickity-button flickity-prev-next-button",
        e.className += this.isPrevious ? " previous" : " next",
        e.setAttribute("type", "button"),
        this.disable(),
        e.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
        var i = this.createSVG();
        e.appendChild(i),
        this.parent.on("select", this.update.bind(this)),
        this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }
    ,
    r.prototype.activate = function() {
        this.bindStartEvent(this.element),
        this.element.addEventListener("click", this),
        this.parent.element.appendChild(this.element)
    }
    ,
    r.prototype.deactivate = function() {
        this.parent.element.removeChild(this.element),
        this.unbindStartEvent(this.element),
        this.element.removeEventListener("click", this)
    }
    ,
    r.prototype.createSVG = function() {
        var t = document.createElementNS(o, "svg");
        t.setAttribute("class", "flickity-button-icon"),
        t.setAttribute("viewBox", "0 0 100 100");
        var e = document.createElementNS(o, "path")
          , i = function(t) {
            return "string" != typeof t ? "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z" : t
        }(this.parent.options.arrowShape);
        return e.setAttribute("d", i),
        e.setAttribute("class", "arrow"),
        this.isLeft || e.setAttribute("transform", "translate(100, 100) rotate(180) "),
        t.appendChild(e),
        t
    }
    ,
    r.prototype.handleEvent = n.handleEvent,
    r.prototype.onclick = function() {
        if (this.isEnabled) {
            this.parent.uiChange();
            var t = this.isPrevious ? "previous" : "next";
            this.parent[t]()
        }
    }
    ,
    r.prototype.enable = function() {
        this.isEnabled || (this.element.disabled = !1,
        this.isEnabled = !0)
    }
    ,
    r.prototype.disable = function() {
        this.isEnabled && (this.element.disabled = !0,
        this.isEnabled = !1)
    }
    ,
    r.prototype.update = function() {
        var t = this.parent.slides;
        if (this.parent.options.wrapAround && 1 < t.length)
            this.enable();
        else {
            var e = t.length ? t.length - 1 : 0
              , i = this.isPrevious ? 0 : e;
            this[this.parent.selectedIndex == i ? "disable" : "enable"]()
        }
    }
    ,
    r.prototype.destroy = function() {
        this.deactivate(),
        this.allOff()
    }
    ,
    n.extend(e.defaults, {
        prevNextButtons: !0,
        arrowShape: {
            x0: 10,
            x1: 60,
            y1: 50,
            x2: 70,
            y2: 40,
            x3: 30
        }
    }),
    e.createMethods.push("_createPrevNextButtons");
    var s = e.prototype;
    return s._createPrevNextButtons = function() {
        this.options.prevNextButtons && (this.prevButton = new r(-1,this),
        this.nextButton = new r(1,this),
        this.on("activate", this.activatePrevNextButtons))
    }
    ,
    s.activatePrevNextButtons = function() {
        this.prevButton.activate(),
        this.nextButton.activate(),
        this.on("deactivate", this.deactivatePrevNextButtons)
    }
    ,
    s.deactivatePrevNextButtons = function() {
        this.prevButton.deactivate(),
        this.nextButton.deactivate(),
        this.off("deactivate", this.deactivatePrevNextButtons)
    }
    ,
    e.PrevNextButton = r,
    e
}),
function(n, o) {
    "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function(t, e, i) {
        return o(n, t, e, i)
    }) : "object" == typeof module && module.exports ? module.exports = o(n, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : o(n, n.Flickity, n.Unipointer, n.fizzyUIUtils)
}(window, function(t, e, i, n) {
    function o(t) {
        this.parent = t,
        this._create()
    }
    (o.prototype = Object.create(i.prototype))._create = function() {
        this.holder = document.createElement("ol"),
        this.holder.className = "flickity-page-dots",
        this.dots = [],
        this.handleClick = this.onClick.bind(this),
        this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }
    ,
    o.prototype.activate = function() {
        this.setDots(),
        this.holder.addEventListener("click", this.handleClick),
        this.bindStartEvent(this.holder),
        this.parent.element.appendChild(this.holder)
    }
    ,
    o.prototype.deactivate = function() {
        this.holder.removeEventListener("click", this.handleClick),
        this.unbindStartEvent(this.holder),
        this.parent.element.removeChild(this.holder)
    }
    ,
    o.prototype.setDots = function() {
        var t = this.parent.slides.length - this.dots.length;
        0 < t ? this.addDots(t) : t < 0 && this.removeDots(-t)
    }
    ,
    o.prototype.addDots = function(t) {
        for (var e = document.createDocumentFragment(), i = [], n = this.dots.length, o = n + t, r = n; r < o; r++) {
            var s = document.createElement("li");
            s.className = "dot",
            s.setAttribute("aria-label", "Page dot " + (r + 1)),
            e.appendChild(s),
            i.push(s)
        }
        this.holder.appendChild(e),
        this.dots = this.dots.concat(i)
    }
    ,
    o.prototype.removeDots = function(t) {
        this.dots.splice(this.dots.length - t, t).forEach(function(t) {
            this.holder.removeChild(t)
        }, this)
    }
    ,
    o.prototype.updateSelected = function() {
        this.selectedDot && (this.selectedDot.className = "dot",
        this.selectedDot.removeAttribute("aria-current")),
        this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex],
        this.selectedDot.className = "dot is-selected",
        this.selectedDot.setAttribute("aria-current", "step"))
    }
    ,
    o.prototype.onTap = o.prototype.onClick = function(t) {
        var e = t.target;
        if ("LI" == e.nodeName) {
            this.parent.uiChange();
            var i = this.dots.indexOf(e);
            this.parent.select(i)
        }
    }
    ,
    o.prototype.destroy = function() {
        this.deactivate(),
        this.allOff()
    }
    ,
    e.PageDots = o,
    n.extend(e.defaults, {
        pageDots: !0
    }),
    e.createMethods.push("_createPageDots");
    var r = e.prototype;
    return r._createPageDots = function() {
        this.options.pageDots && (this.pageDots = new o(this),
        this.on("activate", this.activatePageDots),
        this.on("select", this.updateSelectedPageDots),
        this.on("cellChange", this.updatePageDots),
        this.on("resize", this.updatePageDots),
        this.on("deactivate", this.deactivatePageDots))
    }
    ,
    r.activatePageDots = function() {
        this.pageDots.activate()
    }
    ,
    r.updateSelectedPageDots = function() {
        this.pageDots.updateSelected()
    }
    ,
    r.updatePageDots = function() {
        this.pageDots.setDots()
    }
    ,
    r.deactivatePageDots = function() {
        this.pageDots.deactivate()
    }
    ,
    e.PageDots = o,
    e
}),
function(t, n) {
    "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function(t, e, i) {
        return n(t, e, i)
    }) : "object" == typeof module && module.exports ? module.exports = n(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : n(t.EvEmitter, t.fizzyUIUtils, t.Flickity)
}(window, function(t, e, i) {
    function n(t) {
        this.parent = t,
        this.state = "stopped",
        this.onVisibilityChange = this.visibilityChange.bind(this),
        this.onVisibilityPlay = this.visibilityPlay.bind(this)
    }
    (n.prototype = Object.create(t.prototype)).play = function() {
        "playing" != this.state && (document.hidden ? document.addEventListener("visibilitychange", this.onVisibilityPlay) : (this.state = "playing",
        document.addEventListener("visibilitychange", this.onVisibilityChange),
        this.tick()))
    }
    ,
    n.prototype.tick = function() {
        if ("playing" == this.state) {
            var t = this.parent.options.autoPlay;
            t = "number" == typeof t ? t : 3e3;
            var e = this;
            this.clear(),
            this.timeout = setTimeout(function() {
                e.parent.next(!0),
                e.tick()
            }, t)
        }
    }
    ,
    n.prototype.stop = function() {
        this.state = "stopped",
        this.clear(),
        document.removeEventListener("visibilitychange", this.onVisibilityChange)
    }
    ,
    n.prototype.clear = function() {
        clearTimeout(this.timeout)
    }
    ,
    n.prototype.pause = function() {
        "playing" == this.state && (this.state = "paused",
        this.clear())
    }
    ,
    n.prototype.unpause = function() {
        "paused" == this.state && this.play()
    }
    ,
    n.prototype.visibilityChange = function() {
        this[document.hidden ? "pause" : "unpause"]()
    }
    ,
    n.prototype.visibilityPlay = function() {
        this.play(),
        document.removeEventListener("visibilitychange", this.onVisibilityPlay)
    }
    ,
    e.extend(i.defaults, {
        pauseAutoPlayOnHover: !0
    }),
    i.createMethods.push("_createPlayer");
    var o = i.prototype;
    return o._createPlayer = function() {
        this.player = new n(this),
        this.on("activate", this.activatePlayer),
        this.on("uiChange", this.stopPlayer),
        this.on("pointerDown", this.stopPlayer),
        this.on("deactivate", this.deactivatePlayer)
    }
    ,
    o.activatePlayer = function() {
        this.options.autoPlay && (this.player.play(),
        this.element.addEventListener("mouseenter", this))
    }
    ,
    o.playPlayer = function() {
        this.player.play()
    }
    ,
    o.stopPlayer = function() {
        this.player.stop()
    }
    ,
    o.pausePlayer = function() {
        this.player.pause()
    }
    ,
    o.unpausePlayer = function() {
        this.player.unpause()
    }
    ,
    o.deactivatePlayer = function() {
        this.player.stop(),
        this.element.removeEventListener("mouseenter", this)
    }
    ,
    o.onmouseenter = function() {
        this.options.pauseAutoPlayOnHover && (this.player.pause(),
        this.element.addEventListener("mouseleave", this))
    }
    ,
    o.onmouseleave = function() {
        this.player.unpause(),
        this.element.removeEventListener("mouseleave", this)
    }
    ,
    i.Player = n,
    i
}),
function(i, n) {
    "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function(t, e) {
        return n(i, t, e)
    }) : "object" == typeof module && module.exports ? module.exports = n(i, require("./flickity"), require("fizzy-ui-utils")) : n(i, i.Flickity, i.fizzyUIUtils)
}(window, function(t, e, n) {
    var i = e.prototype;
    return i.insert = function(t, e) {
        var i = this._makeCells(t);
        if (i && i.length) {
            var n = this.cells.length;
            e = void 0 === e ? n : e;
            var o = function(t) {
                var e = document.createDocumentFragment();
                return t.forEach(function(t) {
                    e.appendChild(t.element)
                }),
                e
            }(i)
              , r = e == n;
            if (r)
                this.slider.appendChild(o);
            else {
                var s = this.cells[e].element;
                this.slider.insertBefore(o, s)
            }
            if (0 === e)
                this.cells = i.concat(this.cells);
            else if (r)
                this.cells = this.cells.concat(i);
            else {
                var a = this.cells.splice(e, n - e);
                this.cells = this.cells.concat(i).concat(a)
            }
            this._sizeCells(i),
            this.cellChange(e, !0)
        }
    }
    ,
    i.append = function(t) {
        this.insert(t, this.cells.length)
    }
    ,
    i.prepend = function(t) {
        this.insert(t, 0)
    }
    ,
    i.remove = function(t) {
        var e = this.getCells(t);
        if (e && e.length) {
            var i = this.cells.length - 1;
            e.forEach(function(t) {
                t.remove();
                var e = this.cells.indexOf(t);
                i = Math.min(e, i),
                n.removeFrom(this.cells, t)
            }, this),
            this.cellChange(i, !0)
        }
    }
    ,
    i.cellSizeChange = function(t) {
        var e = this.getCell(t);
        if (e) {
            e.getSize();
            var i = this.cells.indexOf(e);
            this.cellChange(i)
        }
    }
    ,
    i.cellChange = function(t, e) {
        var i = this.selectedElement;
        this._positionCells(t),
        this._getWrapShiftCells(),
        this.setGallerySize();
        var n = this.getCell(i);
        n && (this.selectedIndex = this.getCellSlideIndex(n)),
        this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex),
        this.emitEvent("cellChange", [t]),
        this.select(this.selectedIndex),
        e && this.positionSliderAtSelected()
    }
    ,
    e
}),
function(i, n) {
    "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function(t, e) {
        return n(i, t, e)
    }) : "object" == typeof module && module.exports ? module.exports = n(i, require("./flickity"), require("fizzy-ui-utils")) : n(i, i.Flickity, i.fizzyUIUtils)
}(window, function(t, e, r) {
    "use strict";
    e.createMethods.push("_createLazyload");
    var i = e.prototype;
    function o(t, e) {
        this.img = t,
        this.flickity = e,
        this.load()
    }
    return i._createLazyload = function() {
        this.on("select", this.lazyLoad)
    }
    ,
    i.lazyLoad = function() {
        var t = this.options.lazyLoad;
        if (t) {
            var e = "number" == typeof t ? t : 0
              , i = this.getAdjacentCellElements(e)
              , n = [];
            i.forEach(function(t) {
                var e = function(t) {
                    if ("IMG" == t.nodeName) {
                        var e = t.getAttribute("data-flickity-lazyload")
                          , i = t.getAttribute("data-flickity-lazyload-src")
                          , n = t.getAttribute("data-flickity-lazyload-srcset");
                        if (e || i || n)
                            return [t]
                    }
                    var o = t.querySelectorAll("img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]");
                    return r.makeArray(o)
                }(t);
                n = n.concat(e)
            }),
            n.forEach(function(t) {
                new o(t,this)
            }, this)
        }
    }
    ,
    o.prototype.handleEvent = r.handleEvent,
    o.prototype.load = function() {
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this);
        var t = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src")
          , e = this.img.getAttribute("data-flickity-lazyload-srcset");
        this.img.src = t,
        e && this.img.setAttribute("srcset", e),
        this.img.removeAttribute("data-flickity-lazyload"),
        this.img.removeAttribute("data-flickity-lazyload-src"),
        this.img.removeAttribute("data-flickity-lazyload-srcset")
    }
    ,
    o.prototype.onload = function(t) {
        this.complete(t, "flickity-lazyloaded")
    }
    ,
    o.prototype.onerror = function(t) {
        this.complete(t, "flickity-lazyerror")
    }
    ,
    o.prototype.complete = function(t, e) {
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this);
        var i = this.flickity.getParentCell(this.img)
          , n = i && i.element;
        this.flickity.cellSizeChange(n),
        this.img.classList.add(e),
        this.flickity.dispatchEvent("lazyLoad", t, n)
    }
    ,
    e.LazyLoader = o,
    e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], e) : "object" == typeof module && module.exports && (module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")))
}(window, function(t) {
    return t
}),
function(l) {
    var c = "is-visible"
      , u = "hovertip:show"
      , d = "hovertip:hide";
    l.hovertip = {
        SHOW: u,
        HIDE: d
    },
    l.fn.hovertip = function(t) {
        return t = l.extend({
            content: null,
            touch: !0
        }, t),
        this.each(function() {
            var n, o = l(this), r = l(window);
            function e() {
                n.removeClass(c).trigger(d)
            }
            n = t.content instanceof jQuery ? t.content : "string" == typeof t.content ? l(t.content) : l(o.attr("href"));
            var i = {
                NONE: 0,
                HOVER: 1,
                TOUCH: 2
            }
              , s = i.NONE;
            function a(t) {
                return t.match(/mouse/) ? i.HOVER : i.TOUCH
            }
            o.on(t.touch ? "mouseenter touchend" : "mouseenter", function(t) {
                t.preventDefault(),
                s ? s === i.TOUCH && s === a(t.type) && (e(),
                s = i.NONE) : (function() {
                    var t, e, i = r.scrollTop() + r.height() / 2;
                    e = o.offset().top > i ? (t = o.position().top,
                    "top") : (t = o.position().top + o.outerHeight(),
                    "bottom"),
                    n.attr("data-position", e).css("top", t + "px").addClass(c).trigger(u, [o])
                }(),
                s = a(t.type))
            }).on("mouseleave", function(t) {
                s === i.HOVER && (e(),
                s = i.NONE)
            }),
            n.on("mouseleave", function() {
                e(),
                s = i.NONE
            })
        })
    }
}(jQuery),
jQuery.keycodes = {
    arrow_left: 37,
    arrow_right: 39,
    arrow_up: 38,
    arrow_down: 40,
    enter: 13,
    space: 32
},
function(s) {
    s.fn.megalink = function(r) {
        return r = s.extend({
            selector: "a",
            onclick: null,
            skip: null,
            skipAndProxy: null
        }, r),
        this.each(function() {
            var t = s(this)
              , e = s(r.selector, t).first()
              , i = e.attr("href") || "javascript:void(0)"
              , n = e.attr("target") || "_self"
              , o = s('<a class="megalink-proxy" href="' + i + '" target="' + n + '"></a>');
            t.append(o).addClass("megalink"),
            r.onclick && o.on("click", r.onclick),
            r.skip && s(r.skip, t).addClass("megalink-skip"),
            r.skipAndProxy && s(r.skipAndProxy, t).addClass("megalink-skip-proxy").on("click", function(i) {
                i.preventDefault();
                var n = {
                    bubbles: !0,
                    cancelable: !0,
                    composed: !0
                };
                i.originalEvent instanceof MouseEvent && s.each(["altKey", "ctrlKey", "metaKey", "shiftKey"], function(t, e) {
                    n[e] = i.originalEvent[e]
                }),
                o[0].dispatchEvent(new MouseEvent("click",n))
            })
        })
    }
}(jQuery),
function(c) {
    c.fn.msg = function() {
        var a, t = arguments, l = {
            item: "<li></li>",
            close: !0,
            timeout: !1
        };
        return 0 < t.length && (c.isArray(t[0]) ? (a = t[0],
        l = c.extend(l, t[1])) : c.isPlainObject(t[0]) ? (a = [t[0]],
        l = c.extend(l, t[1])) : "string" == typeof t[0] && (a = [{
            text: t[0],
            status: t[1] || "err"
        }],
        l = c.extend(l, t[2]))),
        this.each(function(t, e) {
            var i, n = c(e);
            if (void 0 !== a)
                for (i in a) {
                    var o, r = a[i], s = c(l.item).addClass("status-" + (r.status || "err")).html(r.text + (l.close ? '<span class="close"></span>' : "")).hide();
                    s.appendTo(n).fadeIn(),
                    l.timeout && (o = setTimeout(function() {
                        s.remove()
                    }, 1e3 * l.timeout)),
                    c(".close", s).click(function() {
                        o && clearTimeout(o),
                        s.remove()
                    })
                }
            else
                n.html("")
        })
    }
}(jQuery),
function(o) {
    var r = "quicktip";
    function s(t) {
        return t.split(/\s+/).map(function(t) {
            return o.trim(t) + "." + r
        }).join(" ")
    }
    function n(t, e) {
        o.isPlainObject(e) || (e = {
            text: e
        }),
        e = o.extend({
            class: "",
            text: "Default text",
            position: "top"
        }, e);
        var i = o(t)
          , n = o('<div class="' + [r, e.position, e.class].join(" ") + '">' + e.text + "</div>");
        a(t),
        i.data(r, n).addClass("has-" + r),
        n.css({
            position: "absolute",
            display: "none"
        }).appendTo("body"),
        o("html").css("position", "relative"),
        i.on(s("mouseenter focusin"), function() {
            var t = o(this)
              , e = t.data(r);
            e.css(e.hasClass("top") ? {
                left: t.offset().left + .5 * t.outerWidth(!0) + "px",
                bottom: o("body").height() - t.offset().top + "px"
            } : {
                left: t.offset().left + .5 * t.outerWidth(!0) + "px",
                top: t.offset().top + t.outerHeight(!0) + "px"
            }).show()
        }).on(s("mouseleave focusout"), function() {
            var t = o(this);
            t.is(":focus") || t.data(r).hide()
        }),
        i.is(":focus") && n.show()
    }
    function a(t) {
        o(t).each(function(t, e) {
            var i = o(e)
              , n = i.data(r);
            n && (0 < n.length && n.remove(),
            i.removeData(r).removeClass("has-" + r),
            i.off("." + r))
        })
    }
    o.fn[r] = function(i) {
        return this.each(function(t, e) {
            n(e, i)
        })
    }
    ,
    o[r] = new function() {
        this.attach = function(t, i) {
            o(t).each(function(t, e) {
                n(e, i)
            })
        }
        ,
        this.detach = function(t) {
            o(t).each(function(t, e) {
                a(e)
            })
        }
    }
}(jQuery),
function(s) {
    s.responsiveTable = {
        TOGGLE: "responsiveTable:toggle"
    },
    s.fn.responsiveTable = function(r) {
        function o(t, e) {
            return t.closest("table").children("thead").first().find("th:eq(" + e + ")").text()
        }
        function i(t, e) {
            var i = "responsive-breakpoint"
              , n = t.parent().width()
              , o = !!e;
            !t.hasClass(r.class) && 0 < n && 0 < t.outerWidth() - n ? (t.data(i, n),
            t.addClass(r.class),
            o = !0) : t.hasClass(r.class) && n > t.data(i) && (t.removeClass(r.class),
            t.removeData(i),
            o = !0),
            o && t.trigger(s.responsiveTable.TOGGLE, [t.hasClass(r.class)])
        }
        return "string" != typeof r && (r = s.extend({
            class: "responsive-table",
            dataRows: "tbody tr",
            findHeader: o,
            headerSuffix: ": "
        }, r)),
        this.each(function() {
            var t = s(this)
              , e = t.data("responsiveTable");
            switch (!0) {
            case "string" != typeof r && !e:
                e = {
                    uuid: s.uuid()
                },
                t.data("responsiveTable", e),
                function(t) {
                    r.findHeader && s(r.dataRows, t).each(function(t, e) {
                        s("> td", e).each(function(t, e) {
                            var i = s(e)
                              , n = r.findHeader(i, t);
                            !0 === n && (n = o(i, t)),
                            n && i.attr("data-th", n + r.headerSuffix)
                        })
                    })
                }(t),
                i(t, !0),
                s(window).on("resize.responsiveTable." + e.uuid, s.debounce(100, function() {
                    i(t)
                }));
                break;
            case "destroy" === r && !!e:
                t.removeData("responsiveTable"),
                s(window).off("resize.responsiveTable." + e.uuid);
                break;
            case "refresh" === r && !!e:
                i(t, !0)
            }
        })
    }
}(jQuery),
function(o) {
    var i;
    function r() {
        if (!i) {
            var t = document.createElement("div");
            t.style.visibility = "hidden",
            t.style.overflow = "scroll",
            t.style.msOverflowStyle = "scrollbar",
            t.style.padding = "0",
            t.style.border = "none",
            document.body.appendChild(t);
            var e = document.createElement("div");
            e.style.padding = "0",
            e.style.border = "none",
            t.appendChild(e),
            i = t.offsetWidth - e.offsetWidth,
            t.parentNode.removeChild(t)
        }
        return i
    }
    function s(t, e) {
        var i = t[0];
        return "y" === e ? i.scrollHeight > i.clientHeight : i.scrollWidth > i.clientWidth
    }
    o.scrollbar = {
        getWidth: r,
        isVisibleOn: s,
        isMouseEventTarget: function(t) {
            var e, i, n = o(t.target);
            return !!(t.offsetX && s(n, "y") && (e = parseInt(n.css("border-right-width").replace(/px$/, ""), 10) || 0,
            t.offsetX >= t.target.offsetWidth - r() - e - 1)) || !!(t.offsetY && s(n, "x") && (i = parseInt(n.css("border-bottom-width").replace(/px$/, ""), 10) || 0,
            t.offsetY >= t.target.offsetHeight - r() - i - 1))
        }
    }
}(jQuery),
function(t, u) {
    var n, e = t.jQuery || t.Cowboy || (t.Cowboy = {});
    e.throttle = n = function(o, r, s, a) {
        var l, c = 0;
        function t() {
            var t = this
              , e = +new Date - c
              , i = arguments;
            function n() {
                c = +new Date,
                s.apply(t, i)
            }
            a && !l && n(),
            l && clearTimeout(l),
            a === u && o < e ? n() : !0 !== r && (l = setTimeout(a ? function() {
                l = u
            }
            : n, a === u ? o - e : o))
        }
        return "boolean" != typeof r && (a = s,
        s = r,
        r = u),
        e.guid && (t.guid = s.guid = s.guid || e.guid++),
        t
    }
    ,
    e.debounce = function(t, e, i) {
        return i === u ? n(t, e, !1) : n(t, i, !1 !== e)
    }
}(this),
jQuery.uuid = function() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
        var e = 16 * Math.random() | 0;
        return ("x" == t ? e : 3 & e | 8).toString(16)
    })
}
,
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).PerfectScrollbar = e()
}(this, function() {
    "use strict";
    function g(t) {
        return getComputedStyle(t)
    }
    function u(t, e) {
        for (var i in e) {
            var n = e[i];
            "number" == typeof n && (n += "px"),
            t.style[i] = n
        }
        return t
    }
    function d(t) {
        var e = document.createElement("div");
        return e.className = t,
        e
    }
    var i = "undefined" != typeof Element && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector);
    function s(t, e) {
        if (!i)
            throw new Error("No element matching method supported");
        return i.call(t, e)
    }
    function o(t) {
        t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t)
    }
    function r(t, e) {
        return Array.prototype.filter.call(t.children, function(t) {
            return s(t, e)
        })
    }
    var y = {
        main: "ps",
        rtl: "ps__rtl",
        element: {
            thumb: function(t) {
                return "ps__thumb-" + t
            },
            rail: function(t) {
                return "ps__rail-" + t
            },
            consuming: "ps__child--consume"
        },
        state: {
            focus: "ps--focus",
            clicking: "ps--clicking",
            active: function(t) {
                return "ps--active-" + t
            },
            scrolling: function(t) {
                return "ps--scrolling-" + t
            }
        }
    }
      , a = {
        x: null,
        y: null
    };
    function b(t, e) {
        var i = t.element.classList
          , n = y.state.scrolling(e);
        i.contains(n) ? clearTimeout(a[e]) : i.add(n)
    }
    function w(t, e) {
        a[e] = setTimeout(function() {
            return t.isAlive && t.element.classList.remove(y.state.scrolling(e))
        }, t.settings.scrollingThreshold)
    }
    function n(t) {
        this.element = t,
        this.handlers = {}
    }
    var t = {
        isEmpty: {
            configurable: !0
        }
    };
    n.prototype.bind = function(t, e) {
        void 0 === this.handlers[t] && (this.handlers[t] = []),
        this.handlers[t].push(e),
        this.element.addEventListener(t, e, !1)
    }
    ,
    n.prototype.unbind = function(e, i) {
        var n = this;
        this.handlers[e] = this.handlers[e].filter(function(t) {
            return !(!i || t === i) || (n.element.removeEventListener(e, t, !1),
            !1)
        })
    }
    ,
    n.prototype.unbindAll = function() {
        for (var t in this.handlers)
            this.unbind(t)
    }
    ,
    t.isEmpty.get = function() {
        var e = this;
        return Object.keys(this.handlers).every(function(t) {
            return 0 === e.handlers[t].length
        })
    }
    ,
    Object.defineProperties(n.prototype, t);
    function h() {
        this.eventElements = []
    }
    function f(t) {
        if ("function" == typeof window.CustomEvent)
            return new CustomEvent(t);
        var e = document.createEvent("CustomEvent");
        return e.initCustomEvent(t, !1, !1, void 0),
        e
    }
    function e(t, e, i, n, o) {
        var r;
        if (void 0 === n && (n = !0),
        void 0 === o && (o = !1),
        "top" === e)
            r = ["contentHeight", "containerHeight", "scrollTop", "y", "up", "down"];
        else {
            if ("left" !== e)
                throw new Error("A proper axis should be provided");
            r = ["contentWidth", "containerWidth", "scrollLeft", "x", "left", "right"]
        }
        !function(t, e, i, n, o) {
            var r = i[0]
              , s = i[1]
              , a = i[2]
              , l = i[3]
              , c = i[4]
              , u = i[5];
            void 0 === n && (n = !0);
            void 0 === o && (o = !1);
            var d = t.element;
            t.reach[l] = null,
            d[a] < 1 && (t.reach[l] = "start");
            d[a] > t[r] - t[s] - 1 && (t.reach[l] = "end");
            e && (d.dispatchEvent(f("ps-scroll-" + l)),
            e < 0 ? d.dispatchEvent(f("ps-scroll-" + c)) : 0 < e && d.dispatchEvent(f("ps-scroll-" + u)),
            n && function(t, e) {
                b(t, e),
                w(t, e)
            }(t, l));
            t.reach[l] && (e || o) && d.dispatchEvent(f("ps-" + l + "-reach-" + t.reach[l]))
        }(t, i, r, n, o)
    }
    function p(t) {
        return parseInt(t, 10) || 0
    }
    h.prototype.eventElement = function(e) {
        var t = this.eventElements.filter(function(t) {
            return t.element === e
        })[0];
        return t || (t = new n(e),
        this.eventElements.push(t)),
        t
    }
    ,
    h.prototype.bind = function(t, e, i) {
        this.eventElement(t).bind(e, i)
    }
    ,
    h.prototype.unbind = function(t, e, i) {
        var n = this.eventElement(t);
        n.unbind(e, i),
        n.isEmpty && this.eventElements.splice(this.eventElements.indexOf(n), 1)
    }
    ,
    h.prototype.unbindAll = function() {
        this.eventElements.forEach(function(t) {
            return t.unbindAll()
        }),
        this.eventElements = []
    }
    ,
    h.prototype.once = function(t, e, i) {
        var n = this.eventElement(t)
          , o = function(t) {
            n.unbind(e, o),
            i(t)
        };
        n.bind(e, o)
    }
    ;
    var m = {
        isWebKit: "undefined" != typeof document && "WebkitAppearance"in document.documentElement.style,
        supportsTouch: "undefined" != typeof window && ("ontouchstart"in window || "maxTouchPoints"in window.navigator && 0 < window.navigator.maxTouchPoints || window.DocumentTouch && document instanceof window.DocumentTouch),
        supportsIePointer: "undefined" != typeof navigator && navigator.msMaxTouchPoints,
        isChrome: "undefined" != typeof navigator && /Chrome/i.test(navigator && navigator.userAgent)
    };
    function x(t) {
        var e = t.element
          , i = Math.floor(e.scrollTop)
          , n = e.getBoundingClientRect();
        t.containerWidth = Math.ceil(n.width),
        t.containerHeight = Math.ceil(n.height),
        t.contentWidth = e.scrollWidth,
        t.contentHeight = e.scrollHeight,
        e.contains(t.scrollbarXRail) || (r(e, y.element.rail("x")).forEach(function(t) {
            return o(t)
        }),
        e.appendChild(t.scrollbarXRail)),
        e.contains(t.scrollbarYRail) || (r(e, y.element.rail("y")).forEach(function(t) {
            return o(t)
        }),
        e.appendChild(t.scrollbarYRail)),
        !t.settings.suppressScrollX && t.containerWidth + t.settings.scrollXMarginOffset < t.contentWidth ? (t.scrollbarXActive = !0,
        t.railXWidth = t.containerWidth - t.railXMarginWidth,
        t.railXRatio = t.containerWidth / t.railXWidth,
        t.scrollbarXWidth = l(t, p(t.railXWidth * t.containerWidth / t.contentWidth)),
        t.scrollbarXLeft = p((t.negativeScrollAdjustment + e.scrollLeft) * (t.railXWidth - t.scrollbarXWidth) / (t.contentWidth - t.containerWidth))) : t.scrollbarXActive = !1,
        !t.settings.suppressScrollY && t.containerHeight + t.settings.scrollYMarginOffset < t.contentHeight ? (t.scrollbarYActive = !0,
        t.railYHeight = t.containerHeight - t.railYMarginHeight,
        t.railYRatio = t.containerHeight / t.railYHeight,
        t.scrollbarYHeight = l(t, p(t.railYHeight * t.containerHeight / t.contentHeight)),
        t.scrollbarYTop = p(i * (t.railYHeight - t.scrollbarYHeight) / (t.contentHeight - t.containerHeight))) : t.scrollbarYActive = !1,
        t.scrollbarXLeft >= t.railXWidth - t.scrollbarXWidth && (t.scrollbarXLeft = t.railXWidth - t.scrollbarXWidth),
        t.scrollbarYTop >= t.railYHeight - t.scrollbarYHeight && (t.scrollbarYTop = t.railYHeight - t.scrollbarYHeight),
        function(t, e) {
            var i = {
                width: e.railXWidth
            }
              , n = Math.floor(t.scrollTop);
            e.isRtl ? i.left = e.negativeScrollAdjustment + t.scrollLeft + e.containerWidth - e.contentWidth : i.left = t.scrollLeft;
            e.isScrollbarXUsingBottom ? i.bottom = e.scrollbarXBottom - n : i.top = e.scrollbarXTop + n;
            u(e.scrollbarXRail, i);
            var o = {
                top: n,
                height: e.railYHeight
            };
            e.isScrollbarYUsingRight ? e.isRtl ? o.right = e.contentWidth - (e.negativeScrollAdjustment + t.scrollLeft) - e.scrollbarYRight - e.scrollbarYOuterWidth - 9 : o.right = e.scrollbarYRight - t.scrollLeft : e.isRtl ? o.left = e.negativeScrollAdjustment + t.scrollLeft + 2 * e.containerWidth - e.contentWidth - e.scrollbarYLeft - e.scrollbarYOuterWidth : o.left = e.scrollbarYLeft + t.scrollLeft;
            u(e.scrollbarYRail, o),
            u(e.scrollbarX, {
                left: e.scrollbarXLeft,
                width: e.scrollbarXWidth - e.railBorderXWidth
            }),
            u(e.scrollbarY, {
                top: e.scrollbarYTop,
                height: e.scrollbarYHeight - e.railBorderYWidth
            })
        }(e, t),
        t.scrollbarXActive ? e.classList.add(y.state.active("x")) : (e.classList.remove(y.state.active("x")),
        t.scrollbarXWidth = 0,
        t.scrollbarXLeft = 0,
        e.scrollLeft = !0 === t.isRtl ? t.contentWidth : 0),
        t.scrollbarYActive ? e.classList.add(y.state.active("y")) : (e.classList.remove(y.state.active("y")),
        t.scrollbarYHeight = 0,
        t.scrollbarYTop = 0,
        e.scrollTop = 0)
    }
    function l(t, e) {
        return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)),
        t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)),
        e
    }
    function c(i, t) {
        var n = t[0]
          , o = t[1]
          , r = t[2]
          , s = t[3]
          , e = t[4]
          , a = t[5]
          , l = t[6]
          , c = t[7]
          , u = t[8]
          , d = i.element
          , h = null
          , f = null
          , p = null;
        function g(t) {
            t.touches && t.touches[0] && (t[r] = t.touches[0].pageY),
            d[l] = h + p * (t[r] - f),
            b(i, c),
            x(i),
            t.stopPropagation(),
            t.preventDefault()
        }
        function m() {
            w(i, c),
            i[u].classList.remove(y.state.clicking),
            i.event.unbind(i.ownerDocument, "mousemove", g)
        }
        function v(t, e) {
            h = d[l],
            e && t.touches && (t[r] = t.touches[0].pageY),
            f = t[r],
            p = (i[o] - i[n]) / (i[s] - i[a]),
            e ? i.event.bind(i.ownerDocument, "touchmove", g) : (i.event.bind(i.ownerDocument, "mousemove", g),
            i.event.once(i.ownerDocument, "mouseup", m),
            t.preventDefault()),
            i[u].classList.add(y.state.clicking),
            t.stopPropagation()
        }
        i.event.bind(i[e], "mousedown", function(t) {
            v(t)
        }),
        i.event.bind(i[e], "touchstart", function(t) {
            v(t, !0)
        })
    }
    function v(t, e) {
        var i, n, o = this;
        if (void 0 === e && (e = {}),
        "string" == typeof t && (t = document.querySelector(t)),
        !t || !t.nodeName)
            throw new Error("no element is specified to initialize PerfectScrollbar");
        for (var r in (this.element = t).classList.add(y.main),
        this.settings = {
            handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
            maxScrollbarLength: null,
            minScrollbarLength: null,
            scrollingThreshold: 1e3,
            scrollXMarginOffset: 0,
            scrollYMarginOffset: 0,
            suppressScrollX: !1,
            suppressScrollY: !1,
            swipeEasing: !0,
            useBothWheelAxes: !1,
            wheelPropagation: !0,
            wheelSpeed: 1
        },
        e)
            this.settings[r] = e[r];
        function s() {
            return t.classList.add(y.state.focus)
        }
        function a() {
            return t.classList.remove(y.state.focus)
        }
        this.containerWidth = null,
        this.containerHeight = null,
        this.contentWidth = null,
        this.contentHeight = null,
        this.isRtl = "rtl" === g(t).direction,
        !0 === this.isRtl && t.classList.add(y.rtl),
        this.isNegativeScroll = (n = t.scrollLeft,
        t.scrollLeft = -1,
        i = t.scrollLeft < 0,
        t.scrollLeft = n,
        i),
        this.negativeScrollAdjustment = this.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0,
        this.event = new h,
        this.ownerDocument = t.ownerDocument || document,
        this.scrollbarXRail = d(y.element.rail("x")),
        t.appendChild(this.scrollbarXRail),
        this.scrollbarX = d(y.element.thumb("x")),
        this.scrollbarXRail.appendChild(this.scrollbarX),
        this.scrollbarX.setAttribute("tabindex", 0),
        this.event.bind(this.scrollbarX, "focus", s),
        this.event.bind(this.scrollbarX, "blur", a),
        this.scrollbarXActive = null,
        this.scrollbarXWidth = null,
        this.scrollbarXLeft = null;
        var l = g(this.scrollbarXRail);
        this.scrollbarXBottom = parseInt(l.bottom, 10),
        isNaN(this.scrollbarXBottom) ? (this.isScrollbarXUsingBottom = !1,
        this.scrollbarXTop = p(l.top)) : this.isScrollbarXUsingBottom = !0,
        this.railBorderXWidth = p(l.borderLeftWidth) + p(l.borderRightWidth),
        u(this.scrollbarXRail, {
            display: "block"
        }),
        this.railXMarginWidth = p(l.marginLeft) + p(l.marginRight),
        u(this.scrollbarXRail, {
            display: ""
        }),
        this.railXWidth = null,
        this.railXRatio = null,
        this.scrollbarYRail = d(y.element.rail("y")),
        t.appendChild(this.scrollbarYRail),
        this.scrollbarY = d(y.element.thumb("y")),
        this.scrollbarYRail.appendChild(this.scrollbarY),
        this.scrollbarY.setAttribute("tabindex", 0),
        this.event.bind(this.scrollbarY, "focus", s),
        this.event.bind(this.scrollbarY, "blur", a),
        this.scrollbarYActive = null,
        this.scrollbarYHeight = null,
        this.scrollbarYTop = null;
        var c = g(this.scrollbarYRail);
        this.scrollbarYRight = parseInt(c.right, 10),
        isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = !1,
        this.scrollbarYLeft = p(c.left)) : this.isScrollbarYUsingRight = !0,
        this.scrollbarYOuterWidth = this.isRtl ? function(t) {
            var e = g(t);
            return p(e.width) + p(e.paddingLeft) + p(e.paddingRight) + p(e.borderLeftWidth) + p(e.borderRightWidth)
        }(this.scrollbarY) : null,
        this.railBorderYWidth = p(c.borderTopWidth) + p(c.borderBottomWidth),
        u(this.scrollbarYRail, {
            display: "block"
        }),
        this.railYMarginHeight = p(c.marginTop) + p(c.marginBottom),
        u(this.scrollbarYRail, {
            display: ""
        }),
        this.railYHeight = null,
        this.railYRatio = null,
        this.reach = {
            x: t.scrollLeft <= 0 ? "start" : t.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
            y: t.scrollTop <= 0 ? "start" : t.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null
        },
        this.isAlive = !0,
        this.settings.handlers.forEach(function(t) {
            return k[t](o)
        }),
        this.lastScrollTop = Math.floor(t.scrollTop),
        this.lastScrollLeft = t.scrollLeft,
        this.event.bind(this.element, "scroll", function(t) {
            return o.onScroll(t)
        }),
        x(this)
    }
    var k = {
        "click-rail": function(i) {
            i.element,
            i.event.bind(i.scrollbarY, "mousedown", function(t) {
                return t.stopPropagation()
            }),
            i.event.bind(i.scrollbarYRail, "mousedown", function(t) {
                var e = t.pageY - window.pageYOffset - i.scrollbarYRail.getBoundingClientRect().top > i.scrollbarYTop ? 1 : -1;
                i.element.scrollTop += e * i.containerHeight,
                x(i),
                t.stopPropagation()
            }),
            i.event.bind(i.scrollbarX, "mousedown", function(t) {
                return t.stopPropagation()
            }),
            i.event.bind(i.scrollbarXRail, "mousedown", function(t) {
                var e = t.pageX - window.pageXOffset - i.scrollbarXRail.getBoundingClientRect().left > i.scrollbarXLeft ? 1 : -1;
                i.element.scrollLeft += e * i.containerWidth,
                x(i),
                t.stopPropagation()
            })
        },
        "drag-thumb": function(t) {
            c(t, ["containerWidth", "contentWidth", "pageX", "railXWidth", "scrollbarX", "scrollbarXWidth", "scrollLeft", "x", "scrollbarXRail"]),
            c(t, ["containerHeight", "contentHeight", "pageY", "railYHeight", "scrollbarY", "scrollbarYHeight", "scrollTop", "y", "scrollbarYRail"])
        },
        keyboard: function(o) {
            var r = o.element;
            o.event.bind(o.ownerDocument, "keydown", function(t) {
                if (!(t.isDefaultPrevented && t.isDefaultPrevented() || t.defaultPrevented) && (s(r, ":hover") || s(o.scrollbarX, ":focus") || s(o.scrollbarY, ":focus"))) {
                    var e = document.activeElement ? document.activeElement : o.ownerDocument.activeElement;
                    if (e) {
                        if ("IFRAME" === e.tagName)
                            e = e.contentDocument.activeElement;
                        else
                            for (; e.shadowRoot; )
                                e = e.shadowRoot.activeElement;
                        if (function(t) {
                            return s(t, "input,[contenteditable]") || s(t, "select,[contenteditable]") || s(t, "textarea,[contenteditable]") || s(t, "button,[contenteditable]")
                        }(e))
                            return
                    }
                    var i = 0
                      , n = 0;
                    switch (t.which) {
                    case 37:
                        i = t.metaKey ? -o.contentWidth : t.altKey ? -o.containerWidth : -30;
                        break;
                    case 38:
                        n = t.metaKey ? o.contentHeight : t.altKey ? o.containerHeight : 30;
                        break;
                    case 39:
                        i = t.metaKey ? o.contentWidth : t.altKey ? o.containerWidth : 30;
                        break;
                    case 40:
                        n = t.metaKey ? -o.contentHeight : t.altKey ? -o.containerHeight : -30;
                        break;
                    case 32:
                        n = t.shiftKey ? o.containerHeight : -o.containerHeight;
                        break;
                    case 33:
                        n = o.containerHeight;
                        break;
                    case 34:
                        n = -o.containerHeight;
                        break;
                    case 36:
                        n = o.contentHeight;
                        break;
                    case 35:
                        n = -o.contentHeight;
                        break;
                    default:
                        return
                    }
                    o.settings.suppressScrollX && 0 !== i || o.settings.suppressScrollY && 0 !== n || (r.scrollTop -= n,
                    r.scrollLeft += i,
                    x(o),
                    function(t, e) {
                        var i = Math.floor(r.scrollTop);
                        if (0 === t) {
                            if (!o.scrollbarYActive)
                                return !1;
                            if (0 === i && 0 < e || i >= o.contentHeight - o.containerHeight && e < 0)
                                return !o.settings.wheelPropagation
                        }
                        var n = r.scrollLeft;
                        if (0 === e) {
                            if (!o.scrollbarXActive)
                                return !1;
                            if (0 === n && t < 0 || n >= o.contentWidth - o.containerWidth && 0 < t)
                                return !o.settings.wheelPropagation
                        }
                        return !0
                    }(i, n) && t.preventDefault())
                }
            })
        },
        wheel: function(a) {
            var l = a.element;
            function t(t) {
                var e = function(t) {
                    var e = t.deltaX
                      , i = -1 * t.deltaY;
                    return void 0 !== e && void 0 !== i || (e = -1 * t.wheelDeltaX / 6,
                    i = t.wheelDeltaY / 6),
                    t.deltaMode && 1 === t.deltaMode && (e *= 10,
                    i *= 10),
                    e != e && i != i && (e = 0,
                    i = t.wheelDelta),
                    t.shiftKey ? [-i, -e] : [e, i]
                }(t)
                  , i = e[0]
                  , n = e[1];
                if (!function(t, e, i) {
                    if (!m.isWebKit && l.querySelector("select:focus"))
                        return !0;
                    if (!l.contains(t))
                        return !1;
                    for (var n = t; n && n !== l; ) {
                        if (n.classList.contains(y.element.consuming))
                            return !0;
                        var o = g(n);
                        if (i && o.overflowY.match(/(scroll|auto)/)) {
                            var r = n.scrollHeight - n.clientHeight;
                            if (0 < r && (0 < n.scrollTop && i < 0 || n.scrollTop < r && 0 < i))
                                return !0
                        }
                        if (e && o.overflowX.match(/(scroll|auto)/)) {
                            var s = n.scrollWidth - n.clientWidth;
                            if (0 < s && (0 < n.scrollLeft && e < 0 || n.scrollLeft < s && 0 < e))
                                return !0
                        }
                        n = n.parentNode
                    }
                    return !1
                }(t.target, i, n)) {
                    var o = !1;
                    a.settings.useBothWheelAxes ? a.scrollbarYActive && !a.scrollbarXActive ? (n ? l.scrollTop -= n * a.settings.wheelSpeed : l.scrollTop += i * a.settings.wheelSpeed,
                    o = !0) : a.scrollbarXActive && !a.scrollbarYActive && (i ? l.scrollLeft += i * a.settings.wheelSpeed : l.scrollLeft -= n * a.settings.wheelSpeed,
                    o = !0) : (l.scrollTop -= n * a.settings.wheelSpeed,
                    l.scrollLeft += i * a.settings.wheelSpeed),
                    x(a),
                    (o = o || function(t, e) {
                        var i = Math.floor(l.scrollTop)
                          , n = 0 === l.scrollTop
                          , o = i + l.offsetHeight === l.scrollHeight
                          , r = 0 === l.scrollLeft
                          , s = l.scrollLeft + l.offsetWidth === l.scrollWidth;
                        return !(Math.abs(e) > Math.abs(t) ? n || o : r || s) || !a.settings.wheelPropagation
                    }(i, n)) && !t.ctrlKey && (t.stopPropagation(),
                    t.preventDefault())
                }
            }
            void 0 !== window.onwheel ? a.event.bind(l, "wheel", t) : void 0 !== window.onmousewheel && a.event.bind(l, "mousewheel", t)
        },
        touch: function(a) {
            if (m.supportsTouch || m.supportsIePointer) {
                var l = a.element
                  , c = {}
                  , u = 0
                  , d = {}
                  , i = null;
                m.supportsTouch ? (a.event.bind(l, "touchstart", t),
                a.event.bind(l, "touchmove", e),
                a.event.bind(l, "touchend", n)) : m.supportsIePointer && (window.PointerEvent ? (a.event.bind(l, "pointerdown", t),
                a.event.bind(l, "pointermove", e),
                a.event.bind(l, "pointerup", n)) : window.MSPointerEvent && (a.event.bind(l, "MSPointerDown", t),
                a.event.bind(l, "MSPointerMove", e),
                a.event.bind(l, "MSPointerUp", n)))
            }
            function h(t, e) {
                l.scrollTop -= e,
                l.scrollLeft -= t,
                x(a)
            }
            function f(t) {
                return t.targetTouches ? t.targetTouches[0] : t
            }
            function p(t) {
                return (!t.pointerType || "pen" !== t.pointerType || 0 !== t.buttons) && (!(!t.targetTouches || 1 !== t.targetTouches.length) || !(!t.pointerType || "mouse" === t.pointerType || t.pointerType === t.MSPOINTER_TYPE_MOUSE))
            }
            function t(t) {
                if (p(t)) {
                    var e = f(t);
                    c.pageX = e.pageX,
                    c.pageY = e.pageY,
                    u = (new Date).getTime(),
                    null !== i && clearInterval(i)
                }
            }
            function e(t) {
                if (p(t)) {
                    var e = f(t)
                      , i = {
                        pageX: e.pageX,
                        pageY: e.pageY
                    }
                      , n = i.pageX - c.pageX
                      , o = i.pageY - c.pageY;
                    if (function(t, e, i) {
                        if (!l.contains(t))
                            return !1;
                        for (var n = t; n && n !== l; ) {
                            if (n.classList.contains(y.element.consuming))
                                return !0;
                            var o = g(n);
                            if (i && o.overflowY.match(/(scroll|auto)/)) {
                                var r = n.scrollHeight - n.clientHeight;
                                if (0 < r && (0 < n.scrollTop && i < 0 || n.scrollTop < r && 0 < i))
                                    return !0
                            }
                            if (e && o.overflowX.match(/(scroll|auto)/)) {
                                var s = n.scrollWidth - n.clientWidth;
                                if (0 < s && (0 < n.scrollLeft && e < 0 || n.scrollLeft < s && 0 < e))
                                    return !0
                            }
                            n = n.parentNode
                        }
                        return !1
                    }(t.target, n, o))
                        return;
                    h(n, o),
                    c = i;
                    var r = (new Date).getTime()
                      , s = r - u;
                    0 < s && (d.x = n / s,
                    d.y = o / s,
                    u = r),
                    function(t, e) {
                        var i = Math.floor(l.scrollTop)
                          , n = l.scrollLeft
                          , o = Math.abs(t)
                          , r = Math.abs(e);
                        if (o < r) {
                            if (e < 0 && i === a.contentHeight - a.containerHeight || 0 < e && 0 === i)
                                return 0 === window.scrollY && 0 < e && m.isChrome
                        } else if (r < o && (t < 0 && n === a.contentWidth - a.containerWidth || 0 < t && 0 === n))
                            return !0;
                        return !0
                    }(n, o) && t.preventDefault()
                }
            }
            function n() {
                a.settings.swipeEasing && (clearInterval(i),
                i = setInterval(function() {
                    a.isInitialized ? clearInterval(i) : d.x || d.y ? Math.abs(d.x) < .01 && Math.abs(d.y) < .01 ? clearInterval(i) : (h(30 * d.x, 30 * d.y),
                    d.x *= .8,
                    d.y *= .8) : clearInterval(i)
                }, 10))
            }
        }
    };
    return v.prototype.update = function() {
        this.isAlive && (this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0,
        u(this.scrollbarXRail, {
            display: "block"
        }),
        u(this.scrollbarYRail, {
            display: "block"
        }),
        this.railXMarginWidth = p(g(this.scrollbarXRail).marginLeft) + p(g(this.scrollbarXRail).marginRight),
        this.railYMarginHeight = p(g(this.scrollbarYRail).marginTop) + p(g(this.scrollbarYRail).marginBottom),
        u(this.scrollbarXRail, {
            display: "none"
        }),
        u(this.scrollbarYRail, {
            display: "none"
        }),
        x(this),
        e(this, "top", 0, !1, !0),
        e(this, "left", 0, !1, !0),
        u(this.scrollbarXRail, {
            display: ""
        }),
        u(this.scrollbarYRail, {
            display: ""
        }))
    }
    ,
    v.prototype.onScroll = function(t) {
        this.isAlive && (x(this),
        e(this, "top", this.element.scrollTop - this.lastScrollTop),
        e(this, "left", this.element.scrollLeft - this.lastScrollLeft),
        this.lastScrollTop = Math.floor(this.element.scrollTop),
        this.lastScrollLeft = this.element.scrollLeft)
    }
    ,
    v.prototype.destroy = function() {
        this.isAlive && (this.event.unbindAll(),
        o(this.scrollbarX),
        o(this.scrollbarY),
        o(this.scrollbarXRail),
        o(this.scrollbarYRail),
        this.removePsClasses(),
        this.element = null,
        this.scrollbarX = null,
        this.scrollbarY = null,
        this.scrollbarXRail = null,
        this.scrollbarYRail = null,
        this.isAlive = !1)
    }
    ,
    v.prototype.removePsClasses = function() {
        this.element.className = this.element.className.split(" ").filter(function(t) {
            return !t.match(/^ps([-_].+|)$/)
        }).join(" ")
    }
    ,
    v
}),
function(s, a) {
    var t;
    s.app = t = new function() {
        var n = s.observe(this)
          , i = {}
          , o = {
            cookie: {
                name: "selection",
                ttl: 90
            },
            list: []
        };
        function r() {
            Cookies.set(o.cookie.name, o.list.join("-"), {
                expires: o.cookie.ttl
            })
        }
        o.list = (Cookies.get(o.cookie.name) || "").split("-").filter(function(t) {
            return 0 < t.trim().length
        }),
        n.config = {
            lang: null,
            colors: {},
            breakpoints: {},
            scripts: {}
        },
        n.setConfig = function(t) {
            n.config = a.extend(n.config, t)
        }
        ,
        n.setDict = function(t, e) {
            i[t] = e
        }
        ,
        n.getDict = function(t) {
            return i[t || n.config.lang]
        }
        ,
        n.displayMsg = function(t, e, i) {
            a("#front-msg").msg(t, e, i)
        }
        ,
        n.reroute = function(t) {
            var e = s.location
              , i = new RegExp("^(?:" + e.protocol + "//" + e.host + ")?" + RegExp.quote(e.pathname) + "#(.*)$").exec(t);
            i ? (e.hash = i[1],
            e.reload(!0)) : e.href = t
        }
        ,
        n.script = function(t, e) {
            t instanceof Array || (t = [t]);
            var i = t.shift();
            i ? n.config.scripts[i] ? $script(n.config.scripts[i], n.script.bind(null, t, e)) : n.script(t, e) : e && e()
        }
        ,
        n.trackEvent = function(t, e) {
            s.gtag || (s.dataLayer = s.dataLayer || [],
            s.gtag = function() {
                dataLayer.push(arguments)
            }
            ),
            s.gtag("event", t, a.extend({}, e))
        }
        ,
        n.trackFbEvent = function(t) {
            s.fbq && s.fbq("track", t)
        }
        ,
        n.selectTour = function(t) {
            return o.list.indexOf(t) < 0 && (o.list.push(t),
            r(),
            app.trigger("app:select-tour", t),
            !0)
        }
        ,
        n.deselectTour = function(t) {
            var e = o.list.indexOf(t);
            return 0 <= e && (o.list.splice(e, 1),
            r(),
            app.trigger("app:deselect-tour", t),
            !0)
        }
        ,
        n.getSelectedTours = function() {
            return o.list
        }
    }
    ,
    a(document).ready(function() {
        t.trigger("dom:ready", null)
    })
}(window, jQuery),
window.app.setDict("en", {
    flat: {
        home: {
            header_form_counter: {
                singular: "{0} trip",
                plural: "{0} trips"
            },
            header_form_suggestions: {
                loading: "Loading in progress",
                error: "Loading error",
                empty: "No results matched your search",
                destinations: {
                    singular: "Destination",
                    plural: "Destinations"
                },
                themes: {
                    singular: "Experience",
                    plural: "Experiences"
                },
                tours: {
                    singular: "Tour",
                    plural: "Tours"
                }
            }
        },
        reviews: {
            loading: "Loading in progress",
            error: "Loading error"
        }
    },
    blog: {
        index: {
            loading: "Loading in progress",
            error: "Loading error"
        }
    },
    travel: {
        search_engine: {
            loading: "Loading in progress",
            error: "Loading error"
        },
        tour: {
            loading: "Loading in progress",
            error: "Loading error"
        }
    }
}),
function(r, n) {
    n.on("dom:ready", function(t) {
        var e = r(".action-select", t);
        function i() {
            var o = n.getSelectedTours();
            e.each(function(t, e) {
                var i = r(e)
                  , n = i.attr("data-id");
                i.toggleClass("is-selected", 0 <= o.indexOf(n))
            })
        }
        0 !== e.length && (i(),
        n.on("app:select-tour app:deselect-tour", i),
        e.on("click", function() {
            var t = r(this).attr("data-id");
            n.selectTour(t) || n.deselectTour(t)
        }).addClass("is-ready"))
    })
}(jQuery, window.app),
function(l, i) {
    i.on("dom:ready", function(t) {
        var e = l("#blog-index", t);
        if (0 !== e.length) {
            var s = l("#blog-index-content > .posts", e);
            a(s)
        }
        function a(t) {
            l("> .post", t).megalink({
                selector: ".heading > .link",
                skipAndProxy: ".photo"
            }),
            l("> .loadmore > .link", t).on("click", function(t) {
                t.preventDefault(),
                function(o) {
                    var t = i.getDict()
                      , r = l("> .link", o);
                    o.addClass("is-loading"),
                    r.text(t.blog.index.loading),
                    i.displayMsg(),
                    l.ajax({
                        method: "get",
                        url: r.attr("href"),
                        dataType: "html"
                    }).always(function() {
                        o.removeClass("is-loading")
                    }).fail(function() {
                        i.displayMsg(t.blog.index.error),
                        r.text(t.blog.index.error)
                    }).done(function(t) {
                        var e = l(t)
                          , i = l("#blog-index-content > .posts", e)
                          , n = l("> .loadmore", i);
                        a(i),
                        i.children(".post").each(function(t, e) {
                            s.append(e)
                        }),
                        0 < n.length ? (r.replaceWith(l("> .link", n)),
                        o.appendTo(s)) : o.remove()
                    })
                }(l(this).parent())
            })
        }
    })
}(jQuery, window.app),
function(o) {
    window.app.on("dom:ready", function(t) {
        var e = o("#blog-post", t);
        if (0 !== e.length) {
            var i = o("#blog-post-related", e)
              , n = o("> .nav", i);
            n.flickity({
                adaptiveHeight: !0,
                cellAlign: "left",
                groupCells: !0,
                prevNextButtons: !1,
                pageDots: !1
            }).captureImgLoad(function() {
                n.flickity("resize")
            }),
            o(".blog-post-related-item", n).megalink({
                selector: ".heading > .link",
                skipAndProxy: ".photo"
            })
        }
    })
}(jQuery),
function(i, n) {
    n.on("dom:ready", function(t) {
        var e = i("#blog-sidebar", t);
        0 !== e.length && i("> .newsletter > .link", e).on("click", function(t) {
            t.preventDefault(),
            n.trigger("front-footer:show-newsletter-dialog")
        })
    })
}(jQuery, window.app),
function(i, n) {
    n.on("dom:ready", function(t) {
        var e = i("body", t);
        0 !== e.length && (e.on(i.dialog.OPEN, function() {
            e.addClass("has-modal")
        }).on(i.dialog.CLOSE, function() {
            e.removeClass("has-modal")
        }),
        n.on("flat-home-responsive-showform", function(t) {
            e.toggleClass("has-modal", t)
        }),
        document.documentElement.style.setProperty("--scrollbar-width", i.scrollbar.getWidth() + "px"))
    })
}(jQuery, window.app),
function(i) {
    window.app.on("dom:ready", function(t) {
        var e = i(".clicktip", t);
        0 !== e.length && e.clicktip()
    })
}(jQuery),
function(s, t) {
    if (window.CSS && CSS.supports("color", "var(--fake-var)")) {
        var a = {
            header: {
                from: "top-top",
                to: "bottom-top",
                duration: "2s"
            },
            body: {
                from: "top-bottom",
                to: "bottom-top",
                duration: "1s"
            }
        };
        t.on("dom:ready", function(t) {
            s("[data-parallax]", t).each(function(t, e) {
                var i = s(e)
                  , n = s("> img", i).first()
                  , o = a[i.attr("data-parallax")];
                if (0 !== n.length && o && !i.data("bs")) {
                    n[0].style.setProperty("--parallax-duration", o.duration);
                    var r = basicScroll.create({
                        direct: !0,
                        elem: n[0],
                        from: o.from,
                        to: o.to,
                        props: {
                            "--parallax-shift": {
                                from: "0px",
                                to: "-50px"
                            }
                        }
                    });
                    r.start(),
                    i.data("bs", r)
                }
            })
        })
    }
}(jQuery, window.app),
function(v, y) {
    y.on("dom:ready", function(t) {
        var e = v("#flat-about", t);
        if (0 !== e.length) {
            var m = ".flat_about"
              , n = v("#flat-about-tablinks-nav", e)
              , i = {
                agencies: v("#flat-about-area-agencies", e)
            }
              , o = v("#flat-about-media-dialog")
              , r = v('<div class="flat-about-tablinks-drag-containment"></div>').css({
                position: "absolute",
                top: n.position().top + parseInt(n.css("marginTop"), 10),
                height: n.height() + "px"
            }).insertBefore(n);
            s(),
            v(window).on("resize", v.debounce(100, s)),
            n.draggabilly({
                axis: "x",
                containment: r[0]
            }),
            0 < i.agencies.length && function(t) {
                var o, r, e, i = v("#flat-about-area-agencies-intro-map", t), n = v("> .contact", t), s = v("#flat-about-area-agencies-contact-word", n), a = v("#flat-about-area-agencies-contact-agencies", n), l = v("> .list", a), c = v("> .actions", a), u = v("> .team", t), d = [];
                function h(t) {
                    return {
                        path: "M11,0A8,8,0,0,0,3,8c0,5.45,7.13,13.46,7.44,13.79a.71.71,0,0,0,1,.06l0-.06C11.84,21.42,19,13.42,19,8A8,8,0,0,0,11,0Zm0,12a4,4,0,1,1,4-4h0A4,4,0,0,1,11,12Z",
                        fillColor: t ? y.config.colors.secondary : y.config.colors.primary,
                        fillOpacity: 1,
                        strokeColor: "#ffffff",
                        strokeOpacity: 1,
                        strokeWeight: 2,
                        scale: 2,
                        anchor: {
                            x: 11,
                            y: 22
                        }
                    }
                }
                function f(n) {
                    v.each(d, function(t, e) {
                        var i = n === t;
                        e.instance && (e.instance.setIcon(h(i)),
                        i && ((r = r || new google.maps.InfoWindow({
                            content: ""
                        })).setContent('<div class="flat-about-area-agencies-intro-map-infowindow"><span class="name">' + e.name + "</span></div>"),
                        r.open(o, e.instance)))
                    })
                }
                l.children().each(function(t, e) {
                    var i = v(e);
                    d[t] = {
                        lat: parseFloat(i.attr("data-lat")),
                        lng: parseFloat(i.attr("data-lng")),
                        name: v(".heading", i).text(),
                        instance: null
                    }
                }),
                e = function() {
                    var i = {
                        lat: {
                            min: 90,
                            max: -90
                        },
                        lng: {
                            min: 180,
                            max: -180
                        }
                    };
                    v.each(d, function(t, e) {
                        e.instance = new google.maps.Marker({
                            map: o,
                            position: {
                                lat: e.lat,
                                lng: e.lng
                            },
                            clickable: !0,
                            draggable: !1,
                            icon: h()
                        }),
                        e.instance.addListener("click", function() {
                            !function(t) {
                                var e = l.data("flickity");
                                e && e.select(t)
                            }(t),
                            f(t)
                        }),
                        i.lat.min = Math.min(i.lat.min, e.lat),
                        i.lat.max = Math.max(i.lat.max, e.lat),
                        i.lng.min = Math.min(i.lng.min, e.lng),
                        i.lng.max = Math.max(i.lng.max, e.lng)
                    }),
                    o.fitBounds(new google.maps.LatLngBounds({
                        lat: i.lat.min,
                        lng: i.lng.min
                    },{
                        lat: i.lat.max,
                        lng: i.lng.max
                    }), 0)
                }
                ,
                $script("https://maps.google.com/maps/api/js?language=" + y.config.lang + "&libraries=&v=quarterly&key=" + i.data("key"), function() {
                    o = new google.maps.Map(i[0],{
                        zoom: 2,
                        center: {
                            lat: 0,
                            lng: 0
                        },
                        zoomControl: !0,
                        mapTypeControl: !0,
                        scaleControl: !0,
                        streetViewControl: !0,
                        rotateControl: !0,
                        fullscreenControl: !0,
                        mapTypeId: "terrain",
                        clickableIcons: !1,
                        backgroundColor: "#d6eeec",
                        styles: [{
                            featureType: "administrative",
                            elementType: "labels.text.fill",
                            stylers: [{
                                color: "#32271b"
                            }]
                        }, {
                            featureType: "administrative.country",
                            elementType: "geometry.stroke",
                            stylers: [{
                                color: "#bbbbbb"
                            }]
                        }, {
                            featureType: "administrative.country",
                            elementType: "labels.text.fill",
                            stylers: [{
                                color: "#8c1437"
                            }]
                        }, {
                            featureType: "administrative.country",
                            elementType: "labels.text.stroke",
                            stylers: [{
                                color: "#ffffff"
                            }, {
                                weight: 4
                            }]
                        }, {
                            featureType: "administrative.country",
                            elementType: "labels.icon",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "landscape",
                            elementType: "all",
                            stylers: [{
                                color: "#f5f3eb"
                            }]
                        }, {
                            featureType: "landscape.natural",
                            elementType: "labels",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "landscape.natural.landcover",
                            elementType: "all",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "landscape.natural.terrain",
                            elementType: "geometry.fill",
                            stylers: [{
                                color: "#000000"
                            }, {
                                lightness: 50
                            }, {
                                saturation: -51
                            }]
                        }, {
                            featureType: "poi",
                            elementType: "all",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "road",
                            elementType: "all",
                            stylers: [{
                                saturation: -100
                            }, {
                                lightness: 45
                            }]
                        }, {
                            featureType: "road.highway",
                            elementType: "all",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "road.local",
                            elementType: "all",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "transit",
                            elementType: "all",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "water",
                            elementType: "geometry.fill",
                            stylers: [{
                                color: "#d6eeec"
                            }]
                        }]
                    }),
                    e && e()
                }),
                l.on("select.flickity", function(t, e) {
                    f(e),
                    function(t) {
                        var e = v(".flat-about-area-agencies-contact-agency", l).eq(t);
                        v("> .content", s).text(e.attr("data-word"))
                    }(e)
                }).flickity({
                    adaptiveHeight: !0,
                    prevNextButtons: !1,
                    pageDots: !1
                }).captureImgLoad(function() {
                    l.flickity("resize")
                });
                var p = l.data("flickity");
                if (1 < p.slides.length) {
                    function g() {
                        v("> .action-prev", c).toggleClass("is-disabled", p.selectedIndex < 1),
                        v("> .action-next", c).toggleClass("is-disabled", p.selectedIndex >= p.slides.length - 1)
                    }
                    l.on("select.flickity", g),
                    g(),
                    v("> .action-prev", c).on("click", function() {
                        l.flickity("previous")
                    }),
                    v("> .action-next", c).on("click", function() {
                        l.flickity("next")
                    }),
                    c.addClass("is-visible"),
                    n.addClass("has-actions")
                }
                v("> .grid", u).each(function(t, e) {
                    var r, i = v(e), s = v("> .block", i), o = 0, a = i.siblings(".actions"), l = v(".action-prev", a), c = v(".action-next", a);
                    function n() {
                        if (r = window.matchMedia("(min-width: " + y.config.breakpoints.large + "px)").matches ? {
                            visibleBlocks: 12,
                            pages: {
                                current: 1,
                                max: Math.ceil(o / 12)
                            }
                        } : window.matchMedia("(min-width: " + y.config.breakpoints.medium + "px)").matches ? {
                            visibleBlocks: 9,
                            pages: {
                                current: 1,
                                max: Math.ceil(o / 9)
                            }
                        } : window.matchMedia("(min-width: " + y.config.breakpoints.small + "px)").matches ? {
                            visibleBlocks: 4,
                            pages: {
                                current: 1,
                                max: Math.ceil(o / 4)
                            }
                        } : null) {
                            var n = 0;
                            s.each(function(t, e) {
                                var i = v(e);
                                n += i.hasClass("is-2x1") ? 2 : 1,
                                i.toggle(n <= r.visibleBlocks)
                            }),
                            a.toggle(1 < r.pages.max),
                            u(1)
                        } else
                            s.show(),
                            a.hide()
                    }
                    function u(n) {
                        if (r && 1 <= n && n <= r.pages.max) {
                            var o = 0;
                            s.each(function(t, e) {
                                var i = v(e);
                                o += i.hasClass("is-2x1") ? 2 : 1,
                                i.toggle(Math.ceil(o / r.visibleBlocks) === n)
                            }),
                            r.pages.current = n,
                            l.toggleClass("is-disabled", r.pages.current < 2),
                            c.toggleClass("is-disabled", r.pages.current >= r.pages.max)
                        }
                    }
                    s.each(function(t, e) {
                        o += v(e).hasClass("is-2x1") ? 2 : 1
                    }),
                    l.on("click", function() {
                        u(r.pages.current - 1)
                    }),
                    c.on("click", function() {
                        u(r.pages.current + 1)
                    }),
                    i.on("reset" + m, function() {
                        u(1)
                    }),
                    v(window).on("resize", v.debounce(100, n)),
                    n()
                }),
                v("> .filter", u).on("change", function() {
                    var t = v(this)
                      , n = v('[name="destination"]', t).val()
                      , e = v("> .grid", u)
                      , i = v("> .actions", u);
                    0 < n.length ? (e.children(".block").each(function(t, e) {
                        var i = v(e);
                        i.toggle(0 <= i.attr("data-destinations").split(",").indexOf(n))
                    }),
                    i.hide()) : (e.trigger("reset" + m),
                    i.show())
                })
            }(i.agencies),
            o.on(v.dialog.OPEN, function(t, e) {
                var i = v(e);
                i.is("[data-photo]") ? a(i.attr("data-photo"), !1) : i.is("[data-embed]") && a(i.attr("data-embed"), !0)
            }),
            o.on(v.dialog.CLOSE, function() {
                v(".embed", o).attr("src", "")
            }),
            v("img", o).on("load error", function(t) {
                o.removeClass("is-loading"),
                "error" === t.type && o.addClass("is-error")
            })
        }
        function s() {
            var t = n.width()
              , e = Math.max(0, t - n.parent().width());
            r.css({
                left: -1 * e + "px",
                width: t + e + "px"
            });
            var i = n.position();
            (0 < i.left || i.left < -1 * e) && n.css({
                left: 0 < i.left ? "0" : -1 * e + "px"
            })
        }
        function a(t, e) {
            var i = v(".photo", o)
              , n = v(".embed", o);
            o.toggleClass("is-photo", !e).toggleClass("is-embed", e),
            e ? (i.attr("src", ""),
            n.attr("src") !== t && n.attr("src", t),
            o.removeClass("is-error").removeClass("is-loading")) : (n.attr("src", ""),
            i.attr("src") !== t ? (i.attr("src", ""),
            o.removeClass("is-error").addClass("is-loading"),
            i.attr("src", t)) : o.removeClass("is-error").removeClass("is-loading"))
        }
    })
}(jQuery, window.app),
function(i, n) {
    n.on("dom:ready", function(t) {
        var e = i("#flat-contact", t);
        0 !== e.length && i(".flat-contact-form", e).ajaxForm().on(i.ajaxForm.DONE, function() {
            n.trackEvent("Contact"),
            n.trackFbEvent("Contact")
        })
    })
}(jQuery, window.app),
function(n) {
    window.app.on("dom:ready", function(t) {
        var e = n("#flat-help", t);
        if (0 !== e.length) {
            var i = n(".flat-help-faq", e);
            n("> .section > .heading", i).on("click", function() {
                n(this).closest(".section").toggleClass("is-visible")
            }).css("cursor", "pointer")
        }
    })
}(jQuery),
function(P, _) {
    _.on("dom:ready", function(t) {
        var e = P("#flat-home", t);
        if (0 !== e.length) {
            var n, i, o, s, r, a, l, c, u, d, h, f, p, g, m, v, y = P(".flat-home-header", e), b = P("#flat-home-header-form", y), w = P(".flat-home-intro > .inner > .slideshow", e), x = P(".flat-home-featured > .inner", e), k = P(".flat-home-destinations > .list", e), C = P(".flat-home-why > .inner > .blocks", e), E = P("#flat-home-media-dialog");
            o = P("> .fieldset", n = b),
            s = {
                destination: P("> .filters > .filter.is-destination", o),
                theme: P("> .filters > .filter.is-theme", o)
            },
            r = P("> .filters > .filter.is-keyword", o),
            a = P("> .suggestions", r),
            l = new PerfectScrollbar(a[0]),
            c = P(".flat-home-header-form-counter", n),
            u = P(".responsive-showform > .link", n),
            d = P(".responsive-hideform > .link", n),
            h = {
                xhr: null,
                last_search: null,
                cache: {}
            },
            P(document).on("click", function(t) {
                var e = P(t.target);
                0 < e.closest(n).length ? 0 < e.closest(r).length && 0 < e.closest(".main > .icon").length && window.matchMedia("(min-width: " + _.config.breakpoints.large + "px)").matches && S() : S(!1)
            }),
            P("> .main > input", r).on("keyup change", function(t) {
                t.stopPropagation();
                var e = P(this).val().trim();
                P.debounce(200, function() {
                    3 <= e.length ? (a.addClass("is-visible"),
                    function(e) {
                        if (e !== h.last_search) {
                            h.last_search = e;
                            var o = _.getDict();
                            h.cache[e] ? i(h.cache[e]) : (a.html('<li class="item is-loading">' + o.flat.home.header_form_suggestions.loading + "</li>"),
                            l.update(),
                            h.xhr && h.xhr.abort(),
                            h.xhr = P.ajax({
                                method: "post",
                                url: n.attr("action"),
                                dataType: "json",
                                data: {
                                    action: "suggestions",
                                    keywords: e
                                }
                            }).always(function() {
                                h.xhr = null,
                                h.last_search = null
                            }).fail(function(t, e, i) {
                                "abort" !== i && (a.html('<li class="item is-error">' + o.flat.home.header_form_suggestions.error + "</li>"),
                                l.update())
                            }).done(function(t) {
                                i(h.cache[e] = t)
                            }))
                        }
                        function i(i) {
                            var n = "";
                            P.each(["destinations", "themes", "tours"], function(t, e) {
                                Array.isArray(i[e]) && 0 < i[e].length && (n += '<li class="item is-category">' + o.flat.home.header_form_suggestions[e][1 < i[e].length ? "plural" : "singular"] + "</li>",
                                P.each(i[e], function(t, e) {
                                    n += '<li class="item is-suggestion"><a class="link" href="' + e.url + '">' + e.name + "</a></li>"
                                }))
                            }),
                            0 === n.length && (n = '<li class="item is-empty">' + o.flat.home.header_form_suggestions.empty + "</li>"),
                            a.html(n),
                            l.update()
                        }
                    }(e)) : a.removeClass("is-visible")
                })()
            }),
            n.on("change", function() {
                n.addClass("is-loading"),
                P.ajax({
                    method: "post",
                    url: n.attr("action"),
                    dataType: "json",
                    data: n.serialize() + "&action=count"
                }).always(function() {
                    n.removeClass("is-loading")
                }).done(function(r) {
                    var t = _.getDict().flat.home.header_form_counter[1 < r.count ? "plural" : "singular"].replace("{0}", r.count);
                    P.each(s, function(t, e) {
                        var o = t + "s";
                        if (e.hasClass("is-xselect")) {
                            var i = P(".front-components-x-select-option", e);
                            o in r.options ? i.each(function(t, e) {
                                var i = P(e)
                                  , n = i.attr("data-value");
                                i.toggleClass("is-disabled", !(n in r.options[o]))
                            }) : i.removeClass("is-disabled")
                        }
                    }),
                    c.text(t),
                    i = r.url
                })
            }),
            n.on("submit", function(t) {
                i && (t.preventDefault(),
                _.reroute(i))
            }),
            u.on("click", function() {
                y.addClass("is-active"),
                _.trigger("flat-home-responsive-showform", !0)
            }),
            d.on("click", function() {
                y.removeClass("is-active"),
                _.trigger("flat-home-responsive-showform", !1)
            }),
            P(window).on("resize", P.debounce(100, function() {
                window.matchMedia("(min-width: " + _.config.breakpoints.large + "px)").matches ? y.hasClass("is-active") && (y.removeClass("is-active"),
                _.trigger("flat-home-responsive-showform", !1)) : S(!1)
            })),
            n.addClass("is-ready"),
            P("> .list", w).flickity({
                adaptiveHeight: !0,
                prevNextButtons: !1,
                pageDots: !0
            }).captureImgLoad(function() {
                P(this).flickity("resize")
            }),
            P(".flat-home-featured-tour", x).megalink({
                selector: ".heading > .link",
                skipAndProxy: ".photo"
            }),
            p = P("> .list", x),
            g = P("> .actions", x),
            m = P("> .action-prev", g),
            v = P("> .action-next", g),
            p.on("select.flickity", D),
            m.on("click", function() {
                f && p.flickity("previous")
            }),
            v.on("click", function() {
                f && p.flickity("next")
            }),
            p.captureImgLoad(function() {
                f && f.resize()
            }),
            P(window).on("resize", P.debounce(100, M)),
            M(),
            k.flickity({
                wrapAround: !0,
                adaptiveHeight: !0,
                prevNextButtons: !1,
                pageDots: !1
            }).captureImgLoad(function() {
                P(this).flickity("resize")
            }),
            1 < k.data("flickity").slides.length && (k.on("click", ".action-prev", function() {
                k.flickity("previous")
            }).on("click", ".action-next", function() {
                k.flickity("next")
            }),
            P(".actions", k).addClass("is-visible")),
            function() {
                var t = P("> .list", C)
                  , e = P("> .actions", C);
                t.flickity({
                    adaptiveHeight: !0,
                    cellAlign: "left",
                    groupCells: !0,
                    prevNextButtons: !1,
                    pageDots: !1
                }).captureImgLoad(function() {
                    P(this).flickity("resize")
                });
                var i = t.data("flickity");
                if (1 < i.slides.length) {
                    function n() {
                        P("> .action-prev", e).toggleClass("is-disabled", i.selectedIndex < 1),
                        P("> .action-next", e).toggleClass("is-disabled", i.selectedIndex >= i.slides.length - 1)
                    }
                    t.on("select.flickity", n),
                    n(),
                    e.on("click", ".action-prev", function() {
                        t.flickity("previous")
                    }).on("click", ".action-next", function() {
                        t.flickity("next")
                    }),
                    e.addClass("is-visible")
                }
            }(),
            E.on(P.dialog.OPEN, function(t, e) {
                var i = P(e);
                i.is("[data-photo]") ? T(i.attr("data-photo"), !1) : i.is("[data-embed]") && T(i.attr("data-embed"), !0)
            }),
            E.on(P.dialog.CLOSE, function() {
                P(".embed", E).attr("src", "")
            }),
            P("img", E).on("load error", function(t) {
                E.removeClass("is-loading"),
                "error" === t.type && E.addClass("is-error")
            })
        }
        function S(t) {
            var e = "has-keyword-expanded";
            return "boolean" != typeof t && (t = !o.hasClass(e)),
            o.toggleClass(e, t),
            a.removeClass("is-visible"),
            t && P("input", r).focus().val(""),
            t
        }
        function D() {
            f && m.toggleClass("is-disabled", f.selectedIndex < 1),
            f && v.toggleClass("is-disabled", f.selectedIndex >= f.slides.length - 1)
        }
        function M() {
            var t = {
                adaptiveHeight: !0,
                prevNextButtons: !1,
                pageDots: !1
            };
            window.matchMedia("(min-width: " + _.config.breakpoints.medium + "px)").matches && (t.groupCells = 2),
            window.matchMedia("(min-width: " + _.config.breakpoints.large + "px)").matches && (t.groupCells = 4),
            f && (p.flickity("destroy"),
            f = null),
            p.flickity(t),
            1 < (f = p.data("flickity")).slides.length ? (D(),
            g.addClass("is-visible")) : g.removeClass("is-visible")
        }
        function T(t, e) {
            var i = P(".photo", E)
              , n = P(".embed", E);
            E.toggleClass("is-photo", !e).toggleClass("is-embed", e),
            e ? (i.attr("src", ""),
            n.attr("src") !== t && n.attr("src", t),
            E.removeClass("is-error").removeClass("is-loading")) : (n.attr("src", ""),
            i.attr("src") !== t ? (i.attr("src", ""),
            E.removeClass("is-error").addClass("is-loading"),
            i.attr("src", t)) : E.removeClass("is-error").removeClass("is-loading"))
        }
    })
}(jQuery, window.app),
function(i) {
    window.app.on("dom:ready", function(t) {
        var e = i("#flat-inspiration", t);
        0 !== e.length && i(".flat-inspiration-nav-item", e).megalink({
            selector: ".heading > .link",
            skipAndProxy: ".photo, .text"
        })
    })
}(jQuery),
function(a) {
    window.app.on("dom:ready", function(t) {
        var e = a("#flat-landingpage", t);
        if (0 !== e.length) {
            var i = a(".flat-landingpage-destinations", e)
              , o = a("> .inner > .others", i)
              , r = a(".flat-landingpage-experts > .inner > .slideshow", e)
              , n = a(".flat-landingpage-agencies", e)
              , s = a(".flat-landingpage-why > .inner > .blocks", e);
            a(".destination", i).megalink({
                selector: ".heading > .link",
                skipAndProxy: ".photo, .heading"
            }),
            0 < o.length && function() {
                var t = a("> .list", o)
                  , e = a("> .actions", o);
                t.flickity({
                    adaptiveHeight: !0,
                    cellAlign: "left",
                    groupCells: !0,
                    prevNextButtons: !1,
                    pageDots: !1
                }).captureImgLoad(function() {
                    t.flickity("resize")
                });
                var i = t.data("flickity");
                if (1 < i.slides.length) {
                    function n() {
                        a("> .action-prev", e).toggleClass("is-disabled", i.selectedIndex < 1),
                        a("> .action-next", e).toggleClass("is-disabled", i.selectedIndex >= i.slides.length - 1)
                    }
                    t.on("select.flickity", n),
                    n(),
                    e.on("click", ".action-prev", function() {
                        t.flickity("previous")
                    }).on("click", ".action-next", function() {
                        t.flickity("next")
                    }),
                    e.addClass("is-visible")
                }
            }(),
            0 < r.length && function() {
                var t = a("> .list", r)
                  , e = a("> .actions", r);
                t.flickity({
                    adaptiveHeight: !0,
                    cellAlign: "left",
                    groupCells: !0,
                    prevNextButtons: !1,
                    pageDots: !1
                }).captureImgLoad(function() {
                    t.flickity("resize")
                });
                var i = t.data("flickity");
                if (1 < i.slides.length) {
                    function n() {
                        a("> .action-prev", e).toggleClass("is-disabled", i.selectedIndex < 1),
                        a("> .action-next", e).toggleClass("is-disabled", i.selectedIndex >= i.slides.length - 1)
                    }
                    t.on("select.flickity", n),
                    n(),
                    e.on("click", ".action-prev", function() {
                        t.flickity("previous")
                    }).on("click", ".action-next", function() {
                        t.flickity("next")
                    }),
                    e.addClass("is-visible")
                }
            }(),
            a(".item", n).megalink({
                selector: ".heading > .link",
                skipAndProxy: ".photo, .heading"
            }),
            function() {
                var t = a("> .list", s)
                  , e = a("> .actions", s);
                t.flickity({
                    adaptiveHeight: !0,
                    cellAlign: "left",
                    groupCells: !0,
                    prevNextButtons: !1,
                    pageDots: !1
                }).captureImgLoad(function() {
                    t.flickity("resize")
                });
                var i = t.data("flickity");
                if (1 < i.slides.length) {
                    function n() {
                        a("> .action-prev", e).toggleClass("is-disabled", i.selectedIndex < 1),
                        a("> .action-next", e).toggleClass("is-disabled", i.selectedIndex >= i.slides.length - 1)
                    }
                    t.on("select.flickity", n),
                    n(),
                    e.on("click", ".action-prev", function() {
                        t.flickity("previous")
                    }).on("click", ".action-next", function() {
                        t.flickity("next")
                    }),
                    e.addClass("is-visible")
                }
            }()
        }
    })
}(jQuery),
function(r, i) {
    i.on("dom:ready", function(t) {
        var e = r("#flat-request", t);
        0 !== e.length && r(".flat-request-content-form", e).ajaxForm({
            findTarget: function(t, e, i) {
                var n, o = i(t, e);
                return 0 === o.length && 0 < (o = r(t, e)).length && 0 < (n = o.closest(".xdate")).length && (o = n),
                o
            }
        }).on(r.ajaxForm.DONE, function() {
            i.trackEvent("Lead"),
            i.trackFbEvent("Lead")
        })
    })
}(jQuery, window.app),
function(n) {
    window.app.on("dom:ready", function(t) {
        if (0 !== n("#flat-search", t).length && window.history && window.history.replaceState) {
            var e = window.location.hash;
            if (history.replaceState(null, document.title, window.location.href.replace(/\?.*$/, "")),
            e) {
                var i = n(e);
                0 < i.length && window.scrollTo(0, i.offset().top)
            }
        }
    })
}(jQuery),
function(r, n) {
    n.on("dom:ready", function(t) {
        var e = r("#flat-selection", t);
        if (0 !== e.length) {
            var o = {};
            r(".travel-search-engine-result", e).each(function(t, e) {
                var i = r(e)
                  , n = r(".action-select", i).attr("data-id");
                o[n] = i
            });
            var i = [];
            r.each(n.getSelectedTours(), function(t, e) {
                e in o || i.push(e)
            }),
            r.each(i, function(t, e) {
                n.deselectTour(e)
            }),
            n.on("app:deselect-tour", function(t) {
                o[t].css("opacity", "0.25")
            }),
            n.on("app:select-tour", function(t) {
                o[t].css("opacity", "")
            })
        }
    })
}(jQuery, window.app),
function(h, f) {
    f.on("dom:ready", function(t) {
        var e = h("#flat-team", t);
        if (0 !== e.length) {
            var d = ".flat_team"
              , o = h(".flat-team-agencies", e);
            h(".flat-team-grid", e).each(function(t, e) {
                var r, i = h(e), s = h("> .block", i), o = 0, a = i.siblings(".flat-team-grid-actions"), l = h(".action-prev", a), c = h(".action-next", a);
                function n() {
                    if (r = window.matchMedia("(min-width: " + f.config.breakpoints.large + "px)").matches ? {
                        visibleBlocks: 12,
                        pages: {
                            current: 1,
                            max: Math.ceil(o / 12)
                        }
                    } : window.matchMedia("(min-width: " + f.config.breakpoints.medium + "px)").matches ? {
                        visibleBlocks: 9,
                        pages: {
                            current: 1,
                            max: Math.ceil(o / 9)
                        }
                    } : window.matchMedia("(min-width: " + f.config.breakpoints.small + "px)").matches ? {
                        visibleBlocks: 4,
                        pages: {
                            current: 1,
                            max: Math.ceil(o / 4)
                        }
                    } : null) {
                        var n = 0;
                        s.each(function(t, e) {
                            var i = h(e);
                            n += i.hasClass("is-2x1") ? 2 : 1,
                            i.toggle(n <= r.visibleBlocks)
                        }),
                        a.toggle(1 < r.pages.max),
                        u(1)
                    } else
                        s.show(),
                        a.hide()
                }
                function u(n) {
                    if (r && 1 <= n && n <= r.pages.max) {
                        var o = 0;
                        s.each(function(t, e) {
                            var i = h(e);
                            o += i.hasClass("is-2x1") ? 2 : 1,
                            i.toggle(Math.ceil(o / r.visibleBlocks) === n)
                        }),
                        r.pages.current = n,
                        l.toggleClass("is-disabled", r.pages.current < 2),
                        c.toggleClass("is-disabled", r.pages.current >= r.pages.max)
                    }
                }
                s.each(function(t, e) {
                    o += h(e).hasClass("is-2x1") ? 2 : 1
                }),
                l.on("click", function() {
                    u(r.pages.current - 1)
                }),
                c.on("click", function() {
                    u(r.pages.current + 1)
                }),
                i.on("reset" + d, function() {
                    u(1)
                }),
                h(window).on("resize", h.debounce(100, n)),
                n()
            }),
            h(".action-member", e).on("click", function() {
                var t = h(this)
                  , e = h('<section id="flat-team-member-dialog" class="flat-team-member-dialog dialog is-modal"></section>').appendTo("body");
                h.ajax({
                    method: "get",
                    url: t.attr("data-url"),
                    dataType: "html"
                }).done(function(t) {
                    e.html(t),
                    f.trigger("dom:ready", e)
                }),
                e.on(h.dialog.CLOSE, function() {
                    e.remove()
                }).dialog("show")
            }),
            h("> .filter", o).on("change", function() {
                var t = h(this)
                  , n = h('[name="destination"]', t).val()
                  , e = h("> .grid", o)
                  , i = h("> .actions", o);
                0 < n.length ? (e.children(".block").each(function(t, e) {
                    var i = h(e);
                    i.toggle(0 <= i.attr("data-destinations").split(",").indexOf(n))
                }),
                i.hide()) : (e.trigger("reset" + d),
                i.show())
            })
        }
    })
}(jQuery, window.app),
function(a) {
    window.app.on("dom:ready", function(t) {
        var e = a("#flat-teammember", t);
        if (0 !== e.length) {
            var r = a("> .places", e)
              , s = a("> .list", r)
              , o = a("#flat-teammember-media-dialog");
            1 < s.children().length && function() {
                var t = a("> .actions", r)
                  , e = a("> .action-prev", t)
                  , i = a("> .action-next", t);
                s.flickity({
                    adaptiveHeight: !0,
                    prevNextButtons: !1,
                    pageDots: !1
                }).captureImgLoad(function() {
                    s.flickity("resize")
                });
                var n = s.data("flickity");
                if (1 < n.slides.length) {
                    function o() {
                        e.toggleClass("is-disabled", n.selectedIndex < 1),
                        i.toggleClass("is-disabled", n.selectedIndex >= n.slides.length - 1)
                    }
                    s.on("select.flickity", o),
                    o(),
                    e.on("click", function() {
                        s.flickity("previous")
                    }),
                    i.on("click", function() {
                        s.flickity("next")
                    }),
                    t.addClass("is-visible")
                }
            }(),
            o.on(a.dialog.OPEN, function(t, e) {
                var i = a(e);
                i.is("[data-photo]") ? n(i.attr("data-photo"), !1) : i.is("[data-embed]") && n(i.attr("data-embed"), !0)
            }),
            o.on(a.dialog.CLOSE, function() {
                a(".embed", o).attr("src", "")
            }),
            a("img", o).on("load error", function(t) {
                o.removeClass("is-loading"),
                "error" === t.type && o.addClass("is-error")
            })
        }
        function n(t, e) {
            var i = a(".photo", o)
              , n = a(".embed", o);
            o.toggleClass("is-photo", !e).toggleClass("is-embed", e),
            e ? (i.attr("src", ""),
            n.attr("src") !== t && n.attr("src", t),
            o.removeClass("is-error").removeClass("is-loading")) : (n.attr("src", ""),
            i.attr("src") !== t ? (i.attr("src", ""),
            o.removeClass("is-error").addClass("is-loading"),
            i.attr("src", t)) : o.removeClass("is-error").removeClass("is-loading"))
        }
    })
}(jQuery),
function(n) {
    window.app.on("dom:ready", function(t) {
        var e = n("#front-announcement");
        if (0 !== e.length) {
            var i = e.attr("data-token");
            n(".front-announcement-close", e).on("click", function() {
                e.removeClass("visible")
            }),
            Cookies.get("announcement") !== i && (Cookies.set("announcement", i, {
                expires: new Date((new Date).getTime() + 36e5)
            }),
            e.addClass("visible"))
        }
    })
}(jQuery),
function(m, v) {
    v.on("dom:ready", function(t) {
        var s = m("#front-banner", t);
        if (0 !== s.length) {
            var e = m(".front-banner-menu", s)
              , o = m(".front-banner-menu-item", e)
              , r = m(".front-banner-submenu", s)
              , i = r.filter("#front-banner-submenu-destinations")
              , n = r.filter("#front-banner-submenu-themes")
              , a = m("> .destinations > .destination", i)
              , l = m("> .subdestinations", i)
              , c = m("> .worldmap", i)
              , u = m(".front-banner-quicklinks-like", s)
              , d = m(".front-banner-quicklinks-currencies", s)
              , h = m(".front-banner-responsive-menulink", s);
            m.ajax({
                method: "get",
                url: c.attr("data-url"),
                dataType: "html"
            }).done(function(t) {
                c.html(t)
            }),
            g(),
            v.on("app:select-tour app:deselect-tour", g),
            m(".action-toggle", d).on("click", function(t) {
                t.preventDefault(),
                d.toggleClass("is-active")
            }),
            m(".action-select", d).on("click", function(t) {
                t.preventDefault();
                var e = m(this).attr("data-code")
                  , i = m('<form action="' + d.attr("data-url") + '" method="post"></form>');
                i.append('<input type="hidden" name="code" value="' + e + '"/>'),
                i.append('<input type="hidden" name="target" value="' + window.location.href + '"/>'),
                i.appendTo("body").submit()
            }),
            h.on("click", function(t) {
                t.preventDefault();
                var e = !s.hasClass("is-active");
                s.toggleClass("is-active", e),
                e && (f(null, !1),
                p(null, !1))
            }),
            m(window).on("resize", m.debounce(100, function() {
                window.matchMedia("(min-width: " + v.config.breakpoints.visible_menu + "px)").matches && s.removeClass("is-active")
            })),
            m("> .link", o.filter(".has-submenu")).on("click", function(t) {
                t.preventDefault(),
                f(m(this).closest(".item"))
            }),
            m(".destination > .link", i).on("click", function(t) {
                t.preventDefault(),
                p(m(this).closest(".destination"))
            }),
            c.on("click", ".region", function(t) {
                t.preventDefault();
                var e = m(this).attr("id").replace(/^worldmap-/, "");
                p(a.filter(function() {
                    return 0 <= m(this).attr("data-regions").split(",").indexOf(e)
                }))
            }),
            m(".theme > .tip", n).on(m.hovertip.SHOW, function() {
                var t = m(this)
                  , e = t.data("position")
                  , i = t.parent(".theme")
                  , n = t.width()
                  , o = i.width()
                  , r = i.offset()
                  , s = Math.min(window.innerWidth - m.scrollbar.getWidth() - r.left - n, Math.max(-1 * r.left, Math.round((n - o) / -2)));
                t.css("transform", "translate(" + s + "px," + ("top" === e ? "-100%" : "0") + ")")
            })
        }
        function f(t, e) {
            var i = "is-active";
            if (t && "boolean" != typeof e && (e = !t.hasClass(i)),
            o.removeClass(i).toggleClass("is-hidden", e),
            r.removeClass("is-visible"),
            s.toggleClass("has-active-submenu", e),
            t) {
                var n = m(m("> .link", t).attr("href"), s);
                t.removeClass("is-hidden").toggleClass(i, e),
                n.toggleClass("is-visible", e)
            }
            return e
        }
        function p(t, e) {
            var i = "is-active"
              , n = m("> svg > .region", c);
            if (t && "boolean" != typeof e && (e = !t.hasClass(i)),
            a.removeClass(i),
            l.removeClass("is-visible"),
            n.removeClass("is-active"),
            t) {
                var o = m(m("> .link", t).attr("href"), s)
                  , r = n.filter(t.attr("data-regions").split(",").map(function(t) {
                    return "#worldmap-" + t
                }).join(","));
                t.toggleClass(i, e),
                o.toggleClass("is-visible", e),
                r.toggleClass("is-active", e)
            }
            return e
        }
        function g() {
            var t = m("> .counter", u)
              , e = v.getSelectedTours().length;
            t.attr("data-counter", e).toggleClass("is-active", 0 < e)
        }
    })
}(jQuery, window.app),
function(a, t) {
    var o = {
        dataKey: "x-date",
        rootSelector: ".front-components-x-date"
    }
      , u = {
        dayStart: 1,
        format: "DD/MM/YYYY",
        year: {
            min: 1900,
            max: 2050
        }
    }
      , d = {
        main: function(t) {
            return a("> .main", t)
        },
        mainInput: function(t) {
            return a('> .main > [type="hidden"]', t)
        },
        mainValue: function(t) {
            return a("> .main > .value", t)
        },
        selectorCalendar: function(t) {
            return a("> .selector > .calendar", t)
        },
        selectorNav: function(t) {
            return a("> .selector > .nav", t)
        }
    };
    function h(t) {
        return a.extend({
            selectedDate: null,
            calendarDate: null,
            emptyVal: ""
        }, t.data(o.dataKey))
    }
    function r(t, e) {
        t.data(o.dataKey, a.extend({
            selectedDate: null,
            calendarDate: null,
            emptyVal: ""
        }, e))
    }
    function n(t, e, i) {
        var n = h(t);
        i || e && e.isValid() && !e.isSame(n.selectedDate) || (e = null),
        d.mainInput(t).val(e ? e.format(u.format) : ""),
        d.mainValue(t).text(e ? e.format(u.format) : n.emptyVal),
        n.selectedDate = e,
        r(t, n)
    }
    function s(t) {
        var e = h(t);
        e.calendarDate = (e.selectedDate || dayjs()).startOf("month"),
        r(t, e)
    }
    function f(t) {
        var e, i = d.selectorNav(t), n = "";
        for (e = u.year.min; e <= u.year.max; e++)
            n += '<option value="' + e + '">' + e + "</option>";
        a("> .period > .year", i).html(n)
    }
    function p(t) {
        return (t.day() - u.dayStart + 7) % 7
    }
    function l(t) {
        var e, i, n = h(t), o = d.selectorCalendar(t).children(".week"), r = d.selectorNav(t).children(".period"), s = n.calendarDate.startOf("month"), a = parseInt(s.format("YYYY"), 10), l = s, c = 0;
        for (e = (l = l.add(-1 * p(l), "day")).add(41, "day"),
        i = l; 0 <= e.diff(i, "day"); )
            o.eq(c).children().eq(p(i)).text(i.format("D")).data("date", i).toggleClass("is-selected", i.isSame(n.selectedDate)).toggleClass("is-other-month", i.month() !== s.month()),
            0 !== p(i = i.add(1, "day")) || i.isSame(l) || c++;
        r.children(".month").text(s.format("MMMM")),
        (a < u.year.min || a > u.year.max) && (u.year.min = Math.min(u.year.min, a),
        u.year.max = Math.max(u.year.max, a),
        f(t)),
        r.children(".year").val(a)
    }
    t.on("dom:ready", function(t) {
        var e = a(o.rootSelector, t);
        0 !== e.length && e.each(function(t, e) {
            var i = a(e);
            i.on("focusout", function(t) {
                var e = a(this);
                e.is(":focus-within") || e.removeClass("is-active")
            }),
            i.on("keydown", function(t) {
                var e = a(this);
                switch (t.keyCode || t.which) {
                case a.keycodes.enter:
                case a.keycodes.space:
                    t.preventDefault(),
                    e.toggleClass("is-active")
                }
            }),
            d.main(i).on("click", function(t) {
                a(this).closest(o.rootSelector).toggleClass("is-active")
            }),
            d.selectorNav(i).on("click", ".link", function(t) {
                t.preventDefault();
                var e = a(this)
                  , i = e.closest(o.rootSelector)
                  , n = h(i);
                e.is(".is-prev") ? n.calendarDate = n.calendarDate.add(-1, "month") : e.is(".is-next") && (n.calendarDate = n.calendarDate.add(1, "month")),
                r(i, n),
                l(i)
            }).on("change", ".year", function(t) {
                var e = a(this)
                  , i = e.closest(o.rootSelector)
                  , n = h(i);
                n.calendarDate = n.calendarDate.year(e.val()),
                r(i, n),
                l(i)
            }),
            d.selectorCalendar(i).on("click", ".day", function(t) {
                t.preventDefault();
                var e = a(this)
                  , i = e.closest(o.rootSelector);
                n(i, e.data("date")),
                l(i),
                i.trigger("change").removeClass("is-active")
            }),
            d.mainInput(i).on("change", function() {
                var t = a(this)
                  , e = t.closest(o.rootSelector);
                n(e, dayjs(t.val())),
                s(e),
                l(e)
            }),
            function(t) {
                var e = h(t);
                e.emptyVal = d.mainValue(t).text(),
                r(t, e),
                n(t, dayjs(d.mainInput(t).val())),
                s(t)
            }(i),
            function(t) {
                var e, i, n, o, r = d.selectorCalendar(t), s = a('<div class="header"></div>').appendTo(r);
                for (n = dayjs().day(u.dayStart),
                e = 0; e < 7; e++)
                    s.append('<span class="label">' + n.format("ddd").replace(/\.$/, "") + "</th>"),
                    n = n.add(1, "day");
                for (i = 0; i < 6; i++) {
                    for (o = a('<div class="week"></tr>'),
                    e = 0; e < 7; e++)
                        o.append('<span class="day"></td>');
                    r.append(o)
                }
            }(i),
            f(i),
            l(i)
        })
    })
}(jQuery, window.app),
function(s, t) {
    var n = {
        dataKey: "x-month",
        rootSelector: ".front-components-x-month"
    }
      , o = {
        main: function(t) {
            return s("> .main", t)
        },
        mainInput: function(t) {
            return s('> .main > [type="hidden"]', t)
        },
        mainValue: function(t) {
            return s("> .main > .value", t)
        },
        selectorCalendar: function(t) {
            return s("> .selector > .calendar", t)
        },
        selectorCalendarMonths: function(t) {
            return s("> .selector > .calendar > .row > .month", t)
        }
    };
    function a(t) {
        return s.extend({
            monthLabels: {},
            selectedMonths: [],
            emptyVal: ""
        }, t.data(n.dataKey))
    }
    function l(t, e) {
        t.data(n.dataKey, s.extend({
            monthLabels: {},
            selectedMonths: [],
            emptyVal: ""
        }, e))
    }
    function c(t) {
        var i = [];
        return s.each(t.split(","), function(t, e) {
            1 <= (e = parseInt(e.trim()) || 0) && e <= 12 && i.push(e)
        }),
        i
    }
    function u(t, e) {
        var n = a(t)
          , i = n.selectedMonths.indexOf(e);
        0 <= i ? n.selectedMonths.splice(i, 1) : 1 <= e && e <= 12 && n.selectedMonths.push(e),
        n.selectedMonths.sort(function(t, e) {
            return t - e
        }),
        o.mainInput(t).val(n.selectedMonths.join(",")),
        o.mainValue(t).text(n.selectedMonths.map(function(t) {
            return n.monthLabels[t]
        }).join(" / ") || n.emptyVal),
        o.selectorCalendarMonths(t).each(function(t, e) {
            var i = s(e);
            i.toggleClass("is-selected", 0 <= n.selectedMonths.indexOf(i.data("month")))
        }),
        l(t, n)
    }
    t.on("dom:ready", function(t) {
        var e = s(n.rootSelector, t);
        0 !== e.length && e.each(function(t, e) {
            var i = s(e);
            i.on("focusout", function(t) {
                var e = s(this);
                e.is(":focus-within") || e.removeClass("is-active")
            }),
            i.on("keydown", function(t) {
                var e = s(this);
                switch (t.keyCode || t.which) {
                case s.keycodes.enter:
                case s.keycodes.space:
                    t.preventDefault(),
                    e.toggleClass("is-active")
                }
            }),
            o.main(i).on("click", function(t) {
                s(this).closest(n.rootSelector).toggleClass("is-active")
            }),
            o.selectorCalendar(i).on("click", ".month", function(t) {
                t.preventDefault();
                var e = s(this)
                  , i = e.closest(n.rootSelector);
                u(i, e.data("month")),
                i.trigger("change").removeClass("is-active")
            }),
            o.mainInput(i).on("change", function() {
                var t = s(this)
                  , i = t.closest(n.rootSelector);
                s.each(c(t.val()), function(t, e) {
                    u(i, e)
                })
            }),
            function(i) {
                var r = a(i);
                r.emptyVal = o.mainValue(i).text(),
                o.selectorCalendarMonths(i).each(function(t, e) {
                    var i = s(e)
                      , n = i.data("month")
                      , o = s("> .label", i).text();
                    r.monthLabels[n] = o
                }),
                l(i, r),
                s.each(c(o.mainInput(i).val()), function(t, e) {
                    u(i, e)
                })
            }(i)
        })
    })
}(jQuery, window.app),
function(f) {
    window.app.on("dom:ready", function(t) {
        var e = f(".front-components-x-select", t);
        0 !== e.length && e.each(function(t, e) {
            var i, n = f(e), o = n.children(".main"), r = o.children('[type="hidden"]'), s = o.children(".value"), a = s.text(), l = n.children(".selector"), c = f("> .search > input", l), u = l.children(".options");
            function d() {
                var n, t = c.val().trim();
                0 < t.length ? (n = new RegExp(RegExp.quote(t),"i"),
                u.children().each(function(t, e) {
                    var i = f(e);
                    i.toggleClass("is-hidden", !n.test(i.text()))
                })) : u.children().removeClass("is-hidden"),
                i.update()
            }
            function h(t) {
                var e = "is-active";
                "boolean" != typeof t && (t = !n.hasClass(e)),
                n.toggleClass(e, t),
                t && (i.update(),
                c.val("").focus(),
                d())
            }
            i = new PerfectScrollbar(u[0]),
            n.on("focusout", function() {
                n.is(":focus-within") || h(!1)
            }),
            n.on("keydown", function(t) {
                if (!c.is(t.target))
                    switch (t.keyCode || t.which) {
                    case f.keycodes.enter:
                    case f.keycodes.space:
                        t.preventDefault(),
                        h()
                    }
            }),
            o.on("click", h),
            c.on("keyup change", function(t) {
                t.stopPropagation(),
                d()
            }),
            u.on("click", ".front-components-x-select-option", function() {
                var t = f(this)
                  , e = t.attr("data-value");
                u.children().removeClass("is-selected"),
                e !== r.val() ? (r.val(e),
                s.text(f("> .label", t).text()),
                t.addClass("is-selected")) : (r.val(""),
                s.text(a)),
                n.trigger("change"),
                h(!1)
            }),
            function() {
                var t, e = r.val();
                if (0 < e.length && 1 === (t = u.children('[data-value="' + e + '"]')).length)
                    return t.addClass("is-selected"),
                    s.text(f("> .label", t).text());
                r.val("")
            }()
        })
    })
}(jQuery),

function(a) {
    window.app.on("dom:ready", function(t) {
        var e = a(".front-inspiration-carousel", t);
        0 !== e.length && e.each(function(t, e) {
            var i = a(e)
              , n = a("> .inner > .list", i)
              , o = a("> .inner > .actions", i);
            n.flickity({
                adaptiveHeight: !0,
                cellAlign: "left",
                groupCells: !0,
                prevNextButtons: !1,
                pageDots: !1
            }).captureImgLoad(function() {
                n.flickity("resize")
            });
            var r = n.data("flickity");
            if (1 < r.slides.length) {
                function s() {
                    a("> .action-prev", o).toggleClass("is-disabled", r.selectedIndex < 1),
                    a("> .action-next", o).toggleClass("is-disabled", r.selectedIndex >= r.slides.length - 1)
                }
                n.on("select.flickity", s),
                s(),
                o.on("click", ".action-prev", function() {
                    n.flickity("previous")
                }).on("click", ".action-next", function() {
                    n.flickity("next")
                }),
                o.addClass("is-visible")
            }
            a(".tour", i).megalink({
                selector: ".heading > .link",
                skipAndProxy: ".photo"
            })
        })
    })
}(jQuery),
function(i) {
    window.app.on("dom:ready", function(t) {
        var e = i("#front-latest-posts", t);
        0 !== e.length && i(".front-latest-posts-item", e).megalink({
            selector: ".heading > .link",
            skipAndProxy: ".photo"
        })
    })
}(jQuery),
function(o) {
    window.app.on("dom:ready", function(t) {
        var e = o(".hovertip", t);
        0 !== e.length && e.each(function(t, e) {
            var i = o(e)
              , n = {
                content: i.attr("data-hovertip-content")
            };
            i.is("[data-hovertip-touch]") && (n = o.extend(n, {
                touch: "1" === i.attr("data-hovertip-touch")
            })),
            i.hovertip(n)
        })
    })
}(jQuery),
function(d, h) {
    h.on("dom:ready", function(t) {
        var e = d("#team-agency", t);
        if (0 !== e.length) {
            var n, i, o = d(".team-agency-themes > .inner > .list", e), r = d(".team-agency-team > .inner > .grid", e), s = d("#team-agency-photos", e), a = d("> .list", s), l = d("#team-agency-media-dialog");
            d("> .theme > .tip", o).on(d.hovertip.SHOW, function() {
                var t = d(this)
                  , e = t.data("position")
                  , i = t.parent(".theme")
                  , n = t.width()
                  , o = i.width()
                  , r = i.offset()
                  , s = Math.min(window.innerWidth - d.scrollbar.getWidth() - r.left - n, Math.max(-1 * r.left, Math.round((n - o) / -2)));
                t.css("transform", "translate(" + s + "px," + ("top" === e ? "-100%" : "0") + ")")
            }),
            function(t) {
                if (0 !== t.length) {
                    var r, e = d("> .block", t), i = e.length, o = t.siblings(".actions"), s = d(".action-prev", o), a = d(".action-next", o);
                    s.on("click", function() {
                        r && l(r.pages.current - 1)
                    }),
                    a.on("click", function() {
                        r && l(r.pages.current + 1)
                    }),
                    d(window).on("resize", d.debounce(100, n)),
                    n()
                }
                function n() {
                    if (r = window.matchMedia("(min-width: " + h.config.breakpoints.large + "px)").matches ? {
                        visibleBlocks: 12,
                        pages: {
                            current: 1,
                            max: Math.ceil(i / 12)
                        }
                    } : window.matchMedia("(min-width: " + h.config.breakpoints.medium + "px)").matches ? {
                        visibleBlocks: 9,
                        pages: {
                            current: 1,
                            max: Math.ceil(i / 9)
                        }
                    } : window.matchMedia("(min-width: " + h.config.breakpoints.small + "px)").matches ? {
                        visibleBlocks: 4,
                        pages: {
                            current: 1,
                            max: Math.ceil(i / 4)
                        }
                    } : null) {
                        var n = 0;
                        e.each(function(t, e) {
                            var i = d(e);
                            n++,
                            i.toggle(n <= r.visibleBlocks)
                        }),
                        o.toggle(1 < r.pages.max),
                        l(1)
                    } else
                        e.show(),
                        o.hide()
                }
                function l(n) {
                    if (1 <= n && n <= r.pages.max) {
                        var o = 0;
                        e.each(function(t, e) {
                            var i = d(e);
                            o++,
                            i.toggle(Math.ceil(o / r.visibleBlocks) === n)
                        }),
                        r.pages.current = n,
                        s.toggleClass("is-disabled", r.pages.current < 2),
                        a.toggleClass("is-disabled", r.pages.current >= r.pages.max)
                    }
                }
            }(r),
            d(".team-agency-team-member > .link", e).on("click", function() {
                var t = d(this)
                  , e = d('<section id="team-agency-team-member-dialog" class="team-agency-team-member-dialog dialog is-modal"></section>').appendTo("body");
                d.ajax({
                    method: "get",
                    url: t.attr("data-url"),
                    dataType: "html"
                }).done(function(t) {
                    e.html(t),
                    h.trigger("dom:ready", e)
                }),
                e.on(d.dialog.CLOSE, function() {
                    e.remove()
                }).dialog("show")
            }),
            d(window).on("resize", d.debounce(100, u)),
            u(),
            a.captureImgLoad(u),
            a.on("click dragEnd", function(t) {
                i = "click" === t.type ? ("dragEnd" === i && (t.preventDefault(),
                t.stopPropagation()),
                null) : t.type
            }),
            l.on(d.dialog.OPEN, function(t, e) {
                var i = d(e);
                i.is("[data-photo]") && function(t) {
                    var e = d("img", l);
                    e.attr("src") !== t && (e.attr("src", ""),
                    l.removeClass("is-error").addClass("is-loading"),
                    e.attr("src", t))
                }(i.attr("data-photo"))
            }),
            d("img", l).on("load error", function(t) {
                l.removeClass("is-loading"),
                "error" === t.type && l.addClass("is-error")
            })
        }
        function c() {
            var t = a.width()
              , e = Math.max(0, t - a.parent().width());
            n.css({
                left: -1 * e + "px",
                width: t + e + "px"
            });
            var i = a.position();
            (0 < i.left || i.left < -1 * e) && a.css({
                left: 0 < i.left ? "0" : -1 * e + "px"
            })
        }
        function u() {
            window.matchMedia("(min-width: " + h.config.breakpoints.large + "px)").matches ? n && (a.draggabilly("destroy"),
            n.remove(),
            n = null) : n ? c() : (n = d('<div class="team-agency-photos-drag-containment"></div>').css({
                position: "absolute",
                top: a.position().top + parseInt(a.css("marginTop"), 10),
                height: a.height() + "px"
            }).insertBefore(a),
            c(),
            a.draggabilly({
                axis: "x",
                containment: n[0]
            }))
        }
    })
}(jQuery, window.app),
function(d, h) {
    h.on("dom:ready", function(t) {
        var e = d("#travel-destination-experts", t);
        if (0 !== e.length) {
            var i = d(".travel-destination-experts-list", e)
              , n = d("#travel-destination-experts-media-dialog");
            d("> .grid", i).each(function(t, e) {
                var r, i = d(e), s = d("> .block", i), o = 0, a = i.siblings(".actions"), l = d(".action-prev", a), c = d(".action-next", a);
                function n() {
                    if (r = window.matchMedia("(min-width: " + h.config.breakpoints.large + "px)").matches ? {
                        visibleBlocks: 12,
                        pages: {
                            current: 1,
                            max: Math.ceil(o / 12)
                        }
                    } : window.matchMedia("(min-width: " + h.config.breakpoints.medium + "px)").matches ? {
                        visibleBlocks: 9,
                        pages: {
                            current: 1,
                            max: Math.ceil(o / 9)
                        }
                    } : window.matchMedia("(min-width: " + h.config.breakpoints.small + "px)").matches ? {
                        visibleBlocks: 4,
                        pages: {
                            current: 1,
                            max: Math.ceil(o / 4)
                        }
                    } : null) {
                        var n = 0;
                        s.each(function(t, e) {
                            var i = d(e);
                            n += i.hasClass("is-2x1") ? 2 : 1,
                            i.toggle(n <= r.visibleBlocks)
                        }),
                        a.toggle(1 < r.pages.max),
                        u(1)
                    } else
                        s.show(),
                        a.hide()
                }
                function u(n) {
                    if (1 <= n && n <= r.pages.max) {
                        var o = 0;
                        s.each(function(t, e) {
                            var i = d(e);
                            o += i.hasClass("is-2x1") ? 2 : 1,
                            i.toggle(Math.ceil(o / r.visibleBlocks) === n)
                        }),
                        r.pages.current = n,
                        l.toggleClass("is-disabled", r.pages.current < 2),
                        c.toggleClass("is-disabled", r.pages.current >= r.pages.max)
                    }
                }
                s.each(function(t, e) {
                    o += d(e).hasClass("is-2x1") ? 2 : 1
                }),
                l.on("click", function() {
                    r && u(r.pages.current - 1)
                }),
                c.on("click", function() {
                    r && u(r.pages.current + 1)
                }),
                d(window).on("resize", d.debounce(100, n)),
                n()
            }),
            d(".member > .link", i).on("click", function() {
                var t = d(this)
                  , e = d('<section id="travel-destination-experts-member-dialog" class="travel-destination-experts-member-dialog dialog is-modal"></section>').appendTo("body");
                d.ajax({
                    method: "get",
                    url: t.attr("data-url"),
                    dataType: "html"
                }).done(function(t) {
                    e.html(t),
                    h.trigger("dom:ready", e)
                }),
                e.on(d.dialog.CLOSE, function() {
                    e.remove()
                }).dialog("show")
            }),
            n.on(d.dialog.OPEN, function(t, e) {
                var i = d(e);
                i.is("[data-photo]") && function(t) {
                    var e = d("img", n);
                    e.attr("src") !== t && (e.attr("src", ""),
                    n.removeClass("is-error").addClass("is-loading"),
                    e.attr("src", t))
                }(i.attr("data-photo"))
            }),
            d("img", n).on("load error", function(t) {
                n.removeClass("is-loading"),
                "error" === t.type && n.addClass("is-error")
            })
        }
    })
}(jQuery, window.app),
function(m, v) {
    v.on("dom:ready", function(t) {
        var e = m("#travel-guide", t);
        if (0 !== e.length) {
            var i, n, o, r, a, s, l, c, u, d = {
                summary: m("#travel-guide-area-summary", e),
                practical: m("#travel-guide-area-practical", e),
                period: m("#travel-guide-area-period", e),
                places: m("#travel-guide-area-places", e),
                faq: m("#travel-guide-area-faq", e)
            }, h = m("#travel-guide-media-dialog");
            0 < d.summary.length && (r = m("#travel-guide-area-summary-localtime", i = d.summary),
            a = m("> .agency", i),
            s = m("> .places", i),
            l = m("> .photos", i),
            c = m("> .inner > .list", l),
            u = {
                browser: dayjs(),
                localtime: dayjs(r.attr("data-time"))
            },
            setInterval(function() {
                var t = dayjs().diff(u.browser);
                r.text(u.localtime.add(t, "ms").format("HH:mm"))
            }, 1e3),
            function() {
                var t = m("> .inner > .team", a)
                  , e = m("> .list", t)
                  , i = m("> .actions", t)
                  , n = m("> .action-prev", i)
                  , o = m("> .action-next", i);
                e.flickity({
                    adaptiveHeight: !0,
                    prevNextButtons: !1,
                    pageDots: !1
                }).captureImgLoad(function() {
                    e.flickity("resize")
                });
                var r = e.data("flickity");
                if (1 < r.slides.length) {
                    function s() {
                        n.toggleClass("is-disabled", r.selectedIndex < 1),
                        o.toggleClass("is-disabled", r.selectedIndex >= r.slides.length - 1)
                    }
                    e.on("select.flickity", s),
                    s(),
                    n.on("click", function() {
                        e.flickity("previous")
                    }),
                    o.on("click", function() {
                        e.flickity("next")
                    }),
                    i.addClass("is-visible"),
                    t.addClass("has-actions")
                }
            }(),
            function() {
                var t = m("> .list", s)
                  , e = m("> .actions", s)
                  , i = m("> .action-prev", e)
                  , n = m("> .action-next", e);
                t.flickity({
                    adaptiveHeight: !0,
                    prevNextButtons: !1,
                    pageDots: !1
                }).captureImgLoad(function() {
                    t.flickity("resize")
                });
                var o = t.data("flickity");
                if (1 < o.slides.length) {
                    function r() {
                        i.toggleClass("is-disabled", o.selectedIndex < 1),
                        n.toggleClass("is-disabled", o.selectedIndex >= o.slides.length - 1)
                    }
                    t.on("select.flickity", r),
                    r(),
                    i.on("click", function() {
                        t.flickity("previous")
                    }),
                    n.on("click", function() {
                        t.flickity("next")
                    }),
                    e.addClass("is-visible")
                }
            }(),
            m(window).on("resize", m.debounce(100, p)),
            p(),
            c.captureImgLoad(p),
            c.on("click dragEnd", function(t) {
                o = "click" === t.type ? ("dragEnd" === o && (t.preventDefault(),
                t.stopPropagation()),
                null) : t.type
            })),
            0 < d.practical.length && function(t) {
                var e = m("#travel-guide-area-practical-localtime", t)
                  , i = m("#travel-guide-area-practical-converter", t)
                  , n = {
                    browser: dayjs(),
                    localtime: dayjs(e.attr("data-time"))
                };
                setInterval(function() {
                    var t = dayjs().diff(n.browser);
                    e.text(n.localtime.add(t, "ms").format("HH:mm:ss"))
                }, 1e3);
                var r = i.data("rate")
                  , s = m('[name="source"]', i)
                  , a = m('[name="target"]', i);
                s.add(a).on("change keyup", function(t) {
                    var e = m(this)
                      , i = e.is(s)
                      , n = parseFloat(e.val().replace(/\s+/, "").replace(",", ".")) || null
                      , o = null;
                    null !== n && (o = i ? n * r : n / r),
                    (i ? a : s).val(null === o ? "" : o.toFixed(2).replace(/\.00$/, ""))
                }),
                s.val("100").trigger("change")
            }(d.practical),
            0 < d.period.length && function(t) {
                m(".table", t).on(m.responsiveTable.TOGGLE, function(t, e) {
                    m(".travel-guide-area-period-location-data-row", this).toggleClass("is-responsive", e).toggleClass("is-not-responsive", !e)
                }).responsiveTable({
                    findHeader: function(t, e) {
                        return t.closest("tbody").prev("thead").find("th:eq(" + (e + 1) + ")").attr("data-month")
                    },
                    headerSuffix: ""
                });
                var s = {
                    temp: {
                        range: {
                            min: -10,
                            max: 30
                        },
                        colors: ["#CAF0F6", "#9BADDA", "#DAE5F0", "#F6F6F6", "#F6F3AF", "#F3DD76", "#F3C276", "#F3AB76"]
                    },
                    pcpn: {
                        max_value: 600,
                        variable: "--pcpn-height"
                    }
                };
                m(".travel-guide-area-period-location-data-row", t).each(function(t, e) {
                    m(".temperature", e).each(function(t, e) {
                        var i = m(e)
                          , n = parseInt(i.attr("data-temp"), 10) || 0
                          , o = Math.max(0, Math.min(1, (n - s.temp.range.min) / (s.temp.range.max - s.temp.range.min)))
                          , r = Math.round(o * (s.temp.colors.length - 1));
                        i.css("background-color", s.temp.colors[r])
                    }),
                    m(".precipitation", e).each(function(t, e) {
                        var i = m(e)
                          , n = parseInt(i.attr("data-pcpn"), 10) || 0
                          , o = Math.max(0, Math.min(1, n / s.pcpn.max_value));
                        i[0].style.setProperty(s.pcpn.variable, (100 * o).toFixed(1) + "%")
                    })
                })
            }(d.period),
            0 < d.places.length && function(t) {
                var o, r, e, i = m(".map", t), n = m(".places", t), s = [];
                function a(t) {
                    return {
                        path: "M11,7.48a5.44,5.44,0,0,0-5.44,5.44c0,3.78,4.91,8.74,5.12,9a.47.47,0,0,0,.64,0h0c.21-.21,5.12-5.17,5.12-9A5.44,5.44,0,0,0,11,7.48Z",
                        fillColor: t ? v.config.colors.secondary : v.config.colors.primary,
                        fillOpacity: 1,
                        strokeColor: "#ffffff",
                        strokeOpacity: 1,
                        strokeWeight: 2,
                        scale: 2,
                        anchor: {
                            x: 11,
                            y: 22
                        }
                    }
                }
                function l(n) {
                    m.each(s, function(t, e) {
                        var i = n === t;
                        e.instance && (e.instance.setIcon(a(i)),
                        i && ((r = r || new google.maps.InfoWindow({
                            content: ""
                        })).setContent('<div class="travel-guide-area-places-map-infowindow"><span class="name">' + e.name + "</span></div>"),
                        r.open(o, e.instance)))
                    })
                }
                m(".travel-guide-area-places-place", n).each(function(t, e) {
                    var i = m(e);
                    s[t] = {
                        lat: parseFloat(i.attr("data-lat")),
                        lng: parseFloat(i.attr("data-lng")),
                        name: m(".heading", i).text(),
                        instance: null
                    }
                }),
                e = function() {
                    var i = {
                        lat: {
                            min: 90,
                            max: -90
                        },
                        lng: {
                            min: 180,
                            max: -180
                        }
                    };
                    m.each(s, function(t, e) {
                        e.instance = new google.maps.Marker({
                            map: o,
                            position: {
                                lat: e.lat,
                                lng: e.lng
                            },
                            clickable: !0,
                            draggable: !1,
                            icon: a()
                        }),
                        e.instance.addListener("click", function() {
                            !function(t) {
                                var e = c.data("flickity");
                                e && e.select(t)
                            }(t),
                            l(t)
                        }),
                        i.lat.min = Math.min(i.lat.min, e.lat),
                        i.lat.max = Math.max(i.lat.max, e.lat),
                        i.lng.min = Math.min(i.lng.min, e.lng),
                        i.lng.max = Math.max(i.lng.max, e.lng)
                    }),
                    o.fitBounds(new google.maps.LatLngBounds({
                        lat: i.lat.min,
                        lng: i.lng.min
                    },{
                        lat: i.lat.max,
                        lng: i.lng.max
                    }), 20),
                    l(function() {
                        var t = c.data("flickity");
                        return t ? t.selectedIndex : null
                    }())
                }
                ,
                $script("https://maps.google.com/maps/api/js?language=" + v.config.lang + "&libraries=&v=quarterly&key=" + i.data("key"), function() {
                    o = new google.maps.Map(i[0],{
                        zoom: 2,
                        center: {
                            lat: 0,
                            lng: 0
                        },
                        zoomControl: !0,
                        mapTypeControl: !0,
                        scaleControl: !0,
                        streetViewControl: !0,
                        rotateControl: !0,
                        fullscreenControl: !0,
                        mapTypeId: "terrain",
                        clickableIcons: !1,
                        styles: [{
                            featureType: "administrative",
                            elementType: "labels.text.fill",
                            stylers: [{
                                color: "#32271b"
                            }]
                        }, {
                            featureType: "administrative.country",
                            elementType: "geometry.stroke",
                            stylers: [{
                                color: "#bbbbbb"
                            }]
                        }, {
                            featureType: "administrative.country",
                            elementType: "labels.text.fill",
                            stylers: [{
                                color: "#8c1437"
                            }]
                        }, {
                            featureType: "administrative.country",
                            elementType: "labels.text.stroke",
                            stylers: [{
                                color: "#ffffff"
                            }, {
                                weight: 4
                            }]
                        }, {
                            featureType: "administrative.country",
                            elementType: "labels.icon",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "landscape",
                            elementType: "all",
                            stylers: [{
                                color: "#f5f3eb"
                            }]
                        }, {
                            featureType: "landscape.natural",
                            elementType: "labels",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "landscape.natural.landcover",
                            elementType: "all",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "landscape.natural.terrain",
                            elementType: "geometry.fill",
                            stylers: [{
                                color: "#000000"
                            }, {
                                lightness: 50
                            }, {
                                saturation: -51
                            }]
                        }, {
                            featureType: "poi",
                            elementType: "all",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "road",
                            elementType: "all",
                            stylers: [{
                                saturation: -100
                            }, {
                                lightness: 45
                            }]
                        }, {
                            featureType: "road.highway",
                            elementType: "all",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "road.local",
                            elementType: "all",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "transit",
                            elementType: "all",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "water",
                            elementType: "geometry.fill",
                            stylers: [{
                                color: "#d6eeec"
                            }]
                        }]
                    }),
                    e && e()
                });
                var c = m("> .list", n)
                  , u = m("> .actions", n)
                  , d = m("> .action-prev", u)
                  , h = m("> .action-next", u);
                c.on("select.flickity", function(t, e) {
                    l(e)
                }).flickity({
                    adaptiveHeight: !0,
                    prevNextButtons: !1,
                    pageDots: !1
                }).captureImgLoad(function() {
                    c.flickity("resize")
                });
                var f = c.data("flickity");
                if (1 < f.slides.length) {
                    function p() {
                        d.toggleClass("is-disabled", f.selectedIndex < 1),
                        h.toggleClass("is-disabled", f.selectedIndex >= f.slides.length - 1)
                    }
                    c.on("select.flickity", p),
                    p(),
                    d.on("click", function() {
                        c.flickity("previous")
                    }),
                    h.on("click", function() {
                        c.flickity("next")
                    }),
                    u.addClass("is-visible")
                }
            }(d.places),
            0 < d.faq.length && m("> .section > .heading", d.faq).on("click", function() {
                m(this).closest(".section").toggleClass("is-visible")
            }).css("cursor", "pointer"),
            h.on(m.dialog.OPEN, function(t, e) {
                var i = m(e);
                i.is("[data-photo]") ? g(i.attr("data-photo"), !1) : i.is("[data-embed]") && g(i.attr("data-embed"), !0)
            }),
            h.on(m.dialog.CLOSE, function() {
                m(".embed", h).attr("src", "")
            }),
            m("img", h).on("load error", function(t) {
                h.removeClass("is-loading"),
                "error" === t.type && h.addClass("is-error")
            })
        }
        function f() {
            var t = c.width()
              , e = Math.max(0, t - c.parent().width());
            n.css({
                left: -1 * e + "px",
                width: t + e + "px"
            });
            var i = c.position();
            (0 < i.left || i.left < -1 * e) && c.css({
                left: 0 < i.left ? "0" : -1 * e + "px"
            })
        }
        function p() {
            window.matchMedia("(min-width: " + v.config.breakpoints.large + "px)").matches ? n && (c.draggabilly("destroy"),
            n.remove(),
            n = null) : n ? f() : (n = m('<div class="travel-guide-photos-drag-containment"></div>').css({
                position: "absolute",
                top: c.position().top + parseInt(c.css("marginTop"), 10),
                height: c.height() + "px"
            }).insertBefore(c),
            f(),
            c.draggabilly({
                axis: "x",
                containment: n[0]
            }))
        }
        function g(t, e) {
            var i = m(".photo", h)
              , n = m(".embed", h);
            h.toggleClass("is-photo", !e).toggleClass("is-embed", e),
            e ? (i.attr("src", ""),
            n.attr("src") !== t && n.attr("src", t),
            h.removeClass("is-error").removeClass("is-loading")) : (n.attr("src", ""),
            i.attr("src") !== t ? (i.attr("src", ""),
            h.removeClass("is-error").addClass("is-loading"),
            i.attr("src", t)) : h.removeClass("is-error").removeClass("is-loading"))
        }
    })
}(jQuery, window.app),
function(m, v) {
    v.on("dom:ready", function(t) {
        var e = m("#travel-search-engine", t);
        if (0 !== e.length) {
            var i = m("#travel-search-engine-header", e)
              , c = m("> .counter", i)
              , u = m("#travel-search-engine-form", e)
              , o = u.data("redirect")
              , r = m("#travel-search-engine-results", e)
              , d = r.children(".list")
              , h = r.children(".loadmore")
              , f = m(">.link", h);
            m(".action-toggle", i).on("click", function() {
                u.toggleClass("is-visible")
            }),
            p(),
            g(),
            u.on("change", function(t) {
                if (t.preventDefault(),
                o) {
                    var e = m('[name="' + o.filter + '"]:checked', u)
                      , i = parseInt(e.val()) || null;
                    if (1 !== e.length || i !== o.value) {
                        var n = v.getDict();
                        return c.add(u).add(r).addClass("is-loading"),
                        c.text(n.travel.search_engine.loading),
                        f.text(n.travel.search_engine.loading),
                        v.displayMsg(),
                        void v.reroute(o.url + "?" + u.serialize() + "#travel-search-engine-results")
                    }
                }
                a(u.attr("method"), u.attr("action"), u.serialize()).done(function(t) {
                    s(t, !0)
                }),
                u.toggleClass("is-active", 0 < u.serializeArray().filter(function(t) {
                    return !!t.value
                }).length)
            }),
            f.on("click", function(t) {
                t.preventDefault(),
                a("get", f.attr("href")).done(function(t) {
                    s(t, !1)
                })
            })
        }
        function p() {
            var r = m("> .filter > .label.is-link", u)
              , t = m("> .reset", u);
            m("> .filter > .list", u).each(function(t, e) {
                var i = m(e)
                  , n = i.prev(".label.is-link");
                if (0 < n.length) {
                    var o = m('<span class="selected"></span>').appendTo(n);
                    n.on("click", function() {
                        !function(t) {
                            n.toggleClass("is-active", t),
                            n.hasClass("is-active") && r.not(n).removeClass("is-active")
                        }()
                    }),
                    m("[name]", i).on("change", function() {
                        var t = m(this)
                          , e = t.val();
                        m('[data-val="' + e + '"]', o).remove(),
                        t.prop("checked") && m('<span class="val" data-val="' + e + '">' + t.closest("label").text() + "</span>").appendTo(o)
                    }).filter(":checked").each(function(t, e) {
                        m(e).triggerHandler("change")
                    })
                }
            }),
            m(".action-reset", t).on("click", function() {
                m("> .filter", u).each(function(t, e) {
                    var i = m("> .list", e)
                      , n = m("> .xmonth", e);
                    0 < i.length && m("[name]:checked", i).each(function(t, e) {
                        m(e).prop("checked", !1).triggerHandler("change")
                    }),
                    0 < n.length && m("[name]", n).val("").triggerHandler("change")
                }),
                u.trigger("change")
            })
        }
        function g() {
            d.children(".result").each(function(t, e) {
                m(e).megalink({
                    selector: ".heading > .link",
                    skip: ".action-select, .footer > .actions > .link",
                    skipAndProxy: ".photo"
                })
            })
        }
        function s(t, e) {
            var i = m(t)
              , n = m("#travel-search-engine-header > .counter", i)
              , o = m("#travel-search-engine-form", i)
              , r = m("#travel-search-engine-results", i)
              , s = r.children(".list")
              , a = r.children(".loadmore")
              , l = m(">.link", a);
            u.html(o.html()),
            v.trigger("dom:ready", u),
            p(),
            e && d.html(""),
            s.children(".result").each(function(t, e) {
                d.append(e)
            }),
            v.trigger("dom:ready", d),
            g(),
            c.html(n.html()),
            f.text(l.text()).attr("href", l.attr("href")),
            h.toggleClass("is-visible", a.hasClass("is-visible"))
        }
        function a(t, e, i) {
            var n = v.getDict();
            return c.add(u).add(r).addClass("is-loading"),
            c.text(n.travel.search_engine.loading),
            f.text(n.travel.search_engine.loading),
            v.displayMsg(),
            m.ajax({
                method: t,
                url: e,
                dataType: "html",
                data: i
            }).always(function() {
                c.add(u).add(r).removeClass("is-loading")
            }).fail(function() {
                v.displayMsg(n.travel.search_engine.error),
                c.text(n.travel.search_engine.error),
                f.text(n.travel.search_engine.error)
            })
        }
    })
}(jQuery, window.app),
function(o) {
    window.app.on("dom:ready", function(t) {
        var n = o("#travel-theme", t);
        0 !== n.length && o(".readmore > .link", n).on("click", function(t) {
            t.preventDefault();
            var e = o(this)
              , i = o(e.attr("href"), n);
            o("html, body").animate({
                scrollTop: i.offset().top
            }, 750)
        })
    })
}(jQuery),
function(_, L) {
    L.on("dom:ready", function(t) {
        var s = _("#travel-tour", t);
        if (0 !== s.length) {
            var n, o, e, i, r, a, l, c, u, d = _("#travel-tour-links", s), h = _("> .inner", d), f = _("> .nav > .link", h), p = _("#travel-tour-expert-introduction", s), g = _("#travel-tour-photos", s), m = _("> .list", g), v = _("#travel-tour-program", s), y = _("#travel-tour-informations", s), b = _("#travel-tour-dates", s), w = _("#travel-tour-media-dialog");
            _(window).on("resize", _.debounce(100, k)),
            k(),
            f.on("click", function(t) {
                t.preventDefault();
                var e = _(this)
                  , i = _(e.attr("href"), s);
                _("html, body").animate({
                    scrollTop: i.offset().top
                }, 750)
            }),
            _(window).on("scroll", _.debounce(100, E)),
            E(),
            _(".theme > .tip", p).on(_.hovertip.SHOW, function() {
                var t = _(this)
                  , e = t.data("position")
                  , i = t.parent(".theme")
                  , n = t.width()
                  , o = i.width()
                  , r = i.offset()
                  , s = Math.min(window.innerWidth - _.scrollbar.getWidth() - r.left - n, Math.max(-1 * r.left, Math.round((n - o) / -2)));
                t.css("transform", "translate(" + s + "px," + ("top" === e ? "-100%" : "0") + ")")
            }),
            _(window).on("resize", _.debounce(100, D)),
            D(),
            m.captureImgLoad(D),
            m.on("click dragEnd", function(t) {
                e = "click" === t.type ? ("dragEnd" === e && (t.preventDefault(),
                t.stopPropagation()),
                null) : t.type
            }),
            _(".stage", v).each(function(t, e) {
                var i = _(".details", e);
                0 === i.children().length && i.hide()
            }),
            _("#action-showmore-program", v).on("click", function() {
                _(".stage", v).removeClass("is-hidden"),
                _(this).closest(".showmore").remove()
            }),
            _(".map", v).megalink({
                onclick: function(t) {
                    t.preventDefault(),
                    _(".map .link", v).trigger("click")
                },
                skipAndProxy: "img"
            }),
            r = _(".section", i = y),
            a = _("> .heading", r),
            l = _("> .header > .nav", i),
            (c = _("> .item > .link", l)).on("click", function(t) {
                t.preventDefault();
                var n = _(this).attr("href");
                r.each(function(t, e) {
                    var i = "#" + _(e).attr("id");
                    M(i, i === n)
                })
            }),
            a.on("click", function(t) {
                var e = _(this).closest(".section");
                window.matchMedia("(min-width: " + L.config.breakpoints.large + "px)").matches || (t.preventDefault(),
                M(e.attr("id"), !e.hasClass("is-visible")))
            }),
            _(window).on("resize", _.debounce(100, function() {
                window.matchMedia("(min-width: " + L.config.breakpoints.large + "px)").matches && 0 === r.filter(".is-visible").length && M(r.first().attr("id"))
            })),
            _(".travel-tour-dates-headrow > .price > .currency-selector", u = b).on("change", function() {
                var t = _(this)
                  , e = t.closest("table").find(".travel-tour-dates-datarow");
                _("[data-currency]", e).removeClass("is-active").filter('[data-currency="' + t.val() + '"]').addClass("is-active")
            }),
            T(!1),
            _(".table", u).on(_.responsiveTable.TOGGLE, function(t, e) {
                T(e)
            }).responsiveTable({
                findHeader: function(t, e) {
                    return 2 === e ? t.closest("table").find(".travel-tour-dates-headrow > .price > .label").text() : e < 2
                },
                headerSuffix: " : "
            }),
            _(".action-showmore-dates", u).on("click", function() {
                var t = _(this).closest(".version");
                _(".travel-tour-dates-datarow", t).removeClass("is-hidden"),
                _(".showmore", t).remove()
            }),
            w.on(_.dialog.OPEN, function(t, e) {
                var i = _(e);
                i.is("[data-photo]") ? P(i.attr("data-photo"), !1) : i.is("[data-embed]") && P(i.attr("data-embed"), !0)
            }),
            w.on(_.dialog.CLOSE, function() {
                _(".embed", w).attr("src", "")
            }),
            _("img", w).on("load error", function(t) {
                w.removeClass("is-loading"),
                "error" === t.type && w.addClass("is-error")
            })
        }
        function x() {
            var t = h.width()
              , e = Math.max(0, t - h.parent().width());
            n.css({
                left: -1 * e + "px",
                width: t + e + "px"
            });
            var i = h.position();
            (0 < i.left || i.left < -1 * e) && h.css({
                left: 0 < i.left ? "0" : -1 * e + "px"
            })
        }
        function k() {
            window.matchMedia("(min-width: " + L.config.breakpoints.large + "px)").matches ? n && (h.draggabilly("destroy"),
            n.remove(),
            n = null) : n ? x() : (n = _('<div class="travel-tour-links-drag-containment"></div>').css({
                position: "absolute",
                top: h.position().top + parseInt(h.css("marginTop"), 10),
                height: h.height() + "px"
            }).insertBefore(h),
            x(),
            h.draggabilly({
                axis: "x",
                containment: n[0]
            }))
        }
        function C(t) {
            var e = t.getBoundingClientRect();
            return e.top + e.height >= d.height() && e.top < window.innerHeight
        }
        function E() {
            var r = !1;
            f.each(function(t, e) {
                var i = _(e)
                  , n = _(i.attr("href"), s)
                  , o = i.attr("data-secondary") ? _(i.attr("data-secondary"), s) : null;
                !r && (0 < n.length && C(n[0]) || o && C(o[0])) ? (i.addClass("is-active"),
                r = !0) : i.removeClass("is-active")
            })
        }
        function S() {
            var t = m.width()
              , e = Math.max(0, t - m.parent().width());
            o.css({
                left: -1 * e + "px",
                width: t + e + "px"
            });
            var i = m.position();
            (0 < i.left || i.left < -1 * e) && m.css({
                left: 0 < i.left ? "0" : -1 * e + "px"
            })
        }
        function D() {
            window.matchMedia("(min-width: " + L.config.breakpoints.large + "px)").matches ? o && (m.draggabilly("destroy"),
            o.remove(),
            o = null) : o ? S() : (o = _('<div class="travel-tour-photos-drag-containment"></div>').css({
                position: "absolute",
                top: m.position().top + parseInt(m.css("marginTop"), 10),
                height: m.height() + "px"
            }).insertBefore(m),
            S(),
            m.draggabilly({
                axis: "x",
                containment: o[0]
            }))
        }
        function M(t, e) {
            t.match(/^#/) || (t = "#" + t),
            r.filter(t).toggleClass("is-visible", e),
            c.filter('[href="' + t + '"]').closest(".item").toggleClass("is-active", e)
        }
        function T(t) {
            _(".travel-tour-dates-datarow", u).toggleClass("is-responsive", t).toggleClass("is-not-responsive", !t)
        }
        function P(t, e) {
            var i = _(".photo", w)
              , n = _(".embed", w);
            w.toggleClass("is-photo", !e).toggleClass("is-embed", e),
            e ? (i.attr("src", ""),
            n.attr("src") !== t && n.attr("src", t),
            w.removeClass("is-error").removeClass("is-loading")) : (n.attr("src", ""),
            i.attr("src") !== t ? (i.attr("src", ""),
            w.removeClass("is-error").addClass("is-loading"),
            i.attr("src", t)) : w.removeClass("is-error").removeClass("is-loading"))
        }
    })
}(jQuery, window.app),
function(o) {
    window.app.on("dom:ready", function(t) {
        var n = o("#travel-type", t);
        0 !== n.length && o(".readmore > .link", n).on("click", function(t) {
            t.preventDefault();
            var e = o(this)
              , i = o(e.attr("href"), n);
            o("html, body").animate({
                scrollTop: i.offset().top
            }, 750)
        })
    })
}(jQuery),
function(i) {
    window.app.on("dom:ready", function(t) {
        var e = i(".trustpilot-widget", t);
        0 !== e.length && $script(e.first().attr("data-src"))
    })
}(jQuery);
