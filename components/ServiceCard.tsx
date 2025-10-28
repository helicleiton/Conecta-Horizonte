import React from 'react';
import { Service } from '../types';
import { PhoneIcon, UserIcon, CategoryIcon, LocationIcon } from './icons';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const whatsappLink = `https://wa.me/55${service.contactPhone}?text=Olá,%20vi%20seu%20serviço%20no%20Guia%20de%20Serviços%20e%20gostaria%20de%20mais%20informações.`;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300">
      <img src={service.imageUrl} alt={service.title} className="w-full h-48 object-cover flex-shrink-0" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{service.description}</p>
        
        <div className="space-y-2 text-sm text-gray-700 mt-auto pt-4 border-t border-gray-200">
            <div className="flex items-center">
                <CategoryIcon className="w-4 h-4 mr-2 text-indigo-500" />
                <span>{service.category}</span>
            </div>
            <div className="flex items-center">
                <LocationIcon className="w-4 h-4 mr-2 text-indigo-500" />
                <span>{service.bairro}</span>
            </div>
            <div className="flex items-center">
                <UserIcon className="w-4 h-4 mr-2 text-indigo-500" />
                <span>{service.contactName}</span>
            </div>
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full mt-4 flex items-center justify-center bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
        >
          <PhoneIcon className="w-5 h-5 mr-2" />
          Entrar em Contato
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
