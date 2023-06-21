<script>
    import { dailyCountError, postStatus, postErrorText } from '../../store';

    import WeatherDisplay from '../WeatherDisplay.svelte';
    import CopyButton from '../CopyButton.svelte';
    import DailyRequestPane from '../DailyRequestPane.svelte';

    import { _ } from '../../services/i18n';
</script>

<div class="full-width">
    {#if !$dailyCountError}
        <div class="weather-center weatherDisp">
            <div>
                {#if $postStatus === 'init'}
                    <p>{$_('submitted.help')}</p>
                {:else if $postStatus === 'loading'}
                    <div class="loading-text">{$_('global.loading')}</div>
                {:else if $postStatus === 'error'}
                    {$postErrorText}
                {:else if $postStatus === 'show'}
                    <WeatherDisplay isPost={true} isPreview={false} />
                {/if}
            </div>
            {#if $postStatus === 'show'}
                <CopyButton view="post" />
            {/if}
        </div>
    {:else}
        <DailyRequestPane />
    {/if}
</div>

<style>
    .loading-text {
        transform: rotate(0);
    }
</style>
