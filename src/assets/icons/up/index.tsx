import { SvgXml } from 'react-native-svg';
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="450" height="450" viewBox="0 0 450 450" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.67439 341.873C-2.58732 331.626 -2.55378 315.047 7.74931 304.841L206.42 108.051C216.693 97.8748 233.307 97.8748 243.58 108.051L442.251 304.841C452.554 315.047 452.587 331.626 442.326 341.873C432.064 352.12 415.393 352.153 405.09 341.948L225 163.563L44.9103 341.948C34.6072 352.153 17.9361 352.12 7.67439 341.873Z" fill="#838383"/>
</svg>
`;

interface IconProps {
    size?: string | number,
    color?: string,
}

export const UpIcon: React.FC<IconProps> = ({ size, color }) => (
    <SvgXml xml={iconSvg} width={size || "50"} height={size || "50"} fill={color} />
);
