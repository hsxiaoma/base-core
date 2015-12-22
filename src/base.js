'use strict';

var fastclick = require('fastclick');
fastclick(document.body);

if (process.env.NODE_ENV !== 'production') {
    var Vue = require('vue');
    Vue.config.debug = true;
}
