import React, { useEffect, useState } from 'react'
 


const MAPBOX_TOKEN=`pk.eyJ1IjoiY2xpZW50cy1maXJlYmFzZSIsImEiOiJja28wbXpsbWQwZXMyMm5ud3M0bWs0bTJuIn0.Fi78C9sKb-9P4w9tx9A6dg`

function MapScreen() {
    const [viewport, setViewport] = useState({
        latitude: 45.4211,
        longitude: -75.6903,
        width: "200px",
        height: "200px",
        zoom: 10
    })
    return (
        <div>
      MAP
    </div>
    )
}

export default MapScreen