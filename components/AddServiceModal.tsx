import React, { useState } from 'react';
import { Service } from '../types';
import { CATEGORIES, BAIRROS } from '../constants';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddService: (service: Omit<Service, 'id' | 'imageUrl'>) => void;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({ isOpen, onClose, onAddService }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1]); // Default to first non-"Todos" category
  const [bairro, setBairro] = useState(BAIRROS[1]); // Default to first non-"Todos" bairro
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof Omit<Service, 'id' | 'imageUrl'>, string>>>({});


  if (!isOpen) {
    return null;
  }

  const validate = () => {
    const newErrors: Partial<Record<keyof Omit<Service, 'id' | 'imageUrl'>, string>> = {};
    if (!title.trim()) newErrors.title = "O título é obrigatório.";
    if (!description.trim()) newErrors.description = "A descrição é obrigatória.";
    if (!contactName.trim()) newErrors.contactName = "Seu nome é obrigatório.";
    if (!bairro) newErrors.bairro = "O bairro é obrigatório.";
    if (!contactPhone.trim()) {
        newErrors.contactPhone = "O telefone é obrigatório.";
    } else if (!/^\d{10,11}$/.test(contactPhone)) {
        newErrors.contactPhone = "Telefone inválido. Use apenas números (ex: 85912345678).";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
        onAddService({ title, description, category, contactName, contactPhone, bairro });
        // Reset form
        setTitle('');
        setDescription('');
        setCategory(CATEGORIES[1]);
        setBairro(BAIRROS[1]);
        setContactName('');
        setContactPhone('');
        setErrors({});
        onClose();
    }
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setContactPhone(value);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-lg max-h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Anuncie seu Serviço</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors text-3xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título do Serviço</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className={`mt-1 block w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`} required />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria</label>
                  <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    {CATEGORIES.filter(c => c !== 'Todos').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                 <div>
                  <label htmlFor="bairro" className="block text-sm font-medium text-gray-700">Bairro</label>
                  <select id="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} className={`mt-1 block w-full px-3 py-2 border ${errors.bairro ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}>
                    {BAIRROS.filter(b => b !== 'Todos').map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  {errors.bairro && <p className="text-red-500 text-xs mt-1">{errors.bairro}</p>}
                </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={`mt-1 block w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`} required></textarea>
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">Seu Nome</label>
              <input type="text" id="contactName" value={contactName} onChange={(e) => setContactName(e.target.value)} className={`mt-1 block w-full px-3 py-2 border ${errors.contactName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`} required />
              {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>}
            </div>
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">Telefone / WhatsApp (apenas números)</label>
              <input type="tel" id="contactPhone" value={contactPhone} onChange={handlePhoneChange} placeholder="85912345678" maxLength={11} className={`mt-1 block w-full px-3 py-2 border ${errors.contactPhone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`} required />
              {errors.contactPhone && <p className="text-red-500 text-xs mt-1">{errors.contactPhone}</p>}
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Publicar Serviço
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;