import './select2/index.js';
import './scss/_style.scss';
import { __ } from '@wordpress/i18n';


//Connectoor Jobs Plugin - Klickbare Index li-Container
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('ul.wp-block-post-template.branding-color li').forEach(li => {
		li.addEventListener('click', e => {
			if (e.target.tagName !== 'a') {
				window.location.href = li.querySelector('a').href;
			}
		});

		const jobMetaFields = li.querySelectorAll('.job-meta .wp-block-connectoor-jobs-meta-field');
		const lastField = jobMetaFields[jobMetaFields.length - 1];

		// Extrahiere das Datum aus dem letzten Feld
		const dateText = lastField.textContent.trim();
		const [day, month, year] = dateText.split('.').map(Number);
		const jobDate = new Date(year, month - 1, day); // JavaScript Monate sind 0-indexiert

		// Heutiges Datum (ohne Uhrzeit)
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Entfernt Uhrzeit für Vergleich

		// Prüfe, ob das Datum heute oder in der Vergangenheit liegt
		if (jobDate <= today) {
			lastField.textContent = __('Now','connectoor-jobs-free');
		}
	});
});
