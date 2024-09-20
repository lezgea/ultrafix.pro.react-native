import { SvgXml } from 'react-native-svg';
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="450" height="450" viewBox="0 0 450 450" fill="none">
<path d="M168 393.396C168 424.528 193.472 450 224.604 450C255.736 450 281.208 424.528 281.208 393.396C281.208 362.264 255.736 336.792 224.604 336.792C193.472 336.792 168 362.264 168 393.396Z" fill="#838383"/>
<path d="M168 56.6038C168 87.7358 193.472 113.208 224.604 113.208C255.736 113.208 281.208 87.7358 281.208 56.6038C281.208 25.4717 255.736 -3.83506e-06 224.604 -2.47423e-06C193.472 -1.1134e-06 168 25.4717 168 56.6038Z" fill="#838383"/>
<path d="M224.604 281.604C193.472 281.604 168 256.132 168 225C168 193.868 193.472 168.396 224.604 168.396C255.736 168.396 281.208 193.868 281.208 225C281.208 256.132 255.736 281.604 224.604 281.604Z" fill="#838383"/>
</svg>
`;

interface IconProps {
    size?: string | number,
    color?: string,
}

export const FilledEllipsisVerticalIcon: React.FC<IconProps> = ({ size, color }) => (
    <SvgXml xml={iconSvg} width={size || "50"} height={size || "50"} fill={color} />
);
