import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
//menu lateral componente
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#D9DDDC',
    
  },
  avatarContainer: {
    marginBottom: 20,
    //marginTop: 27,
    width: window.width,
    height: 110,
    backgroundColor: '#696969'
  },
  avatar: {
    width: window.width,
    height: 48,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: '300',
    paddingTop: 5,
  },
});

export default function Menu({ onItemSelected }) {
  
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer} >
        
      </View>

      <Text
        onPress={() => onItemSelected('plans')}
        style={styles.item}
      >
        My Plans
      </Text>

      <Text
        onPress={() => onItemSelected('settings')}
        style={styles.item}
      >
        Settings
      </Text>
    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
