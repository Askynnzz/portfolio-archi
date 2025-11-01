"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

export default function HeroCarousel({ images, alt }: { images: string[]; alt: string }) {
  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-white/10">
      <Swiper slidesPerView={1} loop autoplay={{ delay: 3500, disableOnInteraction: false } as any}>
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <Image src={src} alt={alt} fill className="object-cover" priority={i === 0} sizes="(max-width:768px) 100vw, 50vw" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
