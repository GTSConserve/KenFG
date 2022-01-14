import React from 'react';
import tailwind from '../../../../../tailwind';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import assets from '../../../../constants/assets_manifest';

interface PropTypes {
  filterSheet: any;
}

export default function FilterSheetTitle(props: PropTypes) {
  return (
    <View
      style={[
        tailwind(
          'flex-row items-center justify-between py-4 px-3 bg-dark-3 rounded-t-lg',
        ),
      ]}>
      <TouchableOpacity onPress={() => props.filterSheet?.current?.close()}>
        <Icon name="close" size={17} color="white" />
      </TouchableOpacity>

      <Text style={[tailwind('font-bold text-white font-13')]}>Filters</Text>
      <TouchableOpacity style={[tailwind('px-3')]}>
        {/* <Text style={[tailwind('font-regular uppercase text-white font-13')]}>
          Reset
        </Text> */}
      </TouchableOpacity>
    </View>
  );
}