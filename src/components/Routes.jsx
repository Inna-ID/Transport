import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { fetchGetData } from '../utils.js';
import PropTypes from 'prop-types';
///material ui
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class Routes extends Component {
   constructor(props) {
      super(props)
      this.state = {
         allRoutes: []
      }
      fetchGetData('/Line/Route', this.successGetData, this.errorGetData)
   }

   successGetData = (response) => {
      let busArr = [],
         tubeArr = [],
         overgroundArr = [],
         railArr = [],
         riverTourArr = [],
         riverBusArr = [],
         otherArr = [];

      response.forEach(function (item) {
         switch (item.modeName) {
            case 'bus': busArr.push(item); break;
            case 'tube': tubeArr.push(item); break;
            case 'overground': overgroundArr.push(item); break;
            case 'national-rail': railArr.push(item); break;
            case 'river-tour': riverTourArr.push(item); break;
            case 'river-bus': riverBusArr.push(item); break;
            default: otherArr.push(item); break;
         }

      })


      busArr.sort((a, b) => {
         if (!isNaN(a.name) && isNaN(b.name)) {
            return -1;
         }
         else if (isNaN(a.name) && !isNaN(b.name)) {
            return 1;
         }
         else if (!isNaN(a.name) && !isNaN(b.name)) {
            return parseInt(a.name) - parseInt(b.name);
         }
         else {
            let intANamePart = "", symbolANamePart = "",
               intBNamePart = "", symbolBNamePart = "";
            for (let value of a.name) {
               if (!isNaN(value)) {
                  intANamePart += value;
               } else {
                  symbolANamePart += value;
               }
            }
            for (let value of b.name) {
               if (!isNaN(value)) {
                  intBNamePart += value;
               } else {
                  symbolBNamePart += value;
               }
            }
            if (symbolANamePart > symbolBNamePart) {
               return 1;
            }
            else if (symbolANamePart < symbolBNamePart) {
               return -1;
            }
            else {
               return parseInt(intANamePart) - parseInt(intBNamePart);
            }
         }
      })
      let groupedRoutes = [];
      groupedRoutes.push({ type: 'Bus', typicalRoutes: busArr });
      groupedRoutes.push({ type: 'Tube', typicalRoutes: tubeArr });
      groupedRoutes.push({ type: 'Overground', typicalRoutes: overgroundArr });
      groupedRoutes.push({ type: 'National rail', typicalRoutes: railArr });
      groupedRoutes.push({ type: 'River tour', typicalRoutes: riverTourArr });
      groupedRoutes.push({ type: 'River bus', typicalRoutes: riverBusArr });
      groupedRoutes.push({ type: 'Other', typicalRoutes: otherArr });

      this.setState({
         allRoutes: groupedRoutes
      })
   }

   errorGetData = (error) => {
      var errorText = JSON.stringify(error);
      console.log(`error: ${errorText}`);
   }
   goBack = () => {
      this.props.history.goBack();
   }

   render() {
      return (
         <>
            <Button variant="outlined" onClick={this.goBack}>
               Go back
            </Button>
            <h1>Routes</h1>
            <div className="routes-list">
               {this.state.allRoutes.map((elem, index) => {
                  return (
                     <Paper className="routes-item">
                        <h2 key={index}>{elem.type}</h2>
                        {elem.typicalRoutes.map((el, i) => {
                           return (
                              <Link 
                                 to={{pathname:`/routes/${el.id}`,
                                    state: {routeInfo: el}
                              }} 
                                 key={i}>
                              <Button className='route' variant="outlined" color="primary">
                                 {el.name}
                              </Button>
                              </Link>
                           )
                        })}
                     </Paper>
                  );
               })}
            </div>
         </>
      )
   }
}

export default Routes;
