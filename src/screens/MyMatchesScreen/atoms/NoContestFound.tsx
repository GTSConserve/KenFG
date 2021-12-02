import React from 'react';
import tailwind from '../../../../tailwind';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import assets from '../../../constants/assets_manifest';
import {ButtonComponent} from '../../../sharedComponents';

interface PropTypes {
  text: string;
}

export default function NoContestFound(props: PropTypes) {
  return (
    <View style={[tailwind(''), {flex: 1}]}>
      <View
        style={[tailwind('flex-col items-center justify-center'), {flex: 1}]}>
        <Text style={[tailwind('font-regular text-light font-15')]}>
          {props.text}
        </Text>
      </View>
      <TouchableOpacity style={[tailwind('m-3')]}>
        <ButtonComponent text={'View Upcomming Matches'} />
      </TouchableOpacity>
    </View>
  );
}