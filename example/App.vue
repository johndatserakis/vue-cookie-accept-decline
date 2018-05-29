<template>
    <div id="app">

        <div class="content">
            <button @click="removeCookie">Remove vue-cookie-accept-decline cookie</button>
            <div class="content__text">{{status}}</div>
        </div>

        <vue-cookie-accept-decline
            :debug="false"
            :position="'bottom'"
            :transitionName="'slideFromBottom'"
            @status="cookieStatus"
            @clickedAccept="cookieClickedAccept"
            @clickedDecline="cookieClickedDecline">
            <div slot="message">
                We use cookies to ensure you get the best experience on our website. <a href="https://cookiesandyou.com/" target="_blank">Learn More...</a>
            </div>
        </vue-cookie-accept-decline>

    </div>
</template>

<script>
    import VueCookieAcceptDecline from '../src'

    export default {
        name: 'app',
        data () {
            return {
                status: 'Nothing yet...'
            }
        },
        components: { VueCookieAcceptDecline },
        methods: {
            cookieStatus (status) {
                console.log('status: ' + status)
                this.status = status
            },
            cookieClickedAccept () {
                console.log('here in accept')
                this.status = 'accept'
            },
            cookieClickedDecline () {
                console.log('here in decline')
                this.status = 'decline'
            },

            removeCookie () {
                console.log('Cookie removed')
                localStorage.removeItem('vue-cookie-accept-decline')
                this.status = 'Cookie removed, refresh the page.'
            }
        }
    }
</script>

<style>
    body {
        margin: 0;
        height: 100%;
        height: 100vh;
        width: 100%;
    }

    #app {
        height: 100%;
        height: 100vh;
        width: 100%;
        background-color: #467B9D;
        background: linear-gradient(to right,#E63A45,#FFCD1E);
        line-height: 1.5;
    }

    .content {
        padding: 10px;
    }

    .content__text {
        font-family: Helvetica, Arial, sans-serif;
        color: #fff;
    }
</style>
