import { Link, usePage } from '@inertiajs/react';
import {
    Home,
    LayoutGrid,
    ListChecks,
    Shirt,
    ShoppingCart,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { useCart } from '@/Contexts/CartContext';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Katalog Produk',
        href: '/products',
        icon: Shirt,
    },
];

export function AppSidebar() {
    const page = usePage<any>();
    const { auth } = page.props;
    const { cartCount } = useCart();

    const mainNavItems: NavItem[] = [
        ...(auth.user
            ? [
                  { title: 'Dashboard', href: dashboard(), icon: LayoutGrid },
                  {
                      title: 'Riwayat Pesanan Saya',
                      href: '/orders',
                      icon: ListChecks,
                  },
              ]
            : []),
        { title: 'Katalog Produk', href: '/products', icon: Shirt },
        {
            title: 'Keranjang Belanja',
            href: '/cart',
            icon: ShoppingCart,
            badge: cartCount,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
