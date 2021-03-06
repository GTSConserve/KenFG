// team flag used in lobby my matche status card, team formation

import React from 'react';
import tailwind from '../../../tailwind';
import {View, StyleSheet} from 'react-native';
import assets from '../../constants/assets_manifest';
import {useSelector} from 'react-redux';
import {getAppThemeSelector} from '../../store/selectors';
import clr from '../../constants/colors';
import FastImage from 'react-native-fast-image';

interface PropTypes {
  teamCode: string;
}

export default function TeamFlag(props: PropTypes) {
  const dT = useSelector(getAppThemeSelector);
  const URI = `http://kenfg.com/images/flag/${props.teamCode.toUpperCase()}`;
  return (
    <View style={[dT ? ss.dark : ss.light]}>
      <FastImage
        style={ss.flag}
        source={{
          uri: URI,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
}

const ss = StyleSheet.create({
  dark: {
    width: 46,
    height: 27,
    backgroundColor: '#0c1320',
    borderRadius: 2,
    borderColor: '#0c13205D',
    borderWidth: 1,
  },
  light: {
    width: 46,
    height: 27,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    borderColor: '#E0E0E05D',
    borderWidth: 1,
  },
  flag: {
    width: 45,
    height: 25,
  },
});
