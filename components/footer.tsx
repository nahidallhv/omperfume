import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 ml-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/category/women">Women</Link></li>
              <li><Link href="/category/men">Men</Link></li>
              <li><Link href="/category/unisex">Unisex</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <ul className="space-y-2">
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/shipping">Shipping & Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <ul className="space-y-2">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm">&copy; 2024 <a href="https://nahiddallhvv.vercel.app/" target='blank' className='font-semibold'>Nahid Allahverdiyev.</a>  All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

