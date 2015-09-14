var process = (function() {
    var mission = [];
    var scripts = [];
    var taskQueue;
    var isFunction = function(obj) {
        return Object.prototype.toString.call(obj) === "[object Function]"
    };
    var isArray = function(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]"
    };

    // 构建promise链
    function deal() {
        while (mission.length > 0) {
            if (curTask = mission.shift()) {
                if (!taskQueue)
                    taskQueue = curTask();
                else
                    taskQueue = taskQueue.then(curTask);
            }
        }
    }

    function load(src, callback) {

        var callback = function() {};

        function loader(src) {
            if (typeof(scripts) != "object") scripts.push(src);
            else scripts = scripts.concat(src);
            var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement,
                s = new Array(),
                loaded = 0;
            for (var i = 0; i < scripts.length; i++) {
                s[i] = document.createElement("script");
                s[i].onload = s[i].onreadystatechange = function() { //Attach handlers for all browsers
                    if (! /*@cc_on!@*/ 0 || this.readyState == "loaded" || this.readyState == "complete") {
                        loaded++;
                        this.onload = this.onreadystatechange = null;
                        this.parentNode.removeChild(this);
                        if (loaded == scripts.length && typeof(callback) == "function") callback();
                    }
                };
                s[i].setAttribute("src", scripts[i]);
                HEAD.appendChild(s[i]);
            }
            return {
                load: loader,
                done: doner
            }
        }

        function doner(cb) {
            callback = cb;
        }

        return loader(src)
    }
    return {
        config: {
            autoRun: true, // 任务队列不为空时，自动执行任务
            beforeTask: function() {}, // 执行任务前操作
            afterTask: function() {} // 执行任务之后的操作
        },
        add: function(item, sign) {
            if (isFunction(item)) mission.push(item)
            else if (isArray(item)) sign ? mission = item : mission = mission.concat(item);
            this.config.autoRun && deal();
            return this;
        },
        go: function() {
            if (!this.config.autoRun) {
                deal()
            }
            return this;
        },
        reset: function() {
            mission = [];
            taskQueue = '';
            return this;
        },
        load: load
    }
})();
