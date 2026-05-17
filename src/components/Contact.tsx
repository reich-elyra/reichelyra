"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type FormStatus = "idle" | "sending" | "success" | "error";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact() {
  const { t } = useLocale();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("contact.required");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("contact.required");
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t("contact.invalidEmail");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("contact.required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    if (!FORMSPREE_ENDPOINT) return;

    setStatus("sending");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof Error && err.name === "AbortError") {
        setStatus("error");
      } else {
        setStatus("error");
      }
    }
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="radial-glow" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-gold">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Info Cards */}
          <div className="reveal">
            <div className="glass-card p-8 space-y-8 h-full">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gold"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-text-muted mb-1">{t("contact.emailLabel")}</p>
                  <a
                    href={`mailto:${t("contact.email")}`}
                    className="text-foreground hover:text-gold transition-colors"
                  >
                    {t("contact.email")}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gold"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-text-muted mb-1">{t("contact.locationLabel")}</p>
                  <p className="text-foreground">{t("contact.location")}</p>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={`mailto:${t("contact.email")}`}
                  className="btn-primary w-full block text-center"
                >
                  {t("contact.cta")}
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="reveal">
            <div className="glass-card p-8 h-full">
              {!FORMSPREE_ENDPOINT ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gold"
                        aria-hidden="true"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <p className="text-text-muted text-sm">
                      {t("contact.cta")}
                    </p>
                    <a
                      href={`mailto:${t("contact.email")}`}
                      className="btn-primary inline-block"
                    >
                      {t("contact.email")}
                    </a>
                  </div>
                </div>
              ) : status === "success" ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gold"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="text-foreground text-sm leading-relaxed">
                      {t("contact.form.success")}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="btn-outline text-sm"
                    >
                      {t("contact.form.submit")}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm text-text-muted mb-1.5"
                    >
                      {t("contact.form.name")}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-foreground placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors ${
                        errors.name
                          ? "border-red-500/60"
                          : "border-white/10 hover:border-white/20"
                      }`}
                      placeholder={t("contact.form.name")}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm text-text-muted mb-1.5"
                    >
                      {t("contact.form.email")}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-foreground placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors ${
                        errors.email
                          ? "border-red-500/60"
                          : "border-white/10 hover:border-white/20"
                      }`}
                      placeholder={t("contact.form.email")}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm text-text-muted mb-1.5"
                    >
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-foreground placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors resize-none ${
                        errors.message
                          ? "border-red-500/60"
                          : "border-white/10 hover:border-white/20"
                      }`}
                      placeholder={t("contact.form.message")}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Error Banner */}
                  {status === "error" && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
                      <p className="text-red-400 text-sm">
                        {t("contact.form.error")}
                      </p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending"
                      ? t("contact.form.sending")
                      : t("contact.form.send")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
