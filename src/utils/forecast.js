const request = require('request');


const forecast = (longitude,latitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=81690e97b38bb5d66d271e8004b15d98&query=' + longitude + ','+ latitude+'&units=f';
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to weather services!');
        }
        else if(body.error){
            callback('Unable to find location data');
        }
        else{
            
            callback(undefined,'The current temperature in farenheits is ' + body.current.temperature)
        }


    });
    






}

module.exports = forecast;