import { Service } from './types';

export const CATEGORIES = [
  'Todos',
  'Aulas e Cursos',
  'Babá',
  'Beleza e Estética',
  'Consultoria',
  'Design e Tecnologia',
  'Diarista',
  'Eletricista',
  'Encanador',
  'Eventos',
  'Fretes e Mudanças',
  'Jardinagem',
  'Marceneiro',
  'Mecânico',
  'Pedreiro',
  'Saúde e Bem-estar',
  'Serviços Domésticos',
  'Outros'
];

export const BAIRROS = [
    'Todos',
    'Centro',
    'Planalto Horizonte',
    'Diagoral',
    'Zumbi',
    'Catolé',
    'Buenos Aires',
    'Mangueiral',
    'Distrito de Dourado',
    'Outra Localidade'
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: '1',
    category: 'Eletricista',
    title: 'Instalações Elétricas Residenciais',
    description: 'Serviços completos de instalação e manutenção elétrica. Segurança e qualidade garantida para sua casa.',
    contactName: 'João Silva',
    contactPhone: '85912345678',
    imageUrl: 'https://picsum.photos/seed/electric/400/300',
    bairro: 'Centro'
  },
  {
    id: '2',
    category: 'Jardinagem',
    title: 'Manutenção de Jardins e Paisagismo',
    description: 'Cuido do seu jardim com carinho e profissionalismo. Poda, adubação e criação de novos espaços verdes.',
    contactName: 'Maria Oliveira',
    contactPhone: '85987654321',
    imageUrl: 'https://picsum.photos/seed/garden/400/300',
    bairro: 'Planalto Horizonte'
  },
  {
    id: '3',
    category: 'Aulas e Cursos',
    title: 'Aulas Particulares de Violão',
    description: 'Aprenda a tocar violão do zero ou aprimore suas técnicas. Aulas para todas as idades.',
    contactName: 'Carlos Souza',
    contactPhone: '85999887766',
    imageUrl: 'https://picsum.photos/seed/guitar/400/300',
    bairro: 'Diagoral'
  },
   {
    id: '4',
    category: 'Serviços Domésticos',
    title: 'Limpeza e Organização de Ambientes',
    description: 'Serviço de diarista com foco em limpeza pesada e organização para deixar sua casa brilhando.',
    contactName: 'Ana Pereira',
    contactPhone: '85911223344',
    imageUrl: 'https://picsum.photos/seed/cleaning/400/300',
    bairro: 'Zumbi'
  },
  {
    id: '5',
    category: 'Mecânico',
    title: 'Mecânico de Automóveis - Atendimento Rápido',
    description: 'Revisão, troca de óleo, freios e pequenos reparos no seu veículo. Confiança e agilidade.',
    contactName: 'Pedro Costa',
    contactPhone: '85955667788',
    imageUrl: 'https://picsum.photos/seed/mechanic/400/300',
    bairro: 'Centro'
  },
  {
    id: '6',
    category: 'Beleza e Estética',
    title: 'Maquiagem Profissional para Eventos',
    description: 'Realce sua beleza com maquiagem para casamentos, formaturas e outras ocasiões especiais. Atendimento a domicílio.',
    contactName: 'Juliana Lima',
    contactPhone: '85988776655',
    imageUrl: 'https://picsum.photos/seed/makeup/400/300',
    bairro: 'Catolé'
  }
];