import React from 'react';
import tailwind from '../../../../tailwind';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import assets from '../../../constants/assets_manifest';
import LinearGradient from 'react-native-linear-gradient';

interface PropTypes {
  active: boolean;
  tabName: string;
  count: number;
  onTabPressed(index: number): any;
  index: number;
}

export default function TabItem(props: PropTypes) {
  const onLayoutAction = (e: any) => {
    console.log(e.nativeEvent.layout);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        props.onTabPressed(props.index);
      }}
      style={[{width: 85}, tailwind('')]}>
      <View onLayout={onLayoutAction} style={[tailwind('pt-3')]}>
        <Text
          style={[
            tailwind(
              `font-bold text-center font-13 
              `,
            ),
            {
              color: props.active ? '#FFFF' : '#8797B1',
            },
          ]}>
          {props.tabName} ({props.count})
        </Text>
        {props.active && (
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[tailwind('mt-3 rounded h-1')]}
            colors={['#816D2E', '#614920']}></LinearGradient>
        )}
      </View>
    </TouchableOpacity>
  );
}
