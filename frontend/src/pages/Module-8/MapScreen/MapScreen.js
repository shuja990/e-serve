import React, {useEffect} from 'react';
import {useState, useMemo} from 'react';

import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import Pin from './pin.tsx';
import CITIES from './cities.json';
import './MapScreen.css'
import { useDispatch, useSelector } from 'react-redux';
import { paidServicesList } from '../../../actions/paidServiceActions';
import { Link } from 'react-router-dom';
import { communityServicePostsList } from '../../../actions/communityServiceActions';


const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN; // Set your mapbox token here

function MapScreen() {
  const [popupInfo, setPopupInfo] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: "40", lon: "-100" });

  const paidServicesStoreList = useSelector(
    (state) => state.paidServiceList
  );
  const { loading, error, paidServices } = paidServicesStoreList
  const cspostslist = useSelector((state) => state.communityServicePosts)
  const { communityServicePosts } = cspostslist
  
const dispatch= useDispatch()

    useEffect(()=>{
      // geolocateControlRef()
      dispatch(paidServicesList())
      dispatch(communityServicePostsList())

      
    },[dispatch])


     const geolocateControlRef = React.useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);


  // const pins = useMemo(
  //   () =>
  //   paidServices?.map((ps, index) => (
  //       <Marker
  //         key={`marker-${index}`}
  //         longitude={ps.coordinates.lon}
  //         latitude={ps.coordinates.lat}
  //         anchor="bottom"
  //       >
  //         <Pin onClick={() => setPopupInfo(ps)} />
  //       </Marker>
  //     )),
  //   []
  // );

  return (
    <div style={{height: '70vh'}} >
      <Map onLoad={
        ()=>{
           
          
        }
      } 
        initialViewState={{
          latitude: coordinates.lat,
          longitude: coordinates.lon,
          zoom: 3.5,
          bearing: 0,
          pitch: 0,
          width: '100%',
          height: '50vh'
        }}
        
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
        style
      >
        <GeolocateControl position="top-left" ref={geolocateControlRef} />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
{/* PS Posts */}
        {paidServices?
        paidServices.map((ps, index) => (
          <Marker
            key={`marker-${index}`}
            longitude={ps.coordinates.lon}
            latitude={ps.coordinates.lat}
            anchor="bottom"
          >
            <Pin onClick={() => setPopupInfo(ps)} pinColor='red' />
          </Marker>))
        :''}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.coordinates.lon)}
            latitude={Number(popupInfo.coordinates.lat)}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo?.title}, {popupInfo?.price} |{' '}
              <Link
                target="_new"
                to={`/${popupInfo.price?'paidService':'communityserviceposts'}/${popupInfo._id}`}
              >
                View
              </Link>
            </div>
            <img width="100%" src={popupInfo.thumbnailImage} />
          </Popup>
        )}
        {/* CS Posts */}
        {communityServicePosts?
        communityServicePosts.map((ps, index) => (
          <Marker
            key={`marker-${index}`}
            longitude={ps.coordinates.lon}
            latitude={ps.coordinates.lat}
            anchor="bottom"
          >
            <Pin onClick={() => setPopupInfo(ps)} pinColor='green' />
          </Marker>))
        :''}
        
      </Map>

      {/* <ControlPanel /> */}
    </div>
  );
}

export default MapScreen