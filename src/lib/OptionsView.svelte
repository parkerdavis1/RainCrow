<script>
    import WeatherDisplay from "./WeatherDisplay.svelte";
    import OptionsList from "./OptionsList.svelte";

    import { postStatus, preStatus, optionsView, viewingPost } from '../store';
    import { _ } from "../services/i18n";

</script>




<div class="options-container">
    <!-- <button class="menu-exit" on:click={() => $optionsView = !$optionsView}> -->
      <!-- <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"><path fill="currentColor" d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"/></svg> -->
    <!-- </button> -->

    <div class="options-scroll">
      {#if $viewingPost && $postStatus === 'show'}
        <WeatherDisplay isPreview={true} isPost={true} />
      {:else if !$viewingPost && $preStatus === 'show'}
        <WeatherDisplay isPreview={true} isPost={false} />
      {/if}
      <OptionsList />
    </div>

    <div class="options-bottom">
      <button on:click={() => $optionsView = !$optionsView} class="done-button button">{$_('global.done').toUpperCase()}</button>
    </div>
</div>




<style>
  .options-container {
    background-color: white;
    position: fixed;
    width: 400px;
    max-width: 95%;
    max-height: 95vh;

    top: 50%;
    left: 50%;
    transform:translate(-50%, -50%);
    border: 1px black solid;
    padding: 1rem;

    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 1fr;
    justify-items: center;
    /* overflow: scroll; */
  }

  .options-scroll {
    overflow: scroll;
  }

  .done-button {
    width: 200px;
  }
</style>