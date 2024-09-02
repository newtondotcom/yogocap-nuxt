<template>
    <div v-for="i in 3" class="flex flex-col my-4 border-2 rounded-3xl py-2 space-x-2 space-y-2">
        <div
            class="whitespace-nowrap font-medium text-gray-900 flex flex-row space-x-2 items-center justify-center"
        >
            <Skeleton class="h-4 w-[100px]" />
            <Skeleton class="h-4 w-[100px]" />
        </div>
        <div class="flex flex-row align-middle justify-center">
            <Skeleton class="h-4 w-[200px]" />
        </div>
    </div>
</template>
