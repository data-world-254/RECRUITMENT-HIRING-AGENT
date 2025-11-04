"use client";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "This HR AI platform revolutionized our recruitment process, streamlining candidate screening and reducing time-to-hire by 60%. The AI-powered platform keeps us productive and efficient.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    name: "Sarah Johnson",
    role: "Head of HR",
  },
  {
    text: "Implementing this AI recruitment system was smooth and quick. The customizable, user-friendly interface made team training effortless, and our hiring quality improved dramatically.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Michael Chen",
    role: "Talent Acquisition Director",
  },
  {
    text: "The support team is exceptional, guiding us through setup and providing ongoing assistance. The AI screening accuracy is outstanding, ensuring we always get the best candidates.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    name: "Emily Rodriguez",
    role: "Recruitment Manager",
  },
  {
    text: "This platform's seamless integration enhanced our business operations and efficiency. The bias-free AI screening helps us build diverse, high-performing teams. Highly recommend!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    name: "David Kim",
    role: "CEO",
  },
  {
    text: "Its robust features and quick support have transformed our workflow. We've reduced recruitment costs by 40% while improving candidate quality. Game changer for our HR department.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    name: "Priya Patel",
    role: "HR Operations Lead",
  },
  {
    text: "The smooth implementation exceeded expectations. The analytics dashboard gives us insights we never had before, allowing us to make data-driven recruitment decisions.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    name: "Alex Thompson",
    role: "Business Analyst",
  },
  {
    text: "Our recruitment function improved dramatically with the user-friendly design and intelligent automation. The automated workflows save us hours every week.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "James Wilson",
    role: "People Operations Director",
  },
  {
    text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations. We've scaled from 50 to 200 employees seamlessly.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
    name: "Lisa Anderson",
    role: "VP of Talent",
  },
  {
    text: "Using this HR AI platform, our time-to-fill reduced by 50% and candidate quality improved significantly. The predictive analytics help us forecast hiring needs accurately.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    name: "Robert Martinez",
    role: "Talent Strategy Manager",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const Testimonials = () => {
  return (
    <section className="bg-black my-20 relative py-20 px-4">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-white/20 py-1 px-4 rounded-lg text-white/80 text-sm font-figtree">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-white font-figtree">
            What our users say
          </h2>
          <p className="text-center mt-5 opacity-75 text-white/70 font-figtree">
            See what our customers have to say about us.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={20} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={23} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={22} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

