import { MatrixRain } from './components/MatrixRain'
import './App.css'

const skills = [
  'Python',
  'Go',
  'Rust',
  'React / TS / Node',
  'Kubernetes',
  'Kafka',
  'LangGraph',
]

const navLinks = [
  { label: 'projects', href: '/projects' },
  { label: 'blog', href: '/blog' },
]

const links = [
  { label: 'GitHub', href: 'https://github.com/snazzyjames' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sjmcniff/' },
]

function App() {
  return (
    <>
      <MatrixRain />

      <nav className="topnav">
        <a className="brand" href="/">
          ~/
        </a>
        <div className="topnav-links">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}>
              <span className="tilde">~/</span>
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="shell">
        <header className="prompt">
          james@mcniff:~$<span className="cmd"> whoami</span>
        </header>

        <h1 className="name">James McNiff</h1>

        <p className="role">
          Leader
          <span className="sep"> · </span>Principal Engineer
          <span className="sep"> · </span>DevSecOps
        </p>

        <p className="bio">
          Principal-level engineering leader with a fullstack / DevSecOps
          background. I build distributed, cloud-native systems and lead the
          product, platform, and infrastructure teams behind them — operating
          where hands-on engineering meets organizational strategy.
        </p>

        <p className="bio">
          Right now I&apos;m deep in the agentic AI space, focused on
          observability, security, and reliability for AI pipelines — an area
          with a lot of unsolved problems and not enough good tooling yet. I
          care about systems that are actually maintainable, and about making
          the hard problems visible before they become incidents.
        </p>

        <ul className="skills">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>

        <nav className="links">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <footer className="cursor-line">
          james@mcniff:~$
          <span className="cursor" aria-hidden="true" />
        </footer>
      </main>
    </>
  )
}

export default App
