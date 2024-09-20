import { SvgXml } from 'react-native-svg';
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
<path d="M7.74486 0.292751C8.13152 -0.0964769 8.75967 -0.097744 9.14788 0.289921C9.5361 0.677585 9.53736 1.30738 9.15071 1.69661L3.41035 7.47517L18.0079 7.47518C18.5558 7.47518 19 7.92051 19 8.46986C19 9.0192 18.5558 9.46454 18.0079 9.46454L3.35046 9.46454L9.15071 15.3034C9.53736 15.6926 9.5361 16.3224 9.14788 16.7101C8.75967 17.0977 8.13151 17.0965 7.74486 16.7072L0.289166 9.20193C-0.096389 8.81381 -0.0963889 8.18619 0.289166 7.79807L7.74486 0.292751Z" fill="#dedede"/>
</svg>
`;

interface IconProps {
    size?: string | number,
    color?: string,
}

export const ArrowMoveLeftIcon: React.FC<IconProps> = ({ size, color }) => (
    <SvgXml xml={iconSvg} width={size || "50"} height={size || "50"} fill={color} />
);
