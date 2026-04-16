fetch('team.json')
  .then(response => response.json())
  .then(data => {
    console.log("Loaded data:", data);

    const teamSection = document.getElementById('team-section');

    data.forEach(member => {
      const card = document.createElement('div');
      card.className = 'team-card fade-in';

      card.innerHTML = `
        <img class="team-photo" src="${member.photo}" alt="${member.name}">

        <h3>${member.name}</h3>
        <p>${member.role}</p>

        <div class="overlay">
          <p>${member.bio}</p>
          <a href="team.html?team=${member.teampage}">
            Team Page
          </a>
        </div>
      `;

      teamSection.appendChild(card);
    });

    const cards = document.querySelectorAll('.team-card');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
  })
  .catch(err => console.error('Error loading team data:', err));
