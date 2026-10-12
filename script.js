
// Default coordinates for Bhopal, India
let currentLat = 23.2599;
let currentLon = 77.4126;
let currentCityName = 'Bhopal';
let currentRegion = 'Madhya Pradesh, India';

let currentThemeMode = 'auto';
let currentActualIsDay = true;

// --- Aesthetic Inline SVGs for Weather Icons ---
const icons = {
    sun: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-xl"><circle cx="50" cy="50" r="30" fill="#FFD700"/><g stroke="#FFD700" stroke-width="6" stroke-linecap="round"><line x1="50" y1="5" x2="50" y2="15"/><line x1="50" y1="85" x2="50" y2="95"/><line x1="5" y1="50" x2="15" y2="50"/><line x1="85" y1="50" x2="95" y2="50"/><line x1="18" y1="18" x2="25" y2="25"/><line x1="75" y1="75" x2="82" y2="82"/><line x1="18" y1="82" x2="25" y2="75"/><line x1="75" y1="25" x2="82" y2="18"/></g></svg>`,
    moon: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-xl"><path d="M70 20 A 40 40 0 1 0 80 80 A 50 50 0 0 1 70 20 Z" fill="#E0E7FF"/></svg>`,
    cloudyDay: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-xl"><circle cx="40" cy="40" r="20" fill="#FFD700"/><path d="M25 70 a 15 15 0 0 1 0 -30 a 20 20 0 0 1 35 -10 a 20 20 0 0 1 20 20 a 15 15 0 0 1 0 30 z" fill="#FFFFFF" opacity="0.9"/></svg>`,
    cloudyNight: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-xl"><path d="M50 20 A 25 25 0 1 0 65 60 A 30 30 0 0 1 50 20 Z" fill="#E0E7FF"/><path d="M25 75 a 15 15 0 0 1 0 -30 a 20 20 0 0 1 35 -10 a 20 20 0 0 1 20 20 a 15 15 0 0 1 0 30 z" fill="#CBD5E1" opacity="0.9"/></svg>`,
    overcast: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-xl"><path d="M20 60 a 20 20 0 0 1 0 -40 a 25 25 0 0 1 45 -10 a 25 25 0 0 1 20 25 a 20 20 0 0 1 0 40 z" fill="#F8FAFC"/><path d="M30 80 a 15 15 0 0 1 0 -30 a 20 20 0 0 1 35 -10 a 20 20 0 0 1 15 20 a 15 15 0 0 1 0 30 z" fill="#CBD5E1"/></svg>`,
    rain: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-xl"><path d="M25 60 a 20 20 0 0 1 0 -40 a 25 25 0 0 1 45 -10 a 25 25 0 0 1 20 25 a 20 20 0 0 1 0 40 z" fill="#94A3B8"/><g stroke="#60A5FA" stroke-width="4" stroke-linecap="round"><line x1="35" y1="65" x2="30" y2="85"/><line x1="50" y1="65" x2="45" y2="90"/><line x1="65" y1="65" x2="60" y2="85"/></g></svg>`,
    snow: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-xl"><path d="M25 60 a 20 20 0 0 1 0 -40 a 25 25 0 0 1 45 -10 a 25 25 0 0 1 20 25 a 20 20 0 0 1 0 40 z" fill="#E2E8F0"/><g fill="#FFFFFF"><circle cx="35" cy="75" r="4"/><circle cx="50" cy="85" r="4"/><circle cx="65" cy="70" r="4"/></g></svg>`,
    thunder: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-xl"><path d="M25 60 a 20 20 0 0 1 0 -40 a 25 25 0 0 1 45 -10 a 25 25 0 0 1 20 25 a 20 20 0 0 1 0 40 z" fill="#64748B"/><polygon points="55,55 35,75 50,75 45,95 65,70 50,70" fill="#FBBF24"/></svg>`
};

// --- Core Functions ---

function updateClock() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}
setInterval(updateClock, 1000);
updateClock();

function parseWeatherCode(code, isDay) {
    // WMO Weather interpretation codes
    if (code === 0) return { desc: 'Clear Sky', icon: isDay ? icons.sun : icons.moon };
    if (code === 1 || code === 2) return { desc: 'Partly Cloudy', icon: isDay ? icons.cloudyDay : icons.cloudyNight };
    if (code === 3) return { desc: 'Overcast', icon: icons.overcast };
    if ([45, 48].includes(code)) return { desc: 'Foggy', icon: icons.overcast };
    if ([51, 53, 55, 56, 57].includes(code)) return { desc: 'Drizzle', icon: icons.rain };
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { desc: 'Rain', icon: icons.rain };
    if ([71, 73, 75, 77, 85, 86].includes(code)) return { desc: 'Snow', icon: icons.snow };
    if ([95, 96, 99].includes(code)) return { desc: 'Thunderstorm', icon: icons.thunder };
    return { desc: 'Unknown', icon: isDay ? icons.sun : icons.moon };
}

function setThemeMode(mode) {
    currentThemeMode = mode;

    // Update active button classes
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-white/20', 'text-white', 'border-white/20', 'shadow-sm');
        btn.classList.add('bg-white/5', 'text-white/70', 'border-transparent');
    });
    const activeBtn = document.getElementById(`btn-theme-${mode}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-white/5', 'text-white/70', 'border-transparent');
        activeBtn.classList.add('active', 'bg-white/20', 'text-white', 'border-white/20', 'shadow-sm');
    }

    setupBackground();
}

function setupBackground() {
    const body = document.getElementById('app-body');
    const canvas = document.getElementById('bg-canvas');

    let hour = new Date().getHours();
    let isDayForTheme = currentActualIsDay;

    if (currentThemeMode !== 'auto') {
        if (currentThemeMode === 'morning') { hour = 7; isDayForTheme = true; }
        else if (currentThemeMode === 'day') { hour = 14; isDayForTheme = true; }
        else if (currentThemeMode === 'evening') { hour = 18; isDayForTheme = true; }
        else if (currentThemeMode === 'night') { hour = 22; isDayForTheme = false; }
    }

    // Clear old canvas
    canvas.innerHTML = '';
    body.className = 'flex items-center justify-center p-4 sm:p-6 lg:p-12'; // reset

    // Determine Theme
    if (hour >= 5 && hour < 10) body.classList.add('theme-morning');
    else if (hour >= 10 && hour < 17) body.classList.add('theme-day');
    else if (hour >= 17 && hour < 19) body.classList.add('theme-evening');
    else body.classList.add('theme-night');

    // Generate Celestial Body
    const celestial = document.createElement('div');
    celestial.className = `celestial ${isDayForTheme ? 'sun' : 'moon'}`;
    canvas.appendChild(celestial);

    // Generate Stars (if night)
    if (!isDayForTheme) {
        for (let i = 0; i < 60; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.top = `${Math.random() * 100}vh`;
            star.style.left = `${Math.random() * 100}vw`;
            star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
            star.style.animationDelay = `${Math.random() * 2}s`;
            canvas.appendChild(star);
        }
    }

    // Generate Clouds
    const cloudCount = isDayForTheme ? 6 : 3;
    for (let i = 0; i < cloudCount; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud-bg';
        // Simple SVG cloud shape
        cloud.innerHTML = `<svg width="150" height="80" viewBox="0 0 100 50"><path d="M30 40 a 10 10 0 0 1 0 -20 a 15 15 0 0 1 25 -5 a 15 15 0 0 1 20 10 a 10 10 0 0 1 0 20 z" fill="rgba(255,255,255,0.8)"/></svg>`;
        const scale = Math.random() * 1.5 + 0.5;
        cloud.style.transform = `scale(${scale})`;
        cloud.style.top = `${Math.random() * 60}vh`; // Keep clouds mostly in upper 60%
        cloud.style.left = `-30vw`; // Start offscreen
        cloud.style.setProperty('--duration', `${Math.random() * 60 + 40}s`); // Slow drift
        cloud.style.animationDelay = `-${Math.random() * 50}s`; // Staggered start
        canvas.appendChild(cloud);
    }
}

async function handleSearch() {
    const input = document.getElementById('city-search-input');
    const query = input.value.trim();
    if (!query) return;

    const loader = document.getElementById('loader');
    const errorScreen = document.getElementById('error-screen');

    // Show loading state
    const loaderText = loader.querySelector('h2');
    if (loaderText) loaderText.textContent = `Searching for ${query}...`;
    loader.style.opacity = '1';
    loader.style.pointerEvents = 'all';
    errorScreen.classList.add('hidden');

    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1`;
        const response = await fetch(geoUrl);
        if (!response.ok) throw new Error("Failed to fetch location data.");

        const data = await response.json();
        if (!data.results || data.results.length === 0) {
            throw new Error(`City "${query}" not found. Please try a different name.`);
        }

        const cityData = data.results[0];
        currentLat = cityData.latitude;
        currentLon = cityData.longitude;
        currentCityName = cityData.name;

        // Format region cleanly
        const regionParts = [];
        if (cityData.admin1) regionParts.push(cityData.admin1);
        if (cityData.country) regionParts.push(cityData.country);
        currentRegion = regionParts.join(', ');

        // Update UI headers immediately
        document.getElementById('display-city-name').textContent = currentCityName;
        document.getElementById('display-region').textContent = currentRegion;

        // Clear input
        input.value = '';
        input.blur();

        // Fetch new weather data
        await fetchWeatherData();

    } catch (error) {
        console.error("Search error:", error);
        document.getElementById('error-msg').textContent = error.message;
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        errorScreen.classList.remove('hidden');
    }
}

// Add Enter key listener for search input
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('city-search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
});

async function fetchWeatherData() {
    const loader = document.getElementById('loader');
    const errorScreen = document.getElementById('error-screen');
    const container = document.getElementById('forecast-container');

    // Update timezone=auto so global queries match their local time dynamically
    const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${currentLat}&longitude=${currentLon}&current=temperature_2m,is_day,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&forecast_days=10&timezone=auto`;

    const loaderText = loader.querySelector('h2');
    if (loaderText) loaderText.textContent = `Syncing Atmosphere...`;

    loader.style.opacity = '1';
    loader.style.pointerEvents = 'all';
    errorScreen.classList.add('hidden');

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        currentActualIsDay = data.current.is_day === 1;

        // 1. Setup Background & Theme
        setupBackground();
        document.getElementById('day-status').textContent = currentActualIsDay ? 'Daytime' : 'Nighttime';

        // 2. Update Current Weather
        const currDetails = parseWeatherCode(data.current.weather_code, currentActualIsDay);
        document.getElementById('current-temp').textContent = Math.round(data.current.temperature_2m);
        document.getElementById('current-desc').textContent = currDetails.desc;
        document.getElementById('current-icon-container').innerHTML = currDetails.icon;

        // 3. Update 10-Day Forecast Grid
        container.innerHTML = '';
        for (let i = 0; i < data.daily.time.length; i++) {
            const dateObj = new Date(data.daily.time[i]);
            const isToday = i === 0;
            const dateStr = isToday ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });

            const maxT = Math.round(data.daily.temperature_2m_max[i]);
            const minT = Math.round(data.daily.temperature_2m_min[i]);
            const rain = data.daily.precipitation_probability_max[i];

            // Forecast icons usually assume day for clarity, unless it's a specific nighttime forecast
            const dailyDetails = parseWeatherCode(data.daily.weather_code[i], true);

            const cardHTML = `
                        <div class="glass-card snap-center shrink-0 w-36 sm:w-44 flex flex-col items-center justify-between p-5 rounded-[1.5rem] relative overflow-hidden group">
                            <!-- Subtle highlight effect on hover inside card -->
                            <div class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <span class="font-bold text-lg mb-2 z-10 ${isToday ? 'text-yellow-300' : 'text-white/90'}">${dateStr}</span>
                            
                            <div class="w-20 h-20 mb-3 z-10 filter drop-shadow-md transition-transform duration-300 group-hover:scale-110">
                                ${dailyDetails.icon}
                            </div>
                            
                            <div class="flex items-center gap-3 text-xl font-extrabold z-10">
                                <span>${maxT}°</span>
                                <span class="opacity-50 font-semibold">${minT}°</span>
                            </div>
                            
                            <div class="mt-3 flex items-center gap-1 bg-black/20 px-3 py-1.5 rounded-full text-xs font-bold text-blue-200 z-10 border border-white/5">
                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" /></svg>
                                ${rain}%
                            </div>
                        </div>
                    `;
            container.insertAdjacentHTML('beforeend', cardHTML);
        }

        // Hide Loader smoothly
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.pointerEvents = 'none';
        }, 800);

    } catch (error) {
        console.error("Fetch error:", error);
        document.getElementById('error-msg').textContent = error.message || "Network issue detected. Please check your connection.";

        // Hide loader, show error screen
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        errorScreen.classList.remove('hidden');
    }
}

// Initialize App
fetchWeatherData();

// Refresh data every 30 minutes to keep current status updated
setInterval(fetchWeatherData, 30 * 60 * 1000);

