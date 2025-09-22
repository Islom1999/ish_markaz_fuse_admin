/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation'

export const defaultNavigation: FuseNavigationItem[] = [
  // Admin boshqaruvi
  {
    id: 'admin-management',
    title: 'Admin boshqaruvi',
    type: 'group',
    icon: 'heroicons_outline:cog-6-tooth',
    children: [
      {
        id: 'admin-permission',
        title: 'Ruxsatlar',
        type: 'basic',
        icon: 'heroicons_outline:key',
        link: '/admin-permission',
      },
      {
        id: 'admin-role',
        title: 'Rollar',
        type: 'basic',
        icon: 'heroicons_outline:user-group',
        link: '/admin-role',
      },
      {
        id: 'admin-user',
        title: 'Adminlar',
        type: 'basic',
        icon: 'heroicons_outline:shield-check',
        link: '/admin-user',
      },
    ],
  },

  // Tizim sozlamalari
  {
    id: 'system-settings',
    title: 'Tizim sozlamalari',
    type: 'group',
    icon: 'heroicons_outline:cog-8-tooth',
    children: [
      {
        id: 'tg-detail',
        title: 'Telegram sozlamalari',
        type: 'basic',
        icon: 'heroicons_outline:chat-bubble-left-right',
        link: '/tg-detail',
      },
      {
        id: 'translation',
        title: 'Tarjimalar',
        type: 'basic',
        icon: 'heroicons_outline:language',
        link: '/translation',
      },
      {
        id: 'sp-premium-plan',
        title: 'Premium tariflar',
        type: 'basic',
        icon: 'heroicons_outline:star',
        link: '/sp-premium-plan',
      },
    ],
  },

  // Hudud va kategoriyalar
  {
    id: 'location-category',
    title: 'Hudud va kategoriyalar',
    type: 'group',
    icon: 'heroicons_outline:map',
    children: [
      {
        id: 'sp-region',
        title: 'Viloyatlar',
        type: 'basic',
        icon: 'heroicons_outline:globe-asia-australia',
        link: '/sp-region',
      },
      {
        id: 'sp-district',
        title: 'Tumanlar',
        type: 'basic',
        icon: 'heroicons_outline:map-pin',
        link: '/sp-district',
      },
      {
        id: 'sp-category',
        title: 'Kategoriyalar',
        type: 'basic',
        icon: 'heroicons_outline:squares-2x2',
        link: '/sp-category',
      },
      {
        id: 'sp-sub-category',
        title: 'Sub kategoriyalar',
        type: 'basic',
        icon: 'heroicons_outline:rectangle-group',
        link: '/sp-sub-category',
      },
    ],
  },

  // Mijozlar va e'lonlar
  {
    id: 'clients-content',
    title: 'Mijozlar va kontent',
    type: 'group',
    icon: 'heroicons_outline:users',
    children: [
      {
        id: 'client-user',
        title: 'Foydalanuvchilar',
        type: 'basic',
        icon: 'heroicons_outline:user-circle',
        link: '/client-user',
      },
      {
        id: 'client-resume',
        title: 'Rezyumelar',
        type: 'basic',
        icon: 'heroicons_outline:document-text',
        link: '/client-resume',
      },
      {
        id: 'client-poster',
        title: 'E\'lonlar',
        type: 'basic',
        icon: 'heroicons_outline:megaphone',
        link: '/client-poster',
      },
    ],
  },
]
