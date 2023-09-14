import Link from 'next/link'

export default function Footer(){
        return (
           <footer className="footer-wrapper">
                <div className="footer-links">
                    <Link href="/blog">Blog</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                </div>
                <div className="footer-bottom-msg">
                    <p>Handcrafted by Mouhamadou</p>
                </div>
          </footer>  
        )
}