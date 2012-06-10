# StatsD backend for StatsD

## Overview
This is a pluggable backend for [StatsD](https://github.com/etsy/statsd), which
publishes stats to another StatsD service.

## Installation

    npm install statsd-backend

## Configuration
You have to give basic information about your other StatsD server to use
```
{ statsdHost: 'localhost'
, statsdPort: 5672
}
```

## Dependencies
- [statsd-client](https://github.com/msiebuhr/node-statsd-client)

## Development
- [Bugs](https://github.com/dynmeth/statsd-backend/issues)
