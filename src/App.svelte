<!-- Pilnās funkcijas atrodas functions.js failā! -->
<script>
// importē funkcijas no ārējā faila
import { panemUzdevumu, pievienotUzdevumu, augstak, zemak } from "./functions";

// Mainīgais, kas saglabā ievades lauka vērtību
let ievade = "";

// Iegūst sākotnējo uzdevumu sarakstu
let uzdevumi = panemUzdevumu();

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
</script>

<main>
  <!-- Galvenais virsraksts -->
 <h1>Plānotājs izmantojot Svelte</h1>

 <!-- Ievades sekcija jaunam uzdevumam -->
 <div>
  <!-- Teksta ievades lauks -->
  <!-- Enter taustiņa nospiešana arī ļauj pievienot uzdevumu -->
  <input type="text" placeholder="Ieavadi uzdevumu..." bind:value={ievade} on:keydown={(e) => { if (e.key === "Enter") addTask(); }}/>

  <!-- Poga uzdevuma pievienošanai -->
  <button on:click={addTask} class="pievienot-btn">Pievienot</button>
 </div>

<!-- Uzdevuma sarakstu sekcija -->
 <div>
  <ul>
    <!-- Cikls caur visiem uzdevumiem, kur i ir indekss -->
    {#each uzdevumi as item, i}
      <li>
        <!-- Uzdevuma teksts -->
        {item}
        <!-- Pogu konteineris uzdevuma pārvietošanai -->
        <span class=kust-container>
          <!-- Poga pārvietošanai uz augšu (atspējota, ja uzdevums jau ir pašā augša) -->
          <button on:click={() => moveUp(i)} disabled={i === 0} class="kust-poga" >👆</button>

          <!-- Poga pārvietošanai uz leju (atspējota, ja uzdevums jau ir pašā apakšā) -->
          <button on:click={() => moveDown(i)} disabled={i === uzdevumi.length - 1} class="kust-poga">👇</button>
        </span>
      </li>
    {/each}
  </ul>
 </div>
</main>
