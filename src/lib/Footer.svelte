<script>
    import LocaleSwitcher from './LocaleSwitcher.svelte';

    import { 
        optionsView, 
        aboutView,
        language
    } from '../store'
    import { _ } from "../services/i18n";


    const toggleOptions = () => {
        $optionsView = !$optionsView
    }

    const toggleAbout = () => {
        $aboutView = !$aboutView;
    }
</script>




<footer>
    <div>
        <button class="about-button" on:click={toggleAbout}>{$_('nav.about')}</button>
    </div>
    <div class="footer-right">
        <!-- <button on:click={toggleOptions}>{$_('nav.options')}</button>
        <LocaleSwitcher value={$language}/> -->
        <button class="settings-button" on:click={toggleOptions}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/></svg>
        </button>
    </div>
</footer>






<style>
    footer {    
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin: 1rem 1rem 0;
        grid-row: -3;
    }

    button {
        /* background-color: rgba(100,108,255, 0.2); */
        color: black;
        /* border: 1px #858585 solid; */
        padding: 3px;
        cursor: pointer;
        margin: 1rem;
        display: flex;
    }

    svg {
        color: #444;
    }

    button:hover {
        background-color: rgba(100,108,255, 0.3);
    }

    .settings-button {
        border-radius: 50%;
        background-color: #eee
        /* border: 1px #444 solid; */
    }

    .footer-right {
        display: flex;
        align-items: center;
    }

    .about-button {
        border: none;
        background-color: white;
        color: #646cff;
    }

    .about-button:hover {
        background-color: inherit;
    }

</style>