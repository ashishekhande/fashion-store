export const fetch = (url, params) => {
  return;
  // Where we're fetching data from
  return fetch(`${url}`)
    // We get the API response and receive data in JSON format...
    .then(response => response.json())
    // ...then we update the users state
    // .then(data =>
    //   // this.setState({
    //   //   users: data,
    //   //   isLoading: false,
    //   // })
    // )
    // Catch any errors we hit and update the app
    .catch(error => this.setState({ error, isLoading: false }));
}
