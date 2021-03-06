import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import tailwind from '../../../../tailwind';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {getAppThemeSelector} from '../../../store/selectors';
import clr from '../../../constants/colors';

// import assets from 'assets';
import {TopBar, BlockScreenByLoading} from '../../../sharedComponents';
// import Icon from 'react-native-vector-icons/Ionicons';
const log = console.log;

import SortHeaderCap from './atoms/sort.header.capsel';
import PlayerCapSelection from './molecules/player.cap.selection';
import CapSelectionAction from './atoms/CapSelectionAction';
import {
  UpdateCreateTeamAction,
  updateJoinModalAction,
} from '../../../store/actions/appActions';
import {useDispatch, useSelector} from 'react-redux';
import {creditLeft, rolesCount, selectedMatch} from '../../../store/selectors';
import {
  captainSelection,
  vicecaptainSelectionAction,
  clearTeamAction,
} from '../../../store/actions/teamActions';
import {isPlayerCaptain, isPlayerViceCaptain} from '../../../store/store_utils';
import {errorBox, infoBox} from '../../../utils/snakBars';
import {createTeamRemote} from '../../../remote/matchesRemote';
import {createTeamObjCreator} from '../../../workers/objCreators';
// import {
//   reset2ndInningsNavigation,
//   resetContestListNavigation,
// } from '../../../utils/resetNav';

interface PropTypes {
  allPlayers: any;
  sortStatus: any;
  editTeamAPI(payload: any): any;
  cloneAPI(payload: any): any;
  loading: boolean;
  setLoading(bool: boolean): any;
  sortByAction(input: any): any;
}

export default function CapSelectionScreen(props: PropTypes) {
  const dT = useSelector(getAppThemeSelector);

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const route = useRoute<any>();

  const matchSelector: any = useSelector(selectedMatch);
  const rolesCountSelector: any = useSelector(rolesCount);
  const availableCredits = useSelector(creditLeft);

  const playersState: any = useSelector<any>(state => state.team.players);
  const captain_key = useSelector<any>(state => state.team.cap_key);
  const vc_key = useSelector<any>(state => state.team.vc_key);

  const captainSelectAction = (player_key: string) => {
    if (vc_key === player_key) {
      dispatch(vicecaptainSelectionAction(null));
      dispatch(captainSelection(player_key));
    } else {
      dispatch(captainSelection(player_key));
    }
  };
  const viceCaptainSelect = (player_key: string) => {
    if (captain_key === player_key) {
      dispatch(captainSelection(null));
      dispatch(vicecaptainSelectionAction(player_key));
    } else {
      dispatch(vicecaptainSelectionAction(player_key));
    }
  };

  const navigateToTeamPreviewScreeen = () => {
    // Need to move to formatters
    navigation.navigate('TeamPreviewScreen', {
      from: 1,
      keepers: playersState.filter(
        (item: any) => item.seasonal_role === 'keeper',
      ),
      batsman: playersState.filter(
        (item: any) => item.seasonal_role === 'batsman',
      ),
      all_rounder: playersState.filter(
        (item: any) => item.seasonal_role === 'all_rounder',
      ),
      bowler: playersState.filter(
        (item: any) => item.seasonal_role === 'bowler',
      ),
      cap_key: captain_key,
      vc_key: vc_key,
      team_a: {
        key: matchSelector.team_a,
        count: rolesCountSelector[matchSelector.team_a],
      },
      team_b: {
        key: matchSelector.team_b,
        count: rolesCountSelector[matchSelector.team_b],
      },
      credits_left: availableCredits,
    });
  };

  const saveTeam = async () => {
    try {
      if (!captain_key || !vc_key) {
        errorBox('Please select captain and vice captain', 100);
        return;
      }

      const createTeamObj = createTeamObjCreator();
      if (route.params.mutation) {
        // is edit
        if (route.params.mutation.edit) {
          props.editTeamAPI(createTeamObj);
          return;
        }
        // is clone
        if (route.params.mutation.clone) {
          props.cloneAPI(createTeamObj);
          return;
        }
      }
      // not in a edit and clone, either autojoin or create team
      props.setLoading(true);
      const response: any = await createTeamRemote(createTeamObj);
      props.setLoading(false);
      if (response.status === false) {
        errorBox('Failed to create/update a Team errcode:34242', 500);
        return;
      }
      dispatch(clearTeamAction());
      // if join contest requested
      if (matchSelector.joinContest) {
        // update created team key state
        // console.log('response.data.team_key',response.data.team_key);

        dispatch(UpdateCreateTeamAction(response.data.team_key));
        dispatch(updateJoinModalAction(true));
        navigation.dispatch(StackActions.popToTop());
        return;
      } else {
        navigation.dispatch(StackActions.popToTop());
      }
    } catch (err) {
      errorBox('Error 8678574', 500);
      props.setLoading(false);
      log(err);
    }
  };

  return (
    <View style={[tailwind('h-full'), dT ? clr.bgd1 : clr.bgGray]}>
      <TopBar text={matchSelector.titleString} helpIcon={true} ptsIcon={true} />
      <ScrollView>
        <View style={[ss.root, dT ? ss.dBorder : ss.lBorder]}>
          <Text style={[ss.title, dT ? clr.tw : clr.td1]}>
            Choose your Captain and Vice Captain
          </Text>
          <Text style={[ss.subtxt, dT ? clr.td2 : clr.td1]}>
            C Gets 2x Points, VC gets 1.5x Points
          </Text>
        </View>
        {/* sort header */}
        <SortHeaderCap
          sort={props.sortStatus}
          sortByAction={props.sortByAction}
        />
        {/* {console.log(JSON.stringify(props.allPlayers))} */}
        {props.allPlayers.keeper.map((item: any) => {
          return (
            <PlayerCapSelection
              key={item.key}
              player_key={item.key}
              name={item.name}
              points={item.points}
              teamname={item.team_key}
              is_team_a={item.team_key === matchSelector.team_a}
              seasonRole={item.seasonal_role}
              c={`${item.selCap}%`}
              vc={`${item.selVc}%`}
              is_captain={isPlayerCaptain(item.key)}
              is_vice_captain={isPlayerViceCaptain(item.key)}
              captainSelectAction={captainSelectAction}
              viceCaptainSelect={viceCaptainSelect}
              dT={dT}
            />
          );
        })}
        {props.allPlayers?.batsman?.length > 0 && (
          <View style={[tailwind('h-1 bg-dark-4')]} />
        )}

        {props.allPlayers.batsman.map((item: any) => {
          return (
            <PlayerCapSelection
              key={item.key}
              player_key={item.key}
              name={item.name}
              points={item.points}
              teamname={item.team_key}
              seasonRole={item.seasonal_role}
              is_team_a={item.team_key === matchSelector.team_a}
              c={`${item.selCap}%`}
              vc={`${item.selVc}%`}
              is_captain={isPlayerCaptain(item.key)}
              is_vice_captain={isPlayerViceCaptain(item.key)}
              captainSelectAction={captainSelectAction}
              viceCaptainSelect={viceCaptainSelect}
              dT={dT}
            />
          );
        })}
        {props.allPlayers?.all_rounder?.length > 0 && (
          <View style={[tailwind('h-1 bg-dark-4')]} />
        )}

        {props.allPlayers.all_rounder.map((item: any) => {
          return (
            <PlayerCapSelection
              key={item.key}
              player_key={item.key}
              name={item.name}
              points={item.points}
              teamname={item.team_key}
              seasonRole={item.seasonal_role}
              is_team_a={item.team_key === matchSelector.team_a}
              c={`${item.selCap}%`}
              vc={`${item.selVc}%`}
              is_captain={isPlayerCaptain(item.key)}
              is_vice_captain={isPlayerViceCaptain(item.key)}
              captainSelectAction={captainSelectAction}
              viceCaptainSelect={viceCaptainSelect}
              dT={dT}
            />
          );
        })}

        <View style={[tailwind('h-1 bg-dark-4')]} />

        {props.allPlayers.bowler.map((item: any) => {
          return (
            <PlayerCapSelection
              key={item.key}
              player_key={item.key}
              name={item.name}
              points={item.points}
              teamname={item.team_key}
              seasonRole={item.seasonal_role}
              is_team_a={item.team_key === matchSelector.team_a}
              c={`${item.selCap}%`}
              vc={`${item.selVc}%`}
              is_captain={isPlayerCaptain(item.key)}
              is_vice_captain={isPlayerViceCaptain(item.key)}
              captainSelectAction={captainSelectAction}
              viceCaptainSelect={viceCaptainSelect}
              dT={dT}
            />
          );
        })}

        <View style={[tailwind('h-16')]}></View>
      </ScrollView>
      <View
        style={[tailwind('absolute bottom-0 w-full flex-row justify-center')]}>
        <CapSelectionAction
          navigateToTeamPreviewScreeen={navigateToTeamPreviewScreeen}
          saveTeam={saveTeam}
        />
      </View>

      {props.loading && <BlockScreenByLoading />}
    </View>
  );
}

const ss = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dBorder: {
    borderColor: 'rgba(31, 41, 55,1)',
    borderBottomWidth: 1,
    backgroundColor: '#172338',
  },
  lBorder: {
    borderColor: 'rgba(31, 41, 55,0.1)',
    borderBottomWidth: 1,
    backgroundColor: 'rgba(245, 245, 245, 1)',
  },
  title: {
    fontFamily: 'gadugi-bold',
    textAlign: 'center',
    fontSize: 13,
  },
  subtxt: {
    fontFamily: 'gadugi-normal',
    textAlign: 'center',
    fontSize: 13,
    paddingTop: 8,
  },
});
