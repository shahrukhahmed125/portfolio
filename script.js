/* 
    Interactivity for Syed Shahrukh Ahmed Portfolio
    Includes: Reveal Animations, Mobile Menu, Smooth Scroll, Form Handling
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Dynamic Year
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // 0.5. Project Demo Modal
    window.showProjectModal = function(projectType) {
        const message = projectType === 'construction' 
            ? 'Thank you for your interest in the Construction Management System! This is a private client project. Please contact me directly to schedule a demo.'
            : 'Thank you for your interest in the CRM System! This is a private client project. Please contact me directly to schedule a demo.';
        
        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 20px;
            box-sizing: border-box;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: var(--card-bg);
            padding: 30px;
            border-radius: 20px;
            max-width: 500px;
            width: 100%;
            border: 1px solid var(--border-color);
            text-align: center;
        `;
        
        modalContent.innerHTML = `
            <h3 style="margin-bottom: 15px; color: var(--text-main);">Demo Request</h3>
            <p style="margin-bottom: 25px; color: var(--text-muted); line-height: 1.6;">${message}</p>
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button onclick="window.open('mailto:shahrukhahmed125@gmail.com?subject=Demo Request: ${projectType}', '_blank')" style="padding: 10px 20px; background: var(--accent); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
                    Email for Demo
                </button>
                <button onclick="this.closest('div').parentElement.parentElement.remove()" style="padding: 10px 20px; background: transparent; color: var(--text-muted); border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer; font-weight: 600;">
                    Close
                </button>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    };
    
    // 0.6. Project Card Toggle
    window.toggleProjectCard = function(button) {
        const projectContent = button.closest('.project-content');
        const expandedContent = projectContent.querySelector('.project-expanded');
        const readMoreText = button.querySelector('.read-more-text');
        const readLessText = button.querySelector('.read-less-text');
        const icon = button.querySelector('i');
        
        if (expandedContent.style.display === 'none' || expandedContent.style.display === '') {
            expandedContent.style.display = 'block';
            readMoreText.style.display = 'none';
            readLessText.style.display = 'inline';
            button.classList.add('expanded');
        } else {
            expandedContent.style.display = 'none';
            readMoreText.style.display = 'inline';
            readLessText.style.display = 'none';
            button.classList.remove('expanded');
        }
    };
    
    // 1. Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // 2. Navbar Scroll Background
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 11, 13, 0.95)';
            nav.style.padding = '15px 5%';
            nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            nav.style.background = 'rgba(10, 11, 13, 0.8)';
            nav.style.padding = '20px 5%';
            nav.style.boxShadow = 'none';
        }
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once element is shown, we don't need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic animation for feedback
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = '#22c55e'; // Green
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 5. Active Link Highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });
});
