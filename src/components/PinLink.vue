<template>
    <div class="link" ref="container">
        <a class="link-button" @click="toLink" :href="linkData.address" :title="linkData.name" target="_blank">
            <!-- <img class="link-icon" :src="'../assets/icons/' + link_id + '.svg'"/> -->
            <img class="link-icon" :src="require('../assets/icons/' + linkData.icon)"/>
            <p class="link-name" v-html="title"></p>
        </a>
        <a v-if="!pinned" class="pin-button" @click="pin" :title="'Pin ' + linkData.name">
            <img class="pin-icon" src="../assets/pin-open-angled.svg"/>
        </a>
        <a v-else class="pin-button" @click="unpin" :title="'Unpin ' + linkData.name">
            <img class="pin-icon" src="../assets/pin-closed-vertical.svg"/>
        </a>
    </div>
</template>

<script>
import LinkData from '../linkData';
import { event } from 'vue-gtag'

export default {
    name: 'PinLink',
    props: {
        linkData: LinkData,
        pinned: Boolean,
        search: String,
    },
    data() {
        return {
            large: false
        }
    },
    emits: ['onPin', 'onUnpin'],
    computed: {
        title() {
            let name = this.linkData.name.toLowerCase();

            if (!this.search) {
                return this.linkData.name;
            }
            let search = this.search.toLowerCase();

            let startIndex = name.indexOf(search);
            if (startIndex === -1) {
                return this.linkData.name;
            }
            let endIndex = startIndex + search.length;
            let html = this.linkData.name.substring(0, startIndex)
                + '<b>'
                + this.linkData.name.substring(startIndex, endIndex)
                + '</b>'
                + this.linkData.name.substring(endIndex);

            return html;
        }
    },
    methods: {
        toLink() {
            event('toLink', { value: this.linkData.name});
        },
        pin() {
            event('pin', { value: this.linkData.name});
            this.$emit('onPin', this.linkData.name);
        },
        unpin() {
            event('unpin', { value: this.linkData.name});
            this.$emit('onUnpin', this.linkData.name);
        }
    },
    mounted() {
        this.large = this.$refs.container.clientWidth > 500;
    }
}
</script>

<style scoped>
@import "https://cdn.byu.edu/theme-fonts/1.x.x/ringside/fonts.css";
@import "https://cdn.byu.edu/theme-fonts/1.x.x/public-sans/fonts.css";

* {
    box-sizing: border-box;
}

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
    width: 50px;
    height: 50px;
    padding: 5px;

    flex: 0 0 40px;
}

.link-name {
    margin: 0 0 0 5px;
    flex: 1 0;

    color: black;
    font-family: 'Public Sans', sans-serif;
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

/* @media (hover: hover) {
    .link > .pin-button {
        visibility: hidden;
    }
} */

.pin-button:hover {
    background-color: #eeeeee;
}

.link:hover > .pin-button {
    visibility: visible;
}

.pin-icon {
    width: 50px;
    height: 50px;
    padding: 10px;
}
</style>