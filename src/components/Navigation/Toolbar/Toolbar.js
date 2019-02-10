import React, { Component } from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

class Toolbar extends Component {

  state = {
    top: true
  }

  handleScroll = () => {
    const pos = window.pageYOffset || document.documentElement.scrollTop;
    if (pos === 0) {
      this.setState({top: true})
    } else {
      this.setState({top: false})
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }
  

  render() {
    return (
      <header className={this.state.top ? classes.Toolbar : [classes.Toolbar, classes.Filtered].join(' ')}>
        <DrawerToggle clicked={this.props.drawerToggleClicked} />
        <div className={classes.Logo} />
        <nav className={classes.DesktopOnly}>
          <NavigationItems />
        </nav>
      </header>
    );
  }
}

export default Toolbar;
