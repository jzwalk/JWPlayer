!
function(t) {
	function e(n) {
		if (i[n]) return i[n].exports;
		var a = i[n] = {
			exports: {},
			id: n,
			loaded: !1
		};
		return t[n].call(a.exports, a, a.exports, e), a.loaded = !0, a.exports
	}
	var i = {};
	return e.m = t, e.c = i, e.p = "", e(0)
}([function(t, e, i) {
	var n, a;
	n = [i(2), i(3), i(4)], a = function(t, e) {
		var i = function(t, i, n) {
				function a(t, e) {
					var i = t.indexOf("MEDIAID");
					return i > 0 && e ? t.replace("MEDIAID", e) : i === -1 ? t : void 0
				}
				function s(t) {
					var e = window.location.toString();
					if (window.top !== window && (e = document.referrer), i.link) {
						var n = a(i.link, t);
						e = n ? n : e
					}
					return e
				}
				function r(e) {
					var i = t.getPlaylist()[e.index];
					C = s(i.mediaid), E && (E.innerHTML = C)
				}
				function l(e) {
					e.active ? (j = !0, t.removeButton("share")) : (j = !1, t.addButton(void 0, i.heading, g, "share", S))
				}
				function o() {
					if (f.isArray(i.sites)) {
						var a = [];
						f.each(i.sites, function(t) {
							f.isString(t) && e[t] ? a.push(e[t]) : f.isObject(t) && a.push(t)
						}), i.sites.indexOf("link") < 0 && a.push(e.link), z = a
					}
					i.heading = f.isString(i.heading) ? i.heading : "Share Video", F.addClass(n, "jw-plugin-sharing"), h(), t.on("playlistItem", r), t.addButton(void 0, i.heading, g, "share", S)
				}
				function c(t, e, i) {
					var n = document.createElement(t);
					return e && F.addClass(n, e ? e.concat(["jw-reset"]) : ["jw-reset"]), i && (i.nodeName ? n.appendChild(i) : n.innerHTML = i), n
				}
				function h() {
					var t = c("span", ["jw-icon", "jw-icon-close", "jw-sharing-close-icon"]);
					new D(t).on("click tap", p), n.appendChild(t), m = c("div", ["jw-sharing-content"]), n.appendChild(m), b = c("div", ["jw-sharing-heading"], i.heading), m.appendChild(b), x = c("div", ["jw-sharing-icons"]), m.appendChild(x);
					for (var e = 0; e < z.length; e++) {
						var a = c("div", ["jw-sharing-icon-container"]),
							s = c("span", ["jw-sharing-icon", "jw-sharing-icon-" + z[e].label]);
						z[e].icon && (s.style.backgroundImage = 'url("' + z[e].icon + '")', F.addClass(s, "jw-sharing-user-icon")), "link" === z[e].label ? (E = c("textarea", ["jw-sharing-textarea"]), E.setAttribute("readonly", "true"), E.addEventListener("focus", d), a.appendChild(E)) : new D(s, {
							useHover: !0
						}).on("click tap", u, z[e]), a.appendChild(s), x.appendChild(a), A.push(s)
					}
				}
				function d(t) {
					t.target.select(), document.execCommand("copy") ? (F.addClass(n, "jw-plugin-sharing-link-copied"), setTimeout(function() {
						F.removeClass(n, "jw-plugin-sharing-link-copied")
					}, 1e3)) : window.prompt("Copy link below", t.target.value), t.target.blur(), v("link")
				}
				function g(e) {
					j || B || (k = t.getState(), "playing" === k && t.pause(), B = !0, F.addClass(n, "jw-show"), F.addClass(t.getContainer(), "jw-flag-overlay-open-sharing"), w(e))
				}
				function p(e) {
					B && ("paused" === t.getState() && "playing" === k && t.play(), B = !1, F.removeClass(n, "jw-show"), F.removeClass(t.getContainer(), "jw-flag-overlay-open-sharing"), w(e))
				}
				function u() {
					if (f.isFunction(this.src)) this.src(C);
					else {
						var t = encodeURIComponent(C),
							e = this.src.replace(/\[URL\]/gi, t);
						this.src === e && (e = this.src + t), window.open(e, "_blank"), window.focus()
					}
					v(this.label)
				}
				function w(t) {
					y.trigger(B ? "open" : "close", {
						visible: B,
						method: t ? "interaction" : "api"
					})
				}
				function v(t) {
					y.trigger("click", {
						method: t
					})
				}
				var F = t.utils,
					f = t._,
					D = F.UI;
				f.extend(this, t.Events);
				var C, m, b, x, E, k, y = this,
					j = !1,
					B = !1,
					A = [],
					z = [e.facebook, e.twitter, e.email, e.link],
					S = "jw-sharing-dock-btn";
				this.open = function(t) {
					g(t)
				}, this.close = function(t) {
					p(t)
				}, t.on("ready", o), t.on("cast", l)
			};
		i.version = t.version;
		var n = window.jwplayerPluginJsonp || window.jwplayer().registerPlugin;
		n("sharing", t.minPlayerVersion, i)
	}.apply(e, n), !(void 0 !== a && (t.exports = a))
}, , function(t, e) {
	t.exports = {
		version: "2.0.0",
		minPlayerVersion: "7.0.0"
	}
}, function(t, e, i) {
	var n, a;
	n = [], a = function() {
		var t = {
			weibo: {
				label: "weibo",
				src: "http://service.weibo.com/share/share.php?url=[URL]&title=[URL]&appkey=1343713053&searchPic=true"
			},
			txwb: {
				label: "txwb",
				src: "http://share.v.t.qq.com/index.php?c=share&a=index&url=[URL]&appkey=801cf76d3cfc44ada52ec13114e84a96"
			},
			tieba: {
				label: "tieba",
				src: "http://tieba.baidu.com/f/commit/share/openShareApi?url=[URL]"
			},
			douban: {
				label: "douban",
				src: "https://www.douban.com/share/service?href=[URL]"
			},
			renren: {
				label: "renren",
				src: "http://widget.renren.com/dialog/share?resourceUrl=[URL]"
			},
			facebook: {
				label: "facebook",
				src: "http://www.facebook.com/sharer/sharer.php?u=[URL]"
			},
			twitter: {
				label: "twitter",
				src: "http://twitter.com/intent/tweet?url=[URL]"
			},
			email: {
				label: "email",
				src: "mailto:?body=[URL]"
			},
			link: {
				label: "link"
			}
		};
		return t
	}.apply(e, n), !(void 0 !== a && (t.exports = a))
}, function(t, e, i) {
	var n = i(5);
	"string" == typeof n && (n = [
		[t.id, n, ""]
	]);
	i(7)(n, {});
	n.locals && (t.exports = n.locals)
}, function(t, e, i) {
	e = t.exports = i(6)(), e.push([t.id, ".jw-sharing-icon-email{background-image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%3E%3Cstyle%3E.st0%7Bfill%3A%23AAB4C8%3B%7D%20.st1%7Bfill%3A%23FFFFFF%3B%7D%3C%2Fstyle%3E%3Cpath%20class%3D%22st0%22%20d%3D%22M0%200h100v100H0z%22%2F%3E%3Cg%20id%3D%22_x30_009388e-50af-4137-8185-2140a6cde635.psd%22%3E%3Cpath%20class%3D%22st1%22%20d%3D%22M85%2024.8H15L50%2052l35-27.2zm-70%207.7v38.7c0%202.2%201.8%203.9%203.9%203.9h62.2c2.2%200%203.9-1.7%203.9-3.8V32.5L50%2059.7%2015%2032.5z%22%20id%3D%22icon-email%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E');background-repeat:no-repeat}.jw-sharing-icon-embed{background-image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22175.5%22%20height%3D%22100%22%20viewBox%3D%22412.6%20557.2%20175.5%20100%22%3E%3Cstyle%3E.st0%7Bfill%3A%23FFFFFF%3B%7D%3C%2Fstyle%3E%3Cpath%20class%3D%22st0%22%20d%3D%22M528.8%20558.4c3.9%202.3%205.3%207.2%203%2011.1L483%20653.3c-2.3%203.9-7.2%205.1-11.1%203-3.9-2.3-5.3-7.2-3-11.1l48.8-83.8c2.1-4.1%207.2-5.3%2011.1-3zM556.5%20575.2l29.2%2029.2c3.2%203.2%203.2%208.4%200%2011.6l-29.2%2029.2c-3.2%203.2-8.4%203.2-11.8%200-3.2-3.2-3.2-8.4%200-11.6l23.4-23.4-23.4-23.4c-3.2-3.2-3.2-8.4%200-11.6%203.4-3.3%208.5-3.3%2011.8%200zM455.9%20575.2c3.2%203.2%203.2%208.4%200%2011.6l-23.4%2023.4%2023.4%2023.4c3.2%203.2%203.2%208.4%200%2011.6-3.2%203.2-8.4%203.2-11.8%200L414.9%20616c-3.2-3.2-3.2-8.4%200-11.6l29.2-29.2c3.3-3.3%208.4-3.3%2011.8%200z%22%2F%3E%3C%2Fsvg%3E');background-repeat:no-repeat}.jw-sharing-icon-facebook{background-image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%22-477%20-120%20100%20100%22%3E%3Cstyle%3E.st0%7Bfill%3A%233B5998%3B%7D%20.st1%7Bfill%3A%23FFFFFF%3B%7D%3C%2Fstyle%3E%3Cpath%20class%3D%22st0%22%20d%3D%22M-477-120h100v100h-100z%22%2F%3E%3Cpath%20id%3D%22f%22%20class%3D%22st1%22%20d%3D%22M-408-20v-38.7h13l1.9-15.1H-408v-9.6c0-4.4%201.2-7.3%207.5-7.3h8v-13.5c-1.4-.2-6.1-.6-11.6-.6-11.5%200-19.4%207-19.4%2019.9v11.1h-13v15.1h13V-20h15.5z%22%2F%3E%3C%2Fsvg%3E');background-repeat:no-repeat}.jw-sharing-icon-douban{background-image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20300%20300%22%3E%3Cstyle%3E.st0%7Bfill%3A%23FFFFFF%3B%7D%20.st1%7Bfill%3A%23107F21%3B%7D%3C%2Fstyle%3E%3Cpath%20class%3D%22st0%22%20d%3D%22M-0-0h300v300h-300z%22%2F%3E%3Cpath%20class%3D%22st1%22%20d%3D%22m292.0578%2C-6.923856c10.970581%2C0%2019.866028%2C8.727532%2019.866028%2C19.49104l0%2C272.865646c0%2C10.763489%20-8.895447%2C19.491028%20-19.866028%2C19.491028l-278.115599%2C0c-10.970597%2C0%20-19.866048%2C-8.727539%20-19.866048%2C-19.491028l0%2C-272.865646c0%2C-10.763508%208.895451%2C-19.49104%2019.866048%2C-19.49104l278.115599%2C0zm-251.447544%2C45.506413l0%2C25.147774l217.510715%2C0l0%2C-25.147774l-217.510715%2C0zm13.763012%2C46.01709l0%2C102.569817l18.702652%2C0l22.712219%2C46.796021l-61.677879%2C0l0%2C24.668518l229.806%2C0l0%2C-24.668518l-63.249634%2C0l23.015366%2C-46.796021l20.369415%2C0l0%2C-102.569817l-189.678139%2C0zm156.568413%2C25.235321l0%2C52.97126l-124.777702%2C0l0%2C-52.97126l124.777702%2C0zm-38.244965%2C124.130516l-48.300346%2C0l-22.465157%2C-46.796021l93.780914%2C0l-23.015411%2C46.796021z%22%2F%3E%3C%2Fsvg%3E');background-repeat:no-repeat}.jw-sharing-icon-link{background-image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%2299.7%22%20viewBox%3D%220%200%20100%2099.7%22%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M43.6%2026.5L35.1%2018c-4.7-4.7-12.3-4.7-17%200-4.7%204.7-4.7%2012.3%200%2016.9l17%2016.9c4.7%204.7%2012.2%204.7%2016.9.1l8.5%208.5-4.2%204.2c-7%207-18.5%207-25.5%200L5.3%2039.2c-7-7-7-18.4%200-25.4l8.5-8.5c7-7%2018.5-7%2025.5%200L52.1%2018l-8.5%208.5z%22%2F%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M56.4%2073.2l8.5%208.5c4.7%204.7%2012.3%204.7%2017%200%204.7-4.7%204.7-12.3%200-16.9l-17-16.9c-4.7-4.7-12.2-4.7-16.9-.1l-8.5-8.5%204.2-4.2c7-7%2018.5-7%2025.5%200l25.5%2025.4c7%207%207%2018.4%200%2025.4l-8.5%208.5c-7%207-18.5%207-25.5%200L47.9%2081.7l8.5-8.5z%22%2F%3E%3C%2Fsvg%3E');background-repeat:no-repeat}.jw-sharing-icon-txwb{background-image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20300%20300%22%3E%3Cstyle%3E.st0%7Bfill%3A%230077B5%3B%7D%20.st1%7Bfill%3A%23FFFFFF%3B%7D%3C%2Fstyle%3E%3Cpath%20class%3D%22st0%22%20d%3D%22M-0-0h300v300h-300z%22%2F%3E%3Cpath%20class%3D%22st1%22%20d%3D%22M210.382%2037.426c-5.68.816-12.279%203.537-17.041%207.041-8.333%206.122-13.707%2015.17-15.272%2025.612-.646%204.184-.646%206.394-.034%2010.51%202.109%2013.946%2011.259%2025.408%2024.252%2030.408%205.748%202.245%2014.081%203.266%2016.598%202.041%202.381-1.122%202.619-4.762.443-6.292-.749-.545-1.837-.749-5.136-.987-8.062-.612-13.776-3.095-19.422-8.469-4.116-3.98-6.769-8.436-8.436-14.184-1.122-3.877-1.122-11.701%200-15.578%201.565-5.442%203.742-9.286%207.517-13.265%202.824-2.96%204.966-4.524%208.504-6.293%207.483-3.775%2016.666-4.286%2024.524-1.36%209.285%203.469%2016.428%2011.36%2018.945%2020.986.68%202.619.851%204.15.885%207.381.034%207.075-1.429%2011.837-5.579%2018.163-1.02%201.565-1.666%202.891-1.666%203.504%200%201.598.85%202.857%202.381%203.469%201.326.51%201.496.51%202.823-.068%201.734-.782%203.911-3.81%206.224-8.742%202.313-4.898%203.232-8.877%203.436-14.796.136-4.149.034-5.476-.579-8.503-3.265-15.85-15.408-27.687-31.224-30.442-3.095-.544-8.844-.612-12.143-.136zm-122.619%2019.558c-3.469.306-10.51%201.598-13.571%202.483-11.157%203.265-20.375%208.605-28.708%2016.666-17.347%2016.803-24.184%2041.327-18.095%2065%201.462%205.715%204.388%2012.823%206.088%2014.864%202.721%203.232%208.47%202.517%2010.408-1.258%201.021-1.973.885-4.15-.374-6.803-3.877-8.163-5.408-14.898-5.408-23.809%200-9.456%201.701-16.463%206.021-24.932%2010.204-19.966%2031.904-31.565%2054.455-29.116%208.708.918%2017.177%204.048%2024.728%209.082%204.66%203.095%2011.497%209.932%2014.524%2014.523%208.095%2012.177%2011.02%2026.191%208.401%2040.409-4.013%2021.904-21.632%2039.387-43.843%2043.435-5.578%201.02-13.912%201.02-19.592%200-3.367-.578-4.422-.646-5.544-.34-2.653.714-4.796%203.435-4.796%206.122%200%202.653%202.143%205.408%204.694%206.089%206.156%201.632%2017.143%202.211%2024.251%201.224%2020.068-2.721%2037.313-13.775%2048.368-30.952%207.381-11.531%2011.326-27.347%2010.102-40.647-1.973-21.7-13.197-40.238-31.191-51.632-7.823-4.966-17.006-8.368-26.224-9.762-3.368-.51-11.939-.884-14.694-.646zm124.456%205c-3.64%201.02-6.463%203.469-8.232%207.006-.986%202.041-1.088%202.517-1.088%205.477%200%202.993.102%203.435%201.122%205.51.613%201.224%201.735%202.857%202.483%203.639%201.633%201.633%204.864%203.3%206.973%203.64%201.395.204%201.565.34%202.075%201.632%202.347%205.885%208.095%2015.511%2012.585%2020.987%208.912%2010.884%2020.442%2019.626%2034.014%2025.748%207.449%203.367%209.013%203.776%2010.816%202.789%202.245-1.224%202.483-4.864.374-6.224-.408-.272-2.279-1.123-4.183-1.871-20.681-8.367-36.293-22.551-45-40.986l-1.633-3.47%201.939-1.871c8.367-8.027%203.435-21.7-8.062-22.312-1.53-.068-3.265.034-4.183.306zm-122.245%2038.537c-9.388%201.973-15.987%208.061-18.368%2016.973-.748%202.721-.714%207.891.035%2010.544.306%201.123.646%202.381.714%202.789.136.578-.51%201.565-2.857%204.252-15.477%2017.789-26.089%2037.585-32.415%2060.442-2.075%207.483-3.98%2017.789-4.932%2026.735-1.123%2010.17-.987%2031.564.204%2035.986.442%201.667%202.415%203.844%203.945%204.354%202.892.952%206.531-.476%207.824-3.027.544-1.089.578-1.871.442-5.851-.374-10.238-.136-26.564.476-31.802%203.129-26.973%2012.007-49.66%2027.585-70.409%203.435-4.557%207.891-9.693%208.435-9.693.238%200%20.885.306%201.463.646%201.769%201.088%205.68%202.347%208.435%202.721%206.531.918%2013.81-1.633%2018.742-6.599%204.796-4.762%207.313-12.211%206.326-18.605-1.768-11.599-11.19-19.762-22.653-19.626-1.496.034-3.027.102-3.401.17z%22%2F%3E%3C%2Fsvg%3E');background-repeat:no-repeat}.jw-sharing-icon-tieba{background-image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20300%20300%22%3E%3Cstyle%3E.st0%7Bfill%3A%23FFFFFF%3B%7D%20.st1%7Bfill%3A%232932E1%3B%7D%3C%2Fstyle%3E%3Cpath%20class%3D%22st0%22%20d%3D%22M-0-0h300v300h-300z%22%2F%3E%3Cpath%20class%3D%22st1%22%20d%3D%22M108.462%2011.538c-3.385%201.231-8.616%204.924-11.847%208.462-7.846%208.769-11.23%2019.385-11.077%2034.769%200%2010.462.77%2013.846%204.924%2022.616%208.769%2019.077%2026.153%2025.077%2040%2013.846%2017.692-14.308%2020.923-48.154%206.769-68.462-3.693-5.231-16.769-13.692-20.923-13.538-.923.154-4.462%201.077-7.846%202.307zm82.769%206.462c-5.846%201.231-19.539%2014.923-23.846%2023.846-7.385%2015.077-7.077%2034.308.769%2046.154%206.923%2010.308%2022.461%2014.615%2034.615%209.538%2016.308-6.769%2028.769-31.692%2024.923-49.23-4.461-19.539-21.384-33.539-36.461-30.308zm-147.385%2058.154c-8.154%202.769-17.077%2013.077-20.154%2022.923-6.154%2020.154-3.846%2036.615%206.923%2048.923%207.847%208.769%2013.077%2011.077%2024.616%2010.154%2012.307-.923%2020.154-6.308%2025.846-18%203.692-7.385%204.154-10.308%204.154-22.462%200-11.077-.616-15.077-3.385-20.154-5.077-9.846-10.461-15.384-19.077-19.692-9.077-4.615-10.461-4.615-18.923-1.692zm185.692%2021.692c-11.538%205.846-17.23%2018.923-17.23%2039.692%200%2015.385%202%2022.616%207.846%2029.385%206.461%207.385%2016%2010.615%2028.154%209.692%2011.23-.923%2017.23-4%2022.154-11.077%205.076-7.384%206.461-13.846%206.461-29.538%200-12.462-.461-15.077-4.308-22.308-6.307-12-14.461-17.384-27.692-18-7.385-.307-11.692.308-15.385%202.154zm-98.769%2030c-10.154%204.616-16.154%209.692-22.923%2019.539-9.077%2013.23-17.538%2022.307-36%2038.307-28%2024.154-33.846%2033.231-34%2052-.308%2022.616%2012.769%2042.616%2031.077%2047.846%2010.615%203.077%2038.154%202.308%2058.769-1.846%2016-3.077%2032-2.307%2051.539%202.616%2019.692%204.923%2041.538%204.923%2052.769%200%2021.231-9.539%2032.154-38.616%2023.231-62.616-2.462-6.615-5.539-10.769-12.616-17.384-22.153-20.462-47.23-46.308-55.23-57.077-8.923-12-18.154-19.846-27.231-22.769-8.154-2.77-21.539-2.154-29.385%201.384zm4.616%2042.923c2%201.231%202.307%208.616%202.769%2047.693l.461%2046.153h-18.307c-22.462%200-31.231-2.307-39.077-10.307-7.231-7.385-8.923-12.154-8.923-24.308%200-11.846%201.692-16.923%208.154-23.538%208.153-8.616%2014.615-11.077%2028.769-11.077h12.307v-26.154h5.847c3.077%200%206.769.769%208%201.538zm30.769%2048.769c0%2028%20.154%2028.154%2016.461%2028.154h11.231v-49.23h18.769l-.615%2029.384c-.615%2037.231.923%2035.231-27.692%2035.231-21.539%200-26-1.231-31.846-8.615-2.924-3.847-3.231-6-3.231-29.847%200-14.153.461-26.153%201.077-26.615.461-.615%204.307-1.077%208.461-1.077h7.385v22.615zm-67.385-7.23c-8.615%205.23-11.692%2016.615-7.384%2026.923%203.077%207.077%209.692%2010.307%2020.615%209.692l8.769-.461v-38.462l-8.461-.462c-6.308-.307-9.693.462-13.539%202.77z%22%2F%3E%3C%2Fsvg%3E');background-repeat:no-repeat}.jw-sharing-icon-renren{background-image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20300%20300%22%3E%3Cstyle%3E.st0%7Bfill%3A%23005BAA%3B%7D%20.st1%7Bfill%3A%23FFFFFF%3B%7D%3C%2Fstyle%3E%3Cpath%20class%3D%22st0%22%20d%3D%22M0%200h300v300H0z%22%2F%3E%3Cpath%20class%3D%22st1%22%20d%3D%22M151.445%2C185.751%20C152.865%2C186.654%20154.027%2C188.59%20154.027%2C190.01%20C154.027%2C191.559%20157.641%2C200.208%20162.03%2C209.502%20C166.806%2C219.441%20176.745%2C233.253%20186.814%2C243.967%20C196.108%2C253.778%20207.596%2C264.363%20212.502%2C267.331%20C215.976%2C269.365%20213.939%2C268.067%20218.461%2C271.454%20L218.648%2C271.792%20C197.325%2C284.063%20174.952%2C288.889%20150.559%2C289.506%20C129.378%2C289.582%20108.66%2C284.572%2089.523%2C275.623%20C86.949%2C274.419%2084.529%2C272.91%2082.032%2C271.554%20C83.401%2C269.818%2085.554%2C268.742%2087.419%2C267.59%20C92.195%2C264.621%20103.684%2C254.294%20113.107%2C244.613%20C123.821%2C233.382%20132.728%2C220.99%20137.762%2C210.276%20C142.022%2C200.982%20146.282%2C191.43%20147.185%2C188.849%20C148.089%2C186.267%20150.025%2C184.847%20151.445%2C185.751%20z%20M173.45%2C9.855%20C184.969%2C12.21%20187.593%2C12.322%20198.965%2C16.479%20C246.594%2C33.89%20282.093%2C77.124%20289.721%2C127.281%20C293.974%2C155.242%20289.739%2C184.249%20277.461%2C209.757%20C271.303%2C222.55%20265.245%2C230.688%20256.352%2C241.465%20C252.371%2C240.643%20254.678%2C241.273%20249.548%2C239.191%20C244.772%2C236.868%20233.284%2C227.961%20224.248%2C219.441%20C215.083%2C210.922%20203.337%2C197.497%20198.044%2C189.752%20C192.752%2C181.878%20186.427%2C170.131%20183.845%2C163.806%20C181.263%2C157.352%20177.649%2C145.735%20175.713%2C137.99%20C173.389%2C128.308%20172.227%2C105.46%20172.227%2C66.735%20z%20M125.842%2C10.62%20C126.709%2C28.95%20126.8%2C37.717%20126.849%2C44.154%20C126.979%2C61.302%20126.989%2C78.461%20126.831%2C95.608%20C126.716%2C108.169%20127.017%2C121.524%20125.039%2C133.981%20C123.947%2C140.861%20123.685%2C141.234%20122.014%2C147.025%20C119.303%2C155.545%20114.398%2C167.808%20111.3%2C174.133%20C108.073%2C180.587%20100.199%2C192.85%2093.744%2C201.499%20C87.29%2C210.018%2075.027%2C222.152%2066.379%2C228.477%20C57.73%2C234.802%2048.436%2C240.74%2045.596%2C241.773%20L45.128%2C241.903%20C36.494%2C232.255%2029.274%2C221.426%2023.657%2C209.757%20C-1.09%2C158.347%207.942%2C96.32%2046.347%2C54.06%20C61.587%2C37.291%2091.725%2C20.213%20102.152%2C16.479%20C112.579%2C12.745%20123.924%2C9.342%20125.842%2C10.62%20z%22%2F%3E%3C%2Fsvg%3E');background-repeat:no-repeat}.jw-sharing-icon-share{background-image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2215%22%20height%3D%2212%22%20viewBox%3D%220%200%2015%2012%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3Eshare%3C%2Ftitle%3E%3Cpath%20d%3D%22M12.5%205c-.9%200-1.6-.5-2.1-1.1l-4.9%202%203.2%201.9c.4-.5%201.1-.8%201.8-.8C11.9%207%2013%208.1%2013%209.5S11.9%2012%2010.5%2012C9.2%2012%208.2%2011%208%209.8L4%207.5c-.4.3-.9.5-1.5.5C1.1%208%200%206.9%200%205.5S1.1%203%202.5%203c.9%200%201.6.5%202.1%201.1l5.5-2.3c.3-1%201.3-1.8%202.4-1.8C13.9%200%2015%201.1%2015%202.5S13.9%205%2012.5%205z%22%20fill%3D%22%23FFF%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E');background-repeat:no-repeat}.jw-sharing-icon-weibo{background-image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%2C%200%2C%20300%2C%20300%22%3E%3Cstyle%3E.st0%7Bfill%3A%23E01E2C%3B%7D%20.st1%7Bfill%3A%23FFFFFF%3B%7D%3C%2Fstyle%3E%3Cpath%20class%3D%22st0%22%20d%3D%22M-0-0h300v300h-300z%22%2F%3E%3Cpath%20class%3D%22st1%22%20d%3D%22M196.802%2039.964c-8.656%203.787-10.64%2012.803-4.328%2019.115%203.066%203.066%205.951%203.607%2018.574%203.607%2017.673%200%2029.575%204.688%2038.592%2015.148%2011%2012.443%2012.263%2016.23%2012.263%2038.952%200%2020.197%200%2020.558%204.688%2023.263%2010.82%206.131%2018.034-1.443%2020.558-21.64%203.246-26.329-12.443-56.986-36.066-71.052-15.509-9.016-42.018-12.623-54.281-7.393zm-88.724%2033.542c-20.198%207.213-39.674%2021.099-60.592%2043.46-49.592%2052.658-46.346%20102.791%208.295%20129.48%2056.805%2027.771%20133.267%2018.574%20174.924-21.099%2031.198-29.575%2027.411-66.724-8.115-79.347-6.312-2.164-8.296-3.787-7.394-5.771%203.246-7.934%204.328-17.131%202.525-22.541-5.591-17.132-25.968-21.099-56.264-10.82l-12.083%204.147%201.082-12.082c1.263-14.246-1.803-22.001-10.279-26.329-7.033-3.607-20.558-3.246-32.099.902zm50.133%2069.789c26.869%207.394%2043.28%2023.624%2043.28%2042.919%200%2021.46-19.116%2040.756-50.133%2051.035-16.591%205.41-47.428%206.492-62.576%202.344-28.673-8.115-44.903-23.984-44.903-44.362%200-11.181%204.869-20.919%2015.509-30.837%209.918-9.377%2017.492-13.886%2032.099-18.755%2022.001-7.393%2045.625-8.295%2066.724-2.344zm-56.806%2017.492c-18.213%208.476-27.951%2021.46-27.951%2037.69%200%2014.788%206.492%2024.886%2020.738%2032.46%2011%205.951%2031.198%205.41%2043.461-.901%2015.689-8.296%2025.968-23.624%2025.968-38.592-.181-12.263-11.001-26.87-23.804-32.099-10.279-4.328-27.592-3.607-38.412%201.442zm13.165%2033.903c1.262%201.262%202.164%204.328%202.164%207.033%200%209.017-15.148%2016.411-21.28%2010.279-3.426-3.426-2.524-11.902%201.443-15.869%203.967-3.968%2014.246-4.869%2017.673-1.443zm85.298-117.758c-8.296%208.296-2.705%2018.214%2010.459%2018.214%2011.361%200%2016.41%205.771%2016.41%2018.755%200%208.115.722%2010.459%203.968%2012.623%209.738%206.853%2017.673-.721%2017.673-16.771%200-19.656-14.067-34.444-34.084-35.887-9.016-.721-11.18-.18-14.426%203.066z%22%2F%3E%3C%2Fsvg%3E');background-repeat:no-repeat}.jw-sharing-icon-twitter{background-image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%22-120%20-120%20100%20100%22%3E%3Cstyle%3E.st0%7Bfill%3A%2355ACEE%3B%7D%20.st1%7Bfill%3A%23FFFFFF%3B%7D%3C%2Fstyle%3E%3Cpath%20class%3D%22st0%22%20d%3D%22M-120-120h100v100h-100z%22%2F%3E%3Cpath%20class%3D%22st1%22%20d%3D%22M-40-88.6c-2.2%201-4.6%201.6-7.1%201.9%202.5-1.5%204.5-3.9%205.4-6.8-2.4%201.4-5%202.4-7.8%203-2.2-2.4-5.4-3.9-9-3.9-6.8%200-12.3%205.5-12.3%2012.3%200%201%20.1%201.9.3%202.8-10.2-.5-19.3-5.4-25.4-12.9-1.1%201.8-1.7%203.9-1.7%206.2%200%204.3%202.2%208%205.5%2010.2-2-.1-3.9-.6-5.6-1.5v.2c0%206%204.2%2010.9%209.9%2012.1-1%20.3-2.1.4-3.2.4-.8%200-1.6-.1-2.3-.2%201.6%204.9%206.1%208.4%2011.5%208.5-4.2%203.4-9.5%205.3-15.3%205.3-1%200-2-.1-2.9-.2%205.4%203.5%2011.9%205.5%2018.9%205.5%2022.6%200%2035-18.8%2035-35v-1.6c2.4-1.7%204.4-3.8%206.1-6.3z%22%2F%3E%3C%2Fsvg%3E');background-repeat:no-repeat}.jw-sharing-dock-btn .jw-dock-image{background-image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2215%22%20height%3D%2212%22%20viewBox%3D%220%200%2015%2012%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3Eshare%3C%2Ftitle%3E%3Cpath%20d%3D%22M12.5%205c-.9%200-1.6-.5-2.1-1.1l-4.9%202%203.2%201.9c.4-.5%201.1-.8%201.8-.8C11.9%207%2013%208.1%2013%209.5S11.9%2012%2010.5%2012C9.2%2012%208.2%2011%208%209.8L4%207.5c-.4.3-.9.5-1.5.5C1.1%208%200%206.9%200%205.5S1.1%203%202.5%203c.9%200%201.6.5%202.1%201.1l5.5-2.3c.3-1%201.3-1.8%202.4-1.8C13.9%200%2015%201.1%2015%202.5S13.9%205%2012.5%205z%22%20fill%3D%22%23FFF%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E');background-repeat:no-repeat}.jw-plugin-sharing{-webkit-box-align:center;-ms-grid-row-align:center;align-items:center;background-color:rgba(0,0,0,.75);bottom:0;display:none;height:100%;-webkit-box-pack:center;justify-content:center;position:relative;width:100%}.jw-plugin-sharing.jw-show{display:-webkit-box;display:flex}.jw-plugin-sharing:after{background-color:#fff;border-radius:50px;bottom:20px;color:#000;content:'链接已复制';display:block;font-size:13px;font-weight:700;opacity:0;margin-left:-50px;padding:2px 5px;left:50%;position:absolute;text-align:center;-webkit-transform:translateY(10px);transform:translateY(10px);-webkit-transition:all .2s ease-in-out;transition:all .2s ease-in-out;visibility:hidden;width:100px}.jw-plugin-sharing-link-copied:after{opacity:1;-webkit-transform:translateY(0);transform:translateY(0);visibility:visible}.jw-plugin-sharing .jw-sharing-close-icon{-webkit-box-align:center;align-items:center;background-position:50%;background-repeat:no-repeat;background-size:34px auto;color:#fff;cursor:pointer;display:-webkit-box;display:flex;font-size:1em;height:44px;-webkit-box-pack:center;justify-content:center;position:absolute;right:5px;text-align:right;top:5px;width:44px}.jw-plugin-sharing .jw-sharing-content{padding:0 44px}.jw-breakpoint-0 .jw-plugin-sharing .jw-sharing-content{padding:5px 54px 5px 5px}.jw-plugin-sharing .jw-sharing-heading{color:#fff;margin-bottom:15px;padding:0 5px}.jw-breakpoint-0 .jw-plugin-sharing .jw-sharing-heading{display:none}.jw-plugin-sharing .jw-sharing-icons{display:-webkit-inline-box;display:inline-flex;flex-wrap:wrap}.jw-plugin-sharing .jw-sharing-icon-container{position:relative}.jw-plugin-sharing .jw-sharing-icon{background-position:50%;background-repeat:no-repeat;background-size:34px auto;cursor:pointer;display:block;height:44px;width:44px}.jw-plugin-sharing .jw-sharing-textarea{cursor:pointer;left:0;opacity:0;position:absolute;top:0;z-index:1;height:100%;width:100%}", ""])
}, function(t, e) {
	t.exports = function() {
		var t = [];
		return t.toString = function() {
			for (var t = [], e = 0; e < this.length; e++) {
				var i = this[e];
				i[2] ? t.push("@media " + i[2] + "{" + i[1] + "}") : t.push(i[1])
			}
			return t.join("")
		}, t.i = function(e, i) {
			"string" == typeof e && (e = [
				[null, e, ""]
			]);
			for (var n = {}, a = 0; a < this.length; a++) {
				var s = this[a][0];
				"number" == typeof s && (n[s] = !0)
			}
			for (a = 0; a < e.length; a++) {
				var r = e[a];
				"number" == typeof r[0] && n[r[0]] || (i && !r[2] ? r[2] = i : i && (r[2] = "(" + r[2] + ") and (" + i + ")"), t.push(r))
			}
		}, t
	}
}, function(t, e, i) {
	function n(t, e) {
		for (var i = 0; i < t.length; i++) {
			var n = t[i],
				a = d[n.id];
			if (a) {
				a.refs++;
				for (var s = 0; s < a.parts.length; s++) a.parts[s](n.parts[s]);
				for (; s < n.parts.length; s++) a.parts.push(o(n.parts[s], e))
			} else {
				for (var r = [], s = 0; s < n.parts.length; s++) r.push(o(n.parts[s], e));
				d[n.id] = {
					id: n.id,
					refs: 1,
					parts: r
				}
			}
		}
	}
	function a(t) {
		for (var e = [], i = {}, n = 0; n < t.length; n++) {
			var a = t[n],
				s = a[0],
				r = a[1],
				l = a[2],
				o = {
					css: r,
					media: l
				};
			i[s] ? i[s].parts.push(o) : e.push(i[s] = {
				id: s,
				parts: [o]
			})
		}
		return e
	}
	function s(t, e) {
		var i = u(),
			n = F[F.length - 1];
		if ("top" === t.insertAt) n ? n.nextSibling ? i.insertBefore(e, n.nextSibling) : i.appendChild(e) : i.insertBefore(e, i.firstChild), F.push(e);
		else {
			if ("bottom" !== t.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
			i.appendChild(e)
		}
	}
	function r(t) {
		t.parentNode.removeChild(t);
		var e = F.indexOf(t);
		e >= 0 && F.splice(e, 1)
	}
	function l(t) {
		var e = document.createElement("style");
		return e.type = "text/css", s(t, e), e
	}
	function o(t, e) {
		var i, n, a;
		if (e.singleton) {
			var s = v++;
			i = w || (w = l(e)), n = c.bind(null, i, s, !1), a = c.bind(null, i, s, !0)
		} else i = l(e), n = h.bind(null, i), a = function() {
			r(i)
		};
		return n(t), function(e) {
			if (e) {
				if (e.css === t.css && e.media === t.media) return;
				n(t = e)
			} else a()
		}
	}
	function c(t, e, i, n) {
		var a = i ? "" : n.css;
		if (t.styleSheet) t.styleSheet.cssText = f(e, a);
		else {
			var s = document.createTextNode(a),
				r = t.childNodes;
			r[e] && t.removeChild(r[e]), r.length ? t.insertBefore(s, r[e]) : t.appendChild(s)
		}
	}
	function h(t, e) {
		var i = e.css,
			n = e.media;
		if (n && t.setAttribute("media", n), t.styleSheet) t.styleSheet.cssText = i;
		else {
			for (; t.firstChild;) t.removeChild(t.firstChild);
			t.appendChild(document.createTextNode(i))
		}
	}
	var d = {},
		g = function(t) {
			var e;
			return function() {
				return "undefined" == typeof e && (e = t.apply(this, arguments)), e
			}
		},
		p = g(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())
		}),
		u = g(function() {
			return document.head || document.getElementsByTagName("head")[0]
		}),
		w = null,
		v = 0,
		F = [];
	t.exports = function(t, e) {
		e = e || {}, "undefined" == typeof e.singleton && (e.singleton = p()), "undefined" == typeof e.insertAt && (e.insertAt = "bottom");
		var i = a(t);
		return n(i, e), function(t) {
			for (var s = [], r = 0; r < i.length; r++) {
				var l = i[r],
					o = d[l.id];
				o.refs--, s.push(o)
			}
			if (t) {
				var c = a(t);
				n(c, e)
			}
			for (var r = 0; r < s.length; r++) {
				var o = s[r];
				if (0 === o.refs) {
					for (var h = 0; h < o.parts.length; h++) o.parts[h]();
					delete d[o.id]
				}
			}
		}
	};
	var f = function() {
			var t = [];
			return function(e, i) {
				return t[e] = i, t.filter(Boolean).join("\n")
			}
		}()
}]);