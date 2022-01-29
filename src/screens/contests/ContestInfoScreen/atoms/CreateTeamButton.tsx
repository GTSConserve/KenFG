import React from 'react';
import tailwind from '../../../../../tailwind';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import assets from '../../../../constants/assets_manifest';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';

export default function CreateTeamButtom() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const navigate = () => {
    navigation.navigate('TeamFormationScreen', {
      mutation: false,
    });
  };

  return (
    <View style={[tailwind('w-6/12')]}>
      <LinearGradient
        end={{x: 0.0, y: 0.5}}
        start={{x: 0.8, y: 2.0}}
        locations={[0.6, 0.5]}
        style={[tailwind('flex-row  m-2 rounded')]}
        colors={['#00513B', '#00513B']}>
        <TouchableOpacity
          onPress={navigate}
          style={[
            tailwind('py-3 flex-grow flex-row items-center justify-center'),
          ]}>
          <Image
            resizeMode="contain"
            source={assets.plus}
            style={[tailwind(''), {width: 20, height: 20}]}
          />
          <Text
            style={[
              tailwind(
                'font-bold px-2 uppercase text-center text-light font-12',
              ),
            ]}>
            Create Team
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}
