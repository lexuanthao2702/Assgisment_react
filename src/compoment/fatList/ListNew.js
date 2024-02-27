import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ToastAndroid,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ItemListNew from './ItemListNew';
import AxiosIntance from '../../ultil/AxiosIntance';

const ListNew = (props) => {
  const {navigation} = props;
  const [Data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const getNew = async () => {
      const response = await AxiosIntance().get('/articles');
      console.log('du lieu ------ ', response);
      if (response.error == false) {
        // lay du lieu thanh cong
        setData(response.data);
        setisLoading(false);
      } else {
        ToastAndroid.show('lay du lieu failed', ToastAndroid.SHORT);
      }
    };
    getNew();
    return () => {};
  }, []);

  return (
    <View>
      {isLoading == true ? (
        <View>
          <ActivityIndicator size={"large"} color={"blue"}/>
          <Text style={{textAlign: 'center'}}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={Data}
          renderItem={({item}) => <ItemListNew data={item} navigation={navigation}/>}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}></FlatList>
      )}
    </View>
  );
};

export default ListNew;

const styles = StyleSheet.create({});

// const Data = [
// {
//   _id: '1',
//   title: 'Trường công lập đầu tiên dạy và thi chương trình dự bị đại học Mỹ',
//   content:
//     'Phổ thông Năng khiếu là trường công lập đầu tiên ở Việt Nam dạy và thi 6 môn của chương trình Advanced Placement (AP), thường gọi là chương trình dự bị đại học Mỹ.',
//   image:
//     'https://i1-vnexpress.vnecdn.net/2023/01/30/4313-1662984910-1675082690-4516-1675083076.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=BnjiAv8Bq8iaZcGQ2jJC3Q',
//   createdAt: '2023-01-12T06:26:17.539Z',
//   createdBy: {
//     _id: '63ac39aeedf7c80016c57a67',
//     name: '',
//     avatar: '',
//   },
// },
// {
//   _id: '2',
//   title: 'Lịch thi đánh giá năng lực, tư duy năm 2023',
//   content:
//     'Các kỳ thi đánh giá năng lực, tư duy diễn ra từ tháng 3 đến 7, thí sinh có thể tham dự nhiều đợt và đăng ký từ đầu tháng 2.',
//   image:
//     'https://i1-vnexpress.vnecdn.net/2023/01/30/4313-1662984910-1675082690-4516-1675083076.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=BnjiAv8Bq8iaZcGQ2jJC3Q',
//   createdAt: '2023-01-12T06:26:17.539Z',
//   createdBy: {
//     _id: '63ac39aeedf7c80016c57a67',
//     name: '',
//     avatar: '',
//   },
// },
// {
//   _id: '3',
//   title: 'Đối phó với bài tập Tết',
//   content:
//     'Ngày nghỉ Tết cuối cùng, hàng chục trang bài tập Toán, Tiếng Việt và Tiếng Anh của Anh Thư được giải quyết, nhưng do mẹ và dì làm giúp.',
//   image:
//     'https://i1-vnexpress.vnecdn.net/2023/01/30/4313-1662984910-1675082690-4516-1675083076.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=BnjiAv8Bq8iaZcGQ2jJC3Q',
//   createdAt: '2023-01-12T06:26:17.539Z',
//   createdBy: {
//     _id: '63ac39aeedf7c80016c57a67',
//     name: '',
//     avatar: '',
//   },
// },
// {
//   _id: '4',
//   title: 'Đường trở thành giáo viên ở Mỹ của một phụ nữ Việt',
//   content:
//     'Chị Đinh Thu Hồng phải theo học chương trình đào tạo giáo viên và hoàn thành nhiều thủ tục để được cấp phép hành nghề dạy học ở Mỹ.',
//   image:
//     'https://i1-vnexpress.vnecdn.net/2023/01/30/4313-1662984910-1675082690-4516-1675083076.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=BnjiAv8Bq8iaZcGQ2jJC3Q',
//   createdAt: '2023-01-12T06:26:17.539Z',
//   createdBy: {
//     _id: '63ac39aeedf7c80016c57a67',
//     name: '',
//     avatar: '',
//   },
// },

// ];
