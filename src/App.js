import React, { useState, useEffect } from "react";
// import axios from 'axios';

function App() {
  const [data, setData] = useState();
  // const [query, setQuery] = useState('react');

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const res = await fetch("https://api.spacexdata.com/v3/launches/past");
      const json = await res.json();
      console.log(json);

      const filteredByYear = json.filter(
        launch => launch.launch_year === "2018"
      )

      console.log("look here", filteredByYear);

      const filterTree = (launches, find) => {
        return launches.reduce(function(acc, launch) {
          const payloads = launch.rocket.second_stage.payloads.reduce(function(
            acc,
            cat
          ) {
            const customers = cat.customers.filter(ind => ind.includes(find));
            return !customers.length
              ? acc
              : acc.concat(Object.assign({}, cat, { customers }));
          },
          []);
          return !payloads.length
            ? acc
            : acc.concat(Object.assign({}, launch, { payloads }));
        }, []);
      }

      const filteredByCustomer = filterTree(filteredByYear, 'NASA')

      console.log('filter by customer', filteredByCustomer)

      // sort them by inverse chronology


      const sortedByUtc = filteredByCustomer.sort((a,b)=>{
        return new Date(b.launch_date_utc) - new Date(a.launch_date_utc);
      })

      console.log('sorted by utc', sortedByUtc)

      // sort them by payload

      const sortedByPayload = sortedByUtc.sort(function(a, b){
        return b.rocket.second_stage.payloads.length - a.rocket.second_stage.payloads.length
      })

      console.log('sortedbypayload', sortedByPayload)

      const finalObj = (({ a, c }) => ({ a, c }))(object);
      // const filteredByCustomer = filteredByYear.filter((item) => item.rocket.second_stage.payloads.filter((load) => load.customer.includes("NASA"))


      setData(sortedByPayload);
    }
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="App">
      <pre>{data ? JSON.stringify(data, null, 2) : "loading ... "}</pre>
      {/* data
        ? data.map(item => (
            <li key={item.flight_number}>
              flight number:{item.flight_number} | mission name:{" "}
              {item.mission_name} | payload count: {item.rocket.second_stage.payloads.length} | {item.launch_date_utc}
            </li>
          ))
        : "loading..." */}
      hi
    </div>
  );
}

export default App;
