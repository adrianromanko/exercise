/* storage.js */

CORE.Storage = function() {};

CORE.Storage.CACHE_PREFIX = '_cache';

CORE.Storage.prototype.set = function(key, value) {
    localStorage.setItem(CORE.Storage.CACHE_PREFIX + key, value);
};

CORE.Storage.prototype.get = function(key) {
    return localStorage.getItem(CORE.Storage.CACHE_PREFIX + key);
};

CORE.Storage.prototype.clear = function() {
    localStorage.clear();
};

CORE.Storage.prototype._serialize = function(str) {
    try {
        return JSON.stringify(str)
    } catch (ex) {
    }
};

CORE.Storage.prototype._deserialize = function(value) {
    try {
        return JSON.parse(value);
    } catch (ex) {
    	return value;
    }
};