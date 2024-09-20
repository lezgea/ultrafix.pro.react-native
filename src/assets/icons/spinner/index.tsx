import { SvgXml } from 'react-native-svg';
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="449" height="449" viewBox="0 0 449 449" fill="none">
<path d="M224.5 0C102.276 0 2.86851 97.6759 0.0666484 219.227C2.66243 113.175 83.3035 28.0625 182.406 28.0625C283.146 28.0625 364.812 116.01 364.812 224.5C364.812 247.748 383.658 266.594 406.906 266.594C430.154 266.594 449 247.748 449 224.5C449 100.512 348.488 0 224.5 0ZM224.5 449C346.724 449 446.132 351.324 448.933 229.773C446.338 335.825 365.696 420.938 266.594 420.938C165.854 420.938 84.1875 332.99 84.1875 224.5C84.1875 201.252 65.3418 182.406 42.0938 182.406C18.8457 182.406 0 201.252 0 224.5C0 348.488 100.512 449 224.5 449Z" />
</svg>
`;

interface IconProps {
    size?: string | number,
    color?: string,
}

export const SpinnerIcon: React.FC<IconProps> = ({ size, color }) => (
    <SvgXml xml={iconSvg} width={size || "50"} height={size || "50"} fill={color} />
);
