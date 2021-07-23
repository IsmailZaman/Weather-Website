const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const e = require('express');

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewspath = path.join(__dirname,'../templates/views');
const partialspath = path.join(__dirname,'../templates/partials');

//Set up handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewspath);
hbs.registerPartials(partialspath);

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Ismail Zaman'
    })
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Ismail Zaman'
    })
});

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext: 'This is the help page',
        title: 'Help',
        name: 'Ismail Zaman'
    })
});


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "Address not found"
        });
    }
    const location = req.query.address;
    geocode(location,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error: error
            });
        }
        
        forecast(longitude,latitude, (error,forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            
            return res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })

        })
            
    });

})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        error: 'Help article not found',
        name: "Ismail Zaman",
        title: '404'
    });
})

app.get('*', (req,res)=>{
    res.render('404',{
        error: 'Page not found',
        name: "Ismail Zaman",
        title: '404'
    });
})



app.listen(3000,()=>{
    console.log('Server is up on port 3000');
});