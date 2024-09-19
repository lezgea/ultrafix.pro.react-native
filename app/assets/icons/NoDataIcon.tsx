import { SvgXml } from 'react-native-svg';
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve">
<path style="fill:#FFFFFF;" d="M455.612,369.545c9.199,72.482-51.985,133.675-124.467,124.467  c-49.399-6.272-89.293-46.165-95.565-95.565c-9.19-72.474,51.994-133.658,124.476-124.459  C409.455,280.26,449.34,320.145,455.612,369.545z"/>
<path style="fill:#F0F0F0;" d="M363.153,274.441c-31.275-4.873-60.459,3.567-83.166,20.309c19.115-5.666,40.286-6.537,62.31-0.222  c40.038,11.486,70.963,45.261,78.285,86.263c7.987,44.74-11.11,85.658-43.503,109.534c49.681-14.729,84.932-63.309,78.754-118.946  C450.389,322.398,411.844,282.027,363.153,274.441z"/>
<path d="M345.6,256c-70.579,0-128,57.421-128,128s57.421,128,128,128s128-57.421,128-128S416.179,256,345.6,256z M234.667,384  c0-61.167,49.766-110.933,110.933-110.933c27.52,0,52.676,10.129,72.081,26.786L261.453,456.081  C244.796,436.676,234.667,411.52,234.667,384z M345.6,494.933c-27.52,0-52.676-10.129-72.081-26.786L429.756,311.91  c16.649,19.413,26.778,44.57,26.778,72.09C456.533,445.167,406.767,494.933,345.6,494.933z"/>
<path d="M226.133,469.333H55.467V409.6c0-4.71-3.823-8.533-8.533-8.533S38.4,404.89,38.4,409.6v68.267  c0,4.71,3.823,8.533,8.533,8.533h179.2c4.71,0,8.533-3.823,8.533-8.533S230.844,469.333,226.133,469.333z"/>
<path d="M46.933,384h0.085c4.71,0,8.491-3.823,8.491-8.533c0-4.71-3.866-8.533-8.576-8.533s-8.533,3.823-8.533,8.533  C38.4,380.177,42.223,384,46.933,384z"/>
<path d="M46.933,349.867c4.71,0,8.533-3.823,8.533-8.533V17.067H243.2v128c0,4.71,3.823,8.533,8.533,8.533h128v76.8  c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-85.333c0-2.261-0.896-4.437-2.5-6.033L257.766,2.5  c-1.596-1.604-3.772-2.5-6.033-2.5h-204.8C42.223,0,38.4,3.823,38.4,8.533v332.8C38.4,346.044,42.223,349.867,46.933,349.867z   M260.267,29.133l107.401,107.401H260.267V29.133z"/>
<polygon style="fill:#7E939E;" points="367.701,136.533 260.267,136.533 260.267,29.099 "/>
<path style="fill:#AFAFAF;" d="M337.067,153.6v69.717c-59.136,4.181-106.411,52.053-109.653,111.531  c-6.315,15.104-9.813,31.744-9.813,49.152c0,1.707,0,3.413,0.085,5.12c1.365,34.987,16.981,66.475,41.045,88.747h-24.064  c0-4.693-3.84-8.533-8.533-8.533H55.467V409.6c0-4.693-3.84-8.533-8.533-8.533V384h0.085c4.693,0,8.448-3.84,8.448-8.533  s-3.84-8.533-8.533-8.533v-17.067c4.693,0,8.533-3.84,8.533-8.533V17.067H243.2v128c0,4.693,3.84,8.533,8.533,8.533H337.067z"/>
<path style="fill:#7E939E;" d="M379.733,230.4v-2.304v-18.944V153.6h-42.667v51.456v18.261  c-59.136,4.181-106.411,52.053-109.653,111.531C246.784,288.597,292.437,256,345.6,256c15.019,0,29.355,2.56,42.667,7.339v-24.405  C383.573,238.933,379.733,235.093,379.733,230.4z"/>
</svg>
`;

interface IconProps {
    width?: string | number,
    height?: string | number,
    color?: string,
}

export const NoDataIcon: React.FC<IconProps> = ({ width, height, color }) => (
    <SvgXml xml={iconSvg} width={width || "50"} height={height || "50"} fill={color} />
);
