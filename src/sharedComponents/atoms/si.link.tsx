// goto button to second innings contest list,
// only visible in full match contest page

import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {getAppThemeSelector} from '../../store/selectors';
import clr from '../../constants/colors';

interface PropTypes {
  onPressSecondInnings(): void;
}

export default function SiLink(props: PropTypes) {
  const dT = useSelector(getAppThemeSelector);

  return (
    <TouchableOpacity
      onPress={props.onPressSecondInnings}
      style={[ss.root, !dT && ss.lRoot]}>
      <Text style={[ss.text, !dT && clr.td1]}>
        View Second Innings Contests
      </Text>
      <Icon
        name="arrow-forward-outline"
        size={20}
        color={dT ? '#C5A858' : '#9C181E'}
      />
    </TouchableOpacity>
  );
}

const ss = StyleSheet.create({
  root: {
    marginHorizontal: 15,
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d1b45a',
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    padding: 4,
  },
  lRoot: {
    borderColor: '#9C181E',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontFamily: 'gadugi-normal',
    color: '#C5A858',
    fontSize: 12,
    paddingRight: 8,
    textAlign: 'center',
  },
});
