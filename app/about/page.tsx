import Image from "next/image"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">About Silver Street Jewelry</h1>

      {/* Welcome Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome to Silver Street!</h2>
        <p className="text-lg text-gray-600 mb-6">
          Since we first opened back in 1994, we have strived for beauty and uniqueness in all our pieces, and
          challenged the status quo by creating pieces that blend classic elegance with modern versatility. Our brand is
          not just about jewelry, it's about providing you with a medium to express your personal style through timeless
          and sophisticated designs. Our pieces are classic yet contemporary that adapt to an ever evolving world and
          transcends generations.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-lg text-gray-600 mb-6">
            Our story begins in 1994, when we opened our little store on the vibrant Las Olas Boulevard in Fort
            Lauderdale. Our founders, Ruthie and Bill, fell in love with the beauty of silver jewelry and made the bold
            decision to leave the corporate world behind to pursue their vision.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Determined to redefine what jewelry is, they set out to design a piece that could be used a hundred
            different ways and adapt to any style or look. And this is how our Silver Street Sphere Ring was born. With
            its sleek design and interchangeable spheres, it allows for limitless personalization and expression. We
            believe that true elegance should never be static, ever-evolving, just like personal style itself.
          </p>
          <p className="text-lg text-gray-600">
            To this day we are still a proud family owned business, and continue to embrace artistry and individuality
            in everything we do.
          </p>
        </div>
        <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1887"
            alt="Jewelry crafting"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      {/* Our Promise Section */}
      <div className="bg-gray-100 rounded-lg p-8 text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Our Promise</h2>
        <p className="text-lg text-gray-600 mb-6">
          At Silver Street Jewelry, we believe that jewelry should be as unique as the person wearing it. That's why we
          offer extensive customization options, ensuring that each piece tells your own story.
        </p>
        <a
          href="/products/sphere-rings"
          className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
        >
          Explore Our Collection
        </a>
      </div>

      {/* Thank You Section */}
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Thank You</h2>
        <p className="text-lg text-gray-600 mb-6">
          "Thank you for being a part of the Silver Street family. For 30 years, your support, loyalty, and love for our
          jewelry has been at the heart of everything we do. As we start this new chapter, we're grateful to have you
          with us on this journey."
        </p>
        <p className="text-lg font-medium">With love - Ruthie and Bill</p>
      </div>
    </div>
  )
}

