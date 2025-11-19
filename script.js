document.addEventListener('DOMContentLoaded', function(){
	// Mobile nav toggle
	const navToggle = document.getElementById('nav-toggle');
	const nav = document.getElementById('primary-nav');
	navToggle && navToggle.addEventListener('click', function(){
		const open = nav.classList.toggle('open');
		this.setAttribute('aria-expanded', String(open));
	});

	// Smooth scroll for internal links
	document.querySelectorAll('a[href^="#"]').forEach(a=>{
		a.addEventListener('click', function(e){
			const targetId = this.getAttribute('href');
			if(targetId && targetId.startsWith('#')){
				const target = document.querySelector(targetId);
				if(target){
					e.preventDefault();
					target.scrollIntoView({behavior:'smooth',block:'start'});
				}
			}
		});
	});

	// Year in footer
	const yearEl = document.getElementById('year');
	if(yearEl) yearEl.textContent = new Date().getFullYear();

	// Contact form basic handler (placeholder)
	// const form = document.getElementById('contact-form');
	// if(form){
	// 	form.addEventListener('submit', function(e){
	// 		e.preventDefault();
	// 		// Replace with real submission logic (AJAX, Netlify Forms, Formspree, etc.)
	// 		alert('Thanks! This form is a placeholder — wire up your backend to actually send messages.');
	// 		form.reset();
	// 	});
	// }
});

document.addEventListener('DOMContentLoaded', () => {
    // set footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = new FormData(form);
        const name = (data.get('name') || '').toString().trim() || 'Anonymous';
        const email = (data.get('email') || '').toString().trim();
        const message = (data.get('message') || '').toString().trim();

        // CHANGE THIS to your Gmail address
        const to = 'gabriel.r.alamo@gmail.com';

        const subject = encodeURIComponent(`Portfolio contact from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\n${message}`
        );

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
            to
        )}&su=${subject}&body=${body}`;

        const mailtoUrl = `mailto:${encodeURIComponent(to)}?subject=${subject}&body=${body}`;

        // Try to open Gmail compose in a new tab; fallback to mailto if blocked
        const win = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
        if (!win) {
            // fallback
            window.location.href = mailtoUrl;
        }

        form.reset();
    });
});

