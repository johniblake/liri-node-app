# liri-node-app

A Command Line Interface for searching Spotify, Bands in Town, and OMDB for information about your favorite content and bands.

**How to use Liri**

Video Tutorial found [here](https://youtu.be/6SZcdPUoFAY).

Liri is a node application, which means each command given to Liri should take the form:

> `node liri.js <command> [query]`
>
> _Note: commands should be issued from inside the liri-node-app directory in your terminal_

The **commands** are:

> - concert-this
> - spotify-this-song
> - movie-this
> - do-what-it-says

**Queries** are optional but recommended and can be strings of any length containing the band name, movie title, or track name that you want information about.

_Example:_

> `node liri.js movie-this National Treasure`

_Output:_

> National Treasure
> 2004
>
> IMDB Rating: 6.9
>
> Rotten Tomatoes Rating: 45%
>
> USA
>
> English, Spanish
>
> A historian races to find the legendary Templar Treasure before a team of mercenaries.
>
> Nicolas Cage, Diane Kruger, Justin Bartha, Sean Bean

_Example:_

> `node liri.js concert-this Nickelback`

_Output:_

> Upcoming Shows for Nickelback:

> Summer Sounds FM Concert Series
>
> Fort Mcmurray, Canada
>
> 07/06/2019

> Edenvale Aerodrome
>
> Stayner, Canada
>
> 07/11/2019

> Bank of New Hampshire Pavilion
>
> Gilford, NH, United States
>
> 07/17/2019

> Parc Beauséjour
>
> Rimouski, Canada
>
> 07/20/2019

> Mississippi Valley Fair
>
> Davenport, IA, United States
>
> 08/03/2019

_Example_

> `node liri.js spotify-this-song My Heart Will Go On`

_Output_

> Céline Dion
>
> My Heart Will Go On - Love Theme from "Titanic"
>
> Preview: https://p.scdn.co/mp3-preview/5fcdcfe7ef20abd006bba666b4a7dff01dd5ec21?cid=ee9cc32007474320b50a760b96e9ce17
>
> Let's Talk About Love

_Example_

> `node liri.js do-what-it-says`

_Note:_

> This command takes no arguments will execute whatever command is specified in `liri-node-app/random.txt`
