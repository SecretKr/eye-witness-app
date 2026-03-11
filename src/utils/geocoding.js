export const reverseGeocode = async (latitude, longitude) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch location name');
        }

        const data = await response.json();
        const address = data.address;
        
        // Try to get the most relevant name with higher precision
        let name = address.amenity ||
            address.shop ||
            address.leisure ||
            address.tourism ||
            address.historic ||
            address.office ||
            address.building;

        // If no specific POI, try street address
        if (!name) {
            if (address.road || address.pedestrian || address.highway) {
                const road = address.road || address.pedestrian || address.highway;
                name = address.house_number ? `${address.house_number} ${road}` : road;
            }
        }

        // Fallback to neighborhood/district
        if (!name) {
            name = address.hamlet ||
                address.village ||
                address.neighbourhood ||
                address.suburb ||
                address.city_district ||
                address.city ||
                "Unknown Location";
        }

        return name;
    } catch (err) {
        console.error("Error in reverseGeocode:", err);
        return "Unknown Location";
    }
};
