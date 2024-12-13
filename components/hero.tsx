import Link from 'next/link';
import { Button } from './ui/button';

export function Hero() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black overflow-hidden">
      {/* Animasyonlu Baloncuklar */}
      <div className="absolute inset-0 z-0 hero-animation">
        {/* Statik baloncuklar */}
        {[...Array(20)].map((_, i) => (
          <div key={i} className="raindrop"></div>
        ))}
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          {/* Hero İçeriği */}
          <div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
                Discover Your Signature Scent
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                Explore our curated collection of exquisite fragrances, crafted to elevate your everyday moments.
              </p>
            </div>
            <div className="space-x-4 mt-6">
              <Link href="/signin">
                <Button variant="outline" className="bg-black text-white hover:bg-primary-700">
                  Shop Now
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="border-white text-black hover:bg-slate-100">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
