
import { useState, useEffect } from 'react';

const useUserLocation = () => {
    const [locationName, setLocationName] = useState("Locating...");
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            setLocationName("Unknown Location");
            setLoading(false);
            return;
        }

        const handleSuccess = async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                // Using OpenStreetMap Nominatim for reverse geocoding
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch location name');
                }

                const data = await response.json();

                // Try to get the most relevant name with higher precision
                const address = data.address;
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

                setUserLocation([latitude, longitude]);
                setLocationName(name);
                setError(null);
            } catch (err) {
                console.error("Error fetching location name:", err);
                setLocationName("Unknown Location");
                setError("Failed to get location name");
            } finally {
                setLoading(false);
            }
        };

        const handleError = (error) => {
            console.error("Geolocation error:", error);
            setError("Unable to retrieve your location");
            setLocationName("Location Unavailable");
            setLoading(false);
        };

        navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    }, []);

    return { locationName, userLocation, loading, error };
};

export default useUserLocation;
