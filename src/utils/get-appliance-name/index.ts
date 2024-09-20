import { getServices } from "../../api";

// Define the type for the service items returned from the API
interface ServiceItem {
    id: number;
    name: string;
    // Add other relevant fields if needed
}

// Refactor the function to handle potential void return and type properly
export default async function getApplianceName(id: number = 2): Promise<ServiceItem[] | void> {
    // let data: ServiceItem[];

    // try {
    //     // Call getServices, which returns Promise<ServiceItem[] | void>
    //     data = await getServices();
    // } catch (error) {
    //     console.error("Failed to fetch services:", error);
    //     return; // Return void in case of an error
    // }

    // // Return the filtered data based on the id
    // return data.filter(item => item.id === id);

    // return null;
}
