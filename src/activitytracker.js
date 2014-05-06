(function(undefined) {
    "use strict";
    var ActivityTracker = Class.extend({
        _keys: [],
        init: function() {

            if (!Cookies.enabled) {
                console.log('Cannot track  - Cookies are disabled');
                return;
            }
            Cookies.defaults = {
                path: '/',
                secure: false
            }
            var items = document.querySelectorAll('[data-track]');
            var _tracker = this;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                item.addEventListener("click", function(ev) {
                    _tracker._trackClick(ev.target);
                });
            }


        },
        track: function(cat, args) {
            if (!Cookies.enabled) {
                console.log('Cannot track  - Cookies are disabled');
                return;
            }
            if (this._keys.indexOf(cat) == -1) {
                this._keys.push(cat);
                Cookies.set('ActivityTrackerKeys', JSON.stringify(this._keys));
            }

            var data = Cookies.get(cat);
            if (!data) {
                data = [];
            } else {
                data = JSON.parse(data);
            }
            var d = new Date();
            var jsonDate = d.toJSON();
            data.push({
                date: jsonDate,
                arguments: args
            });
            Cookies.set('ActivityTracker_' + cat, JSON.stringify(data));
        },
        getData: function(cat) {
            if (!Cookies.enabled) {
                console.log('Cannot track  - Cookies are disabled');
                return;
            }
            var data = {};
            if (!cat) {
                this._keys = JSON.parse(Cookies.get('ActivityTrackerKeys'));
                for (var i = 0; i < this._keys.length; i++) {
                    cat = this._keys[i];
                    data[cat] = JSON.parse(Cookies.get('ActivityTracker_' + cat));
                }
            } else {
                data = JSON.parse(Cookies.get('ActivityTracker_' + cat));
            }
            console.debug(data);
            return data;
        },
        clearData: function(cat) {
            if (!Cookies.enabled) {
                console.log('Cannot track  - Cookies are disabled');
                return;
            }
            if (!cat) {
                for (var i = 0; i < this._keys.length; i++) {
                    cat = this._keys[i];
                    Cookies.expire('ActivityTracker_' + cat);
                    this._keys.splice(i, 1);
                }
            } else {
                Cookies.expire('ActivityTracker_' + cat);
            }
        },
        _trackClick: function(item) {

            var category = item.getAttribute('data-track');
            if (category != 'true') {
                category = 'default';
            }
            var args = item.getAttribute('data-track-args');
            if (!args) {
                if (item.getAttribute('href')) args = item.getAttribute('href');
                else args = item.getAttribute('id');
            }
            this.track(category, args);
        }
    });

    // AMD support
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return ActivityTracker;
        });
        // CommonJS and Node.js module support.
    } else if (typeof exports !== 'undefined') {
        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = ActivityTracker;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.ActivityTracker = ActivityTracker;
    } else {
        window.ActivityTracker = ActivityTracker;
    }
})();