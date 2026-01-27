import React from 'react';
import { MapPin, Loader2, BookText, CircleHelp } from 'lucide-react';
import { Link } from 'react-router-dom';

const LocationHeader = ({ locationName = "Locating...", loading = false }) => {

    return (
        <div className="w-full flex justify-center mb-2 pt-2 px-2">
            <div className="w-full max-w-md flex justify-between items-center gap-2">
                <Link to="/info" className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-surface transition-colors shrink-0">
                    <BookText className="w-6 h-6" />
                </Link>

                <div className="flex-1 flex justify-center min-w-0">
                    <div className="w-full max-w-sm bg-primary-gradient rounded-full py-2 px-4 flex items-center shadow-lg min-h-[48px]">
                        <div className="mr-2 shrink-0">
                            {loading ? (
                                <Loader2 className="w-5 h-5 text-white animate-spin" />
                            ) : (
                                <MapPin className="w-5 h-5 text-white" />
                            )}
                        </div>
                        <h2 className="text-white font-bold text-lg tracking-wide flex-grow text-center pr-6 truncate">
                            {locationName}
                        </h2>
                    </div>
                </div>

                <Link to="/help" className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-surface transition-colors shrink-0">
                    <CircleHelp className="w-6 h-6" />
                </Link>
            </div>
        </div>
    );
};

export default LocationHeader;
