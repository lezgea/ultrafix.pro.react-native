import { SvgXml } from 'react-native-svg';
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="450" height="450" viewBox="0 0 450 450" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M442.326 108.126C452.587 118.373 452.554 134.952 442.251 145.158L243.58 341.948C233.307 352.124 216.693 352.124 206.419 341.948L7.7493 145.158C-2.5538 134.952 -2.58734 118.373 7.67441 108.126C17.9361 97.8791 34.6072 97.8458 44.9102 108.051L225 286.436L405.09 108.051C415.393 97.8458 432.064 97.8791 442.326 108.126Z" fill="#838383"/>
</svg>
`;

interface IconProps {
    size?: string | number,
    color?: string,
}

export const DownIcon: React.FC<IconProps> = ({ size, color }) => (
    <SvgXml xml={iconSvg} width={size || "50"} height={size || "50"} fill={color} />
);
