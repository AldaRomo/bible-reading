import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,Modal,Alert,TouchableHighlight,Platform,TextInput,FlatList,ScrollView,Switch, Button
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from '../leftmenu/Menu';
import { CheckBox,Icon } from 'react-native-elements';
import * as Progress from 'react-native-progress';
//import Icon from 'react-native-vector-icons/FontAwesome';

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
function realTrack(T) { 
    return T.key === 0;
}

const Both = [
    
        {
          name: 'Genesis',
          id: 10,
          chapters: 50,
        },
        {
          name: 'Exodus',
          id: 11,
          chapters: 40,
        },
        {
          name: 'Leveticus',
          id: 12,
          chapters: 27,
        },
        {
          name: 'Numbers',
          id: 13,
          chapters: 36,
        },
        {
          name: 'Deuteronomy',
          id: 14,
          chapters: 34,
        },
      
    
          {
            name: 'Joshua',
            id: 15,
            chapters: 24,
          },
          {
            name: 'Judges',
            id: 16,
            chapters: 21,
          },
          {
            name: 'Ruth',
            id: 17,
            chapters: 4,
          },
          {
            name: '1 Samuel',
            id: 18,
            chapters: 31,
          },
          {
            name: '2 Samuel',
            id: 19,
            chapters: 24,
          },
          {
            name: '1 Kings',
            id: 20,
            chapters: 22,
          },
          {
            name: '2 Kings',
            id: 21,
            chapters: 25,
          },
          {
            name: '1 Chronicles',
            id: 22,
            chapters: 29,
          },
          {
            name: '2 Chronicles',
            id: 23,
            chapters: 36,
          },
          {
            name: 'Ezra',
            id: 24,
            chapters: 10,
          },
          {
            name: 'Nehemiah',
            id: 25,
            chapters: 13,
          },
          {
            name: 'Esther',
            id: 26,
            chapters: 10,
          },
      
    
        {
          name: 'job',
          id: 27,
          chapters: 42,
        },
        {
          name: 'Psalms',
          id: 28,
          chapters: 150,
        },
        {
          name: 'Proverbs',
          id: 29,
          chapters: 31,
        },
        {
          name: 'Ecclesiastes',
          id: 30,
          chapters: 12,
        },
        {
          name: 'Song of Solomon',
          id: 31,
          chapters: 8,
        },
      
    
        {
          name: 'Isaiah',
          id: 32,
          chapters: 66,
        },
        {
          name: 'Jeremiah',
          id: 33,
          chapters: 52,
        },
        {
          name: 'Lamentations',
          id: 34,
          chapters: 5,
        },
        {
          name: 'Ezekiel',
          id: 35,
          chapters: 48,
        },
        {
          name: 'Daniel',
          id: 36,
          chapters: 12,
        },
     
    
          {
            name: 'Hosea',
            id: 37,
            chapters: 14,
          },
          {
            name: 'Joel',
            id: 38,
            chapters: 3,
          },
          {
            name: 'Amos',
            id: 39,
            chapters: 9,
          },
          {
            name: 'Obadaiah',
            id: 40,
            chapters: 1,
          },
          {
            name: 'Jonah',
            id: 41,
            chapters: 4,
          },
          {
            name: 'Micah',
            id: 42,
            chapters: 7,
          },
          {
            name: 'Nahum',
            id: 43,
            chapters: 3,
          },
          {
            name: 'Habakkuk',
            id: 44,
            chapters: 3,
          },
          {
            name: 'Zephaniah',
            id: 45,
            chapters: 3,
          },
          {
            name: 'Haggai',
            id: 46,
            chapters: 2,
          },
          {
            name: 'Zechariah',
            id: 47,
            chapters: 14,
          },
          {
            name: 'Malachi',
            id: 48,
            chapters: 4,
          },
      
    
        {
          name: 'Matthew',
          id: 49,
          chapters: 28,
        },
        {
          name: 'Mark',
          id: 50,
          chapters: 16,
        },
        {
          name: 'Luke',
          id: 51,
          chapters: 24,
        },
        {
          name: 'John',
          id: 52,
          chapters: 21,
        },
        
    
          {
            name: 'Acts',
            id: 53,
            chapters: 28,
          },
      
    
        {
          name: 'Romans',
          id: 54,
          chapters: 16,
        },
        {
          name: '1 Corinthians',
          id: 55,
          chapters: 16,
        },
        {
          name: '2 Corinthians',
          id: 56,
          chapters: 13,
        },
        {
          name: 'Galatians',
          id: 57,
          chapters: 6,
        },
        {
          name: 'Ephesians',
          id: 58,
          chapters: 6,
        },
        {
          name: 'Philippians',
          id: 59,
          chapters: 4,
        },
        {
          name: 'Colossians',
          id: 60,
          chapters: 4,
        },
        {
          name: '1 Thessalonians',
          id: 61,
          chapters: 5,
        },
        {
          name: '2 Thessalonians',
          id: 62,
          chapters: 3,
        },
        {
          name: '1 Timothy',
          id: 63,
          chapters: 6,
        },
        {
          name: '2 Timothy',
          id: 64,
          chapters: 4,
        },
        {
          name: 'Titus',
          id: 65,
          chapters: 3,
        },
        {
          name: 'Philemon',
          id: 66,
          chapters: 1,
        },
      
    
        {
          name: 'Hebrews',
          id: 67,
          chapters: 13,
        },
        {
          name: 'James',
          id: 68,
          chapters: 5,
        },
        {
          name: '1 Peter',
          id: 69,
          chapters: 5,
        },
        {
          name: '2 Peter',
          id: 70,
          chapters: 3,
        },
        {
          name: '1 John',
          id: 71,
          chapters: 5,
        },
        {
          name: '2 John',
          id: 72,
          chapters: 1,
        },
        {
          name: '3 John',
          id: 73,
          chapters: 1,
        },
        {
          name: 'Jude',
          id: 74,
          chapters: 1,
        },
      
    
          {
            name: 'Revelation',
            id: 75,
            chapters: 22,
          },
     
  
  ];



export default class track extends Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'none',
      modalVisible: false,
      track:[],
      percentaje:0,
      getid:'',
      chapters:[],
      booksList:[],
      NewTrack:[],
      switch:false,
      checkboxes: [{
        id: 1,
        keyBook:1,
        checked: false,
      }, {
        keyBook:1,
        id: 2,
        checked: false,
      }],

      
    };
    
  }

  toggleCheckbox(id) { 
    let changedCheckbox = this.state.checkboxes.find((cb) => cb.id === id);
    console.log(changedCheckbox);
    changedCheckbox._checked = !changedCheckbox._checked;
    console.log(changedCheckbox._checked);
      let chkboxes = this.state.checkboxes;
       for (let i=0; i < chkboxes.length; i++) { 
           if (chkboxes[i].id === id) {
                chkboxes.splice(i, 1, changedCheckbox);
             }; 
            }; 
            console.log(chkboxes);
            this.setState({ checkboxes: chkboxes, }); 
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
        AsyncStorage.getItem("TASKS", (err, tasks) =>
          this.setState({ track: JSON.parse(tasks)  || []})
          
        );
        AsyncStorage.getItem("Dark", (err, state) =>{
            this.setState({ switch: JSON.parse(state)  })
            console.log("hell");
            console.log(JSON.parse(state));}
          );
        
        
      };

      addTask = () => {
        
      
    
       
          const arrayData= [];
          const data = {
            
            
    
          }
          arrayData.push(data);
          try{
            AsyncStorage.getItem('TASKS').then((value) => {
                if(value !== null){
                  const  d = JSON.parse(value);
                  d.push(data);
                  AsyncStorage.setItem('TASKS', JSON.stringify(d))
                  console.log(d);
                  
    
                }else{
                  AsyncStorage.setItem('TASKS', JSON.stringify(arrayData))
                  
                }
    
            })
            
    
          }catch(err){
              console.log(err);
          }
          AsyncStorage.getItem("TASKS", (err, tasks) => {
          this.setState({ task: JSON.parse(tasks)  || []}), console.log(this.state.task)}
          
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
    //console.log(this.state.selectedItems);
    const id= this.props.navigation.state.params.id;
    console.log(id);
    var per=0;
    var por=0;
    if(this.state.selectedItem == 'plans'){
      
      navigate('HomePage');
      this.setState({selectedItem: 'none'})
      console.log("done");

    }
    if(this.state.selectedItem == 'settings'){
      
        navigate('SettingsPage');
        this.setState({selectedItem: 'none'})
        console.log("done");
  
      }
      var arre='';
      
      var BooksList =[];
      var arraySelected =this.state.track.filter(function (item) { return item.key === id})
      //console.log(this.state.track.filter(function (item) { return item.key === 1}));
     
      var trackname='';
      var  capitulos =[];
      const booksid= arraySelected.map(book =>   {arre= book.Books, trackname=book.planName, capitulos=book.chapter});
       
      
    
      
      for(var i=0;i< arre.length;i++){
          var idB= arre[i];
            
          
          BooksList.push(Both.find(function (item) { return item.id === idB}));
          //console.log(OBJboOK);
          

      }
      const OBJboOK=Object.values(BooksList)
      
      if(this.state.chapters.length < 1){
      /*for(var i=0;i< BooksList.length;i++){
          var key='';
          var auxi= BooksList.map(keyR => key=keyR.chapters);
          for(var j=0;j<auxi[i];j++){
              const data ={
                  idTrack:id,
                  id: this.state.chapters.length,
                  keyBook: arre[i],
                  checked: false,

              }
                this.state.chapters.push(data);
          }


      }*/ this.state.chapters= capitulos
        }
        //console.log(capitulos)
        
        
      var porCheck= this.state.chapters.filter(function (item) { return item.checked === true});
       per =  (porCheck.length / (this.state.chapters.length))
      if (per > 0){
            
          
          por=per;
      console.log(this.state.percentaje)
      }


      
      //console.log(per);

      console.log(this.state.NewTrack);
      //console.log(this.state.chapters);


      
      
      
    

    return (
      
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        
        <View style={{backgroundColor: colorSecond,
    width: window.innerWidth,
    alignItems: 'center',
    height: 80 }}>
    <Text style={{position:'absolute', flex:0, marginLeft:120,marginTop:37,fontSize: 24,textAlign: 'center',}}>{trackname}</Text>
        </View>
        
        <View style={{flex: 1, backgroundColor: colorPrincipal,}}>
        
        <FlatList
          style={styles.list}
          data={OBJboOK}
          renderItem={({ item}) =>
                <View>
                <View style={styles.listItemCont}>
                <View style={{borderBottomColor: colorSecond,borderBottomWidth: 1,marginLeft:10,marginRight:10}}/>
                    <Text style={{ marginLeft:10,fontSize:25, color: colorText}}>{item.name}</Text>
                    <View style={{borderBottomColor: colorSecond,borderBottomWidth: 1,marginLeft:10,marginRight:10}}/>
                    <View style ={{flexDirection:"row",flexWrap:"wrap"}}> 
                   {  this.state.chapters.map(cb => {if(item.id == cb.keyBook){
      return (
        <CheckBox
          key={cb.id}
          checked={cb.checked}
          checkedIcon={<Icon
            name="checkbox-blank-circle"
            type="material-community"
            size={30}
            color="#1e90ff"
            
          />}
          uncheckedIcon={<Icon
            name="checkbox-blank-circle-outline"
            type="material-community"
            size={30}
            color="#1e90ff"
          />}
          onPress={() => {let changedCheckbox = this.state.chapters.find((cd) => cd.id === cb.id);
            
            changedCheckbox.checked = !changedCheckbox.checked;
            
              let chkboxes = this.state.chapters;
               for (let i=0; i < chkboxes.length; i++) { 
                   if (chkboxes[i].id === cb.id) {
                        chkboxes.splice(i, 1, changedCheckbox);
                     }; 
                    }; 
                    this.setState({ chapters: chkboxes, });
                
                    let trackcheck = this.state.track.find(function (item) { return item.key === id})
                    var porCheck= chkboxes.filter(function (item) { return item.checked === true});
                    var p =  (porCheck.length / (this.state.chapters.length));
                   trackcheck.chapter = chkboxes;
                    trackcheck.trackPercent= p;
                    console.log(trackcheck.por)
                    
                    
                      let chk = this.state.track;
                       for (let i=0; i < chk.length; i++) { 
                           if (chk[i].id === id) {
                                chk.splice(i, 1, trackcheck);
                             }; 
                            }; 
                            this.state.NewTrack=chk;
                            AsyncStorage.setItem('TASKS', JSON.stringify(this.state.NewTrack));
                            
                
                
                }  }/>
          )}
        })}
    </View>
                    
                </View>
                <View style={styles.hr} />
                </View>
            }
            

            ListEmptyComponent={
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text style={{color: colorText}}>Oops! You don't have any plans</Text>
                </View>
            }
        />

        
            
        
  <View><Progress.Bar progress={por} color="#1e90ff" width={340} height={30}  marginTop={10} marginBottom={10} marginLeft={10} ><Text style={{position:'absolute', flex:0, marginLeft:140,fontSize:19,color:colorText}}>{((per*100).toFixed(2))+"%"}</Text></Progress.Bar></View>
          
          
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

