<template>
<div class="template-container">
  <div id="spin-container">
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  <h1 class="spinner">{{ title }}</h1> 
  </div>
    <div id="search-container">
      <div id="input-container">
        <h3>what's your birthday?</h3>
      <input class="search-input" v-model="dateStart" placeholder="YYYY-MM-DD" required><br>
      <h3>where were you born?</h3>
      <select class="search-input" v-model="selected" required placeholder="state">
        <option id="state-options" v-for="(reason, key) in states.StateName" 
                :value="key"
                :key="key">
          {{reason}}
          </option>
          </select><br>
      <input class="search-input" v-model="countyCd" placeholder="55079" required>
      <br>
      </div>
      <div id="button-container">
      <button v-on:click="fetchData" class="big-button">see it in the stream stats</button>
      </div>
      <p>query: {{ this.que }} </p>
    </div>

    <div>
      <h3>Location: {{ sitey }} </h3>
    {{ info }}
    </div>
    </div>
</template>

<script>
  import * as d3Base from "d3";
  import * as axios from "axios";

  export default {
    name: 'StreamSearch',
    components: {

        },
        props: {
            title: {
                type: String,
                default: process.env.VUE_APP_TITLE
            }
        },

    data() {
          return {
            publicPath: process.env.BASE_URL, // find the files when on different deployment roots
            d3: null, // assign d3 plugins to the d3 instance

            // global variables instantiated in next section
            states: {},
            countyCd: "",//&countyCd=55079
            stateCd: "",
            info: null,
            dateStart:'', //startDT=
            paramCode: '00065', // discharge in cubic feet per second
            que: null,
            sitey: null,

            apiKey: '',
            result: " ",
            responseAvailable: false,
            url: 'https://waterservices.usgs.gov/nwis/dv/?format=json&countyCd=',

            selected: '',

          }
        },
    watch: { },
    mounted() {
      this.d3 = Object.assign(d3Base); // this loads d3 plugins with webpack

      this.getData(); //read in data and then draw chart

    },
    //methods are executed once, not cached as computed properties, rerun everytime deal with new step
    methods: {
      fetchData() {
        const self = this;
        this.que = this.url + this.countyCd + '&startDT=' + this.dateStart + '&endDT=' + this.dateStart + '&PARAMETERcD=00060,00065&siteStatus=all';

    //use axios to search USGS waterservices API
      axios
        .get(this.que)
        .then(response => (this.info = response.data.value.timeSeries))

      //this.sitey = this.info.sourceInfo;
      console.log(this.info);

      //add class to spinning text to start animation
      //needs somethign to restart and redo with each click
      this.d3.selectAll(".spinner")
        .classed('spin', true)
      },
      getData() {
        const self = this;

        let promises = [self.d3.csv(self.publicPath + "state_fips.csv"),
        self.d3.csv("county_fips.csv")];
        Promise.all(promises).then(self.callback);

      },
      fetchAPIData( ) {

      },
      callback(data) {
            this.state_fips = data[0];
            this.county_fips = data[1];

            //use for fips input codes...doesn't work
            this.states["StateName"] = this.state_fips.map(function(d) {
              return d.Name; 
            });
            this.states["StateID"] = this.state_fips.map(function(d) {
              return d.State; 
            });
            this.states["fip"] = this.state_fips.map(function(d) {
              return d['State Cd']; 
            });
            
          }
        }
  }
</script>


<style scoped lang="scss">

$buttonA: rgb(57, 10, 61); // botton button layer, text, and border
$buttonB:rgb(158, 79, 165); //drop shadow color
$buttonC:  rgb(248, 157, 172); //middle button
$buttonE: rgb(229, 204, 245); //main fill
$almostWhite: rgb(229, 204, 245);

.template-container {
  max-width: 800px;
  margin: auto;

}
#search-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#input-container {
  position: relative;
  margin-bottom: 20px;
}
.search-input {
  height: 2.5rem;
  width: 360px;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: 200;
  color: pink;
  text-align: center;
  margin: 1%;
  color:  pink;
  background-color: rgb(34, 21, 65);
  border-width: 0 0 3px;
  border-color: pink;
  text-align-last:center;
}
h3 {
  color:pink;
  text-align: center;
  font-size: 24px;
  font-weight: 100;
}
::placeholder {
  color:  pink;
}
#state-options {
  background-color:rgba(34, 21, 65,.5);
  opacity: .5;
}

//button styling
#button-container {
  position: relative;
  margin-bottom: 50px;
}

button {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  font-size: 1.5rem;
  font-family: 'Space Mono', monospace;
  font-weight: 1000;
    color: $buttonA;
  margin: .5rem;
}

button.big-button {
   padding: 1em 2em;
   border: 2px solid $buttonA;
  border-radius: 1em;
  background: $buttonE;
  transform-style: preserve-3d;
   transition: all 175ms cubic-bezier(0, 0, 1, 1);
}

button.big-button::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $buttonC;
  border-radius: inherit;
    box-shadow: 0 0 0 0px $buttonB, 0 0.75em 0 0 $buttonA;
 transform: translate3d(0, 0.75em, -1em);
  transition: all 175ms cubic-bezier(0, 0, 1, 1);
}


button.big-button:hover {
  transform: translate(0, 0.375em);
}

button.big-button:hover::before {
  transform: translate3d(0, 0.75em, -1em);
}

button.big-button:active {
   transform: translate(0em, 0.75em);
}

button.big-button:active::before {
  transform: translate3d(0, 0, -1em);
  box-shadow: 0 0 0 1px $buttonB, 0 0.25em 0 0 $buttonB;

}

//spinning text
.spinner {
  position: absolute; //make them all overlap 
  font-size: 6vw;
  z-index: 0;
}

.spinner.spin {
  animation: spin 4s linear 1, opaqueness 7s linear forwards;
}

#spin-container {
  position: relative;
  display:grid;
  place-items: center;
  height: 100px;
  margin-top: 5vh;
  margin-bottom: 50px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  } 100% {
    transform: rotate(360deg);
    animation-fill-mode: forwards;
  }
}

@keyframes opaqueness {
  0% {
    opacity: 0.3;
  } 50% {
    opacity: 0.1;
    } 60% {
    opacity: 0.3;
  } 100% {
    opacity: 0.6;
  }
}

$base-color: #ffccb7;

@for $i from 1 through 50 {
  $angle: $i * 2500/100;
  $this-color: adjust-hue($base-color, $angle);

  .spin:nth-child(#{$i}n) {
    animation-delay: (0.05 + $i) * 0.15s;
    color: $this-color;
  }
}
</style>