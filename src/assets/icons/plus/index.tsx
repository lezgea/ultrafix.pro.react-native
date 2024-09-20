import { SvgXml } from 'react-native-svg';
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="450" height="450" viewBox="0 0 450 450" fill="none">
<path d="M201.724 426.724C201.724 439.579 212.145 450 225 450C237.855 450 248.276 439.579 248.276 426.724V248.276L426.724 248.276C439.579 248.276 450 237.855 450 225C450 212.145 439.579 201.724 426.724 201.724L248.276 201.724V23.2759C248.276 10.421 237.855 0 225 0C212.145 0 201.724 10.421 201.724 23.2759V201.724L23.2759 201.724C10.421 201.724 0 212.145 0 225C-3.15865e-06 237.855 10.421 248.276 23.2759 248.276L201.724 248.276V426.724Z" />
</svg>
`;

interface IconProps {
    size?: string | number,
    color?: string,
}

export const PlusIcon: React.FC<IconProps> = ({ size, color }) => (
    <SvgXml xml={iconSvg} width={size || "50"} height={size || "50"} fill={color} />
);
