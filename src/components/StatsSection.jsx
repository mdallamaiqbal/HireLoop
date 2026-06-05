"use client";
import Image from "next/image";
import { motion } from "motion/react"
import {
  Briefcase,
  Factory,
  Magnifier,
  Star,
} from "@gravity-ui/icons";
import { Card } from "@heroui/react";

const stats = [
  {
    icon: <Briefcase className="h-5 w-5 text-white" />,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: <  Factory className="h-5 w-5 text-white" />,
    value: "12K",
    label: "Companies",
  },
  {
    icon: <Magnifier className="h-5 w-5 text-white" />,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: <Star className="h-5 w-5 text-white" />,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-black pt-32">
      {/* Globe */}
      <div className="absolute inset-0 bg-cover bg-center opacity-90 bg-no-repeat flex justify-center"
      style={{backgroundImage: "url('/images/globe.png')"}}
      >
     
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-20 text-center mx-auto max-w-3xl ">
          <h2 className="text-2xl font-medium leading-tight text-white ">
            Assisting over{" "}
           15,000 job seekers
            <br />
            find their dream positions.
          </h2>
          <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }}>Remote Jobs</motion.p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="border border-white/10 bg-black/10 backdrop-blur-xl"
            >
              <div className="p-8">
                <div className="mb-12">
        {stat.icon}
      </div>

                <h3 className="mb-2 text-5xl font-bold text-white">
                  {stat.value}
                </h3>

                <p className="text-lg text-gray-300">
                  {stat.label}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}