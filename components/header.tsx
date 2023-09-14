import Link from 'next/link'

function Header(){
        return (
            <header className="header-wrapper">
                <div className="header-container">
                    <div className="header-logo">
                        <Link href="/">
                            <span className="header-logo-icon">💾</span>
                            <span className="header-logo-text">Mouhamadou DIA</span>
                        </Link>
                    </div>
                    <div className="header-links">
                        <Link href="/blog">Blog</Link>
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>
                        <Link href="/login">Login</Link>
                    </div>
                </div>
            </header>
        )
}
export default Header;