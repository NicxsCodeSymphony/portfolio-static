import {navLinks} from "@/constants/navLinks";
import "@fontsource/marvel"

const Navbar = () => {

    return(
        <nav className="fixed top-8 left-8 right-8 flex justify-between items-center z-50 text-white" style={{fontFamily: 'Marvel, sans-serif'}}>
            <a href="#home" className="flex items-center gap-2 text-4xl">
                <p>Nico Edisan</p>
            </a>

            <ul className="flex items-center gap-4">
                {navLinks.map((link) => (
                    <li key={link.id} className="uppercase tracking-wider cursor-pointer transition-all duration-300">
                        <a href={`#${link.id}`}>{link.title}</a>
                    </li>
                ))}
            </ul>

        </nav>
    )

}

export default Navbar;