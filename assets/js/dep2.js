;(self.webpackChunk = self.webpackChunk || []).push([[3009], {
    8156: function() {
        var e = document.querySelector(".routes");
        if (e) {
            var t = e.querySelectorAll(".routes__btn")
              , r = e.querySelectorAll(".js-route-content")
              , o = e.querySelector(".routes__current");
            window.handleTabs(t, r, "route"),
            o.addEventListener("click", (function(e) {
                e.currentTarget.closest(".routes__side").classList.toggle("show")
            }
            ))
        }
    }
}]);
;;"use strict";
(self.webpackChunk = self.webpackChunk || []).push([[3002], {
    7513: function(e, r, c) {
        c.r(r);
        c(1414),
        c(7134);
        var n = document.querySelectorAll(".itinerary-price");
        n && n.forEach((function(e) {
            var r = e.querySelectorAll(".itinerary-price__control")
              , c = e.querySelectorAll(".itinerary-price__content");
            window.handleTabs(r, c, "tarif")
        }
        ))
    }
}]);
;;"use strict";
(self.webpackChunk = self.webpackChunk || []).push([[4955], {
    8334: function(e, c, r) {
        r.r(c);
        r(1414),
        r(7134);
        var t = document.querySelectorAll(".currency-controls__control.js-currency")
          , u = document.querySelector(".js-cur-eur").value
          , n = document.querySelector(".js-cur-usd").value
          , o = document.querySelector(".js-cur-gbp").value;
        t.length && t.forEach((function(e, c) {
            e.addEventListener("click", (function(e) {
                var c = e.currentTarget;
                c.parentNode.querySelectorAll(".js-currency").forEach((function(e) {
                    e.classList.remove("active")
                }
                )),
                c.classList.add("active"),
                "usd" === c.dataset.currency ? c.closest(".prices-block").querySelectorAll(".js-cur-sum").forEach((function(e) {
                    e.querySelector("span").innerHTML = "$".concat(Math.ceil(e.querySelector("input").value / n).toLocaleString())
                }
                )) : "eur" === c.dataset.currency ? c.closest(".prices-block").querySelectorAll(".js-cur-sum").forEach((function(e) {
                    e.querySelector("span").innerHTML = "€".concat(Math.ceil(1.02 * e.querySelector("input").value / u).toLocaleString())
                }
                )) : "gbp" === c.dataset.currency && c.closest(".prices-block").querySelectorAll(".js-cur-sum").forEach((function(e) {
                    e.querySelector("span").innerHTML = "£".concat(Math.ceil(1.02 * e.querySelector("input").value / o).toLocaleString())
                }
                ))
            }
            ))
        }
        ))
    }
}]);
;;"use strict";
(self.webpackChunk = self.webpackChunk || []).push([[9539], {
    7214: function(e, c, s) {
        s.r(c);
        s(1414),
        s(7134);
        document.querySelectorAll(".accordion-item__head").forEach((function(e) {
            e.addEventListener("click", (function() {
                var c = e.closest(".accordion-item")
                  , s = e.parentNode.querySelector(".accordion-item__body");
                c.classList.contains("show") ? (c.classList.remove("show"),
                s.style.height = 0) : (c.classList.add("show"),
                s.style.height = s.scrollHeight + "px")
            }
            ))
        }
        ))
    }
}]);
;;"use strict";
(self.webpackChunk = self.webpackChunk || []).push([[2614], {
    4522: function(t, e, c) {
        c.r(e);
        c(1414),
        c(7134);
        var n = document.querySelectorAll(".js-short")
          , i = document.querySelectorAll(".js-full")
          , o = document.querySelectorAll(".itinerary__step-content");
        o.forEach(window.setContentHeight),
        n.forEach((function(t) {
            t.addEventListener("click", (function() {
                n.forEach((function(t) {
                    t.classList.add("active")
                }
                )),
                i.forEach((function(t) {
                    t.classList.remove("active")
                }
                )),
                o.forEach((function(t) {
                    t.classList.add("hide"),
                    t.style.height = 0
                }
                ))
            }
            ))
        }
        )),
        i.forEach((function(t) {
            t.addEventListener("click", (function() {
                n.forEach((function(t) {
                    t.classList.remove("active")
                }
                )),
                i.forEach((function(t) {
                    t.classList.add("active")
                }
                )),
                o.forEach((function(t) {
                    t.classList.remove("hide"),
                    window.setContentHeight(t)
                }
                ))
            }
            ))
        }
        ))
    }
}]);
;;(self.webpackChunk = self.webpackChunk || []).push([[805], {
    2906: function() {
        var e = document.querySelector(".itinerary-banner");
        if (e) {
            var n = e.querySelector(".itinerary-banner__controls")
              , r = e.querySelectorAll(".itinerary-banner__control")
              , t = document.querySelectorAll(".itinerary__content");
            window.handleTabs(r, t, "day"),
            e.querySelector(".itinerary-banner__current").addEventListener("click", (function(e) {
                e.currentTarget.closest(".itinerary-banner__controls").classList.toggle("show")
            }
            ));
            document.addEventListener("click", (function(e) {
                e.stopPropagation(),
                e.target && !n.contains(e.target) && n.classList.remove("show")
            }
            ))
        }
    }
}]);
;;"use strict";
(self.webpackChunk = self.webpackChunk || []).push([[9034], {
    7954: function(e, n, i) {
        i.r(n);
        i(1414),
        i(7134);
        var s = i(1672)
          , t = document.querySelectorAll(".tours-list__swiper.swiper")
          , r = {
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 16
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 16
                }
            }
        }
          , c = []
          , o = function() {
            innerWidth <= 991 && 0 === c.length ? t.forEach((function(e) {
                c.push(slider(e, r))
            }
            )) : innerWidth > 991 && c.length > 0 && (c.forEach((function(e) {
                e.destroy()
            }
            )),
            c = [])
        };
        o(),
        window.addEventListener("resize", (0,
        s.Z)((function() {
            o()
        }
        ), 150))
    }
}]);
;;;;;;;;