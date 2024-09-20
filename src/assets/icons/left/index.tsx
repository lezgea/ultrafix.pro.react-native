import { SvgXml } from 'react-native-svg';
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="450" height="450" viewBox="0 0 450 450" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M305.453 442.326C295.207 452.587 278.627 452.554 268.421 442.251L71.6315 243.58C61.4549 233.307 61.4549 216.693 71.6315 206.419L268.421 7.74929C278.627 -2.55381 295.207 -2.58734 305.453 7.67441C315.7 17.9361 315.733 34.6072 305.528 44.9102L127.143 225L305.528 405.09C315.733 415.393 315.7 432.064 305.453 442.326Z" fill="#838383"/>
</svg>
`;

interface IconProps {
    size?: string | number,
    color?: string,
}

export const LeftIcon: React.FC<IconProps> = ({ size, color }) => (
    <SvgXml xml={iconSvg} width={size || "50"} height={size || "50"} fill={color} />
);
