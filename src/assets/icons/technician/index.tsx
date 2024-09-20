import { SvgXml } from 'react-native-svg';
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="121" height="121" viewBox="0 0 121 121" fill="none">
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.81397 11.7967C5.59493 11.7967 2.98538 9.15588 2.98538 5.89833C2.98538 2.64077 5.59493 -5.96185e-07 8.81397 0C12.033 -3.6419e-07 14.6426 2.64077 14.6426 5.89833C14.6426 9.15588 12.033 11.7967 8.81397 11.7967ZM8.81397 9.88837C6.62264 9.88837 4.8619 8.09318 4.8619 5.89833C4.8619 3.70347 6.62264 1.90828 8.81397 1.90828C11.0053 1.90828 12.766 3.70347 12.766 5.89833C12.766 8.09318 11.0053 9.88837 8.81397 9.88837Z" fill="#999999"/>
<path d="M0.938262 18.9961C1.45645 18.9961 1.87652 18.5689 1.87652 18.0419C1.87652 17.7029 1.99352 17.3283 2.28544 16.9336C2.58175 16.533 3.04673 16.13 3.6893 15.7701C4.32946 15.4116 5.10997 15.1163 5.99119 14.9119C6.87114 14.7078 7.82138 14.6012 8.78554 14.6012C9.30373 14.6012 9.7238 14.1741 9.7238 13.6471C9.7238 13.1201 9.30373 12.693 8.78554 12.693C7.68867 12.693 6.59805 12.8138 5.57384 13.0514C4.55091 13.2887 3.60127 13.6409 2.78405 14.0985C1.96924 14.5549 1.27818 15.1208 0.785756 15.7866C0.28896 16.4583 -1.52113e-07 17.2267 0 18.0419C0 18.5689 0.420074 18.9961 0.938262 18.9961Z" fill="#999999"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.481 11.7481C15.0807 11.6077 14.6866 11.7072 14.402 11.9409C14.2954 11.9363 14.1887 11.937 14.0822 11.9428C13.7949 11.7125 13.3996 11.6177 13.001 11.7629C12.5646 11.9219 12.161 12.162 11.811 12.4711C11.4912 12.7534 11.3789 13.1503 11.4356 13.5178C11.3785 13.6094 11.3257 13.7037 11.2774 13.8003C10.9376 13.9382 10.6592 14.2389 10.5835 14.6626C10.5007 15.1265 10.5035 15.6019 10.5916 16.0647C10.6722 16.4875 10.954 16.7848 11.2954 16.9187C11.3448 17.0148 11.3987 17.1084 11.4569 17.1993C11.4044 17.5675 11.5213 17.963 11.8443 18.2415C12.1979 18.5463 12.6042 18.7816 13.0424 18.9354C13.4427 19.0759 13.8368 18.9763 14.1214 18.7427C14.228 18.7472 14.3347 18.7466 14.4412 18.7408C14.7285 18.971 15.1238 19.0658 15.5224 18.9206C15.9588 18.7616 16.3624 18.5215 16.7124 18.2124C17.0322 17.9301 17.1445 17.5332 17.0878 17.1658C17.145 17.0742 17.1978 16.9799 17.2461 16.8832C17.5858 16.7453 17.8642 16.4446 17.9399 16.0209C18.0227 15.5571 18.0199 15.0816 17.9318 14.6188C17.8512 14.196 17.5694 13.8987 17.2281 13.7649C17.1787 13.6687 17.1248 13.5751 17.0666 13.4842C17.119 13.116 17.0021 12.7205 16.6791 12.442C16.3255 12.1372 15.9192 11.9019 15.481 11.7481ZM14.5093 13.8675C14.7117 13.9027 14.9248 13.8817 15.121 13.8075C15.1583 14.017 15.2493 14.214 15.3823 14.3732C15.4937 14.5065 15.5813 14.6586 15.641 14.8227C15.7123 15.0185 15.8366 15.1957 15.998 15.3314C15.8382 15.469 15.7159 15.6477 15.6469 15.8444C15.5891 16.0091 15.5033 16.1623 15.3934 16.2969C15.2623 16.4576 15.1736 16.6557 15.1387 16.8657C14.9416 16.7938 14.7283 16.7754 14.5263 16.813C14.3571 16.8444 14.1837 16.8455 14.0142 16.816C13.8117 16.7809 13.5987 16.8018 13.4024 16.8761C13.3651 16.6665 13.2741 16.4695 13.1411 16.3103C13.0297 16.1771 12.9422 16.0249 12.8825 15.8609C12.8112 15.665 12.6868 15.4878 12.5254 15.3521C12.6852 15.2145 12.8075 15.0359 12.8766 14.8391C12.9344 14.6744 13.0202 14.5212 13.13 14.3866C13.2612 14.2259 13.3499 14.0278 13.3848 13.8178C13.5819 13.8898 13.7951 13.9081 13.9972 13.8706C14.1664 13.8391 14.3397 13.8381 14.5093 13.8675Z" fill="#999999"/>
</svg>
`;

interface IconProps {
    size?: string | number,
    color?: string,
}

export const TechnicianIcon: React.FC<IconProps> = ({ size, color }) => (
    <SvgXml xml={iconSvg} width={size || "50"} height={size || "50"} fill={color} />
);
