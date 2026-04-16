fetch('team.json')
  .then(response => response.json())
  .then(data => {
    console.log("Loaded data:", data);

    const teamSection = document.getElementById('team-section');

    const roleIcons = {
      Tank: "https://i.imgur.com/1uUfOtE.png",
      DPS: "https://i.imgur.com/ujYKxX2.png",
      Support: "https://i.imgur.com/uv1cYKz.png",
      Flex: "https://i.imgur.com/xaQB8Xz.png"
    };

    data.forEach(team => {
      const card = document.createElement('div');
      card.className = 'team-card fade-in';

      card.innerHTML = `
        <img class="team-logo" src="${team.photo}" alt="${team.name} logo">

        <h3>${team.name}</h3>
        <p>${team.role}</p>

        <div class="overlay">
          <p>${team.bio}</p>
          <a href="team.html?team=${team.teampage}">
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

document.getElementById("back-button").addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "index.html";
  }
});
