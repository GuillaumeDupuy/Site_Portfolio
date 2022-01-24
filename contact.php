<?php include("assets/inc/header.inc.php"); ?>
<?php require_once("assets/inc/data.inc.php"); ?>

				<!-- Main -->
					<div id="main" class="alt">

						<!-- One -->
							<section id="one">
								<div class="inner">
									<header class="major">
										<h1>Contact Us</h1>
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
									<h2>Contact us</h2>
								</header>

									<!-- PHP Form -->
									
									<?php
										require('config.php');
										if (isset($_REQUEST['name'], $_REQUEST['email'], $_REQUEST['subject'], $_REQUEST['message'])){
										// récupérer le nom d'utilisateur et supprimer les antislashes ajoutés par le formulaire
										$username = stripslashes($_REQUEST['name']);
										$username = mysqli_real_escape_string($conn, $username); 
										// récupérer l'email et supprimer les antislashes ajoutés par le formulaire
										$email = stripslashes($_REQUEST['email']);
										$email = mysqli_real_escape_string($conn, $email);
										// récupérer le mot de passe et supprimer les antislashes ajoutés par le formulaire
										$subject = stripslashes($_REQUEST['subject']);
										$subject = mysqli_real_escape_string($conn, $subject);
										// récupérer le mot de passe et supprimer les antislashes ajoutés par le formulaire
										$message = stripslashes($_REQUEST['message']);
										$message = mysqli_real_escape_string($conn, $message);
										//requéte SQL + mot de passe crypté
											$query = "INSERT into `contact` (name, email, subject,message)
													VALUES ('$username', '$email', '$subject','$message')";
										// Exécuter la requête sur la base de données
										$res = mysqli_query($conn, $query);
										if($res){
											header('Location: contact_validtion.php');
										}
										}else{
									?>

											<form method="post" action="">
												<div class="fields">
													<div class="field half">
														<label for="name">Name</label>
														<input type="text" name="name" id="name" />
													</div>
													<div class="field half">
														<label for="email">Email</label>
														<input type="text" name="email" id="email" />
													</div>
													<div class="field">
														<label for="subject">Subject</label>
														<input type="text" name="subject" id="subject" />
													</div>
													<div class="field">
														<label for="message">Notes</label>
														<textarea type="text" name="message" id="message" rows="6"></textarea>
													</div>

													<div class="field half text-right">
														<ul class="actions">
															<li><input type="submit" value="Send Message" class="primary" /></li>
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
										<h3>Télephone</h3>
										<span>+33 6.59.28.83.64</span>
									</div>
								</section>
								<section>
									<div class="contact-method">
										<span class="icon alt fa-home"></span>
										<h3>Addresse</h3>
										<span>Neuilly-Plaisance, 93360 <br> France</span>
									</div>
								</section>
							</section>
						</div>
					</section>

<?php include("assets/inc/footer.inc.php"); ?>