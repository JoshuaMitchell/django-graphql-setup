import React, { Component } from "react";
import { Routes } from "./routes";
import Typography from '@material-ui/core/Typography';



class App extends Component {
  render(){
    return (
      <div>
        <header>
          <Typography variant="display2" gutterBottom>
              Django GraphQL!
          </Typography>

        </header>


        <main>

            {Routes()}

        </main>

        <footer>
          <Typography variant="display1" gutterBottom>
               Thanks for checking it out!
          </Typography>
        </footer>

      </div>
    )
  }
}


export default App;
