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
import { Button } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ColorPicker } from 'react-native-color-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from 'react-native-elements';
import {AsyncStorage} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { NavigationEvents } from 'react-navigation';


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
    backgroundColor: '#ffffff',
  },
  containerTop: {
    //flex: 0,
    backgroundColor: '#696969',
    width: window.innerWidth,
   // justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  containerText: {
    //flex: 0,
    backgroundColor: '#ffffff',
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
 // Libros de la biblia con id mas abajo aparecen con capitulos
const Both = [
  {
    name: 'Pentauch (or the law)',
    id: 0,
    
    children: [
      {
        name: 'Genesis',
        id: 10,
      },
      {
        name: 'Exodus',
        id: 11,
      },
      {
        name: 'Leveticus',
        id: 12,
      },
      {
        name: 'Numbers',
        id: 13,
      },
      {
        name: 'Deuteronomy',
        id: 14,
      },
    ],
  },
  {
    name: 'Historical Books',
    id: 1,

    children: [
        {
          name: 'Joshua',
          id: 15,
        },
        {
          name: 'Judges',
          id: 16,
        },
        {
          name: 'Ruth',
          id: 17,
        },
        {
          name: '1 Samuel',
          id: 18,
        },
        {
          name: '2 Samuel',
          id: 19,
        },
        {
          name: '1 Kings',
          id: 20,
        },
        {
          name: '2 Kings',
          id: 21,
        },
        {
          name: '1 Chronicles',
          id: 22,
        },
        {
          name: '2 Chronicles',
          id: 23,
        },
        {
          name: 'Ezra',
          id: 24,
        },
        {
          name: 'Nehemiah',
          id: 25,
        },
        {
          name: 'Esther',
          id: 26,
        },
    ],
  },
  {
    name: 'Books of Wisdom (or "Poetry")',
    id: 2,
    // these are the children or 'sub items'
    children: [
      {
        name: 'job',
        id: 27,
      },
      {
        name: 'Psalms',
        id: 28,
      },
      {
        name: 'Proverbs',
        id: 29,
      },
      {
        name: 'Ecclesiastes',
        id: 30,
      },
      {
        name: 'Song of Solomon',
        id: 31,
      },
    ],
  },
  {
    name: 'Major Prophets',
    id: 3,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Isaiah',
        id: 32,
      },
      {
        name: 'Jeremiah',
        id: 33,
      },
      {
        name: 'Lamentations',
        id: 34,
      },
      {
        name: 'Ezekiel',
        id: 35,
      },
      {
        name: 'Daniel',
        id: 36,
      },
    ],
  },
  {
    name: 'Minor Prophets',
    id: 4,

    children: [
        {
          name: 'Hosea',
          id: 37,
        },
        {
          name: 'Joel',
          id: 38,
        },
        {
          name: 'Amos',
          id: 39,
        },
        {
          name: 'Obadaiah',
          id: 40,
        },
        {
          name: 'Jonah',
          id: 41,
        },
        {
          name: 'Micah',
          id: 42,
        },
        {
          name: 'Nahum',
          id: 43,
        },
        {
          name: 'Habakkuk',
          id: 44,
        },
        {
          name: 'Zephaniah',
          id: 45,
        },
        {
          name: 'Haggai',
          id: 46,
        },
        {
          name: 'Zechariah',
          id: 47,
        },
        {
          name: 'Malachi',
          id: 48,
        },
    ],
  },
  {
    name: 'Gospels',
    id: 5,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Matthew',
        id: 49,
      },
      {
        name: 'Mark',
        id: 50,
      },
      {
        name: 'Luke',
        id: 51,
      },
      {
        name: 'John',
        id: 52,
      },
      
    ],
  },
  {
    name: 'History',
    id: 6,

    children: [
        {
          name: 'Acts',
          id: 53,
        },
    ],
  },
  {
    name: 'Pauline Epistles',
    id: 7,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Romans',
        id: 54,
      },
      {
        name: '1 Corinthians',
        id: 55,
      },
      {
        name: '2 Corinthians',
        id: 56,
      },
      {
        name: 'Galatians',
        id: 57,
      },
      {
        name: 'Ephesians',
        id: 58,
      },
      {
        name: 'Philippians',
        id: 59,
      },
      {
        name: 'Colossians',
        id: 60,
      },
      {
        name: '1 Thessalonians',
        id: 61,
      },
      {
        name: '2 Thessalonians',
        id: 62,
      },
      {
        name: '1 Timothy',
        id: 63,
      },
      {
        name: '2 Timothy',
        id: 64,
      },
      {
        name: 'Titus',
        id: 65,
      },
      {
        name: 'Philemon',
        id: 66,
      },
    ],
  },
  {
    name: 'General Epistles',
    id: 8,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Hebrews',
        id: 67,
      },
      {
        name: 'James',
        id: 68,
      },
      {
        name: '1 Peter',
        id: 69,
      },
      {
        name: '2 Peter',
        id: 70,
      },
      {
        name: '1 John',
        id: 71,
      },
      {
        name: '2 John',
        id: 72,
      },
      {
        name: '3 John',
        id: 73,
      },
      {
        name: 'Jude',
        id: 74,
      },
    ],
  },
  {
    name: 'Apocalyptic Writings (Prophecy)',
    id: 9,

    children: [
        {
          name: 'Revelation',
          id: 75,
        },
    ],
  },

];

const old = [
  // this is the parent or 'item'
  {
    name: 'Pentauch (or the law)',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Genesis',
        id: 10,
      },
      {
        name: 'Exodus',
        id: 11,
      },
      {
        name: 'Leveticus',
        id: 12,
      },
      {
        name: 'Numbers',
        id: 13,
      },
      {
        name: 'Deuteronomy',
        id: 14,
      },
    ],
  },
  {
    name: 'Historical Books',
    id: 1,

    children: [
        {
          name: 'Joshua',
          id: 15,
        },
        {
          name: 'Judges',
          id: 16,
        },
        {
          name: 'Ruth',
          id: 17,
        },
        {
          name: '1 Samuel',
          id: 18,
        },
        {
          name: '2 Samuel',
          id: 19,
        },
        {
          name: '1 Kings',
          id: 20,
        },
        {
          name: '2 Kings',
          id: 21,
        },
        {
          name: '1 Chronicles',
          id: 22,
        },
        {
          name: '2 Chronicles',
          id: 23,
        },
        {
          name: 'Ezra',
          id: 24,
        },
        {
          name: 'Nehemiah',
          id: 25,
        },
        {
          name: 'Esther',
          id: 26,
        },
    ],
  },
  {
    name: 'Books of Wisdom (or "Poetry")',
    id: 2,
    // these are the children or 'sub items'
    children: [
      {
        name: 'job',
        id: 27,
      },
      {
        name: 'Psalms',
        id: 28,
      },
      {
        name: 'Proverbs',
        id: 29,
      },
      {
        name: 'Ecclesiastes',
        id: 30,
      },
      {
        name: 'Song of Solomon',
        id: 31,
      },
    ],
  },
  {
    name: 'Major Prophets',
    id: 3,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Isaiah',
        id: 32,
      },
      {
        name: 'Jeremiah',
        id: 33,
      },
      {
        name: 'Lamentations',
        id: 34,
      },
      {
        name: 'Ezekiel',
        id: 35,
      },
      {
        name: 'Daniel',
        id: 36,
      },
    ],
  },
  {
    name: 'Minor Prophets',
    id: 4,

    children: [
        {
          name: 'Hosea',
          id: 37,
        },
        {
          name: 'Joel',
          id: 38,
        },
        {
          name: 'Amos',
          id: 39,
        },
        {
          name: 'Obadaiah',
          id: 40,
        },
        {
          name: 'Jonah',
          id: 41,
        },
        {
          name: 'Micah',
          id: 42,
        },
        {
          name: 'Nahum',
          id: 43,
        },
        {
          name: 'Habakkuk',
          id: 44,
        },
        {
          name: 'Zephaniah',
          id: 45,
        },
        {
          name: 'Haggai',
          id: 46,
        },
        {
          name: 'Zechariah',
          id: 47,
        },
        {
          name: 'Malachi',
          id: 48,
        },
    ],
  },
  

];

const newT = [
  // this is the parent or 'item'
  {
    name: 'Gospels',
    id: 5,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Matthew',
        id: 49,
      },
      {
        name: 'Mark',
        id: 50,
      },
      {
        name: 'Luke',
        id: 51,
      },
      {
        name: 'John',
        id: 52,
      },
      
    ],
  },
  {
    name: 'History',
    id: 6,

    children: [
        {
          name: 'Acts',
          id: 53,
        },
    ],
  },
  {
    name: 'Pauline Epistles',
    id: 7,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Romans',
        id: 54,
      },
      {
        name: '1 Corinthians',
        id: 55,
      },
      {
        name: '2 Corinthians',
        id: 56,
      },
      {
        name: 'Galatians',
        id: 57,
      },
      {
        name: 'Ephesians',
        id: 58,
      },
      {
        name: 'Philippians',
        id: 59,
      },
      {
        name: 'Colossians',
        id: 60,
      },
      {
        name: '1 Thessalonians',
        id: 61,
      },
      {
        name: '2 Thessalonians',
        id: 62,
      },
      {
        name: '1 Timothy',
        id: 63,
      },
      {
        name: '2 Timothy',
        id: 64,
      },
      {
        name: 'Titus',
        id: 65,
      },
      {
        name: 'Philemon',
        id: 66,
      },
    ],
  },
  {
    name: 'General Epistles',
    id: 8,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Hebrews',
        id: 67,
      },
      {
        name: 'James',
        id: 68,
      },
      {
        name: '1 Peter',
        id: 69,
      },
      {
        name: '2 Peter',
        id: 70,
      },
      {
        name: '1 John',
        id: 71,
      },
      {
        name: '2 John',
        id: 72,
      },
      {
        name: '3 John',
        id: 73,
      },
      {
        name: 'Jude',
        id: 74,
      },
    ],
  },
  {
    name: 'Apocalyptic Writings (Prophecy)',
    id: 9,

    children: [
        {
          name: 'Revelation',
          id: 75,
        },
    ],
  },
  

];


const BothBook = [
    
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


export default class home extends Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'plans',
      modalVisible: false,
      modalEdit:false,
      date: new Date(),
    mode: 'date',
    show: false,
    text: '',
    task: [],
    planName: '',
    switch:false,
    editName: '',
    chapters:[],
    indexfor:'',
    color: '#fff800',
    selectedItems: [],
    switchValueNewT:true,
    switchValueOldT:true,
    switchBothT:true,
    uniqueValue: 1,
    count: 0,
    force: false,
    };
    this.onColorChange = this.onColorChange.bind(this)
  }
  
  incrementCount = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  }

  //forzar reload
  forceRemount = () => {
    this.setState(({ uniqueValue }) => ({
      uniqueValue: uniqueValue + 1
    })
    )};
  //items de libros
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };
  //switch para libros
  toggleSwitchNew = (value) => {
    this.SectionedMultiSelect._removeAllItems()
    this.setState({switchValueNewT: value})
    
 }

 toggleSwitchOld = (value) => {
  this.SectionedMultiSelect._removeAllItems()
  
  this.setState({switchValueOldT: value})
  
}

toggleSwitchBoth = (value) => {
  
  this.setState({switchBothT: value})
  
}

showBooks(){
  
  if(this.state.switchValueNewT == true && this.state.switchValueOldT == false){
    return newT;

  }
  if(this.state.switchValueNewT == false && this.state.switchValueOldT == true){
    return old;

  }
  if(this.state.switchValueNewT == true && this.state.switchValueOldT == true){
    return Both;

  }
}

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });
  }

  setPlanname(planName){
    this.setState({planName})

  }

  setEditname(editName){
    this.setState({editName})

  }

  setRealDate(text){
    this.setState({text})

  }

  setColor = ( color) => {
    color = color || this.state.color;

    this.setState({
      color
    });
  }
  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }

  datepicker = () => {
    this.show('date');
  }

  timepicker = () => {
    this.show('time');
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setEditModalVisible(visible,id) {
    this.setState({modalEdit: visible});
    this.setState({indexfor: id});
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

   formatMonth(month){
     if(month<10){
      month="0"+month;
     }
      return month;
   } 

   formatDay( day){
    if(day<10){
      day="0"+day;
    }
    return day;

  }
  onColorChange(color) {
    this.setState({ color })
  }
  
  buttonPressed(){
    if(this.state.color  &&  this.state.text && this.state.planName){
      const arrayData= [];
      const data = {
        Title: this.state.planName,
        StartDate: this.state.text,
        Color: this.state.color,
        ReAdvance: 1,
        

      }
      arrayData.push(data);
      try{
        AsyncStorage.getItem('planReading').then((value) => {
            if(value !== null){
              const d = JSON.parse(value);
              d.push(data);
              AsyncStorage.setItem('planReading', JSON.stringify(d))
              console.log(this.state.color+"-"+this.state.text+"-"+this.state.planName+"-"+d.length.toString());
              console.log(JSON.stringify(arrayData)+"....."+JSON.stringify(arrayData));

            }else{
              AsyncStorage.setItem('planReading', JSON.stringify(arrayData))
              console.log(JSON.stringify(arrayData)+"....."+JSON.stringify(arrayData));
            }

        })

      }catch(err){
          console.log(err);
      }
      
      this.setModalVisible(false);
    }
    

  }

  changeTextHandler = text => {
    this.setState({ text: text });
  };
 // agregar nuevo plan
  addTask () {
    var arre=this.state.selectedItems;
      
      var BooksList =[];
      var chapter= [];
    let notEmpty = this.state.text.trim().length > 0;
    
   
    

    

              for(var i=0;i< arre.length;i++){
                var idB= arre[i];
                  
                
                BooksList.push(BothBook.find(function (item) { return item.id === idB}));
                //console.log(OBJboOK);
                
      
            }
            var uniqueKey = Math.floor(Math.random() * 100) + this.state.task.length ;
            for(var i=0;i< BooksList.length;i++){
              var key='';
              var auxi= BooksList.map(keyR => key=keyR.chapters);
              for(var j=0;j<auxi[i];j++){
                  const data ={
                      idTrack: uniqueKey,
                      id: chapter.length,
                      keyBook: arre[i],
                      checked: false,
    
                  }
                    chapter.push(data);
              }
    
    
          }
          
    if(this.state.color  &&  this.state.text && this.state.planName && this.state.selectedItems){ 
      const arrayData= [];
      const data = {
        planName: this.state.planName,
        text: this.state.text,
        color: this.state.color,
        key: uniqueKey,
        Books: this.state.selectedItems,
        trackPercent: .0,
        chapter: chapter,
        

      }
      arrayData.push(data);
      try{
        AsyncStorage.getItem('TASKS').then((value) => {
            if(value !== null){
              const  d = JSON.parse(value);
              
              d.push(data);
              this.state.task=d;
              AsyncStorage.setItem('TASKS', JSON.stringify(d))
              this.forceRemount();
              console.log(this.state.task);
              
              

            }else{
              this.state.task=arrayData;
              AsyncStorage.setItem('TASKS', JSON.stringify(arrayData))
              this.forceRemount();
              
              
            }

        })
        

      }catch(err){
          console.log(err);
      }
     
    
      this.setModalVisible(false);
      
      
      
    }
    Alert.alert(
      'Fill all',
      'Fill and select everything to continue',
      [
        
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
    
    
    
    
    
  };

  editTask(id) {
    let trackcheck = this.state.task.find(function (item) { return item.key === id})
    trackcheck.planName = this.state.editName;
    let chk = this.state.task;
      for (let i=0; i < chk.length; i++) { 
       if (chk[i].key === id) {
        chk.splice(i, 1, trackcheck);
        }; 
      }; 
      console.log(id);
      this.state.task=chk;
      AsyncStorage.setItem('TASKS', JSON.stringify(this.state.task));
      this.setEditModalVisible(false);
      this.forceRemount();
  };

  deleteTask(id) {
    let chk = this.state.task;
      for (let i=0; i < chk.length; i++) { 
       if (chk[i].key === id) {
       chk.splice(i, 1);
        }; 
      }; 
      console.log(id);
      this.state.task=chk;
      AsyncStorage.setItem('TASKS', JSON.stringify(this.state.task));
      this.forceRemount();
  };

  componentDidMount() {

    const {navigation} = this.props;
    navigation.addListener ('willFocus', () =>{
      AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.setState({ task: JSON.parse(tasks)  || []})
      
    );
    AsyncStorage.getItem("Dark", (err, state) =>{
      this.setState({ switch: JSON.parse(state)  })
      console.log("hell");
      console.log(JSON.parse(state));}
    );
    
  });
    
    AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.setState({ task: JSON.parse(tasks)  || []})
      
    );
    AsyncStorage.getItem("Dark", (err, state) =>{
      this.setState({ switch: JSON.parse(state)  })
      console.log("hell");
      console.log(JSON.parse(state));}
    );
    
    
    //Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
  }

  

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
    console.log(this.state.selectedItem);
    const { show, date, mode } = this.state;
    const Rday=this.formatDay(date.getDate());
    const Rmonth= this.formatMonth((date.getMonth()+1));
    const datereal=date.getFullYear().toString()+"-"+Rmonth.toString()+"-"+Rday.toString();
    this.state.text=datereal;
    
    const booksSelected= this.showBooks();
    const dataArray = Object.values(this.state.task);
    const { navigate } = this.props.navigation;
    console.log(this.state.selectedItems);
    if(this.state.selectedItem == 'settings'){
      
      navigate('SettingsPage');
      this.setState({selectedItem: 'plans'})
      console.log("done");

    }

    
   // this.forceRemount();

    console.log(this.state.task);
   // AsyncStorage.removeItem("TASKS");
    // AsyncStorage.removeItem("KEY");

    
    
    

    return (
      
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        
        <View style={{backgroundColor: colorSecond, width: window.innerWidth, alignItems: 'center',  height: 80}}>
        <Text style={{position:'absolute', flex:0, marginLeft:120,marginTop:37,fontSize: 20,textAlign: 'center', color: colorText}}>Bible Reading Tracker</Text>
        </View>
        <View style={{backgroundColor: colorPrincipal, width: window.innerWidth, height: 40}}>
        <Text style={{position:'absolute', flex:0, marginLeft:10,marginTop:10,fontSize: 20,color: colorText,}}>My Plans</Text>
        
        
        
        </View>
        <View style={{backgroundColor: colorPrincipal,width: window.innerWidth,height: 10}}>
        <View style={{borderBottomColor: colorSecond,borderBottomWidth: 1,marginLeft:10,marginRight:10}}/></View>
        <View style={{flex: 1, backgroundColor: colorPrincipal,}}>
        
          <FlatList
          style={styles.list}
          data={ dataArray}
          keyExtractor={(item) => item.key}
          renderItem={({ item, index }) =>
                <View>
                <View style={styles.listItemCont}>
                    <TouchableOpacity onPress={() => navigate('TrackPage', {id: item.key})}>
                    <Progress.Bar progress={item.trackPercent} color={item.color} width={340} height={60} margin={10} marginTop={10}><Text style={{position:'absolute', flex:0, marginLeft:10,fontSize:19, color: colorText}}>{item.planName}</Text>
                    <Text style={{position:'absolute', flex:0, marginLeft:10,marginTop:30,fontSize:16, color: colorText}}>{item.text}</Text>
                    <Text style={{position:'absolute', flex:0, marginLeft:280,fontSize:18,color: colorText}}>{((item.trackPercent *100).toFixed(2))+"%"}</Text></Progress.Bar>
                    </TouchableOpacity>
                    <View style={{flexDirection:"row-reverse"}}> 
                    <Button title="" buttonStyle={{width:50, marginRight:10, backgroundColor: '#B22222'}} onPress={() =>  
                    this.deleteTask(item.key)
                     }  icon={<Icon name="trash" size={25} color="white"/> }/>
                     <Button title="" buttonStyle={{width:50, marginRight:10, backgroundColor: '#CCCC00'}} onPress={() => {
                    this.setEditModalVisible(true,item.key);
                     }}  icon={<Icon name="edit" size={25} color="white"/> }/>
                    </View>
                </View>
                <View style={styles.hr} />
                </View>
            }
            

            ListEmptyComponent={
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text>Oops! You don't have any plans</Text>
                </View>
            }
        />
        <View style={{justifyContent: 'center', alignItems: 'center'}}><Button title="+ Add new plan"  buttonStyle={{width:150, marginLeft:5,marginRight:10,marginBottom:30, backgroundColor: '#1e90ff',}} titleStyle={{color: '#ffffff'}} onPress={() => {
            this.setModalVisible(true);
          }}/></View>


          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          
          >
          <View style={{backgroundColor: colorPrincipal}} >
            <View>
              <View style={{flexDirection:'row-reverse',paddingBottom:10}}>
                
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={{fontSize: 28,textAlign: 'right',marginRight:10, marginLeft:90,color:colorText}}>X</Text>
              </TouchableHighlight>
              <Text style={{fontSize: 28,textAlign: 'center',color:colorText}}>New Plan</Text>
              </View>
              <Text style={{fontSize: 18,textAlign: 'left',marginLeft:10,color:colorText}}>Plan Name:</Text>
              <Input inputStyle={{color: colorText }} placeholder='Plan Name' onChangeText={(planName) => this.setPlanname(planName)} value={this.state.planName}/>
              <View>
              <Text style={{fontSize: 18,textAlign: 'left',marginLeft:10,marginTop:10,color: colorText}}>Start date:</Text>
        <View style={{marginTop:10,flexDirection:"row"}}>
          <View style={{width:130}}><Input inputStyle={{color: colorText }} placeholder='YYYY-MM-DD' onChangeText={(text) => this.setRealDate(text)} value={datereal.toString()} /></View>
          
          
          <Button  onPress={this.datepicker} title="  Date" icon={
    <Icon
      name="calendar"
      size={15}
      color="white"
    />
  } />
        </View>
        
        { show && <DateTimePicker value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate} />
        }
      </View>
      
  
      
      
              
            </View>
          </View>
          <ScrollView style={{height:10, backgroundColor: colorPrincipal,paddingTop: 5,paddingLeft:5,paddingRight:5,}}>
        <SectionedMultiSelect
          styles={{ container: {backgroundColor: colorPrincipal}, item:{backgroundColor: colorPrincipal}, subItem: {backgroundColor: colorPrincipal}, itemText: {color: colorText},
          toggleIcon:{backgroundColor: colorPrincipal}, button:{backgroundColor: "#000000"}, selectToggleText:{color: colorText, backgroundColor:colorSecond}, selectToggle:{color: colorText, backgroundColor:colorSecond},  }}
          items={booksSelected}
          uniqueKey="id"
          subKey="children"
          selectText="Choose Books"
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          ref={SectionedMultiSelect => this.SectionedMultiSelect = SectionedMultiSelect}
        />
      </ScrollView>
      <View style={{paddingTop:10,flexDirection:"row",alignContent:"center",alignItems: "center",justifyContent:"center", backgroundColor: colorPrincipal}}>
        <Text style={{color: colorText}}>New Testament:</Text>
      <Switch
          style={{marginRight:10}}
          onValueChange = {this.toggleSwitchNew}
          value = {this.state.switchValueNewT}
          thumbColor={'#1e90ff'}/>
          <Text style={{color: colorText}}>Old Testament:</Text>
      <Switch
          style={{}}
          onValueChange = {this.toggleSwitchOld}
          value = {this.state.switchValueOldT}
          thumbColor={'#1e90ff'}/>    
      </View>
          
          <View style={{paddingBottom:10,backgroundColor: colorPrincipal}}><Text style={{fontSize: 18,textAlign: 'left',marginLeft:10,marginTop:20,color: colorText}}>Select a color:</Text></View>
          
          <ColorPicker
        onColorSelected={color => {this.setColor(color),  alert(`Color selected: ${color}`)}  } 
        hideSliders={true}
        style={{flex: 1,backgroundColor: colorPrincipal}}
        onColorChange={this.onColorChange}
      />



      <View style={{paddingTop: 20,paddingBottom:20,paddingLeft:10,paddingRight:10,backgroundColor: colorPrincipal}}><Button  title="Create Reading plan" onPress={() => {
            this.addTask();
          }}/></View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalEdit}
          
          >
          <View style={{backgroundColor: colorPrincipal}}>
            <View>
              <TouchableHighlight
                onPress={() => {
                  this.setEditModalVisible(!this.state.modalEdit,0);
                }}>
                <Text style={{fontSize: 28,textAlign: 'right',marginRight:10, marginLeft:300,color:colorText}}>X</Text>
              </TouchableHighlight>
              <Text style={{fontSize: 28,textAlign: 'center',color:colorText}}>Edit Plan Name</Text>
              <Text style={{fontSize: 18,textAlign: 'left',marginLeft:10,color:colorText}}>Plan Name:</Text>
              <Input inputStyle={{color: colorText }} placeholder='New Name' onChangeText={(editName) => this.setEditname(editName)} value={this.state.editName}/>
              
      
  
      
      
              
            </View>
          </View>
          


      <View style={{ paddingTop: 50,paddingBottom:600,paddingLeft:10,paddingRight:10,backgroundColor: colorPrincipal}}><Button  title="Edit Reading plan" onPress={() => {
            this.editTask(this.state.indexfor);
          }}/></View>
        </Modal>
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
