import { SvgXml } from 'react-native-svg';
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="450" height="450" viewBox="0 0 450 450" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M107.749 7.67439C118.052 -2.58732 134.723 -2.55378 144.985 7.74932L342.858 206.42C353.09 216.693 353.09 233.307 342.858 243.58L144.985 442.251C134.723 452.554 118.052 452.587 107.749 442.326C97.4462 432.064 97.4127 415.393 107.674 405.09L287.041 225L107.674 44.9103C97.4127 34.6072 97.4462 17.9361 107.749 7.67439Z" fill="#838383"/>
</svg>
`;

interface IconProps {
    size?: string | number,
    color?: string,
}

export const RightIcon: React.FC<IconProps> = ({ size, color }) => (
    <SvgXml xml={iconSvg} width={size || "50"} height={size || "50"} fill={color} />
);
