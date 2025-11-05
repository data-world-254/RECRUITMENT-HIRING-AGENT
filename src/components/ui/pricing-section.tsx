"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import NumberFlow from "@number-flow/react";
import { Briefcase, CheckCheck, Database, Server, Zap, Target, Users, Shield, Phone, Code, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface PricingPlan {
  name: string;
  description: string;
  price: number;
  yearlyPrice: number;
  buttonText: string;
  buttonVariant: "outline" | "default";
  popular?: boolean;
  features: Array<{ text: string; icon: React.ReactNode }>;
  includes: string[];
  onButtonClick: () => void;
}

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-50 mx-auto flex w-fit rounded-full bg-neutral-900 border border-blue-500/30 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={`relative z-10 w-fit sm:h-12 h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors font-figtree ${
            selected === "0"
              ? "text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 sm:h-12 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 via-blue-400 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Monthly</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={`relative z-10 w-fit sm:h-12 h-8 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors font-figtree ${
            selected === "1"
              ? "text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 sm:h-12 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 via-blue-400 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">
            Yearly
            <span className="rounded-full bg-blue-600/30 px-2 py-0.5 text-xs font-medium text-white border border-blue-500/50">
              Save 20%
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

interface PricingSectionProps {
  plans?: PricingPlan[];
}

export default function PricingSection({ plans: customPlans }: PricingSectionProps) {
  const router = useRouter();
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const defaultPlans: PricingPlan[] = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started with AI recruitment",
      price: 29,
      yearlyPrice: 249,
      buttonText: "Get Started",
      buttonVariant: "outline",
      features: [
        { text: "Up to 100 job postings", icon: <Briefcase size={20} /> },
        { text: "Basic AI screening", icon: <Database size={20} /> },
        { text: "Standard analytics", icon: <Server size={20} /> },
      ],
      includes: [
        "Free includes:",
        "Up to 5 users",
        "Email support",
        "Basic integrations",
      ],
      onButtonClick: () => router.push('/auth/signup'),
    },
    {
      name: "Professional",
      description: "Advanced features for growing companies and HR teams",
      price: 79,
      yearlyPrice: 679,
      buttonText: "Get Started",
      buttonVariant: "default",
      popular: true,
      features: [
        { text: "Unlimited job postings", icon: <Briefcase size={20} /> },
        { text: "Advanced AI screening", icon: <Database size={20} /> },
        { text: "Team of up to 25 users", icon: <Server size={20} /> },
      ],
      includes: [
        "Everything in Starter, plus:",
        "Priority support",
        "Advanced analytics",
        "All integrations",
        "Custom workflows",
        "Advanced reporting",
        "API access",
      ],
      onButtonClick: () => router.push('/auth/signup'),
    },
    {
      name: "Enterprise",
      description: "Complete solution for large organizations with custom needs",
      price: 199,
      yearlyPrice: 1599,
      buttonText: "Contact Sales",
      buttonVariant: "outline",
      features: [
        { text: "Unlimited users", icon: <Users size={20} /> },
        { text: "White-label solution", icon: <Globe size={20} /> },
        { text: "Custom AI training", icon: <Code size={20} /> },
      ],
      includes: [
        "Everything in Professional, plus:",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom integrations",
        "Advanced security",
        "SLA guarantee",
        "Custom deployment",
      ],
      onButtonClick: () => router.push('/contact'),
    },
  ];

  const plans = customPlans || defaultPlans;

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value) === 1);

  return (
    <div className="px-4 pt-20 min-h-screen mx-auto relative bg-black" ref={pricingRef}>
      <div
        className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at center, #206ce8 0%, transparent 70%)
      `,
          opacity: 0.4,
          mixBlendMode: "screen",
        }}
      />

      <div className="text-center mb-6 max-w-3xl mx-auto relative z-10">
        <TimelineContent
          as="h2"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-extralight font-figtree leading-[1.05] tracking-tight text-white mb-4"
        >
          Plans that works best for your{" "}
          <TimelineContent
            as="span"
            animationNum={1}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="border border-dashed border-blue-500 px-2 py-1 rounded-xl bg-blue-500/20 capitalize inline-block"
          >
            business
          </TimelineContent>
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={2}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="sm:text-base text-sm text-gray-300 sm:w-[70%] w-[80%] mx-auto font-figtree"
        >
          Choose the perfect plan for your team. Start free, upgrade anytime.
        </TimelineContent>
      </div>

      <TimelineContent
        as="div"
        animationNum={3}
        timelineRef={pricingRef}
        customVariants={revealVariants}
      >
        <PricingSwitch onSwitch={togglePricingPeriod} />
      </TimelineContent>

      <div className="grid md:grid-cols-3 max-w-7xl gap-4 py-6 mx-auto relative z-10">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={4 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
            <Card
              className={`relative border-neutral-800 bg-neutral-900/50 backdrop-blur-sm ${
                plan.popular ? "ring-2 ring-blue-500 bg-gradient-to-b from-blue-900/30 to-neutral-900/50" : ""
              }`}
            >
              <CardHeader className="text-left">
                <div className="flex justify-between">
                  <h3 className="text-5xl sm:text-6xl md:text-7xl font-extralight font-figtree leading-[1.05] tracking-tight text-white mb-2">
                    {plan.name}
                  </h3>
                  {plan.popular && (
                    <div className="">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium font-figtree">
                        Popular
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-300 mb-4 font-figtree">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-semibold text-white font-figtree">
                    $
                    <NumberFlow
                      value={isYearly ? plan.yearlyPrice : plan.price}
                      className="text-4xl font-semibold font-figtree"
                    />
                  </span>
                  <span className="text-gray-400 ml-1 font-figtree">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <button
                  onClick={plan.onButtonClick}
                  className={`w-full mb-6 p-4 text-xl rounded-xl font-figtree transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-t from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/50 border border-blue-400 text-white"
                      : plan.buttonVariant === "outline"
                        ? "bg-gradient-to-t from-neutral-800 to-neutral-700 hover:from-neutral-700 hover:to-neutral-600 shadow-lg shadow-neutral-900/50 border border-neutral-700 text-white"
                        : "bg-gradient-to-t from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/50 border border-blue-400 text-white"
                  }`}
                >
                  {plan.buttonText}
                </button>
                <ul className="space-y-2 font-semibold py-5">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <span className="text-blue-400 grid place-content-center mt-0.5 mr-3">
                        {feature.icon}
                      </span>
                      <span className="text-sm text-gray-300 font-figtree">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 pt-4 border-t border-neutral-800">
                  <h4 className="font-medium text-base text-white mb-3 font-figtree">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-2 font-semibold">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <span className="h-6 w-6 bg-blue-500/20 border border-blue-500 rounded-full grid place-content-center mt-0.5 mr-3">
                          <CheckCheck className="h-4 w-4 text-blue-400" />
                        </span>
                        <span className="text-sm text-gray-300 font-figtree">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
}

