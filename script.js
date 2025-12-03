// =======================
// Smooth Scrolling
// =======================
document.querySelectorAll("nav a, .btn, .btn2, .btn-whatsapp").forEach(link => {
    link.addEventListener("click", function(e) {
        if (this.getAttribute("href").startsWith("#")) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// =======================
// Scroll To Top Button
// =======================
let scrollBtn = document.createElement("button");
scrollBtn.textContent = "↑";
scrollBtn.id = "scrollTopBtn";
scrollBtn.style.cssText = `
    position: fixed;
    bottom: 25px;
    right: 25px;
    background:#003fcc;
    color:white;
    padding:10px 14px;
    border:none;
    border-radius:50%;
    font-size:18px;
    cursor:pointer;
    display:none;
    z-index:999;
`;
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
});
scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// =======================
// WhatsApp Quick Message Popup
// =======================
function openWhatsApp() {
    const defaultMessage = encodeURIComponent("Hello Frank, I would like to support your campaign.");
    window.open(`https://wa.me/265993054495?text=${defaultMessage}`, "_blank");
}

// Example trigger if needed:
// document.querySelector(".btn-whatsapp").addEventListener("click", openWhatsApp);


// =======================
// Animation on Scroll
// =======================
const sections = document.querySelectorAll("section, .manifesto-box, #about, #commitment li");

const revealOnScroll = () => {
    sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < window.innerHeight - 120) {
            sec.style.opacity = "1";
            sec.style.transform = "translateY(0)";
        }
    });
};

sections.forEach(sec => {
    sec.style.opacity = "0";
    sec.style.transform = "translateY(30px)";
    sec.style.transition = "0.8s ease-out";
});

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // run once on load
