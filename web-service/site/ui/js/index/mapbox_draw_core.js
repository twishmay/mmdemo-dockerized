! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.MapboxDraw = e()
    }
}(function() {
    return function e(t, n, r) {
        function o(s, a) {
            if (!n[s]) {
                if (!t[s]) {
                    var u = "function" == typeof require && require;
                    if (!a && u) return u(s, !0);
                    if (i) return i(s, !0);
                    var c = new Error("Cannot find module '" + s + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var l = n[s] = {
                    exports: {}
                };
                t[s][0].call(l.exports, function(e) {
                    var n = t[s][1][e];
                    return o(n || e)
                }, l, l.exports, e, t, n, r)
            }
            return n[s].exports
        }
        for (var i = "function" == typeof require && require, s = 0; s < r.length; s++) o(r[s]);
        return o
    }({
        1: [function(e, t, n) {
            "use strict";
            var r = e("./src/setup"),
                o = e("./src/options"),
                i = e("./src/api"),
                s = e("./src/constants"),
                a = function(e, t) {
                    e = o(e);
                    var n = {
                        options: e
                    };
                    t = i(n, t), n.api = t;
                    var a = r(n);
                    return t.onAdd = a.onAdd, t.onRemove = a.onRemove, t.types = s.types, t.options = e, t
                };
            t.exports = function(e) {
                a(e, this)
            }
        }, {
            "./src/api": 23,
            "./src/constants": 24,
            "./src/options": 59,
            "./src/setup": 61
        }],
        2: [function(e, t, n) {
            function r(e) {
                var t, n = 0;
                switch (e.type) {
                    case "Polygon":
                        return o(e.coordinates);
                    case "MultiPolygon":
                        for (t = 0; t < e.coordinates.length; t++) n += o(e.coordinates[t]);
                        return n;
                    case "Point":
                    case "MultiPoint":
                    case "LineString":
                    case "MultiLineString":
                        return 0;
                    case "GeometryCollection":
                        for (t = 0; t < e.geometries.length; t++) n += r(e.geometries[t]);
                        return n
                }
            }

            function o(e) {
                var t = 0;
                if (e && e.length > 0) {
                    t += Math.abs(i(e[0]));
                    for (var n = 1; n < e.length; n++) t -= Math.abs(i(e[n]))
                }
                return t
            }

            function i(e) {
                var t, n, r, o, i, u, c, l = 0,
                    p = e.length;
                if (p > 2) {
                    for (c = 0; c < p; c++) c === p - 2 ? (o = p - 2, i = p - 1, u = 0) : c === p - 1 ? (o = p - 1, i = 0, u = 1) : (o = c, i = c + 1, u = c + 2), t = e[o], n = e[i], r = e[u], l += (s(r[0]) - s(t[0])) * Math.sin(s(n[1]));
                    l = l * a.RADIUS * a.RADIUS / 2
                }
                return l
            }

            function s(e) {
                return e * Math.PI / 180
            }
            var a = e("wgs84");
            t.exports.geometry = r, t.exports.ring = i
        }, {
            wgs84: 21
        }],
        3: [function(e, t, n) {
            function r(e) {
                if (!e || !e.type) return null;
                var t = o[e.type];
                return t ? "geometry" === t ? {
                    type: "FeatureCollection",
                    features: [{
                        type: "Feature",
                        properties: {},
                        geometry: e
                    }]
                } : "feature" === t ? {
                    type: "FeatureCollection",
                    features: [e]
                } : "featurecollection" === t ? e : void 0 : null
            }
            t.exports = r;
            var o = {
                Point: "geometry",
                MultiPoint: "geometry",
                LineString: "geometry",
                MultiLineString: "geometry",
                Polygon: "geometry",
                MultiPolygon: "geometry",
                GeometryCollection: "geometry",
                Feature: "feature",
                FeatureCollection: "featurecollection"
            }
        }, {}],
        4: [function(e, t, n) {
            function r(e, t) {
                var n, r = [];
                if ("object" == typeof e) n = e;
                else {
                    if ("string" != typeof e) return [{
                        message: "Expected string or object as input",
                        line: 0
                    }];
                    try {
                        n = o.parse(e)
                    } catch (e) {
                        var s = e.message.match(/line (\d+)/),
                            a = parseInt(s[1], 10);
                        return [{
                            line: a - 1,
                            message: e.message,
                            error: e
                        }]
                    }
                }
                return r = r.concat(i.hint(n, t))
            }
            var o = e("jsonlint-lines"),
                i = e("./object");
            t.exports.hint = r
        }, {
            "./object": 5,
            "jsonlint-lines": 15
        }],
        5: [function(e, t, n) {
            function r(e, t) {
                function n(e) {
                    if (t && !1 === t.noDuplicateMembers || !e.__duplicateProperties__ || b.push({
                            message: "An object contained duplicate members, making parsing ambigous: " + e.__duplicateProperties__.join(", "),
                            line: e.__line__
                        }), !i(e, "type", "string"))
                        if (x[e.type]) e && x[e.type](e);
                        else {
                            var n = S[e.type.toLowerCase()];
                            void 0 !== n ? b.push({
                                message: "Expected " + n + " but got " + e.type + " (case sensitive)",
                                line: e.__line__
                            }) : b.push({
                                message: "The type " + e.type + " is unknown",
                                line: e.__line__
                            })
                        }
                }

                function r(e, t) {
                    return e.every(function(e) {
                        return null !== e && typeof e === t
                    })
                }

                function i(e, t, n) {
                    if (void 0 === e[t]) return b.push({
                        message: '"' + t + '" member required',
                        line: e.__line__
                    });
                    if ("array" === n) {
                        if (!Array.isArray(e[t])) return b.push({
                            message: '"' + t + '" member should be an array, but is an ' + typeof e[t] + " instead",
                            line: e.__line__
                        })
                    } else {
                        if ("object" === n && e[t] && "Object" !== e[t].constructor.name) return b.push({
                            message: '"' + t + '" member should be ' + n + ", but is an " + e[t].constructor.name + " instead",
                            line: e.__line__
                        });
                        if (n && typeof e[t] !== n) return b.push({
                            message: '"' + t + '" member should be ' + n + ", but is an " + typeof e[t] + " instead",
                            line: e.__line__
                        })
                    }
                }

                function s(e) {
                    if (c(e), l(e), void 0 !== e.properties && b.push({
                            message: 'FeatureCollection object cannot contain a "properties" member',
                            line: e.__line__
                        }), void 0 !== e.coordinates && b.push({
                            message: 'FeatureCollection object cannot contain a "coordinates" member',
                            line: e.__line__
                        }), !i(e, "features", "array")) {
                        if (!r(e.features, "object")) return b.push({
                            message: "Every feature must be an object",
                            line: e.__line__
                        });
                        e.features.forEach(v)
                    }
                }

                function a(e, n) {
                    if (!Array.isArray(e)) return b.push({
                        message: "position should be an array, is a " + typeof e + " instead",
                        line: e.__line__ || n
                    });
                    if (e.length < 2) return b.push({
                        message: "position must have 2 or more elements",
                        line: e.__line__ || n
                    });
                    if (e.length > 3) return b.push({
                        message: "position should not have more than 3 elements",
                        level: "message",
                        line: e.__line__ || n
                    });
                    if (!r(e, "number")) return b.push({
                        message: "each element in a position must be a number",
                        line: e.__line__ || n
                    });
                    if (t && t.precisionWarning) {
                        if (E === T) return E += 1, b.push({
                            message: "truncated warnings: we've encountered coordinate precision warning " + T + " times, no more warnings will be reported",
                            level: "message",
                            line: e.__line__ || n
                        });
                        E < T && e.forEach(function(t) {
                            var r = 0,
                                o = String(t).split(".")[1];
                            if (void 0 !== o && (r = o.length), r > O) return E += 1, b.push({
                                message: "precision of coordinates should be reduced",
                                level: "message",
                                line: e.__line__ || n
                            })
                        })
                    }
                }

                function u(e, t, n, r) {
                    if (void 0 === r && void 0 !== e.__line__ && (r = e.__line__), 0 === n) return a(e, r);
                    if (1 === n && t)
                        if ("LinearRing" === t) {
                            if (!Array.isArray(e[e.length - 1])) return b.push({
                                message: "a number was found where a coordinate array should have been found: this needs to be nested more deeply",
                                line: r
                            }), !0;
                            if (e.length < 4 && b.push({
                                    message: "a LinearRing of coordinates needs to have four or more positions",
                                    line: r
                                }), e.length && (e[e.length - 1].length !== e[0].length || !e[e.length - 1].every(function(t, n) {
                                    return e[0][n] === t
                                }))) return b.push({
                                message: "the first and last positions in a LinearRing of coordinates must be the same",
                                line: r
                            }), !0
                        } else if ("Line" === t && e.length < 2) return b.push({
                            message: "a line needs to have two or more coordinates to be valid",
                            line: r
                        });
                    if (Array.isArray(e)) {
                        return e.map(function(e) {
                            return u(e, t, n - 1, e.__line__ || r)
                        }).some(function(e) {
                            return e
                        })
                    }
                    b.push({
                        message: "a number was found where a coordinate array should have been found: this needs to be nested more deeply",
                        line: r
                    })
                }

                function c(e) {
                    if (e.crs) {
                        "object" == typeof e.crs && e.crs.properties && "urn:ogc:def:crs:OGC:1.3:CRS84" === e.crs.properties.name ? b.push({
                            message: "old-style crs member is not recommended, this object is equivalent to the default and should be removed",
                            line: e.__line__
                        }) : b.push({
                            message: "old-style crs member is not recommended",
                            line: e.__line__
                        })
                    }
                }

                function l(e) {
                    if (e.bbox) return Array.isArray(e.bbox) ? (r(e.bbox, "number") || b.push({
                        message: "each element in a bbox member must be a number",
                        line: e.bbox.__line__
                    }), 4 !== e.bbox.length && 6 !== e.bbox.length && b.push({
                        message: "bbox must contain 4 elements (for 2D) or 6 elements (for 3D)",
                        line: e.bbox.__line__
                    }), b.length) : void b.push({
                        message: "bbox member must be an array of numbers, but is a " + typeof e.bbox,
                        line: e.__line__
                    })
                }

                function p(e) {
                    void 0 !== e.properties && b.push({
                        message: 'geometry object cannot contain a "properties" member',
                        line: e.__line__
                    }), void 0 !== e.geometry && b.push({
                        message: 'geometry object cannot contain a "geometry" member',
                        line: e.__line__
                    }), void 0 !== e.features && b.push({
                        message: 'geometry object cannot contain a "features" member',
                        line: e.__line__
                    })
                }

                function f(e) {
                    c(e), l(e), p(e), i(e, "coordinates", "array") || a(e.coordinates)
                }

                function d(e) {
                    c(e), l(e), i(e, "coordinates", "array") || u(e.coordinates, "LinearRing", 2) || o(e, b)
                }

                function h(e) {
                    c(e), l(e), i(e, "coordinates", "array") || u(e.coordinates, "LinearRing", 3) || o(e, b)
                }

                function y(e) {
                    c(e), l(e), i(e, "coordinates", "array") || u(e.coordinates, "Line", 1)
                }

                function g(e) {
                    c(e), l(e), i(e, "coordinates", "array") || u(e.coordinates, "Line", 2)
                }

                function m(e) {
                    c(e), l(e), i(e, "coordinates", "array") || u(e.coordinates, "", 1)
                }

                function _(e) {
                    c(e), l(e), i(e, "geometries", "array") || (r(e.geometries, "object") || b.push({
                        message: "The geometries array in a GeometryCollection must contain only geometry objects",
                        line: e.__line__
                    }), 1 === e.geometries.length && b.push({
                        message: "GeometryCollection with a single geometry should be avoided in favor of single part or a single object of multi-part type",
                        line: e.geometries.__line__
                    }), e.geometries.forEach(function(t) {
                        t && ("GeometryCollection" === t.type && b.push({
                            message: "GeometryCollection should avoid nested geometry collections",
                            line: e.geometries.__line__
                        }), n(t))
                    }))
                }

                function v(e) {
                    c(e), l(e), void 0 !== e.id && "string" != typeof e.id && "number" != typeof e.id && b.push({
                        message: 'Feature "id" member must have a string or number value',
                        line: e.__line__
                    }), void 0 !== e.features && b.push({
                        message: 'Feature object cannot contain a "features" member',
                        line: e.__line__
                    }), void 0 !== e.coordinates && b.push({
                        message: 'Feature object cannot contain a "coordinates" member',
                        line: e.__line__
                    }), "Feature" !== e.type && b.push({
                        message: "GeoJSON features must have a type=feature member",
                        line: e.__line__
                    }), i(e, "properties", "object"), i(e, "geometry", "object") || e.geometry && n(e.geometry)
                }
                var b = [],
                    E = 0,
                    T = 10,
                    O = 6,
                    x = {
                        Point: f,
                        Feature: v,
                        MultiPoint: m,
                        LineString: y,
                        MultiLineString: g,
                        FeatureCollection: s,
                        GeometryCollection: _,
                        Polygon: d,
                        MultiPolygon: h
                    },
                    S = Object.keys(x).reduce(function(e, t) {
                        return e[t.toLowerCase()] = t, e
                    }, {});
                return "object" != typeof e || null === e || void 0 === e ? (b.push({
                    message: "The root of a GeoJSON object must be an object.",
                    line: 0
                }), b) : (n(e), b.forEach(function(e) {
                    ({}).hasOwnProperty.call(e, "line") && void 0 === e.line && delete e.line
                }), b)
            }
            var o = e("./rhr");
            t.exports.hint = r
        }, {
            "./rhr": 6
        }],
        6: [function(e, t, n) {
            function r(e) {
                return e * Math.PI / 180
            }

            function o(e) {
                var t = 0;
                if (e.length > 2)
                    for (var n, o, i = 0; i < e.length - 1; i++) n = e[i], o = e[i + 1], t += r(o[0] - n[0]) * (2 + Math.sin(r(n[1])) + Math.sin(r(o[1])));
                return t >= 0
            }

            function i(e) {
                if (e && e.length > 0) {
                    if (o(e[0])) return !1;
                    if (!e.slice(1, e.length).every(o)) return !1
                }
                return !0
            }

            function s(e) {
                return "Polygon" === e.type ? i(e.coordinates) : "MultiPolygon" === e.type ? e.coordinates.every(i) : void 0
            }
            t.exports = function(e, t) {
                s(e) || t.push({
                    message: "Polygons and MultiPolygons should follow the right-hand rule",
                    level: "message",
                    line: e.__line__
                })
            }
        }, {}],
        7: [function(e, t, n) {}, {}],
        8: [function(e, t, n) {
            function r() {
                if (!(this instanceof r)) return new r;
                this._bbox = [1 / 0, 1 / 0, -1 / 0, -1 / 0], this._valid = !1
            }
            t.exports = r, r.prototype.include = function(e) {
                return this._valid = !0, this._bbox[0] = Math.min(this._bbox[0], e[0]), this._bbox[1] = Math.min(this._bbox[1], e[1]), this._bbox[2] = Math.max(this._bbox[2], e[0]), this._bbox[3] = Math.max(this._bbox[3], e[1]), this
            }, r.prototype.union = function(e) {
                return this._valid = !0, this._bbox[0] = Math.min(this._bbox[0], e[0]), this._bbox[1] = Math.min(this._bbox[1], e[1]), this._bbox[2] = Math.max(this._bbox[2], e[2]), this._bbox[3] = Math.max(this._bbox[3], e[3]), this
            }, r.prototype.bbox = function() {
                return this._valid ? this._bbox : null
            }, r.prototype.contains = function(e) {
                return this._valid ? this._bbox[0] <= e[0] && this._bbox[1] <= e[1] && this._bbox[2] >= e[0] && this._bbox[3] >= e[1] : null
            }, r.prototype.polygon = function() {
                return this._valid ? {
                    type: "Polygon",
                    coordinates: [
                        [
                            [this._bbox[0], this._bbox[1]],
                            [this._bbox[2], this._bbox[1]],
                            [this._bbox[2], this._bbox[3]],
                            [this._bbox[0], this._bbox[3]],
                            [this._bbox[0], this._bbox[1]]
                        ]
                    ]
                } : null
            }
        }, {}],
        9: [function(e, t, n) {
            t.exports = function(e, t) {
                function n(e) {
                    return Array.isArray(e) && e.length && "number" == typeof e[0] ? [e] : e.reduce(function(e, t) {
                        return Array.isArray(t) && Array.isArray(t[0]) ? e.concat(n(t)) : (e.push(t), e)
                    }, [])
                }
                return n(e)
            }
        }, {}],
        10: [function(e, t, n) {
            var r = e("geojson-normalize"),
                o = e("geojson-flatten"),
                i = e("./flatten");
            t.exports = function(e) {
                if (!e) return [];
                var t = o(r(e)),
                    n = [];
                return t.features.forEach(function(e) {
                    e.geometry && (n = n.concat(i(e.geometry.coordinates)))
                }), n
            }
        }, {
            "./flatten": 9,
            "geojson-flatten": 12,
            "geojson-normalize": 13
        }],
        11: [function(e, t, n) {
            function r(e) {
                for (var t = s(), n = o(e), r = 0; r < n.length; r++) t.include(n[r]);
                return t
            }
            var o = e("geojson-coords"),
                i = e("traverse"),
                s = e("extent");
            t.exports = function(e) {
                return r(e).bbox()
            }, t.exports.polygon = function(e) {
                return r(e).polygon()
            }, t.exports.bboxify = function(e) {
                return i(e).map(function(e) {
                    e && "string" == typeof e.type && (e.bbox = r(e).bbox(), this.update(e))
                })
            }
        }, {
            extent: 8,
            "geojson-coords": 10,
            traverse: 20
        }],
        12: [function(e, t, n) {
            function r(e, t) {
                switch (e && e.type || null) {
                    case "FeatureCollection":
                        return e.features = e.features.reduce(function(e, t) {
                            return e.concat(r(t))
                        }, []), e;
                    case "Feature":
                        return r(e.geometry).map(function(t) {
                            return {
                                type: "Feature",
                                properties: JSON.parse(JSON.stringify(e.properties)),
                                geometry: t
                            }
                        });
                    case "MultiPoint":
                        return e.coordinates.map(function(e) {
                            return {
                                type: "Point",
                                coordinates: e
                            }
                        });
                    case "MultiPolygon":
                        return e.coordinates.map(function(e) {
                            return {
                                type: "Polygon",
                                coordinates: e
                            }
                        });
                    case "MultiLineString":
                        return e.coordinates.map(function(e) {
                            return {
                                type: "LineString",
                                coordinates: e
                            }
                        });
                    case "GeometryCollection":
                        return e.geometries;
                    case "Point":
                    case "Polygon":
                    case "LineString":
                        return [e];
                    default:
                        return e
                }
            }
            t.exports = r
        }, {}],
        13: [function(e, t, n) {
            arguments[4][3][0].apply(n, arguments)
        }, {
            dup: 3
        }],
        14: [function(e, t, n) {
            var r = t.exports = function(e, t) {
                if (t || (t = 16), void 0 === e && (e = 128), e <= 0) return "0";
                for (var n = Math.log(Math.pow(2, e)) / Math.log(t), o = 2; n === 1 / 0; o *= 2) n = Math.log(Math.pow(2, e / o)) / Math.log(t) * o;
                for (var i = n - Math.floor(n), s = "", o = 0; o < Math.floor(n); o++) {
                    var a = Math.floor(Math.random() * t).toString(t);
                    s = a + s
                }
                if (i) {
                    var u = Math.pow(t, i),
                        a = Math.floor(Math.random() * u).toString(t);
                    s = a + s
                }
                var c = parseInt(s, t);
                return c !== 1 / 0 && c >= Math.pow(2, e) ? r(e, t) : s
            };
            r.rack = function(e, t, n) {
                var o = function(o) {
                        var s = 0;
                        do {
                            if (s++ > 10) {
                                if (!n) throw new Error("too many ID collisions, use more bits");
                                e += n
                            }
                            var a = r(e, t)
                        } while (Object.hasOwnProperty.call(i, a));
                        return i[a] = o, a
                    },
                    i = o.hats = {};
                return o.get = function(e) {
                    return o.hats[e]
                }, o.set = function(e, t) {
                    return o.hats[e] = t, o
                }, o.bits = e || 128, o.base = t || 16, o
            }
        }, {}],
        15: [function(e, t, n) {
            (function(r) {
                var o = function() {
                    function e() {
                        this.yy = {}
                    }
                    var t = function(e, t, n, r) {
                            for (n = n || {}, r = e.length; r--; n[e[r]] = t);
                            return n
                        },
                        n = [1, 12],
                        r = [1, 13],
                        o = [1, 9],
                        i = [1, 10],
                        s = [1, 11],
                        a = [1, 14],
                        u = [1, 15],
                        c = [14, 18, 22, 24],
                        l = [18, 22],
                        p = [22, 24],
                        f = {
                            trace: function() {},
                            yy: {},
                            symbols_: {
                                error: 2,
                                JSONString: 3,
                                STRING: 4,
                                JSONNumber: 5,
                                NUMBER: 6,
                                JSONNullLiteral: 7,
                                NULL: 8,
                                JSONBooleanLiteral: 9,
                                TRUE: 10,
                                FALSE: 11,
                                JSONText: 12,
                                JSONValue: 13,
                                EOF: 14,
                                JSONObject: 15,
                                JSONArray: 16,
                                "{": 17,
                                "}": 18,
                                JSONMemberList: 19,
                                JSONMember: 20,
                                ":": 21,
                                ",": 22,
                                "[": 23,
                                "]": 24,
                                JSONElementList: 25,
                                $accept: 0,
                                $end: 1
                            },
                            terminals_: {
                                2: "error",
                                4: "STRING",
                                6: "NUMBER",
                                8: "NULL",
                                10: "TRUE",
                                11: "FALSE",
                                14: "EOF",
                                17: "{",
                                18: "}",
                                21: ":",
                                22: ",",
                                23: "[",
                                24: "]"
                            },
                            productions_: [0, [3, 1],
                                [5, 1],
                                [7, 1],
                                [9, 1],
                                [9, 1],
                                [12, 2],
                                [13, 1],
                                [13, 1],
                                [13, 1],
                                [13, 1],
                                [13, 1],
                                [13, 1],
                                [15, 2],
                                [15, 3],
                                [20, 3],
                                [19, 1],
                                [19, 3],
                                [16, 2],
                                [16, 3],
                                [25, 1],
                                [25, 3]
                            ],
                            performAction: function(e, t, n, r, o, i, s) {
                                var a = i.length - 1;
                                switch (o) {
                                    case 1:
                                        this.$ = e.replace(/\\(\\|")/g, "$1").replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "\t").replace(/\\v/g, "\v").replace(/\\f/g, "\f").replace(/\\b/g, "\b");
                                        break;
                                    case 2:
                                        this.$ = Number(e);
                                        break;
                                    case 3:
                                        this.$ = null;
                                        break;
                                    case 4:
                                        this.$ = !0;
                                        break;
                                    case 5:
                                        this.$ = !1;
                                        break;
                                    case 6:
                                        return this.$ = i[a - 1];
                                    case 13:
                                        this.$ = {}, Object.defineProperty(this.$, "__line__", {
                                            value: this._$.first_line,
                                            enumerable: !1
                                        });
                                        break;
                                    case 14:
                                    case 19:
                                        this.$ = i[a - 1], Object.defineProperty(this.$, "__line__", {
                                            value: this._$.first_line,
                                            enumerable: !1
                                        });
                                        break;
                                    case 15:
                                        this.$ = [i[a - 2], i[a]];
                                        break;
                                    case 16:
                                        this.$ = {}, this.$[i[a][0]] = i[a][1];
                                        break;
                                    case 17:
                                        this.$ = i[a - 2], void 0 !== i[a - 2][i[a][0]] && (this.$.__duplicateProperties__ || Object.defineProperty(this.$, "__duplicateProperties__", {
                                            value: [],
                                            enumerable: !1
                                        }), this.$.__duplicateProperties__.push(i[a][0])), i[a - 2][i[a][0]] = i[a][1];
                                        break;
                                    case 18:
                                        this.$ = [], Object.defineProperty(this.$, "__line__", {
                                            value: this._$.first_line,
                                            enumerable: !1
                                        });
                                        break;
                                    case 20:
                                        this.$ = [i[a]];
                                        break;
                                    case 21:
                                        this.$ = i[a - 2], i[a - 2].push(i[a])
                                }
                            },
                            table: [{
                                3: 5,
                                4: n,
                                5: 6,
                                6: r,
                                7: 3,
                                8: o,
                                9: 4,
                                10: i,
                                11: s,
                                12: 1,
                                13: 2,
                                15: 7,
                                16: 8,
                                17: a,
                                23: u
                            }, {
                                1: [3]
                            }, {
                                14: [1, 16]
                            }, t(c, [2, 7]), t(c, [2, 8]), t(c, [2, 9]), t(c, [2, 10]), t(c, [2, 11]), t(c, [2, 12]), t(c, [2, 3]), t(c, [2, 4]), t(c, [2, 5]), t([14, 18, 21, 22, 24], [2, 1]), t(c, [2, 2]), {
                                3: 20,
                                4: n,
                                18: [1, 17],
                                19: 18,
                                20: 19
                            }, {
                                3: 5,
                                4: n,
                                5: 6,
                                6: r,
                                7: 3,
                                8: o,
                                9: 4,
                                10: i,
                                11: s,
                                13: 23,
                                15: 7,
                                16: 8,
                                17: a,
                                23: u,
                                24: [1, 21],
                                25: 22
                            }, {
                                1: [2, 6]
                            }, t(c, [2, 13]), {
                                18: [1, 24],
                                22: [1, 25]
                            }, t(l, [2, 16]), {
                                21: [1, 26]
                            }, t(c, [2, 18]), {
                                22: [1, 28],
                                24: [1, 27]
                            }, t(p, [2, 20]), t(c, [2, 14]), {
                                3: 20,
                                4: n,
                                20: 29
                            }, {
                                3: 5,
                                4: n,
                                5: 6,
                                6: r,
                                7: 3,
                                8: o,
                                9: 4,
                                10: i,
                                11: s,
                                13: 30,
                                15: 7,
                                16: 8,
                                17: a,
                                23: u
                            }, t(c, [2, 19]), {
                                3: 5,
                                4: n,
                                5: 6,
                                6: r,
                                7: 3,
                                8: o,
                                9: 4,
                                10: i,
                                11: s,
                                13: 31,
                                15: 7,
                                16: 8,
                                17: a,
                                23: u
                            }, t(l, [2, 17]), t(l, [2, 15]), t(p, [2, 21])],
                            defaultActions: {
                                16: [2, 6]
                            },
                            parseError: function(e, t) {
                                function n(e, t) {
                                    this.message = e, this.hash = t
                                }
                                if (!t.recoverable) throw n.prototype = Error, new n(e, t);
                                this.trace(e)
                            },
                            parse: function(e) {
                                var t = this,
                                    n = [0],
                                    r = [null],
                                    o = [],
                                    i = this.table,
                                    s = "",
                                    a = 0,
                                    u = 0,
                                    c = 0,
                                    l = o.slice.call(arguments, 1),
                                    p = Object.create(this.lexer),
                                    f = {
                                        yy: {}
                                    };
                                for (var d in this.yy) Object.prototype.hasOwnProperty.call(this.yy, d) && (f.yy[d] = this.yy[d]);
                                p.setInput(e, f.yy), f.yy.lexer = p, f.yy.parser = this, void 0 === p.yylloc && (p.yylloc = {});
                                var h = p.yylloc;
                                o.push(h);
                                var y = p.options && p.options.ranges;
                                "function" == typeof f.yy.parseError ? this.parseError = f.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
                                for (var g, m, _, v, b, E, T, O, x, S = function() {
                                    var e;
                                    return e = p.lex() || 1, "number" != typeof e && (e = t.symbols_[e] || e), e
                                }, I = {};;) {
                                    if (_ = n[n.length - 1], this.defaultActions[_] ? v = this.defaultActions[_] : (null !== g && void 0 !== g || (g = S()), v = i[_] && i[_][g]), void 0 === v || !v.length || !v[0]) {
                                        var C = "";
                                        x = [];
                                        for (E in i[_]) this.terminals_[E] && E > 2 && x.push("'" + this.terminals_[E] + "'");
                                        C = p.showPosition ? "Parse error on line " + (a + 1) + ":\n" + p.showPosition() + "\nExpecting " + x.join(", ") + ", got '" + (this.terminals_[g] || g) + "'" : "Parse error on line " + (a + 1) + ": Unexpected " + (1 == g ? "end of input" : "'" + (this.terminals_[g] || g) + "'"), this.parseError(C, {
                                            text: p.match,
                                            token: this.terminals_[g] || g,
                                            line: p.yylineno,
                                            loc: h,
                                            expected: x
                                        })
                                    }
                                    if (v[0] instanceof Array && v.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + _ + ", token: " + g);
                                    switch (v[0]) {
                                        case 1:
                                            n.push(g), r.push(p.yytext), o.push(p.yylloc), n.push(v[1]), g = null, m ? (g = m, m = null) : (u = p.yyleng, s = p.yytext, a = p.yylineno, h = p.yylloc, c > 0 && c--);
                                            break;
                                        case 2:
                                            if (T = this.productions_[v[1]][1], I.$ = r[r.length - T], I._$ = {
                                                    first_line: o[o.length - (T || 1)].first_line,
                                                    last_line: o[o.length - 1].last_line,
                                                    first_column: o[o.length - (T || 1)].first_column,
                                                    last_column: o[o.length - 1].last_column
                                                }, y && (I._$.range = [o[o.length - (T || 1)].range[0], o[o.length - 1].range[1]]), void 0 !== (b = this.performAction.apply(I, [s, u, a, f.yy, v[1], r, o].concat(l)))) return b;
                                            T && (n = n.slice(0, -1 * T * 2), r = r.slice(0, -1 * T), o = o.slice(0, -1 * T)), n.push(this.productions_[v[1]][0]), r.push(I.$), o.push(I._$), O = i[n[n.length - 2]][n[n.length - 1]], n.push(O);
                                            break;
                                        case 3:
                                            return !0
                                    }
                                }
                                return !0
                            }
                        },
                        d = function() {
                            return {
                                EOF: 1,
                                parseError: function(e, t) {
                                    if (!this.yy.parser) throw new Error(e);
                                    this.yy.parser.parseError(e, t)
                                },
                                setInput: function(e, t) {
                                    return this.yy = t || this.yy || {}, this._input = e, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
                                        first_line: 1,
                                        first_column: 0,
                                        last_line: 1,
                                        last_column: 0
                                    }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
                                },
                                input: function() {
                                    var e = this._input[0];
                                    return this.yytext += e, this.yyleng++, this.offset++, this.match += e, this.matched += e, e.match(/(?:\r\n?|\n).*/g) ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), e
                                },
                                unput: function(e) {
                                    var t = e.length,
                                        n = e.split(/(?:\r\n?|\n)/g);
                                    this._input = e + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - t), this.offset -= t;
                                    var r = this.match.split(/(?:\r\n?|\n)/g);
                                    this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), n.length - 1 && (this.yylineno -= n.length - 1);
                                    var o = this.yylloc.range;
                                    return this.yylloc = {
                                        first_line: this.yylloc.first_line,
                                        last_line: this.yylineno + 1,
                                        first_column: this.yylloc.first_column,
                                        last_column: n ? (n.length === r.length ? this.yylloc.first_column : 0) + r[r.length - n.length].length - n[0].length : this.yylloc.first_column - t
                                    }, this.options.ranges && (this.yylloc.range = [o[0], o[0] + this.yyleng - t]), this.yyleng = this.yytext.length, this
                                },
                                more: function() {
                                    return this._more = !0, this
                                },
                                reject: function() {
                                    return this.options.backtrack_lexer ? (this._backtrack = !0, this) : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
                                        text: "",
                                        token: null,
                                        line: this.yylineno
                                    })
                                },
                                less: function(e) {
                                    this.unput(this.match.slice(e))
                                },
                                pastInput: function() {
                                    var e = this.matched.substr(0, this.matched.length - this.match.length);
                                    return (e.length > 20 ? "..." : "") + e.substr(-20).replace(/\n/g, "")
                                },
                                upcomingInput: function() {
                                    var e = this.match;
                                    return e.length < 20 && (e += this._input.substr(0, 20 - e.length)), (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(/\n/g, "")
                                },
                                showPosition: function() {
                                    var e = this.pastInput(),
                                        t = new Array(e.length + 1).join("-");
                                    return e + this.upcomingInput() + "\n" + t + "^"
                                },
                                test_match: function(e, t) {
                                    var n, r, o;
                                    if (this.options.backtrack_lexer && (o = {
                                            yylineno: this.yylineno,
                                            yylloc: {
                                                first_line: this.yylloc.first_line,
                                                last_line: this.last_line,
                                                first_column: this.yylloc.first_column,
                                                last_column: this.yylloc.last_column
                                            },
                                            yytext: this.yytext,
                                            match: this.match,
                                            matches: this.matches,
                                            matched: this.matched,
                                            yyleng: this.yyleng,
                                            offset: this.offset,
                                            _more: this._more,
                                            _input: this._input,
                                            yy: this.yy,
                                            conditionStack: this.conditionStack.slice(0),
                                            done: this.done
                                        }, this.options.ranges && (o.yylloc.range = this.yylloc.range.slice(0))), r = e[0].match(/(?:\r\n?|\n).*/g), r && (this.yylineno += r.length), this.yylloc = {
                                            first_line: this.yylloc.last_line,
                                            last_line: this.yylineno + 1,
                                            first_column: this.yylloc.last_column,
                                            last_column: r ? r[r.length - 1].length - r[r.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + e[0].length
                                        }, this.yytext += e[0], this.match += e[0], this.matches = e, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(e[0].length), this.matched += e[0], n = this.performAction.call(this, this.yy, this, t, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), n) return n;
                                    if (this._backtrack) {
                                        for (var i in o) this[i] = o[i];
                                        return !1
                                    }
                                    return !1
                                },
                                next: function() {
                                    if (this.done) return this.EOF;
                                    this._input || (this.done = !0);
                                    var e, t, n, r;
                                    this._more || (this.yytext = "", this.match = "");
                                    for (var o = this._currentRules(), i = 0; i < o.length; i++)
                                        if ((n = this._input.match(this.rules[o[i]])) && (!t || n[0].length > t[0].length)) {
                                            if (t = n, r = i, this.options.backtrack_lexer) {
                                                if (!1 !== (e = this.test_match(n, o[i]))) return e;
                                                if (this._backtrack) {
                                                    t = !1;
                                                    continue
                                                }
                                                return !1
                                            }
                                            if (!this.options.flex) break
                                        }
                                    return t ? !1 !== (e = this.test_match(t, o[r])) && e : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                                        text: "",
                                        token: null,
                                        line: this.yylineno
                                    })
                                },
                                lex: function() {
                                    var e = this.next();
                                    return e || this.lex()
                                },
                                begin: function(e) {
                                    this.conditionStack.push(e)
                                },
                                popState: function() {
                                    return this.conditionStack.length - 1 > 0 ? this.conditionStack.pop() : this.conditionStack[0]
                                },
                                _currentRules: function() {
                                    return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules
                                },
                                topState: function(e) {
                                    return e = this.conditionStack.length - 1 - Math.abs(e || 0), e >= 0 ? this.conditionStack[e] : "INITIAL"
                                },
                                pushState: function(e) {
                                    this.begin(e)
                                },
                                stateStackSize: function() {
                                    return this.conditionStack.length
                                },
                                options: {},
                                performAction: function(e, t, n, r) {
                                    switch (n) {
                                        case 0:
                                            break;
                                        case 1:
                                            return 6;
                                        case 2:
                                            return t.yytext = t.yytext.substr(1, t.yyleng - 2), 4;
                                        case 3:
                                            return 17;
                                        case 4:
                                            return 18;
                                        case 5:
                                            return 23;
                                        case 6:
                                            return 24;
                                        case 7:
                                            return 22;
                                        case 8:
                                            return 21;
                                        case 9:
                                            return 10;
                                        case 10:
                                            return 11;
                                        case 11:
                                            return 8;
                                        case 12:
                                            return 14;
                                        case 13:
                                            return "INVALID"
                                    }
                                },
                                rules: [/^(?:\s+)/, /^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/, /^(?:"(?:\\[\\"bfnrt\/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/, /^(?:\{)/, /^(?:\})/, /^(?:\[)/, /^(?:\])/, /^(?:,)/, /^(?::)/, /^(?:true\b)/, /^(?:false\b)/, /^(?:null\b)/, /^(?:$)/, /^(?:.)/],
                                conditions: {
                                    INITIAL: {
                                        rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                                        inclusive: !0
                                    }
                                }
                            }
                        }();
                    return f.lexer = d, e.prototype = f, f.Parser = e, new e
                }();
                void 0 !== e && void 0 !== n && (n.parser = o, n.Parser = o.Parser, n.parse = function() {
                    return o.parse.apply(o, arguments)
                }, n.main = function(t) {
                    t[1] || (console.log("Usage: " + t[0] + " FILE"), r.exit(1));
                    var o = e("fs").readFileSync(e("path").normalize(t[1]), "utf8");
                    return n.parser.parse(o)
                }, void 0 !== t && e.main === t && n.main(r.argv.slice(1)))
            }).call(this, e("_process"))
        }, {
            _process: 19,
            fs: 7,
            path: 17
        }],
        16: [function(e, t, n) {
            (function(e) {
                function r(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length, o = 0, i = []; ++n < r;) {
                        var s = e[n];
                        t(s, n, e) && (i[o++] = s)
                    }
                    return i
                }

                function o(e, t) {
                    for (var n = -1, r = t.length, o = e.length; ++n < r;) e[o + n] = t[n];
                    return e
                }

                function i(e, t) {
                    for (var n = -1, r = null == e ? 0 : e.length; ++n < r;)
                        if (t(e[n], n, e)) return !0;
                    return !1
                }

                function s(e, t) {
                    for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n);
                    return r
                }

                function a(e, t) {
                    return e.has(t)
                }

                function u(e, t) {
                    return null == e ? void 0 : e[t]
                }

                function c(e) {
                    var t = -1,
                        n = Array(e.size);
                    return e.forEach(function(e, r) {
                        n[++t] = [r, e]
                    }), n
                }

                function l(e) {
                    var t = -1,
                        n = Array(e.size);
                    return e.forEach(function(e) {
                        n[++t] = e
                    }), n
                }

                function p(e) {
                    var t = -1,
                        n = null == e ? 0 : e.length;
                    for (this.clear(); ++t < n;) {
                        var r = e[t];
                        this.set(r[0], r[1])
                    }
                }

                function f() {
                    this.__data__ = Ot ? Ot(null) : {}, this.size = 0
                }

                function d(e) {
                    var t = this.has(e) && delete this.__data__[e];
                    return this.size -= t ? 1 : 0, t
                }

                function h(e) {
                    var t = this.__data__;
                    if (Ot) {
                        var n = t[e];
                        return n === _e ? void 0 : n
                    }
                    return it.call(t, e) ? t[e] : void 0
                }

                function y(e) {
                    var t = this.__data__;
                    return Ot ? void 0 !== t[e] : it.call(t, e)
                }

                function g(e, t) {
                    var n = this.__data__;
                    return this.size += this.has(e) ? 0 : 1, n[e] = Ot && void 0 === t ? _e : t, this
                }

                function m(e) {
                    var t = -1,
                        n = null == e ? 0 : e.length;
                    for (this.clear(); ++t < n;) {
                        var r = e[t];
                        this.set(r[0], r[1])
                    }
                }

                function _() {
                    this.__data__ = [], this.size = 0
                }

                function v(e) {
                    var t = this.__data__,
                        n = U(t, e);
                    return !(n < 0) && (n == t.length - 1 ? t.pop() : dt.call(t, n, 1), --this.size, !0)
                }

                function b(e) {
                    var t = this.__data__,
                        n = U(t, e);
                    return n < 0 ? void 0 : t[n][1]
                }

                function E(e) {
                    return U(this.__data__, e) > -1
                }

                function T(e, t) {
                    var n = this.__data__,
                        r = U(n, e);
                    return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this
                }

                function O(e) {
                    var t = -1,
                        n = null == e ? 0 : e.length;
                    for (this.clear(); ++t < n;) {
                        var r = e[t];
                        this.set(r[0], r[1])
                    }
                }

                function x() {
                    this.size = 0, this.__data__ = {
                        hash: new p,
                        map: new(vt || m),
                        string: new p
                    }
                }

                function S(e) {
                    var t = Z(this, e).delete(e);
                    return this.size -= t ? 1 : 0, t
                }

                function I(e) {
                    return Z(this, e).get(e)
                }

                function C(e) {
                    return Z(this, e).has(e)
                }

                function L(e, t) {
                    var n = Z(this, e),
                        r = n.size;
                    return n.set(e, t), this.size += n.size == r ? 0 : 1, this
                }

                function N(e) {
                    var t = -1,
                        n = null == e ? 0 : e.length;
                    for (this.__data__ = new O; ++t < n;) this.add(e[t])
                }

                function A(e) {
                    return this.__data__.set(e, _e), this
                }

                function w(e) {
                    return this.__data__.has(e)
                }

                function M(e) {
                    var t = this.__data__ = new m(e);
                    this.size = t.size
                }

                function P() {
                    this.__data__ = new m, this.size = 0
                }

                function j(e) {
                    var t = this.__data__,
                        n = t.delete(e);
                    return this.size = t.size, n
                }

                function k(e) {
                    return this.__data__.get(e)
                }

                function R(e) {
                    return this.__data__.has(e)
                }

                function F(e, t) {
                    var n = this.__data__;
                    if (n instanceof m) {
                        var r = n.__data__;
                        if (!vt || r.length < me - 1) return r.push([e, t]), this.size = ++n.size, this;
                        n = this.__data__ = new O(r)
                    }
                    return n.set(e, t), this.size = n.size, this
                }

                function D(e, t) {
                    var n = jt(e),
                        r = !n && Pt(e),
                        o = !n && !r && kt(e),
                        i = !n && !r && !o && Rt(e),
                        a = n || r || o || i,
                        u = a ? s(e.length, String) : [],
                        c = u.length;
                    for (var l in e) !t && !it.call(e, l) || a && ("length" == l || o && ("offset" == l || "parent" == l) || i && ("buffer" == l || "byteLength" == l || "byteOffset" == l) || te(l, c)) || u.push(l);
                    return u
                }

                function U(e, t) {
                    for (var n = e.length; n--;)
                        if (ae(e[n][0], t)) return n;
                    return -1
                }

                function G(e, t, n) {
                    var r = t(e);
                    return jt(e) ? r : o(r, n(e))
                }

                function B(e) {
                    return null == e ? void 0 === e ? Ue : Me : ht && ht in Object(e) ? ee(e) : ie(e)
                }

                function V(e) {
                    return de(e) && B(e) == Te
                }

                function $(e, t, n, r, o) {
                    return e === t || (null == e || null == t || !de(e) && !de(t) ? e !== e && t !== t : J(e, t, n, r, $, o))
                }

                function J(e, t, n, r, o, i) {
                    var s = jt(e),
                        a = jt(t),
                        u = s ? Oe : Mt(e),
                        c = a ? Oe : Mt(t);
                    u = u == Te ? Pe : u, c = c == Te ? Pe : c;
                    var l = u == Pe,
                        p = c == Pe,
                        f = u == c;
                    if (f && kt(e)) {
                        if (!kt(t)) return !1;
                        s = !0, l = !1
                    }
                    if (f && !l) return i || (i = new M), s || Rt(e) ? W(e, t, n, r, o, i) : X(e, t, u, n, r, o, i);
                    if (!(n & ve)) {
                        var d = l && it.call(e, "__wrapped__"),
                            h = p && it.call(t, "__wrapped__");
                        if (d || h) {
                            var y = d ? e.value() : e,
                                g = h ? t.value() : t;
                            return i || (i = new M), o(y, g, n, r, i)
                        }
                    }
                    return !!f && (i || (i = new M), H(e, t, n, r, o, i))
                }

                function z(e) {
                    return !(!fe(e) || re(e)) && (le(e) ? ut : Ve).test(se(e))
                }

                function q(e) {
                    return de(e) && pe(e.length) && !!Je[B(e)]
                }

                function Y(e) {
                    if (!oe(e)) return mt(e);
                    var t = [];
                    for (var n in Object(e)) it.call(e, n) && "constructor" != n && t.push(n);
                    return t
                }

                function W(e, t, n, r, o, s) {
                    var u = n & ve,
                        c = e.length,
                        l = t.length;
                    if (c != l && !(u && l > c)) return !1;
                    var p = s.get(e);
                    if (p && s.get(t)) return p == t;
                    var f = -1,
                        d = !0,
                        h = n & be ? new N : void 0;
                    for (s.set(e, t), s.set(t, e); ++f < c;) {
                        var y = e[f],
                            g = t[f];
                        if (r) var m = u ? r(g, y, f, t, e, s) : r(y, g, f, e, t, s);
                        if (void 0 !== m) {
                            if (m) continue;
                            d = !1;
                            break
                        }
                        if (h) {
                            if (!i(t, function(e, t) {
                                    if (!a(h, t) && (y === e || o(y, e, n, r, s))) return h.push(t)
                                })) {
                                d = !1;
                                break
                            }
                        } else if (y !== g && !o(y, g, n, r, s)) {
                            d = !1;
                            break
                        }
                    }
                    return s.delete(e), s.delete(t), d
                }

                function X(e, t, n, r, o, i, s) {
                    switch (n) {
                        case Be:
                            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
                            e = e.buffer, t = t.buffer;
                        case Ge:
                            return !(e.byteLength != t.byteLength || !i(new pt(e), new pt(t)));
                        case Se:
                        case Ie:
                        case we:
                            return ae(+e, +t);
                        case Ce:
                            return e.name == t.name && e.message == t.message;
                        case ke:
                        case Fe:
                            return e == t + "";
                        case Ae:
                            var a = c;
                        case Re:
                            var u = r & ve;
                            if (a || (a = l), e.size != t.size && !u) return !1;
                            var p = s.get(e);
                            if (p) return p == t;
                            r |= be, s.set(e, t);
                            var f = W(a(e), a(t), r, o, i, s);
                            return s.delete(e), f;
                        case De:
                            if (At) return At.call(e) == At.call(t)
                    }
                    return !1
                }

                function H(e, t, n, r, o, i) {
                    var s = n & ve,
                        a = K(e),
                        u = a.length;
                    if (u != K(t).length && !s) return !1;
                    for (var c = u; c--;) {
                        var l = a[c];
                        if (!(s ? l in t : it.call(t, l))) return !1
                    }
                    var p = i.get(e);
                    if (p && i.get(t)) return p == t;
                    var f = !0;
                    i.set(e, t), i.set(t, e);
                    for (var d = s; ++c < u;) {
                        l = a[c];
                        var h = e[l],
                            y = t[l];
                        if (r) var g = s ? r(y, h, l, t, e, i) : r(h, y, l, e, t, i);
                        if (!(void 0 === g ? h === y || o(h, y, n, r, i) : g)) {
                            f = !1;
                            break
                        }
                        d || (d = "constructor" == l)
                    }
                    if (f && !d) {
                        var m = e.constructor,
                            _ = t.constructor;
                        m != _ && "constructor" in e && "constructor" in t && !("function" == typeof m && m instanceof m && "function" == typeof _ && _ instanceof _) && (f = !1)
                    }
                    return i.delete(e), i.delete(t), f
                }

                function K(e) {
                    return G(e, he, wt)
                }

                function Z(e, t) {
                    var n = e.__data__;
                    return ne(t) ? n["string" == typeof t ? "string" : "hash"] : n.map
                }

                function Q(e, t) {
                    var n = u(e, t);
                    return z(n) ? n : void 0
                }

                function ee(e) {
                    var t = it.call(e, ht),
                        n = e[ht];
                    try {
                        e[ht] = void 0
                    } catch (e) {}
                    var r = at.call(e);
                    return t ? e[ht] = n : delete e[ht], r
                }

                function te(e, t) {
                    return !!(t = null == t ? Ee : t) && ("number" == typeof e || $e.test(e)) && e > -1 && e % 1 == 0 && e < t
                }

                function ne(e) {
                    var t = typeof e;
                    return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e
                }

                function re(e) {
                    return !!st && st in e
                }

                function oe(e) {
                    var t = e && e.constructor;
                    return e === ("function" == typeof t && t.prototype || nt)
                }

                function ie(e) {
                    return at.call(e)
                }

                function se(e) {
                    if (null != e) {
                        try {
                            return ot.call(e)
                        } catch (e) {}
                        try {
                            return e + ""
                        } catch (e) {}
                    }
                    return ""
                }

                function ae(e, t) {
                    return e === t || e !== e && t !== t
                }

                function ue(e) {
                    return null != e && pe(e.length) && !le(e)
                }

                function ce(e, t) {
                    return $(e, t)
                }

                function le(e) {
                    if (!fe(e)) return !1;
                    var t = B(e);
                    return t == Le || t == Ne || t == xe || t == je
                }

                function pe(e) {
                    return "number" == typeof e && e > -1 && e % 1 == 0 && e <= Ee
                }

                function fe(e) {
                    var t = typeof e;
                    return null != e && ("object" == t || "function" == t)
                }

                function de(e) {
                    return null != e && "object" == typeof e
                }

                function he(e) {
                    return ue(e) ? D(e) : Y(e)
                }

                function ye() {
                    return []
                }

                function ge() {
                    return !1
                }
                var me = 200,
                    _e = "__lodash_hash_undefined__",
                    ve = 1,
                    be = 2,
                    Ee = 9007199254740991,
                    Te = "[object Arguments]",
                    Oe = "[object Array]",
                    xe = "[object AsyncFunction]",
                    Se = "[object Boolean]",
                    Ie = "[object Date]",
                    Ce = "[object Error]",
                    Le = "[object Function]",
                    Ne = "[object GeneratorFunction]",
                    Ae = "[object Map]",
                    we = "[object Number]",
                    Me = "[object Null]",
                    Pe = "[object Object]",
                    je = "[object Proxy]",
                    ke = "[object RegExp]",
                    Re = "[object Set]",
                    Fe = "[object String]",
                    De = "[object Symbol]",
                    Ue = "[object Undefined]",
                    Ge = "[object ArrayBuffer]",
                    Be = "[object DataView]",
                    Ve = /^\[object .+?Constructor\]$/,
                    $e = /^(?:0|[1-9]\d*)$/,
                    Je = {};
                Je["[object Float32Array]"] = Je["[object Float64Array]"] = Je["[object Int8Array]"] = Je["[object Int16Array]"] = Je["[object Int32Array]"] = Je["[object Uint8Array]"] = Je["[object Uint8ClampedArray]"] = Je["[object Uint16Array]"] = Je["[object Uint32Array]"] = !0, Je[Te] = Je[Oe] = Je[Ge] = Je[Se] = Je[Be] = Je[Ie] = Je[Ce] = Je[Le] = Je[Ae] = Je[we] = Je[Pe] = Je[ke] = Je[Re] = Je[Fe] = Je["[object WeakMap]"] = !1;
                var ze = "object" == typeof e && e && e.Object === Object && e,
                    qe = "object" == typeof self && self && self.Object === Object && self,
                    Ye = ze || qe || Function("return this")(),
                    We = "object" == typeof n && n && !n.nodeType && n,
                    Xe = We && "object" == typeof t && t && !t.nodeType && t,
                    He = Xe && Xe.exports === We,
                    Ke = He && ze.process,
                    Ze = function() {
                        try {
                            return Ke && Ke.binding && Ke.binding("util")
                        } catch (e) {}
                    }(),
                    Qe = Ze && Ze.isTypedArray,
                    et = Array.prototype,
                    tt = Function.prototype,
                    nt = Object.prototype,
                    rt = Ye["__core-js_shared__"],
                    ot = tt.toString,
                    it = nt.hasOwnProperty,
                    st = function() {
                        var e = /[^.]+$/.exec(rt && rt.keys && rt.keys.IE_PROTO || "");
                        return e ? "Symbol(src)_1." + e : ""
                    }(),
                    at = nt.toString,
                    ut = RegExp("^" + ot.call(it).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                    ct = He ? Ye.Buffer : void 0,
                    lt = Ye.Symbol,
                    pt = Ye.Uint8Array,
                    ft = nt.propertyIsEnumerable,
                    dt = et.splice,
                    ht = lt ? lt.toStringTag : void 0,
                    yt = Object.getOwnPropertySymbols,
                    gt = ct ? ct.isBuffer : void 0,
                    mt = function(e, t) {
                        return function(n) {
                            return e(t(n))
                        }
                    }(Object.keys, Object),
                    _t = Q(Ye, "DataView"),
                    vt = Q(Ye, "Map"),
                    bt = Q(Ye, "Promise"),
                    Et = Q(Ye, "Set"),
                    Tt = Q(Ye, "WeakMap"),
                    Ot = Q(Object, "create"),
                    xt = se(_t),
                    St = se(vt),
                    It = se(bt),
                    Ct = se(Et),
                    Lt = se(Tt),
                    Nt = lt ? lt.prototype : void 0,
                    At = Nt ? Nt.valueOf : void 0;
                p.prototype.clear = f, p.prototype.delete = d, p.prototype.get = h, p.prototype.has = y, p.prototype.set = g, m.prototype.clear = _, m.prototype.delete = v, m.prototype.get = b, m.prototype.has = E, m.prototype.set = T, O.prototype.clear = x, O.prototype.delete = S, O.prototype.get = I, O.prototype.has = C, O.prototype.set = L, N.prototype.add = N.prototype.push = A, N.prototype.has = w, M.prototype.clear = P, M.prototype.delete = j, M.prototype.get = k, M.prototype.has = R, M.prototype.set = F;
                var wt = yt ? function(e) {
                        return null == e ? [] : (e = Object(e), r(yt(e), function(t) {
                            return ft.call(e, t)
                        }))
                    } : ye,
                    Mt = B;
                (_t && Mt(new _t(new ArrayBuffer(1))) != Be || vt && Mt(new vt) != Ae || bt && "[object Promise]" != Mt(bt.resolve()) || Et && Mt(new Et) != Re || Tt && "[object WeakMap]" != Mt(new Tt)) && (Mt = function(e) {
                    var t = B(e),
                        n = t == Pe ? e.constructor : void 0,
                        r = n ? se(n) : "";
                    if (r) switch (r) {
                        case xt:
                            return Be;
                        case St:
                            return Ae;
                        case It:
                            return "[object Promise]";
                        case Ct:
                            return Re;
                        case Lt:
                            return "[object WeakMap]"
                    }
                    return t
                });
                var Pt = V(function() {
                        return arguments
                    }()) ? V : function(e) {
                        return de(e) && it.call(e, "callee") && !ft.call(e, "callee")
                    },
                    jt = Array.isArray,
                    kt = gt || ge,
                    Rt = Qe ? function(e) {
                        return function(t) {
                            return e(t)
                        }
                    }(Qe) : q;
                t.exports = ce
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        17: [function(e, t, n) {
            (function(e) {
                function t(e, t) {
                    for (var n = 0, r = e.length - 1; r >= 0; r--) {
                        var o = e[r];
                        "." === o ? e.splice(r, 1) : ".." === o ? (e.splice(r, 1), n++) : n && (e.splice(r, 1), n--)
                    }
                    if (t)
                        for (; n--; n) e.unshift("..");
                    return e
                }

                function r(e, t) {
                    if (e.filter) return e.filter(t);
                    for (var n = [], r = 0; r < e.length; r++) t(e[r], r, e) && n.push(e[r]);
                    return n
                }
                var o = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
                    i = function(e) {
                        return o.exec(e).slice(1)
                    };
                n.resolve = function() {
                    for (var n = "", o = !1, i = arguments.length - 1; i >= -1 && !o; i--) {
                        var s = i >= 0 ? arguments[i] : e.cwd();
                        if ("string" != typeof s) throw new TypeError("Arguments to path.resolve must be strings");
                        s && (n = s + "/" + n, o = "/" === s.charAt(0))
                    }
                    return n = t(r(n.split("/"), function(e) {
                        return !!e
                    }), !o).join("/"), (o ? "/" : "") + n || "."
                }, n.normalize = function(e) {
                    var o = n.isAbsolute(e),
                        i = "/" === s(e, -1);
                    return e = t(r(e.split("/"), function(e) {
                        return !!e
                    }), !o).join("/"), e || o || (e = "."), e && i && (e += "/"), (o ? "/" : "") + e
                }, n.isAbsolute = function(e) {
                    return "/" === e.charAt(0)
                }, n.join = function() {
                    var e = Array.prototype.slice.call(arguments, 0);
                    return n.normalize(r(e, function(e, t) {
                        if ("string" != typeof e) throw new TypeError("Arguments to path.join must be strings");
                        return e
                    }).join("/"))
                }, n.relative = function(e, t) {
                    function r(e) {
                        for (var t = 0; t < e.length && "" === e[t]; t++);
                        for (var n = e.length - 1; n >= 0 && "" === e[n]; n--);
                        return t > n ? [] : e.slice(t, n - t + 1)
                    }
                    e = n.resolve(e).substr(1), t = n.resolve(t).substr(1);
                    for (var o = r(e.split("/")), i = r(t.split("/")), s = Math.min(o.length, i.length), a = s, u = 0; u < s; u++)
                        if (o[u] !== i[u]) {
                            a = u;
                            break
                        }
                    for (var c = [], u = a; u < o.length; u++) c.push("..");
                    return c = c.concat(i.slice(a)), c.join("/")
                }, n.sep = "/", n.delimiter = ":", n.dirname = function(e) {
                    var t = i(e),
                        n = t[0],
                        r = t[1];
                    return n || r ? (r && (r = r.substr(0, r.length - 1)), n + r) : "."
                }, n.basename = function(e, t) {
                    var n = i(e)[2];
                    return t && n.substr(-1 * t.length) === t && (n = n.substr(0, n.length - t.length)), n
                }, n.extname = function(e) {
                    return i(e)[3]
                };
                var s = "b" === "ab".substr(-1) ? function(e, t, n) {
                    return e.substr(t, n)
                } : function(e, t, n) {
                    return t < 0 && (t = e.length + t), e.substr(t, n)
                }
            }).call(this, e("_process"))
        }, {
            _process: 19
        }],
        18: [function(e, t, n) {
            "use strict";

            function r(e, t) {
                this.x = e, this.y = t
            }
            t.exports = r, r.prototype = {
                clone: function() {
                    return new r(this.x, this.y)
                },
                add: function(e) {
                    return this.clone()._add(e)
                },
                sub: function(e) {
                    return this.clone()._sub(e)
                },
                multByPoint: function(e) {
                    return this.clone()._multByPoint(e)
                },
                divByPoint: function(e) {
                    return this.clone()._divByPoint(e)
                },
                mult: function(e) {
                    return this.clone()._mult(e)
                },
                div: function(e) {
                    return this.clone()._div(e)
                },
                rotate: function(e) {
                    return this.clone()._rotate(e)
                },
                rotateAround: function(e, t) {
                    return this.clone()._rotateAround(e, t)
                },
                matMult: function(e) {
                    return this.clone()._matMult(e)
                },
                unit: function() {
                    return this.clone()._unit()
                },
                perp: function() {
                    return this.clone()._perp()
                },
                round: function() {
                    return this.clone()._round()
                },
                mag: function() {
                    return Math.sqrt(this.x * this.x + this.y * this.y)
                },
                equals: function(e) {
                    return this.x === e.x && this.y === e.y
                },
                dist: function(e) {
                    return Math.sqrt(this.distSqr(e))
                },
                distSqr: function(e) {
                    var t = e.x - this.x,
                        n = e.y - this.y;
                    return t * t + n * n
                },
                angle: function() {
                    return Math.atan2(this.y, this.x)
                },
                angleTo: function(e) {
                    return Math.atan2(this.y - e.y, this.x - e.x)
                },
                angleWith: function(e) {
                    return this.angleWithSep(e.x, e.y)
                },
                angleWithSep: function(e, t) {
                    return Math.atan2(this.x * t - this.y * e, this.x * e + this.y * t)
                },
                _matMult: function(e) {
                    var t = e[0] * this.x + e[1] * this.y,
                        n = e[2] * this.x + e[3] * this.y;
                    return this.x = t, this.y = n, this
                },
                _add: function(e) {
                    return this.x += e.x, this.y += e.y, this
                },
                _sub: function(e) {
                    return this.x -= e.x, this.y -= e.y, this
                },
                _mult: function(e) {
                    return this.x *= e, this.y *= e, this
                },
                _div: function(e) {
                    return this.x /= e, this.y /= e, this
                },
                _multByPoint: function(e) {
                    return this.x *= e.x, this.y *= e.y, this
                },
                _divByPoint: function(e) {
                    return this.x /= e.x, this.y /= e.y, this
                },
                _unit: function() {
                    return this._div(this.mag()), this
                },
                _perp: function() {
                    var e = this.y;
                    return this.y = this.x, this.x = -e, this
                },
                _rotate: function(e) {
                    var t = Math.cos(e),
                        n = Math.sin(e),
                        r = t * this.x - n * this.y,
                        o = n * this.x + t * this.y;
                    return this.x = r, this.y = o, this
                },
                _rotateAround: function(e, t) {
                    var n = Math.cos(e),
                        r = Math.sin(e),
                        o = t.x + n * (this.x - t.x) - r * (this.y - t.y),
                        i = t.y + r * (this.x - t.x) + n * (this.y - t.y);
                    return this.x = o, this.y = i, this
                },
                _round: function() {
                    return this.x = Math.round(this.x), this.y = Math.round(this.y), this
                }
            }, r.convert = function(e) {
                return e instanceof r ? e : Array.isArray(e) ? new r(e[0], e[1]) : e
            }
        }, {}],
        19: [function(e, t, n) {
            function r() {
                throw new Error("setTimeout has not been defined")
            }

            function o() {
                throw new Error("clearTimeout has not been defined")
            }

            function i(e) {
                if (p === setTimeout) return setTimeout(e, 0);
                if ((p === r || !p) && setTimeout) return p = setTimeout, setTimeout(e, 0);
                try {
                    return p(e, 0)
                } catch (t) {
                    try {
                        return p.call(null, e, 0)
                    } catch (t) {
                        return p.call(this, e, 0)
                    }
                }
            }

            function s(e) {
                if (f === clearTimeout) return clearTimeout(e);
                if ((f === o || !f) && clearTimeout) return f = clearTimeout, clearTimeout(e);
                try {
                    return f(e)
                } catch (t) {
                    try {
                        return f.call(null, e)
                    } catch (t) {
                        return f.call(this, e)
                    }
                }
            }

            function a() {
                g && h && (g = !1, h.length ? y = h.concat(y) : m = -1, y.length && u())
            }

            function u() {
                if (!g) {
                    var e = i(a);
                    g = !0;
                    for (var t = y.length; t;) {
                        for (h = y, y = []; ++m < t;) h && h[m].run();
                        m = -1, t = y.length
                    }
                    h = null, g = !1, s(e)
                }
            }

            function c(e, t) {
                this.fun = e, this.array = t
            }

            function l() {}
            var p, f, d = t.exports = {};
            ! function() {
                try {
                    p = "function" == typeof setTimeout ? setTimeout : r
                } catch (e) {
                    p = r
                }
                try {
                    f = "function" == typeof clearTimeout ? clearTimeout : o
                } catch (e) {
                    f = o
                }
            }();
            var h, y = [],
                g = !1,
                m = -1;
            d.nextTick = function(e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                y.push(new c(e, t)), 1 !== y.length || g || i(u)
            }, c.prototype.run = function() {
                this.fun.apply(null, this.array)
            }, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", d.versions = {}, d.on = l, d.addListener = l, d.once = l, d.off = l, d.removeListener = l, d.removeAllListeners = l, d.emit = l, d.binding = function(e) {
                throw new Error("process.binding is not supported")
            }, d.cwd = function() {
                return "/"
            }, d.chdir = function(e) {
                throw new Error("process.chdir is not supported")
            }, d.umask = function() {
                return 0
            }
        }, {}],
        20: [function(e, t, n) {
            function r(e) {
                this.value = e
            }

            function o(e, t, n) {
                var r = [],
                    o = [],
                    s = !0;
                return function e(a) {
                    function u() {
                        if ("object" == typeof f.node && null !== f.node) {
                            f.keys && f.node_ === f.node || (f.keys = h(f.node)), f.isLeaf = 0 == f.keys.length;
                            for (var e = 0; e < o.length; e++)
                                if (o[e].node_ === a) {
                                    f.circular = o[e];
                                    break
                                }
                        } else f.isLeaf = !0, f.keys = null;
                        f.notLeaf = !f.isLeaf, f.notRoot = !f.isRoot
                    }
                    var c = n ? i(a) : a,
                        l = {},
                        p = !0,
                        f = {
                            node: c,
                            node_: a,
                            path: [].concat(r),
                            parent: o[o.length - 1],
                            parents: o,
                            key: r.slice(-1)[0],
                            isRoot: 0 === r.length,
                            level: r.length,
                            circular: null,
                            update: function(e, t) {
                                f.isRoot || (f.parent.node[f.key] = e), f.node = e, t && (p = !1)
                            },
                            delete: function(e) {
                                delete f.parent.node[f.key], e && (p = !1)
                            },
                            remove: function(e) {
                                y(f.parent.node) ? f.parent.node.splice(f.key, 1) : delete f.parent.node[f.key], e && (p = !1)
                            },
                            keys: null,
                            before: function(e) {
                                l.before = e
                            },
                            after: function(e) {
                                l.after = e
                            },
                            pre: function(e) {
                                l.pre = e
                            },
                            post: function(e) {
                                l.post = e
                            },
                            stop: function() {
                                s = !1
                            },
                            block: function() {
                                p = !1
                            }
                        };
                    if (!s) return f;
                    u();
                    var d = t.call(f, f.node);
                    return void 0 !== d && f.update && f.update(d), l.before && l.before.call(f, f.node), p ? ("object" != typeof f.node || null === f.node || f.circular || (o.push(f), u(), g(f.keys, function(t, o) {
                        r.push(t), l.pre && l.pre.call(f, f.node[t], t);
                        var i = e(f.node[t]);
                        n && m.call(f.node, t) && (f.node[t] = i.node), i.isLast = o == f.keys.length - 1, i.isFirst = 0 == o, l.post && l.post.call(f, i), r.pop()
                    }), o.pop()), l.after && l.after.call(f, f.node), f) : f
                }(e).node
            }

            function i(e) {
                if ("object" == typeof e && null !== e) {
                    var t;
                    if (y(e)) t = [];
                    else if (a(e)) t = new Date(e.getTime ? e.getTime() : e);
                    else if (u(e)) t = new RegExp(e);
                    else if (c(e)) t = {
                        message: e.message
                    };
                    else if (l(e)) t = new Boolean(e);
                    else if (p(e)) t = new Number(e);
                    else if (f(e)) t = new String(e);
                    else if (Object.create && Object.getPrototypeOf) t = Object.create(Object.getPrototypeOf(e));
                    else if (e.constructor === Object) t = {};
                    else {
                        var n = e.constructor && e.constructor.prototype || e.__proto__ || {},
                            r = function() {};
                        r.prototype = n, t = new r
                    }
                    return g(h(e), function(n) {
                        t[n] = e[n]
                    }), t
                }
                return e
            }

            function s(e) {
                return Object.prototype.toString.call(e)
            }

            function a(e) {
                return "[object Date]" === s(e)
            }

            function u(e) {
                return "[object RegExp]" === s(e)
            }

            function c(e) {
                return "[object Error]" === s(e)
            }

            function l(e) {
                return "[object Boolean]" === s(e)
            }

            function p(e) {
                return "[object Number]" === s(e)
            }

            function f(e) {
                return "[object String]" === s(e)
            }
            var d = t.exports = function(e) {
                return new r(e)
            };
            r.prototype.get = function(e) {
                for (var t = this.value, n = 0; n < e.length; n++) {
                    var r = e[n];
                    if (!t || !m.call(t, r)) {
                        t = void 0;
                        break
                    }
                    t = t[r]
                }
                return t
            }, r.prototype.has = function(e) {
                for (var t = this.value, n = 0; n < e.length; n++) {
                    var r = e[n];
                    if (!t || !m.call(t, r)) return !1;
                    t = t[r]
                }
                return !0
            }, r.prototype.set = function(e, t) {
                for (var n = this.value, r = 0; r < e.length - 1; r++) {
                    var o = e[r];
                    m.call(n, o) || (n[o] = {}), n = n[o]
                }
                return n[e[r]] = t, t
            }, r.prototype.map = function(e) {
                return o(this.value, e, !0)
            }, r.prototype.forEach = function(e) {
                return this.value = o(this.value, e, !1), this.value
            }, r.prototype.reduce = function(e, t) {
                var n = 1 === arguments.length,
                    r = n ? this.value : t;
                return this.forEach(function(t) {
                    this.isRoot && n || (r = e.call(this, r, t))
                }), r
            }, r.prototype.paths = function() {
                var e = [];
                return this.forEach(function(t) {
                    e.push(this.path)
                }), e
            }, r.prototype.nodes = function() {
                var e = [];
                return this.forEach(function(t) {
                    e.push(this.node)
                }), e
            }, r.prototype.clone = function() {
                var e = [],
                    t = [];
                return function n(r) {
                    for (var o = 0; o < e.length; o++)
                        if (e[o] === r) return t[o];
                    if ("object" == typeof r && null !== r) {
                        var s = i(r);
                        return e.push(r), t.push(s), g(h(r), function(e) {
                            s[e] = n(r[e])
                        }), e.pop(), t.pop(), s
                    }
                    return r
                }(this.value)
            };
            var h = Object.keys || function(e) {
                        var t = [];
                        for (var n in e) t.push(n);
                        return t
                    },
                y = Array.isArray || function(e) {
                        return "[object Array]" === Object.prototype.toString.call(e)
                    },
                g = function(e, t) {
                    if (e.forEach) return e.forEach(t);
                    for (var n = 0; n < e.length; n++) t(e[n], n, e)
                };
            g(h(r.prototype), function(e) {
                d[e] = function(t) {
                    var n = [].slice.call(arguments, 1),
                        o = new r(t);
                    return o[e].apply(o, n)
                }
            });
            var m = Object.hasOwnProperty || function(e, t) {
                    return t in e
                }
        }, {}],
        21: [function(e, t, n) {
            t.exports.RADIUS = 6378137, t.exports.FLATTENING = 1 / 298.257223563, t.exports.POLAR_RADIUS = 6356752.3142
        }, {}],
        22: [function(e, t, n) {
            function r() {
                for (var e = {}, t = 0; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) o.call(n, r) && (e[r] = n[r])
                }
                return e
            }
            t.exports = r;
            var o = Object.prototype.hasOwnProperty
        }, {}],
        23: [function(e, t, n) {
            "use strict";
            var r = e("lodash.isequal"),
                o = e("@mapbox/geojson-normalize"),
                i = e("hat"),
                s = e("./lib/features_at"),
                a = e("./lib/string_sets_are_equal"),
                u = e("@mapbox/geojsonhint"),
                c = e("./constants"),
                l = e("./lib/string_set"),
                p = {
                    Polygon: e("./feature_types/polygon"),
                    LineString: e("./feature_types/line_string"),
                    Point: e("./feature_types/point"),
                    MultiPolygon: e("./feature_types/multi_feature"),
                    MultiLineString: e("./feature_types/multi_feature"),
                    MultiPoint: e("./feature_types/multi_feature")
                };
            t.exports = function(e, t) {
                return t.modes = c.modes, t.getFeatureIdsAt = function(t) {
                    return s.click({
                        point: t
                    }, null, e).map(function(e) {
                        return e.properties.id
                    })
                }, t.getSelectedIds = function() {
                    return e.store.getSelectedIds()
                }, t.getSelected = function() {
                    return {
                        type: c.geojsonTypes.FEATURE_COLLECTION,
                        features: e.store.getSelectedIds().map(function(t) {
                            return e.store.get(t)
                        }).map(function(e) {
                            return e.toGeoJSON()
                        })
                    }
                }, t.getSelectedPoints = function() {
                    return {
                        type: c.geojsonTypes.FEATURE_COLLECTION,
                        features: e.store.getSelectedCoordinates().map(function(e) {
                            return {
                                type: c.geojsonTypes.FEATURE,
                                properties: {},
                                geometry: {
                                    type: c.geojsonTypes.POINT,
                                    coordinates: e.coordinates
                                }
                            }
                        })
                    }
                }, t.set = function(n) {
                    if (void 0 === n.type || n.type !== c.geojsonTypes.FEATURE_COLLECTION || !Array.isArray(n.features)) throw new Error("Invalid FeatureCollection");
                    var r = e.store.createRenderBatch(),
                        o = e.store.getAllIds().slice(),
                        i = t.add(n),
                        s = new l(i);
                    return o = o.filter(function(e) {
                        return !s.has(e)
                    }), o.length && t.delete(o), r(), i
                }, t.add = function(t) {
                    var n = u.hint(t, {
                        precisionWarning: !1
                    }).filter(function(e) {
                        return "message" !== e.level
                    });
                    if (n.length) throw new Error(n[0].message);
                    var s = JSON.parse(JSON.stringify(o(t))),
                        a = s.features.map(function(t) {
                            if (t.id = t.id || i(), null === t.geometry) throw new Error("Invalid geometry: null");
                            if (void 0 === e.store.get(t.id) || e.store.get(t.id).type !== t.geometry.type) {
                                var n = p[t.geometry.type];
                                if (void 0 === n) throw new Error("Invalid geometry type: " + t.geometry.type + ".");
                                var o = new n(e, t);
                                e.store.add(o)
                            } else {
                                var s = e.store.get(t.id);
                                s.properties = t.properties, r(s.getCoordinates(), t.geometry.coordinates) || s.incomingCoords(t.geometry.coordinates)
                            }
                            return t.id
                        });
                    return e.store.render(), a
                }, t.get = function(t) {
                    var n = e.store.get(t);
                    if (n) return n.toGeoJSON()
                }, t.getAll = function() {
                    return {
                        type: c.geojsonTypes.FEATURE_COLLECTION,
                        features: e.store.getAll().map(function(e) {
                            return e.toGeoJSON()
                        })
                    }
                }, t.delete = function(n) {
                    return e.store.delete(n, {
                        silent: !0
                    }), t.getMode() !== c.modes.DIRECT_SELECT || e.store.getSelectedIds().length ? e.store.render() : e.events.changeMode(c.modes.SIMPLE_SELECT, void 0, {
                        silent: !0
                    }), t
                }, t.deleteAll = function() {
                    return e.store.delete(e.store.getAllIds(), {
                        silent: !0
                    }), t.getMode() === c.modes.DIRECT_SELECT ? e.events.changeMode(c.modes.SIMPLE_SELECT, void 0, {
                        silent: !0
                    }) : e.store.render(), t
                }, t.changeMode = function(n) {
                    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return n === c.modes.SIMPLE_SELECT && t.getMode() === c.modes.SIMPLE_SELECT ? a(r.featureIds || [], e.store.getSelectedIds()) ? t : (e.store.setSelected(r.featureIds, {
                        silent: !0
                    }), e.store.render(), t) : n === c.modes.DIRECT_SELECT && t.getMode() === c.modes.DIRECT_SELECT && r.featureId === e.store.getSelectedIds()[0] ? t : (e.events.changeMode(n, r, {
                        silent: !0
                    }), t)
                }, t.getMode = function() {
                    return e.events.getMode()
                }, t.trash = function() {
                    return e.events.trash({
                        silent: !0
                    }), t
                }, t.combineFeatures = function() {
                    return e.events.combineFeatures({
                        silent: !0
                    }), t
                }, t.uncombineFeatures = function() {
                    return e.events.uncombineFeatures({
                        silent: !0
                    }), t
                }, t.setFeatureProperty = function(n, r, o) {
                    return e.store.setFeatureProperty(n, r, o), t
                }, t
            }
        }, {
            "./constants": 24,
            "./feature_types/line_string": 27,
            "./feature_types/multi_feature": 28,
            "./feature_types/point": 29,
            "./feature_types/polygon": 30,
            "./lib/features_at": 38,
            "./lib/string_set": 48,
            "./lib/string_sets_are_equal": 49,
            "@mapbox/geojson-normalize": 3,
            "@mapbox/geojsonhint": 4,
            hat: 14,
            "lodash.isequal": 16
        }],
        24: [function(e, t, n) {
            "use strict";
            t.exports = {
                classes: {
                    CONTROL_BASE: "mapboxgl-ctrl",
                    CONTROL_PREFIX: "mapboxgl-ctrl-",
                    CONTROL_BUTTON: "mapbox-gl-draw_ctrl-draw-btn",
                    CONTROL_BUTTON_LINE: "mapbox-gl-draw_line",
                    CONTROL_BUTTON_POLYGON: "mapbox-gl-draw_polygon",
                    CONTROL_BUTTON_POINT: "mapbox-gl-draw_point",
                    CONTROL_BUTTON_TRASH: "mapbox-gl-draw_trash",
                    CONTROL_BUTTON_COMBINE_FEATURES: "mapbox-gl-draw_combine",
                    CONTROL_BUTTON_UNCOMBINE_FEATURES: "mapbox-gl-draw_uncombine",
                    CONTROL_GROUP: "mapboxgl-ctrl-group",
                    ATTRIBUTION: "mapboxgl-ctrl-attrib",
                    ACTIVE_BUTTON: "active",
                    BOX_SELECT: "mapbox-gl-draw_boxselect"
                },
                sources: {
                    HOT: "mapbox-gl-draw-hot",
                    COLD: "mapbox-gl-draw-cold"
                },
                cursors: {
                    ADD: "add",
                    MOVE: "move",
                    DRAG: "drag",
                    POINTER: "pointer",
                    NONE: "none"
                },
                types: {
                    POLYGON: "polygon",
                    LINE: "line_string",
                    POINT: "point"
                },
                geojsonTypes: {
                    FEATURE: "Feature",
                    POLYGON: "Polygon",
                    LINE_STRING: "LineString",
                    POINT: "Point",
                    FEATURE_COLLECTION: "FeatureCollection",
                    MULTI_PREFIX: "Multi",
                    MULTI_POINT: "MultiPoint",
                    MULTI_LINE_STRING: "MultiLineString",
                    MULTI_POLYGON: "MultiPolygon"
                },
                modes: {
                    DRAW_LINE_STRING: "draw_line_string",
                    DRAW_POLYGON: "draw_polygon",
                    DRAW_POINT: "draw_point",
                    SIMPLE_SELECT: "simple_select",
                    DIRECT_SELECT: "direct_select",
                    STATIC: "static"
                },
                events: {
                    CREATE: "draw.create",
                    DELETE: "draw.delete",
                    UPDATE: "draw.update",
                    SELECTION_CHANGE: "draw.selectionchange",
                    MODE_CHANGE: "draw.modechange",
                    ACTIONABLE: "draw.actionable",
                    RENDER: "draw.render",
                    COMBINE_FEATURES: "draw.combine",
                    UNCOMBINE_FEATURES: "draw.uncombine"
                },
                updateActions: {
                    MOVE: "move",
                    CHANGE_COORDINATES: "change_coordinates"
                },
                meta: {
                    FEATURE: "feature",
                    MIDPOINT: "midpoint",
                    VERTEX: "vertex"
                },
                activeStates: {
                    ACTIVE: "true",
                    INACTIVE: "false"
                },
                LAT_MIN: -90,
                LAT_RENDERED_MIN: -85,
                LAT_MAX: 90,
                LAT_RENDERED_MAX: 85,
                LNG_MIN: -270,
                LNG_MAX: 270
            }
        }, {}],
        25: [function(e, t, n) {
            "use strict";

            function r(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e
            }
            var o, i = e("./lib/mode_handler"),
                s = e("./lib/get_features_and_set_cursor"),
                a = e("./lib/features_at"),
                u = e("./lib/is_click"),
                c = e("./lib/is_tap"),
                l = e("./constants"),
                p = (o = {}, r(o, l.modes.SIMPLE_SELECT, e("./modes/simple_select")), r(o, l.modes.DIRECT_SELECT, e("./modes/direct_select")), r(o, l.modes.DRAW_POINT, e("./modes/draw_point")), r(o, l.modes.DRAW_LINE_STRING, e("./modes/draw_line_string")), r(o, l.modes.DRAW_POLYGON, e("./modes/draw_polygon")), r(o, l.modes.STATIC, e("./modes/static")), o);
            t.exports = function(e) {
                function t(t, n) {
                    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    h.stop();
                    var o = p[t];
                    if (void 0 === o) throw new Error(t + " is not valid");
                    d = t;
                    var s = o(e, n);
                    h = i(s, e), r.silent || e.map.fire(l.events.MODE_CHANGE, {
                        mode: t
                    }), e.store.setDirty(), e.store.render()
                }

                function n(t) {
                    var n = !1;
                    Object.keys(t).forEach(function(e) {
                        if (void 0 === g[e]) throw new Error("Invalid action type");
                        g[e] !== t[e] && (n = !0), g[e] = t[e]
                    }), n && e.map.fire(l.events.ACTIONABLE, {
                        actions: g
                    })
                }
                var r = {},
                    o = {},
                    f = {},
                    d = l.modes.SIMPLE_SELECT,
                    h = i(p.simple_select(e), e);
                f.drag = function(t, n) {
                    n({
                        point: t.point,
                        time: (new Date).getTime()
                    }) ? (e.ui.queueMapClasses({
                        mouse: l.cursors.DRAG
                    }), h.drag(t)) : t.originalEvent.stopPropagation()
                }, f.mousedrag = function(e) {
                    f.drag(e, function(e) {
                        return !u(r, e)
                    })
                }, f.touchdrag = function(e) {
                    f.drag(e, function(e) {
                        return !c(o, e)
                    })
                }, f.mousemove = function(t) {
                    if (1 === (void 0 !== t.originalEvent.buttons ? t.originalEvent.buttons : t.originalEvent.which)) return f.mousedrag(t);
                    var n = s(t, e);
                    t.featureTarget = n, h.mousemove(t)
                }, f.mousedown = function(t) {
                    r = {
                        time: (new Date).getTime(),
                        point: t.point
                    };
                    var n = s(t, e);
                    t.featureTarget = n, h.mousedown(t)
                }, f.mouseup = function(t) {
                    var n = s(t, e);
                    t.featureTarget = n, u(r, {
                        point: t.point,
                        time: (new Date).getTime()
                    }) ? h.click(t) : h.mouseup(t)
                }, f.mouseout = function(e) {
                    h.mouseout(e)
                }, f.touchstart = function(t) {
                    if (t.originalEvent.preventDefault(), e.options.touchEnabled) {
                        o = {
                            time: (new Date).getTime(),
                            point: t.point
                        };
                        var n = a.touch(t, null, e)[0];
                        t.featureTarget = n, h.touchstart(t)
                    }
                }, f.touchmove = function(t) {
                    if (t.originalEvent.preventDefault(), e.options.touchEnabled) return h.touchmove(t), f.touchdrag(t)
                }, f.touchend = function(t) {
                    if (t.originalEvent.preventDefault(), e.options.touchEnabled) {
                        var n = a.touch(t, null, e)[0];
                        t.featureTarget = n, c(o, {
                            time: (new Date).getTime(),
                            point: t.point
                        }) ? h.tap(t) : h.touchend(t)
                    }
                };
                var y = function(e) {
                    return !(8 === e || 46 === e || e >= 48 && e <= 57)
                };
                f.keydown = function(n) {
                    8 !== n.keyCode && 46 !== n.keyCode || !e.options.controls.trash ? y(n.keyCode) ? h.keydown(n) : 49 === n.keyCode && e.options.controls.point ? t(l.modes.DRAW_POINT) : 50 === n.keyCode && e.options.controls.line_string ? t(l.modes.DRAW_LINE_STRING) : 51 === n.keyCode && e.options.controls.polygon && t(l.modes.DRAW_POLYGON) : (n.preventDefault(), h.trash())
                }, f.keyup = function(e) {
                    y(e.keyCode) && h.keyup(e)
                }, f.zoomend = function() {
                    e.store.changeZoom()
                }, f.data = function(t) {
                    if ("style" === t.dataType) {
                        var n = e.setup,
                            r = e.map,
                            o = e.options,
                            i = e.store;
                        o.styles.some(function(e) {
                            return r.getLayer(e.id)
                        }) || (n.addLayers(), i.setDirty(), i.render())
                    }
                };
                var g = {
                    trash: !1,
                    combineFeatures: !1,
                    uncombineFeatures: !1
                };
                return {
                    changeMode: t,
                    actionable: n,
                    currentModeName: function() {
                        return d
                    },
                    currentModeRender: function(e, t) {
                        return h.render(e, t)
                    },
                    fire: function(e, t) {
                        f[e] && f[e](t)
                    },
                    addEventListeners: function() {
                        e.map.on("mousemove", f.mousemove), e.map.on("mousedown", f.mousedown), e.map.on("mouseup", f.mouseup), e.map.on("data", f.data), e.map.on("touchmove", f.touchmove), e.map.on("touchstart", f.touchstart), e.map.on("touchend", f.touchend), e.container.addEventListener("mouseout", f.mouseout), e.options.keybindings && (e.container.addEventListener("keydown", f.keydown), e.container.addEventListener("keyup", f.keyup))
                    },
                    removeEventListeners: function() {
                        e.map.off("mousemove", f.mousemove), e.map.off("mousedown", f.mousedown), e.map.off("mouseup", f.mouseup), e.map.off("data", f.data), e.map.off("touchmove", f.touchmove), e.map.off("touchstart", f.touchstart), e.map.off("touchend", f.touchend), e.container.removeEventListener("mouseout", f.mouseout), e.options.keybindings && (e.container.removeEventListener("keydown", f.keydown), e.container.removeEventListener("keyup", f.keyup))
                    },
                    trash: function(e) {
                        h.trash(e)
                    },
                    combineFeatures: function() {
                        h.combineFeatures()
                    },
                    uncombineFeatures: function() {
                        h.uncombineFeatures()
                    },
                    getMode: function() {
                        return d
                    }
                }
            }
        }, {
            "./constants": 24,
            "./lib/features_at": 38,
            "./lib/get_features_and_set_cursor": 39,
            "./lib/is_click": 40,
            "./lib/is_tap": 42,
            "./lib/mode_handler": 44,
            "./modes/direct_select": 53,
            "./modes/draw_line_string": 54,
            "./modes/draw_point": 55,
            "./modes/draw_polygon": 56,
            "./modes/simple_select": 57,
            "./modes/static": 58
        }],
        26: [function(e, t, n) {
            "use strict";
            var r = e("hat"),
                o = e("../constants"),
                i = function(e, t) {
                    this.ctx = e, this.properties = t.properties || {}, this.coordinates = t.geometry.coordinates, this.id = t.id || r(), this.type = t.geometry.type
                };
            i.prototype.changed = function() {
                this.ctx.store.featureChanged(this.id)
            }, i.prototype.incomingCoords = function(e) {
                this.setCoordinates(e)
            }, i.prototype.setCoordinates = function(e) {
                this.coordinates = e, this.changed()
            }, i.prototype.getCoordinates = function() {
                return JSON.parse(JSON.stringify(this.coordinates))
            }, i.prototype.setProperty = function(e, t) {
                this.properties[e] = t
            }, i.prototype.toGeoJSON = function() {
                return JSON.parse(JSON.stringify({
                    id: this.id,
                    type: o.geojsonTypes.FEATURE,
                    properties: this.properties,
                    geometry: {
                        coordinates: this.getCoordinates(),
                        type: this.type
                    }
                }))
            }, i.prototype.internal = function(e) {
                var t = {
                    id: this.id,
                    meta: o.meta.FEATURE,
                    "meta:type": this.type,
                    active: o.activeStates.INACTIVE,
                    mode: e
                };
                if (this.ctx.options.userProperties)
                    for (var n in this.properties) t["user_" + n] = this.properties[n];
                return {
                    type: o.geojsonTypes.FEATURE,
                    properties: t,
                    geometry: {
                        coordinates: this.getCoordinates(),
                        type: this.type
                    }
                }
            }, t.exports = i
        }, {
            "../constants": 24,
            hat: 14
        }],
        27: [function(e, t, n) {
            "use strict";
            var r = e("./feature"),
                o = function(e, t) {
                    r.call(this, e, t)
                };
            o.prototype = Object.create(r.prototype), o.prototype.isValid = function() {
                return this.coordinates.length > 1
            }, o.prototype.addCoordinate = function(e, t, n) {
                this.changed();
                var r = parseInt(e, 10);
                this.coordinates.splice(r, 0, [t, n])
            }, o.prototype.getCoordinate = function(e) {
                var t = parseInt(e, 10);
                return JSON.parse(JSON.stringify(this.coordinates[t]))
            }, o.prototype.removeCoordinate = function(e) {
                this.changed(), this.coordinates.splice(parseInt(e, 10), 1)
            }, o.prototype.updateCoordinate = function(e, t, n) {
                var r = parseInt(e, 10);
                this.coordinates[r] = [t, n], this.changed()
            }, t.exports = o
        }, {
            "./feature": 26
        }],
        28: [function(e, t, n) {
            "use strict";
            var r = e("./feature"),
                o = e("../constants"),
                i = e("hat"),
                s = {
                    MultiPoint: e("./point"),
                    MultiLineString: e("./line_string"),
                    MultiPolygon: e("./polygon")
                },
                a = function(e, t, n, r, o) {
                    var i = n.split("."),
                        s = parseInt(i[0], 10),
                        a = i[1] ? i.slice(1).join(".") : null;
                    return e[s][t](a, r, o)
                },
                u = function(e, t) {
                    if (r.call(this, e, t), delete this.coordinates, this.model = s[t.geometry.type], void 0 === this.model) throw new TypeError(t.geometry.type + " is not a valid type");
                    this.features = this._coordinatesToFeatures(t.geometry.coordinates)
                };
            u.prototype = Object.create(r.prototype), u.prototype._coordinatesToFeatures = function(e) {
                var t = this,
                    n = this.model.bind(this);
                return e.map(function(e) {
                    return new n(t.ctx, {
                        id: i(),
                        type: o.geojsonTypes.FEATURE,
                        properties: {},
                        geometry: {
                            coordinates: e,
                            type: t.type.replace("Multi", "")
                        }
                    })
                })
            }, u.prototype.isValid = function() {
                return this.features.every(function(e) {
                    return e.isValid()
                })
            }, u.prototype.setCoordinates = function(e) {
                this.features = this._coordinatesToFeatures(e), this.changed()
            }, u.prototype.getCoordinate = function(e) {
                return a(this.features, "getCoordinate", e)
            }, u.prototype.getCoordinates = function() {
                return JSON.parse(JSON.stringify(this.features.map(function(e) {
                    return e.type === o.geojsonTypes.POLYGON ? e.getCoordinates() : e.coordinates
                })))
            }, u.prototype.updateCoordinate = function(e, t, n) {
                a(this.features, "updateCoordinate", e, t, n), this.changed()
            }, u.prototype.addCoordinate = function(e, t, n) {
                a(this.features, "addCoordinate", e, t, n), this.changed()
            }, u.prototype.removeCoordinate = function(e) {
                a(this.features, "removeCoordinate", e), this.changed()
            }, u.prototype.getFeatures = function() {
                return this.features
            }, t.exports = u
        }, {
            "../constants": 24,
            "./feature": 26,
            "./line_string": 27,
            "./point": 29,
            "./polygon": 30,
            hat: 14
        }],
        29: [function(e, t, n) {
            "use strict";
            var r = e("./feature"),
                o = function(e, t) {
                    r.call(this, e, t)
                };
            o.prototype = Object.create(r.prototype), o.prototype.isValid = function() {
                return "number" == typeof this.coordinates[0] && "number" == typeof this.coordinates[1]
            }, o.prototype.updateCoordinate = function(e, t, n) {
                3 === arguments.length ? this.coordinates = [t, n] : this.coordinates = [e, t], this.changed()
            }, o.prototype.getCoordinate = function() {
                return this.getCoordinates()
            }, t.exports = o
        }, {
            "./feature": 26
        }],
        30: [function(e, t, n) {
            "use strict";
            var r = e("./feature"),
                o = function(e, t) {
                    r.call(this, e, t), this.coordinates = this.coordinates.map(function(e) {
                        return e.slice(0, -1)
                    })
                };
            o.prototype = Object.create(r.prototype), o.prototype.isValid = function() {
                return 0 !== this.coordinates.length && this.coordinates.every(function(e) {
                        return e.length > 2
                    })
            }, o.prototype.incomingCoords = function(e) {
                this.coordinates = e.map(function(e) {
                    return e.slice(0, -1)
                }), this.changed()
            }, o.prototype.setCoordinates = function(e) {
                this.coordinates = e, this.changed()
            }, o.prototype.addCoordinate = function(e, t, n) {
                this.changed();
                var r = e.split(".").map(function(e) {
                    return parseInt(e, 10)
                });
                this.coordinates[r[0]].splice(r[1], 0, [t, n])
            }, o.prototype.removeCoordinate = function(e) {
                this.changed();
                var t = e.split(".").map(function(e) {
                        return parseInt(e, 10)
                    }),
                    n = this.coordinates[t[0]];
                n && (n.splice(t[1], 1), n.length < 3 && this.coordinates.splice(t[0], 1))
            }, o.prototype.getCoordinate = function(e) {
                var t = e.split(".").map(function(e) {
                        return parseInt(e, 10)
                    }),
                    n = this.coordinates[t[0]];
                return JSON.parse(JSON.stringify(n[t[1]]))
            }, o.prototype.getCoordinates = function() {
                return this.coordinates.map(function(e) {
                    return e.concat([e[0]])
                })
            }, o.prototype.updateCoordinate = function(e, t, n) {
                this.changed();
                var r = e.split("."),
                    o = parseInt(r[0], 10),
                    i = parseInt(r[1], 10);
                void 0 === this.coordinates[o] && (this.coordinates[o] = []), this.coordinates[o][i] = [t, n]
            }, t.exports = o
        }, {
            "./feature": 26
        }],
        31: [function(e, t, n) {
            "use strict";
            var r = e("../constants");
            t.exports = {
                isOfMetaType: function(e) {
                    return function(t) {
                        var n = t.featureTarget;
                        return !!n && (!!n.properties && n.properties.meta === e)
                    }
                },
                isShiftMousedown: function(e) {
                    return !!e.originalEvent && (!!e.originalEvent.shiftKey && 0 === e.originalEvent.button)
                },
                isActiveFeature: function(e) {
                    return !!e.featureTarget && (!!e.featureTarget.properties && (e.featureTarget.properties.active === r.activeStates.ACTIVE && e.featureTarget.properties.meta === r.meta.FEATURE))
                },
                isInactiveFeature: function(e) {
                    return !!e.featureTarget && (!!e.featureTarget.properties && (e.featureTarget.properties.active === r.activeStates.INACTIVE && e.featureTarget.properties.meta === r.meta.FEATURE))
                },
                noTarget: function(e) {
                    return void 0 === e.featureTarget
                },
                isFeature: function(e) {
                    return !!e.featureTarget && (!!e.featureTarget.properties && e.featureTarget.properties.meta === r.meta.FEATURE)
                },
                isVertex: function(e) {
                    var t = e.featureTarget;
                    return !!t && (!!t.properties && t.properties.meta === r.meta.VERTEX)
                },
                isShiftDown: function(e) {
                    return !!e.originalEvent && !0 === e.originalEvent.shiftKey
                },
                isEscapeKey: function(e) {
                    return 27 === e.keyCode
                },
                isEnterKey: function(e) {
                    return 13 === e.keyCode
                },
                true: function() {
                    return !0
                }
            }
        }, {
            "../constants": 24
        }],
        32: [function(e, t, n) {
            "use strict";
            var r = e("geojson-extent"),
                o = e("../constants"),
                i = o.LAT_MIN,
                s = o.LAT_MAX,
                a = o.LAT_RENDERED_MIN,
                u = o.LAT_RENDERED_MAX,
                c = o.LNG_MIN,
                l = o.LNG_MAX;
            t.exports = function(e, t) {
                var n = i,
                    o = s,
                    p = i,
                    f = s,
                    d = l,
                    h = c;
                e.forEach(function(e) {
                    var t = r(e),
                        i = t[1],
                        s = t[3],
                        a = t[0],
                        u = t[2];
                    i > n && (n = i), s < o && (o = s), s > p && (p = s), i < f && (f = i), a < d && (d = a), u > h && (h = u)
                });
                var y = t;
                return n + y.lat > u && (y.lat = u - n), p + y.lat > s && (y.lat = s - p), o + y.lat < a && (y.lat = a - o), f + y.lat < i && (y.lat = i - f), d + y.lng <= c && (y.lng += 360 * Math.ceil(Math.abs(y.lng) / 360)), h + y.lng >= l && (y.lng -= 360 * Math.ceil(Math.abs(y.lng) / 360)), y
            }
        }, {
            "../constants": 24,
            "geojson-extent": 11
        }],
        33: [function(e, t, n) {
            "use strict";
            var r = e("../constants");
            t.exports = function(e, t, n, o) {
                var i = t.geometry.coordinates,
                    s = n.geometry.coordinates;
                if (i[1] > r.LAT_RENDERED_MAX || i[1] < r.LAT_RENDERED_MIN || s[1] > r.LAT_RENDERED_MAX || s[1] < r.LAT_RENDERED_MIN) return null;
                var a = o.project([i[0], i[1]]),
                    u = o.project([s[0], s[1]]),
                    c = o.unproject([(a.x + u.x) / 2, (a.y + u.y) / 2]);
                return {
                    type: r.geojsonTypes.FEATURE,
                    properties: {
                        meta: r.meta.MIDPOINT,
                        parent: e,
                        lng: c.lng,
                        lat: c.lat,
                        coord_path: n.properties.coord_path
                    },
                    geometry: {
                        type: r.geojsonTypes.POINT,
                        coordinates: [c.lng, c.lat]
                    }
                }
            }
        }, {
            "../constants": 24
        }],
        34: [function(e, t, n) {
            "use strict";

            function r(e) {
                function t(e, t) {
                    var r = "",
                        s = null;
                    e.forEach(function(e, u) {
                        var c = void 0 !== t && null !== t ? t + "." + u : String(u),
                            l = o(f, e, c, n(c));
                        if (a.midpoints && s) {
                            var p = i(f, s, l, a.map);
                            p && d.push(p)
                        }
                        s = l;
                        var h = JSON.stringify(e);
                        r !== h && d.push(l), 0 === u && (r = h)
                    })
                }

                function n(e) {
                    return !!a.selectedPaths && -1 !== a.selectedPaths.indexOf(e)
                }
                var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                    c = e.geometry,
                    l = c.type,
                    p = c.coordinates,
                    f = e.properties && e.properties.id,
                    d = [];
                return l === s.geojsonTypes.POINT ? d.push(o(f, p, u, n(u))) : l === s.geojsonTypes.POLYGON ? p.forEach(function(e, n) {
                    t(e, null !== u ? u + "." + n : String(n))
                }) : l === s.geojsonTypes.LINE_STRING ? t(p, u) : 0 === l.indexOf(s.geojsonTypes.MULTI_PREFIX) && function() {
                    var t = l.replace(s.geojsonTypes.MULTI_PREFIX, "");
                    p.forEach(function(n, o) {
                        var i = {
                            type: s.geojsonTypes.FEATURE,
                            properties: e.properties,
                            geometry: {
                                type: t,
                                coordinates: n
                            }
                        };
                        d = d.concat(r(i, a, o))
                    })
                }(), d
            }
            var o = e("./create_vertex"),
                i = e("./create_midpoint"),
                s = e("../constants");
            t.exports = r
        }, {
            "../constants": 24,
            "./create_midpoint": 33,
            "./create_vertex": 35
        }],
        35: [function(e, t, n) {
            "use strict";
            var r = e("../constants");
            t.exports = function(e, t, n, o) {
                return {
                    type: r.geojsonTypes.FEATURE,
                    properties: {
                        meta: r.meta.VERTEX,
                        parent: e,
                        coord_path: n,
                        active: o ? r.activeStates.ACTIVE : r.activeStates.INACTIVE
                    },
                    geometry: {
                        type: r.geojsonTypes.POINT,
                        coordinates: t
                    }
                }
            }
        }, {
            "../constants": 24
        }],
        36: [function(e, t, n) {
            "use strict";
            t.exports = {
                enable: function(e) {
                    setTimeout(function() {
                        e.map && e.map.doubleClickZoom && e.map.doubleClickZoom.enable()
                    }, 0)
                },
                disable: function(e) {
                    setTimeout(function() {
                        e.map && e.map.doubleClickZoom && e.map.doubleClickZoom.disable()
                    }, 0)
                }
            }
        }, {}],
        37: [function(e, t, n) {
            "use strict";
            t.exports = function(e, t) {
                var n = e.x - t.x,
                    r = e.y - t.y;
                return Math.sqrt(n * n + r * r)
            }
        }, {}],
        38: [function(e, t, n) {
            "use strict";

            function r(e, t, n) {
                return i(e, t, n, n.options.clickBuffer)
            }

            function o(e, t, n) {
                return i(e, t, n, n.options.touchBuffer)
            }

            function i(e, t, n, r) {
                if (null === n.map) return [];
                var o = e ? a(e, r) : t,
                    i = {};
                n.options.styles && (i.layers = n.options.styles.map(function(e) {
                    return e.id
                }));
                var u = n.map.queryRenderedFeatures(o, i).filter(function(e) {
                        return -1 !== l.indexOf(e.properties.meta)
                    }),
                    p = new c,
                    f = [];
                return u.forEach(function(e) {
                    var t = e.properties.id;
                    p.has(t) || (p.add(t), f.push(e))
                }), s(f)
            }
            var s = e("./sort_features"),
                a = e("./map_event_to_bounding_box"),
                u = e("../constants"),
                c = e("./string_set"),
                l = [u.meta.FEATURE, u.meta.MIDPOINT, u.meta.VERTEX];
            t.exports = {
                click: r,
                touch: o
            }
        }, {
            "../constants": 24,
            "./map_event_to_bounding_box": 43,
            "./sort_features": 47,
            "./string_set": 48
        }],
        39: [function(e, t, n) {
            "use strict";
            var r = e("./features_at"),
                o = e("../constants");
            t.exports = function(e, t) {
                var n = r.click(e, null, t),
                    i = {
                        mouse: o.cursors.NONE
                    };
                return n[0] && (i.mouse = n[0].properties.active === o.activeStates.ACTIVE ? o.cursors.MOVE : o.cursors.POINTER, i.feature = n[0].properties.meta), -1 !== t.events.currentModeName().indexOf("draw") && (i.mouse = o.cursors.ADD), t.ui.queueMapClasses(i), t.ui.updateMapClasses(), n[0]
            }
        }, {
            "../constants": 24,
            "./features_at": 38
        }],
        40: [function(e, t, n) {
            "use strict";
            var r = e("./euclidean_distance");
            t.exports = function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    o = null != n.fineTolerance ? n.fineTolerance : 4,
                    i = null != n.grossTolerance ? n.grossTolerance : 12,
                    s = null != n.interval ? n.interval : 500;
                e.point = e.point || t.point, e.time = e.time || t.time;
                var a = r(e.point, t.point);
                return a < o || a < i && t.time - e.time < s
            }
        }, {
            "./euclidean_distance": 37
        }],
        41: [function(e, t, n) {
            "use strict";

            function r(e, t) {
                return !!e.lngLat && (e.lngLat.lng === t[0] && e.lngLat.lat === t[1])
            }
            t.exports = r
        }, {}],
        42: [function(e, t, n) {
            "use strict";
            var r = e("./euclidean_distance");
            t.exports = function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    o = null != n.tolerance ? n.tolerance : 25,
                    i = null != n.interval ? n.interval : 250;
                return e.point = e.point || t.point, e.time = e.time || t.time, r(e.point, t.point) < o && t.time - e.time < i
            }
        }, {
            "./euclidean_distance": 37
        }],
        43: [function(e, t, n) {
            "use strict";

            function r(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                return [
                    [e.point.x - t, e.point.y - t],
                    [e.point.x + t, e.point.y + t]
                ]
            }
            t.exports = r
        }, {}],
        44: [function(e, t, n) {
            "use strict";
            var r = function(e, t) {
                var n = {
                        drag: [],
                        click: [],
                        mousemove: [],
                        mousedown: [],
                        mouseup: [],
                        mouseout: [],
                        keydown: [],
                        keyup: [],
                        touchstart: [],
                        touchmove: [],
                        touchend: [],
                        tap: []
                    },
                    r = {
                        on: function(e, t, r) {
                            if (void 0 === n[e]) throw new Error("Invalid event type: " + e);
                            n[e].push({
                                selector: t,
                                fn: r
                            })
                        },
                        render: function(e) {
                            t.store.featureChanged(e)
                        }
                    },
                    o = function(e, o) {
                        for (var i = n[e], s = i.length; s--;) {
                            var a = i[s];
                            if (a.selector(o)) {
                                a.fn.call(r, o), t.store.render(), t.ui.updateMapClasses();
                                break
                            }
                        }
                    };
                return e.start.call(r), {
                    render: e.render,
                    stop: function() {
                        e.stop && e.stop()
                    },
                    trash: function() {
                        e.trash && (e.trash(), t.store.render())
                    },
                    combineFeatures: function() {
                        e.combineFeatures && e.combineFeatures()
                    },
                    uncombineFeatures: function() {
                        e.uncombineFeatures && e.uncombineFeatures()
                    },
                    drag: function(e) {
                        o("drag", e)
                    },
                    click: function(e) {
                        o("click", e)
                    },
                    mousemove: function(e) {
                        o("mousemove", e)
                    },
                    mousedown: function(e) {
                        o("mousedown", e)
                    },
                    mouseup: function(e) {
                        o("mouseup", e)
                    },
                    mouseout: function(e) {
                        o("mouseout", e)
                    },
                    keydown: function(e) {
                        o("keydown", e)
                    },
                    keyup: function(e) {
                        o("keyup", e)
                    },
                    touchstart: function(e) {
                        o("touchstart", e)
                    },
                    touchmove: function(e) {
                        o("touchmove", e)
                    },
                    touchend: function(e) {
                        o("touchend", e)
                    },
                    tap: function(e) {
                        o("tap", e)
                    }
                }
            };
            t.exports = r
        }, {}],
        45: [function(e, t, n) {
            "use strict";

            function r(e, t) {
                var n = t.getBoundingClientRect();
                return new o(e.clientX - n.left - (t.clientLeft || 0), e.clientY - n.top - (t.clientTop || 0))
            }
            var o = e("point-geometry");
            t.exports = r
        }, {
            "point-geometry": 18
        }],
        46: [function(e, t, n) {
            "use strict";
            var r = e("./constrain_feature_movement"),
                o = e("../constants");
            t.exports = function(e, t) {
                var n = r(e.map(function(e) {
                    return e.toGeoJSON()
                }), t);
                e.forEach(function(e) {
                    var t = e.getCoordinates(),
                        r = function(e) {
                            var t = {
                                lng: e[0] + n.lng,
                                lat: e[1] + n.lat
                            };
                            return [t.lng, t.lat]
                        },
                        i = function(e) {
                            return e.map(function(e) {
                                return r(e)
                            })
                        },
                        s = function(e) {
                            return e.map(function(e) {
                                return i(e)
                            })
                        },
                        a = void 0;
                    e.type === o.geojsonTypes.POINT ? a = r(t) : e.type === o.geojsonTypes.LINE_STRING || e.type === o.geojsonTypes.MULTI_POINT ? a = t.map(r) : e.type === o.geojsonTypes.POLYGON || e.type === o.geojsonTypes.MULTI_LINE_STRING ? a = t.map(i) : e.type === o.geojsonTypes.MULTI_POLYGON && (a = t.map(s)), e.incomingCoords(a)
                })
            }
        }, {
            "../constants": 24,
            "./constrain_feature_movement": 32
        }],
        47: [function(e, t, n) {
            "use strict";

            function r(e, t) {
                var n = a[e.geometry.type] - a[t.geometry.type];
                return 0 === n && e.geometry.type === s.geojsonTypes.POLYGON ? e.area - t.area : n
            }

            function o(e) {
                return e.map(function(e) {
                    return e.geometry.type === s.geojsonTypes.POLYGON && (e.area = i.geometry({
                        type: s.geojsonTypes.FEATURE,
                        property: {},
                        geometry: e.geometry
                    })), e
                }).sort(r).map(function(e) {
                    return delete e.area, e
                })
            }
            var i = e("@mapbox/geojson-area"),
                s = e("../constants"),
                a = {
                    Point: 0,
                    LineString: 1,
                    Polygon: 2
                };
            t.exports = o
        }, {
            "../constants": 24,
            "@mapbox/geojson-area": 2
        }],
        48: [function(e, t, n) {
            "use strict";

            function r(e) {
                if (this._items = {}, this._length = e ? e.length : 0, e)
                    for (var t = 0, n = e.length; t < n; t++) void 0 !== e[t] && (this._items[e[t]] = t)
            }
            r.prototype.add = function(e) {
                return this._length = this._items[e] ? this._length : this._length + 1, this._items[e] = this._items[e] ? this._items[e] : this._length, this
            }, r.prototype.delete = function(e) {
                return this._length = this._items[e] ? this._length - 1 : this._length, delete this._items[e], this
            }, r.prototype.has = function(e) {
                return void 0 !== this._items[e]
            }, r.prototype.values = function() {
                var e = this;
                return Object.keys(this._items).sort(function(t, n) {
                    return e._items[t] - e._items[n]
                })
            }, r.prototype.clear = function() {
                return this._length = 0, this._items = {}, this
            }, t.exports = r
        }, {}],
        49: [function(e, t, n) {
            "use strict";
            t.exports = function(e, t) {
                return e.length === t.length && JSON.stringify(e.map(function(e) {
                        return e
                    }).sort()) === JSON.stringify(t.map(function(e) {
                        return e
                    }).sort())
            }
        }, {}],
        50: [function(e, t, n) {
            "use strict";
            t.exports = [{
                id: "gl-draw-polygon-fill-inactive",
                type: "fill",
                filter: ["all", ["==", "active", "false"],
                    ["==", "$type", "Polygon"],
                    ["!=", "mode", "static"]
                ],
                paint: {
                    "fill-color": "#088",
                    "fill-outline-color": "#088",
                    "fill-opacity": .5
                }
            }, {
                id: "gl-draw-polygon-fill-active",
                type: "fill",
                filter: ["all", ["==", "active", "true"],
                    ["==", "$type", "Polygon"]
                ],
                paint: {
                    "fill-color": "#F26430",
                    "fill-outline-color": "#F26430",
                    "fill-opacity": .5
                }
            }, {
                id: "gl-draw-polygon-midpoint",
                type: "circle",
                filter: ["all", ["==", "$type", "Point"],
                    ["==", "meta", "midpoint"]
                ],
                paint: {
                    "circle-radius": 3,
                    "circle-color": "#fbb03b"
                }
            }, {
                id: "gl-draw-polygon-stroke-inactive",
                type: "line",
                filter: ["all", ["==", "active", "false"],
                    ["==", "$type", "Polygon"],
                    ["!=", "mode", "static"]
                ],
                layout: {
                    "line-cap": "round",
                    "line-join": "round"
                },
                paint: {
                    "line-color": "#3bb2d0",
                    "line-width": 2
                }
            }, {
                id: "gl-draw-polygon-stroke-active",
                type: "line",
                filter: ["all", ["==", "active", "true"],
                    ["==", "$type", "Polygon"]
                ],
                layout: {
                    "line-cap": "round",
                    "line-join": "round"
                },
                paint: {
                    "line-color": "#F26430",
                    "line-dasharray": [.2, 2],
                    "line-width": 2
                }
            }, {
                id: "gl-draw-line-inactive",
                type: "line",
                filter: ["all", ["==", "active", "false"],
                    ["==", "$type", "LineString"],
                    ["!=", "mode", "static"]
                ],
                layout: {
                    "line-cap": "round",
                    "line-join": "round"
                },
                paint: {
                    "line-color": "#3bb2d0",
                    "line-width": 2
                }
            }, {
                id: "gl-draw-line-active",
                type: "line",
                filter: ["all", ["==", "$type", "LineString"],
                    ["==", "active", "true"]
                ],
                layout: {
                    "line-cap": "round",
                    "line-join": "round"
                },
                paint: {
                    "line-color": "#F26430",
                    "line-dasharray": [.2, 2],
                    "line-width": 2
                }
            }, {
                id: "gl-draw-polygon-and-line-vertex-stroke-inactive",
                type: "circle",
                filter: ["all", ["==", "meta", "vertex"],
                    ["==", "$type", "Point"],
                    ["!=", "mode", "static"]
                ],
                paint: {
                    "circle-radius": 5,
                    "circle-color": "#fff"
                }
            }, {
                id: "gl-draw-polygon-and-line-vertex-inactive",
                type: "circle",
                filter: ["all", ["==", "meta", "vertex"],
                    ["==", "$type", "Point"],
                    ["!=", "mode", "static"]
                ],
                paint: {
                    "circle-radius": 3,
                    "circle-color": "#fbb03b"
                }
            }, {
                id: "gl-draw-point-point-stroke-inactive",
                type: "circle",
                filter: ["all", ["==", "active", "false"],
                    ["==", "$type", "Point"],
                    ["==", "meta", "feature"],
                    ["!=", "mode", "static"]
                ],
                paint: {
                    "circle-radius": 5,
                    "circle-opacity": 1,
                    "circle-color": "#fff"
                }
            }, {
                id: "gl-draw-point-inactive",
                type: "circle",
                filter: ["all", ["==", "active", "false"],
                    ["==", "$type", "Point"],
                    ["==", "meta", "feature"],
                    ["!=", "mode", "static"]
                ],
                paint: {
                    "circle-radius": 3,
                    "circle-color": "#3bb2d0"
                }
            }, {
                id: "gl-draw-point-stroke-active",
                type: "circle",
                filter: ["all", ["==", "$type", "Point"],
                    ["==", "active", "true"],
                    ["!=", "meta", "midpoint"]
                ],
                paint: {
                    "circle-radius": 7,
                    "circle-color": "#fff"
                }
            }, {
                id: "gl-draw-point-active",
                type: "circle",
                filter: ["all", ["==", "$type", "Point"],
                    ["!=", "meta", "midpoint"],
                    ["==", "active", "true"]
                ],
                paint: {
                    "circle-radius": 5,
                    "circle-color": "#fbb03b"
                }
            }, {
                id: "gl-draw-polygon-fill-static",
                type: "fill",
                filter: ["all", ["==", "mode", "static"],
                    ["==", "$type", "Polygon"]
                ],
                paint: {
                    "fill-color": "#404040",
                    "fill-outline-color": "#404040",
                    "fill-opacity": .1
                }
            }, {
                id: "gl-draw-polygon-stroke-static",
                type: "line",
                filter: ["all", ["==", "mode", "static"],
                    ["==", "$type", "Polygon"]
                ],
                layout: {
                    "line-cap": "round",
                    "line-join": "round"
                },
                paint: {
                    "line-color": "#404040",
                    "line-width": 2
                }
            }, {
                id: "gl-draw-line-static",
                type: "line",
                filter: ["all", ["==", "mode", "static"],
                    ["==", "$type", "LineString"]
                ],
                layout: {
                    "line-cap": "round",
                    "line-join": "round"
                },
                paint: {
                    "line-color": "#404040",
                    "line-width": 2
                }
            }, {
                id: "gl-draw-point-static",
                type: "circle",
                filter: ["all", ["==", "mode", "static"],
                    ["==", "$type", "Point"]
                ],
                paint: {
                    "circle-radius": 5,
                    "circle-color": "#404040"
                }
            }]
        }, {}],
        51: [function(e, t, n) {
            "use strict";

            function r(e, t, n) {
                function r() {
                    i = !1, s && (o.apply(n, s), s = !1)
                }

                function o() {
                    i ? s = arguments : (i = !0, e.apply(n, arguments), setTimeout(r, t))
                }
                var i = void 0,
                    s = void 0;
                return o
            }
            t.exports = r
        }, {}],
        52: [function(e, t, n) {
            "use strict";

            function r(e) {
                return [].concat(e).filter(function(e) {
                    return void 0 !== e
                })
            }
            t.exports = r
        }, {}],
        53: [function(e, t, n) {
            "use strict";
            var r = e("../lib/common_selectors"),
                o = r.noTarget,
                i = r.isOfMetaType,
                s = r.isInactiveFeature,
                a = r.isShiftDown,
                u = e("../lib/create_supplementary_points"),
                c = e("../lib/constrain_feature_movement"),
                l = e("../lib/double_click_zoom"),
                p = e("../constants"),
                f = e("../lib/common_selectors"),
                d = e("../lib/move_features"),
                h = i(p.meta.VERTEX),
                y = i(p.meta.MIDPOINT);
            t.exports = function(e, t) {
                function n(e, t) {
                    return t.map(function(t) {
                        return {
                            feature_id: e,
                            coord_path: t
                        }
                    })
                }
                var r = t.featureId,
                    i = e.store.get(r);
                if (!i) throw new Error("You must provide a featureId to enter direct_select mode");
                if (i.type === p.geojsonTypes.POINT) throw new TypeError("direct_select mode doesn't handle point features");
                var g = t.startPos || null,
                    m = !1,
                    _ = !1,
                    v = t.coordPath ? [t.coordPath] : [],
                    b = n(r, v);
                e.store.setSelectedCoordinates(b);
                var E = function() {
                        e.map.fire(p.events.UPDATE, {
                            action: p.updateActions.CHANGE_COORDINATES,
                            features: e.store.getSelected().map(function(e) {
                                return e.toGeoJSON()
                            })
                        })
                    },
                    T = function() {
                        return e.events.actionable({
                            combineFeatures: !1,
                            uncombineFeatures: !1,
                            trash: v.length > 0
                        })
                    },
                    O = function(t) {
                        e.map.dragPan.disable(), _ = !0, g = t.lngLat
                    },
                    x = function() {
                        e.map.dragPan.enable(), m = !1, _ = !1, g = null
                    },
                    S = function(t) {
                        O(t);
                        var o = t.featureTarget.properties,
                            s = v.indexOf(o.coord_path);
                        a(t) || -1 !== s ? a(t) && -1 === s && v.push(o.coord_path) : v = [o.coord_path];
                        var u = n(r, v);
                        e.store.setSelectedCoordinates(u), i.changed()
                    },
                    I = function(e) {
                        O(e);
                        var t = e.featureTarget.properties;
                        i.addCoordinate(t.coord_path, t.lng, t.lat), E(), v = [t.coord_path]
                    },
                    C = function(e) {
                        0 === v.length ? O(e) : x()
                    },
                    L = function(t, n) {
                        d(e.store.getSelected(), n), g = t.lngLat
                    },
                    N = function(e, t) {
                        for (var n = v.map(function(e) {
                            return i.getCoordinate(e)
                        }), r = n.map(function(e) {
                            return {
                                type: p.geojsonTypes.FEATURE,
                                properties: {},
                                geometry: {
                                    type: p.geojsonTypes.POINT,
                                    coordinates: e
                                }
                            }
                        }), o = c(r, t), s = 0; s < n.length; s++) {
                            var a = n[s];
                            i.updateCoordinate(v[s], a[0] + o.lng, a[1] + o.lat)
                        }
                    };
                return {
                    start: function() {
                        function t() {
                            e.events.changeMode(p.modes.SIMPLE_SELECT)
                        }

                        function n() {
                            e.events.changeMode(p.modes.SIMPLE_SELECT)
                        }

                        function a() {
                            v = [], e.store.clearSelectedCoordinates(), i.changed()
                        }
                        e.store.setSelected(r), l.disable(e), this.on("mousemove", f.true, function(t) {
                            var n = f.isActiveFeature(t),
                                r = h(t),
                                o = 0 === v.length;
                            n && o ? e.ui.queueMapClasses({
                                mouse: p.cursors.MOVE
                            }) : r && !o ? e.ui.queueMapClasses({
                                mouse: p.cursors.MOVE
                            }) : e.ui.queueMapClasses({
                                mouse: p.cursors.NONE
                            }), x()
                        }), this.on("mouseout", function() {
                            return m
                        }, E), this.on("mousedown", h, S), this.on("touchstart", h, S), this.on("mousedown", f.isActiveFeature, C), this.on("touchstart", f.isActiveFeature, C), this.on("mousedown", y, I), this.on("touchstart", y, I), this.on("drag", function() {
                            return _
                        }, function(e) {
                            m = !0, e.originalEvent.stopPropagation();
                            var t = {
                                lng: e.lngLat.lng - g.lng,
                                lat: e.lngLat.lat - g.lat
                            };
                            v.length > 0 ? N(0, t) : L(e, t), g = e.lngLat
                        }), this.on("click", f.true, x), this.on("mouseup", f.true, function() {
                            m && E(), x()
                        }), this.on("touchend", f.true, function() {
                            m && E(), x()
                        }), this.on("click", o, t), this.on("tap", o, t), this.on("click", s, n), this.on("tap", s, n), this.on("click", f.isActiveFeature, a), this.on("tap", f.isActiveFeature, a)
                    },
                    stop: function() {
                        l.enable(e), e.store.clearSelectedCoordinates()
                    },
                    render: function(t, n) {
                        r === t.properties.id ? (t.properties.active = p.activeStates.ACTIVE, n(t), u(t, {
                            map: e.map,
                            midpoints: !0,
                            selectedPaths: v
                        }).forEach(n)) : (t.properties.active = p.activeStates.INACTIVE, n(t)), T()
                    },
                    trash: function() {
                        v.sort().reverse().forEach(function(e) {
                            return i.removeCoordinate(e)
                        }), e.map.fire(p.events.UPDATE, {
                            action: p.updateActions.CHANGE_COORDINATES,
                            features: e.store.getSelected().map(function(e) {
                                return e.toGeoJSON()
                            })
                        }), v = [], e.store.clearSelectedCoordinates(), T(), !1 === i.isValid() && (e.store.delete([r]), e.events.changeMode(p.modes.SIMPLE_SELECT, {}))
                    }
                }
            }
        }, {
            "../constants": 24,
            "../lib/common_selectors": 31,
            "../lib/constrain_feature_movement": 32,
            "../lib/create_supplementary_points": 34,
            "../lib/double_click_zoom": 36,
            "../lib/move_features": 46
        }],
        54: [function(e, t, n) {
            "use strict";

            function r(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                    return n
                }
                return Array.from(e)
            }
            var o = e("../lib/common_selectors"),
                i = e("../feature_types/line_string"),
                s = e("../lib/is_event_at_coordinates"),
                a = e("../lib/double_click_zoom"),
                u = e("../constants"),
                c = e("../lib/create_vertex");
            t.exports = function(e, t) {
                t = t || {};
                var n = t.featureId,
                    l = void 0,
                    p = void 0,
                    f = "forward";
                if (n) {
                    if (!(l = e.store.get(n))) throw new Error("Could not find a feature with the provided featureId");
                    var d = t.from;
                    if (d && "Feature" === d.type && d.geometry && "Point" === d.geometry.type && (d = d.geometry), d && "Point" === d.type && d.coordinates && 2 === d.coordinates.length && (d = d.coordinates), !d || !Array.isArray(d)) throw new Error("Please use the `from` property to indicate which point to continue the line from");
                    var h = l.coordinates.length - 1;
                    if (l.coordinates[h][0] === d[0] && l.coordinates[h][1] === d[1]) {
                        var y;
                        p = h + 1, (y = l).addCoordinate.apply(y, [p].concat(r(l.coordinates[h])))
                    } else {
                        if (l.coordinates[0][0] !== d[0] || l.coordinates[0][1] !== d[1]) throw new Error("`from` should match the point at either the start or the end of the provided LineString");
                        var g;
                        f = "backwards", p = 0, (g = l).addCoordinate.apply(g, [p].concat(r(l.coordinates[0])))
                    }
                } else l = new i(e, {
                    type: u.geojsonTypes.FEATURE,
                    properties: {},
                    geometry: {
                        type: u.geojsonTypes.LINE_STRING,
                        coordinates: []
                    }
                }), p = 0, e.store.add(l);
                return e._test && (e._test.line = l), {
                    start: function() {
                        function t(t) {
                            if (p > 0 && s(t, l.coordinates[p - 1]) || "backwards" === f && s(t, l.coordinates[p + 1])) return e.events.changeMode(u.modes.SIMPLE_SELECT, {
                                featureIds: [l.id]
                            });
                            e.ui.queueMapClasses({
                                mouse: u.cursors.ADD
                            }), l.updateCoordinate(p, t.lngLat.lng, t.lngLat.lat), "forward" === f ? p++ : l.addCoordinate(0, t.lngLat.lng, t.lngLat.lat)
                        }

                        function n() {
                            return e.events.changeMode(u.modes.SIMPLE_SELECT, {
                                featureIds: [l.id]
                            })
                        }
                        e.store.clearSelected(), a.disable(e), e.ui.queueMapClasses({
                            mouse: u.cursors.ADD
                        }), e.ui.setActiveButton(u.types.LINE), this.on("mousemove", o.true, function(t) {
                            l.updateCoordinate(p, t.lngLat.lng, t.lngLat.lat), o.isVertex(t) && e.ui.queueMapClasses({
                                mouse: u.cursors.POINTER
                            })
                        }), this.on("click", o.true, t), this.on("tap", o.true, t), this.on("click", o.isVertex, n), this.on("tap", o.isVertex, n), this.on("keyup", o.isEscapeKey, function() {
                            e.store.delete([l.id], {
                                silent: !0
                            }), e.events.changeMode(u.modes.SIMPLE_SELECT)
                        }), this.on("keyup", o.isEnterKey, function() {
                            e.events.changeMode(u.modes.SIMPLE_SELECT, {
                                featureIds: [l.id]
                            })
                        }), e.events.actionable({
                            combineFeatures: !1,
                            uncombineFeatures: !1,
                            trash: !0
                        })
                    },
                    stop: function() {
                        a.enable(e), e.ui.setActiveButton(), void 0 !== e.store.get(l.id) && (l.removeCoordinate("" + p), l.isValid() ? e.map.fire(u.events.CREATE, {
                            features: [l.toGeoJSON()]
                        }) : (e.store.delete([l.id], {
                            silent: !0
                        }), e.events.changeMode(u.modes.SIMPLE_SELECT, {}, {
                            silent: !0
                        })))
                    },
                    render: function(e, t) {
                        var n = e.properties.id === l.id;
                        if (e.properties.active = n ? u.activeStates.ACTIVE : u.activeStates.INACTIVE, !n) return t(e);
                        e.geometry.coordinates.length < 2 || (e.properties.meta = u.meta.FEATURE, e.geometry.coordinates.length >= 3 && t(c(l.id, e.geometry.coordinates["forward" === f ? e.geometry.coordinates.length - 2 : 1], "" + ("forward" === f ? e.geometry.coordinates.length - 2 : 1), !1)), t(e))
                    },
                    trash: function() {
                        e.store.delete([l.id], {
                            silent: !0
                        }), e.events.changeMode(u.modes.SIMPLE_SELECT)
                    }
                }
            }
        }, {
            "../constants": 24,
            "../feature_types/line_string": 27,
            "../lib/common_selectors": 31,
            "../lib/create_vertex": 35,
            "../lib/double_click_zoom": 36,
            "../lib/is_event_at_coordinates": 41
        }],
        55: [function(e, t, n) {
            "use strict";
            var r = e("../lib/common_selectors"),
                o = e("../feature_types/point"),
                i = e("../constants");
            t.exports = function(e) {
                function t() {
                    e.events.changeMode(i.modes.SIMPLE_SELECT), e.store.delete([s.id], {
                        silent: !0
                    })
                }

                function n(t) {
                    e.ui.queueMapClasses({
                        mouse: i.cursors.MOVE
                    }), s.updateCoordinate("", t.lngLat.lng, t.lngLat.lat), e.map.fire(i.events.CREATE, {
                        features: [s.toGeoJSON()]
                    }), e.events.changeMode(i.modes.SIMPLE_SELECT, {
                        featureIds: [s.id]
                    })
                }
                var s = new o(e, {
                    type: i.geojsonTypes.FEATURE,
                    properties: {},
                    geometry: {
                        type: i.geojsonTypes.POINT,
                        coordinates: []
                    }
                });
                return e._test && (e._test.point = s), e.store.add(s), {
                    start: function() {
                        e.store.clearSelected(), e.ui.queueMapClasses({
                            mouse: i.cursors.ADD
                        }), e.ui.setActiveButton(i.types.POINT), this.on("click", r.true, n), this.on("tap", r.true, n), this.on("keyup", r.isEscapeKey, t), this.on("keyup", r.isEnterKey, t), e.events.actionable({
                            combineFeatures: !1,
                            uncombineFeatures: !1,
                            trash: !0
                        })
                    },
                    stop: function() {
                        e.ui.setActiveButton(), s.getCoordinate().length || e.store.delete([s.id], {
                            silent: !0
                        })
                    },
                    render: function(e, t) {
                        var n = e.properties.id === s.id;
                        if (e.properties.active = n ? i.activeStates.ACTIVE : i.activeStates.INACTIVE, !n) return t(e)
                    },
                    trash: function() {
                        t()
                    }
                }
            }
        }, {
            "../constants": 24,
            "../feature_types/point": 29,
            "../lib/common_selectors": 31
        }],
        56: [function(e, t, n) {
            "use strict";
            var r = e("../lib/common_selectors"),
                o = e("../feature_types/polygon"),
                i = e("../lib/double_click_zoom"),
                s = e("../constants"),
                a = e("../lib/is_event_at_coordinates"),
                u = e("../lib/create_vertex");
            t.exports = function(e) {
                var t = new o(e, {
                        type: s.geojsonTypes.FEATURE,
                        properties: {},
                        geometry: {
                            type: s.geojsonTypes.POLYGON,
                            coordinates: [
                                []
                            ]
                        }
                    }),
                    n = 0;
                return e._test && (e._test.polygon = t), e.store.add(t), {
                    start: function() {
                        function o(r) {
                            if (n > 0 && a(r, t.coordinates[0][n - 1])) return e.events.changeMode(s.modes.SIMPLE_SELECT, {
                                featureIds: [t.id]
                            });
                            e.ui.queueMapClasses({
                                mouse: s.cursors.ADD
                            }), t.updateCoordinate("0." + n, r.lngLat.lng, r.lngLat.lat), n++
                        }

                        function u() {
                            return e.events.changeMode(s.modes.SIMPLE_SELECT, {
                                featureIds: [t.id]
                            })
                        }
                        e.store.clearSelected(), i.disable(e), e.ui.queueMapClasses({
                            mouse: s.cursors.ADD
                        }), e.ui.setActiveButton(s.types.POLYGON), this.on("mousemove", r.true, function(o) {
                            t.updateCoordinate("0." + n, o.lngLat.lng, o.lngLat.lat), r.isVertex(o) && e.ui.queueMapClasses({
                                mouse: s.cursors.POINTER
                            })
                        }), this.on("click", r.true, o), this.on("click", r.isVertex, u), this.on("tap", r.true, o), this.on("tap", r.isVertex, u), this.on("keyup", r.isEscapeKey, function() {
                            e.store.delete([t.id], {
                                silent: !0
                            }), e.events.changeMode(s.modes.SIMPLE_SELECT)
                        }), this.on("keyup", r.isEnterKey, function() {
                            e.events.changeMode(s.modes.SIMPLE_SELECT, {
                                featureIds: [t.id]
                            })
                        }), e.events.actionable({
                            combineFeatures: !1,
                            uncombineFeatures: !1,
                            trash: !0
                        })
                    },
                    stop: function() {
                        e.ui.queueMapClasses({
                            mouse: s.cursors.NONE
                        }), i.enable(e), e.ui.setActiveButton(), void 0 !== e.store.get(t.id) && (t.removeCoordinate("0." + n), t.isValid() ? e.map.fire(s.events.CREATE, {
                            features: [t.toGeoJSON()]
                        }) : (e.store.delete([t.id], {
                            silent: !0
                        }), e.events.changeMode(s.modes.SIMPLE_SELECT, {}, {
                            silent: !0
                        })))
                    },
                    render: function(e, n) {
                        var r = e.properties.id === t.id;
                        if (e.properties.active = r ? s.activeStates.ACTIVE : s.activeStates.INACTIVE, !r) return n(e);
                        if (0 !== e.geometry.coordinates.length) {
                            var o = e.geometry.coordinates[0].length;
                            if (!(o < 3)) {
                                if (e.properties.meta = s.meta.FEATURE, o > 4) {
                                    n(u(t.id, e.geometry.coordinates[0][0], "0.0", !1));
                                    var i = e.geometry.coordinates[0].length - 3;
                                    n(u(t.id, e.geometry.coordinates[0][i], "0." + i, !1))
                                }
                                if (o > 3) return n(e);
                                var a = [
                                    [e.geometry.coordinates[0][0][0], e.geometry.coordinates[0][0][1]],
                                    [e.geometry.coordinates[0][1][0], e.geometry.coordinates[0][1][1]]
                                ];
                                return n({
                                    type: s.geojsonTypes.FEATURE,
                                    properties: e.properties,
                                    geometry: {
                                        coordinates: a,
                                        type: s.geojsonTypes.LINE_STRING
                                    }
                                })
                            }
                        }
                    },
                    trash: function() {
                        e.store.delete([t.id], {
                            silent: !0
                        }), e.events.changeMode(s.modes.SIMPLE_SELECT)
                    }
                }
            }
        }, {
            "../constants": 24,
            "../feature_types/polygon": 30,
            "../lib/common_selectors": 31,
            "../lib/create_vertex": 35,
            "../lib/double_click_zoom": 36,
            "../lib/is_event_at_coordinates": 41
        }],
        57: [function(e, t, n) {
            "use strict";
            var r = e("../lib/common_selectors"),
                o = e("../lib/mouse_event_point"),
                i = e("../lib/features_at"),
                s = e("../lib/create_supplementary_points"),
                a = e("../lib/string_set"),
                u = e("../lib/double_click_zoom"),
                c = e("../lib/move_features"),
                l = e("../constants"),
                p = e("../feature_types/multi_feature");
            t.exports = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = null,
                    f = null,
                    d = void 0,
                    h = !1,
                    y = !1,
                    g = !1,
                    m = !1,
                    _ = t.featureIds || [],
                    v = function() {
                        e.map.fire(l.events.UPDATE, {
                            action: l.updateActions.MOVE,
                            features: e.store.getSelected().map(function(e) {
                                return e.toGeoJSON()
                            })
                        })
                    },
                    b = function() {
                        var t = e.store.getSelected(),
                            n = t.filter(function(e) {
                                return e instanceof p
                            }),
                            r = !1;
                        if (t.length > 1) {
                            r = !0;
                            var o = t[0].type.replace("Multi", "");
                            t.forEach(function(e) {
                                e.type.replace("Multi", "") !== o && (r = !1)
                            })
                        }
                        var i = n.length > 0,
                            s = t.length > 0;
                        e.events.actionable({
                            combineFeatures: r,
                            uncombineFeatures: i,
                            trash: s
                        })
                    },
                    E = function(e) {
                        return e.length ? e.map(function(e) {
                            return e.properties.id
                        }).filter(function(e) {
                            return void 0 !== e
                        }).reduce(function(e, t) {
                            return e.add(t), e
                        }, new a).values() : []
                    },
                    T = function() {
                        d && (d.parentNode && d.parentNode.removeChild(d), d = null), e.map.dragPan.enable(), h = !1, y = !1, g = !1, m = !1
                    };
                return {
                    stop: function() {
                        u.enable(e)
                    },
                    start: function() {
                        function t() {
                            var t = this,
                                n = e.store.getSelectedIds();
                            n.length && (e.store.clearSelected(), n.forEach(function(e) {
                                return t.render(e)
                            })), u.enable(e), T()
                        }

                        function s(t) {
                            e.events.changeMode(l.modes.DIRECT_SELECT, {
                                featureId: t.featureTarget.properties.parent,
                                coordPath: t.featureTarget.properties.coord_path,
                                startPos: t.lngLat
                            }), e.ui.queueMapClasses({
                                mouse: l.cursors.MOVE
                            })
                        }

                        function a(t) {
                            T(), e.map.dragPan.disable(), this.render(t.featureTarget.properties.id), m = !0, n = t.lngLat
                        }

                        function p(t) {
                            u.disable(e), T();
                            var n = r.isShiftDown(t),
                                o = e.store.getSelectedIds(),
                                i = t.featureTarget.properties.id,
                                s = e.store.isSelected(i);
                            if (!n && s && e.store.get(i).type !== l.geojsonTypes.POINT) return e.events.changeMode(l.modes.DIRECT_SELECT, {
                                featureId: i
                            });
                            s && n ? (e.store.deselect(i), e.ui.queueMapClasses({
                                mouse: l.cursors.POINTER
                            }), 1 === o.length && u.enable(e)) : !s && n ? (e.store.select(i), e.ui.queueMapClasses({
                                mouse: l.cursors.MOVE
                            })) : s || n || (o.forEach(this.render), e.store.setSelected(i), e.ui.queueMapClasses({
                                mouse: l.cursors.MOVE
                            })), this.render(i)
                        }
                        e.store && (e.store.setSelected(_.filter(function(t) {
                            return void 0 !== e.store.get(t)
                        })), b()), this.on("mouseup", r.true, T), this.on("mousemove", r.true, T), this.on("mouseout", function() {
                            return g
                        }, v), this.on("click", r.noTarget, t), this.on("tap", r.noTarget, t), this.on("click", r.isOfMetaType(l.meta.VERTEX), s), this.on("tap", r.isOfMetaType(l.meta.VERTEX), s), this.on("mousedown", r.isActiveFeature, a), this.on("touchstart", r.isActiveFeature, a), this.on("click", r.isFeature, p), this.on("tap", r.isFeature, p), this.on("drag", function() {
                            return m
                        }, function(t) {
                            g = !0, t.originalEvent.stopPropagation();
                            var r = {
                                lng: t.lngLat.lng - n.lng,
                                lat: t.lngLat.lat - n.lat
                            };
                            c(e.store.getSelected(), r), n = t.lngLat
                        }), this.on("mouseup", r.true, function(t) {
                            if (g) v();
                            else if (h) {
                                var n = [f, o(t.originalEvent, e.container)],
                                    r = i.click(null, n, e),
                                    s = E(r).filter(function(t) {
                                        return !e.store.isSelected(t)
                                    });
                                s.length && (e.store.select(s), s.forEach(this.render), e.ui.queueMapClasses({
                                    mouse: l.cursors.MOVE
                                }))
                            }
                            T()
                        }), e.options.boxSelect && (this.on("mousedown", r.isShiftMousedown, function(t) {
                            T(), e.map.dragPan.disable(), f = o(t.originalEvent, e.container), y = !0
                        }), this.on("drag", function() {
                            return y
                        }, function(t) {
                            h = !0, e.ui.queueMapClasses({
                                mouse: l.cursors.ADD
                            }), d || (d = document.createElement("div"), d.classList.add(l.classes.BOX_SELECT), e.container.appendChild(d));
                            var n = o(t.originalEvent, e.container),
                                r = Math.min(f.x, n.x),
                                i = Math.max(f.x, n.x),
                                s = Math.min(f.y, n.y),
                                a = Math.max(f.y, n.y),
                                u = "translate(" + r + "px, " + s + "px)";
                            d.style.transform = u, d.style.WebkitTransform = u, d.style.width = i - r + "px", d.style.height = a - s + "px"
                        }))
                    },
                    render: function(t, n) {
                        t.properties.active = e.store.isSelected(t.properties.id) ? l.activeStates.ACTIVE : l.activeStates.INACTIVE, n(t), b(), t.properties.active === l.activeStates.ACTIVE && t.geometry.type !== l.geojsonTypes.POINT && s(t).forEach(n)
                    },
                    trash: function() {
                        e.store.delete(e.store.getSelectedIds()), b()
                    },
                    combineFeatures: function() {
                        var t = e.store.getSelected();
                        if (!(0 === t.length || t.length < 2)) {
                            for (var n = [], r = [], o = t[0].type.replace("Multi", ""), i = 0; i < t.length; i++) {
                                var s = t[i];
                                if (s.type.replace("Multi", "") !== o) return;
                                s.type.includes("Multi") ? s.getCoordinates().forEach(function(e) {
                                    n.push(e)
                                }) : n.push(s.getCoordinates()), r.push(s.toGeoJSON())
                            }
                            if (r.length > 1) {
                                var a = new p(e, {
                                    type: l.geojsonTypes.FEATURE,
                                    properties: r[0].properties,
                                    geometry: {
                                        type: "Multi" + o,
                                        coordinates: n
                                    }
                                });
                                e.store.add(a), e.store.delete(e.store.getSelectedIds(), {
                                    silent: !0
                                }), e.store.setSelected([a.id]), e.map.fire(l.events.COMBINE_FEATURES, {
                                    createdFeatures: [a.toGeoJSON()],
                                    deletedFeatures: r
                                })
                            }
                            b()
                        }
                    },
                    uncombineFeatures: function() {
                        var t = e.store.getSelected();
                        if (0 !== t.length) {
                            for (var n = [], r = [], o = 0; o < t.length; o++) ! function(o) {
                                var i = t[o];
                                i instanceof p && (i.getFeatures().forEach(function(t) {
                                    e.store.add(t), t.properties = i.properties, n.push(t.toGeoJSON()), e.store.select([t.id])
                                }), e.store.delete(i.id, {
                                    silent: !0
                                }), r.push(i.toGeoJSON()))
                            }(o);
                            n.length > 1 && e.map.fire(l.events.UNCOMBINE_FEATURES, {
                                createdFeatures: n,
                                deletedFeatures: r
                            }), b()
                        }
                    }
                }
            }
        }, {
            "../constants": 24,
            "../feature_types/multi_feature": 28,
            "../lib/common_selectors": 31,
            "../lib/create_supplementary_points": 34,
            "../lib/double_click_zoom": 36,
            "../lib/features_at": 38,
            "../lib/mouse_event_point": 45,
            "../lib/move_features": 46,
            "../lib/string_set": 48
        }],
        58: [function(e, t, n) {
            "use strict";
            t.exports = function(e) {
                return {
                    stop: function() {},
                    start: function() {
                        e.events.actionable({
                            combineFeatures: !1,
                            uncombineFeatures: !1,
                            trash: !1
                        })
                    },
                    render: function(e, t) {
                        t(e)
                    }
                }
            }
        }, {}],
        59: [function(e, t, n) {
            "use strict";

            function r(e, t) {
                return e.map(function(e) {
                    return e.source ? e : o(e, {
                        id: e.id + "." + t,
                        source: "hot" === t ? i.sources.HOT : i.sources.COLD
                    })
                })
            }
            var o = e("xtend"),
                i = e("./constants"),
                s = {
                    defaultMode: i.modes.SIMPLE_SELECT,
                    keybindings: !0,
                    touchEnabled: !0,
                    clickBuffer: 2,
                    touchBuffer: 25,
                    boxSelect: !0,
                    displayControlsDefault: !0,
                    styles: e("./lib/theme"),
                    controls: {},
                    userProperties: !1
                },
                a = {
                    point: !0,
                    line_string: !0,
                    polygon: !0,
                    trash: !0,
                    combine_features: !0,
                    uncombine_features: !0
                },
                u = {
                    point: !1,
                    line_string: !1,
                    polygon: !1,
                    trash: !1,
                    combine_features: !1,
                    uncombine_features: !1
                };
            t.exports = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = o(e);
                return e.controls || (t.controls = {}), !1 === e.displayControlsDefault ? t.controls = o(u, e.controls) : t.controls = o(a, e.controls), t = o(s, t), t.styles = r(t.styles, "cold").concat(r(t.styles, "hot")), t
            }
        }, {
            "./constants": 24,
            "./lib/theme": 50,
            xtend: 22
        }],
        60: [function(e, t, n) {
            "use strict";
            var r = e("./constants");
            t.exports = function() {
                function e(e, t) {
                    var r = n.get(e),
                        i = r.internal(o);
                    n.ctx.events.currentModeRender(i, function(e) {
                        n.sources[t].push(e)
                    })
                }

                function t() {
                    n.isDirty = !1, n.clearChangedIds()
                }
                var n = this;
                if (!n.ctx.map || void 0 === n.ctx.map.getSource(r.sources.HOT)) return t();
                var o = n.ctx.events.currentModeName();
                n.ctx.ui.queueMapClasses({
                    mode: o
                });
                var i = [],
                    s = [];
                n.isDirty ? s = n.getAllIds() : (i = n.getChangedIds().filter(function(e) {
                    return void 0 !== n.get(e)
                }), s = n.sources.hot.filter(function(e) {
                    return e.properties.id && -1 === i.indexOf(e.properties.id) && void 0 !== n.get(e.properties.id)
                }).map(function(e) {
                    return e.properties.id
                })), n.sources.hot = [];
                var a = n.sources.cold.length;
                n.sources.cold = n.isDirty ? [] : n.sources.cold.filter(function(e) {
                    var t = e.properties.id || e.properties.parent;
                    return -1 === i.indexOf(t)
                });
                var u = a !== n.sources.cold.length || s.length > 0;
                if (i.forEach(function(t) {
                        return e(t, "hot")
                    }), s.forEach(function(t) {
                        return e(t, "cold")
                    }), u && n.ctx.map.getSource(r.sources.COLD).setData({
                        type: r.geojsonTypes.FEATURE_COLLECTION,
                        features: n.sources.cold
                    }), n.ctx.map.getSource(r.sources.HOT).setData({
                        type: r.geojsonTypes.FEATURE_COLLECTION,
                        features: n.sources.hot
                    }), n._emitSelectionChange && (n.ctx.map.fire(r.events.SELECTION_CHANGE, {
                        features: n.getSelected().map(function(e) {
                            return e.toGeoJSON()
                        }),
                        points: n.getSelectedCoordinates().map(function(e) {
                            return {
                                type: r.geojsonTypes.FEATURE,
                                properties: {},
                                geometry: {
                                    type: r.geojsonTypes.POINT,
                                    coordinates: e.coordinates
                                }
                            }
                        })
                    }), n._emitSelectionChange = !1), n._deletedFeaturesToEmit.length) {
                    var c = n._deletedFeaturesToEmit.map(function(e) {
                        return e.toGeoJSON()
                    });
                    n._deletedFeaturesToEmit = [], n.ctx.map.fire(r.events.DELETE, {
                        features: c
                    })
                }
                n.ctx.map.fire(r.events.RENDER, {}), t()
            }
        }, {
            "./constants": 24
        }],
        61: [function(e, t, n) {
            "use strict";
            var r = e("./events"),
                o = e("./store"),
                i = e("./ui"),
                s = e("./constants");
            t.exports = function(e) {
                e.events = r(e), e.map = null, e.container = null, e.store = null, e.ui = i(e);
                var t = null,
                    n = {
                        onRemove: function() {
                            return n.removeLayers(), e.ui.removeButtons(), e.events.removeEventListeners(), e.map = null, e.container = null, e.store = null, t && t.parentNode && t.parentNode.removeChild(t), t = null, this
                        },
                        onAdd: function(r) {
                            e.map = r, e.container = r.getContainer(), e.store = new o(e), t = e.ui.addButtons(), e.options.boxSelect && (r.boxZoom.disable(), r.dragPan.disable(), r.dragPan.enable());
                            var i = null,
                                s = function t() {
                                    r.off("load", t), clearInterval(i), n.addLayers(), e.events.addEventListeners()
                                };
                            return r.loaded() ? s() : (r.on("load", s), i = setInterval(function() {
                                r.loaded() && s()
                            }, 16)), t
                        },
                        addLayers: function() {
                            e.map.addSource(s.sources.COLD, {
                                data: {
                                    type: s.geojsonTypes.FEATURE_COLLECTION,
                                    features: []
                                },
                                type: "geojson"
                            }), e.map.addSource(s.sources.HOT, {
                                data: {
                                    type: s.geojsonTypes.FEATURE_COLLECTION,
                                    features: []
                                },
                                type: "geojson"
                            }), e.options.styles.forEach(function(t) {
                                e.map.addLayer(t)
                            }), e.store.render()
                        },
                        removeLayers: function() {
                            e.options.styles.forEach(function(t) {
                                e.map.removeLayer(t.id)
                            }), e.map.removeSource(s.sources.COLD), e.map.removeSource(s.sources.HOT)
                        }
                    };
                return e.setup = n, n
            }
        }, {
            "./constants": 24,
            "./events": 25,
            "./store": 62,
            "./ui": 63
        }],
        62: [function(e, t, n) {
            "use strict";

            function r(e) {
                var t = this,
                    n = this._selectedCoordinates.filter(function(e) {
                        return t._selectedFeatureIds.has(e.feature_id)
                    });
                this._selectedCoordinates.length === n.length || e.silent || (this._emitSelectionChange = !0), this._selectedCoordinates = n
            }
            var o = e("./lib/throttle"),
                i = e("./lib/to_dense_array"),
                s = e("./lib/string_set"),
                a = e("./render"),
                u = t.exports = function(e) {
                    this._features = {}, this._featureIds = new s, this._selectedFeatureIds = new s, this._selectedCoordinates = [], this._changedFeatureIds = new s, this._deletedFeaturesToEmit = [], this._emitSelectionChange = !1, this.ctx = e, this.sources = {
                        hot: [],
                        cold: []
                    }, this.render = o(a, 16, this), this.isDirty = !1
                };
            u.prototype.createRenderBatch = function() {
                var e = this,
                    t = this.render,
                    n = 0;
                return this.render = function() {
                    n++
                },
                    function() {
                        e.render = t, n > 0 && e.render()
                    }
            },
                u.prototype.setDirty = function() {
                    return this.isDirty = !0, this
                }, u.prototype.featureChanged = function(e) {
                return this._changedFeatureIds.add(e), this
            }, u.prototype.getChangedIds = function() {
                return this._changedFeatureIds.values()
            }, u.prototype.clearChangedIds = function() {
                return this._changedFeatureIds.clear(), this
            }, u.prototype.getAllIds = function() {
                return this._featureIds.values()
            }, u.prototype.add = function(e) {
                return this.featureChanged(e.id), this._features[e.id] = e, this._featureIds.add(e.id), this
            }, u.prototype.delete = function(e) {
                var t = this,
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return i(e).forEach(function(e) {
                    t._featureIds.has(e) && (t._featureIds.delete(e), t._selectedFeatureIds.delete(e), n.silent || -1 === t._deletedFeaturesToEmit.indexOf(t._features[e]) && t._deletedFeaturesToEmit.push(t._features[e]), delete t._features[e], t.isDirty = !0)
                }), r.call(this, n), this
            }, u.prototype.get = function(e) {
                return this._features[e]
            }, u.prototype.getAll = function() {
                var e = this;
                return Object.keys(this._features).map(function(t) {
                    return e._features[t]
                })
            }, u.prototype.select = function(e) {
                var t = this,
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return i(e).forEach(function(e) {
                    t._selectedFeatureIds.has(e) || (t._selectedFeatureIds.add(e), t._changedFeatureIds.add(e), n.silent || (t._emitSelectionChange = !0))
                }), this
            }, u.prototype.deselect = function(e) {
                var t = this,
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return i(e).forEach(function(e) {
                    t._selectedFeatureIds.has(e) && (t._selectedFeatureIds.delete(e), t._changedFeatureIds.add(e), n.silent || (t._emitSelectionChange = !0))
                }), r.call(this, n), this
            }, u.prototype.clearSelected = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return this.deselect(this._selectedFeatureIds.values(), {
                    silent: e.silent
                }), this
            }, u.prototype.setSelected = function(e) {
                var t = this,
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return e = i(e), this.deselect(this._selectedFeatureIds.values().filter(function(t) {
                    return -1 === e.indexOf(t)
                }), {
                    silent: n.silent
                }), this.select(e.filter(function(e) {
                    return !t._selectedFeatureIds.has(e)
                }), {
                    silent: n.silent
                }), this
            }, u.prototype.setSelectedCoordinates = function(e) {
                return this._selectedCoordinates = e, this._emitSelectionChange = !0, this
            }, u.prototype.clearSelectedCoordinates = function() {
                return this._selectedCoordinates = [], this._emitSelectionChange = !0, this
            }, u.prototype.getSelectedIds = function() {
                return this._selectedFeatureIds.values()
            }, u.prototype.getSelected = function() {
                var e = this;
                return this._selectedFeatureIds.values().map(function(t) {
                    return e.get(t)
                })
            }, u.prototype.getSelectedCoordinates = function() {
                var e = this;
                return this._selectedCoordinates.map(function(t) {
                    return {
                        coordinates: e.get(t.feature_id).getCoordinate(t.coord_path)
                    }
                })
            }, u.prototype.isSelected = function(e) {
                return this._selectedFeatureIds.has(e)
            }, u.prototype.setFeatureProperty = function(e, t, n) {
                this.get(e).setProperty(t, n), this.featureChanged(e)
            }
        }, {
            "./lib/string_set": 48,
            "./lib/throttle": 51,
            "./lib/to_dense_array": 52,
            "./render": 60
        }],
        63: [function(e, t, n) {
            "use strict";
            var r = e("xtend"),
                o = e("./constants"),
                i = ["mode", "feature", "mouse"];
            t.exports = function(e) {
                function t(e) {
                    h = r(h, e)
                }

                function n() {
                    if (e.container) {
                        var t = [],
                            n = [];
                        i.forEach(function(e) {
                            h[e] !== d[e] && (t.push(e + "-" + d[e]), null !== h[e] && n.push(e + "-" + h[e]))
                        }), t.length > 0 && e.container.classList.remove.apply(e.container.classList, t), n.length > 0 && e.container.classList.add.apply(e.container.classList, n), d = r(d, h)
                    }
                }

                function s(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        n = document.createElement("button");
                    return n.className = o.classes.CONTROL_BUTTON + " " + t.className, n.setAttribute("title", t.title), t.container.appendChild(n), n.addEventListener("click", function(n) {
                        if (n.preventDefault(), n.stopPropagation(), n.target === f) return void a();
                        u(e), t.onActivate()
                    }, !0), n
                }

                function a() {
                    f && (f.classList.remove(o.classes.ACTIVE_BUTTON), f = null)
                }

                function u(e) {
                    a();
                    var t = p[e];
                    t && t && "trash" !== e && (t.classList.add(o.classes.ACTIVE_BUTTON), f = t)
                }

                function c() {
                    var t = e.options.controls,
                        n = document.createElement("div");
                    return n.className = o.classes.CONTROL_GROUP + " " + o.classes.CONTROL_BASE, t ? (t[o.types.LINE] && (p[o.types.LINE] = s(o.types.LINE, {
                        container: n,
                        className: o.classes.CONTROL_BUTTON_LINE,
                        title: "LineString tool " + (e.options.keybindings && "(l)"),
                        onActivate: function() {
                            return e.events.changeMode(o.modes.DRAW_LINE_STRING)
                        }
                    })), t[o.types.POLYGON] && (p[o.types.POLYGON] = s(o.types.POLYGON, {
                        container: n,
                        className: o.classes.CONTROL_BUTTON_POLYGON,
                        title: "Polygon tool " + (e.options.keybindings && "(p)"),
                        onActivate: function() {
                            return e.events.changeMode(o.modes.DRAW_POLYGON)
                        }
                    })), t[o.types.POINT] && (p[o.types.POINT] = s(o.types.POINT, {
                        container: n,
                        className: o.classes.CONTROL_BUTTON_POINT,
                        title: "Marker tool " + (e.options.keybindings && "(m)"),
                        onActivate: function() {
                            return e.events.changeMode(o.modes.DRAW_POINT)
                        }
                    })), t.trash && (p.trash = s("trash", {
                        container: n,
                        className: o.classes.CONTROL_BUTTON_TRASH,
                        title: "Delete",
                        onActivate: function() {
                            e.events.trash()
                        }
                    })), t.combine_features && (p.combine_features = s("combineFeatures", {
                        container: n,
                        className: o.classes.CONTROL_BUTTON_COMBINE_FEATURES,
                        title: "Combine",
                        onActivate: function() {
                            e.events.combineFeatures()
                        }
                    })), t.uncombine_features && (p.uncombine_features = s("uncombineFeatures", {
                        container: n,
                        className: o.classes.CONTROL_BUTTON_UNCOMBINE_FEATURES,
                        title: "Uncombine",
                        onActivate: function() {
                            e.events.uncombineFeatures()
                        }
                    })), n) : n
                }

                function l() {
                    Object.keys(p).forEach(function(e) {
                        var t = p[e];
                        t.parentNode && t.parentNode.removeChild(t), delete p[e]
                    })
                }
                var p = {},
                    f = null,
                    d = {
                        mode: null,
                        feature: null,
                        mouse: null
                    },
                    h = {
                        mode: null,
                        feature: null,
                        mouse: null
                    };
                return {
                    setActiveButton: u,
                    queueMapClasses: t,
                    updateMapClasses: n,
                    addButtons: c,
                    removeButtons: l
                }
            }
        }, {
            "./constants": 24,
            xtend: 22
        }]
    }, {}, [1])(1)
});