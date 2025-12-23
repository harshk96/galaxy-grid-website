import React from 'react';

const servicesData = [
    {
        title: "Server Setup & Deployment",
        desc: "Windows/Linux installation, On-premise & hybrid setup, Rack-mounted & tower deployment.",
        brands: "Dell, HP, Lenovo, Supermicro"
    },
    {
        title: "Active Directory & User Management",
        desc: "Centralized control, Domain controller config, Group policy, Secure login.",
        brands: "Microsoft AD"
    },
    {
        title: "Virtualization Solutions",
        desc: "Reduce hardware cost, Easy backup, Faster deployment.",
        brands: "VMware ESXi, Hyper-V, Proxmox"
    },
    {
        title: "Server Monitoring & Maintenance",
        desc: "24/7 Monitoring of CPU, RAM, Disk. Proactive support.",
        brands: "Zabbix, Prometheus"
    },
    {
        title: "Data Storage, Backup & Recovery",
        desc: "NAS/SAN storage, RAID config, Automated backups, Disaster Recovery.",
        brands: "Synology, QNAP, Dell EMC"
    },
    {
        title: "Cloud & Hybrid Server Solutions",
        desc: "AWS/Azure deployment, Hybrid integration, Cloud migration.",
        brands: "AWS, Azure"
    },
    {
        title: "Server Security & Hardening",
        desc: "Firewall, Antivirus, MFA/2FA, Security audits.",
        brands: "Fortinet, Cisco"
    }
];

const Services = ({ isDark }) => {
    return (
        <div className={`w-full py-20 px-10 ${isDark ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-black'}`}>
            <h2 className="text-5xl font-bold mb-10 border-b pb-4">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicesData.map((service, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 group ${isDark
                                ? 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700'
                                : 'border-zinc-300 bg-white hover:shadow-xl'
                            }`}
                    >
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-[#ec2626] transition-colors">{service.title}</h3>
                        <p className={`mb-4 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{service.desc}</p>
                        <div className={`text-sm font-mono ${isDark ? 'text-[#ec2626]' : 'text-[#ec2626]'}`}>
                            {service.brands}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
