<template>
    <div v-for="i in 8" class="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
        <Skeleton class="h-20 w-full" />

        <div class="bg-white p-4 sm:p-6">
            <time datetime="2022-10-10" class="block text-xs text-gray-500">
                <Skeleton class="w-[200px] h-4" />
            </time>

            <button class="flex flex-row align-middle justify-center">
                <h3 class="ml-3 mt-0.5 text-lg text-gray-900">
                    <Skeleton class="w-[200px] h-6" />
                </h3>
            </button>

            <div class="mt-6 line-clamp-3 text-sm/relaxed text-gray-500">
                <div class="flex flex-row align-middle justify-center">
                    <Skeleton class="flex w-[100px] h-8 rounded-full mr-1" />
                    <Skeleton class="flex w-[100px] h-8 rounded-full ml-1" />
                </div>
            </div>

            <div class="flex flex-row justify-center gap-1 mt-4">
                <Skeleton class="flex w-[100px] h-10 rounded-sm mr-1" />
                <Skeleton class="flex w-[100px] h-10 rounded-sm mr-1" />
            </div>
        </div>
    </div>
</template>
