const http = require('node:http'); // protocolo HTTP
const url = require('url');
const WeatherController = require('./controller/weatherController.js');
const desiredPort = process.env.PORT ?? 4343

const processRequest = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    let weathers = [
        { country: 'Guatemala', city: 'Guatemala', temperature: 18, precipitation: 0, wind: '10km/h' },
        { country: 'Mexico', city: 'CDMX', temperature: 17, precipitation: 90, wind: '15km/h' },
        { country: 'Japan', city: 'Tokio', temperature: 1, precipitation: 10, wind: '18km/h' },
        { country: 'France', city: 'Paris', temperature: -3, precipitation: 0, wind: '5km/h' },
        { country: 'Argentina', city: 'Buenos Aires', temperature: 26, precipitation: 65, wind: '23km/h' },
        { country: 'Spain', city: 'Real Madrid', temperature: 3, precipitation: 10, wind: '14km/h' }
    ];
    let weatherController = new WeatherController(weathers);
    let result = {};
    switch (pathname) {
        case '/showAll':
            result = weathers;
            res.statusCode = 200;
            break;
        case '/getColdest':
            result = weatherController.findColdestWeather()
            break;
        case '/getHottest':
            result = weatherController.findHottestWeather()
            break;
        case '/searchByCountry':
            result = weatherController.findByCountry(query.search)
            break;
        default:
            result = { message: 'invalid request' };
            res.statusCode = 404;
            break;
    }
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(result));
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
    console.log(`server listening on port http://localhost:${desiredPort}`)
})