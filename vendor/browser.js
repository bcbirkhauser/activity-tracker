var Browser = {
    version: '',
    versionNumber: '',
    details: {},
    mobile: false,
    desktop: false,
    os: '',
    ie: false,
    name: '',
    screenWidth: '',
    screenHeight: '',
    getObj: function() {

        this.details.screenWidth = this.screenWidth;
        this.details.screenHeight = this.screenHeight;
        return {
            version: this.version,
            versionNumber: this.versionNumber,
            details: this.details,
            mobile: this.mobile,
            desktop: this.desktop,
            os: this.os,
            ie: this.ie,
            name: this.name,
            screenWidth: this.screenWidth,
            screenHeight: this.screenHeight
        }
    }
};


Browser.controller = function() {

    this.setData = function() {
        var d = this.extract(window.navigator);
        Browser.version = d.version;
        Browser.versionNumber = d.versionNumber;
        Browser.details = d.details;
        Browser.mobile = d.mobile;
        Browser.desktop = d.desktop;
        Browser.os = d.os;
        Browser.ie = d.ie;
        Browser.name = d.name;
        Browser.screenWidth = window.innerWidth;
        Browser.screenHeight = window.innerHeight;
        Browser.details['screenWidth'] = Browser.screenWidth;
        Browser.details['screenHeight'] = Browser.screenHeight;

        return Browser.getObj();
    };

    this.extract = function(navObj) {
        // console.debug(navObj);
        var returnObj = {};
        returnObj.details = {};
        for (var p in navObj) {
            returnObj.details[p] = navObj[p];
        }
        if (!navObj.userAgent) return returnObj;
        var ua = navObj.userAgent.toLowerCase();
        var match = /(opr)[\/]([\w.]+)/.exec(ua) ||
            /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];

        var platform_match = /(ipad)/.exec(ua) ||
            /(iphone)/.exec(ua) ||
            /(android)/.exec(ua) ||
            /(windows phone)/.exec(ua) ||
            /(win)/.exec(ua) ||
            /(mac)/.exec(ua) ||
            /(linux)/.exec(ua) ||
            /(cros)/i.exec(ua) ||
            [];

        var matched = {
            browser: match[3] || match[1] || "",
            version: match[2] || "0",
            platform: platform_match[0] || ""
        };

        if (matched.browser) {

            returnObj.version = matched.version;
            returnObj.versionNumber = parseInt(matched.version, 10);
        }

        if (matched.platform) {
            returnObj.os = matched.platform;
        }
        // Assign the name variable
        returnObj.name = matched.browser;

        // These are all considered mobile platforms, meaning they run a mobile Browser
        if (returnObj.os == 'android' || returnObj.os == 'ipad' || returnObj.os == 'iphone' || returnObj.os == "windows phone") {
            returnObj.mobile = true;
        } else {
            returnObj.desktop = true;
        }

        // IE11 has a new token so we will assign it msie to avoid breaking changes
        if (returnObj.os == 'rv') {
            var ie = "msie";

            matched.browser = ie;
            returnObj.ie = true;
        }

        return returnObj;
    }


    //add a delayed event for the window resize event.
    var resizeEnd = function() {
        Browser.screenWidth = window.innerWidth;
        Browser.screenHeight = window.innerHeight;
    };

    window.onresize = function() {
        if (this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function() {
            resizeEnd();
        }, 500);

    };
};