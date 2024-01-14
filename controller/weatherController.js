module.exports = class WeatherController {

    constructor(weathers) {
        this.weathers = weathers;
    }

    findColdestWeather() {
        let _weathers = this.weathers;
        if (_weathers.length === 0) {
            return null; // Return null if the array is empty
        }
        let coldestWeather = _weathers[0]; // Assume the first element is the coldest
        for (let i = 1; i < _weathers.length; i++) {
            if (_weathers[i].temperature < coldestWeather.temperature) {
                coldestWeather = _weathers[i]; // Update coldestWeather if a colder temperature is found
            }
        }
        return coldestWeather;
    }

    findHottestWeather() {
        let _weathers = this.weathers;

        if (_weathers.length === 0) {
            return null; // Return null if the array is empty
        }
        let hottestWeather = _weathers[0]; // Assume the first element is the hottest
        for (let i = 1; i < _weathers.length; i++) {
            if (_weathers[i].temperature > hottestWeather.temperature) {
                hottestWeather = _weathers[i]; // Update hottestWeather if a colder temperature is found
            }
        }
        return hottestWeather;
    }

    findByCountry(countryToSearch) {
        let _weathers = this.weathers;
        if (_weathers.length === 0) {
            return null; // Return null if the array is empty
        }
        let foundWeather = _weathers.filter(weather => weather.country.toLowerCase().includes(countryToSearch.toLowerCase()));
        return foundWeather || null; 
    }
}