<script>
    import { dailyCount, dailyCountError } from '../store';
    import { language } from '../store';
    import { _ } from '../services/i18n';
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime);

    let displayTimeUntil;
    $: {
        dayjs.locale(`${$language}`);
        displayTimeUntil = dayjs(timeUntilDailyCountExpiration).fromNow();
    }
    
    const timeUntilDailyCountExpiration = JSON.parse(localStorage.getItem('dailyCount')).expiry;

    $: remainingCount = 5 - $dailyCount;
</script>





<div class="daily-request-pane" class:error="{$dailyCountError}">
    {#if $dailyCountError}
    <p>{$_('daily_request.error')}</p>
    <p>{$_('daily_request.try_again')} {displayTimeUntil}</p>
    {:else}
    <p>{$_('daily_request.remaining')} {remainingCount}</p>
    {/if}
</div>





<style>
    .daily-request-pane {
        text-align: center;
        width: fit-content;
        height: fit-content;
        color: gray;
        font-size: 0.9rem;
        padding: 0 0.5rem;
        justify-self: end;
        align-self: center;
    }

    p {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .error {
        color: black;
        background-color: hsl(0, 100%, 98%);
        padding: 1rem;

    }
</style>