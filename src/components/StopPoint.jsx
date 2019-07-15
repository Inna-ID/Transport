import React, { Component } from 'react';
import { fetchGetData } from '../utils.js';
import PropTypes from 'prop-types';
///material ui
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = theme => ({
   paper: {
      padding: '10px 20px'
   }
});

class StopPoint extends Component {
   constructor(props) {
      super(props)
      this.state = {
         arrivalsData: []
      }
      fetchGetData(`/StopPoint/${this.props.match.params.stop_id}/Arrivals`, this.successGetData, this.errorGetData)
   }

   successGetData = (response) => {
      this.setState({
         arrivalsData: response
      })
   }

   errorGetData = (error) => {
      var errorText = JSON.stringify(error);
      console.log(`error: ${errorText}`);
   }
   formatAMPM = (date) => {
      var hours = date.getUTCHours() + 1;
      var minutes = date.getUTCMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
   }
   goBack = () => {
      this.props.history.goBack();
   }

   render() {
      const { classes } = this.props;
      return (
         <>
            <Button variant="outlined" onClick={this.goBack}>
            Go back
            </Button>
            <ul className="transport-list">
               <h1>{this.state.arrivalsData.stationName}</h1>
               {(this.state.arrivalsData.length) ? this.state.arrivalsData.map((elem, index) =>
                  <li>
                  <Paper className={classes.paper}>
                     <h1>{elem.stationName}</h1>
                     <p>Line name: <span>{elem.lineName}</span></p>
                     <p>Platform name: <span>{elem.platformName}</span></p>
                     <p>Destination is: <span>{elem.destinationName}</span></p>
                     <p>Arrival time: <span>{this.formatAMPM(new Date(elem.expectedArrival))}</span></p>
                     <p>Time to arrival: <span>{`< ${Math.ceil(elem.timeToStation / 60)} min`}</span></p>
                     <p>Vehicle: <span>{elem.modeName}</span></p>
                  </Paper>
                  </li>
               ) : <p>No data</p>}
            </ul>
         </>
      )
   }
}
StopPoint.propTypes = {
   classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(StopPoint);
