// all decisions related to contests
import {TO_TEAMLIST, TO_TEAM_FORMATION} from '../constants/appContants';

import {differenceInSeconds} from 'date-fns';

type toType = 0 | 1;

interface CheckBeforeJoinContestReturn {
  status: boolean;
  to?: toType;
  msg?: string;
}

export function isMatchHaveEnoughTime(time: Date) {
  try {
    const seconds = differenceInSeconds(time, new Date());
    console.log(seconds);

    if (seconds < 2) {
      throw 'no time';
    }
    return true;
  } catch (err) {
    return false;
  }
}

export function didIWantToGoTeamsPage(
  contest: any,
  joinedContests: any,
  AllTeams: any,
) {
  if (!AllTeams || AllTeams.length === 0) {
    return false;
  }
  if (!joinedContests) {
    return true;
  }
  const isAlreadyJoined = joinedContests.find(
    (item: any) => item.contestMeta.contest_code === contest.key,
  );

  if (isAlreadyJoined) {
    const allTeamsKey = AllTeams.map((item: any) => item.team_key);
    const joinedTeamsKey = isAlreadyJoined.joinedTeam.map(
      (item: any) => item.teamCode,
    );
    // console.log('allTeamsKey', allTeamsKey);
    // console.log('joinedTeamsKey', joinedTeamsKey);

    // is all teams are already joined
    if (allTeamsKey.length === joinedTeamsKey.length) {
      return false;
    } else {
      return true;
    }
  }
  return true;
}

// fucntion that used check condition before joining contest
export function checksBeforeJoinContest(
  start_time: Date,
  contest: string,
  joinedContests: any,
  AllTeams: any,
): CheckBeforeJoinContestReturn {
  // console.log(contest);
  try {
    // const isTimeOk = isMatchHaveEnoughTime(start_time);
    // if (!isTimeOk) throw 'Time is Up!';
    const isAnyTeamAvailableToJoin = didIWantToGoTeamsPage(
      contest,
      joinedContests,
      AllTeams,
    );

    if (isAnyTeamAvailableToJoin) {
      return {status: true, to: TO_TEAMLIST};
    } else {
      return {status: true, to: TO_TEAM_FORMATION};
    }
  } catch (err) {
    console.log('checksBeforeJoinContest', err);

    return {
      status: false,
      msg: typeof err === 'string' ? err : 'unhandled error',
    };
  }
}
