```javascript
import { Origin, Horoscope } from './astrology/src/index.js';

console.log("Modulo astrologico caricato");

let comuni = [];
let comuneSelezionato = null;

const cittaInput = document.getElementById('citta');
const suggestions = document.getElementById('suggestions');
const result = document.getElementById('result');
const loader = document.getElementById('loader');


// =========================
// CARICAMENTO COMUNI
// =========================

fetch('./data/elenco_comuni_italiani_con_stemma.geojson')
  .then(res => {
    console.log("GeoJSON status:", res.status);
    return res.json();
  })
  .then(data => {

    comuni = data.features || [];

    console.log("Comuni caricati:", comuni.length);

  })
  .catch(err => {

    console.error("Errore caricamento GeoJSON", err);

  });


// =========================
// AUTOCOMPLETE COMUNI
// =========================

cittaInput.addEventListener('input', () => {

  const testo = cittaInput.value.toLowerCase().trim();

  suggestions.innerHTML = '';

  if (testo.length < 2) return;

  const risultati = comuni
    .filter(c =>
      c.properties.comune.toLowerCase().includes(testo)
    )
    .slice(0, 15);

  risultati.forEach(comune => {

    const div = document.createElement('div');

    div.className = 'suggestion-item';

    div.textContent =
`${comune.properties.comune} (${comune.properties.sigla})`;

    div.addEventListener('click', () => {

      comuneSelezionato = comune;

      cittaInput.value = comune.properties.comune;

      suggestions.innerHTML = '';

    });

    suggestions.appendChild(div);

  });

});


// =========================
// CALCOLO
// =========================

document
  .getElementById('calcolaBtn')
  .addEventListener('click', calcolaOroscopo);


function calcolaOroscopo() {

  try {

    const data = document.getElementById('data').value;
    const ora = document.getElementById('ora').value;

    if (!data || !ora) {

      alert("Inserisci data e ora");

      return;
    }

    if (!comuneSelezionato) {

      alert("Seleziona un comune");

      return;
    }

    loader.style.display = 'block';

    const [anno, mese, giorno] =
      data.split('-').map(Number);

    const [ore, minuti] =
      ora.split(':').map(Number);

    const latitudine =
      comuneSelezionato.geometry.coordinates[1];

    const longitudine =
      comuneSelezionato.geometry.coordinates[0];

    const origin = new Origin({

      year: anno,
      month: mese - 1,
      date: giorno,

      hour: ore,
      minute: minuti,

      latitude: latitudine,
      longitude: longitudine

    });

    const horoscope = new Horoscope({

      origin,

      houseSystem: "placidus",

      zodiac: "tropical",

      language: "en"

    });

    const segno =
      horoscope?.SunSign?.label || "Non disponibile";

    const ascendente =
      horoscope?.Ascendant?.Sign?.label || "Non disponibile";

    console.log("Horoscope:", horoscope);
    console.log("Segno:", segno);
    console.log("Ascendente:", ascendente);

    result.innerHTML = `

      <div class="card">

        <h2>${document.getElementById('nome').value || 'Utente'}</h2>

        <p><strong>Segno:</strong> ${segno}</p>

        <p><strong>Ascendente:</strong> ${ascendente}</p>

        <p><strong>Comune:</strong>
        ${comuneSelezionato.properties.comune}</p>

      </div>

    `;

    loader.style.display = 'none';

  }
  catch(err) {

    loader.style.display = 'none';

    console.error(err);

    alert(
      "Errore durante il calcolo. Controlla la console F12."
    );

  }

}
```
