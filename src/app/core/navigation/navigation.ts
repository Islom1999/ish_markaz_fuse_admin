/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation'

export const defaultNavigation: FuseNavigationItem[] = [
  // Admin boshqaruvi
  {
    id: 'admin-management',
    title: 'Admin boshqaruvi',
    type: 'group',
    icon: 'heroicons_outline:cog-6-tooth',
    permissions: ['super', 'permission_view', 'role_view', 'admins_view'],
    children: [
      {
        id: 'admin-permission',
        permissions: ['super', 'permission_view'],
        title: 'Ruxsatlar',
        type: 'basic',
        icon: 'heroicons_outline:key',
        link: '/admin-permission',
      },
      {
        id: 'admin-role',
        permissions: ['super', 'role_view'],
        title: 'Rollar',
        type: 'basic',
        icon: 'heroicons_outline:user-group',
        link: '/admin-role',
      },
      {
        id: 'admin-user',
        permissions: ['super', 'admins_view'],
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
    permissions: ['super', 'tg_details_view', 'translation_view', 'premium_plan_view'],
    title: 'Tizim sozlamalari',
    type: 'group',
    icon: 'heroicons_outline:cog-8-tooth',
    children: [
      {
        id: 'tg-detail',
        permissions: ['super', 'tg_details_view'],
        title: 'Telegram sozlamalari',
        type: 'basic',
        icon: 'heroicons_outline:chat-bubble-left-right',
        link: '/tg-detail',
      },
      {
        id: 'translation',
        permissions: ['super', 'translation_view'],
        title: 'Tarjimalar',
        type: 'basic',
        icon: 'heroicons_outline:language',
        link: '/translation',
      },
      {
        id: 'sp-premium-plan',
        permissions: ['super', 'premium_plan_view'],
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
    permissions: ['super', 'region_view', 'district_view', 'category_view', 'sub_category_view'],
    title: 'Hudud va kategoriyalar',
    type: 'group',
    icon: 'heroicons_outline:map',
    children: [
      {
        id: 'sp-region',
        permissions: ['super', 'region_view'],
        title: 'Viloyatlar',
        type: 'basic',
        icon: 'heroicons_outline:globe-asia-australia',
        link: '/sp-region',
      },
      {
        id: 'sp-district',
        permissions: ['super', 'district_view'],
        title: 'Tumanlar',
        type: 'basic',
        icon: 'heroicons_outline:map-pin',
        link: '/sp-district',
      },
      {
        id: 'sp-category',
        permissions: ['super', 'category_view'],
        title: 'Kategoriyalar',
        type: 'basic',
        icon: 'heroicons_outline:squares-2x2',
        link: '/sp-category',
      },
      {
        id: 'sp-sub-category',
        permissions: ['super', 'sub_category_view'],
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
    permissions: ['super', 'client_user_view', 'client_resume_view', 'client_poster_view'],
    title: 'Mijozlar va kontent',
    type: 'group',
    icon: 'heroicons_outline:users',
    children: [
      {
        id: 'client-user',
        permissions: ['super', 'client_user_view'],
        title: 'Foydalanuvchilar',
        type: 'basic',
        icon: 'heroicons_outline:user-circle',
        link: '/client-user',
      },
      {
        id: 'client-resume',
        permissions: ['super', 'client_resume_view'],
        title: 'Rezyumelar',
        type: 'basic',
        icon: 'heroicons_outline:document-text',
        link: '/client-resume',
      },
      {
        id: 'client-poster',
        permissions: ['super', 'client_poster_view'],
        title: "E'lonlar",
        type: 'basic',
        icon: 'heroicons_outline:megaphone',
        link: '/client-poster',
      },
    ],
  },
]
