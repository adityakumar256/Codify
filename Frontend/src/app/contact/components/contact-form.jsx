import { useState } from "react"
import { Button } from "@/components/ui/button" 
// ⚠️ NOTE: Vite me alias configured hona chahiye (@ -> src)

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [focusedField, setFocusedField] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.message) newErrors.message = "Message is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" })
      setIsSuccess(false)
    }, 3000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center p-8 py-24">
      <div className="max-w-4xl w-full">
        <div className="glassmorphism p-8 md:p-12 rounded-2xl hover:shadow-[0_0_50px_rgba(239,68,68,0.3)] transition-all duration-500">
          {isSuccess ? (
            <div className="text-center py-12 animate-reveal">
              <div className="text-6xl mb-6 animate-bounce">✓</div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Message Sent!
              </h3>
              <p className="text-gray-400">
                We'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-3">
                  Contact Form
                </h2>
                <p className="text-gray-400">
                  Fill out the form below and we'll be in touch
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white transition-all ${
                      focusedField === "name"
                        ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                        : errors.name
                        ? "border-red-500 animate-shake"
                        : "border-gray-700"
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white transition-all ${
                      focusedField === "email"
                        ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                        : errors.email
                        ? "border-red-500 animate-shake"
                        : "border-gray-700"
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white transition-all ${
                    focusedField === "subject"
                      ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                      : "border-gray-700"
                  }`}
                  placeholder="How can we help?"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={6}
                  className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white transition-all resize-none ${
                    focusedField === "message"
                      ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                      : errors.message
                      ? "border-red-500 animate-shake"
                      : "border-gray-700"
                  }`}
                  placeholder="Tell us more about your inquiry..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-semibold transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
