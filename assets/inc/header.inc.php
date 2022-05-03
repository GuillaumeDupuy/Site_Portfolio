<!DOCTYPE HTML>
<html>
	<head>
		<title>PortFolio Guillaume</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
		<link rel="stylesheet" href="assets/css/main.css" />
		<noscript><link rel="stylesheet" href="assets/css/noscript.css" /></noscript>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css">
	</head>
	<body class="is-preload">

		<!-- Wrapper -->
			<div id="wrapper">

				<!-- Header -->
				<header id="header" class="alt">
					<a href="/" class="logo"><strong>PortFolio</strong> <span>Guillaume</span></a>
					<p><script> const event = new Date(); const options = { weekday: 'long',month: 'long', day: 'numeric' }; document.write(event.toLocaleDateString(undefined, options))</script>,&nbsp;</p>
					<p>
    					<code id="output">N/A</code>
    					<script>
        					function coordonnees(pos) { 
        					    let crd = pos.coords;
                                let latitude = crd.latitude;
                                let longitude = crd.longitude;
                                
                                fetch(`https://geo.api.gouv.fr/communes?lat=${latitude}&lon=${longitude}`)
                                .then(response => !response.ok ? Promise.reject() : response.json())
                                .then(json => output.innerHTML = eval(JSON.stringify(json[0]["nom"])))
                                .catch(error => console.log("Error while fetching data"))
                            }
                                
                            navigator.geolocation.getCurrentPosition(coordonnees);
                        </script>
                    </p>
                    
					<nav>
						<a href="#menu">Menu</a>
					</nav>
				</header>

				<!-- Menu -->
				<nav id="menu">
					<ul class="links">
		                <li class="active"> <a href="/">Home </a> </li>

		                <li> <a href="about-us">About Us</a> </li>

		                <li><a href="contact">Contact Us</a></li>
            		</ul>
				</nav>