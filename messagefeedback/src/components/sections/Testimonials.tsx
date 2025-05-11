import React from "react";
import Image from "next/image";

// Testimonial data
const testimonials = [
  {
    id: 1,
    content:
      "Mystery Message helped me understand how my colleagues really perceive me. The anonymous feedback was eye-opening and helped me grow both personally and professionally.",
    name: "Alex Morgan",
    role: "Marketing Director",
    avatar: "/static/profile2.jpg",
  },
  {
    id: 2,
    content:
      "This platform gave me insights I never would have received otherwise. People are more honest when they can remain anonymous, and that honesty has been invaluable for my personal development.",
    name: "Sarah Chen",
    role: "UX Designer",
    avatar: "/static/womanthinking.jpg",
  },
  {
    id: 3,
    content:
      "As a team leader, Mystery Message has been a game-changer. My team now has a way to share feedback they might otherwise keep to themselves creating a more open and communicative environment.",
    name: "Michael Johnson",
    role: "Product Manager",
    avatar: "/static/profile1.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Others Say About Us
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Do not just take our word for it. Here is what our users have to say
            about their experience with Mystery Message.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface Testimonial {
  id: number;
  content: string;
  name: string;
  role: string;
  avatar: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 transition-transform duration-300 hover:-translate-y-2">
      <div className="flex items-center mb-6">
        <div className="relative w-14 h-14 mr-4">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="rounded-full object-cover border-2 border-blue-100"
          />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900">
            {testimonial.name}
          </h4>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>

      <blockquote>
        <svg
          className="w-10 h-10 text-blue-100 mb-3"
          fill="currentColor"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <p className="text-gray-600 italic mb-6">{testimonial.content}</p>
      </blockquote>

      <div className="flex items-center">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
