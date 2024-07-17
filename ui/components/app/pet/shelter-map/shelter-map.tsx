import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useRef, useState } from "react";
import styles from "./shelter-map.module.scss";
import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next';

export interface IShelterMapProps {
  address: string;
}
const MapsAPI = process.env.NEXT_PUBLIC_MAPS_API;

/**
 * Renders a map component displaying a location based on the provided address.
 * @ {IShelterMapProps} address - The address of the location to display on the map.
 * @ {JSX.Element} - The rendered map component.
 */
export default function ShelterMap({ address }: IShelterMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  

  useEffect(() => {

    console.log("Maps API Key:", process.env.NEXT_PUBLIC_MAPS_API);


    if (!MapsAPI) {
      console.error("Google Maps API key is not defined");
      return;
    }

    const loader = new Loader({
      apiKey: `${MapsAPI}`,
      version: "weekly",
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const map = new google.maps.Map(mapRef.current as HTMLElement, {
              center: results[0].geometry.location,
              zoom: 14,
            });
            new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
            });
          } else {
            console.error(
              `Geocode was not successful for the following reason: ${status}`
            );
          }
        });
      }
    }).catch(error => {
      console.error("Error loading Google Maps: ", error);
    });
  }, [address]);
  return (
    <>
      <div className={styles.mapContainer} ref={mapRef} />
    </>
  );
}
