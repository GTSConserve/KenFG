import React from 'react';
import tailwind from '../../../../../tailwind';
import {View, Text, ScrollView} from 'react-native';
import CurrentPlayerStats from '../atoms/CurrentPlayerStats';
import CurrentOverStats from './CurrentOverStats';
import OverStats from '../atoms/OverStats';
// import Icon from 'react-native-vector-icons/Ionicons';

interface PropTypes {
  text?: string;
}

export default function CurrentLiveStats(props: PropTypes) {
  return (
    <ScrollView>
      <View style={[tailwind('flex-row')]}>
        <View style={[tailwind(''), {flex: 4.75}]}>
          <CurrentPlayerStats
            player1={'D Warner'}
            player2={'A Finch'}
            player1_runs={'23'}
            player1_balls={'8'}
            player2_runs={'43'}
            player2_balls={'23'}
            active={0}
          />
        </View>
        <View style={[{flex: 0.25}]}></View>
        <View style={[tailwind('flex-col justify-between'), {flex: 4.75}]}>
          <CurrentOverStats />
          <OverStats />
        </View>
      </View>
    </ScrollView>
  );
}
