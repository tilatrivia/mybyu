<template>
  <div id="app">
    <div id="header">
      <p class="title">myBYU</p>
      <p class="name">{{ $root.$data.user.toUpperCase() }}</p>
      <p class="log-out">LOG OUT</p>
    </div>
    <div id="body">
      <div id="pinned-links" class="box">
        <p>PINNED LINKS</p>
        <img v-if="$root.$data.pinned.length == 0" class="large-pin-icon" src="./assets/pin-open-angled.svg"/>
      </div>
      <div id="search" class="box">
        <p>SEARCH</p>
      </div>
      <div id="my-classes" class="box">
        <p>MY CLASSES</p>
        <PinLink link_id="y-time" :large="false" :pinned="false"/>
        <PinLink link_id="learning-suite" :large="false" :pinned="false"/>
      </div>
      <div id="employment" class="box">
        <p>EMPLOYMENT</p>

      </div>
      <div id="academics" class="box">
        <p>ACADEMICS</p>

      </div>
      <div id="student-life" class="box">
        <p>STUDENT LIFE</p>

      </div>
      <div id="campus-resources" class="box">
        <p>CAMPUS RESOURCES</p>

      </div>
      <div id="technology" class="box">
        <p>TECHNOLOGY</p>

      </div>
      <div id="university-account" class="box">
        <p>ACCOUNT</p>

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
  }
}
</script>

<style>
@import "https://cdn.byu.edu/theme-fonts/1.x.x/ringside/fonts.css";
@import "https://cdn.byu.edu/theme-fonts/1.x.x/public-sans/fonts.css";

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
  grid-template-columns: repeat(3, 300px);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-auto-flow: row dense;
  justify-content: center;
}

#body p {
  margin: 0 0 5px;
  font-family: 'HCo Ringside Narrow SSm', sans-serif;
  font-size: 14pt;
  font-weight: 800;
  color: #002E5D;
}

.box {
  box-shadow: 0 5px 20px 0 rgb(0 0 0 / 10%);
  padding: 15px;
}

#pinned-links {
  grid-column: 1;
  grid-row: span 4;
}

#pinned-links img {
  display: block;
  width: 128px;
  height: 128px;
  margin: 0 auto;
  opacity: 30%;
}

#search {
  grid-column: 2 / 4;
  grid-row: span 3;
}

#my-classes {
  grid-column: 1;
  grid-row: span 11;
}

#employment {
  grid-column: 2;
  grid-row: span 5;
}

#academics {
  grid-column: 3;
  grid-row: span 11;
}

#student-life {
  grid-column: 2;
  grid-row: span 12;
}

#campus-resources {
  grid-column: 3;
  grid-row: span 8;
}

#technology {
  grid-column: 2;
  grid-row: span 5;
}

#university-account {
  grid-column: 1;
  grid-row: span 5;
}

@media only screen and (max-width: 979px) {
  #body {
    grid-template-columns: repeat(2, 300px);
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

@media only screen and (max-width: 659px) {
  #body {
    display: block;
    max-width: 340px;
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
