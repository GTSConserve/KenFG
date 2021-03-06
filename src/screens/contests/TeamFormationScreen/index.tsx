import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useReducer, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {errorBox} from '../../../utils/snakBars';
import {
  clearTeamAction,
  saveAllPlayersAction,
  updateCreditsAction,
  updateErrorMsgAction,
  updateTeamAction,
  updateTeamCountAction,
} from '../../../store/actions/teamActions';
import {
  allSelecdtedPlayers,
  blockList,
  creditLeft,
  rolesCount,
  selectedMatch,
  userInfo,
} from '../../../store/selectors';
import {
  teamFormationState,
  teamFormationReducer,
  allPlayersSelector,
  sortStatusSelector,
  filerTeamSelector,
} from './team.formation.controller';
import {useCountDown} from '../../../shared_hooks/app.hooks';
import {useIsScreenReady} from '../../../shared_hooks/app.hooks';
import {isFullMatchSelector} from '../../../store/selectors';
import LoadFailedTeamFormation from './atoms/loadfailed.teamformation';
import TeamFormationScreen from './team.formation.screen';
import {useMatchPlayers} from './teamformation.workers';
import {Modalize} from 'react-native-modalize';
import {toPlayerProfile} from '../../../store/actions/navigationActions';
import {FullScreenLoading} from '../../../sharedComponents';
const log = console.log;

export default function TeamFormationHOC() {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const filterSheet = useRef<Modalize>();

  const [formationState, teamFormationDispatch] = useReducer(
    teamFormationReducer,
    teamFormationState,
  );
  const match_players = allPlayersSelector(formationState);
  const sortStatus: any = sortStatusSelector(formationState);
  const filterTeam: any = filerTeamSelector(formationState);

  // console.log('sortStatus >>', sortStatus);

  const [sortByLowCredits, setSortByLowCredits] = useState<boolean>(false);

  const matchSelector: any = useSelector(selectedMatch);
  const userSelector: any = useSelector(userInfo);
  const blockListPlayers: any = useSelector(blockList);
  const isFullMatch: boolean = useSelector(isFullMatchSelector);

  const countDown = useCountDown(matchSelector.start_at, false);

  // log('countDown >>', countDown);

  const selectedPlayers: any = useSelector(allSelecdtedPlayers);
  const rolesCountSelector: any = useSelector(rolesCount);
  const availableCredits = useSelector(creditLeft);

  const isScreenReady = useIsScreenReady();

  const {players, playersAPI, mpError, refetchPlayers}: any = useMatchPlayers(
    matchSelector.match_key,
    userSelector.mobile,
    isFullMatch,
  );

  useEffect(() => {
    dispatch(updateErrorMsgAction(null));
    dispatch(updateTeamAction([matchSelector.team_a, matchSelector.team_b]));
    // if it's not from mutation clear the team formation state on mount
    if (!route.params.mutation) {
      dispatch(clearTeamAction());
    }
  }, []);

  useEffect(() => {
    if (playersAPI) {
      // local state dispatch and global state dispatch
      if (!players) {
        teamFormationDispatch({type: 'UPDATE_PLAYERS', payload: null});
        dispatch(saveAllPlayersAction(null));
        return;
      }
      teamFormationDispatch({type: 'UPDATE_PLAYERS', payload: players});
      dispatch(saveAllPlayersAction(players));
    }
  }, [playersAPI]);

  useEffect(() => {
    dispatch(updateTeamCountAction(rolesCountSelector));
    dispatch(updateCreditsAction(availableCredits));
  }, [selectedPlayers]);

  // refetch players
  function refetch() {
    refetchPlayers();
  }

  const onPressPlayerProfile = (player_key: string, player_role: string) => {
    const player = players[0][player_role].find(
      (item: any) => item.key === player_key,
    );
    if (player) {
      toPlayerProfile(navigation, player);
    }
  };

  // sort filters planning
  function onSortAction(sortBy: string) {
    const payload: any = {
      sortByPoints: null,
      sortByCredits: null,
      sortBySel: null,
    };
    if (sortBy === 'credits') {
      payload.sortByCredits = !sortStatus.sortByCredits;
    }
    if (sortBy === 'points') {
      payload.sortByPoints = !sortStatus.sortByPoints;
    }
    if (sortBy === 'selby') {
      payload.sortBySel = !sortStatus.sortBySel;
    }
    // log('payload', payload);
    teamFormationDispatch({type: 'UPDATE_SORT', payload: payload});
  }

  function onTeamFilterAction(input: any) {
    filterSheet?.current?.close();
    teamFormationDispatch({type: 'UPDATE_TEAM_FILTER', payload: input});
  }

  const navigateToTeamPreviewScreeen = () => {
    // it neeeds to be changed
    navigation.navigate('TeamPreviewScreen', {
      from: 1,
      keepers: selectedPlayers.filter(
        (item: any) => item.seasonal_role === 'keeper',
      ),
      batsman: selectedPlayers.filter(
        (item: any) => item.seasonal_role === 'batsman',
      ),
      all_rounder: selectedPlayers.filter(
        (item: any) => item.seasonal_role === 'all_rounder',
      ),
      bowler: selectedPlayers.filter(
        (item: any) => item.seasonal_role === 'bowler',
      ),
      cap_key: 1,
      vc_key: 1,
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

  const navigateToCapSelection = () => {
    if (selectedPlayers.length === 11) {
      navigation.navigate('CapSelectionScreen', {
        mutation: route.params.mutation,
      });
    } else {
      errorBox('Team requires total 11 players', 0);
    }
  };

  if (mpError) {
    return <LoadFailedTeamFormation refetch={refetch} />;
  }

  if (!isScreenReady || match_players.length === 0) {
    return <FullScreenLoading title={''} />;
  }
  return (
    <TeamFormationScreen
      countDown={countDown}
      players={match_players}
      rolesCount={rolesCountSelector}
      creditsLeft={availableCredits}
      match={matchSelector}
      sortStatus={sortStatus}
      filterTeam={filterTeam}
      navigateToCapSelection={navigateToCapSelection}
      navigateToTeamPreviewScreeen={navigateToTeamPreviewScreeen}
      filterSheet={filterSheet}
      sortByLowCredits={sortByLowCredits}
      setSortByLowCredits={setSortByLowCredits}
      blockListPlayers={blockListPlayers}
      onPressPlayerProfile={onPressPlayerProfile}
      onSortAction={onSortAction}
      onTeamFilterAction={onTeamFilterAction}
    />
  );
}

/**
 * mandatory route params
 *
 * mutation:{edit:true,clone:false,team_key} || false
 *
 */
