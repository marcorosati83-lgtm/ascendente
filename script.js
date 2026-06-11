import { Origin, Horoscope } from './astrology/src/index.js';

console.log('Astrology module loaded', Origin, Horoscope);

document.getElementById('calcolaBtn')?.addEventListener('click', ()=>{
 const result=document.getElementById('result');
 result.innerHTML='Motore astrologico collegato. Da testare.';
});
