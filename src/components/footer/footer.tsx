'use client'

import Link from 'next/link'
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Dribbble,
  Globe,
  Heart,
} from 'lucide-react'
import { FooterBackgroundGradient } from '@/components/ui/hover-footer'
import { TextHoverEffect } from '@/components/ui/hover-footer'

export function Footer() {
  // Footer link data
  const footerLinks = [
    {
      title: "About Us",
      links: [
        { label: "Company History", href: "/about" },
        { label: "Meet the Team", href: "/about#team" },
        { label: "Employee Handbook", href: "/about#handbook" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Helpful Links",
      links: [
        { label: "FAQs", href: "/contact#faqs" },
        { label: "Support", href: "/contact" },
        {
          label: "Live Chat",
          href: "/contact#chat",
          pulse: true,
        },
      ],
    },
  ]

  // Contact info data
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#3ca2fa]" />,
      text: "support@hraiagent.com",
      href: "mailto:support@hraiagent.com",
    },
    {
      icon: <Phone size={18} className="text-[#3ca2fa]" />,
      text: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: <MapPin size={18} className="text-[#3ca2fa]" />,
      text: "New York, USA",
    },
  ]

  // Social media icons
  const socialLinks = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Dribbble size={20} />, label: "Dribbble", href: "#" },
    { icon: <Globe size={20} />, label: "Globe", href: "#" },
  ]

  return (
    <footer className="bg-[#0F0F11]/10 relative h-fit rounded-3xl overflow-hidden m-8 mt-0">
      <FooterBackgroundGradient />
      
      <div className="max-w-7xl mx-auto p-8 sm:p-12 md:p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="text-[#3ca2fa]" size={28} fill="#3ca2fa" />
              <span className="text-white text-3xl font-bold font-figtree">HR AI Agent</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-300 font-figtree font-light">
              The future of recruitment is here. Our AI-powered platform helps you find, screen, and hire the best talent faster than ever before.
            </p>
            {/* Social icons in brand section */}
            <div className="flex space-x-6 text-gray-400 pt-2">
              {socialLinks.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="hover:text-[#3ca2fa] transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-semibold mb-6 font-figtree">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-[#3ca2fa] transition-colors font-figtree font-light"
                    >
                      {link.label}
                    </Link>
                    {link.pulse && (
                      <span className="absolute top-0 right-[-10px] w-2 h-2 rounded-full bg-[#3ca2fa] animate-pulse"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6 font-figtree">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-gray-300 hover:text-[#3ca2fa] transition-colors font-figtree font-light"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-300 hover:text-[#3ca2fa] transition-colors font-figtree font-light">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-gray-700 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-6 text-gray-400">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-[#3ca2fa] transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left text-gray-400 font-figtree font-light">
            &copy; {new Date().getFullYear()} HR AI Agent. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
        <TextHoverEffect text="EMIL AI" className="z-50" />
      </div>
    </footer>
  )
}
