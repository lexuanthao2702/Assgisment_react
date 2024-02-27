import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const ItemListNew = props => {
  const {data, navigation} = props;

  const clickItem = () => {
    console.log("clickItem");
    navigation.navigate('NewsDetail',{id: data.id});
    
  }

  return (
    <TouchableOpacity onPress={clickItem}>
      <View style={styles.container}>
        <Image source={{uri: data.image}} style={styles.img}></Image>
        <View style={styles.content}>
          <Text style={styles.textTitle} numberOfLines={2}>
            {data.title}
          </Text>
          <Text numberOfLines={3}>{data.content}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemListNew;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 5,
  },
  img: {
    width: 96,
    height: 96,
    borderRadius: 10,
    marginEnd: 10,
    backgroundColor: '#cccc',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  content: {
    width: Dimensions.get('window').width - 125,
  },
});
