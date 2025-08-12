import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Mail, Phone, MessageSquare, CheckCircle, Clock, X, Plus, Trash2, ChevronDown, ChevronUp, Smartphone, Folder, FolderOpen } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getServices, getServiceCategories, createBooking, Service as DBService, ServiceCategory } from '../lib/supabase';
import AuthModal from './AuthModal';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  useDroppable,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SelectedService extends DBService {
  scheduledDate: string;
  scheduledTime: string;
  notes: string;
  customInterval?: 'weekly' | 'biweekly' | 'monthly' | 'custom';
  customIntervalDays?: number;
  isExpanded?: boolean;
}

const ServiceCard = ({ service, isDragging = false, onAdd, isSelected = false }: { 
  service: DBService; 
  isDragging?: boolean; 
  onAdd?: () => void;
  isSelected?: boolean;
}) => (
  <motion.div
    layout
    whileHover={{ scale: 1.02, y: -2 }}
    className={`relative p-4 md:p-5 rounded-2xl border-2 transition-all duration-300 bg-white ${
      isDragging ? 'opacity-50 rotate-3 scale-105' : 'hover:shadow-lg'
    } ${
      isSelected 
        ? 'border-green-300 bg-green-50' 
        : 'border-gray-200 hover:border-red-300'
    }`}
  >
    {service.popular && (
      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 md:px-3 py-1 rounded-full">
        Most Popular
      </div>
    )}
    
    <div className="flex items-start justify-between space-x-3">
      <div className="flex items-start space-x-3 flex-1 min-w-0">
        <div className="text-2xl md:text-4xl flex-shrink-0">{service.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-gray-900 text-sm md:text-base mb-1 line-clamp-2">
            {service.name}
          </div>
          <div className="text-xs md:text-sm text-gray-600 mb-2 line-clamp-1">
            {service.short_description}
          </div>
          <div className="text-xs md:text-sm font-semibold text-red-600">
            From CHF {service.base_price_chf}/{service.price_unit}
          </div>
        </div>
      </div>
      
      {onAdd && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAdd}
          disabled={isSelected}
          className={`flex-shrink-0 px-3 py-2 rounded-full text-sm font-semibold transition-all ${
            isSelected
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800'
          }`}
        >
          {isSelected ? (
            <>
              <CheckCircle size={16} className="mr-1" />
              Added
            </>
          ) : (
            <>
              <Plus size={16} className="mr-1" />
              Add
            </>
          )}
        </motion.button>
      )}
    </div>
  </motion.div>
);

const DraggableServiceCard = ({ service, onAdd, isSelected }: { 
  service: DBService; 
  onAdd: () => void;
  isSelected: boolean;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: service.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <ServiceCard 
        service={service} 
        isDragging={isDragging} 
        onAdd={onAdd}
        isSelected={isSelected}
      />
    </div>
  );
};

const DroppableZone = ({ children }: { children: React.ReactNode }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'selected-services-zone',
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[150px] md:min-h-[200px] border-2 border-dashed rounded-2xl p-4 md:p-6 mb-6 md:mb-8 transition-all ${
        isOver
          ? 'border-red-400 bg-red-50'
          : 'border-gray-300 bg-gray-50'
      }`}
    >
      {children}
    </div>
  );
};

const ExpandableSelectedService = ({ service, onUpdate, onRemove, onToggleExpand }: { 
  service: SelectedService; 
  onUpdate: (id: string, updates: Partial<SelectedService>) => void;
  onRemove: (id: string) => void;
  onToggleExpand: (id: string) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: service.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      layout
      className={`bg-white border-2 border-blue-200 rounded-2xl shadow-lg overflow-hidden ${
        isDragging ? 'opacity-50 z-50' : ''
      }`}
    >
      {/* Collapsed Header */}
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div 
              {...listeners}
              className="text-2xl md:text-3xl cursor-grab active:cursor-grabbing hover:scale-110 transition-transform flex-shrink-0"
            >
              {service.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 text-sm md:text-base line-clamp-1">
                {service.name}
              </h4>
              <p className="text-xs md:text-sm text-gray-600 line-clamp-1">
                {service.short_description}
              </p>
              <p className="text-xs md:text-sm font-semibold text-red-600">
                From CHF {service.base_price_chf}/{service.price_unit}
              </p>
              
              {/* Quick Status */}
              {service.scheduledDate && (
                <div className="flex items-center space-x-2 mt-2 text-xs text-green-600">
                  <CheckCircle size={12} />
                  <span>
                    {new Date(service.scheduledDate).toLocaleDateString()} 
                    {service.scheduledTime && ` • ${service.scheduledTime}`}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => onToggleExpand(service.id)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {service.isExpanded ? (
                <ChevronUp size={20} className="text-gray-600" />
              ) : (
                <ChevronDown size={20} className="text-gray-600" />
              )}
            </button>
            <button
              onClick={() => onRemove(service.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {service.isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-gray-200"
          >
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-2" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={service.scheduledDate}
                    onChange={(e) => onUpdate(service.id, { scheduledDate: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="inline w-4 h-4 mr-2" />
                    Time Preference
                  </label>
                  <select
                    value={service.scheduledTime}
                    onChange={(e) => onUpdate(service.id, { scheduledTime: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm md:text-base"
                    required
                  >
                    <option value="">Select time</option>
                    <option value="morning">Morning (8-12)</option>
                    <option value="afternoon">Afternoon (12-17)</option>
                    <option value="evening">Evening (17-20)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Recurring Schedule (Optional)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { value: '', label: 'One-time' },
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'biweekly', label: 'Bi-weekly' },
                    { value: 'monthly', label: 'Monthly' }
                  ].map((interval) => (
                    <button
                      key={interval.value}
                      type="button"
                      onClick={() => onUpdate(service.id, { customInterval: interval.value as any })}
                      className={`p-2 md:p-3 text-xs md:text-sm rounded-lg border transition-all ${
                        service.customInterval === interval.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {interval.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MessageSquare className="inline w-4 h-4 mr-2" />
                  Service Notes
                </label>
                <textarea
                  value={service.notes}
                  onChange={(e) => onUpdate(service.id, { notes: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-sm md:text-base"
                  placeholder="Specific requirements for this service..."
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ServiceSelection = () => {
  const { user, isAuthenticated } = useAuth();
  const [services, setServices] = useState<DBService[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: {
      street: '',
      city: 'Geneva',
      postalCode: '',
      canton: 'Geneva'
    },
    generalNotes: ''
  });

  // Load services on component mount
  React.useEffect(() => {
    const loadServices = async () => {
      try {
        const [servicesData, categoriesData] = await Promise.all([
          getServices(),
          getServiceCategories()
        ]);
        setServices(servicesData);
        setCategories(categoriesData);
        
        // Auto-expand first category and popular services category
        const initialExpanded = new Set<string>();
        if (categoriesData.length > 0) {
          initialExpanded.add(categoriesData[0].id);
        }
        // Find and expand category with most popular services
        const popularCategory = categoriesData.find(cat => 
          servicesData.some(service => service.category_id === cat.id && service.popular)
        );
        if (popularCategory) {
          initialExpanded.add(popularCategory.id);
        }
        setExpandedCategories(initialExpanded);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  // Group services by category
  const servicesByCategory = React.useMemo(() => {
    const grouped = new Map<string, DBService[]>();
    
    categories.forEach(category => {
      const categoryServices = services.filter(service => service.category_id === category.id);
      if (categoryServices.length > 0) {
        grouped.set(category.id, categoryServices);
      }
    });
    
    return grouped;
  }, [services, categories]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Pre-fill form data if user is authenticated
  React.useEffect(() => {
    if (user && user.user_metadata) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        phone: user.user_metadata.phone || '',
        address: user.user_metadata.address || prev.address
      }));
    }
  }, [user]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    // Visual feedback when dragging over the drop zone
    if (over.id === 'selected-services-zone') {
      // Add visual feedback here if needed
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // If dropping on the drop zone
    if (over.id === 'selected-services-zone') {
      const service = services.find(s => s.id === active.id);
      if (service && !selectedServices.find(s => s.id === service.id)) {
        addService(service);
      }
      return;
    }

    // If reordering within selected services
    if (active.id !== over.id && selectedServices.find(s => s.id === active.id)) {
      setSelectedServices((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addService = (service: DBService) => {
    if (!selectedServices.find(s => s.id === service.id)) {
      const newSelectedService: SelectedService = {
        ...service,
        scheduledDate: '',
        scheduledTime: '',
        notes: '',
        isExpanded: true // Auto-expand new services for immediate scheduling
      };
      setSelectedServices(prev => [...prev, newSelectedService]);
    }
  };

  const updateSelectedService = (id: string, updates: Partial<SelectedService>) => {
    setSelectedServices(prev => 
      prev.map(service => 
        service.id === id ? { ...service, ...updates } : service
      )
    );
  };

  const removeSelectedService = (id: string) => {
    setSelectedServices(prev => prev.filter(service => service.id !== id));
  };

  const toggleServiceExpansion = (id: string) => {
    setSelectedServices(prev => 
      prev.map(service => 
        service.id === id ? { ...service, isExpanded: !service.isExpanded } : service
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (selectedServices.length === 0) {
      alert('Please select at least one service');
      return;
    }

    // Validate that all services have required scheduling info
    const invalidServices = selectedServices.filter(
      service => !service.scheduledDate || !service.scheduledTime
    );

    if (invalidServices.length > 0) {
      alert('Please complete scheduling information for all services');
      return;
    }

    handleBookingSubmission();
  };

  const handleBookingSubmission = async () => {
    setIsSubmitting(true);
    
    try {
      const bookingData = {
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address: formData.address,
        preferred_date: selectedServices[0].scheduledDate, // Use first service date as preferred
        preferred_time: selectedServices[0].scheduledTime,
        general_notes: formData.generalNotes,
        services: selectedServices.map(service => ({
          service_id: service.id,
          scheduled_date: service.scheduledDate,
          scheduled_time: service.scheduledTime,
          service_notes: service.notes,
          recurring_interval: service.customInterval,
          recurring_interval_days: service.customIntervalDays,
          price_chf: service.base_price_chf
        }))
      };

      const booking = await createBooking(bookingData);
      
      // Show success message
      alert(`Booking created successfully! Reference: ${booking.booking_reference}\n\nYou will receive a confirmation call within 48 hours.`);
      
      // Reset form
      setSelectedServices([]);
      setFormData(prev => ({
        ...prev,
        generalNotes: ''
      }));
      
    } catch (error) {
      console.error('Booking error:', error);
      alert('There was an error creating your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeService = services.find(service => service.id === activeId);

  return (
    <>
    <section id="services" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {loading ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Loading services...</p>
          </div>
        ) : (
        <>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
            Build Your{' '}
            <span className="text-red-600">Service Package</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Select multiple services, schedule each at different times, and set up recurring appointments
          </p>
          
          {/* Mobile Instructions */}
          <div className="mt-6 md:hidden">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
              <Smartphone size={16} className="text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">
                Tap "Add" or drag services to build your package
              </span>
            </div>
          </div>
        </motion.div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {/* Mobile: Vertical Layout */}
          <div className="block lg:hidden space-y-8">
            {/* Available Services - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="sticky top-20 z-40 bg-white/95 backdrop-blur-xl border-2 border-gray-200 rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Folder className="text-white" size={16} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Available Services</h3>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500 font-medium">
                    {categories.length} categories
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    {selectedServices.length} selected
                  </div>
                </div>
              </div>
              
              {/* Service Categories Accordion - Mobile */}
              <div className="space-y-4">
                {categories.map((category) => {
                  const categoryServices = servicesByCategory.get(category.id) || [];
                  const isExpanded = expandedCategories.has(category.id);
                  const selectedCount = categoryServices.filter(service => 
                    selectedServices.some(s => s.id === service.id)
                  ).length;
                  
                  return (
                    <div key={category.id} className="border border-gray-200 rounded-2xl overflow-hidden">
                      {/* Category Header */}
                      <motion.button
                        onClick={() => toggleCategory(category.id)}
                        className="w-full p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-150 transition-all duration-200 flex items-center justify-between"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
                            style={{ backgroundColor: category.color + '20' }}
                          >
                            {category.icon}
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-gray-900 text-base">
                              {category.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {categoryServices.length} service{categoryServices.length !== 1 ? 's' : ''}
                              {selectedCount > 0 && (
                                <span className="text-blue-600 font-medium ml-2">
                                  • {selectedCount} selected
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {/* Popular badge if category has popular services */}
                          {categoryServices.some(service => service.popular) && (
                            <div className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                              Popular
                            </div>
                          )}
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="text-gray-500" size={20} />
                          </motion.div>
                        </div>
                      </motion.button>
                      
                      {/* Category Services */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 bg-white">
                              {category.description && (
                                <p className="text-sm text-gray-600 mb-4 italic">
                                  {category.description}
                                </p>
                              )}
                              
                              <SortableContext items={categoryServices.map(s => s.id)} strategy={verticalListSortingStrategy}>
                                <div className="grid grid-cols-1 gap-3">
                                  {categoryServices.map((service) => (
                                    <DraggableServiceCard 
                                      key={service.id} 
                                      service={service} 
                                      onAdd={() => addService(service)}
                                      isSelected={selectedServices.some(s => s.id === service.id)}
                                    />
                                  ))}
                                </div>
                              </SortableContext>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-3 bg-blue-50 rounded-xl border border-blue-200 text-center">
                <p className="text-blue-700 font-medium text-xs">
                  💡 Tap "Add" or drag services to add them to your package • Click categories to expand
                </p>
              </div>
            </motion.div>

            {/* Selected Services & Booking Section - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                    <CheckCircle className="text-white" size={16} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Your Package ({selectedServices.length})
                  </h3>
                </div>
                {selectedServices.length > 0 && (
                  <button
                    onClick={() => setSelectedServices([])}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
                    title="Clear all services"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              {/* Drop Zone - Mobile */}
              <DroppableZone>
                {selectedServices.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">📋</div>
                    <p className="text-gray-500 font-medium text-sm">
                      Add services to schedule them
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Schedule multiple services at different times
                    </p>
                  </div>
                ) : (
                  <SortableContext items={selectedServices.map(s => s.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                      {selectedServices.map((service) => (
                        <ExpandableSelectedService
                          key={service.id}
                          service={service}
                          onUpdate={updateSelectedService}
                          onRemove={removeSelectedService}
                          onToggleExpand={toggleServiceExpansion}
                        />
                      ))}
                    </div>
                  </SortableContext>
                )}
              </DroppableZone>

              {/* Contact Information - Mobile */}
              {selectedServices.length > 0 && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  onSubmit={handleSubmit}
                  className="space-y-4 mt-6 pt-6 border-t border-gray-200"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Mail className="inline w-4 h-4 mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm"
                        readOnly={isAuthenticated}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Phone className="inline w-4 h-4 mr-2" />
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm"
                        readOnly={isAuthenticated}
                        required
                      />
                    </div>
                  </div>

                  {!isAuthenticated && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        value={formData.address.street}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          address: { ...formData.address, street: e.target.value }
                        })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm mb-2"
                        placeholder="Street address"
                        required
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={formData.address.postalCode}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            address: { ...formData.address, postalCode: e.target.value }
                          })}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm"
                          placeholder="1200"
                          required
                        />
                        <input
                          type="text"
                          value={formData.address.city}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            address: { ...formData.address, city: e.target.value }
                          })}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm"
                          placeholder="Geneva"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <MessageSquare className="inline w-4 h-4 mr-2" />
                      General Notes
                    </label>
                    <textarea
                      value={formData.generalNotes}
                      onChange={(e) => setFormData({ ...formData, generalNotes: e.target.value })}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none text-sm"
                      placeholder="Any general requirements or preferences..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 15px 30px rgba(213, 43, 30, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-full text-base font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-xl"
                  >
                    {isSubmitting 
                      ? 'Creating Booking...' 
                      : `Book ${selectedServices.length} Service${selectedServices.length !== 1 ? 's' : ''} – Confirm in 48h`
                    }
                  </motion.button>
                </motion.form>
              )}
            </motion.div>
          </div>

          {/* Desktop: Horizontal Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
            {/* Available Services - Desktop Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="sticky top-20 bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Folder className="text-white" size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Available Services</h3>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500 font-medium">
                    {categories.length} categories
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    {selectedServices.length} selected
                  </div>
                </div>
              </div>
              
              {/* Service Categories Accordion - Desktop */}
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                {categories.map((category) => {
                  const categoryServices = servicesByCategory.get(category.id) || [];
                  const isExpanded = expandedCategories.has(category.id);
                  const selectedCount = categoryServices.filter(service => 
                    selectedServices.some(s => s.id === service.id)
                  ).length;
                  
                  return (
                    <div key={category.id} className="border border-gray-200 rounded-2xl overflow-hidden">
                      {/* Category Header */}
                      <motion.button
                        onClick={() => toggleCategory(category.id)}
                        className="w-full p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-150 transition-all duration-200 flex items-center justify-between"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
                            style={{ backgroundColor: category.color + '20' }}
                          >
                            {category.icon}
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-gray-900 text-lg">
                              {category.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {categoryServices.length} service{categoryServices.length !== 1 ? 's' : ''}
                              {selectedCount > 0 && (
                                <span className="text-blue-600 font-medium ml-2">
                                  • {selectedCount} selected
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {/* Popular badge if category has popular services */}
                          {categoryServices.some(service => service.popular) && (
                            <div className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                              Popular
                            </div>
                          )}
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="text-gray-500" size={20} />
                          </motion.div>
                        </div>
                      </motion.button>
                      
                      {/* Category Services */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 bg-white">
                              {category.description && (
                                <p className="text-sm text-gray-600 mb-4 italic">
                                  {category.description}
                                </p>
                              )}
                              
                              <SortableContext items={categoryServices.map(s => s.id)} strategy={verticalListSortingStrategy}>
                                <div className="grid grid-cols-1 gap-3">
                                  {categoryServices.map((service) => (
                                    <DraggableServiceCard 
                                      key={service.id} 
                                      service={service} 
                                      onAdd={() => addService(service)}
                                      isSelected={selectedServices.some(s => s.id === service.id)}
                                    />
                                  ))}
                                </div>
                              </SortableContext>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-3 bg-blue-50 rounded-xl border border-blue-200 text-center">
                <p className="text-blue-700 font-medium text-sm">
                  💡 Drag services to the right or click "Add" to build your package • Click categories to expand
                </p>
              </div>
            </motion.div>

            {/* Selected Services & Booking Section - Desktop Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                    <CheckCircle className="text-white" size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Your Package ({selectedServices.length})
                  </h3>
                </div>
                {selectedServices.length > 0 && (
                  <button
                    onClick={() => setSelectedServices([])}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
                    title="Clear all services"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              {/* Drop Zone - Desktop */}
              <DroppableZone>
                {selectedServices.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📋</div>
                    <p className="text-gray-500 font-medium text-base">
                      Drop services here to schedule them
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Schedule multiple services at different times
                    </p>
                  </div>
                ) : (
                  <SortableContext items={selectedServices.map(s => s.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                      {selectedServices.map((service) => (
                        <ExpandableSelectedService
                          key={service.id}
                          service={service}
                          onUpdate={updateSelectedService}
                          onRemove={removeSelectedService}
                          onToggleExpand={toggleServiceExpansion}
                        />
                      ))}
                    </div>
                  </SortableContext>
                )}
              </DroppableZone>

              {/* Contact Information - Desktop */}
              {selectedServices.length > 0 && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  onSubmit={handleSubmit}
                  className="space-y-6 mt-8 pt-8 border-t border-gray-200"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        <Mail className="inline w-4 h-4 mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                        readOnly={isAuthenticated}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        <Phone className="inline w-4 h-4 mr-2" />
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                        readOnly={isAuthenticated}
                        required
                      />
                    </div>
                  </div>

                  {!isAuthenticated && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Address
                      </label>
                      <input
                        type="text"
                        value={formData.address.street}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          address: { ...formData.address, street: e.target.value }
                        })}
                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all mb-2"
                        placeholder="Street address"
                        required
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={formData.address.postalCode}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            address: { ...formData.address, postalCode: e.target.value }
                          })}
                          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                          placeholder="1200"
                          required
                        />
                        <input
                          type="text"
                          value={formData.address.city}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            address: { ...formData.address, city: e.target.value }
                          })}
                          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                          placeholder="Geneva"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <MessageSquare className="inline w-4 h-4 mr-2" />
                      General Notes
                    </label>
                    <textarea
                      value={formData.generalNotes}
                      onChange={(e) => setFormData({ ...formData, generalNotes: e.target.value })}
                      rows={3}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                      placeholder="Any general requirements or preferences..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 15px 30px rgba(213, 43, 30, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-5 rounded-full text-lg font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-xl"
                  >
                    {isSubmitting 
                      ? 'Creating Booking...' 
                      : `Book ${selectedServices.length} Service${selectedServices.length !== 1 ? 's' : ''} – Confirm in 48h`
                    }
                  </motion.button>
                </motion.form>
              )}
            </motion.div>
          </div>

          <DragOverlay>
            {activeId ? (
              <ServiceCard 
                service={services.find(s => s.id === activeId)!} 
                isDragging={true}
              />
            ) : null}
          </DragOverlay>
        </DndContext>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 md:mt-12 p-4 md:p-6 bg-gradient-to-r from-blue-50 to-red-50 rounded-2xl md:rounded-3xl border border-gray-200"
        >
          <div className="flex items-center justify-center space-x-3 md:space-x-4 mb-3 md:mb-4">
            <Clock className="text-blue-600" size={20} />
            <span className="text-base md:text-lg font-semibold text-gray-900">
              Multi-Service Benefits
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-xs md:text-sm">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="text-green-600" size={14} />
              <span>Bundle discounts available</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="text-green-600" size={14} />
              <span>Coordinated scheduling</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="text-green-600" size={14} />
              <span>Single confirmation call</span>
            </div>
          </div>
        </motion.div>
        </>
        )}
      </div>
    </section>
    
    <AuthModal 
      isOpen={showAuthModal} 
      onClose={() => setShowAuthModal(false)} 
      initialMode="signup"
    />
    </>
  );
};

export default ServiceSelection;