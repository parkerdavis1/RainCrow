<script>
  // DayJS
  import dayjs from 'dayjs'

  // Components
  import WeatherDisplay from './WeatherDisplay.svelte';
  import DailyRequestPane from './DailyRequestPane.svelte';

  // Weather Functions
  import { getTimezoneOffset, getUnixTimes, getWeather, parseWeather } from '../weatherFunctions';
 
  // Stores
  import { preParsedWeather, preStatus, preWeatherCopy, language, dailyCount, dailyCountError } from '../store';

  // Services
  import { _ } from '../services/i18n';

  //Clipboard stuff, move elsewhere
  let weatherCopy = '';
  let copyButtonText = $_('clipboard.copy')
  let copyButtonDisabled = false;

  $: {
    if ($language) {
      handleGetWeather()
    }
  }

  $: if($preStatus === 'loading') {
    copyButtonDisabled = false;
    copyButtonText = $_('clipboard.copy')
  }
  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText($preWeatherCopy).then(
        function () {
          copyButtonText = $_('clipboard.copied');
          copyButtonDisabled = true;
          setTimeout(()=> {
            copyButtonText= $_('clipboard.copy');
            copyButtonDisabled = false;
          }, 3000);
        },
        function (err) {
          copyButtonText = $_('clipboard.error');
          copyButtonDisabled = true;
        }
      );
    } else {
      copyButtonText = $_('clipboard.browser_error');
      copyButtonDisabled = true;
    }
  } 

  // Date Time
  const currentDateTime = dayjs();
  let date;
  let startTime;
  let duration;
  // Initialize date and time
  date = currentDateTime.format('YYYY-MM-DD');
  startTime = currentDateTime.startOf('hour').format('HH:mm');

  // GEOLOCATION
  let locateButtonText = $_('pre_submit.locate');
  let latLon = '';
  const handleLocate = (event) => {
    event.preventDefault();
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 1800000
    };
    const error = (error) => {
      locateButtonText = $_('pre_submit.locate_error', { values: { errorCode: error.code, errorMessage: error.message }});
      console.warn(`ERROR(${error.code}): ${error.message}`);
    }
    const success = (position) => {
      var coord = position.coords;
      console.log('Your current position is:');
      console.log(`Latitude: ${coord.latitude}`);
      console.log(`Longitude: ${coord.longitude}`);
      console.log(`More or less ${coord.accuracy} meters.`);
      console.log(position);
      latLon = `${position.coords.latitude},${position.coords.longitude}`
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  // latLon Parser 
  const getLatLon = () => {
    const parenRemoveRegex = /(\(|\))/g;
    const latLonNoParen = latLon.replace(parenRemoveRegex, '');
    let commaIndex = latLonNoParen.indexOf(',');
    location.lat = latLonNoParen.slice(0, commaIndex).trim();
    location.lon = latLonNoParen.slice(commaIndex + 1).trim();
  }

  // Location Obj
  let location = {
    lat: null,
    lon: null
  }
  // Initial Time Object
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
  // Initial Weather Results Object
  let weatherResults = {
    start: null,
    end: null
  }

  // Submit & Error Handling
  let errorText;

  const handleGetWeather = async() => {
    if (!formIsValid || $dailyCountError) {
      return;
    }
    $preStatus = 'loading';
    getLatLon();
    times.start.localTime = dayjs(date + ' ' + startTime, "YYYY-MM-DD HH:mm");
    times.end.localTime = dayjs(times.start.localTime).add(duration, "minute");
    try {
      times = await getTimezoneOffset(times, location);
      times = getUnixTimes(times);
      weatherResults = await getWeather(times, location, weatherResults, $language)
    }catch(error) {
      $preStatus = 'error';
      errorText = error;
      return;
    }
 
    $preStatus = 'show'
    $preParsedWeather = parseWeather(times, weatherResults, $preParsedWeather);
    incrementDailyCount();
  }
  
  const inputKeyup = event => {
    if (event.key === 'Enter') {
      handleGetWeather();
    }
  }


  // Form Validation
  const latLonRegex = /\s*-?\d+\.\d+,\s*-?\d+\.\d+\s*/;
  const dateRegex = /\d{4}-\d{1,2}-\d{1,2}/;
  const startTimeRegex = /\d{1,2}:\d{2}$/;
  $: formIsValid = (
    latLon.match(latLonRegex) &&
    date.match(dateRegex) &&
    startTime.match(startTimeRegex) &&
    typeof(duration) === 'number' &&
    duration >= 0
    );

  let latlonError = false;
  $: if (latLon.match(latLonRegex) && latLon.length > 0) {
    latlonError = false;
  }
  const latlonFocusout = () => {
    if(!latLon.match(latLonRegex)) {
      latlonError=true;
    }
  }
  let dateError = false;
  $: if (!date.match(dateRegex) && date.length > 0) {
    dateError = false;
  }
  const dateFocusout = () => {
    if(!date.match(dateRegex)) {
      dateError=true;
    }
  }
  let startTimeError = false;
  $: if (!startTime.match(startTimeRegex) && startTime.length > 0) {
    startTimeError = false;
  }
  const startTimeFocusout = () => {
    if(!startTime.match(startTimeRegex)) {
      startTimeError=true;
    }
  }
  let durationError = false;
  $: if (typeof(duration) === 'number' && duration !== undefined) {
    durationError = false;
  }
  const durationFocusout = () => {
    if(typeof(duration) !== 'number') {
      durationError=true;
    }
  }

  function incrementDailyCount() {
    let count = parseInt($dailyCount);
    count += 1;
    $dailyCount = count.toString();
    console.log("$dailyCount: ", $dailyCount);
  }

</script>


<div class="ui-container">
    <div class="full-width top-ui">
        <label for="latlon">
          {$_('pre_submit.location')} <small>({$_('pre_submit.latitude')}, {$_('pre_submit.longitude')})</small>
        </label>
      <br />
      <input 
        type="text" 
        name="latlon" 
        bind:value={latLon} 
        on:focusout={latlonFocusout}
        class:error={latlonError}
        />
      {#if latlonError}
      <span class="error-message">{$_('pre_submit.coordinates_error')}</span>
      {/if}
    </div>
    
    <button class="preView-button locate" on:click={handleLocate}>{locateButtonText}</button>

    <div class="date-input full-width">
      <label for="date">{$_('pre_submit.date')}</label>
      <br />
      <input 
        type="date" 
        name="date" 
        id="date" 
        bind:value={date}
        on:focusout={dateFocusout}
        class:error={dateError}
        />
        {#if dateError}
        <span class="error-message">{$_('pre_submit.date_error')}</span>
        {/if}
    </div>
    <div class="left">
      <label for="startTime">{$_('pre_submit.start_time')}</label>
      <br />
      <input 
        type="time" 
        name="startTime" 
        id="startTime" 
        bind:value={startTime}
        on:focusout={startTimeFocusout}
        class:error={startTimeError}
        />
        {#if startTimeError}
        <span class="error-message">{$_('pre_submit.start_time_error')}</span>
        {/if}
    </div>
    <div class="right">
      <label for="duration">{$_('pre_submit.duration')} <small>({$_('pre_submit.minutes')})</small></label>
      <br />
      <input 
        type="number" 
        name="duration" 
        id="duration" 
        min="0" 
        bind:value={duration}
        on:keyup={event => inputKeyup(event)}
        on:focusout={durationFocusout}
        class:error={durationError}
        />
        {#if durationError}
        <span class="error-message">{$_('pre_submit.duration_error')}</span>
        {/if}
    </div>
    
    <button 
      class="preView-button" 
      type="submit" on:click={handleGetWeather} 
      disabled={!formIsValid || $dailyCountError}>{$_('pre_submit.get_weather')}
    </button>

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
            {errorText}
          {:else if $preStatus === 'show'}
          <WeatherDisplay isPost={false} isPreview={false} />

          {/if}
        </div>
          {#if $preStatus === 'show'}
            <button class="copy-button" on:click={copyToClipboard} class:disabled={copyButtonDisabled}>{copyButtonText}</button>
          {/if}
      </div>
      {:else}
      <DailyRequestPane />
      {/if}
    </div>
    <!-- daily request test button -->
    <!-- <button on:click={incrementDailyCount}>+</button> -->
</div>

  <style>
    .ui-container {
        grid-template-rows: repeat(7, auto) 1fr;
    }
    .disabled {
      background-color: darkgray;
      color: white;
      cursor: default;
    }
    .left {
        grid-column: content-start / center-line;
    }
    .right {
        grid-column: center-line / content-end;
    }
    .preView-button {
      margin: 0;
    }
    button[type="submit"] {
      margin: 1rem 0;
    }
    .error {
      border: 1px red solid;
    }
    .error-message {
      font-size: small;
      color: red;
      margin: 0; 
      padding: 0;
      position: relative;
      bottom: 10px;
    }
  </style>