import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What is Mystery Message?
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A platform that lets you receive honest, anonymous feedback from
            friends, colleagues, and anyone else in your life.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 lg:pr-16 mb-10 lg:mb-0">
            <div className="lg:max-w-md">
              <div className="space-y-8">
                <Step
                  number="01"
                  title="Create Your Account"
                  description="Sign up with your email address to get started. If you already have an account, simply log in to access your dashboard."
                />
                <Step
                  number="02"
                  title="Get Your Personal Link"
                  description="Access your dashboard to get a unique personalized link (e.g., messagefeedback.com/yourname)."
                />
                <Step
                  number="03"
                  title="Share With Others"
                  description="Share your link with friends, colleagues, or anyone else you want feedback from."
                />
                <Step
                  number="04"
                  title="Receive Anonymous Feedback"
                  description="Check your dashboard to see feedback submissions in real-time, all completely anonymous."
                />
                <Step
                  number="05"
                  title="Gain Valuable Insights"
                  description="Review all the feedback you've received on your dashboard and use it to grow."
                />
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 rounded-lg transform translate-x-4 translate-y-4"></div>
              <Image
                src="/static/girl.jpg"
                alt="Person using Mystery Message"
                width={600}
                height={600}
                className="relative z-10 rounded-lg shadow-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Step component
interface StepProps {
  number: string;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ number, title, description }) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0 mr-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold">
          {number}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default About;
