<script>
    import { dailyCount, dailyCountError } from '../store';
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime);


    const timeUntilDailyCountExpiration = JSON.parse(localStorage.getItem('dailyCount')).expiry;
    const altDisplayTimeUntil = dayjs(timeUntilDailyCountExpiration).fromNow(true);

    $: remainingCount = 5 - $dailyCount;

</script>

<div class="daily-request-pane">
    {#if $dailyCountError}
    <p>You have reached your limit of weather requests for the day.</p>
    <!-- <p>Try again after {displayTimeUntil}</p> -->
    <p>Try again in {altDisplayTimeUntil}</p>
    {:else}
    <p>Remaining daily requests: {remainingCount}</p>
    {/if}
</div>



<style>
    .daily-request-pane {
        text-align: center;
        width: fit-content;
        height: fit-content;

        border: 1px solid lightgray;
        color: gray;
        font-size: 0.9rem;

        margin: 1rem auto;
        padding: 0 0.5rem;

        justify-self: center;
        align-self: center;
    }
    p {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
</style>