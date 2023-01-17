<script>
    import { aboutView } from "../store";
    import openweatherLogo from '/src/assets/openweatherlogo-light.jpg'
    import { _ } from '../services/i18n';
</script>

<div class="about-container">
    <div class="menu-exit" on:click={()=> $aboutView = false}>🆇</div>
    <h2>{$_('about.welcome')}! &#x1F326;</h2>
    <p class="attr">{$_('about.created_by')} <a href="https://parkerdavis.dev/" target="_blank">Parker Davis</a></p>

    <p>{@html $_('about.app_purpose')}</p>

    <section>
        <h3>{$_('about.submitted.title')}</h3>
        <p>{@html $_('about.submitted.text')}</p>
    </section>

    <section>
        <h3>{$_('about.pre_submit.title')}</h3>
        <p>{$_('about.pre_submit.text')}</p>
        <details>
            <summary>{@html $_('about.pre_submit.troubleshoot_title')}</summary>
            <ul>
                <li>{$_('about.pre_submit.enable_location_service')}</li>
                <li>{$_('about.pre_submit.allow_location_access')}</li>
                <li>{@html $_('about.pre_submit.toggle_location_preference')}</li>
                <li>{@html $_('about.pre_submit.iphone_users')}</li>
            </ul>
        </details>
    </section>

    <section>
        <h3>{$_('about.options.title')}</h3>
        <p>{$_('about.options.text')}</p>
        <p>{@html $_('about.options.icon_and_links')}</p>
    </section>

    <section>
        <h3>{$_('about.weather_data.title')}</h3>
        <img src="{openweatherLogo}" alt="OpenWeather Logo" loading="lazy" />
        <p>{@html $_('about.weather_data.provided_by')}</p>
        <p>{$_('about.weather_data.range_format')}</p>
        <p>{$_('about.weather_data.limitations')}</p>
    </section>

    <section>
        <h3>{$_('about.languages.title')}</h3>
        <p>{@html $_('about.languages.text')}</p>
    </section>

    <section>
        <h3>{$_('about.daily_limits.title')}</h3>
        <p>{$_('about.daily_limits.text')}</p>
        <details>
        <summary><strong>{$_('about.error_429.title')}</strong></summary>
        <p>{$_('about.error_429.text')}</p>
        </details>
    </section>

    <section>
        <p>{@html $_('about.email_me')}</p>
    </section>

 
    <div class="center">
        <button on:click={()=> $aboutView = false} >{$_('global.close').toUpperCase()}</button>
    </div>
</div>

<style>
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
        padding: 1rem 2rem;
        overflow: scroll;
    }
    .center {
        text-align: center;
    }
    button {
        width: 200px;
    }
    section {
        margin-top: 2rem;
        /* border-top: 1px solid black; */
    }
    section p:first-of-type {
        margin-top: 0;
    }
    p,
    details {
        margin-top: 1rem;
    }
    .attr {
        margin-top: 0;
        font-size: 0.8rem;
    }
    summary {
        cursor: pointer;
    }
    :global(span.highlight),
    :global(span.copy) {
        color: white;
        padding: 3px 6px;
        border-radius: 5px;
    }
    :global(span.highlight) {
        background: #409100;
    }
    :global(span.copy) {
        background: #4A96D9;
    }
</style>