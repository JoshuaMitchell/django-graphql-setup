import React, {Component} from "react";
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';


export class Error extends Component {
  render() {
    return (
      <Typography variant="headline" gutterBottom>
        Uh oh.  Something went wrong.
      </Typography>
    )
  }
}


export class Loading extends Component {
  render() {
    return (
      <div>
        <Typography variant="headline" gutterBottom>
          Loading.
        </Typography>
        <CircularProgress size={50} />
    </div>
    )
  }
}
