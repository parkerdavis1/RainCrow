<script>
    import { aboutView } from "../store";
    import { _ } from '../services/i18n';
    import AboutContent from "./AboutContent.svelte";
</script>

<div class="about-container">
    <!-- <button class="menu-exit" on:click={()=> $aboutView = false}>🆇</button> -->

    <div class="scroll">
        <AboutContent />
    </div>

 
    <div class="center">
        <button class="button" on:click={()=> $aboutView = false} >{$_('global.close').toUpperCase()}</button>
    </div>
</div>

<style>
    .scroll {
        overflow: scroll;
        padding: 1rem 2rem;
    }

    .about-container {
        background-color: white;
        position: fixed;
        width: 500px;
        max-width: 95%;
        max-height: 88vh;
        top: 50%;
        left: 50%;
        transform:translate(-50%, -50%);
        border: 1px black solid;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr auto;
        padding-block: 1rem;
    }

    .center {
        text-align: center;
    }

    .button {
        width: 200px;
    }

</style>