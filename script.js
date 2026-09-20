/* ---------- Theme switcher ---------- */

const themes = [
  { background: "#32292F", primary: "#99E1D9", secondary: "#C6B6F0" },
  { background: "#020202", primary: "#B2D5E5", secondary: "#E5BDDF" },
  { background: "#171717", primary: "#C6FF34", secondary: "#99E1D9" },
  { background: "#36255C", primary: "#D2C3F6", secondary: "#F7B2D9" },
  { background: "#1D1D1D", primary: "#E5BDDF", secondary: "#B2D5E5" },
];

const FADE_MS = 600; // khớp với transition của .theme-overlay trong CSS

const root = document.documentElement;
const colorButton = document.querySelector(".color-btn");
const overlay = document.querySelector(".theme-overlay");

let themeIndex = -1;
let timeoutId;

colorButton.addEventListener("click", () => {
  clearTimeout(timeoutId);
  themeIndex = (themeIndex + 1) % themes.length;

  const { background, primary, secondary } = themes[themeIndex];

  root.style.setProperty("--primary", primary);
  root.style.setProperty("--secondary", secondary);

  // Overlay phủ màu mới lên trước, rồi mới đổi nền thật phía sau
  overlay.style.background =
    `linear-gradient(to bottom, ${background}, ${background}, var(--background-bottom))`;
  overlay.style.opacity = "1";

  timeoutId = setTimeout(() => {
    root.style.setProperty("--background-top", background);
    root.style.setProperty("--background-middle", background);
    overlay.style.opacity = "0";
  }, FADE_MS);
});

/* ---------- Floating particles ---------- */

const PARTICLE_COUNT = 50;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

let width = innerWidth;
let height = innerHeight;

addEventListener("resize", () => {
  width = innerWidth;
  height = innerHeight;
});

const rand = (min, max) => Math.random() * (max - min) + min;

const fragment = document.createDocumentFragment();

const particles = Array.from({ length: PARTICLE_COUNT }, () => {
  const el = document.createElement("div");
  const size = rand(2, 6);

  el.className = "particle";
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.boxShadow = `0 0 ${size * 2}px rgba(255, 255, 255, 0.25)`;
  fragment.appendChild(el);

  return {
    el,
    x: rand(0, width),
    y: rand(0, height),
    speed: rand(5, 20),               // tốc độ rất chậm (px/giây)
    baseOpacity: rand(0.2, 0.7),
    twinkleSpeed: rand(0.001, 0.003),
    twinkleOffset: rand(0, Math.PI * 2),
  };
});

document.body.appendChild(fragment);

let lastTime = 0;

// Một vòng lặp duy nhất cho tất cả các hạt
function animate(now) {
  const dt = Math.min(now - lastTime, 100) / 1000; // chặn giật khi quay lại tab
  lastTime = now;

  for (const p of particles) {
    // Trôi sang phải và hơi xuống
    p.x += p.speed * dt;
    p.y += p.speed * 0.3 * dt;

    // Ra khỏi màn hình thì quay lại
    if (p.x > width + 10) p.x = -10;
    if (p.y > height + 10) p.y = -10;

    const twinkle = Math.sin(now * p.twinkleSpeed + p.twinkleOffset);

    p.el.style.opacity = p.baseOpacity + twinkle * 0.08;
    p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
  }

  if (!reduceMotion) requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

/* ---------- Donate popup ---------- */

const donateBtn = document.querySelector("#donate-btn");
const modal = document.querySelector("#donate-modal");
const qrImage = document.querySelector("#donate-qr");
const donateText = document.querySelector("#donate-text");

donateBtn.addEventListener("click", () => modal.showModal());

modal.querySelector(".modal-close").addEventListener("click", () => modal.close());

// Bấm ra ngoài popup (vùng nền tối) thì đóng
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});

// Nếu thiếu file zalopay-qr.png thì báo rõ thay vì hiện ảnh vỡ
qrImage.addEventListener("error", () => {
  qrImage.hidden = true;
  donateText.textContent = "The QR code could not be loaded right now.";
});

