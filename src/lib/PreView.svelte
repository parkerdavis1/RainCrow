<script>
    // Components
    import WeatherDisplay from './WeatherDisplay.svelte'
    import DailyRequestPane from './DailyRequestPane.svelte'
    import CopyButton from './CopyButton.svelte'
    import PreInputForm from './PreComponents/PreInputForm.svelte'

    // Stores
    import {
        preParsedWeather,
        preStatus,
        language,
        dailyCount,
        dailyCountError,
        preErrorText
    } from '../store'

    // Services
    import { _ } from '../services/i18n'
</script>

<div class="ui-container">

    <PreInputForm />

    <div class="full-width">
        {#if !$dailyCountError}
            <div class="weather-center weatherDisp">
                <div>
                    {#if $preStatus === 'init'}
                        <!-- <p>Enter location, date, time, and duration and click "Get Weather"</p> -->
                        <!-- <br> -->
                        <p>{$_('pre_submit.location_service_error')}</p>
                    {:else if $preStatus === 'loading'}
                        {$_('global.loading')}
                    {:else if $preStatus === 'error'}
                        {$preErrorText}
                    {:else if $preStatus === 'show'}
                        <WeatherDisplay isPost={false} isPreview={false} />
                    {/if}
                </div>
                {#if $preStatus === 'show'}
                    <CopyButton view="pre" />
                {/if}
            </div>
        {:else}
            <DailyRequestPane />
        {/if}
    </div>
</div>

<style>
    .ui-container {
        grid-template-rows: repeat(7, auto) 1fr;
    }
</style>
