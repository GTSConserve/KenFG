import React from 'react';
import tailwind from '../../../../tailwind';
import {View, Text, ScrollView} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// interface PropTypes {
//   text?: string;
// }

export default function OverStats() {
  return (
    <View style={[tailwind('')]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <BallStats info={3} />
        <BallStats info={0} />
        <BallStats info={4} />
        <BallStats info={3} />
        <EmptyBall />
        <EmptyBall />
      </ScrollView>
    </View>
  );
}

const BallStats = ({info}) => {
  return (
    <View
      style={[
        tailwind('rounded-full mr-1'),
        {
          width: 20,
          height: 20,
          backgroundColor: 'rgba(255, 255, 255,1)',
        },
      ]}>
      <Text
        style={[tailwind('font-bold text-center text-black top-0.5 font-13')]}>
        {info}
      </Text>
    </View>
  );
};

const EmptyBall = ({}) => {
  return (
    <View
      style={[
        tailwind('rounded-full mr-1'),
        {
          width: 20,
          height: 20,
          borderColor: 'white',
          borderRadius: 10,
          borderStyle: 'dashed',
          borderWidth: 1,
        },
      ]}></View>
  );
};
