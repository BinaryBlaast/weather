const names = ['Afghanistan', 'Åland Islands', 'Albania']
fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {

        for (let index = 0; index < 3; index++) {
            const element = countries[index];
            displayCountryInfo(element)
        }


    })
    .catch(error => {
        console.error('Error fetching countries:', error);
    });

function displayCountryInfo(country) {

    const parent = document.querySelector('#tt');
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col-lg-4', 'col-sm-12');

    const card = document.createElement('div');
    card.classList.add('card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    const headerText = document.createElement('h5');
    headerText.textContent = country.capital[0];

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const capitalText = document.createElement('p');
    capitalText.classList.add('text-center');
    capitalText.textContent = 'Capital: Kabul';

    const flagImg = document.createElement('img');
    flagImg.src = country.flags.png;
    flagImg.alt = '';

    const regionText = document.createElement('p');
    regionText.classList.add('text-center');
    regionText.textContent = `Region: ${country.region}`;

    const countryCodeText = document.createElement('p');
    countryCodeText.classList.add('text-center');
    countryCodeText.textContent = `Country Code: ${country.cca2}`;

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('d-flex', 'justify-content-center');

    const weatherButton = document.createElement('button');
    weatherButton.classList.add('btn', 'btn-primary');
    weatherButton.id = country.region;
    weatherButton.textContent = 'Click for Weather';

    buttonDiv.appendChild(weatherButton);

    cardBody.appendChild(capitalText);
    cardBody.appendChild(flagImg);
    cardBody.appendChild(regionText);
    cardBody.appendChild(countryCodeText);
    cardBody.appendChild(buttonDiv);
    cardHeader.appendChild(headerText);
    
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    
    cardDiv.appendChild(card);
    
    parent.appendChild(cardDiv);
    const para = document.createElement('p');
    para.classList.add('text-center');
    cardBody.appendChild(para);

    weatherButton.addEventListener('click', () => {
        console.log('trig');
        const apiKey = '09bd004cd0b44c5f5fdeb4b46faac9cf';
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${apiKey}`;

        fetch(weatherUrl)
            .then(response => response.json())
            .then(weather => {
            para.textContent = weather.weather[0].description
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
            });
    })
}
