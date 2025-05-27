// DraggableMarker.jsx
import { Marker } from 'react-leaflet';
import { useRef, useState, useEffect } from 'react';

export default function DraggableMarker({ coords, setCoords, setLocation, reverseGeocode }) {
    const [position, setPosition] = useState(coords);
    const markerRef = useRef(null);

    useEffect(() => {
        setPosition(coords);
    }, [coords]);

    const eventHandlers = {
        dragend: async () => {
            const marker = markerRef.current;
            if (marker != null) {
                const newPos = marker.getLatLng();
                setCoords([newPos.lat, newPos.lng]);
                const address = await reverseGeocode(newPos.lat, newPos.lng);
                setLocation(address);
            }
        },
    };

    return (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
        />
    );
}