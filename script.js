const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", () => {
  document.getElementById("memories").scrollIntoView({ behavior: "smooth" });
  burstHearts(window.innerWidth / 2, window.innerHeight / 2, 28);
});

// yıldız/parıltı arka planı
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas(){
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
  ctx.setTransform(dpr,0,0,dpr,0,0);
  stars = Array.from({length: Math.floor(innerWidth/7)}, () => ({
    x: Math.random()*innerWidth,
    y: Math.random()*innerHeight,
    r: Math.random()*1.7+.25,
    a: Math.random(),
    s: Math.random()*.02+.005
  }));
}
function drawStars(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const s of stars){
    s.a += s.s;
    const alpha = .2 + Math.abs(Math.sin(s.a))*0.8;
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(255,${150+Math.floor(Math.random()*70)},240,${alpha})`;
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}
resizeCanvas(); drawStars();
addEventListener("resize", resizeCanvas);

// uçan mor-pembe kelebekler
const butterflyWrap = document.getElementById("butterflies");
const butterflySymbols = ["🦋","🦋","🦋"];
for(let i=0;i<10;i++){
  const b = document.createElement("span");
  b.className = "butterfly";
  b.textContent = butterflySymbols[i % butterflySymbols.length];
  b.style.top = `${Math.random()*85}%`;
  b.style.left = `${-20-Math.random()*50}px`;
  b.style.fontSize = `${22+Math.random()*28}px`;
  b.style.animationDuration = `${12+Math.random()*15}s`;
  b.style.animationDelay = `${-Math.random()*20}s`;
  b.style.filter = i%2
    ? "hue-rotate(270deg) saturate(1.5) drop-shadow(0 0 7px #ff4fc8)"
    : "hue-rotate(220deg) saturate(1.4) drop-shadow(0 0 7px #a84bff)";
  butterflyWrap.appendChild(b);
}

// fotoğraf kartları görünürken giriş animasyonu
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      entry.target.style.transition = "opacity .8s ease, transform .8s ease";
      entry.target.style.transform = "translateY(0) rotate(0)";
    }
  });
},{threshold:.16});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

// kalp patlaması
function burstHearts(x,y,count=35){
  const chars = ["💜","💗","💕","✨","♡"];
  for(let i=0;i<count;i++){
    const p=document.createElement("span");
    p.className="love-particle";
    p.textContent=chars[Math.floor(Math.random()*chars.length)];
    p.style.left=x+"px";
    p.style.top=y+"px";
    p.style.fontSize=(14+Math.random()*20)+"px";
    p.style.setProperty("--x", `${(Math.random()-.5)*420}px`);
    p.style.setProperty("--y", `${(Math.random()-.75)*420}px`);
    p.style.setProperty("--r", `${(Math.random()-.5)*360}deg`);
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),1900);
  }
}
document.getElementById("loveBtn").addEventListener("click",e=>{
  const r=e.currentTarget.getBoundingClientRect();
  burstHearts(r.left+r.width/2,r.top+r.height/2,45);
});
