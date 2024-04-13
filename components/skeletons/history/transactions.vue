<template>
  <tr v-for="i in 3">
    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
      <div class="flex flex-row align-middle justify-center">
        <Skeleton class="h-4 w-[100px]" />
      </div>
    </td>
    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
      <div class="flex flex-row align-middle justify-center">
        <Skeleton class="h-4 w-[200px]" />
      </div>
    </td>
    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
      <div class="flex flex-row align-middle justify-center">
        <Skeleton class="h-4 w-[60px]" />
      </div>
    </td>
  </tr>
</template>