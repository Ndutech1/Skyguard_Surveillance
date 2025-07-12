# SkyGuard Surveillance System

SkyGuard is a full-stack drone surveillance platform designed for real-time monitoring, live drone video streaming, geo-tagged mission reporting, and secure multi-role access.

## 🚀 Features

- ✅ Role-based user dashboards (Pilot, IT, CEO, Camp Head, Team Lead)
- 📡 Ultra-low latency live stream (HLS via NGINX + FFmpeg)
- 📍 GPS-tagged mission report uploads
- 📋 Real-time alerts and action logs
- 📊 Stream health monitor with uptime tracking
- 🗺️ Interactive Map view (Leaflet or Mapbox)
- 📁 PDF report generation for Camp Heads and CEOs

---

## 🧰 Technologies

| Layer       | Stack                            |
|-------------|----------------------------------|
| Frontend    | React + Axios + Video.js         |
| Backend     | Node.js + Express.js + MongoDB   |
| Streaming   | FFmpeg + NGINX (HLS output)      |
| Auth        | JWT + Role-Based Middleware      |
| Realtime    | Socket.IO                        |
| Map View    | Leaflet.js or Mapbox             |

---

## 📦 Project Structure

