import React, {useEffect} from 'react';
import tailwind from '../../../../../../tailwind';
import {View, StyleSheet, Text} from 'react-native';
import SubTitle from '../SubTitle';

import NewMyMatchesCard from './mymatch.card.lobby';
import ImageSlider from './ImageSlider';
import UpComingMatchesSlider from './UpComingMatchesSlider';

import {upcommingMatchesandBannersRemote} from '../../../../../remote/matchesRemote';
import {useQuery} from 'react-query';
import {useSelector} from 'react-redux';
import {userInfo} from '../../../../../store/selectors';

interface PropTypes {
  text?: string;
}

export default function CricketPage(props: PropTypes) {
  const userInfoSelector = useSelector(userInfo);

  const upcommingMatches = useQuery(
    ['upcomingMatches', userInfoSelector?.mobile],
    upcommingMatchesandBannersRemote,
  );
  
  return (
    <View>
      <View style={[tailwind('pt-3')]}>
        <ImageSlider
          data={upcommingMatches?.data?.banners}
          status={upcommingMatches.status}
        />
      </View>

      <View style={[tailwind('px-5 pt-4')]}>
        <SubTitle text={'Upcoming'} />
      </View>
      <UpComingMatchesSlider
        data={upcommingMatches?.data?.matches}
        status={upcommingMatches.status}
      />
    </View>
  );
}