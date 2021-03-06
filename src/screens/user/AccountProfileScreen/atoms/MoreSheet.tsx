import React from 'react';
import tailwind from '../../../../../tailwind';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import assets from '../../../../constants/assets_manifest';
import {useNavigation} from '@react-navigation/core';

interface PropTypes {
  text?: string;
}

export default function MoreSheet(props: PropTypes) {
  const navigation = useNavigation<any>();

  return (
    <View style={[tailwind('bg-dark-3 px-3')]}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfileEditScreen')}
        style={[tailwind('flex-row items-center p-3')]}>
        <View style={[tailwind('rounded-full'), {width: 16, height: 16}]}>
          <Image
            resizeMode="contain"
            source={assets.settings_icon}
            style={[tailwind('w-full h-full')]}
          />
        </View>
        <Text style={[tailwind('font-regular px-3 text-light font-13')]}>
          My Info & Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
}
