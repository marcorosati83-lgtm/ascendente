let comuni = [];
let comuneSelezionato = null;

const cittaInput = document.getElementById("citta");
const suggestions = document.getElementById("suggestions");
const result = document.getElementById("result");

fetch("./data/elenco_comuni_italiani_con_stemma.geojson")
  .then(response => response.json())
  .then(data => {

    comuni = data.features || [];

    console.log("Comuni caricati:", comuni.length);

  })
  .catch(error => {

    console.error(error);

  });

cittaInput.addEventListener("input", function () {

  const ricerca =
    cittaInput.value.toLowerCase().trim();

  suggestions.innerHTML = "";

  if (ricerca.length < 2) return;

  const risultati = comuni
    .filter(function (c) {

      return c.properties.comune
        .toLowerCase()
        .includes(ricerca);

    })
    .slice(0, 15);

  risultati.forEach(function (comune) {

    const div = document.createElement("div");

    div.className = "suggestion-item";

    div.textContent =
      comune.properties.comune +
      " (" +
      comune.properties.sigla +
      ")";

    div.addEventListener("click", function () {

      comuneSelezionato = comune;

      cittaInput.value =
        comune.properties.comune;

      suggestions.innerHTML = "";

    });

    suggestions.appendChild(div);

  });

});

document
  .getElementById("calcolaBtn")
  .addEventListener("click", function () {

    if (!comuneSelezionato) {

      alert("Seleziona un comune");

      return;

    }

    result.innerHTML =
      "<div class='card'>" +
      "<h2>Test completato</h2>" +
      "<p><strong>Comune:</strong> " +
      comuneSelezionato.properties.comune +
      "</p>" +
      "</div>";

  });
