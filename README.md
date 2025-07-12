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

## 🎥 Streaming Engine Setup

1. Download [skyguard-stream-engine.zip](https://drive.google.com/file/d/1J_b726cGp1bK6yr5ZM3FMN0LtA5QbOvs/view?usp=sharing)
2. Extract into `/stream` folder
3. Double-click `run-stream.bat`

