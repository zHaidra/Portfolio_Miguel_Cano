import type { EducationItem, ExperienceItem } from '@/types';

/** Work history, most recent first. */
export const experience: ExperienceItem[] = [
  {
    id: 'risesense',
    role: {
      en: 'Software Developer & Co-Founder',
      es: 'Desarrollador de software y cofundador',
    },
    company: 'RiseSense',
    period: { en: 'March 2026 — Present', es: 'Marzo 2026 — Actualidad' },
    current: true,
    summary: {
      en: 'Development of AI automation solutions and software for businesses: backend integrations, REST APIs, databases, chatbots, appointment management systems, workflow automation and digital products adapted to each business.',
      es: 'Desarrollo de soluciones de automatización con IA y software para empresas: integraciones de backend, APIs REST, bases de datos, chatbots, sistemas de gestión de citas, automatización de flujos de trabajo y productos digitales adaptados a cada negocio.',
    },
    highlights: {
      en: [
        'Full-stack development of the products, from the data model through to the interface.',
        'Backend integrations and REST APIs connecting internal systems with third-party services.',
        'Database-driven systems: schema design and the queries the rest of the product depends on.',
        'Chatbots, appointment systems and automated workflows built on top of that foundation.',
        'Software architecture and technical implementation decisions across the product.',
      ],
      es: [
        'Desarrollo full-stack de los productos, desde el modelo de datos hasta la interfaz.',
        'Integraciones de backend y APIs REST que conectan sistemas internos con servicios de terceros.',
        'Sistemas sobre base de datos: diseño del esquema y las consultas de las que depende el resto del producto.',
        'Chatbots, sistemas de citas y flujos automatizados construidos sobre esa base.',
        'Decisiones de arquitectura de software e implementación técnica en todo el producto.',
      ],
    },
    tech: ['Python', 'REST APIs', 'PostgreSQL', 'MySQL', 'n8n', 'Automation'],
  },
  {
    id: 'mytel',
    role: {
      en: 'Senior Software Developer',
      es: 'Desarrollador de software sénior',
    },
    company: 'Mytel AI Technology',
    period: { en: 'August 2025 — March 2026', es: 'Agosto 2025 — Marzo 2026' },
    summary: {
      en: 'Full-stack development of web applications, covering frontend and backend, API integrations, database management, software architecture and the implementation of digital solutions.',
      es: 'Desarrollo full-stack de aplicaciones web, cubriendo frontend y backend, integraciones de APIs, gestión de bases de datos, arquitectura de software e implementación de soluciones digitales.',
    },
    highlights: {
      en: [
        'Built and maintained web applications across both sides of the stack.',
        'Integrated third-party APIs and managed the databases behind them.',
        'Contributed to software architecture decisions on new features.',
      ],
      es: [
        'Desarrollo y mantenimiento de aplicaciones web en los dos lados del stack.',
        'Integración de APIs de terceros y gestión de las bases de datos que había detrás.',
        'Participación en las decisiones de arquitectura de software de las nuevas funcionalidades.',
      ],
    },
    tech: ['JavaScript', 'Java', 'SQL', 'REST APIs', 'Full-Stack'],
  },
];

/** Education, most recent first. */
export const education: EducationItem[] = [
  {
    id: 'coventry',
    qualification: {
      en: 'BSc Artificial Intelligence',
      es: 'Grado en Inteligencia Artificial',
    },
    institution: 'Coventry University',
    period: '2025 — 2026',
    grade: {
      en: 'Upper Second Class Honours (2:1)',
      es: 'Upper Second Class Honours (2:1)',
    },
    subjects: {
      en: [
        'Machine Learning',
        'Robotics and Intelligent Agents',
        'Artificial Neural Networks',
        'Security',
        'Project Management',
        'Individual Project',
      ],
      es: [
        'Machine Learning',
        'Robótica y agentes inteligentes',
        'Redes neuronales artificiales',
        'Seguridad',
        'Gestión de proyectos',
        'Proyecto individual',
      ],
    },
  },
  {
    id: 'msmk',
    qualification: {
      en: 'Applied Computing & Artificial Intelligence',
      es: 'Computación Aplicada e Inteligencia Artificial',
    },
    institution: 'MSMK University',
    period: '2023 — 2025',
    note: {
      en: 'Foundation in software development, data structures and applied artificial intelligence — the groundwork the BSc built on.',
      es: 'Base en desarrollo de software, estructuras de datos e inteligencia artificial aplicada — los cimientos sobre los que se apoyó el grado.',
    },
  },
];
