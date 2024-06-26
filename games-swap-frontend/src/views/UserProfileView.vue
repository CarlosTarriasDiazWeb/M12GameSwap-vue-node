<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import VendorSummary from '@/components/VendorSummary.vue';
import type { Stats } from '@/interfaces/Stats';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, ref, type Ref } from 'vue';
import router from '@/router';
import Divider from 'primevue/divider';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import ErrorMessages from '@/components/ErrorMessages.vue';


const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const { token, userIsLoggedIn } = storeToRefs(useAuthStore());
const { deleteToken } = useAuthStore();
const userStats = ref<Stats | null | any>(null as any);

const items = ref([
    { label: 'Home', route: '/' },
    { label: 'Perfil ', route: '/profileManagement' },
    { label: 'Reservas y Compras' }
]);

const error = ref<boolean>(false);
const errorMessages: Ref<string[]> = ref([]);

const getUserStats = async () => {
    error.value = false;
    errorMessages.value = [];
    try {
        const response: Response = await fetch(`${apiEndpoint}/users/getStatsAuth`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token.value}`
            }
        });
        if (!response.ok) {
            // throw new Error(`HTTP error! Status: ${response.status}`);
            //Force to log out if token is modified or expired.
            if (response.status === 401 || response.status === 403) {
                deleteToken();
                router.push("/");
            }
        }
        const data: Stats = await response.json();

        userStats.value = data;
    } catch (err) {
        console.error(err);
        error.value = true;
        errorMessages.value.push("Ha habido un error al devolver los datos del usuario. Por favor, inténtalo más tarde.");
    }
}

onMounted(
    () => {
        getUserStats();
        router.push(`/userProfile/purchases`);
    }
);
</script>
<template>
    <NavBar></NavBar>
    <section class="px-4">
        <BreadCrumbs :items="items"></BreadCrumbs>
    </section>
    <Divider></Divider>
    <main class="d-flex flex-column justify-content-center align-items-center mt-3 px-2 w-100">
        <VendorSummary :userStats="userStats"></VendorSummary>
        <ErrorMessages :messages="errorMessages"></ErrorMessages>
        <section class="tabs-box d-flex justify-content-around gap-3 w-75 mb-4">
            <RouterLink :to="{ name: 'reservations' }">Reservas</RouterLink>
            <RouterLink :to="{ name: 'purchases' }">Compras</RouterLink>
            <RouterLink :to="{ name: 'sells' }">Ventas</RouterLink>
        </section>
        <RouterView></RouterView>
    </main>
</template>

<style scoped>
.tabs-box a {
    font-size: 25px;
    font-weight: bold;
}

.tabs-box a:focus,
.tabs-box a:active,
.tabs-box a:hover {
    text-decoration: underline;
    text-decoration-thickness: 3px;
    color: #8a6cf6;
}

.router-link-active {
    text-decoration: underline;
    text-decoration-thickness: 3px;
    color: #8a6cf6;
}
</style>