import React, { useEffect } from "react";
import { useState, useMemo } from "react";

import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import Pin from "./pin.tsx";
import CITIES from "./cities.json";
import "./MapScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { paidServicesList } from "../../../actions/paidServiceActions";
import { Link } from "react-router-dom";
import { communityServicePostsList } from "../../../actions/communityServiceActions";
import { rentPostsList } from "../../../actions/rentActions";
import { Button, Form } from "react-bootstrap";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN; // Set your mapbox token here

function MapScreen() {
  const [popupInfo, setPopupInfo] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: "40", lon: "-100" });
  const [location, setLocation] = useState("");
  const paidServicesStoreList = useSelector((state) => state.paidServiceList);
  const { loading, error, paidServices } = paidServicesStoreList;
  const cspostslist = useSelector((state) => state.communityServicePosts);
  const { communityServicePosts } = cspostslist;
  const rentPostList = useSelector((state) => state.rentPosts);
  const { rentPosts } = rentPostList;
  const [showCS, setShowCS] = useState(true);
  const [showR, setShowRS] = useState(true);
  const [showPS, setShowPS] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    // geolocateControlRef()
    dispatch(paidServicesList());
    dispatch(communityServicePostsList());
    dispatch(rentPostsList());
  }, [dispatch]);

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
    <div style={{ height: "70vh" }}>
      <Form className="d-flex">
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location to filter"
          className="mr-sm-1 ml-sm-5 m-2"
        ></Form.Control>
      </Form>{" "}
      <Button
        variant="danger"
        className="btn-sm m-2"
        onClick={() => setShowCS(!showCS)}
      >
        {showCS ? "Hide Community Services" : "Show Community Services"}
      </Button>
      <Button
        variant="danger"
        className="btn-sm m-2"
        onClick={() => setShowPS(!showPS)}
      >
        {showPS ? "Hide Paid Services" : "Show Paid Services"}
      </Button>
      <Button variant="danger" className="btn-sm m-2" onClick={() => setShowRS(!showR)}>
        {showR ? "Hide Rent Products" : "Show Rent Products"}
      </Button>
      <Map
        onLoad={() => {}}
        initialViewState={{
          latitude: coordinates.lat,
          longitude: coordinates.lon,
          zoom: 3.5,
          bearing: 0,
          pitch: 0,
          width: "100%",
          height: "50vh",
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
        {paidServices && showPS
          ? paidServices
              .filter((e) =>
                e.location.toLowerCase().includes(location.toLowerCase())
              )
              .map((ps, index) => (
                <Marker
                  key={`marker-${index}`}
                  longitude={ps.coordinates.lon}
                  latitude={ps.coordinates.lat}
                  anchor="bottom"
                >
                  <Pin onClick={() => setPopupInfo(ps)} pinColor="red" />
                </Marker>
              ))
          : ""}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.coordinates.lon)}
            latitude={Number(popupInfo.coordinates.lat)}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo?.location}, {popupInfo?.price} |{" "}
              <Link
                target="_new"
                to={`/${
                  popupInfo.price
                    ? "isMovable" in popupInfo
                      ? "rentposts"
                      : "paidservice"
                    : "communityserviceposts"
                }/${popupInfo._id}`}
              >
                View
              </Link>
            </div>
            <img width="100%" src={popupInfo.thumbnailImage} />
          </Popup>
        )}
        {/* CS Posts */}
        {communityServicePosts && showCS
          ? communityServicePosts
              .filter((e) =>
                e.location.toLowerCase().includes(location.toLowerCase())
              )
              .map((ps, index) => (
                <Marker
                  key={`marker-${index}`}
                  longitude={ps.coordinates.lon}
                  latitude={ps.coordinates.lat}
                  anchor="bottom"
                >
                  <Pin onClick={() => setPopupInfo(ps)} pinColor="green" />
                </Marker>
              ))
          : ""}

        {/* Rent Posts */}
        {rentPosts && showR
          ? rentPosts 
              .filter((e) =>
                e.location.toLowerCase().includes(location.toLowerCase())
              )
              .map((ps, index) => (
                <Marker
                  key={`marker-${index}`}
                  longitude={ps.coordinates.lon}
                  latitude={ps.coordinates.lat}
                  anchor="bottom"
                >
                  <Pin onClick={() => setPopupInfo(ps)} pinColor="purple" />
                </Marker>
              ))
          : ""}
      </Map>
      {/* <ControlPanel /> */}
    </div>
  );
}

export default MapScreen;
