import React from 'react';
import tailwind from '../../../../../tailwind';
import {View, useWindowDimensions, FlatList} from 'react-native';
import HeaderLeaderBoard from '../atoms/HeaderLeaderBoard';
import {ContestTeams} from '../../../../sharedComponents';
import ShareContest from '../atoms/ShareContest';
import NoLeaderBoardContent from '../atoms/no.leaderboard.content';
import {useSelector} from 'react-redux';
import {getAppThemeSelector} from '../../../../store/selectors';
import clr from '../../../../constants/colors';
// import Icon from 'react-native-vector-icons/Ionicons';

interface PropTypes {
  index: number;
  activeIndex: number;
  ldbLive: boolean;
  ldbMeta: any;
  ldbErr: boolean;
  lbProfileOnPress(player_key: string, teamCode: string): any;
  teamSwapOnPress(teamCode: string): any;
}

export default function LearderBoard(props: PropTypes) {
  const dT = useSelector(getAppThemeSelector);

  // console.log('leaderboard --->', props.ldbMeta);
  const {width} = useWindowDimensions();

  // when an api error is active
  if (props.ldbErr) {
    // need to confirm later, what it means to get 400 response code
    return <NoLeaderBoardContent dT={dT} loading={false} error={false} />;
  }
  // when an ldbMeta is undefined or api on isFetching state
  if (!props.ldbMeta || props.ldbLive) {
    return <NoLeaderBoardContent dT={dT} loading={true} error={false} />;
  }

  return (
    <FlatList
      contentContainerStyle={{width: width}}
      data={props.ldbMeta}
      renderItem={({item, index}) => {
        return (
          <ContestTeams
            key={index.toString()}
            player_key={item.player_key}
            image={'https://t.ly/ZGWf'}
            name={item.player_name}
            teamCode={item.team_key}
            currentUser={item.is_current}
            hasStatus={false}
            matchStarted={false}
            lbProfileOnPress={props.lbProfileOnPress}
            teamSwapOnPress={props.teamSwapOnPress}
          />
        );
      }}
      ListHeaderComponent={() => {
        return (
          <>
            <ShareContest />
            <HeaderLeaderBoard length={props?.ldbMeta?.length} />
          </>
        );
      }}
      ListFooterComponent={() => {
        return <View style={[tailwind('h-20')]}></View>;
      }}
    />
  );
}
