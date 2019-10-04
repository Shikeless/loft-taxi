export const apiKey =
    "pk.eyJ1Ijoic2hpa2VsZXNzIiwiYSI6ImNrMGd5NG1rMjBibXYzbm5xOGF6cG12NWsifQ.KGIE9q2V4dOgu8q6HNVWvA";

export const mapInit = (mapContainer, apiKey, mapboxgl) => {
    mapboxgl.accessToken = apiKey;
    let map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [30.35, 59.93],
        zoom: 11.5
    });
    return map;
};
