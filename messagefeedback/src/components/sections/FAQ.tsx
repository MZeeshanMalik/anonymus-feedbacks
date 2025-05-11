import React, { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "Is my feedback truly anonymous?",
    answer:
      "Yes, all feedback through Mystery Message is 100% anonymous. We do not track or store information that could identify the sender, ensuring honest feedback without fear of judgment.",
  },
  {
    id: 2,
    question: "How do I share my personal link?",
    answer:
      "After creating an account, you'll receive a unique link from your dashboard. You can share this link via social media, email, messaging apps, or anywhere else you'd like to receive feedback from.",
  },
  {
    id: 3,
    question: "Can I respond to the feedback I receive?",
    answer:
      "Currently, Mystery Message is designed as a one-way feedback platform. While you can't respond directly to specific feedback, you can use the insights gained to make positive changes in your personal and professional life.",
  },
  {
    id: 4,
    question: "Is there a limit to how much feedback I can receive?",
    answer:
      "No, there are no limits to the amount of feedback you can receive on your Mystery Message profile. Your dashboard will store all feedback for you to review at any time.",
  },
  {
    id: 5,
    question: "Can I delete feedback I don't want to see?",
    answer:
      "Yes, you have full control over your feedback. If you receive inappropriate or unhelpful messages, you can easily delete them from your dashboard.",
  },
  {
    id: 6,
    question: "Is my data secure on Mystery Message?",
    answer:
      "We take data security very seriously. All your information and the feedback you receive are encrypted and stored securely. We never share your data with third parties.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Got questions about Mystery Message? We have got answers to the most
            common questions about our platform.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq) => (
              <FAQItem key={faq.id} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

type FAQType = {
  id: number;
  question: string;
  answer: string;
};

const FAQItem = ({ faq }: { faq: FAQType }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="flex justify-between items-center w-full p-5 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 p-5 bg-gray-50" : "max-h-0"
        }`}
      >
        <p className="text-gray-600">{faq.answer}</p>
      </div>
    </div>
  );
};

export default FAQ;
