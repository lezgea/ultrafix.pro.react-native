import React from 'react';
import { SvgCss } from 'react-native-svg/lib/module/css';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M20 9.51357L17.7359 6.99983L18.0904 3.63459L14.7797 2.9337L13.0909 0L10 1.38137L6.9091 0L5.22032 2.9337L1.90964 3.63459L2.26409 6.99983L0 9.51357L2.26405 12.0273L1.9096 15.3925L5.22028 16.0934L6.90906 19.0271L9.99998 17.6457L13.0909 19.0271L14.7797 16.0934L18.0904 15.3925L17.7359 12.0273L20 9.51357ZM14.1922 7.32398L9.17264 12.9477L5.68456 9.45963L6.5142 8.62999L9.12419 11.24L13.3169 6.54267L14.1922 7.32398Z" fill="#C1C1C1"/>
</svg>
`;

export const IconGrayCheck = ({width, height}) => <SvgCss xml={xml} width={width} height={height}/>;

