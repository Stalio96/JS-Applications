async function attachEvents() {
    console.log("TODO...");
    const submitBtn = document.getElementById('submit');

    submitBtn.addEventListener('click', () => {
        const location = document.getElementById('location').value;

        getLocationCode(location)
    });
}

//async function getForeCast(name){
//    const code = weather(name);
//
//    const [current, upcoming] = await Promise.all([
//        getCurrent(code),
//        getUpcoming(code)
//    ])
//
//    return {current, upcoming}
//}

async function getLocationCode(name) {
    let codeLocation = '';
    let url = `http://localhost:3030/jsonstore/forecaster/locations`;

    let res = await fetch(url);
    let data = await res.json();

    codeLocation = data.find(c => c.name == name);
    console.log(data)

    getCurrent(codeLocation.code);

}

async function getCurrent(code) {
    const fore = document.getElementById('forecast');
    fore.style.display = 'block';

    const url = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
    const currentCondition = document.getElementById('current');

    const res = await fetch(url);
    const data = await res.json();

    console.log(data)

    const divCurrent = document.createElement('div');
    divCurrent.className = 'forecast';

    const spanCondtion = document.createElement('span');
    spanCondtion.className = 'condition';
    const spanSymbol = document.createElement('span');
    spanSymbol.className = 'condtition symbol';
    spanSymbol.innerHTML = symbolEmoji(data.forecast.condition)


    const spanNameData = document.createElement('span');
    spanNameData.className = 'forecats-data';
    spanNameData.textContent = data.name;
    const spanTempData = document.createElement('span');
    spanTempData.className = 'forecats-data';
    spanTempData.textContent = `${data.forecast.low}°/${data.forecast.high}°`;
    const spanInfo = document.createElement('span');
    spanInfo.className = 'forecats-data';
    spanInfo.textContent = data.forecast.condition;

    spanCondtion.appendChild(spanNameData);
    spanCondtion.appendChild(spanTempData);
    spanCondtion.appendChild(spanInfo);

    divCurrent.appendChild(spanSymbol);
    divCurrent.appendChild(spanCondtion);

    currentCondition.appendChild(divCurrent);

    getUpcoming(code);
}

async function getUpcoming(code) {
    const upcomingCondition = document.getElementById('upcoming');

    const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

    const res = await fetch(url);
    const data = await res.json();

    console.log(data)

    const divInfo = document.createElement('div');
    divInfo.className = 'forecast-info';
    for(let condi of data.forecast){

        const spanUpcom = document.createElement('span');
        spanUpcom.className = 'upcoming';

        const spanSymb = document.createElement('span');
        spanSymb.className = 'symbol';
        spanSymb.innerHTML = symbolEmoji(condi.condition);

        const spanData = document.createElement('span');
        spanData.className = 'forecast-data';
        spanData.textContent = `${condi.low}°/${condi.high}°`;

        const spanDataInfo = document.createElement('span');
        spanDataInfo.className = 'forecast-data';
        spanDataInfo.textContent = `${condi.condition}`;

        spanUpcom.appendChild(spanSymb);
        spanUpcom.appendChild(spanData);
        spanUpcom.appendChild(spanDataInfo);

        divInfo.appendChild(spanUpcom);

        upcomingCondition.appendChild(divInfo);
    }
}

function symbolEmoji(symbol){

    let symbolWether = ''
    if(symbol == 'Sunny'){
        symbolWether = '&#x2600'
    }else if(symbol == 'Partly sunny'){
        symbolWether = '&#x26C5'
    }else if(symbol == 'Overcast'){
        symbolWether = '&#x2601'
    }else if(symbol == 'Rain'){
        symbolWether = '&#x2614'
    }else if(symbol == 'Degrees'){
        symbolWether = '&#176'
    }

    return symbolWether;
}

attachEvents();

//function attachEvents() {
//    let submitButton = document.getElementById('submit')
//    let forecastDiv = document.getElementById('forecast')
//    let currentForecastDiv = document.getElementById('current')
//    let upcomingForecastDiv = document.getElementById('upcoming')
// 
//    submitButton.addEventListener('click', () => {
//        let location = document.getElementById('location').value
//        
//        getData(location)
//        forecastDiv.style.display = 'block'
//    })
//    async function getData(location)
//    {
//        try{
//            let url = `http://localhost:3030/jsonstore/forecaster/locations`
//            let res = await fetch(url)
//            let data = await res.json()
//            let locationCodeIndex = data.map(targetObject => targetObject.name).indexOf(location)
//            let locationCode = data[locationCodeIndex].code
//            
//            let currentConditionsRequest = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${locationCode}`)
//            let currentConditionsData = await currentConditionsRequest.json()
//    
//            let currentCondition = currentConditionsData.forecast.condition
//            let currentHigh = currentConditionsData.forecast.high
//            let currentLow = currentConditionsData.forecast.low
// 
//            let fullLocationName = currentConditionsData.name
// 
//            createCurrentForecastDiv(fullLocationName, currentCondition, currentHigh, currentLow)
//    
//            let threeDaysForecastRequest = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`)
//            let threeDaysForecastData = await threeDaysForecastRequest.json()
// 
//            for(let forecast in threeDaysForecastData.forecast)
//            {
//                let condition = threeDaysForecastData.forecast[forecast].condition
//                let high = threeDaysForecastData.forecast[forecast].high
//                let low = threeDaysForecastData.forecast[forecast].low
//                createThreeDaysForecastDiv(condition, high, low)
//            }
//        }
//        catch
//        {
//            console.log('Error')
//        }
// 
// 
//    }
//    function createCurrentForecastDiv(location, currentCondition, currentHigh, currentLow)
//    {
//        let forecastsDiv = document.createElement('div')
//        forecastsDiv.className = 'forecasts'
// 
//        let weatherSymbolSpan = document.createElement('span')
//        weatherSymbolSpan.className = `condition symbol`
//        weatherSymbolSpan.innerHTML = getWeatherSymbol(currentCondition)
// 
//        let parentSpan = document.createElement('span')
//        parentSpan.className = 'condition'
// 
//        let locationSpan = document.createElement('span')
//        locationSpan.className = 'forecast-data'
//        locationSpan.textContent = location
// 
//        let highLowSpan = document.createElement('span')
//        highLowSpan.className = 'forecast-data'
//        highLowSpan.innerHTML = currentLow + '&#176' + '/' + currentHigh + '&#176'
// 
//        let weatherSpan = document.createElement('span')
//        weatherSpan.className = 'forecast-data'
//        weatherSpan.textContent = currentCondition
// 
//        parentSpan.appendChild(locationSpan)
//        parentSpan.appendChild(highLowSpan)
//        parentSpan.appendChild(weatherSpan)
// 
//        forecastsDiv.appendChild(weatherSymbolSpan)
//        forecastsDiv.appendChild(parentSpan)
// 
//        currentForecastDiv.appendChild(forecastsDiv)
//    }
// 
//    function createThreeDaysForecastDiv(currentCondition, high, low)
//    {
//        // parentSpan.innerHTML = ''
//        let forecastsDiv = document.createElement('div')
//        forecastsDiv.className = 'forecast-info'
// 
//        let parentSpan = document.createElement('span')
//        parentSpan.className = 'upcoming'
// 
//        let symbolSpan = document.createElement('span')
//        symbolSpan.className = 'symbol'
//        symbolSpan.innerHTML = getWeatherSymbol(currentCondition)
// 
//        let highLowSpan = document.createElement('span')
//        highLowSpan.className = 'forecast-data'
//        highLowSpan.innerHTML = low + '&#176' + '/' + high + '&#176'
// 
//        let conditionData = document.createElement('span')
//        conditionData.className = 'forecast-data'
//        conditionData.innerHTML = currentCondition
// 
//        parentSpan.appendChild(symbolSpan)
//        parentSpan.appendChild(highLowSpan)
//        parentSpan.appendChild(conditionData)
// 
//        // forecastsDiv.appendChild(parentSpan)
// 
//        upcomingForecastDiv.appendChild(parentSpan)
//        console.log(upcomingForecastDiv)
// 
// 
//    }
// 
//    function getWeatherSymbol(currentCondition)
//    {
//        let weatherSymbol = ''
//        switch(currentCondition)
//        {
//            case 'Sunny':{
//                weatherSymbol = '&#x2600';
//                break;
//            }
//            case 'Partly sunny':{
//                weatherSymbol = '&#x26C5';
//                break;
//            }
//            case 'Overcast':{
//                weatherSymbol = '&#x2601';
//                break;
//            }
//            case 'Rain':{
//                weatherSymbol = '&#x2614';
//                break;
//            }
//            case 'Degrees':{
//                weatherSymbol = '&#176';
//                break;
//            }
//        }
//        return weatherSymbol
//    }
//}
// 
//attachEvents();