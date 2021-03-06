// used in most of place where sorting used, the  invert boolean prop change that down arrow to up facing

import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface PropTypes {
  invert: boolean;
}

function Icon(props: PropTypes) {
  const DOWNFACE = 'M7.37743 13.2979L4.18898 16.5001L1 13.2979';
  const UPFACE = 'M6.832 3.90723L3.916 0.979227L1 3.90723';

  return (
    <Svg width="9" height="16" viewBox="0 0 9 18" fill="none">
      <Path
        d="M4 15.6175L4 1.5"
        stroke="#EB5757"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      {/* the arrow part, can swap face direction */}
      <Path
        d={props.invert ? UPFACE : DOWNFACE}
        stroke="#EB5757"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default Icon;
