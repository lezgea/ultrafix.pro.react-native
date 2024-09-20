import { SvgXml } from 'react-native-svg';
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="450" height="450" viewBox="0 0 450 450" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M220.285 279.394C142.754 279.394 79.903 216.85 79.903 139.697C79.903 62.5446 142.754 -1.41202e-05 220.285 0C297.816 -8.62555e-06 360.667 62.5446 360.667 139.697C360.667 216.85 297.816 279.394 220.285 279.394ZM220.285 234.198C167.507 234.198 125.099 191.681 125.099 139.697C125.099 87.7138 167.507 45.1961 220.285 45.1962C273.063 45.1962 315.471 87.7139 315.471 139.697C315.471 191.681 273.063 234.198 220.285 234.198Z" fill="#838383"/>
<path d="M30.5981 449.907C43.0787 449.907 53.1962 439.79 53.1962 427.309C53.1962 419.28 56.0139 410.408 63.045 401.06C70.1815 391.571 81.3808 382.026 96.8569 373.502C112.275 365.011 131.074 358.018 152.298 353.176C173.492 348.342 196.378 345.819 219.6 345.819C232.081 345.819 242.198 335.702 242.198 323.221C242.198 310.74 232.081 300.623 219.6 300.623C193.182 300.623 166.914 303.485 142.246 309.112C117.609 314.732 94.7367 323.073 75.0541 333.913C55.4293 344.721 38.785 358.124 26.925 373.893C14.9596 389.802 8 408 8 427.309C8 439.79 18.1175 449.907 30.5981 449.907Z" fill="#838383"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M380.862 278.245C371.22 274.918 361.728 277.276 354.872 282.81C352.306 282.703 349.736 282.718 347.171 282.855C340.251 277.402 330.731 275.155 321.129 278.595C310.618 282.36 300.899 288.048 292.468 295.367C284.766 302.054 282.062 311.454 283.427 320.159C282.051 322.327 280.779 324.56 279.616 326.85C271.433 330.116 264.727 337.237 262.905 347.273C260.911 358.258 260.977 369.519 263.1 380.48C265.04 390.493 271.829 397.535 280.049 400.705C281.239 402.982 282.537 405.2 283.939 407.352C282.676 416.072 285.491 425.439 293.27 432.035C301.787 439.255 311.572 444.828 322.126 448.47C331.768 451.797 341.26 449.439 348.115 443.905C350.682 444.013 353.253 443.998 355.818 443.86C362.738 449.313 372.257 451.559 381.859 448.12C392.37 444.355 402.089 438.667 410.52 431.347C418.222 424.661 420.926 415.261 419.561 406.557C420.938 404.388 422.21 402.155 423.373 399.864C431.555 396.598 438.26 389.477 440.082 379.442C442.077 368.457 442.011 357.196 439.888 346.235C437.948 336.222 431.16 329.18 422.939 326.01C421.749 323.733 420.451 321.515 419.049 319.362C420.312 310.643 417.497 301.275 409.718 294.68C401.201 287.46 391.416 281.886 380.862 278.245ZM357.457 328.441C362.333 329.274 367.464 328.778 372.191 327.019C373.089 331.982 375.281 336.648 378.484 340.418C381.167 343.574 383.276 347.178 384.714 351.063C386.431 355.702 389.426 359.899 393.313 363.112C389.464 366.372 386.518 370.603 384.856 375.262C383.464 379.164 381.398 382.792 378.752 385.98C375.593 389.786 373.456 394.478 372.616 399.451C367.869 397.747 362.732 397.312 357.866 398.202C353.791 398.947 349.616 398.972 345.532 398.274C340.656 397.442 335.525 397.937 330.798 399.696C329.9 394.733 327.708 390.067 324.505 386.298C321.822 383.141 319.713 379.538 318.275 375.653C316.558 371.013 313.563 366.817 309.676 363.603C313.525 360.344 316.47 356.112 318.133 351.453C319.525 347.552 321.591 343.924 324.237 340.736C327.396 336.929 329.533 332.237 330.372 327.264C335.12 328.968 340.257 329.403 345.123 328.513C349.198 327.768 353.373 327.744 357.457 328.441Z" fill="#838383"/>
</svg>
`;

interface IconProps {
    size?: string | number,
    color?: string,
}

export const UserSettingsIcon: React.FC<IconProps> = ({ size, color }) => (
    <SvgXml xml={iconSvg} width={size || "50"} height={size || "50"} fill={color} />
);
