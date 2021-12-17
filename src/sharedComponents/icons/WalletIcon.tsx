import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

interface PropTypes {
  darkColor: boolean;
}

function Icon(props: PropTypes) {
  return (
    <Svg width={22} height={20} fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.574 19.998c-2.47 0-4.941.002-7.411-.001-1.039-.002-1.88-.613-2.087-1.519a3.172 3.172 0 01-.075-.7c-.004-3.518.01-7.038-.01-10.557C.983 5.885 1.995 4.936 3.175 5.03c.383.031.656-.098.927-.374C5.545 3.186 7.008 1.738 8.463.282c.376-.376.519-.377.898 0l1.35 1.352c.286.288.3.289.58.008L12.68.248c.332-.331.5-.33.836.005 1.497 1.498 2.99 2.999 4.496 4.486.156.155.38.276.594.33.826.208 1.488.915 1.527 1.767.042.94.028 1.881.026 2.822 0 .263.05.451.308.597.378.215.535.589.537 1.018.005.823.006 1.647 0 2.47-.004.454-.19.826-.59 1.05-.206.115-.252.265-.252.476.005.872 0 1.744-.002 2.617-.002.877-.381 1.543-1.18 1.904-.318.143-.701.196-1.055.199-2.451.017-4.902.01-7.352.01zm.028-14.234h-7.38c-.949 0-1.467.518-1.47 1.471-.003 1.059-.001 2.118-.001 3.176 0 2.45-.005 4.9.01 7.35.001.283.062.594.191.84.277.527.78.656 1.347.655 3.185-.008 6.37-.003 9.556-.003 1.705 0 3.41.004 5.116-.003.924-.004 1.436-.528 1.438-1.442v-2.353c0-.489-.001-.49-.505-.493-1.02-.004-2.04.022-3.058-.018-.996-.038-1.705-.576-2.081-1.479-.698-1.675.484-3.41 2.304-3.424 1.01-.007 2.019-.006 3.028 0 .22.002.318-.056.315-.298-.011-.911.01-1.823-.016-2.734-.006-.23-.104-.48-.227-.679-.296-.478-.776-.572-1.304-.57-2.42.009-4.842.004-7.262.004zm7.213 8.456v-.004c.636 0 1.273.007 1.91-.003.37-.006.522-.152.527-.522a85.02 85.02 0 000-2.38c-.005-.353-.16-.515-.504-.518-1.273-.008-2.547-.028-3.819.008-.94.027-1.648.833-1.62 1.75a1.719 1.719 0 001.714 1.666c.597.01 1.194.003 1.792.003zm-.678-9.227c-.1-.129-.15-.209-.216-.274-1.197-1.199-2.398-2.394-3.59-3.597-.183-.185-.296-.173-.474.006-1.177 1.19-2.366 2.371-3.549 3.557-.076.076-.137.17-.248.308h8.077zm-12.282-.03c.143.034.197.058.252.058.872.003 1.744.01 2.616-.008.135-.003.292-.107.396-.208.686-.671 1.361-1.354 2.04-2.034.095-.096.185-.197.335-.358-.446-.424-.88-.831-1.31-1.245-.277-.268-.274-.273-.551.004-.887.886-1.774 1.772-2.66 2.66-.357.357-.71.72-1.118 1.132z"
        fill="url(#prefix__paint0_linear_296_1387)"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.037 13.295a.798.798 0 01-.802-.772.786.786 0 01.798-.802c.435.002.79.354.788.782a.8.8 0 01-.784.792z"
        fill="url(#prefix__paint1_linear_296_1387)"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear_296_1387"
          x1={11}
          y1={0}
          x2={11}
          y2={20}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor={props.darkColor ? '#3A2B13' : '#D8C872'} />
          <Stop
            offset={1}
            stopColor={props.darkColor ? '#3A2B13' : '#D8C872'}
          />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear_296_1387"
          x1={16.028}
          y1={11.721}
          x2={16.028}
          y2={13.295}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor={props.darkColor ? '#816D2E' : '#D8C872'} />
          <Stop
            offset={1}
            stopColor={props.darkColor ? '#816D2E' : '#D8C872'}
          />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default Icon;
