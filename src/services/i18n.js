import { dictionary, locale, _ } from 'svelte-i18n';

function setupI18n({
    withLocale: _locale
    } = {
        withLocale: 'en'
    }) {
    dictionary.set({
        en: {
            "global": {
                "loading": "Loading...",
                "close": "Close",
                "done": "Done"
            },
            "nav": {
                "options": "Options",
                "about": "About",
                "submitted": "Submitted",
                "pre_submit": "Pre-Submit"
            },
            "about": {
                "welcome": "Welcome to RainCrow",
                "created_by": "Created by",
                "app_purpose": "This web app was created for the quick retrieval of historical weather observations for <a href=\"https://ebird.org/about\" target=\"_blank\">eBird</a> checklists.",
                "email_me": "If you have any comments, suggestions, bugs, feel free to email me at <a href=\"mailto:parker@birdsmakesound.com\">parker@birdsmakesound.com</a>!",
                "submitted": {
                    "title": "Submitted",
                    "text": "Use for checklists that have already been submitted to eBird. Just enter the Checklist ID (or the entire URL) and click <span class=\"highlight\">Get Weather</span>."
                },
                "pre_submit": {
                    "title": "Pre-Submit",
                    "text": "Use before a checklist is submitted. This is especially useful for including weather in shared checklists.",
                    "troubleshoot_title": "<span class=\"highlight\">Locate</span> not working?",
                    "enable_location_service": "Check that location services are enabled.",
                    "allow_location_access": "Make sure you allow access to your location.",
                    "toggle_location_preference": "If clicking <span class=\"highlight\">Locate</span> does not prompt you to allow location access, try toggling the location preference off then on again.",
                    "iphone_users": "For iPhone the setting is found under Settings > Privacy > Location Services > (Browser of Choice) > Allow Location Access"
                },
                "options": {
                    "title": "Options",
                    "text": "The options menu allows you to select the weather data you want to include.",
                    "icon_and_links": "In order for <strong>OpenWeather Icons</strong> and <strong>Include Link</strong> options to show up on your eBird checklist, you must include &lt;HTML tags&gt; to embed the images or create the link. You don't need to worry about doing this yourself, the code is included when you click <span class=\"copy\">Copy to Clipboard</span>. The images and link will display normally once you submit the copied code to your checklist comments."
                },
                "weather_data": {
                    "title": "Weather Data",
                    "provided_by": "Weather data provided by <a href=\"https://openweathermap.org/\" target=\"_blank\">OpenWeather</a>.",
                    "range_format": "Weather data is gathered for both the start and end times of a checklist and automatically displayed as a range.",
                    "limitations": "There are limitations to the accuracy of any weather API. If you are gathering weather data for a location that is near a weather station it should work just fine. If the location is a remote area with unique microclimate (deep canyons, mountain peaks, open ocean etc.) results will have more room for error. Use at your own discretion!"
                },
                "daily_limits": {
                    "title": "Daily Limits",
                    "text": "To help prevent RainCrow downtime there is a limit of 5 weather requests every 12 hours.",
                },
                "error_429": {
                    "title": "429 Error?",
                    "text": "If you get a error with code 429, it means that I've reached my limit of free OpenWeather API calls for the day. I'm working on a solution for this. Sorry, try again tomorrow!"
                }
            },
            "submitted": {
                "checklist_id": "Checklist ID",
                "get_weather": "Get Weather",
                "help": "Enter an eBird Checklist ID and click \"Get Weather\"",
                "invalid_checklist_id": "Please enter a valid Checklist ID",
                "historical_checklist_error": "Historical checklists not supported. Need valid time to get weather data.",
                "too_old_checklist_error": "Dates before Jan 1, 1979 not supported by OpenWeather API."
            },
            "pre_submit": {
                "locate": "Locate",
                "locate_error": "Allow location access to use (ERROR({errorCode}): {errorMessage})",
                "location": "Location",
                "latitude": "Latitude",
                "longitude": "Longitude",
                "coordinates_error": "Please enter valid decimal degree coordinates.",
                "date": "Date",
                "date_error": "Enter valid date in format: YYYY-MM-DD",
                "start_time": "Start Time",
                "start_time_error": "Enter valid start time in 24hr format: HH:MM",
                "duration": "Duration",
                "minutes": "minutes",
                "duration_error": "Enter valid number of minutes greater than or equal to 0",
                "get_weather": "Get Weather",
                "location_service_error": "Location services must be enabled to use \"Locate\" button."
            },
            "clipboard": {
                "copy": "Copy to clipboard",
                "copied": "Copied!",
                "error": "Error!",
                "browser_error": "Browser do not support Clipboard API"
            },
            "weather": {
                "generated_by": "Weather generated by <a href=\"https://raincrow.netlify.app/\" target=\"_blank\">RainCrow</a>",
                "wind_description": {
                    "calm": "calm",
                    "mostly_calm": "mostly calm",
                    "light_breeze": "light breeze",
                    "gentle_breeze": "gentle breeze",
                    "moderate_breeze": "moderate breeze",
                    "fresh_breeze": "fresh breeze",
                    "strong_breeze": "strong breeze",
                    "near_gale": "near gale",
                    "gale": "gale",
                    "severe_gale": "severe gale",
                    "storm": "storm",
                    "violent_storm": "violent storm",
                    "hurricane": "hurricane",
                },
                "direction": {
                    "north": "N",
                    "north_east": "NE",
                    "east": "E",
                    "south_east": "SE",
                    "south": "S",
                    "south_west": "SW",
                    "west": "W",
                    "north_west": "NW",
                },
                "temperature": "Temperature",
                "wind": "Wind",
                "wind_direction": "Wind Direction",
                "cloud_cover": "Cloud Cover",
                "humidity": "Humidity",
                "sunrise": "Sunrise",
                "sunset": "Sunset",
            },
            "options": {
                "weather_icon": "Weather Icons",
                "emoji": "Emoji",
                "conditions": "Conditions",
                "temperature": "Temperature",
                "windspeed": "Windspeed",
                "windspeed_description": "Description",
                "windspeed_beaufort_scale": "Beaufort Scale",
                "wind_direction": "Wind Direction",
                "cloud_cover": "Cloud Cover",
                "humidity": "Humidity",
                "sunrise": "Sunrise",
                "sunset": "Sunset",
                "include_link": "Include Link"
            },
            "daily_request": {
                "error": "You have reached your limit of weather requests for the day.",
                "try_again": "Try again",
                "remaining": "Remaining daily requests:"
            }
        },
        fr: {
            "global": {
                "loading": "Chargement...",
                "close": "Fermer",
                "done": "Terminé"
            },
            "nav": {
                "options": "Options",
                "about": "À propos",
                "submitted": "Liste soumise",
                "pre_submit": "Pré-soumission",
            },
            "about": {
                "welcome": "Bienvenue dans RainCrow",
                "created_by": "Créé par",
                "app_purpose": "Cette app web a été créée pour l'obtention facile des données météo pour les listes <a href=\"https://ebird.org/about\" target=\"_blank\">eBird</a>.",
                "email_me": "Si vous avez des commentaires, suggestions ou bugs, vous pouvez me contacter à l'adresse <a href=\"mailto:parker@birdsmakesound.com\">parker@birdsmakesound.com</a>!",
                "submitted": {
                    "title": "Liste soumise",
                    "text": "À utiliser pour les listes ayant déjà été soumises dans eBird. Il suffit d'entrer l'identifiant de la liste (ou l'URL entière) et cliquer sur <span class=\"highlight\">Obtenir la météo</span>."
                },
                "pre_submit": {
                    "title": "Pré-soumission",
                    "text": "À utiliser avant de soumettre une liste. C'est particulièrement utile pour inclure la météo dans une liste partagée.",
                    "troubleshoot_title": "Le bouton <span class=\"highlight\">Localiser</span> ne fonctionne pas?",
                    "enable_location_service": "Vérifiez que les services de Localisation sont activés.",
                    "allow_location_access": "Assurez-vous d'autoriser l'accès à votre emplacement.",
                    "toggle_location_preference": "Si cliquer sur <span class=\"highlight\">Localiser</span> ne vous invite pas à autoriser l'accès à la localisation, essayez de désactiver puis réactiver la locatisation dans vos préférences.",
                    "iphone_users": "Pour les utilisateurs de iPhone, les préférences se trouvent sous Réglages > Confidentialité > Service de localisation > (votre navigateur) > Autoriser."
                },
                "options": {
                    "title": "Options",
                    "text": "Les options vous permettent de sélectionner les informations météorologiques que vous voulez inclure dans votre liste.",
                    "icon_and_links": "Pour que les options <strong>Icônes de OpenWeather</strong> et <strong>Lien de génération</strong> s'affichent dans votre liste eBird, vous devez inclure &lt;HTML tags&gt; pour inclure les images et/ou le lien. Vous n'avez pas à le faire vous-même, le code est déjà inclus lorsque vous cliquez sur <span class=\"copy\">Copier dans le presse-papier</span>. Les images et le lien s'afficheront normalement lorsque vous aurez soumis le code dans vos commentaires de liste."
                },
                "weather_data": {
                    "title": "Données météo",
                    "provided_by": "L'information météorologique est fournie par <a href=\"https://openweathermap.org/\" target=\"_blank\">OpenWeather</a>.",
                    "range_format": "Les données météo sont obtenues pour le début et la fin d'une liste et automatiquement affichées comme un intervalle.",
                    "limitations": "Il y a des limites à la précision de toute API météo. Si vous recherchez des données météorologiques pour un emplacement proche d'une station météo, le résultat devrait être optimal. Si l'emplacement est une région éloignée avec un microclimat unique (canyons profonds, sommets montagneux, océan, etc.), les résultats auront plus de marge d'erreur. À utiliser prudemment!"
                },
                "daily_limits": {
                    "title": "Limites Quotidiennes",
                    "text": "Pour aider à prévenir les temps d'arrêt de RainCrow, il y a une limite de 5 demandes météo toutes les 12 heures.",
                },
                "error_429": {
                    "title": "Vous obtenez une erreur 429?",
                    "text": "Si vous obtenez une erreur avec le code 429, ça veut dire que j'ai atteint ma limite d'appels gratuits de l'API OpenWeather pour la journée. Je travaille sur une solution pour régler le problème. Désolé des inconvénients, réessayez demain!"
                }

            },
            "submitted": {
                "checklist_id": "Identifiant de liste",
                "get_weather": "Obtenir la météo",
                "help": "Entrer un identifiant de liste eBird and cliquer sur \"Obtenir la météo\"",
                "invalid_checklist_id": "Veuillez entrer un identifiant de liste valide",
                "historical_checklist_error": "Les listes de type historique ne sont pas supportées.",
                "too_old_checklist_error": "Les dates avant le 1er janvier 1979 ne sont pas supportées par OpenWeather API."

            },
            "pre_submit": {
                "locate": "Localiser",
                "locate_error": "Vous devez autoriser l'accès à la localisation (ERROR({errorCode}): {errorMessage})",
                "location": "Localisation",
                "latitude": "Latitude",
                "longitude": "Longitude",
                "coordinates_error": "Veuillez entrer des coordonnées décimales valides.",
                "date": "Date",
                "date_error": "Veuillez entrer une date valide au format: AAAA-MM-JJ",
                "start_time": "Heure de début",
                "start_time_error": "Veuillez entrer une heure de début valide au format 24h: HH:MM",
                "duration": "Durée",
                "minutes": "minutes",
                "duration_error": "Veuillez entrer un nombre de minutes plus grand ou égal à 0",
                "get_weather": "Obtenir la météo",
                "location_service_error": "Les services de localisation doivent être activés pour utiliser le bouton \"Localiser\"."
            },
            "clipboard": {
                "copy": "Copier dans le presse-papier",
                "copied": "Copié!",
                "error": "Erreur!",
                "browser_error": "Votre navigateur ne supporte pas Clipboard API"
            },
            "weather": {
                "generated_by": "Météo générée par <a href=\"https://raincrow.netlify.app/\" target=\"_blank\">RainCrow</a>",
                "wind_description": {
                    "calm": "calme",
                    "mostly_calm": "très légères brises",
                    "light_breeze": "légère brise",
                    "gentle_breeze": "petite brise",
                    "moderate_breeze": "jolie brise",
                    "fresh_breeze": "bonne brise",
                    "strong_breeze": "vent frais",
                    "near_gale": "grand frais",
                    "gale": "coup de vent",
                    "severe_gale": "fort coup de vent",
                    "storm": "tempête",
                    "violent_storm": "violente tempête",
                    "hurricane": "vent d'ouragan",
                },
                "direction": {
                    "north": "N",
                    "north_east": "NE",
                    "east": "E",
                    "south_east": "SE",
                    "south": "S",
                    "south_west": "SO",
                    "west": "O",
                    "north_west": "NO",
                },
                "temperature": "Température",
                "wind": "Vent",
                "wind_direction": "Direction du vent",
                "cloud_cover": "Couverture nuageuse",
                "humidity": "Humidité",
                "sunrise": "Lever du soleil",
                "sunset": "Coucher du soleil",
            },
            "options": {
                "weather_icon": "Icônes météo",
                "emoji": "Émoji",
                "conditions": "Conditions",
                "temperature": "Température",
                "windspeed": "Vitesse du vent",
                "windspeed_description": "Description",
                "windspeed_beaufort_scale": "Échelle de Beaufort",
                "wind_direction": "Direction du vent",
                "cloud_cover": "Couverture nuageuse",
                "humidity": "Humidité",
                "sunrise": "Lever du soleil",
                "sunset": "Coucher du soleil",
                "include_link": "Inclure le lien"
            },
            "daily_request": {
                "error": "Vous avez atteint votre limite de demandes météo pour la journée.",
                "try_again": "Réessayer",
                "remaining": "Demandes quotidiennes restantes:"
            }
        },
    });

    locale.set(_locale);
}

export {
    _,
    setupI18n
};
