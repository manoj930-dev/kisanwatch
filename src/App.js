// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import L from 'leaflet';
// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';

// // Leaflet के डिफ़ॉल्ट आइकन URLs सेट करें
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

// const OPENWEATHER_API_KEY = 'd730583aadaec8e9b73e4357b84d09c6';

// // GeocoderControl कंपोनेंट
// function GeocoderControl({ setLocation, setWeather }) {
//   const map = useMap();

//   useEffect(() => {
//     // leaflet-control-geocoder स्क्रिप्ट लोड करें
//     const script = document.createElement('script');
//     script.src = 'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js';
//     script.async = true;
//     script.onload = () => {
//       if (window.L.Control.Geocoder) {
//         const geocoder = window.L.Control.Geocoder.nominatim();
//         const control = window.L.Control.geocoder({
//           geocoder: geocoder,
//           position: 'topright',
//           defaultMarkGeocode: true
//         })
//         .on('markgeocode', function(e) {
//           const latlng = e.geocode.center;
//           setLocation([latlng.lat, latlng.lng]);
//           map.setView(latlng, 13);

//           // चयनित स्थान के लिए मौसम डेटा प्राप्त करें
//           axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng.lat}&lon=${latlng.lng}&appid=d730583aadaec8e9b73e4357b84d09c6&units=metric&lang=hi`)
//             .then(res => setWeather(res.data))
//             .catch(err => console.error("Weather API error:", err));
//         })
//         .addTo(map);
//       }
//     };
//     document.body.appendChild(script);
//   }, [map, setLocation, setWeather]);

//   return null;
// }

// function App() {
//   const [location, setLocation] = useState(null);
//   const [weather, setWeather] = useState(null);

//   useEffect(() => {
//     // उपयोगकर्ता की वर्तमान लोकेशन प्राप्त करें
//     navigator.geolocation.getCurrentPosition((pos) => {
//       const { latitude, longitude } = pos.coords;
//       setLocation([latitude, longitude]);

//       // वर्तमान स्थान के लिए मौसम डेटा प्राप्त करें
//       axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d730583aadaec8e9b73e4357b84d09c6&units=metric&lang=hi`)
//         .then(res => setWeather(res.data))
//         .catch(err => console.error("Weather API error:", err));
//     }, (err) => {
//       console.error("Geolocation error:", err);
//       alert("कृपया लोकेशन एक्सेस की अनुमति दें।");
//     });
//   }, []);

//   return (
//     <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f0fff0' }}>
//       <h1 style={{ textAlign: 'center', color: 'green' }}>🌾 किसान मौसम सेवा 🌦️</h1>

//       {location ? (
//         <div style={{ height: '400px', width: '100%', marginBottom: '20px' }}>
//           <MapContainer center={location} zoom={13} style={{ height: '100%', width: '100%' }}>
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <GeocoderControl setLocation={setLocation} setWeather={setWeather} />
//             <Marker position={location}>
//               <Popup>
//                 आप यहाँ हैं 🌍
//               </Popup>
//             </Marker>
//           </MapContainer>
//         </div>
//       ) : (
//         <p>लोकेशन लोड हो रही है...</p>
//       )}

//       {weather ? (
//         <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '20px', backgroundColor: '#e0ffe0', padding: '10px', borderRadius: '10px' }}>
//           <p>🌡️ तापमान: {weather.main.temp}°C</p>
//           <p>💧 नमी: {weather.main.humidity}%</p>
//           <p>🌬️ हवा की रफ्तार: {weather.wind.speed} m/s</p>
//           <p>📍 स्थान: {weather.name}</p>
//         </div>
//       ) : (
//         <p>मौसम डेटा लोड हो रहा है...</p>
//       )}
//     </div>
//   );
// }

// export default App;


// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
// import L from 'leaflet';
// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

// const OPENWEATHER_API_KEY = 'd730583aadaec8e9b73e4357b84d09c6';

// function GeocoderControl({ setLocation, setWeather }) {
//   const map = useMap();

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js';
//     script.async = true;
//     script.onload = () => {
//       if (window.L.Control.Geocoder) {
//         const geocoder = window.L.Control.Geocoder.nominatim();
//         const control = window.L.Control.geocoder({
//           geocoder,
//           position: 'topright',
//           defaultMarkGeocode: true
//         })
//         .on('markgeocode', function (e) {
//           const latlng = e.geocode.center;
//           setLocation([latlng.lat, latlng.lng]);
//           map.setView(latlng, 15);

//           axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng.lat}&lon=${latlng.lng}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=hi`)
//             .then(res => setWeather(res.data))
//             .catch(err => console.error("Weather API error:", err));
//         })
//         .addTo(map);
//       }
//     };
//     document.body.appendChild(script);
//   }, [map, setLocation, setWeather]);

//   return null;
// }

// function App() {
//   const [location, setLocation] = useState(null);
//   const [weather, setWeather] = useState(null);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((pos) => {
//       const { latitude, longitude } = pos.coords;
//       setLocation([latitude, longitude]);

//       axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=hi`)
//         .then(res => setWeather(res.data))
//         .catch(err => console.error("Weather API error:", err));
//     }, (err) => {
//       console.error("Geolocation error:", err);
//       alert("कृपया लोकेशन एक्सेस की अनुमति दें।");
//     });
//   }, []);

//   return (
//     <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f0fff0' }}>
//       <h1 style={{ textAlign: 'center', color: 'green' }}>🌾 किसान मौसम सेवा 🌦️</h1>

//       {location ? (
//         <div style={{ height: '450px', width: '100%', marginBottom: '20px' }}>
//          <MapContainer
//   center={location}
//   zoom={13}
//   minZoom={5}
//   maxZoom={19}
//   style={{ height: '100%', width: '100%' }}
//   zoomControl={true}
//   scrollWheelZoom={true}
//   doubleClickZoom={true}
//   dragging={true}
// >
//   <LayersControl position="topright">
//     <LayersControl.BaseLayer checked name="सामान्य मानचित्र">
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//     </LayersControl.BaseLayer>
//     <LayersControl.BaseLayer name="उपग्रह दृश्य (Satellite)">
//       <TileLayer
//         url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//         attribution="Tiles © Esri"
//         maxNativeZoom={19}   // Tile server ka maximum native zoom
//       />
//     </LayersControl.BaseLayer>
//   </LayersControl>

//   <GeocoderControl setLocation={setLocation} setWeather={setWeather} />

//   <Marker position={location}>
//     <Popup>🌱 आप यहाँ हैं</Popup>
//   </Marker>
// </MapContainer>

//         </div>
//       ) : (
//         <p>📍 लोकेशन लोड हो रही है...</p>
//       )}

//       {weather ? (
//         <div style={{
//           textAlign: 'center',
//           marginTop: '20px',
//           fontSize: '20px',
//           backgroundColor: '#e0ffe0',
//           padding: '10px',
//           borderRadius: '10px'
//         }}>
//           <p>🌡️ तापमान: {weather.main.temp}°C</p>
//           <p>💧 नमी: {weather.main.humidity}%</p>
//           <p>🌬️ हवा की रफ्तार: {weather.wind.speed} m/s</p>
//           <p>📍 स्थान: {weather.name}</p>
//         </div>
//       ) : (
//         <p>☁️ मौसम डेटा लोड हो रहा है...</p>
//       )}
//     </div>
//   );
// }

// export default App;


// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
// import L from 'leaflet';
// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

// const OPENWEATHER_API_KEY = 'd730583aadaec8e9b73e4357b84d09c6';

// function GeocoderControl({ setLocation, setWeather, setForecast }) {
//   const map = useMap();

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js';
//     script.async = true;
//     script.onload = () => {
//       if (window.L.Control.Geocoder) {
//         const geocoder = window.L.Control.Geocoder.nominatim();
//         const control = window.L.Control.geocoder({
//           geocoder,
//           position: 'topright',
//           defaultMarkGeocode: true
//         })
//         .on('markgeocode', function (e) {
//           const latlng = e.geocode.center;
//           setLocation([latlng.lat, latlng.lng]);
//           map.setView(latlng, 15);
//           fetchWeather(latlng.lat, latlng.lng);
//         })
//         .addTo(map);
//       }
//     };
//     document.body.appendChild(script);
//   }, [map, setLocation, setWeather]);

//   const fetchWeather = async (lat, lon) => {
//     try {
//       const current = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=hi`);
//       setWeather(current.data);

//       const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=hi`);
//       setForecast(forecast.data.list.slice(0, 5));
//     } catch (err) {
//       console.error("Weather API error:", err);
//     }
//   };

//   return null;
// }

// function getTip(temp, humidity, windSpeed) {
//   if (humidity > 80) return "🌧️ नमी ज़्यादा है, फिलहाल सिंचाई से बचें।";
//   if (temp > 35) return "☀️ तेज़ गर्मी है, शाम को खेत में पानी दें।";
//   if (windSpeed > 10) return "💨 तेज़ हवा है, छिड़काव से बचें।";
//   return "✅ मौसम अनुकूल है, खेती के लिए सही समय है।";
// }

// function App() {
//   const [location, setLocation] = useState(null);
//   const [weather, setWeather] = useState(null);
//   const [forecast, setForecast] = useState([]);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(async (pos) => {
//       const { latitude, longitude } = pos.coords;
//       setLocation([latitude, longitude]);

//       try {
//         const current = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=hi`);
//         setWeather(current.data);

//         const forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=hi`);
//         setForecast(forecastRes.data.list.slice(0, 5));
//       } catch (err) {
//         console.error("Weather API error:", err);
//       }

//     }, (err) => {
//       console.error("Geolocation error:", err);
//       alert("कृपया लोकेशन एक्सेस की अनुमति दें।");
//     });
//   }, []);

//   return (
//     <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f0fff0' }}>
//       <h1 style={{ textAlign: 'center', color: 'green' }}>🌾 किसान मौसम सेवा 🌦️</h1>

//       {location ? (
//         <div style={{ height: '450px', width: '100%', marginBottom: '20px' }}>
//           <MapContainer
//             center={location}
//             zoom={13}
//             minZoom={5}
//             maxZoom={19}
//             style={{ height: '100%', width: '100%' }}
//             zoomControl={true}
//             scrollWheelZoom={true}
//           >
//             <LayersControl position="topright">
//               <LayersControl.BaseLayer checked name="सामान्य मानचित्र">
//                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//               </LayersControl.BaseLayer>
//               <LayersControl.BaseLayer name="उपग्रह दृश्य (Satellite)">
//                 <TileLayer
//                   url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//                   attribution="Tiles © Esri"
//                 />
//               </LayersControl.BaseLayer>
//             </LayersControl>

//             <GeocoderControl setLocation={setLocation} setWeather={setWeather} setForecast={setForecast} />

//             <Marker position={location}>
//               <Popup>🌱 आप यहाँ हैं</Popup>
//             </Marker>
//           </MapContainer>
//         </div>
//       ) : (
//         <p>📍 लोकेशन लोड हो रही है...</p>
//       )}

//       {weather && (
//         <div style={{
//           textAlign: 'center',
//           marginTop: '20px',
//           fontSize: '20px',
//           backgroundColor: '#e0ffe0',
//           padding: '10px',
//           borderRadius: '10px'
//         }}>
//           <p>🌡️ तापमान: {weather.main.temp}°C</p>
//           <p>💧 नमी: {weather.main.humidity}%</p>
//           <p>🌬️ हवा की रफ्तार: {weather.wind.speed} m/s</p>
//           <p>📍 स्थान: {weather.name}</p>
//         </div>
//       )}

//       {weather && (
//         <div style={{
//           marginTop: '20px',
//           backgroundColor: '#fff3cd',
//           padding: '15px',
//           borderRadius: '10px',
//           fontSize: '18px',
//           fontWeight: 'bold',
//           textAlign: 'center',
//           border: '2px dashed orange'
//         }}>
//           🧠 खेती सलाह: {getTip(weather.main.temp, weather.main.humidity, weather.wind.speed)}
//         </div>
//       )}

//       {forecast.length > 0 && (
//         <div style={{
//           marginTop: '30px',
//           padding: '15px',
//           backgroundColor: '#f1faff',
//           borderRadius: '10px'
//         }}>
//           <h3 style={{ textAlign: 'center', color: '#0077b6' }}>📅 अगले कुछ घंटों का पूर्वानुमान</h3>
//           <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
//             {forecast.map((item, index) => (
//               <div key={index} style={{
//                 margin: '10px',
//                 padding: '10px',
//                 border: '1px solid #ccc',
//                 borderRadius: '10px',
//                 width: '150px',
//                 textAlign: 'center',
//                 backgroundColor: '#e6f2ff'
//               }}>
//                 <p>{new Date(item.dt * 1000).toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })}</p>
//                 <p>🌡️ {item.main.temp}°C</p>
//                 <p>☁️ {item.weather[0].description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
// import L from 'leaflet';
// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

// // Fix for default marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

// const OPENWEATHER_API_KEY = 'd730583aadaec8e9b73e4357b84d09c6';

// function GeocoderControl({ setLocation, setWeather, setForecast }) {
//   const map = useMap();

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js';
//     script.async = true;
//     script.onload = () => {
//       if (window.L.Control.Geocoder) {
//         const geocoder = window.L.Control.Geocoder.nominatim();
//         const control = window.L.Control.geocoder({
//           geocoder,
//           position: 'topright',
//           defaultMarkGeocode: true
//         })
//           .on('markgeocode', async function (e) {
//             const latlng = e.geocode.center;
//             setLocation([latlng.lat, latlng.lng]);
//             map.setView(latlng, 15);

//             // ✅ Weather API ko yahan direct call karo
//             try {
//               const current = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng.lat}&lon=${latlng.lng}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=hi`);
//               setWeather(current.data);

//               const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latlng.lat}&lon=${latlng.lng}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=hi`);
//               setForecast(forecast.data.list.slice(0, 5));
//             } catch (err) {
//               alert("🔴 मौसम डेटा लाने में दिक्कत आ रही है।");
//               console.error("Weather Fetch Error on Search:", err);
//             }
//           })
//           .addTo(map);
//       }
//     };
//     document.body.appendChild(script);
//   }, [map, setLocation, setWeather, setForecast]); // ✅ dependencies updated

//   return null;
// }


// function getTip(temp, humidity, windSpeed) {
  
//   if (humidity > 80) return "🌧️ नमी ज़्यादा है, फिलहाल सिंचाई से बचें।";
//   if (temp > 35) return "☀️ तेज़ गर्मी है, शाम को खेत में पानी दें।";
//   if (windSpeed > 10) return "💨 तेज़ हवा है, छिड़काव से बचें।";
//   return "✅ मौसम अनुकूल है, खेती के लिए सही समय है।";
// }

// function App() {
//   const [location, setLocation] = useState(null);
//   const [weather, setWeather] = useState(null);
//   const [forecast, setForecast] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(async (pos) => {
//       const { latitude, longitude } = pos.coords;
//       setLocation([latitude, longitude]);

//       try {
//         const current = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=hi`);
//         setWeather(current.data);
//         console.log("Wind Speed Raw:", weather.wind.speed);


//         const forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=hi`);
//         setForecast(forecastRes.data.list.slice(0, 5));
//       } catch (err) {
//         alert("मौसम डेटा लाने में दिक्कत हो रही है।");
//         console.error(err);
//       }

//       setLoading(false);
//     }, (err) => {
//       console.error("Geolocation error:", err);
//       alert("कृपया लोकेशन एक्सेस की अनुमति दें।");
//       setLoading(false);
//     });
//   }, []);

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f5fff5' }}>
//       <h1 style={{ textAlign: 'center', color: '#2e7d32' }}>🌾 किसान मौसम सेवा 🌤️</h1>

//       {loading ? (
//         <p style={{ textAlign: 'center' }}>🔄 कृपया प्रतीक्षा करें, मौसम जानकारी लोड हो रही है...</p>
//       ) : location ? (
//         <div style={{ height: '450px', width: '100%', marginBottom: '20px' }}>
//           <MapContainer
//             center={location}
//             zoom={13}
//             minZoom={5}
//             maxZoom={19}
//             style={{ height: '100%', width: '100%' }}
//             zoomControl={true}
//             scrollWheelZoom={true}
//           >
//             <LayersControl position="topright">
//               <LayersControl.BaseLayer checked name="सामान्य मानचित्र">
//                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//               </LayersControl.BaseLayer>
//               <LayersControl.BaseLayer name="उपग्रह दृश्य (Satellite)">
//                 <TileLayer
//                   url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//                   attribution="Tiles © Esri"
//                 />
//               </LayersControl.BaseLayer>
//             </LayersControl>

//             <GeocoderControl setLocation={setLocation} setWeather={setWeather} setForecast={setForecast} />

//             <Marker position={location}>
//               <Popup>🌱 आप यहाँ हैं</Popup>
//             </Marker>
//           </MapContainer>
//         </div>
//       ) : (
//         <p>📍 लोकेशन नहीं मिल सकी।</p>
//       )}

// {weather && (
//   <div style={{
//     textAlign: 'center',
//     marginTop: '20px',
//     fontSize: '18px',
//     backgroundColor: '#e0ffe0',
//     padding: '12px',
//     borderRadius: '10px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//   }}>
//     <p>🕒 तिथि और समय: <strong>{new Date().toLocaleString('hi-IN', {
//       dateStyle: 'full',
//       timeStyle: 'short'
//     })}</strong></p>
//     <p>🌡️ तापमान: <strong>{weather.main.temp}°C</strong></p>
//     <p>💧 नमी: <strong>{weather.main.humidity}%</strong></p>
//     <p>🌬️ हवा की रफ्तार: <strong>{(weather.wind.speed * 3.6).toFixed(1)} km/h</strong></p>

//     <p>📍 स्थान: <strong>{weather.name}</strong></p>
//   </div>
// )}


//       {weather && (
//         <div style={{
//           marginTop: '20px',
//           backgroundColor: '#fff8e1',
//           padding: '15px',
//           borderRadius: '10px',
//           fontSize: '18px',
//           fontWeight: 'bold',
//           textAlign: 'center',
//           border: '2px dashed orange'
//         }}>
//           🧠 खेती सलाह: {getTip(weather.main.temp, weather.main.humidity, weather.wind.speed)}
//         </div>
//       )}

//       {forecast.length > 0 && (
//         <div style={{
//           marginTop: '30px',
//           padding: '15px',
//           backgroundColor: '#e3f2fd',
//           borderRadius: '10px'
//         }}>
//           <h3 style={{ textAlign: 'center', color: '#0077b6' }}>📅 अगले कुछ घंटों का पूर्वानुमान</h3>
//           <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
//             {forecast.map((item, index) => (
//               <div key={index} style={{
//                 margin: '10px',
//                 padding: '12px',
//                 border: '1px solid #90caf9',
//                 borderRadius: '10px',
//                 width: '160px',
//                 textAlign: 'center',
//                 backgroundColor: '#ffffff',
//                 boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
//               }}>
//                 <p><strong>{new Date(item.dt * 1000).toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })}</strong></p>
//                 <p>🌡️ {item.main.temp}°C</p>
//                 <p>🌬️ हवा <strong>{(item.wind.speed * 3.6).toFixed(1)} km/h</strong></p>
//                 <p>☁️ {item.weather[0].description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const OPENWEATHER_API_KEY = 'd730583aadaec8e9b73e4357b84d09c6';

// GeocoderControl component (same as your original)

function GeocoderControl({ setLocation, setWeather, setForecast }) {
  const map = useMap();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js';
    script.async = true;
    script.onload = () => {
      if (window.L.Control.Geocoder) {
        const geocoder = window.L.Control.Geocoder.nominatim();
        const control = window.L.Control.geocoder({
          geocoder,
          position: 'topright',
          defaultMarkGeocode: true
        })
          .on('markgeocode', async function (e) {
            const latlng = e.geocode.center;
            setLocation([latlng.lat, latlng.lng]);
            map.setView(latlng, 15);

            try {
              const current = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng.lat}&lon=${latlng.lng}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=hi`);
              setWeather(current.data);

              const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latlng.lat}&lon=${latlng.lng}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=hi`);
              setForecast(forecast.data.list);
            } catch (err) {
              alert("🔴 मौसम डेटा लाने में दिक्कत आ रही है।");
              console.error("Weather Fetch Error on Search:", err);
            }
          })
          .addTo(map);
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [map, setLocation, setWeather, setForecast]);

  return null;
}

function getTip(temp, humidity, windSpeed) {
  if (humidity > 80) return "🌧️ नमी ज़्यादा है, फिलहाल सिंचाई से बचें।";
  if (temp > 35) return "☀️ तेज़ गर्मी है, शाम को खेत में पानी दें।";
  if (windSpeed > 10) return "💨 तेज़ हवा है, छिड़काव से बचें।";
  return "✅ मौसम अनुकूल है, खेती के लिए सही समय है।";
}

function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // yyyy-mm-dd format
  });

  const fetchWeatherData = async (lat, lon) => {
    try {
      const current = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=hi`);
      setWeather(current.data);

      const forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=hi`);
      setForecast(forecastRes.data.list);
    } catch (err) {
      alert("मौसम डेटा लाने में दिक्कत हो रही है।");
      console.error(err);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation([latitude, longitude]);

      await fetchWeatherData(latitude, longitude);

      setLoading(false);
    }, (err) => {
      console.error("Geolocation error:", err);
      alert("कृपया लोकेशन एक्सेस की अनुमति दें।");
      setLoading(false);
    });
  }, []);

  // Filter forecast based on selectedDate (only show forecast for that day)
  const filteredForecast = forecast.filter(item => {
    const itemDate = new Date(item.dt * 1000).toISOString().split('T')[0];
    return itemDate === selectedDate;
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f5fff5' }}>
      <h1 style={{ textAlign: 'center', color: '#2e7d32' }}>🌾 किसान मौसम सेवा 🌤️</h1>

      {loading ? (
        <p style={{ textAlign: 'center' }}>🔄 कृपया प्रतीक्षा करें, मौसम जानकारी लोड हो रही है...</p>
      ) : location ? (
        <div style={{ height: '450px', width: '100%', marginBottom: '20px' }}>
          <MapContainer
            center={location}
            zoom={13}
            minZoom={5}
            maxZoom={19}
            style={{ height: '100%', width: '100%' }}
            zoomControl={true}
            scrollWheelZoom={true}
          >
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="सामान्य मानचित्र">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="उपग्रह दृश्य (Satellite)">
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution="Tiles © Esri"
                />
              </LayersControl.BaseLayer>
            </LayersControl>

            <GeocoderControl setLocation={setLocation} setWeather={setWeather} setForecast={setForecast} />

            <Marker position={location}>
              <Popup>🌱 आप यहाँ हैं</Popup>
            </Marker>
          </MapContainer>
        </div>
      ) : (
        <p>📍 लोकेशन नहीं मिल सकी।</p>
      )}

      {weather && (
        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '18px',
          backgroundColor: '#e0ffe0',
          padding: '12px',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <p>🕒 तिथि और समय: <strong>{new Date().toLocaleString('hi-IN', {
            dateStyle: 'full',
            timeStyle: 'short'
          })}</strong></p>
          <p>🌡️ तापमान: <strong>{weather.main.temp}°C</strong></p>
          <p>💧 नमी: <strong>{weather.main.humidity}%</strong></p>
          <p>🌬️ हवा की रफ्तार: <strong>{(weather.wind.speed * 3.6).toFixed(1)} km/h</strong></p>
          <p>📍 स्थान: <strong>{weather.name}</strong></p>
        </div>
      )}

      {/* Calendar Date Picker */}
      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <label htmlFor="forecast-date" style={{ fontSize: '18px', fontWeight: 'bold' }}>
          📅 पूर्वानुमान के लिए दिनांक चुनें:
        </label>
        <input
          type="date"
          id="forecast-date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            marginLeft: '10px',
            padding: '8px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
          min={new Date().toISOString().split('T')[0]} // prevent past dates
          max={new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} // 5 days forecast limit
        />
      </div>

      {weather && (
        <div style={{
          marginTop: '20px',
          backgroundColor: '#fff8e1',
          padding: '15px',
          borderRadius: '10px',
          fontSize: '18px',
          fontWeight: 'bold',
          textAlign: 'center',
          border: '2px dashed orange'
        }}>
          🧠 खेती सलाह: {getTip(weather.main.temp, weather.main.humidity, weather.wind.speed)}
        </div>
      )}

      {filteredForecast.length > 0 ? (
        <div style={{
          marginTop: '30px',
          padding: '15px',
          backgroundColor: '#e3f2fd',
          borderRadius: '10px'
        }}>
          <h3 style={{ textAlign: 'center', color: '#0077b6' }}>📅 चुनी हुई तारीख का पूर्वानुमान</h3>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {filteredForecast.map((item, index) => (
              <div key={index} style={{
                margin: '10px',
                padding: '12px',
                border: '1px solid #90caf9',
                borderRadius: '10px',
                width: '160px',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}>
                <p><strong>{new Date(item.dt * 1000).toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })}</strong></p>
                <p>🌡️ {item.main.temp}°C</p>
                <p>🌬️ हवा <strong>{(item.wind.speed * 3.6).toFixed(1)} km/h</strong></p>
                <p>☁️ {item.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '16px' }}>
          📅 इस दिन के लिए पूर्वानुमान उपलब्ध नहीं है।
        </p>
      )}
    </div>
  );
}

export default App;
