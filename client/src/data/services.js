import {
  FaNetworkWired,
  FaServer,
  FaDatabase,
  FaHeadset,
  FaCloud,
  FaVideo,
  FaFileAlt,
  FaTools,
  FaCode,
  FaRobot,
  FaRocket,
  FaChartLine,
  FaCog,
  FaLock,
  FaCloudUploadAlt,
  FaUserShield,
  FaSyncAlt,
  FaBrain,
  FaLanguage,
  FaEye,
  FaWifi,
  FaShieldAlt,
  FaBalanceScale,
  FaLinux,
  FaDocker,
  FaAws,
  FaCheckCircle,
  FaDesktop,
  FaEnvelope,
  FaLaptop,
  FaHdd,
  FaMoneyBillWave,
  FaBell,
  FaFingerprint,
  FaCamera,
  FaBook,
  FaProjectDiagram,
  FaClipboardCheck,
  FaHeadphones
} from "react-icons/fa";

export const servicesData = [
  {
    id: "web-dev",
    title: "Web Development",
    icon: FaCode,
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2564&auto=format&fit=crop",
    desc: "High-performance websites built to scale and convert.",
    fullDesc: "We craft cutting-edge web experiences that blend stunning design with bulletproof functionality. From lightning-fast e-commerce platforms to immersive 3D experiences, we build digital products that captivate users and drive measurable business growth. Every line of code is optimized for performance, security, and scalability.",
    technologies: ["React", "Next.js", "Three.js", "GSAP", "Tailwind CSS", "Node.js", "TypeScript", "GraphQL", "PostgreSQL", "Redis"],
    features: [
      {
        icon: FaRocket,
        title: "Blazing Fast Performance",
        desc: "Sub-second load times with advanced optimization techniques including code splitting, lazy loading, and CDN integration. Your users won't wait—neither should your business."
      },
      {
        icon: FaChartLine,
        title: "SEO-Optimized Architecture",
        desc: "Server-side rendering, semantic HTML, and technical SEO best practices baked into every project. Rank higher, get discovered faster, convert more visitors."
      },
      {
        icon: FaCog,
        title: "Interactive 3D Experiences",
        desc: "Leverage WebGL and Three.js to create immersive product showcases, configurators, and brand experiences that leave lasting impressions."
      },
      {
        icon: FaLock,
        title: "Enterprise-Grade Security",
        desc: "OWASP compliance, XSS/CSRF protection, secure authentication, and regular security audits. Your data and your customers' trust are our priority."
      },
      {
        icon: FaCloudUploadAlt,
        title: "Scalable E-Commerce Solutions",
        desc: "From Shopify integrations to custom headless commerce platforms, we build stores that handle thousands of transactions without breaking a sweat."
      },
      {
        icon: FaDesktop,
        title: "Responsive & Accessible",
        desc: "WCAG 2.1 AA compliant, mobile-first design, and cross-browser compatibility ensure your site works beautifully for everyone, everywhere."
      }
    ],
    process: [
      {
        step: "01",
        title: "Discovery & Strategy",
        desc: "Deep-dive workshops to understand your business goals, user personas, and competitive landscape. We map out the technical roadmap and success metrics."
      },
      {
        step: "02",
        title: "Design & Prototyping",
        desc: "High-fidelity mockups and interactive prototypes bring your vision to life. Every pixel is intentional, every interaction is tested."
      },
      {
        step: "03",
        title: "Development & Integration",
        desc: "Agile sprints with continuous integration. Clean, documented code that integrates seamlessly with your existing systems and third-party APIs."
      },
      {
        step: "04",
        title: "Testing & QA",
        desc: "Rigorous cross-device testing, performance audits, security scans, and user acceptance testing ensure a flawless launch."
      },
      {
        step: "05",
        title: "Launch & Optimization",
        desc: "Smooth deployment with zero downtime. Post-launch monitoring, A/B testing, and continuous optimization keep your site at peak performance."
      }
    ]
  },

  {
    id: "ai-automation",
    title: "AI Automation",
    icon: FaRobot,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop",
    desc: "Automate smarter. Operate faster. Scale effortlessly.",
    fullDesc: "Transform your business operations with intelligent automation that learns, adapts, and delivers results. We implement AI-powered solutions that eliminate repetitive tasks, reduce human error, and unlock actionable insights from your data. From chatbots that convert to predictive analytics that drive strategy, we make AI work for you.",
    technologies: ["OpenAI", "Python", "TensorFlow", "PyTorch", "LangChain", "Hugging Face", "Zapier", "n8n", "FastAPI", "Ray"],
    features: [
      {
        icon: FaBrain,
        title: "Intelligent Process Automation",
        desc: "Automate complex workflows with AI agents that understand context, make decisions, and handle exceptions—reducing manual work by up to 80%."
      },
      {
        icon: FaHeadphones,
        title: "Custom AI Chatbots & Assistants",
        desc: "Deploy conversational AI that handles customer inquiries 24/7, qualifies leads, and provides instant support with human-like understanding."
      },
      {
        icon: FaChartLine,
        title: "Predictive Analytics & Insights",
        desc: "Turn data into foresight. Our ML models predict customer behavior, forecast demand, and identify opportunities before your competitors do."
      },
      {
        icon: FaLanguage,
        title: "Natural Language Processing",
        desc: "Extract meaning from unstructured text, automate document processing, perform sentiment analysis, and enable multilingual communication at scale."
      },
      {
        icon: FaEye,
        title: "Computer Vision Solutions",
        desc: "Automate quality control, enable visual search, detect anomalies, and extract information from images and videos with state-of-the-art vision AI."
      },
      {
        icon: FaSyncAlt,
        title: "Seamless System Integration",
        desc: "Connect AI capabilities to your existing CRM, ERP, and business tools. No disruption, just enhancement."
      }
    ],
    process: [
      {
        step: "01",
        title: "Process Audit & Opportunity Mapping",
        desc: "We analyze your current workflows to identify high-impact automation opportunities and quantify potential ROI."
      },
      {
        step: "02",
        title: "AI Strategy & Architecture Design",
        desc: "Design a custom AI solution tailored to your business needs, from model selection to integration architecture."
      },
      {
        step: "03",
        title: "Development & Training",
        desc: "Build, train, and fine-tune AI models using your data. Iterative development ensures accuracy and relevance."
      },
      {
        step: "04",
        title: "Integration & Deployment",
        desc: "Seamlessly integrate AI into your existing systems with comprehensive testing and staged rollouts."
      },
      {
        step: "05",
        title: "Monitoring & Continuous Improvement",
        desc: "Ongoing performance monitoring, model retraining, and optimization to ensure your AI keeps getting smarter."
      }
    ]
  },

  {
    id: "network",
    title: "Network Design",
    icon: FaNetworkWired,
    image: "/network.jpeg",
    desc: "Fast, secure, and bulletproof connectivity infrastructure.",
    fullDesc: "Build a network foundation that grows with your business. We design enterprise-grade network architectures that deliver exceptional performance, rock-solid security, and 99.9% uptime. Whether it's a corporate campus, multi-site deployment, or hybrid cloud network, we engineer solutions that keep your business connected.",
    technologies: ["Cisco", "Ubiquiti", "Fortinet", "MikroTik", "Aruba", "Juniper", "Palo Alto Networks", "SD-WAN", "VPN", "VLAN"],
    features: [
      {
        icon: FaWifi,
        title: "Enterprise LAN/WAN/SD-WAN",
        desc: "Scalable network architectures with intelligent traffic routing, redundancy, and failover capabilities that ensure business continuity."
      },
      {
        icon: FaWifi,
        title: "High-Performance Wi-Fi Solutions",
        desc: "Seamless wireless coverage with enterprise-grade access points, mesh networking, and advanced roaming for uninterrupted connectivity."
      },
      {
        icon: FaShieldAlt,
        title: "Next-Gen Firewall & Security",
        desc: "Multi-layered network security with intrusion prevention, content filtering, threat intelligence, and zero-trust architecture."
      },
      {
        icon: FaBalanceScale,
        title: "Load Balancing & Failover",
        desc: "Distribute traffic intelligently across resources and ensure automatic failover for zero-downtime operations."
      },
      {
        icon: FaChartLine,
        title: "Network Monitoring & Analytics",
        desc: "Real-time visibility into network performance, bandwidth utilization, and threat detection with proactive alerting."
      },
      {
        icon: FaCog,
        title: "Managed Network Services",
        desc: "24/7 monitoring, proactive maintenance, and rapid response to keep your network running at peak performance."
      }
    ],
    process: [
      {
        step: "01",
        title: "Site Survey & Assessment",
        desc: "Comprehensive analysis of your current infrastructure, coverage requirements, and performance bottlenecks."
      },
      {
        step: "02",
        title: "Network Architecture Design",
        desc: "Custom topology design with detailed documentation, equipment specifications, and capacity planning for future growth."
      },
      {
        step: "03",
        title: "Deployment & Configuration",
        desc: "Professional installation with structured cabling, equipment mounting, and optimized configuration for maximum performance."
      },
      {
        step: "04",
        title: "Testing & Optimization",
        desc: "Rigorous performance testing, security validation, and fine-tuning to ensure optimal operation across all scenarios."
      },
      {
        step: "05",
        title: "Documentation & Training",
        desc: "Complete as-built documentation and hands-on training for your IT team to manage and troubleshoot with confidence."
      }
    ]
  },

  {
    id: "server",
    title: "Server Management",
    icon: FaServer,
    image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2695&auto=format&fit=crop",
    desc: "Stable servers. Maximum uptime. Zero surprises.",
    fullDesc: "Your servers are the backbone of your business—let us ensure they never let you down. We provide comprehensive server management across on-premise, cloud, and hybrid environments with proactive monitoring, automated maintenance, and 24/7 support. From Windows Domain Controllers to Linux web servers, we keep your infrastructure secure, optimized, and always available.",
    technologies: ["Linux", "Windows Server", "VMware", "Hyper-V", "AWS", "Azure", "Docker", "Kubernetes", "Ansible", "Terraform"],
    features: [
      {
        icon: FaLinux,
        title: "Multi-Platform Server Management",
        desc: "Expert administration of Windows Server, Linux distributions (Ubuntu, CentOS, RHEL), and containerized environments."
      },
      {
        icon: FaDocker,
        title: "Virtualization & Containerization",
        desc: "Maximize resource utilization with VMware, Hyper-V, Docker, and Kubernetes orchestration for scalable application deployment."
      },
      {
        icon: FaAws,
        title: "Cloud Migration & Hybrid Architecture",
        desc: "Seamless migration to AWS, Azure, or GCP with hybrid cloud integration for optimal performance and cost efficiency."
      },
      {
        icon: FaHdd,
        title: "Automated Backup & Disaster Recovery",
        desc: "Comprehensive backup strategies with automated scheduling, offsite replication, and rapid recovery capabilities (RPO < 15 min)."
      },
      {
        icon: FaChartLine,
        title: "Performance Monitoring & Tuning",
        desc: "Continuous monitoring with intelligent alerting, resource optimization, and proactive capacity planning to prevent issues before they impact users."
      },
      {
        icon: FaLock,
        title: "Security Hardening & Patch Management",
        desc: "CIS benchmark compliance, automated patching, vulnerability scanning, and security audits to protect against threats."
      }
    ],
    process: [
      {
        step: "01",
        title: "Infrastructure Audit",
        desc: "Comprehensive assessment of your current server environment, identifying risks, bottlenecks, and optimization opportunities."
      },
      {
        step: "02",
        title: "Security & Compliance Hardening",
        desc: "Implement industry best practices, security baselines, and compliance frameworks (PCI-DSS, HIPAA, ISO 27001) as needed."
      },
      {
        step: "03",
        title: "Automation & Monitoring Setup",
        desc: "Deploy automated provisioning, configuration management, and comprehensive monitoring with intelligent alerting."
      },
      {
        step: "04",
        title: "Optimization & Scaling",
        desc: "Fine-tune performance, implement auto-scaling, and optimize resource allocation for cost-efficiency and speed."
      },
      {
        step: "05",
        title: "Ongoing Management & Support",
        desc: "24/7 monitoring, proactive maintenance, security updates, and rapid incident response to keep your servers running smoothly."
      }
    ]
  },

  {
    id: "security",
    title: "IT Security",
    icon: FaShieldAlt,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
    desc: "Defense-in-depth security that protects what matters most.",
    fullDesc: "In a world of evolving cyber threats, security isn't optional—it's essential. We implement comprehensive, multi-layered security strategies that protect your infrastructure, data, and people from ransomware, data breaches, and insider threats. Our approach combines cutting-edge technology with security awareness training to create a resilient security posture.",
    technologies: ["Sophos", "CrowdStrike", "Okta", "Microsoft Defender", "Splunk", "Fortinet", "Palo Alto", "Tenable", "KnowBe4", "Wazuh"],
    features: [
      {
        icon: FaUserShield,
        title: "Endpoint Detection & Response",
        desc: "Advanced threat protection with AI-powered detection, automated response, and forensic analysis to stop attacks before damage occurs."
      },
      {
        icon: FaLock,
        title: "Multi-Factor Authentication & SSO",
        desc: "Enterprise identity management with MFA, single sign-on, conditional access policies, and zero-trust authentication frameworks."
      },
      {
        icon: FaClipboardCheck,
        title: "Security Audits & Compliance",
        desc: "Comprehensive security assessments, penetration testing, and compliance audits (SOC 2, ISO 27001, GDPR, HIPAA) with detailed remediation plans."
      },
      {
        icon: FaShieldAlt,
        title: "Network Security & Segmentation",
        desc: "Next-generation firewalls, intrusion prevention systems, network segmentation, and micro-segmentation for zero-trust architecture."
      },
      {
        icon: FaBell,
        title: "24/7 Security Monitoring (SOC)",
        desc: "Round-the-clock threat monitoring, log analysis, and incident response with a dedicated security operations center."
      },
      {
        icon: FaBrain,
        title: "Security Awareness Training",
        desc: "Comprehensive employee training programs with simulated phishing campaigns to build your human firewall."
      }
    ],
    process: [
      {
        step: "01",
        title: "Security Risk Assessment",
        desc: "Identify vulnerabilities, assess risk exposure, and prioritize security initiatives based on business impact."
      },
      {
        step: "02",
        title: "Security Architecture Design",
        desc: "Develop a comprehensive security strategy with defense-in-depth principles, zero-trust framework, and incident response plans."
      },
      {
        step: "03",
        title: "Implementation & Hardening",
        desc: "Deploy security controls, configure policies, implement encryption, and harden systems according to industry standards."
      },
      {
        step: "04",
        title: "Security Awareness & Training",
        desc: "Educate your team with engaging training programs, simulated attacks, and ongoing security awareness campaigns."
      },
      {
        step: "05",
        title: "Continuous Monitoring & Improvement",
        desc: "24/7 security monitoring, regular vulnerability scanning, penetration testing, and continuous security posture optimization."
      }
    ]
  },

  {
    id: "storage",
    title: "Data Storage",
    icon: FaDatabase,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bbcbf?q=80&w=2671&auto=format&fit=crop",
    desc: "Your data. Always accessible. Always protected.",
    fullDesc: "Data is your most valuable asset—protect it with enterprise-grade storage solutions. We design and implement robust storage infrastructures that balance performance, redundancy, and cost. From high-speed NAS for creative workflows to hybrid cloud storage for massive scalability, we ensure your data is secure, accessible, and never lost.",
    technologies: ["Synology", "QNAP", "Dell EMC", "NetApp", "Veeam", "TrueNAS", "Ceph", "MinIO", "AWS S3", "Azure Blob"],
    features: [
      {
        icon: FaHdd,
        title: "NAS & SAN Deployment",
        desc: "High-performance network-attached and storage area networks with RAID protection, hot-swappable drives, and automatic failover."
      },
      {
        icon: FaCloud,
        title: "Hybrid Cloud Storage",
        desc: "Best of both worlds: on-premise performance with cloud elasticity. Automated tiering moves cold data to cost-effective cloud storage."
      },
      {
        icon: FaLock,
        title: "Encryption & Data Protection",
        desc: "End-to-end encryption (at rest and in transit), immutable backups, and ransomware protection to safeguard your critical data."
      },
      {
        icon: FaSyncAlt,
        title: "Automated Backup & Replication",
        desc: "Set-it-and-forget-it backups with geo-replication, version control, and rapid restore capabilities for business continuity."
      },
      {
        icon: FaCheckCircle,
        title: "Disaster Recovery Planning",
        desc: "Comprehensive DR strategies with RPO/RTO guarantees, regular testing, and documented recovery procedures."
      },
      {
        icon: FaChartLine,
        title: "Storage Analytics & Optimization",
        desc: "Monitor capacity utilization, predict growth, eliminate data redundancy, and optimize storage costs with intelligent analytics."
      }
    ],
    process: [
      {
        step: "01",
        title: "Capacity Planning & Assessment",
        desc: "Analyze current storage usage, growth trends, and performance requirements to design the optimal storage architecture."
      },
      {
        step: "02",
        title: "Architecture Design & Selection",
        desc: "Select the right storage technology (NAS/SAN/Cloud) and design redundant, scalable architecture aligned with your business needs."
      },
      {
        step: "03",
        title: "Deployment & Migration",
        desc: "Professional installation, configuration, and seamless data migration with zero downtime and data integrity verification."
      },
      {
        step: "04",
        title: "Security & Backup Configuration",
        desc: "Implement encryption, access controls, automated backup schedules, and disaster recovery procedures."
      },
      {
        step: "05",
        title: "Monitoring & Maintenance",
        desc: "Proactive monitoring, capacity alerts, firmware updates, and performance optimization to ensure long-term reliability."
      }
    ]
  },

  {
    id: "support",
    title: "IT Support",
    icon: FaHeadset,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop",
    desc: "Fast, friendly IT support that keeps your team productive.",
    fullDesc: "Your employees shouldn't waste time fighting with technology. Our responsive IT support team provides quick resolutions, proactive problem-solving, and user-friendly assistance that keeps your workforce productive and happy. From password resets to critical system failures, we're here to help—fast.",
    technologies: ["AnyDesk", "TeamViewer", "ConnectWise", "Microsoft 365", "Google Workspace", "Jamf", "Intune", "ServiceNow"],
    features: [
      {
        icon: FaHeadphones,
        title: "Multi-Channel Helpdesk",
        desc: "Get help your way: phone, email, chat, or ticketing system. Fast response times and friendly, knowledgeable support technicians."
      },
      {
        icon: FaLaptop,
        title: "Remote & On-Site Support",
        desc: "Quick remote troubleshooting for immediate issues, with on-site support available when hands-on assistance is needed."
      },
      {
        icon: FaDesktop,
        title: "Hardware & Software Troubleshooting",
        desc: "Expert diagnosis and repair of laptops, desktops, printers, peripherals, and software issues across Windows, Mac, and Linux."
      },
      {
        icon: FaEnvelope,
        title: "Email & Productivity Suite Management",
        desc: "Microsoft 365 and Google Workspace administration, email configuration, license management, and user training."
      },
      {
        icon: FaUserShield,
        title: "User Onboarding & Offboarding",
        desc: "Streamlined processes for new employee setup and departing employee access revocation—secure, fast, and documented."
      },
      {
        icon: FaBook,
        title: "Self-Service Knowledge Base",
        desc: "Empower your users with a searchable knowledge base, video tutorials, and FAQs for common issues."
      }
    ],
    process: [
      {
        step: "01",
        title: "Ticket Creation & Triage",
        desc: "Submit issues through your preferred channel. Our system intelligently prioritizes and routes tickets to the right specialist."
      },
      {
        step: "02",
        title: "Rapid Diagnosis & Resolution",
        desc: "Experienced technicians troubleshoot efficiently, often resolving issues on first contact with remote tools."
      },
      {
        step: "03",
        title: "Escalation & Collaboration",
        desc: "Complex issues are escalated to senior engineers or specialists with full context handoff for seamless resolution."
      },
      {
        step: "04",
        title: "Verification & Documentation",
        desc: "Confirm the issue is resolved, document the solution, and update knowledge base to prevent recurrence."
      },
      {
        step: "05",
        title: "Continuous Improvement",
        desc: "Analyze support trends, identify recurring issues, and implement proactive solutions to reduce future tickets."
      }
    ]
  },

  {
    id: "cloud",
    title: "Cloud Infrastructure",
    icon: FaCloud,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
    desc: "Cloud infrastructure engineered for performance and savings.",
    fullDesc: "Migrate to the cloud with confidence. We design secure, scalable, and cost-optimized cloud architectures that leverage the full power of AWS, Azure, and Google Cloud. Whether you're moving workloads, building cloud-native applications, or optimizing existing infrastructure, we ensure maximum performance at minimum cost.",
    technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "CloudFormation", "Helm", "Prometheus", "Grafana"],
    features: [
      {
        icon: FaCloudUploadAlt,
        title: "Cloud Migration & Modernization",
        desc: "Seamless lift-and-shift or cloud-native transformation with zero downtime. We handle planning, execution, and optimization."
      },
      {
        icon: FaDocker,
        title: "Containerization & Orchestration",
        desc: "Deploy scalable, portable applications with Docker and Kubernetes. Auto-scaling, load balancing, and self-healing infrastructure."
      },
      {
        icon: FaLock,
        title: "Cloud Security & Compliance",
        desc: "Implement IAM, encryption, network security groups, and compliance frameworks (HIPAA, SOC 2, PCI-DSS) in the cloud."
      },
      {
        icon: FaChartLine,
        title: "Monitoring & Observability",
        desc: "Full-stack visibility with centralized logging, metrics, tracing, and intelligent alerting to detect and resolve issues instantly."
      },
      {
        icon: FaMoneyBillWave,
        title: "Cost Optimization & FinOps",
        desc: "Reduce cloud spending by 30-50% through rightsizing, reserved instances, spot instances, and automated resource cleanup."
      },
      {
        icon: FaCog,
        title: "Infrastructure as Code (IaC)",
        desc: "Version-controlled, automated infrastructure deployment with Terraform, CloudFormation, and CI/CD pipelines for consistency and speed."
      }
    ],
    process: [
      {
        step: "01",
        title: "Cloud Readiness Assessment",
        desc: "Evaluate your applications, dependencies, and infrastructure to design the optimal cloud migration strategy."
      },
      {
        step: "02",
        title: "Architecture Design & Planning",
        desc: "Design scalable, resilient cloud architecture with multi-region redundancy, disaster recovery, and cost optimization built in."
      },
      {
        step: "03",
        title: "Migration & Deployment",
        desc: "Execute phased migration with rigorous testing, data validation, and rollback procedures to ensure zero disruption."
      },
      {
        step: "04",
        title: "Optimization & Automation",
        desc: "Implement auto-scaling, monitoring, cost optimization, and CI/CD pipelines for maximum efficiency."
      },
      {
        step: "05",
        title: "Managed Cloud Operations",
        desc: "24/7 monitoring, security patching, performance optimization, and continuous cost management to maximize your cloud ROI."
      }
    ]
  },

  {
    id: "cctv",
    title: "CCTV & Access Control",
    icon: FaVideo,
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2670&auto=format&fit=crop",
    desc: "Complete physical security for your facilities.",
    fullDesc: "Protect your premises with integrated surveillance and access control systems. We design and install enterprise-grade CCTV solutions with AI-powered analytics, facial recognition, and centralized management. From small offices to multi-site campuses, we secure your physical assets with intelligent technology.",
    technologies: ["Hikvision", "Dahua", "Axis", "Ubiquiti", "ZKTeco", "Milestone", "Genetec", "Avigilon", "Verkada"],
    features: [
      {
        icon: FaCamera,
        title: "4K IP Camera Surveillance",
        desc: "Crystal-clear video with night vision, wide dynamic range, and weatherproof housing for comprehensive coverage."
      },
      {
        icon: FaFingerprint,
        title: "Biometric Access Control",
        desc: "Fingerprint, facial recognition, and card-based access control with time-attendance integration and audit trails."
      },
      {
        icon: FaBrain,
        title: "AI Video Analytics",
        desc: "Intelligent motion detection, facial recognition, license plate recognition, loitering detection, and people counting."
      },
      {
        icon: FaCloud,
        title: "Remote Monitoring & Playback",
        desc: "Access live feeds and recorded footage from anywhere via mobile apps, web browsers, or centralized monitoring stations."
      },
      {
        icon: FaHdd,
        title: "Centralized Recording & Storage",
        desc: "Network video recorders (NVR) with RAID redundancy, cloud backup, and intelligent retention policies."
      },
      {
        icon: FaCog,
        title: "System Integration",
        desc: "Integrate CCTV and access control with alarms, intercoms, and building management systems for unified security."
      }
    ],
    process: [
      {
        step: "01",
        title: "Site Survey & Risk Assessment",
        desc: "Comprehensive site visit to identify coverage requirements, blind spots, and security vulnerabilities."
      },
      {
        step: "02",
        title: "System Design & Equipment Selection",
        desc: "Custom security design with camera placement diagrams, access points, and equipment specifications."
      },
      {
        step: "03",
        title: "Professional Installation",
        desc: "Expert installation with structured cabling, equipment mounting, and integration with existing infrastructure."
      },
      {
        step: "04",
        title: "Configuration & Testing",
        desc: "System configuration, user setup, mobile app deployment, and comprehensive testing of all features."
      },
      {
        step: "05",
        title: "Training & Ongoing Support",
        desc: "Hands-on training for your security team and ongoing maintenance, monitoring, and system updates."
      }
    ]
  },

  {
    id: "documentation",
    title: "IT Documentation",
    icon: FaFileAlt,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    desc: "Clear documentation. Full visibility. Zero surprises.",
    fullDesc: "Undocumented IT infrastructure is a ticking time bomb. We create comprehensive, living IT documentation that gives you complete visibility into your technology estate. From network diagrams to password vaults, we organize and document everything so your team can operate confidently and efficiently.",
    technologies: ["IT Glue", "Hudu", "Confluence", "Notion", "Lucidchart", "Draw.io", "SharePoint", "Docusaurus"],
    features: [
      {
        icon: FaBook,
        title: "Asset & Inventory Management",
        desc: "Complete inventory of hardware, software licenses, warranties, and service contracts with automated asset tracking."
      },
      {
        icon: FaProjectDiagram,
        title: "Network & System Diagrams",
        desc: "Visual topology diagrams, rack elevations, data flow diagrams, and interactive infrastructure maps."
      },
      {
        icon: FaClipboardCheck,
        title: "Standard Operating Procedures",
        desc: "Step-by-step SOPs for routine tasks, troubleshooting guides, and incident response playbooks."
      },
      {
        icon: FaLock,
        title: "Security & Compliance Records",
        desc: "Centralized documentation of security policies, audit logs, compliance certifications, and incident reports."
      },
      {
        icon: FaDesktop,
        title: "Vendor & Contract Management",
        desc: "Organized repository of vendor contacts, SLAs, license keys, and renewal dates with automated reminders."
      },
      {
        icon: FaSyncAlt,
        title: "Automated Documentation Updates",
        desc: "Integration with monitoring tools to automatically update documentation when infrastructure changes occur."
      }
    ],
    process: [
      {
        step: "01",
        title: "Discovery & Data Collection",
        desc: "Comprehensive audit of your IT environment using automated discovery tools and manual documentation."
      },
      {
        step: "02",
        title: "Information Organization",
        desc: "Structure documentation with logical categorization, searchable tags, and role-based access control."
      },
      {
        step: "03",
        title: "Documentation Creation",
        desc: "Create detailed documentation including diagrams, procedures, configuration guides, and troubleshooting steps."
      },
      {
        step: "04",
        title: "Review & Validation",
        desc: "Collaborate with your team to verify accuracy, fill gaps, and ensure documentation meets your needs."
      },
      {
        step: "05",
        title: "Maintenance & Updates",
        desc: "Establish processes for keeping documentation current with scheduled reviews and automated change tracking."
      }
    ]
  },

  {
    id: "amc",
    title: "AMC & Managed Services",
    icon: FaTools,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop",
    desc: "Proactive IT management. Predictable costs. Maximum uptime.",
    fullDesc: "Stop firefighting IT issues and start preventing them. Our managed services provide 24/7 monitoring, proactive maintenance, and unlimited support at a predictable monthly cost. Focus on your business while we ensure your technology runs flawlessly—every day, all day.",
    technologies: ["NinjaOne", "Atera", "Datto RMM", "ManageEngine", "SolarWinds", "PRTG", "Zabbix", "N-able"],
    features: [
      {
        icon: FaBell,
        title: "24/7 Proactive Monitoring",
        desc: "Real-time monitoring of servers, networks, endpoints, and applications with intelligent alerting and automated remediation."
      },
      {
        icon: FaTools,
        title: "Preventive Maintenance",
        desc: "Scheduled maintenance windows for updates, patches, backups, and health checks to prevent issues before they occur."
      },
      {
        icon: FaHeadphones,
        title: "Unlimited Priority Support",
        desc: "Dedicated support team with priority response times, escalation paths, and direct access to senior engineers."
      },
      {
        icon: FaChartLine,
        title: "Strategic IT Planning",
        desc: "Quarterly business reviews, technology roadmaps, budget planning, and strategic guidance aligned with your goals."
      },
      {
        icon: FaCheckCircle,
        title: "Patch Management & Updates",
        desc: "Automated testing and deployment of security patches, firmware updates, and software upgrades."
      },
      {
        icon: FaBook,
        title: "Detailed Reporting & Analytics",
        desc: "Monthly reports on system health, incident trends, resolution times, and infrastructure recommendations."
      }
    ],
    process: [
      {
        step: "01",
        title: "Onboarding & Discovery",
        desc: "Comprehensive assessment of your IT environment, pain points, and business objectives to tailor our service delivery."
      },
      {
        step: "02",
        title: "Monitoring & Automation Setup",
        desc: "Deploy monitoring agents, configure alerting thresholds, and implement automation for routine maintenance tasks."
      },
      {
        step: "03",
        title: "Proactive Maintenance",
        desc: "Regular health checks, performance optimization, security patching, and capacity planning to prevent issues."
      },
      {
        step: "04",
        title: "Incident Response & Support",
        desc: "Rapid response to alerts and support tickets with documented resolutions and root cause analysis."
      },
      {
        step: "05",
        title: "Reporting & Strategic Planning",
        desc: "Monthly performance reports, quarterly business reviews, and continuous improvement initiatives."
      }
    ]
  }
];
