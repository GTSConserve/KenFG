import store from '../store/';
const log = console.log;
import {rolesConstraints} from '../constants/appContants';


export function findARoleNeedToFilled() {
  const {keeper, batsman, all_rounder, bowler} = occupaid_role_count();

  if (batsman < 3) {
    return 'Min 3 Batsman need to be selected';
  }
  if (bowler < 3) {
    return 'Minimum  3 Bowlers need to be selected';
  }
  if (all_rounder < 1) {
    return 'Min 1 All rounder need to be selected';
  } else {
    return 'Min 1 Keeper need to be selected';
  }
}

export function occupaid_role_count() {
  const teamState = store.getState().team;
  const keeper = teamState.players.filter(
    (item: any) => item.seasonal_role === 'keeper',
  ).length;
  const batsman = teamState.players.filter(
    (item: any) => item.seasonal_role === 'batsman',
  ).length;
  const all_rounder = teamState.players.filter(
    (item: any) => item.seasonal_role === 'all_rounder',
  ).length;
  const bowler = teamState.players.filter(
    (item: any) => item.seasonal_role === 'bowler',
  ).length;
  let obj = {
    keeper: {
      occupaid: keeper,
      max: rolesConstraints['keeper'].max,
      min: rolesConstraints['keeper'].min,
      open_slots: rolesConstraints['keeper'].max - keeper,
    },
    batsman: {
      occupaid: batsman,
      max: rolesConstraints['batsman'].max,
      min: rolesConstraints['batsman'].min,
      open_slots: rolesConstraints['batsman'].max - batsman,
    },
    all_rounder: {
      occupaid: all_rounder,
      max: rolesConstraints['all_rounder'].max,
      min: rolesConstraints['all_rounder'].min,
      open_slots: rolesConstraints['all_rounder'].max - all_rounder,
    },
    bowler: {
      occupaid: bowler,
      max: rolesConstraints['bowler'].max,
      min: rolesConstraints['bowler'].min,
      open_slots: rolesConstraints['bowler'].max - bowler,
    },
  };

  log(obj);

  return {keeper, batsman, all_rounder, bowler};
}
