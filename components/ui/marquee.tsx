
'use client'

import Marquee from 'react-fast-marquee'
import {
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaReact,
    FaNodeJs,
} from 'react-icons/fa'
import {
    SiTypescript,
    SiNextdotjs,
    SiSvelte,
    SiElectron,
    SiExpress,
    SiNestjs,
    SiFirebase,
    SiPostgresql,
    SiMysql,
    SiSqlite,
    SiTailwindcss,
} from 'react-icons/si'

const TechMarquee = () => {
    return (
        <div className="mt-4">
            <Marquee gradient={false} speed={40} pauseOnHover>
                <div className="flex items-center gap-20 text-3xl">
                    <FaHtml5 title="HTML" />
                    <FaCss3Alt title="CSS" />
                    <FaJs title="JavaScript" />
                    <SiTypescript title="TypeScript" />
                    <FaReact title="React" />
                    <SiNextdotjs title="Next.js" />
                    <SiSvelte title="Svelte" />
                    <SiElectron title="Electron" />
                    <FaNodeJs title="Node.js" />
                    <SiExpress title="Express" />
                    <SiNestjs title="NestJS" />
                    <SiFirebase title="Firebase" />
                    <SiPostgresql title="PostgreSQL" />
                    <SiMysql title="MySQL" />
                    <SiSqlite title="SQLite" />
                    <SiTailwindcss title="Tailwind CSS" />
                </div>
            </Marquee>
        </div>
    )
}

export default TechMarquee
