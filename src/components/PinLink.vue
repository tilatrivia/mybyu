<template>
    <div class="link">
        <a class="link-button" :href="pinLink.address" :title="pinLink.name" target="_blank">
            <!-- <img class="link-icon" :src="'../assets/icons/' + link_id + '.svg'"/> -->
            <img class="link-icon" :src="require('../assets/icons/' + pinLink.icon)"/>
            <p class="link-name">{{ pinLink.name }}</p>
        </a>
        <a class="pin-button" @click="console.log(pinLink)" :title="'Pin ' + pinLink.name">
            <img class="pin-icon" src="../assets/pin-open-angled.svg"/>
        </a>
    </div>
</template>

<script>
import PinLink from '../pin-link.js'

export default {
    name: 'PinLink',
    props: {
        link_id: String,
        large: Boolean,
        pinned: Boolean,
    },
    data() {
        return {
            pinLink: PinLink
        }
    },
    created() {
        this.pinLink = this.$root.$data.links[this.link_id];
    }
}
</script>

<style scoped>
@import "https://cdn.byu.edu/theme-fonts/1.x.x/ringside/fonts.css";
@import "https://cdn.byu.edu/theme-fonts/1.x.x/public-sans/fonts.css";

a:link, a:visited {
    text-decoration: none;
}

.link {
    display: flex;
    flex-direction: row;
}

.link:hover {
    background-color: #f4f4f4;
}

.link-button {
    height: 50px;
    flex: 1 0;

    display: flex;
    flex-direction: row;
}

.link-icon {
    width: 40px;
    height: 40px;
    padding: 5px;

    flex: 0 0 40px;
}

.link-name {
    margin: 0 0 0 5px;
    flex: 1 0;

    color: black;
    font-family: 'HCo Ringside Narrow SSm', sans-serif;
    font-weight: 500;
    font-size: 14pt;
    line-height: 50px;

    overflow: hidden;
}

.pin-button {
    width: 50px;
    height: 50px;
    flex: 0 0;

    cursor: pointer;
    visibility: hidden;
}

.pin-button:hover {
    background-color: #eeeeee;
}

.link:hover > .pin-button {
    visibility: visible;
}

.pin-icon {
    width: 30px;
    height: 30px;
    padding: 10px;
}
</style>