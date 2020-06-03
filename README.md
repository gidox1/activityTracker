# activityTracker

To Start:
Run npm start to start server

Use loadtest http://localhost:9000/track -t 20 -c 10 --rps 10 to perform a load test.

-t means request timeout
-c means concurency (how many times to repeat request)
-rpc means request per seconds

This can only be possible if loadtest is installed globally.

npm install -g loadtest

Make sure memcached server is up locally.
brew services start memcached (for mac users)