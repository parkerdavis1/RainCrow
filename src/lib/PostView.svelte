<script>
    import InputForm from './PostComponents/InputForm.svelte';
    import ChecklistInfo from './PostComponents/ChecklistInfo.svelte';
    import WeatherResults from './PostComponents/WeatherResults.svelte'

</script>

<div class="ui-container">
    <InputForm />
    <ChecklistInfo />
    <WeatherResults />
</div>

<style>
    .ui-container {
        grid-template-rows: repeat(4, auto) 1fr;
    }
</style>
