<script setup lang="ts">

const transactions = ref([""])
const videos = ref([])
const dataFetched = ref(false)

async function getHistory() {
  const data = await $fetch('/api/dashboard/history')
  transactions.value = data.transactions;
  transactions.value.map((item) => {
    item.date = new Date(item.date).toLocaleTimeString() + " on " + new Date(item.date).toLocaleDateString()
    item.plan = item.plan.split('-')[1].toLowerCase().replace(/^\w/, c => c.toUpperCase());
    if (item.plan == "Starter") item.value = 5
    if (item.plan == "Premium") item.value = 15
    if (item.plan == "Business") item.value = 30
  })
  videos.value = data.videos;
  videos.value.splice(50);
  videos.value.map((item) => {
    item.submitted = new Date(item.submitted).toLocaleTimeString() + " at " + new Date(item.submitted).toLocaleDateString()
  })
  dataFetched.value = true
}

onMounted(() => {
  getHistory()
})
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
        <tr v-for="item in transactions">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            <div class="flex flex-row align-middle justify-center">
              {{ item.date }}
            </div>
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            <div class="flex flex-row align-middle justify-center">
              {{ item.plan }}
              <div v-if="item.onjoin" class="bg-clip-text bg-gradient-to-r from-yellow-400 to-green-600 ml-2">-gifted-
              </div>
            </div>
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            <div class="flex flex-row align-middle justify-center">
              {{ item.value }} €
            </div>
          </td>
        </tr>
        <SkeletonsHistoryTransactions v-if="!dataFetched" />
        <tr v-if="dataFetched && transactions.length == 0">
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

  <DashboardSubtitle title="Videos history"
    subtitle="Here is the list of your latest 50 previous subtitled videos ! 📺" />

  <div class="overflow-x-auto rounded-lg border border-gray-200 mt-8 mx-4 mb-[10%]">
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
        <tr v-for="item in videos">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            <div class="flex flex-row align-middle justify-center">
              {{ item.name }}
            </div>
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            <div class="flex flex-row align-middle justify-center">
              {{ item.submitted }}
            </div>
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            <div class="flex flex-row align-middle justify-center">
              {{ item.length }}
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
        <SkeletonsHistoryVideos v-if="!dataFetched" />
        <tr v-if="videos.length == 0 && dataFetched">
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