# Music Filter Application

A web application for filtering and managing music tracks from retro games. The application consists of an ASP.NET Core API backend and a React frontend.

## Prerequisites

- [.NET 6.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Visual Studio Code](https://code.visualstudio.com/) (optional, but recommended)

## Project Structure

```
.
├── API/                 # ASP.NET Core API backend
└── WebApp/             # React frontend application
```

## Getting Started

### Backend (API)

1. Navigate to the API directory:
   ```bash
   cd API
   ```

2. Restore dependencies and build the project:
   ```bash
   dotnet restore
   dotnet build
   ```

3. Run the API:
   ```bash
   dotnet run
   ```
   The API will be available at `https://localhost:7231`

### Frontend (React)

1. Navigate to the WebApp directory:
   ```bash
   cd WebApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`

## Features

- View and filter music tracks
- Create and manage filter groups
- Browse games and consoles
- Real-time filtering of music tracks

## API Endpoints

- `GET /Music` - Get music tracks
- `GET /Music/games` - Get list of games
- `GET /Music/filterGroups` - Get filter groups
- `POST /Music/filtered` - Get filtered music tracks

## Development

- The API uses ASP.NET Core 6.0
- The frontend uses React with TypeScript
- Styling is done with CSS modules

## License

This project is licensed under the MIT License. 