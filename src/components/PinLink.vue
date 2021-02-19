<template>
    <div class="link" ref="container">
        <a class="link-button" :href="pinLink.address" :title="pinLink.name" target="_blank">
            <!-- <img class="link-icon" :src="'../assets/icons/' + link_id + '.svg'"/> -->
            <img class="link-icon" :src="require('../assets/icons/' + pinLink.icon)"/>
            <p class="link-name" v-html="title"></p>
        </a>
        <a v-if="!pinned" class="pin-button" @click="pin()" :title="'Pin ' + pinLink.name">
            <img class="pin-icon" src="../assets/pin-open-angled.svg"/>
        </a>
        <a v-else class="pin-button" @click="unpin()" :title="'Unpin ' + pinLink.name">
            <img class="pin-icon" src="../assets/pin-closed-vertical.svg"/>
        </a>
    </div>
</template>

<script>
import PinLink from '../pin-link.js'

export default {
    name: 'PinLink',
    props: {
        link_id: String,
        search: String
    },
    data() {
        return {
            pinLink: PinLink,
            large: false
        }
    },
    computed: {
        pinned() {
            return this.$parent.pinned.indexOf(this.$vnode.key) !== -1;
        },
        title() {
            let name = this.pinLink.name.toLowerCase();

            if (!this.search) {
                return this.pinLink.name;
            }
            let search = this.search.toLowerCase();

            let startIndex = name.indexOf(search);
            if (startIndex === -1) {
                return this.pinLink.name;
            }
            let endIndex = startIndex + search.length;
            let html = this.pinLink.name.substring(0, startIndex)
                + '<b>'
                + this.pinLink.name.substring(startIndex, endIndex)
                + '</b>'
                + this.pinLink.name.substring(endIndex);

            return html;
        }
    },
    methods: {
        pin() {
            this.$parent.pinItem(this.$vnode.key)
        },
        unpin() {
            this.$parent.unpinItem(this.$vnode.key)
        }
    },
    created() {
        this.pinLink = this.$root.$data.linkMap[this.$vnode.key];
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

.link-name b {
    font-weight: 900;
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
    width: 50px;
    height: 50px;
    padding: 10px;
}
</style>