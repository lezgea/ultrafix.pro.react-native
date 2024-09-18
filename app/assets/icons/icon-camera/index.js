import React from 'react';
import {SvgCss} from 'react-native-svg';
const xml = `
<svg viewBox="0 0 450 367" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M136.596 33.7072L124.662 41.3913L50.0037 41.3913C22.7065 41.3913 2.18592e-05 64.0656 1.94762e-05 91.3242L0 316.918C-4.36527e-06 344.176 22.7065 366.851 50.0037 366.851L399.996 366.851C427.293 366.851 450 344.177 450 316.918L450 91.3242C450 64.0657 427.293 41.3913 399.996 41.3913L326.744 41.3913L314.81 33.7072C314.272 32.7957 313.673 31.922 313.017 31.0923C305.763 21.9253 287.168 7 260.953 7H190.453C164.238 7 145.643 21.9253 138.389 31.0923C137.733 31.922 137.134 32.7957 136.596 33.7072Z" fill="url(#paint0_linear_12012:11429)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M225 307.926C280.74 307.926 325.926 262.74 325.926 207C325.926 151.26 280.74 106.074 225 106.074C169.26 106.074 124.074 151.26 124.074 207C124.074 262.74 169.26 307.926 225 307.926ZM225 332C294.036 332 350 276.036 350 207C350 137.964 294.036 82 225 82C155.964 82 100 137.964 100 207C100 276.036 155.964 332 225 332Z" fill="white"/>
<rect x="35" y="82" width="47" height="26" rx="13" fill="white"/>
<path d="M125 42L137.063 20.2109C137.599 19.5211 138.196 18.8599 138.851 18.232C146.087 11.2948 164.637 0 190.788 0H261.116C287.267 0 305.817 11.2948 313.053 18.232C313.708 18.8599 314.305 19.5211 314.841 20.2109L327 41.6216L125 42Z" fill="url(#paint1_linear_12012:11429)"/>
<defs>
<linearGradient id="paint0_linear_12012:11429" x1="27.4998" y1="236" x2="510.5" y2="13.0001" gradientUnits="userSpaceOnUse">
<stop stop-color="#A6A6A6"/>
<stop offset="1" stop-color="#E7DADA"/>
</linearGradient>
<linearGradient id="paint1_linear_12012:11429" x1="125.499" y1="42.3784" x2="289.136" y2="-8.85994" gradientUnits="userSpaceOnUse">
<stop stop-color="#A6A6A6"/>
<stop offset="1" stop-color="#E1D7D7"/>
</linearGradient>
</defs>
</svg>
`;

export const IconCamera = ({width, height}) => <SvgCss xml={xml} width={width} height={height}/>;

