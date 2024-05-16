<script setup lang="ts">
import { PenLine} from "lucide-vue-next";
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()
let videoUploaded = ref(false);
let loadingUpload = ref(false);
let videoCut = ref(false);
let videoMusic = ref(false);
let videoSent = ref(false);
let videoEmoji = ref(false);
let videoValid = ref(true);
let Success = ref(false);
let durationInSeconds = ref(0);
let length = ref(33);
let position = ref('center');
const videoName = ref('');
let generatedName = "";
let presignedUrl = "";
let canMusic = true;
let canEmoji = true;
let videoLength = 2000;
let videosBalance = 1;
let s3_server_name = "main";

async function getPresignedUrl() {
    const response = await $fetch("/api/s3/upload", {
        method: "POST",
    });
    const { url, objectName, capacity,s3Name } = response;
    presignedUrl = url;
    generatedName = objectName;
    canMusic = capacity.can_music;
    canEmoji = capacity.can_emojis;
    videoLength = capacity.current_duration;
    videosBalance = capacity.videos_remaining;
    s3_server_name = s3Name;

}

async function uploadFile(presignedUrl: string, file: File) {
    try {
        const response = await fetch(presignedUrl, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
            },
        });

        if (response.ok) {
            toast({
                title: 'File upload succeeded',
                description: 'Your video has been uploaded successfully.'
            });
        } else {
            console.error('File upload failed', response);
        }
        loadingUpload.value = false;
        videoUploaded.value = true;
    } catch (error) {
        console.error('Error uploading file:', error);
        loadingUpload.value = false;
        videoUploaded.value = false;
        throw error;
    }
}

async function launchAmpq() {
    const body = {
        name: videoName.value,
        aligned: true,
        emojis: videoEmoji.value,
        music: videoMusic.value,
        silent: videoCut.value,
        length: length.value,
        name_s3: generatedName,
        s3name : s3_server_name,
        position: position.value,
    };
    await $fetch("/api/dashboard/postvideo", {
        method: "POST",
        body: JSON.stringify(body),
    });
    length.value = 100;
    Success.value = true;
    videoSent.value = true;
}

async function handleFileChange(event: { target: any; }) {

    const fileInput = event.target;
    const videoFile = fileInput.files[0];

    if (videoFile) {
        const video = document.createElement('video');
        video.src = URL.createObjectURL(videoFile);
        video.onloadedmetadata = async function () {
            durationInSeconds.value = video.duration;
            durationInSeconds.value = Math.round(durationInSeconds.value);
            if (durationInSeconds.value > videoLength) {
                videoValid.value = false;
                loadingUpload.value = false;
                toast({
                    title: 'File upload failed',
                    description: 'Your video length is above the one included in your current plan.',
                    variant: 'destructive',
                });
            } else if (videosBalance == 0) {
                videoValid.value = false;
                loadingUpload.value = false;
                toast({
                    title: 'File upload failed',
                    description: 'You have no more videos left in your current balance.',
                    variant: 'destructive'
                });
            }
            else {
                videoValid.value = true;
                loadingUpload.value = true;
                await uploadFile(presignedUrl, videoFile);
                length.value = 66;
                loadingUpload.value = false;
                videoUploaded.value = true;
            }
        };
    } else {
        videoUploaded.value = false;
    }
}

async function rmUploadedVideo() {
    await $fetch("/api/s3/delete", {
        method: "POST",
        body: JSON.stringify({
            file: "test.mp4"
        }),
    });
}

onMounted(() => {
    getPresignedUrl();
    window.onbeforeunload = async function (event) {
        event.preventDefault();
        if (!Success.value) {
            await rmUploadedVideo();
        }
        return 'text not printed.';
    };
});

</script>

<template>

    <DashboardSubtitle title="Upload a video" subtitle="From here, you can upload a video to subtitle it ! 🚀" />

    <div class="rounded-lg border border-dashed shadow-sm">
        <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8">
            <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <div>
                    <p
                        class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-primary-foreground uppercase rounded-full bg-teal-accent-400">
                        Subtitle a video
                    </p>
                </div>
                <h2
                    class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                    <span class="relative inline-block">
                        <svg viewBox="0 0 52 24" fill="currentColor"
                            class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
                            <defs>
                                <pattern id="b902cd03-49cc-4166-a0ae-4ca1c31cedba" x="0" y="0" width=".135"
                                    height=".30">
                                    <circle cx="1" cy="1" r=".7"></circle>
                                </pattern>
                            </defs>
                            <rect fill="url(#b902cd03-49cc-4166-a0ae-4ca1c31cedba)" width="52" height="24"></rect>
                        </svg>
                        <span class="relative text-primary">Let</span>
                    </span>
                    us guide you
                </h2>
                <p class="text-base text-gray-700 md:text-lg">
                    Nothing is simplier than uploading a video and getting it subtitled !
                </p>
            </div>
        </div>

        <Progress v-model="length" class="mb-[50px] w-4/5 mx-auto rounded-md self-center" />

        <div class="flex flex-row items-center justify-center">
            <div class="flex w-1/3 h-[30vh] flex-row items-center justify-center" v-if="!Success">
                <div v-if="videoUploaded"
                    class="flex flex-row items-center justify-center mt-2 text-green-400 font-bold">
                    <Badge class="bg-green-500 px-4 py-2 text-primary-foreground">Uploaded !</Badge>
                </div>
                <div class="flex flex-col" v-else>
                    <p class="text-gray-600">
                        Upload your video here
                    </p>
                    <div class="mb-3 mt-4 grid items-center gap-1.5">
                        <Input id="picture" accept="video/*" @change="handleFileChange" :disabled="loadingUpload"
                            type="file" class="bg-primary" />
                    </div>
                    <div v-if="loadingUpload" class="flex flex-row items-center justify-center mt-2">
                        <Badge>
                            <div>Uploading</div>
                            <div class="ml-1">
                                <svg class="animate-spin h-4 w-4 m-1" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                </svg>
                            </div>
                        </Badge>
                    </div>
                    <!--
                <Alert class="my-2" variant="destructive" v-if="!videoValid">
                    <AlertCircle class="w-4 h-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Your video length is above the one included in your current plan.
                    </AlertDescription>
                </Alert>
                -->
                </div>
            </div>

            <Separator orientation="vertical" class="h-[20vh]"
                v-if="((length == 66) || (length == 33)) && (loadingUpload || videoUploaded)" />

            <div v-if="length == 100 && Success" class="flex flex-col w-1/2 h-[30vh] pl-10">
                <div class="flex items-center justify-between mb-6">
                    <p class="text-2xl font-bold text-green-500">Success</p>
                    <svg class="w-8 text-green-500" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10" points="6,12 10,16 18,8"></polyline>
                    </svg>
                </div>
                <p class="text-gray-600">
                    Thanks, you video is now being processed, you will receive an email when it's done !
                </p>
            </div>
            <div class="flex flex-col w-1/2 h-[30vh] pl-10"
                v-if="((length == 66) || (length == 33)) && (loadingUpload || videoUploaded)">
                <div class="flex flex-col">
                    <div class="items-top flex gap-x-2 mt-2">
                        <div class="grid gap-1.5 leading-none">
                            <label for="silence"
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Do you want us to cut silent parts of the video ?
                            </label>
                        </div>
                        <Checkbox class="flex" v-model="videoCut" id="silence" />
                    </div>

                    <!--
                    <div class="items-top flex gap-x-2 mt-4" :class="`${canMusic ? 'opacity-1' : 'opacity-50'}`">
                        <Checkbox class="flex" v-model="videoMusic" id="music" v-if="canMusic" />
                        <Checkbox class="flex" v-model="videoMusic" id="music" v-else disabled />
                        <div class="grid gap-1.5 leading-none">
                            <label for="music"
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Do you want us to add a dynamic music to the video ?
                            </label>
                        </div>
                    </div>

                    <div class="items-top flex gap-x-2 mt-4" :class="`${canEmoji ? 'opacity-1' : 'opacity-50'}`">
                        <Checkbox class="flex" v-model="videoEmoji" id="emoji" v-if="canEmoji" />
                        <Checkbox class="flex" v-model="videoEmoji" id="emoji" v-else disabled />
                        <div class="grid gap-1.5 leading-none">
                            <label for="emoji"
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Do you want us to add emojis to the video ?
                            </label>
                        </div>
                    </div>
                    -->

                    <div class="items-top flex gap-x-2 mt-4">
    <div class="grid gap-1.5 leading-none justify-center align-middle">
        <label for="position"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center">
            Subtitles position :
        </label>
    </div>
    <Select :model-value="position" id="position">
        <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Select a position" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Position</SelectLabel>
                <SelectItem value="center">
                    Center
                </SelectItem>
                <SelectItem value="bottomcenter">
                    Bottom Center
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</div>

                </div>


                <div class="pt-6">
                    <div class="relative w-full max-w-sm items-center">
                        <Input id="search" type="text" placeholder="Name your video" v-model="videoName"
                            class="pl-10" />
                        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                            <PenLine class="size-6 text-muted-foreground" />
                        </span>
                    </div>

                    <div class="mt-4 ml-28">
                        <Button :class="[videoUploaded ? 'opacity-1' : 'opacity-20']" :disabled="!videoUploaded"
                            @click="launchAmpq">
                            <span class="text-sm font-medium"> Process it </span>

                            <svg class="h-5 w-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>