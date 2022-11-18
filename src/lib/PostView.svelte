<script>
  // Dayjs
  import dayjs from 'dayjs';

  // Component
  import WeatherDisplay from './WeatherDisplay.svelte'
  import WeatherCopy from './WeatherCopy.svelte';

  // Stores
  import { postParsedWeather, postStatus, postWeatherCopy, language } from '../store';

  // Weather Functions
  import { parseWeather, getWeather, getUnixTimes, getTimezoneOffset, getChecklistInfo } from '../weatherFunctions';

  // Services
  import { _ } from '../services/i18n';

  // Clipboard stuff, move elsewhere
  let weatherCopy = '';
  let copyButtonText = $_('clipboard.copy')
  let copyButtonDisabled = false;

  $: {
    if ($language) {
      getWeatherHandler()
    }
  }

  $: if($postStatus === 'loading') {
    copyButtonDisabled = false;
    copyButtonText = $_('clipboard.copy')
  }
  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText($postWeatherCopy).then(
        function () {
          copyButtonText = $_('clipboard.copied');
          copyButtonDisabled = true;
          setTimeout(()=> {
            copyButtonText = $_('clipboard.copy')
            copyButtonDisabled = false;
          }, 3000);
        },
        function (err) {
          copyButtonText = $_('clipboard.error');
          copyButtonDisabled = true;
        }
      );
    } else {
      copyButtonText = $_('clipboard.browser_error')
      copyButtonDisabled = true;
    }
  } 

  // State
  let checklistId = '';
  let checklistInfo = {};

  let weatherDisplayText;

  let errorText;
  $: console.log("post-view errortext change: ", errorText);

  // Weather Variables
  let weatherResults = {
    start: null,
    end: null
  }

  let times = {
    offset: 0,
    start: {
      localTime: null,
      utcTime: null
    },
    end: {
      localTime: null,
      utcTime: null
    }
  };

  async function getWeatherHandler() {
      if (!isChecklistId){
        return;
      }
      $postStatus = 'loading';
      checklistInfo = {};
      [checklistInfo, times] = await getChecklistInfo(checklistId);
      // eBird Error Handling
        if (checklistInfo.ok === false) {
          errorText = $_('invalid_checklist_id');
          $postStatus = 'error';
          return;
        }
      // Historical Checklists Error
        if(checklistInfo.obsTimeValid === false) {
          $postStatus = 'error';
          errorText = $_('submitted.historical_checklist_error');
          return;
        }
        if(dayjs(times.start.localTime).get('year') < 1979) {
          $postStatus = 'error';
          errorText = $_('submitted.too_old_checklist_error')
          return;
        }
      try {
        times = await getTimezoneOffset(times, checklistInfo);
        times  = getUnixTimes(times);
        weatherResults = await getWeather(times, checklistInfo, weatherResults, $language);
      } catch(error) {
        $postStatus = 'error';
        errorText = error;
        return;
      }
      $postStatus = 'show'
      $postParsedWeather = parseWeather(times, weatherResults, $postParsedWeather);
  }
  const inputKeyup = event => {
    if (event.key === 'Enter' && isChecklistId) {
      getWeatherHandler();
    }
  }

  let checklistRegex = /S\d{7}\d*/;
  $: isChecklistId = checklistId.match(checklistRegex);

</script>

<div class="ui-container">
    <div id="checklistInputForm" class="full-width top-ui">
      <label for="checklistID">{$_('submitted.checklist_id')}:</label><br />
      <input
        type="text"
        name="checklistID"
        id="checklistID"
        class="full-width"
        bind:value={checklistId}
        on:keyup={event => inputKeyup(event)}
        on:focus={()=> checklistId = ''}
        class:error={!isChecklistId && checklistId.length > 0}
      />
    </div>
    <!-- add disable when !isChecklistId and when nothing is entered -->
    <button 
      id="submitButton" 
      on:click={getWeatherHandler}
      disabled={!isChecklistId}
    > 
      {$_('submitted.get_weather')}
    </button>

    <div class="checklist-info full-width">
      {#if checklistInfo.checklistId}<p>{checklistInfo.checklistId}</p>{/if}
      {#if checklistInfo.locationName}<p>{checklistInfo.locationName}</p>{/if}
      {#if checklistInfo.startTime}<p>{checklistInfo.startTime}</p>{/if}
    </div>

    <div class="full-width">
      <div class="weather-center weatherDisp">
        <div>
          {#if $postStatus === 'init'}
            <p>{$_('submitted.help')}</p>
          {:else if $postStatus === 'loading'}
            <div class="loading-text">{$_('global.loading')}</div>
          {:else if $postStatus === 'error'}
            {errorText}
          {:else if $postStatus === 'show'}
            <WeatherDisplay isPost={true} isPreview={false} />
          {/if}
        </div>
          {#if $postStatus === 'show'}
            <button class="copy-button" on:click={copyToClipboard} class:disabled={copyButtonDisabled}>{copyButtonText}</button>
          {/if}
      </div>
    </div>

</div>

<style>
    .ui-container {
        grid-template-rows: repeat(4, auto) 1fr;
    }
    .disabled {
      background-color: darkgray;
      color: white;
      cursor: default;
    }
    .checklist-info {
      font-size: small;
      margin-top: 30px;
    }
    .loading-text {
      transform: rotate(0);
    }
    .error {
      border: 1px red solid;
    }

</style>