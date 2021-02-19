<template>
  <div id="app">
    <div id="header">
      <p class="title">myBYU</p>
      <p class="name">{{ $root.$data.user.toUpperCase() }}</p>
      <p class="log-out">LOG OUT</p>
    </div>
    <div id="body">
      <div id="pinned-links" class="box" :style="'grid-row: span ' + pinnedSpan">
        <p>PINNED LINKS</p>
        <img v-if="this.pinned.length == 0" class="large-pin-icon" src="./assets/pin-open-angled.svg"/>
        <PinLink v-for="link_id in pinned" v-bind:key="link_id"/>
      </div>

      <div id="search" class="box">
        <p>SEARCH</p>
        <div class="search-box" v-bind:class="{ activebox: searchTerm }">
          <div class="text-field">
            <input type="text" v-model="searchTerm"/>
            <button @click="searchTerm = ''" v-if="searchTerm"><img src="./assets/x.svg"/></button>
          </div>
          <div class="search-results">
            <PinLink v-for="link_id in searchResults" v-bind:key="link_id" :search="searchTerm"/>
            <p v-if="searchTerm && searchResults.length === 0">No links found for "{{ searchTerm }}"</p>
          </div>
        </div>
      </div>

      <div id="my-classes" class="box">
        <p>MY CLASSES</p>
        <PinLink key="mymap"/>
        <PinLink key="plan-courses"/>
        <PinLink key="course-catalog"/>
        <PinLink key="class-schedule"/>
        <PinLink key="register-for-classes"/>
        <hr>
        <PinLink key="book-list"/>
        <hr>
        <PinLink key="learning-suite"/>
        <PinLink key="canvas"/>
        <hr>
        <PinLink key="testing-center"/>
        <PinLink key="finals-schedule"/>
      </div>

      <div id="employment" class="box">
        <p>EMPLOYMENT</p>
        <PinLink key="y-time"/>
        <PinLink key="view-paycheck"/>
        <PinLink key="direct-deposit"/>
        <PinLink key="student-employment"/>
      </div>

      <div id="academics" class="box">
        <p>ACADEMICS</p>
        <PinLink key="apply-for-graduation"/>
        <PinLink key="ecclesiastical-endorsement"/>
        <PinLink key="enrollment-services"/>
        <hr>
        <PinLink key="financial-center"/>
        <PinLink key="ymessage"/>
        <hr>
        <PinLink key="scholarship-application"/>
        <PinLink key="scholarships"/>
        <hr>
        <PinLink key="learn-anywhere"/>
        <PinLink key="teach-anywhere"/>
        <hr>
        <PinLink key="library"/>
      </div>
      
      <div id="student-life" class="box">
        <p>STUDENT LIFE</p>
        <PinLink key="on-campus-housing"/>
        <PinLink key="off-campus-housing"/>
        <PinLink key="campus-shuttle"/>
        <PinLink key="parking"/>
        <hr>
        <PinLink key="cougar-cash"/>
        <PinLink key="dining-services"/>
        <PinLink key="dining-account"/>
        <hr>
        <PinLink key="student-health"/>
        <hr>
        <PinLink key="intramurals"/>
        <PinLink key="roc-pass"/>
        <PinLink key="byusa"/>
      </div>

      <div id="campus-resources" class="box">
        <p>CAMPUS RESOURCES</p>
        <PinLink key="campus-directory"/>
        <PinLink key="campus-map"/>
        <hr>
        <PinLink key="calendars"/>
        <PinLink key="byu-speeches"/>
        <PinLink key="university-policies"/>
        <hr>
        <PinLink key="counseling-services"/>
        <PinLink key="career-center"/>
      </div>

      <div id="technology" class="box">
        <p>TECHNOLOGY</p>
        <PinLink key="get-software"/>
        <PinLink key="oit"/>
        <PinLink key="lab-computers"/>
        <PinLink key="printers"/>
      </div>

      <div id="university-account" class="box">
        <p>ACCOUNT</p>
        <PinLink key="account-management"/>
        <PinLink key="account-recovery"/>
        <PinLink key="guest-access"/>
        <PinLink key="personal-information"/>
      </div>
    </div>
    <div id="footer">
      <p class="logo">TRUMAN KAUTZMAN</p>
      <p>This project's source is found in this <a href="https://github.com/tilatrivia/mybyu">repository</a></p>
      <p>To request new links, features, or other changes please let me know <a href="https://github.com/tilatrivia/mybyu/issues/new">here</a></p>
    </div>
  </div>
</template>

<script>
import PinLink from './components/PinLink.vue'

export default {
  name: 'App',
  components: {
    PinLink
  },
  data() {
    return {
      pinned: [],
      searchTerm: ""
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
        this.$root.$data.links.forEach((link) => {
          if (link.name.toLowerCase().includes(searchTermLower))
            results.push(link.id);
        }, this);
        this.$root.$data.links.forEach((link) => {
          if (!link.name.toLowerCase().includes(searchTermLower) && (link.heading.toLowerCase().includes(searchTermLower) || link.tags.includes(searchTermLower)))
            results.push(link.id);
        }, this);
      }
      return results;
    }
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

p, a {
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

.box > p {
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

#pinned-links > img {
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

.search-box:focus-within, .activebox {
  box-shadow: 0 5px 20px 0 rgb(0 0 0 / 20%);
}

.text-field > input {
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

.text-field > input:hover {
  background-color: #eeeeee;
}

.text-field > input:focus {
  outline: none;
  background-color: #eeeeee;
}

.text-field > button {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;

  border: none;
  padding: 10px;
  background: none;
}

.text-field > button > img {
  width: 30px;
}

.text-field > button:hover {
  background-color: #eeeeee;
}

.search-results {
  position: absolute;
  max-height: 285px;
  width: 100%;

  background-color: #f9f9f9;
  box-shadow: 0 5px 20px 0 rgb(0 0 0 / 20%);

  overflow: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.search-results > p {
  margin: 5px;
  line-height: 40px;
}

.search-box > div::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
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
