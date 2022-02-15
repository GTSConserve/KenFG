import React from 'react';
import tailwind from '../../../../../tailwind';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

interface PropTypes {
  text: string;
  actiontext?: string;
}

export default function SubTitle(props: PropTypes) {
  const navigation = useNavigation<any>();
  return (
    <View style={[tailwind('flex-row items-center justify-between ')]}>
      <Text
        style={[tailwind('font-bold uppercase font-12'), {color: '#8797B1'}]}>
        {props.text}
      </Text>
      {props.actiontext && (
        <TouchableOpacity
          onPress={() => navigation.navigate('MyMatchesScreen')}
          style={[tailwind('flex-row items-center')]}>
          <Text
            style={[tailwind('font-regular px-1 font-12'), {color: '#8797B1'}]}>
            {props.actiontext}
          </Text>
          <Icon name="chevron-forward-outline" size={15} color="#8797B1" />
        </TouchableOpacity>
      )}
    </View>
  );
}