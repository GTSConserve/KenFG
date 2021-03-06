import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  isFullMatchSelector,
  selectedMatch,
  userInfo,
} from '../../../store/selectors';
import {
  useContestLeaderboard,
  useContestList,
  useGetTeams,
  useJoinedContests,
  usePrivateContestList,
} from '../../../shared_hooks/contest.hooks';
import ContestInfoScreen from './contest.info.screen';
import {checksBeforeJoinContest} from '../../../workers/contest.decision';
import {
  toTeamFormationNoAutoJoin,
  toTeamFormationWithAutoJoin,
  toTeamPreview,
} from '../../../store/actions/navigationActions';
import {toSwitchTeam} from '../../../store/actions/navigationActions';
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/core';
import {TO_TEAMLIST} from '../../../constants/appContants';
import {errorBox} from '../../../utils/snakBars';

export default function ContestInfoHOC() {
  const navigation = useNavigation();
  const route: any = useRoute();

  const [contestInfo, setContestInfo] = useState<any>(null);
  const [current, setCurrent] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const matchSelector: any = useSelector(selectedMatch);
  const userSelector: any = useSelector(userInfo);
  const isFullMatch: boolean = useSelector(isFullMatchSelector);

  // contests list
  const {contests}: any = useContestList(
    matchSelector.match_key,
    userSelector.mobile,
    isFullMatch,
  );
  // private contests list
  const {p_ctst, rfp_ctst} = usePrivateContestList(
    matchSelector.match_key,
    userSelector.mobile,
  );

  const {ldbMeta, ldbLive, ldbErr, refetchLeaderBoard}: any =
    useContestLeaderboard(
      matchSelector.match_key,
      route.params.contest_key,
      userSelector.mobile,
    );

  const {joined, joinedAPI}: any = useJoinedContests(
    matchSelector.match_key,
    userSelector.mobile,
    isFullMatch,
  );

  const {teams, teamsAPI}: any = useGetTeams(
    matchSelector.match_key,
    userSelector.mobile,
    isFullMatch,
  );

  // load and set the contest info in contest list API
  useEffect(() => {
    if (contests) {
      const contestInfo = contests.find(
        (item: any) => item.key === route.params.contest_key,
      );
      if (contestInfo) {
        setContestInfo(contestInfo);
      }
    }
  }, [contests]);

  // load and set the contest info in private contest list API
  useEffect(() => {
    if (p_ctst) {
      const contestInfo = p_ctst.find(
        (item: any) => item.key === route.params.contest_key,
      );
      if (contestInfo) {
        setContestInfo(contestInfo);
      }
    }
  }, [p_ctst]);

  // refetch on focus
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  function onPressCreateTeam(){
    toTeamFormationNoAutoJoin(navigation)
  }

  function openWallet(input: boolean) {
    if (input) {
      setShowWalletModal(true);
    } else {
      setShowWalletModal(false);
    }
  }

  function refetch() {
    refetchLeaderBoard();
  }

  function changePriceDistribution() {
    setCurrent(!current);
  }

  function lbProfileOnPress(player_key: string, teamCode: string) {
    try {
      // is selected player is current player
      const player = ldbMeta.find(
        (item: any) => item.player_key === player_key,
      );
      if (player.is_current === false) {
        errorBox('Please wait till the match starts to view other teams', 0);
        return;
      }
      // if the current player team previe their teams
      const sTeam = teams.find((item: any) => item.team_key === teamCode);
      if (sTeam) {
        toTeamPreview(navigation, sTeam);
      }
    } catch (err) {
      errorBox('lbProfileOnPress failed', 0);
      console.log(err);
    }
  }

  function teamSwapOnPress(teamCode: string) {
    try {
      const {contest_key} = route.params;
      // console.log(route.params.contest_key);
      const jContest = joined.find(
        (item: any) => item.contestMeta.contest_code === contest_key,
      );
      // console.log(jContest.contestMeta.contest_team);

      toSwitchTeam(navigation, {
        match_key: matchSelector.match_key,
        contest_key: contest_key,
        old_team_key: teamCode,
        player_key: userSelector.mobile,
        existedTeams: jContest.contestMeta.contest_team,
      });
      // console.log(teamCode);
    } catch (err) {
      console.log(err);
      errorBox('teamSwapPressed failed', 0);
    }
  }

  // if you change something in here, don't forget copy paste, on
  //2nd innings and create contest, contest info screen
  async function proceedToJoin(contest_key: string) {
    try {
      const contest = contestInfo;
      if (!contest) throw 'no contests';
      const teamAvailCheck = checksBeforeJoinContest(
        matchSelector.start_at,
        contest,
        joined,
        teams,
      );
      if (!teamAvailCheck.status) {
        throw 'proceed to join check error';
      }
      toTeamFormationWithAutoJoin(
        navigation,
        teamAvailCheck.to === TO_TEAMLIST,
        {
          contestKey: contest.key,
          entryAmount: contest.entry,
          maxTeam: contest.max_entry,
          isFullMatch: contest.innings === '1',
        },
      );
    } catch (err) {
      console.log('err', err);
    }
  }

  return (
    <ContestInfoScreen
      contestInfo={contestInfo}
      priceDist={current}
      changePriceDistribution={changePriceDistribution}
      userSelector={userSelector}
      openWallet={openWallet}
      showWalletModal={showWalletModal}
      setShowWalletModal={setShowWalletModal}
      proceedToJoin={proceedToJoin}
      ldbLive={ldbLive}
      ldbMeta={ldbMeta}
      ldbErr={ldbErr}
      lbProfileOnPress={lbProfileOnPress}
      teamSwapOnPress={teamSwapOnPress}
      onPressCreateTeam={onPressCreateTeam}
    />
  );
}
