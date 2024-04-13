<script setup lang="ts">
    const list = [
        {
            name : "squeezie.mp4",
            date : "14/11/2023",
            lenght : "187",
            silent : "yes"
        },
        {
            name : "squeezie2.mp4",
            date : "14/11/2023",
            lenght : "187",
            silent : "yes"
        }
    ]
    const transactions = [
      {
        date : "14/11/2023",
        plan : "Premium",
        value : "187",
      },
      {
        date : "14/11/2023",
        plan : "Premium",
        value : "187",
      },
    ]
</script>

<template>
<DashboardSubtitle title="Transactions history" subtitle="Here is the list of your previous transactions ! 💲" />

<div class="overflow-x-auto rounded-lg border border-gray-200 mt-8 mx-4">
  <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
    <thead class="ltr:text-left rtl:text-right">
      <tr>
        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Date
        </th>
        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Plan chosen
        </th>
        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Amount
        </th>
      </tr>
    </thead>

    <tbody class="divide-y divide-gray-200">
      <tr v-for="item in transactions" >
        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          <div class="flex flex-row align-middle justify-center">
              {{item.date}}
          </div>
      </td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700">
          <div class="flex flex-row align-middle justify-center">
              {{item.plan}}
          </div>
      </td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700">
          <div class="flex flex-row align-middle justify-center">
              {{item.value}} €
          </div>
      </td>
      </tr>
      <tr>
        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          <div class="flex flex-row align-middle justify-center">
          </div>
      </td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700">
          <div class="flex flex-row align-middle justify-center">
            No transactions yet
          </div>
      </td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700">
          <div class="flex flex-row align-middle justify-center">
          </div>
      </td>
      </tr>
    </tbody>
  </table>
</div>

<DashboardSubtitle title="Videos history" subtitle="Here is the list of your previous subtitled videos ! 📺" />

<div class="overflow-x-auto rounded-lg border border-gray-200 mt-8 mx-4">
    <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead class="ltr:text-left rtl:text-right">
        <tr>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Name
          </th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Date of submission
          </th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Lenght
          </th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Silent parts cut
          </th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            
          </th>
        </tr>
      </thead>
  
      <tbody class="divide-y divide-gray-200">
        <tr v-for="item in list">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            <div class="flex flex-row align-middle justify-center">
                {{item.name}}
            </div>
        </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            <div class="flex flex-row align-middle justify-center">
                {{item.date}}
            </div>
        </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            <div class="flex flex-row align-middle justify-center">
                {{item.lenght}}
            </div>
        </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            <div class="flex flex-row align-middle justify-center">
                yes
            </div>
        </td>
          <td class="whitespace-nowrap px-4 py-2">
            <Button>View</Button>
          </td>
        </tr>
        <tr>
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            <div class="flex flex-row align-middle justify-center">
            </div>
        </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            <div class="flex flex-row align-middle justify-center">
            </div>
        </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            <div class="flex flex-row align-middle justify-center">
              No videos yet
            </div>
        </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            <div class="flex flex-row align-middle justify-center">
            </div>
        </td>
          <td class="whitespace-nowrap px-4 py-2">
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>