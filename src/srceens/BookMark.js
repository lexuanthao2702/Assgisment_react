import React, {useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AxiosIntance from '../ultil/AxiosIntance';

const BookMark = () => {
  const [imageUri, setImageUri] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // tải ảnh lên bằng camera
  const capture = async () => {
    const result = await launchCamera();
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
        console.log(response);
        if (!response.error) {
          setImageUri(response.data.path);
          ToastAndroid.show('Đã tải ảnh lên thành công', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Không thể tải ảnh lên', ToastAndroid.SHORT);
        }
      } catch (error) {
        console.error('Lỗi khi tải ảnh lên:', error);
        ToastAndroid.show('Không thể tải ảnh lên', ToastAndroid.SHORT);
      }
    }
  };
  //tải ảnh lên chọn bộ sưu tập
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
        console.log(response);
        if (!response.error) {
          setImageUri(response.data.path);
          ToastAndroid.show('Đã tải ảnh lên thành công', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Không thể tải ảnh lên', ToastAndroid.SHORT);
        }
      } catch (error) {
        console.error('Lỗi khi tải ảnh lên:', error);
        ToastAndroid.show('Không thể tải ảnh lên', ToastAndroid.SHORT);
      }
    }
  };
  // postBookmark
  const postBookmark = async () => {
    const response = await AxiosIntance().post('/articles', {
      title: title,
      content: content,
      image: imageUri,
    });
    console.log(response);
    if (!response.error) {
      ToastAndroid.show('Đăng tin thành công', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Đăng tin thất bại', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textBookmark}>Bookmark</Text>
      {imageUri ? (
        <Image source={{uri: imageUri}} style={styles.image} />
      ) : null}
      <Button title="Chụp ảnh" onPress={capture} style={styles.button1} />
      <Button
        title="Chọn ảnh"
        onPress={getImageLibrary}
        style={styles.button1}
      />
      <TextInput
        style={styles.input}
        placeholder="Tiêu đề"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Nội dung"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Đăng bài" onPress={postBookmark} />
    </View>
  );
};

export default BookMark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
  },
  textBookmark: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    marginTop: 10
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top', // Để văn bản bắt đầu từ đầu dòng khi đa dòng
  },
  button1: {
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 10,
  },
});
