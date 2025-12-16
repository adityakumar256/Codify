const contactMethods = [
  {
    icon: "📧",
    title: "Email",
    value: "hello@platform.com",
    link: "mailto:hello@platform.com",
  },
  {
    icon: "📱",
    title: "Phone",
    value: "+1 (555) 123-4567",
    link: "tel:+15551234567",
  },
  {
    icon: "📍",
    title: "Office",
    value: "123 Innovation St, Tech City",
    link: "https://maps.google.com",
  },
  {
    icon: "💬",
    title: "Live Chat",
    value: "Available 24/7",
    link: "#",
  },
]

export function ContactInfo() {
  return (
    <section className="min-h-screen flex items-center justify-center p-8 py-24">
      <div className="max-w-6xl w-full">
        <h2 className="text-5xl font-bold text-center mb-16 text-white">
          Other Ways to <span className="text-red-500">Reach Us</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              className="glassmorphism p-8 rounded-xl text-center hover-tilt transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] group opacity-0 animate-slideUp"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <div
                className="text-5xl mb-4 animate-float"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {method.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                {method.title}
              </h3>

              <p className="text-gray-400 text-sm">{method.value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
