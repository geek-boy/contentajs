import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useIntl } from 'react-intl'
import Button from '@material-ui/core/Button';

// class App extends Component {

const HomePage = () => {
  const intl = useIntl(),
  callAPIMenu = async () => {
    const response = await fetch('/hello');
    // const body = await response.json();
console.log("OH Hello!")
console.log(response.body)

    if (response.status !== 200) {
      // throw Error(body.message) 
    }
    // return body;
    return response
  }

  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })}>
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        {intl.formatMessage({ id: 'home' })}
        <Button variant="contained" color="primary" onClick={
          () => {
            // callAPIMenu()
            // .then(res => {
            //   var today = new Date();
            //   var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            //   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            //   var dateTime = date+'_'+time;
            
            //   // this.setState({ data:'Menu id 0 ' + res.data[0]['id'] + ' at ' + dateTime })
            // })
            // .catch(err => console.log(err));

            // fetch('/hello')
            fetch('/api/menus/6f0ae6f2-f8f1-4cef-8836-59821cd8d0a7')
              .then(function(response) {
                // The response is a Response instance.
                // You parse the data into a useable format using `.json()`
                return response.json();
              }).then(function(data) {
                // `data` is the parsed version of the JSON returned from the above endpoint.
                console.log(data);  // { "userId": 1, "id": 1, "title": "...", "body": "..." }
              });
            }
          }
          >Get Menus</Button>
      </Scrollbar>

    </Page>
  )
}
export default HomePage
