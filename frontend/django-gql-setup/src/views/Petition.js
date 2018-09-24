import React, { Component } from "react";
import { Query, Mutation }  from "react-apollo";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import gql from "graphql-tag";
import {Loading, Error} from './helpers';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { map } from "lodash";
import Button from '@material-ui/core/Button';



const GET_PETITION = gql`
  query petition( $id: ID!){
    petition(id:$id){
      id
      headline
      pubDate
    }
  }
`;

const SIGN_PETITION = gql`
  mutation createPerson(
    $email: String!,
    $firstName: String!,
    $lastName: String!,
    $zipCode: String!,
    $petitionId: String!
  ) {
    createPerson(
      email:$email,
      firstName:$firstName,
      lastName:$lastName,
      zipCode: $zipCode,
      petitionId: $petitionId
    ) {
      ok
      person {
        id
        email
      }
    }
  }
`
class Petition extends Component {
    render(){
      console.log(this.props.match.params.id);
      return(
        <div>
        <Grid container spacing={24} justify="center">
        <Grid item xs={6} sm={3}>

        <Paper className="pad">

          <Typography variant="display1" gutterBottom>
             Sign the Petition!
           </Typography>
           <hr/>



          <Query query={GET_PETITION} variables={{id: this.props.match.params.id}}>
            {({ loading, error, data }) => {
          if(loading) return <Loading/>;
          if(error) return <Error/>;

          return (

            <div>
              <Typography variant="headline" gutterBottom>
                {data.petition.headline}
               </Typography>

               <Mutation mutation={SIGN_PETITION}>
                   {
                     create => (
                       <Formik
                         initialValues={{}}
                         validationSchema={Yup.object().shape({
                              firstName: Yup.string().required('Required'),
                              lastName: Yup.string().required('Required'),
                              email: Yup.string().required('Required'),
                              zipCode: Yup.string().required('Required'),

                    })}

                         onSubmit={(values, {setSubmitting, setErrors, resetFrom}) =>{
                           create({
                             variables: {
                               petitionId: this.props.match.params.id,
                               email: values.email,
                               firstName: values.firstName,
                               lastName: values.lastName,
                               zipCode: values.zipCode
                             }
                           })
                           .then(({data}) => {
                             setSubmitting(false);
                             this.props.history.push('/thanks');
                           })
                           .catch(error => {
                             setSubmitting(false);
                             const errors = ["Error"];
                             setErrors({form:errors})
                           })
                         }}
                         render={({
                           values,
                           errors,
                           touched,
                           handleChange,
                           handleBlur,
                           handleSubmit,
                           isSubmitting,
                         }) => (
                           <div>
                            <form onSubmit={handleSubmit} noValidate>
                              {map(errors.form, error => (
                                  <h2 key={error}> {error} </h2>
                              ))}
                              <div>
                              <TextField id="firstName" label="First Name" type="Text" fullWidth={true} placeholder="First Name" onChange={handleChange} onBlur={handleBlur} value={values.firstName} error={errors.firstName && touched.firstName} helperText={errors.firstName ? errors.firstName : " "} />
                              <TextField id="lastName" label="Last Name" type="Text" fullWidth={true} placeholder="Last Name" onChange={handleChange} onBlur={handleBlur} value={values.lastName} error={errors.lastName && touched.lastName} helperText={errors.lastName ? errors.lastName : " "} />
                              <TextField id="email" label="Email" type="Text" fullWidth={true} placeholder="Email" onChange={handleChange} onBlur={handleBlur} value={values.email} error={errors.email && touched.email} helperText={errors.email ? errors.email : " "} />
                              <TextField id="zipCode" label="Zip Code" type="Text" fullWidth={true} placeholder="Zip Code" onChange={handleChange} onBlur={handleBlur} value={values.zipCode} error={errors.zipCode && touched.zipCode} helperText={errors.zipCode ? errors.zipCode : " "} />

                            </div>
                            <div>
                              <br/><br/>
                              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                Sign
                              </Button>
                            </div>
                            </form>

                           </div>
                         )}
                       />
                     )
                   }
               </Mutation>
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


export default withRouter(Petition);
