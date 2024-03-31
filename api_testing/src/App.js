import './App.css';
import React,{useState, useEffect} from "react";
import Table from "./component/table.jsx"

function App() {
  const url = "https://randomuser.me/api/?results=5";
  const [info, setInfo] = useState(null);
  const [data,setData] = useState(null);
  
  const fetchData = async ()=>{
    try{
      const response = await fetch(url);
      if (! response.ok){
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result.results);

    }
    catch(error){
      console.error('Error fetching data:', error.message);
    }

  };
  useEffect(()=>{
    fetchData();
  }, []);
  
  
  useEffect(()=>{
    if (data){
      const l = data.map( (element, index)=>{
        return (
          {  "id": index,
             "firstName": element.name["first"],
             "city": element.location["city"]
          }
        )
      })
      setInfo(l);
  }
  }, [data])

  function getEntry(e) {
    return (
      <Table
        key={e.id}
        first={e.firstName}
        city={e.city}
      />
    );
  }


  return (
    info ?(
    <>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">First Name</th>
      <th scope="col">City</th>
    </tr>
  </thead>
  <tbody>
  {info.map(getEntry)} 
  </tbody>
</table>

    </>

  ) : <></>
  );
}

export default App;
 