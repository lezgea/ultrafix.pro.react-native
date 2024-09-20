import { Linking } from 'react-native';

// Interface for coordinates (latitude and longitude)
interface ICoordinates {
    latitude: number;
    longitude: number;
}

// Interface for parameters (key-value pairs)
interface IParams {
    key: string;
    value: string;
}

// Function Props Interface
interface IGetDirectionsProps {
    destination?: ICoordinates; // Optional coordinates for destination
    source?: ICoordinates; // Optional coordinates for source
    params?: IParams[]; // Optional array of parameters
    waypoints?: ICoordinates[]; // Optional array of waypoints (coordinates)
}

// Utility to check if latitude and longitude are valid numbers
const isValidLatLng = (num: number, range: number): boolean =>
    typeof num === 'number' && num <= range && num >= -1 * range;

// Validate coordinates to check if they are in the valid range
const isValidCoordinates = (coords: ICoordinates): boolean =>
    isValidLatLng(coords.latitude, 90) && isValidLatLng(coords.longitude, 180);

// Function to get parameters for the URL
const getParams = (params: IParams[] = []): string => {
    return params
        .map(({ key, value }) => {
            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(value);
            return `${encodedKey}=${encodedValue}`;
        })
        .join('&');
}

// Function to get waypoints for the URL
const getWaypoints = (waypoints: ICoordinates[] = []): string => {
    if (waypoints.length === 0) {
        return '';
    }

    const params = waypoints
        .map(value => `${value.latitude},${value.longitude}`)
        .join('|');

    return `&waypoints=${params}`;
}

// Main function to get directions and open URL
async function getDirections({ destination, source, params = [], waypoints = [] }: IGetDirectionsProps): Promise<void> {
    if (destination && isValidCoordinates(destination)) {
        params.push({
            key: 'destination',
            value: `${destination.latitude},${destination.longitude}`
        });
    }

    if (source && isValidCoordinates(source)) {
        params.push({
            key: 'origin',
            value: `${source.latitude},${source.longitude}`
        });
    }

    const url = `https://www.google.com/maps/dir/?api=1&${getParams(params)}${getWaypoints(waypoints)}`.replace(/%2C/g, ",");

    return Linking.canOpenURL(url).then(supported => {
        if (!supported) {
            return Promise.reject(new Error(`Could not open the URL: ${url}`));
        } else {
            return Linking.openURL(url);
        }
    });
}

export default getDirections;
