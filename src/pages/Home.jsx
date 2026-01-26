import React, { useState, useEffect } from 'react';
import { HandHeart } from 'lucide-react';
import SafetyRatingCard from '../components/SafetyRatingCard';
import PanicButton from '../components/PanicButton';
import Map from '../components/Map';
import LocationHeader from '../components/LocationHeader';

const Home = () => {
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

    return (
        <div className="flex flex-col h-[calc(100vh-85px)] px-4 pt-4 pb-2 overflow-hidden">
            {/* Minimal Header */}
            <div className="shrink-0">
                <LocationHeader locationName={locationName} loading={loading} />
            </div>

            <div className="shrink-0 animate-fade-in-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
                <SafetyRatingCard location={locationName} />
            </div>

            {/* Map Preview section - Flexible Height */}
            <section className="flex-1 min-h-[140px] my-2 animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards] flex flex-col">
                <div className="w-full h-full bg-primary-gradient rounded-[24px] px-2 pt-2 shadow-xl shadow-primary/20 flex flex-col">
                    <div className="glass-card flex-1 relative overflow-hidden rounded-[24px] border-none p-0 group min-h-0">
                        <Map userLocation={userLocation} />
                    </div>
                    <div className="flex items-center justify-end px-2 py-2 text-white gap-2 shrink-0">
                        <HandHeart size={20} strokeWidth={2.5} />
                        <span className="font-bold text-sm tracking-wide">4 Safe Haven Nearby</span>
                    </div>
                </div>
            </section>

            {/* Emergency Action - Fixed at bottom */}
            <section className="shrink-0 animate-fade-in-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
                <PanicButton />
                <p className="text-center text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1 opacity-50">
                    Press in case of emergency
                </p>
            </section>
        </div>
    );
};

export default Home;
