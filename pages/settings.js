import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,Modal,Alert,TouchableHighlight,Platform,TextInput,FlatList,ScrollView,Switch,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from '../leftmenu/Menu';
import { ListItem,Icon } from 'react-native-elements';

import {AsyncStorage} from 'react-native';

const image = require('../assets/menu.png');

const styles = StyleSheet.create({
  button: {

    position: 'absolute',
    top: 27,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
   // justifyContent: 'center',
   // alignItems: 'center',
    backgroundColor: '#ffff',
  },
  containerTop: {
    //flex: 0,
    backgroundColor: '#f0f1eb',
    width: window.innerWidth,
   // justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  containerText: {
    //flex: 0,
    backgroundColor: '#ffff',
    width: window.innerWidth,
   // justifyContent: 'center',
   // alignItems: 'center',
    height: 40
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const list = [
    {
      title: 'Share app',
      icon: 'share-alt'
    },
    {
      title: 'Rate on the store',
      icon: 'star'
    },
    {
        title: 'Donate',
        icon: 'paypal'
      },
      {
        title: 'More apps',
        icon: 'mobile'
      },
    
    
  ];


export default class settings extends Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'settings',
      modalVisible: false,
      switch:false,
      
    };
    
  }



  toggleSwitch = (value) => {
    if(this.state.switch == true){
        AsyncStorage.setItem("Dark", "false");
        console.log(this.state.switch);
        console.log("here in true");
    }else{
        AsyncStorage.setItem("Dark", "true");
        console.log(this.state.switch);
        console.log("here in false");

    }
    this.setState({switch: value})
    //console.log(this.state.switch);

    
    
    
    
 }
  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }

  

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

    componentDidMount() {
        AsyncStorage.getItem("Dark", (err, state) =>{
      this.setState({ switch: JSON.parse(state)  })
      console.log("hell");
      console.log(JSON.parse(state));}
    );
    
    
    };

  render() {
    
    
    
    let colorPrincipal='#ffffff';
    let colorSecond='#f0f1eb';
    let colorText= '#2f2f2f';
    if(this.state.switch== false){
         colorPrincipal='#ffffff';
    colorSecond='#f0f1eb';
   colorText= '#2f2f2f';
    }else{
         colorPrincipal='#2f2f2f';
    colorSecond='#696969';
    colorText= '#DCDCDC';
    }
    
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    const { navigate } = this.props.navigation;
    if(this.state.selectedItem == 'plans'){
      
      navigate('HomePage');
      this.setState({selectedItem: 'settings'})
      console.log("done");

    }
    

    return (
      
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        
        <View style={{backgroundColor: colorSecond,
    width: window.innerWidth, alignItems: 'center',
    height: 80}}>
        <Text style={{position:'absolute', flex:0, marginLeft:120,marginTop:37,fontSize: 24,textAlign: 'center', color: colorText}}>Settings</Text>
        </View>
        
        
        <View style={{flex: 1, backgroundColor: colorPrincipal,}}>
        <View style={{marginBottom: 0}}>
            {
                list.map((item, i) => (
                <ListItem
                    key={i}
                    title={item.title}
                    containerStyle={{backgroundColor: colorPrincipal}}
                    titleStyle={{color: colorText}}
                    leftIcon={{ name: item.icon, type:"font-awesome", color:"#808080" }}
                    bottomDivider
                    chevron
                />
                ))
            }
            </View>
            <View style={{borderBottomColor: colorSecond,borderBottomWidth: 30,margintop:80}}/>
            
            <View style={{flexDirection: 'row', marginTop:20,marginLeft: 10}}>
           < Icon
            name="adjust"
            type="font-awesome"
            size={25}
            color="#808080"
            
          />
            <Text style={{ marginLeft:20,fontSize: 17, color: colorText}}>Dark mode</Text>
            <Switch
                style={{marginRight:10,marginLeft:160}}
                onValueChange = {this.toggleSwitch}
                value = {this.state.switch}
                thumbColor={'#1e90ff'}/>
            </View>
            <View style={{borderBottomColor: colorSecond,borderBottomWidth: 1}}/>

          
          
        </View>

        
        
        
        <TouchableOpacity
          onPress={this.toggle}
          style={styles.button}
        >
          
          <Image
            source={image}
            style={{ width: 32, height: 32 }}
          />
          
        </TouchableOpacity>
        
      </SideMenu>
    );
  }
}