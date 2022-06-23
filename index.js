// const axios = require("axios");

// const options = {
//   method: 'GET',
//   url: 'https://covid-193.p.rapidapi.com/history',
//   params: {country: 'usa', day: '2020-06-02'},
//   headers: {
//     'X-RapidAPI-Key': '0cafad852emsh8b237feb987e86ep1d2bb7jsnc8d733f6f3d2',
//     'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

const activeCases = document.getElementById("total-active");
const newCases = document.getElementById("total-new");
const totalCases = document.getElementById("total-cases");
const recoveredCases = document.getElementById("total-recovered");
const totalTested = document.getElementById("total-tested");
const deathCases = document.getElementById("total-death");

const submit = document.getElementById("search-button");
const inputData = document.getElementById("search-bar");
submit.addEventListener("click", getData);

async function getData() {
  const date = new Date();
  const today = date.toISOString().slice(0, 10);

  const url = `https://covid-193.p.rapidapi.com/history?country=${inputData.value}&day=${today}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0cafad852emsh8b237feb987e86ep1d2bb7jsnc8d733f6f3d2",
      "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();

  if (data.response.length) {
    activeCases.innerHTML = data.response[0].cases.active;
    newCases.innerHTML = data.response[0].cases.new
      ? data.response[0].cases.new
      : 0;
    recoveredCases.innerHTML = data.response[0].cases.recovered;
    deathCases.innerHTML = data.response[0].deaths.total;
    totalCases.innerHTML = data.response[0].cases.total;
    totalTested.innerHTML = data.response[0].tests.total;
  } else {
    activeCases.innerHTML = 0;
    newCases.innerHTML = 0;
    recoveredCases.innerHTML = 0;
    deathCases.innerHTML = 0;
    totalCases.innerHTML = 0;
    totalTested.innerHTML = 0;
  }
}

// getData();
// console.log(data.response[0], "<<<< data");
