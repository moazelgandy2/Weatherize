# Weatherize

Weatherize is a weather forecasting application built with JavaScript and styled with Tailwind CSS. It uses the WeatherAPI to fetch weather data based on the user's location.

## Features

- **Current Weather Information**: Weatherize displays the current temperature and weather conditions based on the user's location.
- **Location Access**: The application initially tries to get the user's location using the Geolocation API. If the user denies access, the application falls back to IP-based location detection.
- **3-Day Forecast**: Weatherize provides a 3-day weather forecast, giving users a glimpse of the weather conditions in the near future.
- **Search Functionality**: Users can search for weather information in multiple languages.
- **Tailwind CSS**: The application is styled with Tailwind CSS, a utility-first CSS framework for rapidly building custom user interfaces.

## API Used

Weatherize uses the [WeatherAPI](https://www.weatherapi.com/) to fetch the weather data.

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repository.
2. Install the project dependencies.
3. Replace the `APIKey` in the `main.js` file with your own WeatherAPI key.
4. Open the `index.html` file in your browser.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
