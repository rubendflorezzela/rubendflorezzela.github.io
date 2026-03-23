const translations = {
  "en": {
    // Navigation
    "nav_about": "About",
    "nav_vision": "Vision",
    "nav_research": "Research",
    "nav_demos": "Demos",
    "nav_pubs": "Publications",
    "nav_ach": "Achievements",
    "nav_contact": "Contact",
    "cv_download": "Download CV",

    // Hero
    "hero_tag": "Human-Centered AI for Intelligent Transportation",
    "hero_subtitle": "Multimodal Driver-State Modeling for Automated Driving and Transportation Safety · LIECAR Lab, UNSAAC · Cusco, Peru",
    "metric_citations": "Citations",
    "metric_pubs": "Publications",
    "metric_reviews": "Peer Reviews",
    "btn_view_pubs": "View Publications",

    // About
    "about_label": "About",
    "about_title": "Building interpretable multimodal AI systems for driver-state monitoring in intelligent transportation",
    "about_p1": "I develop multimodal AI systems for real-time driver-state monitoring in intelligent transportation environments. My work combines computer vision, eye-tracking, behavioral analysis, and deep learning to model drowsiness, distraction, and cognitive workload under real-world conditions.",
    "about_p2": "My research is grounded in human factors engineering and focuses on building interpretable, deployable systems that can support safer automated driving, driver assistance, and transportation safety evaluation through robust on-vehicle inference.",
    "about_p3": "I am a researcher at the LIECAR Laboratory and lecturer at the Universidad Nacional de San Antonio Abad del Cusco (UNSAAC), Peru, recognized as a <strong>RENACYT Level V researcher</strong> by CONCYTEC. I serve as a peer reviewer for international scientific publications including <strong>Scientific Reports (Nature Portfolio)</strong> and <strong>ACM Transactions on Intelligent Systems and Technology</strong>.",

    // Badges
    "badge1": "Driver State Estimation",
    "badge2": "Multimodal AI",
    "badge3": "Automated Driving",
    "badge4": "Embedded Deep Learning",
    "badge5": "Human Factors Engineering",
    "badge6": "Intelligent Transportation Systems",
    "badge7": "Driver Monitoring & Gaze Modeling",
    "badge8": "Transportation Safety",

    // Vision
    "vision_label": "Vision",
    "vision_title": "Research Vision",
    "vision_text": "My long-term goal is to develop interpretable multimodal systems that understand driver vulnerability in real-world transportation environments, bridging driver-state sensing, deployable AI, and human factors engineering. I aim to establish a research line where edge computing, explainability, and human-centered system design converge to build monitoring systems that are not only accurate, but trustworthy enough to inform automated driving, transportation safety, and system design guidelines.",
    "pillar1": "Driver-state sensing",
    "pillar2": "Edge AI deployment",
    "pillar3": "Explainable models",
    "pillar4": "Transportation safety",

    // Research Interests
    "interests_label": "Focus Areas",
    "interests_title": "Research Interests",
    "int1_title": "Driver State Modeling for Automated Driving",
    "int1_desc": "Real-time modeling of drowsiness, distraction, cognitive workload, and driver readiness in intelligent and automated driving contexts.",
    "int2_title": "Human Factors AI for Transportation Safety",
    "int2_desc": "Investigating how multimodal sensing and AI can support human-centered system design, safety evaluation, and adaptive assistance in transportation environments.",
    "int3_title": "Multimodal Perception and Fusion",
    "int3_desc": "Combining gaze behavior, facial dynamics, head pose, and visual cues for robust driver-state estimation beyond single-modality systems.",
    "int4_title": "Embedded AI for Real-Time Monitoring",
    "int4_desc": "Deploying deep learning models on edge platforms such as NVIDIA Jetson Nano for low-latency, on-vehicle inference under real-world operating conditions.",
    "int5_title": "Interpretable AI for Safety-Critical Systems",
    "int5_desc": "Designing AI systems that are transparent, auditable, and trustworthy enough to support deployment in transportation and other high-stakes domains.",

    // Current Research
    "research_label": "Active Project",
    "research_title": "Current Research",
    "research_status": "Active · Targeting Q1 2026",
    "research_h3": "Multimodal Driver-State Monitoring for Automated Driving and Transportation Safety",
    "research_p1": "This project develops a real-time driver-state monitoring system for intelligent transportation and automated driving scenarios. It integrates eye-tracking dynamics from RGB and NIR cameras, gaze analysis, and facial landmark modeling to detect drowsiness, distraction, and cognitive load under real-world conditions.",
    "research_p2": "The system is designed for deployable, on-vehicle inference using NVIDIA Jetson Nano, with emphasis on robustness, interpretability, and low-latency monitoring for transportation safety and human factors evaluation.",

    // Demos
    "demos_label": "Live Demos",
    "demos_title": "Research in Action",
    "demo1_gif1_title": "NITYMED Dataset Evaluation",
    "demo1_gif1_desc": "CNN model evaluation on public NITYMED dataset. Eye closure detection with 96.3% accuracy in controlled conditions.",
    "demo1_gif2_title": "Real-world Validation",
    "demo1_gif2_desc": "Validation under real lighting conditions. Robust detection at 30 FPS with varying illumination and head movements.",
    "demo2_gif1_title": "Visual Drowsiness Detection",
    "demo2_gif1_desc": "Real-time eye analysis on NVIDIA Jetson Nano. Micro-sleep detection with visual alerts at <15ms latency.",
    "demo2_gif2_title": "Yawn Detection (MAR)",
    "demo2_gif2_desc": "Mouth Aspect Ratio (MAR) analysis for real-time fatigue detection. Integrated with facial landmark tracking.",

    // Publications
    "pubs_label": "Publications",
    "pubs_title": "Selected Publications",
    "pubs_full_list": "Full list on",
    "filter_all": "All",
    "filter_cogni": "Driver Monitoring",
    "filter_cv": "Computer Vision",
    "cit": "citations",

    // Teaching
    "teaching_label": "Teaching",
    "teaching_title": "Teaching Experience",
    "teaching_sub": "Universidad Nacional de San Antonio Abad del Cusco (UNSAAC) · School of Electronic Engineering · April 2024 – Present",
    "course1": "Artificial Intelligence",
    "course2": "Digital Image Processing",
    "course3": "Robotics",
    "course4": "Electronics Laboratory",
    "course_level": "Undergraduate · Electronic Engineering",

    // Achievements
    "ach_label": "Achievements",
    "ach_title": "Selected Achievements",
    "ach1": "Total citations, one paper surpassing 82 citations within 2 years.",
    "ach2": "Most cited paper on real-time CNN-based eye-state drowsiness detection, 82 citations.",
    "ach3": "RENACYT Level V researcher, CONCYTEC national recognition.",
    "ach4": "Active peer reviewer for international journals including ACM TIST and Scientific Reports.",
    "ach5": "First place in regional/national competitions including First Andean Hackathon (6 countries).",
    "ach6": "Target submission 2026: multimodal driver-state monitoring for automated driving and transportation safety.",

    // Peer Review
    "review_label": "Peer Review",
    "review_title": "Peer Review Activity",
    "review_th1": "Journal",
    "review_th2": "Publisher",
    "review_th3": "Reviews",
    "review_orcid_note": "Verified via ORCID iD:",

    // Contact
    "contact_label": "Contact",
    "contact_title": "Get in Touch",
    "contact_text": "I am open to research collaborations, dataset sharing, joint publications, academic exchanges, and PhD opportunities in human-centered AI, driver-state monitoring, transportation safety, and intelligent transportation systems.",
    "open_title": "Open to",
    "open1": "Research collaborations",
    "open2": "Dataset sharing",
    "open3": "Joint publications",
    "open4": "Academic exchanges",
    "open5": "PhD opportunities in human-centered AI & ITS",
    "open6": "Industry partnerships",

    // Footer
    "footer": "© 2026 Ruben Dario Florez-Zela · UNSAAC · Cusco, Peru"
  },

  "es": {
    // Navigation
    "nav_about": "Sobre mí",
    "nav_vision": "Visión",
    "nav_research": "Investigación",
    "nav_demos": "Demos",
    "nav_pubs": "Publicaciones",
    "nav_ach": "Logros",
    "nav_contact": "Contacto",
    "cv_download": "Descargar CV",

    // Hero
    "hero_tag": "IA centrada en el humano para transporte inteligente",
    "hero_subtitle": "Modelado multimodal del estado del conductor para conducción automatizada y seguridad en el transporte · Lab. LIECAR, UNSAAC · Cusco, Perú",
    "metric_citations": "Citas",
    "metric_pubs": "Publicaciones",
    "metric_reviews": "Revisiones",
    "btn_view_pubs": "Ver Publicaciones",

    // About
    "about_label": "Sobre mí",
    "about_title": "Construyendo sistemas interpretables de IA multimodal para el monitoreo del estado del conductor en transporte inteligente",
    "about_p1": "Desarrollo sistemas de IA multimodal para el monitoreo en tiempo real del estado del conductor en entornos de transporte inteligente. Mi trabajo combina visión computacional, seguimiento ocular, análisis conductual y aprendizaje profundo para modelar somnolencia, distracción y carga cognitiva en condiciones del mundo real.",
    "about_p2": "Mi investigación está fundamentada en la ingeniería de factores humanos y se enfoca en construir sistemas interpretables y desplegables que apoyen una conducción automatizada más segura, asistencia al conductor y evaluación de seguridad en el transporte mediante inferencia robusta a bordo del vehículo.",
    "about_p3": "Soy investigador en el Laboratorio LIECAR y docente de la Universidad Nacional de San Antonio Abad del Cusco (UNSAAC), Perú, reconocido como <strong>Investigador RENACYT Nivel V</strong> por CONCYTEC. Ejerzo como revisor de publicaciones científicas internacionales incluyendo <strong>Scientific Reports (Nature Portfolio)</strong> y <strong>ACM Transactions on Intelligent Systems and Technology</strong>.",

    // Badges
    "badge1": "Estimación del Estado del Conductor",
    "badge2": "IA Multimodal",
    "badge3": "Conducción Automatizada",
    "badge4": "Deep Learning Embebido",
    "badge5": "Ingeniería de Factores Humanos",
    "badge6": "Sistemas de Transporte Inteligente",
    "badge7": "Monitoreo del Conductor y Modelado de Mirada",
    "badge8": "Seguridad en el Transporte",

    // Vision
    "vision_label": "Visión",
    "vision_title": "Visión de Investigación",
    "vision_text": "Mi objetivo a largo plazo es desarrollar sistemas multimodales interpretables que comprendan la vulnerabilidad del conductor en entornos reales de transporte, conectando la detección del estado del conductor, la IA desplegable y la ingeniería de factores humanos. Busco establecer una línea de investigación donde la computación en el borde, la explicabilidad y el diseño de sistemas centrados en el humano converjan para construir sistemas de monitoreo que no solo sean precisos, sino lo suficientemente confiables para informar la conducción automatizada, la seguridad en el transporte y las guías de diseño de sistemas.",
    "pillar1": "Detección del estado del conductor",
    "pillar2": "IA en el borde (Edge)",
    "pillar3": "Modelos explicables",
    "pillar4": "Seguridad en el transporte",

    // Research Interests
    "interests_label": "Áreas de Enfoque",
    "interests_title": "Intereses de Investigación",
    "int1_title": "Modelado del Estado del Conductor para Conducción Automatizada",
    "int1_desc": "Modelado en tiempo real de somnolencia, distracción, carga cognitiva y preparación del conductor en contextos de conducción inteligente y automatizada.",
    "int2_title": "IA de Factores Humanos para Seguridad en el Transporte",
    "int2_desc": "Investigación sobre cómo la detección multimodal y la IA pueden apoyar el diseño de sistemas centrados en el humano, la evaluación de seguridad y la asistencia adaptativa en entornos de transporte.",
    "int3_title": "Percepción Multimodal y Fusión",
    "int3_desc": "Combinación de comportamiento de la mirada, dinámicas faciales, pose de cabeza y señales visuales para una estimación robusta del estado del conductor más allá de sistemas de una sola modalidad.",
    "int4_title": "IA Embebida para Monitoreo en Tiempo Real",
    "int4_desc": "Despliegue de modelos de aprendizaje profundo en plataformas de borde como NVIDIA Jetson Nano para inferencia a bordo con baja latencia en condiciones operativas reales.",
    "int5_title": "IA Interpretable para Sistemas Críticos",
    "int5_desc": "Diseño de sistemas de IA transparentes, auditables y confiables para soportar su despliegue en transporte y otros dominios de alto riesgo.",

    // Current Research
    "research_label": "Proyecto Activo",
    "research_title": "Investigación Actual",
    "research_status": "Activo · Envío objetivo Q1 2026",
    "research_h3": "Monitoreo Multimodal del Estado del Conductor para Conducción Automatizada y Seguridad en el Transporte",
    "research_p1": "Este proyecto desarrolla un sistema de monitoreo en tiempo real del estado del conductor para escenarios de transporte inteligente y conducción automatizada. Integra dinámicas de seguimiento ocular con cámaras RGB y NIR, análisis de mirada y modelado de puntos faciales para detectar somnolencia, distracción y carga cognitiva en condiciones del mundo real.",
    "research_p2": "El sistema está diseñado para inferencia desplegable a bordo del vehículo usando NVIDIA Jetson Nano, con énfasis en robustez, interpretabilidad y monitoreo de baja latencia para seguridad en el transporte y evaluación de factores humanos.",

    // Demos
    "demos_label": "Demostraciones",
    "demos_title": "Investigación en Acción",
    "demo1_gif1_title": "Evaluación en Dataset NITYMED",
    "demo1_gif1_desc": "Evaluación del modelo CNN en dataset público NITYMED. Detección de ojos cerrados con 96.3% de precisión en condiciones controladas.",
    "demo1_gif2_title": "Validación en Entorno Real",
    "demo1_gif2_desc": "Validación en condiciones reales de iluminación. Detección robusta a 30 FPS con variaciones de luz y movimiento.",
    "demo2_gif1_title": "Detección Visual de Somnolencia",
    "demo2_gif1_desc": "Análisis de ojos en tiempo real en NVIDIA Jetson Nano. Detección de micro-sueños con alertas visuales a <15ms de latencia.",
    "demo2_gif2_title": "Detección de Bostezos (MAR)",
    "demo2_gif2_desc": "Análisis de Mouth Aspect Ratio (MAR) para detección de fatiga en tiempo real. Integrado con seguimiento de puntos faciales.",

    // Publications
    "pubs_label": "Publicaciones",
    "pubs_title": "Publicaciones Seleccionadas",
    "pubs_full_list": "Lista completa en",
    "filter_all": "Todas",
    "filter_cogni": "Monitoreo del Conductor",
    "filter_cv": "Visión Computacional",
    "cit": "citas",

    // Teaching
    "teaching_label": "Docencia",
    "teaching_title": "Experiencia Docente",
    "teaching_sub": "Universidad Nacional de San Antonio Abad del Cusco (UNSAAC) · Escuela de Ingeniería Electrónica · Abril 2024 – Presente",
    "course1": "Inteligencia Artificial",
    "course2": "Procesamiento Digital de Imágenes",
    "course3": "Robótica",
    "course4": "Laboratorio de Electrónica",
    "course_level": "Pregrado · Ingeniería Electrónica",

    // Achievements
    "ach_label": "Logros",
    "ach_title": "Logros Destacados",
    "ach1": "Citas totales, un artículo superó 82 citas en 2 años.",
    "ach2": "Artículo más citado en detección de somnolencia CNN en tiempo real, 82 citas.",
    "ach3": "Investigador RENACYT Nivel V, reconocimiento nacional CONCYTEC.",
    "ach4": "Revisor activo para revistas internacionales incluyendo ACM TIST y Scientific Reports.",
    "ach5": "Primer lugar en competencias regionales/nacionales incluyendo Primera Hackathon Andina (6 países).",
    "ach6": "Envío objetivo 2026: monitoreo multimodal del estado del conductor para conducción automatizada y seguridad en el transporte.",

    // Peer Review
    "review_label": "Revisión por Pares",
    "review_title": "Actividad como Revisor",
    "review_th1": "Revista",
    "review_th2": "Editorial",
    "review_th3": "Revisiones",
    "review_orcid_note": "Verificado vía ORCID iD:",

    // Contact
    "contact_label": "Contacto",
    "contact_title": "Ponerse en Contacto",
    "contact_text": "Estoy abierto a colaboraciones de investigación, intercambio de datos, publicaciones conjuntas, intercambios académicos y oportunidades de doctorado en IA centrada en el humano, monitoreo del estado del conductor, seguridad en el transporte y sistemas de transporte inteligente.",
    "open_title": "Disponible para",
    "open1": "Colaboraciones de investigación",
    "open2": "Intercambio de datasets",
    "open3": "Publicaciones conjuntas",
    "open4": "Intercambios académicos",
    "open5": "Doctorado en IA centrada en el humano y STI",
    "open6": "Alianzas con la industria",

    // Footer
    "footer": "© 2026 Ruben Dario Florez-Zela · UNSAAC · Cusco, Perú"
  }
};
