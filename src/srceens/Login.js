import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AxiosIntance from '../ultil/AxiosIntance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../ultil/AppContext';

const Login = props => {
  const {setIsLogin,setinfoUser} = useContext(AppContext);
  const [emailUser, setemailUser] = useState('');
  const [passWordUser, setpassWordUser] = useState('');
  //khi khai báo các Screen trong navigation ở file App.js, mặc định trong props của mỗi Screen sẽ có biến navigation
  const {navigation} = props;
  const ClickSignUp = () => {
    //Truyền tên Screen muốn chuyển qua vào navigate
    navigation.navigate('Signup');
  };
  const ClickLogin = async () => {
    console.log(emailUser, passWordUser);
    const response = await AxiosIntance().post('/auth/login', {
      email: emailUser,
      password: passWordUser,
    });
    console.log(response);
    if (response.error === false) {
      console.log(response.data.token);
      await AsyncStorage.setItem("token",response.data.token);
      ToastAndroid.show('Login Successfuly', ToastAndroid.SHORT);
      setinfoUser(response.data.user);
      setIsLogin(true);

    }else{
      ToastAndroid.show('Login Failed', ToastAndroid.SHORT);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {marginTop: 25}]}>Hello</Text>
      <Text style={[styles.text, {color: '#1877F2'}]}>Again</Text>
      <Text style={styles.welcomeText}>
        Welcome back you’ve {'\n'}been missed
      </Text>
      <Text style={{color: '#4E4B66', fontSize: 18}}>Username</Text>
      <TextInput style={styles.textInput} onChangeText={setemailUser} />
      <Text style={{color: '#4E4B66', fontSize: 18, marginTop: 10}}>
        Password
      </Text>
      <TextInput style={styles.textInput} onChangeText={setpassWordUser} />
      <View
        style={[
          styles.viewRemmenber,
          {justifyContent: 'space-between', marginTop: 20},
        ]}>
        <View style={styles.viewRemmenber}>
          <BouncyCheckbox
            size={25}
            fillColor="#1877F2"
            iconStyle={{borderColor: '#1877F2'}}
            innerIconStyle={{borderWidth: 2}}
            textStyle={{fontFamily: 'JosefinSans-Regular'}}
          />
          <Text style={{fontSize: 14}}>Remember Me</Text>
        </View>
        <Text style={{color: '#1877F2', fontSize: 14}}>
          forgot The Password ?
        </Text>
      </View>
      <Pressable style={styles.buttonLogin} onPress={ClickLogin}>
        <Text style={styles.textLogin}>Login</Text>
      </Pressable>
      <Text
        style={[
          {
            textAlign: 'center',
            marginTop: 10,
            marginBottom: 20,
            color: 'gray',
            fontSize: 14,
          },
        ]}>
        or continue with{' '}
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Pressable style={styles.buttonSoical}>
          <Image
            style={styles.imgScoial}
            source={require('../img/fb.png')}></Image>
          <Text>FaceBook</Text>
        </Pressable>
        <Pressable style={styles.buttonSoical}>
          <Image
            style={styles.imgScoial}
            source={require('../img/gg.png')}></Image>
          <Text>Google</Text>
        </Pressable>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 20,
            fontSize: 16,
            color: 'gray',
            marginEnd: 5,
          }}>
          don't have an account ?
        </Text>
        <Pressable onPress={ClickSignUp}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 20,
              fontSize: 16,
              color: 'blue',
            }}>
            Sign Up
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccccc',
    marginStart: 10,
    marginEnd: 10,
    flexDirection: 'column',
  },
  text: {
    fontFamily: 'Popins',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#050505',
  },
  welcomeText: {
    fontFamily: 'Popins',
    fontSize: 20,
    marginTop: 4,
    color: '#4E4B66',
    marginBottom: 40,
  },
  textInput: {
    height: 48,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 4,
  },
  viewRemmenber: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLogin: {
    height: 48,
    backgroundColor: '#1877F2',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textLogin: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imgScoial: {
    width: 21,
    height: 21,
    marginEnd: 10,
  },
  buttonSoical: {
    flexDirection: 'row',
    width: 174,
    height: 48,
    backgroundColor: '#EEF1F4',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
