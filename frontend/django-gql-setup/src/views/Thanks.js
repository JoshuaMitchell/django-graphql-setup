import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";




class Thanks extends Component {
  render(){
    return (
      <div>
      <Grid container spacing={24} justify="center">
      <Grid item xs={6} sm={3}>

      <Paper elevation={1} className="pad">

        <Typography variant="display1" gutterBottom>
           Thanks for signing the petition!
         </Typography>


      </Paper>
    </Grid>
  </Grid>
</div>
    )
  }
}



export default withRouter(Thanks);
