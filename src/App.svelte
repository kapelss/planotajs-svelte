<!-- Pilnās funkcijas atrodas functions.js failā! -->
<script>
// importē funkcijas no ārējā faila
import { panemUzdevumu, pievienotUzdevumu, augstak, zemak, redigetUzdevumu, dzestUzdevumu } from "./functions";

// Mainīgais, kas saglabā ievades lauka vērtību
let ievade = "";

// Iegūst sākotnējo uzdevumu sarakstu
let uzdevumi = panemUzdevumu();

// Mainīgie uzdevuma rediģēšanai
let redigejamaisIndekss = null;
let redigejamaisTeksts = "";

// Funkcija, kas pievieno jaunu uzdevumu
function addTask() {
  // Pievieno uzdevumu caur importēto funckiju
  pievienotUzdevumu(ievade);
  // Atjauno uzdevuma sarakstu, izmantojot spread operātoru
  uzdevumi = [...panemUzdevumu()];
  // Notīra ievades lauku 
  ievade = "";
}

// Funkcija, kas pārvieto uzdevumus augstāk
function moveUp(i) {
  // Izsauc funkciju, kas maina uzdevuma pozīciju
  augstak(i);
  // Atjauno uzdevuma sarakstu
  uzdevumi = [...panemUzdevumu()];
}

// Funkcija, kas pārvieto uzdevumus zemāk
function moveDown(i) {
  // Izsauc funkciju, kas maina uzdevuma pozīciju
  zemak(i);
  // Atjauno uzdevuma sarakstu
  uzdevumi = [...panemUzdevumu()];
}

// Funkcija, kas sāk uzdevuma rediģēšanu
function saktRedigesanu(i) {
  redigejamaisIndekss = i;
  redigejamaisTeksts = uzdevumi[i];
}

// Funkcija, kas saglabā rediģēto uzdevumu
function saglabatRedigesanu(i) {
  redigetUzdevumu(i, redigejamaisTeksts);
  uzdevumi = [...panemUzdevumu()];
  redigejamaisIndekss = null;
  redigejamaisTeksts = "";
}

// Funkcija, kas atceļ rediģēšanu
function atceltRedigesanu() {
  redigejamaisIndekss = null;
  redigejamaisTeksts = "";
}

//funkcija, kas dzēš uzdevumu
function dzest(i) {
  dzestUzdevumu(i);
  uzdevumi = [...panemUzdevumu()];
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
