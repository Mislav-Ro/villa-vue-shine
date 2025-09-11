import { useLocation } from 'react-router-dom';

export type PropertyType = 'villa-esquel' | 'villa-olivenbaum' | 'alida-valli';

export const useCurrentProperty = (): PropertyType => {
  const location = useLocation();
  
  if (location.pathname.includes('/villa-olivenbaum')) {
    return 'villa-olivenbaum';
  } else if (location.pathname.includes('/alida-valli')) {
    return 'alida-valli';
  } else {
    return 'villa-esquel'; // default
  }
};

export const getPropertyFromPath = (pathname: string): PropertyType => {
  if (pathname.includes('/villa-olivenbaum')) {
    return 'villa-olivenbaum';
  } else if (pathname.includes('/alida-valli')) {
    return 'alida-valli';
  } else {
    return 'villa-esquel'; // default
  }
};

export const getPropertyImages = async (property: PropertyType) => {
  const imageModules: Record<string, any> = {};
  
  try {
    // Dynamically import all images from the property folder
    const importPromises = [];
    
    // Hero image
    importPromises.push(
      import(`../assets/${property}/villa-hero.jpg`).then(module => {
        imageModules['villa-hero'] = module.default;
      }).catch(() => {
        // Fallback to villa-esquel hero if image not found
        return import('../assets/villa-esquel/villa-hero.jpg').then(module => {
          imageModules['villa-hero'] = module.default;
        });
      })
    );
    
    // Gallery images - try common naming patterns
    const commonNames = [
      'villa-exterior',
      'villa-bedroom', 
      'villa-kitchen',
      'olivenbaum-exterior',
      'olivenbaum-bedroom',
      'olivenbaum-kitchen',
      'alida-exterior',
      'alida-bedroom',
      'alida-bathroom'
    ];
    
    for (const name of commonNames) {
      importPromises.push(
        import(`../assets/${property}/${name}.jpg`).then(module => {
          imageModules[name] = module.default;
        }).catch(() => {
          // Silently fail for missing images
        })
      );
    }
    
    await Promise.all(importPromises);
    
    return imageModules;
  } catch (error) {
    console.error('Error loading property images:', error);
    // Fallback to villa-esquel images
    try {
      const fallbackHero = await import('../assets/villa-esquel/villa-hero.jpg');
      const fallbackExterior = await import('../assets/villa-esquel/villa-exterior.jpg');
      const fallbackBedroom = await import('../assets/villa-esquel/villa-bedroom.jpg');
      const fallbackKitchen = await import('../assets/villa-esquel/villa-kitchen.jpg');
      
      return {
        'villa-hero': fallbackHero.default,
        'villa-exterior': fallbackExterior.default,
        'villa-bedroom': fallbackBedroom.default,
        'villa-kitchen': fallbackKitchen.default
      };
    } catch (fallbackError) {
      console.error('Error loading fallback images:', fallbackError);
      return {};
    }
  }
};

export const getICalSources = (property: PropertyType) => {
  const sources = {
    'villa-esquel': [
      {
        name: 'Airbnb',
        url: 'https://www.airbnb.com/calendar/ical/33287681.ics?s=d62b44bb665593bb511faaf0f880fcd0'
      },
      {
        name: 'Booking.com',
        url: 'https://ical.booking.com/v1/export?t=af103c92-e046-4e15-88de-d565f430045f'
      }
    ],
    'villa-olivenbaum': [
      {
        name: 'Airbnb',
        url: 'https://www.airbnb.com/calendar/ical/34538153.ics?s=323ccde908b7ab8de1ddfcc2aee58fc4'
      },
      {
        name: 'Booking.com',
        url: 'https://ical.booking.com/v1/export?t=0b348c8a-e0eb-46b2-8662-e821358c713b'
      }
    ],
    'alida-valli': [
      {
        name: 'Airbnb',
        url: 'https://www.airbnb.com/calendar/ical/50837192.ics?s=de68a778ffd91fe94e3b010f0a92f755'
      },
      {
        name: 'Booking.com',
        url: 'https://ical.booking.com/v1/export?t=7f00b9b0-38c2-45b8-9e6a-ee91e2251792'
      }
    ]
  };
  
  return sources[property];
};