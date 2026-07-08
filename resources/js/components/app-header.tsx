import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import {
    Home,
    LayoutGrid,
    ListChecks,
    Menu,
    Search,
    ShoppingBag,
    ShoppingCart,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import AppLogoIcon from '@/components/app-logo-icon';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { UserMenuContent } from '@/components/user-menu-content';
import { useCart } from '@/Contexts/CartContext';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, NavItem } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

const activeItemStyles =
    'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';

export function AppHeader({ breadcrumbs = [] }: Props) {
    const page = usePage();
    const { auth } = page.props;
    const getInitials = useInitials();
    const { isCurrentUrl, whenCurrentUrl } = useCurrentUrl();
    const { cartCount } = useCart();
    const [isCartPulsing, setIsCartPulsing] = useState(false);
    const previousCartCount = useRef(cartCount);

    const mainNavItems: NavItem[] = [
        { title: 'Beranda', href: '/', icon: Home },
        { title: 'Katalog Produk', href: '/products', icon: ShoppingBag },
        { title: 'Keranjang Belanja', href: '/cart', icon: ShoppingCart },
        ...(auth.user
            ? [
                  { title: 'Dashboard', href: dashboard(), icon: LayoutGrid },
                  { title: 'Pesanan Saya', href: '/orders', icon: ListChecks },
              ]
            : []),
    ];

    useEffect(() => {
        if (cartCount > previousCartCount.current) {
            setIsCartPulsing(true);
            const timeout = window.setTimeout(() => {
                setIsCartPulsing(false);
            }, 260);

            return () => window.clearTimeout(timeout);
        }

        previousCartCount.current = cartCount;
    }, [cartCount]);

    return (
        <>
            <div className="border-b border-sidebar-border/80">
                <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mr-2 h-8.5 w-8.5"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="flex h-full w-64 flex-col items-stretch justify-between bg-sidebar"
                            >
                                <SheetTitle className="sr-only">
                                    Navigation menu
                                </SheetTitle>
                                <SheetHeader className="flex justify-start text-left">
                                    <AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
                                </SheetHeader>
                                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                    <div className="flex h-full flex-col justify-center text-sm">
                                        {mainNavItems.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className="flex items-center space-x-2 font-medium"
                                            >
                                                {item.icon && (
                                                    <item.icon className="h-5 w-5" />
                                                )}
                                                <span>{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link
                        href="/"
                        prefetch
                        className="flex items-center space-x-2"
                    >
                        <AppLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
                        <NavigationMenu className="flex h-full items-stretch">
                            <NavigationMenuList className="flex h-full items-stretch space-x-2">
                                {mainNavItems.map((item, index) => (
                                    <NavigationMenuItem
                                        key={index}
                                        className="relative flex h-full items-center"
                                    >
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                whenCurrentUrl(
                                                    item.href,
                                                    activeItemStyles,
                                                ),
                                                'h-9 cursor-pointer px-3',
                                            )}
                                        >
                                            {item.icon && (
                                                <item.icon className="mr-2 h-4 w-4" />
                                            )}
                                            {item.title}
                                        </Link>
                                        {isCurrentUrl(item.href) && (
                                            <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="ml-auto flex items-center space-x-2">
                        <div
                            className={cn(
                                'relative flex items-center',
                                'transition-transform duration-200 ease-out',
                                isCartPulsing ? 'scale-105' : 'scale-100',
                            )}
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className="group h-9 w-9 cursor-pointer"
                            >
                                <Search className="size-5! opacity-80 group-hover:opacity-100" />
                            </Button>
                            <Button
                                asChild
                                variant="ghost"
                                size="icon"
                                className="group relative h-9 w-9 cursor-pointer"
                            >
                                <Link
                                    href="/cart"
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm text-accent-foreground"
                                >
                                    <span className="sr-only">
                                        Keranjang Belanja
                                    </span>
                                    <ShoppingCart className="size-5! opacity-80 group-hover:opacity-100" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[0.65rem] font-semibold text-white">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                            </Button>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="size-10 rounded-full p-1"
                                >
                                    <Avatar className="size-8 overflow-hidden rounded-full">
                                        <AvatarImage
                                            src={auth.user?.avatar}
                                            alt={auth.user?.name}
                                        />
                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                            {getInitials(auth.user?.name ?? '')}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                {auth.user && (
                                    <UserMenuContent user={auth.user} />
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-sidebar-border/70">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
