var require = {
	baseUrl: '../../../src/js/',
	paths: {
		backbone: 'lib/backbone',
		require: 'lib/require',
		underscore: 'lib/underscore',
		zepto: 'lib/zepto',
		jquery: 'lib/zepto',
		localStorage: 'lib/backbone.localStorage'
	},
	shim: {
		'jquery': {
			exports: '$'
		},
		'zepto': {
			exports: '$'
		},
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		}
	}
}