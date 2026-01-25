import React from 'react';
import { MapPin, Loader2, BookText, CircleHelp } from 'lucide-react';
import { Link } from 'react-router-dom';

const LocationHeader = ({ locationName = "Locating...", loading = false }) => {

    return (
        <div className="w-full flex justify-between items-center mb-2 pt-2 px-2">
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
