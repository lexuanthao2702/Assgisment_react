import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AppContext} from '../ultil/AppContext';
import {launchImageLibrary} from 'react-native-image-picker';
import AxiosIntance from '../ultil/AxiosIntance';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');

  const {infoUser, setinfoUser} = useContext(AppContext);
  console.log(infoUser);

  const getImageLibrary = async () => {
    const result = await launchImageLibrary();
    if (!result.didCancel && !result.error) {
      console.log(result.assets[0].uri);
      const formData = new FormData();
      formData.append('image', {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      try {
        const response = await AxiosIntance('multipart/form-data').post(
          '/media/upload',
          formData,
        );
        console.log(response.data.path);
        setinfoUser({...infoUser, avatar: response.data.path});
      } catch (error) {
        console.error('Lỗi khi tải ảnh lên:', error);
        ToastAndroid.show('Không thể tải ảnh lên', ToastAndroid.SHORT);
      }
    }
  };
  // update profile
  const UpdateProfile = async () => {
    const response = await AxiosIntance().post('/users/update-profile', {
      name: infoUser.name,
      address: infoUser.address,
      phone: infoUser.phone,
      dob: infoUser.dob,
      avatar: infoUser.avatar,
    });
    if (!response.error) {
      ToastAndroid.show('Update thành công', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Update Failed', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={getImageLibrary}>
        {infoUser.avatar == '' ? (
          <Image
            source={require('../img/NameProfile.png')} // Đường dẫn hình ảnh của bạn
            style={styles.image}
          />
        ) : (
          <Image
            source={{uri: infoUser.avatar}} // Đường dẫn hình ảnh của bạn
            style={styles.image}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.textEmail}>{infoUser.email}</Text>
      <Text style={[styles.text, {marginEnd: 285}]}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={text => setinfoUser({...infoUser, name: text})}
        value={infoUser.name}
      />
      <Text style={[styles.text]}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        onChangeText={text => setinfoUser({...infoUser, address: text})}
        value={infoUser.address}
      />
      <Text style={[styles.text, {marginEnd: 285}]}>Phone</Text>

      <TextInput
        style={styles.input}
        placeholder="Phone"
        onChangeText={text => setinfoUser({...infoUser, phone: text})}
        value={infoUser.phone}
      />
      <Text style={[styles.text, {marginEnd: 295}]}>Date</Text>
      <TextInput
        style={styles.input}
        placeholder="Date"
        onChangeText={text => setinfoUser({...infoUser, dob: text})}
        value={infoUser.dob}
      />
      <Button title="Update" onPress={UpdateProfile} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmail: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  text: {
    color: '#4E4B66',
    fontSize: 16,
    marginEnd: 270,
  },
});
