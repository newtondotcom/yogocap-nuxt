<script setup lang="ts">
    const value = ref('')

    let array = {
    starter: '',
    pro: '',
    business: ''
    }

    function submit() {
      console.log(value.value)
      if (value.value === 'ST') {
        window.location.href = array.starter
      } else if (value.value === 'PM') {
        window.location.href = array.pro
      } else if (value.value === 'BS') {
        window.location.href = array.business
      }
    }

  onMounted(async () => {
    const { data } = await useFetch(`/api/product/all`)
    array.starter = data.value.starter
    array.pro = data.value.pro
    array.business = data.value.business
    console.log(data.value)
  });

</script>

<template>
<DashboardSubtitle title="Credit" subtitle="Here is your credit page ! ⏳" />

<div class="mt-8 sm:mt-12 flex-column flex align-middle justify-center">
    <dl class="grid grid-cols-1 gap-4 sm:grid-cols-3">

      <div class="flex flex-col rounded-lg bg-primary px-4 py-8 text-center">
        <dt class="order-last text-lg font-medium text-gray-400">
          Current Plan
        </dt>

        <dd class="text-3xl font-extrabold text-primary-foreground md:text-5xl flex-row flex align-middle justify-center">
          Premium
        </dd>
      </div>

      <div class="flex flex-col rounded-lg bg-primary px-4 py-8 text-center">
        <dt class="order-last text-lg font-medium text-gray-400">
          videos remaining
        </dt>

        <dd class="text-4xl font-extrabold text-primary-foreground md:text-5xl flex-row flex align-middle justify-center">
          24
          <span class="text-gray-400 text-2xl"> /100</span> 
        </dd>
      </div>


      <div class="flex flex-col rounded-lg bg-primary px-4 py-8 text-center">
        <dt class="order-last text-lg font-medium text-gray-400">
          Max video duration
        </dt>

        <dd class="text-4xl font-extrabold text-primary-foreground md:text-5xl flex-row flex align-middle justify-center">
          1
          <span class="text-gray-400 text-2xl">min</span> 
          <span class="text-primary-foreground text-2xl">30</span>
        </dd>
      </div>
    </dl>
  </div>

  <div class="max-w-2xl mx-auto mt-20">
    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 ">Select an option</label>
    <select v-model="value" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5">
      <option selected disabled>Select an option</option>
      <option value="ST">Starter</option>
      <option value="PM">Premium</option>
      <option value="BS">Business</option>
    </select>
  </div>

  <div class="flex flex-row align-middle justify-center mt-8">
  <Button @click="submit">Top up</Button>
  </div>
  
  <LandingPricing />
</template>