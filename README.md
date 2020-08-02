# Listarr

Listarr is a convenience application, allowing for [Trakt](trakt.tv) lists to be imported into Sonarr. Designed to emulate the custom lists found in Radarr.
![Image of Listarr Homescreen](https://github.com/christophercatt/listarr/blob/master/homescreen.png?raw=true)

## Installation

To install, run:

```bash
#Clone repository
git clone https://github.com/christophercatt/listarr.git

#Enter project directory
cd listarr

#Install dependencies
npm run setup
```

## Usage

Before using, make sure that you create and obtain a Trakt Client ID [_here_](https://trakt.tv/oauth/applications/new).

Start Listarr:

```
npm start
```

Go to localhost:5000

Note. Before adding any list to Listarr, please make sure you fill out the required connection details within the settings. Lists will not automatically be added to Sonarr once added to Listarr, they are added every x minutes, set

## Docker

To build from source

```bash
#Bulid the image
docker build -t ccatt601/listarr .

#Run the image
docker run -d -p 'host port':5000 -v /path/to/store/data:/server/config/ ccatt601/listarr
```

The Docker Image is also available on [Docker Hub]()

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
