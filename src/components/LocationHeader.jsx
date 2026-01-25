import React, { useState, useEffect } from 'react';
import { MapPin, Loader2, BookText, CircleHelp } from 'lucide-react';
import { Link } from 'react-router-dom';

const LocationHeader = () => {
    const [locationName, setLocationName] = useState("Locating...");
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

    return (
        <div className="w-full flex justify-between items-center mb-6 pt-2 px-2">
            <Link to="/info" className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-surface transition-colors">
                <BookText className="w-6 h-6" />
            </Link>

            <div className="flex-grow flex justify-center mx-2">
                <div className="w-full max-w-sm bg-primary-gradient rounded-full py-2 px-6 flex items-center shadow-lg min-h-[48px]">
                    <div className="mr-3">
                        {loading ? (
                            <Loader2 className="w-5 h-5 text-white animate-spin" />
                        ) : (
                            <MapPin className="w-5 h-5 text-white" />
                        )}
                    </div>
                    <h2 className="text-white font-bold text-lg tracking-wide flex-grow text-center pr-8 truncate">
                        {locationName}
                    </h2>
                </div>
            </div>

            <Link to="/help" className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-surface transition-colors">
                <CircleHelp className="w-6 h-6" />
            </Link>
        </div>
    );
};

export default LocationHeader;
