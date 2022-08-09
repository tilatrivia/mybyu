<template>
    <div id="app">
        <div id="header">
            <p class="title">myBYU</p>
            <p class="name">{{ user.toUpperCase() }}</p>
            <p class="log-out">LOG OUT</p>
        </div>
        <div id="body">
            <div id="pinned-links" class="box" :style="'grid-row: span ' + pinnedSpan">
                <p>PINNED LINKS</p>
                <img v-if="this.pinned.length == 0" class="large-pin-icon" src="./assets/pin-open-angled.svg" />
                <PinLink v-for="link_id in pinned" :key="link_id" :linkData="linkMap.get(link_id)" :pinned="true"
                    @onPin="pinItem(link_id)" @onUnpin="unpinItem(link_id)" />
            </div>

            <div id="search" class="box">
                <p>SEARCH</p>
                <div class="search-box" v-bind:class="{ activebox: searchTerm }">
                    <div class="text-field">
                        <input type="text" v-model="searchTerm" />
                        <button @click="searchTerm = ''" v-if="searchTerm"><img src="./assets/x.svg" /></button>
                    </div>
                    <div class="search-results">
                        <PinLink v-for="link_id in searchResults" :key="link_id" :search="searchTerm"
                            :linkData="linkMap.get(link_id)" :pinned="pinned.includes(link_id)"
                            @onPin="pinItem(link_id)" @onUnpin="unpinItem(link_id)" />
                        <p v-if="searchTerm && searchResults.length === 0">No links found for "{{ searchTerm }}"</p>
                    </div>
                </div>
            </div>

            <div id="my-classes" class="box">
                <p>MY CLASSES</p>
                <PinLink :linkData="linkMap.get('mymap')" :pinned="pinned.includes('mymap')" @onPin="pinItem('mymap')"
                    @onUnpin="unpinItem('mymap')" />
                <PinLink :linkData="linkMap.get('plan-courses')" :pinned="pinned.includes('plan-courses')"
                    @onPin="pinItem('plan-courses')" @onUnpin="unpinItem('mymap')" />
                <PinLink :linkData="linkMap.get('course-catalog')" :pinned="pinned.includes('course-catalog')"
                    @onPin="pinItem('course-catalog')" @onUnpin="unpinItem('course-catalog')" />
                <PinLink :linkData="linkMap.get('class-schedule')" :pinned="pinned.includes('class-schedule')"
                    @onPin="pinItem('class-schedule')" @onUnpin="unpinItem('class-schedule')" />
                <PinLink :linkData="linkMap.get('register-for-classes')"
                    :pinned="pinned.includes('register-for-classes')" @onPin="pinItem('register-for-classes')"
                    @onUnpin="unpinItem('register-for-classes')" />
                <hr>
                <PinLink :linkData="linkMap.get('book-list')" :pinned="pinned.includes('book-list')"
                    @onPin="pinItem('book-list')" @onUnpin="unpinItem('book-list')" />
                <hr>
                <PinLink :linkData="linkMap.get('learning-suite')" :pinned="pinned.includes('learning-suite')"
                    @onPin="pinItem('learning-suite')" @onUnpin="unpinItem('learning-suite')" />
                <PinLink :linkData="linkMap.get('canvas')" :pinned="pinned.includes('canvas')"
                    @onPin="pinItem('canvas')" @onUnpin="unpinItem('canvas')" />
                <hr>
                <PinLink :linkData="linkMap.get('testing-center')" :pinned="pinned.includes('testing-center')"
                    @onPin="pinItem('testing-center')" @onUnpin="unpinItem('testing-center')" />
                <PinLink :linkData="linkMap.get('finals-schedule')" :pinned="pinned.includes('finals-schedule')"
                    @onPin="pinItem('finals-schedule')" @onUnpin="unpinItem('finals-schedule')" />
            </div>

            <div id="employment" class="box">
                <p>EMPLOYMENT</p>
                <PinLink :linkData="linkMap.get('y-time')" :pinned="pinned.includes('y-time')"
                    @onPin="pinItem('y-time')" @onUnpin="unpinItem('y-time')" />
                <PinLink :linkData="linkMap.get('view-paycheck')" :pinned="pinned.includes('view-paycheck')"
                    @onPin="pinItem('view-paycheck')" @onUnpin="unpinItem('view-paycheck')" />
                <PinLink :linkData="linkMap.get('direct-deposit')" :pinned="pinned.includes('direct-deposit')"
                    @onPin="pinItem('direct-deposit')" @onUnpin="unpinItem('direct-deposit')" />
                <PinLink :linkData="linkMap.get('student-employment')" :pinned="pinned.includes('student-employment')"
                    @onPin="pinItem('student-employment')" @onUnpin="unpinItem('student-employment')" />
            </div>

            <div id="academics" class="box">
                <p>ACADEMICS</p>
                <PinLink :linkData="linkMap.get('apply-for-graduation')"
                    :pinned="pinned.includes('apply-for-graduation')" @onPin="pinItem('apply-for-graduation')"
                    @onUnpin="unpinItem('apply-for-graduation')" />
                <PinLink :linkData="linkMap.get('ecclesiastical-endorsement')"
                    :pinned="pinned.includes('ecclesiastical-endorsement')"
                    @onPin="pinItem('ecclesiastical-endorsement')" @onUnpin="unpinItem('ecclesiastical-endorsement')" />
                <PinLink :linkData="linkMap.get('enrollment-services')" :pinned="pinned.includes('enrollment-services')"
                    @onPin="pinItem('enrollment-services')" @onUnpin="unpinItem('enrollment-services')" />
                <hr>
                <PinLink :linkData="linkMap.get('financial-center')" :pinned="pinned.includes('financial-center')"
                    @onPin="pinItem('financial-center')" @onUnpin="unpinItem('financial-center')" />
                <PinLink :linkData="linkMap.get('ymessage')" :pinned="pinned.includes('ymessage')"
                    @onPin="pinItem('ymessage')" @onUnpin="unpinItem('ymessage')" />
                <hr>
                <PinLink :linkData="linkMap.get('scholarship-application')"
                    :pinned="pinned.includes('scholarship-application')" @onPin="pinItem('scholarship-application')"
                    @onUnpin="unpinItem('scholarship-application')" />
                <PinLink :linkData="linkMap.get('scholarships')" :pinned="pinned.includes('scholarships')"
                    @onPin="pinItem('scholarships')" @onUnpin="unpinItem('scholarships')" />
                <hr>
                <PinLink :linkData="linkMap.get('learn-anywhere')" :pinned="pinned.includes('learn-anywhere')"
                    @onPin="pinItem('learn-anywhere')" @onUnpin="unpinItem('learn-anywhere')" />
                <PinLink :linkData="linkMap.get('teach-anywhere')" :pinned="pinned.includes('teach-anywhere')"
                    @onPin="pinItem('teach-anywhere')" @onUnpin="unpinItem('teach-anywhere')" />
                <hr>
                <PinLink :linkData="linkMap.get('library')" :pinned="pinned.includes('library')"
                    @onPin="pinItem('library')" @onUnpin="unpinItem('library')" />
            </div>

            <div id="student-life" class="box">
                <p>STUDENT LIFE</p>
                <PinLink :linkData="linkMap.get('on-campus-housing')" :pinned="pinned.includes('on-campus-housing')"
                    @onPin="pinItem('on-campus-housing')" @onUnpin="unpinItem('on-campus-housing')" />
                <PinLink :linkData="linkMap.get('off-campus-housing')" :pinned="pinned.includes('off-campus-housing')"
                    @onPin="pinItem('off-campus-housing')" @onUnpin="unpinItem('off-campus-housing')" />
                <PinLink :linkData="linkMap.get('campus-shuttle')" :pinned="pinned.includes('campus-shuttle')"
                    @onPin="pinItem('campus-shuttle')" @onUnpin="unpinItem('campus-shuttle')" />
                <PinLink :linkData="linkMap.get('parking')" :pinned="pinned.includes('parking')"
                    @onPin="pinItem('parking')" @onUnpin="unpinItem('parking')" />
                <hr>
                <PinLink :linkData="linkMap.get('cougar-cash')" :pinned="pinned.includes('cougar-cash')"
                    @onPin="pinItem('cougar-cash')" @onUnpin="unpinItem('cougar-cash')" />
                <PinLink :linkData="linkMap.get('dining-services')" :pinned="pinned.includes('dining-services')"
                    @onPin="pinItem('dining-services')" @onUnpin="unpinItem('dining-services')" />
                <PinLink :linkData="linkMap.get('dining-account')" :pinned="pinned.includes('dining-account')"
                    @onPin="pinItem('dining-account')" @onUnpin="unpinItem('dining-account')" />
                <hr>
                <PinLink :linkData="linkMap.get('student-health')" :pinned="pinned.includes('student-health')"
                    @onPin="pinItem('student-health')" @onUnpin="unpinItem('student-health')" />
                <hr>
                <PinLink :linkData="linkMap.get('intramurals')" :pinned="pinned.includes('intramurals')"
                    @onPin="pinItem('intramurals')" @onUnpin="unpinItem('intramurals')" />
                <PinLink :linkData="linkMap.get('roc-pass')" :pinned="pinned.includes('roc-pass')"
                    @onPin="pinItem('roc-pass')" @onUnpin="unpinItem('roc-pass')" />
                <PinLink :linkData="linkMap.get('byusa')" :pinned="pinned.includes('byusa')" @onPin="pinItem('byusa')"
                    @onUnpin="unpinItem('byusa')" />
            </div>

            <div id="campus-resources" class="box">
                <p>CAMPUS RESOURCES</p>
                <PinLink :linkData="linkMap.get('campus-directory')" :pinned="pinned.includes('campus-directory')"
                    @onPin="pinItem('campus-directory')" @onUnpin="unpinItem('campus-directory')" />
                <PinLink :linkData="linkMap.get('campus-map')" :pinned="pinned.includes('campus-map')"
                    @onPin="pinItem('campus-map')" @onUnpin="unpinItem('campus-map')" />
                <hr>
                <PinLink :linkData="linkMap.get('calendars')" :pinned="pinned.includes('calendars')"
                    @onPin="pinItem('calendars')" @onUnpin="unpinItem('calendars')" />
                <PinLink :linkData="linkMap.get('byu-speeches')" :pinned="pinned.includes('byu-speeches')"
                    @onPin="pinItem('byu-speeches')" @onUnpin="unpinItem('byu-speeches')" />
                <PinLink :linkData="linkMap.get('university-policies')" :pinned="pinned.includes('university-policies')"
                    @onPin="pinItem('university-policies')" @onUnpin="unpinItem('university-policies')" />
                <hr>
                <PinLink :linkData="linkMap.get('counseling-services')" :pinned="pinned.includes('counseling-services')"
                    @onPin="pinItem('counseling-services')" @onUnpin="unpinItem('counseling-services')" />
                <PinLink :linkData="linkMap.get('career-center')" :pinned="pinned.includes('career-center')"
                    @onPin="pinItem('career-center')" @onUnpin="unpinItem('career-center')" />
            </div>

            <div id="technology" class="box">
                <p>TECHNOLOGY</p>
                <PinLink :linkData="linkMap.get('get-software')" :pinned="pinned.includes('get-software')"
                    @onPin="pinItem('get-software')" @onUnpin="unpinItem('get-software')" />
                <PinLink :linkData="linkMap.get('oit')" :pinned="pinned.includes('oit')" @onPin="pinItem('oit')"
                    @onUnpin="unpinItem('oit')" />
                <PinLink :linkData="linkMap.get('lab-computers')" :pinned="pinned.includes('lab-computers')"
                    @onPin="pinItem('lab-computers')" @onUnpin="unpinItem('lab-computers')" />
                <PinLink :linkData="linkMap.get('printers')" :pinned="pinned.includes('printers')"
                    @onPin="pinItem('printers')" @onUnpin="unpinItem('printers')" />
            </div>

            <div id="university-account" class="box">
                <p>ACCOUNT</p>
                <PinLink :linkData="linkMap.get('account-management')" :pinned="pinned.includes('account-management')"
                    @onPin="pinItem('account-management')" @onUnpin="unpinItem('account-management')" />
                <PinLink :linkData="linkMap.get('account-recovery')" :pinned="pinned.includes('account-recovery')"
                    @onPin="pinItem('account-recovery')" @onUnpin="unpinItem('account-recovery')" />
                <PinLink :linkData="linkMap.get('guest-access')" :pinned="pinned.includes('guest-access')"
                    @onPin="pinItem('guest-access')" @onUnpin="unpinItem('guest-access')" />
                <PinLink :linkData="linkMap.get('personal-information')"
                    :pinned="pinned.includes('personal-information')" @onPin="pinItem('personal-information')"
                    @onUnpin="unpinItem('personal-information')" />
            </div>
        </div>
        <div id="footer">
            <p class="logo">TRUMAN KAUTZMAN</p>
            <p>This is not an official BYU website, only a prototype</p>
            <p>This project's source is found in this <a href="https://github.com/tilatrivia/mybyu">repository</a></p>
            <p>Please request new links, additional features, or other changes <a
                    href="https://github.com/tilatrivia/mybyu/issues/new">here</a></p>
        </div>
    </div>
</template>

<script>
import PinLink from './components/PinLink.vue'
import linksJSON from './links'
import LinkData from './linkData'

export default {
    name: 'App',
    components: {
        PinLink
    },
    data() {
        return {
            pinned: new Array(),
            searchTerm: "",
            user: "User",
            links: [],
            linkMap: new Map(),
        }
    },
    methods: {
        pinItem(id) {
            if (this.pinned.indexOf(id) === -1) {
                this.pinned.push(id)
                localStorage.pinned = JSON.stringify(this.pinned)
            }
        },
        unpinItem(id) {
            let index = this.pinned.indexOf(id)
            if (index !== -1) {
                this.pinned.splice(index, 1)
                localStorage.pinned = JSON.stringify(this.pinned)
            }

        }
    },
    computed: {
        pinnedSpan() {
            if (this.pinned.length === 0) {
                return 5;
            } else {
                return this.pinned.length + 2;
            }
        },
        searchResults() {
            let results = [];
            if (this.searchTerm) {
                let searchTermLower = this.searchTerm.toLowerCase();
                this.links.forEach((link) => {
                    if (link.name.toLowerCase().includes(searchTermLower))
                        results.push(link.id);
                }, this);
                this.links.forEach((link) => {
                    if (!link.name.toLowerCase().includes(searchTermLower) && (link.heading.toLowerCase().includes(searchTermLower) || link.tags.includes(searchTermLower)))
                        results.push(link.id);
                }, this);
            }
            return results;
        }
    },
    created() {
        this.links = linksJSON;

        this.links.forEach(link => {
            this.linkMap.set(link.id, new LinkData(link.name, link.address, link.icon, link.heading, link.tags))
        });
    },
    mounted() {
        if (localStorage.pinned) {
            this.pinned = JSON.parse(localStorage.pinned);
        }
    }
}
</script>

<style>
@import "https://cdn.byu.edu/theme-fonts/1.x.x/ringside/fonts.css";
@import "https://cdn.byu.edu/theme-fonts/1.x.x/public-sans/fonts.css";

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    background-color: #fafafa;
}

p,
a {
    font-family: 'Public Sans', sans-serif;
    text-decoration: none;
}

a {
    color: #0062b8;
}

a:hover {
    color: #66b0f1;
}

#header {
    background-color: #002E5D;
    padding: 30px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

@media only screen and (max-width: 480px) {
    #header {
        flex-direction: column;
        padding: 10px;
    }
}

#header p {
    margin: 0;
    font-family: 'HCo Ringside Narrow SSm', sans-serif;
    font-size: 10pt;
    line-height: 40px;
    font-weight: 800;
    letter-spacing: 4px;
    text-align: right;
    color: white;
}

#header .title {
    font-size: 24pt;
    font-weight: 800;
    letter-spacing: initial;
    text-align: left;
}

#header .name {
    color: #66b0f1;
    flex: 1 0;
}

#header .log-out {
    margin-left: 20px;
}

#body {
    margin: 0 auto;
    padding: 20px;

    display: grid;
    grid-template-columns: repeat(3, 340px);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-auto-flow: row dense;
    justify-content: center;
}

.box {
    box-shadow: 0 5px 20px 0 rgb(0 0 0 / 10%);
    padding: 15px 15px 20px;
    background-color: white;
}

.box>p {
    margin: 0 0 21px;
    font-family: 'HCo Ringside Narrow SSm', sans-serif;
    font-size: 16pt;
    line-height: 24px;
    font-weight: 800;
    color: #002E5D;
}

hr {
    margin: 0;
    height: 0;
    border: none;
    border-top: 1px solid #888888;
}



/* Pinned Links */
#pinned-links {
    grid-column: 1;
}

#pinned-links>img {
    display: block;
    width: 150px;
    height: 150px;
    margin: 0 auto;
    opacity: 0.3;
}



/* Search Box */
#search {
    grid-column: 2 / 4;
    grid-row: span 3;
    height: 130px;
}

.search-box {
    position: relative;
    transition: box-shadow 0.1s;
}

.search-box:focus-within,
.activebox {
    box-shadow: 0 5px 20px 0 rgb(0 0 0 / 20%);
}

.text-field>input {
    position: relative;
    width: 100%;
    height: 50px;
    margin: 0;
    border: none;
    padding: 5px;
    z-index: 1;

    font-family: 'HCo Ringside Narrow SSm', sans-serif;
    font-size: 14pt;

    background-color: #f4f4f4;
}

.text-field>input:hover {
    background-color: #eeeeee;
}

.text-field>input:focus {
    outline: none;
    background-color: #eeeeee;
}

.text-field>button {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;

    border: none;
    padding: 10px;
    background: none;
}

.text-field>button>img {
    width: 30px;
}

.text-field>button:hover {
    background-color: #eeeeee;
}

.search-results {
    position: absolute;
    max-height: 285px;
    width: 100%;

    background-color: #f9f9f9;
    box-shadow: 0 5px 20px 0 rgb(0 0 0 / 20%);

    overflow: scroll;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.search-results>p {
    margin: 5px;
    line-height: 40px;
}

.search-box>div::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari and Opera */
}



/* Catagory Grid */
#my-classes {
    grid-column: 1;
    grid-row: span 12;
}

#employment {
    grid-column: 2;
    grid-row: span 6;
}

#academics {
    grid-column: 3;
    grid-row: span 12;
}

#student-life {
    grid-column: 2;
    grid-row: span 13;
}

#campus-resources {
    grid-column: 3;
    grid-row: span 9;
}

#technology {
    grid-column: 2;
    grid-row: span 6;
}

#university-account {
    grid-column: 1;
    grid-row: span 6;
}

@media only screen and (max-width: 1099px) {
    #body {
        grid-template-columns: repeat(2, 340px);
    }

    #pinned-links {
        grid-column: 1;
    }

    #search {
        grid-column: 2;
    }

    #my-classes {
        grid-column: 1;
    }

    #employment {
        grid-column: 2;
    }

    #academics {
        grid-column: 2;
    }

    #student-life {
        grid-column: 1;
    }

    #campus-resources {
        grid-column: 2;
    }

    #technology {
        grid-column: 2;
    }

    #university-account {
        grid-column: 1;
    }
}

@media only screen and (max-width: 739px) {
    #body {
        display: block;
        max-width: 380px;
    }

    .box {
        margin-bottom: 20px;
    }
}



/* Footer */
#footer {
    background-color: #002E5D;
    padding: 20px;
}

#footer p {
    color: #ffffff;
    text-align: center;
}

#footer .logo {
    margin: 0;
    font-family: 'HCo Ringside Narrow SSm', sans-serif;
    font-size: 14pt;
    font-weight: 800;
    letter-spacing: 5px;
    text-align: center;
    color: white;
}
</style>
