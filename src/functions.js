// Masīvs, kur glabājās visi uzdevumi
let uzdevumi = [];

// Funkcija, kas atgriež pašreizējo uzdevumu sarakstu
export function panemUzdevumu() {
  return uzdevumi;
}

// Funkcija, kas  pievieno jaunu uzdevumu sarakstam
export function pievienotUzdevumu(value) {
  // Pārbauda, vai ievades lauks nav tukšs, pēc atstarpju noņemšanas
 if (value.trim()) {
  //Pievieno uzdevumu masīvam, noņemot liekās atstarpes
  uzdevumi.push(value.trim());
 }  
}

// Funkcija, kas pārvieto uzdevumu augstāk (par vienu pozīciju)
export function augstak(index) {
  // Pārbauda, vai uzdevums nav jau pašā augšā
  if (index > 0) {
    // Samaina vietā pašreizējo uzdevumu ar to kas ir augstāk, izmantojot array destructuring
    [uzdevumi[index - 1], uzdevumi[index]] = [uzdevumi[index], uzdevumi[index - 1]];
  }
}


// Funkcija, kas pārvieto uzdevumu zemāk (par vienu pozīciju)
export function zemak(index) {
  // Pārbauda, vai uzdevums jau nav pašā apakšā
  if (index < uzdevumi.length - 1) {
    // Samaina ar vietām pašreizējo uzdevumu ar to kas ir zem viņa, izmantojot array destructuring  
    [uzdevumi[index + 1], uzdevumi[index]] = [uzdevumi[index], uzdevumi[index + 1]]
  }
}

// Funkcija, kas atļauj rediģēt uzdevumu
export function redigetUzdevumu(index, jaunsTeksts) {
  //Pārbauda, vai jaunais teksts nav atstāts tukšs un indekss ir derīgs
  if (jaunsTeksts.trim() && index >= 0 && index < uzdevumi.length) {
    // Atjauno uzdevuma tekstu
    uzdevumi[index] = jaunsTeksts.trim();
  }
}


export function dzestUzdevumu(index) {
  // Pārbauda, vai indekss ir derīgs
  if (index >= 0 && index < uzdevumi.length) {
    // Izņem uzdevumu no masīva, izmantojot splice metodi
    uzdevumi.splice(index, 1);
  }
}