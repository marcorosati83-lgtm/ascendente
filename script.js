
let comuni=[];
let comuneScelto=null;

fetch('data/elenco_comuni_italiani_con_stemma.geojson')
.then(r=>r.json())
.then(data=>{
  comuni=data.features||[];
  console.log('Comuni caricati:', comuni.length);
});

const citta=document.getElementById('citta');
const suggestions=document.getElementById('suggestions');

citta.addEventListener('input',()=>{
 const q=citta.value.toLowerCase().trim();
 suggestions.innerHTML='';
 if(q.length<2) return;

 comuni.filter(x=>x.properties.comune.toLowerCase().includes(q))
 .slice(0,20)
 .forEach(x=>{
   const d=document.createElement('div');
   d.className='item';
   d.textContent=`${x.properties.comune} (${x.properties.sigla})`;
   d.onclick=()=>{
      comuneScelto=x;
      citta.value=x.properties.comune;
      suggestions.innerHTML='';
   };
   suggestions.appendChild(d);
 });
});

function segno(g,m){
if((m==1&&g>=20)||(m==2&&g<=18)) return "Acquario ♒";
if((m==2&&g>=19)||(m==3&&g<=20)) return "Pesci ♓";
if((m==3&&g>=21)||(m==4&&g<=19)) return "Ariete ♈";
if((m==4&&g>=20)||(m==5&&g<=20)) return "Toro ♉";
if((m==5&&g>=21)||(m==6&&g<=20)) return "Gemelli ♊";
if((m==6&&g>=21)||(m==7&&g<=22)) return "Cancro ♋";
if((m==7&&g>=23)||(m==8&&g<=22)) return "Leone ♌";
if((m==8&&g>=23)||(m==9&&g<=22)) return "Vergine ♍";
if((m==9&&g>=23)||(m==10&&g<=22)) return "Bilancia ♎";
if((m==10&&g>=23)||(m==11&&g<=21)) return "Scorpione ♏";
if((m==11&&g>=22)||(m==12&&g<=21)) return "Sagittario ♐";
return "Capricorno ♑";
}

document.getElementById('calcolaBtn').onclick=()=>{
 const data=document.getElementById('data').value;
 if(!data) return alert('Inserisci la data');

 const d=new Date(data);
 const s=segno(d.getDate(), d.getMonth()+1);
 const asc=document.getElementById('ascendente').value || 'Non selezionato';

 document.getElementById('result').innerHTML=`
 <div class="card">
 <h2>${document.getElementById('nome').value || 'Utente'}</h2>
 <p><b>Segno:</b> ${s}</p>
 <p><b>Ascendente:</b> ${asc}</p>
 <p><b>Comune:</b> ${comuneScelto ? comuneScelto.properties.comune : 'Non selezionato'}</p>
 <p><b>@oroscopoxacquario</b></p>
 </div>`;
};
