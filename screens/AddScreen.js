import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';

import AddJobTab from './sub/AddJobTab';
import AddCompanyTab from './sub/AddCompanyTab';

export default class AddScreen extends Component {
  render() {
    return (
      <Container>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: 'white' }}>
          <Tab heading="Job" activeTabStyle={{ backgroundColor: '#097392' }} tabStyle={{ backgroundColor: '#097392' }}>
            <AddJobTab />
          </Tab>
          <Tab heading="Company" activeTabStyle={{ backgroundColor: '#097392' }} tabStyle={{ backgroundColor: '#097392' }}>
            <AddCompanyTab />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}