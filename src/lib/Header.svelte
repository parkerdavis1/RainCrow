<script>
    import { 
        viewingPost,
        postStatus,
        preStatus
    } from '../store'

    import { _ } from "../services/i18n";

 
    const handlePostClick = () => {
        $viewingPost = true;
        if ($preStatus === 'error') {
        $preStatus = 'init';
        }
    }

    const handlePreClick = () => {
        $viewingPost = false;
        if ($postStatus === 'error') {
        $postStatus = 'init';
        }
    }
</script>

<div class="title">
    <h1><span class="green">Rain</span>Crow</h1>
</div>
<nav>
    <button class="nav-item post-submit" on:click={handlePostClick} class:active="{$viewingPost}">
        <p>{$_('nav.submitted')}</p>
    </button>
    <button class="nav-item pre-submit" on:click={handlePreClick} class:active="{!$viewingPost}">
        <p>{$_('nav.pre_submit')}</p>
    </button>
</nav>

<style>
    h1 {
        font-family: Lora, serif;
    }
    nav {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: 10px;
        height: 3rem;
        background-color: #EEEEEE;
    }

    .nav-item {
        width: 100%;
        height: 80%;
        border-radius: 10px;
        margin: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: black;
    }

    .active {
        background-color: #FFFFFF;
    }

    .green {
        color: #409100;
    }

    .title {
        text-align: center;
    }

</style>