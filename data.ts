import { Project, ProjectCategory, Event } from './types';

export const projects: Project[] = [
  {
    id: "future-of-designing",
    title: "The Future of Designing and Making",
    subtitle: "Integrating Artificial Intelligence into Community Makerspaces",
    year: "2025",
    category: ProjectCategory.AI_RESEARCH,
    image: "https://i.imgur.com/I31vUcU.jpeg",
    featured: true,
    externalLink: "https://drive.google.com/file/d/1juStyQWYThfrOvORRxUESVQVDwKa3SpP/view?usp=sharing",
    images: [
      "https://i.imgur.com/QFUcYG2.jpeg",
      "https://i.imgur.com/2LCoTVn.jpeg",
      "https://i.imgur.com/dZc5L9a.jpeg",
      "https://i.imgur.com/bN4pquD.jpeg",
      "https://i.imgur.com/VTvUxn2.jpeg",
    ],
    outcomeImages: [
        "https://i.imgur.com/sLqA4ga.jpeg",
        "https://i.imgur.com/T64JTDA.jpeg",
        "https://i.imgur.com/VvZ8iOl.jpeg",
        "https://i.imgur.com/lGoEceV.jpeg",
        "https://i.imgur.com/uVEHEDO.jpeg",
        "https://i.imgur.com/amK3quc.jpeg",
        "https://i.imgur.com/EA2yKhp.jpeg",
        "https://i.imgur.com/6lcJSA0.jpeg",
        "https://i.imgur.com/5uZ6lPT.jpeg",
    ],
    overview: "This project explores how artificial intelligence can become a useful and ethical tool within community makerspaces. It asks whether AI, usually developed for big industries, could instead support local creativity and learning. The research was carried out with Fablab Barcelona, Ateneu de Gràcia, and Fab Casa del Mig, combining design research, digital fabrication, and social participation.",
    industry: ["Design Research", "Digital Fabrication", "Artificial Intelligence"],
    service: ["Research", "Prototyping", "Community Engagement"],
    learnings: "Learned to design workshops, use AI for image/3D generation, build AI chatbots, and run fabrication tests with CNC and 3D printing.",
    needs: "The starting point came from a growing gap between what AI tools can generate and what makers can actually fabricate. The need was to explore how AI could become part of local making, lowering barriers while maintaining ethical, educational, and collaborative values, from generating ideas to physically fabricating prototypes without replacing human creativity.",
    concept: "The concept centered on the idea of AI as a Design Diffuser, a tool that spreads design capability across communities rather than concentrating it in corporations. The project mapped the existing ecosystem of generative AI tools and identified where they break down when moved from screen to machine. This led to three key interventions: Accessible Tool Testing, Workshops for AI Literacy, and a Community Manifesto.",
    process: [
      "Tool Mapping: An exploration of existing AI tools categorized by design stage and fabrication method.",
      "Prototyping: Experiments with text-to-3D modeling, laser-cutting prompts, and AI-assisted design of small functional objects.",
      "Workshops: Conducted at Ateneu de Gràcia and Fab Casa del Mig, involving local makers to explore AI through collective making.",
      "Roundtable and Manifesto: Insights were synthesized into a manifesto outlining principles for ethical, accessible, and community-driven AI design practices."
    ],
    outcome: "The thesis concluded with an exhibition and round table event at Les Tres Xemeneies, showing the prototypes, tool mappings, workshop documentation, and the AI-Making Manifesto. Visitors could explore examples of AI-generated objects that had been physically produced using makerspace tools.",
    reflection: "The project proposes that AI's potential in design is not about speed or automation, but about access and understanding. It can bridge technical gaps, support education, and strengthen community knowledge, as long as it remains transparent, inclusive, and open to critique.",
    collaborators: "Fablab Barcelona; Ateneu de Gràcia, FabCasa del Mig, Pietro Rusti and Chris Ernst"
  },
  {
    id: "miralls-del-dema",
    title: "LLUM 2025: Miralls del Demà",
    subtitle: "Interactive Installation for Llum Barcelona 2025",
    year: "2025",
    category: ProjectCategory.INSTALLATIONS,
    image: "https://i.imgur.com/PNJcoQi.jpeg",
    featured: true,
    externalLink: "https://iaac.net/iaac-presented-miralls-del-dema-at-llum-barcelona-2025/",
    contextImage: "https://i.imgur.com/p7qGtpC.png",
    images: [
      "https://i.imgur.com/lzMSaWO.jpeg",
      "https://i.imgur.com/Z68CETb.png",
      "https://i.imgur.com/TfHTXKn.png",
      "https://i.imgur.com/viyJdGR.png"
    ],
    processImages: [
      'https://i.imgur.com/PFv1BbP.png',
      'https://i.imgur.com/H39WcUk.png',
      'https://i.imgur.com/nqKWQOn.jpeg',
      'https://i.imgur.com/mnyKY2b.png',
      'https://i.imgur.com/K5LoV51.png'
    ],
    outcomeImages: [
      "https://i.imgur.com/p0WY4nw.jpeg",
      "https://i.imgur.com/B9NbxvT.jpeg",
      "https://i.imgur.com/u51NNBX.jpeg",
      "https://i.imgur.com/Wrj4lFR.jpeg",
    ],
    overview: "Miralls del Demà (Mirrors of Tomorrow) was an immersive installation for the Llum BCN Festival 2025. Participants spoke into microphones, and their voices were processed in real time by an AI system that transformed them into evolving light projections, creating a dialogue between human expression and machine interpretation about climate change.",
    industry: ["Public Art", "Interactive Design", "Artificial Intelligence"],
    service: ["System Design", "AI Development", "Electronics", "Interaction Design"],
    learnings: "Learned to co-develop large-scale installations, integrate AI into interactive systems, design electronics for public space, and collaborate with multidisciplinary teams.",
    needs: "The main question was how to visualize collective emotion on a public scale, how to turn something invisible like concern, empathy, or fear about climate change into a shared sensory experience. The challenge was merging sound capture, NLP, visual generation, and large-scale projection into a single responsive system.",
    concept: "The concept of Mirrors of Tomorrow came from the idea that our future is shaped by what we say and do today. Each person's voice became a “mirror” contributing to a collective image of tomorrow. The design combined three key systems: Input Layer (microphones), Processing Layer (AI sentiment analysis), and Output Layer (generative light animations on a curved LED screen).",
    process: [
        "Research and Ideation: Defining how to connect language and emotion through visual output.",
        "Technical Design: The AI system used voice detection and a sentiment model. Outputs were mapped to brightness, color, and motion speed.",
        "Electronics Production: Multiple Arduino Nano boards handled microphone inputs and sensor readings.",
        "Fabrication and Assembly: All components were custom-built to withstand outdoor conditions.",
        "Testing and Calibration: The final system was tested on-site to synchronize light, sound, and AI interpretation."
    ],
    outcome: "At night, the site transformed into an open stage where the city could “speak to itself.” Calm tones produced gentle, slow waves, while urgent messages generated fast, fractured movements. The installation stood as a metaphor for collective consciousness, a space where technology acted as a medium for empathy and connection.",
    reflection: "Miralls del Demà proved how public art and AI can merge into a participatory system that reflects human emotion. The project reinforced the idea that AI can extend artistic expression beyond data visualization, becoming a tool for listening, translating, and building new forms of shared understanding.",
    collaborators: "MD Servicios Audiovisuales"
  },
  {
    id: "unseen-exposures",
    title: "Unseen Exposures",
    subtitle: "{Un}Data Me: Interactive Machines on Data, Privacy, and Surveillance",
    year: "2024",
    category: ProjectCategory.INSTALLATIONS,
    image: "https://i.imgur.com/95YxXlK.jpeg",
    featured: true,
    externalLink: "https://carmenrobres.github.io/portfolio/thesisY1/02-Project/",
    reflectionImage: "https://i.imgur.com/95YxXlK.jpeg",
    contextImage: "https://i.imgur.com/xTtSSjd.png",
    images: [
      'https://i.imgur.com/vFXzt7d.png',
      'https://i.imgur.com/mwlj5eI.png',
      'https://i.imgur.com/fmlFwSv.png',
      'https://i.imgur.com/lTap3MT.png',
    ],
    processImages: [
      'https://i.imgur.com/B2AAaEW.png',
      'https://i.imgur.com/LUb3O0N.png',
    ],
    outcomeImages: [
      'https://i.imgur.com/UVMq0oE.png',
      'https://i.imgur.com/vryY172.png',
      'https://i.imgur.com/lMsL6Jy.png',
      'https://i.imgur.com/ltOWcUp.png',
      'https://i.imgur.com/CEm7ovS.png',
      'https://i.imgur.com/aNelOvK.png',
    ],
    overview: "Unseen Exposures, presented as {Un}Data Me, is an interactive installation that explores the mechanisms of data surveillance through three connected machines: AdProfiler, Read the Room, and Aggressive Machine. The project questions how personal information is collected, interpreted, and monetized within systems of surveillance capitalism, the practice of turning human behavior into data for prediction and profit. Each installation reveals a different stage of that process, from data collection to behavioral profiling and emotional analysis. Developed at MDEF & Fab Lab Barcelona in 2025, the project invites participants to experience what it feels like to be observed and analyzed by the same types of algorithms that influence online advertising, recommendation systems, and security monitoring.",
    industry: ["Critical Design", "Data Ethics", "Interactive Art"],
    service: ["Concept Design", "Prototyping", "AI Systems", "Exhibition Design"],
    learnings: "Learned to design interactive machines, build prototypes with sensors and AI models, create meaningful user experiences, and critically reflect on ethics and bias in technology.",
    needs: `The project began with a need to expose the opaque nature of digital surveillance. Many people are aware that their data is collected, but few understand how it is used or what biases shape its interpretation.
The aim was to design a set of physical interactions that make these invisible systems visible. Instead of displaying static data, the installation puts visitors directly into the feedback loop, turning them from passive users into active subjects of observation.`,
    concept: `The installation is structured around three distinct but connected machines, each addressing a key aspect of data analysis and its ethical implications:
AdProfiler
Visitors answer a short personality test while a hidden camera captures their image. Within minutes, the system infers personal traits (age, gender, dominant emotion, and more) using AI models trained on open datasets. It then generates a personalized advertisement based on these assumptions.
The result is both amusing and unsettling, exposing how quickly and confidently advertising algorithms build psychological profiles.
Read the Room
This machine aggregates live data from all participants to create a collective “profile” of the room. A screen displays metrics like average mood, gender ratio, and extroversion level, visualizing how group identity can be quantified through data.
It reflects how platforms and organizations simplify complex human emotions into measurable categories, often reinforcing bias in the process.
Aggressive Machine
A camera-based system that analyzes body language and proximity to detect “aggressive behavior.” When someone moves too close or makes a strong gesture, the machine reacts with sound and light alerts.
The piece highlights the danger of misinterpretation in AI surveillance, where context is lost, and normal human expression can be mistaken for threat.`,
    process: [
      "The project was developed as part of a design research module on ethics and AI at Fab Lab Barcelona.",
      "Prototyping: Each device was built with accessible components, Arduino, Raspberry Pi, cameras, and sensors, combined with lightweight machine-learning models.",
      "Testing: The systems were calibrated to read gestures, facial expressions, and survey inputs, producing real-time feedback.",
      "Exhibition Design: The machines were placed in an interactive loop, where visitors moved from one to the next, becoming both subjects and observers.",
      "Ethical Dialogue: Alongside the physical setup, visitors responded to four statements about privacy and surveillance, including the common phrase “If you have nothing to hide, you have nothing to fear.” Most disagreed, revealing that people value privacy even when they believe they are unimportant to watch."
    ],
    outcome: `Unseen Exposures was exhibited on June 26, 2025, as part of the MDEF showcase at Fab Lab Barcelona.
The installation succeeded in sparking reflection and debate. Participants left with a stronger awareness of how easily their behavior could be quantified and misunderstood. Many expressed surprise at how accurate, or inaccurate, the machines’ judgments felt.
By blending humor and discomfort, the exhibit transformed abstract concepts about AI and surveillance into embodied experiences. It illustrated how algorithms act as mirrors that distort as much as they reflect, shaping both self-perception and public behavior.`,
    reflection: `This project taught me that critical design can make invisible systems visible. It also reinforced that technology critique works best when it’s experiential, when people can feel surveillance acting on them rather than only reading about it.
Through Unseen Exposures, I explored how art, data, and AI can meet in a space that educates without preaching, and how interaction can become a form of questioning.`,
    collaborators: "La Cristaleria (loaning the space)"
  },
  {
    id: "tania-pilot",
    title: "TÀNIA Pilot",
    subtitle: "An AI Voice for the Neighborhood",
    year: "2024",
    category: ProjectCategory.AI_RESEARCH,
    image: "https://i.imgur.com/yW5JzXx.jpeg",
    featured: true,
    externalLink: "https://www.projectetania.cat/",
    contextImage: "https://i.imgur.com/52bSWI1.png",
    images: [
      "https://i.imgur.com/smoMigo.png",
      "https://i.imgur.com/Rb6SFKW.png",
    ],
    outcomeImages: [
      "https://i.imgur.com/j271QWV.png",
      "https://i.imgur.com/3T4QBLA.png",
      "https://i.imgur.com/McxdwE1.png",
    ],
    overview: "TÀNIA is a social and technological pilot project developed to address noise pollution and coexistence in public spaces. It began in Plaça de la Virreina, Barcelona, blending citizen science, environmental data, and AI into a single platform that transforms local concerns into communication, care, and awareness.",
    industry: ["Urban Design", "Social Innovation", "Artificial Intelligence"],
    service: ["Research", "Interaction Design", "Prototyping", "Community Engagement"],
    learnings: "Learned to co-design with communities, create ethical conversational AI, balance technical prototyping with cultural needs, and design workshops that turn public concerns into a shared voice.",
    needs: "Barcelona's public squares often see clashes between nightlife, tourism, and residents. The city needed a way to mediate between sound and emotion. The challenge was to use technology as a social bridge to help residents, policymakers, and businesses hear each other, translating data into constructive dialogue.",
    concept: "The system was built on four pillars: 1. Citizen Science: Residents collected noise data via sensors. 2. Participatory Research: Workshops captured personal stories about the problem. 3. AI Persona – RUT: An AI chatbot, the 'voice of the square,' was created from the data. 4. Public Communication: Screens displayed RUT's evolving messages, visualizing how the plaza 'felt'.",
    process: [
        "Diagnosis & Citizen Mapping: Collaborated with local residents to understand the emotional and physical effects of nighttime noise.",
        "Sensor Deployment: IoT sound sensors (Smart Citizen Kits) were installed to record acoustic data.",
        "Workshops & Co-Design: Residents, data scientists, and designers worked together to analyze results.",
        "AI Development: RUT was trained to communicate in a tone that reflected empathy and local character.",
        "Prototyping & Testing: RUT's messages appeared on digital displays, reacting to live data and community interaction."
    ],
    outcome: "The installation turned the Plaça de la Virreina into a conversational space. Passersby could read RUT's comments, grounded in real-time noise levels. The project demonstrated that AI can act as a mediator for coexistence, combining environmental data with human stories.\n\n[RESULTS REPORT](https://drive.google.com/file/d/1kKQ4rIaSiWVIH_1roi2wmVAymaVqXiw6/v)",
    reflection: "TÀNIA taught me that AI doesn't need to be distant or abstract, it can live in a public square, represent collective emotion, and make urban challenges more human. It became proof that digital tools can build empathy when designed to listen first."
  },
  {
    id: "compostable-altar",
    title: "Compostable Altar",
    subtitle: "Biomaterials, Ritual, and Soil Regeneration",
    year: "2025",
    category: ProjectCategory.AI_RESEARCH,
    image: "https://i.imgur.com/e3AuUgQ.jpeg",
    externalLink: "https://github.com/Pavon-Bet/Compostable-Altar-offering-to-the-earth",
    contextImage: "https://i.imgur.com/Km1Lf2q.jpeg",
    images: [
      "https://i.imgur.com/Z6hXuXz.jpeg",
      "https://i.imgur.com/nf37TNB.jpeg",
    ],
    processImages: [
      "https://i.imgur.com/HkYQ42J.jpeg",
      "https://i.imgur.com/HtFVQin.jpeg",
      "https://i.imgur.com/9DVeyeR.jpeg",
    ],
    outcomeImages: [
      "https://i.imgur.com/e3AuUgQ.jpeg",
      "https://i.imgur.com/3jaWGqo.jpeg",
      "https://i.imgur.com/Td4P95e.jpeg",
    ],
    overview: "Compostable Altar is a research project that investigates how biomaterials from organic waste can nourish soil. It combines artistic expression, environmental science, and digital fabrication to explore the relationship between matter, decay, and regeneration. The altar acts as both a sculpture and a living experiment.",
    industry: ["Bio Design", "Art & Ecology", "Digital Fabrication"],
    service: ["Material Research", "Electronics & Data Systems", "Prototyping"],
    learnings: "Learned to integrate environmental sensors, manage soil data collection, work with predictive modeling, and connect electronics prototyping with ecological and agricultural contexts.",
    needs: "Today's design world often focuses on permanence and control. This project challenged those ideas by asking: what if the value of design lay in its disappearance? The need was to explore a circular material practice where waste transforms into life, and technology helps us understand ecological processes.",
    concept: "The concept took inspiration from ancestral rituals of making offerings to the earth. The altar was designed as a hybrid of manual craft and algorithmic form-making. Organic waste was reprocessed into 3D-printable biomaterial mixtures. Embedded sensors measured temperature, humidity, and pH, feeding a predictive AI model to analyze how different biomaterials affected soil fertility.",
    process: [
        "Material Experimentation: Tests were run using citrus pulp, coffee grounds, sawdust, and algae for 3D printability.",
        "Digital Fabrication: The altar geometry was created through digital scanning and parametric modeling.",
        "Sensor Integration: A network of low-cost sensors collected real-time data from the soil.",
        "AI Modeling: Data was fed into a predictive model to correlate material composition with nutrient release.",
        "Collaboration & Exhibition: The project was developed with institutions like the Basque BioDesign Center."
    ],
    outcome: "The Compostable Altar was presented as both a research artifact and a living system. Visitors could observe the altar's slow transformation, supported by digital displays showing live environmental data. The installation served as a prototype for sustainable fabrication, suggesting how future materials could serve ecological functions beyond their form or lifespan.\n\n[See data results](https://carmenrobresdev.grafana.net/public-dashboards/2f0d_b1b6d794fd3bea7a44c23bf50f4)",
    reflection: "Working on Compostable Altar revealed that technology can become part of nature's rhythm when used to observe rather than dominate. It showed that collaboration across art, biology, and computation can build a more sensitive design culture, one that values cycles, change, and the quiet intelligence of decay.",
    reflectionVideo: "https://www.youtube.com/embed/hX_ZQRprAUM?start=1",
    collaborators: "Betiana Pavón, Head of Compostable ALtar's Project"
  },
  {
    id: "incapto-coffee",
    title: "Incapto Coffee",
    subtitle: "Design, Production, and Brand Integration in a Growing Startup",
    year: "2022-2023",
    category: ProjectCategory.PRODUCT_DESIGN,
    image: "https://i.imgur.com/XiPjkwQ.jpeg",
    externalLink: "https://incapto.com/",
    contextImage: "https://i.imgur.com/XRpZwgF.jpeg",
    images: [
      "https://i.imgur.com/AbS7mF2.jpeg",
      "https://i.imgur.com/zv69Esh.jpeg",
      "https://i.imgur.com/iEjkPHv.jpeg",
      "https://i.imgur.com/f1Bsdri.jpeg",
      "https://i.imgur.com/PfIXVFV.jpeg",
    ],
    processImages: [],
    outcomeImages: [
      "https://i.imgur.com/3n3lfpj.jpeg",
      "https://i.imgur.com/E5rBDuF.jpeg",
      "https://i.imgur.com/q5ZpNZq.jpeg",
      "https://i.imgur.com/lIRwOuI.jpeg",
      "https://i.imgur.com/n4IRMHK.jpeg",
      "https://i.imgur.com/sq8OGV9.jpeg",
      "https://i.imgur.com/Na71pIL.jpeg",
      "https://i.imgur.com/jy8ZZHk.jpeg",
      "https://i.imgur.com/uTOACEO.jpeg",
    ],
    reflectionImage: "https://i.imgur.com/XiPjkwQ.jpeg",
    overview: "At Incapto Coffee, a Barcelona-based startup offering sustainable coffee solutions, I worked as a designer across product, packaging, and communication. The role involved developing the full range of packaging, producing brand collateral, and supporting the design of the next generation of the company's coffee machine.",
    industry: ["Product Design", "Branding", "Packaging"],
    service: ["Graphic Design", "Production Management", "Product Development"],
    learnings: "Learned to design within a fast-paced e-commerce startup environment, manage full production from digital to physical assets, collaborate across marketing and manufacturing, and adapt brand identity consistently across products, packaging, and online platforms.",
    needs: "Incapto was scaling quickly and needed a consistent, flexible visual system that could adapt across packaging, retail, and digital platforms. There was also a need to connect physical and digital touchpoints, ensuring that what customers saw on the shelf matched their online experience.",
    concept: "The packaging system was based on clarity, modularity, and sustainability. Each product line shared a unified visual language, clean geometry, bold typography, and clear color coding. I worked closely with marketing to select recyclable and low-impact substrates. For digital assets, I developed consistent templates for newsletters, social media, and promotional materials.",
    process: [
        "Graphic & Packaging Design: Designed all packaging lines, including coffee bags, boxes, and shipping materials.",
        "Supplier Coordination: Communicated directly with printing and packaging partners to adjust materials, finishes, and tolerances.",
        "Brand & Communication Assets: Created flyers, t-shirts, and event materials.",
        "Product Development Collaboration: Supported the industrial design team on the new Incapto coffee machine.",
        "Feedback Loop: Worked between marketing, production, and logistics to align design decisions with operational needs."
    ],
    outcome: "By the end of my time at Incapto, the company had a fully coherent design language across all media. The new packaging improved customer recognition, reduced printing costs, and aligned with sustainability goals. The project demonstrated how integrated design work, from packaging to product, strengthens both brand identity and user experience.\n\n[FULL INCAPTO PORTFOLIO](https://www.behance.net/gallery/164645449/Design-Portfolio-Incapto-Coffee)",
    reflection: "Working at Incapto showed me how design operates within real business constraints. Every aesthetic choice affected production time, sustainability, and customer trust. This experience grounded my later work in research and speculative design, reminding me that every experiment must eventually meet real users, materials, and systems.",
    collaborators: "Clara Jerez De Echave, Incapto Coffee Head of Design"
  }
];
// Fix: Add events array and export it to fix missing export error in EventsPage.tsx.
export const events: Event[] = [
  {
    id: 'llum-bcn-2025',
    name: 'Miralls del Demà',
    startDate: '2025-02-07T00:00:00Z',
    endDate: '2025-02-09T00:00:00Z',
    location: 'Poblenou, Barcelona',
    country: 'Spain',
    type: 'Exhibition',
    link: 'https://iaac.net/iaac-presented-miralls-del-dema-at-llum-barcelona-2025/',
    image: 'https://i.imgur.com/PNJcoQi.jpeg'
  },
  {
    id: 'mdef-showcase-2025',
    name: '{Un}Data Me Showcase',
    startDate: '2025-06-26T00:00:00Z',
    endDate: '2025-06-26T00:00:00Z',
    location: 'Fab Lab Barcelona',
    country: 'Spain',
    type: 'Exhibition',
    link: 'https://carmenrobres.github.io/portfolio/thesisY1/02-Project/',
    image: 'https://i.imgur.com/95YxXlK.jpeg'
  },
  {
    id: 'thesis-exhibition-2025',
    name: 'The Future of Designing and Making Exhibition',
    startDate: '2025-09-15T00:00:00Z',
    endDate: '2025-09-30T00:00:00Z',
    location: 'Fab Lab Barcelona',
    country: 'Spain',
    type: 'Exhibition',
    link: "https://drive.google.com/file/d/1juStyQWYThfrOvORRxUESVQVDwKa3SpP/view?usp=sharing",
    image: 'https://i.imgur.com/I31vUcU.jpeg'
  }
];