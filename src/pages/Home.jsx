import React, { useState, useEffect } from 'react';
import SafetyRatingCard from '../components/SafetyRatingCard';
import PanicButton from '../components/PanicButton';
import Map from '../components/Map';
import LocationHeader from '../components/LocationHeader';

const Home = () => {
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
        <div className="pb-24 px-4 scroll-smooth">
            {/* Minimal Header */}
            <LocationHeader locationName={locationName} loading={loading} />

            <div className="animate-fade-in-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
                <SafetyRatingCard location={locationName} />
            </div>

            {/* Map Preview section */}
            <section className="mb-8 animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
                <div className="flex justify-between items-end mb-3 px-1">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nearby Safe Havens</h3>
                    <button className="text-[10px] font-bold text-secondary uppercase tracking-widest">Expand Map</button>
                </div>
                <div className="glass-card h-64 relative overflow-hidden p-0 border-white/5 shadow-2xl group ring-1 ring-white/10">
                    <Map />
                </div>
            </section>

            {/* Emergency Action */}
            <section className="mt-4 animate-fade-in-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
                <PanicButton />
                <p className="text-center text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2 opacity-50">
                    Press in case of emergency
                </p>
            </section>
        </div>
    );
};

export default Home;
