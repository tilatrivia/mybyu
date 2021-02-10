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
        <PinLink v-for="link_id in pinned" v-bind:key="link_id" :large="false"/>
      </div>

      <div id="search" class="box">
        <p>SEARCH</p>
        <input type="text"/>
      </div>

      <div id="my-classes" class="box">
        <p>MY CLASSES</p>
        <PinLink key="mymap" :large="false"/>
        <PinLink key="plan-courses" :large="false"/>
        <PinLink key="course-catalog" :large="false"/>
        <PinLink key="class-schedule" :large="false"/>
        <PinLink key="register-for-classes" :large="false"/>
        <hr>
        <PinLink key="book-list" :large="false"/>
        <hr>
        <PinLink key="learning-suite" :large="false"/>
        <PinLink key="canvas" :large="false"/>
        <hr>
        <PinLink key="testing-center" :large="false"/>
        <PinLink key="finals-schedule" :large="false"/>
      </div>

      <div id="employment" class="box">
        <p>EMPLOYMENT</p>
        <PinLink key="y-time" :large="false"/>
        <PinLink key="view-paycheck" :large="false"/>
        <PinLink key="direct-deposit" :large="false"/>
        <PinLink key="student-employment" :large="false"/>
      </div>

      <div id="academics" class="box">
        <p>ACADEMICS</p>
        <PinLink key="apply-for-graduation" :large="false"/>
        <PinLink key="ecclesiastical-endorsement" :large="false"/>
        <PinLink key="enrollment-services" :large="false"/>
        <hr>
        <PinLink key="financial-center" :large="false"/>
        <PinLink key="ymessage" :large="false"/>
        <hr>
        <PinLink key="scholarship-application" :large="false"/>
        <PinLink key="scholarships" :large="false"/>
        <hr>
        <PinLink key="learn-anywhere" :large="false"/>
        <PinLink key="teach-anywhere" :large="false"/>
        <hr>
        <PinLink key="library" :large="false"/>
      </div>
      
      <div id="student-life" class="box">
        <p>STUDENT LIFE</p>
        <PinLink key="on-campus-housing" :large="false"/>
        <PinLink key="off-campus-housing" :large="false"/>
        <PinLink key="campus-shuttle" :large="false"/>
        <PinLink key="parking" :large="false"/>
        <hr>
        <PinLink key="cougar-cash" :large="false"/>
        <PinLink key="dinning-services" :large="false"/>
        <PinLink key="dinning-account" :large="false"/>
        <hr>
        <PinLink key="student-health" :large="false"/>
        <hr>
        <PinLink key="intramurals" :large="false"/>
        <PinLink key="roc-pass" :large="false"/>
        <PinLink key="byusa" :large="false"/>
      </div>

      <div id="campus-resources" class="box">
        <p>CAMPUS RESOURCES</p>
        <PinLink key="campus-directory" :large="false"/>
        <PinLink key="campus-map" :large="false"/>
        <hr>
        <PinLink key="calendars" :large="false"/>
        <PinLink key="byu-speeches" :large="false"/>
        <PinLink key="university-policies" :large="false"/>
        <hr>
        <PinLink key="counseling-services" :large="false"/>
        <PinLink key="career-center" :large="false"/>
      </div>

      <div id="technology" class="box">
        <p>TECHNOLOGY</p>
        <PinLink key="get-software" :large="false"/>
        <PinLink key="oit" :large="false"/>
        <PinLink key="lab-computers" :large="false"/>
        <PinLink key="printers" :large="false"/>
      </div>

      <div id="university-account" class="box">
        <p>ACCOUNT</p>
        <PinLink key="account-management" :large="false"/>
        <PinLink key="account-security" :large="false"/>
        <PinLink key="guest-access" :large="false"/>
        <PinLink key="personal-information" :large="false"/>
      </div>
    </div>
    <div id="footer">
      <p>BRIGHAM YOUNG UNIVERSITY</p>
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
      pinned: []
    }
  },
  methods: {
    pinItem(id) {
      if (this.pinned.indexOf(id) === -1) {
        this.pinned.push(id)
      }
    },
    unpinItem(id) {
      let index = this.pinned.indexOf(id)
      if (index !== -1) {
        this.pinned.splice(index, 1)
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

#header {
  background-color: #002E5D;
  padding: 30px 10px;

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
  border-top: 1px solid #bbbbbb;
}

#pinned-links {
  grid-column: 1;
}

#pinned-links > img {
  display: block;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  opacity: 30%;
}

#search {
  grid-column: 2 / 4;
  grid-row: span 3;
}

#search > input {
  width: 100%;
  height: 50px;
  margin: 0;
  border: none;
  padding: 5px;

  font-family: 'HCo Ringside Narrow SSm', sans-serif;
  font-size: 14pt;

  background-color: #f4f4f4;
}

#search > input:hover {
  background-color: #eeeeee;
}

#search > input:focus {
  outline: none;
  background-color: #eeeeee;
}

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

#footer {
  background-color: #002E5D;
  padding: 20px;
}

#footer p {
  margin: 0;
  font-family: 'HCo Ringside Narrow SSm', sans-serif;
  font-size: 14pt;
  font-weight: 800;
  letter-spacing: 5px;
  text-align: center;
  color: white;
}
</style>
