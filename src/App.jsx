import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/***********************
 *  Helpers & icons    *
 ***********************/
const t = (lang, fr, en) => (lang === "fr" ? fr : en);
const Check = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8 text-accent shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

/***********************
 *      Component      *
 ***********************/
export default function App() {
  /* ───────── state ───────── */
  const [lang, setLang] = useState("fr");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);

  /* ───────── AOS init ────── */
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  /* ───────── submit ──────── */
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const r = await fetch("/api/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          from: "RAPPELSMS",
          to: form.phone,
          content: form.message,
          secret: import.meta.env.VITE_SHARED_SECRET,
        }),
      });
      setStatus(r.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  /* ───────── pricing data ── */
  const pricing = [
    {
      name: "Pauvre",
      price: "99 DH/mo",
      popular: false,
      features: [
        t(lang, "50 SMS gratuits", "50 free SMS"),
        t(lang, "PAYG 2,5 DH/SMS", "PAYG 2.5 DH/SMS"),
        "Email support",
      ],
    },
    {
      name: "Gold",
      price: "299 DH/mo",
      popular: true,
      features: [
        t(lang, "500 SMS inclus", "500 SMS included"),
        t(lang, "Au-delà : 2 DH/SMS", "Overage : 2 DH/SMS"),
        "WhatsApp + Email",
      ],
    },
    {
      name: "Premium",
      price: "499 DH/mo",
      popular: false,
      features: [
        t(lang, "2 000 SMS inclus", "2,000 SMS included"),
        t(lang, "Au-delà : 1,8 DH/SMS", "Overage : 1.8 DH/SMS"),
        "SLA priorité",
      ],
    },
  ];

  /* ───────── JSX ─────────── */
  return (
    <div className="font-sans text-gray-800 dark:bg-dark dark:text-gray-100 selection:bg-primary-200 scroll-smooth">
      {/* NAVBAR */}
      <header className="fixed inset-x-0 top-0 z-40 bg-white/80 dark:bg-dark/80 backdrop-blur border-b border-primary/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="#home" className="text-2xl font-extrabold tracking-tight">
            Rappel<span className="text-primary">SMS</span>
          </a>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            {[
              ["home", t(lang, "Accueil", "Home")],
              ["about", t(lang, "À propos", "About")],
              ["services", t(lang, "Services", "Services")],
              ["pricing", t(lang, "Tarifs", "Pricing")],
              ["contact", t(lang, "Contact", "Contact")],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} className="hover:text-primary transition capitalize">
                {label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="px-3 py-1 border rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="scroll-mt-24 relative flex flex-col items-center justify-center text-center min-h-screen bg-hero bg-cover bg-center text-gray-100">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-4 max-w-3xl space-y-8" data-aos="fade-up">
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
            {t(lang, "N’oubliez plus vos rendez-vous !", "Never miss an appointment again!")}
          </h1>
          <p className="text-lg sm:text-xl">
            {t(lang, "Rappels, promos et avis — prêts en 30 s.", "Reminders, promos & reviews — live in 30 s.")}
          </p>
          <a href="#contact" className="btn-primary inline-block">
            {t(lang, "Demander une démo", "Request a demo")}
          </a>
        </div>
        <svg className="absolute -bottom-1 w-full h-24 text-white dark:text-dark fill-current" viewBox="0 0 1440 320">
          <path d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,234.7C672,256,768,256,864,224C960,192,1056,128,1152,112C1248,96,1344,128,1392,144L1440,160L1440,320L0,320Z" />
        </svg>
      </section>

      {/* ABOUT */}
      <section id="about" className="scroll-mt-24 py-24" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t(lang, "À propos", "About us")}</h2>
          <p className="text-lg leading-relaxed">
            {t(
              lang,
              "20 % des rendez-vous sont manqués. RappelSMS automatise rappels, promos et demandes d’avis pour remplir votre agenda et booster votre réputation.",
              "20 % of appointments are missed. RappelSMS automates reminders, promos & reviews to keep your schedule full and reputation shining."
            )}
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-24 py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center" data-aos="fade-up">
            {t(lang, "Nos services", "Our services")}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4" data-aos="fade-up" data-aos-delay="100">
            {[
              [t(lang, "Rappels automatiques", "Automatic reminders"), t(lang, "SMS avant chaque rendez-vous.", "SMS before every appointment.")],
              [t(lang, "Demandes d’avis", "Review requests"), t(lang, "Lien Google après la visite.", "Google link after visit.")],
              [t(lang, "ID client unique", "Unique client ID"), t(lang, "Anti‑fraude intégrée.", "Built‑in anti‑fraud.")],
              [t(lang, "Statistiques en temps réel", "Live analytics"), t(lang, "No‑shows & avis en direct.", "Live no‑shows & reviews.")],
            ].map(([title, desc]) => (
              <div key={title} className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow transition hover:-translate-y-1 hover:shadow-xl border-t-4 border-transparent hover:border-accent">
                <Check />
                <h3 className="text-lg font-semibold mb-1">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-primary-50 dark:bg-dark" data-aos="fade-up">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 text-center">
          {[
            ["98 %", t(lang, "Rendez-vous honorés", "Show-up rate")],
            ["4,8★", t(lang, "Note Google", "Google rating")],
            ["30 s", t(lang, "Configuration", "Setup time")],
          ].map(([v, l]) => (
            <div key={l} className="space-y-2">
              <span className="text-5xl font-extrabold text-primary">{v}</span>
              <p className="text-gray-600 dark:text-gray-300">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="scroll-mt-24 py-24 bg-gray-50 dark:bg-gray-800" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">{t(lang, "Tarifs", "Pricing")}</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {pricing.map(({ name, price, features, popular }) => (
              <div
                key={name}
                className={`relative p-8 bg-white dark:bg-gray-900 rounded-lg shadow border transition ${
                  popular ? "border-accent scale-105" : "border-transparent"
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-accent text-white text-xs">
                    {t(lang, "Populaire", "Popular")}
                  </span>
                )}
                <h3 className="text-xl font-semibold mb-1">{name}</h3>
                <p className="text-3xl font-extrabold mb-4">{price}</p>
                <ul className="space-y-2 mb-6 text-sm text-left">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check /> <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="btn-primary w-full">
                  {t(lang, "Commencer", "Get started")}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-24 py-24" data-aos="fade-up">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">{t(lang, "Contact", "Contact us")}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              className="w-full p-3 rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700"
              placeholder={t(lang, "Votre nom", "Your name")}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              className="w-full p-3 rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="tel"
              className="w-full p-3 rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700"
              placeholder={t(lang, "Téléphone (ex 2126…)", "Phone (e.g. 2126…)")}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <textarea
              rows={4}
              className="w-full p-3 rounded-lg border-gray-300 dark:bg-gray-800 dark:border-gray-700"
              placeholder={t(lang, "Votre message", "Your message")}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-50 transition"
              disabled={status === "loading"}
            >
              {status === "loading" ? t(lang, "Envoi…", "Sending…") : t(lang, "Envoyer", "Send")}
            </button>
            {status === "ok" && <p className="text-green-600 text-center">{t(lang, "Message envoyé !", "Message sent!")}</p>}
            {status === "error" && <p className="text-red-600 text-center">{t(lang, "Erreur. Réessayez.", "Error. Try again.")}</p>}
          </form>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 bg-primary text-white text-center" data-aos="zoom-in">
        <h2 className="text-3xl font-bold mb-4">{t(lang, "Prêt à réduire vos no-shows ?", "Ready to cut no-shows?")}</h2>
        <a
          href="#contact"
          className="inline-block px-10 py-3 rounded-lg bg-accent hover:bg-accent/90 font-semibold shadow-lg transition"
        >
          {t(lang, "Essayez-le gratuitement", "Try it free")}
        </a>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm bg-gray-100 dark:bg-dark/60">
        © {new Date().getFullYear()} RappelSMS. All rights reserved.
      </footer>
    </div>
  );
}