				<!-- Footer -->
				<footer id="footer">
					<div class="inner">
						<ul class="icons">
							<!--<li><a href="https://www.facebook.com/guillaume.dupuy.56/" class="icon alt fa-facebook"><span class="label">Facebook</span></a></li>-->
							<!--<li><a href="https://www.instagram.com/guill_dup/" class="icon alt fa-instagram"><span class="label">Instagram</span></a></li>-->
							<li><a href="https://www.linkedin.com/in/guillaume-dupuy/" class="icon alt fa-linkedin"><span class="label">LinkedIn</span></a></li>
							<li><a href="https://github.com/GuillaumeDupuy" class="icon alt fa-github"><span class="label">LinkedIn</span></a></li>
						</ul>
						<ul class="copyright">
							<li>Copyright © <?php $date = date("Y"); Print($date);?> - Template by: Guillaume Dupuy</li>
							<li> <a href="https://github.com/GuillaumeDupuy?tab=repositories">All Repositories GitHub</a></li>
						</ul>
					</div>
				</footer>
			</div>
		<!-- Scripts -->
			<script src="assets/js/jquery.min.js"></script>
			<script src="assets/bootstrap/js/bootstrap.bundle.min.js"></script>
			<script src="assets/js/jquery.scrolly.min.js"></script>
			<script src="assets/js/jquery.scrollex.min.js"></script>
			<script src="assets/js/browser.min.js"></script>
			<script src="assets/js/breakpoints.min.js"></script>
			<script src="assets/js/util.js"></script>
			<script src="assets/js/main.js"></script>
			
			<script>
                if('serviceWorker' in navigator) {
                  navigator.serviceWorker
                           .register('assets/js/sw.js')
                           .then(function() { console.log("Service Worker Registered"); });
                }
            </script>

	</body>
</html>