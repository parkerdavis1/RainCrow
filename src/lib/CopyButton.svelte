<script>
    export let view

    let copyButtonText = $_('clipboard.copy')
    let copyButtonDisabled = false

    import { _ } from '../services/i18n'
    import {
        preWeatherCopy,
        postWeatherCopy,
        preStatus,
        postStatus,
    } from '../store'

    $: if ($postStatus === 'loading' || $preStatus === 'loading') {
        copyButtonDisabled = false
        copyButtonText = $_('clipboard.copy')
    }

    const copyToClipboard = () => {
        if (navigator.clipboard) {
            navigator.clipboard
                .writeText(view === 'post' ? $postWeatherCopy : $preWeatherCopy)
                .then(
                    function () {
                        copyButtonText = $_('clipboard.copied')
                        copyButtonDisabled = true
                        setTimeout(() => {
                            copyButtonText = $_('clipboard.copy')
                            copyButtonDisabled = false
                        }, 3000)
                    },
                    function (err) {
                        copyButtonText = $_('clipboard.error')
                        copyButtonDisabled = true
                    }
                )
        } else {
            copyButtonText = $_('clipboard.browser_error')
            copyButtonDisabled = true
        }
    }
</script>

<button
    class="button copy-button"
    on:click={copyToClipboard}
    class:disabled={copyButtonDisabled}
>
    {copyButtonText}
</button>
