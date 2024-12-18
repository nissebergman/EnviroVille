<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta
            name="viewport"
            content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"
        />

        <!-- Favicon bull#### -->

        <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="favicon/apple-icon-57x57.png"
        />
        <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="favicon/apple-icon-60x60.png"
        />
        <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="favicon/apple-icon-72x72.png"
        />
        <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="favicon/apple-icon-76x76.png"
        />
        <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="favicon/apple-icon-114x114.png"
        />
        <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="favicon/apple-icon-120x120.png"
        />
        <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="favicon/apple-icon-144x144.png"
        />
        <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="favicon/apple-icon-152x152.png"
        />
        <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="favicon/apple-icon-180x180.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="favicon/android-icon-192x192.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="favicon/faviconfavicon-32x32.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="favicon/favicon-96x96.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="favicon/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
            name="msapplication-TileImage"
            content="favicon/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff" />
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        crossorigin="anonymous"></script>
        <script src="JS/three.min.js"></script>
        <script src="JS/OrbitControls.js"></script>
        <script src="JS/raycasting.js"></script>
        <script src="JS/GLTFLoader.js"></script>
        <script src="JS/perlin.js"></script>
        <script src="Extern/statsjs/stats.js"></script>
        <script src="Extern/datguijs/dat.gui.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tween.js/17.2.0/Tween.js"></script>
        <script src="JS/windPower.js"></script>
        <script src="JS/graphs.js"></script>
        <script src="JS/waterPower.js"></script>
        <script src="JS/solarPower.js"></script>
        <script src="JS/consumption.js"></script>
        <script src="JS/particles.js"></script>

        <link rel="stylesheet" href="Style/style.css" />
    </head>
    <body>
        <div id="houseInfo"><p>HALLÅ</p></div>
        <div id="sliderContainer">
        </div>
            <input id="householdSlider" 
            type="range"
            min="1"
            max="60"
            value="20">
            </input>
        <script src="JS/main.js" onload="init()"></script>
    </body>
</html>
