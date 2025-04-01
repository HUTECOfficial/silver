import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Definir los tipos directamente en el archivo
interface ListItem {
  bold?: string
  text: string
}

interface Section {
  heading: string
  paragraphs?: string[]
  listTitle?: string
  listItems?: ListItem[]
  additionalParagraphs?: string[]
}

interface Footer {
  label: string
  date: string
}

interface PrivacyPolicyContent {
  backLink: string
  title: string
  introduction: string
  sections: Section[]
  footer: Footer
}

// Contenido integrado directamente en el componente
const privacyPolicyContent: PrivacyPolicyContent = {
  backLink: "Back to Home",
  title: "Privacy Policy",
  introduction:
    "At Silver Street Jewelry, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase from our store.",
  sections: [
    {
      heading: "Information We Collect",
      paragraphs: ["When you visit our site or make a purchase, we collect certain information about you, including:"],
      listItems: [
        {
          bold: "Personal Information",
          text: "Name, email address, phone number, shipping and billing addresses, and payment information when you make a purchase.",
        },
        {
          bold: "Account Information",
          text: "If you create an account, we store your name, address, email, phone, and purchase history.",
        },
        {
          bold: "Browsing Information",
          text: "We collect data about your browsing habits, including pages visited, products viewed, and time spent on our site.",
        },
        {
          bold: "Device Information",
          text: "We collect information about the device you use to access our site, including IP address, browser type, and operating system.",
        },
      ],
    },
    {
      heading: "How We Use Your Information",
      paragraphs: ["We use the information we collect to:"],
      listItems: [
        { text: "Process and fulfill your orders" },
        { text: "Communicate with you about your order, account, or customer service needs" },
        { text: "Personalize your shopping experience and provide product recommendations" },
        { text: "Improve our website, products, and services" },
        { text: "Send you marketing communications (with your consent)" },
        { text: "Protect against fraud and unauthorized transactions" },
      ],
    },
    {
      heading: "Sharing Your Information",
      paragraphs: [
        "We value your trust and handle your personal information with care. We may share your information with:",
      ],
      listItems: [
        {
          bold: "Service Providers",
          text: "Companies that help us operate our business, such as payment processors, shipping companies, and marketing partners.",
        },
        {
          bold: "Legal Requirements",
          text: "When required by law or to protect our rights, property, or safety.",
        },
      ],
      additionalParagraphs: [
        "We do not sell or rent your personal information to third parties for their marketing purposes without your explicit consent.",
      ],
    },
    {
      heading: "Cookies and Tracking Technologies",
      paragraphs: [
        "We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookies through your browser settings, but disabling them may affect your experience on our site.",
      ],
    },
    {
      heading: "Your Privacy Rights",
      paragraphs: [
        "Depending on your location, you may have certain rights regarding your personal information, including:",
      ],
      listItems: [
        { text: "The right to access and receive a copy of your personal information" },
        { text: "The right to correct or update your personal information" },
        { text: "The right to request deletion of your personal information" },
        { text: "The right to object to processing of your personal information" },
        { text: "The right to data portability" },
      ],
      additionalParagraphs: [
        'To exercise these rights, please contact us using the information provided in the "Contact Us" section below.',
      ],
    },
    {
      heading: "Data Security",
      paragraphs: [
        "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.",
      ],
    },
    {
      heading: "Children's Privacy",
      paragraphs: [
        "Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.",
      ],
    },
    {
      heading: "Changes to This Privacy Policy",
      paragraphs: [
        'We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will post the updated Privacy Policy on our website and update the "Last Updated" date.',
      ],
    },
    {
      heading: "Contact Us",
      paragraphs: [
        "If you have any questions or concerns about our Privacy Policy or data practices, please contact us at:",
        "Silver Street Jewelry\nFort Lauderdale, FL\nPhone: (954) 525-0073\nEmail: sales@silverstreetjewelry.com",
      ],
    },
  ],
  footer: {
    label: "Last Updated:",
    date: "March 18, 2025",
  },
}

export default function PrivacyPolicy() {
  // Usar el contenido directamente
  const content = privacyPolicyContent

  return (
    <div className="container mx-auto px-4 py-16" data-sb-object-id="page">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-black mb-8"
          data-sb-field-path="backLink"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {content.backLink}
        </Link>

        <h1 className="text-4xl font-bold mb-8" data-sb-field-path="title">
          {content.title}
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 mb-8" data-sb-field-path="introduction">
            {content.introduction}
          </p>

          {content.sections.map((section, index) => (
            <div key={index} data-sb-field-path={`.sections.${index}`}>
              <h2 className="text-2xl font-semibold mt-8 mb-4" data-sb-field-path=".heading">
                {section.heading}
              </h2>

              {section.paragraphs &&
                section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex} data-sb-field-path={`.paragraphs.${pIndex}`}>
                    {paragraph}
                  </p>
                ))}

              {section.listItems && (
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  {section.listItems.map((item, itemIndex) => (
                    <li key={itemIndex} data-sb-field-path={`.listItems.${itemIndex}`}>
                      {item.bold && <strong data-sb-field-path=".bold">{item.bold}: </strong>}
                      <span data-sb-field-path=".text">{item.text}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.additionalParagraphs &&
                section.additionalParagraphs.map((paragraph, pIndex) => (
                  <p key={`additional-${pIndex}`} data-sb-field-path={`.additionalParagraphs.${pIndex}`}>
                    {paragraph}
                  </p>
                ))}
            </div>
          ))}

          <div className="bg-gray-100 p-6 rounded-lg mt-8" data-sb-field-path="footer">
            <p className="text-sm text-gray-600">
              <strong data-sb-field-path=".label">{content.footer.label}</strong>
              <span data-sb-field-path=".date"> {content.footer.date}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

