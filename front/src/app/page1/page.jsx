"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page1.module.css";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function GeoLocation() {
    const [localicao, setLocalizacao] = useState(null);
    const mapaRef = useRef(null);

    useEffect(() => {
        const link = document.createElement("link");
        link.href= "https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.css";
        link.rel = "stylesheet";
        document.head.appendChild(link);

        const script = document.createElement("script");
        script.src = "https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.js";

        script.onload = () => {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const coords = [pos.coords.longitude, pos.coords.latitude];
                    setLocalizacao(coords);

                    mapboxgl.acessToken = TOKEN;
                    const map = new mapboxgl.MAp({
                        container: mapaRef.current,
                        style: "mapboox://styles/mapbox/streets-v12",
                        center: coords,
                        zoom: 14
                    });

                    new mapboxgl.Marker({ color: "#FF0000"})
                    .setLngLat(coords)
                    .setPopup(new mapboxgl.Popup().setHTML("<h1>Voce esta aqui<h1>"))
                    .addTo(map);
                },
                () => alert("Não foi possivel obter sua localização")
            )
        };
        document.body.appendChild(script);
    }, []);

    return (
        <div className={styles.container}>
            <div ref={mapaRef} className={styles.mapa}>

            {localizacao && (
                <div className={styles.info}>
                    <h2>Sua Localização</h2>
                    <p>Longitude: {localizacao[0].toFixed(2)}</p>
                    <p>Latitude: {localizacao[1].toFixed(2)}</p>
           
         </div>
        )}
         </div>
         </div>
    );

}

