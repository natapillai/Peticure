import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";
import styles from "./shelter-map.module.scss";

export interface IShelterMapProps {
  address: string;
}

/**
 * Renders a map component displaying a location based on the provided address.
 * @ {IShelterMapProps} address - The address of the location to display on the map.
 * @ {JSX.Element} - The rendered map component.
 */
export default function ShelterMap({ address }: IShelterMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  const MapsAPI_Key = process.env.MAPS_API_KEY;

  useEffect(() => {
    const loader = new Loader({
      apiKey: `${MapsAPI_Key}`,
      version: "weekly",
    });

    loader.importLibrary("maps").then(() => {
      new google.maps.Geocoder().geocode(
        { address: address },
        (results, status) => {
          if (status === "OK" && results) {
            const map = new google.maps.Map(mapRef.current as HTMLElement, {
              center: results[0].geometry.location,
              zoom: 14,
            });
            const marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
            });
          } else {
            console.error(
              `Geocode was not successful for the following reason: ${status}`
            );
          }
        }
      );
    });
  }, [address]);
  return (
    <>
      <div className={styles.mapContainer} ref={mapRef} />
    </>
  );
}
