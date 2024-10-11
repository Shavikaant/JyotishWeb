const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navLinks.forEach(nav => nav.classList.remove('active', 'text-warning'));
    this.classList.add('active', 'text-warning');
  });
});

// Replace with your actual RapidAPI Key
const apiKey = 'your-rapidapi-key'; 

document.getElementById('fetchHoroscope').addEventListener('click', async () => {
  const zodiacSign = document.getElementById('zodiac-sign').value;

  if (zodiacSign === "Select your Zodiac Sign") {
    alert('Please select a zodiac sign');
    return;
  }

  try {
    const response = await fetch(`https://${apiHost}/horoscope/${zodiacSign}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message || 'Failed to fetch data'}`);
    }

    const data = await response.json();
    document.getElementById('rashifal-title').textContent = `Today's Rashifal for ${zodiacSign}`;
    document.getElementById('rashifal-text').textContent = data.description;

  } catch (error) {
    console.error('Error fetching the horoscope:', error);
    document.getElementById('rashifal-text').textContent = 'Failed to load Rashifal, please try again later.';
  }
});
