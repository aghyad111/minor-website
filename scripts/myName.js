// api documentation: https://whois.fdnd.nl/docs/

// 1 persoon: https://fdnd.directus.app/items/person/67
// iedereen: https://fdnd.directus.app/items/person/?fields=id,name,github_handle,avatar&filter={%22squads%22:{%22squad_id%22:{%22name%22:%22Minor%20Web%20Dev%22}}}&sort=name

// De basis URL voor de API, het startpunt van waaruit we alle verzoeken doen
const baseURL = 'https://fdnd.directus.app/';

// Het specifieke endpoint voor jouw gegevens (met ID 193, jouw ID)
const endpointMe = 'items/person/193';

// Combineer de basis URL met het specifieke endpoint om de volledige URL te verkrijgen
const my_URL = baseURL + endpointMe;


// console.log(my_URL);

// Haal de data op van de opgegeven URL (my_URL)
getData(my_URL).then(data193 => {
    // Get the name from the API
    let myName = data193.data.name;

    // Update the h1 text
    let dH1 = document.querySelector("h2");
	let dH2 = document.querySelector("h1");

    dH1.textContent = myName;
	dH2.textContent = myName;


    // Update the title tag
    document.title = `${myName}`;

    // Also update the meta tag if needed
    let metaTitle = document.querySelector('meta[property="og:title"]');
    metaTitle.setAttribute('content', `${myName}`);

    console.log(data193);
});





/****************/
/* FETCH DATA   */
/* RETURNS JSON */
/****************/

// generieke functie om data aan een API te vragen
// deze kun je keer op keer hergebruiken
// nb. in het echt iets complexer --> bijv ook rekening houden met fouten

// 1. doe een verzoek aan de API om data
// 2. ga verder als de API antwoord geeft
// 3. als het goed gaat krijg je een 'response'-object met data terug
// 3. daarmee kun je nog niet aan de slag
// 4. het 'response'-object zet je om naar JSON
// 4. met JSON kun je aan de slag in jouw JS
// 5. als de response is omgezet naar JSON kun je weer verder
// 6. de naam van de naar JSON omgezette info is 'jsonData'
// 6. Die naam mag je overigens zelf verzinnen
// 7. de JSON ('jsonData') geef je terug aan de 'getData' functie
// 8. de 'getData' functie geeft de 'jsonData' terug aan de functie die om de data vroeg
// 9. async betekent dat terwijl de data wordt opgehaald er andere dingen gedaan kunnen worden
// 9. op het moment dat de data er is geeft de functie een seintje
// 9. dan kun je dan wat met de data gaan doen

async /*9*/ function getData(URL) {
	return ( //8
		fetch(URL) //1
		.then ( //2
			response /*3*/ => response.json() //4
		)
		.then ( //5
			jsonData /*6*/ => {return jsonData} //7
		)
	);
}



/**************/
/* SPIEKBRIEF */
/**************/

// const h1 = document.querySelector('h1');

// getMyName();

// function getMyName() {
// 	getData(urlMe).then( data => {  

// 		const myData = data.data;
// 		let myName = myData.name;

// 		h1.textContent = myName;
// 	});	
// }