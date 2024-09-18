import React from 'react';
import {SvgCss} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="1239" height="1239" viewBox="0 0 1239 1239" fill="none">
<circle cx="619.569" cy="619.57" r="619" transform="rotate(23.8096 619.569 619.57)" fill="url(#paint0_linear_1939_25)"/>
<defs>
<linearGradient id="paint0_linear_1939_25" x1="619.569" y1="0.570007" x2="619.569" y2="1238.57" gradientUnits="userSpaceOnUse">
<stop stop-color="#2583F0" stop-opacity="0.21"/>
<stop offset="1" stop-color="#FA4ADE" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>
`;

export const IconCircleGradient = ({width, height}) => <SvgCss xml={xml} width={width} height={height}/>;

