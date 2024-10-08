<script setup lang="ts">
    import SheetClose from '~/components/ui/sheet/SheetClose.vue';
    import {
        Bell,
        Captions,
        CircleUser,
        CreditCard,
        FileClock,
        History,
        Home,
        LineChart,
        Menu,
        Package,
        Package2,
        Search,
        ShoppingCart,
        SquarePlus,
        Users,
    } from 'lucide-vue-next';

    const route = useRoute();
    const supabase = useSupabaseClient();
    const previousVideosCount = useCookie('previousVideosCount');

    const devmode = ref(false);

    async function goToCredit() {
        navigateTo('/credit');
    }

    async function logout() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
        }
        window.location.href = '/';
    }

    onMounted(() => {
        if (window.location.hostname === 'localhost') {
            devmode.value = true;
        }
    });
</script>

<template>
    <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div class="hidden border-r bg-muted/40 md:block">
            <div class="flex h-full max-h-screen flex-col gap-2">
                <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <NuxtLink to="/" class="flex items-center gap-2 font-semibold">
                        <Captions class="text-primary pt-1 h-6 w-6" />
                        <div class="text-primary font-bold text-xl underline">Yogocap</div>
                    </NuxtLink>
                </div>
                <div class="flex-1">
                    <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
                        <NuxtLink
                            to="/nvideo"
                            :class="{
                                'text-primary bg-muted': $route.name === 'nvideo',
                                'text-muted-foreground': $route.name !== 'nvideo',
                            }"
                            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <SquarePlus class="h-4 w-4" />
                            New Video
                        </NuxtLink>
                        <NuxtLink
                            :to="{ name: 'pvideos' }"
                            :class="{
                                'text-primary bg-muted': $route.name === 'pvideos',
                                'text-muted-foreground': $route.name !== 'pvideos',
                            }"
                            class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
                        >
                            <History class="h-4 w-4" />
                            <span>Previous videos</span>
                            <Badge
                                class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                            >
                                {{ previousVideosCount }}
                            </Badge>
                        </NuxtLink>

                        <NuxtLink
                            to="/credit"
                            :class="{
                                'text-primary bg-muted': route.name === 'credit',
                                'text-muted-foreground': route.name !== 'credit',
                            }"
                            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <CreditCard class="h-4 w-4" />
                            Balance
                        </NuxtLink>
                        <NuxtLink
                            to="/history"
                            :class="{
                                'text-primary bg-muted': route.name === 'history',
                                'text-muted-foreground': route.name !== 'history',
                            }"
                            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <FileClock class="h-4 w-4" />
                            History
                        </NuxtLink>
                    </nav>
                </div>
                <div class="mt-auto p-4">
                    <Card>
                        <CardHeader class="p-2 pt-0 md:p-4">
                            <CardTitle>Upgrade your plan</CardTitle>
                            <CardDescription>
                                Unlock all features and get longer video processing 📈
                            </CardDescription>
                        </CardHeader>
                        <CardContent class="p-2 pt-0 md:p-4 md:pt-0">
                            <NuxtLink to="/credit">
                                <Button size="sm" class="w-full">Upgrade</Button>
                            </NuxtLink>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
        <div class="flex flex-col">
            <header
                class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6"
            >
                <Sheet>
                    <SheetTrigger as-child>
                        <Button variant="outline" size="icon" class="shrink-0 md:hidden">
                            <Menu class="h-5 w-5" />
                            <span class="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" class="flex flex-col">
                        <nav class="grid gap-2 text-lg font-medium">
                            <SheetClose>
                                <NuxtLink
                                    to="#"
                                    class="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <Captions class="text-primary pt-1 h-6 w-6" />
                                    <span class="sr-only">Yogocap</span>
                                </NuxtLink>
                            </SheetClose>

                            <SheetClose>
                                <NuxtLink
                                    to="/nvideo"
                                    :class="{
                                        'text-primary bg-muted': $route.name === 'nvideo',
                                        'text-muted-foreground': $route.name !== 'nvideo',
                                    }"
                                    class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                >
                                    <SquarePlus class="h-4 w-4" />
                                    New Video
                                </NuxtLink>
                            </SheetClose>

                            <SheetClose>
                                <NuxtLink
                                    :to="{ name: 'pvideos' }"
                                    :class="{
                                        'text-primary bg-muted': $route.name === 'pvideos',
                                        'text-muted-foreground': $route.name !== 'pvideos',
                                    }"
                                    class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
                                >
                                    <History class="h-4 w-4" />
                                    <span>Previous videos</span>
                                    <Badge
                                        class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                                    >
                                        {{ previousVideosCount }}
                                    </Badge>
                                </NuxtLink>
                            </SheetClose>

                            <SheetClose>
                                <NuxtLink
                                    to="/credit"
                                    :class="{
                                        'text-primary bg-muted': route.name === 'credit',
                                        'text-muted-foreground': route.name !== 'credit',
                                    }"
                                    class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                >
                                    <CreditCard class="h-4 w-4" />
                                    Balance
                                </NuxtLink>
                            </SheetClose>

                            <SheetClose>
                                <NuxtLink
                                    to="/history"
                                    :class="{
                                        'text-primary bg-muted': route.name === 'history',
                                        'text-muted-foreground': route.name !== 'history',
                                    }"
                                    class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                >
                                    <FileClock class="h-4 w-4" />
                                    History
                                </NuxtLink>
                            </SheetClose>
                        </nav>
                        <div class="mt-auto">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Upgrade your Plan</CardTitle>
                                    <CardDescription>
                                        Unlock all features and get longer video processing 📈
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <NuxtLink to="/credit">
                                        <Button size="sm" class="w-full" @click="goToCredit">
                                            Upgrade
                                        </Button>
                                    </NuxtLink>
                                </CardContent>
                            </Card>
                        </div>
                    </SheetContent>
                </Sheet>
                <div class="w-full flex-1 cursor-default">
                    Welcome to
                    <span class="text-primary font-bold">Yogocap</span>
                </div>
                <Badge v-if="devmode">DEV</Badge>
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="secondary" size="icon" class="rounded-full">
                            <CircleUser class="h-5 w-5" />
                            <span class="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <NuxtLink to="/settings">
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                        </NuxtLink>
                        <NuxtLink to="/support">
                            <DropdownMenuItem>Support</DropdownMenuItem>
                        </NuxtLink>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <div @click="logout">Log out</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            <main class="flex flex-1 flex-col p-4 lg:p-6">
                <NuxtPage />
            </main>
        </div>
    </div>
</template>
