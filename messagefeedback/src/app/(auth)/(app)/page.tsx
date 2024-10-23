"use client";
import React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";
import dynamic from "next/dynamic";

// Dynamically import the Carousel with SSR disabled
const Carousel = dynamic(
  () => import("@/components/ui/carousel").then((mod) => mod.Carousel),
  { ssr: false }
);

function Home() {
  return (
    <div>
      <main className="flex-grow flex flex-col items-center justify-center">
        <section className="text-center mt-4 mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive in world of annonymus conversation
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Explore Mystery Message - Where your identity remains a secret.
          </p>
        </section>
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-xs"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardHeader>{message.title}</CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-lg font-semibold">
                        {message.content}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>
      <footer className="text-center p-4 md:p-6">
        ©️ 2024 Mystery message. All rights are reserved.
      </footer>
    </div>
  );
}

export default Home;
