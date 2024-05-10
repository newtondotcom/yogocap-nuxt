<script setup lang="ts">
const supabase = useSupabaseClient();

let storageMessage = false;

const ackStorageMessage = () => {
  storageMessage = true;
};

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut()
    .then(() => {
      navigateTo('/auth/login');
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<template>
  <DashboardSubtitle title="Account" subtitle="Here is your account page ! 🚀" />

  <div v-if="!storageMessage" class="flex flex-col w-full align-middle justify-center">
    <div class="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8 mb-20 mx-12" role="alert">
      <div class="flex items-center gap-4">
        <span class="shrink-0 rounded-full bg-blue-400 p-2 text-white">
          <svg class="h-4 w-4" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd"
              d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
              fill-rule="evenodd" />
          </svg>
        </span>

        <p class="font-medium sm:text-lg">New message!</p>
      </div>

      <p class="mt-4 text-gray-500">
        We just want you to remind you that your generated videos are stored for <span class="text-green-500">5
          days</span>. After that, to reduce our digital footprint, they will be deleted. If you want to keep them,
        please download them.
      </p>

      <div class="mt-6 sm:flex sm:gap-4">
        <button
          class="inline-block w-full rounded-lg bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
          on:click={ackStorageMessage}>
          Okay
        </button>

        <button
          class="mt-2 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:w-auto"
          on:click={ackStorageMessage}>
          Sorry :(
        </button>
      </div>
    </div>
  </div>

  <div class="space-y-4 ml-20">

    <nav class="flex gap-4">
      <button
        class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
        @click={handleLogout}> Logout </button>

    </nav>
  </div>
</template>