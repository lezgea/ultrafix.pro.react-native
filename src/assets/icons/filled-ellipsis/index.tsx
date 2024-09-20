import { SvgXml } from 'react-native-svg';
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="450" height="450" viewBox="0 0 450 450" fill="none">
<path d="M56.6038 168C25.4717 168 0 193.472 0 224.604C0 255.736 25.4717 281.208 56.6038 281.208C87.7359 281.208 113.208 255.736 113.208 224.604C113.208 193.472 87.7359 168 56.6038 168Z" fill="#838383"/>
<path d="M393.396 168C362.264 168 336.792 193.472 336.792 224.604C336.792 255.736 362.264 281.208 393.396 281.208C424.528 281.208 450 255.736 450 224.604C450 193.472 424.528 168 393.396 168Z" fill="#838383"/>
<path d="M168.396 224.604C168.396 193.472 193.868 168 225 168C256.132 168 281.604 193.472 281.604 224.604C281.604 255.736 256.132 281.208 225 281.208C193.868 281.208 168.396 255.736 168.396 224.604Z" fill="#838383"/>
</svg>
`;

interface IconProps {
    size?: string | number,
    color?: string,
}

export const FilledEllipsisIcon: React.FC<IconProps> = ({ size, color }) => (
    <SvgXml xml={iconSvg} width={size || "50"} height={size || "50"} fill={color} />
);
