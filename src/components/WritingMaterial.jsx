import React from "react";

export default class WritingMaterial extends React.Component {
  constructor() {
    super();
    this.state = {
      texts: []
    };
  }

  componentDidMount() {
    this.initGapi();
  }

  render() {
    return (
      <div>
        <h2>Writing Material</h2>
        { this.state.texts.length > 0 && 
          this.state.texts.map((text, idx) => 
          <p key={idx} onClick={() => this.props.handleTextSelection(text)}>{text}</p>
        )}
        <button onClick={this.handleAuthClick}>Sign in Google</button>
      </div>
    );
  }

  handleAuthClick = (_) => {
    gapi.auth2.getAuthInstance().signIn();
  }

  // ref: https://gist.github.com/mikecrittenden/28fe4877ddabff65f589311fd5f8655c
  // initialize google client, hacky, but keeps the logic all in here,
  // instead of adding it in index.html
  initGapi = () => {
    console.log('Initializing GAPI...');
    console.log('Creating the google script tag...');

    const script = document.createElement("script");
    script.onload = () => {
      console.log('Loaded script, now loading our api...')
      // Gapi isn't available immediately so we have to wait until it is to use gapi.
      this.loadClientWhenGapiReady(script);
    };
    script.src = "https://apis.google.com/js/client.js";
    
    document.body.appendChild(script);
  }

  loadClientWhenGapiReady = (script) => {
    console.log('Trying To Load Client');
    if(script.getAttribute('gapi_processed')){
      console.log('Client is ready. Now you can access gapi. :)');
      gapi.load('client:auth2', this.initClient);
    } else{
      console.log('Client wasn\'t ready, trying again in 100ms');
      setTimeout(() => {this.loadClientWhenGapiReady(script)}, 100);
    }
  }

  initClient = () => {
    gapi.client.init({
      // apiKey: "AIzaSyAJ4gob1Kicr8LeNOUaole1bhBGihKUMQM",
      clientId: "981519938212-ua9b7c33d7n5ahr8ub94hefh2bnoav8v.apps.googleusercontent.com",
      scope: "https://www.googleapis.com/auth/documents.readonly"
    }).then(() => {
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
      // Handle the initial sign-in state.
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  updateSigninStatus = (isSignedIn) => {
    const documentId = "YOUR_DOCUMENTID";
    if (isSignedIn) {
      return gapi.client.request({
        path: `https://docs.googleapis.com/v1/documents/${documentId}`,
      }).then((response) => {
        console.log(response.result);
        const texts = response.result.body.content
          .filter(content => !!content.paragraph)
          .filter(content => content.paragraph.elements[0].textRun.content.length > 1)
          .map(content => content.paragraph.elements[0].textRun.content.trim());
        this.setState({
          texts
        });
      }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
      });
    }
  }
}