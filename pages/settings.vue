<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next';
const supabase = useSupabaseClient()

async function accountClosing() {
  await $fetch('/api/miscs/user-deletion');
  logout();
}

async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.error('Error logging out:', error.message)
    }
    navigateTo('/')
}
</script>

<template>
<DashboardSubtitle title="Settings" subtitle="Here is your settings page ! 🚀" />
<div class="p-8">
<Alert variant="destructive">
    <AlertCircle class="w-4 h-4" />
    <AlertTitle>Reminder</AlertTitle>
    <AlertDescription>
        The subtitled videos are stored on the server for 2 days. After that, they are automatically deleted.
    </AlertDescription>
  </Alert>

</div>
<div class="flex justify-center">
  <AlertDialog>
    <AlertDialogTrigger>
<Button variant="destructive">
  Close your account
</Button>
</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account. However, due to legal reasons, we will keep your data for 5 years.
           Note that your decision can be reversed within 30 days by sending us an email.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="accountClosing">Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</div>

<div class="flex justify-center mt-10">
    <Button @click="logout" variant="secondary">
    Log out
  </Button>
</div>
</template>