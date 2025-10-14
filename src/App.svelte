<script>
import { panemUzdevumu, pievienotUzdevumu, augstak, zemak } from "./functions";
let ievade = "";
let uzdevumi = panemUzdevumu();

function addTask() {
  pievienotUzdevumu(ievade);
  uzdevumi = [...panemUzdevumu()];
  ievade = "";
}

function moveUp(i) {
  augstak(i);
  uzdevumi = [...panemUzdevumu()];
}

function moveDown(i) {
  augstak(i);
  uzdevumi = [...panemUzdevumu()];
}
</script>

<main>
 <h1>Plānotājs izmantojot Svelte</h1>
 <div>
  <input type="text" placeholder="Ieavadi uzdevumu..." bind:value={ievade} on:keydown={(e) => { if (e.key === "Enter") addTask(); }}/>
  <button on:click={addTask} class="pievienot-btn">Pievienot</button>
 </div>
 <div>
  <ul>
    {#each uzdevumi as item, i}
      <li>
        {item}
        <span class=kust-container>
          <button on:click={() => moveUp(i)} disabled={i === 0} class="kust-poga" >👆</button>
          <button on:click={() => moveDown(i)} disabled={i === uzdevumi.length - 1} class="kust-poga">👇</button>
        </span>
      </li>
    {/each}
  </ul>
 </div>
</main>
