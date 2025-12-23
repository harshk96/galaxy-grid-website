import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <div 
            className="w-full group transition-all duration-700 relative rounded-3xl overflow-hidden h-[500px] shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image with enhanced effects */}
            <div className="h-full w-full relative overflow-hidden">
                <img
                    className={`h-full w-full object-cover transition-all duration-1000 ${isHovered ? 'scale-110 brightness-110' : 'scale-100 brightness-90'}`}
                    src={service.image}
                    alt={service.title}
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Animated border */}
                <div className={`absolute inset-0 border-2 border-[#ec2626]/0 transition-all duration-500 ${isHovered ? 'border-opacity-100 rounded-3xl' : 'border-opacity-0 rounded-3xl'}`}></div>
            </div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4 transition-transform duration-300 group-hover:scale-110">
                        <service.icon />
                    </div>
                    <h3 className="text-3xl font-bold uppercase tracking-tight">{service.title}</h3>
                </div>
                <p className="text-sm font-mono opacity-90 mb-6">{service.desc}</p>
                
                {/* CTA Button */}
                <Link
                    to={`/services/${service.id}`}
                    className={`inline-flex items-center uppercase font-bold text-sm tracking-wider transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                    View Service Details
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>
            
            {/* Hover overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-[#ec2626]/40 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
    );
};

export default ServiceCard;
