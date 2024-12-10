import axios from "axios";

// Define a interface para os dados retornados pela API
interface NominatimResponse {
  display_name: string; // O endereço completo retornado pela API
}

// Get Address from Coordinates using Nominatim
export const getAddressFromCoordinates = async (
  latitude: number,
  longitude: number,
): Promise<string> => {
  try {
    const response = await axios.get<NominatimResponse>(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          lat: latitude,
          lon: longitude,
          format: "json",
          addressdetails: 1,
          accept_language: "en",
        },
      },
    );
    return response.data.display_name;
  } catch (error) {
    console.error("Error fetching address from Nominatim:", error);
    throw new Error("Failed to fetch address from coordinates");
  }
};
