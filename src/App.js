import React, { useState, useEffect } from "react";
// import axios from 'axios';

function App() {
  const [data, setData] = useState();
  // const [query, setQuery] = useState('react');


  useEffect(() => {
    async function fetchData() {
      // You can await here
      const res = await fetch(
        "https://api.spacexdata.com/v3/launches/past"
      );
      const json = await res.json();
      console.log(json);
      setData(json);
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  const filteredLaunches = this.state.data.filter((item) => {item.launch_year === '2018'})

  // const filteredForYear =()=>{ return data.filter((launch) => {launch.launch_year === '2018'}) }
  // console.log(filteredForYear)

  return <div className="App">space x test</div>;
}

export default App;
