import Page from 'material-ui-shell/lib/containers/Page'
import React, { useState } from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useIntl } from 'react-intl'
import Button from '@material-ui/core/Button';

const HomePage = () => {
  const [api_data, setState] = useState(null);

  const intl = useIntl(),
  callHello = async () => {
    const response = await fetch('/hello');
    const body = response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }

    return body
  },
  callAPIMenu = async () => {
    const response = await fetch('/api/menus/6f0ae6f2-f8f1-4cef-8836-59821cd8d0a7');
    const body = response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }

    return body
  },
  testDoorbell = async () => {
    const response = await fetch('/doorbell');
    const body = response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }

    return body
  }

  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })}>
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        {intl.formatMessage({ id: 'home' })}
        <Button variant="contained" color="primary" onClick={
          () => {
            callAPIMenu()
            .then(res => {
               var today = new Date();
              var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
              var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              var dateTime = date+'_'+time;

              setState(res.data.id + ' at ' + dateTime)

            })
            .catch(err => console.log(err));
            }
          }
          >Get Menus</Button>

          <Button variant="contained" color="secondary" onClick={
          () => {
            callHello()
            .then(res => {
                         setState(res.express)
            })
            .catch(err => console.log(err));

          }
          }
          >Ping Express</Button>

          <Button variant="contained" color="secondary" onClick={
              () => {
                testDoorbell()
                .then(res => {                
                  setState(res.doorbell)
                })
                .catch(err => console.log(err));
              }
          }
          >Test Doorbell</Button>

          <p>{
            api_data
          }</p>

      </Scrollbar>

    </Page>
  )
}
export default HomePage
