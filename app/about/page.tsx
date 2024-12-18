import { Header } from '../../components/header';
import { Footer } from '../../components/footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl ml-6  font-bold text-left mb-8">
          About Liebe Perfume
        </h1>
        <div className="prose dark:prose-invert max-w-5xl ml-6 text-left text-lg leading-relaxed">
          <p>
            Welcome to <strong>Liebe Perfume</strong>, a brand born from a deep
            passion for the art of perfumery and a heartfelt dedication to
            celebrating individuality. The name <em>“Liebe”</em>, derived from
            the German word for “love,” embodies our philosophy: creating
            fragrances that resonate with love, emotion, and timeless elegance.
          </p>

          <p>
            At Liebe Perfume, we understand that a scent is not merely a
            fragrance—it’s an expression of identity, a silent companion through
            life’s moments, and a bridge to cherished memories. This belief
            inspires us to craft perfumes that transcend the ordinary, blending
            luxury with authenticity to evoke a profound connection with every
            wearer.
          </p>

          <p>
            Our journey begins with the careful selection of the world’s finest
            ingredients. From the lush fields of Provence to the vibrant spice
            markets of the East, we source premium-quality raw materials that
            form the heart of our creations. Each note is carefully chosen and
            expertly balanced, resulting in compositions that are both
            sophisticated and unforgettable.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Our Philosophy</h2>
          <p>
            Behind every bottle of Liebe Perfume is a team of skilled artisans
            and perfumers who bring their expertise and creativity to life.
            Guided by a commitment to excellence, we pour our passion into every
            detail—from the unique scent profiles to the elegant design of our
            packaging. Every aspect of our brand is designed to create a
            luxurious experience that delights the senses.
          </p>

          <p>
            But Liebe Perfume is more than just a fragrance house; it is a
            celebration of stories. We believe that each perfume tells a tale—of
            joy, love, and individuality. Whether you are searching for a scent
            to mark a special occasion, express your personality, or gift a
            loved one, we strive to provide an olfactory experience that
            resonates deeply with your emotions and aspirations.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            Sustainability & Ethics
          </h2>
          <p>
            At Liebe Perfume, sustainability and ethical practices are at the
            core of what we do. We are committed to minimizing our environmental
            footprint by sourcing responsibly and ensuring that our production
            processes uphold the highest ethical standards. Because we believe
            that true beauty lies not only in the product but also in how it’s
            made.
          </p>

          <p>
            Thank you for being part of our story. We invite you to explore our
            world of fragrances and discover a scent that is uniquely yours. Let
            Liebe Perfume be your partner in crafting unforgettable moments, one
            exquisite fragrance at a time.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
