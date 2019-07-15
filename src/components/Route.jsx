import React, { Component } from 'react';

class Route extends Component {
   constructor(props) {
      super(props)
      this.state = {
         routeInfo: this.props.location.state.routeInfo
      }
   }

   render() {
      const routeInfo = this.state.routeInfo;
      return (
         <>
            {routeInfo.routeSections.map((elem, index) =>
            <>
               <h1>{routeInfo.name} - {elem.name}</h1>
               <div className="route-directions" key={index}>
                  <p>direction: {elem.direction}</p>
                  <p>from: {elem.originationName}</p>
                  <p>to: {elem.destinationName}</p>
               </div>
               </>
            )}
         </>
      )
   }
}

export default Route;
