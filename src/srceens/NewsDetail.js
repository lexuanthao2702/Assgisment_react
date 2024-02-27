import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AxiosIntance from '../ultil/AxiosIntance';

const NewsDetail = props => {
  const {route} = props;
  const {params} = route;
  const [title, settitle] = useState('');
  const [content, setcontent] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      const response = await AxiosIntance().get(
        '/articles',
        params.id + '/detail',
      );
      console.log(response);
      if (response.error == false) {
        // lay du lieu thanh cong
        settitle(response.data[0].title);
        setcontent(response.data[0].content);
        setimageUrl(response.data[0].image);
        setisLoading(false);
      } else {
      }
    };
    // getDetails();
    if (params && params.id) {
      getDetails();
    }
      getDetails();
    return () => {};
  }, []);

  return (
    <>
      {isLoading == true ? (
        <View>
          <ActivityIndicator size={'large'} color={'blue'} />
          <Text style={{textAlign: 'center'}}>Loading...</Text>
        </View>
      ) : (
        <ScrollView style={[styles.container, {marginTop: 10}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('../img/Ellipse.png')}></Image>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 16,
                marginEnd: 155,
              }}>
              {' '}
              BBC News
            </Text>
            <Pressable
              style={{
                width: 102,
                height: 34,
                backgroundColor: '#1877F2',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  alignItems: 'center',
                }}>
                Following
              </Text>
            </Pressable>
          </View>
          {/* content */}
          <Image
            style={{width: '100%', height: 200,marginTop: 20,marginBottom: 10}}
            source={{uri: imageUrl}}></Image>
          <Text>Europe</Text>
          <Text style={{
            color: "black", fontSize: 24, fontWeight: "bold", marginVertical: 10
            }}>{title}</Text>
          <Text style={{fontSize: 16}}>{content}</Text>
          {/* footer */}
        </ScrollView>
      )}
    </>
  );
};

export default NewsDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginStart: 10,
    marginEnd: 10,
    // backgroundColor: "#ccc2c3"
  },
});
