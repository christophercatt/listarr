# Listarr

Listarr is a convenience application, allowing for [Trakt](trakt.tv) lists to be imported into Sonarr. Designed to emulate the custom lists found in Radarr.
![Image of Listarr Homescreen](https://github.com/christophercatt/listarr/blob/master/homescreen.png?raw=true)

## Installation

To install, run:

```
git clone ...
cd listarr
```

Install dependencies:

```
npm install && cd server && npm install && cd ../
```

## Usage

Before using, make sure that you create and obtain a Trakt [Client ID](https://trakt.tv/oauth/applications/new)

Start Listarr:

```
npm start
```

Before adding any list to Listarr, please make sure you fill out the required connection details within the settings.

## Roadmap

The following are planned features/updates that _should_ be coming your way some time soon. Keep an eye out for updates:

- [ ] Notifications
- [ ] Authentication
- [ ] History Feed
- [ ] Radarr Integration
- [ ] IMDB Integration

## Contributing

This is my first application utilizing most of the technologies and techniques used. As such, pull requests are very much welcomed. For major changes, please open an issue first to discuss what you would like to change.

## License

Listarr comes under the [MIT](https://choosealicense.com/licenses/mit/) license.

## Donate

If you find this project helpful, feel free to make a small donation to the developer:

[![Buy Me A Coffee](https://cdn.buymeacoffee.com/buttons/default-blue.png)](https://www.buymeacoffee.com/christophercatt)
