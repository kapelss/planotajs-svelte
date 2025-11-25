<script>
  // Mainīgais, kas saglabā ievades lauka vērtību
  let ievade = "";

  // Masīvs, kurā glabājas visi uzdevumi
  let uzdevumi = [];

  // Indekss tam uzdevumam, kuru pašlaik rediģē (ja nerediģē nevienu, tad null)
  let redigejamaisIndekss = null;

  // Teksts, kas tiek rediģēts ievades laukā rediģēšanas režīmā
  let redigejamaisTeksts = "";

  // Funkcija, kas pievieno jaunu uzdevumu
  function addTask() {
    const apgriezts = ievade.trim();        // Noņem liekās atstarpes no ievades teksta

    if (!apgriezts) {                       // Pārbauda, vai rezultāts nav tukša virkne
      return;                               // Ja tukšs, tad nepievieno un iziet no funkcijas
    }

    uzdevumi = [...uzdevumi, apgriezts];    // Izveido jaunu masīvu ar jau esošajiem uzdevumiem un pievieno jauno uzdevumu beigās
    ievade = "";                            // Notīra ievades lauku, lai būtu tukšs nākamajam ierakstam
  }

  // Funkcija, kas pārvieto uzdevumu augstāk
  function moveUp(i) {
    if (i <= 0) {                           // Pārbauda, vai uzdevums jau nav pirmajā pozīcijā
      return;                               // Ja ir pirmais, tad neko nemaina un iziet no funkcijas
    }

    const jaunsMasivs = [...uzdevumi];      // Izveido jaunu masīvu, nokopējot visus uzdevumus
    const pagaidu = jaunsMasivs[i - 1];     // Saglabā iepriekšējā uzdevuma vērtību pagaidu mainīgajā
    jaunsMasivs[i - 1] = jaunsMasivs[i];    // Iepriekšējo pozīciju aizstāj ar pašreizējo uzdevumu
    jaunsMasivs[i] = pagaidu;               // Pašreizējā pozīcijā ieliek iepriekš saglabāto uzdevumu

    uzdevumi = jaunsMasivs;                 // Atjauno uzdevumu sarakstu ar jauno masīvu
  }

  // Funkcija, kas pārvieto uzdevumu zemāk
  function moveDown(i) {
    if (i >= uzdevumi.length - 1) {         // Pārbauda, vai uzdevums jau nav pēdējā pozīcijā
      return;                               // Ja ir pēdējais, tad neko nemaina un iziet no funkcijas
    }

    const jaunsMasivs = [...uzdevumi];      // Izveido jaunu masīvu, nokopējot visus uzdevumus
    const pagaidu = jaunsMasivs[i + 1];     // Saglabā nākamā uzdevuma vērtību pagaidu mainīgajā
    jaunsMasivs[i + 1] = jaunsMasivs[i];    // Nākamo pozīciju aizstāj ar pašreizējo uzdevumu
    jaunsMasivs[i] = pagaidu;               // Pašreizējā pozīcijā ieliek iepriekš saglabāto nākamo uzdevumu

    uzdevumi = jaunsMasivs;                 // Atjauno uzdevumu sarakstu ar jauno masīvu
  }

  // Funkcija, kas sāk uzdevuma rediģēšanu
  function saktRedigesanu(i) {
    redigejamaisIndekss = i;                // Saglabā, kura indeksa uzdevums pašlaik tiek rediģēts
    redigejamaisTeksts = uzdevumi[i];       // Ieliek rediģēšanas ievades laukā esošo uzdevuma tekstu
  }

  // Funkcija, kas saglabā rediģēto uzdevumu
  function saglabatRedigesanu(i) {
    const apgriezts = redigejamaisTeksts.trim(); // Noņem liekās atstarpes no rediģētā teksta

    if (!apgriezts) {                       // Pārbauda, vai rediģētais teksts nav tukšs
      return;                               // Ja tukšs, nesaglabā izmaiņas un iziet no funkcijas
    }

    const jaunsMasivs = [...uzdevumi];      // Izveido jaunu masīvu, nokopējot visus uzdevumus
    jaunsMasivs[i] = apgriezts;             // Attiecīgajā pozīcijā iestata jauno, apgriezto tekstu

    uzdevumi = jaunsMasivs;                 // Atjauno uzdevumu sarakstu ar atjaunoto masīvu
    redigejamaisIndekss = null;             // Izslēdz rediģēšanas režīmu, vairs neviens uzdevums netiek rediģēts
    redigejamaisTeksts = "";                // Notīra rediģēšanas ievades lauku
  }

  // Funkcija, kas atceļ rediģēšanu
  function atceltRedigesanu() {
    redigejamaisIndekss = null;             // Uzstāda, ka neviens uzdevums netiek rediģēts
    redigejamaisTeksts = "";                // Notīra rediģēšanas ievades lauku
  }

  // Funkcija, kas dzēš uzdevumu
  function dzest(i) {
    uzdevumi = uzdevumi.filter(function (item, indekss) {
      // filter izsauc šo funkciju katram masīva elementam un indekss ir tā pozīcija
      return indekss !== i;                 // Atstāj tikai tos elementus, kuru indekss nav vienāds ar dzēšamā uzdevuma indeksu
    });
  }
</script>

<main>
  <!-- Galvenais virsraksts -->
 <h1>Plānotājs izmantojot Svelte</h1>

 <!-- Ievades sekcija jaunam uzdevumam -->
 <div>
  <!-- Teksta ievades lauks -->
  <!-- Enter taustiņa nospiešana arī ļauj pievienot uzdevumu -->
  <input type="text" placeholder="Ievadi uzdevumu..." bind:value={ievade} on:keydown={(e) => { if (e.key === "Enter") addTask(); }}/>

  <!-- Poga uzdevuma pievienošanai -->
  <button on:click={addTask} class="pievienot-btn">Pievienot</button>
 </div>

<!-- Uzdevuma sarakstu sekcija -->
 <div>
  <ul>
    <!-- Cikls caur visiem uzdevumiem, kur i ir indekss -->
    {#each uzdevumi as item, i}
      <li>
        <!-- Pārbauda vai šis uzdevums tiek rediģēts -->
        {#if redigejamaisIndekss === i}
          <!-- Rediģēšanas režīms -->
          <input 
            type="text" 
            bind:value={redigejamaisTeksts}
            on:keydown={(e) => {
              if (e.key === "Enter") saglabatRedigesanu(i);
              if (e.key === "Escape") atceltRedigesanu();
            }}
            class="redigesanas-ievade"
          />
          <button on:click={() => saglabatRedigesanu(i)} class="saglabat-poga">Saglabāt</button>
          <button on:click={atceltRedigesanu} class="atcelt-poga">Atcelt</button>
        {:else}
          <!-- Parādīšanas režīms -->
          <!-- Uzdevuma teksts -->
          <span class="uzdevuma-teksts">{item}</span>
          
          <!-- Pogu konteineris -->
          <span class="kust-container">
            <!-- Rediģēšanas poga -->
            <button on:click={() => saktRedigesanu(i)} class="redigesanas-poga">✏️</button>
            
            <!-- Dzēšanas poga -->
            <button on:click={() => dzest(i)} class="dzest-poga">🗑️</button>
            
            <!-- Kustības pogas -->
            <span class="kust-container">
              <!-- Poga pārvietošanai uz augšu -->
              <button on:click={() => moveUp(i)} disabled={i === 0} class="kust-poga">👆</button>

              <!-- Poga pārvietošanai uz leju -->
              <button on:click={() => moveDown(i)} disabled={i === uzdevumi.length - 1} class="kust-poga">👇</button>
            </span>
          </span>
        {/if}
      </li>
    {/each}
  </ul>
 </div>
</main>
