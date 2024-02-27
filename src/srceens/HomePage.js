import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ListNew from '../compoment/fatList/ListNew';

const HomePage = props => {
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(true);
  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <Image
        style={styles.logoKabar}
        source={require('../img/logokabar.png')}></Image>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text style={styles.textTranding}>Trending</Text>
        <Text style={styles.textSeeall}>See all</Text>
      </View>
      <Image style={styles.imgNew} source={require('../img/new.png')}></Image>
      <Text style={[styles.textSeeall, {marginTop: 10}]}>Europe</Text>
      <Text style={[styles.textSeeall, {marginTop: 10, fontSize: 25}]}>
        Russian warship: Moskva sinks in Black Sea
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <Image
          style={{marginEnd: 5}}
          source={require('../img/Ellipse.png')}></Image>
        <Text style={{fontSize: 18, color: '#4E4B66'}}>BBC News</Text>
        <Image
          style={{marginStart: 5, marginEnd: 5, width: 20, height: 20}}
          source={require('../img/time.png')}></Image>
        <Text style={{fontSize: 18, color: '#4E4B66'}}>4h ago</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text style={styles.textTranding}>Latest</Text>
        <Text style={styles.textSeeall}>See all</Text>
      </View>
      <ScrollView></ScrollView>
      <ListNew navigation={navigation}></ListNew>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginStart: 10,
    marginEnd: 10,
    // backgroundColor: "#ccc2c3"
  },
  logoKabar: {
    marginTop: 20,
  },
  textTranding: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  textSeeall: {
    fontSize: 20,
    color: 'gray',
  },
  imgNew: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
});
