<script>
    import { language } from '../store';

    export let value = localStorage.storedLanguage;
    
    function switchLocale(event) {
      event.preventDefault();
      $language = event.target.value;
    }
</script>

<div class="choose-locale">
  <select value={value} on:change={switchLocale}>
    <option value="en">English</option>
    <option value="fr">Français</option>
  </select>
</div>

<style>
    .choose-locale {
      display: flex;
      justify-content: center;
    }
    select {
      height: 2.5rem;
      border-radius: 5px;
      padding: 4px;
    }
</style>