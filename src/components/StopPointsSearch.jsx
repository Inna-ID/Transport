import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { fetchGetData } from '../utils.js';

class StopPointsSearch extends Component {
   constructor(props) {
      super(props)
      this.state = {
         stopPoints: []
      }
      this.searchInput = React.createRef();
   }

   successGetData = (response) => {
      var responseText = JSON.stringify(response, null, ' ');
      console.log(responseText);

      this.setState({
         stopPoints: response.matches
      })
   }

   errorGetData = (error) => {
      var errorText = JSON.stringify(error);
      console.log(errorText);
   }

   onSearch = () => {
      if (this.searchInput.current.value) {
         fetchGetData(`/StopPoint/Search/${this.searchInput.current.value}`, this.successGetData, this.errorGetData);
      } else {
         this.setState({
            stopPoints: []
         })
      }
   }

   render() {
      return (
         <>
            <h1>Search stop points</h1>
            <div className="search-stops">
               <input type="search" ref={this.searchInput} onChange={this.onSearch} placeholder="Enter station name..." />
            </div>
            <ul className="stop-points-list">
               {this.state.stopPoints.map((elem, index) =>
                  <li key={index}>
                     <Link to={`/stop_point/${elem.id}`}>
                        {`${elem.name}`}
                     </Link>
                  </li>
               )}
            </ul>
         </>
      )
   }
}

export default StopPointsSearch;
