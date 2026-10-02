import type { Project, ProjectCategory } from '@/types';

/**
 * ─────────────────────────────────────────────────────────────
 *  PROJECTS
 *  Add, remove or reorder entries here — the grid, the filter
 *  counts, the terminal and the architecture modal all follow.
 *
 *  Visible text is { en, es }. `tech` stays as plain strings:
 *  technology names are the same in both languages.
 *
 *  `tech` is deliberately conservative: list only what was
 *  actually used. Nothing here is inferred.
 * ─────────────────────────────────────────────────────────────
 */
export const projects: Project[] = [
  {
    id: 'risesense',
    title: {
      en: 'RiseSense Automation Platform',
      es: 'Plataforma de automatización RiseSense',
    },
    category: {
      en: 'AI / Automation / Backend',
      es: 'IA / Automatización / Backend',
    },
    tags: ['AI', 'Automation', 'Backend'],
    description: {
      en: 'Business automation built on chatbots, backend integrations, REST APIs, appointment management, databases and automated workflows.',
      es: 'Automatización para negocios a partir de chatbots, integraciones de backend, APIs REST, gestión de citas, bases de datos y flujos de trabajo automatizados.',
    },
    problem: {
      en: 'Small businesses lose hours every week to enquiries, bookings and follow-ups handled by hand, across tools that do not talk to each other.',
      es: 'Los negocios pequeños pierden horas cada semana atendiendo consultas, reservas y seguimientos a mano, entre herramientas que no se hablan entre sí.',
    },
    contribution: {
      en: 'Backend and integration work: data model, REST endpoints, the automation workflows between them, and the chatbot and appointment flows on top.',
      es: 'Backend e integraciones: modelo de datos, endpoints REST, los flujos de automatización entre ellos, y encima el chatbot y la gestión de citas.',
    },
    tech: ['Python', 'REST APIs', 'PostgreSQL', 'MySQL', 'n8n'],
    tone: 'accent',
    links: {
      // demo: 'https://example.com',   // uncomment and set when you have one
    },
    architecture: {
      intro: {
        en: 'A request arrives from a customer — on WhatsApp or the web. Everything below happens before they get an answer.',
        es: 'Llega una petición de un cliente, por WhatsApp o por la web. Todo lo de abajo ocurre antes de que reciba respuesta.',
      },
      nodes: [
        {
          name: { en: 'Frontend', es: 'Frontend' },
          summary: {
            en: 'Client dashboard, booking UI and the messaging entry point.',
            es: 'Panel del cliente, interfaz de reservas y punto de entrada de mensajería.',
          },
          detail: { en: 'Web client', es: 'Cliente web' },
          tone: 'accent',
        },
        {
          name: { en: 'REST API', es: 'API REST' },
          summary: {
            en: 'Endpoints, authentication and request validation.',
            es: 'Endpoints, autenticación y validación de peticiones.',
          },
          detail: { en: 'REST', es: 'REST' },
          emphasis: true,
          tone: 'accent',
        },
        {
          name: { en: 'Backend Logic', es: 'Lógica de negocio' },
          summary: {
            en: 'Business rules: availability, bookings, notifications.',
            es: 'Reglas de negocio: disponibilidad, reservas, notificaciones.',
          },
          detail: { en: 'Python', es: 'Python' },
          tone: 'warm',
        },
        {
          name: { en: 'Database', es: 'Base de datos' },
          summary: {
            en: 'Schema design, migrations and the records everything reads from.',
            es: 'Diseño del esquema, migraciones y los registros que lee todo lo demás.',
          },
          detail: { en: 'PostgreSQL · MySQL', es: 'PostgreSQL · MySQL' },
          tone: 'signal',
        },
        {
          name: { en: 'Automation Layer', es: 'Capa de automatización' },
          summary: {
            en: 'Scheduled jobs and event-driven workflows, with retries.',
            es: 'Tareas programadas y flujos por eventos, con reintentos.',
          },
          detail: { en: 'n8n', es: 'n8n' },
          tone: 'violet',
        },
        {
          name: { en: 'External Services', es: 'Servicios externos' },
          summary: {
            en: 'Messaging, calendars and other third-party APIs.',
            es: 'Mensajería, calendarios y otras APIs de terceros.',
          },
          detail: { en: 'Webhooks in & out', es: 'Webhooks de entrada y salida' },
          external: true,
          tone: 'accent',
        },
      ],
      contribution: {
        en: 'Schema design, the API layer, the automation workflows and the integration boundaries between them.',
        es: 'Diseño del esquema, la capa de API, los flujos de automatización y los límites de integración entre ellos.',
      },
    },
  },
  {
    id: 'breast-cancer-ml',
    title: {
      en: 'Breast Cancer Detection using Machine Learning',
      es: 'Detección de cáncer de mama con machine learning',
    },
    category: { en: 'AI / Machine Learning', es: 'IA / Machine Learning' },
    tags: ['AI'],
    description: {
      en: 'Detection of breast cancer from diagnostic data using data-driven classification techniques.',
      es: 'Detección de cáncer de mama a partir de datos diagnósticos mediante técnicas de clasificación basadas en datos.',
    },
    problem: {
      en: 'Diagnostic datasets are wide and imbalanced, so a model that looks accurate overall can still miss the cases that matter most.',
      es: 'Los conjuntos de datos diagnósticos son amplios y están desbalanceados, así que un modelo que parece preciso en conjunto puede fallar justo en los casos que más importan.',
    },
    contribution: {
      en: 'Data preparation, training and evaluation of the classification models, and comparison of how they performed.',
      es: 'Preparación de los datos, entrenamiento y evaluación de los modelos de clasificación, y comparación de su rendimiento.',
    },
    tech: ['Python', 'Machine Learning'],
    tone: 'violet',
  },
  {
    id: 'molecular-energy-ml',
    title: {
      en: 'Ground State Energy Prediction for Molecules',
      es: 'Predicción de la energía del estado fundamental de moléculas',
    },
    category: { en: 'AI / Machine Learning', es: 'IA / Machine Learning' },
    tags: ['AI'],
    description: {
      en: 'Machine learning models that predict the ground state energy of molecules from their structural data.',
      es: 'Modelos de machine learning que predicen la energía del estado fundamental de moléculas a partir de sus datos estructurales.',
    },
    problem: {
      en: 'Computing a molecule’s ground state energy with conventional quantum chemistry methods is accurate but expensive, which makes screening large numbers of molecules impractical.',
      es: 'Calcular la energía del estado fundamental de una molécula con métodos convencionales de química cuántica es preciso pero costoso, lo que hace inviable analizar grandes cantidades de moléculas.',
    },
    contribution: {
      en: 'Prepared the molecular data, trained and evaluated the regression models, and compared how closely they reproduced the reference energies.',
      es: 'Preparación de los datos moleculares, entrenamiento y evaluación de los modelos de regresión, y comparación de lo cerca que quedaban de las energías de referencia.',
    },
    tech: ['C++', 'Machine Learning'],
    tone: 'violet',
  },
  {
    id: 'tsp-dijkstra',
    title: {
      en: 'Travelling Salesman Problem + Dijkstra',
      es: 'Problema del viajante + Dijkstra',
    },
    category: {
      en: 'Algorithms / Software Engineering',
      es: 'Algoritmos / Ingeniería de software',
    },
    tags: ['Algorithms'],
    description: {
      en: 'Route optimisation and shortest-path calculation over graphs.',
      es: 'Optimización de rutas y cálculo del camino más corto sobre grafos.',
    },
    problem: {
      en: 'Finding the best route through a set of points is expensive to solve exactly, so the interesting part is where exact and heuristic approaches stop agreeing.',
      es: 'Encontrar la mejor ruta entre un conjunto de puntos es caro de resolver de forma exacta, así que lo interesante es dónde dejan de coincidir el enfoque exacto y el heurístico.',
    },
    contribution: {
      en: 'Implementation of the routing and shortest-path algorithms and the data structures underneath them.',
      es: 'Implementación de los algoritmos de rutas y camino más corto, y de las estructuras de datos que hay debajo.',
    },
    tech: ['Algorithms', 'Graphs', 'Data Structures'],
    tone: 'warm',
  },
  {
    id: 'secure-ecommerce',
    title: {
      en: 'Secure E-Commerce Website',
      es: 'Web de e-commerce segura',
    },
    category: { en: 'Full-Stack / Security', es: 'Full-Stack / Seguridad' },
    tags: ['Full-Stack', 'Security'],
    description: {
      en: 'An e-commerce site built with common web vulnerabilities and secure development practices in mind.',
      es: 'Una tienda online desarrollada teniendo en cuenta las vulnerabilidades web más comunes y las prácticas de desarrollo seguro.',
    },
    problem: {
      en: 'A storefront handles accounts, prices and orders, which makes it exactly the kind of application where a small oversight becomes a real vulnerability.',
      es: 'Una tienda maneja cuentas, precios y pedidos, que es justo el tipo de aplicación donde un descuido pequeño se convierte en una vulnerabilidad real.',
    },
    contribution: {
      en: 'Built the application end to end, with the handling of input, sessions and stored data treated as security decisions rather than afterthoughts.',
      es: 'Desarrollo de la aplicación de principio a fin, tratando el manejo de entradas, sesiones y datos almacenados como decisiones de seguridad y no como un añadido final.',
    },
    tech: ['HTML', 'CSS', 'SQL', 'MySQL', 'Cybersecurity'],
    tone: 'signal',
  },
  {
    id: 'hospital-management',
    title: {
      en: 'Hospital Management Program',
      es: 'Programa de gestión hospitalaria',
    },
    category: {
      en: 'C++ / Software Engineering',
      es: 'C++ / Ingeniería de software',
    },
    tags: ['Algorithms', 'Backend'],
    description: {
      en: 'Management of hospital-related data and operations, written in C++.',
      es: 'Gestión de datos y operaciones hospitalarias, escrito en C++.',
    },
    problem: {
      en: 'Records, staff and scheduling all reference each other, so the structure holding them decides how hard everything else becomes.',
      es: 'Historiales, personal y planificación se referencian entre sí, así que la estructura que los sostiene decide lo difícil que resulta todo lo demás.',
    },
    contribution: {
      en: 'Designed the data structures and implemented the operations over them in C++.',
      es: 'Diseño de las estructuras de datos e implementación de las operaciones sobre ellas en C++.',
    },
    tech: ['C++', 'Data Structures'],
    tone: 'accent',
  },
];

/** Filter buttons, in display order. 'All' is prepended by the UI. */
export const projectCategories: ProjectCategory[] = [
  'Backend',
  'Full-Stack',
  'AI',
  'Automation',
  'Algorithms',
  'Security',
];
