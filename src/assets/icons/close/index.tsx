import { SvgXml } from 'react-native-svg';
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="450" height="450" viewBox="0 0 450 450" fill="none">
<path d="M48.4384 8.27782C37.3264 -2.79025 19.3459 -2.75465 8.27782 8.35734C-2.79025 19.4693 -2.75465 37.4498 8.35734 48.5179L185.899 225.358L9.73564 401.522C-1.35441 412.612 -1.35441 430.592 9.73564 441.682C20.8257 452.772 38.8062 452.772 49.8963 441.682L226.14 265.439L399.238 437.854C410.35 448.922 428.331 448.886 439.399 437.774C450.467 426.662 450.431 408.682 439.319 397.614L266.3 225.279L440.005 51.5733C451.095 40.4833 451.095 22.5027 440.005 11.4127C428.915 0.322633 410.935 0.322628 399.845 11.4127L226.06 185.197L48.4384 8.27782Z" fill="#838383"/>
</svg>
`;

interface IconProps {
    size?: string | number,
    color?: string,
}

export const CloseIcon: React.FC<IconProps> = ({ size, color }) => (
    <SvgXml xml={iconSvg} width={size || "50"} height={size || "50"} fill={color} />
);
