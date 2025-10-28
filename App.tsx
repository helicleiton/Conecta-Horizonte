import React, { useState, useMemo } from 'react';
import { Service } from './types';
import { INITIAL_SERVICES, CATEGORIES, BAIRROS } from './constants';
import ServiceCard from './components/ServiceCard';
import AddServiceModal from './components/AddServiceModal';
import MultiSelectDropdown from './components/MultiSelectDropdown';
import { PlusIcon, SearchIcon } from './components/icons';

const App: React.FC = () => {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Todos']);
  const [selectedBairros, setSelectedBairros] = useState<string[]>(['Todos']);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddService = (newServiceData: Omit<Service, 'id' | 'imageUrl'>) => {
    const newService: Service = {
      ...newServiceData,
      id: new Date().getTime().toString(),
      // Use a random image from picsum for new services
      imageUrl: `https://picsum.photos/seed/${Math.random()}/400/300`,
    };
    setServices(prevServices => [newService, ...prevServices]);
    setIsModalOpen(false); // Close modal after adding
  };

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const searchTermMatch =
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());

      const categoryMatch =
        selectedCategories.includes('Todos') || selectedCategories.includes(service.category);
      
      const bairroMatch =
        selectedBairros.includes('Todos') || selectedBairros.includes(service.bairro);

      return searchTermMatch && categoryMatch && bairroMatch;
    });
  }, [services, searchTerm, selectedCategories, selectedBairros]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Guia de Serviços de Horizonte</h1>
          <p className="mt-2 text-indigo-200">Encontre os melhores profissionais da sua região.</p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 sticky top-4 z-40 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por serviço ou profissional..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <MultiSelectDropdown 
              options={CATEGORIES}
              selectedOptions={selectedCategories}
              onChange={setSelectedCategories}
              label="Categorias"
            />
            <MultiSelectDropdown 
              options={BAIRROS}
              selectedOptions={selectedBairros}
              onChange={setSelectedBairros}
              label="Bairros"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 flex-shrink-0"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Anunciar Serviço</span>
          </button>
        </div>

        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <p className="text-2xl font-semibold text-gray-700">Nenhum serviço encontrado</p>
            <p className="text-gray-500 mt-2">Tente ajustar seus filtros ou clique em "Anunciar Serviço" para adicionar um.</p>
          </div>
        )}
      </main>

      <AddServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddService={handleAddService}
      />
    </div>
  );
};

export default App;
