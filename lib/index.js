var statsd = require('statsd-client'),
	util = require('util'),
	options = {},
	client;

var onFlush = function(time_stamp, metrics) {
	console.log(metrics);
	
	for(var key in metrics.gauges) {
		var g = metrics.gauges[key];
		client.gauge(key, g);
	}

	for(var key in metrics.timers) {
		var t = metrics.timers[key];
		t.forEach(function(v) {
			client.timing(key, v);
		});
	}

	for(var key in metrics.counters) {
		var c = metrics.counters[key];
		client.counter(key, c);
	}
};

var onStatus = function(callback) {

};

exports.init = function(startup_time, config, events) {
	if(!config.statsdHost) {
		util.log('statsd-backend: requires \'statsdHost\' option');
		return false;
	}

	if(!config.statsdPort) {
		util.log('statsd-backend: requires \'statsdPort\' option');
		return false;
	}

	options.host = config.statsdHost;
	options.port = config.statsdPort;
	options.debug = config.statsdDebug || false;

	client = new statsd({host: options.host, port: options.port, debug: options.debug});

	events.on('flush', onFlush);
	events.on('status', onStatus);

	return true;
};