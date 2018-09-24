import React, { Component } from "react";
import { Query }  from "react-apollo";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import gql from "graphql-tag";
import {Loading, Error} from './helpers';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";


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

class Home extends Component {
  render(){
    return (
      <div>
      <Grid container spacing={24} justify="center">
      <Grid item xs={6} sm={3}>

      <Paper elevation={1} className="pad">

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
}



export default withRouter(Home);
