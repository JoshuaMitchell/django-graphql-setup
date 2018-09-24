import React, { Component } from "react";
import { Query }  from "react-apollo";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import gql from "graphql-tag";
import {Loading, Error} from './helpers';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },

  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },

});

const GET_PETITIONS = gql`
  {
    allPetitions {
      edges {
        node{
          id
          headline
        }
      }
    }
  }
`;

function Home(props) {
    const { classes } = props;

    return(
      <div className={classes.root}>
      <Grid container spacing={24} justify="center">
      <Grid item xs={6} sm={3}>

      <Paper className={classes.paper}>

        <Typography variant="display1" gutterBottom>
           Select a petition!
         </Typography>
         <hr/>



        <Query query={GET_PETITIONS}>
          {({ loading, error, data }) => {
        if(loading) return <Loading/>;
        if(error) return <Error/>;

        return (

          <div>
            {data.allPetitions.edges.map(petition => (

             <a href={petition.node.id}>
               <Typography variant="title" gutterBottom>
                  {petition.node.headline}
                </Typography>
             </a>

           ))}
          </div>

        );
}}


        </Query>
      </Paper>
    </Grid>
  </Grid>
</div>
    )

}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
