import React, { Component } from 'react'
import { Container, Header, Content, Tabs, Tab } from 'native-base'

import AddJobTab from './sub/AddJobTab'
import AddCompanyTab from './sub/AddCompanyTab'

// import { TabNavigator } from 'react-navigation'

// const NavTab = TabNavigator({
//   Job: { screen: AddJobTab },
//   Company: { screen: AddCompanyTab },
// })

export default class AddScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fromTab: true,
    }
  }
  render() {
    return (
      <Container>
        {this.state.fromTab ? (
          <Tabs tabBarUnderlineStyle={{ backgroundColor: 'white' }}>
            <Tab
              heading="Job"
              activeTabStyle={{ backgroundColor: '#097392' }}
              tabStyle={{ backgroundColor: '#097392' }}>
              <AddJobTab />
            </Tab>
            <Tab
              heading="Company"
              activeTabStyle={{ backgroundColor: '#097392' }}
              tabStyle={{ backgroundColor: '#097392' }}>
              <AddCompanyTab />
            </Tab>
          </Tabs>
        ) : (
          <Tabs tabBarUnderlineStyle={{ backgroundColor: 'white' }}>
            <NavTab
              heading="Job"
              activeTabStyle={{ backgroundColor: '#097392' }}
              tabStyle={{ backgroundColor: '#097392' }}
              screenProps={{
                whereToGo: this.props.navigation.state.params.whereToGo,
              }}
            />
          </Tabs>
        )}
      </Container>
    )
  }
}
