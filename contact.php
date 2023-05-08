<?php include("assets/inc/header.inc.php"); ?>
<?php require_once("assets/inc/data.inc.php"); ?>

				<!-- Main -->
					<div id="main" class="alt">

						<!-- One -->
							<section id="one">
								<div class="inner">
									<header class="major">
										<h1>Contact</h1>
									</header>
									<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d674384.9631385383!2d1.9422309405310305!3d48.68031771609199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5e1c403a68c17%3A0x10b82c3688b2570!2s%C3%8Ele-de-France!5e0!3m2!1sfr!2sfr!4v1643043354204!5m2!1sfr!2sfr" width="100%" height="600" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
									<p> <br> Réside en Région Parisienne, posséde le permis B et un titre de transport</p>
								</div>
							</section>
					</div>

				<!-- Contact -->
					<section id="contact">
						<div class="inner">
							<section>
								<header class="major">
									<h2>Formulaire</h2>
								</header>

									<!-- PHP Form -->
									
									<?php
										require('config.php');
										if (isset($_REQUEST['name'], $_REQUEST['firstname'], $_REQUEST['email'], $_REQUEST['subject'], $_REQUEST['message'])){
										// récupérer le nom d'utilisateur et supprimer les antislashes ajoutés par le formulaire
										$username = stripslashes($_REQUEST['name']);
										$username = mysqli_real_escape_string($conn, $username); 
										$firstname = stripslashes($_REQUEST['firstname']);
										$firstname = mysqli_real_escape_string($conn, $firstname);
										// récupérer l'email et supprimer les antislashes ajoutés par le formulaire
										$email = stripslashes($_REQUEST['email']);
										$email = mysqli_real_escape_string($conn, $email);
										// récupérer le sujet et supprimer les antislashes ajoutés par le formulaire
										$subject = stripslashes($_REQUEST['subject']);
										$subject = mysqli_real_escape_string($conn, $subject);
										// récupérer le message et supprimer les antislashes ajoutés par le formulaire
										$message = stripslashes($_REQUEST['message']);
										$message = mysqli_real_escape_string($conn, $message);
										// récupérer la date où le client a fait ca demande
										date_default_timezone_set("Europe/Paris");
										$date = date("Y/m/d H:i:s");
										//requéte SQL
											$query = "INSERT into `contact` (name, firstname, email, subject,message,DateInserted)
													VALUES ('$username', '$firstname', '$email', '$subject','$message','$date')";
										// Exécuter la requête sur la base de données
										$res = mysqli_query($conn, $query);
										if($res){
											header('Location: contact_validation');
										}
										}else{
									?>

											<form method="post" action="contact">
												<div class="fields">
													<div class="field half">
														<label for="name">Nom</label>
														<input type="text" name="name" id="name" required="required"/>
													</div>
													<div class="field half">
														<label for="firstname">Prénom</label>
														<input type="text" name="firstname" id="firstname" required="required"/>
													</div>
													<div class="field half">
														<label for="email">Email</label>
														<input type="email" name="email" id="email" required="required"/>
													</div>
													<div class="field">
														<label for="subject">Objet</label>
														<input type="text" name="subject" id="subject" required="required"/>
													</div>
													<div class="field">
														<label for="message">Message</label>
														<textarea type="text" name="message" id="message" rows="6" required="required"></textarea>
													</div>

													<div class="field half text-right">
														<ul class="actions">
															<li><input type="submit" value="Envoyer" class="primary" /></li>
														</ul>
													</div>
												</div>
											</form>

									<?php } ?>

							</section>
							<section class="split">
								<section>
									<div class="contact-method">
										<span class="icon alt fa-envelope"></span>
										<h3>Email</h3>
										<a href="#">guillaume.dupuy@ynov.com</a>
									</div>
								</section>
								<section>
									<div class="contact-method">
										<span class="icon alt fa-phone"></span>
										<h3>Téléphone</h3>
										<span>+33 6.59.28.83.64</span>
									</div>
								</section>
								<section>
									<div class="contact-method">
										<span class="icon alt fa-home"></span>
										<h3>Adresse</h3>
										<span>Neuilly-Plaisance, 93360 <br> France</span>
									</div>
								</section>
							</section>
						</div>
					</section>

<?php include("assets/inc/footer.inc.php"); ?>