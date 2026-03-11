import { useState, useEffect } from 'react';
import { reverseGeocode } from '../utils/geocoding';

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
                const name = await reverseGeocode(latitude, longitude);
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
