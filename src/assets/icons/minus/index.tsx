import { SvgXml } from 'react-native-svg';
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="450" height="450" viewBox="0 0 450 450" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M-2.03484e-06 225.276C-9.11029e-07 212.421 10.421 202 23.2759 202L426.724 202C439.579 202 450 212.421 450 225.276C450 238.131 439.579 248.552 426.724 248.552L23.2759 248.552C10.421 248.552 -3.15865e-06 238.131 -2.03484e-06 225.276Z" />
</svg>
`;

interface IconProps {
    size?: string | number,
    color?: string,
}

export const MinusIcon: React.FC<IconProps> = ({ size, color }) => (
    <SvgXml xml={iconSvg} width={size || "50"} height={size || "50"} fill={color} />
);
