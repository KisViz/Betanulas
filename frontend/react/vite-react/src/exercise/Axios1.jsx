import axios from "axios";
import { Component } from "react";

const api = axios.create ({
  baseURL: 'https://jsonplaceholder.typicode.com//posts'
});

class Axios1 extends Component{
  
  constructor() {
    super();
    api.get('/').then(res => {
      console.log(res.data)
    })
  }

  render() {
    return(
      <>

      </>
    );
  }
}

export default Axios1
