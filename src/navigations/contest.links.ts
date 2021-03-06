// navigations files related contests feature

import {CommonActions} from '@react-navigation/native';

export const toContestInfo = (navigation: any, contest_key: string) => {
  navigation.dispatch(
    CommonActions.navigate({
      name: 'ContestInfoScreen',
      params: {contest_key},
    }),
  );
  return true;
};

export const toCreateContest = (navigation: any) => {
  navigation.dispatch(
    CommonActions.navigate({
      name: 'CreateContestScreen',
    }),
  );
  return true;
};
