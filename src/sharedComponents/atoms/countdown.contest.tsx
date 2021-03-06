import React, {useEffect, useState} from 'react';
import tailwind from '../../../tailwind';
import {View, Text, StyleSheet} from 'react-native';

interface PropTypes {
  timeStamp: any;
}

export default function CountdownContest(props: PropTypes) {
  const [parsedTime, setParsedTime] = useState('');

  // useEffect(() => {
  //   // console.log('ccd', props.timeStamp);
  //   const split = props.timeStamp.split(':');//
  // }, []);

  return (
    <View style={[tailwind('flex-row justify-center items-center my-6')]}>
      <View style={[styles.countDownRoot]}>
        <Text style={[tailwind('font-bold text-white font-14')]}>0</Text>
      </View>
      <View style={[styles.countDownRoot]}>
        <Text style={[tailwind('font-bold text-white font-14')]}>0</Text>
      </View>
      <Text style={[tailwind('font-bold text-white pl-2 pr-3 font-15')]}>
        :
      </Text>
      <View style={[styles.countDownRoot]}>
        <Text style={[tailwind('font-bold text-white font-14')]}>0</Text>
      </View>
      <View style={[styles.countDownRoot]}>
        <Text style={[tailwind('font-bold text-white font-14')]}>0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  countDownRoot: {
    borderColor: '#4D596D',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginRight: 6,
  },
});
