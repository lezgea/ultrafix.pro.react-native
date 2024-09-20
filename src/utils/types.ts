export interface IGetDirections {
    params: { key: string; value: string; }[];
    waypoints: { latitude: any; longitude: any; }[];
}