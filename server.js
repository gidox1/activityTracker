'use strict';

const http = require('http');
const express = require('express');
const app = express();
const body_parser = require('body-parser');
const expressip = require('express-ip');
const main_route = require('./src/route')
const PORT = process.env.PORT || 9000;


app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.use(expressip().getIpInfoMiddleware);

app.set("PORT", PORT);

app.get('*', (req, res) => {
    const ipInfo = req.ipInfo;
    res.send({
        message: "Route Healthy",
    });
});

app.use('/track', main_route);

const server = http.createServer(app);

server.listen(app.get('PORT'), function () {
    console.log("App running on Port ", PORT);
});