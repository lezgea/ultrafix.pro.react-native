import { SvgXml } from 'react-native-svg';
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="754" height="754" viewBox="0 0 754 754" fill="none">
<rect x="754" width="754" height="754" rx="377" transform="rotate(90 754 0)" fill="url(#paint0_linear_1501_4)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M207.812 367.922C214.387 359.89 226.238 358.698 234.281 365.261L343.29 454.201L506.493 249.685C513.068 241.653 524.919 240.462 532.962 247.024C541.005 253.586 542.194 265.417 535.619 273.449L360.51 492.508C353.934 500.54 342.083 501.731 334.04 495.169L210.468 394.347C202.425 387.785 201.236 375.954 207.812 367.922Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_1501_4" x1="816.072" y1="730.069" x2="1472.53" y2="557.554" gradientUnits="userSpaceOnUse">
<stop stop-color="#2583F0"/>
<stop offset="1" stop-color="#0551A8"/>
</linearGradient>
</defs>
</svg>
`;

interface IconProps {
    width?: string | number,
    height?: string | number,
    color?: string,
}

export const SuccessIcon: React.FC<IconProps> = ({ width, height, color }) => (
    <SvgXml xml={iconSvg} width={width || "50"} height={height || "50"} fill={color} />
);
